# Abdul Wasay Portfolio — Design System (MASTER)

Global source of truth. Generated with the `ui-ux-pro-max` skill, then reconciled
against the project brief. Every decision below carries its provenance:

- **[DB]** — verified match returned by a `ui-ux-pro-max` search
- **[SYNTH]** — synthesised by combining verified matches
- **[FALLBACK]** — no DB match; documented default

---

## 1. Product & pattern

| Field | Value | Source |
|---|---|---|
| Product type | Portfolio / Personal | [DB] `--domain product` |
| Primary style rec. | Motion-Driven + Minimalism & Swiss Style | [DB] `--domain product` |
| Landing pattern | `scroll-triggered-storytelling` | [DB] `--domain landing` |
| Colour strategy | "Monochrome + blue accent" | [DB] `--domain color` (Portfolio/Personal row) |
| Mode | Dark Mode (OLED) | [DB] `--domain style` |

**Rejected match.** The `--design-system` run at `--variance 6` biased the style
to **Brutalism** ("raw, unpolished, stark, anti-design"). Rejected: it
contradicts the brief's premium/professional bar. The `--domain product` lookup
for Portfolio/Personal returns **Motion-Driven + Minimalism/Swiss**, which is the
direction actually implemented.

**Pattern adaptation [SYNTH].** The DB section order is
`Intro hook > Chapter 1 (problem) > Chapter 2 (journey) > Chapter 3 (solution) > Climax CTA`.
Mapped onto the real content found in the repo audit:

| Chapter | Section |
|---|---|
| Intro hook | Hero |
| Chapter 1 | About — who, and how the work is approached |
| Chapter 2 | Capabilities + Skills — the toolkit |
| Chapter 3 | Projects — the proof, and the visual climax |
| (support) | Experience, Education — credentials, 2D, high legibility |
| Climax CTA | Contact |

Conversion note carried verbatim from [DB] into implementation:

> "Keep the narrative understandable without scroll-driven effects. Use progress
> indicator. Mobile: simplify animations. Keep DOM reading order complete;
> disable parallax and scroll-scrub under reduced motion. Pause scroll animation
> when offscreen or hidden and render each chapter in its final readable state
> under reduced motion."

---

## 2. Colour tokens

Base is an OLED-dark monochrome slate. The accent is a **single** blue lifted
from the existing `favicon.svg` (`#3DA9FC` to `#5EEAD4`), so the rebuild keeps
brand continuity with what already ships. Explicitly no purple/pink AI gradient.

| Token | Value | Role |
|---|---|---|
| `--bg` | `#07080B` | page ground (OLED near-black) |
| `--bg-elevated` | `#0C0E13` | raised surface |
| `--surface` | `#101319` | card |
| `--surface-hover` | `#151922` | card hover |
| `--border` | `#1E232E` | hairline |
| `--border-strong` | `#2C3341` | emphasised hairline |
| `--fg` | `#F2F5F9` | primary text |
| `--fg-muted` | `#9BA6B6` | secondary text |
| `--fg-faint` | `#78849A` | tertiary / meta |
| `--accent` | `#3DA9FC` | primary accent (from favicon) |
| `--accent-strong` | `#67BDFF` | accent hover |
| `--accent-soft` | `rgba(61,169,252,0.12)` | accent wash |
| `--on-accent` | `#04070C` | text on accent fills |
| `--signal` | `#5EEAD4` | secondary signal (favicon gradient end) |
| `--warn` | `#FFA751` | VaultX / downloadable marker (preserved from old site) |
| `--ring` | `#3DA9FC` | focus ring |

3D environment colours — same family, so WebGL and DOM read as one space:

| Token | Value | Role |
|---|---|---|
| `--three-fog` | `#07080B` | scene fog, matches page ground exactly |
| `--three-node` | `#3DA9FC` | lattice node |
| `--three-edge` | `#1E3A52` | lattice edge |
| `--three-dust` | `#5EEAD4` | particle field |

Contrast floor **4.5:1** for all body text — the stated accessibility
requirement on both the `motion-driven` and `Dark Mode (OLED)` style rows [DB].

