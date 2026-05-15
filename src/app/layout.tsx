import "./globals.css";
import { Playfair_Display, Inter } from "next/font/google";
import { getSiteSettings } from "@db/queries/settings";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "Hoa Nêu - Nâng tầm ngày trọng đại của bạn",
    template: "%s | Hoa Nêu",
  },
  description: "Nâng tầm ngày trọng đại của bạn",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <html
      lang="vi"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer settings={settings} />
      </body>
    </html>
  );
}
