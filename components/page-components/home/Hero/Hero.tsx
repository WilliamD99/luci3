import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "@/utils/gsap";
import headingFont from "@/utils/fonts/heading";
import { getCookie } from 'cookies-next'
import { useGSAP } from "@gsap/react";
import {ScrollTrigger} from 'gsap-trial/ScrollTrigger'

export default function Hero() {
  const imgRef = useRef<HTMLImageElement>(null);
  const container = useRef<HTMLDivElement>(null);
  let typeCookie = getCookie('type') ?? 'desktop';

  useGSAP(() => {
    gsap.to(
      '.background', {
        scrollTrigger: {
          scrub: true,
          start: "top top",
          end: `bottom bottom`,
          markers: true
        },
        y: (i, target) => -ScrollTrigger.maxScroll(container.current)
      }
    )
    let tl;
    tl = gsap.timeline({
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
    // if (typeCookie === "desktop") {
    //   tl.fromTo(
    //     imgRef.current,
    //     {
    //       objectPosition: "50% 50%",
    //       filter: "brightness(1)",
    //     },
    //     {
    //       objectPosition: "50% 100%",
    //       filter: "brightness(0.6)",
    //       ease: "sine.easeInOut",
    //     }
    //   );
    // } else {

    //   tl.fromTo(
    //     ".background",
    //     {
    //       // objectPosition: "50% 50%",
    //       filter: "brightness(1)",
    //     },
    //     {
    //       // objectPosition: "50% 50px",
    //       backgroundPosition: "+=50",
    //       scale: 1.2,
    //       filter: "brightness(0.6)",
    //       ease: "sine.easeInOut",
    //     }
    //   );
    // }
  }, { scope: container, dependencies: [typeCookie], revertOnUpdate: true })

  return (
    <>
      <div
        ref={container}
        id="home_hero"
        className="relative lg:px-10 overflow-hidden"
      >
        <div className="background w-full h-full sticky top-0 left-0">
          {/* <Image
            ref={imgRef}
            className="hero_background -z-50"
            priority
            src="/assets/img/home_hero.webp"
            alt="Home hero image"
            fill
          /> */}
        </div>
        <div className="text-1 text z-10 pl-10 pr-5 lg:pl-20">
          <p className="text-white lg:text-2xl">
            Global digital design studio partnering with brands and businesses
            that create exceptional experiences where people live, work, and
            unwind.
          </p>
        </div>
        <div className="text-2 text z-10 pl-10 lg:pl-20 flex flex-col">
          <div className="overflow-hidden">
            <span className={`text-white title ${headingFont.className}`}>Digital</span>
          </div>
          <div className="overflow-hidden">
            <span className={`text-white title ${headingFont.className}`}>Design</span>
          </div>
          <div className="overflow-hidden">
            <span className={`text-white title ${headingFont.className}`}>Experience</span>
          </div>
        </div>
        <div className="text-3 text z-10 pl-10 pr-5 pb-10 lg:pl-20 mb-44 lg:mb-0">
          <p className="text-white lg:text-2xl">
            We help experience-driven companies thrive by making their audience
            feel the refined intricacies of their brand and product in the
            digital space. Unforgettable journeys start with a click.
          </p>
        </div>
        <div className="text-4 text z-10 hidden px-20 lg:flex flex-row justify-between items-center">
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
