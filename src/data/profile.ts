/**
 * Personal profile data.
 *
 * Every value here is transcribed from the previous static site
 * (index.html) and is authoritative. Nothing in this file is invented.
 */

export type SocialId = "linkedin" | "github" | "upwork" | "instagram";

export interface SocialLink {
  id: SocialId;
  label: string;
  href: string;
  /** Shown as the handle/path under the label. */
  handle: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Capability {
  /** Short mono badge, kept from the original `icon-dot` markup. */
  code: string;
  title: string;
  body: string;
  /** Terse variant used at <=768px, from the original `.mobile-text` span. */
  bodyShort: string;
}

export const profile = {
  name: "Abdul Wasay",
  role: "Full-Stack & Cross-Platform Developer",
  /** Original hero eyebrow, verbatim. */
  eyebrow: "Full-Stack & Cross-Platform Developer",
  email: "wasay2810@gmail.com",
  photo: "/profile.jpg",

  /** Original <title> / meta description of index.html. */
  siteTitle: "Abdul Wasay — Full-Stack & Cross-Platform Developer",
  siteDescription:
    "Portfolio of Abdul Wasay — Full-Stack & Cross-Platform Developer and Computer Science student building practical, clean-architecture software applications.",

  /** Hero headline, split so the accent span can be styled independently. */
  headline: {
    lead: "Software built to",
    accent: "solve real problems",
  },

  heroIntro: [
    "I'm Abdul Wasay, a Full-Stack & Cross-Platform Developer and Computer Science student who enjoys turning complex ideas into practical software.",
    "From web and desktop applications to AI-powered systems and backend services, I build with a focus on clean architecture, useful experiences, and continuous learning.",
  ],
  heroIntroShort:
    "I'm Abdul Wasay, a Full-Stack & Cross-Platform Developer and CS student focused on clean architecture and practical, useful software.",

  about: [
    "I'm a Computer Science student at the University of Wah, currently in my 3rd year, with a strong interest in learning, problem-solving, and turning ideas into working systems. I care about discipline and growth as much as I care about code — most of my projects start as a way to genuinely understand a concept, not just to complete an assignment.",
    "My work spans the full stack: from normalized Oracle databases and FastAPI backends, to PyQt5 desktop apps, to a real x86 NASM Assembly engine powering an educational visualizer. I'm currently gaining professional experience through internships at FlyRank AI and Redfort Technologies, while building cross-platform and web applications using Python, Java, Flutter, React, and Express.js for real-world clients.",
  ],
  aboutShort: [
    "I'm a 3rd-year CS student at the University of Wah who enjoys building functional software. I prioritize writing structured, clean code to solve real-world problems.",
    "My full-stack experience includes FastAPI backends, PyQt5 desktop apps, and low-level programming. I am currently honing my skills as an intern at FlyRank AI and Redfort Technologies.",
  ],

  contactLead:
    "Whether you have an interesting project, an internship opportunity, or just want to discuss software development — feel free to reach out!",
} as const;

/** Hero statistics, exactly as they appeared on the original site. */
export const stats: Stat[] = [
  { value: "5", label: "Projects Built" },
  { value: "3.79", label: "CGPA / 4.0" },
  { value: "4", label: "Semesters Completed" },
];

export const capabilities: Capability[] = [
  {
    code: "DB",
    title: "Database Engineering",
    body: "Normalized Oracle 21c schemas, PL/SQL triggers, procedures, materialized views, and transaction control.",
    bodyShort: "Normalized Oracle 21c schemas, triggers, and transaction controls.",
  },
  {
    code: "AI",
    title: "AI Integration",
    body: "Applied machine learning, scikit-learn anomaly detection, deep learning diagnostics, and predictive pipelines.",
    bodyShort: "Applied machine learning anomaly detection and predictive pipelines.",
  },
  {
    code: "FS",
    title: "Full-Stack Development",
    body: "End-to-end applications built with FastAPI, Express.js, React, and cross-platform Flutter.",
    bodyShort: "End-to-end applications built with FastAPI, React, and Flutter.",
  },
  {
    code: "ASM",
    title: "Systems Programming",
    body: "Low-level architecture, x86 NASM Assembly, compiled DLLs, and ctypes FFI memory interop.",
    bodyShort: "Low-level assembly, compiled DLLs, and memory interop.",
  },
];

export const socials: SocialLink[] = [
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/abdul-wasay-9922b6352/",
    handle: "in/abdul-wasay-9922b6352",
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/abdulwasay-77",
    handle: "abdulwasay-77",
  },
  {
    id: "upwork",
    label: "Upwork",
    href: "https://www.upwork.com/freelancers/~019523b20db5467d16",
    handle: "Freelance profile",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/abdul_was_ay",
    handle: "@abdul_was_ay",
  },
];
