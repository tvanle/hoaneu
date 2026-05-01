import { useTranslations } from "next-intl";
import { SOCIAL_LINKS } from "@lib/constants";

export function ContactCtaSection() {
  const t = useTranslations("home");

  return (
    <section className="bg-hoa-muted py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-serif mb-6">
          {t("contactCta")}
        </h2>
        <div className="flex items-center justify-center gap-4">
          <a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-hoa-red text-white px-8 py-3 text-sm uppercase tracking-wider hover:bg-hoa-red-dark"
          >
            Instagram
          </a>
          <a
            href={SOCIAL_LINKS.messenger}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-hoa-black text-hoa-black px-8 py-3 text-sm uppercase tracking-wider hover:bg-hoa-black hover:text-white"
          >
            Facebook
          </a>
        </div>
      </div>
    </section>
  );
}
