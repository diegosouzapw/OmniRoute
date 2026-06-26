/**
 * src/app/api/v1/slo/[sloId]/burn/route.ts
 *
 * Public endpoint: `GET /api/v1/slo/{sloId}/burn?window=1h`
 *
 * Returns the burn-rate time series for a single SLO over the requested
 * sliding window. Read-only, NOT gated by API-key scope.
 *
 * Path params:
 *   sloId  — stable SLO id (e.g. `SLO-001`). 404 if unknown.
 *
 * Query params:
 *   window   optional, one of `1h`, `6h`, `24h`, `7d`, `30d`. Default `1h`.
 *   samples  optional, integer 1..500 — how many data points to return.
 *            Default 60.
 *
 * Response shape (200):
 *   {
 *     slo_id, window,
 *     points: [
 *       { at_ms, burn_rate, remaining_ratio, error_count }
 *     ],
 *     summary: { peak_burn, mean_burn, current_burn },
 *     evaluated_at,
 *   }
 *
 * Response shape (400): window not in the allowed set, or sloId missing.
 * Response shape (404): unknown sloId.
 *
 * Default-off behaviour: when `SLO_TRACKER_ENABLED !== "true"` the
 * endpoint returns the requested series with all-zero values and the
 * `enabled` flag set to `false`. This keeps dashboards rendering even
 * before the operator opts in.
 */

import {
  ErrorBudget,
  type ErrorBudgetResult,
  type SlidingSegment,
  type SlidingWindow,
} from "@/lib/sre/errorBudget";
import { findSlo } from "@/lib/sre/sloDefinitions";
import { isSloTrackerEnabled } from "@/lib/observability/budgetMetrics";
import {
  createErrorResponseStatus,
  createErrorResponseFromUnknown,
} from "@/lib/api/errorResponse";

const ALLOWED_WINDOWS: ReadonlyArray<SlidingWindow> = [
  "1h",
  "6h",
  "24h",
  "7d",
  "30d",
];

const DEFAULT_WINDOW: SlidingWindow = "1h";
const DEFAULT_SAMPLES = 60;
const MAX_SAMPLES = 500;
const MIN_SAMPLES = 1;

/** Single point in the burn-rate time series. */
export interface BurnPoint {
  /** Epoch ms when this point was sampled. */
  readonly at_ms: number;
  /** Burn rate over the trailing `window` ending at `at_ms`. */
  readonly burn_rate: number;
  /** Fraction of the budget remaining at `at_ms`, in `[0, 1]`. */
  readonly remaining_ratio: number;
  /** Error count over the trailing `window`. */
  readonly error_count: number;
}

/** Aggregate stats over the returned points. */
export interface BurnSummary {
  readonly peak_burn: number;
  readonly mean_burn: number;
  readonly current_burn: number;
}

/** Response envelope. */
export interface BurnResponse {
  readonly slo_id: string;
  readonly window: SlidingWindow;
  readonly points: ReadonlyArray<BurnPoint>;
  readonly summary: BurnSummary;
  readonly enabled: boolean;
  readonly evaluated_at: number;
}

/** Path-param handler context. */
export interface BurnRouteContext {
  readonly params: Promise<{ sloId: string }>;
}

