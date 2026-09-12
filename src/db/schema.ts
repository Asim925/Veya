import { pgTable, text, integer, timestamp, uuid } from "drizzle-orm/pg-core";

/**
 * VEYA prototype database.
 * Stores real submissions made in the UI (provider onboarding,
 * demo slot bookings and custom event plan quotes).
 */

export const providerSubmissions = pgTable("provider_submissions", {
  id: uuid("id").primaryKey().defaultRandom(),
  businessName: text("business_name").notNull(),
  businessType: text("business_type").notNull(),
  location: text("location").notNull(),
  contact: text("contact").notNull(),
  photos: text("photos"),
  pricing: text("pricing"),
  availability: text("availability"),
  status: text("status").notNull().default("pending_verification"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const slotBookings = pgTable("slot_bookings", {
  id: uuid("id").primaryKey().defaultRandom(),
  facility: text("facility").notNull(),
  slot: text("slot").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const planQuotes = pgTable("plan_quotes", {
  id: uuid("id").primaryKey().defaultRandom(),
  venue: text("venue").notNull(),
  catering: text("catering").notNull(),
  decoration: text("decoration").notNull(),
  total: integer("total").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
