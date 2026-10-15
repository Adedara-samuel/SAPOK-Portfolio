"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Github, X } from "lucide-react";
import { projects } from "@/data/portfolio-data";

/** Full-screen case study for one project, with an inline lightbox gallery. */
export default function ProjectSheet({
  slug,
  onClose,
  onOpen,
}: {
  slug: string | null;
  onClose: () => void;
  onOpen: (slug: string) => void;
}) {
  const index = slug ? projects.findIndex((p) => p.slug === slug) : -1;
  const project = index >= 0 ? projects[index] : null;
  const next = index >= 0 ? projects[(index + 1) % projects.length] : null;
  const images = project ? [project.cover, ...(project.gallery ?? []).filter((g) => g !== project.cover)] : [];

  const [lightbox, setLightbox] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project) return;
    const previous = document.activeElement as HTMLElement | null;
    const t = setTimeout(() => {
      setLightbox(null);
      closeRef.current?.focus();
      scrollRef.current?.scrollTo({ top: 0 });
    }, 0);
    return () => {
      clearTimeout(t);
      previous?.focus?.();
    };
  }, [project]);

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (lightbox !== null) {
        if (e.key === "Escape") setLightbox(null);
        if (e.key === "ArrowRight") setLightbox((i) => ((i ?? 0) + 1) % images.length);
        if (e.key === "ArrowLeft") setLightbox((i) => ((i ?? 0) - 1 + images.length) % images.length);
        return;
      }
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [project, lightbox, images.length, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="sheet"
          className="fixed inset-0 z-[80] bg-ink/70 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.article
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-title"
            className="absolute inset-x-0 bottom-0 top-3 overflow-hidden rounded-t-3xl border border-line bg-surface md:inset-x-[4vw] md:top-[4vh]"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Close project"
              className="absolute right-4 top-4 z-10 grid size-11 place-items-center rounded-full border border-line bg-ink/70 text-paper backdrop-blur transition hover:border-accent hover:text-accent"
            >
              <X className="size-5" />
            </button>

            <div ref={scrollRef} className="scene-scroll h-full overflow-y-auto">
              {/* Hero */}
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                className="relative aspect-[16/10] max-h-[62vh] w-full overflow-hidden bg-raised md:aspect-[16/8]"
              >
                <button className="block size-full" data-cursor="view" onClick={() => setLightbox(0)} aria-label="Open cover image">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={project.cover} alt={`${project.title} cover`} className="size-full object-cover" />
                </button>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-surface to-transparent" />
              </motion.div>

              <div className="mx-auto max-w-6xl px-5 pb-16 sm:px-10">
                <div className="-mt-16 grid gap-10 md:-mt-24 lg:grid-cols-[1.4fr_1fr]">
                  <div className="relative">
                    <p className="eyebrow mb-4">
                      {project.category} · {project.year}
                      {project.client ? ` · ${project.client}` : ""}
                    </p>
                    <h2 id="project-title" className="font-display text-[clamp(2.4rem,6vw,5rem)] font-semibold leading-[0.95] tracking-[-0.04em]">
                      {project.title}
                    </h2>
                    <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/90">{project.summary}</p>
                    {project.overview && <p className="mt-4 max-w-2xl leading-relaxed text-muted">{project.overview}</p>}

                    <div className="mt-8 flex flex-wrap gap-3">
                      {project.live && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn-accent">
                          Visit live <ArrowUpRight className="size-4" />
                        </a>
                      )}
                      {project.repo && (
                        <a href={project.repo} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                          <Github className="size-4" /> Source
                        </a>
                      )}
                      {project.status && <span className="chip self-center">{project.status}</span>}
                    </div>
                  </div>

                  <aside className="relative space-y-8 lg:pt-28">
                    {project.features && (
                      <div>
                        <h3 className="eyebrow mb-4">What it does</h3>
                        <ul className="space-y-3">
                          {project.features.map((f) => (
                            <li key={f} className="flex gap-3 text-sm leading-relaxed text-paper/90">
                              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div>
                      <h3 className="eyebrow mb-4">Stack</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((s) => (
                          <span key={s} className="chip">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </aside>
                </div>

                {images.length > 1 && (
                  <section className="mt-16">
                    <h3 className="eyebrow mb-5">Screens</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {images.slice(1).map((src, i) => (
                        <button
                          key={src}
                          data-cursor="view"
                          onClick={() => setLightbox(i + 1)}
                          className="group overflow-hidden rounded-xl border border-line bg-raised"
                          aria-label={`Open screenshot ${i + 1}`}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={src} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover object-top transition duration-700 group-hover:scale-[1.03]" />
                        </button>
                      ))}
                    </div>
                  </section>
                )}

                {next && (
                  <button
                    onClick={() => onOpen(next.slug)}
                    className="group mt-20 flex w-full items-center justify-between border-t border-line pt-8 text-left"
                  >
                    <span>
                      <span className="eyebrow block">Next project</span>
                      <span className="mt-2 block font-display text-3xl font-semibold tracking-tight transition group-hover:text-accent sm:text-5xl">
                        {next.title}
                      </span>
                    </span>
                    <ArrowRight className="size-8 text-muted transition group-hover:translate-x-2 group-hover:text-accent" />
                  </button>
                )}
              </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
              {lightbox !== null && (
                <motion.div
                  className="absolute inset-0 z-20 flex items-center justify-center bg-black/95 p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setLightbox(null)}
                  data-swipe-ignore
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={images[lightbox]}
                      src={images[lightbox]}
                      alt={`${project.title} screen ${lightbox + 1}`}
                      className="max-h-[85vh] max-w-full rounded-lg object-contain"
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </AnimatePresence>
                  {images.length > 1 && (
                    <>
                      <button
                        aria-label="Previous image"
                        onClick={(e) => {
                          e.stopPropagation();
                          setLightbox((lightbox - 1 + images.length) % images.length);
                        }}
                        className="absolute left-3 grid size-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
                      >
                        <ChevronLeft className="size-5" />
                      </button>
                      <button
                        aria-label="Next image"
                        onClick={(e) => {
                          e.stopPropagation();
                          setLightbox((lightbox + 1) % images.length);
                        }}
                        className="absolute right-3 grid size-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
                      >
                        <ChevronRight className="size-5" />
                      </button>
                    </>
                  )}
                  <span className="absolute bottom-5 font-mono text-xs text-white/70">
                    {lightbox + 1} / {images.length}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
