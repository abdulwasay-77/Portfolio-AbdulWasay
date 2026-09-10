/**
 * The zero-JavaScript fallback for the lattice.
 *
 * Rendered on the server, shown whenever WebGL is unavailable or
 * `prefers-reduced-motion` is set, and also painted underneath the
 * canvas until WebGL is ready so there is never an empty first frame.
 *
 * Composed to match the live scene's hero layout — right half on
 * desktop, top band on mobile — so the hand-off to WebGL is a cross-fade
 * of the same composition, not a jump. No animation whatsoever.
 */

interface StaticLatticeProps {
  /** Sits under a live canvas rather than standing in for it. */
  underlay?: boolean;
  /** Fade out: the live canvas has taken over. */
  hidden?: boolean;
}

const SPOKES: Array<[number, number]> = [
  [500, 128],
  [742, 236],
  [812, 470],
  [676, 664],
  [430, 700],
  [232, 566],
  [188, 320],
  [318, 176],
];

export default function StaticLattice({ underlay = false, hidden = false }: StaticLatticeProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden transition-opacity duration-700"
      style={{ opacity: hidden ? 0 : 1 }}
    >
      <div className="absolute inset-x-0 top-0 h-[48%] lg:inset-y-0 lg:left-auto lg:right-0 lg:h-full lg:w-[56%]">
        {/* One soft radial behind the structure. Not a field of blobs. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(61,169,252,0.10), transparent 70%)",
          }}
        />
        <svg
          viewBox="0 0 1000 800"
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 size-full"
          style={{ opacity: underlay ? 0.35 : 0.42 }}
        >
          <defs>
            <radialGradient id="lattice-core" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#bfe4ff" />
              <stop offset="55%" stopColor="#3da9fc" />
              <stop offset="100%" stopColor="#0b84e0" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="lattice-edge" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#3da9fc" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#5eead4" stopOpacity="0.18" />
            </linearGradient>
          </defs>

          <g stroke="url(#lattice-edge)" strokeWidth="1.15" strokeLinecap="round">
            {SPOKES.map(([x, y], i) => (
              <line key={`spoke-${i}`} x1="500" y1="420" x2={x} y2={y} />
            ))}
            {SPOKES.map(([x, y], i) => {
              const [nx, ny] = SPOKES[(i + 1) % SPOKES.length];
              return <line key={`ring-${i}`} x1={x} y1={y} x2={nx} y2={ny} />;
            })}
          </g>

          <g fill="#3da9fc">
            {SPOKES.map(([x, y], i) => (
              <circle key={`node-${i}`} cx={x} cy={y} r={i % 3 === 0 ? 5 : 3.2} opacity="0.8" />
            ))}
          </g>

          <circle cx="500" cy="420" r="46" fill="url(#lattice-core)" opacity="0.7" />
          <circle cx="500" cy="420" r="7" fill="#dcefff" />
        </svg>
      </div>
    </div>
  );
}
