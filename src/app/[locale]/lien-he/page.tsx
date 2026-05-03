import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { safeFetch } from "@sanity/lib/client";
import { SITE_SETTINGS_QUERY } from "@lib/queries/products";
import { SOCIAL_LINKS } from "@lib/constants";
import { urlForImage } from "@sanity/lib/image";
import type { SiteSettings } from "@lib/types";
import { BrandLogo } from "@/components/brand-logo";

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
  const settings = await safeFetch<SiteSettings>(SITE_SETTINGS_QUERY, {
    locale,
  });

  const address = settings?.address || "160-162 Yên Lãng, Đống Đa, Hà Nội";
  const phone = settings?.phone || "0974 594 751";
  const instagram = settings?.instagramUrl || SOCIAL_LINKS.instagram;
  const facebook = settings?.facebookUrl || SOCIAL_LINKS.facebook;
  const sideImage = settings?.heroImage?.asset
    ? urlForImage(settings.heroImage)?.width(760).height(760).url()
    : null;

  return (
    <div className="bg-[#f7f7f6]">
      <section className="mx-auto max-w-[1280px] px-8 py-20 sm:px-12 md:px-20 md:py-28 lg:px-24">
        <div className="mx-auto mb-20 max-w-4xl text-center">
          <h1 className="font-serif text-6xl leading-tight text-black md:text-8xl">
            Consultation
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-black/70 md:text-lg">
            Trao đổi cùng Hoa Nêu về hoa cưới, set chụp, sự kiện hoặc những bó
            hoa hằng ngày. Mỗi thiết kế được tư vấn theo câu chuyện và không
            gian riêng của bạn.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <form
            action={SOCIAL_LINKS.messenger}
            target="_blank"
            className="bg-white px-8 py-10 md:px-16 md:py-16"
          >
            <h2 className="mb-10 font-serif text-4xl text-black">
              Send an Inquiry
            </h2>

            <div className="space-y-9">
              <label className="block">
                <span className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.24em] text-black">
                  Full name
                </span>
                <input
                  name="name"
                  placeholder="Your Name"
                  className="w-full border-b border-black/35 bg-transparent py-3 text-sm text-black outline-none transition-colors placeholder:text-black/45 focus:border-hoa-red"
                />
              </label>

              <label className="block">
                <span className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.24em] text-black">
                  Phone number
                </span>
                <input
                  name="phone"
                  placeholder="Your Phone Number"
                  className="w-full border-b border-black/35 bg-transparent py-3 text-sm text-black outline-none transition-colors placeholder:text-black/45 focus:border-hoa-red"
                />
              </label>

              <label className="block">
                <span className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.24em] text-black">
                  Event date optional
                </span>
                <input
                  name="date"
                  type="date"
                  className="w-full border-b border-black/35 bg-transparent py-3 text-sm text-black outline-none transition-colors focus:border-hoa-red"
                />
              </label>

              <label className="block">
                <span className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.24em] text-black">
                  Message
                </span>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Tell us about your vision..."
                  className="w-full resize-none border-b border-black/15 bg-transparent py-3 text-sm text-black outline-none transition-colors placeholder:text-black/45 focus:border-hoa-red"
                />
              </label>
            </div>

            <button
              type="submit"
              className="mt-10 bg-hoa-red px-10 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-hoa-red-dark"
            >
              Submit inquiry
            </button>
          </form>

          <aside className="space-y-0">
            <div className="relative aspect-square overflow-hidden bg-white">
              {sideImage ? (
                <Image
                  src={sideImage}
                  alt="Hoa Nêu floral consultation"
                  fill
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <BrandLogo className="h-52 w-52 opacity-10" tone="red" />
                </div>
              )}
            </div>

            <div className="bg-[#eeeeed] p-9 md:p-10">
              <h2 className="mb-5 border-b border-black/10 pb-5 font-serif text-4xl">
                Atelier
              </h2>

              <div className="space-y-7 text-sm leading-6 text-black/75">
                <div>
                  <h3 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-black">
                    Address
                  </h3>
                  <p>{address}</p>
                </div>

                <div>
                  <h3 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-black">
                    Hours
                  </h3>
                  <p>Open daily: 8:30-18:30</p>
                  <p className="font-serif italic text-black/50">
                    By Appointment Only
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-black">
                    Contact
                  </h3>
                  <a href={`tel:${phone}`} className="block hover:text-hoa-red">
                    {phone}
                  </a>
                  <a
                    href={instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:text-hoa-red"
                  >
                    Instagram @hoaneu_
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-28 grid grid-cols-1 gap-8 md:grid-cols-[1fr_1.4fr]">
          <div className="bg-white p-8 md:p-10">
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.24em] text-hoa-red">
              Hoa Nêu
            </p>
            <p className="font-serif text-3xl leading-tight text-black">
              Bridal Bouquets | Shoot Set-ups | Events | Daily Blooms
            </p>
            <div className="mt-8 space-y-3 text-base leading-7 text-black/70">
              <p>{address}</p>
              <p>Open daily: 8:30-18:30</p>
              <p>{phone}</p>
            </div>
          </div>

          <div className="relative min-h-[320px] overflow-hidden bg-[#dfe7e4]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_35%,rgba(220,20,60,.2),transparent_32%),linear-gradient(135deg,#e9f1ef,#f7f7f6)]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <BrandLogo className="h-56 w-56 opacity-10" tone="red" />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-black/60">
          <a href={instagram} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a href={facebook} target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
          <a href={SOCIAL_LINKS.messenger} target="_blank" rel="noopener noreferrer">
            Messenger
          </a>
        </div>
      </section>
    </div>
  );
}
