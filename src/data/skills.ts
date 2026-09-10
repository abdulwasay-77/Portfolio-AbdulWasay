/**
 * Skill groups, transcribed verbatim from the `#skills` section of the
 * previous index.html. Order and grouping are preserved.
 */

export interface SkillGroup {
  title: string;
  /** Mono index shown beside the group heading. */
  index: string;
  items: string[];
}

export const skillsIntro =
  "Technologies I use across backend, frontend, database, and systems-level work.";

export const skillGroups: SkillGroup[] = [
  {
    index: "01",
    title: "Languages",
    items: ["Python", "Java", "C++", "x86 NASM Assembly", "SQL / PL-SQL"],
  },
  {
    index: "02",
    title: "Frameworks & Tools",
    items: ["FastAPI", "Express.js", "React", "Flutter", "PyQt5"],
  },
  {
    index: "03",
    title: "Systems & Concepts",
    items: [
      "Oracle Database",
      "REST API Design",
      "AES-256 Cryptography",
      "Git & Version Control",
      "Software Architecture",
    ],
  },
];
