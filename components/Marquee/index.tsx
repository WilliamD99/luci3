import React, { ReactNode, useCallback, useRef } from "react";
import gsap from "@/utils/gsap";
import { useGSAP } from "@gsap/react";
import { horizontalLoop } from "./helper";

interface MarqueeProps {
  speed?: number;
  children: ReactNode | ReactNode[];
  itemsPerView?: number;
  pauseOnHover?: boolean;
  pauseOnClick?: boolean;
  className?: string;
  paused?: boolean;
  id?: string;
  fill?: boolean; // Use this option to make it fill the awkward space
}

export default function Marquee({
  speed = 1,
  children,
  itemsPerView = 2,
  pauseOnHover,
  pauseOnClick,
  className,
  paused,
  id,
  fill,
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const loopRef = useRef<any>(null);

  // To prevent weird space, the number of items per view
  // should be less than the actual number of items given
  // const childrenWidth = 100 / (itemsPerView ? itemsPerView : 2);

  // If number of items per view greater than the actual children
  // Duplicate the children so that the count is greater than the items per view
  // Take the number of items per view (IPV) / actual child number --> Floor it
  const childrenCount = React.Children.count(children);
  let renderElement = useCallback(() => {
    let ele: any = [];
    if (fill) {
      for (let i = 0; i < Math.ceil(itemsPerView / childrenCount); i++) {
        ele.push(children);
      }
      ele = [].concat(...ele);
    } else {
      ele = children;
    }

    return React.Children.map(ele, (child, index) => (
      <>
        <div
          key={`mar-${index}`}
          className="mrq-ele flex flex-row items-center"
        >
          {child}
        </div>
      </>
    ));
  }, []);

  const handleMouseMove = () => {
    if (pauseOnHover) {
      if (loopRef.current.paused()) {
        loopRef.current.play();
      } else {
        loopRef.current.pause();
      }
    } else return;
  };

  const handleClick = () => {
    if (pauseOnClick) {
      if (loopRef.current.paused()) {
        loopRef.current.play();
      } else {
        loopRef.current.pause();
      }
    } else return;
  };

  useGSAP(
    () => {
      const boxes = gsap.utils.toArray(".mrq-ele");

      const loop = horizontalLoop(boxes, {
        paused: paused,
        repeat: -1,
        speed: speed,
      });

      loopRef.current = loop;
    },
    { scope: containerRef, dependencies: [children], revertOnUpdate: true }
  );

  return (
    <>
      <div
        id={id}
        ref={containerRef}
        className={`mrq-container overflow-hidden ${
          className ? className : ""
        }`}
        onMouseEnter={handleMouseMove}
        onMouseLeave={handleMouseMove}
        onClick={handleClick}
      >
        {renderElement()}
      </div>
    </>
  );
}
