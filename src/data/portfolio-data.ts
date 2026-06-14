import type { LucideIcon } from "lucide-react";
import {
  Atom,
  Cloud,
  Code,
  Database,
  Globe,
  Palette,
  PenTool,
  Smartphone,
} from "lucide-react";

export const experienceBaseYears = 5;
export const experienceStartYear = new Date().getFullYear() - experienceBaseYears;

export function getExperienceYears(year = new Date().getFullYear()) {
  return Math.max(year - experienceStartYear, experienceBaseYears);
}

export interface Skill {
  name: string;
  icon: LucideIcon;
  color: string;
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  highlights?: string[];
}

export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  tags: string[];
  link: string;
  github: string;
  gallery?: string[];
  overview?: string;
  technologies?: string[];
  features?: string[];
  status?: string;
  impact?: string;
  architecture?: string[];
  achievements?: string[];
}

export interface CVProject {
  title: string;
  techStack: string;
  description: string;
  status?: string;
  impact?: string;
}

export interface CVExperience {
  title: string;
  period: string;
  company: string;
  highlights: string[];
}

export const skills: Skill[] = [
  { name: "JavaScript/TypeScript", icon: Code, color: "text-yellow-500" },
  { name: "React/Next.js", icon: Globe, color: "text-blue-500" },
  { name: "Next.js", icon: Globe, color: "text-blue-600" },
  { name: "Python", icon: Code, color: "text-green-600" },
  { name: "Node.js", icon: Database, color: "text-green-500" },
  { name: "MongoDB", icon: Database, color: "text-emerald-500" },
  { name: "PostgreSQL", icon: Database, color: "text-cyan-600" },
  { name: "ReactNative", icon: Atom, color: "text-[#61DAFB]" },
  { name: "UI/UX Design", icon: Palette, color: "text-pink-500" },
  { name: "Graphics Designing", icon: PenTool, color: "text-cyan-500" },
  { name: "Mobile Apps", icon: Smartphone, color: "text-purple-500" },
  { name: "Cloud Services", icon: Cloud, color: "text-orange-500" },
];

export const experience: Experience[] = [
  {
    title: "Senior Software Developer",
    company: "Tech Solutions Inc.",
    period: "2023 - Present",
    description: "Leading development of enterprise web applications.",
  },
  {
    title: "Full Stack Developer",
    company: "Digital Agency",
    period: "2021 - 2023",
    description: "Built 50+ client websites and web applications.",
  },
  {
    title: "Web Application Developer Intern",
    company: "Momas Electricity Meter Manufacturing Company (MEMMCOL) — Research and Development Software Department",
    period: "Internship",
    description: "Contributed to R&D software products, internal tools, and data-driven workflows for manufacturing and energy operations.",
    highlights: [
      "Staff Management Record System: supported employee data workflows, access control, and record maintenance.",
      "Vendor Wallet Application: contributed to wallet tracking, transaction flows, and vendor-facing usability.",
      "Database Management: assisted with schema organization, data validation, and reliable storage patterns.",
      "Software Development Contributions: collaborated on frontend features, backend logic, testing, and deployment support.",
    ],
  },
];

