"use client";

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
  const hasActiveFilters =
    priceRange !== null || colorTones.length > 0 || flowerTypes.length > 0;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-black">
          Bộ Lọc
        </h3>
        {hasActiveFilters && (
          <button
            onClick={onClearAll}
            className="text-[11px] font-semibold uppercase tracking-[0.14em] text-hoa-red hover:text-hoa-red-dark"
          >
            Xóa Bộ Lọc
          </button>
        )}
      </div>

      <div>
        <h4 className="mb-3 font-serif text-lg italic">Mức Giá</h4>
        <div className="space-y-3">
          {PRICE_RANGES.map((range) => (
            <button
              key={range.value}
              onClick={() =>
                onPriceChange(priceRange === range.value ? null : range.value)
              }
              className="flex items-center gap-3 text-left text-sm text-black/70 transition-colors hover:text-hoa-red"
            >
              <span
                className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                  priceRange === range.value
                    ? "border-hoa-red"
                    : "border-black/35"
                }`}
              >
                {priceRange === range.value && (
                  <span className="h-2 w-2 rounded-full bg-hoa-red" />
                )}
              </span>
              {range.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-3 font-serif text-lg italic">Tone Màu</h4>
        <div className="flex flex-wrap gap-2">
          {COLOR_TONES.map((tone) => (
            <button
              key={tone.value}
              onClick={() => onColorToggle(tone.value)}
              className={`h-8 w-8 rounded-full border transition-colors ${
                colorTones.includes(tone.value)
                  ? "border-hoa-red ring-2 ring-hoa-red/20"
                  : "border-black/15 hover:border-hoa-black"
              }`}
              aria-label={tone.label}
            >
              <span
                className="block h-full w-full rounded-full border border-white"
                style={{ backgroundColor: tone.color }}
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-3 font-serif text-lg italic">Loại Hoa Chính</h4>
        <div className="flex flex-wrap gap-2">
          {FLOWER_TYPES.map((flower) => (
            <button
              key={flower.value}
              onClick={() => onFlowerToggle(flower.value)}
              className={`border px-3 py-2 text-sm transition-colors ${
                flowerTypes.includes(flower.value)
                  ? "border-hoa-red bg-hoa-red/5 text-hoa-red"
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
