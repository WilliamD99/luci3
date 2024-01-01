import React, { useEffect, useRef } from "react";
import headingFont from "@/utils/fonts/heading";
import gsap from "@/utils/gsap";
import { useGSAP } from "@gsap/react";

interface SliderItemProps {
  title: string;
  subTitle: string;
}

interface SliderContentProps {
  index: number;
  items: SliderItemProps[];
  isAnimating: boolean;
}

export default function SliderContent({
  index,
  items,
  isAnimating,
}: SliderContentProps) {
  const titleRef = useRef<HTMLParagraphElement>(null);
  const subTitleRef = useRef<HTMLParagraphElement>(null);

  const animationRef = useRef<any>(null);
  const animationExitRef = useRef<any>(null);

  useGSAP(() => {
      // Timeline 1
      let tl = gsap.timeline({ paused: true });
      tl.to(titleRef.current, {
        duration: 0.5,
        autoAlpha: 0,
        ease: "expo.in",
      });
      tl.to(
        subTitleRef.current,
        {
          duration: 0.5,
          autoAlpha: 0,
          ease: "expo.in",
        },
        "<0.2"
      );
      animationRef.current = tl;

      // Timeline 2
      let tl2 = gsap.timeline({ paused: true });
      tl2.to(titleRef.current, {
        autoAlpha: 1,
        duration: 0.5,
        ease: "expo.in",
        // delay: 0.5
      });
      tl2.to(
        subTitleRef.current,
        {
          autoAlpha: 1,
          duration: 0.5,
          ease: "expo.in",
        },
        "<0.2"
      );
      animationExitRef.current = tl2;
  }, [])

  useEffect(() => {
    if (animationRef.current) {
      if (isAnimating) {
        animationRef.current.time(0);
        animationRef.current.play();
      } else {
        // animationRef.current.totalProgress(1).kill()
        animationExitRef.current.time(0);
        animationExitRef.current.play();
      }
    }
  }, [isAnimating]);

  return (
    <>
      <div className="slider-content absolute z-50 left-1/2 lg:left-64 xl2:left-80 bottom-36 lg:bottom-0 lg:top-1/2 -translate-x-1/2 lg:translate-x-0 lg:-translate-y-1/2 mt-10">
        <div className="slider-content--title overflow-hidden">
          <p ref={titleRef} className={`text-white ${headingFont.className}`}>
            {items[index].title}
          </p>
        </div>
        <div className="slider-content--subTitle overflow-hidden">
          <p ref={subTitleRef} className="text-white">
            {items[index].subTitle}
          </p>
        </div>
      </div>
    </>
  );
}
