"use client"
import React, { useRef } from "react";
import Link from "next/link";
import gsap from "@/utils/gsap";
import headingFont from "@/utils/fonts/heading";
import { getCookie } from 'cookies-next'
import { useGSAP } from "@gsap/react";

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null)

  let typeCookie = getCookie('type') ?? 'desktop';

  useGSAP(() => {
    let getRatio = (el: HTMLDivElement | null) => window.innerHeight / (window.innerHeight + (el ? el.offsetHeight : 0));

    gsap.set('.background', { scale: 1 })

    gsap.fromTo(".background", {
      backgroundPosition: () => `50% ${-window.innerHeight * getRatio(backgroundRef?.current) * 2}px`,
      scale: 1
    }, {
      backgroundPosition: () => `50% ${window.innerHeight * 2 * (1 - getRatio(backgroundRef?.current))}px`,
      scale: typeCookie === "desktop" ? 1 : 1.2,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: () => "top+=50px bottom",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true, // to make it responsive,
      }
    })
    gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: `bottom${typeCookie === "desktop" ? "+=35%" : ""} bottom`,
        scrub: true,
        // markers: true,
        onEnter: () => {
          if (typeCookie !== "desktop") {
            gsap.to('.text-1', { autoAlpha: 0 })
            gsap.to('.text-2 .title', { autoAlpha: 0, y: "-100%", rotate: -6, stagger: 0.1 })
          }
        },
        onLeaveBack: () => {
          if (typeCookie !== "desktop") {
            gsap.to('.text-1', { autoAlpha: 1 })
            gsap.to('.text-2 .title', { autoAlpha: 1, y: 0, rotate: 0, stagger: 0.1 })
          }
        },
        onLeave: () => {
          console.log('leave')
        }
      },
    });

  }, { scope: container, dependencies: [typeCookie], revertOnUpdate: true })

  return (
    <>
      <div
        ref={container}
        id="home_hero"
        className="relative overflow-hidden"
      >
        <div ref={backgroundRef} className="relative w-full h-full">
          <div className="background"></div>
        </div>
        <div className="text-1 text z-10 pl-10 pr-5 lg:pl-20">
          <p className="text-white lg:text-2xl 2xl:text-3xl font-nunito">
            Global digital design studio partnering with brands and businesses
            that create exceptional experiences where people live, work, and
            unwind.
          </p>
        </div>
        <div className="text-2 text z-10 pl-10 lg:pl-20">
          <div className="overflow-hidden">
            <span className={`text-white inline-block font-medium text-[12rem] 2xl:text-[20rem] font-poppins tracking-wide leading-none ${headingFont.className}`}>Digital</span>
          </div>
          <div className="overflow-hidden">
            <span className={`text-white inline-block font-medium text-[12rem] 2xl:text-[20rem] font-poppins tracking-wide leading-none ${headingFont.className}`}>Design</span>
          </div>
          <div className="overflow-hidden">
            <span className={`text-white inline-block font-medium text-[12rem] 2xl:text-[20rem] font-poppins tracking-wide leading-none ${headingFont.className}`}>Experience</span>
          </div>
        </div>
        <div className="text-3 text z-10 pl-10 pr-5 pb-10 lg:pl-20 mb-44 lg:mb-0">
          <p className="text-white lg:text-2xl 2xl:text-3xl font-nunito">
            We help experience-driven companies thrive by making their audience
            feel the refined intricacies of their brand and product in the
            digital space. Unforgettable journeys start with a click.
          </p>
        </div>
        <div className="pt-[8vh] bottom-[10vh] w-full pl-[200px] text z-10 hidden lg:flex flex-row justify-between items-start">
          <p className="text-white font-nunito text-2xl 2xl:text-3xl border-b-[1px] border-white">The Studio</p>
          <div className="flex flex-row space-x-48">
            <div className="flex flex-col space-y-8">
              <Link href="#" className="text-white text-2xl 2xl:text-3xl underline-effect font-nunito w-fit">
                Work
              </Link>
              <Link href="#" className="text-white text-2xl 2xl:text-3xl underline-effect font-nunito w-fit">
                Studio
              </Link>
              <Link href="#" className="text-white text-2xl 2xl:text-3xl underline-effect font-nunito w-fit">
                News
              </Link>
              <Link href="#" className="text-white text-2xl 2xl:text-3xl underline-effect font-nunito w-fit">
                Contact
              </Link>
            </div>
            <div className="flex flex-col space-y-8">
              <Link
                href="mailto:dnam310199@gmail.com"
                className="text-white text-2xl 2xl:text-3xl underline-effect font-nunito w-fit"
              >
                dnam310199@gmail.com
              </Link>
              <Link
                href="tel:2365133956"
                className="text-white text-2xl 2xl:text-3xl underline-effect font-nunito w-fit"
              >
                (1) 236-513-3956
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
