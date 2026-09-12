"use client";

import { useEffect, useMemo, useState } from "react";
import { EVENT_AREAS, EVENT_LISTINGS, EVENT_TYPES, rs, type EventListing } from "@/lib/data";
import type { HeroSearch } from "./Hero";
import { Reveal, SectionHead, ItalicLight } from "@/components/ui";
import { Pin, Users, ArrowRight, Close, ChevronDown, Check } from "@/components/icons";

function Select({
  value,
  onChange,
  children,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
  label: string;
}) {
  return (
    <label className="relative block">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full cursor-pointer appearance-none rounded-xl border border-ink-950/12 bg-warm-white px-4 py-3 pr-9 text-sm font-medium text-ink-950 transition hover:border-ink-950/25 focus:border-accent focus:outline-none"
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-950/40" />
    </label>
  );
}

export default function Events({
  external,
  onClearSearch,
}: {
  external: HeroSearch;
  onClearSearch: () => void;
}) {
  const [type, setType] = useState<string>("all");
  const [loc, setLoc] = useState("any");
  const [capacity, setCapacity] = useState("any");
  const [price, setPrice] = useState("any");
  const [selected, setSelected] = useState<EventListing | null>(null);
  const [requested, setRequested] = useState(false);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected]);

  const searchActive = external.q.trim() !== "" || external.location.trim() !== "";

  const list = useMemo(() => {
    const q = external.q.trim().toLowerCase();
    const locFilter = (loc !== "any" ? loc : external.location).trim().toLowerCase();
    return EVENT_LISTINGS.filter((l) => {
      if (q && !`${l.name} ${l.type} ${l.area} ${l.blurb}`.toLowerCase().includes(q)) return false;
      if (locFilter && !l.area.toLowerCase().includes(locFilter)) return false;
      if (type !== "all" && l.typeKey !== type) return false;
      if (capacity === "s" && l.capacity >= 150) return false;
      if (capacity === "m" && (l.capacity < 150 || l.capacity > 500)) return false;
      if (capacity === "l" && l.capacity <= 500) return false;
      if (price === "a" && l.price >= 200000) return false;
      if (price === "b" && (l.price < 200000 || l.price > 500000)) return false;
      if (price === "c" && l.price <= 500000) return false;
      return true;
    });
  }, [external, type, loc, capacity, price]);

  const reset = () => {
    setType("all");
    setLoc("any");
    setCapacity("any");
    setPrice("any");
    onClearSearch();
  };

  return (
    <section id="events" className="scroll-mt-20 bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            k="03"
            label="Large Events"
            title={
              <>
                Spaces for every <ItalicLight>big moment.</ItalicLight>
              </>
            }
            sub="Farmhouses to auditoriums — sample listings shown for the prototype demo."
          />
          <Reveal delay={200} className="mb-10 md:mb-14">
            <p className="rounded-full border border-ink-950/10 bg-warm-white px-4 py-2 text-xs font-medium text-ink-950/50">
              {list.length} of {EVENT_LISTINGS.length} sample spaces
            </p>
          </Reveal>
        </div>

        {/* filters */}
        <Reveal delay={80}>
          <div className="mb-4 rounded-2xl border border-ink-950/10 bg-cream/60 p-3 md:p-4">
            <div className="grid gap-3 md:grid-cols-3">
              <Select label="Location" value={loc} onChange={setLoc}>
                <option value="any">Location — any</option>
                {EVENT_AREAS.map((a) => (
                  <option key={a}>{a}</option>
                ))}
              </Select>
              <Select label="Capacity" value={capacity} onChange={setCapacity}>
                <option value="any">Capacity — any</option>
                <option value="s">Up to 150 guests</option>
                <option value="m">150 – 500 guests</option>
                <option value="l">500+ guests</option>
              </Select>
              <Select label="Price" value={price} onChange={setPrice}>
                <option value="any">Price — any</option>
                <option value="a">Under Rs 200,000</option>
                <option value="b">Rs 200,000 – 500,000</option>
                <option value="c">Rs 500,000+</option>
              </Select>
            </div>
            <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto px-1 pb-1">
              {EVENT_TYPES.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setType(t.key)}
                  className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-300 ${
                    type === t.key
                      ? "border-ink-950 bg-ink-950 text-paper"
                      : "border-ink-950/12 bg-warm-white text-ink-950/60 hover:border-ink-950/30 hover:text-ink-950"
                  }`}
                >
                  {t.label}
                </button>
              ))}
              {searchActive && (
                <button
                  onClick={onClearSearch}
                  className="flex shrink-0 items-center gap-1.5 rounded-full border border-accent-deep/30 bg-accent-soft px-4 py-2 text-xs font-semibold text-accent-deep transition hover:bg-accent-soft/70"
                >
                  {external.location.trim() ? `"${external.location}"` : `"${external.q}"`}
                  <Close className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        </Reveal>

        {/* cards */}
        {list.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((l, i) => (
              <Reveal key={l.id} delay={(i % 3) * 90}>
                <article className="group overflow-hidden rounded-2xl border border-ink-950/10 bg-warm-white shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={l.img}
                      alt={`${l.name} — image placeholder`}
                      className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.07]"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-ink-950/60 px-3 py-1 text-[11px] font-medium text-paper backdrop-blur-sm">
                      {l.type}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold tracking-tight text-ink-950">{l.name}</h3>
                    <div className="mt-2 flex items-center gap-4 text-[13px] text-ink-950/55">
                      <span className="flex items-center gap-1.5">
                        <Pin className="h-3.5 w-3.5" /> {l.area}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5" /> {l.capacity} guests
                      </span>
                    </div>
                    <div className="mt-4 flex items-center justify-between border-t border-ink-950/10 pt-4">
                      <span className="text-[13px] text-ink-950/50">
                        From <span className="text-sm font-semibold text-ink-950">{rs(l.price)}</span>
                      </span>
                      <button
                        onClick={() => {
                          setRequested(false);
                          setSelected(l);
                        }}
                        className="flex items-center gap-1.5 text-[13px] font-semibold text-accent-deep transition-all duration-300 hover:gap-2.5"
                      >
                        View Details <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center rounded-2xl border border-dashed border-ink-950/20 bg-cream/50 px-6 py-16 text-center">
            <p className="font-serif text-2xl italic text-ink-950/70">No sample spaces match those filters.</p>
            <p className="mt-2 max-w-sm text-sm text-ink-950/50">
              The prototype ships with a small sample catalog — widen the filters to see more spaces.
            </p>
            <button
              onClick={reset}
              className="mt-6 rounded-full border border-ink-950/20 px-5 py-2.5 text-sm font-semibold text-ink-950 transition hover:bg-ink-950 hover:text-paper"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>

      {/* detail modal */}
      {selected && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-5">
          <button
            aria-label="Close details"
            className="absolute inset-0 bg-ink-950/70 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          />
          <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-warm-white shadow-soft">
            <div className="relative h-56">
              <img src={selected.img} alt={`${selected.name} — image placeholder`} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 to-transparent" />
              <button
                onClick={() => setSelected(null)}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-ink-950/50 text-paper backdrop-blur transition hover:bg-ink-950/80"
                aria-label="Close"
              >
                <Close className="h-4 w-4" />
              </button>
              <div className="absolute bottom-4 left-5">
                <span className="rounded-full bg-paper/90 px-3 py-1 text-[11px] font-semibold text-ink-950">
                  {selected.type}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold tracking-tight text-ink-950">{selected.name}</h3>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-[13px] text-ink-950/55">
                <span className="flex items-center gap-1.5">
                  <Pin className="h-4 w-4" /> {selected.area}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="h-4 w-4" /> Up to {selected.capacity} guests
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ink-950/65">{selected.blurb}</p>
              <div className="mt-5 flex items-center justify-between rounded-xl border border-ink-950/10 bg-paper px-4 py-3">
                <span className="text-xs uppercase tracking-[0.18em] text-ink-950/45">Starting price</span>
                <span className="text-lg font-semibold text-ink-950">{rs(selected.price)}</span>
              </div>
              <div className="mt-5 flex items-center gap-3">
                <button
                  onClick={() => setRequested(true)}
                  className={`flex-1 rounded-full py-3 text-sm font-semibold transition-all duration-300 ${
                    requested
                      ? "bg-ink-950 text-paper"
                      : "bg-accent text-white hover:-translate-y-0.5 hover:bg-accent-deep"
                  }`}
                >
                  {requested ? (
                    <span className="inline-flex items-center gap-2">
                      <Check className="h-4 w-4" /> Request noted
                    </span>
                  ) : (
                    "Request Availability"
                  )}
                </button>
                <button
                  onClick={() => setSelected(null)}
                  className="rounded-full border border-ink-950/15 px-5 py-3 text-sm font-semibold text-ink-950 transition hover:bg-ink-950/5"
                >
                  Close
                </button>
              </div>
              <p className="mt-4 text-center text-[11px] text-ink-950/40">
                Sample listing — live booking opens at the VEYA v1 launch.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
