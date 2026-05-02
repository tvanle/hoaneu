import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { urlForImage, watermarkedUrl } from "@sanity/lib/image";

interface ProductCardProps {
  title: string;
  slug: string;
  price: number;
  priceNote?: string;
  mainImage?: {
    asset?: { url?: string };
    alt?: string;
  };
  category?: {
    title?: string;
  };
}

export function ProductCard({
  title,
  slug,
  price,
  priceNote,
  mainImage,
}: ProductCardProps) {
  const cdnUrl = mainImage?.asset
    ? urlForImage(mainImage)?.width(600).height(600).url()
    : null;
  const imageUrl = cdnUrl ? watermarkedUrl(cdnUrl, 600, 600) : null;

  return (
    <Link
      href={`/san-pham/${slug}`}
      className="group block text-center transition-opacity duration-300 hover:opacity-80"
    >
      <div className="mb-6 aspect-square overflow-hidden bg-hoa-muted">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={mainImage?.alt || title}
            width={600}
            height={600}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-hoa-gray">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
        )}
      </div>
      <h3 className="mb-2 font-serif text-xl italic text-black transition-colors duration-300 group-hover:text-hoa-red">
        {title}
      </h3>
      <p className="text-sm text-black/55">
        {priceNote && `${priceNote} `}
        {price.toLocaleString("vi-VN")}₫
      </p>
    </Link>
  );
}
