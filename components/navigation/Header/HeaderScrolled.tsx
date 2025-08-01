import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { usePathname } from "next/navigation";
import { MenuIcon } from 'lucide-react'

type Props = {
  isActive: boolean;
};

const HeaderScrolled = ({ isActive }: Props, ref: any) => {
  const pathName = usePathname();

  let headerScrolledRef = useRef<HTMLDivElement>(null);

  let btnOpenRef = useRef<HTMLButtonElement>(null);
  let btnCloseRef = useRef<HTMLButtonElement>(null);
  let timelineRef = useRef<any>(null);
  let dropdownMenuRef = useRef<HTMLDivElement>(null);
  let dropdownMenuImgRef = useRef<HTMLDivElement>(null);

  let [theme, setTheme] = useState<"white" | "black" | string>("white");
  // Add state to track dropdown menu open/closed status
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Add state to track if dropdown should be rendered
  const [shouldRenderDropdown, setShouldRenderDropdown] = useState(false);
  // Add state to track if animation is currently running
  const [isAnimating, setIsAnimating] = useState(false);

  // Ref for smooth theme transitions
  const themeTransitionRef = useRef<any>(null);

  // Throttling for theme changes to prevent flickering
  const lastThemeChangeRef = useRef<number>(0);
  const currentThemeRef = useRef<string>("white");

  // Cache DOM elements and use refs for better performance
  const elementsRef = useRef<{
    homeWork: HTMLElement | null;
    homeWorkInMotion: HTMLElement | null;
    homeInTheMedia: HTMLElement | null;
    footer: HTMLElement | null;
  }>({
    homeWork: null,
    homeWorkInMotion: null,
    homeInTheMedia: null,
    footer: null,
  });

  // Function to refresh DOM element cache
  const refreshElementCache = useCallback(() => {
    elementsRef.current = {
      homeWork: document.getElementById("home_work"),
      homeWorkInMotion: document.getElementById("home_workInMotion"),
      homeInTheMedia: document.getElementById("home_inTheMedia"),
      footer: document.getElementById("footer"),
    };

  }, []);

  // Initialize cached elements and theme
  useEffect(() => {
    // Cache DOM elements for performance
    refreshElementCache();

    // Initialize theme refs
    currentThemeRef.current = theme;

  }, [theme, refreshElementCache]);

  // Smooth theme transition function using GSAP with light throttling
  const animateThemeChange = useCallback((newTheme: string) => {
    const now = Date.now();
    const timeSinceLastChange = now - lastThemeChangeRef.current;

    // Prevent rapid theme changes (throttle to max 1 change per 50ms)
    if (currentThemeRef.current === newTheme || timeSinceLastChange < 50) {
      return;
    }

    // Kill any existing transition
    if (themeTransitionRef.current) {
      themeTransitionRef.current.kill();
    }

    // Update refs
    lastThemeChangeRef.current = now;
    currentThemeRef.current = newTheme;

    // Set theme immediately for responsiveness
    setTheme(newTheme);

    // Create smooth transition timeline for visual effects (optional)
    const tl = gsap.timeline();

    // Animate theme change with smooth fade
    tl.to(headerScrolledRef.current, {
      duration: 0.2,
      ease: "power2.out",
    });

    themeTransitionRef.current = tl;
  }, []);

  // Simplified theme change function with reliable boundary detection
  const handleChangeColor = useCallback(() => {
    const checkTheme = () => {
      const { homeWork, homeWorkInMotion, homeInTheMedia, footer } = elementsRef.current;

      // If any element is missing, try to refresh cache
      if (!homeWork || !homeWorkInMotion || !homeInTheMedia || !footer) {
        refreshElementCache();
      }

      const components = [
        { element: elementsRef.current.homeWork, theme: "black", name: "home_work" },
        { element: elementsRef.current.homeWorkInMotion, theme: "white", name: "home_workInMotion" },
        { element: elementsRef.current.homeInTheMedia, theme: "black", name: "home_inTheMedia" },
        { element: elementsRef.current.footer, theme: "white", name: "footer" },
      ];

      const headerHeight = 100; // Account for header height

      // Check sections from top to bottom with hysteresis
      for (let i = 0; i < components.length; i++) {
        const { element, theme: newTheme } = components[i];

        if (element) {
          const rect = element.getBoundingClientRect();

          // Simplified detection: check if section is in viewport
          const threshold = currentThemeRef.current === newTheme ? 200 : 150;

          if (rect.top <= threshold && rect.bottom >= headerHeight) {
            // Calculate how much of the section is visible
            const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
            const totalHeight = rect.height;
            const visibilityRatio = visibleHeight / totalHeight;

            // Lower threshold for better responsiveness (>10% visible)
            if (visibilityRatio > 0.1) {
              animateThemeChange(newTheme);
              return;
            }
          }
        }
      }

      // Default to white if no section is prominently visible
      animateThemeChange("white");
    };

    requestAnimationFrame(checkTheme);
  }, [animateThemeChange, refreshElementCache]);

  // Optimized scroll handler with throttling
  useEffect(() => {
    let ticking = false;

    const scrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleChangeColor();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial call to set theme on mount (with slight delay to ensure DOM is ready)
    const timer = setTimeout(() => {
      handleChangeColor();
    }, 100);

    window.addEventListener("scroll", scrollHandler, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", scrollHandler);
      // Kill any ongoing theme transitions on cleanup
      if (themeTransitionRef.current) {
        themeTransitionRef.current.kill();
      }
    };
  }, [handleChangeColor]);

  const { contextSafe } = useGSAP(() => {
    if (ref.current && shouldRenderDropdown && dropdownMenuRef.current) {
      // Universal easing function - change this to try different easing
      const universalEasing = "expo.out";

      // Set initial styles immediately to prevent flashing
      gsap.set(dropdownMenuRef.current, {
        clipPath: "polygon(0px 0px, 100% 0, 100% 0%, 0px 0)",
        autoAlpha: 1
      });
      gsap.set("#dropdown_menu .wrapper", {
        autoAlpha: 0.5,
        scale: 1.3,
        rotate: -5,
        y: -400,
      });
      gsap.set(".navigation_link", {
        y: 100,
        rotate: 6,
        autoAlpha: 0
      });
      gsap.set(".social_link", {
        y: 100,
        rotate: 6,
        autoAlpha: 0
      });
      gsap.set(".btn-close .text", {
        y: 30,
        rotateX: 10,
        autoAlpha: 0
      });
      gsap.set("#dropdown_menu .left .img", {
        autoAlpha: 0
      });

      // Opening animation timeline
      const openTimeline = gsap.timeline({
        paused: true,
        onStart: () => {
          setIsAnimating(true);
        },
        onComplete: () => {
          setIsAnimating(false);
          // disable scroll
          document.body.style.overflow = "hidden";
          // Refresh ScrollTrigger after menu opens to prevent interference with pinned sections
          ScrollTrigger.refresh();
        }
      });

      openTimeline.fromTo(
        dropdownMenuRef.current,
        {
          clipPath: "polygon(0px 0px, 100% 0, 100% 0%, 0px 0)",
          // autoAlpha: 0,
        },
        {
          clipPath: "polygon(0px 0px, 100% 0, 100% 115%, 0px 100%)",
          duration: 1.75,
          // autoAlpha: 1,
          ease: universalEasing,
        }
      );
      openTimeline.fromTo(
        "#dropdown_menu .wrapper",
        {
          autoAlpha: 0.5,
          scale: 1.3,
          rotate: -5,
          y: -400,
        },
        {
          autoAlpha: 1,
          scale: 1,
          rotate: 0,
          y: 0,
          ease: universalEasing,
          duration: 1.75,
        },
        "<"
      );
      openTimeline.fromTo(
        ".btn-open .text",
        {
          y: 0,
        },
        {
          y: -30,
          rotateX: 10,
          duration: 0.3,
          ease: "Sine.in",
        },
        "<"
      );

      openTimeline.fromTo(
        ".btn-open .icon",
        {
          autoAlpha: 1,
        },
        {
          autoAlpha: 0,
          ease: "Sine.easeInOut",
          duration: 0.3,
          onComplete: () => btnOpenRef.current?.classList.remove("z-20"),
        },
        "<"
      );
      openTimeline.fromTo(
        ".btn-close .text",
        {
          y: 30,
          rotateX: 10,
        },
        {
          y: 0,
          rotateX: 0,
          autoAlpha: 1,
          ease: "Sine.easeInOut",
          duration: 0.4,
          delay: 0.1,
          onComplete: () => { },
        },
        "<"
      );
      openTimeline.fromTo(
        ".btn-close .icon",
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          ease: "Sine.easeInOut",
          duration: 0.3,
        },
        "<"
      );

      openTimeline.to(
        "#dropdown_menu .left .img",
        {
          autoAlpha: 1,
          duration: 0.6,
        },
        "<"
      );

      openTimeline.fromTo(
        ".navigation_link",
        {
          y: 100,
          rotate: 6,
        },
        {
          y: 0,
          rotate: 0,
          autoAlpha: 1,
          stagger: 0.05,
          delay: 0.2,
          duration: 0.6,
          ease: "power1.out",
        },
        "<"
      );

      openTimeline.fromTo(
        ".social_link",
        {
          y: 100,
          rotate: 6,
        },
        {
          y: 0,
          rotate: 0,
          autoAlpha: 1,
          stagger: 0.03,
          delay: 0.3,
          duration: 0.5,
          ease: "power1.out",
        },
        "<"
      );

      // Closing animation timeline
      const closeTimeline = gsap.timeline({
        paused: true,
        onStart: () => {
          setIsAnimating(true);
        },
        onComplete: () => {
          setIsAnimating(false);
          // Re-enable ScrollSmoother instead of changing body overflow
          const scrollSmoother = ScrollSmoother.get();
          if (scrollSmoother) {
            scrollSmoother.paused(false);
          }
          ref.current.style.transform = "none";
          // Remove dropdown from DOM after closing
          setShouldRenderDropdown(false);
        }
      });

      closeTimeline.fromTo(
        dropdownMenuRef.current,
        {
          clipPath: "polygon(0px 0px, 100% 0, 100% 115%, 0px 100%)",
        },
        {
          clipPath: "polygon(0px 0px, 100% 0, 100% 0%, 0px 0)",
          duration: 1.4,
          height: 0,
          ease: universalEasing,
        }
      )

      closeTimeline.to(
        "#dropdown_menu .wrapper",
        {
          y: -400,
          rotate: -5,
          scale: 1.3,
          duration: 1.4,
          autoAlpha: 0.5,
          ease: universalEasing,
        },
        "<"
      );

      closeTimeline.fromTo(".btn-close .text",
        {
          y: 0,
        },
        {
          y: -30,
          rotateX: 10,
          duration: 0.3,
          ease: "Sine.in",
        },
        "<0.5"
      )

      closeTimeline.fromTo(".btn-close .icon",
        {
          autoAlpha: 1,
        },
        {
          autoAlpha: 0,
          duration: 0.3,
          ease: "Sine.easeInOut",
        },
        "<"
      )

      closeTimeline.to(".btn-open .icon",
        {
          autoAlpha: 1,
          delay: 0.15,
          duration: 0.3,
          ease: "Sine.easeInOut",
        },
        "<"
      )

      // Store both timelines
      timelineRef.current = { open: openTimeline, close: closeTimeline };
    }

  }, { scope: headerScrolledRef, dependencies: [ref.current, shouldRenderDropdown] })

  const toggleAnimation: any = contextSafe(() => {
    // Prevent starting new animations if one is currently running
    if (isAnimating) {
      return;
    }

    if (isMenuOpen) {
      // Close the menu with close animation
      if (timelineRef.current?.close) {
        timelineRef.current.close.restart();
        setIsMenuOpen(false);
      }
    } else {
      // Open the menu with open animation
      setShouldRenderDropdown(true); // Render dropdown before opening
      setIsMenuOpen(true);

      // Use setTimeout to ensure the DOM is updated before starting animation
      setTimeout(() => {
        if (timelineRef.current?.open && !isAnimating) {
          timelineRef.current.open.restart();
        }
      }, 0);
    }
  });

  // Close the menu when navigating between pages
  useEffect(() => {
    if (timelineRef.current?.close && isMenuOpen && !isAnimating) {
      setTimeout(() => {
        timelineRef.current.close.restart();
        setIsMenuOpen(false);
      }, 200)
    }
  }, [pathName]); // Only run when pathName changes (navigation)

  return (
    <>
      <div
        ref={headerScrolledRef}
        id="navigation_header--scrolled"
        className={`fixed z-50 flex flex-row justify-between items-center w-screen lg:w-full px-5 lg:px-16 py-5 lg:py-8 ${isActive ? "active" : ""
          }`}
      >
        <div className="relative h-16 w-16">
          {/* Monkey logo */}
          <Link href="/" className='brandmark h-full lg:w-full'>
            <svg viewBox="0 0 64 66" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                style={{ fill: theme === "white" ? "transparent" : "black" }}
                d="M58.1471 10.4536C58.1887 10.3412 58.2549 10.3412 58.2942 10.4536L59.5766 13.9755C59.749 14.3768 60.0632 14.6975 60.4569 14.8741L63.9191 16.1771C64.027 16.217 64.027 16.2844 63.9191 16.3268L60.4569 17.6298C60.0623 17.8052 59.7478 18.1263 59.5766 18.5284L58.2942 22.0403C58.2549 22.1527 58.1887 22.1527 58.1471 22.0403L56.8671 18.5184C56.6959 18.1163 56.3813 17.7952 55.9868 17.6198L52.5246 16.3168C52.4167 16.2744 52.4167 16.207 52.5246 16.1671L55.9868 14.8641C56.3805 14.6875 56.6947 14.3668 56.8671 13.9655L58.1471 10.4536ZM50.2785 7.40835C50.175 7.64899 49.9858 7.84076 49.7489 7.94501L47.6721 8.72877C47.6083 8.75373 47.6083 8.79367 47.6721 8.81863L49.7489 9.5999C49.9865 9.70432 50.176 9.89718 50.2785 10.1391L51.046 12.2532C51.0705 12.3181 51.1098 12.3181 51.1343 12.2532L51.9042 10.1391C52.0066 9.89792 52.195 9.70527 52.4314 9.5999L54.5083 8.81114C54.5745 8.78618 54.5745 8.74625 54.5083 8.72128L52.4314 7.93752C52.1957 7.83234 52.0075 7.64077 51.9042 7.40086L51.1343 5.28669C51.1098 5.21929 51.0705 5.21929 51.046 5.28669L50.2785 7.40835ZM54.2287 45.7206C53.8732 53.9751 46.4264 61.049 42.0177 64.531C41.0526 65.2897 39.8681 65.7022 38.6486 65.7042C38.0098 65.7045 37.3759 65.5913 36.7753 65.3697C24.5741 60.8768 9.38142 50.6778 1.74586 43.4167C1.1394 42.8432 0.668723 42.137 0.369285 41.3514C0.0698469 40.5657 -0.0505481 39.7212 0.0171823 38.8814C1.34617 21.908 15.5826 0 28.8847 0C36.5375 0 38.4476 2.57345 41.9221 9.93188C43.0623 12.3356 44.7296 14.3924 46.3357 16.3792C50.1388 21.0619 53.731 25.4874 48.2973 32.7834C52.4314 36.7896 54.4249 41.1428 54.2287 45.7206ZM45.681 33.1454C46.2842 32.6462 46.9365 31.4655 47.2528 30.5919C44.3373 32.0122 43.0328 30.0353 40.8775 30.4995C37.3589 31.2484 36.074 32.8933 31.224 31.7875C32.7197 32.8309 34.8063 34.0939 36.5129 34.6405C34.365 36.852 32.9943 39.7874 32.2195 43.6863C34.2399 43.9634 36.5816 43.3319 39.1954 42.7403C38.195 41.1004 37.7046 38.9088 37.5305 36.3803C38.5152 38.6814 40.0771 40.6785 42.0594 42.1712C45.1808 41.672 48.6185 41.647 52.2965 43.4192C50.509 36.2505 45.681 33.1454 45.681 33.1454ZM6.56406 23.0038C7.44842 24.7677 8.38509 26.5075 9.37406 28.2231C12.6892 20.8297 17.1666 13.4963 24.4858 7.60304C17.8213 14.9041 13.7852 23.0937 11.3455 31.5005C11.8817 32.3541 12.4309 33.2003 12.9932 34.039C15.2417 27.1523 18.5299 20.2182 24.4564 14.2551C19.1968 21.4563 16.3795 29.1916 15.0161 36.9694C15.5629 37.7182 16.1245 38.4845 16.6933 39.2333C17.9193 33.048 20.0281 26.7355 24.4294 20.9196C20.6877 27.8212 19.0767 34.8976 18.726 41.8192C20.7759 44.3436 22.9525 46.7798 25.2558 49.1277C27.1438 51.0497 29.0932 52.8852 31.1038 54.6341L31.2313 54.6815C28.1737 49.5645 25.116 43.3593 23.6301 37.853C25.4029 33.36 27.8549 28.5127 30.7679 26.9376C33.6809 25.3626 37.2314 28.9969 41.108 28.4153C43.1554 28.1083 45.5535 24.5764 48.1649 28.2356C52.5025 23.8675 41.775 16.1521 38.016 7.01896C36.3781 3.02524 33.0752 1.83212 28.1712 2.06176C16.9459 2.57096 7.36342 21.2341 6.56406 23.0038ZM38.2857 63.5351C24.5146 53.9191 13.1951 41.0981 5.26694 26.1364C4.56612 27.9933 3.96932 29.8892 3.47943 31.815C7.24082 38.18 10.5118 41.9415 15.9994 47.7724C10.5854 44.0058 6.38506 39.5129 2.7708 34.97C2.60896 35.8187 2.36866 37.1765 2.17005 38.9038C2.10988 39.4339 2.17333 39.971 2.35524 40.4715C2.53716 40.972 2.83242 41.4217 3.21706 41.7843C13.3626 51.3456 25.2867 58.7414 38.2857 63.5351V63.5351ZM52.3358 45.8354C47.2846 42.0539 38.6854 45.9652 31.2289 46.5643C37.1627 48.3889 43.6655 45.5159 49.3909 47.3131C48.5768 51.217 46.7648 55.2856 44.5703 59.4166C48.236 55.8047 51.2692 51.1695 52.3358 45.8354V45.8354ZM43.229 36.7896C42.1747 36.5145 41.1565 36.1123 40.1959 35.5915L39.2592 37.3388C39.9237 37.6782 42.8367 38.135 44.0627 38.0477C44.2383 38.0358 44.4026 37.9553 44.5212 37.823C45.3157 36.9419 45.9409 35.8262 46.5245 34.8003C45.5981 35.557 44.5954 36.2113 43.5331 36.7522C43.4395 36.8017 43.3315 36.815 43.229 36.7896Z"
                fill="currentColor"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                style={{ fill: "white" }}
                d="M58.1446 10.4537C58.1863 10.3413 58.2525 10.3413 58.2917 10.4537L59.5717 13.9756C59.7452 14.3764 60.0602 14.6962 60.4544 14.8717L63.9142 16.1772C64.0245 16.2171 64.0245 16.2845 63.9142 16.3269L60.4544 17.6299C60.0598 17.806 59.7447 18.1268 59.5717 18.5285L58.2917 22.0404C58.2525 22.1503 58.1863 22.1503 58.1446 22.0404L56.8647 18.5185C56.6941 18.1151 56.3782 17.7935 55.9819 17.6199L52.5221 16.3169C52.4118 16.2745 52.4118 16.2071 52.5221 16.1672L55.9819 14.8617C56.3775 14.6883 56.6932 14.3678 56.8647 13.9656L58.1446 10.4537ZM50.2761 7.40595C50.1727 7.64725 49.9835 7.83984 49.7465 7.9451L47.6696 8.72637C47.6034 8.75133 47.6034 8.79376 47.6696 8.81623L49.7465 9.6C49.9835 9.70526 50.1727 9.89785 50.2761 10.1392L51.0436 12.2508C51.0681 12.3182 51.1073 12.3182 51.1319 12.2508L51.8993 10.1392C52.0019 9.89728 52.1914 9.70442 52.429 9.6L54.5083 8.81124C54.5745 8.78877 54.5745 8.74634 54.5083 8.72138L52.4314 7.94011C52.1938 7.83569 52.0044 7.64283 51.9018 7.40096L51.1343 5.28928C51.1098 5.22188 51.0706 5.22188 51.046 5.28928L50.2761 7.40595ZM45.681 33.143C46.2818 32.6438 46.9365 31.4656 47.2503 30.592C44.3349 32.0122 43.0329 30.0354 40.8751 30.4996C37.3564 31.2485 36.0716 32.8909 31.2191 31.7851C32.7172 32.831 34.8015 34.094 36.5105 34.6406C34.3625 36.8521 32.9894 39.785 32.2146 43.6864C34.235 43.9635 36.5792 43.3295 39.193 42.7379C38.1901 41.098 37.6997 38.9089 37.5256 36.3779C38.5111 38.6799 40.0738 40.6778 42.057 42.1713C45.1784 41.6721 48.6161 41.6471 52.2941 43.4193C50.5041 36.2506 45.681 33.143 45.681 33.143ZM6.56407 23.0014C7.45006 24.7686 8.38673 26.5084 9.37408 28.2207C12.6892 20.8298 17.1666 13.4939 24.4858 7.60064C17.8213 14.9042 13.7852 23.0938 11.3455 31.4981C11.88 32.3542 12.4317 33.2004 12.9932 34.0391C15.2393 27.1524 18.5274 20.2183 24.4564 14.2552C19.1968 21.4564 16.3795 29.1917 15.0137 36.9695C15.563 37.7299 16.1228 38.4846 16.6933 39.2334C17.9193 33.0481 20.0281 26.7331 24.4294 20.9197C20.6877 27.8188 19.0767 34.8852 18.7261 41.8193C20.7759 44.3404 22.9525 46.7757 25.2558 49.1253C27.1438 51.0473 29.0932 52.8828 31.1038 54.6317C31.1455 54.6467 31.1872 54.6666 31.2313 54.6791C28.1737 49.5622 25.116 43.3594 23.6301 37.8531C25.4053 33.3601 27.8574 28.5103 30.7703 26.9377C33.6833 25.3652 37.2338 28.997 41.1105 28.4154C43.1579 28.1084 45.556 24.5739 48.1674 28.2357C52.505 23.8676 41.775 16.1522 38.0185 7.00408C36.3805 3.01036 33.0777 1.81973 28.1737 2.04937C16.9434 2.57105 7.36097 21.2342 6.56162 23.0014H6.56407ZM38.2833 63.5352C24.5124 53.9189 13.1931 41.098 5.26451 26.1365C4.56252 27.9933 3.96489 29.8892 3.47453 31.8151C7.23837 38.1801 10.5094 41.9391 15.9945 47.7725C10.5829 44.0059 6.38262 39.513 2.77081 34.9701C2.60897 35.8188 2.36867 37.1766 2.17006 38.9039C2.10949 39.434 2.17276 39.9712 2.35469 40.4718C2.53663 40.9723 2.83211 41.4221 3.21707 41.7844C13.3609 51.3454 25.2834 58.7412 38.2809 63.5352H38.2833ZM52.3358 45.833C47.2822 42.054 38.683 45.9653 31.2289 46.5644C37.1627 48.389 43.6655 45.516 49.3909 47.3132C48.5769 51.2146 46.7648 55.2832 44.5703 59.4142C48.2336 55.8023 51.2667 51.1696 52.3333 45.833H52.3358ZM43.229 36.7897C42.1753 36.5128 41.1573 36.1107 40.1959 35.5916L39.2592 37.3389C39.9237 37.6783 42.8367 38.1351 44.0627 38.0478C44.2383 38.0359 44.4026 37.9554 44.5212 37.8231C45.3157 36.942 45.9409 35.8263 46.5245 34.8004C45.6003 35.562 44.5992 36.2213 43.538 36.7673C43.441 36.8125 43.3313 36.8205 43.229 36.7897V36.7897Z"
                fill="currentColor"
              ></path>
            </svg>
          </Link>
        </div>
        <div className="menu relative z-50">
          <button
            ref={btnOpenRef}
            className="relative flex flex-row space-x-4 open z-20 btn-open rounded-full hover:bg-black/10 p-4 transition-all duration-300"
            onClick={toggleAnimation}
          >
            <MenuIcon className={`icon h-5 w-5 lg:h-6 lg:w-6 xl:h-7 xl:w-7 ${theme === "white" ? "text-white" : "text-black"
              }`} />
          </button>
          <button
            ref={btnCloseRef}
            className="flex flex-row items-center space-x-4 absolute top-0 left-0 close z-10 btn-close overflow-hidden"
            onClick={toggleAnimation}
          >
            <span className={`text text-sm lg:text-base xl:text-lg text-white`}>Close</span>
            <XMarkIcon className={`icon h-5 w-5 text-white`} style={{ opacity: 0 }} />
          </button>
        </div>
        {shouldRenderDropdown && (
          <div
            id="dropdown_menu"
            ref={dropdownMenuRef}
            className="fixed top-0 left-0 h-screen w-screen bg-black"
          >
            <div className="wrapper flex pl-16 lg:pl-0 lg:justify-center items-center h-full lg:space-x-72">
              <div className="left hidden lg:block">
                <div ref={dropdownMenuImgRef} className="relative img">
                  <Image
                    fill
                    src="/wd.jpeg"
                    alt="Dropdown image 1"
                    className="brightness-75"
                  />
                </div>
              </div>
              <div className="right lg:pl-20">
                <ul className="navigation flex flex-col -space-y-3">
                  <div className="link_wrapper overflow-hidden">
                    <div className="navigation_link overflow-hidden">
                      <Link
                        href="/work"
                        className={`underline-effect font-poppins`}
                      >
                        Work
                      </Link>
                    </div>
                  </div>
                  <div className="link_wrapper overflow-hidden">
                    <div className="navigation_link overflow-hidden">
                      <Link
                        href="/work/test1"
                        className={`underline-effect font-poppins`}
                      >
                        Studio
                      </Link>
                    </div>{" "}
                  </div>
                  <div className="link_wrapper overflow-hidden">
                    <div className="navigation_link overflow-hidden">
                      <Link
                        href="#"
                        className={`underline-effect font-poppins`}
                      >
                        News
                      </Link>
                    </div>
                  </div>
                  <div className="link_wrapper overflow-hidden">
                    <div className="navigation_link overflow-hidden">
                      <Link
                        href="/contact"
                        className={`underline-effect font-poppins`}
                      >
                        Contact
                      </Link>
                    </div>
                  </div>
                </ul>
                <ul className="social flex flex-col pt-5 space-y-1">
                  <div className="link_wrapper overflow-hidden">
                    <div className="social_link overflow-hidden">
                      <Link
                        href="https://www.linkedin.com/in/williamd99/"
                        className={`social_link link underline-effect font-nunito`}
                      >
                        LinkedIn
                      </Link>
                    </div>
                  </div>
                  <div className="link_wrapper overflow-hidden">
                    <div className="social_link overflow-hidden">
                      <Link
                        href="https://github.com/WilliamD99"
                        className={`social_link link underline-effect font-nunito`}
                      >
                        Github
                      </Link>
                    </div>
                  </div>
                  <div className="link_wrapper overflow-hidden">
                    <div className="social_link overflow-hidden">
                      <Link
                        href="mailto:dnam310199@gmail.com"
                        className={`social_link link underline-effect font-nunito`}
                      >
                        Email
                      </Link>
                    </div>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default forwardRef(HeaderScrolled);
