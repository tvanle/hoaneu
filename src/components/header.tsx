"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileMenu } from "./mobile-menu";

const NAV_LINKS = [
  { href: "/", label: "Trang Chủ" },
  { href: "/hoa-cuoi-cam-tay", label: "Hoa Cưới Cầm Tay" },
  { href: "/pre-wedding", label: "Pre-wedding" },
  { href: "/den-hoa-cuoi", label: "Đèn Hoa Cưới" },
  { href: "/hoa-lua", label: "Hoa Lụa" },
  { href: "/san-pham-khac", label: "Sản Phẩm Khác" },
  { href: "/dat-hoa", label: "Đặt Hoa" },
  { href: "/lien-he", label: "Liên Hệ" },
] as const;

export function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 border-b border-black/10 bg-white/95 backdrop-blur-sm">
        {isHomePage ? (
          <div className="px-6 md:px-10">
            <div className="grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-4">
              <div className="justify-self-start" />

              <Link href="/" className="justify-self-center" aria-label="Hoa Nêu">
                <span className="font-serif text-[1.7rem] leading-none tracking-[-0.03em] text-black italic">
                  Hoa Nêu
                </span>
              </Link>

              <div className="justify-self-end" />
            </div>
          </div>
        ) : (
          <div className="px-6 md:px-10">
            <div className="grid h-20 grid-cols-[1fr_auto_1fr] items-center gap-6 md:h-24">
              <div className="justify-self-start">
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="p-2"
                  aria-label="Menu"
                >
                  <MenuIcon />
                </button>
              </div>

              <Link
                href="/"
                className="justify-self-center"
                aria-label="Hoa Nêu"
              >
                <span className="font-serif text-[1.9rem] leading-none tracking-[-0.03em] text-black italic md:text-[2.2rem]">
                  Hoa Nêu
                </span>
              </Link>

              <div className="justify-self-end" />
            </div>
          </div>
        )}
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        links={NAV_LINKS}
      />

      {!isHomePage && <div className="h-20 md:h-24" />}
    </>
  );
}

function MenuIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}
