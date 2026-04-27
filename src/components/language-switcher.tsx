"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(newLocale: "vi" | "en") {
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <div className="flex items-center gap-1 text-sm">
      <button
        onClick={() => switchLocale("vi")}
        className={`px-2 py-1 transition-colors ${
          locale === "vi"
            ? "text-hoa-black font-semibold"
            : "text-hoa-gray hover:text-hoa-black"
        }`}
      >
        VI
      </button>
      <span className="text-hoa-gray">/</span>
      <button
        onClick={() => switchLocale("en")}
        className={`px-2 py-1 transition-colors ${
          locale === "en"
            ? "text-hoa-black font-semibold"
            : "text-hoa-gray hover:text-hoa-black"
        }`}
      >
        EN
      </button>
    </div>
  );
}
