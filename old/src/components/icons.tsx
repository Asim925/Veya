type P = { className?: string };

const base = (className?: string) => ({
  className,
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
});

/** VEYA mark — a V with a waypoint dot */
export function Logo({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path d="M4 4.5 12 21 20 4.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="3" r="1.9" fill="var(--color-accent)" stroke="none" />
    </svg>
  );
}

export const Search = ({ className }: P) => (
  <svg {...base(className)}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.2-3.2" />
  </svg>
);

export const Pin = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M12 21s-6.5-5.4-6.5-10.2A6.5 6.5 0 0 1 12 4.3a6.5 6.5 0 0 1 6.5 6.5C18.5 15.6 12 21 12 21Z" />
    <circle cx="12" cy="10.8" r="2.3" />
  </svg>
);

export const Calendar = ({ className }: P) => (
  <svg {...base(className)}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
    <path d="M3.5 9.5h17M8 3v4M16 3v4" />
  </svg>
);

export const Users = ({ className }: P) => (
  <svg {...base(className)}>
    <circle cx="9" cy="8.5" r="3.5" />
    <path d="M2.8 20a6.2 6.2 0 0 1 12.4 0M16 5.6a3.5 3.5 0 0 1 0 5.8M17.8 14.4A6.2 6.2 0 0 1 21.2 20" />
  </svg>
);

export const Clock = ({ className }: P) => (
  <svg {...base(className)}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);

export const ArrowRight = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M4 12h16M14 6l6 6-6 6" />
  </svg>
);

export const ArrowUpRight = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M6.5 17.5 17.5 6.5M8.5 6.5h9v9" />
  </svg>
);

export const Check = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="m4.5 12.5 5 5L19.5 6.5" />
  </svg>
);

export const Close = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const ChevronDown = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="m6 9.5 6 6 6-6" />
  </svg>
);

export const Play = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M8 5.5v13l11-6.5-11-6.5Z" />
  </svg>
);

export const Heart = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M12 20s-7.5-4.6-7.5-10A4.4 4.4 0 0 1 12 7.3 4.4 4.4 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10Z" />
  </svg>
);

export const Chat = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M21 11.5a7.5 7.5 0 0 1-7.5 7.5c-1.2 0-2.4-.3-3.4-.8L4 20l1.8-5.1A7.5 7.5 0 1 1 21 11.5Z" />
  </svg>
);

export const Send = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M20.5 3.5 10 14M20.5 3.5 14 20.5l-4-6.5-7-2.5 17.5-8Z" />
  </svg>
);

export const Sparkle = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M12 3v18M3 12h18M6 6l12 12M18 6 6 18" />
  </svg>
);

export const Camera = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M4 8.5h3l1.5-2.5h7L17 8.5h3A1.5 1.5 0 0 1 21.5 10v8A1.5 1.5 0 0 1 20 19.5H4A1.5 1.5 0 0 1 2.5 18v-8A1.5 1.5 0 0 1 4 8.5Z" />
    <circle cx="12" cy="13.5" r="3.5" />
  </svg>
);

export const Bed = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M3 18.5v-11M3 15h18v3.5M3 12h18v-1a3 3 0 0 0-3-3H9v4" />
    <circle cx="6" cy="10.5" r="1.4" />
  </svg>
);

export const Briefcase = ({ className }: P) => (
  <svg {...base(className)}>
    <rect x="3.5" y="7.5" width="17" height="12" rx="2.5" />
    <path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5M3.5 12.5h17" />
  </svg>
);

export const Menu = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M4 7h16M4 12h16M4 17h10" />
  </svg>
);
