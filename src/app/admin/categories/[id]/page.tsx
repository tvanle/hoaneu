import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@db";
import { categories } from "@db/schema";
import { CategoryForm } from "@/components/admin/category-form";

export const dynamic = "force-dynamic";

export default async function AdminCategoryEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (id === "new") {
    return (
      <div>
        <h1 className="mb-6 text-2xl font-bold">Thêm danh mục mới</h1>
        <CategoryForm />
      </div>
    );
  }

  const categoryId = parseInt(id, 10);
  if (isNaN(categoryId)) notFound();

  const category = await db.query.categories.findFirst({
    where: eq(categories.id, categoryId),
  });

  if (!category) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Sửa: {category.title}</h1>
      <CategoryForm category={category} />
    </div>
  );
}
