/**
 * PR-026 — Compression Budget Forecast API
 *
 * GET /api/compression/budget/forecast
 *
 * Thin HTTP wrapper around `projectBudgetSavings()` (PR-025, see
 * `open-sse/services/compression/budgetForecast.ts`). Reads the most-recent
 * compression_analytics rows, projects the savings forward by `horizonMs`, and
 * returns the percentile / mean estimator used by the cost guard, the
 * dashboard forecast widget, and the scheduler.
 *
 * Query parameters:
 *   - horizonMs (number, default 1 hour): forward window to project savings over.
 *   - windowMs   (number, default 1 hour): how far back to look at history.
 *   - provider   (string, optional): filter history to a single provider.
 *
 * Status codes:
 *   - 200: success (or empty history → zeros). Always 200 when the DB read
 *     works AND any well-formed history is present OR no history is present.
 *   - 503: the analytics query itself failed (driver unavailable, etc.).
 *
 * Caching: `Cache-Control: no-store` — the forecast depends on running
 *  telemetry that may change on every proxied request.
 */

import { NextResponse } from "next/server";
import {
  projectBudgetSavings,
  type BudgetHistoryPoint,
  type BudgetForecast,
} from "@omniroute/open-sse/services/compression/budgetForecast";
import { readCompressionBudgetHistory } from "@/lib/db/compressionBudgetForecast";

/** Default projection horizon: 1 hour. */
const DEFAULT_HORIZON_MS = 60 * 60 * 1000;
/** Default look-back window: 1 hour. */
const DEFAULT_WINDOW_MS = 60 * 60 * 1000;
interface ForecastResponseBody {
  success: boolean;
  windowMs: number;
  horizonMs: number;
  p50SavedTokens: number;
  p90SavedTokens: number;
  meanSavedPerHour: number;
  sampled: number;
}

function parsePositiveMs(raw: string | null, fallback: number): number {
  if (raw === null || raw === "") return fallback;
  const n = Number(raw);
  if (!Number.isFinite(n) || n <= 0) return fallback;
  return Math.floor(n);
}

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const horizonMs = parsePositiveMs(url.searchParams.get("horizonMs"), DEFAULT_HORIZON_MS);
  const windowMs = parsePositiveMs(url.searchParams.get("windowMs"), DEFAULT_WINDOW_MS);
  const providerRaw = url.searchParams.get("provider");
  const provider = providerRaw && providerRaw.trim().length > 0 ? providerRaw.trim() : null;

  let history: BudgetHistoryPoint[];
  try {
    history = readCompressionBudgetHistory(windowMs, provider);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[api/compression/budget/forecast] DB read failed:", msg);
    return NextResponse.json(
      {
        success: false,
        error: "compression_history_unavailable",
        details: msg,
        windowMs,
        horizonMs,
        p50SavedTokens: 0,
        p90SavedTokens: 0,
        meanSavedPerHour: 0,
        sampled: 0,
      },
      { status: 503 }
    );
  }

  const forecast: BudgetForecast = projectBudgetSavings(history, horizonMs);
  const body: ForecastResponseBody = {
    success: true,
    windowMs,
    horizonMs,
    p50SavedTokens: forecast.p50SavedTokens,
    p90SavedTokens: forecast.p90SavedTokens,
    meanSavedPerHour: forecast.meanSavedPerHour,
    sampled: history.length,
  };

  return NextResponse.json(body, {
    status: 200,
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  });
}
