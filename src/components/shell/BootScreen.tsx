"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { profile, projects, projectsShipped } from "@/data/portfolio-data";
import Logo from "@/components/Logo";

const SESSION_KEY = "sapok:booted";
const EASE = [0.76, 0, 0.24, 1] as const;

const PRELOAD = ["/images/SAMUEL.jpeg", ...projects.filter((p) => p.featured).map((p) => p.cover)];

const LOG = [
  ["sapok.os", "v26.10"],
  ["mounting /work", `${projectsShipped} projects`],
  ["linking services", "6 online"],
  ["locale", "WAT · Lagos"],
  ["calibrating cursor", "ok"],
] as const;

function preload(src: string) {
  return new Promise<void>((resolve) => {
    const img = new Image();
    img.onload = img.onerror = () => resolve();
    img.src = src;
  });
}

/**
 * First-visit boot sequence. Progress is the slower of real asset loading and a
 * minimum runtime, so it never lies about being done and never flashes by.
 */
export default function BootScreen({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);
  const loaded = useRef(0);
  const doneRef = useRef(onDone);

  useEffect(() => {
    doneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    let repeat = false;
    try {
      repeat = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {}
    const minMs = reduce ? 400 : repeat ? 900 : 2600;
    const maxMs = 7000;

    PRELOAD.forEach((src) => preload(src).then(() => (loaded.current += 1)));

    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      const timeP = Math.min(elapsed / minMs, 1);
      const realP = elapsed > maxMs ? 1 : loaded.current / PRELOAD.length;
      const p = Math.min(timeP, realP);
      setProgress(p);
      if (p >= 1) {
        try {
          sessionStorage.setItem(SESSION_KEY, "1");
        } catch {}
        setTimeout(() => setLeaving(true), reduce ? 0 : 250);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  useEffect(() => {
    if (!leaving) return;
    doneRef.current();
    const t = setTimeout(() => setGone(true), reduce ? 300 : 1100);
    return () => clearTimeout(t);
  }, [leaving, reduce]);

  if (gone) return null;

  const pct = Math.round(progress * 100);
  const [first, ...rest] = profile.name.split(" ");

  return (
    <div role="status" aria-label={`Loading portfolio, ${pct}%`} className={`fixed inset-0 z-[120] text-paper ${leaving ? "pointer-events-none" : ""}`}>
      {/* Shutter halves */}
      {(["top", "bottom"] as const).map((half) => (
        <motion.div
          key={half}
          className={`absolute inset-x-0 bg-ink ${half === "top" ? "top-0 h-1/2" : "bottom-0 h-1/2"}`}
          animate={leaving ? (reduce ? { opacity: 0 } : { y: half === "top" ? "-100%" : "100%" }) : {}}
          transition={{ duration: reduce ? 0.3 : 0.95, ease: EASE, delay: 0.15 }}
        />
      ))}

      <AnimatePresence>
        {!leaving && (
          <motion.div
            className="absolute inset-0 flex flex-col justify-between p-5 sm:p-10"
            exit={{ opacity: 0, filter: "blur(6px)" }}
            transition={{ duration: 0.3 }}
          >
            {/* Boot log */}
            <div className="font-mono text-[11px] leading-6 text-muted sm:text-xs">
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="mb-5">
                <Logo className="size-10" />
              </motion.div>
              {LOG.map(([k, v], i) => (
                <motion.div
                  key={k}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: progress > i / LOG.length ? 1 : 0, x: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex max-w-xs gap-2"
                >
                  <span className="text-accent">›</span>
                  <span>{k}</span>
                  <span className="flex-1 translate-y-[-3px] overflow-hidden whitespace-nowrap text-faint">
                    ..............................
                  </span>
                  <span className="text-paper">{v}</span>
                </motion.div>
              ))}
            </div>

            {/* Name reveal */}
            <h1 className="font-display text-[clamp(3.4rem,13vw,11rem)] font-semibold leading-[0.88] tracking-[-0.045em]">
              {[first, rest.join(" ")].map((line, i) => (
                <span key={line} className="block overflow-hidden pb-[0.06em]">
                  <motion.span
                    className={`block ${i === 1 ? "text-accent" : ""}`}
                    initial={{ y: reduce ? 0 : "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.25 + i * 0.12 }}
                  >
                    {line}
                    {i === 1 ? <span className="text-paper">.</span> : null}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* Progress */}
            <div>
              <div className="mb-3 flex items-end justify-between font-mono">
                <span className="eyebrow">{profile.role}</span>
                <span className="text-4xl tabular-nums sm:text-6xl">{String(pct).padStart(3, "0")}</span>
              </div>
              <div className="h-px w-full bg-line">
                <div className="h-px origin-left bg-accent" style={{ transform: `scaleX(${progress})` }} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
