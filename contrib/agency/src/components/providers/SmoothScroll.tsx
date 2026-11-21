"use client";

import { useEffect } from "react";
import Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/** Smooth wheel scrolling (desktop) + scroll-reveal observer. Disabled for reduced motion. */
export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Scroll reveals for server-rendered markup
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    document.querySelectorAll(".reveal, .reveal-line").forEach((el) => io.observe(el));

    if (reduce) return () => io.disconnect();

    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 0.95,
      anchors: { offset: 0 },
      autoRaf: true,
    });
    window.__lenis = lenis;

    // Respect a hash on load (e.g. after switching language)
    if (location.hash) {
      const target = document.querySelector(location.hash);
      if (target) requestAnimationFrame(() => lenis.scrollTo(target as HTMLElement, { immediate: true }));
    }

    return () => {
      io.disconnect();
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  return null;
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { duration: 1.4 });
  else el.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
}

export function lockScroll(lock: boolean) {
  if (lock) {
    window.__lenis?.stop();
    document.documentElement.style.overflow = "hidden";
  } else {
    window.__lenis?.start();
    document.documentElement.style.overflow = "";
  }
}
