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

  const locales = ["vi", "en"];
  const now = new Date();

  const staticPages = [
    "",
    "/lien-he",
  ];

  const staticEntries = locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${BASE_URL}${locale === "vi" ? "" : "/en"}${page}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: page === "" ? 1.0 : 0.8,
    })),
  );

  const categoryEntries = locales.flatMap((locale) =>
    (categorySlugs || []).map((slug: string) => ({
      url: `${BASE_URL}${locale === "vi" ? "" : "/en"}/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
  );

  const productEntries = locales.flatMap((locale) =>
    (productSlugs || []).map((slug: string) => ({
      url: `${BASE_URL}${locale === "vi" ? "" : "/en"}/san-pham/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  );

  return [...staticEntries, ...categoryEntries, ...productEntries];
}
