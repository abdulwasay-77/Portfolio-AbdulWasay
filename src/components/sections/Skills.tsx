import { skillGroups, skillsIntro } from "@/data/skills";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

/**
 * Chapter 2 — the toolkit.
 *
 * Deliberately 2D. The lattice is still visible behind it, and the
 * section's own structure (an indexed three-column register) already
 * echoes the node/edge language without competing with it.
 */
export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="shell">
        <SectionHeading
          label="02 / Stack"
          title="Tools I actually reach for"
          intro={skillsIntro}
        />

        <div className="grid gap-px border-t border-border bg-border md:grid-cols-3">
          {skillGroups.map((group, groupIndex) => (
            <Reveal
              key={group.title}
              delay={(groupIndex + 1) as 1 | 2 | 3}
              className="bg-bg"
            >
              <div className="h-full px-0 py-8 md:px-7">
                <div className="mb-6 flex items-baseline gap-3">
                  <span aria-hidden="true" className="label text-accent">
                    {group.index}
                  </span>
                  <h3 className="text-[0.95rem] font-semibold tracking-tight text-fg">
                    {group.title}
                  </h3>
                </div>

                <ul className="flex flex-col gap-0">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="group flex items-center gap-3 border-b border-border/60 py-2.5 last:border-b-0"
                    >
                      <span
                        aria-hidden="true"
                        className="size-1 shrink-0 rounded-full bg-border-strong transition-colors duration-200 group-hover:bg-accent"
                      />
                      <span className="font-mono text-[0.82rem] tracking-tight text-fg-muted transition-colors duration-200 group-hover:text-fg">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
