"use client";

import { Reveal, Italic, btnPrimary, btnGhostDark } from "@/components/ui";
import { ArrowRight, ArrowUpRight } from "@/components/icons";

export default function Closing() {
  return (
    <>
      {/* about */}
      <section id="about" className="scroll-mt-20 bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-5 text-center md:px-8">
          <Reveal>
            <p className="flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-ink-950/45">
              <span aria-hidden className="h-px w-8 bg-current opacity-60" />
              11 / About VEYA
              <span aria-hidden className="h-px w-8 bg-current opacity-60" />
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-6 font-serif text-5xl italic leading-tight text-ink-950 md:text-6xl">
              VEYA <span className="not-italic text-ink-950/35">=</span> Venue + Way
            </h2>
          </Reveal>
          <Reveal delay={190}>
            <p className="mx-auto mt-6 max-w-xl text-[15.5px] leading-relaxed text-ink-950/60">
              VEYA represents a new way to discover and book places and services, bringing different booking needs
              together on one platform.
            </p>
          </Reveal>
        </div>
      </section>

      {/* final CTA */}
      <section className="relative overflow-hidden bg-ink-950 py-24 text-paper md:py-36">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[480px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/14 blur-[150px]" />
        </div>
        <span
          aria-hidden
          className="text-outline pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 select-none whitespace-nowrap text-[26vw] font-bold leading-none tracking-tighter md:text-[18rem]"
        >
          VEYA
        </span>

        <div className="relative mx-auto max-w-4xl px-5 text-center md:px-8">
          <Reveal>
            <h2 className="text-[36px] font-semibold leading-[1.06] tracking-[-0.03em] text-balance md:text-[58px]">
              Whatever you&apos;re planning,
              <br />
              there&apos;s a <Italic>way to VEYA.</Italic>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 text-base text-paper/60 md:text-lg">
              Discover places. Add services. Make your plan.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <a href="#top" className={btnPrimary}>
                Explore VEYA
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a href="#providers" className={btnGhostDark}>
                List Your Business
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
