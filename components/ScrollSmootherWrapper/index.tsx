"use client";

import * as React from "react";
import { ScrollSmoother } from "gsap-trial/ScrollSmoother";
import gsap from "@/utils/gsap";

gsap.registerPlugin(ScrollSmoother);

export interface IScrollSmootherWrapperProps {
  children: React.ReactNode;
  smooth?: number;
}

export default function ScrollSmootherWrapper({
  children,
  smooth,
}: IScrollSmootherWrapperProps) {
  React.useLayoutEffect(() => {
    // ScrollSmoother.create({
    //   smooth: smooth ? smooth : 1, // how long (in seconds) it takes to "catch up" to the native scroll position
    // });
  }, []);

  return (
    <div id="smooth-wrapper" className="App">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
