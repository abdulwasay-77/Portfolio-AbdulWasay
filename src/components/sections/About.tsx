import Image from "next/image";
import { capabilities, profile } from "@/data/profile";
import { education } from "@/data/experience";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

/** Chapter 1 — who, and how the work is approached. */
export default function About() {
  return (
    <section id="about" className="section">
      <div className="shell">
        <SectionHeading label="01 / About" title="How I approach the work" />

        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            {/* Portrait — the original site showed it in About as well as
                the hero. Here it anchors the narrative column. */}
            <Reveal>
              <figure className="mb-10 flex items-center gap-5">
                <div className="relative size-24 shrink-0 overflow-hidden rounded-md border border-border-strong sm:size-28">
                  <Image
                    src={profile.photo}
                    alt={`Portrait of ${profile.name}`}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </div>
                <figcaption className="min-w-0">
                  <p className="text-[1.05rem] font-semibold tracking-tight text-fg">
                    {profile.name}
                  </p>
                  <p className="mt-1 text-[0.9rem] text-fg-muted">
                    {education.degree} · {education.institution}
                  </p>
                  <a
                    href={`mailto:${profile.email}`}
                    className="mt-1.5 inline-block font-mono text-[0.78rem] text-accent transition-colors duration-200 hover:text-accent-strong"
                  >
                    {profile.email}
                  </a>
                </figcaption>
              </figure>
            </Reveal>

            <Reveal delay={1}>
              <div className="hidden space-y-6 md:block">
                {profile.about.map((paragraph) => (
                  <p key={paragraph} className="lead text-[1.05rem]">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="space-y-5 md:hidden">
                {profile.aboutShort.map((paragraph) => (
                  <p key={paragraph} className="lead">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Capability list. A bordered stack, not four rounded cards —
              the grid lines do the separating work. */}
          <Reveal delay={2}>
            <ul className="divide-y divide-border border-y border-border">
              {capabilities.map((capability) => (
                <li
                  key={capability.code}
                  className="group flex gap-5 py-6 transition-colors duration-200"
                >
                  <span
                    aria-hidden="true"
                    className="mt-0.5 w-11 shrink-0 font-mono text-[0.68rem] font-bold tracking-[0.1em] text-fg-faint transition-colors duration-200 group-hover:text-accent"
                  >
                    {capability.code}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[1.02rem] font-semibold tracking-tight text-fg">
                      {capability.title}
                    </h3>
                    <p className="mt-1.5 hidden text-[0.92rem] leading-relaxed text-fg-muted md:block">
                      {capability.body}
                    </p>
                    <p className="mt-1.5 text-[0.92rem] leading-relaxed text-fg-muted md:hidden">
                      {capability.bodyShort}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
