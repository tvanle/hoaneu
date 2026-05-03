"use client";

import { useState, useMemo, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { ProductCard } from "./product-card";
import { ProductFilter } from "./product-filter";

interface Product {
  _id: string;
  title: string;
  slug: { current: string };
  price: number;
  priceNote?: string;
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
  const t = useTranslations("catalog");
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
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const updateUrl = useCallback(
    (price: string | null, colors: string[], flowers: string[]) => {
      const params = new URLSearchParams();
      if (price) params.set("price", price);
      if (colors.length > 0) params.set("colors", colors.join(","));
      if (flowers.length > 0) params.set("flowers", flowers.join(","));
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
      updateUrl(value, colorTones, flowerTypes);
    },
    [colorTones, flowerTypes, updateUrl],
  );

  const handleColorToggle = useCallback(
    (value: string) => {
      const next = colorTones.includes(value)
        ? colorTones.filter((c) => c !== value)
        : [...colorTones, value];
      setColorTones(next);
      updateUrl(priceRange, next, flowerTypes);
    },
    [colorTones, priceRange, flowerTypes, updateUrl],
  );

  const handleFlowerToggle = useCallback(
    (value: string) => {
      const next = flowerTypes.includes(value)
        ? flowerTypes.filter((f) => f !== value)
        : [...flowerTypes, value];
      setFlowerTypes(next);
      updateUrl(priceRange, colorTones, next);
    },
    [flowerTypes, priceRange, colorTones, updateUrl],
  );

  const handleClearAll = useCallback(() => {
    setPriceRange(null);
    setColorTones([]);
    setFlowerTypes([]);
    router.replace(pathname, { scroll: false });
  }, [router, pathname]);

  const filtered = useMemo(() => {
    return products.filter((product) => {
      if (priceRange) {
        const [min, max] = priceRange.split("-").map(Number);
        if (product.price < min || product.price > max) return false;
      }

      if (colorTones.length > 0) {
        if (
          !product.colorTones?.some((c: string) => colorTones.includes(c))
        )
          return false;
      }

      if (flowerTypes.length > 0) {
        if (
          !product.flowerTypes?.some((f: string) => flowerTypes.includes(f))
        )
          return false;
      }

      return true;
    });
  }, [products, priceRange, colorTones, flowerTypes]);

  const activeFilterCount =
    (priceRange ? 1 : 0) + colorTones.length + flowerTypes.length;

  const filterContent = (
    <ProductFilter
      priceRange={priceRange}
      colorTones={colorTones}
      flowerTypes={flowerTypes}
      onPriceChange={handlePriceChange}
      onColorToggle={handleColorToggle}
      onFlowerToggle={handleFlowerToggle}
      onClearAll={handleClearAll}
    />
  );

  return (
    <>
      <div className="mb-12 flex items-center justify-between border-y border-black/10 py-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-black/40">
          {t("showingResults", { count: filtered.length })}
        </p>
        <button
          onClick={() => setIsFilterOpen(true)}
          className="inline-flex items-center gap-3 border border-black/20 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.18em] transition-colors hover:border-hoa-red hover:text-hoa-red"
        >
          {t("filterTitle")}
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
            aria-label="Close filters"
            className="absolute inset-0 bg-black/35"
            onClick={() => setIsFilterOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-full max-w-sm overflow-y-auto bg-white p-8 shadow-2xl">
            <div className="mb-10 flex items-center justify-between">
              <h2 className="font-serif text-3xl">{t("filterTitle")}</h2>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="flex h-9 w-9 items-center justify-center border border-black/15 text-xl leading-none transition-colors hover:border-hoa-red hover:text-hoa-red"
                aria-label="Close filters"
              >
                ×
              </button>
            </div>
            {filterContent}
          </aside>
        </div>
      )}

      <div>
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-7 gap-y-16 md:grid-cols-3 xl:grid-cols-4">
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
              {t("noResults")}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
