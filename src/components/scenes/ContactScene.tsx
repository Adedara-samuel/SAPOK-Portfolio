"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy, Github, Linkedin, Loader2, Send, Twitter } from "lucide-react";
import { profile } from "@/data/portfolio-data";
import { sendEmail } from "@/lib/email";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { Reveal, SceneHeader, scenePad } from "./Reveal";

const socials = [
  { label: "WhatsApp", href: profile.whatsappHref, icon: WhatsAppIcon },
  { label: "GitHub", href: profile.socials.github, icon: Github },
  { label: "LinkedIn", href: profile.socials.linkedin, icon: Linkedin },
  { label: "Twitter / X", href: profile.socials.twitter, icon: Twitter },
  { label: "Pinterest", href: profile.socials.pinterest, icon: ArrowUpRight },
];

export default function ContactScene() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");
    try {
      await sendEmail(form);
      setState("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setState("error");
    }
  };

  return (
    <div className={scenePad}>
      <SceneHeader index="06" eyebrow="Contact" lines={["Have something", "worth building?"]} accentIndex={1} />

      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <Reveal step={2}>
            <a href={`mailto:${profile.email}`} className="group block break-all font-display text-[clamp(1.6rem,4vw,3rem)] font-semibold tracking-tight transition hover:text-accent">
              {profile.email}
            </a>
            <button onClick={copy} className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted hover:text-paper">
              {copied ? <Check className="size-3.5 text-ok" /> : <Copy className="size-3.5" />}
              {copied ? "Copied" : "Copy address"}
            </button>
          </Reveal>

          <Reveal step={3} className="mt-10">
            <a
              href={profile.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 rounded-2xl bg-[#25D366] p-5 text-[#062a14] transition hover:brightness-105"
            >
              <span className="flex items-center gap-4">
                <WhatsAppIcon className="size-8" />
                <span>
                  <span className="block font-semibold">Message me on WhatsApp</span>
                  <span className="block text-sm opacity-80">{profile.whatsapp} · usually replies within hours</span>
                </span>
              </span>
              <ArrowUpRight className="size-5 transition group-hover:rotate-45" />
            </a>
          </Reveal>

          <Reveal step={4} className="mt-3 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
            <div className="bg-ink p-5">
              <span className="eyebrow block">Call</span>
              <a href={profile.phoneHref} className="mt-2 block transition hover:text-accent">
                {profile.phone}
              </a>
              <a href={profile.phone2Href} className="mt-1 block transition hover:text-accent">
                {profile.phone2}
              </a>
            </div>
            <div className="bg-ink p-5">
              <span className="eyebrow block">Based in</span>
              <span className="mt-2 block">{profile.location}</span>
            </div>
          </Reveal>

          <Reveal step={5} className="mt-10">
            <span className="eyebrow">Elsewhere</span>
            <ul className="mt-3 divide-y divide-line border-y border-line">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between py-4">
                    <span className="flex items-center gap-3">
                      <s.icon className="size-4 text-muted" />
                      {s.label}
                    </span>
                    <ArrowUpRight className="size-4 text-muted transition group-hover:rotate-45 group-hover:text-accent" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal step={3} className="rounded-3xl border border-line bg-surface/60 p-6 sm:p-8">
          {state === "sent" ? (
            <div className="flex min-h-80 flex-col items-center justify-center text-center">
              <span className="grid size-14 place-items-center rounded-full bg-accent text-accent-ink">
                <Check className="size-6" />
              </span>
              <h3 className="mt-6 font-display text-3xl font-semibold tracking-tight">Message sent.</h3>
              <p className="mt-2 text-muted">Thanks — I usually reply within a day.</p>
              <button onClick={() => setState("idle")} className="btn-ghost mt-8">
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-1">
              <p className="eyebrow mb-4">Or drop a message</p>
              <div className="grid gap-x-6 sm:grid-cols-2">
                <input required className="field" placeholder="Name" aria-label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <input required type="email" className="field" placeholder="Email" aria-label="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <input required className="field" placeholder="Subject" aria-label="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
              <textarea required rows={5} className="field resize-none" placeholder="Tell me about the project…" aria-label="Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              {state === "error" && <p className="pt-2 text-sm text-red-400">Couldn&apos;t send that. Please email me directly instead.</p>}
              <div className="pt-6">
                <button type="submit" disabled={state === "sending"} className="btn-accent">
                  {state === "sending" ? <Loader2 className="size-4 animate-spin" /> : <>Send message <Send className="size-4" /></>}
                </button>
              </div>
            </form>
          )}
        </Reveal>
      </div>

      <Reveal step={6} className="mt-20 flex flex-col justify-between gap-2 border-t border-line pt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-faint sm:flex-row">
        <span>© {new Date().getFullYear()} {profile.brand} · {profile.name}</span>
        <span>Designed &amp; engineered in Lagos</span>
      </Reveal>
    </div>
  );
}
