"use client";

import ScrollSmootherWrapper from "@/components/ScrollSmootherWrapper";
import Footer from "@/components/navigation/Footer";
import Header from "@/components/navigation/Header";
import * as React from "react";

import dynamic from "next/dynamic";
const CursorFollower = dynamic(() => import("@/components/CursorFollower"), {
  ssr: false,
});

import { TransitionProvider } from "@/utils/context/TransitionContext";
import PageTransitionComponent from "@/components/PageTransition";
import { usePathname } from "next/navigation";

interface ILayoutClientProps {
  children: React.ReactNode;
}

function checkPageWithNoFooter(str: string) {
  var pattern = /\bwork\b/i; // \b for word boundary, i for case-insensitive
  return pattern.test(str);
}

function generateBodyId(inputString: string) {
  // Remove leading "/"
  let processedString = inputString.replace(/^\//, "");

  // Replace remaining "/" with "-"
  processedString = processedString.replace(/\//g, "-");

  // Add "-page" to the end
  processedString += "-page";

  // Check if the processed string is empty (just "/")
  if (processedString === "-page") {
    processedString = "home-page";
  }

  return processedString;
}

export default function LayoutClient({ children }: ILayoutClientProps) {
  const mainRef = React.useRef<HTMLDivElement>(null);
  const pathName = usePathname();
  const bodyId = generateBodyId(pathName);

  return (
    <body id={bodyId}>
      <Header ref={mainRef} />
      <div ref={mainRef} className="main relative">
        <ScrollSmootherWrapper smooth={0.75}>
          {/* <TransitionProvider> */}
          {/* <PageTransitionComponent> */}
          <>
            {children}
            {!checkPageWithNoFooter(pathName) ? <Footer /> : <></>}
          </>
          {/* </PageTransitionComponent> */}
          {/* </TransitionProvider> */}
        </ScrollSmootherWrapper>
        {/* <CursorFollower /> */}
      </div>
    </body>
  );
}
