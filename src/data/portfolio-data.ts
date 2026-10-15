import type { LucideIcon } from "lucide-react";
import { Atom, Cloud, Code, Database, Globe, Palette, PenTool, Smartphone } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Identity                                                            */
/* ------------------------------------------------------------------ */

export const profile = {
  name: "Adedara Samuel",
  shortName: "Adedara S.P",
  brand: "SAPOK",
  role: "Software Engineer & UI/UX Designer",
  location: "Lagos, Nigeria",
  timezone: "Africa/Lagos",
  email: "adedarasapok@gmail.com",
  phone: "+234 813 501 3995",
  phoneHref: "tel:+2348135013995",
  // Second line for calls
  phone2: "+234 724 099 7853",
  phone2Href: "tel:+2347240997853",
  // WhatsApp chat opens with a pre-filled greeting the visitor can edit before sending
  whatsapp: "+234 813 501 3995",
  whatsappHref: `https://wa.me/2348135013995?text=${encodeURIComponent("Hi Samuel, I found your portfolio and I'd like to talk about a project.")}`,
  socials: {
    github: "https://github.com/Adedara-samuel",
    linkedin: "https://linkedin.com/in/adedara-samuel",
    twitter: "https://twitter.com/AdedaraSP",
    pinterest: "https://www.pinterest.com/adedarapsalmuel/",
  },
};

// Career started January 2021 (first freelance role in cvExperience).
export const careerStartYear = 2021;

export function getExperienceYears(year = new Date().getFullYear()) {
  return Math.max(year - careerStartYear, 1);
}

/* ------------------------------------------------------------------ */
/* Skills                                                              */
/* ------------------------------------------------------------------ */

export interface Skill {
  name: string;
  icon: LucideIcon;
  color: string;
}

export const skills: Skill[] = [
  { name: "JavaScript / TypeScript", icon: Code, color: "text-yellow-500" },
  { name: "React / Next.js", icon: Globe, color: "text-blue-500" },
  { name: "React Native / Expo", icon: Atom, color: "text-[#61DAFB]" },
  { name: "Node.js / NestJS", icon: Database, color: "text-green-500" },
  { name: "Python / FastAPI", icon: Code, color: "text-green-600" },
  { name: "MongoDB", icon: Database, color: "text-emerald-500" },
  { name: "PostgreSQL / Prisma", icon: Database, color: "text-cyan-600" },
  { name: "UI/UX Design", icon: Palette, color: "text-pink-500" },
  { name: "Graphics Design", icon: PenTool, color: "text-cyan-500" },
  { name: "Mobile Apps", icon: Smartphone, color: "text-purple-500" },
  { name: "Cloud & DevOps", icon: Cloud, color: "text-orange-500" },
];

export const stackGroups = [
  { label: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "TanStack Query", "Framer Motion", "shadcn/ui"] },
  { label: "Backend", items: ["Node.js", "NestJS", "Express", "FastAPI", "Socket.IO", "REST APIs", "BullMQ"] },
  { label: "Data", items: ["PostgreSQL", "Prisma", "MongoDB", "Redis", "pgvector", "MSSQL", "Firebase"] },
  { label: "Apps & Ops", items: ["React Native / Expo", "Tauri", "Docker", "Vercel", "Playwright", "Vitest"] },
  { label: "Design", items: ["Figma", "Adobe XD", "Photoshop", "Illustrator", "Premiere"] },
];

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

