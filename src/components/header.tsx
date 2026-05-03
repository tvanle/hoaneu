"use client";

import { useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "./language-switcher";
import { MobileMenu } from "./mobile-menu";
import { BrandLogo } from "./brand-logo";

const NAV_LINKS = [
  { href: "/", labelKey: "home" },
  { href: "/hoa-cuoi-cam-tay", labelKey: "bridalBouquet" },
  { href: "/pre-wedding", labelKey: "preWedding" },
  { href: "/den-hoa-cuoi", labelKey: "weddingLighting" },
  { href: "/hoa-lua", labelKey: "silkFlowers" },
  { href: "/san-pham-khac", labelKey: "otherProducts" },
  { href: "/dat-hoa", labelKey: "orderFlowers" },
  { href: "/lien-he", labelKey: "contact" },
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
              <div className="justify-self-start">
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="p-2"
                  aria-label="Menu"
                >
                  <MenuIcon />
                </button>
              </div>

              <Link href="/" className="justify-self-center" aria-label="Hoa Nêu">
                <BrandLogo className="h-12 w-12" priority tone="red" />
              </Link>

              <div className="justify-self-end">
                <LanguageSwitcher />
              </div>
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
                <BrandLogo
                  className="h-20 w-20 md:h-24 md:w-24"
                  priority
                  tone="red"
                />
              </Link>

              <div className="justify-self-end text-black">
                <LanguageSwitcher />
              </div>
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
