import { useState } from "react";
import { UserPlus, FileText, BadgeCheck, LayoutList, CalendarClock, Inbox, Building2, Trophy, UtensilsCrossed, Flower2, BedDouble, Briefcase, Check, Circle } from "lucide-react";
import { Section, SectionHeader, Reveal, DownArrow } from "@/components/ui";
import { IMG } from "@/data/gallery";
import { cn } from "@/utils/cn";

const flow = [
  { i: UserPlus, t: "Register", d: "Provider creates an account with role = provider." },
  { i: FileText, t: "Submit Details", d: "Business information and documents are uploaded." },
  { i: BadgeCheck, t: "Verification", d: "Details are reviewed before listings go live." },
  { i: LayoutList, t: "Create Listing", d: "Photos, capacity, location and pricing are added." },
  { i: CalendarClock, t: "Set Availability", d: "Open dates and time slots are defined." },
  { i: Inbox, t: "Receive Bookings", d: "Booking requests arrive in the dashboard." },
];

const cats = [
  { i: Building2, t: "Venue" },
  { i: Trophy, t: "Sports Facility" },
  { i: UtensilsCrossed, t: "Catering" },
  { i: Flower2, t: "Decoration" },
  { i: BedDouble, t: "Hotel / Stay" },
  { i: Briefcase, t: "Workspace" },
];

const tabs = ["Listing", "Availability", "Bookings", "Services"] as const;

