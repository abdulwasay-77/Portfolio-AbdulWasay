"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { useCapability } from "@/hooks/useCapability";
import StaticLattice from "./StaticLattice";

/**
 * The WebGL bundle is loaded only after the client has confirmed the
 * device should get it. `ssr: false` keeps three.js out of the server
 * render, and the dynamic boundary keeps it out of the initial JS
 * payload entirely for anyone on the static tier.
 */
const LatticeScene = dynamic(() => import("./LatticeScene"), {
  ssr: false,
  loading: () => null,
});

export default function Backdrop() {
  const capability = useCapability();
  const [live, setLive] = useState(false);

  // Static tier — no WebGL, or reduced motion. The SVG composition is a
  // genuine part of the design here, not an empty state.
  if (capability.tier === "static") {
    return <StaticLattice />;
  }

  return (
    <>
      {/* Paint-before-hydrate layer, cross-faded out once WebGL renders
          its first frame so the two cores never overlap. */}
      <StaticLattice underlay hidden={live} />
      <LatticeScene capability={capability} onReady={() => setLive(true)} />
    </>
  );
}
