"use client";

import { Reveal, SectionHead } from "@/components/ui";

const architecture = [
  ["01", "Customer", "Searches, compares and requests a booking."],
  ["02", "Web interface", "Forms, galleries and listing pages make the system usable."],
  ["03", "Application / API layer", "Connects the interface to business rules and data."],
  ["04", "Search & booking logic", "Filters requirements, checks availability and creates bookings."],
  ["05", "Database", "Stores related users, providers, listings, services and bookings."],
  ["06", "Provider / admin system", "Lets providers manage listings, schedules and booking status."],
];

const concepts = [
  ["Web development", "The frontend lets users search, browse galleries, compare listings and submit a booking request."],
  ["Database systems", "A relational database could connect users, providers, venues, services, availability and bookings through IDs and relationships."],
  ["Search & algorithms", "Location, date, capacity, price and category become filters. An algorithm can then rank the closest matches."],
  ["Recommendation systems", "A proposed future feature could suggest venues using preferences, location, budget and previous interactions."],
  ["Cybersecurity", "Authentication, authorization, secure APIs and careful handling of personal information would be required."],
  ["APIs & software architecture", "The frontend communicates with backend services to retrieve listings, availability and booking information."],
  ["Cloud & scalability", "Cloud infrastructure could help the proposed system handle more users, listings and bookings over time."],
];

const security = ["Authentication", "Authorization", "Data protection", "Secure communication", "Input validation"];

