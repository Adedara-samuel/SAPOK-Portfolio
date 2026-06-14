"use client";

import { cvExperience, cvProjects, cvSkillGroups, getExperienceYears, skills } from "@/data/portfolio-data";
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
            Results-driven Software Developer with {experienceYears}+ years of experience in building scalable web applications
            and digital solutions. Specialized in full-stack development using Next.js, React, Node.js, Python,
            MongoDB, PostgreSQL, and cloud technologies. Proven track record of delivering high-quality projects
            across various industries including healthcare, e-commerce, energy management, document management,
            and IoT solutions. Strong focus on UI/UX design and creating exceptional user experiences.
          </p>
        </section>

        {/* Skills */}
        <section className="cv-section">
          <h2>Technical Skills</h2>
          <div className="skills-grid">
            {skills.map((skill) => (
              <div key={skill.name} className="skill-chip">
                <span>{skill.name}</span>
              </div>
            ))}
          </div>
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
              {project.impact && <p className="project-status"><strong>Impact:</strong> {project.impact}</p>}
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
            <li>Developed innovative solutions for energy management and IoT applications (GridFlex, Smart Breaker)</li>
            <li>Created enterprise e-commerce platform with wallet integration (Epilux)</li>
            <li>Recognized for exceptional UI/UX design and user experience</li>
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
