import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "KITOB TOP — Premium 3D Uzbek Book Discovery Platform",
  description:
    "Kerakli kitobni topish uchun soatlab vaqt sarflamang. KITOB TOP orqali sevimli kitoblaringizni qidiring, 3D formatda kashf eting va eng mos kitobni tezda toping.",
  keywords: ["kitob top", "kitoblar", "3d kitob", "uzbekistan book store", "adabiyot", "kutubxona"],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="uz" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,800;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#F1F7FF] text-[#102C5C] antialiased selection:bg-[#1685FF] selection:text-white">
        {children}
      </body>
    </html>
  );
}
