"use client";

import { motion, useReducedMotion } from "framer-motion";
import { OneGridMark, SapokAiMark, SapokMark, SapokPayMark } from "./SapokMarks";

// Solutions orbiting SAPOK TECH, at fixed compass points around the core (percent of the square).
const NODES = [
  { slug: "onegrid", name: "OneGrid", status: "In progress", x: 50, y: 11, Mark: OneGridMark },
  { slug: "sapok-pay", name: "SAPOK Pay", status: "In progress", x: 89, y: 50, Mark: SapokPayMark },
  { slug: "sapok-ai", name: "SAPOK AI", status: "In progress", x: 50, y: 89, Mark: SapokAiMark },
  { slug: "withu", name: "WITHU", status: "Live", x: 11, y: 50, Mark: null },
] as const;

/**
 * Animated SAPOK TECH ecosystem: the S at the core, its products orbiting on rotating rings,
 * with light travelling along each connection.
 */
export default function SapokEcosystem() {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[460px]">
      {/* Soft teal field behind the core */}
      <div aria-hidden className="absolute inset-[18%] rounded-full bg-[#00c896]/10 blur-3xl" />

      {/* Rotating orbit rings */}
      <div aria-hidden className="eco-spin absolute inset-[11%] rounded-full border border-dashed border-[#5eead4]/25" />
      <div aria-hidden className="eco-spin-rev absolute inset-[26%] rounded-full border border-[#5eead4]/15" />
      <div aria-hidden className="eco-spin absolute inset-[3%] rounded-full border border-line/60 [animation-duration:90s]" />

      {/* Connections with travelling light */}
      <svg aria-hidden viewBox="0 0 100 100" className="absolute inset-0 size-full">
        {NODES.map((n, i) => (
          <g key={n.slug}>
            <line x1="50" y1="50" x2={n.x} y2={n.y} stroke="#5eead4" strokeOpacity="0.18" strokeWidth="0.4" />
            <line x1="50" y1="50" x2={n.x} y2={n.y} stroke="#5eead4" strokeWidth="0.5" strokeDasharray="1.5 4" className="eco-flow" style={{ animationDelay: `${i * -0.6}s` }} />
            {!reduce && (
              <circle r="1.1" fill="#ff6b3d">
                <animateMotion dur={`${2.6 + i * 0.4}s`} repeatCount="indefinite" path={`M50 50 L${n.x} ${n.y}`} />
              </circle>
            )}
          </g>
        ))}
      </svg>

      {/* Core */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <span aria-hidden className="absolute inset-0 animate-ping rounded-[28%] bg-[#00c896]/20 [animation-duration:2.8s]" />
        <motion.div
          animate={reduce ? undefined : { y: [0, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="relative grid size-24 place-items-center rounded-[28%] border border-[#5eead4]/30 bg-ink sm:size-28"
        >
          <SapokMark className="size-14 sm:size-16" />
        </motion.div>
      </div>

      {/* Product nodes */}
      {NODES.map((n, i) => (
        <div key={n.slug} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${n.x}%`, top: `${n.y}%` }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1, y: reduce ? 0 : [0, i % 2 ? 5 : -5, 0] }}
          transition={{
            opacity: { delay: 0.6 + i * 0.12, duration: 0.5 },
            scale: { delay: 0.6 + i * 0.12, type: "spring", stiffness: 260, damping: 18 },
            y: { duration: 4 + i, repeat: Infinity, ease: "easeInOut" },
          }}
          whileHover={{ scale: 1.08 }}
          className="group flex flex-col items-center gap-1.5"
          aria-label={`${n.name} — ${n.status}`}
        >
          <span className="grid size-14 place-items-center overflow-hidden rounded-2xl border border-line bg-surface shadow-xl shadow-black/40 transition group-hover:border-[#5eead4]/60 sm:size-16">
            {n.Mark ? <n.Mark className="size-9 sm:size-10" /> : <img src="/work/brand/withu-logo.png" alt="" className="size-full object-cover" />}
          </span>
          <span className="whitespace-nowrap rounded-full bg-ink/80 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-paper backdrop-blur">
            {n.name}
          </span>
        </motion.div>
        </div>
      ))}
    </div>
  );
}
