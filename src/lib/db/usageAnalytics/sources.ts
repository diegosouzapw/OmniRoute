/**
 * db/usageAnalytics/sources.ts — Pure SQL source-string builders for usage analytics.
 *
 * Builds the UNION subqueries that merge recent `usage_history` rows with older
 * `daily_usage_summary` aggregates. These functions are pure (no DB calls, no imports)
 * and are consumed by the query functions in the parent `usageAnalytics.ts` module.
 */

export type AnalyticsParams = Record<string, string>;

// ---------------------------------------------------------------------------
// Unified source CTE builder
// ---------------------------------------------------------------------------

export interface BuildUnifiedSourceOptions {
  /** ISO-8601 timestamp lower bound (e.g. "2024-01-01T00:00:00.000Z"). Null = all time. */
  sinceIso: string | null;
  /** ISO-8601 timestamp upper bound. Null = no upper bound. */
  untilIso: string | null;
  /** YYYY-MM-DD date string: rows older than this have been rolled up to daily_usage_summary. */
  rawCutoffDate: string;
  /**
   * SQL condition fragment for API-key filtering, e.g.
   * "(api_key_name IN (@apiKey0) OR api_key_id IN (@apiKey0))".
   * Empty string = no API-key filter.
   */
  apiKeyWhere: string;
  /** Named-param entries for the apiKey placeholders (apiKey0, apiKey1, …). */
  apiKeyParams: AnalyticsParams;
}

export interface UnifiedSourceResult {
  /** Pre-built subquery SQL string (parenthesised, suitable for `FROM <unifiedSource> AS _u`). */
  unifiedSource: string;
  /** Named params that must be passed to every query that uses `unifiedSource`. */
  unifiedParams: AnalyticsParams;
}

/**
 * Builds the UNION subquery that merges recent `usage_history` rows with
 * older `daily_usage_summary` aggregates, preventing double-counting and
 * preventing api_key leakage from summary rows.
 *
 * The returned `unifiedSource` is a parenthesised subquery suitable for use
 * as `FROM ${unifiedSource} AS _u`.  All WHERE filters are embedded inside
 * the subquery — no additional outer WHERE is needed.
 */
export function buildUnifiedSource(opts: BuildUnifiedSourceOptions): UnifiedSourceResult {
  const { sinceIso, untilIso, rawCutoffDate, apiKeyWhere, apiKeyParams } = opts;
  const sinceDate = sinceIso?.split("T")[0] ?? null;

  // Include summaries only when the window starts before rawCutoffDate and no api_key filter is active.
  const needsAggregated = (!sinceDate || sinceDate < rawCutoffDate) && !apiKeyWhere;

  const unifiedParams: AnalyticsParams = {};

  // Floor raw rows at rawCutoffDate when summary rows are included to avoid double-counting.
  const rawConditions: string[] = [];
  if (needsAggregated) {
    rawConditions.push("timestamp >= @rawCutoff");
    unifiedParams.rawCutoff = rawCutoffDate;
  } else if (sinceIso) {
    rawConditions.push("timestamp >= @since");
    unifiedParams.since = sinceIso;
  }
  if (untilIso) {
    rawConditions.push("timestamp <= @until");
    unifiedParams.until = untilIso;
  }
  if (apiKeyWhere) {
    rawConditions.push(apiKeyWhere);
    Object.assign(unifiedParams, apiKeyParams);
  }
  const rawWhere = rawConditions.length > 0 ? `WHERE ${rawConditions.join(" AND ")}` : "";

  // Aggregated leg: bounded strictly before rawCutoffDate so it never overlaps raw.
  const aggConditions: string[] = [];
  if (needsAggregated) {
    if (sinceIso) {
      aggConditions.push("date >= @sinceDate");
      unifiedParams.sinceDate = sinceDate!;
    }
    if (untilIso) {
      aggConditions.push("date <= @untilDate");
      unifiedParams.untilDate = untilIso.split("T")[0];
    }
    aggConditions.push("date < @rawCutoffDate");
    unifiedParams.rawCutoffDate = rawCutoffDate;
  }
  const aggWhere = aggConditions.length > 0 ? `WHERE ${aggConditions.join(" AND ")}` : "";

  const unifiedSource = needsAggregated
    ? `(
        SELECT
          timestamp,
          provider,
          model,
          tokens_input,
          tokens_output,
          tokens_cache_read,
          tokens_cache_creation,
          tokens_reasoning,
          service_tier,
          success,
          latency_ms,
          connection_id,
          api_key_id,
          api_key_name
        FROM usage_history
        ${rawWhere}
        UNION ALL
        SELECT
          date || 'T12:00:00.000Z' as timestamp,
          provider,
          model,
          total_input_tokens as tokens_input,
          total_output_tokens as tokens_output,
          0 as tokens_cache_read,
          0 as tokens_cache_creation,
          0 as tokens_reasoning,
          'standard' as service_tier,
          1 as success,
          0 as latency_ms,
          NULL as connection_id,
          NULL as api_key_id,
          NULL as api_key_name
        FROM daily_usage_summary
        ${aggWhere}
       )`
    : `(SELECT
          timestamp, provider, model,
          tokens_input, tokens_output,
          tokens_cache_read, tokens_cache_creation, tokens_reasoning,
          service_tier, success, latency_ms,
          connection_id, api_key_id, api_key_name
        FROM usage_history
        ${rawWhere}
       )`;

  return { unifiedSource, unifiedParams };
}

