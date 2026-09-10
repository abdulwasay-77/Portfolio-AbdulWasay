import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Download,
  Info,
} from "lucide-react";
import { getProject, projects, projectSlugs } from "@/data/projects";
import { profile } from "@/data/profile";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import ScrollProvider from "@/components/layout/ScrollProvider";
import ProjectVisual from "@/components/projects/ProjectVisual";
import DownloadButton from "@/components/projects/DownloadButton";
import Reveal from "@/components/ui/Reveal";
import BrandIcon from "@/components/ui/BrandIcon";

// Only the four known projects exist; anything else is a real 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    // The original pages used "<Title> | Abdul Wasay"; the root layout's
    // title template reproduces that suffix.
    title: project.title,
    description: project.metaDescription,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      title: `${project.title} | ${profile.name}`,
      description: project.metaDescription,
      url: `/projects/${project.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | ${profile.name}`,
      description: project.metaDescription,
    },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      {/* Long-form reading page: no WebGL competing with dense technical
          copy. Just a wash of the project's hue behind the hero, which
          scrolls away with it. */}
      <ScrollProvider />
      <Nav variant="detail" />

      <main
        id="main"
        className="relative z-10"
        style={{ ["--hue" as string]: project.hue }}
      >
        {/* ---------- Hero ---------- */}
        <header id="hero" className="relative pb-16 pt-[calc(var(--header-h)+48px)] md:pb-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[120%]"
            style={{
              background:
                "radial-gradient(55% 60% at 78% 30%, hsl(var(--hue) 90% 55% / 0.10), transparent 70%)",
            }}
          />
          <div className="shell">
            <Reveal>
              <nav aria-label="Breadcrumb" className="mb-10">
                <ol className="flex items-center gap-2 font-mono text-[0.72rem] text-fg-faint">
                  <li>
                    <Link
                      href="/#work"
                      className="inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-fg"
                    >
                      <ArrowLeft aria-hidden="true" className="size-3.5" />
                      Projects
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li aria-current="page" className="text-fg-muted">
                    {project.name}
                  </li>
                </ol>
              </nav>
            </Reveal>

            <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
              <div>
                <Reveal delay={1}>
                  <p className="label mb-5 flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="inline-block h-px w-8"
                      style={{ background: "hsl(var(--hue) 85% 62%)" }}
                    />
                    {project.kicker}
                  </p>
                </Reveal>

                <Reveal delay={2}>
                  <h1 className="text-[clamp(2.1rem,5vw,3.6rem)] font-bold leading-[1.02] tracking-[-0.04em]">
                    {project.title.split(" — ")[0]}
                    <span className="mt-2 block text-[0.52em] font-semibold leading-tight tracking-[-0.02em] text-fg-muted">
                      {project.title.split(" — ")[1]}
                    </span>
                  </h1>
                </Reveal>

                <Reveal delay={3}>
                  <p className="lead mt-7 hidden max-w-[60ch] md:block">
                    {project.lead}
                  </p>
                  <p className="lead mt-6 max-w-[60ch] md:hidden">
                    {project.leadShort}
                  </p>
                </Reveal>

                <Reveal delay={4}>
                  <div className="mt-9 flex flex-wrap gap-3">
                    {project.download ? (
                      <a
                        href="#download"
                        className="inline-flex items-center gap-2 rounded-sm bg-warn px-5 py-3 text-[0.9rem] font-semibold text-on-accent transition-opacity duration-200 hover:opacity-90"
                      >
                        <Download aria-hidden="true" className="size-4" />
                        Download for Windows
                      </a>
                    ) : null}
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={[
                        "inline-flex items-center gap-2 rounded-sm px-5 py-3 text-[0.9rem] font-semibold transition-colors duration-200",
                        project.download
                          ? "border border-border-strong text-fg hover:border-accent hover:text-accent"
                          : "bg-accent text-on-accent hover:bg-accent-strong",
                      ].join(" ")}
                    >
                      <BrandIcon id="github" className="size-4" />
                      View repository
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </div>
                </Reveal>
              </div>

              <Reveal delay={3}>
                <ProjectVisual project={project} size="hero" />
              </Reveal>
            </div>

            <Reveal delay={5}>
              <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-4">
                {project.stats.map((stat) => (
                  <div key={stat.label} className="bg-bg px-5 py-5 md:px-6 md:py-6 flex flex-col-reverse justify-end gap-2">
                    <dt className="label text-[0.62rem]">{stat.label}</dt>
                    <dd className="font-mono text-[1.5rem] font-bold leading-none tracking-tight text-fg md:text-[1.9rem]">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </header>

        {/* ---------- Problem ---------- */}
        <section aria-labelledby="problem-title" className="border-t border-border py-20 md:py-28">
          <div className="shell grid gap-8 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16">
            <Reveal>
              <h2 id="problem-title" className="label pt-1.5 text-fg-muted">
                01 / {project.problemTitle}
              </h2>
            </Reveal>
            <div>
              {project.disclaimer ? (
                <Reveal>
                  <aside
                    aria-label="Disclaimer"
                    className="mb-8 flex gap-4 rounded-sm border border-border-strong bg-surface p-5"
                  >
                    <Info aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-accent" />
                    <p className="text-[0.92rem] leading-relaxed text-fg-muted">
                      <strong className="font-semibold text-fg">Note:</strong>{" "}
                      {project.disclaimer}
                    </p>
                  </aside>
                </Reveal>
              ) : null}
              <Reveal delay={1}>
                <p className="hidden max-w-[68ch] text-[1.12rem] leading-[1.75] text-fg md:block">
                  {project.problem}
                </p>
                <p className="max-w-[68ch] text-[1.05rem] leading-[1.75] text-fg md:hidden">
                  {project.problemShort}
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---------- Features ---------- */}
        <section aria-labelledby="features-title" className="border-t border-border py-20 md:py-28">
          <div className="shell grid gap-8 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16">
            <Reveal>
              <h2 id="features-title" className="label pt-1.5 text-fg-muted">
                02 / Key Features
              </h2>
            </Reveal>
            <ul className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2">
              {project.features.map((feature, i) => (
                <li key={feature.title} className="bg-bg">
                  <Reveal delay={((i % 6) + 1) as 1 | 2 | 3 | 4 | 5 | 6} className="h-full">
                    <div className="h-full p-6 md:p-7">
                      <span
                        aria-hidden="true"
                        className="mb-4 block font-mono text-[0.66rem] font-bold"
                        style={{ color: "hsl(var(--hue) 85% 68%)" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-[1.02rem] font-semibold tracking-tight text-fg">
                        {feature.title}
                      </h3>
                      <p className="mt-2.5 text-[0.92rem] leading-relaxed text-fg-muted">
                        {feature.body}
                      </p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- Architecture ---------- */}
        <section aria-labelledby="arch-title" className="border-t border-border py-20 md:py-28">
          <div className="shell grid gap-8 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16">
            <Reveal>
              <h2 id="arch-title" className="label pt-1.5 text-fg-muted">
                03 / {project.architectureTitle}
              </h2>
            </Reveal>
            <ol className="relative">
              <span
                aria-hidden="true"
                className="absolute bottom-6 left-[1.1rem] top-6 w-px bg-border-strong"
              />
              {project.architecture.map((layer, i) => (
                <li key={layer.step} className="relative pb-10 pl-14 last:pb-0">
                  {/* Positioned outside Reveal on purpose: Reveal's CSS
                      transform creates a new containing block, which
                      would pull this absolutely-positioned badge off
                      the li's padding edge and onto the same spot as
                      the heading text. Keeping it a direct sibling of
                      the padded li anchors it correctly at all times. */}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 grid size-9 place-items-center rounded-sm border bg-bg font-mono text-[0.7rem] font-bold"
                    style={{
                      borderColor: "hsl(var(--hue) 70% 55% / 0.5)",
                      color: "hsl(var(--hue) 85% 70%)",
                    }}
                  >
                    {layer.step}
                  </span>
                  <Reveal delay={((i % 5) + 1) as 1 | 2 | 3 | 4 | 5}>
                    {layer.badge ? (
                      <p className="label mb-1.5 text-[0.62rem]">{layer.badge}</p>
                    ) : null}
                    <h3 className="text-[1.1rem] font-semibold tracking-tight text-fg md:text-[1.2rem]">
                      {layer.title}
                    </h3>
                    <p className="mt-2.5 max-w-[68ch] leading-relaxed text-fg-muted">
                      {layer.body}
                    </p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------- Stack ---------- */}
        <section aria-labelledby="stack-title" className="border-t border-border py-20 md:py-28">
          <div className="shell grid gap-8 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16">
            <Reveal>
              <h2 id="stack-title" className="label pt-1.5 text-fg-muted">
                04 / Tech Stack
              </h2>
            </Reveal>
            <Reveal delay={1}>
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <li
                    key={item}
                    className="rounded-xs border border-border-strong bg-bg px-3 py-1.5 font-mono text-[0.78rem] text-fg-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* ---------- CTA ---------- */}
        <section
          id={project.download ? "download" : undefined}
          aria-labelledby="cta-title"
          className="border-t border-border py-20 md:py-28"
        >
          <div className="shell">
            <Reveal>
              <div className="relative overflow-hidden rounded-md border border-border-strong bg-bg-elevated p-8 md:p-14">
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(60% 90% at 100% 0%, hsl(var(--hue) 90% 60% / 0.12), transparent 70%)",
                  }}
                />
                <div className="relative flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                  <div className="max-w-xl">
                    <h2 id="cta-title" className="text-[1.6rem] font-bold tracking-tight text-fg md:text-[2rem]">
                      {project.ctaTitle}
                    </h2>
                    <p className="mt-3 leading-relaxed text-fg-muted">{project.ctaBody}</p>
                  </div>
                  <div className="flex shrink-0 flex-wrap gap-3">
                    {project.download ? (
                      <DownloadButton
                        href={project.download}
                        className="inline-flex items-center gap-2 rounded-sm bg-warn px-5 py-3 text-[0.9rem] font-semibold text-on-accent transition-opacity duration-200 hover:opacity-90"
                      >
                        <Download aria-hidden="true" className="size-4" />
                        Download Installer (.exe)
                      </DownloadButton>
                    ) : null}
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={[
                        "inline-flex items-center gap-2 rounded-sm px-5 py-3 text-[0.9rem] font-semibold transition-colors duration-200",
                        project.download
                          ? "border border-border-strong text-fg hover:border-accent hover:text-accent"
                          : "bg-accent text-on-accent hover:bg-accent-strong",
                      ].join(" ")}
                    >
                      <BrandIcon id="github" className="size-4" />
                      {project.download ? "View Source on GitHub" : "View on GitHub"}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---------- Next project ---------- */}
        <nav aria-label="Next project" className="border-t border-border">
          <Link
            href={`/projects/${next.slug}`}
            className="group block py-16 md:py-24"
          >
            <div className="shell flex items-end justify-between gap-6">
              <div>
                <p className="label mb-3">Next project</p>
                <p className="text-[clamp(2rem,6vw,4rem)] font-bold leading-none tracking-[-0.04em] text-fg transition-colors duration-200 group-hover:text-accent">
                  {next.name}
                </p>
                <p className="mt-3 text-fg-muted">{next.kicker}</p>
              </div>
              <ArrowRight
                aria-hidden="true"
                className="mb-2 size-8 shrink-0 text-fg-faint transition-transform duration-300 group-hover:translate-x-1.5 group-hover:text-accent md:size-10"
              />
            </div>
          </Link>
        </nav>
      </main>

      <Footer />
    </>
  );
}
