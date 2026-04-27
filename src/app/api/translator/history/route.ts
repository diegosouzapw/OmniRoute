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
    const { events, total } = getTranslationEvents(limit ? Number(limit) : undefined);
    const normalizedEvents = events.map((event) => {
      const connectionId =
        typeof event.connectionId === "string" && event.connectionId.trim().length > 0
          ? event.connectionId
          : null;
      const comboName =
        typeof event.comboName === "string" && event.comboName.trim().length > 0
          ? event.comboName
          : null;
      const provider =
        typeof event.provider === "string" && event.provider.trim().length > 0
          ? event.provider
          : null;
      const endpoint =
        typeof event.endpoint === "string" && event.endpoint.trim().length > 0
          ? event.endpoint
          : null;

      return {
        ...event,
        routeProvider: provider,
        routeCombo: comboName,
        routeEndpoint: endpoint,
        routeConnectionId: connectionId,
        routeConnectionShortId: connectionId ? connectionId.slice(0, 8) : null,
        isComboRouted: Boolean(comboName),
      };
    });

    return NextResponse.json({ success: true, events: normalizedEvents, total });
  } catch (error) {
    console.error("Error fetching history:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
