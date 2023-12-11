import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "@/utils/gsap";
import headingFont from "@/utils/fonts/heading";
import { getCookie } from 'cookies-next'

export default function Hero() {
  const imgRef = useRef<HTMLImageElement>(null);
  const container = useRef<HTMLDivElement>(null);
  let typeCookie = getCookie('type') ?? 'desktop';

  useLayoutEffect(() => {
    let animationContext = gsap.context(() => {
      let tl;
      // Change animation depend on the device type
      if (typeCookie === "desktop") {
        tl = gsap.timeline({
          scrollTrigger: {
            trigger: container.current,
            start: "top top",
            end: "bottom+=35% bottom",
            scrub: true,
          },
        });
        tl.fromTo(
          imgRef.current,
          {
            objectPosition: "50% 0%",
            filter: "brightness(1)",
          },
          {
            objectPosition: "50% 100%",
            filter: "brightness(0.6)",
            ease: "sine.easeInOut",
          }
        );
      } else {

      }
    }, imgRef);

    return () => {
      animationContext.revert();
    };
  }, []);

  return (
    <>
      <div
        ref={container}
        id="home_hero"
        className="relative lg:px-10 overflow-hidden"
      >
        {/* <div className=" w-full h-full relative"> */}
          <Image
            ref={imgRef}
            className="hero_background -z-50"
            priority
            src="/assets/img/home_hero.webp"
            alt="Home hero image"
            fill
          />
        {/* </div> */}
        <div className="text-1 pl-10 pr-5 lg:pl-20">
          <p className="text-white lg:text-2xl">
            Global digital design studio partnering with brands and businesses
            that create exceptional experiences where people live, work, and
            unwind.
          </p>
        </div>
        <div className="text-2 pl-10 lg:pl-20 flex flex-col">
          <span className={`text-white title ${headingFont.className}`}>Digital</span>
          <span className={`text-white title ${headingFont.className}`}>Design</span>
          <span className={`text-white title ${headingFont.className}`}>Experience</span>
        </div>
        <div className="text-3 pl-10 pr-5 pb-10 lg:pl-20 mb-44 lg:mb-0">
          <p className="text-white lg:text-2xl">
            We help experience-driven companies thrive by making their audience
            feel the refined intricacies of their brand and product in the
            digital space. Unforgettable journeys start with a click.
          </p>
        </div>
        <div className="text-4 hidden px-20 lg:flex flex-row justify-between items-center">
          <p className="text-white text-base">The Studio</p>
          <div className="flex flex-row space-x-20">
            <div className="flex flex-col space-y-3">
              <Link href="#" className="text-white text-base underline-effect">
                Work
              </Link>
              <Link href="#" className="text-white text-base underline-effect">
                Studio
              </Link>
              <Link href="#" className="text-white text-base underline-effect">
                News
              </Link>
              <Link href="#" className="text-white text-base underline-effect">
                Contact
              </Link>
            </div>
            <div className="flex flex-col space-y-3">
              <Link
                href="mailto:dnam310199@gmail.com"
                className="text-white text-base underline-effect"
              >
                dnam310199@gmail.com
              </Link>
              <Link
                href="tel:2365133956"
                className="text-white text-base underline-effect"
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
