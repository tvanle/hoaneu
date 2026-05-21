"use client";

import { usePathname } from "next/navigation";
import { SOCIAL_LINKS } from "@lib/constants";

export function FloatingContact() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 md:bottom-7 md:right-7">
      <a
        href={SOCIAL_LINKS.instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Inbox Instagram"
        className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-black/5 transition-transform hover:-translate-y-0.5 hover:shadow-xl md:h-14 md:w-14"
      >
        <span className="absolute inset-0 rounded-full bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] opacity-0 transition-opacity group-hover:opacity-100" />
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
          className="relative text-[#dd2a7b] transition-colors group-hover:text-white md:h-6 md:w-6"
        >
          <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
        <span className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-full bg-black/85 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white opacity-0 transition-opacity group-hover:opacity-100">
          Instagram
        </span>
      </a>

      <a
        href={SOCIAL_LINKS.messenger}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Nhắn Messenger"
        className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-[#0084ff] shadow-lg ring-1 ring-black/5 transition-transform hover:-translate-y-0.5 hover:shadow-xl md:h-14 md:w-14"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
          className="text-white md:h-7 md:w-7"
        >
          <path d="M12 2C6.477 2 2 6.145 2 11.262c0 2.91 1.452 5.503 3.726 7.207V22l3.405-1.872c.908.252 1.873.388 2.869.388 5.523 0 10-4.146 10-9.263C22 6.145 17.523 2 12 2zm1.027 12.5l-2.55-2.717-4.95 2.717 5.45-5.78 2.6 2.716 4.9-2.717-5.45 5.78z" />
        </svg>
        <span className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-full bg-black/85 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white opacity-0 transition-opacity group-hover:opacity-100">
          Messenger
        </span>
      </a>
    </div>
  );
}
