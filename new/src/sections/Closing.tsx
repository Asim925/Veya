import { Palette, Code2, Database, Binary, Plug, ShieldCheck, Cloud, BarChart3, BrainCircuit, ArrowUpRight, Crown, Megaphone, Landmark, PartyPopper, UtensilsCrossed, Trophy, BedDouble, Users, LayoutGrid, Cpu, HardDrive, Boxes, ArrowRight, ArrowDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Section, SectionHeader, Reveal, Eyebrow } from "@/components/ui";
import { go, Logo } from "@/components/Nav";

const areas: { i: LucideIcon; t: string; d: string; to: string }[] = [
  { i: Palette, t: "UI / UX", d: "Designing clear search and booking journeys.", to: "journey" },
  { i: Code2, t: "Web Development", d: "Building the frontend and backend that users rely on.", to: "how-it-works" },
  { i: Database, t: "Databases", d: "Storing users, listings, availability and bookings.", to: "database" },
  { i: Binary, t: "Algorithms & Search", d: "Filtering and ranking listings efficiently.", to: "search" },
  { i: Plug, t: "APIs", d: "Letting system components communicate.", to: "architecture" },
  { i: ShieldCheck, t: "Cybersecurity", d: "Protecting accounts, data and payments.", to: "security" },
  { i: Cloud, t: "Cloud Computing", d: "Hosting and scaling the platform.", to: "scalability" },
  { i: BarChart3, t: "Data Analytics", d: "Understanding behaviour and campaigns.", to: "marketing" },
  { i: BrainCircuit, t: "Artificial Intelligence", d: "Possible future recommendations.", to: "future" },
];

