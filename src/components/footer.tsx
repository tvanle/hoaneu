"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SOCIAL_LINKS } from "@lib/constants";

interface FooterProps {
  settings?: {
    shopName?: string;
    instagramUrl?: string;
    facebookUrl?: string;
    phone?: string;
    address?: string;
  } | null;
}

export function Footer({ settings }: FooterProps) {
  const pathname = usePathname();
  const isOrderPage = pathname === "/dat-hoa";
  const shopName = settings?.shopName || "Hoa Nêu";
  const instagramUrl = settings?.instagramUrl || SOCIAL_LINKS.instagram;
  const facebookUrl = settings?.facebookUrl || SOCIAL_LINKS.facebook;
  const phone = settings?.phone;
  const address = settings?.address;

  if (isOrderPage) {
    return (
      <footer className="border-t border-black/10 bg-white text-black">
        <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-10 px-8 py-12 md:grid-cols-4">
          <div>
            <p className="font-serif text-[1.7rem] italic leading-none text-black">
              {shopName}
            </p>
            <p className="mt-5 text-[13px] font-medium uppercase leading-6 tracking-[0.16em] text-black/50">
              Floral Design Studio
              <br />
              Saigon, Vietnam
            </p>
          </div>
          <nav className="flex flex-col gap-4 text-base text-black/75">
            <Link href="/dat-hoa" className="hover:text-hoa-red">
              Đặt Hoa
            </Link>
            <Link href="/hoa-cuoi-cam-tay" className="hover:text-hoa-red">
              Sự Kiện
            </Link>
            <Link href="/lien-he" className="hover:text-hoa-red">
              Tư Vấn
            </Link>
          </nav>
          <nav className="flex flex-col gap-4 text-base text-black/75">
            <Link href="/lien-he" className="hover:text-hoa-red">
              Chính Sách Giao Hàng
            </Link>
            <Link href="/lien-he" className="hover:text-hoa-red">
              Câu Hỏi Thường Gặp
            </Link>
            <Link href="/lien-he" className="hover:text-hoa-red">
              Liên Hệ
            </Link>
          </nav>
          <div>
            <h4 className="mb-5 text-sm font-extrabold uppercase tracking-[0.18em]">
              Liên Hệ
            </h4>
            <div className="flex flex-col gap-3 text-base text-black/75">
              {phone && (
                <a href={`tel:${phone.replace(/\s+/g, "")}`} className="hover:text-black">
                  {phone}
                </a>
              )}
              {address && <p>{address}</p>}
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-hoa-red"
              >
                Instagram
              </a>
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-hoa-red"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>
        <div className="mx-auto flex max-w-[1500px] flex-col gap-3 border-t border-black/5 px-8 py-7 text-[11px] uppercase tracking-[0.24em] text-black/35 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} {shopName}. All rights reserved.</p>
          <p>Designed for flower lovers.</p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-[#181818] text-white">
      <div className="mx-auto max-w-7xl px-6 py-10 md:px-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 border-b border-white/10 pb-10 md:grid-cols-[1.1fr_0.8fr_0.9fr] md:gap-12">
          <div>
            <p className="font-serif text-[1.9rem] italic leading-none text-white">
              {shopName}
            </p>
            <p className="mt-4 max-w-sm text-sm leading-7 text-white/55">
              Floral Design Studio
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em]">
              Đặt Hoa
            </h4>
            <nav className="flex flex-col gap-2">
              <Link
                href="/dat-hoa"
                className="text-sm uppercase tracking-[0.12em] text-white/65 transition-colors hover:text-white"
              >
                Quà Tặng & Sản Phẩm
              </Link>
              <Link
                href="/lien-he"
                className="text-sm uppercase tracking-[0.12em] text-white/65 transition-colors hover:text-white"
              >
                Câu Hỏi & Chính Sách
              </Link>
            </nav>
          </div>

          <div>
            <h4 className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em]">
              Liên Hệ
            </h4>
            <div className="flex flex-col gap-2 text-sm tracking-[0.04em] text-white/65">
              {phone && (
                <a href={`tel:${phone.replace(/\s+/g, "")}`} className="transition-colors hover:text-white">
                  {phone}
                </a>
              )}
              {address && <p>{address}</p>}
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                Instagram
              </a>
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 py-6 text-center md:flex-row md:items-center md:justify-between">
          <p className="font-serif text-[1.5rem] italic leading-none text-white/14">
            {shopName}
          </p>
          <p className="text-[10px] uppercase tracking-[0.24em] text-white/35">
            &copy; {new Date().getFullYear()} {shopName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
