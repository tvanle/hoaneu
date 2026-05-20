"use client";

import { useState, useMemo, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { ProductCard } from "./product-card";
import { ProductFilter } from "./product-filter";

interface Product {
  _id: string;
  title: string;
  slug: { current: string };
  price: number;
  priceNote?: string;
  description?: string;
  mainImage?: { asset?: { url?: string }; alt?: string };
  colorTones?: string[];
  flowerTypes?: string[];
  category?: { _id?: string; title?: string; slug?: { current?: string } };
}

interface FilterableProductListProps {
  products: Product[];
}

export function FilterableProductList({
  products,
}: FilterableProductListProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [priceRange, setPriceRange] = useState<string | null>(
    searchParams.get("price"),
  );
  const [colorTones, setColorTones] = useState<string[]>(
    searchParams.get("colors")?.split(",").filter(Boolean) || [],
  );
  const [flowerTypes, setFlowerTypes] = useState<string[]>(
    searchParams.get("flowers")?.split(",").filter(Boolean) || [],
  );
  const [shapes, setShapes] = useState<string[]>(
    searchParams.get("shapes")?.split(",").filter(Boolean) || [],
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const updateUrl = useCallback(
    (price: string | null, colors: string[], flowers: string[], shp: string[]) => {
      const params = new URLSearchParams();
      if (price) params.set("price", price);
      if (colors.length > 0) params.set("colors", colors.join(","));
      if (flowers.length > 0) params.set("flowers", flowers.join(","));
      if (shp.length > 0) params.set("shapes", shp.join(","));
      const query = params.toString();
      router.replace(`${pathname}${query ? `?${query}` : ""}`, {
        scroll: false,
      });
    },
    [router, pathname],
  );

  const handlePriceChange = useCallback(
    (value: string | null) => {
      setPriceRange(value);
      updateUrl(value, colorTones, flowerTypes, shapes);
    },
    [colorTones, flowerTypes, shapes, updateUrl],
  );

  const handleColorToggle = useCallback(
    (value: string) => {
      const next = colorTones.includes(value)
        ? colorTones.filter((c) => c !== value)
        : [...colorTones, value];
      setColorTones(next);
      updateUrl(priceRange, next, flowerTypes, shapes);
    },
    [colorTones, priceRange, flowerTypes, shapes, updateUrl],
  );

  const handleFlowerToggle = useCallback(
    (value: string) => {
      const next = flowerTypes.includes(value)
        ? flowerTypes.filter((f) => f !== value)
        : [...flowerTypes, value];
      setFlowerTypes(next);
      updateUrl(priceRange, colorTones, next, shapes);
    },
    [flowerTypes, priceRange, colorTones, shapes, updateUrl],
  );

  const handleShapeToggle = useCallback(
    (value: string) => {
      const next = shapes.includes(value)
        ? shapes.filter((s) => s !== value)
        : [...shapes, value];
      setShapes(next);
      updateUrl(priceRange, colorTones, flowerTypes, next);
    },
    [shapes, priceRange, colorTones, flowerTypes, updateUrl],
  );

  const handleClearAll = useCallback(() => {
    setPriceRange(null);
    setColorTones([]);
    setFlowerTypes([]);
    setShapes([]);
    router.replace(pathname, { scroll: false });
  }, [router, pathname]);

  const filtered = useMemo(() => {
    return products.filter((product) => {
      if (priceRange) {
        const [min, max] = priceRange.split("-").map(Number);
        if (product.price < min || product.price > max) return false;
      }

      if (colorTones.length > 0) {
        if (!product.colorTones?.some((c) => colorTones.includes(c)))
          return false;
      }

      if (flowerTypes.length > 0) {
        if (!product.flowerTypes?.some((f) => flowerTypes.includes(f)))
          return false;
      }

      if (shapes.length > 0) {
        // Kiểu dáng is currently stored in description; one product may carry
        // multiple shapes separated by commas, e.g. "Bó dáng rủ, Bó dáng ngắn".
        const productShapes = (product.description || "")
          .split(",")
          .map((s) => s.trim());
        if (!productShapes.some((s) => shapes.includes(s))) return false;
      }

      return true;
    });
  }, [products, priceRange, colorTones, flowerTypes, shapes]);

  const activeFilterCount =
    (priceRange ? 1 : 0) +
    colorTones.length +
    flowerTypes.length +
    shapes.length;

  const filterContent = (
    <ProductFilter
      priceRange={priceRange}
      colorTones={colorTones}
      flowerTypes={flowerTypes}
      shapes={shapes}
      onPriceChange={handlePriceChange}
      onColorToggle={handleColorToggle}
      onFlowerToggle={handleFlowerToggle}
      onShapeToggle={handleShapeToggle}
      onClearAll={handleClearAll}
    />
  );

  return (
    <>
      <div className="mb-12 flex items-center justify-between border-y border-black/10 py-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-black/40">
          Hiển thị {filtered.length} sản phẩm
        </p>
        <button
          onClick={() => setIsFilterOpen(true)}
          className="inline-flex items-center gap-3 rounded-full border border-black/20 px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.18em] transition-colors hover:border-hoa-red hover:text-hoa-red"
        >
          Bộ Lọc
          {activeFilterCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-hoa-red text-xs text-white">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {isFilterOpen && (
        <div className="fixed inset-0 z-50">
          <button
            aria-label="Đóng bộ lọc"
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsFilterOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 flex w-full max-w-sm flex-col bg-white shadow-2xl">
            <header className="flex items-start justify-between border-b border-black/10 px-7 pb-5 pt-7">
              <div>
                <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.24em] text-black/35">
                  Cửa Hàng
                </p>
                <h2 className="font-serif text-3xl italic leading-none text-black">
                  Bộ Lọc
                </h2>
              </div>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-base text-black/55 transition-all hover:border-hoa-red hover:bg-hoa-red hover:text-white"
                aria-label="Đóng bộ lọc"
              >
                ×
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-7 py-7 pb-32">
              {filterContent}
            </div>

            <div className="sticky bottom-0 left-0 right-0 border-t border-black/10 bg-white/95 px-7 py-4 backdrop-blur">
              <button
                onClick={() => setIsFilterOpen(false)}
                className="flex w-full items-center justify-center rounded-full bg-hoa-red px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white shadow-sm transition-colors hover:bg-hoa-red-dark"
              >
                Xem kết quả ({filtered.length})
              </button>
            </div>
          </aside>
        </div>
      )}

      <div>
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-3 xl:grid-cols-3 2xl:gap-x-8">
            {filtered.map((product) => (
              <ProductCard
                key={product._id}
                title={product.title}
                slug={product.slug.current}
                price={product.price}
                priceNote={product.priceNote}
                mainImage={product.mainImage}
              />
            ))}
          </div>
        ) : (
          <div className="border border-black/10 py-20 text-center">
            <p className="font-serif text-2xl italic text-black/60">
              Không tìm thấy sản phẩm phù hợp
            </p>
          </div>
        )}
      </div>
    </>
  );
}
