"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";

const SAMPLE_SECONDS = 1.5;
const MIN_FPS = 45;
const FLOOR = 1;
const STEP = 0.5;

/**
 * Steps the render resolution down when the GPU can't keep up.
 *
 * Measures frame rate over short windows; if it stays under 45 fps the
 * device pixel ratio drops by 0.5 (2 → 1.5 → 1). It never steps back up:
 * oscillating between resolutions is more visible than a slightly softer
 * canvas. The first window is skipped so shader compilation and
 * first-frame uploads don't count against the device.
 */
export default function AdaptiveDpr() {
  const setDpr = useThree((state) => state.setDpr);
  const initialDpr = useThree((state) => state.viewport.dpr);
  const stats = useRef({ frames: 0, elapsed: 0, windows: 0, dpr: initialDpr });

  useFrame((_, delta) => {
    const s = stats.current;
    if (s.dpr <= FLOOR) return;

    s.frames += 1;
    s.elapsed += delta;
    if (s.elapsed < SAMPLE_SECONDS) return;

    const fps = s.frames / s.elapsed;
    s.windows += 1;
    s.frames = 0;
    s.elapsed = 0;

    if (s.windows > 1 && fps < MIN_FPS) {
      s.dpr = Math.max(FLOOR, s.dpr - STEP);
      setDpr(s.dpr);
    }
  });

  return null;
}
