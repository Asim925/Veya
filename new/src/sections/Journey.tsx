import { useState } from "react";
import { Search, SlidersHorizontal, Eye, CalendarDays, PlusCircle, CheckCircle2, MapPin, Users, ChevronRight, ChevronLeft, Check, UtensilsCrossed, Flower2, Building2, Plus, Equal } from "lucide-react";
import { Section, SectionHeader, Reveal, Pill } from "@/components/ui";
import { cn } from "@/utils/cn";

import { IMG } from "@/data/gallery";

export const venues = [
  { id: "A", name: "Venue A", type: "Banquet Hall", img: IMG.banquetGrand, cap: 350, setting: "Indoor", tier: 3 },
  { id: "B", name: "Venue B", type: "Farmhouse Garden", img: IMG.gardenAisle, cap: 400, setting: "Outdoor", tier: 2 },
  { id: "C", name: "Venue C", type: "Rooftop", img: IMG.rooftop, cap: 300, setting: "Outdoor", tier: 3 },
];

const stepMeta = [
  { i: Search, t: "Search" },
  { i: SlidersHorizontal, t: "Filter" },
  { i: Eye, t: "View Listing" },
  { i: CalendarDays, t: "Select Date/Time" },
  { i: PlusCircle, t: "Add Services" },
  { i: CheckCircle2, t: "Confirm Booking" },
];

const dates = ["Thu 12", "Fri 13", "Sat 14", "Sun 15", "Mon 16"];
const times = ["Afternoon", "Evening", "Night"];

