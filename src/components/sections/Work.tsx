import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";
import { projects, projectsIntro } from "@/data/projects";
import Reveal from "@/components/ui/Reveal";
import BrandIcon from "@/components/ui/BrandIcon";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectVisual from "@/components/projects/ProjectVisual";
import DownloadButton from "@/components/projects/DownloadButton";

/**
 * Chapter 3 — the proof, and the visual climax of the page.
 *
 * This is where the 3D layer deliberately recedes (intensity drops to
 * ~0.28 in the chapter track) and the content takes the foreground.
 * Each project is a full-width row alternating side, so the eye has a
 * reason to keep travelling down the page.
 */
export default function Work() {
  return (
    <section id="work" className="section">
      <div className="shell">
        <SectionHeading
          label="03 / Work"
          title="Projects, end to end"
          intro={projectsIntro}
          aside={
            <p className="label text-fg-faint">
              {String(projects.length).padStart(2, "0")} case studies
            </p>
          }
        />

        <ul className="flex flex-col">
          {projects.map((project, index) => {
            const flipped = index % 2 === 1;
            return (
              <li
                key={project.slug}
                className="group border-t border-border py-12 last:border-b md:py-16"
              >
                <article
                  className={[
                    "grid items-center gap-8 lg:gap-16",
                    "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]",
                  ].join(" ")}
                >
                  <Reveal
                    delay={1}
                    className={flipped ? "lg:order-2" : undefined}
                  >
                    <ProjectVisual project={project} />
                  </Reveal>

                  <Reveal
                    delay={2}
                    className={flipped ? "lg:order-1" : undefined}
                  >
                    <div>
                      <div className="mb-4 flex flex-wrap items-center gap-3">
                        <span
                          aria-hidden="true"
                          className="label text-fg-faint"
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="label text-fg-faint">
                          {project.kicker}
                        </span>
                        {project.download ? (
                          <span className="rounded-xs border border-warn/40 px-2 py-0.5 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-warn">
                            Downloadable
                          </span>
                        ) : null}
                      </div>

                      <h3 className="text-[1.75rem] font-bold tracking-tight text-fg md:text-[2.1rem]">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="transition-colors duration-200 hover:text-accent"
                        >
                          {project.name}
                        </Link>
                      </h3>

                      <p className="mt-4 hidden max-w-[54ch] leading-relaxed text-fg-muted md:block">
                        {project.blurb}
                      </p>
                      <p className="mt-3 max-w-[54ch] leading-relaxed text-fg-muted md:hidden">
                        {project.blurbShort}
                      </p>

                      <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
                        {project.stats.map((stat) => (
                          <div key={stat.label} className="flex flex-col-reverse justify-end gap-2">
                            <dt className="label text-[0.6rem] leading-snug">
                              {stat.label}
                            </dt>
                            <dd className="font-mono text-[1.05rem] font-bold tracking-tight text-fg">
                              {stat.value}
                            </dd>
                          </div>
                        ))}
                      </dl>

                      <ul className="mt-7 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-xs border border-border px-2.5 py-1 font-mono text-[0.7rem] text-fg-muted"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="group/cta inline-flex items-center gap-2 text-[0.88rem] font-semibold text-fg transition-colors duration-200 hover:text-accent"
                        >
                          Read the case study
                          <ArrowUpRight
                            aria-hidden="true"
                            className="size-4 transition-transform duration-200 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5"
                          />
                        </Link>

                        <a
                          href={project.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-[0.88rem] font-medium text-fg-muted transition-colors duration-200 hover:text-fg"
                        >
                          <BrandIcon id="github" className="size-4" />
                          Repository
                        </a>

                        {project.download ? (
                          <DownloadButton
                            href={project.download}
                            className="inline-flex items-center gap-2 text-[0.88rem] font-medium text-warn transition-colors duration-200 hover:text-fg"
                          >
                            <Download aria-hidden="true" className="size-4" />
                            Installer
                          </DownloadButton>
                        ) : null}
                      </div>
                    </div>
                  </Reveal>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
