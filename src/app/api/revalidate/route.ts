import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";

export async function POST(req: Request) {
  const secret = req.headers.get("x-sanity-webhook-secret");
  const expectedSecret = process.env.SANITY_WEBHOOK_SECRET;

  if (!secret || !expectedSecret) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  const a = Buffer.from(secret);
  const b = Buffer.from(expectedSecret);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    const body = await req.json();

    if (body._type === "product") {
      revalidatePath("/", "layout");
      if (body.slug?.current) {
        revalidatePath(`/san-pham/${body.slug.current}`);
      }
    }

    if (body._type === "category") {
      revalidatePath("/", "layout");
    }

    if (body._type === "siteSettings") {
      revalidatePath("/", "layout");
    }

    return NextResponse.json({ revalidated: true });
  } catch {
    return NextResponse.json(
      { message: "Error revalidating" },
      { status: 500 },
    );
  }
}