export function CSConnection() {
  return (
    <Section id="cs-concepts" grid>
      <div className="pointer-events-none absolute left-0 top-1/3 h-[500px] w-[500px] rounded-full bg-accent/10 blur-[140px]" />
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeader
            number="16"
            eyebrow="Computer Science Connection"
            title={<>Where Computer Science fits into VEYA</>}
            lead="VEYA demonstrates how multiple areas of Computer Science can work together to create a real-world digital platform."
          />
          <Reveal>
            <div className="grid grid-cols-3 gap-2">
              {areas.map((a) => (
                <div key={a.t} className="flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-2 text-center">
                  <a.i className="h-5 w-5 text-accent-soft" />
                  <span className="text-[10px] leading-tight text-slate-400">{a.t}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="relative">
          <div className="absolute bottom-6 left-[27px] top-6 w-px bg-gradient-to-b from-accent via-accent/40 to-accent/0" />
          {areas.map((a, i) => (
            <Reveal key={a.t} delay={i * 40}>
              <button
                onClick={() => go(a.to)}
                className="group relative mb-3 flex w-full items-center gap-4 rounded-2xl border border-white/[0.06] bg-navy-2/40 p-3 pr-4 text-left transition hover:border-accent/50 hover:bg-navy-2"
              >
                <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-ink text-accent-soft transition group-hover:bg-accent group-hover:text-white">
                  <a.i className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-slate-600">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-semibold text-white">{a.t}</span>
                  </div>
                  <div className="text-sm text-slate-400">{a.d}</div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-slate-600 transition group-hover:text-accent-soft" />
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

const team: { i: LucideIcon; r: string; area: string; demo: string; to: string }[] = [
  { i: Crown, r: "CEO & Product / Technology", area: "Product vision and technical system", demo: "Workflow & architecture", to: "architecture" },
  { i: Megaphone, r: "Marketing & Business Development", area: "Audience, campaigns and provider acquisition", demo: "Marketing dashboard", to: "marketing" },
  { i: Landmark, r: "Finance", area: "Transactions, business data and growth", demo: "Transactions & scalability", to: "transactions" },
  { i: PartyPopper, r: "Large Events", area: "Venues for weddings and gatherings", demo: "Search & venue gallery", to: "search" },
  { i: UtensilsCrossed, r: "Catering & Decoration", area: "Food, themes and event services", demo: "Event plan builder", to: "customize" },
  { i: Trophy, r: "Sports & Recreation", area: "Courts, grounds and arenas", demo: "Time-slot booking", to: "booking" },
  { i: BedDouble, r: "Accommodation & Hospitality", area: "Stays, rooms and workspaces", demo: "Database-driven listings", to: "database" },
];

export function Team() {
  return (
    <Section id="team" tone="light">
      <SectionHeader
        tone="light"
        number="17"
        eyebrow="Founding Team"
        title="Seven roles, one shared system."
        lead="The roles represent different functional areas of the proposed platform. The technical system connects these areas through a shared digital infrastructure."
      />
      <Reveal>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((t, i) => (
            <button
              key={t.r}
              onClick={() => go(t.to)}
              className={
                "group flex flex-col rounded-2xl border border-slate-900/[0.08] bg-white p-5 text-left transition hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-24px_rgba(15,23,42,0.35)] " +
                (i === 0 ? "bg-navy text-white sm:col-span-2 lg:col-span-1 lg:row-span-2" : "")
              }
              style={i === 0 ? { background: "linear-gradient(160deg,#111a2e,#070b16)" } : undefined}
            >
              <div className="flex items-center justify-between">
                <div className={"flex h-10 w-10 items-center justify-center rounded-xl " + (i === 0 ? "bg-accent text-white" : "bg-accent/10 text-accent")}>
                  <t.i className="h-5 w-5" />
                </div>
                <span className={"font-mono text-[11px] " + (i === 0 ? "text-slate-500" : "text-slate-400")}>0{i + 1}</span>
              </div>
              <div className={"mt-4 font-semibold leading-snug " + (i === 0 ? "text-xl text-white" : "text-slate-900")}>{t.r}</div>
              <div className={"mt-1 text-sm " + (i === 0 ? "text-slate-400" : "text-slate-500")}>{t.area}</div>
              {i === 0 && (
                <div className="mt-6 hidden flex-1 items-end lg:flex">
                  <div className="w-full rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs text-slate-400">
                    Connects product decisions with the technical architecture used by every domain.
                  </div>
                </div>
              )}
              <div className={"mt-4 inline-flex items-center gap-1 text-xs font-medium " + (i === 0 ? "text-accent-soft" : "text-accent")}>
                Demo: {t.demo} <ArrowUpRight className="h-3 w-3" />
              </div>
            </button>
          ))}
        </div>
      </Reveal>
      <Reveal className="mt-6">
        <div className="flex items-center gap-3 rounded-2xl border border-accent/20 bg-accent/[0.05] px-5 py-4 text-sm text-slate-700">
          <Boxes className="h-5 w-5 shrink-0 text-accent" />
          Shared digital infrastructure — one database, one API and one interface connecting every functional area.
        </div>
      </Reveal>
    </Section>
  );
}

const finalArch: { i: LucideIcon; t: string }[] = [
  { i: Users, t: "Users" },
  { i: LayoutGrid, t: "Interface" },
  { i: Cpu, t: "Application Logic" },
  { i: HardDrive, t: "Data" },
  { i: Boxes, t: "Services" },
];

export function Conclusion() {
  return (
    <section id="conclusion" className="relative overflow-hidden bg-ink py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-[160px]" />
      <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-8">
        <Reveal>
          <div className="flex justify-center"><Eyebrow>18 · Conclusion</Eyebrow></div>
          <h2 className="mt-8 text-5xl font-semibold tracking-[-0.03em] text-white sm:text-7xl">
            VEYA <span className="text-slate-600">—</span> Venue <span className="text-accent">+</span> Way
          </h2>
          <p className="mt-6 text-xl text-slate-300 sm:text-2xl">“A new way to find and book places &amp; services.”</p>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
            More importantly, VEYA demonstrates how Computer Science can transform a fragmented real-world process into a structured digital system.
          </p>
        </Reveal>

        <Reveal className="mt-16">
          <div className="flex flex-col items-center justify-center gap-2 md:flex-row">
            {finalArch.map((f, i) => (
              <div key={f.t} className="flex flex-col items-center gap-2 md:flex-row">
                <div className="glass flex w-48 items-center gap-3 rounded-2xl border border-white/10 px-4 py-3.5 md:w-auto md:flex-col md:gap-2 md:px-5 md:py-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/20 text-accent-soft">
                    <f.i className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-semibold text-white">{f.t}</span>
                </div>
                {i < finalArch.length - 1 && (
                  <>
                    <ArrowDown className="h-4 w-4 text-slate-600 md:hidden" />
                    <ArrowRight className="hidden h-4 w-4 text-slate-600 md:block" />
                  </>
                )}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-24">
          <div className="bg-gradient-to-b from-white to-slate-500 bg-clip-text text-7xl font-semibold tracking-[-0.04em] text-transparent sm:text-9xl">
            Thank You
          </div>
          <button onClick={() => go("overview")} className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm text-slate-300 transition hover:border-white/30 hover:text-white">
            Back to overview
          </button>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-ink">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-5 py-8 text-xs text-slate-500 sm:flex-row sm:items-center sm:px-8">
        <div className="flex items-center gap-2.5">
          <Logo className="h-6 w-6" />
          <span className="font-semibold tracking-[0.2em] text-slate-300">VEYA</span>
          <span>· Venue + Way</span>
        </div>
        <p className="max-w-xl sm:text-right">
          VEYA is a proposed concept presented as a Computer Science case study for a Functional English Lab presentation. All listings, data and metrics shown are illustrative.
        </p>
      </div>
    </footer>
  );
}
