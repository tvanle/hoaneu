import Image from "next/image";
import { getSiteSettings } from "@db/queries/settings";
import { SOCIAL_LINKS } from "@lib/constants";
import { BrandLogo } from "@/components/brand-logo";

export const metadata = {
  title: "Liên Hệ",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  const address = settings?.address || "160-162 Yên Lãng, Đống Đa, Hà Nội";
  const phone = settings?.phone || "0974 594 751";
  const instagram = settings?.instagramUrl || SOCIAL_LINKS.instagram;
  const facebook = settings?.facebookUrl || SOCIAL_LINKS.facebook;
  const sideImage = settings?.heroImage?.asset?.url || null;

  return (
    <div className="bg-[#f7f7f6]">
      <section className="mx-auto max-w-[1280px] px-8 py-20 sm:px-12 md:px-20 md:py-28 lg:px-24">
        <div className="mx-auto mb-20 max-w-4xl text-center">
          <h1 className="font-serif text-6xl leading-tight text-black md:text-8xl">
            Tư Vấn
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
              Gửi Yêu Cầu Tư Vấn
            </h2>

            <div className="space-y-9">
              <label className="block">
                <span className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.24em] text-black">
                  Họ và tên
                </span>
                <input
                  name="name"
                  placeholder="Tên của bạn"
                  className="w-full border-b border-black/35 bg-transparent py-3 text-sm text-black outline-none transition-colors placeholder:text-black/45 focus:border-hoa-red"
                />
              </label>

              <label className="block">
                <span className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.24em] text-black">
                  Số điện thoại
                </span>
                <input
                  name="phone"
                  placeholder="Số điện thoại của bạn"
                  className="w-full border-b border-black/35 bg-transparent py-3 text-sm text-black outline-none transition-colors placeholder:text-black/45 focus:border-hoa-red"
                />
              </label>

              <label className="block">
                <span className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.24em] text-black">
                  Ngày sự kiện (không bắt buộc)
                </span>
                <input
                  name="date"
                  type="date"
                  className="w-full border-b border-black/35 bg-transparent py-3 text-sm text-black outline-none transition-colors focus:border-hoa-red"
                />
              </label>

              <label className="block">
                <span className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.24em] text-black">
                  Lời nhắn
                </span>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Chia sẻ ý tưởng của bạn..."
                  className="w-full resize-none border-b border-black/15 bg-transparent py-3 text-sm text-black outline-none transition-colors placeholder:text-black/45 focus:border-hoa-red"
                />
              </label>
            </div>

            <button
              type="submit"
              className="mt-10 bg-hoa-red px-10 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-hoa-red-dark"
            >
              Gửi yêu cầu
            </button>
          </form>

          <aside className="space-y-0">
            <div className="relative aspect-square overflow-hidden bg-white">
              {sideImage ? (
                <Image
                  src={sideImage}
                  alt="Tư vấn hoa Hoa Nêu"
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
                Xưởng Hoa
              </h2>

              <div className="space-y-7 text-sm leading-6 text-black/75">
                <div>
                  <h3 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-black">
                    Địa chỉ
                  </h3>
                  <p>{address}</p>
                </div>

                <div>
                  <h3 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-black">
                    Giờ làm việc
                  </h3>
                  <p>Mở cửa hàng ngày: 8:30-18:30</p>
                  <p className="font-serif italic text-black/50">
                    Chỉ nhận theo lịch hẹn
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-black">
                    Liên hệ
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
              Hoa Cưới | Set Chụp | Sự Kiện | Hoa Hằng Ngày
            </p>
            <div className="mt-8 space-y-3 text-base leading-7 text-black/70">
              <p>{address}</p>
              <p>Mở cửa hàng ngày: 8:30-18:30</p>
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
          <a
            href={SOCIAL_LINKS.messenger}
            target="_blank"
            rel="noopener noreferrer"
          >
            Messenger
          </a>
        </div>
      </section>
    </div>
  );
}
