/**
 * Procedural geometry for "The Lattice".
 *
 * The form derives from the site's own favicon: a bright central node
 * with edges radiating out to satellite nodes. Scaled up, that reads as
 * a system-architecture diagram in 3D space — which is the literal
 * subject matter of this portfolio (layered FFI bridges, normalized
 * schemas, tiered vaults).
 *
 * Nodes sit on three concentric shells, each distributed as its own
 * Fibonacci sphere, so the structure reads as *tiers* rather than a
 * uniform ball, with no clumping at the poles.
 */

export interface LatticeData {
  /** Flat xyz triples, length = nodes * 3. */
  positions: Float32Array;
  /** Per-node shell index (0 = core, 2 = outer). */
  shells: Uint8Array;
  /** Flat xyz pairs for LineSegments, six floats per edge. */
  edges: Float32Array;
}

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

/** Deterministic PRNG so the lattice is identical every mount. */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Compact on purpose: the lattice is an object in the scene, not a
// wallpaper. The outer shell spans ~75% of the viewport height at the
// hero's camera distance.
const SHELL_RADII = [0.8, 1.55, 2.45];

export function buildLattice(nodeCount: number, seed = 7): LatticeData {
  const rand = mulberry32(seed);
  const positions = new Float32Array(nodeCount * 3);
  const shells = new Uint8Array(nodeCount);

  // Each shell gets its own full Fibonacci sphere. (Assigning shells by
  // index into one sequence would bunch the core at a single pole,
  // because Fibonacci index maps directly to latitude.)
  const coreCount = Math.round(nodeCount * 0.18);
  const midCount = Math.round(nodeCount * 0.32);
  const counts = [coreCount, midCount, nodeCount - coreCount - midCount];

  let i = 0;
  counts.forEach((count, shell) => {
    // Rotate each shell's sequence so their seams don't line up.
    const phase = shell * 1.7;
    for (let k = 0; k < count; k++, i++) {
      const y = 1 - (k / Math.max(1, count - 1)) * 2;
      const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = GOLDEN_ANGLE * k + phase;

      // Jitter keeps it from looking like a rendered maths demo.
      const r = SHELL_RADII[shell] * (0.86 + rand() * 0.28);

      shells[i] = shell;
      positions[i * 3] = Math.cos(theta) * radiusAtY * r;
      positions[i * 3 + 1] = y * r * 0.82;
      positions[i * 3 + 2] = Math.sin(theta) * radiusAtY * r;
    }
  });

  // Edges: connect each node to its nearest neighbours, capped so the
  // line count stays bounded. Plus spokes from the origin to the core
  // shell, which is the favicon motif made literal.
  const edgeList: number[] = [];
  const maxNeighbours = 2;
  const maxDistance = 1.3;

  for (let i = 0; i < nodeCount; i++) {
    const ax = positions[i * 3];
    const ay = positions[i * 3 + 1];
    const az = positions[i * 3 + 2];

    const candidates: Array<{ index: number; dist: number }> = [];
    for (let j = i + 1; j < nodeCount; j++) {
      const dx = ax - positions[j * 3];
      const dy = ay - positions[j * 3 + 1];
      const dz = az - positions[j * 3 + 2];
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (dist < maxDistance) candidates.push({ index: j, dist });
    }

    candidates.sort((a, b) => a.dist - b.dist);
    for (const c of candidates.slice(0, maxNeighbours)) {
      edgeList.push(
        ax, ay, az,
        positions[c.index * 3],
        positions[c.index * 3 + 1],
        positions[c.index * 3 + 2],
      );
    }

    // Radiating spokes from the centre — the favicon motif.
    if (shells[i] === 0) {
      edgeList.push(0, 0, 0, ax, ay, az);
    }
  }

  return {
    positions,
    shells,
    edges: new Float32Array(edgeList),
  };
}

/**
 * A sparse dust field rendered as Points. Per the verified three.js
 * guidance, particle systems are always BufferGeometry + Points —
 * never individual Mesh objects.
 */
export function buildDust(count: number, seed = 19): Float32Array {
  const rand = mulberry32(seed);
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (rand() - 0.5) * 26;
    positions[i * 3 + 1] = (rand() - 0.5) * 18;
    positions[i * 3 + 2] = (rand() - 0.5) * 24 - 4;
  }
  return positions;
}
