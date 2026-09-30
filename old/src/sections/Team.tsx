"use client";

import { TEAM } from "@/lib/data";
import { Reveal, SectionHead, ItalicLight } from "@/components/ui";
import { ArrowUpRight } from "@/components/icons";

export default function Team() {
  return (
    <section id="team" className="scroll-mt-20 bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead
          k="10"
          label="Founding Team"
          title={
            <>
              Seven partners. <ItalicLight>One platform.</ItalicLight>
            </>
          }
          sub="Every function of VEYA is led by a founding partner from day one."
        />

        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-ink-950/10 bg-warm-white shadow-card">
            {TEAM.map((t, i) => (
              <div
                key={t.n}
                className={`group flex flex-col gap-2 px-5 py-5 transition-colors duration-300 hover:bg-paper md:flex-row md:items-center md:gap-6 md:px-7 md:py-6 ${
                  i > 0 ? "border-t border-ink-950/8" : ""
                }`}
              >
                <span className="w-10 shrink-0 font-serif text-2xl italic text-ink-950/30 transition-colors duration-300 group-hover:text-accent-deep">
                  {t.n}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-semibold tracking-tight text-ink-950 md:text-xl">{t.role}</h3>
                  <p className="mt-0.5 text-[13px] text-ink-950/50">{t.line}</p>
                </div>
                <span className="shrink-0 rounded-full border border-ink-950/12 bg-paper px-3.5 py-1.5 text-xs font-semibold text-ink-950/60">
                  {t.domain}
                </span>
                <ArrowUpRight
                  aria-hidden
                  className="hidden h-5 w-5 shrink-0 text-ink-950/20 transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent-deep md:block"
                />
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={140}>
          <blockquote className="mt-10 border-l-2 border-accent pl-5 md:max-w-3xl md:pl-7">
            <p className="font-serif text-xl italic leading-relaxed text-ink-950/75 md:text-2xl">
              “At launch, the seven founding partners directly manage their respective functions. As VEYA grows,
              dedicated teams can be added.”
            </p>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
