"use client";

import { projects, type Project } from "@/data/portfolio-data";

const ORDER = ["onegrid", "rhv-ivf", "future-homes", "sapok-pay", "safetrack", "sapok-ai", "withu", "dms", "bulkmail", "church-homecells"];
const items = ORDER.map((slug) => projects.find((p) => p.slug === slug)).filter((p): p is Project => Boolean(p));

function statusOf(p: Project) {
  if (p.status?.toLowerCase().startsWith("in progress")) return { label: "In progress", tone: "bg-accent" };
  if (p.live) return { label: "Live", tone: "bg-ok" };
  return { label: "Shipped", tone: "bg-blue-glow" };
}

function Card({ p, i, onOpen }: { p: Project; i: number; onOpen: (slug: string) => void }) {
  const s = statusOf(p);
  return (
    <button
      data-cursor="view"
      onClick={() => onOpen(p.slug)}
      className="marquee-card group relative w-64 shrink-0 overflow-hidden rounded-2xl p-px text-left sm:w-72"
      style={{ animationDelay: `${(i % 5) * -1.3}s` }}
    >
      {/* Rotating light that traces the border */}
      <span aria-hidden className="marquee-ring absolute -inset-1/2 opacity-85" style={{ animationDelay: `${i * -0.9}s` }} />
      <span className="relative block overflow-hidden rounded-[15px] bg-surface">
        <span className="relative block h-36 overflow-hidden">
          <img
            src={p.cover}
            alt=""
            loading="lazy"
            className="kenburns size-full object-cover"
            style={{ animationDelay: `${i * -2.1}s` }}
          />
          <span className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
          <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-ink/75 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-paper backdrop-blur">
            <span className={`size-1.5 animate-pulse rounded-full ${s.tone}`} />
            {s.label}
          </span>
        </span>
        <span className="block px-4 pb-4 pt-1">
          <span className="block truncate font-medium transition group-hover:text-accent">{p.title}</span>
          <span className="mt-0.5 block truncate font-mono text-[10px] uppercase tracking-[0.14em] text-muted">{p.category}</span>
        </span>
      </span>
    </button>
  );
}

/** Endless, gently drifting rail of current work. Pauses while hovered so a card can be picked. */
export default function ShippingMarquee({ onOpen }: { onOpen: (slug: string) => void }) {
  return (
    <div className="marquee-mask group/marquee -mx-5 overflow-hidden px-5 py-2 sm:-mx-10 sm:px-10" data-swipe-ignore>
      <div className="marquee-track flex w-max gap-4 group-hover/marquee:[animation-play-state:paused]">
        {[...items, ...items].map((p, i) => (
          <Card key={`${p.slug}-${i}`} p={p} i={i} onOpen={onOpen} />
        ))}
      </div>
    </div>
  );
}