---

## 3. Typography

Pairing: **Modern Dark Cinema (Inter System)** [DB] `--domain typography`.
Mood: *dark, cinematic, technical, precision, clean, premium, developer*.
Best for: *developer tools, fintech/trading, AI dashboards, high-end
productivity apps*.

Extended with **JetBrains Mono** for labels, eyebrows and data — endorsed by the
`JetBrains Mono / IBM Plex Sans` developer pairing [DB]. Two families total.

Scale, adapted to web from the pairing's own notes:

| Role | Font | Size | Weight | Tracking | Leading |
|---|---|---|---|---|---|
| Display | Inter | `clamp(2.6rem, 6.2vw, 4.75rem)` | 700 | `-0.045em` | 0.95 |
| H1 | Inter | `clamp(2rem, 4.5vw, 3.25rem)` | 700 | `-0.035em` | 1.05 |
| H2 | Inter | `clamp(1.75rem, 3.2vw, 2.75rem)` | 700 | `-0.03em` | 1.1 |
| H3 | Inter | `1.25rem` | 600 | `-0.015em` | 1.3 |
| Body | Inter | `1rem`–`1.125rem` | 400 | `0` | 1.7 |
| Label / eyebrow | JetBrains Mono | `0.72rem` | 500 | `0.16em`, uppercase | 1.4 |

Loaded through `next/font/google` for self-hosting and zero CLS —
[DB] `--stack nextjs`: *"Use next/font for fonts / Don't: External font links"*.
The old site used external `<link>` tags to Google Fonts; that is now removed.

---

## 4. Spacing & layout (density 5 — standard)

`--space-1: 4px` · `2: 8px` · `3: 12px` · `4: 16px` · `5: 24px` · `6: 32px` ·
`7: 48px` · `8: 64px` · `9: 96px` · `10: 128px`

Container `max-width: 1200px`; gutters `20px` at 375px, `32px` at 768px,
`40px` at 1024px+. Section rhythm `96px` mobile to `160px` desktop.

Breakpoints — the four named in the brief, matching the [DB] checklist:
`375` · `768` · `1024` · `1440+`.

Radii are restrained (`4 / 8 / 12 / 16px`) — the brief rules out "excessive
rounded cards", and the old site's `32px` clay radii are deliberately dropped.

---

## 5. Motion

Tier assignments, all from [DB] `--domain gsap`:

| Use | Tier | Duration | Ease | Binding rule |
|---|---|---|---|---|
| Section copy reveal | Subtle | 300–400ms | `power1.out` | y-offset 8–16px, so it reads as a fade not a slide |
| Card / list stagger | Standard | 400–600ms | `power2.out` | stagger `0.08`, **max ~8 children** |
| Scroll-linked scrub | Complex | scrub | damped | ~1s lag like `scrub: 1`; **no pinning used** |
| Background parallax | Subtle | scrub | linear | `yPercent` delta 5–15, decorative layers only |

Hard constraints carried into the code:

- *"Don't parallax body copy; it hurts reading comfort."*
- *"Animate 1–2 key elements per view maximum."*
- *"Don't use onEnter/onLeave for camera motion — they snap instead of scrubbing."*
- *"Scope the ScrollTrigger to the section container."*
- `prefers-reduced-motion` → render the **final readable state immediately**.
- `markers` must be false in production.

**Implementation note — GSAP removed.** The `--domain gsap` presets define the
motion *spec*. GSAP + ScrollTrigger were first used to implement it, then
removed after measuring: they cost ~44 KB gzipped of initial JS (234 → 191 KB
without them) for a single scrubbed effect. `useScrollScrub` implements the
same spec in ~90 lines: scroll-linked, damped, scoped to its element, idle
off-screen, final state under reduced motion. Camera motion is damped in the
R3F frame loop reading a plain scroll store, so it never re-renders React.

---

## 6. 3D direction — "The Lattice"

**One persistent WebGL layer for the entire page.** Not a scene per section:
a single context, mounted once, never torn down between sections.

