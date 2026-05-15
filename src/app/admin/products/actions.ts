"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@db";
import { products, productImages } from "@db/schema";

export async function createProduct(formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const price = parseInt(formData.get("price") as string, 10);
  const priceNote = (formData.get("priceNote") as string) || null;
  const description = (formData.get("description") as string) || null;
  const categoryId = parseInt(formData.get("categoryId") as string, 10);
  const colorTones = formData.getAll("colorTones") as string[];
  const flowerTypes = formData.getAll("flowerTypes") as string[];
  const isBestSeller = formData.get("isBestSeller") === "on";
  const bestSellerOrder = formData.get("bestSellerOrder")
    ? parseInt(formData.get("bestSellerOrder") as string, 10)
    : null;

  const [product] = await db
    .insert(products)
    .values({
      title,
      slug,
      price,
      priceNote,
      description,
      categoryId,
      colorTones: colorTones.length > 0 ? colorTones : null,
      flowerTypes: flowerTypes.length > 0 ? flowerTypes : null,
      isBestSeller,
      bestSellerOrder,
    })
    .returning();

  revalidatePath("/");
  revalidatePath("/admin/products");
  redirect(`/admin/products/${product.id}`);
}

export async function updateProduct(id: number, formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const price = parseInt(formData.get("price") as string, 10);
  const priceNote = (formData.get("priceNote") as string) || null;
  const description = (formData.get("description") as string) || null;
  const categoryId = parseInt(formData.get("categoryId") as string, 10);
  const colorTones = formData.getAll("colorTones") as string[];
  const flowerTypes = formData.getAll("flowerTypes") as string[];
  const isBestSeller = formData.get("isBestSeller") === "on";
  const bestSellerOrder = formData.get("bestSellerOrder")
    ? parseInt(formData.get("bestSellerOrder") as string, 10)
    : null;

  await db
    .update(products)
    .set({
      title,
      slug,
      price,
      priceNote,
      description,
      categoryId,
      colorTones: colorTones.length > 0 ? colorTones : null,
      flowerTypes: flowerTypes.length > 0 ? flowerTypes : null,
      isBestSeller,
      bestSellerOrder,
      updatedAt: new Date(),
    })
    .where(eq(products.id, id));

  revalidatePath("/");
  revalidatePath(`/san-pham/${slug}`);
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function deleteProduct(id: number) {
  const product = await db.query.products.findFirst({
    where: eq(products.id, id),
  });

  await db.delete(productImages).where(eq(productImages.productId, id));
  await db.delete(products).where(eq(products.id, id));

  revalidatePath("/");
  if (product) revalidatePath(`/san-pham/${product.slug}`);
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function addProductImage(
  productId: number,
  url: string,
  alt: string,
  isMain: boolean,
) {
  if (isMain) {
    await db
      .update(productImages)
      .set({ isMain: false })
      .where(eq(productImages.productId, productId));
  }

  const maxOrder = await db.query.productImages.findFirst({
    where: eq(productImages.productId, productId),
    orderBy: (img, { desc }) => [desc(img.order)],
  });

  await db.insert(productImages).values({
    productId,
    url,
    alt: alt || null,
    isMain,
    order: (maxOrder?.order ?? -1) + 1,
  });

  revalidatePath("/admin/products");
}

export async function deleteProductImage(imageId: number) {
  await db.delete(productImages).where(eq(productImages.id, imageId));
  revalidatePath("/admin/products");
}

export async function setMainImage(productId: number, imageId: number) {
  await db
    .update(productImages)
    .set({ isMain: false })
    .where(eq(productImages.productId, productId));

  await db
    .update(productImages)
    .set({ isMain: true })
    .where(eq(productImages.id, imageId));

  revalidatePath("/admin/products");
}
