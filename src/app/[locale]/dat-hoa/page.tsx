import { getTranslations } from "next-intl/server";
import { safeFetch } from "@sanity/lib/client";
import { BEST_SELLERS_QUERY } from "@lib/queries/products";
import { ProductCard } from "@/components/product-card";
import { ScrollReveal } from "@/components/scroll-reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "orderFlowers" });

  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function OrderFlowersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "orderFlowers" });

  const products = await safeFetch(BEST_SELLERS_QUERY, { locale, limit: 6 });

  return (
    <>
      <section className="mx-auto max-w-4xl px-6 pb-20 pt-14 text-center md:pb-28 md:pt-20">
        <ScrollReveal>
          <h1 className="mb-12 font-serif text-5xl italic leading-tight text-black md:text-7xl">
            {t("title")}
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <p className="mx-auto mb-8 max-w-3xl text-lg leading-8 text-[#152032]">
            {t("description")}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="mx-auto mb-12 max-w-3xl font-serif text-xl italic leading-9 text-[#152032]">
            {t("customOrder")}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <div className="space-y-7 pt-4 text-[13px] font-extrabold uppercase tracking-[0.16em] text-[#101827]">
            <p>
              Lunar New Year 2026: We are sadly not offering arrangements this
              year.
            </p>
            <p>We will be out of town working on a destination event. :(</p>
          </div>
        </ScrollReveal>
      </section>

      {products && products.length > 0 && (
        <section className="mx-auto max-w-[1500px] px-6 pb-24 md:px-8 md:pb-32">
          <div className="grid grid-cols-1 gap-x-5 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {products.map(
              (product: {
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
              }, i: number) => (
                <ScrollReveal key={product._id} delay={i * 100}>
                  <ProductCard
                    title={product.title}
                    slug={product.slug.current}
                    price={product.price}
                    priceNote={product.priceNote}
                    mainImage={product.mainImage}
                    category={product.category}
                  />
                </ScrollReveal>
              ),
            )}
          </div>
        </section>
      )}
    </>
  );
}
