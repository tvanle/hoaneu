import { notFound } from "next/navigation";
import { eq, asc } from "drizzle-orm";
import { db } from "@db";
import { products, productImages, categories } from "@db/schema";
import { ProductForm } from "@/components/admin/product-form";

export const dynamic = "force-dynamic";

export default async function AdminProductEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const allCategories = await db.query.categories.findMany({
    orderBy: [asc(categories.order)],
  });

  if (id === "new") {
    return (
      <div>
        <h1 className="mb-6 text-2xl font-bold">Thêm sản phẩm mới</h1>
        <ProductForm categories={allCategories} />
      </div>
    );
  }

  const productId = parseInt(id, 10);
  if (isNaN(productId)) notFound();

  const product = await db.query.products.findFirst({
    where: eq(products.id, productId),
    with: {
      images: {
        orderBy: [asc(productImages.order)],
      },
    },
  });

  if (!product) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Sửa: {product.title}</h1>
      <ProductForm product={product} categories={allCategories} />
    </div>
  );
}
