/**
 * Experience and education, transcribed verbatim from the `#experience`
 * and `#education` sections of the previous index.html.
 */

export interface Role {
  period: string;
  title: string;
  org: string;
  body: string;
  /** Terse variant used at <=768px, from the original `.mobile-text` span. */
  bodyShort: string;
}

export const experience: Role[] = [
  {
    period: "August 2026 — Present",
    title: "Web Development Intern",
    org: "Redfort Technologies",
    body: "Enrolled in a web development internship, strengthening practical skills in building responsive, user-focused web applications and contributing to real-world development projects.",
    bodyShort:
      "Building responsive, user-focused web applications and contributing to real-world projects.",
  },
  {
    period: "July 2026 — Present",
    title: "Intern",
    org: "FlyRank AI",
    body: "Contributing to real product development in an AI-focused environment, applying software engineering fundamentals to production-facing work.",
    bodyShort:
      "Contributing to real product development in an AI-focused environment.",
  },
  {
    period: "April 2026 — Present",
    title: "Cross-Platform & Web Application Developer",
    org: "Upwork (Freelance)",
    body: "Building cross-platform and web applications for clients using Python, Java, Flutter, React, and Express.js — covering everything from UI to backend API design.",
    bodyShort:
      "Building cross-platform and web applications covering both UI and backend APIs.",
  },
];

export const education = {
  badge: "UW",
  degree: "BS Computer Science",
  institution: "University of Wah",
  city: "Wah Cantt",
  period: "October 2024 – July 2028",
  progress: "4 Semesters Completed",
  gpa: "3.79",
  gpaScale: "CGPA / 4.0",
} as const;
