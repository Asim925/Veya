import { db } from "@/db";
import { providerSubmissions } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body?.businessName ?? "").trim();
    const location = String(body?.location ?? "").trim();
    const contact = String(body?.contact ?? "").trim();
    if (!name || !location || !contact) {
      return Response.json(
        { ok: false, error: "Business name, location and contact are required." },
        { status: 400 }
      );
    }
    const [row] = await db
      .insert(providerSubmissions)
      .values({
        businessName: name.slice(0, 140),
        businessType: String(body?.businessType ?? "Venue").slice(0, 60),
        location: location.slice(0, 140),
        contact: contact.slice(0, 200),
        photos: String(body?.photos ?? "").slice(0, 400),
        pricing: String(body?.pricing ?? "").slice(0, 200),
        availability: String(body?.availability ?? "").slice(0, 200),
      })
      .returning();
    return Response.json({
      ok: true,
      id: row.id,
      reference: "VEYA-" + row.id.replace(/-/g, "").slice(0, 6).toUpperCase(),
    });
  } catch {
    return Response.json({ ok: false, error: "Could not save the submission." }, { status: 500 });
  }
}
