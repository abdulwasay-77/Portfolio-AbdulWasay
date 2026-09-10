"use client";

import { useEffect } from "react";

/**
 * Scroll reveal via IntersectionObserver.
 *
 * Deliberately not GSAP: this is the "Subtle" tier from the motion table
 * (300-400ms, small y-offset, reads as a fade). A single page-wide
 * observer is cheaper than one ScrollTrigger per element, and it
 * unobserves after firing so nothing re-triggers on scroll direction
 * changes.
 *
 * The `.js-motion` class is what makes `.reveal` start hidden at all, so
 * with JS disabled every element renders in its final state.
 *
 * `enabled` starts false (the server always reports the static
 * capability tier) and flips true a moment after hydration once the
 * client resolves the device's real tier. Naively adding `.js-motion`
 * at that point would instantly hide every `.reveal` element already
 * on screen — including the whole hero — for one frame before the
 * observer faded it back in: a visible flash right after load. To
 * avoid that, elements already in the viewport at the moment reveal
 * turns on are marked visible immediately instead of being hidden;
 * only elements below the fold get the hide-and-observe treatment.
 */
export function useReveal(enabled: boolean) {
  useEffect(() => {
    const root = document.documentElement;
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal"),
    );

    if (!enabled) {
      root.classList.remove("js-motion");
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    root.classList.add("js-motion");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    for (const el of elements) {
      if (el.classList.contains("is-visible")) continue;
      const rect = el.getBoundingClientRect();
      const alreadyOnScreen = rect.top < window.innerHeight && rect.bottom > 0;
      if (alreadyOnScreen) {
        el.classList.add("is-visible");
      } else {
        observer.observe(el);
      }
    }

    return () => observer.disconnect();
  }, [enabled]);
}