/**
 * Builds the UNION subquery for preset cost calculations (narrower column set
 * than the main analytics query — no connection_id / api_key columns needed).
 */
export function buildPresetUnifiedSource(opts: BuildUnifiedSourceOptions): UnifiedSourceResult {
  const { sinceIso, untilIso, rawCutoffDate, apiKeyWhere, apiKeyParams } = opts;
  const sinceDate = sinceIso?.split("T")[0] ?? null;

  const needsAggregated = (!sinceDate || sinceDate < rawCutoffDate) && !apiKeyWhere;

  const presetParams: AnalyticsParams = {};

  const rawConditions: string[] = [];
  if (needsAggregated) {
    rawConditions.push("timestamp >= @presetRawCutoff");
    presetParams.presetRawCutoff = rawCutoffDate;
  } else if (sinceIso) {
    rawConditions.push("timestamp >= @presetSince");
    presetParams.presetSince = sinceIso;
  }
  if (apiKeyWhere) {
    rawConditions.push(apiKeyWhere);
    Object.assign(presetParams, apiKeyParams);
  }
  const presetRawWhere = rawConditions.length > 0 ? `WHERE ${rawConditions.join(" AND ")}` : "";

  const aggConditions: string[] = [];
  if (needsAggregated) {
    if (sinceIso) {
      aggConditions.push("date >= @presetSinceDate");
      presetParams.presetSinceDate = sinceDate!;
    }
    aggConditions.push("date < @presetRawCutoffDate");
    presetParams.presetRawCutoffDate = rawCutoffDate;
  }
  const presetAggWhere = aggConditions.length > 0 ? `WHERE ${aggConditions.join(" AND ")}` : "";

  const unifiedSource = needsAggregated
    ? `(
        SELECT timestamp, provider, model, service_tier,
          tokens_input, tokens_output,
          tokens_cache_read, tokens_cache_creation, tokens_reasoning
        FROM usage_history
        ${presetRawWhere}
        UNION ALL
        SELECT
          date || 'T12:00:00.000Z' as timestamp,
          provider, model,
          'standard' as service_tier,
          total_input_tokens as tokens_input,
          total_output_tokens as tokens_output,
          0 as tokens_cache_read,
          0 as tokens_cache_creation,
          0 as tokens_reasoning
        FROM daily_usage_summary
        ${presetAggWhere}
      )`
    : `(SELECT timestamp, provider, model, service_tier,
          tokens_input, tokens_output,
          tokens_cache_read, tokens_cache_creation, tokens_reasoning
        FROM usage_history
        ${presetRawWhere}
      )`;

  return { unifiedSource, unifiedParams: presetParams };
}
