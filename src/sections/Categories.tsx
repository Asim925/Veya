"use client";

import { CATEGORIES } from "@/lib/data";
import { Reveal, SectionHead, ItalicLight } from "@/components/ui";
import { ArrowRight, ArrowUpRight } from "@/components/icons";

export default function Categories() {
  return (
    <section id="categories" className="scroll-mt-20 bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead
          k="01"
          label="Categories"
          title={
            <>
              Everything you need. <ItalicLight>One place.</ItalicLight>
            </>
          }
          sub="Four categories, one booking flow. Browse a gallery or jump straight into the space you need."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {CATEGORIES.map((c, i) => (
            <Reveal key={c.title} delay={(i % 2) * 110}>
              <a
                href={c.href}
                className="group block overflow-hidden rounded-2xl border border-ink-950/10 bg-warm-white shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift"
              >
                <div className="relative h-60 overflow-hidden md:h-64">
                  <img
                    src={c.img}
                    alt={`${c.title} — image placeholder`}
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/45 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-ink-950/55 px-3 py-1 text-[11px] font-semibold tracking-[0.2em] text-paper backdrop-blur-sm">
                    {c.n}
                  </span>
                  <span className="absolute bottom-4 left-4 font-serif text-lg italic text-paper/90">{c.blurb}</span>
                </div>
                <div className="p-6 md:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-[22px] font-semibold tracking-tight text-ink-950">{c.title}</h3>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink-950/15 text-ink-950 transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                      <ArrowUpRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {c.items.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-ink-950/10 bg-paper px-3 py-1 text-xs text-ink-950/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent-deep">
                    Explore
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
