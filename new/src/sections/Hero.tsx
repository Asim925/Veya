import { useState, type FormEvent } from "react";
import { ArrowRight, ArrowUpRight, CalendarDays, MapPin, Search, Users } from "lucide-react";
import { go } from "@/components/Nav";
import { IMG } from "@/data/gallery";

const popular = [
  { label: "Large Events", value: "Large Events" },
  { label: "Catering", value: "Catering" },
  { label: "Decoration", value: "Catering & Decoration" },
  { label: "Sports", value: "Sports" },
  { label: "Stays", value: "Accommodation" },
  { label: "Workspaces", value: "Accommodation" },
];

export default function Hero() {
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(1);

  const search = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent("veya-search", { detail: { category, location, date, guests } }));
    go("search");
  };

  return (
    <section id="overview" className="veya-hero relative isolate overflow-hidden bg-[#070910] text-[#f7f5f0]">
      <div className="veya-hero-glow pointer-events-none absolute inset-0" />

      <div className="relative mx-auto grid max-w-[1240px] gap-12 px-6 pb-20 pt-36 sm:px-8 lg:min-h-[940px] lg:grid-cols-[1.08fr_0.92fr] lg:gap-2 lg:pb-20 lg:pt-36">
        <div className="relative z-20 min-w-0">
          <div className="veya-enter inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/[0.035] px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/55 sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-[#789cf4]" />
            Business prototype · CS case study
          </div>

          <div className="veya-enter veya-enter-delay mt-10 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.31em] text-[#8aabf8] sm:mt-12 sm:text-xs">
            <span className="h-px w-9 bg-[#799be9]" />
            A new way to find and book places &amp; services
          </div>

          <h1 className="veya-enter veya-enter-delay-2 mt-7 max-w-[760px] text-[clamp(3.15rem,4.1vw,4.15rem)] font-semibold leading-[1.055] tracking-[-0.07em] lg:mt-8">
            Discover spaces,<br className="hidden xl:block" />{" "}
            services and<br className="hidden xl:block" />{" "}
            experiences for every<br className="hidden xl:block" />{" "}
            plan — all in <em className="font-normal text-[#8ca9fb]">one place.</em>
          </h1>

          <p className="veya-enter veya-enter-delay-3 mt-8 max-w-[570px] text-base leading-[1.8] text-white/50 sm:text-lg">
            VEYA proposes a way to bring venues, catering, sports and stays together — to discover, compare and plan in a single flow.
          </p>

          <div className="veya-enter mt-9 flex flex-wrap gap-3">
            <button
              onClick={() => go("problem")}
              className="inline-flex items-center gap-3 rounded-full bg-[#4b79e8] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_15px_35px_-15px_rgba(75,121,232,0.8)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#6088ee]"
            >
              Explore VEYA <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => go("providers")}
              className="inline-flex items-center gap-3 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition duration-300 hover:border-white/45 hover:bg-white/5"
            >
              Provider system <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>

          <form onSubmit={search} className="veya-enter veya-enter-delay-4 mt-12 max-w-[640px] rounded-[20px] border border-white/15 bg-white/[0.035] p-3 shadow-[0_30px_65px_-40px_rgba(0,0,0,0.9)] sm:mt-14">
            <div className="px-2 pb-3 pt-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/40">
              What are you looking for?
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-[1.05fr_0.95fr_1.08fr_0.62fr_auto]">
              <label className="flex min-w-0 items-center gap-2 rounded-xl bg-white/[0.055] px-3 text-white/40">
                <Search className="h-4 w-4 shrink-0" />
                <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Venue, service..." aria-label="Venue or service" className="min-h-12 w-full min-w-0 bg-transparent text-xs text-white outline-none placeholder:text-white/35" />
              </label>
              <label className="flex min-w-0 items-center gap-2 rounded-xl bg-white/[0.055] px-3 text-white/40">
                <MapPin className="h-4 w-4 shrink-0" />
                <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" aria-label="Location" className="min-h-12 w-full min-w-0 bg-transparent text-xs text-white outline-none placeholder:text-white/35" />
              </label>
              <label className="relative flex min-w-0 items-center gap-2 rounded-xl bg-white/[0.055] px-3 text-white/40">
                <CalendarDays className="h-4 w-4 shrink-0" />
                <input value={date} onChange={(e) => setDate(e.target.value)} type="date" aria-label="Date" className="veya-date min-h-12 w-full min-w-0 bg-transparent text-xs text-white/70 outline-none" />
              </label>
              <label className="flex min-w-0 items-center gap-2 rounded-xl bg-white/[0.055] px-3 text-white/60">
                <Users className="h-4 w-4 shrink-0" />
                <input value={guests} onChange={(e) => setGuests(Math.max(1, Number(e.target.value) || 1))} type="number" min="1" aria-label="Guests" className="min-h-12 w-full min-w-0 bg-transparent text-xs text-white outline-none" />
              </label>
              <button type="submit" className="col-span-2 flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#4b79e8] px-5 text-sm font-semibold text-white transition hover:bg-[#6088ee] sm:col-span-1">
                <Search className="h-4 w-4" /> Search
              </button>
            </div>
          </form>

          <div className="veya-enter mt-5 flex max-w-[640px] flex-wrap items-center gap-2">
            <span className="mr-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/35">Popular</span>
            {popular.map((item) => (
              <button key={item.label} onClick={() => { setCategory(item.value); go("categories"); }} className="rounded-full border border-white/15 px-3.5 py-1.5 text-xs text-white/55 transition hover:border-[#8ca9fb]/60 hover:text-white">
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <HeroGallery />
      </div>

      <div className="relative z-10 overflow-hidden border-y border-white/[0.08] py-5">
        <div className="veya-marquee flex w-max items-center gap-10 whitespace-nowrap text-base font-medium tracking-[0.22em] text-white/30 sm:text-xl">
          {Array.from({ length: 3 }, (_, i) => (
            <span key={i} className="flex items-center gap-10">
              <span className="italic">Decoration</span><span className="text-[#6b8fe3]">◆</span>
              <span>SPORTS</span><span className="text-[#6b8fe3]">◆</span>
              <span className="italic">Stays</span><span className="text-[#6b8fe3]">◆</span>
              <span>WORKSPACES</span><span className="text-[#6b8fe3]">◆</span>
              <span className="italic">Farmhouses</span><span className="text-[#6b8fe3]">◆</span>
              <span>ROOFTOPS</span><span className="text-[#6b8fe3]">◆</span>
              <span className="italic">Large Events</span><span className="text-[#6b8fe3]">◆</span>
              <span>CATERING</span><span className="text-[#6b8fe3]">◆</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function HeroGallery() {
  return (
    <div className="veya-gallery relative z-10 mx-auto h-[560px] w-full max-w-[640px] sm:h-[640px] lg:ml-[-20px] lg:mt-[-60px] lg:h-[730px] lg:max-w-none">
      <div aria-hidden="true" className="absolute right-[-8%] top-[-7%] select-none text-[clamp(100px,16vw,300px)] font-black leading-none tracking-[-0.12em] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.095)]">VEYA</div>

      <div className="veya-photo absolute left-[3%] top-[7%] z-[2] h-[70%] w-[58%] rotate-[-1.5deg] overflow-hidden rounded-[20px] border border-white/15 shadow-[0_28px_65px_rgba(0,0,0,0.45)]">
        <img src={IMG.banquetGrand} alt="Colorful banquet hall example" className="h-full w-full object-cover" />
      </div>
      <div className="veya-photo absolute right-[-2%] top-[13%] z-[3] h-[38%] w-[47%] rotate-[2deg] overflow-hidden rounded-[19px] border border-white/15 shadow-[0_28px_65px_rgba(0,0,0,0.5)]">
        <img src={IMG.futsal} alt="Indoor futsal example" className="h-full w-full object-cover" />
      </div>
      <div className="veya-photo absolute bottom-[3%] left-[13%] z-[4] h-[33%] w-[49%] rotate-[2deg] overflow-hidden rounded-[19px] border border-white/15 shadow-[0_28px_65px_rgba(0,0,0,0.5)]">
        <img src={IMG.hotel} alt="Hotel room example" className="h-full w-full object-cover" />
      </div>
      <div className="veya-photo absolute bottom-[15%] right-[2%] z-[5] h-[34%] w-[40%] rotate-[-1.5deg] overflow-hidden rounded-[19px] border border-white/15 shadow-[0_28px_65px_rgba(0,0,0,0.5)]">
        <img src={IMG.buffet} alt="Catering buffet example" className="h-full w-full object-cover" />
      </div>
      <div className="absolute bottom-[15%] left-[0%] z-[6] flex h-20 w-20 rotate-[-13deg] items-center justify-center rounded-full border border-white/20 bg-[#10141f]/70 text-3xl font-semibold text-white backdrop-blur-md sm:h-24 sm:w-24">V</div>
      <span className="absolute right-[20%] top-[46%] z-[6] rounded-full border border-white/20 bg-[#11131c]/65 px-3 py-1.5 text-[10px] text-white/90 backdrop-blur-md sm:text-xs">
        Example venue · Karachi
      </span>
      <span className="absolute bottom-[1%] right-[3%] z-[6] inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#11131c]/70 px-3 py-1.5 text-[10px] text-white/90 backdrop-blur-md sm:text-xs">
        <CalendarDays className="h-3.5 w-3.5 text-[#8ca9fb]" /> Example time slot · 7:00 PM
      </span>
    </div>
  );
}