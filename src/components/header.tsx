"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
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
  { href: "/lien-he", labelKey: "contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 10);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-shadow duration-200 bg-white ${
          isScrolled ? "shadow-sm" : ""
        }`}
      >
        {isHomePage ? (
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex items-center justify-between h-16 md:h-20">
              <Link href="/" className="flex items-center">
                <Image
                  src="/logo.png"
                  alt="Hoa Nêu"
                  width={48}
                  height={48}
                  className="h-10 w-10 md:h-12 md:w-12 object-contain"
                  priority
                />
              </Link>

              <nav className="hidden lg:flex items-center gap-6">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm uppercase tracking-wider text-hoa-gray hover:text-hoa-black transition-colors"
                  >
                    {t(link.labelKey)}
                  </Link>
                ))}
              </nav>

              <div className="flex items-center gap-4">
                <LanguageSwitcher />
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="lg:hidden p-2"
                  aria-label="Menu"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="px-4 md:px-6">
            <div className="flex items-center justify-between h-16 md:h-20">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2"
                aria-label="Menu"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>

              <Link
                href="/"
                className="absolute left-1/2 -translate-x-1/2 flex items-center"
              >
                <Image
                  src="/logo.png"
                  alt="Hoa Nêu"
                  width={48}
                  height={48}
                  className="h-10 w-10 md:h-12 md:w-12 object-contain"
                  priority
                />
              </Link>

              <LanguageSwitcher />
            </div>
          </div>
        )}
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        links={NAV_LINKS}
      />

      <div className="h-16 md:h-20" />
    </>
  );
}
