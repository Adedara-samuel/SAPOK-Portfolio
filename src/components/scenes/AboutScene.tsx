"use client";

import { ArrowUpRight } from "lucide-react";
import { cvExperience, getExperienceYears, profile, projects, sapokTech, stackGroups, type Project } from "@/data/portfolio-data";
import type { SceneProps } from "@/components/shell/scenes";
import { Reveal, SceneHeader, scenePad } from "./Reveal";

const solutions = sapokTech.solutions
  .map((slug) => projects.find((p) => p.slug === slug))
  .filter((p): p is Project => Boolean(p));

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
      <section className="mt-20">
        <Reveal step={10} className="eyebrow mb-5 flex items-center gap-3">
          <span className="text-accent">The company</span>
          <span className="h-px w-8 bg-line" />
          {sapokTech.role}
        </Reveal>
        <Reveal step={11} className="overflow-hidden rounded-3xl border border-line bg-surface/60">
          <div className="grid lg:grid-cols-[1fr_1.1fr]">
            <div className="relative min-h-56 overflow-hidden">
              <img src={sapokTech.cover} alt="SAPOK TECH" className="kenburns absolute inset-0 size-full object-cover" />
            </div>
            <div className="p-6 sm:p-10">
              <h3 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">{sapokTech.name}</h3>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">{sapokTech.tagline}</p>
              <p className="mt-5 leading-relaxed text-paper/85">{sapokTech.summary}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {sapokTech.offers.map((o) => (
                  <span key={o} className="chip text-paper/80">
                    {o}
                  </span>
                ))}
              </div>
              <button onClick={() => go("contact")} className="btn-accent mt-8">
                Work with SAPOK TECH <ArrowUpRight className="size-4" />
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal step={12} className="eyebrow mb-4 mt-10">Our solutions</Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {solutions.map((p, i) => (
            <Reveal key={p.slug} step={13 + i}>
              <button
                data-cursor="view"
                onClick={() => openProject(p.slug)}
                className="group block w-full overflow-hidden rounded-2xl border border-line bg-surface/60 text-left transition hover:-translate-y-1 hover:border-accent/60"
              >
                <span className="block h-32 overflow-hidden">
                  <img src={p.cover} alt="" loading="lazy" className="size-full object-cover transition duration-700 group-hover:scale-105" />
                </span>
                <span className="block p-4">
                  <span className="flex items-center justify-between gap-2">
                    <span className="font-semibold">{p.title}</span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted">{p.status?.startsWith("In progress") ? "In progress" : "Live"}</span>
                  </span>
                  <span className="mt-1 line-clamp-2 block text-sm text-muted">{p.summary}</span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
        <Reveal step={17} className="mt-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
          <span className="size-1.5 animate-pulse rounded-full bg-accent" />
          {sapokTech.websiteStatus}
        </Reveal>
      </section>
    </div>
  );
}
