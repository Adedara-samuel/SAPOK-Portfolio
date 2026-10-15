"use client";

import { ArrowRight } from "lucide-react";
import { services } from "@/data/portfolio-data";
import type { SceneProps } from "@/components/shell/scenes";
import { Reveal, SceneHeader, scenePad } from "./Reveal";

const process = [
  ["Discover", "Understand the operation, the people, and the constraints before a line of code."],
  ["Design", "Flows and interfaces in Figma, validated early with the people who'll use them."],
  ["Build", "Typed end to end, tested where it matters, shipped in small reviewable steps."],
  ["Support", "Deployment, monitoring and iteration — software is never finished on launch day."],
];

export default function ServicesScene({ go }: SceneProps) {
  return (
    <div className={scenePad}>
      <SceneHeader
        index="04"
        eyebrow="Services"
        lines={["What I can do", "for your team."]}
        accentIndex={1}
        aside={<p className="leading-relaxed text-muted">From a single interface to a whole platform — I can own the design, the build, or both.</p>}
      />

      <div className="grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <Reveal key={s.title} step={2 + i} className="group relative overflow-hidden border-b border-r border-line p-6 sm:p-8">
            <span aria-hidden className="absolute inset-0 origin-bottom scale-y-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(.76,0,.24,1)] group-hover:scale-y-100" />
            <div className="relative transition-colors duration-500 group-hover:text-accent-ink">
              <div className="font-mono text-xs text-faint transition-colors group-hover:text-accent-ink/70">0{i + 1}</div>
              <h3 className="mt-10 font-display text-2xl font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted transition-colors group-hover:text-accent-ink/80">{s.body}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <span key={t} className="chip transition-colors group-hover:border-accent-ink/30 group-hover:text-accent-ink">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <section className="mt-20">
        <Reveal step={8} className="eyebrow mb-6">How I work</Reveal>
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {process.map(([title, body], i) => (
            <Reveal as="li" key={title} step={9 + i} className="border-t border-line pt-5">
              <div className="font-mono text-xs text-accent">0{i + 1}</div>
              <div className="mt-3 text-lg font-semibold">{title}</div>
              <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
            </Reveal>
          ))}
        </ol>
        <Reveal step={13} className="mt-12">
          <button onClick={() => go("book")} className="btn-accent">
            Start a project <ArrowRight className="size-4" />
          </button>
        </Reveal>
      </section>
    </div>
  );
}
