import { db } from "@/db";
import { planQuotes } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const venue = String(body?.venue ?? "").trim();
    const catering = String(body?.catering ?? "").trim();
    const decoration = String(body?.decoration ?? "").trim();
    const total = Number(body?.total ?? 0);
    if (!venue || !catering || !decoration || !total) {
      return Response.json({ ok: false, error: "A complete plan is required." }, { status: 400 });
    }
    const [row] = await db
      .insert(planQuotes)
      .values({
        venue: venue.slice(0, 140),
        catering: catering.slice(0, 140),
        decoration: decoration.slice(0, 140),
        total: Math.round(total),
      })
      .returning();
    return Response.json({
      ok: true,
      id: row.id,
      reference: "VEYA-" + row.id.replace(/-/g, "").slice(0, 6).toUpperCase(),
    });
  } catch {
    return Response.json({ ok: false, error: "Could not save the plan." }, { status: 500 });
  }
}
