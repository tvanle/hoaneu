"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import { ProductCard } from "./product-card";

interface Product {
  _id: string;
  title: string;
  slug: { current: string };
  price: number;
  priceNote?: string;
  mainImage?: { asset?: { url?: string }; alt?: string };
  category?: { title?: string };
}

interface ProductCarouselProps {
  products: Product[];
}

export function ProductCarousel({ products }: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      if (width < 640) setVisibleCount(1);
      else if (width < 1024) setVisibleCount(2);
      else setVisibleCount(3);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, products.length - visibleCount);
  const totalDots = maxIndex + 1;

  const goTo = useCallback(
    (index: number) => {
      setCurrentIndex(Math.max(0, Math.min(index, maxIndex)));
    },
    [maxIndex],
  );

  const prev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo]);
  const next = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  }

  function handleTouchMove(e: React.TouchEvent) {
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  }

  function handleTouchEnd() {
    if (touchDeltaX.current > 50) prev();
    else if (touchDeltaX.current < -50) next();
  }

  if (products.length === 0) return null;

  return (
    <div className="relative">
      {/* Carousel track */}
      <div
        className="overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
          }}
        >
          {products.map((product) => (
            <div
              key={product._id}
              className="flex-shrink-0 px-2 md:px-4"
              style={{ width: `${100 / visibleCount}%` }}
            >
              <ProductCard
                title={product.title}
                slug={product.slug.current}
                price={product.price}
                priceNote={product.priceNote}
                mainImage={product.mainImage}
                category={product.category}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Arrow buttons */}
      {currentIndex > 0 && (
        <button
          onClick={prev}
          aria-label="Previous"
          className="absolute left-0 top-1/3 -translate-y-1/2 -translate-x-2 md:-translate-x-5 w-10 h-10 flex items-center justify-center text-hoa-dark/60 hover:text-hoa-dark transition-colors"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      )}
      {currentIndex < maxIndex && (
        <button
          onClick={next}
          aria-label="Next"
          className="absolute right-0 top-1/3 -translate-y-1/2 translate-x-2 md:translate-x-5 w-10 h-10 flex items-center justify-center text-hoa-dark/60 hover:text-hoa-dark transition-colors"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      )}

      {/* Dot indicators */}
      {totalDots > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalDots }, (_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                i === currentIndex
                  ? "bg-hoa-dark"
                  : "bg-hoa-dark/20 hover:bg-hoa-dark/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
