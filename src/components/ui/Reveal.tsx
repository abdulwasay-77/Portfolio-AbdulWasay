import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Stagger step, 1-7. Capped at 7 — beyond ~8 the tail feels laggy. */
  delay?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  as?: "div" | "li" | "span" | "section";
  className?: string;
}

/**
 * Marks a subtree for the page-wide reveal observer.
 *
 * This is a server component: it only emits class names. The observer
 * that adds `is-visible` lives in ScrollProvider, so a single observer
 * serves the whole page instead of one per element.
 */
export default function Reveal({
  children,
  delay,
  as: Tag = "div",
  className = "",
}: RevealProps) {
  return (
    <Tag className={`reveal ${className}`.trim()} data-delay={delay}>
      {children}
    </Tag>
  );
}
