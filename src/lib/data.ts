import { IMG } from "./media";

/* ================================================================
   VEYA — SAMPLE CATALOG
   All listings below are FICTIONAL samples for the prototype.
   Prices, names and capacities are illustrative only.
   ================================================================ */

export const rs = (n: number) => "Rs " + n.toLocaleString("en-US");

export type EventListing = {
  id: string;
  name: string;
  type: string;
  typeKey: "farmhouse" | "marriage" | "banquet" | "rooftop" | "garden" | "auditorium";
  area: string;
  capacity: number;
  price: number;
  img: string;
  blurb: string;
};

export const EVENT_LISTINGS: EventListing[] = [
  { id: "e1", name: "Amber Farmhouse", type: "Farmhouse", typeKey: "farmhouse", area: "PECHS", capacity: 400, price: 320000, img: IMG.evFarmhouse, blurb: "Open lawns, private dining and a lakeside bar for daytime and evening events." },
  { id: "e2", name: "The Rose Hall", type: "Marriage Hall", typeKey: "marriage", area: "DHA", capacity: 800, price: 750000, img: IMG.evMarriage, blurb: "Chandelier-lit grand hall with in-house planning desk and dressing rooms." },
  { id: "e3", name: "Pearl Banquet Hall", type: "Banquet Hall", typeKey: "banquet", area: "Gulshan", capacity: 1000, price: 900000, img: IMG.evBanquet, blurb: "Column-free banquet space with acoustic ceiling and stage access." },
  { id: "e4", name: "Skyline Rooftop", type: "Rooftop", typeKey: "rooftop", area: "Clifton", capacity: 150, price: 180000, img: IMG.evRooftop, blurb: "Seaside skyline views, string lights and a private cocktail terrace." },
  { id: "e5", name: "Garden Court", type: "Gardens & Lawns", typeKey: "garden", area: "Bahria", capacity: 300, price: 250000, img: IMG.evGarden, blurb: "Manicured lawns, floral walkways and shade structures for garden events." },
  { id: "e6", name: "Regent Auditorium", type: "Auditorium", typeKey: "auditorium", area: "Saddar", capacity: 600, price: 400000, img: IMG.evAuditorium, blurb: "Theatre seating, projection and a full audio-visual crew on request." },
  { id: "e7", name: "Meadow Lawn", type: "Gardens & Lawns", typeKey: "garden", area: "KDA", capacity: 250, price: 120000, img: IMG.evMeadow, blurb: "Compact lawn with bonfire circle — ideal for engagements and brunches." },
  { id: "e8", name: "Villa Serena", type: "Farmhouse", typeKey: "farmhouse", area: "North Nazimabad", capacity: 200, price: 280000, img: IMG.evVilla, blurb: "Hill-side villa with terrace views and a dedicated event courtyard." },
  { id: "e9", name: "The Grand Reception", type: "Marriage Hall", typeKey: "marriage", area: "DHA", capacity: 1200, price: 1150000, img: IMG.evGrand, blurb: "Multi-level reception floor with valet and separate family lounges." },
  { id: "e10", name: "Terrace 44", type: "Rooftop", typeKey: "rooftop", area: "KDA", capacity: 120, price: 150000, img: IMG.evTerrace, blurb: "Neon-lit urban terrace with a live DJ booth and skyline seating." },
  { id: "e11", name: "The Ivory Room", type: "Banquet Hall", typeKey: "banquet", area: "Askari", capacity: 350, price: 300000, img: IMG.evIvory, blurb: "Bright, modern banquet room with floor-to-ceiling windows." },
  { id: "e12", name: "Chandelier Court", type: "Marriage Hall", typeKey: "marriage", area: "PECHS", capacity: 500, price: 550000, img: IMG.evChandelier, blurb: "Candlelit classical décor with a private garden entrance." },
];

export const EVENT_TYPES: { key: EventListing["typeKey"] | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "farmhouse", label: "Farmhouse" },
  { key: "marriage", label: "Marriage Hall" },
  { key: "banquet", label: "Banquet" },
  { key: "rooftop", label: "Rooftop" },
  { key: "garden", label: "Garden" },
  { key: "auditorium", label: "Auditorium" },
];

export const EVENT_AREAS = ["DHA", "Gulshan", "Clifton", "PECHS", "Bahria", "KDA", "Saddar", "Askari", "North Nazimabad"];

