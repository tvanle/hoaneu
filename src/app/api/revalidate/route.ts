import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const secret = req.headers.get("x-sanity-webhook-secret");

  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    const body = await req.json();

    if (body._type === "product") {
      revalidatePath("/[locale]", "layout");
      if (body.slug?.current) {
        revalidatePath(`/[locale]/san-pham/${body.slug.current}`);
      }
    }

    if (body._type === "category") {
      revalidatePath("/[locale]", "layout");
    }

    if (body._type === "siteSettings") {
      revalidatePath("/[locale]", "layout");
    }

    return NextResponse.json({ revalidated: true });
  } catch {
    return NextResponse.json(
      { message: "Error revalidating" },
      { status: 500 },
    );
  }
}
