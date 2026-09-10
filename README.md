# Abdul Wasay — Portfolio

Personal portfolio: a dark, scroll-driven site with a single persistent
WebGL scene ("the Lattice") behind server-rendered content.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 ·
three.js + React Three Fiber · Lenis · lucide-react

## Commands

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
npm run build && npm start
```

## Where things live

| Path | What |
|---|---|
| `src/data/` | **All portfolio content.** Edit here to change the site — no UI code needed. |
| `src/app/` | Routes: `/`, `/projects/[slug]`, API routes, `sitemap`, `robots`, OG image |
| `src/components/sections/` | One file per home-page section (server components) |
| `src/components/three/` | The WebGL lattice, its geometry, and the zero-JS SVG fallback |
| `src/components/layout/` | Nav, footer, scroll progress, scroll/motion provider |
| `src/lib/capability.ts` | Chooses the rendering tier per device (full / reduced / static) |
| `design-system/` | Design system: tokens, type, motion, 3D rules, and why |
| `legacy/` | Archived copy of the previous static site, for reference only — not served |

To add a project, append an entry to `src/data/projects.ts`. Its detail page,
sitemap entry, metadata and architecture visual are all generated from it.

## Rendering tiers

| Tier | Who gets it | What |
|---|---|---|
| Full | Desktop, WebGL, motion allowed | Scroll-choreographed 3D lattice, smooth scroll |
| Reduced | Phones, touch tablets, ≤4 cores, Save-Data | Lighter lattice, native scrolling |
| Static | No WebGL, or `prefers-reduced-motion` | SVG lattice; three.js is never downloaded |

## Environment variables

See `.env.example`. None are required to build or run.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata and sitemap. Optional on Vercel, which provides `VERCEL_PROJECT_PRODUCTION_URL`. |
| `KV_REST_API_URL` / `KV_REST_API_TOKEN` | Upstash Redis for the VaultX download counter (`UPSTASH_REDIS_REST_*` also accepted) |
| `STATS_SECRET` | Key for the private `GET /api/download-count?key=…` endpoint |

## Old URLs

Links to the previous static site keep working through permanent redirects:
`/index.html` → `/`, `/pages/<name>.html` → `/projects/<name>`,
`/assets/<file>` → `/<file>`.