export const CATEGORIES = [
  {
    n: "01",
    title: "Large Events",
    href: "#events",
    img: IMG.catEvents,
    items: ["Farmhouses", "Marriage Halls", "Banquet Halls", "Rooftops", "Gardens", "Auditoriums"],
    blurb: "Spaces that hold the big moments.",
  },
  {
    n: "02",
    title: "Catering & Decoration",
    href: "#catering",
    img: IMG.catCatering,
    items: ["Food Packages", "Desserts", "Beverages", "Themes", "Floral", "Stage & Lighting"],
    blurb: "The details that make the day.",
  },
  {
    n: "03",
    title: "Sports & Recreation",
    href: "#sports",
    img: IMG.catSports,
    items: ["Cricket", "Football / Futsal", "Basketball", "Badminton", "Indoor Sports", "Gaming Arenas"],
    blurb: "Book the court by the hour.",
  },
  {
    n: "04",
    title: "Accommodation & Hospitality",
    href: "#hospitality",
    img: IMG.catHospitality,
    items: ["Hotels", "Guest Houses", "Apartments", "Vacation Homes", "Meeting Rooms", "Workspaces"],
    blurb: "Where you stay. Where you work.",
  },
];

export const HOW_STEPS = [
  { n: "01", title: "Discover", line: "Browse verified spaces and services across all four categories." },
  { n: "02", title: "Compare", line: "See pricing, capacity and availability side by side." },
  { n: "03", title: "Customize", line: "Add catering, decoration or time slots to your plan." },
  { n: "04", title: "Book", line: "Confirm in one flow — one checkout, one confirmation." },
];

export const CATERING_ITEMS = [
  { title: "Food Packages", sub: "Buffet, family style & live counters", price: "from Rs 1,800 / guest", img: IMG.catFood },
  { title: "Desserts", sub: "Cakes, pastry walls & sweet counters", price: "from Rs 120,000", img: IMG.catDesserts },
  { title: "Beverages", sub: "Fresh-juice, chai & mocktail bars", price: "from Rs 450 / guest", img: IMG.catBeverages },
  { title: "Serving Packages", sub: "Staffed service for 100–1,000 guests", price: "from Rs 350 / guest", img: IMG.catServing },
];

export const DECOR_ITEMS = [
  { title: "Wedding Themes", sub: "Full themed styling end to end", price: "from Rs 350,000", img: IMG.decThemes },
  { title: "Floral Decoration", sub: "Arches, centrepieces & walkways", price: "from Rs 85,000", img: IMG.decFloral },
  { title: "Stage Setup", sub: "Modular stages, ramps & drapes", price: "from Rs 120,000", img: IMG.decStage },
  { title: "Lighting & Seating", sub: "Uplighting, string lights & chairs", price: "from Rs 60,000", img: IMG.decLighting },
];

export const PLAN_VENUES = [
  { id: "amber", name: "Amber Farmhouse", sub: "PECHS · up to 400 guests", price: 320000 },
  { id: "rose", name: "The Rose Hall", sub: "DHA · up to 800 guests", price: 750000 },
  { id: "skyline", name: "Skyline Rooftop", sub: "Clifton · up to 150 guests", price: 180000 },
  { id: "garden", name: "Garden Court", sub: "Bahria · up to 300 guests", price: 250000 },
];

export const PLAN_CATERING = [
  { id: "silver", name: "Silver Package", sub: "Buffet · up to 300 guests", price: 420000 },
  { id: "gold", name: "Gold Package", sub: "Premium buffet + live counters", price: 640000 },
  { id: "platinum", name: "Platinum Package", sub: "Signature menus + private chefs", price: 880000 },
];

export const PLAN_DECOR = [
  { id: "floral", name: "Floral & Stage", sub: "Arches, centrepieces + stage", price: 185000 },
  { id: "grand", name: "Grand Theme", sub: "Full themed styling", price: 340000 },
  { id: "lights", name: "Lighting & Seating", sub: "Uplighting + chair styling", price: 95000 },
];

