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
        href={SOCIAL_LINKS.facebook}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fanpage Facebook"
        className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-[#1877f2] shadow-lg ring-1 ring-black/5 transition-transform hover:-translate-y-0.5 hover:shadow-xl md:h-14 md:w-14"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
          className="text-white md:h-6 md:w-6"
        >
          <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.78-3.91 1.1 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.57v1.88h2.77l-.44 2.91h-2.33V22c4.78-.76 8.43-4.92 8.43-9.94z" />
        </svg>
        <span className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-full bg-black/85 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white opacity-0 transition-opacity group-hover:opacity-100">
          Facebook
        </span>
      </a>
    </div>
  );
}
