"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/* ---------- scroll reveal ---------- */
export function Reveal({
  children,
  delay = 0,
  y = 26,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("is-in");
            io.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -7% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style: CSSProperties = {
    transitionDelay: `${delay}ms`,
    ["--reveal-y" as never]: `${y}px`,
  };

  return (
    <div ref={ref} className={`reveal ${className}`} style={style}>
      {children}
    </div>
  );
}

/* ---------- section heading ---------- */
export function SectionHead({
  k,
  label,
  title,
  sub,
  dark = false,
  center = false,
}: {
  k: string;
  label: string;
  title: ReactNode;
  sub?: ReactNode;
  dark?: boolean;
  center?: boolean;
}) {
  return (
    <div className={`mb-10 md:mb-14 ${center ? "mx-auto max-w-2xl text-center" : ""}`}>
      <Reveal>
        <div
          className={`flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.26em] ${
            dark ? "text-paper/50" : "text-ink-950/45"
          } ${center ? "justify-center" : ""}`}
        >
          <span className="h-px w-8 bg-current opacity-60" aria-hidden />
          <span>
            {k} / {label}
          </span>
        </div>
      </Reveal>
      <Reveal delay={90}>
        <h2
          className={`mt-5 text-[34px] leading-[1.05] font-semibold tracking-tight text-balance md:text-5xl ${
            dark ? "text-paper" : "text-ink-950"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {sub ? (
        <Reveal delay={170}>
          <p
            className={`mt-4 max-w-xl text-[15px] leading-relaxed ${
              dark ? "text-paper/60" : "text-ink-950/60"
            } ${center ? "mx-auto" : ""}`}
          >
            {sub}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

/* ---------- shared button classes ---------- */
export const btnPrimary =
  "group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgb(78_123_232/0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-deep active:translate-y-0";

export const btnGhostDark =
  "inline-flex items-center justify-center gap-2 rounded-full border border-paper/20 px-6 py-3 text-sm font-semibold text-paper transition-all duration-300 hover:-translate-y-0.5 hover:border-paper/40 hover:bg-paper/10 active:translate-y-0";

export const btnGhostLight =
  "inline-flex items-center justify-center gap-2 rounded-full border border-ink-950/15 px-6 py-3 text-sm font-semibold text-ink-950 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink-950/35 hover:bg-ink-950/5 active:translate-y-0";

/* ---------- grain overlay ---------- */
const NOISE_URI =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")";

export function Noise() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[90] opacity-[0.05] mix-blend-overlay"
      style={{ backgroundImage: NOISE_URI, backgroundSize: "180px 180px" }}
    />
  );
}

/* ---------- small serif italic accent ---------- */
export function Italic({ children }: { children: ReactNode }) {
  return <em className="font-serif italic font-normal tracking-normal text-accent-2">{children}</em>;
}

export function ItalicLight({ children }: { children: ReactNode }) {
  return <em className="font-serif italic font-normal tracking-normal text-ink-950">{children}</em>;
}
