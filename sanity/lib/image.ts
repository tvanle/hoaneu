import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "./client";

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

export function urlForImage(
  source: Parameters<ReturnType<typeof imageUrlBuilder>["image"]>[0],
) {
  if (!builder) return null;
  return builder.image(source).auto("format").quality(85);
}
