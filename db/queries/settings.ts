import { db } from "..";
import { siteSettings } from "../schema";

export async function getSiteSettings() {
  const row = await db.query.siteSettings.findFirst();

  if (!row) return null;

  return {
    shopName: row.shopName || undefined,
    heroTitle: row.heroTitle || undefined,
    heroSubtitle: row.heroSubtitle || undefined,
    heroImage: row.heroImageUrl
      ? { asset: { url: row.heroImageUrl } }
      : undefined,
    instagramUrl: row.instagramUrl || undefined,
    facebookUrl: row.facebookUrl || undefined,
    phone: row.phone || undefined,
    address: row.address || undefined,
  };
}