export const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    category: "Web Development",
    image: "/images/portfolio5.png",
    description: "A full-featured e-commerce platform with shopping cart, payment integration, and admin dashboard.",
    tags: ["Next.js", "TypeScript", "Node.js", "MongoDB", "Tailwind"],
    link: "https://e-commerce-aq2y.vercel.app/",
    github: "https://github.com/Adedara-samuel/e-commerce",
  },
  {
    id: 2,
    title: "Real Estate Website",
    category: "Web Application",
    image: "/images/portfolio4.png",
    description: "Property listing platform with advanced search, filtering, and agent management system.",
    tags: ["HTML", "CSS", "JavaScript"],
    link: "https://real-estate-gamma-coral.vercel.app/",
    github: "https://github.com/Adedara-samuel/Real-Estate",
  },
  {
    id: 3,
    title: "Fitness Tracking App",
    category: "Mobile App",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=500&fit=crop",
    description: "Mobile application for tracking workouts, nutrition, and fitness goals with social features.",
    tags: ["React Native", "Node.js", "PostgreSQL"],
    link: "#",
    github: "https://github.com",
  },
  {
    id: 4,
    title: "Gaming Site",
    category: "Web Application",
    image: "/images/portfolio2.png",
    description: "Gaming platform with interactive features and user engagement.",
    tags: ["HTML", "CSS", "JavaScript"],
    link: "https://lugx-gaming-site.vercel.app/",
    github: "https://github.com/Adedara-samuel/Lugx_gaming-site",
  },
  {
    id: 8,
    title: "Restaurant Management",
    category: "Web Application",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=500&fit=crop",
    description: "Restaurant management system with menu management, reservations, and analytics.",
    tags: ["Next.js 16", "React 19", "TypeScript", "Supabase", "Tailwind CSS", "Framer Motion", "shadcn/ui"],
    link: "#",
    github: "https://github.com",
  },
  {
    id: 9,
    title: "Academic Management System",
    category: "Web Application",
    image: "/images/prt2.png",
    description: "Academic management system where students can write notes, save materials, schedule their days and get notified.",
    tags: ["Next.js", "TypeScript", "Firebase", "Tailwind"],
    link: "https://student-academic-system25.netlify.app/",
    github: "https://github.com/Adedara-samuel/sas-project",
  },
  {
    id: 5,
    title: "Graphics Design",
    category: "UI/UX & Graphics",
    image: "/images/portfolio3.png",
    description: "Creative graphics design work including logos, branding, and visual identity.",
    tags: ["Photoshop", "Illustrator", "Figma", "Branding"],
    link: "https://www.pinterest.com/adedarapsalmuel/",
    github: "https://github.com",
  },
  {
    id: 6,
    title: "Portfolio Website",
    category: "UI/UX & Graphics",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
    description: "Modern portfolio website with smooth animations and responsive design.",
    tags: ["Next.js", "TypeScript", "Tailwind", "EmailJS"],
    link: "#",
    github: "https://github.com",
  },
  {
    id: 10,
    title: "Ebook Web Application",
    category: "Web Application",
    image: "/images/portfolio1.png",
    description: "Ebook web application for students to read and manage their digital books.",
    tags: ["HTML", "CSS", "JavaScript", "Node.js", "MSSQL"],
    link: "https://e-library-system-six.vercel.app/",
    github: "https://github.com/Adedara-samuel/E-library-System",
  },
  {
    id: 11,
    title: "Ruomax Properties",
    category: "Web Application",
    image: "/images/ruomax.png",
    description: "Real estate platform for house sales, rentals, and property management.",
    tags: ["Next.js", "TypeScript", "Node.js", "Firebase"],
    link: "https://ruomax.vercel.app/",
    github: "https://github.com/Adedara-samuel/Ruomax",
  },
  {
    id: 7,
    title: "Staff Management Record System",
    category: "Web Application",
    image: "/images/portfolio6.png",
    description: "Staff management record system built with Java PrimeFace and MSSQL for efficient employee data management.",
    tags: ["Java PrimeFace", "MSSQL", "Backend"],
    link: "#",
    github: "https://github.com",
    gallery: [
      "/images/p1.png",
      "/images/p2.png",
      "/images/p3.png",
      "/images/p4.png",
      "/images/p5.png",
      "/images/p6.png",
      "/images/ps.png",
      "/images/portfolio6.png",
    ],
  },
  {
    id: 12,
    title: "BSS Entertainment",
    category: "Web Application",
    image: "/images/bss.png",
    description: "Entertainment industry platform with voting system for audience engagement.",
    tags: ["Next.js", "TypeScript", "Firebase", "Tailwind"],
    link: "https://bss-enertainment-industry.netlify.app/",
    github: "https://github.com/Adedara-samuel/BSS",
  },
  {
    id: 13,
    title: "DMS (Document Management System)",
    category: "Web Application",
    image: "/images/portfolio1.png",
    description: "Document management system for organizing, retrieving, and controlling business documents across teams.",
    tags: ["Next.js", "Python", "Node.js", "MongoDB", "PostgreSQL", "REST APIs"],
    link: "#",
    github: "#",
    gallery: ["/images/portfolio1.png", "/images/p1.png", "/images/p2.png", "/images/p3.png"],
    overview: "A secure document management platform designed to centralize document uploads, metadata, access control, search, version history, and administrative review workflows.",
    technologies: ["Next.js", "Python", "Node.js", "MongoDB", "PostgreSQL", "REST APIs"],
    features: [
      "Document upload, metadata tagging, and categorization",
      "Role-based access control and document permissions",
      "Search, filtering, and document retrieval workflows",
      "Audit trail for document activity and administrative review",
      "Dashboard for document governance and operational visibility",
    ],
    status: "Available on request",
    impact: "Improves document retrieval speed, reduces manual record handling, strengthens compliance, and gives teams a single source of truth for business documents.",
  },
  {
    id: 14,
    title: "Nexora",
    category: "Web Application",
    image: "/images/ruomax.png",
    description: "Modern web application focused on scalable architecture, responsive user experience, and reliable data-driven workflows.",
    tags: ["Next.js", "TypeScript", "Node.js", "Python", "PostgreSQL"],
    link: "#",
    github: "#",
    gallery: ["/images/ruomax.png", "/images/pt2.1.png", "/images/pt2.2.png", "/images/pt2.3.png"],
    overview: "Nexora is a scalable web application built to deliver a polished user experience with maintainable architecture and reliable business workflows.",
    technologies: ["Next.js", "TypeScript", "Node.js", "Python", "PostgreSQL"],
    features: [
      "Responsive user interface with consistent component patterns",
      "Authentication and protected application routes",
      "Dashboard and data management screens",
      "API-driven data workflows for business operations",
      "Performance-focused client experience and reusable UI modules",
    ],
    architecture: [
      "Component-based Next.js frontend with reusable UI modules",
      "API service layer for business logic and data validation",
      "Relational data model with PostgreSQL for structured records",
      "Environment-based configuration for secure deployment workflows",
    ],
    achievements: [
      "Improved consistency across user-facing workflows",
      "Reduced manual effort through structured data management",
      "Delivered a maintainable foundation for future product modules",
    ],
    impact: "Provides a professional, scalable application foundation for business operations and future feature expansion.",
  },
];

