import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowDown, ArrowRight, Mic } from "lucide-react";
import { cn } from "@/utils/cn";

export type Tone = "dark" | "light";

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={cn("reveal", inView && "in", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function Section({
  id,
  tone = "dark",
  children,
  className,
  grid = false,
}: {
  id?: string;
  tone?: Tone;
  children: ReactNode;
  className?: string;
  grid?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden py-24 sm:py-32",
        tone === "dark" ? "bg-ink text-slate-100" : "bg-paper text-slate-900",
        className
      )}
    >
      {grid && (
        <div
          className={cn(
            "pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]",
            tone === "dark" ? "grid-bg" : "grid-bg-light"
          )}
        />
      )}
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">{children}</div>
    </section>
  );
}

export function Eyebrow({
  children,
  tone = "dark",
}: {
  children: ReactNode;
  tone?: Tone;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em]",
        tone === "dark"
          ? "border-white/10 bg-white/[0.03] text-accent-soft"
          : "border-slate-900/10 bg-white text-accent"
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      {children}
    </div>
  );
}

export function PresenterTag({
  role,
  tone = "dark",
}: {
  role: string;
  tone?: Tone;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium",
        tone === "dark"
          ? "bg-white/[0.04] text-slate-400 ring-1 ring-white/10"
          : "bg-slate-900/[0.04] text-slate-500 ring-1 ring-slate-900/10"
      )}
    >
      <Mic className="h-3 w-3" />
      Presenter · {role}
    </div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  lead,
  tone = "dark",
  presenter,
  align = "left",
  number,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  tone?: Tone;
  presenter?: string;
  align?: "left" | "center";
  number?: string;
}) {
  return (
    <Reveal
      className={cn(
        "mb-14 max-w-3xl",
        align === "center" && "mx-auto text-center"
      )}
    >
      <div
        className={cn(
          "flex flex-wrap items-center gap-2",
          align === "center" && "justify-center"
        )}
      >
        {number && (
          <span
            className={cn(
              "font-mono text-xs",
              tone === "dark" ? "text-slate-500" : "text-slate-400"
            )}
          >
            {number}
          </span>
        )}
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        {presenter && <PresenterTag role={presenter} tone={tone} />}
      </div>
      <h2
        className={cn(
          "mt-5 text-3xl font-semibold tracking-tight sm:text-5xl sm:leading-[1.08]",
          tone === "dark" ? "text-white" : "text-slate-900"
        )}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed sm:text-lg",
            tone === "dark" ? "text-slate-400" : "text-slate-600"
          )}
        >
          {lead}
        </p>
      )}
    </Reveal>
  );
}

export function Card({
  children,
  className,
  tone = "dark",
}: {
  children: ReactNode;
  className?: string;
  tone?: Tone;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border",
        tone === "dark"
          ? "border-white/[0.08] bg-navy-2/60 shadow-[0_1px_0_rgba(255,255,255,0.04)_inset,0_20px_40px_-24px_rgba(0,0,0,0.6)]"
          : "border-slate-900/[0.08] bg-white shadow-[0_20px_40px_-28px_rgba(15,23,42,0.25)]",
        className
      )}
    >
      {children}
    </div>
  );
}

export function DownArrow({
  tone = "dark",
  className,
  animated = true,
}: {
  tone?: Tone;
  className?: string;
  animated?: boolean;
}) {
  return (
    <div className={cn("flex justify-center py-1.5", className)}>
      <div className="relative flex h-7 w-5 flex-col items-center overflow-hidden">
        <div
          className={cn(
            "absolute inset-y-0 w-px",
            tone === "dark" ? "bg-white/15" : "bg-slate-900/15"
          )}
        />
        {animated && (
          <div className="flow-dot absolute h-3 w-px bg-gradient-to-b from-transparent via-accent to-transparent" />
        )}
        <ArrowDown
          className={cn(
            "absolute bottom-0 h-3 w-3",
            tone === "dark" ? "text-slate-500" : "text-slate-400"
          )}
        />
      </div>
    </div>
  );
}

export function RightArrow({ tone = "dark" }: { tone?: Tone }) {
  return (
    <ArrowRight
      className={cn(
        "h-4 w-4 shrink-0",
        tone === "dark" ? "text-slate-600" : "text-slate-400"
      )}
    />
  );
}

export function Note({
  children,
  tone = "dark",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-xl border px-4 py-3 text-sm leading-relaxed",
        tone === "dark"
          ? "border-accent/20 bg-accent/[0.06] text-slate-300"
          : "border-accent/20 bg-accent/[0.05] text-slate-700",
        className
      )}
    >
      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
      <div>{children}</div>
    </div>
  );
}

export function Pill({
  children,
  active,
  onClick,
  tone = "dark",
  className,
}: {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
  tone?: Tone;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all",
        active
          ? "border-accent bg-accent text-white shadow-[0_8px_20px_-8px_rgba(75,123,245,0.7)]"
          : tone === "dark"
            ? "border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/25 hover:text-white"
            : "border-slate-900/10 bg-white text-slate-600 hover:border-slate-900/25 hover:text-slate-900",
        className
      )}
    >
      {children}
    </button>
  );
}