export const services = [
  {
    title: "Product Engineering",
    body: "Full-stack web platforms from schema to pixel — multi-tenant SaaS, dashboards, and internal tools that teams rely on daily.",
    tags: ["Next.js", "NestJS", "PostgreSQL"],
  },
  {
    title: "Healthcare & Enterprise Systems",
    body: "Clinical, records and document systems with role-based access, audit trails and workflows built around how staff actually work.",
    tags: ["RBAC", "Audit logs", "On-prem"],
  },
  {
    title: "Fintech & Payments",
    body: "Wallets, ledgers, payouts and payment integrations with the boring-but-critical parts done right: idempotency, reconciliation, webhooks.",
    tags: ["Ledgers", "Paystack", "Webhooks"],
  },
  {
    title: "Mobile & Desktop Apps",
    body: "Cross-platform apps with React Native/Expo and Tauri that share types, validation and logic with the web.",
    tags: ["Expo", "Tauri", "Monorepos"],
  },
  {
    title: "UI/UX & Brand Design",
    body: "Interfaces, design systems, logos and marketing visuals — designed with the build in mind, so nothing gets lost in hand-off.",
    tags: ["Figma", "Design systems", "Branding"],
  },
  {
    title: "AI Integration",
    body: "Retrieval, embeddings and AI assistants wired into existing products — permission-aware, so AI never sees what a user can't.",
    tags: ["FastAPI", "Embeddings", "RAG"],
  },
];

/* ------------------------------------------------------------------ */
/* Experience                                                          */
/* ------------------------------------------------------------------ */

export interface CVExperience {
  title: string;
  period: string;
  company: string;
  highlights: string[];
}

export const cvExperience: CVExperience[] = [
  {
    title: "Software Engineer & Application Support Officer",
    period: "Feb 2025 - Present",
    company: "Redeemer's Health Village (RHV)",
    highlights: [
      "Built RHV IVF, a full IVF clinic management system covering front desk, counselling, donors, surrogates, embryology, pharmacy, billing and reporting.",
      "Built RHV SafeTrack, an incident-reporting and patient-safety platform with review, escalation, RCA, CAPA and a complete audit trail.",
      "Delivered the enterprise Document Management System (Next.js frontend, Express/MongoDB backend, desktop scanner agent and file watcher).",
      "Built BulkMail, a Windows desktop app for email campaigns, internal mail and PDF certificates from Excel.",
      "Provide technical support for application deployment, troubleshooting, data security and system reliability.",
    ],
  },
  {
    title: "Founder & Lead Engineer",
    period: "2025 - Present",
    company: "SAPOK TECH",
    highlights: [
      "Architecting Sapok OneGrid (formerly Nexora), a multi-tenant organisational management platform with a Next.js control center, a Tauri desktop app and a NestJS core API.",
      "Building SAPOK Pay, a self-service wallet, ledger and payout platform with merchant API keys.",
      "Building SAPOK AI, a permission-aware AI and knowledge-retrieval service on FastAPI with local embeddings.",
    ],
  },
  {
    title: "Web Application Developer Intern",
    period: "Feb 2024 - Jan 2025",
    company: "Momas Electricity Meter Manufacturing Company (MEMMCOL), R&D Software Department",
    highlights: [
      "Developed an enterprise eCommerce platform and the GridFlex application in Next.js, integrating four distinct systems into one product.",
      "Contributed to the Smart Breaker module for intelligent energy monitoring and control.",
      "Supported the Staff Management Record System and the Vendor Wallet Application.",
      "Assisted with schema organisation, data validation and reliable storage practices; worked in Agile sprints on UI logic and REST endpoints.",
    ],
  },
  {
    title: "Freelance Frontend Developer & UI Designer",
    period: "Jan 2021 - Present",
    company: "Remote",
    highlights: [
      "Delivered full-stack and UI/UX projects for client dashboards, educational portals, real estate and retail brands.",
      "Integrated third-party APIs and managed app state with Redux, Context API and TanStack Query.",
      "Designed wireframes and mockups in Figma and Adobe XD.",
    ],
  },
  {
    title: "Freelance Graphic Designer & Cinematographer",
    period: "Jan 2021 - Present",
    company: "Remote",
    highlights: [
      "Produced motion graphics, marketing visuals and cinematographic content for fashion and tech clients.",
      "Managed brand identities and social media kits in Illustrator and Photoshop; edited reels in Premiere and CapCut.",
    ],
  },
];

