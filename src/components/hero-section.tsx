import Image from "next/image";
import { urlForImage } from "@sanity/lib/image";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  image?: {
    asset?: { url?: string };
    alt?: string;
  };
}

export function HeroSection({ title, subtitle, image }: HeroSectionProps) {
  const imageUrl = image?.asset
    ? urlForImage(image)?.width(1920).height(1080).url()
    : null;

  return (
    <section className="relative min-h-[70vh] md:min-h-[85vh] flex items-center justify-center">
      {imageUrl ? (
        <>
          <Image
            src={imageUrl}
            alt={image?.alt || title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </>
      ) : (
        <div className="absolute inset-0 bg-hoa-light" />
      )}
      <div className="relative z-10 text-center px-4">
        <h1
          className={`text-5xl md:text-7xl font-serif mb-4 ${imageUrl ? "text-white" : "text-hoa-black"}`}
        >
          {title}
        </h1>
        <p
          className={`text-lg md:text-xl ${imageUrl ? "text-white/80" : "text-hoa-gray"}`}
        >
          {subtitle}
        </p>
      </div>
    </section>
  );
}
