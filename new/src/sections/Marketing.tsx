import { useState } from "react";
import { Camera, Clapperboard, Search, Share2, Eye, MousePointerClick, Heart, Target, MousePointer2, Activity, BarChart3, Lightbulb } from "lucide-react";
import { Section, SectionHeader, Reveal, Note, RightArrow } from "@/components/ui";
import { cn } from "@/utils/cn";

const channels = [
  { k: "Instagram", icon: Camera, data: ["Post impressions", "Profile visits", "Saves & shares"], shape: [30, 42, 38, 55, 50, 64, 60, 72] },
  { k: "TikTok", icon: Clapperboard, data: ["Video views", "Watch time", "Shares"], shape: [20, 35, 60, 48, 70, 58, 80, 76] },
  { k: "Search Engines", icon: Search, data: ["Search queries", "Click-through", "Landing page visits"], shape: [40, 44, 46, 50, 52, 55, 58, 62] },
  { k: "Referral Campaigns", icon: Share2, data: ["Referral links shared", "Sign-ups via link", "Provider invitations"], shape: [15, 22, 30, 28, 40, 46, 52, 60] },
];

const metrics = [
  { k: "Reach", icon: Eye, d: "How many people saw content" },
  { k: "Clicks", icon: MousePointerClick, d: "How many people interacted" },
  { k: "Engagement", icon: Heart, d: "Likes, comments, shares, saves" },
  { k: "Conversions", icon: Target, d: "Visitors who completed a goal" },
];

function Spark({ pts, className }: { pts: number[]; className?: string }) {
  const w = 120, h = 36;
  const step = w / (pts.length - 1);
  const d = pts.map((p, i) => `${i === 0 ? "M" : "L"}${i * step},${h - (p / 100) * h}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} preserveAspectRatio="none">
      <path d={`${d} L${w},${h} L0,${h} Z`} fill="url(#sg)" opacity="0.25" />
      <path d={d} fill="none" stroke="#4b7bf5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <defs>
        <linearGradient id="sg" x1="0" x2="0" y1="0" y2="1">
          <stop stopColor="#4b7bf5" />
          <stop offset="1" stopColor="#4b7bf5" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Marketing() {
  const [ch, setCh] = useState(0);
  const c = channels[ch];

  return (
    <Section id="marketing" tone="light">
      <SectionHeader
        tone="light"
        number="09"
        eyebrow="Marketing & Digital Data"
        presenter="Marketing & Business Development"
        title="How Computer Science supports digital marketing."
        lead="Digital marketing platforms generate data about audience interaction, clicks, searches, engagement and campaign performance. Data analytics can help organizations understand user behavior and evaluate campaigns."
      />

      {/* Data pipeline */}
      <Reveal>
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-slate-900/[0.08] bg-white p-4 sm:justify-between">
          {[
            { i: MousePointer2, t: "User interaction" },
            { i: Activity, t: "Event recorded" },
            { i: BarChart3, t: "Analytics" },
            { i: Lightbulb, t: "Insight" },
            { i: Target, t: "Campaign decision" },
          ].map((s, i, arr) => (
            <div key={s.t} className="flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-xl bg-paper px-3 py-2 text-sm font-medium text-slate-700">
                <s.i className="h-4 w-4 text-accent" /> {s.t}
              </div>
              {i < arr.length - 1 && <RightArrow tone="light" />}
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal>
        <div className="overflow-hidden rounded-3xl border border-slate-900/10 bg-navy text-white shadow-[0_40px_80px_-40px_rgba(15,23,42,0.5)]">
          {/* dashboard top bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] px-5 py-4 sm:px-6">
            <div>
              <div className="text-sm font-semibold">Campaign Dashboard</div>
              <div className="text-xs text-slate-500">Conceptual interface · no real data</div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {channels.map((x, i) => (
                <button
                  key={x.k}
                  onClick={() => setCh(i)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition",
                    ch === i ? "border-accent bg-accent text-white" : "border-white/10 text-slate-400 hover:text-white"
                  )}
                >
                  <x.icon className="h-3.5 w-3.5" /> {x.k}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-px bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((m, i) => (
              <div key={m.k} className="bg-navy p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm text-slate-400">
                    <m.icon className="h-4 w-4" /> {m.k}
                  </span>
                </div>
                <div className="mt-3 text-lg font-semibold text-white">Example metric</div>
                <div className="text-[11px] text-slate-500">{m.d}</div>
                <Spark key={ch + "-" + i} pts={c.shape.map((p, j) => Math.max(8, p - i * 8 + ((j * (i + 3)) % 7)))} className="fade-in mt-4 h-10 w-full" />
              </div>
            ))}
          </div>

          <div className="grid gap-px bg-white/[0.06] lg:grid-cols-[1.4fr_1fr]">
            <div className="bg-navy p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">Engagement over time</span>
                <span className="text-[10px] uppercase tracking-wider text-slate-500">Illustrative shape</span>
              </div>
              <div key={ch} className="mt-6 flex h-40 items-end gap-2">
                {c.shape.map((p, i) => (
                  <div key={i} className="flex flex-1 flex-col items-center gap-2">
                    <div
                      className="fade-in w-full rounded-t-md bg-gradient-to-t from-accent/40 to-accent"
                      style={{ height: `${p}%`, animationDelay: `${i * 50}ms` }}
                    />
                    <span className="text-[10px] text-slate-600">W{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-navy p-5 sm:p-6">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <c.icon className="h-4 w-4 text-accent-soft" /> Data generated by {c.k}
              </div>
              <ul key={ch} className="mt-4 space-y-2">
                {c.data.map((d) => (
                  <li key={d} className="fade-in flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 text-sm text-slate-300">
                    {d}
                    <span className="text-[10px] text-slate-500">Example metric</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal className="mt-8">
        <Note tone="light">
          All values are intentionally left as “Example metric”. The purpose is to show <i>what kinds</i> of data a campaign produces, not to report results.
        </Note>
      </Reveal>
    </Section>
  );
}
