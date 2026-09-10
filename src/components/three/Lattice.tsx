"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import type { Capability } from "@/lib/capability";
import { chapters, type Chapter } from "@/data/site";
import { scrollState } from "@/lib/scroll-store";
import { threePalette } from "@/lib/palette";
import { buildDust, buildLattice } from "./lattice-geometry";

const NODE_COLOR = new THREE.Color(threePalette.node);
const EDGE_COLOR = new THREE.Color(threePalette.edge);
const DUST_COLOR = new THREE.Color(threePalette.dust);
const CORE_COLOR = new THREE.Color(threePalette.core);

const HALF_FOV = THREE.MathUtils.degToRad(45 / 2);

type Sample = Omit<Chapter, "id">;

/**
 * Phones and touch tablets. The camera does not travel on this tier;
 * the object parks in the top band that the mobile hero leaves empty
 * for it. On a narrow screen every other section's copy runs the full
 * width, so outside the hero the lattice dims right down and lifts
 * mostly out of frame — it is never at full strength behind text.
 */
function sampleMobile(progress: number): Sample {
  const heroEnd = scrollState.anchors[1] || 0.15;
  const f = THREE.MathUtils.clamp(progress / heroEnd, 0, 1);
  const focus = 1 - f * f * (3 - 2 * f);
  return {
    dist: 9.6,
    offsetX: 0,
    offsetY: THREE.MathUtils.lerp(0.92, 0.44, focus),
    spread: 0.92,
    intensity: THREE.MathUtils.lerp(0.12, 1, focus),
  };
}

/** Interpolates the chapter track at the current scroll progress. */
function sampleChapters(progress: number): Sample {
  const anchors =
    scrollState.anchors.length === chapters.length
      ? scrollState.anchors
      : chapters.map((_, i) => i / (chapters.length - 1));

  const p = THREE.MathUtils.clamp(progress, 0, 1);
  let i = 0;
  while (i < chapters.length - 2 && p > anchors[i + 1]) i++;

  const a = chapters[i];
  const b = chapters[i + 1];
  const span = anchors[i + 1] - anchors[i];
  const t = span <= 0 ? 1 : THREE.MathUtils.clamp((p - anchors[i]) / span, 0, 1);
  // Smoothstep: sections hand over with an ease, never a kink.
  const e = t * t * (3 - 2 * t);
  const lerp = THREE.MathUtils.lerp;

  return {
    dist: lerp(a.dist, b.dist, e),
    offsetX: lerp(a.offsetX, b.offsetX, e),
    offsetY: lerp(a.offsetY, b.offsetY, e),
    spread: lerp(a.spread, b.spread, e),
    intensity: lerp(a.intensity, b.intensity, e),
  };
}

