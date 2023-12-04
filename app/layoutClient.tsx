"use client";

import ScrollSmootherWrapper from "@/components/ScrollSmootherWrapper";
import Footer from "@/components/navigation/Footer";
import Header from "@/components/navigation/Header";
import * as React from "react";

import dynamic from "next/dynamic";
const CursorFollower = dynamic(() => import("@/components/CursorFollower"), {ssr: false})

export interface ILayoutClientProps {
  children: React.ReactNode;
}

export default function LayoutClient({ children }: ILayoutClientProps) {
  return (
    <>
      <ScrollSmootherWrapper smooth={0.75}>
        <Header />
        {children}
        <Footer />
      </ScrollSmootherWrapper>
      <CursorFollower />
    </>
  );
}
