"use client";
import Hero from "@/components/page-components/home/Hero";
import InTheMedia from "@/components/page-components/home/InTheMedia";
import Work from "@/components/page-components/home/Work";
import WorkInMotion from "@/components/page-components/home/WorkInMotion";

export default function Home() {
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
