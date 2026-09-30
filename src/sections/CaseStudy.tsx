"use client";

import { Reveal, SectionHead } from "@/components/ui";

const layers = ["Web browser / mobile app", "User interface", "API layer", "Authentication · search · booking logic", "Users · listings · bookings · services", "Cloud infrastructure"];
const security = [
  ["Authentication", "Verifies user identity."],
  ["Authorization", "Controls what different roles can access."],
  ["Encryption", "Protects sensitive data in transit and storage."],
  ["Input validation", "Helps prevent invalid or malicious data."],
  ["Privacy", "Uses user information appropriately."],
  ["Secure payments", "Would rely on trusted payment infrastructure."],
];
const future = ["Mobile application", "AI-based recommendations", "Smarter search", "Provider verification", "Data analytics", "Real-time notifications"];

export default function CaseStudy() {
  return (
    <section id="architecture" className="scroll-mt-20 bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead k="08" label="Computer Science" title="From interface to infrastructure" sub="VEYA is a proposed case study: a way to make the systems behind a booking marketplace visible and understandable." />
        <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
          <Reveal>
            <div className="rounded-3xl bg-ink-950 p-6 text-paper shadow-lift md:p-8">
              <div className="mb-7 flex items-center justify-between"><div><p className="text-[11px] uppercase tracking-[.22em] text-accent-2">System architecture</p><h3 className="mt-2 text-2xl font-semibold">A connected digital system</h3></div><span className="rounded-full border border-paper/15 px-3 py-1 text-xs text-paper/55">proposed</span></div>
              <div className="space-y-2">
                {layers.map((layer, index) => <div key={layer} className="flex items-center gap-3"><div className="flex-1 rounded-xl border border-paper/12 bg-paper/[.045] px-4 py-3 text-sm text-paper/75"><span className="mr-3 text-xs text-accent-2">0{index + 1}</span>{layer}</div>{index < layers.length - 1 && <span className="text-accent-2">↓</span>}</div>)}
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="h-full rounded-3xl border border-ink-950/10 bg-warm-white p-6 shadow-card md:p-8"><p className="text-[11px] font-semibold uppercase tracking-[.22em] text-accent-deep">Conceptual data model</p><h3 className="mt-2 text-2xl font-semibold">What the system stores</h3><div className="mt-6 grid grid-cols-2 gap-3">{[["Users", "user_id · name · role"], ["Listings", "category · location · price"], ["Availability", "date · slot · status"], ["Bookings", "user · listing · date"], ["Services", "type · provider · price"], ["Relations", "IDs connect records"]].map(([title, text]) => <div key={title} className="rounded-2xl border border-ink-950/10 bg-paper p-4"><h4 className="font-semibold text-ink-950">{title}</h4><p className="mt-2 text-xs leading-relaxed text-ink-950/55">{text}</p></div>)}</div><p className="mt-5 text-sm leading-relaxed text-ink-950/55">These are conceptual examples for the proposed system. Relationships allow one booking to connect a user, venue, availability slot and optional services.</p></div>
          </Reveal>
        </div>

        <div id="security" className="mt-24 scroll-mt-20"><Reveal><div className="flex flex-wrap items-end justify-between gap-5"><div><p className="text-[11px] font-semibold uppercase tracking-[.22em] text-accent-deep">Proposed system considerations</p><h3 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Security is part of the design.</h3></div><p className="max-w-md text-sm leading-relaxed text-ink-950/55">A real implementation would need safeguards at every layer, not just at the payment step.</p></div></Reveal><div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{security.map(([title, text], i) => <Reveal key={title} delay={i * 50}><div className="rounded-2xl border border-ink-950/10 bg-warm-white p-5"><span className="font-serif text-2xl italic text-accent-deep/65">0{i + 1}</span><h4 className="mt-3 font-semibold">{title}</h4><p className="mt-1.5 text-sm leading-relaxed text-ink-950/55">{text}</p></div></Reveal>)}</div></div>

        <div id="future" className="mt-24 scroll-mt-20 rounded-3xl bg-ink-900 p-6 text-paper md:p-10"><Reveal><div className="max-w-2xl"><p className="text-[11px] font-semibold uppercase tracking-[.22em] text-accent-2">Future directions</p><h3 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">What could come next?</h3><p className="mt-4 text-sm leading-relaxed text-paper/55">These are possible future developments, not current capabilities. For example, smarter search could learn preferences such as location, capacity and budget to rank relevant results.</p></div></Reveal><div className="mt-8 flex flex-wrap gap-3">{future.map((item, i) => <span key={item} className="rounded-full border border-paper/15 bg-paper/[.04] px-4 py-2.5 text-sm text-paper/70"><span className="mr-2 text-accent-2">0{i + 1}</span>{item}</span>)}</div></div>
      </div>
    </section>
  );
}
