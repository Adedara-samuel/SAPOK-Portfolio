"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projectCategories, projects, type Project } from "@/data/portfolio-data";
import type { SceneProps } from "@/components/shell/scenes";
import { Reveal, SceneHeader, scenePad } from "./Reveal";

function FeaturedCard({ p, onOpen, step, large }: { p: Project; onOpen: () => void; step: number; large?: boolean }) {
  return (
    <Reveal step={step} className={large ? "md:col-span-2" : ""}>
      <button data-cursor="view" onClick={onOpen} className="group block w-full text-left">
        <div className="relative overflow-hidden rounded-2xl border border-line bg-raised">
          { }
          <img
            src={p.cover}
            alt={`${p.title} cover`}
            loading="lazy"
            className={`w-full object-cover transition duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04] ${large ? "aspect-[16/8]" : "aspect-[16/10]"}`}
          />
          {p.status && <span className="absolute left-4 top-4 rounded-full bg-ink/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-paper backdrop-blur">{p.status}</span>}
        </div>
        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-2xl font-semibold tracking-tight transition group-hover:text-accent sm:text-3xl">{p.title}</h3>
            <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted">{p.summary}</p>
          </div>
          <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
            {p.category} · {p.year}
          </span>
        </div>
      </button>
    </Reveal>
  );
}

export default function WorkScene({ openProject }: SceneProps) {
  const [filter, setFilter] = useState<(typeof projectCategories)[number]>("All");
  const [hovered, setHovered] = useState<Project | null>(null);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 220, damping: 26 });
  const sy = useSpring(py, { stiffness: 220, damping: 26 });

  const featured = projects.filter((p) => p.featured);
  const list = useMemo(
    () => (filter === "All" ? projects.filter((p) => !p.featured) : projects.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <div className={scenePad}>
      <SceneHeader
        index="03"
        eyebrow="Selected work"
        lines={["Things I've built", "and shipped."]}
        accentIndex={1}
        aside={<p className="leading-relaxed text-muted">{projects.length}+ projects across platforms, healthcare, fintech and the web. Open any one for the full story.</p>}
      />

      {filter === "All" && (
        <div className="grid gap-x-6 gap-y-12 md:grid-cols-2">
          {featured.map((p, i) => (
            <FeaturedCard key={p.slug} p={p} step={2 + i} large={i === 0} onOpen={() => openProject(p.slug)} />
          ))}
        </div>
      )}

      {/* Index */}
      <section className={filter === "All" ? "mt-20" : ""}>
        <Reveal step={4} className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="eyebrow">{filter === "All" ? "Index" : filter} · {list.length}</span>
          <div className="-mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:px-0" data-swipe-ignore role="group" aria-label="Filter projects">
            {projectCategories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                aria-pressed={filter === c}
                className={`chip transition ${filter === c ? "border-accent bg-accent text-accent-ink" : "hover:border-paper/40 hover:text-paper"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Desktop rows */}
        <ul
          className="hidden border-t border-line md:block"
          onPointerMove={(e) => {
            px.set(e.clientX);
            py.set(e.clientY);
          }}
          onPointerLeave={() => setHovered(null)}
        >
          <AnimatePresence initial={false} mode="popLayout">
            {list.map((p, i) => (
              <motion.li
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.04 * i } }}
                exit={{ opacity: 0 }}
                className="border-b border-line"
              >
                <button
                  data-cursor="view"
                  onClick={() => openProject(p.slug)}
                  onPointerEnter={() => setHovered(p)}
                  className="group grid w-full grid-cols-[48px_1.4fr_1fr_1.2fr_60px] items-center gap-4 py-5 text-left"
                >
                  <span className="font-mono text-xs text-faint">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display text-2xl font-semibold tracking-tight transition-transform duration-500 group-hover:translate-x-2 group-hover:text-accent">
                    {p.title}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">{p.category}</span>
                  <span className="truncate text-sm text-muted">{p.stack.slice(0, 3).join(" · ")}</span>
                  <span className="flex items-center justify-end gap-2 font-mono text-xs text-muted">
                    {p.year.slice(0, 4)}
                    <ArrowUpRight className="size-4 transition group-hover:rotate-45 group-hover:text-accent" />
                  </span>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        {/* Floating preview follows the pointer over the list */}
        <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-50 hidden md:block" style={{ x: sx, y: sy }}>
          <AnimatePresence>
            {hovered && (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
                className="ml-8 -mt-24 w-72 overflow-hidden rounded-xl border border-line shadow-2xl shadow-black/50"
              >
                { }
                <img src={hovered.cover} alt="" className="aspect-[16/10] w-full object-cover" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Mobile cards */}
        <div className="grid gap-4 sm:grid-cols-2 md:hidden">
          {list.map((p) => (
            <button key={p.slug} onClick={() => openProject(p.slug)} className="overflow-hidden rounded-2xl border border-line bg-surface text-left active:scale-[0.99]">
              { }
              <img src={p.cover} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover" />
              <div className="p-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                  {p.category} · {p.year}
                </div>
                <div className="mt-1 font-display text-xl font-semibold tracking-tight">{p.title}</div>
                <p className="mt-1 line-clamp-2 text-sm text-muted">{p.summary}</p>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
