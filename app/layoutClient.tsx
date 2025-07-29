"use client";

import ScrollSmootherWrapper from "@/components/ScrollSmootherWrapper";
import Footer from "@/components/navigation/Footer";
import Header from "@/components/navigation/Header";
import React, { useEffect, useState, useRef } from "react";

import CursorFollower from "@/components/CursorFollower";

import { usePathname } from "next/navigation";

interface ILayoutClientProps {
  children: React.ReactNode;
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
  const mainRef = useRef<HTMLDivElement>(null);
  const pathName = usePathname();
  const bodyId = generateBodyId(pathName);

  return (
    <div id={bodyId}>
      <Header ref={mainRef} />
      <div ref={mainRef} className="main relative">
        <ScrollSmootherWrapper smooth={0.75}>
          <main className="main-content-wrapper overflow-hidden relative">
            <div className="main-content">
              {children}
            </div>
          </main>
        </ScrollSmootherWrapper>
        <CursorFollower />
      </div>
    </div>
  );
}
