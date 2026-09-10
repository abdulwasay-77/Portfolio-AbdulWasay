/**
 * Site-level configuration: canonical URL, navigation model and the
 * scroll "chapters" that drive both the nav indicator and the 3D layer.
 */

/**
 * The production domain is not recorded anywhere in the original repo,
 * so it is never hardcoded here. Resolution order:
 *
 *  1. NEXT_PUBLIC_SITE_URL — set this once the custom domain is known
 *  2. VERCEL_PROJECT_PRODUCTION_URL — injected by Vercel at build time
 *  3. undefined — canonical/OG URLs are omitted rather than guessed
 */
function resolveSiteUrl(): string | undefined {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel.replace(/\/$/, "")}`;
  return undefined;
}

export const siteUrl = resolveSiteUrl();

export interface NavItem {
  /** DOM id of the section, also the hash target. */
  id: string;
  label: string;
}

/**
 * Section order. This is also the order the 3D lattice choreography
 * steps through, so keep the two in sync.
 */
export const navItems: NavItem[] = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

/**
 * Scroll chapters consumed by the lattice, one per section, in DOM order.
 *
 * Where each chapter sits on the scroll track is *measured* from the
 * real section positions at runtime (see ScrollProvider), never
 * hardcoded — page height differs at every viewport width.
 *
 * Offsets are fractions of the visible half-width/half-height at the
 * lattice's depth, so the composition holds at any aspect ratio:
 * `offsetX: 0.5` means "centred in the right half of the screen".
 *
 * The rules the numbers encode:
 *  - the lattice is the centerpiece only where there is negative space
 *    for it (hero, contact);
 *  - behind reading sections it parks at the right edge and dims, so it
 *    never sits directly behind body copy;
 *  - it only ever travels along the right side. Alternating sides would
 *    sweep it across the middle of the screen — behind text — on every
 *    section change. Variation comes from depth, height and brightness.
 */
export interface Chapter {
  id: string;
  /** Camera distance from the lattice. Larger = smaller, further away. */
  dist: number;
  offsetX: number;
  offsetY: number;
  /** Lattice expansion factor. */
  spread: number;
  /** Node/edge opacity multiplier. */
  intensity: number;
}

export const chapters: Chapter[] = [
  { id: "hero", dist: 8.2, offsetX: 0.52, offsetY: 0.0, spread: 1.0, intensity: 1.0 },
  { id: "about", dist: 10.5, offsetX: 1.04, offsetY: 0.12, spread: 1.25, intensity: 0.36 },
  { id: "skills", dist: 10.0, offsetX: 1.02, offsetY: -0.16, spread: 1.15, intensity: 0.34 },
  { id: "work", dist: 15, offsetX: 1.08, offsetY: 0.22, spread: 1.6, intensity: 0.2 },
  { id: "experience", dist: 11.5, offsetX: 1.04, offsetY: -0.1, spread: 1.3, intensity: 0.32 },
  { id: "education", dist: 10.5, offsetX: 1.02, offsetY: 0.1, spread: 1.2, intensity: 0.36 },
  { id: "contact", dist: 8.2, offsetX: 0.55, offsetY: 0.04, spread: 0.8, intensity: 1.0 },
];
