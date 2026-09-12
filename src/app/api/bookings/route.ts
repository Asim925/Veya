import { db } from "@/db";
import { slotBookings } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const facility = String(body?.facility ?? "").trim();
    const slot = String(body?.slot ?? "").trim();
    if (!facility || !slot) {
      return Response.json({ ok: false, error: "Facility and slot are required." }, { status: 400 });
    }
    const [row] = await db
      .insert(slotBookings)
      .values({ facility: facility.slice(0, 120), slot: slot.slice(0, 20) })
      .returning();
    return Response.json({
      ok: true,
      id: row.id,
      reference: "VEYA-" + row.id.replace(/-/g, "").slice(0, 6).toUpperCase(),
    });
  } catch {
    return Response.json({ ok: false, error: "Could not save the booking." }, { status: 500 });
  }
}
