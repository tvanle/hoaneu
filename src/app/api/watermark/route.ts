import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { readFileSync } from "fs";
import { join } from "path";

const watermarkBuffer = readFileSync(
  join(process.cwd(), "public", "watermark.png"),
);

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  const file = request.nextUrl.searchParams.get("file");
  const w = parseInt(request.nextUrl.searchParams.get("w") || "0", 10);
  const h = parseInt(request.nextUrl.searchParams.get("h") || "0", 10);

  if (!url && !file) {
    return NextResponse.json({ error: "Missing url or file param" }, { status: 400 });
  }

  if (url && !url.startsWith("https://cdn.sanity.io/")) {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  try {
    let imageBuffer: Buffer;

    if (file) {
      const safeName = file.replace(/[^a-zA-Z0-9._-]/g, "");
      const filePath = join(process.cwd(), "public", safeName);
      imageBuffer = readFileSync(filePath);
    } else {
      const response = await fetch(url!);
      if (!response.ok) {
        return NextResponse.json({ error: "Fetch failed" }, { status: 502 });
      }
      imageBuffer = Buffer.from(await response.arrayBuffer());
    }

    let pipeline = sharp(imageBuffer);

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
        gravity: "center",
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
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
