"use client";

import Image from "next/image";
import { Link, usePathname } from "@/i18n/navigation";
import { SOCIAL_LINKS } from "@lib/constants";

export function Footer() {
  const pathname = usePathname();
  const isOrderPage = pathname === "/dat-hoa";

  if (isOrderPage) {
    return (
      <footer className="border-t border-black/10 bg-white text-black">
        <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-12 px-8 py-20 md:grid-cols-4">
          <div>
            <p className="font-serif text-2xl italic">Hoa Nêu</p>
            <p className="mt-7 text-[13px] font-medium uppercase leading-6 tracking-[0.16em] text-black/50">
              Floral Design Studio
              <br />
              Saigon, Vietnam
            </p>
          </div>
          <nav className="flex flex-col gap-4 text-base text-black/75">
            <Link href="/dat-hoa" className="hover:text-hoa-red">
              Shop Flowers
            </Link>
            <Link href="/hoa-cuoi-cam-tay" className="hover:text-hoa-red">
              Events
            </Link>
            <Link href="/lien-he" className="hover:text-hoa-red">
              Inquiry
            </Link>
          </nav>
          <nav className="flex flex-col gap-4 text-base text-black/75">
            <Link href="/lien-he" className="hover:text-hoa-red">
              Delivery Policy
            </Link>
            <Link href="/lien-he" className="hover:text-hoa-red">
              FAQ
            </Link>
            <Link href="/lien-he" className="hover:text-hoa-red">
              Contact
            </Link>
          </nav>
          <div>
            <h4 className="mb-6 text-sm font-extrabold uppercase tracking-[0.18em]">
              Connect
            </h4>
            <div className="flex gap-6 text-base">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-hoa-red"
              >
                Instagram
              </a>
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-hoa-red"
              >
                Pinterest
              </a>
            </div>
          </div>
        </div>
        <div className="mx-auto flex max-w-[1500px] flex-col gap-4 border-t border-black/5 px-8 py-10 text-[11px] uppercase tracking-[0.24em] text-black/35 md:flex-row md:justify-between">
          <p>© 2024 Hoa Nêu Editorial. All rights reserved.</p>
          <p>Designed for the floral visionary.</p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-[#181818] text-white">
      <div className="mx-auto max-w-7xl px-6 py-14 md:px-8 md:py-20">
        <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-16 md:grid-cols-[1.2fr_0.8fr_0.8fr] md:gap-16">
          <div>
            <h3 className="mb-6 text-base font-semibold">Newsletter</h3>
            <form className="flex max-w-sm">
              <input
                type="email"
                placeholder="Địa chỉ email của bạn"
                className="min-w-0 flex-1 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
              />
              <button className="bg-white px-6 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-black hover:bg-hoa-red hover:text-white">
                Gửi
              </button>
            </form>
          </div>

          <div>
            <h4 className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em]">
              Order Flowers
            </h4>
            <nav className="flex flex-col gap-2">
              <Link
                href="/dat-hoa"
                className="text-sm uppercase tracking-[0.12em] text-white/65 transition-colors hover:text-white"
              >
                Gifts & Objects
              </Link>
              <Link
                href="/lien-he"
                className="text-sm uppercase tracking-[0.12em] text-white/65 transition-colors hover:text-white"
              >
                FAQ & Policies
              </Link>
            </nav>
          </div>

          <div>
            <h4 className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em]">
              About Us
            </h4>
            <nav className="flex flex-col gap-2">
              <Link
                href="/lien-he"
                className="text-sm uppercase tracking-[0.12em] text-white/65 transition-colors hover:text-white"
              >
                Our Work
              </Link>
              <Link
                href="/lien-he"
                className="text-sm uppercase tracking-[0.12em] text-white/65 transition-colors hover:text-white"
              >
                Press
              </Link>
              <Link
                href="/lien-he"
                className="text-sm uppercase tracking-[0.12em] text-white/65 transition-colors hover:text-white"
              >
                Contact Us
              </Link>
            </nav>
          </div>
        </div>

        <div className="relative py-16 text-center md:py-20">
          <Image
            src="/logo.png"
            alt="Hoa Nêu"
            width={80}
            height={80}
            className="mx-auto hidden h-16 w-16 object-contain invert opacity-10"
          />
          <p className="font-serif text-[18vw] font-bold leading-none text-white/5 md:text-[12rem]">
            Hoa Nêu
          </p>
          <p className="mt-8 text-left text-[10px] uppercase tracking-[0.24em] text-white/35 md:absolute md:bottom-8 md:left-0 md:mt-0">
            &copy; {new Date().getFullYear()} Hoa Nêu. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
