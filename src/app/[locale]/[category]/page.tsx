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
    <div className="mx-auto max-w-[1500px] px-6 py-16 md:px-8 md:py-24">
      <div className="mx-auto mb-14 max-w-3xl text-center md:mb-20">
        <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.24em] text-black/35">
          Hoa Nêu Collection
        </p>
        <h1 className="font-serif text-5xl italic leading-tight text-black md:text-7xl">
          {category?.title || categorySlug}
        </h1>
        {category?.description && (
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-black/55">
            {category.description}
          </p>
        )}
      </div>

      <Suspense
        fallback={
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-black/40">
            {t("showingResults", { count: 0 })}
          </p>
        }
      >
        <FilterableProductList products={products || []} />
      </Suspense>
    </div>
  );
}
