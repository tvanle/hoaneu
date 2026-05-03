"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { SOCIAL_LINKS } from "@lib/constants";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: readonly { href: string; labelKey: string }[];
}

export function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setVisible(true), 0);
      const frame = requestAnimationFrame(() => setAnimating(true));
      document.body.style.overflow = "hidden";
      return () => {
        clearTimeout(timer);
        cancelAnimationFrame(frame);
        document.body.style.overflow = "";
      };
    } else {
      const frame = requestAnimationFrame(() => setAnimating(false));
      const timer = setTimeout(() => setVisible(false), 300);
      document.body.style.overflow = "";
      return () => {
        cancelAnimationFrame(frame);
        clearTimeout(timer);
      };
    }
  }, [isOpen]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className={`absolute inset-0 bg-black/25 transition-opacity duration-300 ${
          animating ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
        aria-hidden
      />
      <aside
        className={`absolute inset-y-0 left-0 flex w-full max-w-[380px] flex-col border-r border-black/10 bg-white px-8 py-8 shadow-xl transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] md:px-10 ${
          animating ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-start justify-between border-b border-black/10 pb-8">
          <Link
            href="/"
            onClick={onClose}
            aria-label="Hoa Nêu"
            className="font-serif text-[1.8rem] leading-none tracking-[-0.03em] text-black italic"
          >
            HoaNêu
          </Link>
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center border border-black/15 text-black transition-colors hover:bg-black hover:text-white"
            aria-label="Close menu"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-1 flex-col justify-center gap-2 py-10">
          {links.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={`group grid grid-cols-[1.25rem_1fr] items-center gap-4 py-2 transition-all ${
                animating
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-4 opacity-0"
              }`}
              style={{
                transitionDelay: animating ? `${90 + i * 45}ms` : "0ms",
                transitionDuration: "420ms",
              }}
            >
              <span
                className={`h-px w-6 transition-colors ${
                  pathname === link.href
                    ? "bg-black"
                    : "bg-transparent group-hover:bg-black/30"
                }`}
              />
              <span
                className={`font-serif text-[1.3rem] leading-[1.15] italic transition-colors md:text-[1.45rem] ${
                  pathname === link.href
                    ? "text-black"
                    : "text-black/78 group-hover:text-black"
                }`}
              >
                {t(link.labelKey)}
              </span>
            </Link>
          ))}
        </nav>

        <div className="border-t border-black/10 pt-7">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-black/35">
            Connect
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-black/55">
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black"
            >
              Instagram
            </a>
            <a
              href={SOCIAL_LINKS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black"
            >
              Facebook
            </a>
            <a href="tel:0974594751" className="hover:text-black">
              0974 594 751
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
}
