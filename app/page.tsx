"use client";
import dynamic from "next/dynamic";

import Hero from "@/components/page-components/home/Hero/desktop";

// const Hero = dynamic(() => import('@/components/page-components/home/Hero/desktop'), { ssr: false })
// const HeroMobile = dynamic(() => import("@/components/page-components/home/Hero/mobile"), { ssr: false })

import InTheMedia from "@/components/page-components/home/InTheMedia";
import Work from "@/components/page-components/home/Work";
import WorkInMotion from "@/components/page-components/home/WorkInMotion";

import { getCookie } from 'cookies-next'

export default function Home() {
  let typeCookie = getCookie('type') ?? 'desktop';

  return (
    <>
      <main id="home" className="relative main">
        <Hero />
        <Work />
        <WorkInMotion />
        <InTheMedia />
      </main>
    </>
  );
}
