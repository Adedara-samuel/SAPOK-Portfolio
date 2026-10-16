"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useTransform } from "framer-motion";
import { ArrowDown, ArrowUp, Command } from "lucide-react";
import BootScreen from "./BootScreen";
import CommandPalette from "./CommandPalette";
import StatusBar from "./StatusBar";
import { SCENES, type SceneId } from "./scenes";
import { useSceneScroll } from "./useSceneScroll";
import ProjectSheet from "@/components/work/ProjectSheet";
import IndexScene from "@/components/scenes/IndexScene";
import AboutScene from "@/components/scenes/AboutScene";
import WorkScene from "@/components/scenes/WorkScene";
import ServicesScene from "@/components/scenes/ServicesScene";
import BookScene from "@/components/scenes/BookScene";
import ContactScene from "@/components/scenes/ContactScene";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { profile, projects } from "@/data/portfolio-data";

const SCENE_COMPONENTS = {
  index: IndexScene,
  about: AboutScene,
  work: WorkScene,
  services: ServicesScene,
  book: BookScene,
  contact: ContactScene,
} as const;

const EASE = [0.76, 0, 0.24, 1] as const;

function parseHash(hash: string): { scene: SceneId; project: string | null } {
  const [scene, project] = hash.replace(/^#\/?/, "").split("/");
  const valid = SCENES.some((s) => s.id === scene) ? (scene as SceneId) : "index";
  const slug = project && projects.some((p) => p.slug === project) ? project : null;
  return { scene: slug ? "work" : valid, project: slug };
}

function isTyping(target: EventTarget | null) {
  return target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName));
}

/**
 * The portfolio as a single non-scrolling workspace. Each section is a full-viewport
 * scene; wheel (at a scene's scroll edge), keys, swipe, the dock and ⌘K move between them.
 */
