import Hero from "@/components/page-components/home/Hero/Hero";

// const Hero = dynamic(() => import('@/components/page-components/home/Hero/desktop'), { ssr: false })
// const HeroMobile = dynamic(() => import("@/components/page-components/home/Hero/mobile"), { ssr: false })

import InTheMedia from "@/components/page-components/home/InTheMedia";
import Work from "@/components/page-components/home/Work";
import WorkInMotion from "@/components/page-components/home/WorkInMotion";

export default function Home() {
  return (
    <main id="home" className="relative">
      <Hero />
      <Work />
      <WorkInMotion />
      <InTheMedia />
    </main>
  );
}
