import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getProductsByCategory } from "@db/queries/products";
import { getCategoryBySlug, getAllCategorySlugs } from "@db/queries/categories";
import type { Product } from "@lib/types";
import { FilterableProductList } from "@/components/filterable-product-list";
import { ProductGrid } from "@/components/product-grid";

export async function generateStaticParams() {
  const slugs = await getAllCategorySlugs();
  return slugs.map((slug) => ({ category: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;
  const category = await getCategoryBySlug(categorySlug);

  if (!category) return {};

  return {
    title: category.title,
    description: category.description || undefined,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;

  const [category, products] = await Promise.all([
    getCategoryBySlug(categorySlug),
    getProductsByCategory(categorySlug),
  ]);

  if (!category) notFound();

  return (
    <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 md:px-10 md:py-28 lg:px-12">
      <div className="mx-auto mb-16 max-w-3xl text-center md:mb-24">
        <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.24em] text-black/35">
          Bộ Sưu Tập Hoa Nêu
        </p>
        <h1 className="font-serif text-4xl leading-tight text-black md:text-6xl">
          {category.title}
        </h1>
        {category.description && (
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-black/65">
            {category.description}
          </p>
        )}
      </div>

      <Suspense fallback={<ProductGrid products={products as unknown as Product[]} />}>
        <FilterableProductList products={products as unknown as Product[]} />
      </Suspense>
    </div>
  );
}