export const cvSkillGroups = [
  { title: "Programming Languages", items: ["TypeScript", "JavaScript (ES6+)", "Python", "Java", "SQL", "HTML5 / CSS3"] },
  { title: "Frontend & Mobile", items: ["Next.js", "React", "React Native / Expo", "Tauri", "Tailwind CSS", "TanStack Query", "JSF PrimeFaces"] },
  { title: "Backend & Data", items: ["Node.js", "NestJS", "Express", "FastAPI", "PostgreSQL / Prisma", "MongoDB", "Redis", "MSSQL", "Socket.IO"] },
  { title: "Tools & Design", items: ["Git / GitHub", "Docker", "Vercel", "Playwright / Vitest", "Figma", "Adobe Photoshop", "Adobe Illustrator", "Adobe XD"] },
];

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export type ProjectCategory = "Platforms" | "Healthcare" | "Web Apps" | "Websites" | "Design";

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  year: string;
  client?: string;
  summary: string;
  overview?: string;
  features?: string[];
  stack: string[];
  cover: string;
  gallery?: string[];
  live?: string;
  repo?: string;
  status?: string;
  featured?: boolean;
}

export const projectCategories: ("All" | ProjectCategory)[] = ["All", "Platforms", "Healthcare", "Web Apps", "Websites", "Design"];

