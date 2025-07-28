"use client";

import Marquee from "@/components/Marquee";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import HoverButton from "@/components/HoverButton";

export default function ContactPageClient() {
    return (
        <div
            id="contact"
            className="relative flex flex-col justify-center items-center"
        >
            <div className="marquee w-screen">
                <Marquee id="contact-mrq" itemsPerView={3} fill>
                    <div className="relative w-full flex flex-row items-center justify-evenly text-container">
                        <p className={`text-left font-poppins`}>
                            Get in touch
                        </p>
                    </div>
                    <div className="relative w-full flex flex-row items-center justify-evenly text-container">
                        <p className={`text-left font-poppins`}>
                            Ponerse en contacto
                        </p>
                    </div>
                    <div className="relative w-full flex flex-row items-center justify-evenly text-container">
                        <p className={`text-left font-poppins`}>保持联系</p>
                    </div>
                    <div className="relative w-full flex flex-row items-center justify-evenly text-container">
                        <p className={`text-left font-poppins`}>
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
                        <p className="font-nunito tracking-wide text-lg xl2:text-2xl">
                            Ready to collaborate? Whether you want to chat about a project,
                            explore new opportunities, or just connect — I'd love to hear from you.
                        </p>
                    </div>
                    <ul className="contact">
                        <li className="contact-item font-nunito tracking-wide text-lg xl2:text-xl">
                            <HoverButton
                                label="dnam310199@gmail.com"
                                href="mailto:dnam310199@gmail.com"
                            />
                        </li>
                        <li className="contact-item font-nunito tracking-wide text-lg xl2:text-xl">
                            <HoverButton href="tel:236-513-3956" label="(1) 236-513-3956" />
                        </li>
                    </ul>
                </div>
                <div className="right">
                    <Link href="#" className="font-nunito tracking-wide text-lg xl2:text-2xl">
                        Vancouver, British Columbia
                        <br />
                        Canada
                    </Link>
                </div>
            </div>
        </div>
    )
}
