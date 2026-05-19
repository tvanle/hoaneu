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
  const [copied, setCopied] = useState(false);

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

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2200);
    return () => clearTimeout(t);
  }, [copied]);

  const message = `Chào Hoa Nêu, em muốn tư vấn về sản phẩm ${productName}.\nLink: ${productUrl}`;
  const messengerUrl = `${SOCIAL_LINKS.messenger}?text=${encodeURIComponent(message)}`;
  const igUrl = instagramUrl || SOCIAL_LINKS.instagram;

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
    } catch {
      // fallback for older browsers
      const ta = document.createElement("textarea");
      ta.value = message;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        setCopied(true);
      } finally {
        document.body.removeChild(ta);
      }
    }
  }

  function handleChannelClick(href: string) {
    copyMessage();
    window.open(href, "_blank", "noopener,noreferrer");
  }

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
              Tin nhắn đã được chuẩn bị sẵn
            </h3>
            <p className="mt-2 text-[12px] leading-6 text-black/55">
              Chọn kênh bên dưới — chúng tôi tự copy tin nhắn vào clipboard, bạn chỉ cần <strong className="font-semibold text-black/75">Paste</strong> vào ô chat.
            </p>

            <div className="mt-5 border border-black/10 bg-black/[0.025] p-4">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-black/40">
                  Tin nhắn mẫu
                </p>
                <button
                  type="button"
                  onClick={copyMessage}
                  className="text-[10px] font-bold uppercase tracking-[0.18em] text-hoa-red transition-colors hover:text-hoa-red-dark"
                >
                  {copied ? "✓ Đã sao chép" : "Sao chép"}
                </button>
              </div>
              <p className="whitespace-pre-line text-[12px] leading-6 text-black/70">
                {message}
              </p>
            </div>

            <div className="mt-5 space-y-2.5">
              <button
                type="button"
                onClick={() => handleChannelClick(messengerUrl)}
                className="flex w-full items-center justify-between gap-3 bg-hoa-red px-5 py-3.5 text-white transition-colors hover:bg-hoa-red-dark"
              >
                <span className="text-left">
                  <span className="block text-[11px] font-bold uppercase tracking-[0.18em]">
                    Mở Messenger
                  </span>
                  <span className="mt-0.5 block text-[11px] text-white/75">
                    Tin nhắn sẽ được điền sẵn (web)
                  </span>
                </span>
                <span aria-hidden className="text-white/85">→</span>
              </button>

              <button
                type="button"
                onClick={() => handleChannelClick(igUrl)}
                className="flex w-full items-center justify-between gap-3 border border-black/15 bg-white px-5 py-3.5 transition-colors hover:border-black hover:bg-black/[0.02]"
              >
                <span className="text-left">
                  <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-black">
                    Mở Instagram
                  </span>
                  <span className="mt-0.5 block text-[11px] text-black/45">
                    Bấm DM → paste tin nhắn vừa copy
                  </span>
                </span>
                <span aria-hidden className="text-black/40">→</span>
              </button>
            </div>

            {copied && (
              <p className="mt-4 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-hoa-red">
                ✓ Đã sao chép vào clipboard
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