export async function GET(
  request: Request,
  context: BurnRouteContext
): Promise<Response> {
  try {
    const { sloId } = await context.params;
    if (typeof sloId !== "string" || sloId.length === 0) {
      return createErrorResponseStatus(400, "Missing sloId path parameter", {
        code: "invalid_request",
        details: { parameter: "sloId" },
      });
    }

    const url = new URL(request.url);
    const windowParam = url.searchParams.get("window") ?? DEFAULT_WINDOW;
    if (!ALLOWED_WINDOWS.includes(windowParam as SlidingWindow)) {
      return createErrorResponseStatus(400, `Invalid window: ${windowParam}`, {
        code: "invalid_window",
        details: {
          parameter: "window",
          allowed: ALLOWED_WINDOWS,
          received: windowParam,
        },
      });
    }
    const window = windowParam as SlidingWindow;

    const samplesParam = Number(url.searchParams.get("samples") ?? DEFAULT_SAMPLES);
    const samples =
      Number.isFinite(samplesParam) && samplesParam >= MIN_SAMPLES
        ? Math.min(MAX_SAMPLES, Math.floor(samplesParam))
        : DEFAULT_SAMPLES;

    const entry = findSlo(sloId);
    if (!entry) {
      return createErrorResponseStatus(404, `Unknown SLO: ${sloId}`, {
        code: "slo_not_found",
        details: { sloId },
      });
    }

    const enabled = isSloTrackerEnabled();
    const points = enabled
      ? buildPoints(entry, window, samples)
      : buildZeroedPoints(samples);

    const summary = summarise(points);

    const body: BurnResponse = {
      slo_id: entry.slo_id,
      window,
      points,
      summary,
      enabled,
      evaluated_at: Date.now(),
    };

    return Response.json(body, {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to load burn rate series");
  }
}

/** Build a synthetic time-series for the requested window. In production
 *  this would read from the telemetry pipeline (e.g. minute-resolution
 *  counters); for PR-012 we return a stable series so dashboards have
 *  something to render. */
function buildPoints(
  entry: ReturnType<typeof findSlo>,
  window: SlidingWindow,
  count: number
): BurnPoint[] {
  if (!entry) return buildZeroedPoints(count);
  const windowMs = windowMilliseconds(window);
  const stepMs = Math.max(1_000, Math.floor(windowMs / count));
  const now = Date.now();
  const points: BurnPoint[] = [];
  for (let i = 0; i < count; i += 1) {
    const atMs = now - (count - i - 1) * stepMs;
    const samples = buildSyntheticSamples(entry.target, window, atMs, stepMs);
    const budget: ErrorBudgetResult = ErrorBudget({
      slo: {
        slo_id: entry.slo_id,
        objective: entry.objective,
        target: entry.target,
        window,
      },
      totalRequests: syntheticRequestCount(samples),
      errorCount: syntheticErrorCount(samples),
      slidingSamples: samples,
      now: () => atMs,
    });
    const windowBurn = budget.burn_rates_by_window[window];
    points.push({
      at_ms: atMs,
      burn_rate: Number.isFinite(windowBurn) ? windowBurn : 0,
      remaining_ratio: budget.remaining_ratio,
      error_count: syntheticErrorCount(samples),
    });
  }
  return points;
}

/** When the tracker is disabled, return a zeroed series. */
function buildZeroedPoints(count: number): BurnPoint[] {
  const now = Date.now();
  const points: BurnPoint[] = [];
  for (let i = 0; i < count; i += 1) {
    points.push({
      at_ms: now - (count - i - 1) * 60_000,
      burn_rate: 0,
      remaining_ratio: 1,
      error_count: 0,
    });
  }
  return points;
}

function summarise(points: ReadonlyArray<BurnPoint>): BurnSummary {
  if (points.length === 0) {
    return { peak_burn: 0, mean_burn: 0, current_burn: 0 };
  }
  let peak = 0;
  let total = 0;
  for (const p of points) {
    if (p.burn_rate > peak) peak = p.burn_rate;
    total += p.burn_rate;
  }
  const mean = total / points.length;
  const current = points[points.length - 1].burn_rate;
  return { peak_burn: peak, mean_burn: mean, current_burn: current };
}

function windowMilliseconds(window: SlidingWindow): number {
  switch (window) {
    case "1h":
      return 60 * 60 * 1000;
    case "6h":
      return 6 * 60 * 60 * 1000;
    case "24h":
      return 24 * 60 * 60 * 1000;
    case "7d":
      return 7 * 24 * 60 * 60 * 1000;
    case "30d":
      return 30 * 24 * 60 * 60 * 1000;
    default: {
      const exhaustive: never = window;
      throw new Error(`Unknown sliding window: ${String(exhaustive)}`);
    }
  }
}

/** Generate a synthetic sliding-window sample set that resolves to a
 *  deterministic (low) burn rate for the given target. Real telemetry
 *  will replace this in the next sprint. */
function buildSyntheticSamples(
  target: number,
  window: SlidingWindow,
  atMs: number,
  stepMs: number
): SlidingSegment[] {
  const windowMsValue = windowMilliseconds(window);
  const errorRate = Math.max(0, (1 - target) * 0.25); // well under target
  const samples: SlidingSegment[] = [];
  let cursor = atMs - windowMsValue;
  while (cursor < atMs) {
    const end = Math.min(cursor + stepMs, atMs);
    const requestCount = 1000;
    const errorCount = Math.round(requestCount * errorRate);
    samples.push({
      start_ms: cursor,
      end_ms: end,
      request_count: requestCount,
      error_count: errorCount,
    });
    cursor = end;
  }
  return samples;
}

function syntheticRequestCount(samples: ReadonlyArray<SlidingSegment>): number {
  let total = 0;
  for (const s of samples) total += s.request_count;
  return total;
}

function syntheticErrorCount(samples: ReadonlyArray<SlidingSegment>): number {
  let total = 0;
  for (const s of samples) total += s.error_count;
  return total;
}

// Test-only export.
export const __TEST_BurnResponse = null as unknown as BurnResponse;
