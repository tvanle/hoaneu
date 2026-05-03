import { safeFetch } from "@sanity/lib/client";
import { BEST_SELLERS_QUERY } from "@lib/queries/products";
import { ProductCard } from "@/components/product-card";
import { ScrollReveal } from "@/components/scroll-reveal";

export const metadata = {
  title: "Đặt Hoa",
  description: "Đặt hoa tươi tại Hoa Nêu",
};

export default async function OrderFlowersPage() {
  const products = await safeFetch(BEST_SELLERS_QUERY, {
    locale: "vi",
    limit: 6,
  });

  return (
    <>
      <section className="mx-auto max-w-4xl px-6 pb-20 pt-14 text-center md:pb-28 md:pt-20">
        <ScrollReveal>
          <h1 className="mb-12 font-serif text-5xl italic leading-tight text-black md:text-7xl">
            Đặt Hoa
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <p className="mx-auto mb-8 max-w-3xl text-lg leading-8 text-[#152032]">
            Hoa Nêu chuyên cung cấp hoa cưới cầm tay, trang trí tiệc cưới, và
            các dịch vụ hoa tươi cho mọi dịp đặc biệt. Chúng tôi nhận đặt hoa
            từ thứ Hai đến thứ Bảy hàng tuần. Vui lòng liên hệ trước ít nhất 3
            ngày để chúng tôi chuẩn bị hoa đẹp nhất cho bạn.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="mx-auto mb-12 max-w-3xl font-serif text-xl italic leading-9 text-[#152032]">
            Đối với đơn hàng sự kiện hoặc đơn hàng đặc biệt, vui lòng liên hệ
            trực tiếp để được tư vấn chi tiết!
          </p>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <div className="space-y-7 pt-4 text-[13px] font-extrabold uppercase tracking-[0.16em] text-[#101827]">
            <p>
              Tết Nguyên Đán 2026: Rất tiếc năm nay chúng tôi không nhận đặt
              hoa Tết.
            </p>
            <p>
              Chúng tôi sẽ đi công tác cho một sự kiện tại địa phương khác. :(
            </p>
          </div>
        </ScrollReveal>
      </section>

      {products && products.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pb-24 md:px-8 md:pb-32 lg:px-10">
          <div className="grid grid-cols-1 gap-x-5 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {products.map(
              (
                product: {
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
                },
                i: number,
              ) => (
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
