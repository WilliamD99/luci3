"use client";

import Link from "next/link";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import HeaderScrolled from "./HeaderScrolled";
import { Poppins, Nunito } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

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

  return (
    <>
      <div
        ref={headerRef}
        id="navigation_header"
        className={`fixed z-50 flex flex-row justify-between items-center w-full px-16 py-8 ${isHeaderActive ? "active" : ""
          }`}
      >
        <Link href="/" className="text-2xl home-link">
          Luci3
        </Link>
        <div className="flex flex-row space-x-10">
          <Link
            className="text-white text-sm lg:text-base xl:text-lg nav_link underline-effect font-poppins"
            href="/work"
          >
            Work
          </Link>
          <Link
            className="text-white text-sm lg:text-base xl:text-lg nav_link underline-effect font-poppins"
            href="/"
          >
            Studio
          </Link>
          <Link
            className="text-white text-sm lg:text-base xl:text-lg nav_link underline-effect font-poppins"
            href="#"
          >
            News
          </Link>
          <Link
            className="text-white text-sm lg:text-base xl:text-lg nav_link underline-effect font-poppins"
            href="/contact"
          >
            Contact
          </Link>
        </div>
      </div>
      <HeaderScrolled ref={ref} isActive={isHeaderScrolledActive} />
    </>
  );
}

export default forwardRef(Header);
