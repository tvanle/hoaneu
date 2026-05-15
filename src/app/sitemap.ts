import { MetadataRoute } from "next";
import { getAllProductSlugs } from "@db/queries/products";
import { getAllCategorySlugs } from "@db/queries/categories";

const BASE_URL = "https://hoaneu.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [productSlugs, categorySlugs] = await Promise.all([
    getAllProductSlugs(),
    getAllCategorySlugs(),
  ]);

  const now = new Date();

  const staticEntries = [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${BASE_URL}/lien-he`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${BASE_URL}/dat-hoa`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 },
  ];

  const categoryEntries = categorySlugs.map((slug) => ({
    url: `${BASE_URL}/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const productEntries = productSlugs.map((slug) => ({
    url: `${BASE_URL}/san-pham/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...categoryEntries, ...productEntries];
}
