import { MetadataRoute } from "next";
import { safeFetch } from "@sanity/lib/client";
import {
  ALL_PRODUCT_SLUGS_QUERY,
  ALL_CATEGORY_SLUGS_QUERY,
} from "@lib/queries/products";

const BASE_URL = "https://hoaneu.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [productSlugs, categorySlugs] = await Promise.all([
    safeFetch<string[]>(ALL_PRODUCT_SLUGS_QUERY),
    safeFetch<string[]>(ALL_CATEGORY_SLUGS_QUERY),
  ]);

  const now = new Date();

  const staticEntries = [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${BASE_URL}/lien-he`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${BASE_URL}/dat-hoa`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 },
  ];

  const categoryEntries = (categorySlugs || []).map((slug: string) => ({
    url: `${BASE_URL}/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const productEntries = (productSlugs || []).map((slug: string) => ({
    url: `${BASE_URL}/san-pham/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...categoryEntries, ...productEntries];
}
