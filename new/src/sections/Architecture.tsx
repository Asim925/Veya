import { useState } from "react";
import { Globe, Smartphone, Monitor, Plug, KeyRound, Search, CalendarCheck, Clock, Boxes, Users, LayoutList, BookOpen, Wrench, CalendarDays, Cloud, Lock, Server, Database, HardDrive } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Section, SectionHeader, Reveal } from "@/components/ui";
import { cn } from "@/utils/cn";

type Layer = {
  key: string;
  name: string;
  icon: LucideIcon;
  desc: string;
  items: { i: LucideIcon; t: string }[];
  link?: string;
};

const layers: Layer[] = [
  {
    key: "client",
    name: "Client",
    icon: Globe,
    desc: "The device the user is on. Requests are sent over HTTPS, which encrypts data in transit.",
    items: [
      { i: Globe, t: "Web Browser" },
      { i: Smartphone, t: "Mobile App" },
    ],
    link: "HTTPS",
  },
  {
    key: "frontend",
    name: "Frontend",
    icon: Monitor,
    desc: "The user interface — pages, forms, search and booking screens. It displays data and captures input.",
    items: [{ i: Monitor, t: "User Interface" }],
    link: "requests",
  },
  {
    key: "api",
    name: "API Layer",
    icon: Plug,
    desc: "A defined set of endpoints that lets the frontend talk to backend services in a consistent format.",
    items: [{ i: Plug, t: "REST / JSON endpoints" }],
    link: "calls",
  },
  {
    key: "backend",
    name: "Backend",
    icon: Server,
    desc: "Application logic split into modules. Each module handles one responsibility of the platform.",
    items: [
      { i: KeyRound, t: "Authentication" },
      { i: Search, t: "Search" },
      { i: CalendarCheck, t: "Booking Logic" },
      { i: Clock, t: "Availability" },
      { i: Boxes, t: "Service Management" },
    ],
    link: "queries",
  },
  {
    key: "database",
    name: "Database",
    icon: Database,
    desc: "Persistent storage for all structured data. The backend reads and writes records here.",
    items: [
      { i: Users, t: "Users" },
      { i: LayoutList, t: "Listings" },
      { i: BookOpen, t: "Bookings" },
      { i: Wrench, t: "Services" },
      { i: CalendarDays, t: "Availability" },
    ],
    link: "hosted on",
  },
  {
    key: "cloud",
    name: "Cloud Infrastructure",
    icon: Cloud,
    desc: "Rented servers, storage and networking from a cloud provider. It allows the system to run reliably and scale.",
    items: [
      { i: Server, t: "Compute" },
      { i: HardDrive, t: "Storage" },
      { i: Lock, t: "Networking & security" },
    ],
  },
];



export default function Architecture() {
  const [sel, setSel] = useState("backend");
  const L = layers.find((l) => l.key === sel)!;

  return (
    <Section id="architecture" grid>
      <div className="pointer-events-none absolute left-1/4 top-1/2 h-[500px] w-[600px] -translate-y-1/2 rounded-full bg-accent/10 blur-[140px]" />
      <SectionHeader
        number="12"
        eyebrow="System Architecture"
        presenter="CEO"
        title="The layers behind the interface."
        lead="A layered architecture separates responsibilities. Each layer only communicates with its neighbours, which makes the system easier to build, secure and scale."
      />

      <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        <Reveal>
          <div className="relative">
            {layers.map((l, idx) => {
              const on = sel === l.key;
              return (
                <div key={l.key}>
                  <button
                    onClick={() => setSel(l.key)}
                    onMouseEnter={() => setSel(l.key)}
                    className={cn(
                      "group relative w-full overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 sm:p-5",
                      on
                        ? "border-accent/70 bg-gradient-to-r from-accent/15 to-navy-2/80 shadow-[0_24px_50px_-24px_rgba(75,123,245,0.7)]"
                        : "border-white/[0.08] bg-navy-2/60 hover:border-white/20",
                      l.key === "cloud" && !on && "border-dashed"
                    )}
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                      <div className="flex min-w-[170px] items-center gap-3">
                        <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl transition", on ? "bg-accent text-white" : "bg-white/5 text-slate-400")}>
                          <l.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-mono text-[10px] uppercase tracking-wider text-slate-500">Layer {idx + 1}</div>
                          <div className="text-sm font-semibold uppercase tracking-wide text-white">{l.name}</div>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-wrap gap-1.5">
                        {l.items.map((it) => (
                          <span
                            key={it.t}
                            className={cn(
                              "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs transition",
                              on ? "border-white/15 bg-white/[0.06] text-white" : "border-white/[0.06] bg-white/[0.02] text-slate-400"
                            )}
                          >
                            <it.i className="h-3.5 w-3.5" /> {it.t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>
                  {l.link && (
                    <div className="relative flex h-10 items-center justify-center">
                      <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/15" />
                      <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 overflow-hidden">
                        <div className="flow-dot h-4 w-px bg-gradient-to-b from-transparent via-accent to-transparent" style={{ animationDelay: `${idx * 0.25}s` }} />
                      </div>
                      <span className={cn(
                        "relative z-10 rounded-full border px-2.5 py-0.5 font-mono text-[10px]",
                        l.link === "HTTPS" ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300" : "border-white/10 bg-ink text-slate-500"
                      )}>
                        {l.link === "HTTPS" && <Lock className="mr-1 inline h-2.5 w-2.5" />}
                        ↓ {l.link}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="lg:sticky lg:top-24">
            <div key={sel} className="fade-in overflow-hidden rounded-3xl border border-white/10 bg-navy-2/80">
              <div className="border-b border-white/[0.06] bg-gradient-to-br from-accent/20 to-transparent p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-white">
                  <L.icon className="h-6 w-6" />
                </div>
                <div className="mt-4 text-2xl font-semibold text-white">{L.name}</div>
              </div>
              <div className="p-6">
                <p className="text-sm leading-relaxed text-slate-300">{L.desc}</p>
                <div className="mt-5 text-[11px] font-medium uppercase tracking-wider text-slate-500">Components</div>
                <ul className="mt-2 space-y-1.5">
                  {L.items.map((it) => (
                    <li key={it.t} className="flex items-center gap-2 text-sm text-slate-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" /> {it.t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 text-xs leading-relaxed text-slate-400">
              <span className="font-semibold text-slate-200">Why layers?</span> Separation of concerns means one part — like the interface — can change without rewriting the database or booking logic.
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
