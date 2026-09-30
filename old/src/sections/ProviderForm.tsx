"use client";

import { useState, type FormEvent } from "react";
import { PROVIDER_TYPES } from "@/lib/data";
import { Reveal, SectionHead, ItalicLight } from "@/components/ui";
import { Check, Camera, ChevronDown } from "@/components/icons";

const inputCls =
  "w-full rounded-xl border border-ink-950/12 bg-warm-white px-4 py-3 text-sm text-ink-950 placeholder:text-ink-950/35 transition hover:border-ink-950/25 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20";

const labelCls = "mb-2 block text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-950/50";

export default function ProviderForm() {
  const [type, setType] = useState(PROVIDER_TYPES[0]);
  const [form, setForm] = useState({ name: "", location: "", contact: "", pricing: "", availability: "" });
  const [photos, setPhotos] = useState<string[]>([]);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState<{ ref: string; name: string } | null>(null);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.location.trim() || !form.contact.trim()) {
      setError("Business name, location and contact are required to continue.");
      return;
    }
    setError("");
    setSending(true);
    try {
      const res = await fetch("/api/providers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName: form.name,
          businessType: type,
          location: form.location,
          contact: form.contact,
          photos: photos.join(", "),
          pricing: form.pricing,
          availability: form.availability,
        }),
      });
      const json = await res.json();
      if (json.ok) {
        setDone({ ref: json.reference, name: form.name });
      } else {
        setError(json.error || "Something went wrong. Try again.");
      }
    } catch {
      setError("Could not reach the demo database. Try again.");
    } finally {
      setSending(false);
    }
  };

  const reset = () => {
    setDone(null);
    setForm({ name: "", location: "", contact: "", pricing: "", availability: "" });
    setPhotos([]);
  };

  return (
    <section id="providers" className="scroll-mt-20 bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead
          k="08"
          label="Providers"
          title={
            <>
              Turn your space or service into <ItalicLight>an opportunity.</ItalicLight>
            </>
          }
          sub="Join the VEYA provider network. Submit your details, get verified, start receiving bookings."
        />

        <Reveal delay={60}>
          <div className="no-scrollbar mb-8 flex gap-2 overflow-x-auto pb-1">
            {PROVIDER_TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`shrink-0 rounded-full border px-4.5 py-2 text-xs font-semibold transition-all duration-300 ${
                  type === t
                    ? "border-ink-950 bg-ink-950 text-paper"
                    : "border-ink-950/15 bg-warm-white text-ink-950/60 hover:border-ink-950/35 hover:text-ink-950"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div className="overflow-hidden rounded-[28px] border border-ink-950/10 bg-warm-white shadow-soft">
            {done ? (
              <div className="flex flex-col items-center px-6 py-16 text-center md:py-20">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-white shadow-[0_14px_40px_-12px_rgb(78_123_232/0.6)]">
                  <Check className="h-8 w-8" />
                </span>
                <h3 className="mt-6 text-2xl font-semibold tracking-tight text-ink-950 md:text-3xl">
                  Submission received
                </h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-950/60">
                  <span className="font-semibold text-ink-950">{done.name}</span> is in the verification queue.
                </p>
                <p className="mt-5 rounded-full border border-ink-950/10 bg-paper px-5 py-2 font-mono text-sm tracking-[0.2em] text-accent-deep">
                  {done.ref}
                </p>
                <p className="mt-4 max-w-sm text-xs leading-relaxed text-ink-950/45">
                  Status: pending verification. Submissions are stored in VEYA&apos;s prototype database — at
                  launch, the verification team reviews every provider before publishing.
                </p>
                <button
                  onClick={reset}
                  className="mt-8 rounded-full border border-ink-950/20 px-6 py-3 text-sm font-semibold text-ink-950 transition hover:bg-ink-950 hover:text-paper"
                >
                  Submit another business
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="p-6 md:p-10">
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className={labelCls} htmlFor="biz-name">
                      Business Name
                    </label>
                    <input id="biz-name" className={inputCls} placeholder="e.g. Rosewater Banquets" value={form.name} onChange={set("name")} />
                  </div>
                  <div>
                    <label className={labelCls}>Type</label>
                    <span className="relative block">
                      <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className={inputCls + " cursor-pointer appearance-none pr-9"}
                      >
                        {PROVIDER_TYPES.map((t) => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-950/40" />
                    </span>
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="biz-loc">
                      Location
                    </label>
                    <input id="biz-loc" className={inputCls} placeholder="City & area, e.g. Karachi — DHA" value={form.location} onChange={set("location")} />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="biz-contact">
                      Contact
                    </label>
                    <input id="biz-contact" className={inputCls} placeholder="Phone or email" value={form.contact} onChange={set("contact")} />
                  </div>
                  <div>
                    <span className={labelCls}>Photos</span>
                    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-ink-950/20 bg-paper/50 px-4 py-3 text-sm text-ink-950/55 transition hover:border-accent hover:bg-accent-soft/40">
                      <Camera className="h-5 w-5 shrink-0" />
                      <span className="truncate">{photos.length ? `${photos.length} file(s) selected` : "Add photos (up to 10)"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(e) => setPhotos(Array.from(e.target.files ?? []).map((f) => f.name))}
                      />
                    </label>
                    {photos.length > 0 && (
                      <p className="mt-2 truncate text-[11px] text-ink-950/40">{photos.join(" · ")}</p>
                    )}
                    <p className="mt-2 text-[11px] text-ink-950/40">Demo: filenames only — no upload in the prototype.</p>
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="biz-price">
                      Pricing
                    </label>
                    <input id="biz-price" className={inputCls} placeholder="e.g. Rs 250,000 / event" value={form.pricing} onChange={set("pricing")} />
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelCls} htmlFor="biz-avail">
                      Availability
                    </label>
                    <input id="biz-avail" className={inputCls} placeholder="e.g. Fri – Sun, evenings · 7-day notice" value={form.availability} onChange={set("availability")} />
                  </div>
                </div>

                {error && (
                  <p className="mt-5 rounded-xl border border-red-300/60 bg-red-50 px-4 py-3 text-xs font-medium text-red-700">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-accent py-4 text-sm font-semibold text-white shadow-[0_12px_34px_-12px_rgb(78_123_232/0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-deep disabled:opacity-60 md:w-auto md:px-10"
                >
                  {sending ? "Submitting…" : "Submit for Verification"}
                  {!sending && <Check className="h-4 w-4" />}
                </button>
                <p className="mt-4 text-[11px] text-ink-950/40">
                  Prototype: submissions are saved to VEYA&apos;s demo database with a reference ID.
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
