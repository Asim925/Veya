"use client";

import { HOW_STEPS } from "@/lib/data";
import { Reveal, SectionHead } from "@/components/ui";
import { ArrowRight } from "@/components/icons";

export default function HowItWorks() {
  return (
    <section id="how" className="relative scroll-mt-20 overflow-hidden bg-ink-950 py-20 text-paper md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-0 h-[420px] w-[420px] rounded-full bg-accent/10 blur-[130px]"
      />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead
          dark
          k="02"
          label="Process"
          title="How VEYA works"
          sub="A single flow from first search to confirmed booking — no jumping between apps or calls."
        />

        <Reveal className="relative" delay={100}>
          {/* connector line */}
          <div aria-hidden className="absolute left-0 right-0 top-[7px] hidden h-px bg-paper/15 lg:block">
            <div className="line-draw h-px w-full bg-gradient-to-r from-accent-2 via-accent to-accent-2/30" />
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {HOW_STEPS.map((s, i) => (
              <div key={s.n} className="group relative pt-8 lg:pt-10">
                <span
                  aria-hidden
                  className="absolute top-0 hidden h-[15px] w-[15px] -translate-x-1/2 rounded-full border-2 border-ink-950 bg-accent shadow-[0_0_0_4px_rgb(78_123_232/0.2)] transition-transform duration-300 group-hover:scale-125 lg:left-0 lg:block lg:left-[0%]"
                  style={{ left: 0 }}
                />
                <p className="font-serif text-4xl italic text-paper/25 transition-colors duration-500 group-hover:text-accent-2/70">
                  {s.n}
                </p>
                <h3 className="mt-3 text-xl font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2.5 max-w-[26ch] text-sm leading-relaxed text-paper/55">{s.line}</p>
                {i < HOW_STEPS.length - 1 && (
                  <ArrowRight aria-hidden className="absolute right-0 top-1 hidden h-4 w-4 text-paper/25 lg:block" />
                )}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={250}>
          <div className="mt-14 flex flex-wrap items-center gap-4 border-t border-paper/10 pt-8">
            <p className="text-sm text-paper/50">
              Four steps. One platform. That&apos;s the whole point.
            </p>
            <a
              href="#events"
              className="ml-auto inline-flex items-center gap-2 text-sm font-semibold text-accent-2 transition-all duration-300 hover:gap-3"
            >
              Start exploring <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
