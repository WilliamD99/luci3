import { Metadata } from "next";
import ContactPageClient from "./client";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact me",
}

export default function Contact() {
  return (
    <ContactPageClient />
  );
}
