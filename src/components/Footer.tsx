import { Logo } from "./icons";

const cols = [
  {
    title: "Explore",
    links: [
      { label: "Large Events", href: "#events" },
      { label: "Catering & Decoration", href: "#catering" },
      { label: "Sports & Recreation", href: "#sports" },
      { label: "Stay & Work", href: "#hospitality" },
    ],
  },
  {
    title: "Categories",
    links: [
      { label: "Venue", href: "#categories" },
      { label: "Catering", href: "#categories" },
      { label: "Sports", href: "#categories" },
      { label: "Hospitality", href: "#categories" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "How It Works", href: "#how" },
      { label: "Campaign Studio", href: "#campaign" },
      { label: "Business Model", href: "#finance" },
      { label: "Founding Team", href: "#team" },
      { label: "About VEYA", href: "#about" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-paper/10 bg-ink-950 text-paper">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <Logo className="h-7 w-7" />
              <span className="text-xl font-semibold tracking-[0.18em]">VEYA</span>
            </div>
            <p className="mt-3 font-serif text-lg italic text-paper/70">Venue + Way</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-paper/50">
              A new way to find and book places &amp; services. Discover spaces, services and experiences for every
              plan — all in one place.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-paper/40">{c.title}</h4>
              <ul className="mt-5 space-y-3">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-sm text-paper/65 transition-colors hover:text-paper">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-paper/10 pt-7 text-xs text-paper/40 md:flex-row md:items-center md:justify-between">
          <p>© 2026 VEYA · Venue + Way — a business prototype, not an operating company.</p>
          <p>All listings are fictional samples. Photos are placeholders — replace with your own.</p>
        </div>
      </div>
    </footer>
  );
}
