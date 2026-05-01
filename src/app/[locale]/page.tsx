import { getTranslations } from "next-intl/server";
import { safeFetch } from "@sanity/lib/client";
import {
  BEST_SELLERS_QUERY,
  ALL_CATEGORIES_QUERY,
  SITE_SETTINGS_QUERY,
} from "@lib/queries/products";
import { ProductCarousel } from "@/components/product-carousel";
import { CategoryCard } from "@/components/category-card";
import { SectionHeader } from "@/components/section-header";
import { HeroSection } from "@/components/hero-section";
import { ContactCtaSection } from "@/components/contact-cta-section";
import { ScrollReveal } from "@/components/scroll-reveal";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  const [settings, bestSellers, categories] = await Promise.all([
    safeFetch(SITE_SETTINGS_QUERY, { locale }),
    safeFetch(BEST_SELLERS_QUERY, { locale, limit: 6 }),
    safeFetch(ALL_CATEGORIES_QUERY, { locale }),
  ]);

  return (
    <>
      <HeroSection
        title={settings?.heroTitle || t("heroTitle")}
        subtitle={settings?.heroSubtitle || t("heroSubtitle")}
        image={settings?.heroImage}
      />

      {bestSellers && bestSellers.length > 0 && (
        <ScrollReveal>
          <section className="max-w-7xl mx-auto px-4 md:px-12 py-16 md:py-24">
            <SectionHeader title={t("bestSellerWeek")} />
            <ProductCarousel products={bestSellers} />
          </section>
        </ScrollReveal>
      )}

      {categories && categories.length > 0 && (
        <ScrollReveal>
          <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
            <SectionHeader
              title={t("categories")}
              viewAllHref="/san-pham-khac"
              viewAllLabel={tCommon("viewAll")}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {categories.map(
                (category: {
                  _id: string;
                  title: string;
                  slug: { current: string };
                  image?: { asset?: { url?: string }; alt?: string };
                }, i: number) => (
                  <ScrollReveal key={category._id} delay={i * 100}>
                    <CategoryCard
                      title={category.title}
                      slug={category.slug.current}
                      image={category.image}
                    />
                  </ScrollReveal>
                ),
              )}
            </div>
          </section>
        </ScrollReveal>
      )}

      <ScrollReveal>
        <ContactCtaSection />
      </ScrollReveal>
    </>
  );
}
