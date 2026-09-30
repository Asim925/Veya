"use client";

import { useEffect, useState } from "react";
import { Logo, Menu, Close, ArrowUpRight } from "./icons";
import { btnPrimary } from "./ui";

const LINKS = [
  { label: "Overview", href: "#top" },
  { label: "How It Works", href: "#how" },
  { label: "CS Concepts", href: "#architecture" },
  { label: "Categories", href: "#categories" },
  { label: "Security", href: "#security" },
  { label: "Future", href: "#future" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const [email, setEmail] = useState("");
  const [note, setNote] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open || signIn ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, signIn]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setSignIn(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[120] transition-all duration-500 ${
          scrolled ? "border-b border-paper/10 bg-ink-950/85 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-[72px] md:px-8">
          <a href="#top" className="group flex items-center gap-2.5 text-paper">
            <Logo className="h-6 w-6 text-paper transition-transform duration-500 group-hover:rotate-[8deg]" />
            <span className="text-lg font-semibold tracking-[0.18em]">VEYA</span>
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative text-[13.5px] font-medium text-paper/70 transition-colors hover:text-paper after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-accent-2 after:transition-all after:duration-300 hover:after:w-full"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <button
              onClick={() => setSignIn(true)}
              className="rounded-full px-4 py-2 text-[13.5px] font-medium text-paper/70 transition-colors hover:text-paper"
            >
              Sign In
            </button>
            <a href="#providers" className={btnPrimary + " !px-5 !py-2.5"}>
              Get Started
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/15 text-paper lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* mobile menu */}
      <div
        className={`fixed inset-0 z-[130] flex flex-col bg-ink-950/97 backdrop-blur-2xl transition-all duration-500 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-5">
          <span className="flex items-center gap-2.5 text-paper">
            <Logo className="h-6 w-6" />
            <span className="text-lg font-semibold tracking-[0.18em]">VEYA</span>
          </span>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/15 text-paper"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <Close className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex flex-1 flex-col justify-center gap-2 px-6">
          {LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`border-b border-paper/10 py-4 text-3xl font-semibold tracking-tight text-paper transition-all duration-500 ${
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: `${120 + i * 70}ms` }}
            >
              {l.label}
            </a>
          ))}
          <div className="mt-8 flex gap-3">
            <button
              onClick={() => {
                setOpen(false);
                setSignIn(true);
              }}
              className="flex-1 rounded-full border border-paper/20 py-3.5 text-sm font-semibold text-paper"
            >
              Sign In
            </button>
            <a href="#providers" onClick={() => setOpen(false)} className={btnPrimary + " flex-1"}>
              Get Started
            </a>
          </div>
        </nav>
        <p className="px-6 pb-8 text-xs text-paper/40">A new way to find and book places &amp; services.</p>
      </div>

      {/* sign in modal */}
      {signIn && (
        <div className="fixed inset-0 z-[140] flex items-center justify-center p-5">
          <button
            aria-label="Close sign in"
            className="absolute inset-0 bg-ink-950/70 backdrop-blur-sm"
            onClick={() => setSignIn(false)}
          />
          <div className="glass-dark relative w-full max-w-sm rounded-2xl bg-ink-900/90 p-8 shadow-soft">
            <button
              onClick={() => setSignIn(false)}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-paper/15 text-paper/70 transition hover:text-paper"
              aria-label="Close"
            >
              <Close className="h-4 w-4" />
            </button>
            <div className="mb-6 flex items-center gap-2.5">
              <Logo className="h-6 w-6 text-paper" />
              <span className="text-sm font-semibold tracking-[0.18em] text-paper">SIGN IN</span>
            </div>
            <p className="mb-5 text-sm leading-relaxed text-paper/60">
              Accounts launch with VEYA v1. This is a prototype — sign in is not active yet.
            </p>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="you@email.com"
              className="w-full rounded-xl border border-paper/15 bg-paper/5 px-4 py-3 text-sm text-paper placeholder:text-paper/35 focus:border-accent-2 focus:outline-none"
            />
            <button
              onClick={() => setNote(true)}
              className={btnPrimary + " mt-4 w-full"}
            >
              Continue
            </button>
            {note && (
              <p className="mt-4 rounded-xl border border-accent-2/30 bg-accent/10 px-4 py-3 text-xs leading-relaxed text-accent-2">
                This is a business prototype — accounts and sign-in arrive at the v1 launch.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
