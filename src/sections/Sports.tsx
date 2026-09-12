"use client";

import { useState } from "react";
import { SPORTS, SLOTS, rs } from "@/lib/data";
import { Reveal, SectionHead } from "@/components/ui";
import { Pin, Check, ChevronDown, Clock } from "@/components/icons";

export default function Sports() {
  const [facility, setFacility] = useState(SPORTS[0].name);
  const [slot, setSlot] = useState(SLOTS[1]);
  const [booking, setBooking] = useState(false);
  const [booked, setBooked] = useState<{ facility: string; slot: string; ref: string } | null>(null);

  const reserve = async () => {
    setBooking(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ facility, slot }),
      });
      const json = await res.json();
      if (json.ok) setBooked({ facility, slot, ref: json.reference });
    } finally {
      setBooking(false);
    }
  };

  return (
    <section id="sports" className="relative scroll-mt-20 overflow-hidden bg-ink-900 py-20 text-paper md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-0 h-[420px] w-[420px] rounded-full bg-accent/10 blur-[130px]"
      />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead
          dark
          k="05"
          label="Sports & Recreation"
          title={
            <>
              Book the court. <em className="font-serif italic font-normal text-accent-2">Play tonight.</em>
            </>
          }
          sub="Cricket to gaming arenas — pick a facility and reserve a slot by the hour."
        />

        <div className="grid gap-8 xl:grid-cols-[1fr_380px]">
          {/* facilities */}
          <div className="grid gap-4 sm:grid-cols-2">
            {SPORTS.map((s, i) => (
              <Reveal key={s.name} delay={(i % 2) * 90}>
                <article className="group overflow-hidden rounded-2xl border border-paper/12 bg-ink-850 shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-paper/25 hover:shadow-lift">
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={s.img}
                      alt={`${s.kind} — image placeholder`}
                      className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.07]"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-ink-950/60 px-3 py-1 text-[11px] font-medium text-paper backdrop-blur-sm">
                      {s.kind}
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-3 p-4">
                    <div className="min-w-0">
                      <h3 className="truncate text-[15px] font-semibold tracking-tight">{s.name}</h3>
                      <p className="mt-1 flex items-center gap-1.5 text-xs text-paper/50">
                        <Pin className="h-3.5 w-3.5" /> {s.area}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setFacility(s.name);
                        setBooked(null);
                      }}
                      className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all duration-300 ${
                        facility === s.name && !booked
                          ? "border-accent-2 bg-accent/20 text-accent-2"
                          : "border-paper/20 text-paper/70 hover:border-paper/40 hover:text-paper"
                      }`}
                    >
                      {rs(s.price)} / hr
                    </button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {/* slot booking */}
          <Reveal delay={150} className="xl:sticky xl:top-24 xl:self-start">
            <div className="glass-dark rounded-3xl p-6 shadow-soft md:p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-accent-2">Time-Slot Booking</p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight">Reserve a slot</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-paper/50">
                Demo booking — saved to VEYA&apos;s prototype database.
              </p>

              {booked ? (
                <div className="mt-6 rounded-2xl border border-accent-2/40 bg-accent/12 p-5 text-center">
                  <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-accent text-white">
                    <Check className="h-5 w-5" />
                  </span>
                  <p className="mt-3 text-base font-semibold">
                    {booked.slot} at {booked.facility}
                  </p>
                  <p className="text-xs text-paper/60">is reserved.</p>
                  <p className="mt-3 font-mono text-sm tracking-widest text-accent-2">{booked.ref}</p>
                  <button
                    onClick={() => setBooked(null)}
                    className="mt-4 w-full rounded-full border border-paper/20 py-2.5 text-xs font-semibold text-paper transition hover:bg-paper/10"
                  >
                    Book another slot
                  </button>
                </div>
              ) : (
                <>
                  <label className="mt-5 block">
                    <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.2em] text-paper/45">
                      Facility
                    </span>
                    <span className="relative block">
                      <select
                        value={facility}
                        onChange={(e) => setFacility(e.target.value)}
                        className="w-full cursor-pointer appearance-none rounded-xl border border-paper/15 bg-paper/5 px-4 py-3 pr-9 text-sm font-medium text-paper transition focus:border-accent-2 focus:outline-none"
                      >
                        {SPORTS.map((s) => (
                          <option key={s.name} className="bg-ink-900 text-paper">
                            {s.name} · {rs(s.price)}/hr
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-paper/40" />
                    </span>
                  </label>

                  <div className="mt-5">
                    <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.2em] text-paper/45">
                      Slot
                    </span>
                    <div className="grid grid-cols-4 gap-2">
                      {SLOTS.map((t) => (
                        <button
                          key={t}
                          onClick={() => setSlot(t)}
                          className={`rounded-xl border py-2.5 text-xs font-semibold transition-all duration-300 ${
                            slot === t
                              ? "border-accent bg-accent text-white shadow-[0_8px_20px_-8px_rgb(78_123_232/0.6)]"
                              : "border-paper/15 bg-paper/[0.03] text-paper/60 hover:border-paper/35 hover:text-paper"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={reserve}
                    disabled={booking}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-accent py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-deep disabled:opacity-60"
                  >
                    <Clock className="h-4 w-4" />
                    {booking ? "Reserving…" : "Book Slot"}
                  </button>
                  <p className="mt-3 text-center text-[11px] text-paper/40">
                    No payment in the prototype — this demonstrates the flow.
                  </p>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
