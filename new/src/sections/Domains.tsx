import { useState } from "react";
import { PartyPopper, UtensilsCrossed, Trophy, BedDouble, Cpu, ArrowUpRight } from "lucide-react";
import { Section, SectionHeader, Reveal, PresenterTag } from "@/components/ui";
import { IMG } from "@/data/gallery";
import { cn } from "@/utils/cn";

type Sub = { n: string; img: string; pos?: string };

const domains = [
  {
    key: "events",
    title: "Large Events",
    icon: PartyPopper,
    img: IMG.banquetGrand,
    presenter: "Large Events",
    concept: "Search + structured listing data",
    explain:
      "Venues share common fields — location, capacity, price, setting — so they can be searched and compared consistently.",
    subs: [
      { n: "Farmhouses", img: IMG.farmhousePool },
      { n: "Marriage Halls", img: IMG.banquetGrand, pos: "30% 50%" },
      { n: "Banquet Halls", img: IMG.banquetFloral, pos: "50% 40%" },
      { n: "Rooftops", img: IMG.rooftop },
      { n: "Gardens", img: IMG.gardenAisle, pos: "50% 30%" },
      { n: "Auditoriums", img: IMG.auditorium },
    ] as Sub[],
  },
  {
    key: "catering",
    title: "Catering & Decoration",
    icon: UtensilsCrossed,
    img: IMG.buffet,
    presenter: "Catering & Decoration",
    concept: "Multi-service selection and booking relationships",
    explain:
      "One booking can be linked to many services. The data model stores these as relationships between records.",
    subs: [
      { n: "Food Packages", img: IMG.buffet },
      { n: "Desserts", img: IMG.desserts, pos: "50% 40%" },
      { n: "Beverages", img: IMG.beverages },
      { n: "Themes", img: IMG.buffetOrange, pos: "50% 30%" },
      { n: "Floral Decoration", img: IMG.floralArch, pos: "50% 20%" },
      { n: "Stage & Lighting", img: IMG.weddingStage, pos: "50% 30%" },
    ] as Sub[],
  },
  {
    key: "sports",
    title: "Sports & Recreation",
    icon: Trophy,
    img: IMG.futsal,
    presenter: "Sports & Recreation",
    concept: "Availability and time-slot management",
    explain:
      "Facilities are booked in short, repeating time slots. The system must track each slot's status to avoid conflicts.",
    subs: [
      { n: "Cricket", img: IMG.cricket },
      { n: "Football / Futsal", img: IMG.futsal },
      { n: "Basketball", img: IMG.basketball, pos: "50% 40%" },
      { n: "Badminton", img: IMG.courtsAerial },
      { n: "Indoor Sports", img: IMG.climbing, pos: "50% 20%" },
      { n: "Gaming Arenas", img: IMG.gaming },
    ] as Sub[],
  },
  {
    key: "stay",
    title: "Accommodation & Hospitality",
    icon: BedDouble,
    img: IMG.hotel,
    presenter: "Accommodation & Hospitality",
    concept: "Database-driven listings and availability",
    explain:
      "Rooms and spaces are stored as database records with date-based availability that updates as bookings are made.",
    subs: [
      { n: "Hotels", img: IMG.hotel },
      { n: "Guest Houses", img: IMG.guestHouse, pos: "50% 40%" },
      { n: "Apartments", img: IMG.apartment, pos: "50% 40%" },
      { n: "Vacation Homes", img: IMG.resortPool, pos: "50% 40%" },
      { n: "Meeting Rooms", img: IMG.meeting },
      { n: "Workspaces", img: IMG.workspace },
    ] as Sub[],
  },
];

export default function Domains() {
  const [active, setActive] = useState(0);
  const d = domains[active];

  return (
    <Section id="categories" tone="light">
      <SectionHeader
        tone="light"
        number="05"
        eyebrow="Four Marketplace Domains"
        title="One platform, four categories — each with a CS focus."
        lead="The proposed marketplace groups listings into four domains. Each one highlights a different Computer Science concept."
      />

      <Reveal>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {domains.map((x, i) => (
            <button
              key={x.key}
              onClick={() => setActive(i)}
              className={cn(
                "group relative h-44 overflow-hidden rounded-2xl text-left transition-all duration-300 sm:h-56",
                active === i
                  ? "ring-2 ring-accent ring-offset-4 ring-offset-paper"
                  : "opacity-80 hover:opacity-100"
              )}
            >
              <img
                src={x.img}
                alt={x.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 text-white backdrop-blur">
                  <x.icon className="h-4 w-4" />
                </div>
                <div className="text-sm font-semibold leading-tight text-white sm:text-base">
                  {x.title}
                </div>
                <div className="mt-0.5 hidden text-[11px] text-slate-300 sm:block">
                  {x.concept}
                </div>
              </div>
            </button>
          ))}
        </div>
      </Reveal>

      <div key={d.key} className="fade-in mt-8 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <div className="relative overflow-hidden rounded-3xl bg-navy p-6 text-white sm:p-8">
          <img src={d.img} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/90 to-navy/60" />
          <div className="relative">
            <PresenterTag role={d.presenter} />
            <h3 className="mt-5 text-3xl font-semibold tracking-tight">{d.title}</h3>
            <div className="mt-6 rounded-2xl border border-accent/30 bg-accent/10 p-4">
              <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-accent-soft">
                <Cpu className="h-3.5 w-3.5" /> CS concept
              </div>
              <div className="mt-1.5 text-lg font-semibold">{d.concept}</div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-slate-300">{d.explain}</p>
            <div className="mt-6 flex flex-wrap gap-1.5">
              {d.subs.map((s) => (
                <span
                  key={s.n}
                  className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-300"
                >
                  {s.n}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {d.subs.map((s, i) => (
            <div
              key={s.n}
              className={cn(
                "group relative overflow-hidden rounded-2xl border border-slate-900/[0.08] bg-white",
                i === 0 ? "col-span-2 row-span-2 min-h-[260px] sm:min-h-0" : "min-h-[130px]"
              )}
            >
              <img
                src={s.img}
                alt={s.n}
                loading="lazy"
                style={{ objectPosition: s.pos ?? "center" }}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-3">
                <span className="text-sm font-semibold text-white">{s.n}</span>
                <ArrowUpRight className="h-4 w-4 text-white opacity-0 transition group-hover:opacity-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
