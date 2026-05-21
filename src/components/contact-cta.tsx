"use client";

import { useEffect, useState } from "react";
import { SOCIAL_LINKS } from "@lib/constants";

interface ContactCtaProps {
  instagramUrl?: string;
}

export function ContactCta({ instagramUrl }: ContactCtaProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const fbUrl = SOCIAL_LINKS.facebook;
  const igUrl = instagramUrl || SOCIAL_LINKS.instagram;

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-full items-center justify-center gap-2 bg-hoa-red px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-hoa-red-dark"
      >
        Liên hệ tư vấn ↗
      </button>
      <p className="text-center text-[9px] font-medium uppercase tracking-[0.2em] text-black/35">
        Vui lòng đặt trước ít nhất 7 ngày
      </p>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/55 px-4 pb-4 pt-10 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-md bg-white p-6 shadow-2xl sm:p-7"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Đóng"
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-black/40 transition-colors hover:bg-black/5 hover:text-black"
            >
              ✕
            </button>

            <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-black/35">
              Liên hệ Hoa Nêu
            </p>
            <h3 className="font-serif text-2xl leading-tight text-black">
              Chọn kênh phù hợp
            </h3>

            <div className="mt-6 space-y-2.5">
              <a
                href={fbUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-between gap-3 bg-hoa-red px-5 py-3.5 text-white transition-colors hover:bg-hoa-red-dark"
              >
                <span className="text-[11px] font-bold uppercase tracking-[0.18em]">
                  Mở Facebook
                </span>
                <span aria-hidden className="text-white/85">→</span>
              </a>

              <a
                href={igUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-between gap-3 border border-black/15 bg-white px-5 py-3.5 transition-colors hover:border-black hover:bg-black/[0.02]"
              >
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-black">
                  Mở Instagram
                </span>
                <span aria-hidden className="text-black/40">→</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
