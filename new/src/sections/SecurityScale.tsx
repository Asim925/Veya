import { useState } from "react";
import { Fingerprint, ShieldCheck, Lock, FileCheck2, CreditCard, EyeOff, Check, X, Users, Store, LayoutList, CalendarCheck, Cloud, DatabaseZap, Zap, Network, Gauge, Activity, Server, Plus } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Section, SectionHeader, Reveal, Card, Note } from "@/components/ui";
import { cn } from "@/utils/cn";

const sec: { i: LucideIcon; t: string; d: string; ex: string }[] = [
  { i: Fingerprint, t: "Authentication", d: "Verifies user identity.", ex: "Login with password, plus optional one-time codes." },
  { i: ShieldCheck, t: "Authorization", d: "Controls what different users can access.", ex: "A customer cannot edit a provider's listing." },
  { i: Lock, t: "Encryption", d: "Protects sensitive data during transmission and storage.", ex: "HTTPS in transit; hashed passwords at rest." },
  { i: FileCheck2, t: "Input Validation", d: "Helps prevent invalid or malicious data.", ex: "Guest count must be a positive number." },
  { i: CreditCard, t: "Secure Payments", d: "Would require trusted payment infrastructure.", ex: "Card data handled by a payment provider, not stored directly." },
  { i: EyeOff, t: "Privacy", d: "User information should only be collected and used appropriately.", ex: "Collect only data needed for a booking." },
];

const roles = ["Customer", "Provider", "Admin"] as const;
const perms: { r: string; i: LucideIcon; allow: Record<(typeof roles)[number], boolean> }[] = [
  { r: "Search & view listings", i: LayoutList, allow: { Customer: true, Provider: true, Admin: true } },
  { r: "Create a booking", i: CalendarCheck, allow: { Customer: true, Provider: false, Admin: false } },
  { r: "Edit own listing", i: Store, allow: { Customer: false, Provider: true, Admin: true } },
  { r: "Verify providers", i: ShieldCheck, allow: { Customer: false, Provider: false, Admin: true } },
  { r: "View all user records", i: Users, allow: { Customer: false, Provider: false, Admin: true } },
];

function validate(v: string): { ok: boolean; msg: string } {
  if (v.trim() === "") return { ok: false, msg: "Required field is empty" };
  if (/[<>]|script|select\s|drop\s|--/i.test(v)) return { ok: false, msg: "Rejected: contains code-like characters" };
  if (!/^\d+$/.test(v.trim())) return { ok: false, msg: "Rejected: must be a whole number" };
  const n = parseInt(v, 10);
  if (n <= 0) return { ok: false, msg: "Rejected: must be greater than zero" };
  if (n > 5000) return { ok: false, msg: "Rejected: exceeds allowed range" };
  return { ok: true, msg: "Accepted: valid guest count" };
}

