"use client";

import { useTranslations } from "next-intl";

const PRICE_RANGES = [
  { label: "Dưới 500K", value: "0-500000" },
  { label: "500K - 1tr", value: "500000-1000000" },
  { label: "1tr - 2tr", value: "1000000-2000000" },
  { label: "2tr - 5tr", value: "2000000-5000000" },
  { label: "Trên 5tr", value: "5000000-999999999" },
];

const COLOR_TONES = [
  { label: "Trắng", value: "trang", color: "#fff" },
  { label: "Đỏ", value: "do", color: "#DC143C" },
  { label: "Hồng", value: "hong", color: "#FF69B4" },
  { label: "Vàng", value: "vang", color: "#FFD700" },
  { label: "Tím", value: "tim", color: "#8B5CF6" },
  { label: "Xanh", value: "xanh", color: "#22C55E" },
  { label: "Cam", value: "cam", color: "#F97316" },
  { label: "Pastel", value: "pastel", color: "#F5E6CC" },
];

const FLOWER_TYPES = [
  { label: "Hồng (Rose)", value: "hong" },
  { label: "Lan (Orchid)", value: "lan" },
  { label: "Cúc", value: "cuc" },
  { label: "Tulip", value: "tulip" },
  { label: "Mẫu Đơn", value: "mau-don" },
  { label: "Ly (Lily)", value: "ly" },
  { label: "Cẩm Tú Cầu", value: "cam-tu-cau" },
  { label: "Baby", value: "baby" },
];

interface ProductFilterProps {
  priceRange: string | null;
  colorTones: string[];
  flowerTypes: string[];
  onPriceChange: (value: string | null) => void;
  onColorToggle: (value: string) => void;
  onFlowerToggle: (value: string) => void;
  onClearAll: () => void;
}

export function ProductFilter({
  priceRange,
  colorTones,
  flowerTypes,
  onPriceChange,
  onColorToggle,
  onFlowerToggle,
  onClearAll,
}: ProductFilterProps) {
  const t = useTranslations("catalog");
  const hasActiveFilters =
    priceRange !== null || colorTones.length > 0 || flowerTypes.length > 0;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-black">
          {t("filterTitle")}
        </h3>
        {hasActiveFilters && (
          <button
            onClick={onClearAll}
            className="text-[11px] font-semibold uppercase tracking-[0.14em] text-hoa-red hover:text-hoa-red-dark"
          >
            {t("clearFilters")}
          </button>
        )}
      </div>

      <div>
        <h4 className="mb-3 font-serif text-lg italic">{t("priceRange")}</h4>
        <div className="flex flex-wrap gap-2">
          {PRICE_RANGES.map((range) => (
            <button
              key={range.value}
              onClick={() =>
                onPriceChange(priceRange === range.value ? null : range.value)
              }
              className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                priceRange === range.value
                  ? "border-hoa-black bg-hoa-black text-white"
                  : "border-black/15 hover:border-hoa-black"
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-3 font-serif text-lg italic">{t("colorTone")}</h4>
        <div className="flex flex-wrap gap-2">
          {COLOR_TONES.map((tone) => (
            <button
              key={tone.value}
              onClick={() => onColorToggle(tone.value)}
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-colors ${
                colorTones.includes(tone.value)
                  ? "border-hoa-black bg-hoa-black text-white"
                  : "border-black/15 hover:border-hoa-black"
              }`}
            >
              <span
                className="h-3 w-3 rounded-full border border-black/20"
                style={{ backgroundColor: tone.color }}
              />
              {tone.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-3 font-serif text-lg italic">{t("flowerType")}</h4>
        <div className="flex flex-wrap gap-2">
          {FLOWER_TYPES.map((flower) => (
            <button
              key={flower.value}
              onClick={() => onFlowerToggle(flower.value)}
              className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                flowerTypes.includes(flower.value)
                  ? "border-hoa-black bg-hoa-black text-white"
                  : "border-black/15 hover:border-hoa-black"
              }`}
            >
              {flower.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
