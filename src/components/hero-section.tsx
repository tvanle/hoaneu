import Image from "next/image";
import Link from "next/link";
import { BrandLogo } from "./brand-logo";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  image?: {
    asset?: { url?: string };
    alt?: string;
  };
}

export function HeroSection({ title, subtitle, image }: HeroSectionProps) {
  return (
    <section className="grid min-h-[calc(100vh-56px)] grid-cols-1 pt-14 md:grid-cols-2">
      <div className="relative min-h-[58vh] overflow-hidden bg-[#1f3431] md:min-h-[calc(100vh-56px)]">
        <Image
          src="/homepage-cap.jpg"
          alt={image?.alt || title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-black/18" />
        <BrandLogo
          className="absolute left-8 top-8 h-10 w-10 opacity-60"
          inverted
          priority
        />
        <div className="absolute bottom-5 left-5 rounded-full border border-white/40 bg-white/10 px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/80 backdrop-blur">
          Sài Gòn / Toàn Quốc
        </div>
      </div>

      <div className="relative flex min-h-[58vh] items-center justify-center overflow-hidden bg-white p-8 md:min-h-[calc(100vh-56px)] md:p-12">
        <p className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[32vw] leading-none text-hoa-red/8 md:text-[18vw]">
          N
        </p>
        <div className="relative text-center">
          <h1 className="sr-only">{title}</h1>
          <BrandLogo
            className="mx-auto h-28 w-28 md:h-40 md:w-40"
            priority
          />
          <nav className="mt-8 flex flex-col items-center gap-3 font-serif text-sm italic text-black/70">
            <Link
              href="/san-pham-khac"
              className="hover:text-hoa-red"
            >
              Our Work
            </Link>
            <Link
              href="/dat-hoa"
              className="hover:text-hoa-red"
            >
              Order Flowers
            </Link>
            <Link
              href="/#about-home"
              className="hover:text-hoa-red"
            >
              About Us
            </Link>
            <Link
              href="/lien-he"
              className="hover:text-hoa-red"
            >
              Contact
            </Link>
          </nav>
          <p className="mx-auto mt-8 max-w-sm text-sm leading-6 text-black/55">
            {subtitle}
          </p>
          <Link
            href="/san-pham-khac"
            className="mt-8 inline-flex rounded-full border border-black/25 px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:border-black hover:bg-black hover:text-white"
          >
            Khám phá bộ sưu tập
          </Link>
        </div>
      </div>
    </section>
  );
}
