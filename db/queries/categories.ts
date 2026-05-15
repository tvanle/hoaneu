import { eq, asc, isNull } from "drizzle-orm";
import { db } from "..";
import { categories } from "../schema";

export async function getAllCategories() {
  const rows = await db.query.categories.findMany({
    where: isNull(categories.parentId),
    orderBy: [asc(categories.order)],
    with: {
      subcategories: {
        orderBy: [asc(categories.order)],
      },
    },
  });

  return rows.map(formatCategory);
}

export async function getCategoryBySlug(slug: string) {
  const row = await db.query.categories.findFirst({
    where: eq(categories.slug, slug),
  });

  if (!row) return null;

  return {
    _id: String(row.id),
    title: row.title,
    slug: { current: row.slug },
    description: row.description || undefined,
    image: row.imageUrl
      ? { asset: { url: row.imageUrl }, alt: row.title }
      : undefined,
  };
}

export async function getAllCategorySlugs() {
  const rows = await db.query.categories.findMany({
    where: isNull(categories.parentId),
    columns: { slug: true },
  });
  return rows.map((r) => r.slug);
}

function formatCategory(row: {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  subcategories?: { id: number; title: string; slug: string; imageUrl: string | null }[];
}) {
  return {
    _id: String(row.id),
    title: row.title,
    slug: { current: row.slug },
    description: row.description || undefined,
    image: row.imageUrl
      ? { asset: { url: row.imageUrl }, alt: row.title }
      : undefined,
    subcategories: row.subcategories?.map((sub) => ({
      _id: String(sub.id),
      title: sub.title,
      slug: { current: sub.slug },
      image: sub.imageUrl
        ? { asset: { url: sub.imageUrl }, alt: sub.title }
        : undefined,
    })),
  };
}
