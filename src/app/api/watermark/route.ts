import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

const watermarkPath = join(process.cwd(), "public", "watermark.png");
const watermarkBuffer = existsSync(watermarkPath)
  ? readFileSync(watermarkPath)
  : null;

// Only proxy images from hosts product images are actually stored on.
const ALLOWED_HOSTS = [/^lh3\.googleusercontent\.com$/, /\.public\.blob\.vercel-storage\.com$/];
const MAX_SOURCE_BYTES = 15 * 1024 * 1024;
const MAX_DIMENSION = 2000;
const FETCH_TIMEOUT_MS = 10_000;

function isAllowedImageUrl(raw: string): boolean {
  try {
    const parsed = new URL(raw);
    return (
      parsed.protocol === "https:" &&
      ALLOWED_HOSTS.some((pattern) => pattern.test(parsed.hostname))
    );
  } catch {
    return false;
  }
}

function clampDimension(raw: string | null): number {
  const value = parseInt(raw || "0", 10);
  if (!Number.isFinite(value) || value <= 0) return 0;
  return Math.min(value, MAX_DIMENSION);
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  const file = request.nextUrl.searchParams.get("file");
  const w = clampDimension(request.nextUrl.searchParams.get("w"));
  const h = clampDimension(request.nextUrl.searchParams.get("h"));

  if (!url && !file) {
    return NextResponse.json({ error: "Missing url or file param" }, { status: 400 });
  }

  if (url && !isAllowedImageUrl(url)) {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  if (!watermarkBuffer) {
    return NextResponse.json({ error: "Watermark file not found" }, { status: 500 });
  }

  try {
    let imageBuffer: Buffer;

    if (file) {
      const safeName = file.replace(/[^a-zA-Z0-9._-]/g, "");
      const filePath = join(process.cwd(), "public", safeName);
      imageBuffer = readFileSync(filePath);
    } else {
      const response = await fetch(url!, {
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      });
      if (!response.ok || !isAllowedImageUrl(response.url)) {
        return NextResponse.json({ error: "Fetch failed" }, { status: 502 });
      }
      const declaredLength = Number(response.headers.get("content-length") || 0);
      if (declaredLength > MAX_SOURCE_BYTES) {
        return NextResponse.json({ error: "Image too large" }, { status: 413 });
      }
      imageBuffer = Buffer.from(await response.arrayBuffer());
      if (imageBuffer.byteLength > MAX_SOURCE_BYTES) {
        return NextResponse.json({ error: "Image too large" }, { status: 413 });
      }
    }

    let pipeline = sharp(imageBuffer, { limitInputPixels: 50_000_000 });

    if (w > 0 && h > 0) {
      pipeline = pipeline.resize(w, h, { fit: "cover" });
    }

    const metadata = await pipeline.metadata();
    const imgW = w || metadata.width || 600;
    const imgH = h || metadata.height || 600;

    // Scale watermark to ~25% of image width, with reduced opacity
    const wmSize = Math.round(Math.min(imgW, imgH) * 0.25);
    const watermark = await sharp(watermarkBuffer)
      .resize(wmSize, wmSize, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .ensureAlpha()
      .composite([{
        input: Buffer.from([0, 0, 0, Math.round(255 * 0.15)]),
        raw: { width: 1, height: 1, channels: 4 },
        tile: true,
        blend: "dest-in",
      }])
      .png()
      .toBuffer();

    const result = await pipeline
      .composite([{
        input: watermark,
        gravity: "southeast",
      }])
      .webp({ quality: 85 })
      .toBuffer();

    return new NextResponse(new Uint8Array(result), {
      headers: {
        "Content-Type": "image/webp",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (err) {
    console.error("[watermark] failed", err);
    return NextResponse.json({ error: "Image processing failed" }, { status: 500 });
  }
}
