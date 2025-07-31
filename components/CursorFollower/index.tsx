"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import gsap from "gsap";

export interface ICursorFollowerProps {
  className?: string;
}

export default function CursorFollower({ className = "" }: ICursorFollowerProps) {
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const followerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      let { clientX, clientY } = e;

      // If not initialized yet, set position instantly without animation
      if (!isInitialized) {
        gsap.set(followerRef.current, {
          x: clientX - 12, // Offset to center the cursor
          y: clientY - 12,
          autoAlpha: 1,
          ease: "none",
        });
        setIsInitialized(true);
      } else {
        gsap.to(followerRef.current, {
          x: clientX - 12,
          y: clientY - 12,
          duration: 0.01,
          ease: "none",
        });
      }
    },
    [isInitialized]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
    gsap.to(followerRef.current, {
      scale: 1.5,
      duration: 0.3,
      ease: "power2.out",
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    gsap.to(followerRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  }, []);

  useEffect(() => {
    // Add event listeners
    window.addEventListener("mousemove", handleMouseMove);

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select');

    interactiveElements.forEach(element => {
      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);
    });

    // Cleanup function
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);

      interactiveElements.forEach(element => {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave]);

  // Hide cursor when leaving the window
  useEffect(() => {
    const handleMouseLeaveWindow = () => {
      gsap.to(followerRef.current, {
        autoAlpha: 0,
        duration: 0.2,
      });
    };

    const handleMouseEnterWindow = () => {
      if (isInitialized) {
        gsap.to(followerRef.current, {
          autoAlpha: 1,
          duration: 0.2,
        });
      }
    };

    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
    };
  }, [isInitialized]);

  return (
    <div
      id="customCursor"
      ref={followerRef}
      className={`fixed z-[9999] w-6 h-6 rounded-full pointer-events-none bg-gray-200 mix-blend-difference ${className}`}
      style={{
        transform: "translate(-50%, -50%)",
        visibility: "hidden",
        opacity: 0,
      }}
    />
  );
}
