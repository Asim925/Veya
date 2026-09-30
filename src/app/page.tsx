"use client";

import { useCallback, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Noise } from "@/components/ui";
import Hero, { type HeroSearch } from "@/sections/Hero";
import Categories from "@/sections/Categories";
import HowItWorks from "@/sections/HowItWorks";
import Events from "@/sections/Events";
import Catering from "@/sections/Catering";
import Sports from "@/sections/Sports";
import Hospitality from "@/sections/Hospitality";
import Closing from "@/sections/Closing";
import CaseStudy from "@/sections/CaseStudy";

const EMPTY_SEARCH: HeroSearch = { q: "", location: "", ts: 0 };

export default function Page() {
  const [search, setSearch] = useState<HeroSearch>(EMPTY_SEARCH);

  const handleSearch = useCallback((s: HeroSearch) => {
    setSearch(s);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    requestAnimationFrame(() => {
      document.getElementById("events")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    });
  }, []);

  const clearSearch = useCallback(() => setSearch(EMPTY_SEARCH), []);

  return (
    <div className="min-h-screen">
      <Noise />
      <Navbar />
      <main>
        <Hero onSearch={handleSearch} />
        <Categories />
        <HowItWorks />
        <Events external={search} onClearSearch={clearSearch} />
        <Catering />
        <Sports />
        <Hospitality />
        <CaseStudy />
        <Closing />
      </main>
      <Footer />
    </div>
  );
}
