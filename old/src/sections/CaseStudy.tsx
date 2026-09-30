"use client";

import { useState } from "react";
import { Reveal, SectionHead } from "@/components/ui";

const problem = [
  ["Different platforms", "Venues, sports facilities, accommodation and services are often listed separately."],
  ["Repeated searches", "People compare websites, social pages and chat threads to find one suitable option."],
  ["Manual confirmation", "Availability, prices and details are frequently confirmed through messages or calls."],
  ["Separate bookings", "Each requirement is booked independently, making larger plans harder to coordinate."],
];

const workflow = [
  ["01", "User", "Searches for a venue, facility or service."],
  ["02", "Frontend", "Collects filters and sends a structured request."],
  ["03", "API", "Validates the request and routes it to the application."],
  ["04", "Backend", "Applies business rules, filters and availability logic."],
  ["05", "Database", "Returns connected listings, dates and booking data."],
  ["06", "Response", "Displays matching results the user can compare."],
];

const tables = [
  ["Users", "user_id · name · email · role", "Customers, providers and administrators."],
  ["Listings", "listing_id · provider_id · category · location · price", "Venues, sports facilities and stays."],
  ["Availability", "listing_id · date · time_slot · status", "Open and booked dates or time slots."],
  ["Services", "service_id · provider_id · type · price", "Catering, decoration and other add-ons."],
  ["Bookings", "booking_id · user_id · listing_id · date · status", "Reservations and their current status."],
];

const concepts = [
  ["Web development", "Search, galleries, listing pages and forms make the marketplace usable."],
  ["Database systems", "Related users, providers, listings, services, availability and bookings connect through IDs."],
  ["Search and algorithms", "Location, date, capacity, price and category become filters for finding relevant matches."],
  ["Recommendation systems", "A future feature could rank venues using preferences, location, budget and previous interactions."],
  ["APIs and architecture", "The frontend communicates with backend services through predictable requests and responses."],
  ["Cloud and scalability", "Cloud infrastructure could support more users, listings and bookings over time."],
];

const future = ["Mobile application", "AI-based recommendations", "Smarter natural-language search", "Personalized results", "Provider verification", "Analytics", "Real-time notifications"];
const security = ["Authentication", "Authorization", "Data protection", "Secure communication", "Input validation"];
const workflowDetails = [
  ["User", "A person searches for an event venue.", 'search("Karachi", "Large Event", 300 guests)'],
  ["Frontend", "The interface collects input and sends a structured request.", "GET /api/listings?city=karachi&guests=300"],
  ["API", "The communication layer validates the request and routes it.", "validate(query) → Search service"],
  ["Backend", "Business logic applies filters and checks availability.", 'capacity >= 300 AND status = "available"'],
  ["Database", "Organized tables return users, listings and bookings.", "SELECT * FROM listings WHERE location = 'Karachi'"],
  ["Response", "Matching data returns through the API as JSON.", "200 OK → [{ id: 'A', name: 'Venue A' }]"],
  ["Frontend", "The interface renders cards the user can compare.", "render(<ResultsGrid items={data} />)"],
];
const detailedTables = [
  ["Users", "user_id · name · email · role", "U01 · Customer · user1@example.com · customer"],
  ["Listings", "listing_id · provider_id · category · location · capacity", "L10 · U02 · large_event · Karachi · 350"],
  ["Availability", "listing_id · date · time_slot · status", "L11 · Saturday · 19:00 · available"],
  ["Services", "service_id · provider_id · type · price", "S01 · U02 · catering_standard · tier_2"],
  ["Bookings", "booking_id · user_id · listing_id · date · status", "B100 · U01 · L10 · Saturday · confirmed"],
];
const recommendationSignals = ["Location", "Capacity", "Budget", "Previous searches"];
const recommendationResults = [
  ["Venue A", "0.90"],
  ["Venue B", "0.72"],
  ["Venue C", "0.58"],
];

