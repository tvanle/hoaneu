"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "./language-switcher";
import { MobileMenu } from "./mobile-menu";

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
  const t = useTranslations("nav");
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 border-b border-black/10 bg-white/95 backdrop-blur-sm">
        {isHomePage ? (
          <div className="px-4 md:px-6">
            <div className="grid h-14 grid-cols-[auto_1fr_auto] items-center gap-4">
              <Link href="/" className="font-serif text-lg italic">
                Hoa Nêu
              </Link>

              <nav className="hidden items-center justify-center gap-8 lg:flex">
                {NAV_LINKS.slice(0, 6).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/70 hover:text-hoa-red"
                  >
                    {t(link.labelKey)}
                  </Link>
                ))}
                <Link
                  href="/dat-hoa"
                  className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/70 hover:text-hoa-red"
                >
                  {t("orderFlowers")}
                </Link>
              </nav>

              <div className="flex items-center gap-3">
                <Link
                  href="/lien-he"
                  className="hidden rounded-full bg-hoa-red px-5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white hover:bg-hoa-red-dark md:inline-flex"
                >
                  {t("contact")}
                </Link>
                <div className="hidden md:block">
                  <LanguageSwitcher />
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="p-2 lg:hidden"
                  aria-label="Menu"
                >
                  <MenuIcon />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="px-4 md:px-6">
            <div className="grid h-16 grid-cols-[auto_1fr_auto] items-center gap-4 md:h-20">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2"
                aria-label="Menu"
              >
                <MenuIcon />
              </button>

              <Link
                href="/"
                className="justify-self-center font-serif text-2xl italic md:text-3xl"
              >
                Hoa Nêu
              </Link>

              <div className="flex items-center gap-4 justify-self-end text-black">
                <Link
                  href="/dat-hoa"
                  className="hidden text-[10px] font-bold uppercase tracking-[0.18em] text-black/65 hover:text-hoa-red md:inline-flex"
                >
                  {t("orderFlowers")}
                </Link>
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

      {!isHomePage && <div className="h-16 md:h-20" />}
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
