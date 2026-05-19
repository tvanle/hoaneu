import { getProductBySlug, getRelatedProducts, getAllProductSlugs } from "@db/queries/products";
import { getSiteSettings } from "@db/queries/settings";
import { ProductImageGallery } from "@/components/product-image-gallery";
import { ContactCta } from "@/components/contact-cta";
import { ProductCard } from "@/components/product-card";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

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
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [product, settings] = await Promise.all([
    getProductBySlug(slug),
    getSiteSettings(),
  ]);

  if (!product) {
    notFound();
  }

  const relatedProducts = product.category?._id
    ? await getRelatedProducts(
        parseInt(product.category._id, 10),
        parseInt(product._id, 10),
      )
    : [];

  const productUrl = `https://hoaneu.com/san-pham/${slug}`;
  const flowerTypes = product.flowerTypes?.join(", ") || "Theo mùa";
  const colorTones = product.colorTones?.join(", ") || "Tùy chỉnh";
  const collection = product.category?.title || "Hoa Nêu";
  const detailRows = [
    { label: "Hoa chính", value: flowerTypes },
    { label: "Tone màu", value: colorTones },
    { label: "Bộ sưu tập", value: collection },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 md:px-8 md:py-16 lg:px-10">
      <nav className="mb-7 flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-black/35">
        <Link href="/" className="transition-colors hover:text-hoa-black">
          Trang Chủ
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

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.05fr_0.75fr] lg:gap-10 xl:gap-12">
        <ProductImageGallery
          mainImage={product.mainImage}
          images={product.images}
          title={product.title}
        />

        <div className="lg:pt-6">
          {product.category && (
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-black/35">
              {product.category.title}
            </p>
          )}
          <h1 className="font-serif text-3xl leading-[0.98] text-black md:text-5xl">
            {product.title}
          </h1>
          <p className="mt-5 font-serif text-2xl text-hoa-red md:text-[2rem]">
            {product.priceNote && (
              <span className="mr-2 font-sans text-xs text-black/45 md:text-sm">
                {product.priceNote}
              </span>
            )}
            {product.price?.toLocaleString("vi-VN")} VND
          </p>

          {product.description && (
            <div className="mt-5 max-w-lg text-[13px] leading-7 text-black/60">
              <p>{product.description}</p>
            </div>
          )}

          <div className="mt-10 border-y border-black/10 py-5">
            <div className="space-y-5">
              {detailRows.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-[104px_1fr] gap-5 text-sm"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-black/35">
                    {row.label}
                  </p>
                  <p className="capitalize text-[13px] leading-6 text-black/70">
                    {row.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 border border-black/10 bg-black/[0.025] p-5 md:p-6">
            <p className="font-serif text-[15px] italic leading-7 text-black/60">
              &quot;Mỗi thiết kế {product.title} được tuyển chọn theo mùa hoa,
              xử lý thủ công và hoàn thiện theo tinh thần tối giản của Hoa
              Nêu.&quot;
            </p>
          </div>

          <div className="mt-6">
            <ContactCta
              productName={product.title}
              productUrl={productUrl}
              instagramUrl={settings?.instagramUrl}
            />
          </div>
        </div>
      </div>

      <section className="mt-20 grid grid-cols-1 gap-10 border-t border-black/10 pt-12 md:grid-cols-[1fr_0.8fr] md:gap-16 md:pt-14">
        <div>
          <h2 className="mb-6 font-serif text-[1.15rem]">Nghệ Thuật & Tuyển Chọn</h2>
          <p className="max-w-xl text-[13px] leading-7 text-black/60">
            Hoa Nêu lựa chọn hoa theo mùa, kiểm tra độ nở và phối màu thủ công
            để mỗi thiết kế giữ được sự cân bằng giữa form dáng, chất liệu và
            cảm xúc của dịp sử dụng.
          </p>
        </div>
        <div className="bg-black/[0.04] p-6 md:p-7">
          <h3 className="mb-6 text-[11px] font-semibold uppercase tracking-[0.24em] text-black/45">
            Lưu ý & bảo quản
          </h3>
          <ul className="space-y-3 text-[13px] leading-7 text-black/60">
            <li>Hoa tươi là sản phẩm tự nhiên, độ nở có thể thay đổi nhẹ.</li>
            <li>Tránh nắng trực tiếp hoặc nhiệt độ quá cao.</li>
            <li>Giữ cuống hoa ẩm và đặt ở nơi thoáng mát.</li>
            <li>Chúng tôi có thể điều chỉnh tone màu theo mùa hoa.</li>
          </ul>
        </div>
      </section>

      {relatedProducts && relatedProducts.length > 0 && (
        <section className="mt-20 border-t border-black/10 pt-12 md:mt-24 md:pt-16">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-hoa-red">
                Bộ Sưu Tập
              </p>
              <h2 className="font-serif text-3xl md:text-4xl">
                Khám Phá Thêm
              </h2>
            </div>
            <Link
              href={
                product.category?.slug?.current
                  ? `/${product.category.slug.current}`
                  : "/san-pham-khac"
              }
              className="hidden text-[10px] font-semibold uppercase tracking-[0.22em] text-hoa-red hover:text-hoa-red-dark md:inline-flex"
            >
              Xem Bộ Sưu Tập
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((related) => (
              <ProductCard
                key={related._id}
                title={related.title}
                slug={related.slug.current}
                price={related.price}
                mainImage={related.mainImage}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
