"use client";

import { useState } from "react";
import Image from "next/image";
import { urlForImage, watermarkedUrl } from "@sanity/lib/image";

interface GalleryImage {
  asset?: { url?: string };
  alt?: string;
}

interface ProductImageGalleryProps {
  mainImage: GalleryImage;
  images?: GalleryImage[];
  title: string;
}

export function ProductImageGallery({
  mainImage,
  images,
  title,
}: ProductImageGalleryProps) {
  const allImages = [mainImage, ...(images || [])].filter((img) => img?.asset);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeImage = allImages[activeIndex];
  const activeCdnUrl = activeImage?.asset
    ? urlForImage(activeImage)?.width(800).height(800).url()
    : null;
  const activeUrl = activeCdnUrl ? watermarkedUrl(activeCdnUrl, 800, 800) : null;

  return (
    <div>
      <div className="mb-3 aspect-square overflow-hidden bg-hoa-muted">
        {activeUrl ? (
          <Image
            src={activeUrl}
            alt={activeImage?.alt || title}
            width={800}
            height={800}
            className="h-full w-full object-cover"
            priority
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-serif text-xl italic text-hoa-gray">
            No image
          </div>
        )}
      </div>

      {allImages.length > 1 && (
        <div className="grid grid-cols-4 gap-1.5 md:gap-2">
          {allImages.map((img, idx) => {
            const thumbCdnUrl = img?.asset
              ? urlForImage(img)?.width(200).height(200).url()
              : null;
            const thumbUrl = thumbCdnUrl
              ? watermarkedUrl(thumbCdnUrl, 200, 200)
              : null;
            return (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`aspect-square overflow-hidden border transition-colors ${
                  idx === activeIndex
                    ? "border-hoa-black"
                    : "border-transparent hover:border-black/25"
                }`}
              >
                {thumbUrl && (
                  <Image
                    src={thumbUrl}
                    alt={img?.alt || `${title} ${idx + 1}`}
                    width={200}
                    height={200}
                    className="h-full w-full object-cover"
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
