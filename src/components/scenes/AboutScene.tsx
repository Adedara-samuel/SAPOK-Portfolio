"use client";

import { ArrowUpRight } from "lucide-react";
import { cvExperience, getExperienceYears, profile, stackGroups } from "@/data/portfolio-data";
import type { SceneProps } from "@/components/shell/scenes";
import { Reveal, SceneHeader, scenePad } from "./Reveal";

export default function AboutScene({ go }: SceneProps) {
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
              Village, and CEO of SAPOK TECH. Most of my
              work lives where the stakes are real: patient records, incident reports, money moving between accounts.
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
    </div>
  );
}
