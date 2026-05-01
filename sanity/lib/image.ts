import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "./client";

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

export function urlForImage(
  source: Parameters<ReturnType<typeof imageUrlBuilder>["image"]>[0],
) {
  if (!builder) return null;
  return builder.image(source).auto("format").quality(85);
}

export function watermarkedUrl(
  cdnUrl: string,
  width?: number,
  height?: number,
): string {
  const params = new URLSearchParams({ url: cdnUrl });
  if (width) params.set("w", String(width));
  if (height) params.set("h", String(height));
  return `/api/watermark?${params.toString()}`;
}