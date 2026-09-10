"use client";

import { useEffect, useRef } from "react";
import { navItems } from "@/data/site";
import { getActiveSection, subscribeSection } from "@/lib/scroll-store";

/**
 * Two-part progress indicator, required by the storytelling pattern
 * ("use progress indicator").
 *
 * A hairline bar at the very top on every viewport, plus a vertical
 * chapter rail on large screens. The rail is presentational only —
 * the real navigation lives in the header, so this adds orientation
 * without adding a second set of tab stops.
 */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${ratio})`;
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    const paint = (id: string) => {
      const rail = railRef.current;
      if (!rail) return;
      rail.querySelectorAll<HTMLElement>("[data-section]").forEach((node) => {
        node.dataset.active = String(node.dataset.section === id);
      });
    };
    paint(getActiveSection());
    return subscribeSection(paint);
  }, []);

  return (
    <>
      <div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[60] h-px bg-transparent"
      >
        <div
          ref={barRef}
          className="h-full origin-left bg-accent"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      <ul
        ref={railRef}
        aria-hidden="true"
        className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 min-[1400px]:flex"
      >
        {navItems.map((item) => (
          <li
            key={item.id}
            data-section={item.id}
            data-active="false"
            className="group flex items-center gap-3 [&[data-active=true]_.dash]:w-7 [&[data-active=true]_.dash]:bg-accent [&[data-active=true]_.tag]:text-fg [&[data-active=true]_.tag]:opacity-100"
          >
            <span className="tag label rounded-xs bg-bg/85 px-1.5 py-0.5 text-[0.62rem] opacity-0 transition-opacity duration-300">
              {item.label}
            </span>
            <span className="dash h-px w-3.5 bg-border-strong transition-all duration-300" />
          </li>
        ))}
      </ul>
    </>
  );
}
