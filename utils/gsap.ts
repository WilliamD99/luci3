import gsap from "gsap-trial";
import { ScrollTrigger } from 'gsap-trial/ScrollTrigger'
import { Observer } from "gsap-trial/Observer";
import { ScrollSmoother } from 'gsap-trial/ScrollSmoother'

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(Observer)
gsap.registerPlugin(ScrollSmoother)

export default gsap