export const projects: Project[] = [
  {
    slug: "onegrid",
    title: "Sapok OneGrid",
    category: "Platforms",
    year: "2026",
    client: "SAPOK TECH · formerly Nexora",
    summary: "Enterprise multi-tenant platform for running organisations — one core API behind a web control center and a desktop app.",
    overview:
      "OneGrid (formerly Nexora) is the master platform of the SAPOK ecosystem. Platform admins onboard organisations, manage subscriptions and modules in the Control Center; every organisation runs the same Tauri desktop app, where the signed-in session decides identity, enabled modules, roles and permissions.",
    features: [
      "Control Center web app for onboarding, subscriptions and module management",
      "Single Tauri desktop app for every tenant, scoped by session",
      "NestJS core API as the single source of truth, with Prisma and PostgreSQL",
      "Background payroll workers on BullMQ and Redis",
      "pgvector-ready data layer for the SAPOK AI intelligence phase",
    ],
    stack: ["NestJS", "Prisma", "PostgreSQL", "pgvector", "Redis", "BullMQ", "Next.js", "Tauri", "Turborepo", "Docker"],
    cover: "/work/covers/onegrid.jpg",
    gallery: ["/work/onegrid.png", "/images/nexora.png", "/images/pt2.1.png", "/images/pt2.2.png", "/images/pt2.3.png"],
    live: "https://sapok-control-center.vercel.app",
    repo: "https://github.com/Adedara-samuel/NEXORA",
    status: "In active development",
    featured: true,
  },
  {
    slug: "rhv-ivf",
    title: "RHV IVF",
    category: "Healthcare",
    year: "2026",
    client: "Redeemer's Health Village",
    summary: "IVF clinic management — from front-desk check-in to embryology, pharmacy and billing, with live role-based permissions.",
    overview:
      "A complete IVF clinic system built around real clinic flow. Every patient file carries PRN, IVF number, partner, payer and outstanding balance; cycles move through stimulation, trigger, culture, transfer and outcome, and dashboards track pregnancy and live-birth rates.",
    features: [
      "Front office: waiting list, registration and patient files with Ctrl+K search",
      "Programmes for counselling, donors and surrogates",
      "Embryology lab, pharmacy and billing with HMO claims",
      "Live roles & permissions matrix — revoke a permission and the menu disappears instantly",
      "Two-step verification for clinical and finance roles",
    ],
    stack: ["Next.js 16", "TypeScript", "Tailwind v4", "shadcn/ui", "Zustand", "TanStack Table", "Vitest", "Playwright"],
    cover: "/work/covers/ivf.jpg",
    gallery: ["/work/ivf-dashboard.png", "/work/ivf-patients.png", "/work/ivf-billing.png"],
    repo: "https://github.com/Adedara-samuel/sapok-ivf",
    featured: true,
  },
  {
    slug: "sapok-pay",
    title: "SAPOK Pay",
    category: "Platforms",
    year: "2026",
    client: "SAPOK TECH",
    summary: "Wallet, ledger, bank-connection and payout infrastructure — a self-service, Paystack-style platform for businesses.",
    overview:
      "Any business can sign up, get a merchant account and wallet immediately, and issue its own API keys to move money from its own apps. A separate operator role sees the whole platform. Built to plug into OneGrid for payroll payouts.",
    features: [
      "Self-service merchant signup with an instant wallet",
      "Merchant-issued API keys, separate from dashboard sessions",
      "Double-entry style ledger and payroll payout flows",
      "Operator console with platform-wide visibility",
      "Rate limiting, Helmet hardening and Swagger-documented API",
    ],
    stack: ["NestJS", "Prisma", "PostgreSQL", "Redis", "Zod", "Swagger", "Next.js", "TanStack Query", "Zustand"],
    cover: "/work/sapok-pay.png",
    repo: "https://github.com/Adedara-samuel/Sapok-Pay",
    status: "In active development",
    featured: true,
  },
  {
    slug: "sapok-ai",
    title: "SAPOK AI",
    category: "Platforms",
    year: "2026",
    client: "SAPOK TECH",
    summary: "Permission-aware AI assistance and knowledge retrieval, offered as a developer platform with its own API keys.",
    overview:
      "SAPOK AI brings organisational intelligence to the ecosystem with one non-negotiable rule: AI never bypasses RBAC. If a user can't view payroll, the assistant can't retrieve it for them. Embeddings run locally with a lightweight ONNX runtime instead of a full PyTorch stack.",
    features: [
      "Developer signup and API keys, with a separate operator role",
      "Local embeddings (bge-small via fastembed / ONNX Runtime)",
      "Permission-checked retrieval and tool execution",
      "Async FastAPI service on PostgreSQL and Redis",
    ],
    stack: ["FastAPI", "Python", "Pydantic", "PostgreSQL", "asyncpg", "Redis", "fastembed", "Next.js"],
    cover: "/work/sapok-ai.png",
    status: "In active development",
  },
  {
    slug: "safetrack",
    title: "RHV SafeTrack",
    category: "Healthcare",
    year: "2026",
    client: "Redeemer's Health Village",
    summary: "Hospital incident reporting and patient safety — every report carried from intake to closure with a full audit trail.",
    overview:
      "Staff and the public can report incidents; SafeTrack carries each one through classification, review, escalation, investigation, root cause analysis, corrective and preventive actions, and closure. Designed to run entirely inside the hospital network — no cloud database, no external auth provider.",
    features: [
      "Public and staff incident intake",
      "Review, escalation and investigation workflows",
      "Root cause analysis (RCA) and CAPA tracking",
      "Org-wide analytics with role-scoped visibility",
      "Complete audit trail and on-prem backups",
    ],
    stack: ["Next.js", "TypeScript", "TanStack Query", "TanStack Table", "Express", "MongoDB", "Docker"],
    cover: "/work/covers/safetrack.jpg",
    gallery: ["/work/safetrack-dashboard.png", "/work/brand/safetrack-logo.png"],
    status: "Private · internal system",
    featured: true,
  },
  {
    slug: "dms",
    title: "Enterprise DMS",
    category: "Healthcare",
    year: "2025",
    client: "Redeemer's Health Village",
    summary: "Document management with versioning, permission-based sharing, a recycle bin and a desktop scanner agent.",
    overview:
      "A secure, role-based document platform for Admin, HOD and staff users. Files have a full lifecycle — upload, share, version, soft-delete to a recycle bin with a 30-day retention policy — and a desktop scanner agent plus file watcher feed documents straight in.",
    features: [
      "Multi-role access control (Admin, HOD, User)",
      "Version history with rollback",
      "Permission-based sharing and real-time notifications",
      "Recycle bin with 30-day retention",
      "Audit logging, analytics and a desktop scanner agent",
    ],
    stack: ["Next.js 16", "React 19", "TanStack Query", "shadcn/ui", "Express", "MongoDB", "Socket.IO", "JWT", "Swagger"],
    cover: "/work/covers/dms.jpg",
    gallery: ["/images/portfolio1.png", "/images/p1.png", "/images/p2.png", "/images/p3.png"],
    repo: "https://github.com/RHV-IT/Document-management-frontend",
  },
  {
    slug: "church-homecells",
    title: "Homecell MS",
    category: "Web Apps",
    year: "2026",
    summary: "Church homecell management across Church → Zone → Area → Homecell → Members, with finances, payments and SMS.",
    overview:
      "Built against a formal SRS, with every business rule enforced on the server. Coordinators see only their own scope; finances run on a proper ledger with payments, webhooks and reconciliation, and scheduled jobs handle reminders, celebrations and reports.",
    features: [
      "Hierarchy enforcement for zones, areas and homecells",
      "Members, attendance, transfers and celebrations",
      "Financial ledger with payments, webhooks and reconciliation",
      "Role- and scope-based authorisation",
      "SMS, scheduled jobs and exportable reports (PDF, Excel)",
    ],
    stack: ["Next.js", "TanStack Query", "Express", "MongoDB", "Zod", "Argon2", "node-cron", "Recharts"],
    cover: "/work/covers/church.jpg",
    gallery: ["/work/church-homecells.png"],
    live: "https://church-homecells-system-frontend.vercel.app",
    repo: "https://github.com/Adedara-samuel/church-homecells-system",
  },
  {
    slug: "withu",
    title: "WITHU",
    category: "Web Apps",
    year: "2026",
    summary: "A private space for two people who are apart — chat, games, watch-together and a shared memory book, on web and mobile.",
    overview:
      "A full-stack monorepo: one Express + Socket.IO + MongoDB backend, a Next.js web app and an Expo React Native app, sharing types, Zod validation and a pluggable game engine.",
    features: [
      "Realtime chat and affection gestures over Socket.IO",
      "Games together — tic-tac-toe, connect four, memory match and more",
      "Watch and listen together, plus a shared memory book",
      "Web and native mobile apps sharing one codebase of logic",
    ],
    stack: ["Next.js", "Expo / React Native", "Express", "Socket.IO", "MongoDB", "Zod", "pnpm monorepo"],
    cover: "/work/covers/withu.jpg",
    gallery: ["/work/withu.png", "/work/brand/withu-logo.png"],
    live: "https://withu-web-seven.vercel.app",
    repo: "https://github.com/Adedara-samuel/WITHU",
  },
  {
    slug: "bulkmail",
    title: "BulkMail",
    category: "Web Apps",
    year: "2026",
    client: "Redeemer's Health Village · Desktop app",
    summary: "Windows desktop app for email campaigns and internal mail — personalised bulk sends and PDF certificates from Excel, all on-device.",
    overview:
      "BulkMail runs entirely on the user's own machine: nothing is uploaded anywhere. Teams pick a sender account and template, load a spreadsheet, preview exactly what each recipient will get, then send now or schedule — and the app keeps running in the system tray so scheduled campaigns still go out with the window closed.",
    features: [
      "Dashboard with sends today, this week and all-time, failures and a 7-day chart",
      "Internal mail alongside outbound campaigns",
      "Guided send flow with a recipient preview before anything goes out",
      "Per-recipient PDF attachments matched from a folder",
      "Reusable templates and scheduled sends",
      "Dashboard, history and failure drill-down",
      "Single .exe install with tray mode for scheduled campaigns",
    ],
    stack: ["Python", "pywebview", "Next.js", "openpyxl", "Recharts", "PyInstaller"],
    cover: "/work/covers/mass-email.jpg",
    repo: "https://github.com/RHV-IT/Mass-email-sender",
  },
  {
    slug: "epilux",
    title: "Epilux",
    category: "Web Apps",
    year: "2025",
    summary: "E-commerce for a pure-water manufacturer — catalogue, cart, orders and a customer wallet with Paystack payments.",
    features: [
      "Product catalogue, cart and order management",
      "Integrated wallet for customer credits and payments",
      "Paystack checkout and Google Maps delivery locations",
      "Admin analytics and inventory tracking",
    ],
    stack: ["Next.js", "TanStack Query", "Express", "MongoDB", "Paystack", "Google Maps"],
    cover: "/work/covers/epilux.jpg",
    repo: "https://github.com/Adedara-samuel/epilux",
  },
  {
    slug: "vibesphere",
    title: "VibeSphere",
    category: "Web Apps",
    year: "2025",
    summary: "A social platform with its own language — Pulses, Waves, Echoes and Tribes — with realtime chat and an AI helper.",
    features: [
      "TikTok-style Pulse stream with auto-play",
      "Trending Waves and Resonance reactions",
      "Realtime chat on Firebase",
      "Email/password and Google sign-in",
    ],
    stack: ["Next.js 15", "TypeScript", "Firebase", "Framer Motion"],
    cover: "/work/covers/vibesphere.jpg",
    repo: "https://github.com/Adedara-samuel/vibesphere",
  },
  {
    slug: "ruomax",
    title: "Ruomax Properties",
    category: "Websites",
    year: "2025",
    summary: "Real estate platform for house sales, rentals and property management.",
    stack: ["Next.js", "TypeScript", "Node.js", "Firebase"],
    cover: "/work/covers/ruomax.jpg",
    gallery: ["/work/ruomax.png", "/images/ruomax.png"],
    live: "https://ruomax.vercel.app",
    repo: "https://github.com/Adedara-samuel/Ruomax",
  },
  {
    slug: "e-commerce",
    title: "E-Commerce Platform",
    category: "Websites",
    year: "2025",
    summary: "A full-featured store with shopping cart, payment integration and an admin dashboard.",
    stack: ["Next.js", "TypeScript", "Node.js", "MongoDB", "Tailwind"],
    cover: "/work/covers/ecommerce.jpg",
    gallery: ["/work/ecommerce.png", "/images/portfolio5.png"],
    live: "https://e-commerce-aq2y.vercel.app",
    repo: "https://github.com/Adedara-samuel/e-commerce",
  },
  {
    slug: "academic",
    title: "Academic Management System",
    category: "Web Apps",
    year: "2025",
    summary: "Students write notes, save materials, schedule their days and get notified about deadlines.",
    stack: ["Next.js", "TypeScript", "Firebase", "Tailwind"],
    cover: "/work/covers/sas.jpg",
    gallery: ["/images/prt2.png", "/work/sas.png"],
    live: "https://sas-project-pi.vercel.app",
    repo: "https://github.com/Adedara-samuel/sas-project",
  },
  {
    slug: "adedoyin-portfolio",
    title: "Adebayo Favour — Portfolio",
    category: "Websites",
    year: "2025",
    client: "Client project",
    summary: "Personal brand site for a digital marketing strategist and content creator.",
    stack: ["HTML", "CSS", "JavaScript"],
    cover: "/work/covers/adedoyin.jpg",
    gallery: ["/work/adedoyin.png"],
    live: "https://adedoyin-portfolio.vercel.app",
    repo: "https://github.com/Adedara-samuel/toke-s-portfolio",
  },
  {
    slug: "real-estate",
    title: "Real Estate Website",
    category: "Websites",
    year: "2025",
    summary: "Property listing platform with advanced search, filtering and agent management.",
    stack: ["HTML", "CSS", "JavaScript"],
    cover: "/work/covers/real-estate.jpg",
    gallery: ["/work/real-estate.png", "/images/portfolio4.png"],
    live: "https://real-estate-gamma-coral.vercel.app",
    repo: "https://github.com/Adedara-samuel/Real-Estate",
  },
  {
    slug: "lugx-gaming",
    title: "Lugx Gaming Site",
    category: "Websites",
    year: "2025",
    summary: "Gaming storefront with interactive features and user engagement.",
    stack: ["HTML", "CSS", "JavaScript"],
    cover: "/work/covers/lugx.jpg",
    gallery: ["/work/lugx.png", "/images/portfolio2.png"],
    live: "https://lugx-gaming-site.vercel.app",
    repo: "https://github.com/Adedara-samuel/Lugx_gaming-site",
  },
  {
    slug: "e-library",
    title: "Ebook Web Application",
    category: "Web Apps",
    year: "2025",
    summary: "Ebook application for students to read and manage their digital books, with reading progress and accounts.",
    stack: ["HTML", "CSS", "JavaScript", "Node.js", "MSSQL"],
    cover: "/images/portfolio1.png",
    live: "https://e-library-system-six.vercel.app",
    repo: "https://github.com/Adedara-samuel/E-library-System",
  },
  {
    slug: "bss",
    title: "BSS Entertainment",
    category: "Web Apps",
    year: "2025",
    summary: "Entertainment industry platform with a voting system for audience engagement.",
    stack: ["Next.js", "TypeScript", "Firebase", "Tailwind"],
    cover: "/images/bss.png",
    repo: "https://github.com/Adedara-samuel/BSS",
  },
  {
    slug: "staff-management",
    title: "Staff Management Record System",
    category: "Web Apps",
    year: "2024",
    client: "MEMMCOL",
    summary: "Employee records, attendance and HR administration built with Java PrimeFaces and MSSQL during my MEMMCOL internship.",
    stack: ["Java PrimeFaces", "MSSQL"],
    cover: "/images/portfolio6.png",
    gallery: ["/images/p1.png", "/images/p2.png", "/images/p3.png", "/images/p4.png", "/images/p5.png", "/images/p6.png", "/images/ps.png", "/images/portfolio6.png"],
    repo: "https://github.com/Adedara-samuel/Staff-Management-Record",
  },
  {
    slug: "restaurant",
    title: "Restaurant Management",
    category: "Web Apps",
    year: "2026",
    summary: "Restaurant management with menu management, reservations and analytics.",
    stack: ["Next.js 16", "React 19", "TypeScript", "Supabase", "Tailwind CSS", "Framer Motion"],
    cover: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=750&fit=crop",
    repo: "https://github.com/Adedara-samuel/Resturant-Management",
  },
  {
    slug: "fitness",
    title: "Fitness Tracking App",
    category: "Web Apps",
    year: "2024",
    summary: "Mobile app for tracking workouts, nutrition and fitness goals, with social features.",
    stack: ["React Native", "Node.js", "PostgreSQL"],
    cover: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&h=750&fit=crop",
  },
  {
    slug: "portfolio-site",
    title: "Portfolio Website",
    category: "Design",
    year: "2024",
    summary: "Modern portfolio website with smooth animations and responsive design.",
    stack: ["Next.js", "TypeScript", "Tailwind", "EmailJS"],
    cover: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=750&fit=crop",
  },
  {
    slug: "graphics",
    title: "Graphics Design",
    category: "Design",
    year: "2021 – now",
    summary: "Logos, branding, visual identity, marketing visuals and social media kits.",
    stack: ["Photoshop", "Illustrator", "Figma", "Branding"],
    cover: "/images/portfolio3.png",
    live: "https://www.pinterest.com/adedarapsalmuel/",
  },
];

