"use client";

import { useState } from "react";
import { CATERING_ITEMS, DECOR_ITEMS, PLAN_CATERING, PLAN_DECOR, PLAN_VENUES, rs } from "@/lib/data";
import { Reveal, SectionHead, ItalicLight } from "@/components/ui";
import { ArrowRight, Check } from "@/components/icons";

function Gallery({
  label,
  items,
  offset = 0,
}: {
  label: string;
  items: { title: string; sub: string; price: string; img: string }[];
  offset?: number;
}) {
  return (
    <div>
      <Reveal>
        <div className="mb-5 flex items-center gap-4">
          <h3 className="text-[12px] font-semibold uppercase tracking-[0.26em] text-ink-950/50">{label}</h3>
          <span className="h-px flex-1 bg-ink-950/10" aria-hidden />
        </div>
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it, i) => (
          <Reveal key={it.title} delay={offset + i * 70}>
            <article className="group overflow-hidden rounded-xl border border-ink-950/10 bg-warm-white shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
              <div className="h-36 overflow-hidden">
                <img
                  src={it.img}
                  alt={`${it.title} — image placeholder`}
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.08]"
                />
              </div>
              <div className="p-4">
                <h4 className="text-[15px] font-semibold tracking-tight text-ink-950">{it.title}</h4>
                <p className="mt-1 text-xs leading-relaxed text-ink-950/50">{it.sub}</p>
                <p className="mt-3 text-xs font-semibold text-accent-deep">{it.price}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

type Option = { id: string; name: string; sub: string; price: number };

function OptionGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: Option[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div>
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-paper/45">{label}</p>
      <div className="space-y-2.5">
        {options.map((o) => {
          const active = value === o.id;
          return (
            <button
              key={o.id}
              onClick={() => onChange(o.id)}
              className={`flex w-full items-center gap-3 rounded-xl border p-3.5 text-left transition-all duration-300 ${
                active
                  ? "border-accent-2/70 bg-accent/15 shadow-[0_0_0_1px_rgb(133_167_244/0.35)]"
                  : "border-paper/12 bg-paper/[0.03] hover:border-paper/30 hover:bg-paper/[0.06]"
              }`}
            >
              <span
                className={`flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                  active ? "border-accent-2 bg-accent-2" : "border-paper/35"
                }`}
              >
                {active && <span className="h-1.5 w-1.5 rounded-full bg-ink-950" />}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-paper">{o.name}</span>
                <span className="block truncate text-xs text-paper/50">{o.sub}</span>
              </span>
              <span className={`shrink-0 text-xs font-semibold ${active ? "text-accent-2" : "text-paper/60"}`}>
                {rs(o.price)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function Catering() {
  const [venue, setVenue] = useState(PLAN_VENUES[0].id);
  const [catering, setCatering] = useState(PLAN_CATERING[0].id);
  const [decor, setDecor] = useState(PLAN_DECOR[0].id);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState<{ ref: string; total: number } | null>(null);

  const v = PLAN_VENUES.find((o) => o.id === venue)!;
  const c = PLAN_CATERING.find((o) => o.id === catering)!;
  const d = PLAN_DECOR.find((o) => o.id === decor)!;
  const total = v.price + c.price + d.price;

  const continuePlan = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          venue: v.name,
          catering: c.name,
          decoration: d.name,
          total,
        }),
      });
      const json = await res.json();
      if (json.ok) setSaved({ ref: json.reference, total });
    } finally {
      setSaving(false);
    }
  };

  return (
    <section id="catering" className="scroll-mt-20 bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead
          k="04"
          label="Catering & Decoration"
          title={
            <>
              The details that <ItalicLight>make the day.</ItalicLight>
            </>
          }
          sub="Two galleries — food and styling — then build the full plan and see the estimated total update live."
        />

        <div className="space-y-12">
          <Gallery label="Catering" items={CATERING_ITEMS} />
          <Gallery label="Decoration" items={DECOR_ITEMS} offset={120} />
        </div>

        {/* customization panel */}
        <Reveal delay={100}>
          <div className="relative mt-16 overflow-hidden rounded-[28px] bg-ink-950 p-6 text-paper md:p-10">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-[360px] w-[360px] rounded-full bg-accent/15 blur-[110px]"
            />
            <div className="relative">
              <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-accent-2">
                    Plan Builder
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
                    Venue <span className="text-paper/40">+</span> Catering{" "}
                    <span className="text-paper/40">+</span> Decoration{" "}
                    <span className="text-paper/40">=</span>{" "}
                    <span className="font-serif italic text-accent-2">Estimated Total</span>
                  </h3>
                </div>
                <p className="max-w-xs text-xs leading-relaxed text-paper/45">
                  Illustrative estimate. Final quotes come from providers at the time of booking.
                </p>
              </div>

              <div className="grid gap-8 lg:grid-cols-[1fr_1fr_1fr_340px]">
                <OptionGroup label="Venue" options={PLAN_VENUES} value={venue} onChange={(id) => { setVenue(id); setSaved(null); }} />
                <OptionGroup label="+ Catering" options={PLAN_CATERING} value={catering} onChange={(id) => { setCatering(id); setSaved(null); }} />
                <OptionGroup label="+ Decoration" options={PLAN_DECOR} value={decor} onChange={(id) => { setDecor(id); setSaved(null); }} />

                <div className="glass-dark rounded-2xl p-5 lg:sticky lg:top-24 lg:self-start">
                  {saved ? (
                    <div className="flex h-full flex-col justify-center text-center">
                      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white">
                        <Check className="h-6 w-6" />
                      </span>
                      <p className="mt-4 text-lg font-semibold">Plan saved</p>
                      <p className="mt-1 font-mono text-sm tracking-widest text-accent-2">{saved.ref}</p>
                      <p className="mt-3 text-xs leading-relaxed text-paper/50">
                        Stored in VEYA&apos;s prototype database. A provider would follow up with a firm quote at
                        launch.
                      </p>
                      <button
                        onClick={() => setSaved(null)}
                        className="mt-5 w-full rounded-full border border-paper/20 py-2.5 text-xs font-semibold text-paper transition hover:bg-paper/10"
                      >
                        Build another plan
                      </button>
                    </div>
                  ) : (
                    <>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-paper/45">Your plan</p>
                      <dl className="mt-4 space-y-3 text-sm">
                        <div className="flex items-baseline justify-between gap-3">
                          <dt className="truncate text-paper/60">{v.name}</dt>
                          <dd className="shrink-0 text-paper/85">{rs(v.price)}</dd>
                        </div>
                        <div className="flex items-baseline justify-between gap-3">
                          <dt className="truncate text-paper/60">+ {c.name}</dt>
                          <dd className="shrink-0 text-paper/85">{rs(c.price)}</dd>
                        </div>
                        <div className="flex items-baseline justify-between gap-3">
                          <dt className="truncate text-paper/60">+ {d.name}</dt>
                          <dd className="shrink-0 text-paper/85">{rs(d.price)}</dd>
                        </div>
                      </dl>
                      <div className="my-4 border-t border-dashed border-paper/20" />
                      <div className="flex items-baseline justify-between">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-paper/45">
                          Estimated total
                        </span>
                        <span className="font-serif text-3xl italic text-paper">{rs(total)}</span>
                      </div>
                      <button
                        onClick={continuePlan}
                        disabled={saving}
                        className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-accent py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-deep disabled:opacity-60"
                      >
                        {saving ? "Saving…" : "Continue"}
                        {!saving && (
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        )}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
