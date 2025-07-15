import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Observer } from "gsap/Observer";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(Observer)
gsap.registerPlugin(ScrollSmoother)

export default gsap

//     "gsap-trial": "^3.12.2",