The concept derives from the site's own existing `favicon.svg` — a bright
central node with edges radiating to satellite nodes. Scaled up, that is a
**system-architecture diagram rendered in 3D space**, which is the literal
subject matter of this portfolio: 5-layer FFI bridges, 29-table schemas,
3-tier vaults.

Scroll choreography, as built (`src/data/site.ts`). Each chapter's position
on the scroll track is **measured** from the real section layout at runtime —
never a hardcoded fraction, which would desync at every breakpoint.

| Section | Lattice state (desktop) |
|---|---|
| Hero | Centerpiece in the right half, full intensity |
| About → Education | Parked at the right edge, dimmed to 0.2–0.36, varying depth and height |
| Work | Furthest back and dimmest (0.2) — **content takes over** |
| Contact | Travels back to the right half, converges, full intensity — the hero's bookend |

Rules learned in visual QA and encoded in the data:

- **Never alternate sides.** An early version parked the lattice left for
  Skills and right for Work; the transition swept it across the middle of
  the screen, behind the Work intro. It now only travels along the right.
- **Never behind body copy.** Full intensity only where the layout reserves
  negative space for it (hero, contact).
- **Mobile is its own composition.** The hero anchors copy to the bottom and
  gives the lattice the top band; outside the hero it dims to 0.12 and lifts
  mostly out of frame, because narrow-screen copy runs full width.
- Offsets are fractions of the visible half-extent at the lattice's depth, so
  "right half" holds at every aspect ratio; narrower windows push it further
  out.

Implementation rules, all [DB] `--stack threejs` (verified against 0.185.1):

- `InstancedMesh` for nodes — *"any group of 50+ meshes sharing geometry and material"*
- `Points` + `BufferGeometry` for the dust field — *"never individual Mesh objects"*
- `Math.min(devicePixelRatio, 2)` — *"the cap is at 2, not at 3"*
- `FogExp2` for atmospheric depth and implicit far culling
- Size the renderer to the **canvas** `clientWidth/clientHeight`, not `window.inner*`
- Update `camera.aspect` and call `updateProjectionMatrix()` in every resize
- `dispose()` geometry, material and every texture on teardown

---

## 7. Responsive & fallback strategy

| Tier | Condition | Behaviour |
|---|---|---|
| Full | Desktop, WebGL available, motion allowed | Full lattice, scrubbed camera, DPR ≤ 2 |
| Reduced | ≤ 768px, or ≤ 4 logical cores, or coarse pointer | Fewer nodes, no dust field, DPR ≤ 1.5, static camera |
| Static | No WebGL, or `prefers-reduced-motion` | CSS gradient + static SVG lattice, zero animation |

Mobile is composed independently, not shrunk from desktop. The DOM reading order
is complete and the page is fully readable with JavaScript disabled entirely.

---

## 8. Icons

`lucide-react`. **[FALLBACK]** — `--domain icons` returned no library match for
web; its entries are Phosphor / react-native oriented. Lucide is named both in
the brief and in the skill's own pre-delivery checklist.

Accessibility contract from [DB] `icon-context-accessibility`:

- decorative, beside visible text → `aria-hidden="true"`
- meaningful, without equivalent visible text → provide a text alternative
- inside an interactive control → the **control** carries the accessible name

No emoji as icons (checklist item 1). The old site's `⬇` and `🩺` glyphs are
replaced with real Lucide icons.

---

## 9. Anti-patterns explicitly avoided

Purple/pink AI gradients · blanket glassmorphism · glowing blobs · everything
rounded · per-character text animation · animation on every element · emoji
icons · noisy backgrounds · scroll hijacking · Brutalism/anti-design ·
light-mode default · *"one duration for every transition"* · *"animating
width/height"* · *"removing focus rings"* · *"gray-on-gray"* · *"raw hex in
components"* · *"icon-only buttons without labels"*.

---

## 10. Pre-delivery checklist [DB]

- [ ] No emojis as icons (SVG: Lucide/Heroicons)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150–300ms)
- [ ] Text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard nav
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
