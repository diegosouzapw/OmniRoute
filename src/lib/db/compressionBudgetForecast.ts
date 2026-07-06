import type { BudgetHistoryPoint } from "@omniroute/open-sse/services/compression/budgetForecast";
import { getDbInstance } from "@/lib/db/core";

/** Hard cap on rows pulled out of compression_analytics per request. */
const MAX_HISTORY_ROWS = 5_000;

/** Row shape from compression_analytics that the budget forecaster needs. */
interface AnalyticsRow {
  timestamp: string | null;
  original_tokens: number | null;
  compressed_tokens: number | null;
  tokens_saved: number | null;
  provider: string | null;
}

export function readCompressionHistory(
  windowMs: number,
  provider: string | null
): BudgetHistoryPoint[] {
  const db = getDbInstance();
  // Most-recent first; the forecaster sorts ascending internally so duplicate
  // timestamps in the same second collapse cleanly without surprising callers.
  const cutoff = new Date(Date.now() - Math.max(1, windowMs)).toISOString();

  let rows: AnalyticsRow[];
  if (provider) {
    rows = db
      .prepare(
        `SELECT timestamp, original_tokens, compressed_tokens, tokens_saved, provider
           FROM compression_analytics
          WHERE timestamp >= ? AND provider = ?
          ORDER BY timestamp DESC, id DESC
          LIMIT ?`
      )
      .all(cutoff, provider, MAX_HISTORY_ROWS) as AnalyticsRow[];
  } else {
    rows = db
      .prepare(
        `SELECT timestamp, original_tokens, compressed_tokens, tokens_saved, provider
           FROM compression_analytics
          WHERE timestamp >= ?
          ORDER BY timestamp DESC, id DESC
          LIMIT ?`
      )
      .all(cutoff, MAX_HISTORY_ROWS) as AnalyticsRow[];
  }

  const out: BudgetHistoryPoint[] = [];
  for (const row of rows) {
    const tsMs = row.timestamp ? Date.parse(row.timestamp) : NaN;
    if (!Number.isFinite(tsMs)) continue;
    const originalTokens =
      typeof row.original_tokens === "number" && Number.isFinite(row.original_tokens)
        ? row.original_tokens
        : 0;
    const tokensSaved =
      typeof row.tokens_saved === "number" && Number.isFinite(row.tokens_saved)
        ? row.tokens_saved
        : 0;
    if (originalTokens <= 0 && tokensSaved <= 0) continue;
    out.push({ tsMs, tokens: originalTokens, savedTokens: tokensSaved });
  }
  return out;
}
