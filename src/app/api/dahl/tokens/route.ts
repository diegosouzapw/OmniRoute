/**
 * POST /api/dahl/tokens
 *
 * Server-side proxy to https://inference.dahl.global/tokens.
 *
 * Why a proxy (not a direct browser POST):
 *   The Dahl token endpoint does not send CORS headers, so a browser fetch()
 *   from the dashboard is blocked by the Same-Origin Policy. This route runs
 *   on the server (no CORS restriction) and forwards the response unchanged.
 *
 * Response shape from upstream:
 *   { "available_tokens": number, "token": string }
 */
import { NextResponse } from "next/server";
import {
  safeOutboundFetch,
  SafeOutboundFetchError,
  getSafeOutboundFetchErrorStatus,
} from "@/shared/network/safeOutboundFetch";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

const DAHL_TOKENS_URL = "https://inference.dahl.global/tokens";

export async function POST() {
  try {
    const resp = await safeOutboundFetch(DAHL_TOKENS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (!resp.ok) {
      const body = await resp.text().catch(() => "");
      return NextResponse.json(
        { error: `Upstream ${resp.status}`, detail: sanitizeErrorMessage(body) },
        { status: resp.status }
      );
    }

    const data = await resp.json();
    return NextResponse.json(data, { status: resp.status });
  } catch (err) {
    if (err instanceof SafeOutboundFetchError) {
      const status = getSafeOutboundFetchErrorStatus(err) ?? 502;
      return NextResponse.json(
        { error: "Upstream fetch failed", detail: sanitizeErrorMessage(err.message) },
        { status }
      );
    }
    return NextResponse.json(
      {
        error: "Internal error",
        detail: sanitizeErrorMessage(err instanceof Error ? err.message : String(err)),
      },
      { status: 500 }
    );
  }
}
