import { NextResponse } from "next/server";
import { getTranslationEvents } from "@/lib/translatorEvents";

/**
 * GET /api/translator/history
 * Returns recent translation events for the Live Monitor.
 */

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit");
    const { events, total } = getTranslationEvents(limit);

    return NextResponse.json({ success: true, events, total });
  } catch (error) {
    console.error("Error fetching history:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
