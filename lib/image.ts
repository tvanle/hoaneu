/**
 * Image utility — replaces sanity/lib/image.ts
 * Works with Vercel Blob URLs (or any public image URL).
 */

export function watermarkedUrl(
  imageUrl: string,
  width?: number,
  height?: number,
): string {
  const params = new URLSearchParams({ url: imageUrl });
  if (width) params.set("w", String(width));
  if (height) params.set("h", String(height));
  return `/api/watermark?${params.toString()}`;
}
