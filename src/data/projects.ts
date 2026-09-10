/**
 * Project data.
 *
 * Transcribed from the previous static project pages (legacy/pages/*.html).
 * Titles, descriptions, problem statements, features, architecture, stats,
 * tech stacks, repository and download URLs are reproduced exactly.
 *
 * Two fields are presentation-only, added for the redesign: `kicker` (a
 * two-to-four word label summarising what is already stated) and `hue`
 * (each project's accent, echoing the old pages' per-project themes).
 * Neither introduces a new fact.
 */

export interface ProjectStat {
  value: string;
  label: string;
}

export interface ProjectFeature {
  title: string;
  body: string;
}

export interface ProjectLayer {
  /** Ordinal shown in the architecture list ("01", "02", ...). */
  step: string;
  /** Optional layer classification, present on ASMVision and DiagnoSight. */
  badge?: string;
  title: string;
  body: string;
}

export interface Project {
  slug: string;
  name: string;
  /** Full title used on the detail page and in metadata. */
  title: string;
  /** Metadata description from the original page <head>. */
  metaDescription: string;
  /** Short label for the index row. Presentation-only, see header. */
  kicker: string;
  /** Card blurb, desktop variant. */
  blurb: string;
  /** Card blurb, <=768px variant. */
  blurbShort: string;
  /** Detail-page lead paragraph, desktop variant. */
  lead: string;
  /** Detail-page lead paragraph, <=768px variant. */
  leadShort: string;
  problemTitle: string;
  problem: string;
  problemShort: string;
  /** Shown as a callout above the problem statement (DiagnoSight only). */
  disclaimer?: string;
  stats: ProjectStat[];
  /** Short tags for the index card. */
  tags: string[];
  features: ProjectFeature[];
  architectureTitle: string;
  architecture: ProjectLayer[];
  stack: string[];
  repo: string;
  /** Direct binary download, VaultX only. */
  download?: string;
  ctaTitle: string;
  ctaBody: string;
  /** Accent hue in degrees for this project's visuals. */
  hue: number;
}

