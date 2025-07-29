'use client'
import React, { useRef } from "react";
import { SparklesIcon } from "@heroicons/react/24/solid";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function WorkInMotion() {
  let containerRef = useRef<HTMLDivElement>(null);
  let videoRef = useRef<HTMLDivElement>(null);
  let text1Ref = useRef<HTMLParagraphElement>(null);
  let text2Ref = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();
    // Mobile (768px and below)
    mm.add("(max-width: 768px)", () => {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom+=400px",
          scrub: 1,
          pin: true,
          pinType: "transform",
          anticipatePin: 1,
          invalidateOnRefresh: true
        },
      });
      tl.fromTo(
        videoRef.current,
        {
          scale: 0.5
        },
        {
          scale: 1
        }
      );

      tl.fromTo(
        text1Ref.current,
        {
          x: "-100%",
        },
        {
          x: 0,
        },
        "<"
      );
      tl.fromTo(
        text2Ref.current,
        {
          x: "100%",
        },
        {
          x: 0,
        },
        "<"
      );
    })
    // Desktop (769px and above)
    mm.add("(min-width: 769px)", () => {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom+=800px",
          scrub: 1,
          pin: true,
        },
      });
      tl.fromTo(
        videoRef.current,
        {
          scale: 0.5
        },
        {
          scale: 1
        }
      );

      tl.fromTo(
        text1Ref.current,
        {
          x: "-100%",
        },
        {
          x: 0,
        },
        "<"
      );
      tl.fromTo(
        text2Ref.current,
        {
          x: "100%",
        },
        {
          x: 0,
        },
        "<"
      );
    })

    return () => {
      mm.revert()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      id="home_workInMotion"
      className="flex flex-col items-center justify-between h-screen"
    >
      <div className="top flex flex-row items-center space-x-3 z-10">
        <SparklesIcon className="h-4 w-4 " />
        <p className="font-nunito xl2:text-2xl">Work in motion</p>
      </div>
      <div className="center z-10 flex justify-between space-x-5 ">
        <p className={`font-poppins`} ref={text1Ref}>
          Digital
        </p>
        <p className={`font-poppins`} ref={text2Ref}>
          Architect
        </p>
      </div>
      <div className="bottom z-10 mb-10">
        <p className="max-w-4xl text-center text-sm lg:text-base xl2:text-lg px-5 font-nunito">
          As Digital Architects, I design and build engaging web experiences. I focus on crafting functional, beautiful, and user-centered solutions that bring ideas to life online.
        </p>
      </div>
      <div ref={videoRef} className="videoWrapper">
        <video playsInline loop muted disablePictureInPicture autoPlay={true}>
          <source src="/assets/video/preview.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
