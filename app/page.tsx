'use client'
import Footer from "@/components/navigation/Footer";
import Hero from "@/components/page-components/home/Hero/Hero";
import InTheMedia from "@/components/page-components/home/InTheMedia";
import Work from "@/components/page-components/home/Work";
import WorkInMotion from "@/components/page-components/home/WorkInMotion";

export default function Home() {
  return (
    <>
      <div id="home" className={`relative `}>
        <Hero />

        <Work />
        <WorkInMotion />
        <InTheMedia />
      </div>
      <Footer />
    </>
  );
}
