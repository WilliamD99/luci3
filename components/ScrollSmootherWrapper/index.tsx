"use client";

import React, { useLayoutEffect, useRef } from "react";
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

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!ScrollSmoother.get()) {
        ScrollSmoother.create({
          smooth: smooth,
          wrapper: '#smooth-wrapper',
          content: '#smooth-content',
          normalizeScroll: true,
        })
      }
    }, smootherRef)

    return () => ctx.revert();
  }, [])

  return (
    <div id="smooth-wrapper" className="App" ref={smootherRef}>
      <div id="smooth-content">{children}</div>
    </div>
  );
}
