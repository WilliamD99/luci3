"use client";

import ScrollSmootherWrapper from "@/components/ScrollSmootherWrapper";
import Footer from "@/components/navigation/Footer";
import Header from "@/components/navigation/Header";
import * as React from "react";

import dynamic from "next/dynamic";
const CursorFollower = dynamic(() => import("@/components/CursorFollower"), {ssr: false})

import { TransitionProvider } from "@/utils/context/TransitionContext";
import PageTransitionComponent from "@/components/PageTransition";

interface ILayoutClientProps {
  children: React.ReactNode;
}

export default function LayoutClient({ children }: ILayoutClientProps) {

  return (
    <>
      <Header />
      <ScrollSmootherWrapper smooth={0.75}>
        <TransitionProvider>
            <PageTransitionComponent>
              <>
                  {children}
                  {/* <Footer /> */}
              </>
            </PageTransitionComponent>
        </TransitionProvider>
      </ScrollSmootherWrapper>
      <CursorFollower />
    </>
  );
}
