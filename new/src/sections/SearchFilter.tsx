import { useEffect, useMemo, useState } from "react";
import { MapPin, Tag, CalendarDays, Users, Wallet, CircleCheck } from "lucide-react";
import { Section, SectionHeader, Reveal, Card, Note } from "@/components/ui";
import { cn } from "@/utils/cn";

type Listing = {
  id: number;
  city: string;
  category: string;
  capacity: number;
  tier: number;
  avail: Record<string, boolean>;
};

const cities = ["Karachi", "Lahore", "Islamabad"];
const categories = ["Large Events", "Sports", "Accommodation", "Catering"];
const days = ["Fri", "Sat", "Sun"];

// Deterministic example dataset (illustrative only)
function makeData(): Listing[] {
  let seed = 7;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  return Array.from({ length: 60 }, (_, id) => ({
    id,
    city: cities[Math.floor(rnd() * cities.length)],
    category: categories[Math.floor(rnd() * categories.length)],
    capacity: Math.round((rnd() * 480 + 20) / 10) * 10,
    tier: 1 + Math.floor(rnd() * 3),
    avail: Object.fromEntries(days.map((d) => [d, rnd() > 0.35])),
  }));
}

const data = makeData();

export default function SearchFilter() {
  const [city, setCity] = useState("Karachi");
  const [category, setCategory] = useState("Large Events");
  const [day, setDay] = useState("Sat");
  const [minCap, setMinCap] = useState(200);
  const [maxTier, setMaxTier] = useState(3);
  const [onlyAvail, setOnlyAvail] = useState(true);

  useEffect(() => {
    const onHeroSearch = (event: Event) => {
      const { category: query, location, date, guests } = (event as CustomEvent<{
        category: string; location: string; date: string; guests: number;
      }>).detail;
      const cityMatch = cities.find((c) => c.toLowerCase() === location.trim().toLowerCase());
      if (cityMatch) setCity(cityMatch);
      const q = query.toLowerCase();
      if (/sport|court|futsal|cricket/.test(q)) setCategory("Sports");
      else if (/stay|hotel|room|workspace|accommodation/.test(q)) setCategory("Accommodation");
      else if (/cater|food|decor|service/.test(q)) setCategory("Catering");
      else if (/venue|event|hall|farmhouse|rooftop/.test(q)) setCategory("Large Events");
      if (date) {
        const weekday = new Date(`${date}T12:00:00`).getDay();
        const dayMatch = ([5, 6, 0] as const).findIndex((d) => d === weekday);
        if (dayMatch >= 0) setDay(days[dayMatch]);
      }
      setMinCap(Math.max(0, Math.min(500, guests)));
    };
    window.addEventListener("veya-search", onHeroSearch);
    return () => window.removeEventListener("veya-search", onHeroSearch);
  }, []);

  const stages = useMemo(() => {
    const s0 = data;
    const s1 = s0.filter((l) => l.city === city);
    const s2 = s1.filter((l) => l.category === category);
    const s3 = s2.filter((l) => l.capacity >= minCap);
    const s4 = s3.filter((l) => l.tier <= maxTier);
    const s5 = onlyAvail ? s4.filter((l) => l.avail[day]) : s4;
    return [
      { label: "All Listings", items: s0 },
      { label: "Location Filter", items: s1 },
      { label: "Category Filter", items: s2 },
      { label: "Capacity Filter", items: s3 },
      { label: "Price Filter", items: s4 },
      { label: "Availability Filter", items: s5 },
    ];
  }, [city, category, day, minCap, maxTier, onlyAvail]);

  // for each listing, the stage at which it was removed
  const removedAt = useMemo(() => {
    const m = new Map<number, number>();
    data.forEach((l) => {
      let st = stages.length; // survived
      for (let i = 1; i < stages.length; i++) {
        if (!stages[i].items.includes(l)) {
          st = i;
          break;
        }
      }
      m.set(l.id, st);
    });
    return m;
  }, [stages]);

  const final = stages[stages.length - 1].items;

  const Select = ({
    icon: I,
    label,
    value,
    options,
    onChange,
  }: {
    icon: typeof MapPin;
    label: string;
    value: string;
    options: string[];
    onChange: (v: string) => void;
  }) => (
    <label className="block rounded-xl border border-white/[0.08] bg-white/[0.02] px-3 py-2.5">
      <span className="flex items-center gap-1.5 text-[11px] text-slate-500">
        <I className="h-3.5 w-3.5" /> {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-0.5 w-full cursor-pointer bg-transparent text-sm font-medium text-white outline-none [&>option]:bg-navy"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );

  return (
    <Section id="search" grid>
      <SectionHeader
        number="04"
        eyebrow="Search & Filtering"
        presenter="Large Events"
        title="How does VEYA find relevant results?"
        lead="The system can use structured data and filtering conditions to reduce a large collection of listings into relevant results."
      />

      <Reveal>
        <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
          {/* Filters */}
          <Card className="p-5">
            <div className="text-sm font-semibold text-white">Filters</div>
            <p className="text-xs text-slate-500">Each filter is a condition on a data field.</p>
            <div className="mt-4 space-y-2.5">
              <Select icon={MapPin} label="Location" value={city} options={cities} onChange={setCity} />
              <Select icon={Tag} label="Category" value={category} options={categories} onChange={setCategory} />
              <Select icon={CalendarDays} label="Date" value={day} options={days} onChange={setDay} />
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] px-3 py-2.5">
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" /> Capacity (min)</span>
                  <span className="font-mono text-accent-soft">≥ {minCap}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={500}
                  step={50}
                  value={minCap}
                  onChange={(e) => setMinCap(+e.target.value)}
                  className="mt-2 w-full accent-[#4b7bf5]"
                />
              </div>
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] px-3 py-2.5">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <Wallet className="h-3.5 w-3.5" /> Price tier (max)
                </div>
                <div className="mt-2 grid grid-cols-3 gap-1.5">
                  {[1, 2, 3].map((t) => (
                    <button
                      key={t}
                      onClick={() => setMaxTier(t)}
                      className={cn(
                        "rounded-lg py-1.5 text-xs font-medium transition",
                        maxTier === t ? "bg-accent text-white" : "bg-white/5 text-slate-400 hover:text-white"
                      )}
                    >
                      {"●".repeat(t)}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setOnlyAvail((a) => !a)}
                className="flex w-full items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.02] px-3 py-3"
              >
                <span className="flex items-center gap-1.5 text-sm text-slate-300">
                  <CircleCheck className="h-4 w-4 text-slate-500" /> Available only
                </span>
                <span className={cn("relative h-5 w-9 rounded-full transition", onlyAvail ? "bg-accent" : "bg-white/10")}>
                  <span className={cn("absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all", onlyAvail ? "left-[18px]" : "left-0.5")} />
                </span>
              </button>
            </div>
          </Card>

          <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
            {/* Funnel */}
            <Card className="p-5 sm:p-6">
              <div className="mb-4 text-sm font-semibold text-white">Filtering pipeline</div>
              <div className="space-y-1">
                {stages.map((s, i) => {
                  const pct = (s.items.length / data.length) * 100;
                  return (
                    <div key={s.label}>
                      <div className="flex items-center justify-between text-xs">
                        <span className={cn(i === 0 ? "text-slate-300" : "text-slate-400")}>{s.label}</span>
                        <span className="font-mono text-slate-300">{s.items.length}</span>
                      </div>
                      <div className="mt-1 h-2.5 w-full overflow-hidden rounded-full bg-white/5">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-accent/70 to-accent-soft transition-all duration-500"
                          style={{ width: `${Math.max(pct, s.items.length ? 3 : 0)}%` }}
                        />
                      </div>
                      {i < stages.length - 1 && <div className="ml-2 h-3 w-px bg-white/10" />}
                    </div>
                  );
                })}
                <div className="mt-3 flex items-center justify-between rounded-xl border border-accent/30 bg-accent/10 px-3 py-2.5">
                  <span className="text-sm font-semibold text-white">Relevant Results</span>
                  <span className="font-mono text-lg font-semibold text-accent-soft">{final.length}</span>
                </div>
              </div>
            </Card>

            {/* Dot grid */}
            <Card className="p-5 sm:p-6">
              <div className="mb-1 text-sm font-semibold text-white">Example dataset · {data.length} listings</div>
              <p className="mb-4 text-xs text-slate-500">Each dot is one listing record. Dim dots were removed by a filter.</p>
              <div className="grid grid-cols-10 gap-1.5">
                {data.map((l) => {
                  const st = removedAt.get(l.id)!;
                  const survived = st === stages.length;
                  return (
                    <div
                      key={l.id}
                      title={`${l.city} · ${l.category} · cap ${l.capacity}`}
                      className={cn(
                        "aspect-square rounded-[5px] transition-all duration-500",
                        survived
                          ? "scale-100 bg-accent shadow-[0_0_12px_rgba(75,123,245,0.7)]"
                          : st >= 4
                            ? "scale-90 bg-white/20"
                            : st >= 2
                              ? "scale-[0.8] bg-white/10"
                              : "scale-75 bg-white/[0.05]"
                      )}
                    />
                  );
                })}
              </div>
              <div className="mt-5 overflow-x-auto rounded-xl bg-[#060a14] p-3 font-mono text-[11px] leading-relaxed text-slate-400">
                <span className="text-accent-soft">results</span> = listings.filter(l =&gt;
                <br />&nbsp;&nbsp;l.location === <span className="text-emerald-300">"{city}"</span> &amp;&amp;
                <br />&nbsp;&nbsp;l.category === <span className="text-emerald-300">"{category}"</span> &amp;&amp;
                <br />&nbsp;&nbsp;l.capacity &gt;= <span className="text-amber-300">{minCap}</span> &amp;&amp;
                <br />&nbsp;&nbsp;l.priceTier &lt;= <span className="text-amber-300">{maxTier}</span>
                {onlyAvail && (
                  <>
                    {" "}&amp;&amp;
                    <br />&nbsp;&nbsp;l.available[<span className="text-emerald-300">"{day}"</span>]
                  </>
                )}
                <br />);
              </div>
            </Card>
          </div>
        </div>
      </Reveal>

      <Reveal className="mt-8">
        <Note>
          The dataset above is generated for demonstration. A real system could also sort or rank the remaining results, but the core idea is applying conditions to structured fields.
        </Note>
      </Reveal>
    </Section>
  );
}
