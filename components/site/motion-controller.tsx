"use client";

import { useLayoutEffect } from "react";

const MOTION_TARGETS = "[data-reveal], [data-draw-line], [data-draw-waves]";

export function MotionController() {
  useLayoutEffect(() => {
    const root = document.documentElement;
    const targets = Array.from(document.querySelectorAll<HTMLElement>(MOTION_TARGETS));
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    root.classList.add("site-motion-ready");

    const reveal = (target: HTMLElement) => {
      if (target.hasAttribute("data-reveal")) target.classList.add("is-revealed");
      if (target.hasAttribute("data-draw-line") || target.hasAttribute("data-draw-waves")) {
        target.classList.add("is-drawn");
      }
    };

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      targets.forEach(reveal);
      return () => root.classList.remove("site-motion-ready");
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          reveal(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -9% 0px", threshold: 0.08 },
    );

    targets.forEach((target) => observer.observe(target));

    return () => {
      observer.disconnect();
      root.classList.remove("site-motion-ready");
    };
  }, []);

  return null;
}