export const cvSkillGroups = [
  {
    title: "Programming Languages",
    items: ["Python", "Java", "JavaScript (ES6+)", "TypeScript", "HTML5 / CSS3", "SQL"],
  },
  {
    title: "Frontend Frameworks",
    items: ["Next.js", "React", "Redux / Context API", "Tailwind CSS", "JSF PrimeFaces"],
  },
  {
    title: "Backend & Databases",
    items: ["Node.js", "Python", "MongoDB", "PostgreSQL", "MSSQL", "RESTful APIs"],
  },
  {
    title: "Tools & Technologies",
    items: ["Git / GitHub", "Figma", "Adobe Photoshop", "Adobe Illustrator", "Adobe XD"],
  },
];

export const cvExperience: CVExperience[] = [
  {
    title: "Software Engineer & Application Support Officer",
    period: "Feb 2025 - Present",
    company: "Redeemers Health Village",
    highlights: [
      "Developing and maintaining hospital management software and health information systems.",
      "Providing technical support for application deployment and troubleshooting.",
      "Collaborating with healthcare teams to optimize workflow processes through technology.",
      "Ensuring system reliability, data security, and seamless integration of medical applications.",
    ],
  },
  {
    title: "Web Application Developer Intern",
    period: "Feb 2024 - Jan 2025",
    company: "Momas Electricity Meter Manufacturing Company (MEMMCOL), Research and Development Software Department",
    highlights: [
      "Developed an enterprise eCommerce platform and GridFlex Application using Next.js, integrating four distinct systems into one user-centric product.",
      "Contributed to Smart Breaker Module design for intelligent energy monitoring and control.",
      "Supported Staff Management Record System workflows for employee records, access control, and reporting.",
      "Contributed to Vendor Wallet Application features for wallet tracking, transaction records, and vendor-facing operations.",
      "Assisted with database management, schema organization, data validation, and reliable storage practices.",
      "Made software development contributions across frontend features, backend logic, testing, version control, and deployment support.",
      "Worked in Agile sprints to implement UI logic, REST API endpoints, and frontend optimizations.",
      "Built reusable components, applied session and cookie management, and versioned deliverables using Git.",
    ],
  },
  {
    title: "Freelance Frontend Developer & UI Designer",
    period: "Jan 2021 - Present",
    company: "Remote",
    highlights: [
      "Delivered full-stack UI/UX projects using HTML, CSS, JavaScript, and Next.js.",
      "Developed responsive interfaces for client dashboards, educational portals, and retail brands.",
      "Integrated third-party APIs, managed app state with Redux and Context API.",
      "Designed wireframes and mockups using Figma and Adobe XD.",
    ],
  },
  {
    title: "Freelance Graphic Designer & Cinematographer",
    period: "Jan 2021 - Present",
    company: "Remote",
    highlights: [
      "Produced motion graphics, marketing visuals, and cinematographic content for fashion and tech clients.",
      "Managed brand identities and created social media kits using Illustrator and Photoshop.",
      "Edited promotional videos, reels, and product highlights with CapCut and Adobe Premiere.",
    ],
  },
];

