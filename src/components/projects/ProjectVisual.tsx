"use client";

import { useRef } from "react";
import type { Project } from "@/data/projects";
import { useScrollScrub } from "@/hooks/useScrollScrub";

interface ProjectVisualProps {
  project: Project;
  /** Larger variant for the project detail page hero. */
  size?: "row" | "hero";
}

/**
 * An exploded-view diagram of the project's real architecture.
 *
 * The repo contains no screenshots for any project, so rather than
 * invent UI mockups this renders the one visual truth available: the
 * documented layer stack. One plate per entry in `project.architecture`,
 * labelled with that layer's actual name.
 *
 * As the row scrolls through the viewport the plates separate — a
 * scrubbed "exploded view". Under reduced motion or without JS the
 * plates render already separated, which is the final readable state.
 */
export default function ProjectVisual({ project, size = "row" }: ProjectVisualProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const layers = project.architecture;
  const count = layers.length;

  // Scrubbed "exploded view": --lift goes 0 -> 1 as the row travels
  // from 85% down the viewport to its centre sitting at 45%.
  useScrollScrub(rootRef, { start: 0.85, end: 0.45 });

  // The exploded stack has a fixed height budget, shared across however
  // many layers the project documents (3 for VaultX, 5 for ASMVision),
  // so a deep stack compresses instead of overflowing the frame.
  const budget = size === "hero" ? 150 : 130;
  const plateGap = Math.min(size === "hero" ? 58 : 46, budget / Math.max(1, count - 1));
  const plateWidth = count >= 5 ? "36%" : size === "hero" ? "46%" : "44%";

  // The stack grows upward from its base plate, so centre it as a whole:
  // shift down by half its current height. rotateX(58deg) projects each
  // unit of Z onto ~0.85 of screen Y. Tracks --lift, so it stays centred
  // throughout the scrub.
  const centreShift = `translateY(calc(${((count - 1) * 0.85) / 2} * (10px + ${plateGap}px * var(--lift))))`;

  return (
    <div
      ref={rootRef}
      className={[
        "relative overflow-hidden rounded-md border border-border bg-bg-elevated",
        size === "hero" ? "aspect-square sm:aspect-[4/3] md:aspect-[5/4]" : "aspect-square sm:aspect-[4/3]",
      ].join(" ")}
      // --lift: 1 is the no-JS / reduced-motion final state; the scrub
      // hook overrides it on this element and every plate inherits it.
      style={{ ["--hue" as string]: project.hue, ["--lift" as string]: 1 }}
    >
      {/* Title bar — a path, not a fake macOS traffic-light chrome. */}
      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between border-b border-border px-4 py-2.5">
        <span className="font-mono text-[0.68rem] text-fg-faint">
          ~/{project.slug}
          <span className="text-fg-muted">/architecture</span>
        </span>
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-fg-faint">
          {count} layers
        </span>
      </div>

      {/* Hue-tinted ground — one soft radial, derived from the project. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 60% at 62% 58%, hsl(var(--hue) 90% 60% / 0.14), transparent 70%)",
        }}
      />

      {/* Fine grid, echoing a schematic sheet. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-border) 1px, transparent 1px), linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 60% 55%, black 30%, transparent 80%)",
        }}
      />

      {/* The stack. Decorative: the same information is in the legend. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center"
        style={{ perspective: "1400px" }}
      >
        <div
          className="relative translate-x-[12%]"
          style={{
            width: plateWidth,
            aspectRatio: "1 / 1",
            transformStyle: "preserve-3d",
            transform: `${centreShift} rotateX(58deg) rotateZ(-38deg)`,
          }}
        >
          {layers.map((layer, i) => {
            const isTop = i === count - 1;
            return (
              <div
                key={layer.step}
                className="absolute inset-0 rounded-sm border"
                style={{
                  transform: `translateZ(calc(${i * 10}px + ${i * plateGap}px * var(--lift)))`,
                  borderColor: `hsl(var(--hue) 80% 62% / ${0.3 + (i / count) * 0.5})`,
                  background: isTop
                    ? "linear-gradient(135deg, hsl(var(--hue) 80% 60% / 0.26), hsl(var(--hue) 70% 40% / 0.10))"
                    : `hsl(var(--hue) 50% 12% / ${0.55 + (i / count) * 0.25})`,
                  boxShadow: isTop
                    ? "0 0 40px hsl(var(--hue) 90% 60% / 0.25)"
                    : "none",
                }}
              >
                <span
                  className="absolute left-3 top-2.5 font-mono text-[0.62rem] font-bold"
                  style={{ color: `hsl(var(--hue) 85% 72% / 0.9)` }}
                >
                  {layer.step}
                </span>
                {/* Inner detail lines so each plate reads as a module. */}
                <div className="absolute inset-x-[18%] bottom-[22%] top-[34%] flex flex-col justify-between">
                  {[0, 1, 2].map((line) => (
                    <span
                      key={line}
                      className="block h-px"
                      style={{
                        width: `${88 - line * 22}%`,
                        background: `hsl(var(--hue) 70% 60% / 0.28)`,
                      }}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend — the real layer names, flat and readable. */}
      <ol className="absolute inset-x-0 bottom-0 z-10 space-y-1 bg-gradient-to-t from-bg-elevated via-bg-elevated/85 to-transparent p-4 pt-10 sm:right-auto sm:max-w-[62%] sm:bg-none sm:p-5">
        {[...layers].reverse().map((layer) => (
          <li
            key={layer.step}
            className="flex items-baseline gap-2.5 font-mono text-[0.64rem] leading-snug sm:text-[0.68rem]"
          >
            <span style={{ color: "hsl(var(--hue) 85% 70%)" }}>{layer.step}</span>
            <span className="text-fg-muted">
              {layer.badge ?? layer.title}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
