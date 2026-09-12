import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const instrument = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VEYA — A new way to find and book places & services",
  description:
    "VEYA (Venue + Way) brings venues, catering, sports and stays together on one platform. Discover spaces, services and experiences for every plan — all in one place.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${instrument.variable} bg-cream font-sans text-ink-950 antialiased`}>
        {children}
      </body>
    </html>
  );
}
