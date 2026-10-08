/**
 * Readers for the /api/usage/analytics response.
 *
 * The route returns totals under `summary` and per-model rows under `byModel`.
 * It has no top-level `totalCost`, `requestCount`, `successRate` or
 * `avgLatencyMs`, and it only honours a `range` query param (1d/7d/30d/...),
 * never `period`. The MCP handlers used to read the missing top-level fields
 * and pass `period=session`, so every cost, request count and provider metric
 * they reported was zero. These readers are the single place that knows the
 * real shape.
 */

type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function asArray(value: unknown): JsonRecord[] {
  return Array.isArray(value)
    ? value.filter((item): item is JsonRecord => asRecord(item) === item)
    : [];
}

function asNumber(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

const PERIOD_TO_RANGE: Record<string, string> = {
  session: "1d",
  day: "1d",
  week: "7d",
  month: "30d",
};

export function analyticsRangeForPeriod(period: string | undefined): string {
  return (period && PERIOD_TO_RANGE[period]) || "30d";
}

export interface AnalyticsTotals {
  totalCost: number;
  requestCount: number;
  promptTokens: number;
  completionTokens: number;
}

export function readAnalyticsTotals(raw: unknown): AnalyticsTotals {
  const summary = asRecord(asRecord(raw).summary);
  return {
    totalCost: asNumber(summary.totalCost),
    requestCount: asNumber(summary.totalRequests),
    promptTokens: asNumber(summary.promptTokens),
    completionTokens: asNumber(summary.completionTokens),
  };
}

export interface ProviderMetrics {
  requestCount: number;
  avgLatencyMs: number;
  successRate: number;
}

// byModel rows carry per-model request counts, latency and a success percentage.
// A provider's numbers are the request-weighted aggregate of its rows.
export function readProviderMetrics(raw: unknown, provider: string): ProviderMetrics {
  const rows = asArray(asRecord(raw).byModel).filter((row) => row.provider === provider);
  const requestCount = rows.reduce((sum, row) => sum + asNumber(row.requests), 0);
  if (requestCount === 0) return { requestCount: 0, avgLatencyMs: 0, successRate: 0 };

  const latencyWeighted = rows.reduce(
    (sum, row) => sum + asNumber(row.avgLatencyMs) * asNumber(row.requests),
    0
  );
  const successful = rows.reduce((sum, row) => {
    const pct = typeof row.successRatePct === "string" ? Number(row.successRatePct) : 0;
    return sum + (Number.isFinite(pct) ? pct : 0) * asNumber(row.requests);
  }, 0);

  return {
    requestCount,
    avgLatencyMs: Math.round(latencyWeighted / requestCount),
    successRate: Math.round((successful / requestCount / 100) * 10000) / 10000,
  };
}
