import { useLayoutEffect, useRef, useState, useCallback, useEffect } from "react";
import { KeyRound, Link2, Table2 } from "lucide-react";
import { Section, SectionHeader, Reveal, Card, Note } from "@/components/ui";
import { cn } from "@/utils/cn";

type Field = { n: string; pk?: boolean; fk?: string };
type TableDef = { key: string; name: string; desc: string; fields: Field[]; rows: string[][] };

const tables: TableDef[] = [
  {
    key: "users",
    name: "Users",
    desc: "People using the platform — customers and providers.",
    fields: [{ n: "user_id", pk: true }, { n: "name" }, { n: "email" }, { n: "role" }],
    rows: [
      ["U01", "Customer (example)", "user1@example.com", "customer"],
      ["U02", "Provider (example)", "provider@example.com", "provider"],
      ["U03", "Admin (example)", "admin@example.com", "admin"],
    ],
  },
  {
    key: "listings",
    name: "Listings",
    desc: "Venues, facilities and stays offered by providers.",
    fields: [
      { n: "listing_id", pk: true },
      { n: "provider_id", fk: "users" },
      { n: "category" },
      { n: "location" },
      { n: "price" },
      { n: "capacity" },
    ],
    rows: [
      ["L10", "U02", "large_event", "Karachi", "tier_3", "350"],
      ["L11", "U02", "sports", "Karachi", "tier_1", "12"],
      ["L12", "U02", "accommodation", "Lahore", "tier_2", "4"],
    ],
  },
  {
    key: "availability",
    name: "Availability",
    desc: "Which dates and time slots are open for each listing.",
    fields: [{ n: "listing_id", fk: "listings" }, { n: "date" }, { n: "time_slot" }, { n: "status" }],
    rows: [
      ["L11", "Sat", "19:00", "available"],
      ["L11", "Sat", "20:00", "booked"],
      ["L12", "Sun", "full_day", "available"],
    ],
  },
  {
    key: "services",
    name: "Services",
    desc: "Add-ons such as catering or decoration offered by providers.",
    fields: [{ n: "service_id", pk: true }, { n: "provider_id", fk: "users" }, { n: "type" }, { n: "price" }],
    rows: [
      ["S01", "U02", "catering_standard", "tier_2"],
      ["S02", "U02", "decor_modern", "tier_2"],
      ["S03", "U02", "stage_lighting", "tier_1"],
    ],
  },
  {
    key: "bookings",
    name: "Bookings",
    desc: "A confirmed reservation linking a user to a listing.",
    fields: [
      { n: "booking_id", pk: true },
      { n: "user_id", fk: "users" },
      { n: "listing_id", fk: "listings" },
      { n: "date" },
      { n: "status" },
    ],
    rows: [
      ["B100", "U01", "L10", "Sat", "confirmed"],
      ["B101", "U01", "L11", "Sat", "pending"],
      ["B102", "U01", "L12", "Sun", "cancelled"],
    ],
  },
];

const relations: { from: string; to: string; label: string; dashed?: boolean }[] = [
  { from: "users", to: "listings", label: "a provider owns many listings" },
  { from: "listings", to: "availability", label: "a listing has many time slots" },
  { from: "users", to: "bookings", label: "a user makes many bookings" },
  { from: "listings", to: "bookings", label: "a listing receives many bookings" },
  { from: "users", to: "services", label: "a provider offers many services" },
  { from: "bookings", to: "services", label: "many-to-many via a booking_services link", dashed: true },
];

// grid placement for desktop
const place: Record<string, string> = {
  users: "lg:col-start-1 lg:row-start-1",
  listings: "lg:col-start-2 lg:row-start-1",
  availability: "lg:col-start-3 lg:row-start-1",
  services: "lg:col-start-1 lg:row-start-2",
  bookings: "lg:col-start-2 lg:row-start-2",
};

type Path = { d: string; key: string; dashed?: boolean; on: boolean };

