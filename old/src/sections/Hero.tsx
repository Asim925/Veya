"use client";

import { useState, type FormEvent } from "react";
import { IMG } from "@/lib/media";
import { Reveal, Italic, btnPrimary, btnGhostDark } from "@/components/ui";
import { Search, Pin, Calendar, Users, ArrowRight, ArrowUpRight } from "@/components/icons";

export type HeroSearch = { q: string; location: string; ts: number };

const SHORTCUTS = [
  { label: "Large Events", target: "events" },
  { label: "Catering", target: "catering" },
  { label: "Decoration", target: "catering" },
  { label: "Sports", target: "sports" },
  { label: "Stays", target: "hospitality" },
  { label: "Workspaces", target: "hospitality" },
];

const TICKER = [
  "Large Events",
  "Catering",
  "Decoration",
  "Sports",
  "Stays",
  "Workspaces",
  "Farmhouses",
  "Rooftops",
  "Gaming Arenas",
  "Auditoriums",
];

const COLLAGE = [
  { img: IMG.heroEvent, label: "Event venue" },
  { img: IMG.heroSports, label: "Sports facility" },
  { img: IMG.heroCatering, label: "Catering & decor" },
  { img: IMG.heroHotel, label: "Hotel / workspace" },
];

export default function Hero({ onSearch }: { onSearch: (s: HeroSearch) => void }) {
  const [q, setQ] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("2");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    onSearch({ q, location, ts: Date.now() });
  };

  const jump = (id: string) => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <section id="top" className="relative overflow-hidden bg-ink-950 text-paper">
      {/* ambient glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/4 h-[520px] w-[520px] rounded-full bg-accent/14 blur-[140px]" />
        <div className="absolute right-0 top-1/3 h-[420px] w-[420px] rounded-full bg-accent-deep/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgb(255_255_255/0.04),transparent_55%)]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 pb-16 pt-28 md:px-8 md:pt-36 lg:grid-cols-12 lg:gap-8 lg:pb-20">
        {/* left — copy + search */}
        <div className="lg:col-span-6 xl:col-span-6">
          <Reveal>
            <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-paper/15 bg-paper/5 px-4 py-1.5">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent-2" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-paper/60">
                Computer Science case study · proposed system
              </span>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-accent-2">
              <span aria-hidden className="h-px w-9 bg-accent-2/60" />
              Venue + Way · an informative case study
            </p>
          </Reveal>

          <Reveal delay={160}>
            <h1 className="mt-5 text-[40px] font-semibold leading-[1.04] tracking-[-0.03em] text-balance sm:text-[52px] xl:text-[62px]">
              A digital marketplace explained through <Italic>Computer Science.</Italic>
            </h1>
          </Reveal>

          <Reveal delay={240}>
            <p className="mt-6 max-w-lg text-[15.5px] leading-relaxed text-paper/60">
              Explore how interfaces, APIs, databases, search, security and cloud infrastructure could work together in one proposed booking system.
            </p>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#categories" className={btnPrimary}>
                Explore VEYA
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a href="#providers" className={btnGhostDark}>
                List Your Business
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>

          {/* search panel */}
          <Reveal delay={420}>
            <form
              onSubmit={submit}
              className="glass-dark mt-10 rounded-2xl p-3 shadow-soft"
              aria-label="Search VEYA"
            >
              <p className="px-3 pb-2 pt-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-paper/45">
                What are you looking for?
              </p>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_0.9fr_auto]">
                <label className="flex items-center gap-3 rounded-xl bg-paper/5 px-3.5 py-3 transition focus-within:bg-paper/10 focus-within:ring-1 focus-within:ring-accent-2/50">
                  <Search className="h-4 w-4 shrink-0 text-paper/40" />
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Venue, service or place…"
                    className="w-full bg-transparent text-sm text-paper outline-none placeholder:text-paper/35"
                  />
                </label>
                <label className="flex items-center gap-3 rounded-xl bg-paper/5 px-3.5 py-3 transition focus-within:bg-paper/10 focus-within:ring-1 focus-within:ring-accent-2/50">
                  <Pin className="h-4 w-4 shrink-0 text-paper/40" />
                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Location"
                    className="w-full bg-transparent text-sm text-paper outline-none placeholder:text-paper/35"
                  />
                </label>
                <label className="flex items-center gap-3 rounded-xl bg-paper/5 px-3.5 py-3 transition focus-within:bg-paper/10 focus-within:ring-1 focus-within:ring-accent-2/50">
                  <Calendar className="h-4 w-4 shrink-0 text-paper/40" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-transparent text-sm text-paper/80 outline-none [color-scheme:dark]"
                  />
                </label>
                <label className="flex items-center gap-3 rounded-xl bg-paper/5 px-3.5 py-3 transition focus-within:bg-paper/10 focus-within:ring-1 focus-within:ring-accent-2/50">
                  <Users className="h-4 w-4 shrink-0 text-paper/40" />
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full appearance-none bg-transparent text-sm text-paper/80 outline-none"
                  >
                    <option className="text-ink-950">1 – 2 people</option>
                    <option className="text-ink-950">3 – 10 people</option>
                    <option className="text-ink-950">10 – 50 people</option>
                    <option className="text-ink-950">50+ people</option>
                  </select>
                </label>
                <button
                  type="submit"
                  className="group flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-deep sm:col-span-2 lg:col-span-1"
                >
                  <Search className="h-4 w-4" />
                  Search
                </button>
              </div>
            </form>
          </Reveal>

          <Reveal delay={520}>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="mr-1 text-xs font-medium uppercase tracking-[0.18em] text-paper/40">Popular</span>
              {SHORTCUTS.map((s) => (
                <button
                  key={s.label}
                  onClick={() => jump(s.target)}
                  className="rounded-full border border-paper/15 px-3.5 py-1.5 text-xs font-medium text-paper/65 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-2/60 hover:text-paper"
                >
                  {s.label}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        {/* right — collage */}
        <div className="lg:col-span-6">
          {/* mobile: simple 2x2 grid */}
          <div className="grid grid-cols-2 gap-3 md:hidden">
            {COLLAGE.map((c, i) => (
              <div
                key={c.label}
                className={`overflow-hidden rounded-xl border border-paper/15 ${i % 2 ? "mt-6" : ""}`}
              >
                <img src={c.img} alt={`${c.label} — image placeholder`} className="h-40 w-full object-cover" />
              </div>
            ))}
          </div>

          {/* desktop: scattered postcard collage */}
          <div className="relative hidden h-[600px] md:block" aria-label="VEYA gallery collage — image placeholders">
            <span
              aria-hidden
              className="text-outline pointer-events-none absolute -right-8 -top-20 select-none text-[10.5rem] font-bold leading-none tracking-tighter"
            >
              VEYA
            </span>

            <div className="absolute left-0 top-0 h-[66%] w-[54%] -rotate-2 overflow-hidden rounded-2xl border border-paper/15 shadow-lift">
              <img
                src={IMG.heroEvent}
                alt="Event venue — image placeholder"
                className="kenburns h-full w-full object-cover"
              />
            </div>
            <div className="absolute right-0 top-[5%] h-[38%] w-[42%] rotate-[1.6deg] overflow-hidden rounded-2xl border border-paper/15 shadow-lift">
              <img
                src={IMG.heroSports}
                alt="Sports facility — image placeholder"
                className="kenburns h-full w-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 left-[9%] h-[34%] w-[44%] rotate-[2deg] overflow-hidden rounded-2xl border border-paper/15 shadow-lift">
              <img
                src={IMG.heroHotel}
                alt="Hotel / workspace — image placeholder"
                className="kenburns h-full w-full object-cover"
              />
            </div>
            <div className="absolute right-[5%] top-[50%] h-[36%] w-[37%] -rotate-[1.2deg] overflow-hidden rounded-2xl border border-paper/15 shadow-lift">
              <img
                src={IMG.heroCatering}
                alt="Catering and decor — image placeholder"
                className="kenburns h-full w-full object-cover"
              />
            </div>

            <div className="glass-dark floaty absolute left-[38%] top-[36%] z-10 flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-paper shadow-lift">
              <Pin className="h-3.5 w-3.5 text-accent-2" />
              Farmhouse · from Rs 320,000
            </div>
            <div className="glass-dark floaty-late absolute right-[16%] top-[92%] z-10 flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-paper shadow-lift">
              <Calendar className="h-3.5 w-3.5 text-accent-2" />
              Slot 7:00 PM · Cricket
            </div>

            <div className="glass-dark absolute -left-4 bottom-[24%] z-10 flex h-24 w-24 items-center justify-center rounded-full">
              <svg viewBox="0 0 100 100" className="spin-slow h-[88px] w-[88px]">
                <defs>
                  <path id="veya-circ" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
                </defs>
                <text className="fill-paper/55" style={{ fontSize: "9.5px", letterSpacing: "2.6px" }}>
                  <textPath href="#veya-circ">VENUE + WAY · FIND · BOOK · VEYA ·</textPath>
                </text>
              </svg>
              <span className="pointer-events-none absolute text-lg font-semibold text-paper">V</span>
            </div>
          </div>
        </div>
      </div>

      {/* ticker */}
      <div className="marquee relative border-t border-paper/10 py-4" aria-hidden>
        <div className="marquee-track items-center gap-8">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center gap-8 pr-8">
              {TICKER.map((t, i) => (
                <span key={`${dup}-${t}`} className="flex items-center gap-8">
                  <span
                    className={
                      i % 2
                        ? "text-sm font-semibold uppercase tracking-[0.3em] text-paper/40"
                        : "font-serif text-xl italic text-paper/55"
                    }
                  >
                    {t}
                  </span>
                  <span className="h-1.5 w-1.5 rotate-45 bg-accent-2/50" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
