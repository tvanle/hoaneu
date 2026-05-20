import { Suspense } from "react";
import { getAllProducts } from "@db/queries/products";
import type { Product } from "@lib/types";
import { FilterableProductList } from "@/components/filterable-product-list";

export const metadata = {
  title: "Đặt Hoa",
  description: "Bộ sưu tập đầy đủ các thiết kế hoa cưới Hoa Nêu",
};

export default async function OrderFlowersPage() {
  const products = await getAllProducts();

  return (
    <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 md:px-10 md:py-28 lg:px-12">
      <div className="mx-auto mb-16 max-w-3xl text-center md:mb-24">
        <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.24em] text-black/35">
          Bộ Sưu Tập Hoa Nêu
        </p>
        <h1 className="font-serif text-4xl leading-tight text-black md:text-6xl">
          Đặt Hoa
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-black/65">
          Toàn bộ thiết kế của Hoa Nêu — lọc theo mức giá, tone màu, loại hoa
          chính và kiểu dáng. Vui lòng đặt trước ít nhất 7 ngày để có mẫu đẹp
          nhất.
        </p>
      </div>

      <Suspense
        fallback={
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-black/40">
            Hiển thị 0 sản phẩm
          </p>
        }
      >
        <FilterableProductList products={products as unknown as Product[]} />
      </Suspense>
    </div>
  );
}
