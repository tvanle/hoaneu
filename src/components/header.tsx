"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("nav");
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const leftLinks = NAV_LINKS.slice(0, 3);
  const rightLinks = [
    { href: "/lien-he", labelKey: "contact" },
    { href: "/dat-hoa", labelKey: "orderFlowers" },
  ] as const;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 border-b border-black/10 bg-white/95 backdrop-blur-sm">
        {isHomePage ? (
          <div className="px-4 md:px-6">
            <div className="grid h-14 grid-cols-[auto_1fr_auto] items-center gap-4">
              <Link href="/" aria-label="Hoa Nêu">
                <BrandLogo className="h-10 w-10" priority />
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
          <div className="px-6 md:px-10">
            <div className="grid h-20 grid-cols-[1fr_auto_1fr] items-center gap-6 md:h-24">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 lg:hidden"
                aria-label="Menu"
              >
                <MenuIcon />
              </button>
              <nav className="hidden items-center gap-9 justify-self-start lg:flex">
                {leftLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-[11px] font-medium uppercase tracking-[0.24em] transition-colors ${
                      pathname === link.href
                        ? "border-b border-hoa-red pb-2 text-hoa-red"
                        : "text-black/65 hover:text-hoa-red"
                    }`}
                  >
                    {t(link.labelKey)}
                  </Link>
                ))}
              </nav>

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

              <div className="flex items-center gap-7 justify-self-end text-black">
                <nav className="hidden items-center gap-9 lg:flex">
                  {rightLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`text-[11px] font-medium uppercase tracking-[0.24em] transition-colors ${
                        pathname === link.href
                          ? "border-b border-hoa-red pb-2 text-hoa-red"
                          : "text-black/65 hover:text-hoa-red"
                      }`}
                    >
                      {t(link.labelKey)}
                    </Link>
                  ))}
                </nav>
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
