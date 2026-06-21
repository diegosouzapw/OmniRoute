/**
 * db/usageAnalytics.ts — Read-only aggregation queries over `usage_history`
 * and `daily_usage_summary` extracted from route handlers.
 *
 * Hard Rule #5: routes must not embed raw SQL — these queries live here so the
 * /api/usage/analytics and /api/settings/export-json routes can delegate.
 * Read-only aggregation; no writes.
 *
 * Sliced out of #3500 (usage_history / daily_usage_summary cluster).
 */

import { getDbInstance } from "./core";

// ---------------------------------------------------------------------------
// Shared parameter types
// ---------------------------------------------------------------------------

/**
 * Named-param bag used by analytics queries.
 * Values are always strings because better-sqlite3 named params are strings.
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

// ---------------------------------------------------------------------------
// Analytics summary — /api/usage/analytics
// ---------------------------------------------------------------------------

export interface UsageSummaryRow {
  totalRequests: number;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  uniqueModels: number;
  uniqueAccounts: number;
  uniqueApiKeys: number;
  successfulRequests: number;
  avgLatencyMs: number;
  firstRequest: string;
  lastRequest: string;
}

/**
 * Scalar summary over the unified source CTE.
 *
 * @param unifiedSource - Pre-built subquery string (UNION of raw + aggregated rows).
 * @param params        - Named params referenced inside `unifiedSource`.
 */
export function getUsageSummary(unifiedSource: string, params: AnalyticsParams): UsageSummaryRow {
  const db = getDbInstance();
  const row = db
    .prepare(
      `
      SELECT
        COUNT(*) as totalRequests,
        COALESCE(SUM(tokens_input), 0) as promptTokens,
        COALESCE(SUM(tokens_output), 0) as completionTokens,
        COALESCE(SUM(tokens_input + tokens_output), 0) as totalTokens,
        COUNT(DISTINCT model) as uniqueModels,
        COUNT(DISTINCT connection_id) as uniqueAccounts,
        COUNT(DISTINCT COALESCE(NULLIF(api_key_id, ''), NULLIF(api_key_name, ''))) as uniqueApiKeys,
        COALESCE(SUM(CASE WHEN success = 1 THEN 1 ELSE 0 END), 0) as successfulRequests,
        COALESCE(AVG(latency_ms), 0) as avgLatencyMs,
        COALESCE(MIN(timestamp), '') as firstRequest,
        COALESCE(MAX(timestamp), '') as lastRequest
      FROM ${unifiedSource} AS _u
    `
    )
    .get(params) as UsageSummaryRow | undefined;
  return (
    row ?? {
      totalRequests: 0,
      promptTokens: 0,
      completionTokens: 0,
      totalTokens: 0,
      uniqueModels: 0,
      uniqueAccounts: 0,
      uniqueApiKeys: 0,
      successfulRequests: 0,
      avgLatencyMs: 0,
      firstRequest: "",
      lastRequest: "",
    }
  );
}

// ---------------------------------------------------------------------------