export const cvProjects: CVProject[] = [
  {
    title: "Epilux - E-commerce Platform",
    techStack: "Next.js • Node.js • MongoDB",
    description: "Developed a comprehensive e-commerce application for a pure water manufacturing company featuring product catalog, shopping cart, order management, and integrated wallet system for customer credits and payments. Implemented secure payment processing and real-time inventory tracking.",
  },
  {
    title: "GridFlex - Electricity Management System",
    techStack: "Next.js • Java • PostgreSQL",
    description: "Built a platform enabling users to manage their electricity consumption and make payments for prepaid meters. Provided distribution companies (DISCOS) with a dashboard to manage electricity distribution, monitor usage patterns, and handle customer accounts efficiently.",
  },
  {
    title: "Smart Breaker - IoT Home Automation",
    techStack: "Next.js • Java • PostgreSQL",
    description: "Developed an IoT-powered home automation system allowing users to remotely control electrical appliances from anywhere. Features include turning devices on/off, adjusting current levels, scheduling operations, and monitoring real-time power consumption through a mobile-friendly interface.",
  },
  {
    title: "E-Book Web Application",
    techStack: "HTML • CSS • JavaScript • Node.js • MSSQL",
    description: "Ebook web application for students to read and manage their digital books. Features include book library management, reading progress tracking, user authentication, and responsive design for seamless reading experience across devices.",
  },
  {
    title: "Academic Management System",
    techStack: "Next.js • TypeScript • Firebase • Tailwind",
    description: "Academic management system where students can write notes, save materials, schedule their days and get notified. Includes task management, calendar integration, and real-time notifications for assignments and deadlines.",
  },
  {
    title: "Staff Management Record System",
    techStack: "Java PrimeFace • MSSQL • Backend",
    description: "Staff management record system built with Java PrimeFace and MSSQL for efficient employee data management. Features employee profiles, attendance tracking, performance records, and administrative dashboard for HR operations.",
  },
  {
    title: "DMS (Document Management System)",
    techStack: "Next.js • Python • Node.js • MongoDB • PostgreSQL",
    description: "Document management system for organizing, retrieving, and controlling business documents across teams. Supports uploads, metadata, search, permissions, audit trails, and administrative governance workflows.",
    status: "Available on request",
    impact: "Improves retrieval speed, reduces manual handling, and strengthens document compliance.",
  },
  {
    title: "Nexora",
    techStack: "Next.js • TypeScript • Node.js • Python • PostgreSQL",
    description: "Modern web application focused on scalable architecture, responsive user experience, and reliable data-driven workflows. Includes component-based frontend modules, API-driven workflows, authentication, dashboards, and maintainable data structures.",
    status: "Available on request",
    impact: "Provides a scalable foundation for business operations and future feature expansion.",
  },
];
