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

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-24">
          <ProductFilter
            priceRange={priceRange}
            colorTones={colorTones}
            flowerTypes={flowerTypes}
            onPriceChange={handlePriceChange}
            onColorToggle={handleColorToggle}
            onFlowerToggle={handleFlowerToggle}
            onClearAll={handleClearAll}
          />
        </div>
      </div>

      <div className="lg:hidden">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-sm"
        >
          {t("filterTitle")}
          {activeFilterCount > 0 && (
            <span className="bg-hoa-red text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>
        {isFilterOpen && (
          <div className="mt-4 p-4 border border-gray-200">
            <ProductFilter
              priceRange={priceRange}
              colorTones={colorTones}
              flowerTypes={flowerTypes}
              onPriceChange={handlePriceChange}
              onColorToggle={handleColorToggle}
              onFlowerToggle={handleFlowerToggle}
              onClearAll={handleClearAll}
            />
          </div>
        )}
      </div>

      <div className="flex-1">
        <p className="text-sm text-hoa-gray mb-6">
          {t("showingResults", { count: filtered.length })}
        </p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
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
          <div className="text-center py-16">
            <p className="text-hoa-gray">{t("noResults")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
