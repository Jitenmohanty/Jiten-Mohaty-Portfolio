"use client";

import { useRef, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type PortfolioWindow = Window & { __portfolioLenis?: Lenis };

export default function MotionSystem({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const lenis = new Lenis({
      autoRaf: false,
      duration: 1.05,
      smoothWheel: true,
      syncTouch: false,
      anchors: true,
    });
    const portfolioWindow = window as PortfolioWindow;
    portfolioWindow.__portfolioLenis = lenis;
    const unsubscribe = lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const heroItems = gsap.utils.toArray<HTMLElement>("[data-hero-reveal]");
    if (heroItems.length) {
      gsap.fromTo(
        heroItems,
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.75, stagger: 0.09, ease: "power3.out", delay: 0.12 },
      );
    }

    gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
      const sectionItems = element.closest("section")?.querySelectorAll<HTMLElement>("[data-reveal]");
      const index = sectionItems ? Array.from(sectionItems).indexOf(element) : 0;
      gsap.fromTo(
        element,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.72,
          delay: Math.min(index, 4) * 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 88%",
            once: true,
          },
        },
      );
    });

    const counters = gsap.utils.toArray<HTMLElement>("[data-count-to]");
    counters.forEach((element) => {
      const target = Number(element.dataset.countTo);
      const suffix = element.dataset.countSuffix ?? "";
      if (!Number.isFinite(target)) return;
      const value = { current: 0 };
      gsap.to(value, {
        current: target,
        duration: 1.15,
        ease: "power2.out",
        onUpdate: () => {
          const rounded = Math.round(value.current);
          const formatted = target >= 1000 ? rounded.toLocaleString("en-US") : String(rounded);
          element.textContent = `${formatted}${suffix}`;
        },
        scrollTrigger: {
          trigger: element,
          start: "top 88%",
          once: true,
        },
      });
    });

    gsap.fromTo(
      "[data-metric-bar]",
      { scaleX: 0 },
      { scaleX: 1, duration: 1.05, stagger: 0.12, ease: "power2.out", scrollTrigger: { trigger: "#impact", start: "top 72%", once: true } },
    );

    const timelineLine = rootRef.current?.querySelector<HTMLElement>("[data-timeline-line]");
    if (timelineLine) {
      gsap.fromTo(
        timelineLine,
        { scaleY: 0 },
        { scaleY: 1, ease: "none", scrollTrigger: { trigger: timelineLine.parentElement, start: "top 75%", end: "bottom 65%", scrub: true } },
      );
    }

    const progress = rootRef.current?.querySelector<HTMLElement>("[data-scroll-progress]");
    if (progress) {
      gsap.fromTo(
        progress,
        { scaleX: 0 },
        { scaleX: 1, ease: "none", scrollTrigger: { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: true } },
      );
    }

    const refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      cancelAnimationFrame(refreshFrame);
      unsubscribe();
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
      if (portfolioWindow.__portfolioLenis === lenis) delete portfolioWindow.__portfolioLenis;
    };
  }, { scope: rootRef });

  return (
    <div ref={rootRef} className="motion-root">
      <div className="scroll-progress" data-scroll-progress aria-hidden="true" />
      {children}
    </div>
  );
}
