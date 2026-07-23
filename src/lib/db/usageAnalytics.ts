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
import type { AnalyticsParams } from "./usageAnalytics/sources";

export { buildUnifiedSource, buildPresetUnifiedSource } from "./usageAnalytics/sources";
export type {
  AnalyticsParams,
  BuildUnifiedSourceOptions,
  UnifiedSourceResult,
} from "./usageAnalytics/sources";

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
        COUNT(DISTINCT COALESCE(NULLIF(account_key, ''), NULLIF(connection_id, ''))) as uniqueAccounts,
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
  accountKey: string;
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
 * Per-account cost breakdown grouped by the identity snapshot stored on each usage event.
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
      WITH account_events AS (
        SELECT
          COALESCE(
            NULLIF(usage_history.account_key, ''),
            'connection:' || COALESCE(LOWER(usage_history.provider), 'unknown') || ':' || COALESCE(NULLIF(TRIM(usage_history.connection_id), ''), 'unknown')
          ) as resolved_account_key,
          usage_history.provider,
          usage_history.model,
          usage_history.service_tier,
          usage_history.tokens_input,
          usage_history.tokens_output,
          usage_history.tokens_cache_read,
          usage_history.tokens_cache_creation,
          usage_history.tokens_reasoning
        FROM usage_history
        ${whereClause}
      )
      SELECT
        account_events.resolved_account_key as accountKey,
        LOWER(account_events.provider) as provider,
        LOWER(account_events.model) as model,
        COALESCE(NULLIF(account_events.service_tier, ''), 'standard') as serviceTier,
        COALESCE(SUM(account_events.tokens_input), 0) as promptTokens,
        COALESCE(SUM(account_events.tokens_output), 0) as completionTokens,
        COALESCE(SUM(account_events.tokens_cache_read), 0) as cacheReadTokens,
        COALESCE(SUM(account_events.tokens_cache_creation), 0) as cacheCreationTokens,
        COALESCE(SUM(account_events.tokens_reasoning), 0) as reasoningTokens
      FROM account_events
      GROUP BY accountKey, LOWER(account_events.provider), LOWER(account_events.model), serviceTier
    `
    )
    .all(params) as AccountCostRow[];
}

// ---------------------------------------------------------------------------

export interface AccountUsageRow {
  accountKey: string;
  account: string;
  requests: number;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  avgLatencyMs: number;
  lastUsed: string;
}

/**
 * Per-account usage aggregates grouped by the identity snapshot stored on each usage event.
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
      WITH account_events AS (
        SELECT
          usage_history.*,
          COALESCE(NULLIF(usage_history.account_key, ''), 'connection:' || COALESCE(LOWER(usage_history.provider), 'unknown') || ':' || COALESCE(NULLIF(TRIM(usage_history.connection_id), ''), 'unknown')) as resolved_account_key
        FROM usage_history
        ${whereClause}
      ),
      stable_account_keys AS (
        SELECT DISTINCT account_key
        FROM account_events
        WHERE account_key > ''
      ),
      stable_labels AS (
        SELECT
          stable_account_keys.account_key,
          (
            SELECT TRIM(usage_history.account_label)
            FROM usage_history
            WHERE usage_history.account_key = stable_account_keys.account_key
              AND NULLIF(TRIM(usage_history.account_label), '') IS NOT NULL
            ORDER BY COALESCE(usage_history.account_label_priority, 0) DESC,
                     usage_history.timestamp DESC,
                     usage_history.id DESC
            LIMIT 1
          ) as account_label
        FROM stable_account_keys
      ),
      legacy_labels AS (
        SELECT account_key, account_label
        FROM (
          SELECT
            account_events.resolved_account_key as account_key,
            TRIM(account_events.account_label) as account_label,
            ROW_NUMBER() OVER (
              PARTITION BY account_events.resolved_account_key
              ORDER BY COALESCE(account_events.account_label_priority, 0) DESC,
                       account_events.timestamp DESC,
                       account_events.id DESC
            ) as label_rank
          FROM account_events
          WHERE (account_events.account_key IS NULL OR account_events.account_key = '')
            AND NULLIF(TRIM(account_events.account_label), '') IS NOT NULL
        )
        WHERE label_rank = 1
      ),
      selected_labels AS (
        SELECT account_key, account_label FROM stable_labels
        UNION ALL
        SELECT account_key, account_label FROM legacy_labels
      )
      SELECT
        account_events.resolved_account_key as accountKey,
        COALESCE(NULLIF(TRIM(selected_labels.account_label), ''), NULLIF(TRIM(account_events.connection_id), ''), 'unknown') as account,
        COUNT(account_events.id) as requests,
        COALESCE(SUM(account_events.tokens_input), 0) as promptTokens,
        COALESCE(SUM(account_events.tokens_output), 0) as completionTokens,
        COALESCE(SUM(account_events.tokens_input + account_events.tokens_output), 0) as totalTokens,
        COALESCE(AVG(account_events.latency_ms), 0) as avgLatencyMs,
        COALESCE(MAX(account_events.timestamp), '') as lastUsed
      FROM account_events
      LEFT JOIN selected_labels
        ON selected_labels.account_key = account_events.resolved_account_key
      GROUP BY accountKey
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
// Endpoint dimension — ported from decolua/9router#152 (thanks @toanalien).
// Reads directly from usage_history (raw rows) so the unified CTE stays
// untouched; matches the pattern used by getAutoRoutingVariantBreakdown.
// ---------------------------------------------------------------------------

export interface EndpointUsageRow {
  endpoint: string;
  provider: string;
  model: string;
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

export interface EndpointUsageParams {
  sinceIso?: string | null;
  untilIso?: string | null;
}

/**
 * Per-endpoint × provider × model usage aggregates from `usage_history`.
 * NULL endpoints fold into the 'unknown' bucket so legacy rows stay visible.
 *
 * Inspired by decolua/9router#152 (byEndpoint aggregation), reshaped for the
 * OmniRoute SQLite schema + analytics conventions.
 */
export function getEndpointUsageRows(params: EndpointUsageParams = {}): EndpointUsageRow[] {
  const db = getDbInstance();
  const conditions: string[] = [];
  const bind: Record<string, unknown> = {};
  if (params.sinceIso) {
    conditions.push("timestamp >= @since");
    bind.since = params.sinceIso;
  }
  if (params.untilIso) {
    conditions.push("timestamp <= @until");
    bind.until = params.untilIso;
  }
  const whereSql = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
  return db
    .prepare(
      `
      SELECT
        COALESCE(NULLIF(endpoint, ''), 'unknown') as endpoint,
        LOWER(COALESCE(provider, 'unknown')) as provider,
        LOWER(COALESCE(model, 'unknown')) as model,
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
      FROM usage_history
      ${whereSql}
      GROUP BY endpoint, LOWER(COALESCE(provider, 'unknown')), LOWER(COALESCE(model, 'unknown'))
      ORDER BY requests DESC
    `
    )
    .all(bind) as EndpointUsageRow[];
}

// ---------------------------------------------------------------------------
// Request count per provider, per date — #4009
// ---------------------------------------------------------------------------

export interface ProviderDailyUsageRow {
  date: string;
  provider: string;
  requests: number;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

/**
 * Per-day, per-provider request counts + token totals from the unified source CTE.
 * Answers "how many requests did provider X get on date Y" (#4009) — providers that
 * bill per-request rather than per-token need this breakdown, not just the
 * per-provider aggregate (`getProviderUsageRows`) or the per-day aggregate
 * (`getDailyUsage`).
 */
export function getProviderDailyUsageRows(
  unifiedSource: string,
  params: AnalyticsParams
): ProviderDailyUsageRow[] {
  const db = getDbInstance();
  return db
    .prepare(
      `
      SELECT
        DATE(timestamp) as date,
        LOWER(provider) as provider,
        COUNT(*) as requests,
        COALESCE(SUM(tokens_input), 0) as promptTokens,
        COALESCE(SUM(tokens_output), 0) as completionTokens,
        COALESCE(SUM(tokens_input + tokens_output), 0) as totalTokens
      FROM ${unifiedSource} AS _u
      GROUP BY DATE(timestamp), LOWER(provider)
      ORDER BY date DESC, requests DESC
    `
    )
    .all(params) as ProviderDailyUsageRow[];
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
