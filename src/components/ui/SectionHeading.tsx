import type { ReactNode } from "react";
import Reveal from "./Reveal";

interface SectionHeadingProps {
  /** Mono eyebrow, e.g. "02 / Skills". */
  label: string;
  title: ReactNode;
  intro?: string;
  /** Extra element pinned to the right on wide viewports. */
  aside?: ReactNode;
}

export default function SectionHeading({
  label,
  title,
  intro,
  aside,
}: SectionHeadingProps) {
  return (
    <header className="mb-12 md:mb-16">
      <Reveal>
        <p className="label mb-5">{label}</p>
      </Reveal>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
        <Reveal delay={1}>
          <h2 className="h2 max-w-[18ch]">{title}</h2>
        </Reveal>
        {aside ? <Reveal delay={2}>{aside}</Reveal> : null}
      </div>

      {intro ? (
        <Reveal delay={2}>
          <p className="lead mt-6 max-w-[62ch]">{intro}</p>
        </Reveal>
      ) : null}
    </header>
  );
}
