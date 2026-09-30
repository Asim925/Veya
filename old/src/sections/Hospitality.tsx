"use client";

import { STAYS, WORKSPACES } from "@/lib/data";
import { Reveal, SectionHead, ItalicLight } from "@/components/ui";
import { Pin, Bed, Briefcase } from "@/components/icons";

type Place = { name: string; kind: string; area: string; price: string; img: string };

function Card({ p, i }: { p: Place; i: number }) {
  return (
    <Reveal delay={(i % 3) * 80}>
      <article className="group overflow-hidden rounded-2xl border border-ink-950/10 bg-warm-white shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift">
        <div className="relative h-44 overflow-hidden">
          <img
            src={p.img}
            alt={`${p.kind} — image placeholder`}
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.07]"
          />
          <span className="absolute left-3 top-3 rounded-full bg-ink-950/60 px-3 py-1 text-[11px] font-medium text-paper backdrop-blur-sm">
            {p.kind}
          </span>
        </div>
        <div className="p-4">
          <h3 className="truncate text-[15px] font-semibold tracking-tight text-ink-950">{p.name}</h3>
          <div className="mt-1.5 flex items-center justify-between gap-3">
            <span className="flex items-center gap-1.5 text-xs text-ink-950/50">
              <Pin className="h-3.5 w-3.5" /> {p.area}
            </span>
            <span className="text-xs font-semibold text-accent-deep">{p.price}</span>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function Lane({
  word,
  title,
  desc,
  icon,
  items,
}: {
  word: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  items: Place[];
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
      <div className="lg:sticky lg:top-24 lg:self-start">
        <Reveal>
          <div className="flex items-center gap-3 text-ink-950">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-950/15 text-ink-950">
              {icon}
            </span>
            <span className="text-[12px] font-semibold uppercase tracking-[0.26em] text-ink-950/55">{title}</span>
          </div>
        </Reveal>
        <Reveal delay={90}>
          <p aria-hidden className="text-outline-light mt-6 select-none font-serif text-[64px] italic leading-none md:text-[80px]">
            {word}
          </p>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-5 max-w-[26ch] text-sm leading-relaxed text-ink-950/55">{desc}</p>
        </Reveal>
      </div>
      <div className={`grid gap-4 sm:grid-cols-2 ${items.length > 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"}`}>
        {items.map((p, i) => (
          <Card key={p.name} p={p} i={i} />
        ))}
      </div>
    </div>
  );
}

export default function Hospitality() {
  return (
    <section id="hospitality" className="scroll-mt-20 bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead
          k="06"
          label="Accommodation & Hospitality"
          title={
            <>
              Where you stay. <ItalicLight>Where you work.</ItalicLight>
            </>
          }
          sub="Two lanes under one category — places to sleep, and places to get things done."
        />

        <div className="space-y-16 md:space-y-20">
          <Lane
            word="Stay"
            title="Stay"
            desc="Hotels, guest houses, apartments, vacation homes and farmhouse stays — booked the same way you book a venue."
            icon={<Bed className="h-5 w-5" />}
            items={STAYS}
          />
          <div className="border-t border-ink-950/10" />
          <Lane
            word="Work"
            title="Work"
            desc="Meeting rooms, offices, conference rooms and seminar spaces — by the hour, by the day or by the month."
            icon={<Briefcase className="h-5 w-5" />}
            items={WORKSPACES}
          />
        </div>
      </div>
    </section>
  );
}
