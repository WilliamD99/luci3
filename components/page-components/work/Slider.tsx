"use client";

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

// Helper + Library
import dynamic from "next/dynamic";
import gsap from "@/utils/gsap";
import { debounce } from "lodash";
import { findIndexOfActiveElement } from "./helper";

// Component
import { Observer } from "gsap/Observer";
import SliderItem from "@/components/page-components/work/SliderItem";
import { useGSAP } from "@gsap/react";
const IndexIndicator = dynamic(() => import("./IndexIndicator"));
const SliderContent = dynamic(() => import("./SliderContent"));

interface SliderItemProps {
  image: string;
  title: string | any;
  subTitle: string;
  slug: string;
}

interface SliderProps {
  items: SliderItemProps[];
  reversed?: boolean;
  className?: string;
  action?: boolean; // Use this props to trigger the animation from the parent component (the state should toggle between true and false)
  actionDirection?: 1 | -1;
  showIndex?: boolean; // (Optional) Use this props to show pagination
  showContent?: boolean; // (Optional) Use this props to show the content;
  disabled?: boolean;
  onAnimationChange?: (isAnimating: boolean) => void; // Callback to notify parent about animation state
}

function Slider(
  {
    items,
    reversed = false,
    className,
    action,
    actionDirection = 1,
    showIndex,
    showContent,
    disabled,
    onAnimationChange,
  }: SliderProps,
  ref: any
) {
  const itemsRef = useRef<HTMLDivElement[]>([]);
  const observerRef = useRef<any>(null);

  const [index, setIndex] = useState<number>(0);
  const [isAnimating, setAnimating] = useState<boolean>(false);

  const updateIndex = (direction: number) => {
    setIndex((prevIndex) => {
      let newIndex = prevIndex + direction;

      // Wrap around logic for increasing index
      if (direction === 1) {
        newIndex = newIndex >= itemsRef.current.length ? 0 : newIndex;
      }

      // Wrap around logic for decreasing index
      if (direction === -1) {
        newIndex = newIndex < 0 ? itemsRef.current.length - 1 : newIndex;
      }

      return newIndex;
    });
  };

  let { contextSafe } = useGSAP({ scope: ref })

  let animate = contextSafe((direction: number) => {
    try {
      // Next: 1
      // Prev : -1
      // Current Item
      let currentIndex = findIndexOfActiveElement(itemsRef.current);
      // Determine the next item index base on the direction going
      let nextIndex = currentIndex + direction;
      const length = itemsRef.current.length;
      nextIndex =
        direction === 1
          ? nextIndex >= length
            ? 0
            : nextIndex
          : nextIndex < 0
            ? length - 1
            : nextIndex;

      let currentItem = itemsRef.current[currentIndex];
      let currentItemInner = currentItem.querySelector(".slider__item-inner");

      // Next Item based on the direction
      let nextItem = itemsRef.current[nextIndex];
      let nextItemInner = nextItem.querySelector(".slider__item-inner");

      let tl = gsap.timeline({
        defaults: { duration: 1.1, ease: "expo.inOut" },
        onComplete: () => {
          updateIndex(direction);
          setAnimating(false);
        },
      });
      tl.to(currentItem, {
        yPercent: reversed ? direction * 100 : -direction * 100,
        autoAlpha: 1,
      });
      tl.to(
        currentItemInner,
        {
          yPercent: reversed ? -direction * 30 : direction * 30,
        },
        0
      );

      tl.to(
        nextItem,
        {
          startAt: {
            yPercent: reversed ? -direction * 50 : direction * 50,
            autoAlpha: 1,
          },
          yPercent: 0,
        },
        0
      );

      tl.to(
        nextItemInner,
        {
          startAt: {
            yPercent: reversed ? direction * 30 : -direction * 30,
          },
          yPercent: 0,
        },
        0
      );
    } catch (e) {
      return;
    }
  });

  const navigate = useCallback(
    debounce((direction: string) => {
      // Don't run the animation if it's still playing
      if (isAnimating) return;
      setAnimating(true);

      if (direction === "next") animate(1);
      else animate(-1);
    }, 200),
    [index, setIndex]
  );

  useEffect(() => {
    let observer: any;
    setTimeout(() => {
      observer = Observer.create({
        target: window,
        type: "wheel,touch",
        onUp: () => navigate("next"), // Mouse down
        onDown: () => navigate("prev"), // Mouse up
        wheelSpeed: -1,
        debounce: true,
      });

      observerRef.current = observer;
    }, 500);

    return () => observer?.kill();
  }, []);

  // this effect may be used to enable manually trigger the animation by click (instead of scroll like normal)
  useEffect(() => {
    if (!action) return;
    else {
      if (actionDirection === 1) navigate("next");
      else if (actionDirection === -1) navigate("prev");
    }
  }, [action]);

  // Disable the main navigation when the page's route changing or during animations
  useEffect(() => {
    if (observerRef.current) {
      if (disabled || isAnimating) observerRef.current.disable();
      else observerRef.current.enable();
    }
  }, [disabled, isAnimating, observerRef]);

  // Notify parent about animation state changes
  useEffect(() => {
    if (onAnimationChange) {
      onAnimationChange(isAnimating);
    }
  }, [isAnimating, onAnimationChange]);

  return (
    <>
      <div ref={ref}>
        <div className={`slider ${className}`}>
          {items.map((work, workIndex) => (
            <SliderItem
              key={workIndex}
              ref={itemsRef}
              currentIndex={index}
              image={work.image}
              index={workIndex}
            />
          ))}
        </div>
        {showContent ? (
          <SliderContent
            index={index}
            items={items}
            isAnimating={isAnimating}
          />
        ) : (
          <></>
        )}
        {showIndex ? (
          <IndexIndicator
            index={index}
            total={items.length}
            isAnimating={isAnimating}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default forwardRef(Slider);
