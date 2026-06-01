/**
 * Usage Stats — extracted from usageDb.js (T-15)
 *
 * Aggregates usage data into stats for the dashboard:
 * totals, by provider/model/account/apiKey, 10-minute buckets.
 *
 * @module lib/usage/usageStats
 */

import { getDbInstance } from "../db/core";
import { getApiKeys } from "../db/apiKeys";
import { getPendingRequests } from "./usageHistory";
import { getAccountDisplayName } from "@/lib/display/names";
import { calculateCost } from "./costCalculator";
import { getRawDataCutoffDate, isAggregationEnabled } from "./aggregateHistory";

type JsonRecord = Record<string, unknown>;
type UsageBucket = {
  requests: number;
  promptTokens: number;
  completionTokens: number;
  cost: number;
};

type UsageBreakdown = UsageBucket & {
  rawModel?: string;
  provider?: string;
  lastUsed?: string;
  connectionId?: string;
  accountName?: string;
  apiKeyId?: string | null;
  apiKeyName?: string;
  historicalApiKeyNames?: string[];
};

type ActiveRequest = {
  model: string;
  provider: string;
  account: string;
  count: number;
};

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function toNumber(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

function toStringOrEmpty(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function buildUsageSourceSql(aggregationEnabled: boolean) {
  if (!aggregationEnabled) {
    return `
      SELECT
        provider,
        model,
        timestamp,
        connection_id,
        api_key_id,
        api_key_name,
        COALESCE(tokens_input, 0) as tokens_input,
        COALESCE(tokens_output, 0) as tokens_output,
        COALESCE(tokens_cache_read, 0) as tokens_cache_read,
        COALESCE(tokens_cache_creation, 0) as tokens_cache_creation,
        COALESCE(tokens_reasoning, 0) as tokens_reasoning,
        COALESCE(tokens_input, 0) as cost_tokens_input,
        COALESCE(tokens_output, 0) as cost_tokens_output,
        COALESCE(tokens_cache_read, 0) as cost_tokens_cache_read,
        COALESCE(tokens_cache_creation, 0) as cost_tokens_cache_creation,
        COALESCE(tokens_reasoning, 0) as cost_tokens_reasoning,
        0.0 as stored_cost,
        COALESCE(service_tier, 'standard') as service_tier,
        1 as request_count
      FROM usage_history
    `;
  }

  return `
    SELECT
      provider,
      model,
      timestamp,
      connection_id,
      api_key_id,
      api_key_name,
      COALESCE(tokens_input, 0) as tokens_input,
      COALESCE(tokens_output, 0) as tokens_output,
      COALESCE(tokens_cache_read, 0) as tokens_cache_read,
      COALESCE(tokens_cache_creation, 0) as tokens_cache_creation,
      COALESCE(tokens_reasoning, 0) as tokens_reasoning,
      COALESCE(tokens_input, 0) as cost_tokens_input,
      COALESCE(tokens_output, 0) as cost_tokens_output,
      COALESCE(tokens_cache_read, 0) as cost_tokens_cache_read,
      COALESCE(tokens_cache_creation, 0) as cost_tokens_cache_creation,
      COALESCE(tokens_reasoning, 0) as cost_tokens_reasoning,
      0.0 as stored_cost,
      COALESCE(service_tier, 'standard') as service_tier,
      1 as request_count
    FROM usage_history
    WHERE DATE(timestamp) >= ?

    UNION ALL

    SELECT
      provider,
      model,
      date || 'T12:00:00.000Z' as timestamp,
      NULL as connection_id,
      NULL as api_key_id,
      NULL as api_key_name,
      COALESCE(total_input_tokens, 0) as tokens_input,
      COALESCE(total_output_tokens, 0) as tokens_output,
      0 as tokens_cache_read,
      0 as tokens_cache_creation,
      0 as tokens_reasoning,
      0 as cost_tokens_input,
      0 as cost_tokens_output,
      0 as cost_tokens_cache_read,
      0 as cost_tokens_cache_creation,
      0 as cost_tokens_reasoning,
      COALESCE(total_cost, 0.0) as stored_cost,
      'standard' as service_tier,
      COALESCE(total_requests, 0) as request_count
    FROM daily_usage_summary
    WHERE date < ?
  `;
}

const AGGREGATE_FIELDS = `
  SUM(request_count) as request_count,
  COALESCE(SUM(tokens_input), 0) as tokens_input,
  COALESCE(SUM(tokens_output), 0) as tokens_output,
  COALESCE(SUM(tokens_cache_read), 0) as tokens_cache_read,
  COALESCE(SUM(tokens_cache_creation), 0) as tokens_cache_creation,
  COALESCE(SUM(tokens_reasoning), 0) as tokens_reasoning,
  COALESCE(SUM(cost_tokens_input), 0) as cost_tokens_input,
  COALESCE(SUM(cost_tokens_output), 0) as cost_tokens_output,
  COALESCE(SUM(cost_tokens_cache_read), 0) as cost_tokens_cache_read,
  COALESCE(SUM(cost_tokens_cache_creation), 0) as cost_tokens_cache_creation,
  COALESCE(SUM(cost_tokens_reasoning), 0) as cost_tokens_reasoning,
  COALESCE(SUM(stored_cost), 0.0) as stored_cost,
  MAX(timestamp) as last_used
`;

async function calculateAggregateCost(row: JsonRecord): Promise<number> {
  const provider = toStringOrEmpty(row.provider) || "unknown";
  const model = toStringOrEmpty(row.model) || "unknown";
  const serviceTier = toStringOrEmpty(row.service_tier) || "standard";
  const storedCost = toNumber(row.stored_cost);
  const calculatedCost = await calculateCost(
    provider,
    model,
    {
      input: toNumber(row.cost_tokens_input ?? row.tokens_input),
      output: toNumber(row.cost_tokens_output ?? row.tokens_output),
      cacheRead: toNumber(row.cost_tokens_cache_read ?? row.tokens_cache_read),
      cacheCreation: toNumber(row.cost_tokens_cache_creation ?? row.tokens_cache_creation),
      reasoning: toNumber(row.cost_tokens_reasoning ?? row.tokens_reasoning),
    },
    { serviceTier }
  );
  return storedCost + calculatedCost;
}

function addUsage(
  bucket: UsageBucket,
  requests: number,
  promptTokens: number,
  completionTokens: number,
  cost: number
) {
  bucket.requests += requests;
  bucket.promptTokens += promptTokens;
  bucket.completionTokens += completionTokens;
  bucket.cost += cost;
}

function getApiKeyStatsKey(apiKeyId: string | null, apiKeyName: string | null): string {
  return apiKeyId ? `id:${apiKeyId}` : `name:${apiKeyName || "unknown"}`;
}

/**
 * Get aggregated usage stats.
 * Uses UNION of recent raw data and older aggregated data when aggregation is enabled.
 */
export async function getUsageStats() {
  const db = getDbInstance();
  const aggregationEnabled = await isAggregationEnabled();
  const cutoffDate = aggregationEnabled ? await getRawDataCutoffDate() : null;
  const sourceSql = buildUsageSourceSql(aggregationEnabled);
  const sourceParams = aggregationEnabled && cutoffDate ? [cutoffDate, cutoffDate] : [];

  const { getProviderConnections } = await import("@/lib/localDb");
  let allConnections: unknown[] = [];
  try {
    const loadedConnections = await getProviderConnections();
    allConnections = Array.isArray(loadedConnections) ? loadedConnections : [];
  } catch {}

  const connectionMap: Record<string, string> = {};
  for (const connRaw of allConnections) {
    const conn = asRecord(connRaw);
    const connectionId = toStringOrEmpty(conn.id);
    if (!connectionId) continue;
    connectionMap[connectionId] =
      toStringOrEmpty(conn.name) || toStringOrEmpty(conn.email) || connectionId;
  }

  const currentApiKeyNames = new Map<string, string>();
  try {
    const apiKeys = await getApiKeys();
    for (const apiKey of apiKeys) {
      if (typeof apiKey.id === "string" && typeof apiKey.name === "string") {
        currentApiKeyNames.set(apiKey.id, apiKey.name);
      }
    }
  } catch {
    // Stats can still be computed from usage_history when api_keys is unavailable.
  }

  const pendingRequests = getPendingRequests();

  const stats: {
    totalRequests: number;
    totalPromptTokens: number;
    totalCompletionTokens: number;
    totalCost: number;
    byProvider: Record<string, UsageBreakdown>;
    byModel: Record<string, UsageBreakdown>;
    byAccount: Record<string, UsageBreakdown>;
    byApiKey: Record<string, UsageBreakdown>;
    last10Minutes: UsageBucket[];
    pending: ReturnType<typeof getPendingRequests>;
    activeRequests: ActiveRequest[];
  } = {
    totalRequests: 0,
    totalPromptTokens: 0,
    totalCompletionTokens: 0,
    totalCost: 0,
    byProvider: {},
    byModel: {},
    byAccount: {},
    byApiKey: {},
    last10Minutes: [],
    pending: pendingRequests,
    activeRequests: [],
  };

  // Build active requests
  for (const [connectionId, models] of Object.entries(pendingRequests.byAccount)) {
    for (const [modelKey, count] of Object.entries(models)) {
      if (count > 0) {
        const accountName =
          connectionMap[connectionId] || getAccountDisplayName({ id: connectionId });
        const match = modelKey.match(/^(.*) \((.*)\)$/);
        stats.activeRequests.push({
          model: match ? match[1] : modelKey,
          provider: match ? match[2] : "unknown",
          account: accountName,
          count,
        });
      }
    }
  }

  // 10-minute buckets
  const now = new Date();
  const currentMinuteStart = new Date(Math.floor(now.getTime() / 60000) * 60000);

  const bucketMap: Record<number, UsageBucket> = {};
  for (let i = 0; i < 10; i++) {
    const bucketTime = new Date(currentMinuteStart.getTime() - (9 - i) * 60 * 1000);
    const bucketKey = bucketTime.getTime();
    bucketMap[bucketKey] = { requests: 0, promptTokens: 0, completionTokens: 0, cost: 0 };
    stats.last10Minutes.push(bucketMap[bucketKey]);
  }

  const tenMinutesAgo = new Date(currentMinuteStart.getTime() - 9 * 60 * 1000);

  const modelRows = db
    .prepare(
      `
        WITH usage_source AS (${sourceSql})
        SELECT provider, model, service_tier, ${AGGREGATE_FIELDS}
        FROM usage_source
        GROUP BY provider, model, service_tier
      `
    )
    .all(...sourceParams) as unknown[];

  for (const rowRaw of modelRows) {
    const row = asRecord(rowRaw);
    const provider = toStringOrEmpty(row.provider) || "unknown";
    const model = toStringOrEmpty(row.model) || "unknown";
    const timestamp = toStringOrEmpty(row.last_used) || new Date(0).toISOString();
    const requestCount = toNumber(row.request_count);
    const promptTokens = toNumber(row.tokens_input);
    const completionTokens = toNumber(row.tokens_output);
    const entryCost = await calculateAggregateCost(row);

    stats.totalRequests += requestCount;
    stats.totalPromptTokens += promptTokens;
    stats.totalCompletionTokens += completionTokens;
    stats.totalCost += entryCost;

    // By Provider
    if (!stats.byProvider[provider]) {
      stats.byProvider[provider] = {
        requests: 0,
        promptTokens: 0,
        completionTokens: 0,
        cost: 0,
      };
    }
    addUsage(stats.byProvider[provider], requestCount, promptTokens, completionTokens, entryCost);

    // By Model
    const modelKey = provider ? `${model} (${provider})` : model;
    if (!stats.byModel[modelKey]) {
      stats.byModel[modelKey] = {
        requests: 0,
        promptTokens: 0,
        completionTokens: 0,
        cost: 0,
        rawModel: model,
        provider,
        lastUsed: timestamp,
      };
    }
    addUsage(stats.byModel[modelKey], requestCount, promptTokens, completionTokens, entryCost);
    if (new Date(timestamp) > new Date(stats.byModel[modelKey].lastUsed || timestamp)) {
      stats.byModel[modelKey].lastUsed = timestamp;
    }
  }

  const accountRows = db
    .prepare(
      `
        WITH usage_source AS (${sourceSql})
        SELECT provider, model, connection_id, service_tier, ${AGGREGATE_FIELDS}
        FROM usage_source
        WHERE connection_id IS NOT NULL AND connection_id != ''
        GROUP BY provider, model, connection_id, service_tier
      `
    )
    .all(...sourceParams) as unknown[];

  for (const rowRaw of accountRows) {
    const row = asRecord(rowRaw);
    const provider = toStringOrEmpty(row.provider) || "unknown";
    const model = toStringOrEmpty(row.model) || "unknown";
    const timestamp = toStringOrEmpty(row.last_used) || new Date(0).toISOString();
    const connectionId = toStringOrEmpty(row.connection_id);
    const requestCount = toNumber(row.request_count);
    const promptTokens = toNumber(row.tokens_input);
    const completionTokens = toNumber(row.tokens_output);
    const entryCost = await calculateAggregateCost(row);

    if (connectionId) {
      const accountName =
        connectionMap[connectionId] || getAccountDisplayName({ id: connectionId });
      const accountKey = `${model} (${provider} - ${accountName})`;
      if (!stats.byAccount[accountKey]) {
        stats.byAccount[accountKey] = {
          requests: 0,
          promptTokens: 0,
          completionTokens: 0,
          cost: 0,
          rawModel: model,
          provider,
          connectionId,
          accountName,
          lastUsed: timestamp,
        };
      }
      addUsage(
        stats.byAccount[accountKey],
        requestCount,
        promptTokens,
        completionTokens,
        entryCost
      );
      if (new Date(timestamp) > new Date(stats.byAccount[accountKey].lastUsed || timestamp)) {
        stats.byAccount[accountKey].lastUsed = timestamp;
      }
    }
  }

  const apiKeyRows = db
    .prepare(
      `
        WITH usage_source AS (${sourceSql})
        SELECT provider, model, api_key_id, api_key_name, service_tier, ${AGGREGATE_FIELDS}
        FROM usage_source
        WHERE (api_key_id IS NOT NULL AND api_key_id != '')
           OR (api_key_name IS NOT NULL AND api_key_name != '')
        GROUP BY provider, model, api_key_id, api_key_name, service_tier
      `
    )
    .all(...sourceParams) as unknown[];

  for (const rowRaw of apiKeyRows) {
    const row = asRecord(rowRaw);
    const timestamp = toStringOrEmpty(row.last_used) || new Date(0).toISOString();
    const apiKeyId = toStringOrEmpty(row.api_key_id) || null;
    const apiKeyName = toStringOrEmpty(row.api_key_name) || null;
    const requestCount = toNumber(row.request_count);
    const promptTokens = toNumber(row.tokens_input);
    const completionTokens = toNumber(row.tokens_output);
    const entryCost = await calculateAggregateCost(row);

    if (apiKeyId || apiKeyName) {
      const key = getApiKeyStatsKey(apiKeyId, apiKeyName);
      const displayName =
        (apiKeyId ? currentApiKeyNames.get(apiKeyId) : undefined) ||
        apiKeyName ||
        apiKeyId ||
        "unknown";
      if (!stats.byApiKey[key]) {
        stats.byApiKey[key] = {
          requests: 0,
          promptTokens: 0,
          completionTokens: 0,
          cost: 0,
          apiKeyId,
          apiKeyName: displayName,
          historicalApiKeyNames: [],
          lastUsed: timestamp,
        };
      }
      const apiKeyStats = stats.byApiKey[key];
      if (apiKeyName && !apiKeyStats.historicalApiKeyNames?.includes(apiKeyName)) {
        apiKeyStats.historicalApiKeyNames?.push(apiKeyName);
      }
      apiKeyStats.apiKeyName = displayName;
      addUsage(apiKeyStats, requestCount, promptTokens, completionTokens, entryCost);
      if (new Date(timestamp) > new Date(apiKeyStats.lastUsed || timestamp)) {
        apiKeyStats.lastUsed = timestamp;
      }
    }
  }

  const recentRows = db
    .prepare(
      `
        SELECT
          strftime('%Y-%m-%dT%H:%M:00.000Z', timestamp) as minute,
          provider,
          model,
          COALESCE(service_tier, 'standard') as service_tier,
          COUNT(*) as request_count,
          COALESCE(SUM(tokens_input), 0) as tokens_input,
          COALESCE(SUM(tokens_output), 0) as tokens_output,
          COALESCE(SUM(tokens_cache_read), 0) as tokens_cache_read,
          COALESCE(SUM(tokens_cache_creation), 0) as tokens_cache_creation,
          COALESCE(SUM(tokens_reasoning), 0) as tokens_reasoning
        FROM usage_history
        WHERE timestamp >= ? AND timestamp <= ?
        GROUP BY minute, provider, model, service_tier
      `
    )
    .all(tenMinutesAgo.toISOString(), now.toISOString()) as unknown[];

  for (const rowRaw of recentRows) {
    const row = asRecord(rowRaw);
    const minute = toStringOrEmpty(row.minute);
    const bucketKey = new Date(minute).getTime();
    if (!bucketMap[bucketKey]) continue;

    const requestCount = toNumber(row.request_count);
    const promptTokens = toNumber(row.tokens_input);
    const completionTokens = toNumber(row.tokens_output);
    const entryCost = await calculateAggregateCost(row);
    addUsage(bucketMap[bucketKey], requestCount, promptTokens, completionTokens, entryCost);
  }

  return stats;
}
