import { getTranslations } from "next-intl/server";
import { safeFetch } from "@sanity/lib/client";
import { SITE_SETTINGS_QUERY } from "@lib/queries/products";
import type { SiteSettings } from "@lib/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("title") };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  const settings = await safeFetch<SiteSettings>(SITE_SETTINGS_QUERY, {
    locale,
  });

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-16 md:px-8 md:py-24">
      <div className="mx-auto mb-16 max-w-3xl text-center">
        <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.24em] text-black/35">
          Hoa Nêu Studio
        </p>
        <h1 className="font-serif text-5xl italic leading-tight text-black md:text-7xl">
          {t("title")}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-black/55">
          {t("subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 border-y border-black/10 py-12 md:grid-cols-3 md:gap-12">
        {settings?.address && (
          <div>
            <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-black/35">
              Address
            </h3>
            <p className="font-serif text-2xl italic leading-snug text-black">
              {settings.address}
            </p>
          </div>
        )}

        {settings?.phone && (
          <div>
            <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-black/35">
              Phone
            </h3>
            <a
              href={`tel:${settings.phone}`}
              className="font-serif text-2xl italic leading-snug text-black transition-colors hover:text-hoa-red"
            >
              {settings.phone}
            </a>
          </div>
        )}

        <div>
          <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-black/35">
            {t("followUs")}
          </h3>
          <div className="flex flex-col gap-3">
            <a
              href={
                settings?.instagramUrl || "https://www.instagram.com/hoaneu_/"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="font-serif text-2xl italic text-black transition-colors hover:text-hoa-red"
            >
              Instagram
            </a>

            <a
              href={settings?.facebookUrl || "https://www.facebook.com/hoaneuhn"}
              target="_blank"
              rel="noopener noreferrer"
              className="font-serif text-2xl italic text-black transition-colors hover:text-hoa-red"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
