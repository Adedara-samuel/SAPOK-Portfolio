"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getExperienceYears, profile, projects } from "@/data/portfolio-data";
import type { SceneProps } from "@/components/shell/scenes";
import { MaskedLines, Reveal } from "./Reveal";

const featured = projects.filter((p) => p.featured).slice(0, 3);

export default function IndexScene({ go, openProject }: SceneProps) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 20 });

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const years = getExperienceYears();

  return (
    <div className="relative flex min-h-full flex-col" onPointerMove={onMove}>
      {/* Ambient glow */}
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 size-[44rem] rounded-full bg-accent/15 blur-[120px]" />

      <div className="relative mx-auto grid w-full max-w-7xl flex-1 items-center gap-10 px-5 pb-28 pt-10 sm:px-10 md:pb-32 lg:grid-cols-[1.25fr_0.75fr]">
        <div>
          <Reveal className="eyebrow mb-6 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="text-paper">{profile.name}</span>
            <span className="h-px w-6 bg-line" />
            {profile.role}
          </Reveal>

          <h1 className="font-display text-[clamp(2.9rem,6.4vw,6rem)] font-semibold leading-[0.92] tracking-[-0.045em]">
            <MaskedLines lines={["I build the systems", "teams run their", "work on."]} accentIndex={2} />
          </h1>

          <Reveal step={3} className="mt-8 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Software engineer and designer in {profile.location.split(",")[0]}. I design and ship multi-tenant platforms,
            healthcare systems and fintech infrastructure — from database schema to the last pixel.
          </Reveal>

          <Reveal step={4} className="mt-10 flex flex-wrap gap-3">
            <button onClick={() => go("work")} className="btn-accent">
              Explore work <ArrowRight className="size-4" />
            </button>
            <button onClick={() => go("book")} className="btn-ghost">
              Book a call
            </button>
          </Reveal>

          <Reveal step={5} className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-6">
            {[
              [`${years}+`, "Years building"],
              [`${projects.length}`, "Projects shipped"],
              [`${projects.filter((p) => p.live).length}`, "Live deployments"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{n}</div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">{l}</div>
              </div>
            ))}
          </Reveal>
        </div>

        {/* Portrait card */}
        <Reveal step={2} className="relative mx-auto w-full max-w-sm [perspective:1200px] lg:max-w-none">
          <motion.div style={{ rotateX: rx, rotateY: ry }} className="relative overflow-hidden rounded-[28px] border border-line bg-raised shadow-2xl shadow-black/40">
            { }
            <img src="/images/SAMUEL.jpeg" alt={profile.name} className="aspect-[4/5] w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5 pt-20">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-white/80">
                <span>{profile.location}</span>
                <span className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-ok" /> Open to work
                </span>
              </div>
            </div>
          </motion.div>
        </Reveal>
      </div>

      {/* Featured strip */}
      <div className="relative mx-auto -mt-16 w-full max-w-7xl px-5 pb-28 sm:px-10 md:pb-32 lg:-mt-20">
        <Reveal step={6} className="eyebrow mb-4 flex items-center justify-between">
          <span>Now shipping</span>
          <button onClick={() => go("work")} className="flex items-center gap-1 text-paper hover:text-accent">
            All work <ArrowUpRight className="size-3.5" />
          </button>
        </Reveal>
        <div className="grid gap-3 sm:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.slug} step={7 + i}>
              <button
                data-cursor="view"
                onClick={() => openProject(p.slug)}
                className="group flex w-full items-center gap-4 rounded-2xl border border-line bg-surface/60 p-3 text-left transition hover:border-accent/60"
              >
                { }
                <img src={p.cover} alt="" className="h-14 w-20 shrink-0 rounded-lg object-cover" />
                <span className="min-w-0">
                  <span className="block truncate font-medium">{p.title}</span>
                  <span className="block truncate font-mono text-[10px] uppercase tracking-[0.14em] text-muted">{p.category}</span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
        <Reveal step={10} className="mt-8 hidden font-mono text-[10px] uppercase tracking-[0.18em] text-faint md:block">
          Scroll, use ← → or press 1–6 to move · ⌘K to search
        </Reveal>
        <Reveal step={10} className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-faint md:hidden">
          Swipe left / right to move between sections
        </Reveal>
      </div>
    </div>
  );
}
