import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { buildUnifiedSource, getProviderDailyUsageRows } from "@/lib/db/usageAnalytics";

/**
 * GET /api/usage/requests-by-provider-date — #4009
 *
 * Per-day, per-provider request counts (some providers bill by request, not
 * token, so operators need a plain count broken down by date). Sliced into
 * its own route (rather than folding into /api/usage/analytics) because that
 * route's file size is frozen at the quality-gate baseline.
 *
 * Query params (all optional, mirror /api/usage/analytics):
 *  - range: "1d" | "7d" | "30d" | "90d" | "ytd" | "all" (default "30d")
 *  - startDate / endDate: ISO-8601, overrides `range` when both are set
 *  - date: YYYY-MM-DD, narrows the result to a single calendar date
 */

function getRangeStartIso(range: string): string | null {
  const end = new Date();
  const start = new Date(end);

  switch (range) {
    case "1d":
      start.setDate(start.getDate() - 1);
      break;
    case "7d":
      start.setDate(start.getDate() - 7);
      break;
    case "30d":
      start.setDate(start.getDate() - 30);
      break;
    case "90d":
      start.setDate(start.getDate() - 90);
      break;
    case "180d":
      start.setDate(start.getDate() - 180);
      break;
    case "365d":
      start.setDate(start.getDate() - 365);
      break;
    case "ytd":
      start.setMonth(0, 1);
      start.setHours(0, 0, 0, 0);
      break;
    case "all":
    default:
      return null;
  }

  return start.toISOString();
}

interface DateWindow {
  sinceIso: string | null;
  untilIso: string | null;
}

/**
 * Resolves the query window from the request's params: an explicit single
 * `date` wins, then an explicit `startDate`/`endDate` pair, then falls back
 * to the named `range` preset.
 */
function resolveDateWindow(searchParams: URLSearchParams, range: string): DateWindow {
  const singleDate = searchParams.get("date") || undefined;
  if (singleDate) {
    return { sinceIso: `${singleDate}T00:00:00.000Z`, untilIso: `${singleDate}T23:59:59.999Z` };
  }
  const startDate = searchParams.get("startDate") || undefined;
  const endDate = searchParams.get("endDate") || undefined;
  return {
    sinceIso: startDate || getRangeStartIso(range),
    untilIso: endDate || null,
  };
}

async function resolveRawCutoffDate(): Promise<string> {
  const { getUserDatabaseSettings } = await import("@/lib/db/databaseSettings");
  const dbSettings = getUserDatabaseSettings();
  const rawRetentionDays = dbSettings.aggregation?.rawDataRetentionDays ?? 30;
  const rawCutoff = new Date();
  rawCutoff.setDate(rawCutoff.getDate() - rawRetentionDays);
  return rawCutoff.toISOString().split("T")[0];
}

function errorResponse(error: unknown): Promise<Response> {
  console.error("Error computing requests-by-provider-date:", error);
  const message = error instanceof Error ? error.message : String(error);
  return import("@omniroute/open-sse/utils/error").then(({ buildErrorBody }) =>
    NextResponse.json(buildErrorBody(500, message || "Failed to compute requests-by-provider-date"), {
      status: 500,
    })
  );
}

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const range = searchParams.get("range") || "30d";
    const singleDate = searchParams.get("date") || undefined;
    const { sinceIso, untilIso } = resolveDateWindow(searchParams, range);
    const rawCutoffDate = await resolveRawCutoffDate();

    const { unifiedSource, unifiedParams } = buildUnifiedSource({
      sinceIso,
      untilIso,
      rawCutoffDate,
      apiKeyWhere: "",
      apiKeyParams: {},
    });

    const rows = getProviderDailyUsageRows(unifiedSource, unifiedParams);

    return NextResponse.json({ rows, range, date: singleDate ?? null });
  } catch (error) {
    return errorResponse(error);
  }
}
