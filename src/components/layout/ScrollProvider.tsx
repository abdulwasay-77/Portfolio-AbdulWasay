"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { useCapability } from "@/hooks/useCapability";
import { useReveal } from "@/hooks/useReveal";
import { chapters, navItems } from "@/data/site";
import { scrollState, setActiveSection } from "@/lib/scroll-store";

/**
 * Owns all scroll-derived state for the page:
 *
 *  - smooth scroll (Lenis) on capable devices only
 *  - the 0..1 progress value the 3D layer reads each frame
 *  - the active-section id the navigation subscribes to
 *  - the reveal observer
 *
 * Deliberately not scroll-jacking: Lenis interpolates the *native*
 * scroll position, so wheel distance, scrollbar dragging, keyboard
 * PageDown and browser find-in-page all behave normally. Under reduced
 * motion Lenis is not instantiated at all and the browser's own
 * scrolling is left completely untouched.
 */
export default function ScrollProvider() {
  const capability = useCapability();
  const smooth = capability.tier === "full";

  useReveal(capability.tier !== "static");

  // Progress tracking. Runs on every tier — the fallback tier still
  // needs an accurate active-section indicator in the navigation.
  useEffect(() => {
    let frame = 0;

    const measure = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      scrollState.progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    };

    // Chapter anchors: the scroll ratio at which each section's centre
    // crosses the viewport centre. Measured, so the choreography stays
    // locked to the real layout at every breakpoint.
    const measureAnchors = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      let last = 0;
      scrollState.anchors = chapters.map((chapter, i) => {
        if (i === 0) return 0;
        if (i === chapters.length - 1) return 1;
        const el = document.getElementById(chapter.id);
        if (!el) return last;
        const rect = el.getBoundingClientRect();
        const centre = rect.top + window.scrollY + rect.height / 2;
        const ratio = (centre - window.innerHeight / 2) / max;
        // Clamp and keep monotonic so interpolation never runs backwards.
        last = Math.max(last, Math.min(1, Math.max(0, ratio)));
        return last;
      });
      measure();
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        measure();
      });
    };

    measureAnchors();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measureAnchors);
    // Fonts and images settle after first paint and change the page
    // height; re-measure whenever the document box changes size.
    const resizeObserver = new ResizeObserver(measureAnchors);
    resizeObserver.observe(document.body);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measureAnchors);
      resizeObserver.disconnect();
    };
  }, []);

  // Pointer position for a small camera parallax. Mouse only: touch and
  // pen "pointers" jump discontinuously and would jolt the scene.
  useEffect(() => {
    if (!smooth) return;
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      scrollState.pointerX = (event.clientX / window.innerWidth) * 2 - 1;
      scrollState.pointerY = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [smooth]);

  // Active section, via IntersectionObserver rather than scroll maths so
  // it stays correct regardless of section heights.
  useEffect(() => {
    const ids = ["hero", ...navItems.map((item) => item.id)];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top of the viewport that is
        // still intersecting — avoids flicker when two sections overlap.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top) -
              Math.abs(b.boundingClientRect.top),
          );
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Smooth scroll — full tier only.
  useEffect(() => {
    if (!smooth) return;

    const lenis = new Lenis({
      duration: 1.05,
      // Gentle exponential ease-out. Short enough that the page never
      // feels like it is lagging behind the input.
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Touch devices keep native momentum; overriding it feels wrong.
      syncTouch: false,
      touchMultiplier: 1.6,
      // In-page anchor links glide instead of jumping. The fixed-header
      // clearance comes from `scroll-padding-top` in CSS, which Lenis
      // honours — adding an offset here as well would double it.
      anchors: true,
      // Lenis runs its own rAF loop; nothing else needs to share a ticker.
      autoRaf: true,
    });

    return () => lenis.destroy();
  }, [smooth]);

  return null;
}
