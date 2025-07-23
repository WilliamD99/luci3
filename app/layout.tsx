import type { Metadata } from "next";
import "./globals.css";
import "@/public/assets/scss/index.css";
import LayoutClient from "./layoutClient";
import { Poppins, Nunito } from 'next/font/google'
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: "Luci3",
  description: "Luci3 - Website Template by Will Doan",
};

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins'
})

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-nunito'
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" className={`${poppins.variable} ${nunito.variable}`}>
      <body>
        <LayoutClient>
          {children}
        </LayoutClient>
        <Analytics />
      </body>
    </html>
  );
}
