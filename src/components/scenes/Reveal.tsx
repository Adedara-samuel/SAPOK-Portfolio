"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Staggered entrance used by every scene; delay is in steps of ~70ms. */
export function Reveal({
  children,
  step = 0,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  step?: number;
  className?: string;
  as?: "div" | "li" | "p" | "span";
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.35 + step * 0.07 }}
    >
      {children}
    </Tag>
  );
}

/** Line-masked headline: each line slides up from behind its own clip. */
export function MaskedLines({ lines, className, accentIndex }: { lines: string[]; className?: string; accentIndex?: number }) {
  const reduce = useReducedMotion();
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={line} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className={`block ${i === accentIndex ? "text-accent" : ""}`}
            initial={{ y: reduce ? 0 : "105%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.25 + i * 0.09 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function SceneHeader({ index, eyebrow, lines, accentIndex, aside }: { index: string; eyebrow: string; lines: string[]; accentIndex?: number; aside?: React.ReactNode }) {
  return (
    <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
      <div>
        <Reveal className="eyebrow mb-5 flex items-center gap-3">
          <span className="text-accent">{index}</span>
          <span className="h-px w-8 bg-line" />
          {eyebrow}
        </Reveal>
        <h2 className="scene-title">
          <MaskedLines lines={lines} accentIndex={accentIndex} />
        </h2>
      </div>
      {aside ? <Reveal step={3} className="max-w-sm">{aside}</Reveal> : null}
    </div>
  );
}

export const scenePad = "mx-auto w-full max-w-7xl px-5 pb-28 pt-10 sm:px-10 md:pt-14 md:pb-32";