/* ------------------------------------------------------------------ */
/* CV projects (print layout)                                          */
/* ------------------------------------------------------------------ */

export interface CVProject {
  title: string;
  techStack: string;
  description: string;
  status?: string;
  link?: string;
}

export const cvProjects: CVProject[] = [
  {
    title: "Sapok OneGrid (formerly Nexora) — Multi-tenant Organisation Platform",
    techStack: "NestJS • Prisma • PostgreSQL • Redis • BullMQ • Next.js • Tauri",
    description: "Enterprise platform with a web control center for onboarding organisations, subscriptions and modules, and a single Tauri desktop app for every tenant — all on one NestJS core API with payroll workers.",
    status: "In development",
    link: "sapok-control-center.vercel.app",
  },
  {
    title: "RHV IVF — IVF Clinic Management System",
    techStack: "Next.js 16 • TypeScript • Tailwind • Zustand • TanStack Table • Vitest • Playwright",
    description: "Front office, counselling, donors, surrogates, embryology lab, pharmacy and billing with HMO claims; live role-and-permission matrix and two-step verification for clinical and finance roles.",
  },
  {
    title: "RHV SafeTrack — Incident Reporting & Patient Safety",
    techStack: "Next.js • TypeScript • Express • MongoDB • Docker",
    description: "Carries incidents through classification, review, escalation, investigation, RCA, CAPA and closure with a complete audit trail; runs entirely on the hospital's local network.",
  },
  {
    title: "Enterprise Document Management System",
    techStack: "Next.js 16 • React Query • Express • MongoDB • Socket.IO",
    description: "Role-based document platform with version history and rollback, permission-based sharing, recycle bin with 30-day retention, audit logs, and a desktop scanner agent.",
  },
  {
    title: "SAPOK Pay — Wallet, Ledger & Payout Platform",
    techStack: "NestJS • Prisma • PostgreSQL • Redis • Next.js",
    description: "Self-service merchant onboarding with instant wallets, merchant-issued API keys, ledger and payroll payout flows, and an operator console.",
    status: "In development",
  },
  {
    title: "SAPOK AI — Permission-aware AI & Knowledge Retrieval",
    techStack: "FastAPI • PostgreSQL • Redis • fastembed (ONNX)",
    description: "Developer platform with API keys; local embeddings and retrieval that strictly respect the caller's RBAC permissions.",
    status: "In development",
  },
  {
    title: "Church Homecell Management System",
    techStack: "Next.js • Express • MongoDB • Zod",
    description: "Hierarchy-scoped members, attendance, financial ledger with payments, webhooks and reconciliation, SMS and scheduled reports; every SRS business rule enforced server-side.",
    link: "church-homecells-system-frontend.vercel.app",
  },
  {
    title: "WITHU — Realtime App for Couples (Web + Mobile)",
    techStack: "Next.js • Expo • Express • Socket.IO • MongoDB",
    description: "Monorepo with shared types, validation and a game engine: realtime chat, games, watch-together and a shared memory book.",
    link: "withu-web-seven.vercel.app",
  },
  {
    title: "BulkMail — Campaigns & Internal Mail (Desktop)",
    techStack: "Python • pywebview • Next.js • PyInstaller",
    description: "On-device Windows app for personalised bulk campaigns, internal mail and per-recipient PDF certificates from Excel, with templates, scheduling, tray mode and send history.",
  },
  {
    title: "Epilux — E-commerce Platform",
    techStack: "Next.js • Node.js • MongoDB • Paystack",
    description: "E-commerce for a pure-water manufacturer: catalogue, cart, orders, customer wallet and Paystack payments.",
  },
  {
    title: "GridFlex & Smart Breaker (MEMMCOL)",
    techStack: "Next.js • Java • PostgreSQL",
    description: "Prepaid electricity management and payments with a DISCO dashboard, plus an IoT home-automation module for remote appliance control and power monitoring.",
  },
];
