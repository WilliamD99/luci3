"use client";

import React, { useLayoutEffect, useRef, } from "react";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import gsap from "@/utils/gsap";

export interface IScrollSmootherWrapperProps {
  children: React.ReactNode;
  smooth?: number;
}

export default function ScrollSmootherWrapper({
  children,
  smooth = 1,
}: IScrollSmootherWrapperProps) {
  const smootherRef = useRef<HTMLDivElement>(null);
  const smootherContentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {

    const ctx = gsap.context(() => {
      if (!ScrollSmoother.get()) {
        ScrollSmoother.create({
          smooth: smooth,
          wrapper: smootherRef.current,
          content: smootherContentRef.current,
          normalizeScroll: true,
        })
      }
    }, smootherRef)

    return () => ctx.revert();
  }, [smooth])

  return (
    <div id="smooth-wrapper" className="App" ref={smootherRef}>
      <div id="smooth-content" ref={smootherContentRef}>{children}</div>
    </div>
  );
}