export const projects: Project[] = [
  {
    slug: "vaultx",
    name: "VaultX",
    title: "VaultX — AI-Powered Digital Vault",
    metaDescription:
      "VaultX is a self-hosted, AES-256 encrypted desktop vault for passwords, documents, and notes. Built by Abdul Wasay with Python, FastAPI, and PyQt5.",
    kicker: "Encrypted desktop vault",
    blurb:
      "AI-powered digital vault for securely storing passwords, documents, and notes — encrypted at rest with AES-256. Ready to run on Windows.",
    blurbShort:
      "AI-powered digital vault with AES-256 encryption. Ready for Windows.",
    lead: "A secure desktop application for safely storing passwords, private documents, and notes in a single AES-256 encrypted vault — similar to LastPass or Bitwarden, but self-hosted and fully under your control. Unlike the other projects here, VaultX is finished, packaged, and ready to install.",
    leadShort:
      "A self-hosted, AES-256 encrypted desktop application for secure password, document, and notes management.",
    problemTitle: "The Problem",
    problem:
      "Modern password managers push cloud sync and browser autofill by default — which isn't always what people want for their most sensitive data. VaultX is a locally-hosted, single-user security vault: a desktop client, a backend REST API, and a relational database all running on your own machine — giving you a private place to store passwords, documents, and notes without handing them to a third-party cloud.",
    problemShort:
      "VaultX offers a completely local security vault, running a PyQt5 desktop client, a FastAPI backend, and an SQLite database on your own machine to ensure your credentials and documents remain private.",
    stats: [
      { value: "AES-256", label: "Encryption" },
      { value: "3-Tier", label: "Architecture" },
      { value: "6+", label: "Core Features" },
      { value: "Windows", label: "Ready to Install" },
    ],
    tags: ["Python", "FastAPI", "AES-256", "SQL"],
    features: [
      {
        title: "Password Vault",
        body: "Store, retrieve, update, and delete password entries with automatic strength analysis, reused-password detection, and a configurable password generator.",
      },
      {
        title: "Encrypted Document Vault",
        body: "Upload, preview, download, and delete documents up to 500 MB, with automatic sensitivity classification (Low / Medium / High) based on filename keywords.",
      },
      {
        title: "Rich-Text Notes",
        body: "Create, edit, and organize notes into folders, with full move-between-folders support and version history.",
      },
      {
        title: "Smart Search",
        body: "A single search bar queries passwords, documents, and notes simultaneously, ranked by relevance, with live suggestions as you type.",
      },
      {
        title: "Risk Dashboard",
        body: "A vault-wide health score, plus lists of weak and reused passwords, so you always know where you're exposed.",
      },
      {
        title: "Backup & Restore",
        body: "Export your entire vault into a single encrypted backup file, and restore it in overwrite or smart-merge mode, with backup integrity verification.",
      },
    ],
    architectureTitle: "How It's Built",
    architecture: [
      {
        step: "01",
        title: "Desktop Client",
        body: "A Windows desktop application providing the full graphical interface — dashboard, password vault, document vault, notes, search, risk dashboard, and backup screens. Built with Python and PyQt5 for native desktop feel.",
      },
      {
        step: "02",
        title: "Backend REST API",
        body: "A FastAPI REST API handling authentication, encryption/decryption, business rules, and request validation. All cryptographic operations happen exclusively on the backend — never in the client — using AES-256 with per-entry initialization vectors and JWT-based session management.",
      },
      {
        step: "03",
        title: "Relational Database + File Storage",
        body: "Stores user accounts and encrypted entries in a normalized relational schema. The file system separately stores encrypted document files and backup archives, each protected with a unique IV. Nothing is stored or transmitted in plaintext.",
      },
    ],
    stack: [
      "Python",
      "PyQt5 / Desktop GUI",
      "FastAPI",
      "AES-256 Encryption",
      "JWT Authentication",
      "SQLite / SQLAlchemy",
      "Flutter (Mobile Companion)",
      "REST API Design",
    ],
    repo: "https://github.com/abdulwasay-77/VaultX-AI-Powered-Digital-Vault",
    download:
      "https://w6sicxsas7pededr.public.blob.vercel-storage.com/VaultX-Installer.exe",
    ctaTitle: "Download VaultX for Windows",
    ctaBody:
      "Get the installer and start securing your passwords, documents, and notes locally — no account with a third party required. All data stays on your machine.",
    hue: 28,
  },

  {
    slug: "aurixa",
    name: "AURIXA",
    title: "AURIXA — Intelligent Digital Expense Governance",
    metaDescription:
      "AURIXA is an intelligent digital expense governance platform backed by a 29-table Oracle 21c schema, AI anomaly detection, and multi-currency subscription tracking. Built by Abdul Wasay.",
    kicker: "Oracle + ML expense platform",
    blurb:
      "Intelligent digital expense governance platform with a 29-table Oracle schema, AI anomaly detection, and multi-currency subscription tracking.",
    blurbShort:
      "Intelligent digital expense governance platform with Oracle 21c and AI anomaly detection.",
    lead: "An intelligent digital expense governance and financial behavior analytics platform. AURIXA helps users track subscriptions across currencies and billing cycles, catches unusual spending with AI, and is backed by a fully normalized Oracle 21c relational database with materialized views, PL/SQL packages, and a FastAPI REST layer.",
    leadShort:
      "An intelligent expense governance platform tracking multi-currency subscriptions with AI-powered anomaly detection and a FastAPI / Oracle 21c backend.",
    problemTitle: "The Problem",
    problem:
      "Users subscribing to a growing number of digital services — streaming, SaaS tools, cloud storage, AI tools — lose track of what they collectively spend and when each renews. Existing personal finance tools are either too generic or too narrow, lacking subscription-specific intelligence like usage tracking, price-history, renewal forecasting, and behavioral anomaly detection. AURIXA closes that gap by combining rigorous relational database design with Oracle's enterprise features and a real machine learning engine.",
    problemShort:
      "AURIXA tracks scattered SaaS subscriptions, forecasts renewals, and uses scikit-learn anomaly detection to alert users to unusual spending, backed by normalized Oracle database schemas.",
    stats: [
      { value: "29", label: "DB Tables" },
      { value: "55+", label: "Indexes" },
      { value: "8", label: "API Routers" },
      { value: "4", label: "Currencies" },
    ],
    tags: ["Oracle 21c", "FastAPI", "scikit-learn"],
    features: [
      {
        title: "Subscription & Billing Tracking",
        body: "Full CRUD for subscriptions across 10 expense categories, with automated billing-cycle and price-history tracking via database triggers.",
      },
      {
        title: "AI Anomaly Detection — RiskRadar",
        body: "Every transaction is evaluated by a per-user Isolation Forest model to flag unusual spending, tuned to a 2% contamination rate to avoid false positives.",
      },
      {
        title: "AI Recommendations Engine",
        body: "Personalized suggestions to cancel unused subscriptions, consolidate redundant services, or downgrade billing plans — with accept/dismiss actions and feedback loop.",
      },
      {
        title: "Multi-Currency Support",
        body: "Tracks spending across PKR, USD, EUR, and GBP with automatic conversion to the user's base currency throughout all analytics and reporting.",
      },
      {
        title: "Analytics Dashboard",
        body: "Spending patterns, category breakdowns, trend analysis, budget forecasts, and a financial health score — served from pre-computed materialized views for performance.",
      },
      {
        title: "Full Audit Trail",
        body: "Every INSERT, UPDATE, and DELETE on critical tables is captured at the trigger level — independent of the application layer — for compliance and debugging.",
      },
    ],
    architectureTitle: "System Architecture",
    architecture: [
      {
        step: "01",
        title: "Oracle Database Layer",
        body: "29 fully normalized tables, 3 materialized views, 26 sequences, 5 triggers, and 55 indexes running on Oracle 21c XE. PL/SQL packages and Oracle Scheduler jobs handle business logic and periodic tasks entirely inside the database engine — keeping the application layer thin.",
      },
      {
        step: "02",
        title: "Python FastAPI Backend",
        body: "A modular REST API with 8 dedicated routers: auth, users, subscriptions, analytics, alerts, recommendations, wallet, and audit. Connects to Oracle via python-oracledb in thin mode — no Oracle Client installation required on the host machine.",
      },
      {
        step: "03",
        title: "Auth & Security Layer",
        body: "JWT bearer token authentication with 15-minute access tokens and 7-day refresh tokens, stored hashed at rest with bcrypt. All protected endpoints require a valid access token — only registration and login are public routes.",
      },
      {
        step: "04",
        title: "scikit-learn ML Engine",
        body: "The RiskRadar system trains a per-user Isolation Forest model on transaction history and evaluates every new transaction for anomalies at the time of insertion. Models are persisted and retrained on a rolling window to stay accurate as spending patterns evolve.",
      },
    ],
    stack: [
      "Oracle Database 21c XE",
      "PL/SQL & Triggers",
      "Python 3.11",
      "FastAPI",
      "python-oracledb",
      "scikit-learn",
      "Isolation Forest (ML)",
      "PyJWT & bcrypt",
      "Pydantic v2",
      "Uvicorn",
      "pytest",
    ],
    repo: "https://github.com/abdulwasay-77/Aurixa---Intelligent-Digital-Expense-Governance-System",
    ctaTitle: "Explore the Full Codebase",
    ctaBody:
      "The full source — schema DDL, PL/SQL packages, FastAPI routes, ML engine, and test suite — is available on GitHub.",
    hue: 205,
  },

  {
    slug: "asmvision",
    name: "ASMVision",
    title: "ASMVision — Interactive Assembly Language Visualizer",
    metaDescription:
      "ASMVision is an interactive MIPS Assembly execution visualizer with a real x86 NASM backend compiled to a DLL and called via Python ctypes. Built by Abdul Wasay.",
    kicker: "Assembly execution visualizer",
    blurb:
      "Interactive MIPS Assembly execution visualizer, powered by a real x86 NASM backend compiled to a DLL and called via Python ctypes.",
    blurbShort:
      "MIPS Assembly execution visualizer with x86 NASM backend DLL and PyQt5.",
    lead: "An interactive educational desktop app that loads MIPS Assembly files and visualizes their execution step by step — with every computation actually performed by a real x86 NASM Assembly backend compiled to a Windows DLL, not emulated in Python. A 5-layer architecture bridging high-level GUI all the way down to native machine instructions.",
    leadShort:
      "An interactive desktop app that loads MIPS Assembly files and visualizes step-by-step execution powered by a real x86 NASM backend.",
    problemTitle: "The Problem",
    problem:
      "Learning MIPS Assembly is difficult without visual feedback. Traditional tools like MARS and SPIM are functional but offer limited interactivity and no clear separation between what the processor is doing and how that maps to source code. Existing simulators also run entirely in software with no connection to real assembly computation. ASMVision addresses this with a genuine x86 Assembly backend — every arithmetic, logical, and branch operation executes inside a real NASM-compiled function, giving students an accurate view of what's actually happening at the processor level.",
    problemShort:
      "ASMVision provides a MIPS visualization GUI connected to a real x86 Assembly backend compiled to a Windows DLL. Every calculation runs native machine instructions, giving students authentic hardware-level feedback.",
    stats: [
      { value: "5", label: "Architecture Layers" },
      { value: "42", label: "ASM Functions" },
      { value: "32+", label: "MIPS Registers" },
      { value: "6", label: "Sample Programs" },
    ],
    tags: ["x86 NASM", "Python", "PyQt5"],
    features: [
      {
        title: "Real-Time Register & Memory View",
        body: "All 32 MIPS registers plus PC, HI, and LO are visualized live — with a gold flash animation on change — alongside a memory panel split into Data Segment and Stack views.",
      },
      {
        title: "Step & Auto-Run Execution",
        body: "Step through one instruction at a time with F10, or auto-run with an adjustable speed slider ranging from 1000ms down to 50ms per instruction step.",
      },
      {
        title: "Breakpoint System",
        body: "Click the gutter next to any line to toggle a breakpoint. Auto-run pauses automatically when execution reaches a marked line — just like a real debugger.",
      },
      {
        title: "Syntax Highlighting & Tooltips",
        body: "Full MIPS syntax coloring with hover tooltips on every supported opcode, explaining what the instruction does and how it affects registers — in plain English.",
      },
      {
        title: "Execution Statistics",
        body: "A breakdown of instructions executed by category — arithmetic, logical, branch, memory, jump, syscall — plus identification of the most-used register during the session.",
      },
      {
        title: "Six Built-In Sample Programs",
        body: "Factorial, Fibonacci, Array Sum, Bubble Sort, String Print, and Recursive Function — covering the full range of supported MIPS instructions ready to load and run immediately.",
      },
    ],
    architectureTitle: "System Architecture — 5 Layers",
    architecture: [
      {
        step: "01",
        badge: "Assembly Layer",
        title: "x86 NASM Backend — backend.asm",
        body: "x86-64 NASM Assembly compiled to a Windows DLL using the win64 calling convention. Exports 42 functions covering every arithmetic, logical, branch, and memory operation. This is what actually executes the computation — nothing is simulated in Python.",
      },
      {
        step: "02",
        badge: "FFI Bridge Layer",
        title: "Python–Assembly Bridge — bridge.py",
        body: "Loads backend.dll via ctypes.CDLL, declaring argument types and return types for every exported function so the rest of the codebase never touches ctypes directly. Acts as a typed interface contract between Python and native code.",
      },
      {
        step: "03",
        badge: "Parser Layer",
        title: "MIPS Parser — parser.py",
        body: "Two-pass parser: the first pass collects all labels and their line positions; the second pass tokenizes every instruction and builds the data segment from .data directives. Outputs a structured instruction list ready for the execution controller.",
      },
      {
        step: "04",
        badge: "Execution Layer",
        title: "Execution Controller — executor.py",
        body: "Maintains the complete register file (all 32 MIPS registers + PC, HI, LO), the memory model, and the breakpoint set. Dispatches each instruction to the Assembly backend via a six-hook callback system. Has zero UI dependency — fully testable standalone.",
      },
      {
        step: "05",
        badge: "GUI Layer",
        title: "PyQt5 Desktop Frontend",
        body: "A dark-themed glassmorphism GUI built across six Qt modules: splash screen, main window, code panel (with syntax highlighter and gutter), register panel, memory panel, and console panel. The UI only reads from the executor — never drives computation directly.",
      },
    ],
    stack: [
      "NASM 3.01 (x86-64)",
      "GCC via MSYS2",
      "Windows DLL (win64 ABI)",
      "Python 3.x",
      "ctypes FFI",
      "PyQt5",
      "QPainter",
      "QSyntaxHighlighter",
    ],
    repo: "https://github.com/abdulwasay-77/ASMVision-Assembly-Language-Project",
    ctaTitle: "Explore the Full Source on GitHub",
    ctaBody:
      "The full codebase — NASM assembly source, bridge layer, parser, executor, PyQt5 GUI, and all six sample programs — is available on GitHub.",
    hue: 168,
  },

  {
    slug: "diagnosight",
    name: "DiagnoSight AI",
    title: "DiagnoSight AI — Medical Diagnostic Assistant",
    metaDescription:
      "DiagnoSight AI is an AI-powered medical diagnostic assistant that analyzes X-rays, MRIs, and CT scans using TensorFlow deep learning, with PDF report generation and a support chatbot. Built by Abdul Wasay.",
    kicker: "Deep-learning diagnostics",
    blurb:
      "AI-powered medical diagnostic assistant that analyzes medical images and symptoms using deep learning, with report generation and a support chatbot.",
    blurbShort:
      "AI medical diagnostic assistant using deep learning for image analysis.",
    lead: "An AI application that helps analyze medical images and symptoms using deep learning with TensorFlow, giving users a quick first opinion across 15+ condition categories — along with a downloadable PDF report, a support chatbot for follow-up questions, and doctor recommendations so users know exactly where to go next.",
    leadShort:
      "An AI medical assistant using deep learning (TensorFlow) to analyze medical images, generate diagnostic PDF reports, and answer queries via a chatbot.",
    problemTitle: "The Problem",
    disclaimer:
      "DiagnoSight AI is an academic research project built to explore AI in healthcare. It is not a certified medical device and should not replace professional clinical diagnosis. Results are intended as educational demonstrations of deep learning applied to medical imaging.",
    problem:
      "Long wait times for diagnoses, human error in medical image interpretation, specialist shortages in underserved areas, and inconsistent diagnostic quality all slow down access to care. DiagnoSight AI provides instant analysis of X-rays, MRIs, and CT scans — cross-referencing images with reported symptoms to give evidence-based support for a first clinical opinion, and routing users to the right specialist when they need professional care.",
    problemShort:
      "DiagnoSight AI speeds up image interpretation by providing instant CNN analysis of medical scans, cross-referencing findings with patient symptoms to output a first clinical opinion and specialist suggestions.",
    stats: [
      { value: "15+", label: "Condition Categories" },
      { value: "3", label: "Image Types" },
      { value: "4", label: "Core Modules" },
      { value: "PDF", label: "Report Generation" },
    ],
    tags: ["TensorFlow", "Deep Learning", "Python"],
    features: [
      {
        title: "Instant Medical Image Analysis",
        body: "Processes X-rays, MRIs, and CT scans in seconds using a deep learning CNN model built with TensorFlow — returning a confidence-scored prediction across trained condition categories.",
      },
      {
        title: "Diagnosis Tab — 15+ Conditions",
        body: "Identifies conditions across 15+ medical categories, providing a quick first opinion on likely diagnosis with probability breakdown and plain-language explanation of findings.",
      },
      {
        title: "AI Support Chatbot",
        body: "An in-app conversational chatbot that answers users' follow-up questions about their diagnosis results in plain language — reducing anxiety and helping users understand next steps.",
      },
      {
        title: "PDF Report Generation",
        body: "Generates a downloadable, formatted PDF report summarizing the diagnosis, confidence scores, image metadata, and recommended actions — for the user to keep or share with a doctor.",
      },
      {
        title: "Doctor & Specialist Recommendations",
        body: "Based on the diagnosed condition, recommends relevant specialist types and helps users locate nearby doctors — ensuring users know exactly where to go for professional care.",
      },
      {
        title: "Full Account System & History",
        body: "Complete user authentication, profile editing, password management, and a full saved report history — so users can revisit, compare, or share previous diagnostic sessions.",
      },
    ],
    architectureTitle: "System Architecture",
    architecture: [
      {
        step: "01",
        badge: "AI Core",
        title: "Deep Learning Model — TensorFlow CNN",
        body: "A Convolutional Neural Network trained on labeled medical imaging datasets to classify conditions across 15+ categories. The model is loaded once at startup and performs inference on preprocessed image tensors — returning a probability distribution across all trained classes.",
      },
      {
        step: "02",
        badge: "Analysis Pipeline",
        title: "Image Preprocessing & Inference Engine",
        body: "Accepts JPEG/PNG uploads of X-rays, MRIs, and CT scans. Applies normalization, resizing, and tensor conversion before passing to the CNN. Combines image predictions with symptom inputs to generate a cross-referenced diagnostic result with confidence scores.",
      },
      {
        step: "03",
        badge: "Report & Chat Layer",
        title: "PDF Generator & NLP Chatbot",
        body: "The report generator formats diagnostic results, metadata, and recommended actions into a structured PDF. The chatbot module uses NLP to interpret follow-up questions in natural language and return contextual responses about the diagnosis — keeping users informed without overwhelming them with technical output.",
      },
      {
        step: "04",
        badge: "User Layer",
        title: "Account System & Report History",
        body: "Full authentication — registration, login, profile editing, password change. Each user has a persistent diagnostic history stored in the database, with the ability to view, re-download, or delete past reports. Doctor recommendations are surfaced based on diagnosed condition type and location input.",
      },
    ],
    stack: [
      "Python",
      "TensorFlow 2.x",
      "Keras",
      "Convolutional Neural Network",
      "NumPy & Pillow",
      "NLP Chatbot",
      "PDF Generation (ReportLab)",
      "User Auth & Database",
    ],
    repo: "https://github.com/abdulwasay-77/DiagnoSightAI-Artifical-Intelligence-Project",
    ctaTitle: "Explore the Full Codebase on GitHub",
    ctaBody:
      "The full source — TensorFlow model, inference pipeline, chatbot, PDF generator, auth system, and UI — is available on GitHub.",
    hue: 230,
  },
];

export const projectsIntro =
  "A collection of work spanning secure application architecture, enterprise database systems, low-level visualizers, and deep learning.";

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const projectSlugs = projects.map((p) => p.slug);
