"use client";

import { useSyncExternalStore } from "react";
import { CAPABILITY_PRESETS, detectCapability, type Capability } from "@/lib/capability";

/**
 * Device capability as an external store.
 *
 * The server snapshot is always `static`, so the server render and the
 * hydration pass agree exactly — the 3D layer is never part of the
 * hydration path. React then re-renders with the real client snapshot.
 *
 * The detected value is cached at module level so the WebGL probe runs
 * once per change rather than once per consumer per render, and so
 * `getSnapshot` returns a referentially stable object as React requires.
 */

let cached: Capability | null = null;

function getSnapshot(): Capability {
  if (!cached) cached = detectCapability();
  return cached;
}

function getServerSnapshot(): Capability {
  return CAPABILITY_PRESETS.STATIC;
}

function subscribe(onChange: () => void) {
  const queries = [
    window.matchMedia("(prefers-reduced-motion: reduce)"),
    window.matchMedia("(max-width: 768px)"),
  ];
  const handler = () => {
    cached = detectCapability();
    onChange();
  };
  queries.forEach((q) => q.addEventListener("change", handler));
  return () => queries.forEach((q) => q.removeEventListener("change", handler));
}

export function useCapability(): Capability {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