export interface DailyUsageRow {
  date: string;
  requests: number;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

/**
 * Daily request + token counts aggregated from the unified source CTE.
 */
export function getDailyUsage(unifiedSource: string, params: AnalyticsParams): DailyUsageRow[] {
  const db = getDbInstance();
  return db
    .prepare(
      `
      SELECT
        DATE(timestamp) as date,
        COUNT(*) as requests,
        COALESCE(SUM(tokens_input), 0) as promptTokens,
        COALESCE(SUM(tokens_output), 0) as completionTokens,
        COALESCE(SUM(tokens_input + tokens_output), 0) as totalTokens
      FROM ${unifiedSource} AS _u
      GROUP BY DATE(timestamp)
      ORDER BY date ASC
    `
    )
    .all(params) as DailyUsageRow[];
}

// ---------------------------------------------------------------------------

export interface DailyCostRow {
  date: string;
  provider: string;
  model: string;
  serviceTier: string;
  promptTokens: number;
  completionTokens: number;
  cacheReadTokens: number;
  cacheCreationTokens: number;
  reasoningTokens: number;
}

/**
 * Per-day, per-provider, per-model token breakdown for cost calculation.
 */
export function getDailyCostRows(unifiedSource: string, params: AnalyticsParams): DailyCostRow[] {
  const db = getDbInstance();
  return db
    .prepare(
      `
      SELECT
        DATE(timestamp) as date,
        LOWER(provider) as provider,
        LOWER(model) as model,
        COALESCE(NULLIF(service_tier, ''), 'standard') as serviceTier,
        COALESCE(SUM(tokens_input), 0) as promptTokens,
        COALESCE(SUM(tokens_output), 0) as completionTokens,
        COALESCE(SUM(tokens_cache_read), 0) as cacheReadTokens,
        COALESCE(SUM(tokens_cache_creation), 0) as cacheCreationTokens,
        COALESCE(SUM(tokens_reasoning), 0) as reasoningTokens
      FROM ${unifiedSource} AS _u
      GROUP BY DATE(timestamp), LOWER(provider), LOWER(model), serviceTier
      ORDER BY date ASC
    `
    )
    .all(params) as DailyCostRow[];
}

// ---------------------------------------------------------------------------

export interface HeatmapRow {
  date: string;
  totalTokens: number;
}

/**
 * Per-day token totals for the activity heatmap.
 * Uses `usage_history` directly (not the unified CTE) since the heatmap has its
 * own independent time window and api_key filter.
 *
 * @param heatmapConditions - Array of SQL condition strings (combined with AND).
 * @param params            - Named params referenced inside the conditions.
 */
export function getHeatmapRows(heatmapConditions: string[], params: AnalyticsParams): HeatmapRow[] {
  const db = getDbInstance();
  return db
    .prepare(
      `
      SELECT
        DATE(timestamp) as date,
        COALESCE(SUM(tokens_input + tokens_output), 0) as totalTokens
      FROM usage_history
      WHERE ${heatmapConditions.join(" AND ")}
      GROUP BY DATE(timestamp)
      ORDER BY date ASC
    `
    )
    .all(params) as HeatmapRow[];
}

// ---------------------------------------------------------------------------

export interface ModelUsageRow {
  model: string;
  provider: string;
  serviceTier: string;
  requests: number;
  promptTokens: number;
  completionTokens: number;
  cacheReadTokens: number;
  cacheCreationTokens: number;
  reasoningTokens: number;
  totalTokens: number;
  avgLatencyMs: number;
  successfulRequests: number;
  lastUsed: string;
}

/**
 * Per-model usage aggregates from the unified source CTE.
 */
export function getModelUsageRows(unifiedSource: string, params: AnalyticsParams): ModelUsageRow[] {
  const db = getDbInstance();
  return db
    .prepare(
      `
      SELECT
        LOWER(model) as model,
        LOWER(provider) as provider,
        COALESCE(NULLIF(service_tier, ''), 'standard') as serviceTier,
        COUNT(*) as requests,
        COALESCE(SUM(tokens_input), 0) as promptTokens,
        COALESCE(SUM(tokens_output), 0) as completionTokens,
        COALESCE(SUM(tokens_cache_read), 0) as cacheReadTokens,
        COALESCE(SUM(tokens_cache_creation), 0) as cacheCreationTokens,
        COALESCE(SUM(tokens_reasoning), 0) as reasoningTokens,
        COALESCE(SUM(tokens_input + tokens_output), 0) as totalTokens,
        COALESCE(AVG(latency_ms), 0) as avgLatencyMs,
        COALESCE(SUM(CASE WHEN success = 1 THEN 1 ELSE 0 END), 0) as successfulRequests,
        COALESCE(MAX(timestamp), '') as lastUsed
      FROM ${unifiedSource} AS _u
      GROUP BY LOWER(model), LOWER(provider), serviceTier
      ORDER BY requests DESC
    `
    )
    .all(params) as ModelUsageRow[];
}

// ---------------------------------------------------------------------------

export interface ProviderCostRow {
  provider: string;
  model: string;
  serviceTier: string;
  promptTokens: number;
  completionTokens: number;
  cacheReadTokens: number;
  cacheCreationTokens: number;
  reasoningTokens: number;
}

/**
 * Per-provider, per-model token breakdown for provider cost calculation.
 */
export function getProviderCostRows(
  unifiedSource: string,
  params: AnalyticsParams
): ProviderCostRow[] {
  const db = getDbInstance();
  return db
    .prepare(
      `
      SELECT
        LOWER(provider) as provider,
        LOWER(model) as model,
        COALESCE(NULLIF(service_tier, ''), 'standard') as serviceTier,
        COALESCE(SUM(tokens_input), 0) as promptTokens,
        COALESCE(SUM(tokens_output), 0) as completionTokens,
        COALESCE(SUM(tokens_cache_read), 0) as cacheReadTokens,
        COALESCE(SUM(tokens_cache_creation), 0) as cacheCreationTokens,
        COALESCE(SUM(tokens_reasoning), 0) as reasoningTokens
      FROM ${unifiedSource} AS _u
      GROUP BY LOWER(provider), LOWER(model), serviceTier
    `
    )
    .all(params) as ProviderCostRow[];
}

// ---------------------------------------------------------------------------

export interface ProviderUsageRow {
  provider: string;
  requests: number;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  avgLatencyMs: number;
  successfulRequests: number;
}

/**
 * Per-provider usage aggregates from the unified source CTE.
 */
export function getProviderUsageRows(
  unifiedSource: string,
  params: AnalyticsParams
): ProviderUsageRow[] {
  const db = getDbInstance();
  return db
    .prepare(
      `
      SELECT
        LOWER(provider) as provider,
        COUNT(*) as requests,
        COALESCE(SUM(tokens_input), 0) as promptTokens,
        COALESCE(SUM(tokens_output), 0) as completionTokens,
        COALESCE(SUM(tokens_input + tokens_output), 0) as totalTokens,
        COALESCE(AVG(latency_ms), 0) as avgLatencyMs,
        COALESCE(SUM(CASE WHEN success = 1 THEN 1 ELSE 0 END), 0) as successfulRequests
      FROM ${unifiedSource} AS _u
      GROUP BY LOWER(provider)
      ORDER BY requests DESC
    `
    )
    .all(params) as ProviderUsageRow[];
}

// ---------------------------------------------------------------------------

export interface AccountCostRow {
  account: string;
  provider: string;
  model: string;
  serviceTier: string;
  promptTokens: number;
  completionTokens: number;
  cacheReadTokens: number;
  cacheCreationTokens: number;
  reasoningTokens: number;
}

/**
 * Per-account cost breakdown joined with provider_connections for display names.
 * Uses `usage_history` directly (JOIN requires real table, not a subquery alias).
 *
 * @param whereClause - SQL WHERE clause (may be empty string); column refs already
 *                      prefixed with `usage_history.` by the caller.
 * @param params      - Named params referenced inside `whereClause`.
 */
export function getAccountCostRows(whereClause: string, params: AnalyticsParams): AccountCostRow[] {
  const db = getDbInstance();
  return db
    .prepare(
      `
      SELECT
        COALESCE(NULLIF(c.display_name, ''), NULLIF(c.email, ''), NULLIF(c.name, ''), usage_history.connection_id, 'unknown') as account,
        LOWER(usage_history.provider) as provider,
        LOWER(usage_history.model) as model,
        COALESCE(NULLIF(usage_history.service_tier, ''), 'standard') as serviceTier,
        COALESCE(SUM(usage_history.tokens_input), 0) as promptTokens,
        COALESCE(SUM(usage_history.tokens_output), 0) as completionTokens,
        COALESCE(SUM(usage_history.tokens_cache_read), 0) as cacheReadTokens,
        COALESCE(SUM(usage_history.tokens_cache_creation), 0) as cacheCreationTokens,
        COALESCE(SUM(usage_history.tokens_reasoning), 0) as reasoningTokens
      FROM usage_history
      LEFT JOIN provider_connections c ON c.id = usage_history.connection_id
      ${whereClause}
      GROUP BY account, LOWER(usage_history.provider), LOWER(usage_history.model), serviceTier
    `
    )
    .all(params) as AccountCostRow[];
}

// ---------------------------------------------------------------------------

export interface AccountUsageRow {
  account: string;
  requests: number;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  avgLatencyMs: number;
  lastUsed: string;
}

/**
 * Per-account usage aggregates joined with provider_connections for display names.
 *
 * @param whereClause - SQL WHERE clause (may be empty string); column refs already
 *                      prefixed with `usage_history.` by the caller.
 * @param params      - Named params referenced inside `whereClause`.
 */
export function getAccountUsageRows(
  whereClause: string,
  params: AnalyticsParams
): AccountUsageRow[] {
  const db = getDbInstance();
  return db
    .prepare(
      `
      SELECT
        COALESCE(NULLIF(c.display_name, ''), NULLIF(c.email, ''), NULLIF(c.name, ''), usage_history.connection_id, 'unknown') as account,
        COUNT(usage_history.id) as requests,
        COALESCE(SUM(usage_history.tokens_input), 0) as promptTokens,
        COALESCE(SUM(usage_history.tokens_output), 0) as completionTokens,
        COALESCE(SUM(usage_history.tokens_input + usage_history.tokens_output), 0) as totalTokens,
        COALESCE(AVG(usage_history.latency_ms), 0) as avgLatencyMs,
        COALESCE(MAX(usage_history.timestamp), '') as lastUsed
      FROM usage_history
      LEFT JOIN provider_connections c ON c.id = usage_history.connection_id
      ${whereClause}
      GROUP BY account
      ORDER BY requests DESC
      LIMIT 50
    `
    )
    .all(params) as AccountUsageRow[];
}

// ---------------------------------------------------------------------------

export interface ApiKeyUsageRow {
  apiKeyId: string | null;
  apiKeyGroupKey: string;
  provider: string;
  model: string;
  serviceTier: string;
  requests: number;
  promptTokens: number;
  completionTokens: number;
  cacheReadTokens: number;
  cacheCreationTokens: number;
  reasoningTokens: number;
  totalTokens: number;
}

/**
 * Per-API-key usage aggregates from usage_history.
 *
 * @param apiKeyWhereClause - Full WHERE clause including api_key presence guard.
 * @param params            - Named params referenced inside `apiKeyWhereClause`.
 */
export function getApiKeyUsageRows(
  apiKeyWhereClause: string,
  params: AnalyticsParams
): ApiKeyUsageRow[] {
  const db = getDbInstance();
  return db
    .prepare(
      `
      SELECT
        NULLIF(api_key_id, '') as apiKeyId,
        COALESCE(NULLIF(api_key_id, ''), NULLIF(api_key_name, ''), 'unknown') as apiKeyGroupKey,
        LOWER(provider) as provider,
        LOWER(model) as model,
        COALESCE(NULLIF(service_tier, ''), 'standard') as serviceTier,
        COUNT(*) as requests,
        COALESCE(SUM(tokens_input), 0) as promptTokens,
        COALESCE(SUM(tokens_output), 0) as completionTokens,
        COALESCE(SUM(tokens_cache_read), 0) as cacheReadTokens,
        COALESCE(SUM(tokens_cache_creation), 0) as cacheCreationTokens,
        COALESCE(SUM(tokens_reasoning), 0) as reasoningTokens,
        COALESCE(SUM(tokens_input + tokens_output), 0) as totalTokens
      FROM usage_history
      ${apiKeyWhereClause}
      GROUP BY COALESCE(NULLIF(api_key_id, ''), NULLIF(api_key_name, ''), 'unknown'), NULLIF(api_key_id, ''), LOWER(provider), LOWER(model), serviceTier
    `
    )
    .all(params) as ApiKeyUsageRow[];
}

// ---------------------------------------------------------------------------

export interface ServiceTierUsageRow {
  serviceTier: string;
  provider: string;
  model: string;
  requests: number;
  promptTokens: number;
  completionTokens: number;
  cacheReadTokens: number;
  cacheCreationTokens: number;
  reasoningTokens: number;
  totalTokens: number;
}

/**
 * Per-service-tier, per-provider, per-model usage aggregates.
 */
export function getServiceTierUsageRows(
  unifiedSource: string,
  params: AnalyticsParams
): ServiceTierUsageRow[] {
  const db = getDbInstance();
  return db
    .prepare(
      `
      SELECT
        COALESCE(NULLIF(service_tier, ''), 'standard') as serviceTier,
        LOWER(provider) as provider,
        LOWER(model) as model,
        COALESCE(NULLIF(service_tier, ''), 'standard') as serviceTier,
        COUNT(*) as requests,
        COALESCE(SUM(tokens_input), 0) as promptTokens,
        COALESCE(SUM(tokens_output), 0) as completionTokens,
        COALESCE(SUM(tokens_cache_read), 0) as cacheReadTokens,
        COALESCE(SUM(tokens_cache_creation), 0) as cacheCreationTokens,
        COALESCE(SUM(tokens_reasoning), 0) as reasoningTokens,
        COALESCE(SUM(tokens_input + tokens_output), 0) as totalTokens
      FROM ${unifiedSource} AS _u
      GROUP BY serviceTier, LOWER(provider), LOWER(model)
    `
    )
    .all(params) as ServiceTierUsageRow[];
}

// ---------------------------------------------------------------------------

export interface ApiKeyMetadataRow {
  apiKeyId: string | null;
  apiKeyName: string | null;
  apiKeyGroupKey: string;
  lastUsed: string;
}

/**
 * Latest API key name + group key from usage_history for display metadata.
 *
 * @param apiKeyWhereClause - Full WHERE clause including api_key presence guard.
 * @param params            - Named params referenced inside `apiKeyWhereClause`.
 */
export function getApiKeyMetadataRows(
  apiKeyWhereClause: string,
  params: AnalyticsParams
): ApiKeyMetadataRow[] {
  const db = getDbInstance();
  return db
    .prepare(
      `
      SELECT
        NULLIF(api_key_id, '') as apiKeyId,
        NULLIF(api_key_name, '') as apiKeyName,
        COALESCE(NULLIF(api_key_id, ''), NULLIF(api_key_name, ''), 'unknown') as apiKeyGroupKey,
        MAX(timestamp) as lastUsed
      FROM usage_history
      ${apiKeyWhereClause}
      GROUP BY NULLIF(api_key_id, ''), NULLIF(api_key_name, '')
      ORDER BY lastUsed DESC
    `
    )
    .all(params) as ApiKeyMetadataRow[];
}

// ---------------------------------------------------------------------------

export interface WeeklyPatternRow {
  dayOfWeek: string;
  days: number;
  requests: number;
  totalTokens: number;
}

/**
 * Day-of-week aggregates for the weekly activity pattern chart.
 */
export function getWeeklyPatternRows(
  unifiedSource: string,
  params: AnalyticsParams
): WeeklyPatternRow[] {
  const db = getDbInstance();
  return db
    .prepare(
      `
      SELECT
        dayOfWeek,
        COUNT(*) as days,
        COALESCE(SUM(requests), 0) as requests,
        COALESCE(SUM(totalTokens), 0) as totalTokens
      FROM (
        SELECT
          DATE(timestamp) as date,
          strftime('%w', timestamp) as dayOfWeek,
          COUNT(*) as requests,
          COALESCE(SUM(tokens_input + tokens_output), 0) as totalTokens
        FROM ${unifiedSource} AS _u
        GROUP BY DATE(timestamp), strftime('%w', timestamp)
      )
      GROUP BY dayOfWeek
      ORDER BY dayOfWeek ASC
    `
    )
    .all(params) as WeeklyPatternRow[];
}

// ---------------------------------------------------------------------------

export interface PresetCostModelRow {
  model: string;
  provider: string;
  serviceTier: string;
  promptTokens: number;
  completionTokens: number;
  cacheReadTokens: number;
  cacheCreationTokens: number;
  reasoningTokens: number;
}

/**
 * Per-model token breakdown for preset range cost calculation.
 * Uses a preset-specific unified source (may differ from the main query window).
 */
export function getPresetCostModelRows(
  presetUnifiedSource: string,
  params: AnalyticsParams
): PresetCostModelRow[] {
  const db = getDbInstance();
  return db
    .prepare(
      `
      SELECT
        LOWER(model) as model,
        LOWER(provider) as provider,
        COALESCE(NULLIF(service_tier, ''), 'standard') as serviceTier,
        COALESCE(SUM(tokens_input), 0) as promptTokens,
        COALESCE(SUM(tokens_output), 0) as completionTokens,
        COALESCE(SUM(tokens_cache_read), 0) as cacheReadTokens,
        COALESCE(SUM(tokens_cache_creation), 0) as cacheCreationTokens,
        COALESCE(SUM(tokens_reasoning), 0) as reasoningTokens
      FROM ${presetUnifiedSource} AS _pu
      GROUP BY LOWER(model), LOWER(provider), serviceTier
    `
    )
    .all(params) as PresetCostModelRow[];
}

// ---------------------------------------------------------------------------
// Export-JSON backup — /api/settings/export-json
// ---------------------------------------------------------------------------

/**
 * Returns all rows from `usage_history` for backup export.
 * Only called when `?includeHistory=true` is explicitly requested.
 */
export function getAllUsageHistory(): Record<string, unknown>[] {
  const db = getDbInstance();
  return db.prepare("SELECT * FROM usage_history").all() as Record<string, unknown>[];
}

/**
 * Returns all rows from `domain_cost_history` for backup export.
 */
export function getAllDomainCostHistory(): Record<string, unknown>[] {
  const db = getDbInstance();
  return db.prepare("SELECT * FROM domain_cost_history").all() as Record<string, unknown>[];
}

/**
 * Returns all rows from `domain_budgets` for backup export.
 */
export function getAllDomainBudgets(): Record<string, unknown>[] {
  const db = getDbInstance();
  return db.prepare("SELECT * FROM domain_budgets").all() as Record<string, unknown>[];
}
