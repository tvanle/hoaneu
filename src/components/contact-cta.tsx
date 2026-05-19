"use client";

import { useEffect, useState } from "react";
import { SOCIAL_LINKS } from "@lib/constants";

interface ContactCtaProps {
  productName: string;
  productUrl: string;
  instagramUrl?: string;
}

export function ContactCta({
  productName,
  productUrl,
  instagramUrl,
}: ContactCtaProps) {
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

  const messengerText = encodeURIComponent(
    `Chào Hoa Nêu, em muốn tư vấn về ${productName} (${productUrl})`,
  );
  const messengerUrl = `${SOCIAL_LINKS.messenger}?text=${messengerText}`;
  const igUrl = instagramUrl || SOCIAL_LINKS.instagram;

  const options = [
    {
      href: messengerUrl,
      label: "Nhắn qua Messenger",
      sub: "Đính kèm sẵn thông tin sản phẩm",
      primary: true,
    },
    {
      href: igUrl,
      label: "Inbox Instagram",
      sub: "@hoaneu_",
    },
  ];

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
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center text-black/40 transition-colors hover:text-black"
            >
              ✕
            </button>

            <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-black/35">
              Liên hệ Hoa Nêu
            </p>
            <h3 className="font-serif text-2xl leading-tight text-black">
              Chọn kênh phù hợp với bạn
            </h3>
            <p className="mt-2 text-[12px] leading-6 text-black/55">
              Đội ngũ tư vấn sẽ phản hồi trong giờ làm việc về <strong className="font-semibold text-black/75">{productName}</strong>.
            </p>

            <div className="mt-6 space-y-2.5">
              {options.map((opt) => (
                <a
                  key={opt.label}
                  href={opt.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    opt.primary
                      ? "flex items-center justify-between gap-3 bg-hoa-red px-5 py-3.5 text-white transition-colors hover:bg-hoa-red-dark"
                      : "flex items-center justify-between gap-3 border border-black/15 bg-white px-5 py-3.5 transition-colors hover:border-black hover:bg-black/[0.02]"
                  }
                >
                  <span>
                    <span
                      className={
                        opt.primary
                          ? "block text-[11px] font-bold uppercase tracking-[0.18em]"
                          : "block text-[11px] font-bold uppercase tracking-[0.18em] text-black"
                      }
                    >
                      {opt.label}
                    </span>
                    <span
                      className={
                        opt.primary
                          ? "mt-0.5 block text-[11px] text-white/75"
                          : "mt-0.5 block text-[11px] text-black/45"
                      }
                    >
                      {opt.sub}
                    </span>
                  </span>
                  <span aria-hidden className={opt.primary ? "text-white/85" : "text-black/40"}>
                    →
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
