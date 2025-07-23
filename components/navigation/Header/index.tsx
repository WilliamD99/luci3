"use client";

import React, { forwardRef, useEffect, useRef, useState } from "react";
import HeaderScrolled from "./HeaderScrolled";
import TransitionLink from "@/components/ViewTransitionLink";
import { useGSAP } from "@gsap/react";
import gsap from "@/utils/gsap";

function Header({ }, ref: any) {
  let headerRef = useRef<HTMLDivElement>(null);

  let [isHeaderActive, setHeaderActive] = useState<boolean>(true);
  let [isHeaderScrolledActive, setHeaderScrolledActive] =
    useState<boolean>(false);

  // Switch between menu - optimized with requestAnimationFrame
  let handleScroll = React.useCallback(() => {
    let ticking = false;

    const updateMenuState = () => {
      const yPosition = window.scrollY;

      // First Menu Animation
      if (yPosition === 0) {
        setHeaderActive(true);
      } else {
        if (isHeaderActive) setHeaderActive(false);
      }

      // Second Menu Animation
      if (yPosition > 200) {
        if (!isHeaderScrolledActive) setHeaderScrolledActive(true);
      } else {
        setHeaderScrolledActive(false);
      }

      ticking = false;
    };

    if (!ticking) {
      requestAnimationFrame(updateMenuState);
      ticking = true;
    }
  }, [isHeaderActive, isHeaderScrolledActive]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  // Entry animation for top nav
  useGSAP(() => {
    let mm = gsap.matchMedia();

    // Desktop animation (1024px and above)
    mm.add("(min-width: 1024px)", () => {
      let tl = gsap.timeline({
        ease: "power4.inOut",
      });
      tl.to('.home-link', {
        y: 0,
        autoAlpha: 1,
      })
      tl.to(".top-nav", {
        y: 0,
        stagger: 0.05,
        autoAlpha: 1,
      }, "<0.05");
    });

    // Mobile/tablet: reset any transforms
    mm.add("(max-width: 1023px)", () => {
      gsap.set(".top-nav", {
        clearProps: "all" // Clears all GSAP-applied properties
      });
    });

    // Clean up on unmount
    return () => mm.kill();
  }, [])

  return (
    <>
      <div
        ref={headerRef}
        id="navigation_header"
        className={`fixed z-50 flex flex-row justify-between items-center w-full px-16 py-8 ${isHeaderActive ? "active" : ""
          }`}
      >
        <div className="flex overflow-hidden">
          <TransitionLink href="/" className="text-2xl home-link">
            Luci3
          </TransitionLink>
        </div>
        <div className="flex flex-row space-x-10 overflow-hidden">
          <TransitionLink
            className="text-white text-sm lg:text-base xl:text-lg nav_link underline-effect font-poppins top-nav"
            href="/work"
          >
            Work
          </TransitionLink>
          <TransitionLink
            className="text-white text-sm lg:text-base xl:text-lg nav_link underline-effect font-poppins top-nav"
            href="/test"
          >
            Studio
          </TransitionLink>

          <TransitionLink
            className="text-white text-sm lg:text-base xl:text-lg nav_link underline-effect font-poppins top-nav"
            href="#"
          >
            News
          </TransitionLink>

          <TransitionLink
            className="text-white text-sm lg:text-base xl:text-lg nav_link underline-effect font-poppins top-nav"
            href="/contact"
          >
            Contact
          </TransitionLink>
        </div>
      </div>
      <HeaderScrolled ref={ref} isActive={isHeaderScrolledActive} />
    </>
  );
}

export default forwardRef(Header);
