// Adedara Sapok mark: a geometric S (two arcs joined by straight runs) on a deep-blue tile,
// finished with an orange "pixel" at the stroke's end — engineering precision with a designer's cursor.
export const LOGO_S_PATH = "M45 15 H28 a8.5 8.5 0 0 0 0 17 h8 a8.5 8.5 0 0 1 0 17 H19";

export default function Logo({ className, title = "Adedara Sapok" }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label={title}>
      <rect width="64" height="64" rx="15" fill="#0f1f4d" />
      <path d={LOGO_S_PATH} fill="none" stroke="#eef2fb" strokeWidth="6.5" strokeLinejoin="round" />
      <rect x="45" y="11.75" width="6.5" height="6.5" fill="#ff6b3d" />
    </svg>
  );
}
