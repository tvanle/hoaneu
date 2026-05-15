import { eq, desc, asc, ne, and } from "drizzle-orm";
import { db } from "..";
import { products, productImages, categories } from "../schema";

export async function getAllProducts() {
  const rows = await db.query.products.findMany({
    orderBy: [desc(products.createdAt)],
    with: {
      category: true,
      images: {
        orderBy: [asc(productImages.order)],
      },
    },
  });

  return rows.map(formatProduct);
}

export async function getProductsByCategory(categorySlug: string) {
  const category = await db.query.categories.findFirst({
    where: eq(categories.slug, categorySlug),
  });

  if (!category) return [];

  const rows = await db.query.products.findMany({
    where: eq(products.categoryId, category.id),
    orderBy: [desc(products.createdAt)],
    with: {
      category: true,
      images: {
        orderBy: [asc(productImages.order)],
      },
    },
  });

  return rows.map(formatProduct);
}

export async function getProductBySlug(slug: string) {
  const row = await db.query.products.findFirst({
    where: eq(products.slug, slug),
    with: {
      category: true,
      images: {
        orderBy: [asc(productImages.order)],
      },
    },
  });

  if (!row) return null;
  return formatProductFull(row);
}

export async function getBestSellers(limit = 6) {
  const rows = await db.query.products.findMany({
    where: eq(products.isBestSeller, true),
    orderBy: [asc(products.bestSellerOrder)],
    limit,
    with: {
      category: true,
      images: {
        orderBy: [asc(productImages.order)],
      },
    },
  });

  return rows.map(formatProduct);
}

export async function getRelatedProducts(
  categoryId: number,
  excludeProductId: number,
  limit = 4,
) {
  const rows = await db.query.products.findMany({
    where: and(
      eq(products.categoryId, categoryId),
      ne(products.id, excludeProductId),
    ),
    limit,
    with: {
      images: {
        orderBy: [asc(productImages.order)],
      },
    },
  });

  return rows.map(formatProduct);
}

export async function getAllProductSlugs() {
  const rows = await db.query.products.findMany({
    columns: { slug: true },
  });
  return rows.map((r) => r.slug);
}

// Format product for frontend compatibility (matches old Sanity shape)
function getMainImage(images: typeof productImages.$inferSelect[]) {
  const main = images.find((img) => img.isMain);
  const first = images[0];
  const img = main || first;
  if (!img) return undefined;
  return { asset: { url: img.url }, alt: img.alt || undefined };
}

function getGalleryImages(images: typeof productImages.$inferSelect[]) {
  return images
    .filter((img) => !img.isMain)
    .map((img) => ({ asset: { url: img.url }, alt: img.alt || undefined }));
}

function formatProduct(row: {
  id: number;
  title: string;
  slug: string;
  price: number;
  priceNote: string | null;
  colorTones: string[] | null;
  flowerTypes: string[] | null;
  isBestSeller: boolean;
  category?: { id: number; title: string; slug: string } | null;
  images: typeof productImages.$inferSelect[];
}) {
  return {
    _id: String(row.id),
    title: row.title,
    slug: { current: row.slug },
    price: row.price,
    priceNote: row.priceNote || undefined,
    mainImage: getMainImage(row.images),
    colorTones: row.colorTones || undefined,
    flowerTypes: row.flowerTypes || undefined,
    isBestSeller: row.isBestSeller,
    category: row.category
      ? {
          _id: String(row.category.id),
          title: row.category.title,
          slug: { current: row.category.slug },
        }
      : undefined,
  };
}

function formatProductFull(row: {
  id: number;
  title: string;
  slug: string;
  price: number;
  priceNote: string | null;
  description: string | null;
  colorTones: string[] | null;
  flowerTypes: string[] | null;
  isBestSeller: boolean;
  category?: { id: number; title: string; slug: string } | null;
  images: typeof productImages.$inferSelect[];
}) {
  return {
    _id: String(row.id),
    title: row.title,
    slug: { current: row.slug },
    price: row.price,
    priceNote: row.priceNote || undefined,
    description: row.description || undefined,
    mainImage: getMainImage(row.images),
    images: getGalleryImages(row.images),
    colorTones: row.colorTones || undefined,
    flowerTypes: row.flowerTypes || undefined,
    isBestSeller: row.isBestSeller,
    category: row.category
      ? {
          _id: String(row.category.id),
          title: row.category.title,
          slug: { current: row.category.slug },
        }
      : undefined,
  };
}