export const SPORTS = [
  { name: "Sixers Cricket Ground", kind: "Cricket · floodlit", area: "PECHS", price: 12000, img: IMG.spCricket },
  { name: "CityFutsal Arena", kind: "Football / Futsal", area: "DHA", price: 8000, img: IMG.spFutsal },
  { name: "Court 91", kind: "Basketball", area: "Clifton", price: 6500, img: IMG.spBasketball },
  { name: "SmashPoint Club", kind: "Badminton", area: "Gulshan", price: 2000, img: IMG.spBadminton },
  { name: "BaseClimb Hub", kind: "Indoor Sports", area: "Bahria", price: 1500, img: IMG.spIndoor },
  { name: "Pixel Pit Arena", kind: "Gaming Arena", area: "KDA", price: 3000, img: IMG.spGaming },
];

export const SLOTS = ["6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"];

export const STAYS = [
  { name: "Clifton Bay Hotel", kind: "Hotel", area: "Clifton", price: "Rs 9,500 / night", img: IMG.stHotel },
  { name: "Haveli Guest House", kind: "Guest House", area: "Gulshan", price: "Rs 6,500 / night", img: IMG.stGuestHouse },
  { name: "Skyline Apartments", kind: "Apartment", area: "DHA", price: "Rs 12,000 / night", img: IMG.stApartment },
  { name: "Margalla Vacation Home", kind: "Vacation Home", area: "Gwadar", price: "Rs 18,000 / night", img: IMG.stVacation },
  { name: "Mehran Farmhouse Stay", kind: "Farmhouse", area: "Hyderabad", price: "Rs 25,000 / weekend", img: IMG.stFarmhouse },
];

export const WORKSPACES = [
  { name: "Boardroom 44", kind: "Meeting Room", area: "DHA", price: "Rs 2,500 / hr", img: IMG.wkMeeting },
  { name: "K1 Hub", kind: "Office", area: "Gulshan", price: "Rs 800 / day", img: IMG.wkOffice },
  { name: "Summit Conference Hall", kind: "Conference Room", area: "Clifton", price: "Rs 6,000 / hr", img: IMG.wkConference },
  { name: "Forum Seminar Space", kind: "Seminar Space", area: "Saddar", price: "Rs 15,000 / day", img: IMG.wkSeminar },
];

export const CHANNELS = ["Instagram", "TikTok", "Google", "Micro-influencers", "Referrals"];

export const PROVIDER_STEPS = ["Register", "Submit Details", "Get Verified", "Publish", "Receive Bookings"];

export const PROVIDER_TYPES = ["Venue", "Sports Facility", "Catering", "Decoration", "Hotel / Stay", "Workspace"];

export const REVENUE = [
  { n: "01", title: "Booking Commission", line: "A small percentage on every confirmed booking made through the platform." },
  { n: "02", title: "Featured Listings", line: "Priority placement for providers who want more visibility in search." },
  { n: "03", title: "Provider Plans", line: "Monthly plans with higher listing limits, analytics and placement." },
  { n: "04", title: "Platform / Service Fees", line: "Small processing and service fees on selected bookings." },
];

export const PHASES = [
  {
    n: "01",
    title: "LAUNCH",
    tag: "Phase 1",
    lines: ["Start in Karachi", "Build the provider network", "Launch core categories"],
  },
  {
    n: "02",
    title: "EXPAND",
    tag: "Phase 2",
    lines: ["Enter major Pakistani cities", "Grow the provider network", "Deepen category coverage"],
  },
  {
    n: "03",
    title: "SCALE",
    tag: "Phase 3",
    lines: ["Mobile app", "Dedicated teams", "Larger network & external investment"],
  },
];

export const TEAM = [
  { n: "01", role: "CEO & Product", domain: "Technology", line: "Product direction, platform and engineering." },
  { n: "02", role: "Marketing & Business Development", domain: "Growth", line: "Campaigns, channels and provider acquisition." },
  { n: "03", role: "Finance", domain: "Funding & Operations", line: "Business model, budgets and investor relations." },
  { n: "04", role: "Large Events", domain: "Category Lead", line: "Farmhouses, halls, rooftops, gardens and auditoriums." },
  { n: "05", role: "Catering & Decoration", domain: "Category Lead", line: "Food, themes, floral, stage and lighting partners." },
  { n: "06", role: "Sports & Recreation", domain: "Category Lead", line: "Courts, grounds, indoor sports and gaming arenas." },
  { n: "07", role: "Accommodation & Hospitality", domain: "Category Lead", line: "Hotels, stays, guest houses and workspace partners." },
];
