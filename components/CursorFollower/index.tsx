"use client";

import * as React from "react";
import gsap from "gsap-trial";

export interface ICursorFollowerProps {}

export default function CursorFollower(props: ICursorFollowerProps) {
  const followerRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = React.useCallback(
    (e: any, xTo: any, yTo: any) => {
      let parents = [];
      let { clientX, clientY } = e;
      xTo(clientX);
      yTo(clientY);

      let test = document.elementFromPoint(clientX, clientY);
      console.log(test?.id);
    },
    [followerRef]
  );

  React.useEffect(() => {
    let xTo = gsap.quickTo(followerRef.current, "x", {
      duration: 0.4,
      ease: "power3",
    });
    let yTo = gsap.quickTo(followerRef.current, "y", {
      duration: 0.4,
      ease: "power3",
    });

    window.addEventListener("mousemove", (e) => handleMouseMove(e, xTo, yTo));

    return () => {
      window.removeEventListener("mousemove", (e) =>
        handleMouseMove(e, xTo, yTo)
      );
    };
  }, []);

  return (
    <div
      id="follower"
      ref={followerRef}
      className="fixed z-50 rounded-full px-4 py-4 w-20 h-20 flex justify-center items-center"
      style={{
        backdropFilter: "blur(20px)",
        background: "rgba(0,0,0,.15)",
      }}
    >
      <p className="text-white">View</p>
    </div>
  );
}