export default function Database() {
  const [sel, setSel] = useState("listings");
  const wrap = useRef<HTMLDivElement>(null);
  const refs = useRef<Record<string, HTMLDivElement | null>>({});
  const [paths, setPaths] = useState<Path[]>([]);

  const compute = useCallback(() => {
    const w = wrap.current;
    if (!w || window.innerWidth < 1024) {
      setPaths([]);
      return;
    }
    const wr = w.getBoundingClientRect();
    const out: Path[] = [];
    relations.forEach((r) => {
      const a = refs.current[r.from]?.getBoundingClientRect();
      const b = refs.current[r.to]?.getBoundingClientRect();
      if (!a || !b) return;
      const ax = a.left - wr.left, ay = a.top - wr.top;
      const bx = b.left - wr.left, by = b.top - wr.top;
      let d = "";
      const horizontal = Math.abs(ax - bx) > 40;
      if (horizontal && Math.abs(ay - by) < 40) {
        // side by side
        const leftFirst = ax < bx;
        const x1 = leftFirst ? ax + a.width : ax;
        const x2 = leftFirst ? bx : bx + b.width;
        const y1 = ay + Math.min(a.height, b.height) / 2 + (r.from === "users" ? -10 : 0);
        const y2 = by + Math.min(a.height, b.height) / 2 + (r.from === "users" ? -10 : 0);
        const mx = (x1 + x2) / 2;
        d = `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`;
      } else if (!horizontal) {
        // stacked
        const x1 = ax + a.width / 2, y1 = ay + a.height;
        const x2 = bx + b.width / 2, y2 = by;
        const my = (y1 + y2) / 2;
        d = `M${x1},${y1} C${x1},${my} ${x2},${my} ${x2},${y2}`;
      } else {
        // diagonal
        const x1 = ax + a.width, y1 = ay + a.height - 30;
        const x2 = bx, y2 = by + 40;
        const mx = (x1 + x2) / 2;
        d = `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`;
      }
      out.push({ d, key: r.from + r.to, dashed: r.dashed, on: r.from === sel || r.to === sel });
    });
    setPaths(out);
  }, [sel]);

  useLayoutEffect(() => {
    compute();
  }, [compute]);

  useEffect(() => {
    const ro = new ResizeObserver(() => compute());
    if (wrap.current) ro.observe(wrap.current);
    window.addEventListener("resize", compute);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", compute);
    };
  }, [compute]);

  const related = new Set(
    relations.filter((r) => r.from === sel || r.to === sel).flatMap((r) => [r.from, r.to])
  );
  const t = tables.find((x) => x.key === sel)!;

  return (
    <Section id="database" grid>
      <SectionHeader
        number="06"
        eyebrow="Database Concept"
        presenter="Accommodation & Hospitality"
        title="What information does the system store?"
        lead="A relational database could organize the platform's data into connected tables. Select a table to see its relationships and example records."
      />

      <Reveal>
        <div ref={wrap} className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[auto_auto] lg:gap-x-24 lg:gap-y-16">
          <svg className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible lg:block">
            <defs>
              <marker id="dot" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6">
                <circle cx="5" cy="5" r="4" fill="#4b7bf5" />
              </marker>
              <marker id="dotdim" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6">
                <circle cx="5" cy="5" r="4" fill="#334155" />
              </marker>
            </defs>
            {paths.map((p) => (
              <path
                key={p.key}
                d={p.d}
                fill="none"
                stroke={p.on ? "#4b7bf5" : "#334155"}
                strokeWidth={p.on ? 2 : 1.25}
                strokeDasharray={p.dashed ? "5 5" : undefined}
                markerStart={`url(#${p.on ? "dot" : "dotdim"})`}
                markerEnd={`url(#${p.on ? "dot" : "dotdim"})`}
                className="transition-all duration-300"
              />
            ))}
          </svg>

          {tables.map((tb) => {
            const on = sel === tb.key;
            const rel = related.has(tb.key);
            return (
              <div
                key={tb.key}
                ref={(el) => {
                  refs.current[tb.key] = el;
                }}
                onClick={() => setSel(tb.key)}
                className={cn(
                  "relative z-10 cursor-pointer self-start overflow-hidden rounded-2xl border bg-navy-2 transition-all duration-300",
                  place[tb.key],
                  on
                    ? "border-accent shadow-[0_20px_50px_-20px_rgba(75,123,245,0.7)]"
                    : rel
                      ? "border-accent/40"
                      : "border-white/[0.08] opacity-70 hover:opacity-100"
                )}
              >
                <div className={cn("flex items-center gap-2 border-b px-4 py-3", on ? "border-accent/30 bg-accent/15" : "border-white/[0.06] bg-white/[0.02]")}>
                  <Table2 className={cn("h-4 w-4", on ? "text-accent-soft" : "text-slate-500")} />
                  <span className="font-semibold text-white">{tb.name}</span>
                  <span className="ml-auto font-mono text-[10px] text-slate-500">{tb.fields.length} fields</span>
                </div>
                <ul className="px-2 py-2 font-mono text-[12.5px]">
                  {tb.fields.map((f) => (
                    <li key={f.n} className="flex items-center gap-2 rounded-md px-2 py-1 text-slate-300">
                      {f.pk ? (
                        <KeyRound className="h-3 w-3 text-amber-300" />
                      ) : f.fk ? (
                        <Link2 className="h-3 w-3 text-accent-soft" />
                      ) : (
                        <span className="h-3 w-3" />
                      )}
                      <span className={cn(f.pk && "text-amber-100", f.fk && "text-accent-soft")}>{f.n}</span>
                      {f.pk && <span className="ml-auto text-[9px] text-amber-300/70">PK</span>}
                      {f.fk && <span className="ml-auto text-[9px] text-accent-soft/70">FK → {f.fk}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          {/* Legend cell on desktop */}
          <div className="relative z-10 hidden self-center lg:col-start-3 lg:row-start-2 lg:block">
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2"><KeyRound className="h-3.5 w-3.5 text-amber-300" /> Primary key — uniquely identifies a row</div>
              <div className="flex items-center gap-2"><Link2 className="h-3.5 w-3.5 text-accent-soft" /> Foreign key — references another table</div>
              <div className="flex items-center gap-2"><span className="w-5 border-t border-dashed border-slate-400" /> Many-to-many relationship</div>
            </div>
          </div>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_1.4fr]">
        <Card className="p-6">
          <div className="text-xs uppercase tracking-wider text-slate-500">Selected table</div>
          <div className="mt-1 text-2xl font-semibold text-white">{t.name}</div>
          <p className="mt-2 text-sm text-slate-400">{t.desc}</p>
          <div className="mt-5 space-y-2">
            {relations
              .filter((r) => r.from === sel || r.to === sel)
              .map((r) => (
                <div key={r.from + r.to} className="flex items-center gap-2 rounded-lg bg-white/[0.03] px-3 py-2 text-xs text-slate-300">
                  <span className="font-mono text-accent-soft">
                    {tables.find((x) => x.key === r.from)!.name} → {tables.find((x) => x.key === r.to)!.name}
                  </span>
                  <span className="text-slate-500">· {r.label}</span>
                </div>
              ))}
          </div>
        </Card>
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3">
            <span className="font-mono text-xs text-slate-400">SELECT * FROM {t.key} LIMIT 3;</span>
            <span className="text-[10px] uppercase tracking-wider text-slate-500">Example rows</span>
          </div>
          <div className="overflow-x-auto">
            <table key={sel} className="fade-in w-full text-left font-mono text-xs">
              <thead>
                <tr className="text-slate-500">
                  {t.fields.map((f) => (
                    <th key={f.n} className="whitespace-nowrap px-5 py-3 font-medium">{f.n}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.rows.map((r, i) => (
                  <tr key={i} className="border-t border-white/[0.04] text-slate-300">
                    {r.map((c, j) => (
                      <td key={j} className="whitespace-nowrap px-5 py-3">{c}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <Reveal className="mt-6">
        <Note>These tables are conceptual examples for the proposed system, not a finished database design.</Note>
      </Reveal>
    </Section>
  );
}
