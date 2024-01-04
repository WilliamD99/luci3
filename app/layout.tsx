import type { Metadata } from "next";
import "./globals.css";
import "@/public/assets/scss/index.css";
import LayoutClient from "./layoutClient";

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
      <LayoutClient children={children} />
    </html>
  );
}
