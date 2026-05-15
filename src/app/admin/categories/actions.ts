"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq, count } from "drizzle-orm";
import { db } from "@db";
import { categories, products } from "@db/schema";

export async function createCategory(formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const description = (formData.get("description") as string) || null;
  const order = parseInt(formData.get("order") as string, 10) || 0;

  await db.insert(categories).values({ title, slug, description, order });

  revalidatePath("/");
  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

export async function updateCategory(id: number, formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const description = (formData.get("description") as string) || null;
  const order = parseInt(formData.get("order") as string, 10) || 0;

  await db
    .update(categories)
    .set({ title, slug, description, order, updatedAt: new Date() })
    .where(eq(categories.id, id));

  revalidatePath("/");
  revalidatePath(`/${slug}`);
  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

export async function deleteCategory(id: number) {
  const productCount = await db
    .select({ count: count() })
    .from(products)
    .where(eq(products.categoryId, id));

  if (productCount[0].count > 0) {
    throw new Error("Không thể xóa danh mục có sản phẩm");
  }

  await db.delete(categories).where(eq(categories.id, id));

  revalidatePath("/");
  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}
