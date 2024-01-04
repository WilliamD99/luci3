"use client";

import Marquee from "@/components/Marquee";
import React from "react";
import Image from "next/image";
import headingFont from "@/utils/fonts/heading";
import Link from "next/link";
import HoverButton from "@/components/HoverButton";

export default function ContactPage() {
  return (
    <>
      <div
        id="contact"
        className="relative flex flex-col justify-center items-center"
      >
        <div className="marquee w-screen">
          <Marquee id="contact-mrq" itemsPerView={3} fill>
            <div className="relative w-full flex flex-row items-center justify-evenly text-container">
              <p className={`text-left ${headingFont.className}`}>
                Get in touch
              </p>
            </div>
            <div className="relative w-full flex flex-row items-center justify-evenly text-container">
              <p className={`text-left ${headingFont.className}`}>
                Ponerse en contacto
              </p>
            </div>
            <div className="relative w-full flex flex-row items-center justify-evenly text-container">
              <p className={`text-left ${headingFont.className}`}>保持联系</p>
            </div>
            <div className="relative w-full flex flex-row items-center justify-evenly text-container">
              <p className={`text-left ${headingFont.className}`}>
                Neem contact op
              </p>
            </div>
          </Marquee>
        </div>
        <div className="main w-full relative">
          <div className="contact-img relative">
            <Image
              fill
              src="/assets/img/exo-ape-contact.webp"
              alt="Contact Image"
            />
          </div>
          <div className="left">
            <div className="body">
              <p>
                Ready for lift-off? Ping, tweet, message or poke — and we will
                get back as soon as possible.
              </p>
            </div>
            <ul className="contact">
              <li className="contact-item">
                <HoverButton
                  label="dnam310199@gmail.com"
                  href="mailto:dnam310199@gmail.com"
                />
              </li>
              <li className="contact-item">
                <HoverButton href="tel:236-513-3956" label="(1) 236-513-3956" />
              </li>
            </ul>
          </div>
          <div className="right">
            <Link href="#">
              554 Main St
              <br />
              Winnipeg, Manitoba
              <br />
              Canada R3B1C4
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