export default function Workspace() {
  const reduce = useReducedMotion();
  const [booted, setBooted] = useState(false);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [project, setProject] = useState<string | null>(null);
  const [paletteOpen, setPaletteOpen] = useState(false);

  const overlayOpen = paletteOpen || project !== null;

  const scene = SCENES[index];

  const writeHash = useCallback((hash: string) => {
    if (window.location.hash !== hash) window.history.pushState(null, "", hash || window.location.pathname);
  }, []);

  const goTo = useCallback(
    (next: number) => {
      if (next < 0 || next >= SCENES.length || next === index) return;
      setDirection(next > index ? 1 : -1);
      setIndex(next);
      writeHash(next === 0 ? "" : `#${SCENES[next].id}`);
    },
    [index, writeHash],
  );

  const { mainRef, registerScroller, onScrollerScroll, getEl, pull, progress, pullDir } = useSceneScroll({
    sceneId: scene.id,
    enabled: booted && !overlayOpen,
    reduce: !!reduce,
    canGo: (dir) => Boolean(SCENES[index + dir]),
    onNavigate: (dir) => goTo(index + dir),
  });
  // Pulling past the bottom lifts the scene a little (and vice versa), like it's being drawn onward.
  const pullLift = useTransform(pull, [-1, 0, 1], [70, 0, -70]);
  const pullFill = useTransform(pull, (v) => Math.abs(v));
  const pullTarget = pullDir !== 0 ? SCENES[index + pullDir] : undefined;

  const go = useCallback((id: SceneId) => goTo(SCENES.findIndex((s) => s.id === id)), [goTo]);

  const openProject = useCallback(
    (slug: string) => {
      setProject(slug);
      writeHash(`#work/${slug}`);
    },
    [writeHash],
  );

  const closeProject = useCallback(() => {
    setProject(null);
    writeHash(scene.id === "index" ? "" : `#${scene.id}`);
  }, [scene.id, writeHash]);

  // Deep links + back/forward
  useEffect(() => {
    const sync = () => {
      const { scene: s, project: p } = parseHash(window.location.hash);
      setIndex((current) => {
        const next = SCENES.findIndex((x) => x.id === s);
        if (next !== current) setDirection(next > current ? 1 : -1);
        return next;
      });
      setProject(p);
    };
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
        return;
      }
      if (overlayOpen || isTyping(e.target) || e.metaKey || e.ctrlKey || e.altKey) return;
      const el = getEl();
      const atTop = !el || el.scrollTop <= 1;
      const atBottom = !el || el.scrollTop + el.clientHeight >= el.scrollHeight - 2;
      if (e.key === "ArrowRight" || (e.key === "ArrowDown" && atBottom) || (e.key === "PageDown" && atBottom)) {
        e.preventDefault();
        goTo(index + 1);
      } else if (e.key === "ArrowLeft" || (e.key === "ArrowUp" && atTop) || (e.key === "PageUp" && atTop)) {
        e.preventDefault();
        goTo(index - 1);
      } else if (/^[1-6]$/.test(e.key)) {
        goTo(Number(e.key) - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo, index, overlayOpen, getEl]);

  const Scene = SCENE_COMPONENTS[scene.id];
  const offset = reduce ? 0 : 60;

  return (
    <div className="grain fixed inset-0 overflow-hidden bg-ink">
      <BootScreen onDone={() => setBooted(true)} />

      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={booted ? { scale: 1, opacity: 1 } : { scale: reduce ? 1 : 1.04, opacity: 0 }}
        transition={{ duration: 1.1, ease: EASE, delay: 0.1 }}
      >
        <StatusBar scene={scene} index={index} total={SCENES.length} onPalette={() => setPaletteOpen(true)} onHome={() => goTo(0)} />

        {/* Stage */}
        <main
          className="absolute inset-x-0 bottom-[calc(64px+env(safe-area-inset-bottom))] top-14 md:bottom-0"
          ref={mainRef}
        >
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.section
              key={scene.id}
              custom={direction}
              aria-label={scene.label}
              className="absolute inset-0"
              variants={{
                enter: (d: number) => ({ y: d * offset, opacity: 0, clipPath: reduce ? "inset(0% 0 0% 0)" : d > 0 ? "inset(12% 0 0% 0)" : "inset(0% 0 12% 0)" }),
                // transitionEnd drops filter/clip-path: both would trap position:fixed children
                center: { y: 0, opacity: 1, scale: 1, filter: "blur(0px)", clipPath: "inset(0% 0 0% 0)", transitionEnd: { filter: "none", clipPath: "none" } },
                exit: (d: number) => ({ y: -d * offset * 0.5, opacity: 0, scale: reduce ? 1 : 0.96, filter: reduce ? "blur(0px)" : "blur(6px)" }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: reduce ? 0.2 : 0.85, ease: EASE }}
            >
              <motion.div className="h-full" style={{ y: pullLift }}>
                <div
                  ref={registerScroller(scene.id)}
                  onScroll={(e) => onScrollerScroll(e.currentTarget)}
                  className="scene-scroll h-full overflow-y-auto overflow-x-hidden"
                >
                  {booted ? <Scene go={go} openProject={openProject} /> : null}
                </div>
              </motion.div>
            </motion.section>
          </AnimatePresence>
        </main>

        {/* Reading progress through the current scene */}
        <motion.div aria-hidden className="absolute inset-x-0 top-14 z-40 h-px origin-left bg-accent" style={{ scaleX: progress }} />

        {/* "Keep scrolling" pull indicator */}
        <AnimatePresence>
          {pullTarget && (
            <motion.div
              key="pull"
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-none absolute bottom-[calc(84px+env(safe-area-inset-bottom))] left-1/2 z-50 w-60 -translate-x-1/2 overflow-hidden rounded-full border border-line bg-surface/90 shadow-2xl shadow-black/40 backdrop-blur-xl md:bottom-24"
            >
              <motion.span aria-hidden className="absolute inset-0 origin-left bg-accent/20" style={{ scaleX: pullFill }} />
              <span className="relative flex items-center justify-center gap-2 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-paper">
                {pullDir > 0 ? <ArrowDown className="size-3.5 text-accent" /> : <ArrowUp className="size-3.5 text-accent" />}
                {pullDir > 0 ? "Keep scrolling" : "Keep going"}
                <span className="text-accent">· {pullTarget.label}</span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop dock */}
        <nav
          aria-label="Sections"
          className="pointer-events-none absolute inset-x-0 bottom-5 z-40 hidden justify-center md:flex"
        >
          <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-line bg-surface/80 p-1.5 shadow-2xl shadow-black/40 backdrop-blur-xl">
            {SCENES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => goTo(i)}
                aria-current={i === index ? "page" : undefined}
                className="relative rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-paper aria-[current=page]:text-accent-ink"
              >
                {i === index && (
                  <motion.span layoutId="dock-active" className="absolute inset-0 rounded-full bg-accent" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                )}
                <span className="relative">
                  <span className="mr-1.5 opacity-60">0{i + 1}</span>
                  {s.label}
                </span>
              </button>
            ))}
            <span className="mx-1 h-5 w-px bg-line" />
            <button
              onClick={() => setPaletteOpen(true)}
              aria-label="Open command menu"
              className="flex items-center gap-1 rounded-full px-3 py-2 font-mono text-[11px] text-muted hover:text-paper"
            >
              <Command className="size-3.5" />K
            </button>
          </div>
        </nav>

        {/* WhatsApp — reachable from every scene */}
        <a
          href={profile.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Message me on WhatsApp"
          className="group absolute bottom-[calc(80px+env(safe-area-inset-bottom))] right-4 z-40 flex items-center gap-2 rounded-full bg-[#25D366] p-3 text-[#062a14] shadow-xl shadow-black/40 transition hover:brightness-105 md:bottom-6 md:left-6 md:right-auto"
        >
          <WhatsAppIcon className="size-6" />
          <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-500 group-hover:max-w-40 group-hover:pr-1 md:inline">
            Chat on WhatsApp
          </span>
        </a>

        {/* Desktop progress rail */}
        <div className="absolute right-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex">
          <button onClick={() => goTo(index - 1)} disabled={index === 0} aria-label="Previous section" className="text-muted transition hover:text-accent disabled:opacity-20">
            <ArrowUp className="size-4" />
          </button>
          {SCENES.map((s, i) => (
            <button key={s.id} onClick={() => goTo(i)} aria-label={s.label} className="group flex h-4 items-center">
              <span className={`block w-px transition-all duration-500 ${i === index ? "h-4 bg-accent" : "h-2 bg-faint group-hover:bg-paper"}`} />
            </button>
          ))}
          <button onClick={() => goTo(index + 1)} disabled={index === SCENES.length - 1} aria-label="Next section" className="text-muted transition hover:text-accent disabled:opacity-20">
            <ArrowDown className="size-4" />
          </button>
        </div>

        {/* Mobile tab bar */}
        <nav
          aria-label="Sections"
          className="absolute inset-x-0 bottom-0 z-40 border-t border-line bg-ink/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden"
        >
          <div className="grid h-16 grid-cols-6">
            {SCENES.map((s, i) => {
              const Icon = s.icon;
              const active = i === index;
              return (
                <button
                  key={s.id}
                  onClick={() => goTo(i)}
                  aria-current={active ? "page" : undefined}
                  className={`relative flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors ${active ? "text-accent" : "text-muted"}`}
                >
                  {active && <motion.span layoutId="tab-active" className="absolute top-0 h-0.5 w-8 rounded-full bg-accent" />}
                  <Icon className="size-4.5" strokeWidth={active ? 2.2 : 1.6} />
                  {s.label}
                </button>
              );
            })}
          </div>
        </nav>
      </motion.div>

      <ProjectSheet slug={project} onClose={closeProject} onOpen={openProject} />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} go={go} openProject={openProject} />
    </div>
  );
}
