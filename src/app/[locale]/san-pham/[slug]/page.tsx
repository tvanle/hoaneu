import { PortableText } from "@portabletext/react";
import { sanityClient, safeFetch } from "@sanity/lib/client";
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
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 text-center">
        <p className="text-hoa-gray">Product not found</p>
      </div>
    );
  }

  const relatedProducts = product.category?._id
    ? await safeFetch(RELATED_PRODUCTS_QUERY, {
        categoryId: product.category._id,
        currentId: product._id,
        locale,
      })
    : [];

  const productUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `https://hoaneu.com/san-pham/${slug}`;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
      <nav className="flex items-center gap-2 text-sm text-hoa-gray mb-8">
        <Link href="/" className="hover:text-hoa-black transition-colors">
          {tNav("home")}
        </Link>
        <span>/</span>
        {product.category && (
          <>
            <Link
              href={`/${product.category.slug?.current}`}
              className="hover:text-hoa-black transition-colors"
            >
              {product.category.title}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-hoa-black">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        <ProductImageGallery
          mainImage={product.mainImage}
          images={product.images}
          title={product.title}
        />

        <div className="space-y-6">
          {product.category && (
            <p className="text-xs uppercase tracking-wider text-hoa-gray">
              {product.category.title}
            </p>
          )}
          <h1 className="text-3xl md:text-4xl font-serif">{product.title}</h1>
          <p className="text-2xl">
            {product.priceNote && (
              <span className="text-sm text-hoa-gray mr-1">
                {product.priceNote}
              </span>
            )}
            {product.price.toLocaleString("vi-VN")}₫
          </p>

          {product.description && (
            <div className="prose prose-sm max-w-none text-hoa-gray">
              <PortableText value={product.description} />
            </div>
          )}

          {product.colorTones && product.colorTones.length > 0 && (
            <div>
              <p className="text-xs uppercase tracking-wider text-hoa-gray mb-2">
                Tone màu
              </p>
              <div className="flex flex-wrap gap-2">
                {product.colorTones.map((tone: string) => (
                  <span
                    key={tone}
                    className="px-3 py-1 text-xs border border-gray-200 capitalize"
                  >
                    {tone}
                  </span>
                ))}
              </div>
            </div>
          )}

          {product.flowerTypes && product.flowerTypes.length > 0 && (
            <div>
              <p className="text-xs uppercase tracking-wider text-hoa-gray mb-2">
                Loại hoa
              </p>
              <div className="flex flex-wrap gap-2">
                {product.flowerTypes.map((type: string) => (
                  <span
                    key={type}
                    className="px-3 py-1 text-xs border border-gray-200 capitalize"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="pt-4 border-t">
            <ContactCta
              productName={product.title}
              productUrl={productUrl}
            />
          </div>
        </div>
      </div>

      {relatedProducts && relatedProducts.length > 0 && (
        <section className="mt-16 md:mt-24">
          <h2 className="text-2xl md:text-3xl font-serif mb-8">
            {t("relatedProducts")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
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
