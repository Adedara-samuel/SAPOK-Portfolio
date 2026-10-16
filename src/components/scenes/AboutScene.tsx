"use client";

import type { ComponentType } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SapokEcosystem from "@/components/brand/SapokEcosystem";
import { OneGridMark, SapokAiMark, SapokPayMark, SapokWordmark } from "@/components/brand/SapokMarks";
import { cvExperience, getExperienceYears, profile, projects, sapokTech, stackGroups, type Project } from "@/data/portfolio-data";
import type { SceneProps } from "@/components/shell/scenes";
import { Reveal, SceneHeader, scenePad } from "./Reveal";

const MARKS: Record<string, ComponentType<{ className?: string }> | null> = {
  onegrid: OneGridMark,
  "sapok-pay": SapokPayMark,
  "sapok-ai": SapokAiMark,
  withu: null,
};

const solutions = sapokTech.solutions
  .map((slug) => ({ project: projects.find((p) => p.slug === slug), Mark: MARKS[slug] ?? null }))
  .filter((s): s is { project: Project; Mark: ComponentType<{ className?: string }> | null } => Boolean(s.project));

export default function AboutScene({ go, openProject }: SceneProps) {
  return (
    <div className={scenePad}>
      <SceneHeader
        index="02"
        eyebrow="About"
        lines={["Engineer by trade,", "designer by habit."]}
        accentIndex={1}
        aside={
          <p className="leading-relaxed text-muted">
            {getExperienceYears()}+ years turning messy real-world operations — clinics, churches, payroll, documents — into
            calm, reliable software.
          </p>
        }
      />

      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-8">
          <Reveal step={2} className="overflow-hidden rounded-3xl border border-line">
            <img src="/images/hero-pics.jpeg" alt={`${profile.name} at work`} className="aspect-[4/3] w-full object-cover" />
          </Reveal>
          <Reveal step={3} className="space-y-4 text-[15px] leading-relaxed text-paper/85">
            <p>
              I&apos;m {profile.name} — Lead Manager for Frontend Engineering at Turon Technologies, software engineer at Redeemer&apos;s Health
              Village, and Founder &amp; CEO of SAPOK TECH, the technology company I run. Most of my work lives where the
              stakes are real: patient records, incident reports, money moving between accounts.
            </p>
            <p>
              I care about the parts users never see — permissions that actually hold, audit trails, data that survives a bad
              day — and the parts they do: interfaces that feel obvious the first time. Design and engineering are one job to
              me, which is why I do both.
            </p>
          </Reveal>
          <Reveal step={4} className="flex flex-wrap gap-3">
            <a href="/cv" target="_blank" rel="noopener noreferrer" className="btn-accent">
              View CV <ArrowUpRight className="size-4" />
            </a>
            <button onClick={() => go("contact")} className="btn-ghost">
              Say hello
            </button>
          </Reveal>
        </div>

        <div className="space-y-12">
          <section>
            <Reveal step={3} className="eyebrow mb-5">Experience</Reveal>
            <ol className="border-l border-line">
              {cvExperience.map((exp, i) => (
                <Reveal as="li" key={exp.title + exp.company} step={4 + i} className="relative pb-8 pl-6 last:pb-0">
                  <span className={`absolute -left-[5px] top-1.5 size-[9px] rounded-full border-2 border-ink ${exp.period.endsWith("Present") ? "bg-accent" : "bg-faint"}`} />
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">{exp.period}</div>
                  <h3 className="mt-1 text-lg font-semibold leading-snug">{exp.title}</h3>
                  <div className="text-sm text-muted">{exp.company}</div>
                  <p className="mt-2 text-sm leading-relaxed text-paper/75">{exp.highlights[0]}</p>
                </Reveal>
              ))}
            </ol>
          </section>

          <section>
            <Reveal step={8} className="eyebrow mb-5">Toolkit</Reveal>
            <div className="divide-y divide-line border-y border-line">
              {stackGroups.map((g, i) => (
                <Reveal key={g.label} step={9 + i} className="grid gap-3 py-4 sm:grid-cols-[120px_1fr]">
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">{g.label}</span>
                  <span className="flex flex-wrap gap-2">
                    {g.items.map((s) => (
                      <span key={s} className="chip text-paper/80">
                        {s}
                      </span>
                    ))}
                  </span>
                </Reveal>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* SAPOK TECH — the company */}
      <section className="mt-24">
        <Reveal step={10} className="eyebrow mb-5 flex items-center gap-3">
          <span className="text-accent">The company</span>
          <span className="h-px w-8 bg-line" />
          {sapokTech.role}
        </Reveal>

        <Reveal step={11} className="relative overflow-hidden rounded-3xl border border-line bg-surface/60">
          {/* faint moving grid behind the whole card */}
          <div aria-hidden className="eco-grid pointer-events-none absolute inset-0 opacity-40" />
          <div className="relative grid lg:grid-cols-[1fr_1.05fr]">
            <div className="border-b border-line p-6 sm:p-10 lg:border-b-0 lg:border-r">
              <SapokEcosystem onOpen={openProject} />
            </div>

            <div className="flex flex-col justify-center p-6 sm:p-10">
              <motion.div
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0% 0 0)" }}
                transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.6 }}
              >
                <SapokWordmark suffix="TECH" className="text-[clamp(2.2rem,5vw,3.6rem)]" />
              </motion.div>
              <motion.p
                initial={{ opacity: 0, letterSpacing: "0.4em" }}
                animate={{ opacity: 1, letterSpacing: "0.16em" }}
                transition={{ duration: 1, delay: 1.2 }}
                className="mt-3 font-mono text-[11px] uppercase text-[#5eead4]"
              >
                {sapokTech.tagline}
              </motion.p>
              <p className="mt-6 leading-relaxed text-paper/85">{sapokTech.summary}</p>

              <ul className="mt-6 flex flex-wrap gap-2">
                {sapokTech.offers.map((o, i) => (
                  <motion.li
                    key={o}
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 1.3 + i * 0.08, type: "spring", stiffness: 300, damping: 22 }}
                    className="chip border-[#5eead4]/25 text-paper/85"
                  >
                    <span className="size-1 rounded-full bg-[#5eead4]" />
                    {o}
                  </motion.li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button onClick={() => go("contact")} className="btn-accent">
                  Work with SAPOK TECH <ArrowUpRight className="size-4" />
                </button>
                <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                    <span className="relative inline-flex size-2 rounded-full bg-accent" />
                  </span>
                  {sapokTech.websiteStatus}
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal step={12} className="eyebrow mb-4 mt-12">Our solutions</Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {solutions.map(({ project: p, Mark }, i) => (
            <Reveal key={p.slug} step={13 + i}>
              <button
                data-cursor="view"
                onClick={() => openProject(p.slug)}
                className="group relative block w-full overflow-hidden rounded-2xl p-px text-left transition duration-500 hover:-translate-y-1.5"
              >
                <span aria-hidden className="absolute inset-0 rounded-2xl bg-line" />
                <span aria-hidden className="marquee-ring absolute -inset-1/2 opacity-0 transition-opacity duration-500 group-hover:opacity-90" />
                <span className="relative block overflow-hidden rounded-[15px] bg-surface">
                  <span className="relative grid h-36 place-items-center overflow-hidden bg-ink">
                    <span aria-hidden className="absolute size-40 rounded-full bg-[#00c896]/10 blur-2xl transition duration-700 group-hover:scale-150" />
                    {Mark ? (
                      <Mark className="relative size-16 transition duration-700 group-hover:-rotate-6 group-hover:scale-110" />
                    ) : (
                      <img src="/work/brand/withu-logo.png" alt="" className="relative size-20 rounded-2xl object-cover transition duration-700 group-hover:scale-110" />
                    )}
                  </span>
                  <span className="block p-4">
                    <span className="flex items-center justify-between gap-2">
                      <span className="font-semibold transition group-hover:text-[#5eead4]">{p.title}</span>
                      <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                        <span className={`size-1.5 animate-pulse rounded-full ${p.live ? "bg-ok" : "bg-accent"}`} />
                        {p.live ? "Live" : "In progress"}
                      </span>
                    </span>
                    <span className="mt-1 line-clamp-2 block text-sm text-muted">{p.summary}</span>
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