export default function CaseStudy() {
  const [activeTable, setActiveTable] = useState(1);
  const [activeWorkflow, setActiveWorkflow] = useState(0);
  const [selectedSignals, setSelectedSignals] = useState(["Location", "Capacity"]);

  return (
    <section id="architecture" className="scroll-mt-20 bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead k="08 / Computer Science" label="Technical case study" title={<>The technology <em className="font-serif font-normal text-accent-deep">behind</em> VEYA.</>} sub="VEYA is a realistic marketplace prototype used to explain the Computer Science concepts needed to build a platform for finding and booking places and services." />

        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal><div className="h-full rounded-3xl bg-ink-950 p-6 text-paper shadow-lift md:p-8"><p className="text-[11px] uppercase tracking-[.22em] text-accent-2">01 / The problem</p><h3 className="mt-2 text-2xl font-semibold">A fragmented journey becomes one structured platform.</h3><p className="mt-4 text-sm leading-relaxed text-paper/60">People often use different platforms to find venues, sports facilities, accommodation and event services. VEYA proposes one place to discover, compare, customize and book.</p><div className="mt-7 flex flex-col gap-2">{problem.map(([title, text]) => <div key={title} className="rounded-2xl border border-paper/10 bg-paper/[.045] p-4"><h4 className="font-semibold">{title}</h4><p className="mt-1 text-xs leading-relaxed text-paper/55">{text}</p></div>)}</div></div></Reveal>
          <Reveal delay={100}><div className="h-full rounded-3xl border border-ink-950/10 bg-warm-white p-6 shadow-card md:p-8"><p className="text-[11px] font-semibold uppercase tracking-[.22em] text-accent-deep">02 / Proposed process</p><h3 className="mt-2 text-2xl font-semibold">Discover. Compare. Customize. Book.</h3><p className="mt-4 text-sm leading-relaxed text-ink-950/55">The system organizes scattered information into a shared data model so a user can make one informed request.</p><div className="mt-7 flex flex-col gap-2">{["Search structured listings", "Compare options using shared fields", "Attach catering or decoration", "Check availability", "Submit a booking request"].map((step, i) => <div key={step} className="flex items-center gap-3 rounded-xl bg-paper px-3 py-3"><span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent-soft font-mono text-[10px] text-accent-deep">0{i + 1}</span><span className="text-sm text-ink-950/70">{step}</span></div>)}</div></div></Reveal>
        </div>

        <Reveal><div className="mt-16 rounded-3xl bg-ink-950 p-6 text-paper shadow-lift md:p-10"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-[11px] uppercase tracking-[.22em] text-accent-2">03 / How the system works</p><h3 className="mt-2 text-2xl font-semibold md:text-3xl">Following one request through the system.</h3></div><span className="rounded-full border border-paper/15 px-3 py-1 text-xs text-paper/55">conceptual / proposed</span></div><div className="mt-8 grid gap-2 md:grid-cols-6">{workflow.map(([number, title, text], i) => <div key={title} className="flex items-center md:block"><div className="flex-1 rounded-2xl border border-paper/12 bg-paper/[.045] p-4 md:mx-1 md:min-h-36"><span className="font-mono text-xs text-accent-2">{number}</span><h4 className="mt-3 font-semibold">{title}</h4><p className="mt-2 text-xs leading-relaxed text-paper/55">{text}</p></div>{i < workflow.length - 1 && <span className="px-2 text-accent-2 md:hidden">↓</span>}</div>)}</div></div></Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
          <Reveal><div className="h-full rounded-3xl border border-ink-950/10 bg-warm-white p-6 md:p-8"><p className="text-[11px] font-semibold uppercase tracking-[.22em] text-accent-deep">04 / Data model</p><h3 className="mt-2 text-2xl font-semibold">What information does VEYA store?</h3><p className="mt-4 text-sm leading-relaxed text-ink-950/55">A relational database could organize the platform into connected tables. Select a table to inspect its fields.</p><div className="mt-7 flex flex-wrap gap-2">{tables.map(([name], i) => <button key={name} onClick={() => setActiveTable(i)} className={`rounded-full px-3 py-2 text-xs font-semibold transition ${activeTable === i ? "bg-ink-950 text-paper" : "bg-paper text-ink-950/60 hover:bg-accent-soft"}`}>{name}</button>)}</div><div className="mt-6 rounded-2xl bg-paper p-5"><p className="font-mono text-xs text-accent-deep">{tables[activeTable][1]}</p><p className="mt-3 text-sm leading-relaxed text-ink-950/60">{tables[activeTable][2]}</p></div></div></Reveal>
          <Reveal delay={100}><div className="h-full rounded-3xl bg-ink-900 p-6 text-paper md:p-8"><p className="text-[11px] font-semibold uppercase tracking-[.22em] text-accent-2">05 / Booking and availability</p><h3 className="mt-2 text-2xl font-semibold">Check before confirming.</h3><p className="mt-4 max-w-xl text-sm leading-relaxed text-paper/60">A booking system must check availability before confirming a reservation. A transaction can lock the selected slot, create the booking, update its status and commit. If the slot is already taken, the system rolls back instead of creating a double booking.</p><div className="mt-7 rounded-2xl border border-paper/10 bg-[#111827] p-5 font-mono text-xs leading-7 text-accent-2"><div>BEGIN TRANSACTION</div><div className="text-paper/70">slot = get_slot(facility, date, time)</div><div className="text-paper/70">IF slot.status == "available":</div><div className="pl-4 text-paper/70">create_booking(user, slot)</div><div className="pl-4 text-paper/70">slot.status = "booked"</div><div className="text-paper/70">COMMIT</div><div className="text-paper/45">ELSE: ROLLBACK — slot unavailable</div></div></div></Reveal>
        </div>

        <div className="mt-16"><Reveal><div className="flex flex-wrap items-end justify-between gap-5"><div><p className="text-[11px] font-semibold uppercase tracking-[.22em] text-accent-deep">06 / Core concepts</p><h3 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Computer Science in the marketplace</h3></div><p className="max-w-md text-sm leading-relaxed text-ink-950/55">The prototype makes an everyday booking journey a practical way to discuss software engineering.</p></div></Reveal><div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{concepts.map(([title, text], i) => <Reveal key={title} delay={i * 35}><div className="h-full rounded-2xl border border-ink-950/10 bg-warm-white p-5"><span className="font-mono text-[11px] text-accent-deep">0{i + 1}</span><h4 className="mt-3 font-semibold">{title}</h4><p className="mt-2 text-sm leading-relaxed text-ink-950/55">{text}</p></div></Reveal>)}</div></div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2"><Reveal><div className="rounded-3xl border border-ink-950/10 bg-warm-white p-6 md:p-8"><p className="text-[11px] font-semibold uppercase tracking-[.22em] text-accent-deep">07 / Security</p><h3 className="mt-2 text-2xl font-semibold">Trust is designed in.</h3><p className="mt-4 text-sm leading-relaxed text-ink-950/55">A real platform would need strong identity, permissions and careful handling of personal information at every layer.</p><div className="mt-6 flex flex-wrap gap-2">{security.map((item) => <span key={item} className="rounded-full bg-paper px-3 py-2 text-xs text-ink-950/65">{item}</span>)}</div></div></Reveal><Reveal delay={100}><div id="future" className="rounded-3xl border border-accent/20 bg-accent-soft/45 p-6 md:p-8"><p className="text-[11px] font-semibold uppercase tracking-[.22em] text-accent-deep">08 / Future technology</p><h3 className="mt-2 text-2xl font-semibold">Possible future developments.</h3><p className="mt-4 text-sm leading-relaxed text-ink-950/60">These ideas describe future directions, not current capabilities of the prototype.</p><div className="mt-6 flex flex-wrap gap-2">{future.map((item) => <span key={item} className="rounded-full border border-ink-950/10 bg-warm-white/75 px-3 py-2 text-xs text-ink-950/65">{item}</span>)}</div></div></Reveal></div>

        <Reveal><div className="mt-16 rounded-3xl bg-ink-950 p-6 text-paper shadow-lift md:p-10"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-[11px] uppercase tracking-[.22em] text-accent-2">09 / Request lifecycle</p><h3 className="mt-2 text-2xl font-semibold md:text-3xl">One request, seven connected stages.</h3></div><span className="rounded-full border border-paper/15 px-3 py-1 text-xs text-paper/55">select a stage</span></div><div className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-7">{workflowDetails.map(([title], i) => <button key={`${title}-${i}`} onClick={() => setActiveWorkflow(i)} className={`rounded-2xl border p-4 text-left transition ${activeWorkflow === i ? "border-accent bg-accent/15" : "border-paper/10 bg-paper/[.04] hover:border-paper/25"}`}><span className="font-mono text-xs text-accent-2">0{i + 1}</span><h4 className="mt-3 font-semibold">{title}</h4></button>)}</div><div className="mt-5 grid gap-5 lg:grid-cols-[.85fr_1.15fr]"><div className="rounded-2xl border border-paper/10 bg-paper/[.045] p-5"><p className="text-xs uppercase tracking-[.18em] text-accent-2">Stage {activeWorkflow + 1}</p><h4 className="mt-3 text-xl font-semibold">{workflowDetails[activeWorkflow][0]}</h4><p className="mt-3 text-sm leading-relaxed text-paper/60">{workflowDetails[activeWorkflow][1]}</p></div><pre className="overflow-x-auto rounded-2xl bg-[#111827] p-5 font-mono text-xs leading-7 text-accent-2">{workflowDetails[activeWorkflow][2]}</pre></div></div></Reveal>

        <Reveal><div className="mt-16 grid gap-6 lg:grid-cols-[1.05fr_.95fr]"><div className="rounded-3xl border border-ink-950/10 bg-warm-white p-6 md:p-8"><p className="text-[11px] font-semibold uppercase tracking-[.22em] text-accent-deep">10 / Example records</p><h3 className="mt-2 text-2xl font-semibold">Tables become useful when they hold related records.</h3><p className="mt-4 text-sm leading-relaxed text-ink-950/55">Primary keys identify records, while foreign keys connect providers, listings, availability and bookings.</p><div className="mt-6 flex flex-col gap-2">{detailedTables.map(([name, fields, row]) => <div key={name} className="rounded-2xl bg-paper p-4"><div className="flex flex-wrap items-center justify-between gap-2"><span className="font-semibold">{name}</span><span className="font-mono text-[11px] text-accent-deep">{fields}</span></div><p className="mt-2 font-mono text-[11px] text-ink-950/50">{row}</p></div>)}</div></div><div className="rounded-3xl bg-ink-900 p-6 text-paper md:p-8"><p className="text-[11px] uppercase tracking-[.22em] text-accent-2">11 / Recommendation concept</p><h3 className="mt-2 text-2xl font-semibold">Ranking can turn preferences into useful results.</h3><p className="mt-4 text-sm leading-relaxed text-paper/60">A future recommendation system could combine signals such as location, capacity, budget and previous searches.</p><div className="mt-6 flex flex-wrap gap-2">{recommendationSignals.map((signal) => <button key={signal} onClick={() => setSelectedSignals((current) => current.includes(signal) ? current.filter((item) => item !== signal) : [...current, signal])} className={`rounded-full border px-3 py-2 text-xs transition ${selectedSignals.includes(signal) ? "border-accent bg-accent/20 text-paper" : "border-paper/15 text-paper/55 hover:border-paper/30"}`}>{signal}</button>)}</div><div className="mt-6 flex flex-col gap-3">{recommendationResults.map(([name, score], i) => <div key={name} className="rounded-2xl border border-paper/10 bg-paper/[.045] p-4"><div className="flex items-center justify-between text-sm"><span className="font-semibold">{name}</span><span className="font-mono text-accent-2">{selectedSignals.length ? (Number(score) * (selectedSignals.length / 4)).toFixed(2) : "0.00"}</span></div><div className="mt-3 h-1.5 overflow-hidden rounded-full bg-paper/10"><div className="h-full rounded-full bg-accent transition-all" style={{ width: `${selectedSignals.length ? Number(score) * (selectedSignals.length / 4) * 100 : 0}%` }} /></div></div>)}</div><p className="mt-5 text-xs text-paper/40">Illustrative scoring only; real weights would be learned from data.</p></div></div></Reveal>
      </div>
    </section>
  );
}

export { CaseStudy };
