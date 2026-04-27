import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { safeFetch } from "@sanity/lib/client";
import {
  PRODUCTS_BY_CATEGORY_QUERY,
  CATEGORY_BY_SLUG_QUERY,
  ALL_CATEGORY_SLUGS_QUERY,
} from "@lib/queries/products";
import type { Category, Product } from "@lib/types";
import { FilterableProductList } from "@/components/filterable-product-list";
import { routing } from "@/i18n/routing";

export async function generateStaticParams() {
  const slugs = await safeFetch<string[]>(ALL_CATEGORY_SLUGS_QUERY);
  if (!slugs) return [];
  return routing.locales.flatMap((locale) =>
    slugs.map((slug: string) => ({ locale, category: slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale, category: categorySlug } = await params;
  const category = await safeFetch<Category>(CATEGORY_BY_SLUG_QUERY, {
    slug: categorySlug,
    locale,
  });

  return {
    title: category?.title || categorySlug,
    description: category?.description || "",
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale, category: categorySlug } = await params;
  const t = await getTranslations({ locale, namespace: "catalog" });

  const [category, products] = await Promise.all([
    safeFetch<Category>(CATEGORY_BY_SLUG_QUERY, {
      slug: categorySlug,
      locale,
    }),
    safeFetch<Product[]>(PRODUCTS_BY_CATEGORY_QUERY, {
      categorySlug,
      locale,
    }),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
      <div className="mb-8 md:mb-12">
        <h1 className="text-4xl md:text-5xl font-serif mb-2">
          {category?.title || categorySlug}
        </h1>
        {category?.description && (
          <p className="text-hoa-gray">{category.description}</p>
        )}
      </div>

      <Suspense
        fallback={
          <p className="text-hoa-gray">{t("showingResults", { count: 0 })}</p>
        }
      >
        <FilterableProductList products={products || []} />
      </Suspense>
    </div>
  );
}
