import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { safeFetch } from "@sanity/lib/client";
import { BEST_SELLERS_QUERY, SITE_SETTINGS_QUERY } from "@lib/queries/products";
import { Link } from "@/i18n/navigation";
import { SectionHeader } from "@/components/section-header";
import { HeroSection } from "@/components/hero-section";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ProductCard } from "@/components/product-card";
import { urlForImage } from "@sanity/lib/image";

interface ProductSummary {
  _id: string;
  title: string;
  slug: { current: string };
  price: number;
  priceNote?: string;
  mainImage?: {
    asset?: { url?: string };
    alt?: string;
  };
  category?: { title?: string };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  const [settings, bestSellers] = await Promise.all([
    safeFetch(SITE_SETTINGS_QUERY, { locale }),
    safeFetch(BEST_SELLERS_QUERY, { locale, limit: 6 }),
  ]);

  const products = (bestSellers || []) as ProductSummary[];
  const featureProduct = products[0];
  const bestSellerProducts = products.slice(1, 6);
  const featureImageUrl = featureProduct?.mainImage?.asset
    ? urlForImage(featureProduct.mainImage)?.width(720).height(720).url()
    : null;

  return (
    <>
      <HeroSection
        title={settings?.heroTitle || t("heroTitle")}
        subtitle={settings?.heroSubtitle || t("heroSubtitle")}
        image={settings?.heroImage}
        navLabels={{
          products: t("navProducts"),
          orderFlowers: t("navOrderFlowers"),
          about: t("navAbout"),
          contact: tNav("contact"),
        }}
      />

      <ScrollReveal>
        <section className="bg-[#eef3f7] px-6 py-20 text-center md:py-28">
          <h2 className="mx-auto max-w-3xl font-serif text-4xl italic leading-[0.98] text-black md:text-6xl">
            Hoa Nêu là một studio thiết kế hoa cưới cao cấp, mang phong cách
            tối giản và hiện đại.
          </h2>
          <div className="mx-auto mt-10 flex h-9 w-9 items-center justify-center rounded-full border border-black/35 font-serif text-xl text-black/65">
            ↓
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-20 md:grid-cols-[0.9fr_1.1fr] md:py-28">
          <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-full bg-[#111418]">
            {featureImageUrl ? (
              <Image
                src={featureImageUrl}
                alt={
                  featureProduct?.mainImage?.alt ||
                  featureProduct?.title ||
                  "Hoa Nêu"
                }
                fill
                sizes="(max-width: 768px) 80vw, 420px"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_45%_45%,#ffd7cf_0,#d74c62_20%,#18322e_45%,#111418_70%)]" />
            )}
          </div>
          <div>
            <div className="mb-8 flex justify-end">
              <Link
                href="/san-pham-khac"
                className="rounded-full bg-black px-6 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white hover:bg-hoa-red"
              >
                Xem các tác phẩm
              </Link>
            </div>
            <p className="max-w-xl font-serif text-2xl italic leading-snug text-black md:text-3xl">
              Hiện đại và không ngừng phát triển, chúng tôi kết hợp những giá
              trị truyền thống với ngôn ngữ thiết kế mới để tạo nên những
              khoảnh khắc hoa đáng nhớ.
            </p>
            <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.22em] text-black/45">
              Trusted by the most discerning couples.
            </p>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="bg-[radial-gradient(circle_at_center,#f8f8f8_0,#ececec_38%,#d9d9d9_100%)] px-6 py-20 text-center md:py-28">
          <blockquote className="mx-auto max-w-4xl font-serif text-3xl italic leading-tight text-black md:text-5xl">
            &quot;Một trong những đơn vị thiết kế hoa cưới triển vọng nhất hiện
            nay tại Việt Nam.&quot;
          </blockquote>
          <Link
            href="/lien-he"
            className="mt-10 inline-flex rounded-full bg-white px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-black shadow-sm hover:bg-black hover:text-white"
          >
            Xem báo chí
          </Link>
        </section>
      </ScrollReveal>

      {bestSellerProducts.length > 0 && (
        <ScrollReveal>
          <section className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
            <SectionHeader title={t("bestSellerWeek")} />
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
              {bestSellerProducts.map((product, index) => (
                <ScrollReveal key={product._id} delay={index * 100}>
                  <ProductCard
                    title={product.title}
                    slug={product.slug.current}
                    price={product.price}
                    priceNote={product.priceNote}
                    mainImage={product.mainImage}
                    category={product.category}
                  />
                </ScrollReveal>
              ))}
            </div>
            <div className="mt-16 text-center">
              <Link
                href="/san-pham-khac"
                className="inline-flex rounded-full bg-hoa-red px-9 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-white hover:bg-hoa-red-dark"
              >
                {tCommon("viewAll")} sản phẩm
              </Link>
            </div>
          </section>
        </ScrollReveal>
      )}
    </>
  );
}
