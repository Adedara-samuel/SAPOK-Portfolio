"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { sendEmail } from "@/lib/email";
import { Reveal, SceneHeader, scenePad } from "./Reveal";

const SLOTS = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00"];
const DAYS = ["S", "M", "T", "W", "T", "F", "S"];
const STORAGE_KEY = "sapok:requested-slots";

// Local calendar date key. toISOString() would convert to UTC and shift dates in WAT (UTC+1).
const dateKey = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

const label12 = (slot: string) => {
  const h = Number(slot.slice(0, 2));
  return `${h % 12 || 12}:00 ${h < 12 ? "AM" : "PM"}`;
};

function readRequested(): string[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export default function BookScene() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [view, setView] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [date, setDate] = useState<Date | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  // Slots this browser already requested — a courtesy guard against double-sending, not a global lock.
  const [requested, setRequested] = useState<string[]>(readRequested);
  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "" });
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const year = view.getFullYear();
  const month = view.getMonth();
  const lead = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [...Array(lead).fill(null), ...Array.from({ length: days }, (_, i) => new Date(year, month, i + 1))];
  const canGoBack = view > new Date(today.getFullYear(), today.getMonth(), 1);

  const isClosed = (d: Date) => d < today || d.getDay() === 0;
  const isTaken = (d: Date, s: string) => requested.includes(`${dateKey(d)} ${s}`);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !slot) return;
    setState("sending");
    const when = `${date.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })} at ${label12(slot)} (WAT)`;
    try {
      await sendEmail({
        name: form.name,
        email: form.email,
        phone: form.phone,
        subject: `Call request — ${when}`,
        message: `New call request\n\nWhen: ${when}\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone || "—"}\n\nNotes:\n${form.notes || "—"}`,
      });
      const next = [...requested, `${dateKey(date)} ${slot}`];
      setRequested(next);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
      setState("sent");
    } catch {
      setState("error");
    }
  };

  const reset = () => {
    setDate(null);
    setSlot(null);
    setForm({ name: "", email: "", phone: "", notes: "" });
    setState("idle");
  };

  return (
    <div className={scenePad}>
      <SceneHeader
        index="05"
        eyebrow="Book a call"
        lines={["Pick a time.", "Let's talk."]}
        accentIndex={1}
        aside={<p className="leading-relaxed text-muted">30 minutes, Monday to Saturday, 9 AM – 4 PM Lagos time. I&apos;ll confirm by email.</p>}
      />

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Calendar */}
        <Reveal step={2} className="rounded-3xl border border-line bg-surface/60 p-5 sm:p-7">
          <div className="mb-6 flex items-center justify-between">
            <span className="font-display text-2xl font-semibold tracking-tight">
              {view.toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
            </span>
            <div className="flex gap-1">
              <button
                aria-label="Previous month"
                disabled={!canGoBack}
                onClick={() => setView(new Date(year, month - 1, 1))}
                className="grid size-9 place-items-center rounded-full border border-line text-muted transition hover:text-paper disabled:opacity-30"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                aria-label="Next month"
                onClick={() => setView(new Date(year, month + 1, 1))}
                className="grid size-9 place-items-center rounded-full border border-line text-muted transition hover:text-paper"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center font-mono text-[10px] uppercase tracking-widest text-faint">
            {DAYS.map((d, i) => (
              <span key={i} className="py-2">
                {d}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {cells.map((d, i) =>
              d ? (
                <button
                  key={dateKey(d)}
                  disabled={isClosed(d)}
                  onClick={() => {
                    setDate(d);
                    setSlot(null);
                    setState("idle");
                  }}
                  aria-pressed={date ? dateKey(d) === dateKey(date) : false}
                  aria-label={d.toDateString()}
                  className={`relative aspect-square rounded-xl text-sm tabular-nums transition sm:text-base ${
                    date && dateKey(d) === dateKey(date)
                      ? "bg-accent font-semibold text-accent-ink"
                      : isClosed(d)
                        ? "text-faint/50"
                        : "text-paper hover:bg-raised"
                  }`}
                >
                  {d.getDate()}
                  {dateKey(d) === dateKey(today) && <span className="absolute bottom-1.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-current" />}
                </button>
              ) : (
                <span key={`blank-${i}`} />
              ),
            )}
          </div>
        </Reveal>

        {/* Slot + details */}
        <Reveal step={3} className="rounded-3xl border border-line bg-surface/60 p-5 sm:p-7">
          <AnimatePresence mode="wait">
            {state === "sent" ? (
              <motion.div key="sent" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex h-full flex-col justify-center py-10 text-center">
                <span className="mx-auto grid size-14 place-items-center rounded-full bg-accent text-accent-ink">
                  <Check className="size-6" />
                </span>
                <h3 className="mt-6 font-display text-3xl font-semibold tracking-tight">Request sent.</h3>
                <p className="mt-2 text-muted">I&apos;ll reply to {form.email || "your email"} to confirm the time.</p>
                <button onClick={reset} className="btn-ghost mx-auto mt-8">
                  Book another
                </button>
              </motion.div>
            ) : !date ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex h-full min-h-60 flex-col justify-center text-center">
                <p className="eyebrow">Step 1</p>
                <p className="mt-3 text-lg text-muted">Choose a day on the calendar.</p>
              </motion.div>
            ) : (
              <motion.div key={dateKey(date)} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <p className="eyebrow">{date.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}</p>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {SLOTS.map((s) => {
                    const taken = isTaken(date, s);
                    return (
                      <button
                        key={s}
                        disabled={taken}
                        onClick={() => setSlot(s)}
                        aria-pressed={slot === s}
                        className={`rounded-xl border py-2.5 font-mono text-xs transition ${
                          slot === s ? "border-accent bg-accent text-accent-ink" : taken ? "border-line text-faint line-through" : "border-line hover:border-paper/50"
                        }`}
                      >
                        {label12(s)}
                      </button>
                    );
                  })}
                </div>

                {slot && (
                  <form onSubmit={submit} className="mt-6 space-y-1">
                    <input required className="field" placeholder="Your name" aria-label="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    <input required type="email" className="field" placeholder="Email" aria-label="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    <input type="tel" className="field" placeholder="Phone (optional)" aria-label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                    <textarea rows={2} className="field resize-none" placeholder="What would you like to discuss?" aria-label="Notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
                    {state === "error" && <p className="pt-2 text-sm text-red-400">Couldn&apos;t send that — please try again or use the contact page.</p>}
                    <div className="pt-5">
                      <button type="submit" disabled={state === "sending"} className="btn-accent w-full">
                        {state === "sending" ? <Loader2 className="size-4 animate-spin" /> : <>Request {label12(slot)} <ArrowRight className="size-4" /></>}
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </div>
  );
}
