import { NextResponse } from "next/server";
import { getAllExpirations, getExpirationSummary } from "@/domain/providerExpiration";

export async function GET() {
  try {
    const list = getAllExpirations();
    const summary = getExpirationSummary();

    return NextResponse.json({
      summary,
      list,
    });
  } catch (error) {
    console.error("[API ERROR] /api/providers/expiration GET:", error);
    return NextResponse.json({ error: "Failed to fetch expiration metadata." }, { status: 500 });
  }
}
