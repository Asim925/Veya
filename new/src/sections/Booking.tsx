import { useRef, useState } from "react";
import { MapPin, Clock, ShieldCheck, AlertTriangle, CheckCircle2, Loader2, RotateCcw, Users, Zap } from "lucide-react";
import { Section, SectionHeader, Reveal, Note } from "@/components/ui";
import { IMG } from "@/data/gallery";
import { cn } from "@/utils/cn";

type Status = "available" | "unavailable" | "yours";
const SLOTS = ["6 PM", "7 PM", "8 PM", "9 PM"];
const DAYS = ["Fri", "Sat", "Sun"];

const initial = (): Record<string, Record<string, Status>> => ({
  Fri: { "6 PM": "available", "7 PM": "unavailable", "8 PM": "available", "9 PM": "available" },
  Sat: { "6 PM": "unavailable", "7 PM": "available", "8 PM": "available", "9 PM": "unavailable" },
  Sun: { "6 PM": "available", "7 PM": "available", "8 PM": "unavailable", "9 PM": "available" },
});

type Log = { t: string; kind: "info" | "ok" | "err" | "warn" };

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function Booking() {
  const [grid, setGrid] = useState(initial);
  const [day, setDay] = useState("Sat");
  const [sel, setSel] = useState<string | null>("7 PM");
  const [busy, setBusy] = useState(false);
  const [log, setLog] = useState<Log[]>([]);
  const [result, setResult] = useState<null | "ok" | "err">(null);
  const gridRef = useRef(grid);
  gridRef.current = grid;

  const push = (l: Log) => setLog((cur) => [...cur, l]);

  const run = async (conflict: boolean) => {
    if (!sel || busy) return;
    setBusy(true);
    setResult(null);
    setLog([]);
    const slot = sel;
    push({ t: `Request: book ${slot} on ${day} at VEYA Futsal Arena`, kind: "info" });
    await wait(600);
    if (conflict) {
      push({ t: `Meanwhile, User B confirms ${slot} a moment earlier`, kind: "warn" });
      setGrid((g) => ({ ...g, [day]: { ...g[day], [slot]: "unavailable" } }));
      await wait(700);
    }
    push({ t: "BEGIN transaction — lock this slot row", kind: "info" });
    await wait(600);
    push({ t: `SELECT status FROM availability WHERE slot = '${slot}'`, kind: "info" });
    await wait(700);
    const status = gridRef.current[day][slot];
    if (status === "available") {
      push({ t: "status = 'available' ✓", kind: "ok" });
      await wait(500);
      push({ t: "INSERT INTO bookings … ; UPDATE availability SET status = 'booked'", kind: "info" });
      await wait(600);
      push({ t: "COMMIT — booking confirmed", kind: "ok" });
      setGrid((g) => ({ ...g, [day]: { ...g[day], [slot]: "yours" } }));
      setResult("ok");
    } else {
      push({ t: `status = '${status === "yours" ? "booked" : "unavailable"}' ✗`, kind: "err" });
      await wait(500);
      push({ t: "ROLLBACK — double booking prevented", kind: "err" });
      setResult("err");
    }
    setSel(null);
    setBusy(false);
  };

  const reset = () => {
    setGrid(initial());
    setSel("7 PM");
    setDay("Sat");
    setLog([]);
    setResult(null);
  };

  const counts = SLOTS.reduce(
    (acc, s) => {
      acc[grid[day][s]]++;
      return acc;
    },
    { available: 0, unavailable: 0, yours: 0 } as Record<Status, number>
  );

  return (
    <Section id="booking" tone="light" grid>
      <SectionHeader
        tone="light"
        number="07"
        eyebrow="Booking & Availability"
        presenter="Sports & Recreation"
        title="Checking availability before confirming."
        lead="A booking system must check availability before confirming a reservation to reduce scheduling conflicts and prevent double booking."
      />

      <Reveal>
        <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
          {/* Booking widget */}
          <div className="overflow-hidden rounded-3xl border border-slate-900/[0.08] bg-white shadow-[0_40px_80px_-40px_rgba(15,23,42,0.35)]">
            <div className="relative h-44 sm:h-52">
              <img src={IMG.futsal} alt="Indoor futsal arena example" loading="lazy" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                <div>
                  <div className="text-xs font-medium uppercase tracking-wider text-accent-soft">Sports facility · Example</div>
                  <div className="mt-1 text-2xl font-semibold text-white">VEYA Futsal Arena</div>
                  <div className="mt-1 flex items-center gap-3 text-xs text-slate-300">
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> Karachi</span>
                    <span className="flex items-center gap-1"><Users className="h-3 w-3" /> 5-a-side</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> 60-min slots</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="flex gap-1.5">
                  {DAYS.map((d) => (
                    <button
                      key={d}
                      disabled={busy}
                      onClick={() => {
                        setDay(d);
                        setSel(null);
                      }}
                      className={cn(
                        "rounded-lg px-3.5 py-1.5 text-sm font-medium transition",
                        day === d ? "bg-navy text-white" : "text-slate-500 hover:bg-slate-900/5"
                      )}
                    >
                      {d}
                    </button>
                  ))}
                </div>
                <button onClick={reset} disabled={busy} className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900">
                  <RotateCcw className="h-3.5 w-3.5" /> Reset
                </button>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {SLOTS.map((s) => {
                  const st = grid[day][s];
                  const isSel = sel === s;
                  return (
                    <button
                      key={s}
                      disabled={busy || st !== "available"}
                      onClick={() => {
                        setSel(isSel ? null : s);
                        setResult(null);
                      }}
                      className={cn(
                        "relative rounded-2xl border px-3 py-5 text-center transition-all duration-300",
                        st === "unavailable" && "cursor-not-allowed border-slate-900/5 bg-slate-100 text-slate-400",
                        st === "yours" && "cursor-default border-emerald-500/40 bg-emerald-50 text-emerald-700",
                        st === "available" && !isSel && "border-slate-900/10 bg-white text-slate-800 hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-md",
                        st === "available" && isSel && "-translate-y-0.5 border-accent bg-accent text-white shadow-[0_16px_30px_-12px_rgba(75,123,245,0.8)]"
                      )}
                    >
                      <div className={cn("text-lg font-semibold", st === "unavailable" && "line-through")}>{s}</div>
                      <div className="mt-1 text-[11px] font-medium">
                        {st === "unavailable" ? "Unavailable" : st === "yours" ? "Booked by you" : isSel ? "Selected" : "Available"}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 flex flex-wrap gap-4 text-[11px] text-slate-500">
                <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm border border-slate-300 bg-white" /> Available ({counts.available})</span>
                <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-accent" /> Selected</span>
                <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-slate-200" /> Unavailable ({counts.unavailable})</span>
                <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-emerald-200" /> Booked by you ({counts.yours})</span>
              </div>

              <div className="mt-6 grid gap-2 sm:grid-cols-2">
                <button
                  disabled={!sel || busy}
                  onClick={() => run(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-navy px-4 py-3 text-sm font-semibold text-white transition hover:bg-navy-2 disabled:opacity-40"
                >
                  {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
                  Check &amp; confirm {sel ?? ""}
                </button>
                <button
                  disabled={!sel || busy}
                  onClick={() => run(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-amber-500/40 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800 transition hover:bg-amber-100 disabled:opacity-40"
                >
                  <Zap className="h-4 w-4" /> Simulate simultaneous booking
                </button>
              </div>
            </div>
          </div>

          {/* System log */}
          <div className="flex flex-col gap-4">
            <div className="flex-1 overflow-hidden rounded-3xl border border-white/10 bg-navy text-slate-200 shadow-xl">
              <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3">
                <span className="text-sm font-semibold text-white">Backend activity</span>
                <span className="font-mono text-[10px] text-slate-500">simulated</span>
              </div>
              <div className="min-h-[220px] space-y-2 p-5 font-mono text-[12px] leading-relaxed">
                {log.length === 0 && (
                  <div className="text-slate-500">
                    Select an available slot, then choose “Check &amp; confirm” — or simulate two users booking the same slot.
                  </div>
                )}
                {log.map((l, i) => (
                  <div
                    key={i}
                    className={cn(
                      "fade-in flex gap-2",
                      l.kind === "ok" && "text-emerald-300",
                      l.kind === "err" && "text-rose-300",
                      l.kind === "warn" && "text-amber-300",
                      l.kind === "info" && "text-slate-300"
                    )}
                  >
                    <span className="text-slate-600">{String(i + 1).padStart(2, "0")}</span>
                    <span>{l.t}</span>
                  </div>
                ))}
              </div>
              {result && (
                <div
                  className={cn(
                    "fade-in mx-5 mb-5 flex items-start gap-3 rounded-xl p-4 text-sm",
                    result === "ok" ? "bg-emerald-500/10 text-emerald-200" : "bg-rose-500/10 text-rose-200"
                  )}
                >
                  {result === "ok" ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> : <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />}
                  {result === "ok"
                    ? "Reservation confirmed. The slot's status changed, so no one else can book it."
                    : "The slot was taken before this request finished. The system refused the second booking instead of creating a conflict."}
                </div>
              )}
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-900/[0.08] bg-white">
              <div className="border-b border-slate-900/[0.06] px-5 py-2.5 text-[11px] font-medium uppercase tracking-wider text-slate-500">
                Conceptual logic
              </div>
              <pre className="overflow-x-auto p-5 font-mono text-[12px] leading-relaxed text-slate-700">
{`BEGIN TRANSACTION
  slot = get_slot(facility, date, time)  -- locked
  IF slot.status == "available":
      create_booking(user, slot)
      slot.status = "booked"
      COMMIT
  ELSE:
      ROLLBACK  -- "slot unavailable"`}
              </pre>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal className="mt-8">
        <Note tone="light">
          Key idea: checking availability and saving the booking happen as one indivisible step (a <b>transaction</b>). This is how systems can avoid two users reserving the same slot.
        </Note>
      </Reveal>
    </Section>
  );
}
