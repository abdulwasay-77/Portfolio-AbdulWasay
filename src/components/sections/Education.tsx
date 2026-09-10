import { GraduationCap } from "lucide-react";
import { education } from "@/data/experience";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Education() {
  return (
    <section id="education" className="section">
      <div className="shell">
        <SectionHeading label="05 / Education" title="Foundations" />

        <Reveal>
          <article className="grid overflow-hidden rounded-md border border-border bg-bg-elevated/80 md:grid-cols-[minmax(0,1fr)_auto]">
            <div className="flex gap-5 p-6 md:p-10">
              <span
                aria-hidden="true"
                className="grid size-12 shrink-0 place-items-center rounded-sm border border-border-strong text-accent"
              >
                <GraduationCap className="size-5" />
              </span>
              <div className="min-w-0">
                <h3 className="text-[1.35rem] font-semibold tracking-tight text-fg md:text-[1.6rem]">
                  {education.degree}
                </h3>
                <p className="mt-1.5 text-fg-muted">
                  {education.institution}, {education.city}
                </p>

                <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
                  <div>
                    <dt className="label text-[0.62rem]">Period</dt>
                    <dd className="mt-1 font-mono text-[0.85rem] text-fg">
                      {education.period}
                    </dd>
                  </div>
                  <div>
                    <dt className="label text-[0.62rem]">Progress</dt>
                    <dd className="mt-1 font-mono text-[0.85rem] text-fg">
                      {education.progress}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* The score, given its own column so it reads as the headline
                number it is. */}
            <div className="flex items-center gap-4 border-t border-border px-6 py-6 md:flex-col md:items-end md:justify-center md:border-l md:border-t-0 md:px-12 md:py-10">
              <p className="font-mono text-[2.6rem] font-bold leading-none tracking-tight text-fg md:text-[3.5rem]">
                {education.gpa}
              </p>
              <p className="label text-[0.66rem]">{education.gpaScale}</p>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
