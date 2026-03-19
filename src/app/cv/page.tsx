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
            including e-commerce, energy management, and IoT solutions. Strong focus on UI/UX design and
            creating exceptional user experiences.
          </p>
        </section>

        {/* Skills */}
        <section className="cv-section">
          <h2>Technical Skills</h2>
          <div className="skills-grid">
            <div className="skill-category">
              <h3>Frontend</h3>
              <ul>
                <li>React / Next.js</li>
                <li>TypeScript / JavaScript</li>
                <li>HTML5 / CSS3 / Tailwind</li>
                <li>UI/UX Design</li>
                <li>Framer Motion</li>
              </ul>
            </div>
            <div className="skill-category">
              <h3>Backend</h3>
              <ul>
                <li>Node.js / Express</li>
                <li>Java (Spring Boot)</li>
                <li>PostgreSQL / MongoDB</li>
                <li>REST API Development</li>
                <li>GraphQL</li>
              </ul>
            </div>
            <div className="skill-category">
              <h3>Tools & Cloud</h3>
              <ul>
                <li>Git / GitHub</li>
                <li>AWS / Cloud Services</li>
                <li>Docker</li>
                <li>Figma</li>
                <li>Adobe Creative Suite</li>
              </ul>
            </div>
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
        </section>

        {/* Experience */}
        <section className="cv-section">
          <h2>Work Experience</h2>

          <div className="experience-item">
            <div className="experience-header">
              <h3>Senior Software Developer</h3>
              <span className="period">2023 - Present</span>
            </div>
            <p className="company">Tech Solutions Inc.</p>
            <ul>
              <li>Lead development of enterprise web applications using modern technologies</li>
              <li>Mentor junior developers and conduct code reviews</li>
              <li>Architect scalable solutions for client projects</li>
              <li>Collaborate with design teams to implement pixel-perfect UIs</li>
            </ul>
          </div>

          <div className="experience-item">
            <div className="experience-header">
              <h3>Full Stack Developer</h3>
              <span className="period">2021 - 2023</span>
            </div>
            <p className="company">Digital Agency</p>
            <ul>
              <li>Built 50+ client websites and web applications</li>
              <li>Developed custom e-commerce solutions and CMS platforms</li>
              <li>Implemented responsive designs and optimized performance</li>
              <li>Integrated third-party APIs and payment gateways</li>
            </ul>
          </div>
        </section>

        {/* Education */}
        <section className="cv-section">
          <h2>Education</h2>

          <div className="education-item">
            <div className="education-header">
              <h3>Computer Science / Software Engineering</h3>
              <span className="period">2018 - 2022</span>
            </div>
            <p className="institution">University of Lagos</p>
          </div>
        </section>

        {/* Achievements */}
        <section className="cv-section">
          <h2>Achievements</h2>
          <ul className="achievements-list">
            <li>Successfully delivered 60+ projects for clients across various industries</li>
            <li>Developed innovative solutions for energy management and IoT applications</li>
            <li>Recognized for exceptional UI/UX design and user experience</li>
            <li>Maintained 98% client satisfaction rate</li>
          </ul>
        </section>
      </div>

      {/* Print Button */}
      <div className="print-button-container">
        <button onClick={() => window.print()} className="print-button">
          Download as PDF
        </button>
      </div>
    </div>
  );
}
