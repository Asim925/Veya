import { useMemo, useState } from "react";
import { Smartphone, Sparkles, SearchCode, UserCog, BadgeCheck, BarChart3, BellRing, MapPin, Users, Wallet, History, Search } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Section, SectionHeader, Reveal, Note } from "@/components/ui";
import { venues } from "./Journey";
import { cn } from "@/utils/cn";

const future: { i: LucideIcon; t: string; d: string }[] = [
  { i: Smartphone, t: "Mobile Application", d: "Native apps for booking on the go." },
  { i: Sparkles, t: "AI-based Recommendations", d: "Suggestions based on learned preferences." },
  { i: SearchCode, t: "Smarter Search", d: "Understanding natural-language queries." },
  { i: UserCog, t: "Personalized Results", d: "Ordering results for each user's needs." },
  { i: BadgeCheck, t: "Automated Provider Verification", d: "Assisted document and identity checks." },
  { i: BarChart3, t: "Data Analytics", d: "Deeper insight into demand and usage." },
  { i: BellRing, t: "Real-Time Notifications", d: "Instant updates on booking status." },
];

const signals: { k: string; i: LucideIcon; note: string }[] = [
  { k: "Location", i: MapPin, note: "Closer to preferred area" },
  { k: "Capacity", i: Users, note: "Closest fit to 300 guests" },
  { k: "Budget", i: Wallet, note: "Matches typical price tier" },
  { k: "Previous searches", i: History, note: "Similar to venues viewed before" },
];

// illustrative feature fit values (0..1) per venue
const fit: Record<string, Record<string, number>> = {
  A: { Location: 0.9, Capacity: 0.85, Budget: 0.4, "Previous searches": 0.95 },
  B: { Location: 0.8, Capacity: 0.6, Budget: 0.95, "Previous searches": 0.3 },
  C: { Location: 0.5, Capacity: 1, Budget: 0.45, "Previous searches": 0.6 },
};

export default function Future() {
  const [on, setOn] = useState<string[]>(["Location", "Capacity"]);

  const ranked = useMemo(() => {
    return venues
      .map((v) => {
        const score = on.length ? on.reduce((a, k) => a + fit[v.id][k], 0) / on.length : 0;
        return { ...v, score };
      })
      .sort((a, b) => b.score - a.score);
  }, [on]);

  return (
    <Section id="future" tone="light">
      <SectionHeader
        tone="light"
        number="15"
        eyebrow="Future Technology"
        title="Possible future developments"
        lead="These are possible future directions, not current capabilities."
      />

      <Reveal>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-7">
          {future.map((f) => (
            <div key={f.t} className="group relative rounded-2xl border border-dashed border-slate-900/15 bg-white/70 p-4 transition hover:border-accent/50 hover:bg-white">
              <span className="absolute right-3 top-3 text-[9px] font-medium uppercase tracking-wider text-slate-400">Possible</span>
              <f.i className="h-5 w-5 text-accent" />
              <div className="mt-3 text-sm font-semibold leading-tight text-slate-900">{f.t}</div>
              <div className="mt-1 text-[11px] leading-snug text-slate-500">{f.d}</div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-10">
        <div className="overflow-hidden rounded-3xl border border-slate-900/10 bg-navy text-white shadow-[0_40px_80px_-40px_rgba(15,23,42,0.5)]">
          <div className="grid lg:grid-cols-[1fr_1.1fr]">
            <div className="border-b border-white/[0.06] p-6 sm:p-8 lg:border-b-0 lg:border-r">
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-accent-soft">
                <Sparkles className="h-3.5 w-3.5" /> AI recommendation · concept
              </div>
              <div className="mt-5 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5">
                <Search className="h-4 w-4 text-slate-400" />
                <span className="text-sm text-white">“Wedding venue for 300 people”</span>
              </div>
              <p className="mt-5 text-sm text-slate-400">The system could eventually learn preferences such as:</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {signals.map((s) => {
                  const active = on.includes(s.k);
                  return (
                    <button
                      key={s.k}
                      onClick={() => setOn((c) => (active ? c.filter((x) => x !== s.k) : [...c, s.k]))}
                      className={cn(
                        "rounded-xl border p-3 text-left transition",
                        active ? "border-accent bg-accent/15" : "border-white/10 bg-white/[0.02] hover:border-white/25"
                      )}
                    >
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <s.i className={cn("h-4 w-4", active ? "text-accent-soft" : "text-slate-500")} /> {s.k}
                      </div>
                      <div className="mt-1 text-[11px] text-slate-500">{s.note}</div>
                    </button>
                  );
                })}
              </div>
              <p className="mt-4 text-xs text-slate-500">Toggle signals to see how the ranking could change.</p>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">Ranked results</span>
                <span className="text-[10px] uppercase tracking-wider text-slate-500">Illustrative scoring</span>
              </div>
              <div className="relative mt-5" style={{ height: ranked.length * 96 }}>
                {ranked.map((v, i) => (
                  <div
                    key={v.id}
                    className="absolute inset-x-0 flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3 transition-all duration-500"
                    style={{ transform: `translateY(${i * 96}px)` }}
                  >
                    <span className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold", i === 0 ? "bg-accent text-white" : "bg-white/10 text-slate-300")}>
                      {i + 1}
                    </span>
                    <img src={v.img} alt="" className="h-14 w-20 shrink-0 rounded-lg object-cover" />
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold">{v.name} · {v.type}</div>
                      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                        <div className="h-full rounded-full bg-gradient-to-r from-accent to-accent-soft transition-all duration-500" style={{ width: `${v.score * 100}%` }} />
                      </div>
                    </div>
                    <span className="font-mono text-xs text-slate-400">{v.score.toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-2 rounded-xl bg-[#060a14] p-3 font-mono text-[11px] text-accent-soft">
                score(venue) = average( fit(signal) for selected signals )
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal className="mt-6">
        <Note tone="light">A real recommendation system would learn these weights from data. Here the values are hand-set to explain the idea of ranking.</Note>
      </Reveal>
    </Section>
  );
}
