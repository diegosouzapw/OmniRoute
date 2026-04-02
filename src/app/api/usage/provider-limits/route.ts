import { NextResponse } from "next/server";
import {
  getCachedProviderLimitsMap,
  getLastProviderLimitsAutoSyncTime,
  getProviderLimitsSyncIntervalMinutes,
  syncAllProviderLimits,
} from "@/lib/usage/providerLimits";

/**
 * GET /api/usage/provider-limits
 * Returns cached Provider Limits data without triggering live refreshes.
 */
export async function GET() {
  try {
    return NextResponse.json({
      caches: getCachedProviderLimitsMap(),
      intervalMinutes: getProviderLimitsSyncIntervalMinutes(),
      lastAutoSyncAt: await getLastProviderLimitsAutoSyncTime(),
    });
  } catch (error) {
    console.error("[API] GET /api/usage/provider-limits error:", error);
    return NextResponse.json({ error: "Failed to fetch cached provider limits" }, { status: 500 });
  }
}

/**
 * POST /api/usage/provider-limits
 * Manually refresh all supported Provider Limits entries.
 */
export async function POST() {
  try {
    const result = await syncAllProviderLimits({ source: "manual" });
    const caches = getCachedProviderLimitsMap();
    return NextResponse.json({
      ...result,
      caches,
      intervalMinutes: getProviderLimitsSyncIntervalMinutes(),
      lastAutoSyncAt: await getLastProviderLimitsAutoSyncTime(),
    });
  } catch (error) {
    console.error("[API] POST /api/usage/provider-limits error:", error);
    return NextResponse.json({ error: "Failed to refresh provider limits" }, { status: 500 });
  }
}
