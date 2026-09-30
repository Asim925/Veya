"use client";

import { PHASES, REVENUE } from "@/lib/data";
import { Reveal, SectionHead } from "@/components/ui";

export default function Finance() {
  return (
    <section id="finance" className="relative scroll-mt-20 overflow-hidden bg-ink-950 py-20 text-paper md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/3 h-[460px] w-[460px] rounded-full bg-accent/10 blur-[140px]"
      />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead
          dark
          k="09"
          label="Business Model"
          title="How VEYA earns"
          sub="Four revenue lines, all tied to real activity on the platform. This is the model — no projections shown."
        />

        <div className="grid gap-4 md:grid-cols-2">
          {REVENUE.map((r, i) => (
            <Reveal key={r.n} delay={(i % 2) * 100}>
              <div className="group flex items-start gap-5 rounded-2xl border border-paper/12 bg-paper/[0.03] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-paper/25 hover:bg-paper/[0.06] md:p-7">
                <span className="font-serif text-4xl italic leading-none text-paper/25 transition-colors duration-500 group-hover:text-accent-2/70">
                  {r.n}
                </span>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight">{r.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-paper/55">{r.line}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* growth roadmap */}
        <div className="mt-20">
          <Reveal>
            <div className="mb-8 flex flex-wrap items-center gap-4">
              <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Proposed Growth Roadmap
              </h3>
              <span className="rounded-full border border-accent-2/40 bg-accent/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-2">
                Proposed — direction, not commitments
              </span>
            </div>
          </Reveal>

          <Reveal delay={120} className="relative">
            <div aria-hidden className="absolute left-0 right-0 top-[10px] hidden h-px bg-paper/15 lg:block">
              <div className="line-draw h-px w-full bg-gradient-to-r from-accent-2 via-accent to-accent/20" />
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {PHASES.map((p) => (
                <div key={p.n} className="group relative pt-8">
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 h-[19px] w-[19px] rounded-full border-2 border-ink-950 bg-accent shadow-[0_0_0_4px_rgb(78_123_232/0.2)] transition-transform duration-300 group-hover:scale-125 lg:block"
                  />
                  <div className="rounded-2xl border border-paper/12 bg-ink-900/70 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-paper/25 md:p-7">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent-2">{p.tag}</p>
                    <h4 className="mt-2 text-3xl font-semibold tracking-tight">{p.title}</h4>
                    <ul className="mt-5 space-y-2.5">
                      {p.lines.map((l) => (
                        <li key={l} className="flex items-center gap-2.5 text-sm text-paper/60">
                          <span className="h-1 w-1 rotate-45 bg-accent-2/70" aria-hidden />
                          {l}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
