"use client";

import { cvExperience, cvProjects, cvSkillGroups, getExperienceYears, profile } from "@/data/portfolio-data";
import "./cv.css";

export default function CVPage() {
  const experienceYears = getExperienceYears();

  return (
    <div className="cv-container">
      <div className="cv-content">
        {/* Header */}
        <header className="cv-header">
          <div className="header-content">
            <h1>Adedara Samuel (S.P)</h1>
            <p className="title">{profile.role}</p>
            <div className="contact-info">
              <span>{profile.email}</span>
              <span className="separator">|</span>
              <span>{profile.phone} (WhatsApp)</span>
              <span className="separator">|</span>
              <span>{profile.phone2}</span>
              <span className="separator">|</span>
              <span>{profile.location}</span>
            </div>
            <div className="social-links">
              <a href={profile.socials.github} target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://sapok-portfolio.vercel.app" target="_blank" rel="noopener noreferrer">Portfolio</a>
            </div>
          </div>
        </header>

        {/* Summary */}
        <section className="cv-section">
          <h2>Professional Summary</h2>
          <p>
            Frontend and full-stack engineer with {experienceYears}+ years of experience designing and shipping
            production systems end to end. Builds multi-tenant platforms, hospital systems (IVF clinic management,
            incident reporting, document management) and fintech infrastructure with Next.js, React, NestJS, Express,
            FastAPI, PostgreSQL and MongoDB — plus desktop and mobile apps with Tauri, pywebview and React Native.
            Known for role-based access control and audit trails that hold up in practice, and for interfaces that feel
            obvious on first use.
          </p>
        </section>

        {/* Skills */}
        <section className="cv-section">
          <h2>Technical Skills</h2>
          {cvSkillGroups.map((group) => (
            <div className="skill-category" key={group.title}>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Experience */}
        <section className="cv-section">
          <h2>Work Experience</h2>

          {cvExperience.map((item) => (
            <div className="experience-item" key={item.title}>
              <div className="experience-header">
                <h3>{item.title}</h3>
                <span className="period">{item.period}</span>
              </div>
              <p className="company">{item.company}</p>
              <ul>
                {item.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Projects */}
        <section className="cv-section">
          <h2>Key Projects</h2>

          {cvProjects.map((project) => (
            <div className="project-item" key={project.title}>
              <div className="project-header">
                <h3>{project.title}</h3>
                <span className="tech-stack">{project.techStack}</span>
              </div>
              <p>{project.description}</p>
              {project.status && <p className="project-status"><strong>Status:</strong> {project.status}</p>}
              {project.link && <p className="project-status"><strong>Live:</strong> {project.link}</p>}
            </div>
          ))}
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
            <li>Built and deployed three in-house systems at Redeemer&apos;s Health Village: RHV IVF, RHV SafeTrack and the Enterprise DMS</li>
            <li>Founder &amp; CEO of SAPOK TECH; architected its ecosystem: Sapok OneGrid, SAPOK Pay and SAPOK AI</li>
            <li>Developed energy management and IoT solutions at MEMMCOL (GridFlex, Smart Breaker)</li>
            <li>Created an enterprise e-commerce platform with wallet integration (Epilux)</li>
          </ul>
        </section>
      </div>

      {/* Download Button */}
      <div className="download-button-container">
        <button type="button" onClick={() => window.print()} className="download-button" aria-label="Download CV as PDF">
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
