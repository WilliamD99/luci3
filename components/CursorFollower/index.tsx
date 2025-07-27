"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import gsap from "gsap";
import { debounce } from "lodash";

export interface ICursorFollowerProps { }

export default function CursorFollower(props: ICursorFollowerProps) {
  const [isMouseOver, setMouseOver] = useState<boolean>(false)
  const [isInitialized, setIsInitialized] = useState<boolean>(false)
  const followerRef = useRef<HTMLDivElement>(null);

  const handleMouseOver = useCallback(debounce((e: any, xTo: any, yTo: any) => {
    let { clientX, clientY } = e;

    let parents = [
      document.getElementById("home_hero"),
      document.getElementById("home_workInMotion"),
      document.getElementById("project1"),
      document.getElementById("project2"),
      document.getElementById("project3"),
      document.getElementById("project4"),
    ]

    // Check if all null
    let allNull = parents.every((parent) => parent === null);
    if (allNull) return

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

  const handleMouseMove = useCallback(
    (e: any, xTo: any, yTo: any) => {
      let { clientX, clientY } = e;

      // If not initialized yet, set position instantly without animation
      if (!isInitialized) {
        gsap.set(followerRef.current, { x: clientX, y: clientY });
        setIsInitialized(true);
      } else {
        xTo(clientX);
        yTo(clientY);
      }
    },
    [followerRef, isInitialized]
  );

  useEffect(() => {
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
  useEffect(() => {
    // Only show the follower if it's initialized and mouse is over
    const shouldShow = isInitialized && isMouseOver;

    gsap.fromTo(
      followerRef.current,
      {
        autoAlpha: shouldShow ? 0 : 1,
        scale: shouldShow ? 0 : 1,
      },
      {
        autoAlpha: shouldShow ? 1 : 0,
        scale: shouldShow ? 1 : 0,
        duration: 0.4,
        ease: "power3",
      }
    );
  }, [isMouseOver, isInitialized])



  return (
    <div
      id="follower"
      ref={followerRef}
      className="fixed z-50 -left-100 rounded-full px-4 py-4 w-24 h-24 justify-center items-center flex"
      style={{
        backdropFilter: "blur(20px)",
        background: "rgba(0,0,0,.15)",
      }}
    >
      <p className="text-white">View</p>
    </div>
  );
}
