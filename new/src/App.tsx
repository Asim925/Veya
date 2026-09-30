import Nav from "@/components/Nav";
import Hero from "@/sections/Hero";
import Problem from "@/sections/Problem";
import Workflow from "@/sections/Workflow";
import Journey from "@/sections/Journey";
import SearchFilter from "@/sections/SearchFilter";
import Domains from "@/sections/Domains";
import Database from "@/sections/Database";
import Booking from "@/sections/Booking";
import Customize from "@/sections/Customize";
import Marketing from "@/sections/Marketing";
import Providers from "@/sections/Providers";
import Transactions from "@/sections/Transactions";
import Architecture from "@/sections/Architecture";
import { Security, Scalability } from "@/sections/SecurityScale";
import Future from "@/sections/Future";
import { CSConnection, Team, Conclusion, Footer } from "@/sections/Closing";

export default function App() {
  return (
    <div className="min-h-screen bg-ink">
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Workflow />
        <Journey />
        <SearchFilter />
        <Domains />
        <Database />
        <Booking />
        <Customize />
        <Marketing />
        <Providers />
        <Transactions />
        <Architecture />
        <Security />
        <Scalability />
        <Future />
        <CSConnection />
        <Team />
        <Conclusion />
      </main>
      <Footer />
    </div>
  );
}
