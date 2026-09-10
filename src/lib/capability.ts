/**
 * Device capability detection.
 *
 * Decides which of the three rendering tiers from MASTER.md §7 this
 * visitor gets. Runs on the client only; the server always renders the
 * `static` markup so hydration starts from the safest state.
 */

export type Tier = "full" | "reduced" | "static";

export interface Capability {
  tier: Tier;
  /** Cap from the verified three.js rule: "the cap is at 2, not at 3". */
  dpr: number;
  /** Node count for the lattice. */
  nodes: number;
  /** Whether to render the Points dust field at all. */
  dust: boolean;
  /** Whether the camera is scroll-scrubbed. */
  animateCamera: boolean;
}

const STATIC: Capability = {
  tier: "static",
  dpr: 1,
  nodes: 0,
  dust: false,
  animateCamera: false,
};

const REDUCED: Capability = {
  tier: "reduced",
  dpr: 1.5,
  nodes: 46,
  dust: false,
  animateCamera: false,
};

const FULL: Capability = {
  tier: "full",
  dpr: 2,
  nodes: 96,
  dust: true,
  animateCamera: true,
};

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function hasWebGL(): boolean {
  if (typeof document === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ??
      canvas.getContext("webgl") ??
      canvas.getContext("experimental-webgl");
    if (!gl) return false;
    // Release the probe context immediately; browsers cap concurrent contexts.
    const lose = (gl as WebGLRenderingContext).getExtension("WEBGL_lose_context");
    lose?.loseContext();
    return true;
  } catch {
    return false;
  }
}

export function detectCapability(): Capability {
  if (typeof window === "undefined") return STATIC;

  // Reduced motion overrides everything: no scrub, no parallax, no drift.
  if (prefersReducedMotion()) return STATIC;
  if (!hasWebGL()) return STATIC;

  const narrow = window.matchMedia("(max-width: 768px)").matches;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const fewCores =
    typeof navigator.hardwareConcurrency === "number" &&
    navigator.hardwareConcurrency <= 4;

  // `saveData` is not in the base Navigator type across all TS DOM libs.
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } })
    .connection;
  if (conn?.saveData) return REDUCED;

  if (narrow || coarse || fewCores) return REDUCED;
  return FULL;
}

export const CAPABILITY_PRESETS = { STATIC, REDUCED, FULL };
