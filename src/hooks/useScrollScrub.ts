"use client";

import { useEffect, type RefObject } from "react";

/**
 * Scroll-scrubbed progress, written to a CSS custom property.
 *
 * Maps an element's journey through the viewport to 0..1 and writes it
 * to `--lift` on the element itself; children read it via `var()`, so
 * each frame is a single style write however many children animate.
 *
 * Follows the "Complex / scrub" motion spec from the design system:
 *  - tied to scroll position, with a short damped lag (like scrub: 1)
 *  - scoped to its own element, never re-scanning the page
 *  - idle when off-screen: no rAF runs unless the value is moving
 *  - under reduced motion, the final state (1) is set once and left
 *
 * Replaces GSAP ScrollTrigger, which was ~44 KB gzipped in the initial
 * bundle for this one effect.
 */
export function useScrollScrub(
  ref: RefObject<HTMLElement | null>,
  { start = 0.85, end = 0.45 }: { start?: number; end?: number } = {},
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--lift", "1");
      return;
    }

    let visible = false;
    let raf = 0;
    let last = 0;
    let current = 0;
    let target = 0;

    // 0 when the element's top reaches `start` of the viewport height,
    // 1 when its centre reaches `end`.
    const measure = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const from = vh * start;
      const to = vh * end - rect.height / 2;
      const span = from - to;
      target = span > 0 ? Math.min(1, Math.max(0, (from - rect.top) / span)) : 1;
    };

    const tick = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 1 / 60;
      last = now;
      // Frame-rate independent damping, ~1s to settle, like scrub: 1.
      current += (target - current) * (1 - Math.exp(-dt * 6));
      if (Math.abs(target - current) < 0.0005) current = target;
      el.style.setProperty("--lift", current.toFixed(4));

      if (current !== target) {
        raf = window.requestAnimationFrame(tick);
      } else {
        raf = 0;
        last = 0;
      }
    };

    const kick = () => {
      if (!visible) return;
      measure();
      if (!raf) raf = window.requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        kick();
      },
      { rootMargin: "15% 0px" },
    );

    // Start from the true position, not from 0, so a visual that is
    // already on screen at load does not animate from collapsed.
    measure();
    current = target;
    el.style.setProperty("--lift", current.toFixed(4));

    observer.observe(el);
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [ref, start, end]);
}
