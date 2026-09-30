import { useEffect, useState } from "react";
import { Menu, X, Play, ArrowUpRight } from "lucide-react";
import { cn } from "@/utils/cn";

const links = [
  { id: "overview", label: "Overview" },
  { id: "categories", label: "Categories" },
  { id: "how-it-works", label: "How It Works" },
  { id: "cs-concepts", label: "CS Concepts" },
  { id: "architecture", label: "Architecture" },
  { id: "security", label: "Security" },
  { id: "future", label: "Future" },
];

export const demos = [
  {
    role: "CEO & Product / Technology",
    focus: "Home, overall workflow and system architecture",
    stops: [
      { id: "overview", label: "Overview" },
      { id: "how-it-works", label: "System workflow" },
      { id: "architecture", label: "Architecture" },
    ],
  },
  {
    role: "Marketing & Business Development",
    focus: "Digital marketing dashboard and provider acquisition",
    stops: [
      { id: "marketing", label: "Marketing data" },
      { id: "providers", label: "Provider system" },
    ],
  },
  {
    role: "Large Events",
    focus: "Search, filtering and the venue gallery",
    stops: [
      { id: "journey", label: "User journey" },
      { id: "search", label: "Search & filtering" },
      { id: "categories", label: "Venue gallery" },
    ],
  },
  {
    role: "Catering & Decoration",
    focus: "Multi-service customization",
    stops: [{ id: "customize", label: "Event plan builder" }],
  },
  {
    role: "Sports & Recreation",
    focus: "Availability and time-slot booking",
    stops: [{ id: "booking", label: "Futsal slot booking" }],
  },
  {
    role: "Accommodation & Hospitality",
    focus: "Database-driven listings and search",
    stops: [{ id: "database", label: "Database concept" }],
  },
  {
    role: "Finance",
    focus: "Business data, transaction concepts and scalability",
    stops: [
      { id: "transactions", label: "Transactions" },
      { id: "scalability", label: "Scalability" },
    ],
  },
];

export function go(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("overview");
  const [open, setOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (y / h) * 100 : 0);
      const marker = window.innerHeight * 0.35;
      let current = "";
      for (const l of links) {
        const el = document.getElementById(l.id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= marker && r.bottom > marker) current = l.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDemoOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-white/[0.06] bg-ink/75 backdrop-blur-xl"
            : "bg-transparent"
        )}
      >
          <div className="mx-auto flex h-20 max-w-[1240px] items-center justify-between gap-4 px-6 sm:px-8 lg:h-24">
          <button
            onClick={() => go("overview")}
            className="flex shrink-0 items-center gap-3"
            aria-label="VEYA home"
          >
            <Logo />
            <span className="text-lg font-semibold tracking-[0.22em] text-white">
              VEYA
            </span>
          </button>

          <nav className="hidden items-center gap-0 xl:flex">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors",
                  active === l.id
                    ? "text-white"
                    : "text-white/55 hover:text-white"
                )}
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setDemoOpen(true)}
              className="group inline-flex items-center gap-2 rounded-full bg-[#4b79e8] px-5 py-2.5 text-[13px] font-semibold text-white shadow-[0_12px_25px_-14px_rgba(75,121,232,0.85)] transition hover:bg-[#6088ee]"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              Demo
            </button>
            <button
              onClick={() => setOpen((o) => !o)}
              className="rounded-full p-2 text-slate-300 hover:bg-white/5 xl:hidden"
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        <div className="h-px w-full bg-transparent">
          <div
            className="h-px bg-gradient-to-r from-accent/0 via-accent to-accent-soft transition-[width] duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>

        {open && (
          <div className="fade-in border-t border-white/[0.06] bg-ink/95 px-5 py-4 backdrop-blur-xl xl:hidden">
            <div className="grid grid-cols-2 gap-1.5">
              {links.map((l) => (
                <button
                  key={l.id}
                  onClick={() => {
                    go(l.id);
                    setOpen(false);
                  }}
                  className={cn(
                    "rounded-xl px-3 py-2.5 text-left text-sm font-medium",
                    active === l.id
                      ? "bg-white/[0.07] text-white"
                      : "text-slate-400"
                  )}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {demoOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-ink/70 p-4 backdrop-blur-md sm:items-center"
          onClick={() => setDemoOpen(false)}
        >
          <div
            className="fade-in relative w-full max-w-3xl rounded-3xl border border-white/10 bg-navy p-6 shadow-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setDemoOpen(false)}
              className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-white/5 hover:text-white"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-accent-soft">
              Presentation guide
            </p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">
              Live demonstrations by presenter
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Each role links to the interactive part of the case study it explains. Select a stop to jump there.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {demos.map((d, i) => (
                <div
                  key={d.role}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-slate-500">
                      0{i + 1}
                    </span>
                    <span className="text-sm font-semibold text-white">
                      {d.role}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-400">{d.focus}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {d.stops.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => {
                          setDemoOpen(false);
                          setTimeout(() => go(s.id), 50);
                        }}
                        className="inline-flex items-center gap-1 rounded-full border border-white/10 px-2.5 py-1 text-xs text-slate-300 transition hover:border-accent hover:text-white"
                      >
                        {s.label}
                        <ArrowUpRight className="h-3 w-3" />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 34 40"
      className={cn("h-9 w-8", className)}
      fill="none"
      aria-hidden
    >
      <path
        d="M3 7.5 17 36 31 7.5"
        stroke="#f8f8f7"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="17" cy="5" r="2.7" fill="#789cf4" />
    </svg>
  );
}
