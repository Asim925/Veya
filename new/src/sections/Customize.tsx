import { useState } from "react";
import { Building2, UtensilsCrossed, Flower2, Plus, Equal, ClipboardList, Check } from "lucide-react";
import { Section, SectionHeader, Reveal, Card, Note } from "@/components/ui";
import { venues } from "./Journey";
import { IMG } from "@/data/gallery";
import { cn } from "@/utils/cn";

const catering = [
  { k: "Basic", items: ["Main course", "Soft drinks"], tier: 1, img: IMG.buffetElegant },
  { k: "Standard", items: ["Starters", "Main course", "Dessert", "Beverages"], tier: 2, img: IMG.buffet },
  { k: "Premium", items: ["Live stations", "Multi-course menu", "Dessert bar", "Premium beverages"], tier: 3, img: IMG.buffetOrange },
];

const decor = [
  { k: "Classic", items: ["White florals", "Traditional stage"], tier: 1, img: IMG.gardenAisle },
  { k: "Modern", items: ["Minimal florals", "LED backdrop", "Geometric stage"], tier: 2, img: IMG.floralArch },
  { k: "Luxury", items: ["Floral ceiling", "Chandelier lighting", "Custom stage"], tier: 3, img: IMG.weddingStage },
];

export default function Customize() {
  const [venue, setVenue] = useState("A");
  const [cat, setCat] = useState<string | null>("Standard");
  const [dec, setDec] = useState<string | null>("Modern");
  const v = venues.find((x) => x.id === venue)!;
  const c = catering.find((x) => x.k === cat);
  const d = decor.find((x) => x.k === dec);

  const json = {
    booking_id: "B200",
    listing_id: `L-${v.id}`,
    services: [
      ...(c ? [{ service_id: `CAT-${c.k.toUpperCase()}`, type: "catering" }] : []),
      ...(d ? [{ service_id: `DEC-${d.k.toUpperCase()}`, type: "decoration" }] : []),
    ],
    status: "draft",
  };

  return (
    <Section id="customize">
      <div className="pointer-events-none absolute right-0 top-20 h-[400px] w-[500px] rounded-full bg-accent/10 blur-[120px]" />
      <SectionHeader
        number="08"
        eyebrow="Catering & Decoration"
        presenter="Catering & Decoration"
        title="Combining multiple services into one plan."
        lead="This demonstrates how a system can associate multiple services with one user booking."
      />

      <Reveal>
        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <div className="space-y-5">
            {/* Venue */}
            <Card className="p-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <Building2 className="h-4 w-4 text-accent-soft" /> Selected Venue
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {venues.map((x) => (
                  <button
                    key={x.id}
                    onClick={() => setVenue(x.id)}
                    className={cn(
                      "group relative h-24 overflow-hidden rounded-xl border text-left transition",
                      venue === x.id ? "border-accent ring-2 ring-accent/30" : "border-white/10 opacity-60 hover:opacity-100"
                    )}
                  >
                    <img src={x.img} alt={x.type} className="absolute inset-0 h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/90 to-transparent" />
                    <div className="absolute bottom-2 left-2.5">
                      <div className="text-xs font-semibold text-white">{x.name}</div>
                      <div className="text-[10px] text-slate-300">{x.type}</div>
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            {/* Catering */}
            <Card className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <UtensilsCrossed className="h-4 w-4 text-accent-soft" /> Add Catering
                </div>
                <button onClick={() => setCat(null)} className="text-xs text-slate-500 hover:text-white">None</button>
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                {catering.map((x) => (
                  <button
                    key={x.k}
                    onClick={() => setCat(x.k)}
                    className={cn(
                      "overflow-hidden rounded-xl border text-left transition",
                      cat === x.k ? "border-accent bg-accent/10" : "border-white/10 bg-white/[0.02] hover:border-white/25"
                    )}
                  >
                    <div className="relative h-16 overflow-hidden">
                      <img src={x.img} alt={`${x.k} catering example`} loading="lazy" className="h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
                    </div>
                    <div className="p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-white">{x.k}</span>
                        {cat === x.k && <Check className="h-4 w-4 text-accent-soft" />}
                      </div>
                      <ul className="mt-2 space-y-0.5 text-[11px] text-slate-400">
                        {x.items.map((i) => <li key={i}>· {i}</li>)}
                      </ul>
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            {/* Decoration */}
            <Card className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Flower2 className="h-4 w-4 text-accent-soft" /> Add Decoration
                </div>
                <button onClick={() => setDec(null)} className="text-xs text-slate-500 hover:text-white">None</button>
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                {decor.map((x) => (
                  <button
                    key={x.k}
                    onClick={() => setDec(x.k)}
                    className={cn(
                      "overflow-hidden rounded-xl border text-left transition",
                      dec === x.k ? "border-accent bg-accent/10" : "border-white/10 bg-white/[0.02] hover:border-white/25"
                    )}
                  >
                    <div className="relative h-16 overflow-hidden">
                      <img src={x.img} alt={`${x.k} decoration example`} loading="lazy" className="h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
                    </div>
                    <div className="p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-white">{x.k}</span>
                        {dec === x.k && <Check className="h-4 w-4 text-accent-soft" />}
                      </div>
                      <ul className="mt-2 space-y-0.5 text-[11px] text-slate-400">
                        {x.items.map((i) => <li key={i}>· {i}</li>)}
                      </ul>
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Plan */}
          <div className="flex flex-col gap-5">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-navy-2 to-navy p-6">
              <div className="text-xs font-medium uppercase tracking-wider text-slate-500">Equation</div>
              <div className="mt-5 space-y-2">
                <Row icon={Building2} label="Venue" value={`${v.name} · ${v.type}`} on />
                <div className="flex justify-center"><Plus className="h-4 w-4 text-slate-500" /></div>
                <Row icon={UtensilsCrossed} label="Catering" value={c ? `${c.k} package` : "Not added"} on={!!c} />
                <div className="flex justify-center"><Plus className="h-4 w-4 text-slate-500" /></div>
                <Row icon={Flower2} label="Decoration" value={d ? `${d.k} theme` : "Not added"} on={!!d} />
                <div className="flex justify-center"><Equal className="h-4 w-4 text-slate-500" /></div>
              </div>
              <div className="relative mt-2 overflow-hidden rounded-2xl">
                <img src={v.img} alt="Selected venue example" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                {d && <img src={d.img} alt="" aria-hidden loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-overlay" />}
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
                <div className="relative p-5">
                  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-accent-soft">
                    <ClipboardList className="h-3.5 w-3.5" /> Combined Event Plan
                  </div>
                  <div className="mt-2 text-xl font-semibold text-white">{v.type}</div>
                  <div className="mt-1 text-sm text-slate-300">
                    {[c && `${c.k} catering`, d && `${d.k} decoration`].filter(Boolean).join(" · ") || "Venue only"}
                  </div>
                  <div className="mt-3 flex gap-1.5">
                    <span className="rounded-md bg-white/10 px-2 py-0.5 text-[10px] text-slate-200">
                      {1 + (c ? 1 : 0) + (d ? 1 : 0)} linked records
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#060a14]">
              <div className="border-b border-white/[0.06] px-5 py-2.5 font-mono text-[11px] text-slate-500">booking record · conceptual</div>
              <pre key={JSON.stringify(json)} className="fade-in overflow-x-auto p-5 font-mono text-[12px] leading-relaxed text-accent-soft">
                {JSON.stringify(json, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal className="mt-8">
        <Note>One booking record references many service records. In database terms, this is a <b>one-to-many</b> (or many-to-many) relationship.</Note>
      </Reveal>
    </Section>
  );
}

function Row({ icon: I, label, value, on }: { icon: typeof Building2; label: string; value: string; on: boolean }) {
  return (
    <div className={cn("flex items-center gap-3 rounded-xl border px-4 py-3 transition", on ? "border-white/10 bg-white/[0.04]" : "border-dashed border-white/10 opacity-50")}>
      <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg", on ? "bg-accent/20 text-accent-soft" : "bg-white/5 text-slate-500")}>
        <I className="h-4 w-4" />
      </div>
      <div>
        <div className="text-[11px] text-slate-500">{label}</div>
        <div className="text-sm font-medium text-white">{value}</div>
      </div>
    </div>
  );
}
