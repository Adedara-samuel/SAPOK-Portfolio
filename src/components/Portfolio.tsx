"use client";

import { useEffect, useRef, useState, useMemo, type KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, X } from "lucide-react";
import { Project, projects } from "@/data/portfolio-data";

function DetailSection({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mb-6">
      <h4 className="text-sm font-semibold uppercase tracking-wide text-primary mb-3">{title}</h4>
      <ul className="grid gap-2">
        {items.map((item) => (
          <li key={item} className="text-muted-foreground text-sm leading-relaxed flex gap-2">
            <span className="text-primary shrink-0">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const categories = ["All", "Web Development", "Mobile App", "UI/UX & Graphics", "Web Application"];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [visibleProjects, setVisibleProjects] = useState(6);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!selectedProject) {
      return;
    }

    const activeElement = document.activeElement as HTMLElement | null;
    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 0);

    return () => {
      window.clearTimeout(focusTimer);
      activeElement?.focus();
    };
  }, [selectedProject]);

  const openExternal = (url: string) => {
    if (url && url !== "#") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const handleModalKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      setSelectedProject(null);
      return;
    }

    if (event.key !== "Tab" || !modalRef.current) {
      return;
    }

    const focusableElements = Array.from(
      modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ).filter((element) => !element.hasAttribute("disabled") && element.tabIndex !== -1);

    if (focusableElements.length === 0) {
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  const handleLiveDemo = (project: Project) => {
    if (project.gallery && project.gallery.length > 0) {
      setCurrentImageIndex(0);
      setGalleryOpen(true);
    } else {
      openExternal(project.link);
    }
  };

  // Use useMemo to derive displayedProjects based on category
  const filteredProjects = useMemo(() =>
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  const displayedProjects = filteredProjects.slice(0, visibleProjects);
  const hasMore = visibleProjects < filteredProjects.length;

  return (
    <section id="portfolio" className="section-padding bg-muted/30">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Here are some of the projects I&apos;ve worked on. Each project represents
            a unique piece of development, crafted with attention to detail.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              aria-pressed={activeCategory === category}
              onClick={() => setActiveCategory(category)}
              className={activeCategory === category ? "bg-gradient-to-r from-primary to-secondary" : ""}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  role="button"
                  tabIndex={0}
                  aria-label={`Open ${project.title} details`}
                  className="group overflow-hidden cursor-pointer hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all duration-300"
                  onClick={() => setSelectedProject(project)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setSelectedProject(project);
                    }
                  }}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <div>
                        <p className="text-sm text-primary font-medium">{project.category}</p>
                        <p className="text-lg font-semibold">{project.title}</p>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 rounded-full bg-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* View More Button */}
        {hasMore && (
          <div className="text-center mt-12">
            <Button
              onClick={() => setVisibleProjects(filteredProjects.length)}
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 px-8"
            >
              View More Projects
            </Button>
          </div>
        )}

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
              tabIndex={-1}
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                ref={modalRef}
                className="bg-background rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
                onKeyDown={handleModalKeyDown}
              >
                <div className="relative">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full aspect-video object-cover rounded-t-2xl"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    ref={closeButtonRef}
                    aria-label="Close project details"
                    className="absolute top-4 right-4 bg-background/80"
                    onClick={() => setSelectedProject(null)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <div className="p-6">
                  <p className="text-primary font-medium mb-2">{selectedProject.category}</p>
                  <h3 id="project-modal-title" className="text-2xl font-bold mb-4">{selectedProject.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{selectedProject.description}</p>

                  {selectedProject.overview && (
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold uppercase tracking-wide text-primary mb-2">Overview</h4>
                      <p className="text-muted-foreground leading-relaxed">{selectedProject.overview}</p>
                    </div>
                  )}

                  {selectedProject.status && (
                    <div className="mb-6 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                      Status: {selectedProject.status}
                    </div>
                  )}

                  {selectedProject.technologies && selectedProject.technologies.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold uppercase tracking-wide text-primary mb-3">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((technology) => (
                          <span
                            key={technology}
                            className="text-sm px-3 py-1 rounded-full bg-muted"
                          >
                            {technology}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedProject.features && selectedProject.features.length > 0 && (
                    <DetailSection title="Major Features" items={selectedProject.features} />
                  )}

                  {selectedProject.architecture && selectedProject.architecture.length > 0 && (
                    <DetailSection title="Architecture Highlights" items={selectedProject.architecture} />
                  )}

                  {selectedProject.achievements && selectedProject.achievements.length > 0 && (
                    <DetailSection title="Achievements and Impact" items={selectedProject.achievements} />
                  )}

                  {selectedProject.impact && (
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold uppercase tracking-wide text-primary mb-2">Business Value and Impact</h4>
                      <p className="text-muted-foreground leading-relaxed">{selectedProject.impact}</p>
                    </div>
                  )}

                  {selectedProject.gallery && selectedProject.gallery.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold uppercase tracking-wide text-primary mb-3">Screenshots</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {selectedProject.gallery.slice(0, 4).map((screenshot) => (
                          <img
                            key={screenshot}
                            src={screenshot}
                            alt={`${selectedProject.title} screenshot`}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-24 object-cover rounded-lg border"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-sm px-3 py-1 rounded-full bg-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button
                      className="bg-gradient-to-r from-primary to-secondary"
                      disabled={!selectedProject.gallery && (!selectedProject.link || selectedProject.link === "#")}
                      onClick={() => handleLiveDemo(selectedProject as Project)}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </Button>
                    <Button
                      variant="outline"
                      disabled={selectedProject.github === "#"}
                      onClick={() => openExternal(selectedProject.github)}
                    >
                      <Github className="mr-2 h-4 w-4" />
                      View Code
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Gallery Modal */}
        <AnimatePresence>
          {galleryOpen && selectedProject?.gallery && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95"
              onClick={() => setGalleryOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative w-full max-w-6xl mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Close screenshot gallery"
                  className="absolute -top-12 right-0 text-white hover:bg-white/20 z-10"
                  onClick={() => setGalleryOpen(false)}
                >
                  <X className="h-6 w-6" />
                </Button>

                {/* Main Image */}
                <div className="relative aspect-[16/9] bg-black rounded-lg overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImageIndex}
                      src={selectedProject.gallery[currentImageIndex]}
                      alt={`Gallery ${currentImageIndex + 1}`}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full object-contain"
                    />
                  </AnimatePresence>

                  {/* Navigation Arrows */}
                  {selectedProject.gallery.length > 1 && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Previous screenshot"
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex((prev) =>
                            prev === 0 ? selectedProject.gallery!.length - 1 : prev - 1
                          );
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Next screenshot"
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex((prev) =>
                            prev === selectedProject.gallery!.length - 1 ? 0 : prev + 1
                          );
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                      </Button>
                    </>
                  )}
                </div>

                {/* Thumbnail Strip */}
                {selectedProject.gallery.length > 1 && (
                  <div className="flex justify-center gap-2 mt-4 flex-wrap">
                    {selectedProject.gallery.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex(idx);
                        }}
                        aria-label={`View screenshot ${idx + 1}`}
                        className={`w-20 h-14 rounded-md overflow-hidden border-2 transition-all ${idx === currentImageIndex
                          ? 'border-primary opacity-100'
                          : 'border-transparent opacity-50 hover:opacity-80'
                          }`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Image Counter */}
                <div className="text-center text-white mt-4">
                  {currentImageIndex + 1} / {selectedProject.gallery.length}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
