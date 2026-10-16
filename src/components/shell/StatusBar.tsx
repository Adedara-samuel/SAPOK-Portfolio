"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Search, Sun } from "lucide-react";
import { profile } from "@/data/portfolio-data";
import Logo from "@/components/Logo";
import type { SceneMeta } from "./scenes";

function lagosTime() {
  return new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: profile.timezone }).format(new Date());
}

export default function StatusBar({
  scene,
  index,
  total,
  onPalette,
  onHome,
}: {
  scene: SceneMeta;
  index: number;
  total: number;
  onPalette: () => void;
  onHome: () => void;
}) {
  const { resolvedTheme, setTheme } = useTheme();
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(lagosTime());
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 20_000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

  return (
    <header className="absolute inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-line/60 bg-ink/80 px-4 backdrop-blur-xl sm:px-6">
      <button onClick={onHome} className="flex items-center gap-2.5" aria-label="Go to home">
        <Logo className="size-7" />
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-paper">{profile.brand}</span>
      </button>

      <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted md:flex">
        <span className="tabular-nums text-paper">
          {String(index + 1).padStart(2, "0")}
          <span className="text-faint"> / {String(total).padStart(2, "0")}</span>
        </span>
        <span className="h-px w-6 bg-line" />
        <span className="relative inline-flex h-4 w-24 overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={scene.id}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
              className="absolute"
            >
              {scene.label}
            </motion.span>
          </AnimatePresence>
        </span>
      </div>

      <div className="flex items-center gap-1 sm:gap-3">
        <span className="hidden items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted sm:flex">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-ok opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-ok" />
          </span>
          Available
        </span>
        <span className="hidden font-mono text-[11px] tabular-nums text-muted lg:inline" suppressHydrationWarning>
          LOS {time ?? "--:--"}
        </span>
        <button onClick={onPalette} aria-label="Search" className="grid size-9 place-items-center rounded-full text-muted transition hover:text-paper md:hidden">
          <Search className="size-4" />
        </button>
        <button
          onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
          aria-label="Toggle colour theme"
          className="grid size-9 place-items-center rounded-full text-muted transition hover:text-paper"
        >
          <Sun className="hidden size-4 [.light_&]:block" />
          <Moon className="size-4 [.light_&]:hidden" />
        </button>
      </div>
    </header>
  );
}
