"use client";

import { CHANNELS, PROVIDER_STEPS } from "@/lib/data";
import { IMG } from "@/lib/media";
import { Reveal, SectionHead, btnPrimary } from "@/components/ui";
import { Heart, Chat, Send, Play, Search, ArrowRight } from "@/components/icons";

export default function Campaign() {
  return (
    <section id="campaign" className="relative scroll-mt-20 overflow-hidden bg-ink-950 py-20 text-paper md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/4 h-[460px] w-[460px] rounded-full bg-accent/12 blur-[140px]"
      />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead
          dark
          k="07"
          label="Marketing & Business Development"
          title={
            <>
              VEYA <em className="font-serif italic font-normal text-accent-2">Campaign Studio</em>
            </>
          }
          sub="Three launch campaigns, designed for how people actually search for places. These are concepts — not results."
        />

        {/* mockups */}
        <div className="grid items-start gap-8 lg:grid-cols-3">
          {/* 1 — social media (instagram-style post) */}
          <Reveal>
            <div className="mx-auto max-w-[320px]">
              <div className="-rotate-1 overflow-hidden rounded-2xl bg-warm-white text-ink-950 shadow-lift transition-transform duration-500 hover:rotate-0">
                <div className="flex items-center gap-3 px-4 py-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
                    V
                  </span>
                  <div className="leading-tight">
                    <p className="text-[13px] font-semibold">vaya</p>
                    <p className="text-[11px] text-ink-950/45">Launch campaign</p>
                  </div>
                  <span className="ml-auto text-ink-950/30">•••</span>
                </div>
                <img
                  src={IMG.campSocial}
                  alt="Campaign creative — image placeholder"
                  className="aspect-square w-full object-cover"
                />
                <div className="px-4 py-3">
                  <div className="flex items-center gap-4 text-ink-950/70">
                    <Heart className="h-[18px] w-[18px]" />
                    <Chat className="h-[18px] w-[18px]" />
                    <Send className="h-[18px] w-[18px]" />
                  </div>
                  <p className="mt-2.5 text-[13px] leading-relaxed">
                    <span className="font-semibold">vaya</span> Your plan. One place.{" "}
                    <span className="text-accent-deep">#VEYA</span>
                  </p>
                </div>
              </div>
              <p className="mt-4 text-center text-[11px] font-semibold uppercase tracking-[0.24em] text-paper/40">
                Social Media — Launch
              </p>
            </div>
          </Reveal>

          {/* 2 — seasonal (tiktok-style video card) */}
          <Reveal delay={120}>
            <div className="mx-auto max-w-[280px]">
              <div className="relative aspect-[9/16] overflow-hidden rounded-[24px] border border-paper/15 bg-ink-850 shadow-lift">
                <img
                  src={IMG.campSeasonal}
                  alt="Seasonal campaign creative — image placeholder"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/20 to-ink-950/30" />
                <div className="absolute left-4 top-4 text-[13px] font-semibold text-paper">@vaya</div>
                <button
                  aria-hidden
                  className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-paper/40 bg-paper/10 text-paper backdrop-blur-sm"
                >
                  <Play className="h-6 w-6 translate-x-0.5" />
                </button>
                <div className="absolute bottom-16 right-3 flex flex-col items-center gap-4 text-paper/85">
                  <span className="flex flex-col items-center gap-1">
                    <Heart className="h-6 w-6" />
                  </span>
                  <span className="flex flex-col items-center gap-1">
                    <Chat className="h-6 w-6" />
                  </span>
                  <span className="flex flex-col items-center gap-1">
                    <Send className="h-6 w-6" />
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-12">
                  <p className="text-[26px] font-semibold leading-tight tracking-tight text-paper">
                    Planning something? <em className="font-serif italic font-normal text-accent-2">VEYA it.</em>
                  </p>
                </div>
              </div>
              <p className="mt-4 text-center text-[11px] font-semibold uppercase tracking-[0.24em] text-paper/40">
                Seasonal — Video
              </p>
            </div>
          </Reveal>

          {/* 3 — provider (google-style search ad) */}
          <Reveal delay={240}>
            <div className="mx-auto max-w-[320px]">
              <div className="rotate-1 rounded-2xl bg-warm-white p-5 text-ink-950 shadow-lift transition-transform duration-500 hover:rotate-0">
                <div className="flex items-center gap-3 rounded-full border border-ink-950/12 bg-paper px-4 py-2.5">
                  <Search className="h-4 w-4 text-ink-950/40" />
                  <span className="text-[13px] text-ink-950/70">wedding venue karachi</span>
                </div>
                <div className="mt-4 rounded-xl border border-ink-950/10 bg-paper/60 p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-950/40">Sponsored</p>
                  <p className="mt-1.5 text-[15px] font-semibold text-accent-deep">VEYA — List your business on VEYA</p>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-ink-950/60">
                    Join verified providers across four categories. Reach people planning their next event, match
                    and venue.
                  </p>
                  <p className="mt-2 text-[11px] text-ink-950/45">veya.pk · Providers</p>
                </div>
                <div className="mt-4 space-y-3 px-1">
                  <div className="h-2.5 w-3/4 rounded-full bg-ink-950/10" />
                  <div className="h-2.5 w-1/2 rounded-full bg-ink-950/10" />
                  <div className="h-2.5 w-2/3 rounded-full bg-ink-950/10" />
                </div>
              </div>
              <p className="mt-4 text-center text-[11px] font-semibold uppercase tracking-[0.24em] text-paper/40">
                Provider — Search Ads
              </p>
            </div>
          </Reveal>
        </div>

        {/* channels */}
        <Reveal delay={120}>
          <div className="mt-14 flex flex-wrap items-center gap-2.5">
            <span className="mr-2 text-xs font-semibold uppercase tracking-[0.22em] text-paper/40">
              Channels at launch
            </span>
            {CHANNELS.map((c) => (
              <span
                key={c}
                className="rounded-full border border-paper/15 px-4 py-2 text-xs font-medium text-paper/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-2/60 hover:text-paper"
              >
                {c}
              </span>
            ))}
          </div>
        </Reveal>

        {/* list your business stepper */}
        <Reveal delay={180}>
          <div className="glass-dark mt-14 rounded-3xl p-7 md:p-10">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-accent-2">
                  List Your Business
                </p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
                  From sign-up to <em className="font-serif italic font-normal text-accent-2">first booking.</em>
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-paper/55">
                  Five steps for every provider — the same path whether you run a banquet hall or a badminton court.
                </p>
              </div>
              <a href="#providers" className={btnPrimary}>
                Start listing
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>

            <div className="mt-10">
              <div aria-hidden className="absolute" />
              <div className="relative">
                <div aria-hidden className="absolute left-0 right-0 top-[14px] hidden h-px bg-paper/15 lg:block">
                  <div className="line-draw h-px w-full bg-gradient-to-r from-accent-2 via-accent to-accent/20" />
                </div>
                <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
                  {PROVIDER_STEPS.map((s, i) => (
                    <li key={s} className="relative flex items-center gap-3 lg:block">
                      <span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-accent-2/60 bg-ink-950 text-[11px] font-bold text-accent-2">
                        {i + 1}
                      </span>
                      <span className="text-sm font-medium text-paper/80">{s}</span>
                      {i < PROVIDER_STEPS.length - 1 && (
                        <ArrowRight aria-hidden className="ml-1 hidden h-3.5 w-3.5 text-paper/30 lg:block" />
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
