import { Layers, Search, MessageSquare, Phone, FileStack, Compass, Scale, SlidersHorizontal, CalendarCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Section, SectionHeader, Reveal, DownArrow } from "@/components/ui";
import { cn } from "@/utils/cn";

const fragmented: { i: LucideIcon; t: string; d: string }[] = [
  { i: Layers, t: "Different Platforms", d: "Venues, sports, stays and services listed separately" },
  { i: Search, t: "Search", d: "Repeated searches across websites and social pages" },
  { i: MessageSquare, t: "Messages", d: "Availability and prices confirmed by chat" },
  { i: Phone, t: "Calls", d: "Details negotiated manually" },
  { i: FileStack, t: "Separate Bookings", d: "Each requirement booked independently" },
];

const unified: { i: LucideIcon; t: string; d: string }[] = [
  { i: Layers, t: "VEYA", d: "One proposed platform for multiple categories" },
  { i: Compass, t: "Discover", d: "Search structured listings in one place" },
  { i: Scale, t: "Compare", d: "View options side by side using shared fields" },
  { i: SlidersHorizontal, t: "Customize", d: "Attach services such as catering or decoration" },
  { i: CalendarCheck, t: "Book", d: "Availability checked before confirmation" },
];

function Flow({
  items,
  variant,
}: {
  items: typeof fragmented;
  variant: "a" | "b";
}) {
  return (
    <div>
      {items.map((s, idx) => (
        <div key={s.t}>
          <div
            className={cn(
              "flex items-center gap-4 rounded-2xl border px-4 py-3.5 transition",
              variant === "a"
                ? "border-slate-900/[0.08] bg-white/70"
                : idx === 0
                  ? "border-accent/40 bg-navy text-white shadow-[0_20px_40px_-20px_rgba(75,123,245,0.6)]"
                  : "border-slate-900/[0.08] bg-white shadow-sm"
            )}
          >
            <div
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                variant === "a"
                  ? "bg-slate-900/[0.05] text-slate-500"
                  : idx === 0
                    ? "bg-accent text-white"
                    : "bg-accent/10 text-accent"
              )}
            >
              <s.i className="h-5 w-5" />
            </div>
            <div>
              <div
                className={cn(
                  "text-sm font-semibold",
                  variant === "b" && idx === 0 ? "text-white" : "text-slate-900"
                )}
              >
                {s.t}
              </div>
              <div
                className={cn(
                  "text-xs",
                  variant === "b" && idx === 0 ? "text-slate-300" : "text-slate-500"
                )}
              >
                {s.d}
              </div>
            </div>
          </div>
          {idx < items.length - 1 && (
            <DownArrow tone="light" animated={variant === "b"} />
          )}
        </div>
      ))}
    </div>
  );
}

export default function Problem() {
  return (
    <Section id="problem" tone="light" grid>
      <SectionHeader
        tone="light"
        number="01"
        eyebrow="The Problem"
        presenter="CEO"
        title="The problem VEYA is designed to solve."
        lead="People often use different platforms to find venues, sports facilities, accommodation and event services. VEYA proposes one digital platform where these different requirements can be discovered, compared and booked."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:gap-10">
        <Reveal>
          <div className="h-full rounded-3xl border border-slate-900/[0.08] bg-paper-2/60 p-5 sm:p-7">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                Current process
              </h3>
              <span className="rounded-full bg-slate-900/[0.05] px-2.5 py-1 text-[11px] text-slate-500">
                Fragmented
              </span>
            </div>
            <Flow items={fragmented} variant="a" />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="h-full rounded-3xl border border-accent/20 bg-gradient-to-b from-accent/[0.06] to-transparent p-5 sm:p-7">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">
                Proposed process
              </h3>
              <span className="rounded-full bg-accent/10 px-2.5 py-1 text-[11px] text-accent">
                Structured
              </span>
            </div>
            <Flow items={unified} variant="b" />
          </div>
        </Reveal>
      </div>

      <Reveal className="mt-10 text-center text-sm text-slate-500">
        From a Computer Science perspective, this is a problem of organizing scattered information into a shared, structured data model.
      </Reveal>
    </Section>
  );
}
