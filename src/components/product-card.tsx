import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { urlForImage } from "@sanity/lib/image";

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
  const imageUrl = mainImage?.asset
    ? urlForImage(mainImage).width(600).height(600).url()
    : null;

  return (
    <Link href={`/san-pham/${slug}`} className="group block">
      <div className="aspect-square overflow-hidden bg-hoa-muted mb-4">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={mainImage?.alt || title}
            width={600}
            height={600}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-hoa-gray">
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
      <h3 className="text-sm uppercase tracking-wider mb-1">{title}</h3>
      <p className="text-hoa-gray text-sm">
        {priceNote && `${priceNote} `}
        {price.toLocaleString("vi-VN")}₫
      </p>
    </Link>
  );
}
