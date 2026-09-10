"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import type { Capability } from "@/lib/capability";
import { threePalette } from "@/lib/palette";
import Lattice from "./Lattice";
import AdaptiveDpr from "./AdaptiveDpr";

interface LatticeSceneProps {
  capability: Capability;
  /** Called once the renderer exists, so the SVG underlay can fade. */
  onReady?: () => void;
}

/**
 * The single persistent WebGL surface for the whole page.
 *
 * Mounted once and never torn down between sections, so there is exactly
 * one WebGL context for the entire visit. It is fixed behind the content
 * and marked aria-hidden — it carries no information, only atmosphere.
 */
export default function LatticeScene({ capability, onReady }: LatticeSceneProps) {
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);

  // Pause the frame loop while the tab is hidden. A backgrounded WebGL
  // loop is pure battery drain.
  useEffect(() => {
    const onVisibility = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        opacity: ready ? 1 : 0,
        transition: "opacity 900ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <Canvas
        // Cap at 2, not 3: beyond 2x the pixel count grows 2.25x for no
        // visible gain at normal viewing distance.
        dpr={[1, capability.dpr]}
        frameloop={visible ? "always" : "never"}
        gl={{
          antialias: capability.tier === "full",
          alpha: true,
          powerPreference: "high-performance",
          // The page ground is already near-black; no need to also clear
          // to an opaque colour behind it.
          stencil: false,
          depth: true,
        }}
        camera={{ fov: 45, near: 0.1, far: 90, position: [0, 0, 7.4] }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          setReady(true);
          onReady?.();
        }}
      >
        {/* Atmospheric depth, and per the verified three.js guidance an
            implicit far cull. Declarative, so R3F detaches it on unmount. */}
        <fogExp2 attach="fog" args={[threePalette.fog, 0.055]} />
        <Lattice capability={capability} />
        <AdaptiveDpr />
      </Canvas>
    </div>
  );
}