export default function CaseStudy() {
  return (
    <section id="architecture" className="scroll-mt-20 bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead
          k="08 / Computer Science"
          label="Technical case study"
          title={<>The technology <em className="font-serif font-normal text-accent-deep">behind</em> VEYA.</>}
          sub="VEYA is a realistic marketplace prototype used to explain the Computer Science concepts needed to build a platform for finding and booking places and services."
        />

        <Reveal>
          <div className="rounded-3xl bg-ink-950 p-6 text-paper shadow-lift md:p-10">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div><p className="text-[11px] uppercase tracking-[.22em] text-accent-2">System architecture</p><h3 className="mt-2 text-2xl font-semibold md:text-3xl">One request, many connected layers</h3></div>
              <span className="rounded-full border border-paper/15 px-3 py-1 text-xs text-paper/55">conceptual / proposed</span>
            </div>
            <div className="mt-8 grid gap-2 md:grid-cols-6 md:gap-0">
              {architecture.map(([number, title, text], index) => <div key={title} className="flex items-center md:block">
                <div className="flex-1 rounded-2xl border border-paper/12 bg-paper/[.045] p-4 md:mx-1 md:min-h-36"><span className="font-mono text-xs text-accent-2">{number}</span><h4 className="mt-3 font-semibold">{title}</h4><p className="mt-2 text-xs leading-relaxed text-paper/55">{text}</p></div>
                {index < architecture.length - 1 && <span className="px-2 text-accent-2 md:flex md:justify-center md:px-0 md:py-3">↓</span>}
              </div>)}
            </div>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <Reveal><div className="h-full rounded-3xl border border-ink-950/10 bg-warm-white p-6 shadow-card md:p-8"><p className="text-[11px] font-semibold uppercase tracking-[.22em] text-accent-deep">How a booking works</p><h3 className="mt-2 text-2xl font-semibold">From search to confirmation</h3><div className="mt-7 flex flex-col gap-2">{["User searches", "System filters listings", "Matching results appear", "User selects a listing", "Availability is checked", "Booking is created", "Database is updated"].map((step, index) => <div key={step} className="flex items-center gap-3"><span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent-soft font-mono text-[10px] text-accent-deep">0{index + 1}</span><span className="text-sm text-ink-950/70">{step}</span>{index < 6 && <span className="ml-auto text-ink-950/25">→</span>}</div>)}</div></div></Reveal>
          <Reveal delay={100}><div className="h-full rounded-3xl bg-ink-900 p-6 text-paper shadow-card md:p-8"><p className="text-[11px] font-semibold uppercase tracking-[.22em] text-accent-2">Search & recommendation demo</p><h3 className="mt-2 text-2xl font-semibold">Turning requirements into results</h3><div className="mt-6 grid gap-4 md:grid-cols-[.8fr_1.2fr]"><div className="rounded-2xl border border-paper/10 bg-paper/[.05] p-5"><p className="text-xs text-paper/45">User</p><p className="mt-3 font-serif text-2xl italic">Wedding</p><div className="mt-5 flex flex-col gap-2 text-sm text-paper/65"><span>Karachi</span><span>200 guests</span><span>Budget: Rs. XXX,XXX</span></div></div><div className="rounded-2xl border border-accent-2/20 bg-accent/10 p-5"><p className="text-xs text-accent-2">System returns matching venues based on</p><div className="mt-4 flex flex-wrap gap-2">{["Location", "Capacity", "Date", "Price", "Category"].map((item) => <span key={item} className="rounded-full border border-paper/15 px-3 py-1.5 text-xs text-paper/75">{item}</span>)}</div><div className="mt-6 border-t border-paper/10 pt-4"><p className="text-xs uppercase tracking-[.16em] text-paper/40">Future intelligence</p><p className="mt-2 text-sm leading-relaxed text-paper/70">“Based on your requirements, these venues and services may suit your plan.”</p><span className="mt-3 inline-block text-[10px] text-accent-2">PROPOSED FEATURE — NOT CURRENTLY IMPLEMENTED</span></div></div></div></div></Reveal>
        </div>

        <div className="mt-16"><Reveal><div className="flex flex-wrap items-end justify-between gap-5"><div><p className="text-[11px] font-semibold uppercase tracking-[.22em] text-accent-deep">Core concepts</p><h3 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Computer Science in the marketplace</h3></div><p className="max-w-md text-sm leading-relaxed text-ink-950/55">The prototype makes an everyday booking journey a practical way to discuss software engineering.</p></div></Reveal><div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{concepts.map(([title, text], index) => <Reveal key={title} delay={index * 35}><div className="h-full rounded-2xl border border-ink-950/10 bg-warm-white p-5"><span className="font-mono text-[11px] text-accent-deep">0{index + 1}</span><h4 className="mt-3 font-semibold">{title}</h4><p className="mt-2 text-sm leading-relaxed text-ink-950/55">{text}</p></div></Reveal>)}</div></div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <Reveal><div className="rounded-3xl border border-ink-950/10 bg-warm-white p-6 md:p-8"><p className="text-[11px] font-semibold uppercase tracking-[.22em] text-accent-deep">Data flow</p><h3 className="mt-2 text-2xl font-semibold">A request and its response</h3><div className="mt-7 flex flex-wrap items-center gap-2 text-xs font-semibold text-ink-950/65">{["Customer", "Frontend", "API", "Database", "Response", "Customer"].map((item, index) => <span key={`${item}-${index}`} className="flex items-center gap-2"><span className="rounded-full bg-paper px-3 py-2">{item}</span>{index < 5 && <span className="text-accent-deep">→</span>}</span>)}</div></div></Reveal>
          <Reveal delay={100}><div id="security" className="rounded-3xl bg-ink-950 p-6 text-paper md:p-8"><p className="text-[11px] font-semibold uppercase tracking-[.22em] text-accent-2">Security considerations</p><h3 className="mt-2 text-2xl font-semibold">Trust is designed in</h3><div className="mt-6 flex flex-wrap gap-2">{security.map((item) => <span key={item} className="rounded-full border border-paper/15 px-3 py-2 text-xs text-paper/70">{item}</span>)}</div></div></Reveal>
        </div>

        <Reveal><div id="future" className="mt-16 rounded-3xl border border-accent/20 bg-accent-soft/45 p-6 md:p-8"><div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end"><div><p className="text-[11px] font-semibold uppercase tracking-[.22em] text-accent-deep">Proposed technology stack</p><h3 className="mt-2 text-2xl font-semibold">A possible implementation</h3></div><p className="max-w-md text-sm leading-relaxed text-ink-950/60">These choices describe a proposed architecture, not a claim that every layer is fully implemented in this prototype.</p></div><div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{[["Frontend", "Next.js / React"], ["Backend", "API-based application architecture"], ["Database", "Relational database"], ["Deployment", "Cloud infrastructure"]].map(([title, text]) => <div key={title} className="rounded-2xl bg-warm-white/75 p-4"><p className="text-xs font-semibold text-accent-deep">{title}</p><p className="mt-2 text-sm text-ink-950/65">{text}</p></div>)}</div></div></Reveal>
      </div>
    </section>
  );
}

