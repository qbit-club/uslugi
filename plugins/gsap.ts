import { gsap } from 'gsap'
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(gsap)
  nuxtApp.provide('gsap', gsap)
  nuxtApp.provide('TextPlugin', TextPlugin)
})