"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { ArrowUpRight, CornerDownLeft, FileText, Mail, Palette, Phone, Search } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { profile, projects } from "@/data/portfolio-data";
import { SCENES, type SceneId } from "./scenes";

interface Item {
  id: string;
  group: string;
  label: string;
  hint?: string;
  icon: React.ComponentType<{ className?: string }>;
  run: () => void;
}

export default function CommandPalette({
  open,
  onClose,
  go,
  openProject,
}: {
  open: boolean;
  onClose: () => void;
  go: (id: SceneId) => void;
  openProject: (slug: string) => void;
}) {
  const { resolvedTheme, setTheme } = useTheme();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const items = useMemo<Item[]>(
    () => [
      ...SCENES.map((s, i) => ({ id: `scene-${s.id}`, group: "Go to", label: s.label, hint: String(i + 1), icon: s.icon, run: () => go(s.id) })),
      ...projects.map((p) => ({ id: `p-${p.slug}`, group: "Projects", label: p.title, hint: p.category, icon: ArrowUpRight, run: () => openProject(p.slug) })),
      { id: "cv", group: "Actions", label: "Open CV", icon: FileText, run: () => window.open("/cv", "_blank", "noopener") },
      { id: "whatsapp", group: "Actions", label: "Message on WhatsApp", hint: profile.whatsapp, icon: WhatsAppIcon, run: () => window.open(profile.whatsappHref, "_blank", "noopener") },
      { id: "call", group: "Actions", label: `Call ${profile.phone2}`, icon: Phone, run: () => (window.location.href = profile.phone2Href) },
      { id: "mail", group: "Actions", label: `Email ${profile.email}`, icon: Mail, run: () => (window.location.href = `mailto:${profile.email}`) },
      { id: "theme", group: "Actions", label: `Switch to ${resolvedTheme === "light" ? "dark" : "light"} theme`, icon: Palette, run: () => setTheme(resolvedTheme === "light" ? "dark" : "light") },
    ],
    [go, openProject, resolvedTheme, setTheme],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => `${i.label} ${i.hint ?? ""} ${i.group}`.toLowerCase().includes(q));
  }, [items, query]);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => {
      setQuery("");
      setActive(0);
      inputRef.current?.focus();
    }, 0);
    return () => clearTimeout(t);
  }, [open]);

  const execute = (item: Item | undefined) => {
    if (!item) return;
    onClose();
    item.run();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") execute(filtered[active]);
  };

  let lastGroup = "";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-start justify-center bg-ink/60 px-4 pt-[12vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl shadow-black/50"
            initial={{ y: 16, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 8, scale: 0.98, opacity: 0 }}
            transition={{ type: "spring", stiffness: 420, damping: 34 }}
            onMouseDown={(e) => e.stopPropagation()}
            onKeyDown={onKeyDown}
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search className="size-4 text-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                placeholder="Jump to a section or project…"
                className="h-14 flex-1 bg-transparent text-paper outline-none placeholder:text-faint"
                aria-label="Search"
              />
              <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-muted">ESC</kbd>
            </div>
            <ul className="scene-scroll max-h-[50vh] overflow-y-auto p-2" role="listbox">
              {filtered.length === 0 && <li className="px-3 py-8 text-center text-sm text-muted">Nothing matches “{query}”.</li>}
              {filtered.map((item, i) => {
                const header = item.group !== lastGroup ? (lastGroup = item.group) : null;
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    {header && <div className="eyebrow px-3 pb-1 pt-3">{header}</div>}
                    <button
                      role="option"
                      aria-selected={i === active}
                      onMouseMove={() => setActive(i)}
                      onClick={() => execute(item)}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-paper aria-selected:bg-raised"
                    >
                      <Icon className="size-4 text-muted" />
                      <span className="flex-1 truncate">{item.label}</span>
                      {item.hint && <span className="font-mono text-[10px] uppercase tracking-wider text-faint">{item.hint}</span>}
                      {i === active && <CornerDownLeft className="size-3.5 text-accent" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