export default function Journey() {
  const [step, setStep] = useState(0);
  const [setting, setSetting] = useState<"All" | "Indoor" | "Outdoor">("All");
  const [venue, setVenue] = useState<string>("A");
  const [date, setDate] = useState("Sat 14");
  const [time, setTime] = useState("Evening");
  const [services, setServices] = useState<string[]>(["Catering", "Decoration"]);

  const v = venues.find((x) => x.id === venue)!;
  const filtered = venues.filter((x) => setting === "All" || x.setting === setting);

  const toggle = (s: string) =>
    setServices((cur) => (cur.includes(s) ? cur.filter((c) => c !== s) : [...cur, s]));

  return (
    <Section id="journey" tone="light">
      <SectionHeader
        tone="light"
        number="03"
        eyebrow="User Journey"
        presenter="Large Events"
        title="From a search to an event plan."
        lead="A step-by-step prototype of how a user could move through the proposed platform. All data shown is illustrative."
      />

      <Reveal>
        <div className="overflow-hidden rounded-3xl border border-slate-900/[0.08] bg-white shadow-[0_40px_80px_-40px_rgba(15,23,42,0.35)]">
          {/* stepper */}
          <div className="flex gap-1 overflow-x-auto border-b border-slate-900/[0.06] bg-paper-2/50 p-2">
            {stepMeta.map((m, i) => (
              <button
                key={m.t}
                onClick={() => setStep(i)}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition",
                  step === i
                    ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-900/[0.06]"
                    : i < step
                      ? "text-accent"
                      : "text-slate-500 hover:text-slate-800"
                )}
              >
                <span
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold",
                    step === i ? "bg-accent text-white" : i < step ? "bg-accent/10 text-accent" : "bg-slate-900/5 text-slate-500"
                  )}
                >
                  {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
                </span>
                {m.t}
              </button>
            ))}
          </div>

          <div className="min-h-[420px] p-5 sm:p-8">
            <div key={step} className="fade-in">
              {step === 0 && (
                <div className="mx-auto max-w-3xl">
                  <h3 className="text-lg font-semibold text-slate-900">What are you looking for?</h3>
                  <p className="text-sm text-slate-500">The user enters structured search criteria.</p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    {[
                      { i: MapPin, l: "Location", v: "Karachi" },
                      { i: Building2, l: "Category", v: "Large Event" },
                      { i: Users, l: "Guests", v: "300 Guests" },
                    ].map(({ i: I, l, v }) => (
                      <div key={l} className="rounded-2xl border border-slate-900/10 bg-paper px-4 py-3">
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <I className="h-3.5 w-3.5" /> {l}
                        </div>
                        <div className="mt-1 text-base font-semibold text-slate-900">{v}</div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setStep(1)}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-navy px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-navy-2 sm:w-auto"
                  >
                    <Search className="h-4 w-4" /> Search listings
                  </button>
                </div>
              )}

              {(step === 1 || step === 2) && (
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">
                        {step === 1 ? "Results for Karachi · Large Event · 300 guests" : "Select a listing to view"}
                      </h3>
                      <p className="text-sm text-slate-500">{filtered.length} example results</p>
                    </div>
                    {step === 1 && (
                      <div className="flex gap-1.5">
                        {(["All", "Indoor", "Outdoor"] as const).map((s) => (
                          <Pill key={s} tone="light" active={setting === s} onClick={() => setSetting(s)}>
                            {s}
                          </Pill>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    {filtered.map((x) => (
                      <button
                        key={x.id}
                        onClick={() => {
                          setVenue(x.id);
                          if (step === 1) setStep(2);
                        }}
                        className={cn(
                          "group overflow-hidden rounded-2xl border text-left transition",
                          venue === x.id && step === 2
                            ? "border-accent ring-4 ring-accent/15"
                            : "border-slate-900/10 hover:border-slate-900/25"
                        )}
                      >
                        <div className="relative h-36 overflow-hidden">
                          <img src={x.img} alt={x.type} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                          <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-medium text-slate-700">
                            {x.setting}
                          </span>
                        </div>
                        <div className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="font-semibold text-slate-900">{x.name}</div>
                            <div className="text-xs tracking-widest text-slate-400">
                              {"●".repeat(x.tier)}
                              <span className="text-slate-200">{"●".repeat(4 - x.tier)}</span>
                            </div>
                          </div>
                          <div className="text-sm text-slate-500">{x.type}</div>
                          <div className="mt-2 flex items-center gap-1 text-xs text-slate-500">
                            <Users className="h-3 w-3" /> Capacity {x.cap}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  {step === 2 && (
                    <div className="mt-6 grid gap-4 rounded-2xl border border-slate-900/[0.08] bg-paper p-5 sm:grid-cols-[1fr_auto] sm:items-center">
                      <div>
                        <div className="text-xs uppercase tracking-wider text-slate-400">Selected listing</div>
                        <div className="mt-1 text-lg font-semibold text-slate-900">
                          {v.name} — {v.type}
                        </div>
                        <div className="mt-1 text-sm text-slate-500">
                          Karachi · {v.setting} · Up to {v.cap} guests · Price tier {"●".repeat(v.tier)}
                        </div>
                      </div>
                      <button onClick={() => setStep(3)} className="rounded-xl bg-navy px-4 py-2.5 text-sm font-semibold text-white">
                        Check dates
                      </button>
                    </div>
                  )}
                </div>
              )}

              {step === 3 && (
                <div className="mx-auto max-w-3xl">
                  <h3 className="text-lg font-semibold text-slate-900">Select date and time for {v.name}</h3>
                  <p className="text-sm text-slate-500">Only available options can be selected.</p>
                  <div className="mt-6 grid grid-cols-5 gap-2">
                    {dates.map((d, i) => {
                      const unavailable = i === 1;
                      return (
                        <button
                          key={d}
                          disabled={unavailable}
                          onClick={() => setDate(d)}
                          className={cn(
                            "rounded-xl border py-3 text-center text-sm font-medium transition",
                            unavailable
                              ? "cursor-not-allowed border-slate-900/5 bg-slate-50 text-slate-300 line-through"
                              : date === d
                                ? "border-accent bg-accent text-white"
                                : "border-slate-900/10 text-slate-700 hover:border-slate-900/30"
                          )}
                        >
                          {d}
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {times.map((t) => (
                      <button
                        key={t}
                        onClick={() => setTime(t)}
                        className={cn(
                          "rounded-xl border py-3 text-sm font-medium transition",
                          time === t ? "border-navy bg-navy text-white" : "border-slate-900/10 text-slate-700 hover:border-slate-900/30"
                        )}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="mx-auto max-w-3xl">
                  <h3 className="text-lg font-semibold text-slate-900">Add services to this booking</h3>
                  <p className="text-sm text-slate-500">Services are linked to the same booking record.</p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {[
                      { n: "Catering", i: UtensilsCrossed, d: "Food and beverage package" },
                      { n: "Decoration", i: Flower2, d: "Theme, floral and stage setup" },
                    ].map(({ n, i: I, d }) => {
                      const on = services.includes(n);
                      return (
                        <button
                          key={n}
                          onClick={() => toggle(n)}
                          className={cn(
                            "flex items-center gap-4 rounded-2xl border p-4 text-left transition",
                            on ? "border-accent bg-accent/[0.05]" : "border-slate-900/10 hover:border-slate-900/25"
                          )}
                        >
                          <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl", on ? "bg-accent text-white" : "bg-slate-900/5 text-slate-500")}>
                            <I className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-slate-900">{n}</div>
                            <div className="text-sm text-slate-500">{d}</div>
                          </div>
                          <div className={cn("flex h-5 w-5 items-center justify-center rounded-md border", on ? "border-accent bg-accent text-white" : "border-slate-300")}>
                            {on && <Check className="h-3.5 w-3.5" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="mx-auto max-w-4xl">
                  <h3 className="text-center text-lg font-semibold text-slate-900">Combined Event Plan</h3>
                  <div className="mt-8 flex flex-col items-stretch justify-center gap-3 md:flex-row md:items-center">
                    <PlanChip icon={Building2} title="Venue" sub={`${v.name} · ${v.type}`} />
                    {services.includes("Catering") && (
                      <>
                        <Plus className="mx-auto h-5 w-5 shrink-0 text-slate-400" />
                        <PlanChip icon={UtensilsCrossed} title="Catering" sub="Selected package" />
                      </>
                    )}
                    {services.includes("Decoration") && (
                      <>
                        <Plus className="mx-auto h-5 w-5 shrink-0 text-slate-400" />
                        <PlanChip icon={Flower2} title="Decoration" sub="Selected theme" />
                      </>
                    )}
                    <Equal className="mx-auto h-5 w-5 shrink-0 text-slate-400" />
                    <div className="rounded-2xl bg-navy p-5 text-white shadow-xl md:min-w-[200px]">
                      <div className="text-xs uppercase tracking-wider text-accent-soft">Event Plan</div>
                      <div className="mt-1 font-semibold">{date} · {time}</div>
                      <div className="text-sm text-slate-400">300 guests · Karachi</div>
                    </div>
                  </div>
                  <div className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-500">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    Prototype only — no real booking is created.
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-slate-900/[0.06] bg-paper-2/40 px-5 py-3 sm:px-8">
            <button
              disabled={step === 0}
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" /> Back
            </button>
            <span className="text-xs text-slate-400">Step {step + 1} of 6</span>
            <button
              disabled={step === 5}
              onClick={() => setStep((s) => Math.min(5, s + 1))}
              className="inline-flex items-center gap-1 rounded-lg bg-accent px-3 py-2 text-sm font-semibold text-white disabled:opacity-30"
            >
              Next <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

function PlanChip({ icon: I, title, sub }: { icon: typeof Building2; title: string; sub: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-900/10 bg-white p-4 shadow-sm md:min-w-[170px]">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
        <I className="h-5 w-5" />
      </div>
      <div>
        <div className="text-sm font-semibold text-slate-900">{title}</div>
        <div className="text-xs text-slate-500">{sub}</div>
      </div>
    </div>
  );
}
