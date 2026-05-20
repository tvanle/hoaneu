"use client";

const PRICE_RANGES = [
  { label: "Dưới 1 triệu", value: "0-1000000" },
  { label: "1 - 2 triệu", value: "1000000-2000000" },
  { label: "2 - 3 triệu", value: "2000000-3000000" },
  { label: "Trên 3 triệu", value: "3000000-999999999" },
];

// Values are stored verbatim in DB (no slug translation).
const COLOR_TONES = [
  { label: "Trắng", value: "Trắng", color: "#ffffff" },
  { label: "Đỏ", value: "Đỏ", color: "#c0392b" },
  { label: "Hồng", value: "Hồng", color: "#f08bbf" },
  { label: "Xanh", value: "Xanh Green", color: "#3f9b6f" },
  { label: "Sắc màu", value: "Sắc màu", color: "linear-gradient(135deg,#f08bbf 0%,#f3d36e 50%,#3f9b6f 100%)" },
  { label: "Vàng/cam", value: "Vàng/cam", color: "#f0a83b" },
  { label: "Tím", value: "Tím", color: "#8b5cf6" },
  { label: "Nâu", value: "Nâu", color: "#8b5e34" },
];

const FLOWER_TYPES = [
  { label: "Calla", value: "Calla" },
  { label: "Lan hồ điệp", value: "Lan hồ điệp" },
  { label: "Tulip", value: "Tulip" },
  { label: "Hồng môn", value: "Hồng môn" },
  { label: "Dền rủ", value: "Dền rủ" },
  { label: "Peony", value: "Peony" },
  { label: "Dạ lan hương", value: "Dạ lan hương" },
];

const FLOWER_SHAPES = [
  { label: "Bó dáng rủ", value: "Bó dáng rủ" },
  { label: "Bó dáng ngắn", value: "Bó dáng ngắn" },
  { label: "Hoa dạng vòng", value: "Hoa dạng vòng" },
  { label: "Bó tròn", value: "Bó tròn" },
  { label: "Quạt hoa", value: "Quạt hoa" },
];

interface ProductFilterProps {
  priceRange: string | null;
  colorTones: string[];
  flowerTypes: string[];
  shapes: string[];
  onPriceChange: (value: string | null) => void;
  onColorToggle: (value: string) => void;
  onFlowerToggle: (value: string) => void;
  onShapeToggle: (value: string) => void;
  onClearAll: () => void;
}

export function ProductFilter({
  priceRange,
  colorTones,
  flowerTypes,
  shapes,
  onPriceChange,
  onColorToggle,
  onFlowerToggle,
  onShapeToggle,
  onClearAll,
}: ProductFilterProps) {
  const hasActiveFilters =
    priceRange !== null ||
    colorTones.length > 0 ||
    flowerTypes.length > 0 ||
    shapes.length > 0;

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
        <div className="flex flex-wrap gap-3">
          {COLOR_TONES.map((tone) => {
            const isActive = colorTones.includes(tone.value);
            const isGradient = tone.color.startsWith("linear-gradient");
            return (
              <button
                key={tone.value}
                onClick={() => onColorToggle(tone.value)}
                className="flex flex-col items-center gap-1.5"
                aria-label={tone.label}
                aria-pressed={isActive}
              >
                <span
                  className={`h-9 w-9 rounded-full border transition-all ${
                    isActive
                      ? "border-hoa-red ring-2 ring-hoa-red/30"
                      : "border-black/15 hover:border-black"
                  }`}
                  style={
                    isGradient
                      ? { background: tone.color }
                      : { backgroundColor: tone.color }
                  }
                />
                <span
                  className={`text-[10px] font-medium tracking-wide ${
                    isActive ? "text-hoa-red" : "text-black/65"
                  }`}
                >
                  {tone.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h4 className="mb-3 font-serif text-lg italic">Hoa Chính</h4>
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

      <div>
        <h4 className="mb-3 font-serif text-lg italic">Kiểu Dáng</h4>
        <div className="flex flex-wrap gap-2">
          {FLOWER_SHAPES.map((shape) => (
            <button
              key={shape.value}
              onClick={() => onShapeToggle(shape.value)}
              className={`border px-3 py-2 text-sm transition-colors ${
                shapes.includes(shape.value)
                  ? "border-hoa-red bg-hoa-red/5 text-hoa-red"
                  : "border-black/15 hover:border-hoa-black"
              }`}
            >
              {shape.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
