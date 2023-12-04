"use client";

import * as React from "react";
import gsap from "gsap-trial";
import { debounce } from "lodash";

export interface ICursorFollowerProps {}

export default function CursorFollower(props: ICursorFollowerProps) {
  const [isMouseOver, setMouseOver] = React.useState<boolean>(false)
  const followerRef = React.useRef<HTMLDivElement>(null);

  const handleMouseOver = React.useCallback(debounce((e: any, xTo: any, yTo: any) => {
    let { clientX, clientY } = e;

    let parents = [
      document.getElementById("home_hero"),
      document.getElementById("home_workInMotion"),
      document.getElementById("project1"),
      document.getElementById("project2"),
      document.getElementById("project3"),
      document.getElementById("project4"),
    ]

    // Get the current element from point
    let elementOnPoint = document.elementFromPoint(clientX, clientY)

    let isOver = parents.some((parent: any) => parent.contains(elementOnPoint))
    if (isOver) {
      if (!isMouseOver) {
        setMouseOver(true)
      }
    } else {
        setMouseOver(false)
    }
  }, 100), [followerRef, isMouseOver])

  const handleMouseMove = React.useCallback(
    (e: any, xTo: any, yTo: any) => {
      let { clientX, clientY } = e;
      xTo(clientX);
      yTo(clientY);
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

    window.addEventListener("mousemove", (e) => handleMouseOver(e, xTo, yTo));
    window.addEventListener("mousemove", (e) => handleMouseMove(e, xTo, yTo));

    return () => {
      window.removeEventListener("mousemove", (e) => handleMouseOver(e, xTo, yTo))
      window.removeEventListener("mousemove", (e) => handleMouseMove(e, xTo, yTo))

      handleMouseOver.cancel()
    };
  }, [handleMouseMove, handleMouseOver]);

  // Showing the follower when the mouse is over the div
  React.useEffect(() => {
    gsap.fromTo(
      followerRef.current,
      {
        autoAlpha: isMouseOver ? 0 : 1,
        scale: isMouseOver ? 0 : 1,
      },
      {
        autoAlpha: isMouseOver ? 1 : 0,
        scale: isMouseOver ? 1 : 0,
        duration: 0.4,
        ease: "power3",
      }
    );
  }, [isMouseOver])

  return (
    <div
      id="follower"
      ref={followerRef}
      className="fixed z-50 rounded-full px-4 py-4 w-24 h-24 flex justify-center items-center"
      style={{
        backdropFilter: "blur(20px)",
        background: "rgba(0,0,0,.15)",
      }}
    >
      <p className="text-white">View</p>
    </div>
  );
}