export default function Providers() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Listing");
  const [stage, setStage] = useState(3);

  return (
    <Section id="providers" grid>
      <SectionHeader
        number="10"
        eyebrow="Provider System"
        presenter="Marketing & Business Development"
        title="The other side of the marketplace."
        lead="A marketplace has two groups of users. Providers need their own workflow and tools to offer listings and manage bookings."
      />

      <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
        <Reveal>
          <div className="rounded-3xl border border-white/[0.08] bg-navy-2/50 p-5">
            <div className="mb-4 text-sm font-semibold text-white">Provider onboarding workflow</div>
            {flow.map((f, i) => (
              <div key={f.t}>
                <button
                  onClick={() => setStage(i)}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-xl border px-3 py-3 text-left transition",
                    i === stage ? "border-accent bg-accent/10" : "border-white/[0.06] hover:border-white/20"
                  )}
                >
                  <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", i <= stage ? "bg-accent text-white" : "bg-white/5 text-slate-500")}>
                    {i < stage ? <Check className="h-4 w-4" /> : <f.i className="h-4 w-4" />}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{f.t}</div>
                    {i === stage && <div className="fade-in mt-0.5 text-xs text-slate-400">{f.d}</div>}
                  </div>
                </button>
                {i < flow.length - 1 && <DownArrow animated={i === stage} className="py-0.5" />}
              </div>
            ))}
          </div>

          <div className="mt-5">
            <div className="mb-3 text-xs font-medium uppercase tracking-wider text-slate-500">Provider categories</div>
            <div className="grid grid-cols-3 gap-2">
              {cats.map((c) => (
                <div key={c.t} className="flex flex-col items-center gap-1.5 rounded-xl border border-white/[0.06] bg-white/[0.02] px-2 py-3 text-center">
                  <c.i className="h-4 w-4 text-accent-soft" />
                  <span className="text-[11px] text-slate-300">{c.t}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0a1020] shadow-2xl">
            <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
              <span className="ml-3 rounded-md bg-white/5 px-3 py-1 font-mono text-[11px] text-slate-500">provider.veya · dashboard mockup</span>
            </div>
            <div className="grid md:grid-cols-[180px_1fr]">
              <aside className="flex gap-1 overflow-x-auto border-b border-white/[0.06] p-3 md:flex-col md:border-b-0 md:border-r">
                <div className="mb-2 hidden items-center gap-2 px-2 md:flex">
                  <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-accent to-indigo-700" />
                  <div>
                    <div className="text-xs font-semibold text-white">Provider</div>
                    <div className="text-[10px] text-slate-500">Example account</div>
                  </div>
                </div>
                {tabs.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={cn(
                      "shrink-0 rounded-lg px-3 py-2 text-left text-sm transition",
                      tab === t ? "bg-white/[0.07] font-medium text-white" : "text-slate-400 hover:text-white"
                    )}
                  >
                    {t}
                  </button>
                ))}
                <div className="mt-auto hidden rounded-lg border border-white/[0.06] p-2.5 md:block">
                  <div className="text-[10px] text-slate-500">Verification</div>
                  <div className={cn("mt-1 flex items-center gap-1.5 text-xs font-medium", stage >= 3 ? "text-emerald-300" : "text-amber-300")}>
                    {stage >= 3 ? <BadgeCheck className="h-3.5 w-3.5" /> : <Circle className="h-3.5 w-3.5" />}
                    {stage >= 3 ? "Verified" : "Pending review"}
                  </div>
                </div>
              </aside>

              <div key={tab} className="fade-in min-h-[380px] p-5 sm:p-6">
                {tab === "Listing" && (
                  <div>
                    <div className="text-lg font-semibold text-white">My Listing</div>
                    <div className="mt-4 grid gap-4 sm:grid-cols-[200px_1fr]">
                      <img src={IMG.banquetTable} alt="Example banquet listing" loading="lazy" className="h-36 w-full rounded-xl object-cover" />
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {[
                          ["Title", "Venue A — Banquet Hall"],
                          ["Category", "Large Events"],
                          ["Location", "Karachi"],
                          ["Capacity", "350"],
                          ["Price", "Price tier"],
                          ["Status", stage >= 3 ? "Published" : "Draft"],
                        ].map(([k, v]) => (
                          <div key={k} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5">
                            <div className="text-slate-500">{k}</div>
                            <div className="mt-0.5 font-medium text-white">{v}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {tab === "Availability" && (
                  <div>
                    <div className="text-lg font-semibold text-white">Availability calendar</div>
                    <p className="text-xs text-slate-500">Click a day to toggle open / closed (demo).</p>
                    <AvailabilityGrid />
                  </div>
                )}
                {tab === "Bookings" && (
                  <div>
                    <div className="text-lg font-semibold text-white">Booking requests</div>
                    <div className="mt-4 space-y-2">
                      {[
                        ["B100", "Sat · Evening", "confirmed"],
                        ["B101", "Sun · Afternoon", "pending"],
                        ["B102", "Fri · Night", "pending"],
                      ].map(([id, when, st]) => (
                        <div key={id} className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm">
                          <span className="font-mono text-slate-400">{id}</span>
                          <span className="text-slate-300">{when}</span>
                          <span className={cn("rounded-full px-2 py-0.5 text-[11px]", st === "confirmed" ? "bg-emerald-500/15 text-emerald-300" : "bg-amber-500/15 text-amber-300")}>{st}</span>
                        </div>
                      ))}
                      <div className="pt-2 text-[11px] text-slate-500">Example records for illustration.</div>
                    </div>
                  </div>
                )}
                {tab === "Services" && (
                  <div>
                    <div className="text-lg font-semibold text-white">Linked services</div>
                    <div className="mt-4 grid gap-2 sm:grid-cols-2">
                      {["Catering · Standard", "Decoration · Modern", "Stage & Lighting", "Parking management"].map((s, i) => (
                        <div key={s} className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-slate-300">
                          {s}
                          <span className={cn("h-2 w-2 rounded-full", i < 3 ? "bg-emerald-400" : "bg-slate-600")} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Provider acquisition — bringing venues and service businesses onto the platform — connects marketing with the technical onboarding workflow.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}

function AvailabilityGrid() {
  const [closed, setClosed] = useState<number[]>([2, 9, 10, 17]);
  return (
    <div className="mt-4 grid grid-cols-7 gap-1.5">
      {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
        <div key={i} className="text-center text-[10px] text-slate-500">{d}</div>
      ))}
      {Array.from({ length: 28 }, (_, i) => {
        const off = closed.includes(i);
        return (
          <button
            key={i}
            onClick={() => setClosed((c) => (off ? c.filter((x) => x !== i) : [...c, i]))}
            className={cn(
              "aspect-square rounded-lg text-xs transition",
              off ? "bg-white/[0.03] text-slate-600 line-through" : "bg-accent/15 text-accent-soft hover:bg-accent/25"
            )}
          >
            {i + 1}
          </button>
        );
      })}
    </div>
  );
}
