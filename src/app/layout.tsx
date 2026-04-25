import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BeraberGidelim – Etkinlik Arkadaşı Bul",
  description:
    "Konser, festival, workshop ve daha fazlasına birlikte gidecek arkadaş bul. Müzik uyumuyla eşleş.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${inter.className} bg-slate-950 text-white min-h-screen`}>
        <Navigation />
        <main className="max-w-md mx-auto pt-14 pb-20 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
