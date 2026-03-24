"use client";

import { Inter } from "next/font/google";
import "./cv.css";

const inter = Inter({ subsets: ["latin"] });

export default function CVPage() {
  return (
    <div className="cv-container">
      <div className="cv-content">
        {/* Header */}
        <header className="cv-header">
          <div className="header-content">
            <h1>Adedara Samuel (S.P)</h1>
            <p className="title">Software Developer & UI/UX Designer</p>
            <div className="contact-info">
              <span>adedarasapok@gmail.com</span>
              <span className="separator">|</span>
              <span>+234 812 345 6789</span>
              <span className="separator">|</span>
              <span>Lagos, Nigeria</span>
            </div>
            <div className="social-links">
              <a href="https://github.com/Adedara-samuel" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://linkedin.com/in/adedara-samuel" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://twitter.com/AdedaraSP" target="_blank" rel="noopener noreferrer">Twitter</a>
            </div>
          </div>
        </header>

        {/* Summary */}
        <section className="cv-section">
          <h2>Professional Summary</h2>
          <p>
            Results-driven Software Developer with 3+ years of experience in building scalable web applications
            and digital solutions. Specialized in full-stack development using Next.js, React, Node.js, and
            cloud technologies. Proven track record of delivering high-quality projects across various industries
            including healthcare, e-commerce, energy management, and IoT solutions. Strong focus on UI/UX design
            and creating exceptional user experiences.
          </p>
        </section>

        {/* Skills */}
        <section className="cv-section">
          <h2>Technical Skills</h2>
          <div className="skills-grid">
            <div className="skill-category">
              <h3>Programming Languages</h3>
              <ul>
                <li>Java</li>
                <li>JavaScript (ES6+)</li>
                <li>TypeScript</li>
                <li>HTML5 / CSS3</li>
                <li>SQL</li>
              </ul>
            </div>
            <div className="skill-category">
              <h3>Frameworks & Libraries</h3>
              <ul>
                <li>Next.js / React</li>
                <li>Redux / Context API</li>
                <li>Node.js</li>
                <li>JSF PrimeFaces</li>
                <li>Tailwind CSS</li>
              </ul>
            </div>
            <div className="skill-category">
              <h3>Tools & Technologies</h3>
              <ul>
                <li>Git / GitHub</li>
                <li>Figma</li>
                <li>Adobe Photoshop</li>
                <li>Adobe Illustrator</li>
                <li>RESTful APIs</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className="cv-section">
          <h2>Work Experience</h2>

          <div className="experience-item">
            <div className="experience-header">
              <h3>Software Engineer & Application Support Officer</h3>
              <span className="period">Feb 2025 - Present</span>
            </div>
            <p className="company">Redeemers Health Village</p>
            <ul>
              <li>Developing and maintaining hospital management software and health information systems.</li>
              <li>Providing technical support for application deployment and troubleshooting.</li>
              <li>Collaborating with healthcare teams to optimize workflow processes through technology.</li>
              <li>Ensuring system reliability, data security, and seamless integration of medical applications.</li>
            </ul>
          </div>

          <div className="experience-item">
            <div className="experience-header">
              <h3>Frontend Developer & Engineer</h3>
              <span className="period">Feb 2024 - Jan 2025</span>
            </div>
            <p className="company">Momas Electricity Meter Manufacturing Company (MEMMCOL), R&D Software Department</p>
            <ul>
              <li>Developed an enterprise eCommerce platform and GridFlex Application using Next.js, integrating four distinct systems into one user-centric product.</li>
              <li>Contributed to Smart Breaker Module design for intelligent energy monitoring and control.</li>
              <li>Worked in Agile sprints to implement UI logic, REST API endpoints, and frontend optimizations.</li>
              <li>Built reusable components, applied session and cookie management, and versioned deliverables using Git.</li>
            </ul>
          </div>

          <div className="experience-item">
            <div className="experience-header">
              <h3>Freelance Frontend Developer & UI Designer</h3>
              <span className="period">Jan 2021 - Present</span>
            </div>
            <p className="company">Remote</p>
            <ul>
              <li>Delivered full-stack UI/UX projects using HTML, CSS, JavaScript, and Next.js.</li>
              <li>Developed responsive interfaces for client dashboards, educational portals, and retail brands.</li>
              <li>Integrated third-party APIs, managed app state with Redux and Context API.</li>
              <li>Designed wireframes and mockups using Figma and Adobe XD.</li>
            </ul>
          </div>

          <div className="experience-item">
            <div className="experience-header">
              <h3>Freelance Graphic Designer & Cinematographer</h3>
              <span className="period">Jan 2021 - Present</span>
            </div>
            <p className="company">Remote</p>
            <ul>
              <li>Produced motion graphics, marketing visuals, and cinematographic content for fashion and tech clients.</li>
              <li>Managed brand identities and created social media kits using Illustrator and Photoshop.</li>
              <li>Edited promotional videos, reels, and product highlights with CapCut and Adobe Premiere.</li>
            </ul>
          </div>
        </section>

        {/* Projects */}
        <section className="cv-section">
          <h2>Key Projects</h2>

          <div className="project-item">
            <div className="project-header">
              <h3>Epilux - E-commerce Platform</h3>
              <span className="tech-stack">Next.js • Node.js • MongoDB</span>
            </div>
            <p>
              Developed a comprehensive e-commerce application for a pure water manufacturing company featuring
              product catalog, shopping cart, order management, and integrated wallet system for customer credits
              and payments. Implemented secure payment processing and real-time inventory tracking.
            </p>
          </div>

          <div className="project-item">
            <div className="project-header">
              <h3>GridFlex - Electricity Management System</h3>
              <span className="tech-stack">Next.js • Java • PostgreSQL</span>
            </div>
            <p>
              Built a platform enabling users to manage their electricity consumption and make payments for
              prepaid meters. Provided distribution companies (DISCOS) with a dashboard to manage electricity
              distribution, monitor usage patterns, and handle customer accounts efficiently.
            </p>
          </div>

          <div className="project-item">
            <div className="project-header">
              <h3>Smart Breaker - IoT Home Automation</h3>
              <span className="tech-stack">Next.js • Java • PostgreSQL</span>
            </div>
            <p>
              Developed an IoT-powered home automation system allowing users to remotely control electrical
              appliances from anywhere. Features include turning devices on/off, adjusting current levels,
              scheduling operations, and monitoring real-time power consumption through a mobile-friendly interface.
            </p>
          </div>

          <div className="project-item">
            <div className="project-header">
              <h3>E-Book Web Application</h3>
              <span className="tech-stack">HTML • CSS • JavaScript • Node.js • MSSQL</span>
            </div>
            <p>
              Ebook web application for students to read and manage their digital books. Features include
              book library management, reading progress tracking, user authentication, and responsive design
              for seamless reading experience across devices.
            </p>
          </div>

          <div className="project-item">
            <div className="project-header">
              <h3>Academic Management System</h3>
              <span className="tech-stack">Next.js • TypeScript • Firebase • Tailwind</span>
            </div>
            <p>
              Academic management system where students can write notes, save materials, schedule their days
              and get notified. Includes task management, calendar integration, and real-time notifications
              for assignments and deadlines.
            </p>
          </div>

          <div className="project-item">
            <div className="project-header">
              <h3>Staff Management Record System</h3>
              <span className="tech-stack">Java PrimeFace • MSSQL • Backend</span>
            </div>
            <p>
              Staff management record system built with Java PrimeFace and MSSQL for efficient employee data
              management. Features employee profiles, attendance tracking, performance records, and administrative
              dashboard for HR operations.
            </p>
          </div>
        </section>

        {/* Education */}
        <section className="cv-section">
          <h2>Education</h2>

          <div className="education-item">
            <div className="education-header">
              <h3>Bachelor of Science in Computer Science</h3>
              <span className="period">November 29, 2024</span>
            </div>
            <p className="institution">Bamidele Olumilua University of Education, Science & Technology, Ikere Ekiti</p>
          </div>
        </section>

        {/* Achievements */}
        <section className="cv-section">
          <h2>Achievements</h2>
          <ul className="achievements-list">
            <li>Successfully delivered 60+ projects for clients across various industries</li>
            <li>Developed innovative solutions for energy management and IoT applications (GridFlex, Smart Breaker)</li>
            <li>Created enterprise e-commerce platform with wallet integration (Epilux)</li>
            <li>Recognized for exceptional UI/UX design and user experience</li>
          </ul>
        </section>
      </div>

      {/* Download Button */}
      <div className="download-button-container">
        <button onClick={() => window.print()} className="download-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="download-icon"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download as PDF
        </button>
      </div>
    </div>
  );
}