export function Security() {
  const [role, setRole] = useState<(typeof roles)[number]>("Customer");
  const [input, setInput] = useState("300");
  const res = validate(input);

  return (
    <Section id="security" tone="light" grid>
      <SectionHeader
        tone="light"
        number="13"
        eyebrow="Proposed system considerations"
        title="Security considerations"
        lead="A booking platform handles personal and financial information. These are concepts a system like VEYA would need to consider — not features it currently implements."
      />

      <Reveal>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sec.map((s) => (
            <div key={s.t} className="group rounded-2xl border border-slate-900/[0.08] bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-24px_rgba(15,23,42,0.35)]">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy text-white transition group-hover:bg-accent">
                <s.i className="h-5 w-5" />
              </div>
              <div className="mt-4 font-semibold text-slate-900">{s.t}</div>
              <div className="text-sm text-slate-600">{s.d}</div>
              <div className="mt-3 border-t border-slate-900/[0.06] pt-3 text-xs text-slate-500">
                <span className="font-medium text-slate-700">Example: </span>
                {s.ex}
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Reveal>
          <Card tone="light" className="h-full p-5 sm:p-6">
            <div className="text-sm font-semibold text-slate-900">Authorization — role-based access</div>
            <p className="text-xs text-slate-500">Select a role to see what it could access.</p>
            <div className="mt-4 inline-flex rounded-xl bg-paper-2 p-1">
              {roles.map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={cn("rounded-lg px-3.5 py-1.5 text-sm font-medium transition", role === r ? "bg-white text-slate-900 shadow-sm" : "text-slate-500")}
                >
                  {r}
                </button>
              ))}
            </div>
            <ul className="mt-4 space-y-1.5">
              {perms.map((p) => {
                const ok = p.allow[role];
                return (
                  <li key={p.r} className={cn("flex items-center justify-between rounded-xl border px-3 py-2.5 text-sm transition", ok ? "border-emerald-500/20 bg-emerald-50/60 text-slate-800" : "border-slate-900/[0.06] bg-slate-50 text-slate-400")}>
                    <span className="flex items-center gap-2"><p.i className="h-4 w-4" /> {p.r}</span>
                    {ok ? <Check className="h-4 w-4 text-emerald-600" /> : <X className="h-4 w-4 text-slate-400" />}
                  </li>
                );
              })}
            </ul>
          </Card>
        </Reveal>
        <Reveal delay={100}>
          <Card tone="light" className="h-full p-5 sm:p-6">
            <div className="text-sm font-semibold text-slate-900">Input validation — try it</div>
            <p className="text-xs text-slate-500">Type into the “Guests” field. Try text, a negative number or &lt;script&gt;.</p>
            <label className="mt-4 block">
              <span className="text-xs text-slate-500">Guests</span>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className={cn(
                  "mt-1 w-full rounded-xl border bg-white px-4 py-3 font-mono text-sm outline-none transition",
                  res.ok ? "border-emerald-400 ring-4 ring-emerald-400/10" : "border-rose-400 ring-4 ring-rose-400/10"
                )}
              />
            </label>
            <div className={cn("mt-3 flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm", res.ok ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700")}>
              {res.ok ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />} {res.msg}
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {["300", "-5", "three hundred", "<script>", "99999"].map((x) => (
                <button key={x} onClick={() => setInput(x)} className="rounded-full border border-slate-900/10 px-2.5 py-1 font-mono text-[11px] text-slate-600 hover:border-slate-900/30">
                  {x}
                </button>
              ))}
            </div>
            <div className="mt-4 rounded-xl bg-navy p-3 font-mono text-[11px] leading-relaxed text-accent-soft">
              is_valid = is_integer(guests) AND 0 &lt; guests ≤ max
            </div>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}

const growth = ["More Users", "More Providers", "More Listings", "More Bookings"];
const solutions: { k: string; i: LucideIcon; d: string; w: number }[] = [
  { k: "Cloud infrastructure", i: Cloud, d: "Add computing resources as demand changes.", w: 22 },
  { k: "Database optimization", i: DatabaseZap, d: "Indexes and efficient queries find data faster.", w: 16 },
  { k: "Caching", i: Zap, d: "Store frequent results in fast memory.", w: 16 },
  { k: "Load balancing", i: Network, d: "Spread requests across multiple servers.", w: 20 },
  { k: "API optimization", i: Gauge, d: "Send only needed data; reduce round trips.", w: 10 },
  { k: "Monitoring", i: Activity, d: "Track health to detect problems early.", w: 8 },
];

export function Scalability() {
  const [size, setSize] = useState(3);
  const [on, setOn] = useState<string[]>([]);
  const demand = size * 20; // 20..100
  const relief = solutions.filter((s) => on.includes(s.k)).reduce((a, s) => a + s.w, 0);
  const load = Math.max(8, Math.min(100, demand - (relief * demand) / 100));
  const servers = on.includes("Load balancing") ? Math.max(2, size) : 1;
  const status = load > 75 ? { t: "Overloaded", c: "text-rose-300", b: "from-rose-500 to-amber-400" } : load > 45 ? { t: "Under pressure", c: "text-amber-300", b: "from-amber-400 to-yellow-300" } : { t: "Healthy", c: "text-emerald-300", b: "from-emerald-500 to-accent" };

  return (
    <Section id="scalability" grid>
      <SectionHeader
        number="14"
        eyebrow="Scalability"
        presenter="Finance"
        title="What happens when the platform grows?"
        lead="Growth increases the work the system must do. Computer Science offers several techniques to handle higher load."
      />

      <Reveal>
        <div className="flex flex-col items-center gap-3">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {growth.map((g, i) => (
              <div key={g} className="flex items-center gap-2">
                <span className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-white">{g}</span>
                {i < growth.length - 1 && <Plus className="h-4 w-4 text-slate-600" />}
              </div>
            ))}
          </div>
          <div className="h-8 w-px bg-gradient-to-b from-white/20 to-accent" />
          <span className="rounded-xl border border-rose-400/30 bg-rose-400/10 px-5 py-2.5 text-sm font-semibold text-rose-200">Higher System Load</span>
        </div>
      </Reveal>

      <Reveal className="mt-14">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-white">Load simulator</span>
              <span className="text-[10px] uppercase tracking-wider text-slate-500">Relative · conceptual</span>
            </div>
            <label className="mt-5 block">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Platform size</span>
                <span className="text-slate-300">{["", "Small", "Growing", "Medium", "Large", "Very large"][size]}</span>
              </div>
              <input type="range" min={1} max={5} value={size} onChange={(e) => setSize(+e.target.value)} className="mt-2 w-full accent-[#4b7bf5]" />
            </label>

            <div className="mt-6">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Server load</span>
                <span className={cn("font-semibold", status.c)}>{status.t}</span>
              </div>
              <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-white/5">
                <div className={cn("h-full rounded-full bg-gradient-to-r transition-all duration-500", status.b)} style={{ width: `${load}%` }} />
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
              <div className="text-[11px] text-slate-500">Requests</div>
              <div className="mt-2 flex flex-wrap gap-1">
                {Array.from({ length: size * 6 }, (_, i) => (
                  <span key={i} className="h-1.5 w-1.5 rounded-full bg-accent-soft/70" />
                ))}
              </div>
              <div className="my-3 flex items-center gap-2 text-[11px] text-slate-500">
                <div className="h-px flex-1 bg-white/10" />
                {on.includes("Load balancing") ? "load balancer" : "single entry"}
                <div className="h-px flex-1 bg-white/10" />
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {Array.from({ length: servers }, (_, i) => (
                  <div key={i} className="fade-in flex flex-col items-center gap-1 rounded-xl border border-white/10 bg-navy px-3 py-2">
                    <Server className={cn("h-5 w-5", status.c)} />
                    <span className="text-[10px] text-slate-500">server {i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <div>
            <div className="mb-3 text-sm font-semibold text-white">Possible CS solutions — toggle to apply</div>
            <div className="grid gap-3 sm:grid-cols-2">
              {solutions.map((s) => {
                const active = on.includes(s.k);
                return (
                  <button
                    key={s.k}
                    onClick={() => setOn((c) => (active ? c.filter((x) => x !== s.k) : [...c, s.k]))}
                    className={cn(
                      "flex items-start gap-3 rounded-2xl border p-4 text-left transition",
                      active ? "border-accent bg-accent/10" : "border-white/[0.08] bg-navy-2/50 hover:border-white/20"
                    )}
                  >
                    <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg", active ? "bg-accent text-white" : "bg-white/5 text-slate-400")}>
                      <s.i className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-white">{s.k}</span>
                        <span className={cn("h-4 w-4 rounded border", active ? "border-accent bg-accent" : "border-white/20")}>
                          {active && <Check className="h-3.5 w-3.5 text-white" />}
                        </span>
                      </div>
                      <div className="mt-0.5 text-xs text-slate-400">{s.d}</div>
                    </div>
                  </button>
                );
              })}
            </div>
            <Note className="mt-4">The simulator is illustrative — it shows the direction of each technique's effect, not measured performance.</Note>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
