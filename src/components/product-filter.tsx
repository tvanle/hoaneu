"use client";

const PRICE_RANGES = [
  { label: "Dưới 1 triệu", value: "0-1000000" },
  { label: "1 - 2 triệu", value: "1000000-2000000" },
  { label: "2 - 3 triệu", value: "2000000-3000000" },
  { label: "Trên 3 triệu", value: "3000000-999999999" },
];

const COLOR_TONES = [
  { label: "Trắng", value: "Trắng", color: "#ffffff" },
  { label: "Đỏ", value: "Đỏ", color: "#c0392b" },
  { label: "Hồng", value: "Hồng", color: "#f5c6dc" },
  { label: "Xanh", value: "Xanh Green", color: "#207a52" },
  { label: "Sắc màu", value: "Sắc màu", color: "linear-gradient(135deg,#f5c6dc 0%,#f3d36e 45%,#a5d6a7 100%)" },
  { label: "Vàng/Cam", value: "Vàng/cam", color: "#ee9837" },
  { label: "Tím", value: "Tím", color: "#6c63ff" },
  { label: "Nâu", value: "Nâu", color: "#7a5236" },
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
    <div className="space-y-9">
      {hasActiveFilters && (
        <div className="flex justify-end">
          <button
            onClick={onClearAll}
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-hoa-red transition-colors hover:text-hoa-red-dark"
          >
            Xóa tất cả bộ lọc
          </button>
        </div>
      )}

      <section>
        <h4 className="mb-4 font-serif text-xl italic text-black">Mức Giá</h4>
        <ul className="divide-y divide-black/5">
          {PRICE_RANGES.map((range) => {
            const isActive = priceRange === range.value;
            return (
              <li key={range.value}>
                <button
                  onClick={() => onPriceChange(isActive ? null : range.value)}
                  className={`flex w-full items-center justify-between py-3 text-left text-[11px] font-bold uppercase tracking-[0.18em] transition-colors ${
                    isActive ? "text-hoa-red" : "text-black/65 hover:text-black"
                  }`}
                >
                  <span>{range.label}</span>
                  {isActive && (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section>
        <h4 className="mb-4 font-serif text-xl italic text-black">Tone Màu</h4>
        <div className="grid grid-cols-4 gap-x-3 gap-y-5">
          {COLOR_TONES.map((tone) => {
            const isActive = colorTones.includes(tone.value);
            const isGradient = tone.color.startsWith("linear-gradient");
            return (
              <button
                key={tone.value}
                onClick={() => onColorToggle(tone.value)}
                className="group flex flex-col items-center gap-1.5"
                aria-pressed={isActive}
                aria-label={tone.label}
              >
                <span
                  className={`relative h-14 w-14 overflow-hidden rounded-2xl border transition-all duration-200 ${
                    isActive
                      ? "border-hoa-red ring-[3px] ring-hoa-red/25 shadow-md"
                      : "border-black/10 group-hover:border-black/40 group-hover:shadow-sm"
                  }`}
                  style={
                    isGradient
                      ? { background: tone.color }
                      : { backgroundColor: tone.color }
                  }
                >
                  {isActive && (
                    <span className="absolute inset-0 flex items-center justify-center bg-black/10">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-hoa-red shadow">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                    </span>
                  )}
                </span>
                <span
                  className={`text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors ${
                    isActive ? "text-hoa-red" : "text-black/55"
                  }`}
                >
                  {tone.label}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <h4 className="mb-4 font-serif text-xl italic text-black">Hoa Chính</h4>
        <div className="flex flex-wrap gap-2">
          {FLOWER_TYPES.map((flower) => {
            const isActive = flowerTypes.includes(flower.value);
            return (
              <button
                key={flower.value}
                onClick={() => onFlowerToggle(flower.value)}
                className={`rounded-full border px-4 py-2 text-[12px] transition-all ${
                  isActive
                    ? "border-hoa-red bg-hoa-red/5 font-semibold text-hoa-red"
                    : "border-black/15 bg-white text-black/65 hover:border-black hover:text-black"
                }`}
              >
                {flower.label}
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <h4 className="mb-4 font-serif text-xl italic text-black">Kiểu Dáng</h4>
        <div className="flex flex-wrap gap-2">
          {FLOWER_SHAPES.map((shape) => {
            const isActive = shapes.includes(shape.value);
            return (
              <button
                key={shape.value}
                onClick={() => onShapeToggle(shape.value)}
                className={`rounded-full border px-4 py-2 text-[12px] transition-all ${
                  isActive
                    ? "border-hoa-red bg-hoa-red/5 font-semibold text-hoa-red"
                    : "border-black/15 bg-white text-black/65 hover:border-black hover:text-black"
                }`}
              >
                {shape.label}
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
