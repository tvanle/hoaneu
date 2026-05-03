import { Suspense } from "react";
import { safeFetch } from "@sanity/lib/client";
import {
  PRODUCTS_BY_CATEGORY_QUERY,
  CATEGORY_BY_SLUG_QUERY,
  ALL_CATEGORY_SLUGS_QUERY,
} from "@lib/queries/products";
import type { Category, Product } from "@lib/types";
import { FilterableProductList } from "@/components/filterable-product-list";

export async function generateStaticParams() {
  const slugs = await safeFetch<string[]>(ALL_CATEGORY_SLUGS_QUERY);
  if (!slugs) return [];
  return slugs.map((slug: string) => ({ category: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;
  const category = await safeFetch<Category>(CATEGORY_BY_SLUG_QUERY, {
    slug: categorySlug,
    locale: "vi",
  });

  return {
    title: category?.title || categorySlug,
    description: category?.description || "",
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;

  const [category, products] = await Promise.all([
    safeFetch<Category>(CATEGORY_BY_SLUG_QUERY, {
      slug: categorySlug,
      locale: "vi",
    }),
    safeFetch<Product[]>(PRODUCTS_BY_CATEGORY_QUERY, {
      categorySlug,
      locale: "vi",
    }),
  ]);

  return (
    <div className="mx-auto max-w-[1320px] px-8 py-20 sm:px-12 md:px-20 md:py-28 lg:px-28">
      <div className="mx-auto mb-16 max-w-3xl text-center md:mb-24">
        <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.24em] text-black/35">
          Bộ Sưu Tập Hoa Nêu
        </p>
        <h1 className="font-serif text-4xl leading-tight text-black md:text-6xl">
          {category?.title || categorySlug}
        </h1>
        {category?.description && (
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-black/65">
            {category.description}
          </p>
        )}
      </div>

      <Suspense
        fallback={
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-black/40">
            Hiển thị 0 sản phẩm
          </p>
        }
      >
        <FilterableProductList products={products || []} />
      </Suspense>
    </div>
  );
}
