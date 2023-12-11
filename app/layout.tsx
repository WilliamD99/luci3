import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@/public/assets/scss/index.css";
import LayoutClient from "./layoutClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Luci3",
  description: "Luci3 - Website Template by Will Doan",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <LayoutClient children={children} />
      </body>
    </html>
  );
}
