import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { urlForImage } from "@sanity/lib/image";

interface CategoryCardProps {
  title: string;
  slug: string;
  image?: {
    asset?: { url?: string };
    alt?: string;
  };
}

export function CategoryCard({ title, slug, image }: CategoryCardProps) {
  const imageUrl = image?.asset
    ? urlForImage(image).width(800).height(500).url()
    : null;

  return (
    <Link href={`/${slug}`} className="group relative block overflow-hidden">
      <div className="aspect-[4/3] bg-hoa-muted">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={image?.alt || title}
            width={800}
            height={500}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-hoa-light">
            <span className="text-hoa-gray text-sm">{title}</span>
          </div>
        )}
      </div>
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-end p-6">
        <h3 className="text-white text-lg uppercase tracking-wider font-medium">
          {title}
        </h3>
      </div>
    </Link>
  );
}
