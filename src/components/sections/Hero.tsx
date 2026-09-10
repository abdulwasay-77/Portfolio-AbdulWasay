import Link from "next/link";
import { ArrowDown, Download } from "lucide-react";
import { profile, stats } from "@/data/profile";
import Reveal from "@/components/ui/Reveal";

/**
 * Intro hook.
 *
 * Server component. The 3D centerpiece is the lattice, rendered once for
 * the whole page by <Backdrop>; this section leaves it the space it
 * needs — the right half on desktop, the top band on mobile.
 */
export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-end pb-14 pt-[calc(var(--header-h)+38svh)] lg:items-center lg:pb-20 lg:pt-[calc(var(--header-h)+40px)]"
    >
      <div className="shell w-full">
        {/* Left half only on desktop: the right half is negative space
            that the lattice occupies as the hero's centerpiece. */}
        <div>
          <div className="max-w-[44rem]">
            <Reveal>
              <p className="label mb-6 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="inline-block h-px w-8 bg-accent"
                />
                {profile.eyebrow}
              </p>
            </Reveal>

            <Reveal delay={1}>
              <h1 className="display font-bold">
                {profile.headline.lead}{" "}
                <span className="relative text-accent sm:whitespace-nowrap">
                  {profile.headline.accent}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-1 hidden h-px bg-accent/40 sm:block"
                  />
                </span>
                <span className="text-accent">.</span>
              </h1>
            </Reveal>

            <Reveal delay={2}>
              <div className="mt-8 max-w-[58ch] space-y-4 lg:max-w-[34rem]">
                {/* Long form on >=768px, condensed below — both variants
                    come from the original site's own copy. */}
                <div className="hidden md:block md:space-y-4">
                  {profile.heroIntro.map((paragraph) => (
                    <p key={paragraph} className="lead">
                      {paragraph}
                    </p>
                  ))}
                </div>
                <p className="lead md:hidden">{profile.heroIntroShort}</p>
              </div>
            </Reveal>

            <Reveal delay={3}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <a
                  href="#work"
                  className="group inline-flex items-center gap-2 rounded-sm bg-accent px-5 py-3 text-[0.9rem] font-semibold text-on-accent transition-colors duration-200 hover:bg-accent-strong"
                >
                  View projects
                  <ArrowDown
                    aria-hidden="true"
                    className="size-4 transition-transform duration-200 group-hover:translate-y-0.5"
                  />
                </a>
                <Link
                  href="/projects/vaultx"
                  className="group inline-flex items-center gap-2 rounded-sm border border-border-strong px-5 py-3 text-[0.9rem] font-semibold text-fg transition-colors duration-200 hover:border-warn hover:text-warn"
                >
                  <Download aria-hidden="true" className="size-4" />
                  Download VaultX
                </Link>
              </div>
            </Reveal>

            <Reveal delay={4}>
              <dl className="mt-12 grid max-w-lg grid-cols-3 lg:mt-14 gap-px overflow-hidden rounded-sm border border-border bg-border">
                {stats.map((stat) => (
                  <div key={stat.label} className="bg-bg px-4 py-4 sm:px-5 flex flex-col-reverse justify-end gap-2">
                    <dt className="label text-[0.62rem] leading-snug sm:text-[0.66rem]">
                      {stat.label}
                    </dt>
                    <dd className="font-mono text-[1.6rem] font-bold leading-none tracking-tight text-fg sm:text-[2rem]">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
