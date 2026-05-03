"use client";

import { SOCIAL_LINKS } from "@lib/constants";

interface ContactCtaProps {
  productName: string;
  productUrl: string;
}

export function ContactCta({ productName, productUrl }: ContactCtaProps) {
  const messengerText = encodeURIComponent(
    `Chào Hoa Nêu, em muốn tư vấn về ${productName} (${productUrl})`,
  );

  const messengerUrl = `${SOCIAL_LINKS.messenger}?text=${messengerText}`;

  return (
    <div className="space-y-3">
      <a
        href={SOCIAL_LINKS.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-center gap-2 bg-hoa-red px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-hoa-red-dark"
      >
        Liên hệ tư vấn ↗
      </a>
      <a
        href={messengerUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-center text-[9px] font-medium uppercase tracking-[0.2em] text-black/35 transition-colors hover:text-hoa-red"
      >
        Vui lòng đặt trước ít nhất 7 ngày
      </a>
    </div>
  );
}
