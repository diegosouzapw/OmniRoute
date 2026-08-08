/**
 * GET /api/radar/referrals — return the referral links section ("Pegue seus
 * créditos grátis", D28) from the locally cached Radar REFERRALS feed
 * (`GET /v1/referrals/latest` — a separate, always-current artifact from the
 * catalog feed; see `src/lib/radar/referralsSync.ts`).
 *
 * NEVER proxies the private feed server directly — the browser only ever
 * talks to this local endpoint. Unlike the catalog (whose sync is entirely
 * client-triggered via `POST /api/radar/sync`), THIS route also triggers a
 * sync itself, inline, whenever the cached referrals are stale or missing
 * (`shouldSyncReferralsOnRead`, 1h window) — the whole point of the
 * standalone referrals feed is that fixed links show up promptly instead of
 * inheriting the catalog's up-to-30-day community-tier snapshot delay. The
 * network call still only ever happens inside `syncRadarReferrals()`
 * (`referralsSync.ts`) — this route itself never talks to the upstream feed
 * server directly.
 *
 * `fixed` referrals are present in every tier (community included, gated
 * server-side); `campaigns` only comes populated on the `live` (supporter)
 * tier — the community artifact publishes `campaigns: []` — so this route
 * never needs to decide tier gating itself, it just relays what the cached
 * feed already contains. `tier` is informative (from the cache row), used
 * by the UI to show a soft upsell note when campaigns is empty.
 *
 * Flag off => 404 (the surface doesn't exist when disabled), checked BEFORE
 * auth. Unauthenticated access once the flag is on => 401 (management route
 * — dashboard session or a management-scoped key).
 */

import { NextResponse } from "next/server";
import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { isFeatureFlagEnabled } from "@/shared/utils/featureFlags";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { getRadarReferrals } from "@/lib/radar";
import { getRadarReferralsCache } from "@/lib/db/radar";
import { syncRadarReferrals, shouldSyncReferralsOnRead } from "@/lib/radar/referralsSync";
import { buildErrorBody } from "@omniroute/open-sse/utils/error";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function OPTIONS() {
  return handleCorsOptions();
}

export async function GET(request: Request) {
  // Flag gate — surface doesn't exist when disabled. MUST run before auth.
  if (!isFeatureFlagEnabled("RADAR_ENABLED")) {
    return NextResponse.json(
      buildErrorBody(404, "Not found"),
      { status: 404, headers: CORS_HEADERS },
    );
  }

  if (!(await isAuthenticated(request))) {
    return NextResponse.json(
      buildErrorBody(401, "Unauthorized"),
      { status: 401, headers: CORS_HEADERS },
    );
  }

  try {
    // Sync-on-read: refresh the cache inline when it is stale or missing.
    // `syncRadarReferrals()` self-gates on flag/opt-in and never throws, so
    // this is safe to await unconditionally — a disabled/opted-out operator
    // just gets an instant no-op here and falls through to serving whatever
    // (possibly empty) cache already exists.
    const existingCache = getRadarReferralsCache();
    if (shouldSyncReferralsOnRead(existingCache?.fetchedAt ?? null, Date.now())) {
      await syncRadarReferrals();
    }

    const { fixed, campaigns } = getRadarReferrals();
    const cache = getRadarReferralsCache();
    return NextResponse.json(
      { fixed, campaigns, tier: cache?.tier ?? null },
      { headers: { ...CORS_HEADERS, "Cache-Control": "no-store" } },
    );
  } catch (err: unknown) {
    const { sanitizeErrorMessage } = await import("@omniroute/open-sse/utils/error");
    return NextResponse.json(
      buildErrorBody(500, sanitizeErrorMessage(err) || "Failed to load Radar referrals"),
      { status: 500, headers: CORS_HEADERS },
    );
  }
}
