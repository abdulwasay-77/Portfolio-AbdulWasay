import { experience } from "@/data/experience";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

/**
 * Experience — a spatial progression down a single rail.
 *
 * Kept 2D on purpose: this is credential information a recruiter scans
 * in seconds, and legibility beats spectacle here.
 */
export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="shell">
        <SectionHeading label="04 / Experience" title="Where I'm working now" />

        <ol className="relative">
          {/* The rail. */}
          <span
            aria-hidden="true"
            className="absolute bottom-2 left-[5px] top-2 w-px bg-gradient-to-b from-accent/60 via-border-strong to-transparent md:left-[calc(13.5rem+5px)]"
          />

          {experience.map((role, index) => (
            <li key={`${role.org}-${role.title}`} className="relative pb-12 last:pb-0">
              {/* Positioned outside Reveal on purpose: Reveal applies a
                  CSS transform, which creates a new containing block for
                  absolutely-positioned descendants. Keeping the rail dot
                  a direct sibling of the li anchors it to the li itself. */}
              <span
                aria-hidden="true"
                className={[
                  "absolute left-0 top-1.5 size-[11px] rounded-full border-2 border-bg md:left-[13.5rem]",
                  index === 0 ? "bg-accent" : "bg-border-strong",
                ].join(" ")}
              />
              <Reveal delay={(Math.min(index, 6) + 1) as 1 | 2 | 3}>
                <div className="grid gap-3 pl-9 md:grid-cols-[13.5rem_minmax(0,1fr)] md:gap-0 md:pl-0">
                  <p className="label pt-1 text-[0.68rem] md:whitespace-nowrap md:pr-6">
                    {role.period}
                  </p>

                  <div className="md:pl-10">
                    <h3 className="text-[1.2rem] font-semibold tracking-tight text-fg md:text-[1.35rem]">
                      {role.title}
                    </h3>
                    <p className="mt-1 text-[0.95rem] font-medium text-accent">
                      {role.org}
                    </p>
                    <p className="mt-3 hidden max-w-[62ch] leading-relaxed text-fg-muted md:block">
                      {role.body}
                    </p>
                    <p className="mt-3 max-w-[62ch] leading-relaxed text-fg-muted md:hidden">
                      {role.bodyShort}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
