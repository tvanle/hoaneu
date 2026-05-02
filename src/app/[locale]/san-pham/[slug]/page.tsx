import { PortableText } from "@portabletext/react";
import { safeFetch } from "@sanity/lib/client";
import {
  PRODUCT_BY_SLUG_QUERY,
  RELATED_PRODUCTS_QUERY,
  ALL_PRODUCT_SLUGS_QUERY,
} from "@lib/queries/products";
import { ProductImageGallery } from "@/components/product-image-gallery";
import { ContactCta } from "@/components/contact-cta";
import { ProductCard } from "@/components/product-card";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const slugs = await safeFetch<string[]>(ALL_PRODUCT_SLUGS_QUERY);
  if (!slugs) return [];
  return routing.locales.flatMap((locale) =>
    slugs.map((slug: string) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const product = await safeFetch(PRODUCT_BY_SLUG_QUERY, {
    slug,
    locale,
  });

  return {
    title: product?.title,
    description: product?.title
      ? `${product.title} - Hoa Nêu`
      : "Hoa Nêu",
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "product" });
  const tNav = await getTranslations({ locale, namespace: "nav" });

  const product = await safeFetch(PRODUCT_BY_SLUG_QUERY, {
    slug,
    locale,
  });

  if (!product) {
    notFound();
  }

  const relatedProducts = product.category?._id
    ? await safeFetch(RELATED_PRODUCTS_QUERY, {
        categoryId: product.category._id,
        currentId: product._id,
        locale,
      })
    : [];

  const productUrl = `https://hoaneu.com/san-pham/${slug}`;

  return (
    <div className="mx-auto max-w-[1500px] px-6 py-12 md:px-8 md:py-20">
      <nav className="mb-10 flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-black/35">
        <Link href="/" className="transition-colors hover:text-hoa-black">
          {tNav("home")}
        </Link>
        <span>/</span>
        {product.category && (
          <>
            <Link
              href={`/${product.category.slug?.current}`}
              className="transition-colors hover:text-hoa-black"
            >
              {product.category.title}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-black/65">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <ProductImageGallery
          mainImage={product.mainImage}
          images={product.images}
          title={product.title}
        />

        <div className="lg:pt-10">
          {product.category && (
            <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.22em] text-black/35">
              {product.category.title}
            </p>
          )}
          <h1 className="font-serif text-5xl italic leading-tight text-black md:text-7xl">
            {product.title}
          </h1>
          <p className="mt-7 text-2xl text-black">
            {product.priceNote && (
              <span className="mr-2 text-sm text-black/45">
                {product.priceNote}
              </span>
            )}
            {product.price?.toLocaleString("vi-VN")}₫
          </p>

          {product.description && (
            <div className="mt-8 max-w-xl text-base leading-8 text-black/60">
              <PortableText value={product.description} />
            </div>
          )}

          {product.colorTones && product.colorTones.length > 0 && (
            <div className="mt-8">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-black/35">
                Tone màu
              </p>
              <div className="flex flex-wrap gap-2">
                {product.colorTones.map((tone: string) => (
                  <span
                    key={tone}
                    className="rounded-full border border-black/15 px-3 py-1.5 text-xs capitalize text-black/65"
                  >
                    {tone}
                  </span>
                ))}
              </div>
            </div>
          )}

          {product.flowerTypes && product.flowerTypes.length > 0 && (
            <div className="mt-6">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-black/35">
                Loại hoa
              </p>
              <div className="flex flex-wrap gap-2">
                {product.flowerTypes.map((type: string) => (
                  <span
                    key={type}
                    className="rounded-full border border-black/15 px-3 py-1.5 text-xs capitalize text-black/65"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-10 border-t border-black/10 pt-8">
            <ContactCta
              productName={product.title}
              productUrl={productUrl}
            />
          </div>
        </div>
      </div>

      {relatedProducts && relatedProducts.length > 0 && (
        <section className="mt-20 border-t border-black/10 pt-16 md:mt-28 md:pt-20">
          <h2 className="mb-10 text-center font-serif text-3xl italic md:text-4xl">
            {t("relatedProducts")}
          </h2>
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map(
              (related: {
                _id: string;
                title: string;
                slug: { current: string };
                price: number;
                mainImage?: { asset?: { url?: string }; alt?: string };
              }) => (
                <ProductCard
                  key={related._id}
                  title={related.title}
                  slug={related.slug.current}
                  price={related.price}
                  mainImage={related.mainImage}
                />
              ),
            )}
          </div>
        </section>
      )}
    </div>
  );
}
