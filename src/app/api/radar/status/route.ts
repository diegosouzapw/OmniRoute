/** Read-only aggregate status of local Radar state. */

import { NextResponse } from "next/server";

import { buildErrorBody, sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

import {
  getRadarCache,
  getRadarIntelCache,
  getRadarOffersCache,
  getRadarReferralsCache,
  getRadarSettings,
} from "@/lib/db/radar";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { isFeatureFlagEnabled } from "@/shared/utils/featureFlags";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function OPTIONS() {
  return handleCorsOptions();
}

function cacheStatus(
  cache: { version?: string; generatedAt?: string | null; tier: string; fetchedAt: string } | null
) {
  if (!cache) return { available: false };
  return {
    available: true,
    version: cache.version ?? cache.generatedAt,
    // Reported on its own where the cache carries it — folding the build date
    // into `version` loses the distinction between when a feed was built and
    // when this install downloaded it. Absent for the offers and intel caches,
    // which store no build date: a null there would claim the date is unknown
    // when in fact it was never kept.
    ...("generatedAt" in cache ? { generatedAt: cache.generatedAt ?? null } : {}),
    tier: cache.tier,
    fetchedAt: cache.fetchedAt,
  };
}

export async function GET(request: Request) {
  if (!isFeatureFlagEnabled("RADAR_ENABLED")) {
    return NextResponse.json(buildErrorBody(404, "Not found"), {
      status: 404,
      headers: CORS_HEADERS,
    });
  }
  if (!(await isAuthenticated(request))) {
    return NextResponse.json(buildErrorBody(401, "Unauthorized"), {
      status: 401,
      headers: CORS_HEADERS,
    });
  }
  try {
    const settings = getRadarSettings();
    return NextResponse.json(
      {
        settings: { optIn: settings.optIn, hasSupporterKey: settings.supporterKey !== null },
        feeds: {
          catalog: cacheStatus(getRadarCache()),
          referrals: cacheStatus(getRadarReferralsCache()),
          offers: cacheStatus(getRadarOffersCache()),
          intel: cacheStatus(getRadarIntelCache()),
        },
      },
      { headers: { ...CORS_HEADERS, "Cache-Control": "no-store" } }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      buildErrorBody(500, sanitizeErrorMessage(error) || "Failed to load Radar status"),
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
