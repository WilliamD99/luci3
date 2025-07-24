"use client"
import React, { useRef } from "react";
import Link from "next/link";
import gsap from "@/utils/gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);


  useGSAP(() => {
    // Don't initialize until layout is stable
    let getRatio = (el: HTMLDivElement | null) => window.innerHeight / (window.innerHeight + (el ? el.offsetHeight : 0));

    // Set initial scale only (position handled in useLayoutEffect)
    gsap.set('.background', { scale: 1 })

    // Use GSAP matchMedia for responsive behavior
    let mm = gsap.matchMedia();

    // Wait for ScrollSmoother to be ready
    const initializeAnimations = () => {
      // Mobile (768px and below)
      mm.add("(max-width: 768px)", () => {
        // Ensure text elements are visible initially on mobile
        gsap.set('.text-1', { autoAlpha: 1 })
        gsap.set('.text-2 .title', { autoAlpha: 1, y: 0, rotate: 0 })

        gsap.fromTo(".background", {
          backgroundPosition: () => `50% ${-window.innerHeight * getRatio(backgroundRef?.current) * 2}px`,
          scale: 1
        }, {
          backgroundPosition: () => `50% ${window.innerHeight * 2 * (1 - getRatio(backgroundRef?.current))}px`,
          scale: 1.2,
          ease: "none",
          scrollTrigger: {
            trigger: container.current,
            start: () => "top+=50px bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          }
        });

        // Mobile text animation ScrollTrigger
        gsap.timeline({
          scrollTrigger: {
            trigger: container.current,
            start: "top+=8% top",
            end: `bottom bottom`,
            scrub: true,
            refreshPriority: -1,
            onEnter: () => {
              // Only animate if elements exist in DOM
              const text1 = document.querySelector('.text-1');
              const titleElements = document.querySelectorAll('.text-2 .title');

              if (text1 && document.body.contains(text1)) {
                gsap.to('.text-1', { autoAlpha: 0, duration: 0.5 });
              }

              if (titleElements.length > 0) {
                // Filter to only elements that are in DOM
                const validTitles = Array.from(titleElements).filter(el => document.body.contains(el));
                if (validTitles.length > 0) {
                  gsap.to(validTitles, { autoAlpha: 0, y: "-100%", rotate: -6, stagger: 0.1, duration: 0.5 });
                }
              }
            },
            onLeaveBack: () => {
              // Only animate if elements exist in DOM
              const text1 = document.querySelector('.text-1');
              const titleElements = document.querySelectorAll('.text-2 .title');

              if (text1 && document.body.contains(text1)) {
                gsap.to('.text-1', { autoAlpha: 1, duration: 0.5 });
              }

              if (titleElements.length > 0) {
                // Filter to only elements that are in DOM
                const validTitles = Array.from(titleElements).filter(el => document.body.contains(el));
                if (validTitles.length > 0) {
                  gsap.to(validTitles, { autoAlpha: 1, y: 0, rotate: 0, stagger: 0.1, duration: 0.5 });
                }
              }
            },
            onLeave: () => {
              console.log('Hero: ScrollTrigger onLeave triggered')
            }
          },
        });
      });

      // Desktop (769px and above)
      mm.add("(min-width: 769px)", () => {

        // Desktop - no text animations
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: container.current,
            start: "top top",
            end: "bottom+=35% bottom",
            scrub: true,
            refreshPriority: -1,
          },
        });

        tl.fromTo(".background", {
          backgroundPosition: () => `50% ${-window.innerHeight * getRatio(backgroundRef?.current) * 2}px`,
          scale: 1
        }, {
          backgroundPosition: () => `50% ${window.innerHeight * 2 * (1 - getRatio(backgroundRef?.current))}px`,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: container.current,
            start: "top+=50px bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
            refreshPriority: -1,
          }
        });
      });

      // Final ScrollTrigger refresh after all animations are set up
      setTimeout(() => {
        if ((window as any).ScrollTrigger) {
          (window as any).ScrollTrigger.refresh();
          console.log('Hero: Final ScrollTrigger refresh completed');
        }
      }, 100);
    };

    initializeAnimations();

    // Cleanup function for matchMedia
    return () => {
      mm.revert();
    };

  }, { scope: container, revertOnUpdate: true })

  // Entry animation
  useGSAP(() => {
    const splitText = new SplitText(".text-1 p", { type: "lines", linesClass: "line-wrapper", mask: "lines" });

    // Set initial state for split lines
    gsap.set(splitText.lines, {
      autoAlpha: 0,
      y: 100,
    });

    // Animate lines
    gsap.to(splitText.lines, {
      autoAlpha: 1,
      y: 0,
      duration: 1,
      ease: "power4.inOut",
      delay: 0.05,
      stagger: 0.05,
    });

    // Cleanup function
    return () => {
      splitText.revert();
    };
  }, { scope: container });

  return (
    <>
      <div
        ref={container}
        id="home_hero"
        className="relative overflow-hidden"
        style={{
        }}
      >
        <div ref={backgroundRef} className="relative w-full h-full" data-speed="0.75">
          <div className="background"></div>
        </div>
        <div className="text-1 text z-10 pl-6 pr-5 lg:pl-20 overflow-hidden">
          <p className="text-white lg:text-2xl 2xl:text-3xl font-nunito">
            Global digital design studio partnering with brands and businesses
            that create exceptional experiences where people live, work, and
            unwind.
          </p>
        </div>
        <div className="text-2 text z-10 pl-6 lg:pl-20">
          <div className="overflow-hidden">
            <span className={`text-white title inline-block font-medium text-6xl lg:text-[12rem] xl2:text-[18rem] font-poppins tracking-wide leading-none`}>Digital</span>
          </div>
          <div className="overflow-hidden">
            <span className={`text-white title inline-block font-medium text-6xl lg:text-[12rem] xl2:text-[18rem] font-poppins tracking-wide leading-none`}>Design</span>
          </div>
          <div className="overflow-hidden">
            <span className={`text-white title inline-block font-medium text-6xl lg:text-[12rem] xl2:text-[18rem] font-poppins tracking-wide leading-none`}>Experience</span>
          </div>
          {/* Arrow on mobile */}
          <div className="flex md:hidden mt-6">
            <ArrowDown className="h-5 w-5 text-white" />
          </div>
        </div>
        <div className="text-3 text z-10 pl-6 pr-5 pb-10 lg:pl-20 mb-44 lg:mb-0">
          <p className="text-white lg:text-2xl xl2:text-3xl font-nunito">
            We help experience-driven companies thrive by making their audience
            feel the refined intricacies of their brand and product in the
            digital space. Unforgettable journeys start with a click.
          </p>
        </div>
        <div className=" pt-[8vh] bottom-[10vh] w-full pl-[200px] text z-10 hidden lg:flex flex-row justify-between items-start">
          <p className="text-white font-nunito text-2xl xl2:text-3xl border-b-[1px] border-white">The Studio</p>
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
