"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, X } from "lucide-react";

const projects = [
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
    tags: ["Next.js", "TypeScript", "MongoDB", "Frontend"],
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
];

const categories = ["All", "Web Development", "Mobile App", "UI/UX & Graphics", "Web Application"];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [visibleProjects, setVisibleProjects] = useState(6);

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  const displayedProjects = filteredProjects.slice(0, visibleProjects);
  const hasMore = visibleProjects < filteredProjects.length;

  // Reset visible projects when category changes
  useEffect(() => {
    setVisibleProjects(6);
  }, [activeCategory]);

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
            Here are some of the projects I've worked on. Each project represents
            a unique piece of development, crafted with attention to detail.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
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
                  className="group overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
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
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-background rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
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
                    className="absolute top-4 right-4 bg-background/80"
                    onClick={() => setSelectedProject(null)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <div className="p-6">
                  <p className="text-primary font-medium mb-2">{selectedProject.category}</p>
                  <h3 className="text-2xl font-bold mb-4">{selectedProject.title}</h3>
                  <p className="text-muted-foreground mb-6">{selectedProject.description}</p>
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
                  <div className="flex gap-4">
                    <Button
                      className="bg-gradient-to-r from-primary to-secondary"
                      onClick={() => window.open(selectedProject.link, '_blank')}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => window.open(selectedProject.github, '_blank')}
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
      </div>
    </section>
  );
}
