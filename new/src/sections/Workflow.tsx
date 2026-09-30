import { useEffect, useState } from "react";
import { User, Monitor, Plug, Server, Database, Reply, LayoutGrid, Play, Pause, RotateCcw } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Section, SectionHeader, Reveal, Card } from "@/components/ui";
import { cn } from "@/utils/cn";

const steps: { i: LucideIcon; t: string; short: string; d: string; code: string }[] = [
  {
    i: User,
    t: "User",
    short: "Makes a request",
    d: "A person interacts with the platform — for example, searching for an event venue.",
    code: `// user action
search("Karachi", "Large Event", 300 guests)`,
  },
  {
    i: Monitor,
    t: "Frontend",
    short: "The interface",
    d: "The interface users interact with. It collects input and sends a request.",
    code: `GET /api/listings
  ?city=karachi
  &category=large_event
  &guests=300`,
  },
  {
    i: Plug,
    t: "API",
    short: "Communication layer",
    d: "Allows different software components to communicate using agreed request and response formats.",
    code: `route: GET /api/listings
→ validate query parameters
→ forward to Search service`,
  },
  {
    i: Server,
    t: "Backend",
    short: "Business logic",
    d: "Processes requests, business logic and bookings — such as applying filters or checking availability.",
    code: `filters = { city, category,
  capacity >= 300,
  status = "available" }
results = db.find(filters)`,
  },
  {
    i: Database,
    t: "Database",
    short: "Stored data",
    d: "Stores users, listings, availability and bookings in an organized, queryable form.",
    code: `SELECT * FROM listings
WHERE location = 'Karachi'
  AND category = 'large_event'
  AND capacity >= 300;`,
  },
  {
    i: Reply,
    t: "Response",
    short: "Data returned",
    d: "Matching data is packaged, usually as JSON, and sent back through the API.",
    code: `200 OK
[ { "id": "A", "name": "Venue A" },
  { "id": "B", "name": "Venue B" },
  { "id": "C", "name": "Venue C" } ]`,
  },
  {
    i: LayoutGrid,
    t: "Frontend",
    short: "Displays results",
    d: "The interface renders the returned data as listing cards the user can compare.",
    code: `render(<ResultsGrid items={data} />)
// Venue A · Venue B · Venue C`,
  },
];

export default function Workflow() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => {
      setActive((a) => {
        if (a >= steps.length - 1) {
          setPlaying(false);
          return a;
        }
        return a + 1;
      });
    }, 1400);
    return () => clearInterval(t);
  }, [playing]);

  const s = steps[active];

  return (
    <Section id="how-it-works" grid>
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />
      <SectionHeader
        number="02"
        eyebrow="How the System Works"
        presenter="CEO"
        title="Following one request through the system."
        lead="Every action on a digital platform travels through several layers. Select a stage, or run the request to see the full cycle."
      />

      <Reveal>
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              if (active >= steps.length - 1) setActive(0);
              setPlaying((p) => !p);
            }}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#5b88ff]"
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {playing ? "Pause" : "Run request"}
          </button>
          <button
            onClick={() => {
              setPlaying(false);
              setActive(0);
            }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 hover:border-white/25"
          >
            <RotateCcw className="h-4 w-4" /> Reset
          </button>
          <span className="ml-auto font-mono text-xs text-slate-500">
            step {active + 1} / {steps.length}
          </span>
        </div>

        {/* Pipeline */}
        <div className="relative grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {steps.map((st, i) => {
            const done = i < active;
            const on = i === active;
            return (
              <button
                key={i}
                onClick={() => {
                  setPlaying(false);
                  setActive(i);
                }}
                className={cn(
                  "group relative flex flex-col items-start rounded-2xl border p-4 text-left transition-all duration-300",
                  on
                    ? "border-accent bg-accent/10 shadow-[0_20px_40px_-20px_rgba(75,123,245,0.7)]"
                    : done
                      ? "border-accent/30 bg-white/[0.03]"
                      : "border-white/[0.08] bg-white/[0.02] hover:border-white/20"
                )}
              >
                <div className="flex w-full items-center justify-between">
                  <div
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-xl transition",
                      on ? "pulse-ring bg-accent text-white" : done ? "bg-accent/20 text-accent-soft" : "bg-white/5 text-slate-400"
                    )}
                  >
                    <st.i className="h-4 w-4" />
                  </div>
                  <span className="font-mono text-[10px] text-slate-600">0{i + 1}</span>
                </div>
                <div className={cn("mt-3 text-sm font-semibold", on ? "text-white" : "text-slate-200")}>
                  {st.t}
                </div>
                <div className="text-[11px] text-slate-500">{st.short}</div>
                {i < steps.length - 1 && (
                  <div className="absolute -right-3 top-1/2 z-10 hidden h-px w-3 bg-white/15 lg:block">
                    {on && <div className="flow-x absolute -top-[2px] h-[5px] w-[5px] rounded-full bg-accent" />}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* progress track */}
        <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-white/5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-accent to-accent-soft transition-all duration-500"
            style={{ width: `${((active + 1) / steps.length) * 100}%` }}
          />
        </div>

        {/* Detail */}
        <div key={active} className="fade-in mt-8 grid gap-5 lg:grid-cols-[1fr_1.1fr]">
          <Card className="p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-white">
                <s.i className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs text-slate-500">Stage {active + 1}</div>
                <div className="text-xl font-semibold text-white">{s.t}</div>
              </div>
            </div>
            <p className="mt-5 text-base leading-relaxed text-slate-300">{s.d}</p>
          </Card>
          <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#060a14]">
            <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
              <span className="ml-3 font-mono text-[11px] text-slate-500">conceptual example</span>
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed text-accent-soft">
              {s.code}
            </pre>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