/** A soft radial sprite for the core glow, drawn once on a canvas. */
function makeGlowTexture() {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.18, "rgba(255,255,255,0.55)");
    g.addColorStop(0.45, "rgba(255,255,255,0.12)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

interface LatticeProps {
  capability: Capability;
}

export default function Lattice({ capability }: LatticeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.InstancedMesh>(null);
  const dustRef = useRef<THREE.Points>(null);
  const nodeMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const edgeMatRef = useRef<THREE.LineBasicMaterial>(null);
  const coreMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const haloMatRef = useRef<THREE.SpriteMaterial>(null);
  // First frame snaps straight to the current chapter's pose; damping
  // applies only after. Otherwise a slow device would show the lattice
  // gliding out from screen centre — behind the hero copy — for seconds.
  const settledRef = useRef(false);

  const travels = capability.animateCamera;

  const data = useMemo(() => buildLattice(capability.nodes), [capability.nodes]);
  const dustPositions = useMemo(
    () => (capability.dust ? buildDust(240) : null),
    [capability.dust],
  );
  const glow = useMemo(() => makeGlowTexture(), []);

  // R3F disposes the geometries and materials it creates declaratively,
  // but a texture passed in by reference is ours to release. Three.js
  // never frees GPU memory on its own.
  useEffect(() => () => glow.dispose(), [glow]);

  // Seed instance matrices once. Per-instance scale varies by shell so
  // the inner tier reads as the heavier, brighter anchor.
  useLayoutEffect(() => {
    const mesh = nodesRef.current;
    if (!mesh) return;

    const dummy = new THREE.Object3D();
    const color = new THREE.Color();

    for (let i = 0; i < capability.nodes; i++) {
      dummy.position.set(
        data.positions[i * 3],
        data.positions[i * 3 + 1],
        data.positions[i * 3 + 2],
      );
      const shell = data.shells[i];
      dummy.scale.setScalar(shell === 0 ? 1.0 : shell === 1 ? 0.7 : 0.5);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);

      // A two-tone family — accent outward, signal toward the core.
      color.copy(NODE_COLOR).lerp(DUST_COLOR, shell === 0 ? 0.4 : 0.04);
      mesh.setColorAt(i, color);
    }

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [data, capability.nodes]);

  useFrame(({ camera, size }, delta) => {
    const group = groupRef.current;
    if (!group) return;

    // Clamp: a backgrounded tab can hand back a huge delta on return.
    // The very first frame uses a huge step instead, which makes every
    // damp() below land exactly on its target.
    const first = !settledRef.current;
    settledRef.current = true;
    const dt = first ? 100 : Math.min(delta, 0.05);
    const target = travels
      ? sampleChapters(scrollState.progress)
      : sampleMobile(scrollState.progress);
    const damp = THREE.MathUtils.damp;

    // Camera distance. Damped toward the chapter value — scroll-linked
    // camera motion must scrub, never snap.
    const dist = damp(camera.position.z, target.dist, 2.6, dt);

    // Visible half-extents at the lattice's depth. Offsets are fractions
    // of these, so "right half" means right half at every aspect ratio.
    const aspect = size.width / Math.max(1, size.height);
    const halfH = Math.tan(HALF_FOV) * dist;
    const halfW = halfH * aspect;

    // On narrower desktop windows the text column takes more of the
    // width, so push the lattice further toward the edge.
    const push = THREE.MathUtils.clamp(1.6 / aspect, 1, 1.4);
    const ox = THREE.MathUtils.clamp(target.offsetX * push, -1.1, 1.1);

    group.position.x = damp(group.position.x, ox * halfW, 2.4, dt);
    group.position.y = damp(group.position.y, target.offsetY * halfH, 2.4, dt);

    if (travels) {
      // A few centimetres of pointer parallax — depth you feel, not see.
      camera.position.x = damp(camera.position.x, scrollState.pointerX * 0.32, 2, dt);
      camera.position.y = damp(camera.position.y, -scrollState.pointerY * 0.2, 2, dt);
    }
    camera.position.z = dist;
    camera.lookAt(camera.position.x * 0.5, camera.position.y * 0.5, 0);

    // Slow constant yaw — roughly one turn every two minutes. Enough to
    // read as alive, never enough to become a spinner.
    group.rotation.y += dt * 0.05;
    group.rotation.x = damp(group.rotation.x, scrollState.progress * 0.5 - 0.18, 2, dt);
    group.scale.setScalar(damp(group.scale.x, target.spread, 2.4, dt));

    // Intensity is what hands the page over to the content: behind the
    // Work section it drops to 0.2 and the 2D layer wins outright.
    const k = target.intensity;
    if (nodeMatRef.current) nodeMatRef.current.opacity = damp(nodeMatRef.current.opacity, 0.85 * k, 3, dt);
    if (edgeMatRef.current) edgeMatRef.current.opacity = damp(edgeMatRef.current.opacity, 0.55 * k, 3, dt);
    if (coreMatRef.current) coreMatRef.current.opacity = damp(coreMatRef.current.opacity, k, 3, dt);
    if (haloMatRef.current) haloMatRef.current.opacity = damp(haloMatRef.current.opacity, 0.7 * k, 3, dt);

    if (dustRef.current) dustRef.current.rotation.y -= dt * 0.01;
  });

  return (
    <>
      <group ref={groupRef}>
        {/* Nodes: one draw call for all of them via InstancedMesh. */}
        <instancedMesh
          ref={nodesRef}
          args={[undefined, undefined, capability.nodes]}
          frustumCulled={false}
        >
          <icosahedronGeometry args={[0.045, 1]} />
          <meshBasicMaterial
            ref={nodeMatRef}
            transparent
            opacity={0}
            toneMapped={false}
            depthWrite={false}
          />
        </instancedMesh>

        {/* Edges: a single LineSegments, one draw call. */}
        <lineSegments frustumCulled={false}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[data.edges, 3]} />
          </bufferGeometry>
          <lineBasicMaterial
            ref={edgeMatRef}
            color={EDGE_COLOR}
            transparent
            opacity={0}
            toneMapped={false}
            depthWrite={false}
          />
        </lineSegments>

        {/* The central node from the favicon, made literal. */}
        <mesh>
          <icosahedronGeometry args={[0.085, 2]} />
          <meshBasicMaterial
            ref={coreMatRef}
            color={CORE_COLOR}
            transparent
            opacity={0}
            toneMapped={false}
          />
        </mesh>
        <sprite scale={[1.5, 1.5, 1]}>
          <spriteMaterial
            ref={haloMatRef}
            map={glow}
            color={NODE_COLOR}
            transparent
            opacity={0}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
          />
        </sprite>
      </group>

      {/* Ambient dust, outside the group so it fills the whole viewport
          rather than travelling with the lattice. */}
      {dustPositions && (
        <points ref={dustRef} frustumCulled={false}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[dustPositions, 3]} />
          </bufferGeometry>
          <pointsMaterial
            color={DUST_COLOR}
            size={0.02}
            sizeAttenuation
            transparent
            opacity={0.3}
            toneMapped={false}
            depthWrite={false}
          />
        </points>
      )}
    </>
  );
}
