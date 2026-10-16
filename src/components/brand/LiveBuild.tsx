"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";

// What gets "typed" each loop — a tiny real-looking component.
const CODE: { t: string; c?: string }[][] = [
  [{ t: "export default ", c: "text-[#c084fc]" }, { t: "function ", c: "text-[#c084fc]" }, { t: "Dashboard", c: "text-[#5eead4]" }, { t: "() {" }],
  [{ t: "  const ", c: "text-[#c084fc]" }, { t: "stats " }, { t: "= ", c: "text-muted" }, { t: "useStats", c: "text-[#60a5fa]" }, { t: "();" }],
  [{ t: "  return (" }],
  [{ t: "    <", c: "text-muted" }, { t: "Grid", c: "text-[#5eead4]" }, { t: " cols", c: "text-[#fbbf24]" }, { t: "={3}>" }],
  [{ t: "      <", c: "text-muted" }, { t: "Card", c: "text-[#5eead4]" }, { t: " kpi", c: "text-[#fbbf24]" }, { t: "={stats.users} />" }],
  [{ t: "      <", c: "text-muted" }, { t: "Chart", c: "text-[#5eead4]" }, { t: " data", c: "text-[#fbbf24]" }, { t: "={stats.trend} />" }],
  [{ t: "    </", c: "text-muted" }, { t: "Grid", c: "text-[#5eead4]" }, { t: ">" }],
  [{ t: "  );" }],
  [{ t: "}" }],
];
const LINE_MS = 420;
const BARS = [38, 62, 48, 80, 58, 92, 70];

type Phase = "code" | "build" | "ship";

/**
 * A looping "design → code → ship" vignette: code types itself, the UI assembles beside it,
 * then a deploy toast lands. Pure DOM/CSS so it stays crisp at any size.
 */
export default function LiveBuild({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const [lines, setLines] = useState(reduce ? CODE.length : 0);
  const [phase, setPhase] = useState<Phase>(reduce ? "ship" : "code");
  const [loop, setLoop] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const at = (ms: number, fn: () => void) => timers.push(setTimeout(fn, ms));
    at(0, () => {
      setLines(0);
      setPhase("code");
    });
    CODE.forEach((_, i) => at(300 + i * LINE_MS, () => setLines(i + 1)));
    const typed = 300 + CODE.length * LINE_MS;
    at(typed + 200, () => setPhase("build"));
    at(typed + 2600, () => setPhase("ship"));
    at(typed + 5200, () => setLoop((l) => l + 1));
    return () => timers.forEach(clearTimeout);
  }, [loop, reduce]);

  const building = phase !== "code";

  return (
    <div className={`overflow-hidden rounded-2xl border border-line bg-ink/90 shadow-2xl shadow-black/50 backdrop-blur-xl ${className ?? ""}`}>
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-line px-3 py-2">
        <span className="size-2 rounded-full bg-[#ff5f57]" />
        <span className="size-2 rounded-full bg-[#febc2e]" />
        <span className="size-2 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-[10px] text-muted">dashboard.tsx</span>
        <span className="ml-auto flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
          <span className={`size-1.5 rounded-full ${phase === "ship" ? "bg-ok" : "animate-pulse bg-accent"}`} />
          {phase === "code" ? "Writing" : phase === "build" ? "Building" : "Live"}
        </span>
      </div>

      <div className="grid grid-cols-[1.15fr_1fr]">
        {/* code */}
        <pre className="min-h-44 border-r border-line p-3 font-mono text-[9.5px] leading-[1.6] text-paper/90 sm:text-[10.5px]">
          {CODE.slice(0, lines).map((line, i) => (
            <motion.div key={`${loop}-${i}`} initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }}>
              {line.map((tok, j) => (
                <span key={j} className={tok.c}>
                  {tok.t}
                </span>
              ))}
              {i === lines - 1 && phase === "code" && <span className="ml-0.5 inline-block h-3 w-1.5 translate-y-0.5 animate-pulse bg-accent" />}
            </motion.div>
          ))}
        </pre>

        {/* live preview */}
        <div className="relative p-3">
          <div className="grid grid-cols-3 gap-1.5">
            {[0, 1, 2].map((k) => (
              <motion.div
                key={`${loop}-k${k}`}
                initial={false}
                animate={building ? { opacity: 1, scale: 1 } : { opacity: 0.15, scale: 0.85 }}
                transition={{ delay: building ? k * 0.15 : 0, type: "spring", stiffness: 300, damping: 20 }}
                className="rounded-md border border-line bg-surface p-1.5"
              >
                <div className="h-1 w-6 rounded bg-faint/60" />
                <div className={`mt-1 h-2 rounded ${k === 1 ? "w-8 bg-accent" : "w-7 bg-[#5eead4]"}`} />
              </motion.div>
            ))}
          </div>
          <div className="mt-2 flex h-20 items-end gap-1 rounded-md border border-line bg-surface p-1.5">
            {BARS.map((h, k) => (
              <motion.span
                key={`${loop}-b${k}`}
                className="flex-1 rounded-sm bg-gradient-to-t from-[#00c896] to-[#5eead4]"
                initial={{ height: "6%" }}
                animate={{ height: building ? `${h}%` : "6%" }}
                transition={{ delay: building ? 0.4 + k * 0.08 : 0, type: "spring", stiffness: 180, damping: 16 }}
              />
            ))}
          </div>

          <AnimatePresence>
            {phase === "ship" && (
              <motion.div
                key={`ship-${loop}`}
                initial={{ opacity: 0, y: 14, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                className="absolute inset-x-3 bottom-3 flex items-center gap-2 rounded-lg border border-ok/40 bg-ink/95 px-2.5 py-1.5"
              >
                <span className="grid size-4 place-items-center rounded-full bg-ok text-ink">
                  <Check className="size-3" strokeWidth={3} />
                </span>
                <span className="font-mono text-[9.5px] text-paper">Deployed · 1.2s</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
