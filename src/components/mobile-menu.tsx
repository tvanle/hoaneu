"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: readonly { href: string; labelKey: string }[];
}

export function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  const t = useTranslations("nav");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
        aria-hidden
      />
      <div className="absolute inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl">
        <div className="flex items-center justify-between p-4 border-b">
          <span className="font-serif text-xl italic">Hoa Nêu</span>
          <button onClick={onClose} className="p-2" aria-label="Close menu">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <nav className="p-6 flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="text-lg uppercase tracking-wider text-hoa-gray hover:text-hoa-black transition-colors py-2"
            >
              {t(link.labelKey)}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
