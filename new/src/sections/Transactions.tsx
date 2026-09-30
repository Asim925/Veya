import { useState } from "react";
import { ShoppingCart, Calculator, CreditCard, CheckCircle2, Database, Banknote, FileBarChart, Atom, Scale, Lock, HardDrive, PieChart } from "lucide-react";
import { Section, SectionHeader, Reveal, Card, Note, DownArrow } from "@/components/ui";
import { cn } from "@/utils/cn";

const lifecycle = [
  { i: ShoppingCart, t: "Booking request", d: "User submits listing, date and services." },
  { i: Calculator, t: "Price calculation", d: "Backend sums listing and service prices." },
  { i: CreditCard, t: "Payment authorization", d: "Would be handled by a trusted payment provider." },
  { i: CheckCircle2, t: "Booking confirmed", d: "Status changes only after successful payment." },
  { i: Database, t: "Record stored", d: "Transaction details saved for accountability." },
  { i: Banknote, t: "Provider settlement", d: "Provider share calculated and scheduled." },
  { i: FileBarChart, t: "Reporting", d: "Aggregated data supports financial analysis." },
];

const acid = [
  { i: Atom, t: "Atomicity", d: "All steps succeed together, or none are applied." },
  { i: Scale, t: "Consistency", d: "Data always moves from one valid state to another." },
  { i: Lock, t: "Isolation", d: "Simultaneous transactions don't interfere." },
  { i: HardDrive, t: "Durability", d: "Once committed, records survive failures." },
];

export default function Transactions() {
  const [active, setActive] = useState(2);
  const [value, setValue] = useState(1000);
  const [rate, setRate] = useState(10);
  const fee = (value * rate) / 100;
  const provider = value - fee;

  return (
    <Section id="transactions" tone="light">
      <SectionHeader
        tone="light"
        number="11"
        eyebrow="Transactions & Business Data"
        presenter="Finance"
        title="How money and data move through a booking."
        lead="Every booking is also a financial transaction. Computer Science provides the rules that keep these records accurate and reliable."
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <Card tone="light" className="p-5 sm:p-6">
            <div className="mb-4 text-sm font-semibold text-slate-900">Transaction lifecycle (conceptual)</div>
            {lifecycle.map((s, i) => (
              <div key={s.t}>
                <button
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition",
                    active === i ? "bg-navy text-white" : "hover:bg-slate-900/[0.03]"
                  )}
                >
                  <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", active === i ? "bg-accent text-white" : "bg-accent/10 text-accent")}>
                    <s.i className="h-4 w-4" />
                  </div>
                  <div>
                    <div className={cn("text-sm font-semibold", active === i ? "text-white" : "text-slate-900")}>{s.t}</div>
                    <div className={cn("text-xs", active === i ? "text-slate-300" : "text-slate-500")}>{s.d}</div>
                  </div>
                </button>
                {i < lifecycle.length - 1 && <DownArrow tone="light" animated={false} className="py-0" />}
              </div>
            ))}
          </Card>
        </Reveal>

        <div className="space-y-6">
          <Reveal>
            <Card tone="light" className="p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-slate-900">Commission model — worked example</div>
                <span className="rounded-full bg-slate-900/5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-slate-500">Hypothetical values</span>
              </div>
              <p className="mt-1 text-xs text-slate-500">Adjust the variables to see how a marketplace fee could be calculated.</p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Booking value (example units)</span>
                    <span className="font-mono text-slate-900">{value}</span>
                  </div>
                  <input type="range" min={100} max={5000} step={100} value={value} onChange={(e) => setValue(+e.target.value)} className="mt-2 w-full accent-[#4b7bf5]" />
                </label>
                <label className="block">
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Commission rate (variable)</span>
                    <span className="font-mono text-slate-900">{rate}%</span>
                  </div>
                  <input type="range" min={0} max={30} step={1} value={rate} onChange={(e) => setRate(+e.target.value)} className="mt-2 w-full accent-[#4b7bf5]" />
                </label>
              </div>

              <div className="mt-5 h-3 w-full overflow-hidden rounded-full bg-slate-100">
                <div className="flex h-full">
                  <div className="h-full bg-navy transition-all duration-300" style={{ width: `${100 - rate}%` }} />
                  <div className="h-full bg-accent transition-all duration-300" style={{ width: `${rate}%` }} />
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-xl bg-paper p-3">
                  <div className="text-[11px] text-slate-500">Booking value</div>
                  <div className="font-mono text-lg font-semibold text-slate-900">{value}</div>
                </div>
                <div className="rounded-xl bg-paper p-3">
                  <div className="flex items-center justify-center gap-1 text-[11px] text-slate-500"><span className="h-2 w-2 rounded-full bg-navy" /> Provider share</div>
                  <div className="font-mono text-lg font-semibold text-slate-900">{provider.toFixed(0)}</div>
                </div>
                <div className="rounded-xl bg-paper p-3">
                  <div className="flex items-center justify-center gap-1 text-[11px] text-slate-500"><span className="h-2 w-2 rounded-full bg-accent" /> Platform fee</div>
                  <div className="font-mono text-lg font-semibold text-accent">{fee.toFixed(0)}</div>
                </div>
              </div>
              <div className="mt-4 rounded-xl bg-[#0b1222] p-3 font-mono text-[12px] text-accent-soft">
                platform_fee = booking_value × commission_rate
              </div>
            </Card>
          </Reveal>

          <Reveal>
            <div className="grid grid-cols-2 gap-3">
              {acid.map((a) => (
                <div key={a.t} className="rounded-2xl border border-slate-900/[0.08] bg-white p-4">
                  <a.i className="h-5 w-5 text-accent" />
                  <div className="mt-2 text-sm font-semibold text-slate-900">{a.t}</div>
                  <div className="text-xs leading-relaxed text-slate-500">{a.d}</div>
                </div>
              ))}
            </div>
            <p className="mt-2 text-xs text-slate-500">ACID — properties that database transactions are designed to follow.</p>
          </Reveal>
        </div>
      </div>

      <Reveal className="mt-8">
        <div className="rounded-2xl border border-slate-900/[0.08] bg-white p-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <PieChart className="h-4 w-4 text-accent" /> Business data a finance team could analyze
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {["Bookings per category", "Cancellation patterns", "Seasonal demand", "Average booking value", "Service add-on usage", "Provider settlement records"].map((x) => (
              <span key={x} className="rounded-full border border-slate-900/10 bg-paper px-3 py-1.5 text-xs text-slate-700">{x}</span>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal className="mt-4">
        <Note tone="light">The commission model is a common marketplace concept shown for learning purposes — not a finalized business model.</Note>
      </Reveal>
    </Section>
  );
}
