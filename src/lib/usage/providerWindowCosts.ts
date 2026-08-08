/**
 * @file providerWindowCosts.ts
 * @description Provider weekly USD cost breakdown for the dashboard modal.
 *
 * @changes
 * - [2026-07-24] [Composer] - Aggregate usage_history in SQL instead of loading all rows into JS
 */

import { getCostSummary } from "@/domain/costRules";
import { getApiKeys } from "@/lib/db/apiKeys";
import { getDbInstance } from "@/lib/db/core";
import { getAllProviderLimitsCache, getProviderLimitsCache } from "@/lib/db/providerLimits";
import { getProviderQuotaWindowStart } from "@/lib/db/quotaResetEvents";
import { calculateCost } from "@/lib/usage/costCalculator";

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const RECORDED_COST_MATCH_TOLERANCE_MS = 30_000;

type JsonRecord = Record<string, unknown>;

interface UsageHistoryFilter {
  whereSql: string;
  params: Record<string, unknown>;
}

interface AggregatedUsageCostRow {
  apiKeyId: string | null;
  apiKeyName: string | null;
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
  lastUsed: string | null;
}

interface UsageCostRow {
  id: number;
  apiKeyId: string | null;
  apiKeyName: string | null;
  provider: string;
  model: string;
  serviceTier: string;
  promptTokens: number;
  completionTokens: number;
  cacheReadTokens: number;
  cacheCreationTokens: number;
  reasoningTokens: number;
  totalTokens: number;
  timestamp: string | null;
}

interface RecordedCostSummary {
  totalCost: number;
  entryCount: number;
}

interface RecordedCostRow {
  rowId: number;
  apiKeyId: string;
  timestamp: number;
  cost: number;
}

interface ProviderWindowCostModelRow {
  model: string;
  provider: string;
  serviceTier: string;
  requests: number;
  totalTokens: number;
  costUsd: number;
}

export interface ProviderWindowCostBreakdownRow {
  apiKeyKey: string;
  apiKeyId: string | null;
  apiKeyName: string;
  requests: number;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  costUsd: number;
  limitUsd: number | null;
  limitPeriod: string | null;
  limitUsedPercent: number | null;
  budgetResetAt: string | null;
  lastUsed: string | null;
  models: ProviderWindowCostModelRow[];
}

interface ProviderWindowCostAggregateRow extends ProviderWindowCostBreakdownRow {
  modelMap: Map<string, ProviderWindowCostModelRow>;
}

export interface ProviderWindowCostBreakdown {
  provider: string;
  connectionId: string | null;
  windowStartAt: string;
  windowResetAt: string | null;
  windowSource: "provider_weekly_reset" | "fallback_rolling_7d";
  windowStartSource:
    | "recorded_reset_event"
    | "observed_snapshot_reset"
    | "inferred_from_reset_at"
    | "fallback_rolling_7d";
  quotaName: string | null;
  quotaUsedPercent: number | null;
  quotaRemainingPercent: number | null;
  totalCostUsd: number;
  estimatedFullQuotaUsd: number | null;
  rows: ProviderWindowCostBreakdownRow[];
}

function toRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function toNumber(value: unknown, fallback = 0): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }
  return fallback;
}

function toString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function roundUsd(value: number): number {
  return Math.round(value * 1_000_000) / 1_000_000;
}

function roundPercent(value: number): number {
  return Math.round(value * 10) / 10;
}

function parseResetAt(value: unknown, nowMs: number): number | null {
  const resetAt = toString(value);
  if (!resetAt) return null;
  const parsed = Date.parse(resetAt);
  if (!Number.isFinite(parsed) || parsed <= nowMs) return null;
  return parsed;
}

function getProviderWindowStart(
  connectionId: string | null,
  resetMs: number,
  nowMs: number
): { startMs: number; source: ProviderWindowCostBreakdown["windowStartSource"] } | null {
  if (!connectionId) return null;
  const resetIso = new Date(resetMs).toISOString();
  const start = getProviderQuotaWindowStart(connectionId, resetIso, nowMs);
  if (!start) return null;
  const startMs = Date.parse(start.windowStartIso);
  if (!Number.isFinite(startMs)) return null;
  if (startMs > nowMs || startMs >= resetMs) return null;
  return { startMs, source: start.source };
}

function getRemainingPercent(quota: JsonRecord): number | null {
  const explicit = toNumber(quota.remainingPercentage, Number.NaN);
  if (Number.isFinite(explicit)) return Math.max(0, Math.min(100, explicit));

  const total = toNumber(quota.total, 0);
  if (total <= 0) return null;
  const remaining = toNumber(quota.remaining, Number.NaN);
  if (Number.isFinite(remaining)) {
    return Math.max(0, Math.min(100, (remaining / total) * 100));
  }

  const used = toNumber(quota.used, Number.NaN);
  if (Number.isFinite(used)) {
    return Math.max(0, Math.min(100, ((total - used) / total) * 100));
  }

  return null;
}

function scoreWeeklyQuota(name: string): number {
  const normalized = name.trim().toLowerCase();
  if (!normalized.includes("weekly") && !normalized.includes("7d")) return Number.NEGATIVE_INFINITY;

  let score = 10;
  if (normalized === "weekly" || /^weekly\s*\(/.test(normalized)) score += 100;
  if (normalized.includes("7d") || normalized.includes("7 day")) score += 15;
  if (normalized.includes("sonnet")) score -= 30;
  if (/^(gpt|claude|o\d|gemini|opus|sonnet)\b/.test(normalized)) score -= 20;
  return score;
}

function selectWeeklyWindow(
  provider: string,
  connectionId: string | null,
  nowMs: number
): {
  startMs: number;
  resetMs: number | null;
  source: ProviderWindowCostBreakdown["windowSource"];
  quotaName: string | null;
  quotaUsedPercent: number | null;
  quotaRemainingPercent: number | null;
  windowStartSource: ProviderWindowCostBreakdown["windowStartSource"];
} {
  const cacheEntries = connectionId
    ? [[connectionId, getProviderLimitsCache(connectionId)] as const]
    : Object.entries(getAllProviderLimitsCache());

  let selected: {
    score: number;
    connectionId: string;
    resetMs: number;
    quotaName: string;
    quotaUsedPercent: number | null;
    quotaRemainingPercent: number | null;
  } | null = null;

  for (const [entryConnectionId, cache] of cacheEntries) {
    const quotas = toRecord(cache?.quotas);
    for (const [name, rawQuota] of Object.entries(quotas)) {
      const score = scoreWeeklyQuota(name);
      if (!Number.isFinite(score)) continue;
      const quota = toRecord(rawQuota);
      const resetMs = parseResetAt(quota.resetAt, nowMs);
      if (resetMs === null) continue;
      const remainingPercent = getRemainingPercent(quota);
      const usedPercent =
        remainingPercent === null ? null : Math.max(0, Math.min(100, 100 - remainingPercent));
      if (
        !selected ||
        score > selected.score ||
        (score === selected.score && resetMs < selected.resetMs)
      ) {
        selected = {
          score,
          connectionId: entryConnectionId,
          resetMs,
          quotaName: name,
          quotaUsedPercent: usedPercent,
          quotaRemainingPercent: remainingPercent,
        };
      }
    }
  }

  if (selected) {
    const providerWindowStart = getProviderWindowStart(
      selected.connectionId,
      selected.resetMs,
      nowMs
    );
    return {
      startMs: providerWindowStart?.startMs ?? selected.resetMs - WEEK_MS,
      resetMs: selected.resetMs,
      source: "provider_weekly_reset",
      windowStartSource: providerWindowStart?.source ?? "inferred_from_reset_at",
      quotaName: selected.quotaName,
      quotaUsedPercent: selected.quotaUsedPercent,
      quotaRemainingPercent: selected.quotaRemainingPercent,
    };
  }

  return {
    startMs: nowMs - WEEK_MS,
    resetMs: null,
    source: "fallback_rolling_7d",
    windowStartSource: "fallback_rolling_7d",
    quotaName: null,
    quotaUsedPercent: null,
    quotaRemainingPercent: null,
  };
}

function makeApiKeyKey(apiKeyId: string | null, apiKeyName: string | null): string {
  if (apiKeyId) return `id:${apiKeyId}`;
  if (apiKeyName) return `name:${apiKeyName}`;
  return "unattributed";
}

async function getCurrentApiKeyNames(): Promise<Map<string, string>> {
  const names = new Map<string, string>();
  try {
    const apiKeys = await getApiKeys();
    for (const apiKey of apiKeys) {
      if (typeof apiKey.id === "string" && typeof apiKey.name === "string") {
        names.set(apiKey.id, apiKey.name);
      }
    }
  } catch {
    // Usage rows carry historical names, so current API key names are an enhancement only.
  }
  return names;
}

function uniqueApiKeyIds(rows: Array<{ apiKeyId: string | null }>): string[] {
  return Array.from(
    new Set(
      rows
        .map((row) => (typeof row.apiKeyId === "string" ? row.apiKeyId : ""))
        .filter((value) => value.length > 0)
    )
  );
}

function buildUsageHistoryFilter(
  providerKey: string,
  windowStartAt: string,
  nowIso: string,
  windowResetAt: string | null,
  connectionId: string | null
): UsageHistoryFilter {
  const where = [
    "LOWER(provider) = @provider",
    "timestamp >= @since",
    "timestamp <= @nowIso",
    "COALESCE(success, 1) = 1",
  ];
  const params: Record<string, unknown> = {
    provider: providerKey,
    since: windowStartAt,
    nowIso,
  };
  if (windowResetAt) {
    where.push("timestamp < @resetAt");
    params.resetAt = windowResetAt;
  }
  if (connectionId) {
    where.push("connection_id = @connectionId");
    params.connectionId = connectionId;
  }
  return { whereSql: where.join(" AND "), params };
}

function fetchAggregatedUsageRows(filter: UsageHistoryFilter): AggregatedUsageCostRow[] {
  return getDbInstance()
    .prepare<AggregatedUsageCostRow>(
      `
      SELECT
        NULLIF(api_key_id, '') as apiKeyId,
        NULLIF(api_key_name, '') as apiKeyName,
        LOWER(provider) as provider,
        LOWER(model) as model,
        COALESCE(NULLIF(service_tier, ''), 'standard') as serviceTier,
        COUNT(*) as requests,
        COALESCE(SUM(tokens_input), 0) as promptTokens,
        COALESCE(SUM(tokens_output), 0) as completionTokens,
        COALESCE(SUM(tokens_cache_read), 0) as cacheReadTokens,
        COALESCE(SUM(tokens_cache_creation), 0) as cacheCreationTokens,
        COALESCE(SUM(tokens_reasoning), 0) as reasoningTokens,
        COALESCE(SUM(tokens_input + tokens_output), 0) as totalTokens,
        MAX(timestamp) as lastUsed
      FROM usage_history
      WHERE ${filter.whereSql}
      GROUP BY
        COALESCE(NULLIF(api_key_id, ''), ''),
        COALESCE(NULLIF(api_key_name, ''), ''),
        LOWER(provider),
        LOWER(model),
        COALESCE(NULLIF(service_tier, ''), 'standard')
      ORDER BY totalTokens DESC
      `
    )
    .all(filter.params);
}

function fetchUsageRequestCountByApiKey(filter: UsageHistoryFilter): Map<string, number> {
  const rows = getDbInstance()
    .prepare<{ apiKeyId: string; requestCount: number }>(
      `
      SELECT
        COALESCE(NULLIF(api_key_id, ''), '') as apiKeyId,
        COUNT(*) as requestCount
      FROM usage_history
      WHERE ${filter.whereSql}
      GROUP BY COALESCE(NULLIF(api_key_id, ''), '')
      `
    )
    .all(filter.params);

  const counts = new Map<string, number>();
  for (const row of rows) {
    if (!row.apiKeyId) continue;
    counts.set(row.apiKeyId, toNumber(row.requestCount));
  }
  return counts;
}

function fetchDetailedUsageRowsForApiKey(
  filter: UsageHistoryFilter,
  apiKeyId: string
): UsageCostRow[] {
  return getDbInstance()
    .prepare<UsageCostRow>(
      `
      SELECT
        id,
        NULLIF(api_key_id, '') as apiKeyId,
        NULLIF(api_key_name, '') as apiKeyName,
        LOWER(provider) as provider,
        LOWER(model) as model,
        COALESCE(NULLIF(service_tier, ''), 'standard') as serviceTier,
        COALESCE(tokens_input, 0) as promptTokens,
        COALESCE(tokens_output, 0) as completionTokens,
        COALESCE(tokens_cache_read, 0) as cacheReadTokens,
        COALESCE(tokens_cache_creation, 0) as cacheCreationTokens,
        COALESCE(tokens_reasoning, 0) as reasoningTokens,
        COALESCE(tokens_input + tokens_output, 0) as totalTokens,
        timestamp
      FROM usage_history
      WHERE ${filter.whereSql}
        AND api_key_id = @apiKeyId
      ORDER BY timestamp ASC, id ASC
      `
    )
    .all({ ...filter.params, apiKeyId });
}

function getRecordedCostSummariesByApiKey(
  apiKeyIds: string[],
  sinceMs: number,
  untilMs: number
): Map<string, RecordedCostSummary> {
  if (apiKeyIds.length === 0) return new Map();

  try {
    const params: Record<string, unknown> = {
      sinceMs: Math.max(0, sinceMs - RECORDED_COST_MATCH_TOLERANCE_MS),
      untilMs: untilMs + RECORDED_COST_MATCH_TOLERANCE_MS,
    };
    const placeholders = appendNamedPlaceholders(params, "apiKey", apiKeyIds);
    const rows = getDbInstance()
      .prepare<{ apiKeyId: string; totalCost: number; entryCount: number }>(
        `
        SELECT
          api_key_id as apiKeyId,
          COALESCE(SUM(cost), 0) as totalCost,
          COUNT(*) as entryCount
        FROM domain_cost_history
        WHERE api_key_id IN (${placeholders})
          AND timestamp >= @sinceMs
          AND timestamp <= @untilMs
        GROUP BY api_key_id
      `
      )
      .all(params);

    const summaries = new Map<string, RecordedCostSummary>();
    for (const row of rows) {
      if (!row.apiKeyId) continue;
      summaries.set(row.apiKeyId, {
        totalCost: Math.max(0, toNumber(row.totalCost)),
        entryCount: toNumber(row.entryCount),
      });
    }
    return summaries;
  } catch {
    return new Map();
  }
}

function appendNamedPlaceholders(
  params: Record<string, unknown>,
  prefix: string,
  values: string[]
): string {
  return values
    .map((value, index) => {
      const key = `${prefix}${index}`;
      params[key] = value;
      return `@${key}`;
    })
    .join(", ");
}

function getRecordedCostsByApiKey(
  apiKeyIds: string[],
  sinceMs: number,
  untilMs: number
): Map<string, RecordedCostRow[]> {
  if (apiKeyIds.length === 0) return new Map();

  try {
    const params: Record<string, unknown> = {
      sinceMs: Math.max(0, sinceMs - RECORDED_COST_MATCH_TOLERANCE_MS),
      untilMs: untilMs + RECORDED_COST_MATCH_TOLERANCE_MS,
    };
    const placeholders = appendNamedPlaceholders(params, "apiKey", apiKeyIds);
    const rows = getDbInstance()
      .prepare<RecordedCostRow>(
        `
        SELECT
          id as rowId,
          api_key_id as apiKeyId,
          timestamp,
          cost
        FROM domain_cost_history
        WHERE api_key_id IN (${placeholders})
          AND timestamp >= @sinceMs
          AND timestamp <= @untilMs
        ORDER BY api_key_id ASC, timestamp ASC, rowid ASC
      `
      )
      .all(params);

    const byApiKey = new Map<string, RecordedCostRow[]>();
    for (const row of rows) {
      if (!row.apiKeyId || !Number.isFinite(row.timestamp) || !Number.isFinite(row.cost)) {
        continue;
      }
      const list = byApiKey.get(row.apiKeyId) ?? [];
      list.push(row);
      byApiKey.set(row.apiKeyId, list);
    }
    return byApiKey;
  } catch {
    return new Map();
  }
}

function findClosestRecordedCost(
  candidates: RecordedCostRow[] | undefined,
  timestampMs: number,
  usedRecordedRows: Set<number>
): RecordedCostRow | null {
  if (!candidates?.length || !Number.isFinite(timestampMs)) return null;

  let best: RecordedCostRow | null = null;
  let bestDelta = Number.POSITIVE_INFINITY;

  for (const candidate of candidates) {
    if (usedRecordedRows.has(candidate.rowId)) continue;
    const delta = Math.abs(candidate.timestamp - timestampMs);
    if (delta > RECORDED_COST_MATCH_TOLERANCE_MS) {
      if (candidate.timestamp > timestampMs + RECORDED_COST_MATCH_TOLERANCE_MS) break;
      continue;
    }
    if (delta < bestDelta) {
      best = candidate;
      bestDelta = delta;
    }
  }

  if (best) usedRecordedRows.add(best.rowId);
  return best;
}

async function getUsageRowCostUsd(
  row: UsageCostRow,
  recordedCostsByApiKey: Map<string, RecordedCostRow[]>,
  usedRecordedRows: Set<number>
): Promise<number> {
  const usageTimestampMs = Date.parse(row.timestamp ?? "");
  const recordedCost = findClosestRecordedCost(
    row.apiKeyId ? recordedCostsByApiKey.get(row.apiKeyId) : undefined,
    usageTimestampMs,
    usedRecordedRows
  );
  if (recordedCost) return Math.max(0, toNumber(recordedCost.cost));

  return calculateCost(
    row.provider,
    row.model,
    {
      input: toNumber(row.promptTokens),
      output: toNumber(row.completionTokens),
      cacheRead: toNumber(row.cacheReadTokens),
      cacheCreation: toNumber(row.cacheCreationTokens),
      reasoning: toNumber(row.reasoningTokens),
    },
    { serviceTier: row.serviceTier }
  );
}

async function getAggregatedGroupCostUsd(row: AggregatedUsageCostRow): Promise<number> {
  return roundUsd(
    await calculateCost(
      row.provider,
      row.model,
      {
        input: toNumber(row.promptTokens),
        output: toNumber(row.completionTokens),
        cacheRead: toNumber(row.cacheReadTokens),
        cacheCreation: toNumber(row.cacheCreationTokens),
        reasoning: toNumber(row.reasoningTokens),
      },
      { serviceTier: row.serviceTier }
    )
  );
}

function distributeRecordedCostAcrossGroups(
  groups: AggregatedUsageCostRow[],
  recordedTotalUsd: number,
  groupCalculatedCosts: number[]
): number[] {
  const calculatedTotal = groupCalculatedCosts.reduce((sum, value) => sum + value, 0);
  if (calculatedTotal <= 0) {
    const evenShare = recordedTotalUsd / Math.max(groups.length, 1);
    return groups.map(() => roundUsd(evenShare));
  }
  return groupCalculatedCosts.map((value) =>
    roundUsd((recordedTotalUsd * value) / calculatedTotal)
  );
}

async function buildApiKeyCostAllocations(args: {
  groups: AggregatedUsageCostRow[];
  filter: UsageHistoryFilter;
  usageRequestCount: number;
  recordedSummary: RecordedCostSummary | undefined;
  recordedCostsByApiKey: Map<string, RecordedCostRow[]>;
  usedRecordedRows: Set<number>;
}): Promise<number[]> {
  const calculatedCosts = await Promise.all(
    args.groups.map((group) => getAggregatedGroupCostUsd(group))
  );

  if (!args.recordedSummary || args.recordedSummary.entryCount <= 0) {
    return calculatedCosts;
  }

  if (args.recordedSummary.entryCount === args.usageRequestCount) {
    return distributeRecordedCostAcrossGroups(
      args.groups,
      args.recordedSummary.totalCost,
      calculatedCosts
    );
  }

  const apiKeyId = args.groups[0]?.apiKeyId;
  if (!apiKeyId) return calculatedCosts;

  const detailedRows = fetchDetailedUsageRowsForApiKey(args.filter, apiKeyId);
  const rowCosts = await Promise.all(
    detailedRows.map((row) =>
      getUsageRowCostUsd(row, args.recordedCostsByApiKey, args.usedRecordedRows)
    )
  );
  const detailedTotal = roundUsd(rowCosts.reduce((sum, value) => sum + value, 0));
  return distributeRecordedCostAcrossGroups(args.groups, detailedTotal, calculatedCosts);
}

export async function getProviderWindowCostBreakdown({
  provider,
  connectionId = null,
  now = Date.now(),
}: {
  provider: string;
  connectionId?: string | null;
  now?: number;
}): Promise<ProviderWindowCostBreakdown> {
  const providerKey = provider.trim().toLowerCase();
  const nowMs = Number.isFinite(now) ? now : Date.now();
  const window = selectWeeklyWindow(providerKey, connectionId, nowMs);
  const windowStartAt = new Date(window.startMs).toISOString();
  const windowResetAt = window.resetMs ? new Date(window.resetMs).toISOString() : null;
  const nowIso = new Date(nowMs).toISOString();
  const filter = buildUsageHistoryFilter(
    providerKey,
    windowStartAt,
    nowIso,
    windowResetAt,
    connectionId
  );

  const aggregatedRows = fetchAggregatedUsageRows(filter);
  const usageRequestCounts = fetchUsageRequestCountByApiKey(filter);
  const currentApiKeyNames = await getCurrentApiKeyNames();
  const apiKeyIds = uniqueApiKeyIds(aggregatedRows);
  const recordedSummaries = getRecordedCostSummariesByApiKey(apiKeyIds, window.startMs, nowMs);
  const recordedCostsByApiKey = getRecordedCostsByApiKey(apiKeyIds, window.startMs, nowMs);
  const usedRecordedRows = new Set<number>();
  const byApiKey = new Map<string, ProviderWindowCostAggregateRow>();

  const groupsByApiKey = new Map<string, AggregatedUsageCostRow[]>();
  for (const row of aggregatedRows) {
    const apiKeyKey = makeApiKeyKey(row.apiKeyId, row.apiKeyName);
    const list = groupsByApiKey.get(apiKeyKey) ?? [];
    list.push(row);
    groupsByApiKey.set(apiKeyKey, list);
  }

  for (const [apiKeyKey, groups] of groupsByApiKey.entries()) {
    const first = groups[0];
    const apiKeyId = first.apiKeyId || null;
    const apiKeyName = first.apiKeyName || null;
    const displayName =
      (apiKeyId ? currentApiKeyNames.get(apiKeyId) : null) ||
      apiKeyName ||
      apiKeyId ||
      "Unattributed";
    const usageRequestCount = apiKeyId
      ? (usageRequestCounts.get(apiKeyId) ?? 0)
      : groups.reduce((sum, group) => sum + toNumber(group.requests), 0);
    const groupCosts = await buildApiKeyCostAllocations({
      groups,
      filter,
      usageRequestCount,
      recordedSummary: apiKeyId ? recordedSummaries.get(apiKeyId) : undefined,
      recordedCostsByApiKey,
      usedRecordedRows,
    });

    let limitUsd: number | null = null;
    let limitPeriod: string | null = null;
    let budgetResetAt: string | null = null;
    if (apiKeyId) {
      const summary = getCostSummary(apiKeyId);
      if (summary.activeLimitUsd > 0) {
        limitUsd = summary.activeLimitUsd;
        limitPeriod = summary.resetInterval;
        budgetResetAt =
          typeof summary.nextResetAt === "number" && Number.isFinite(summary.nextResetAt)
            ? new Date(summary.nextResetAt).toISOString()
            : null;
      }
    }

    const aggregate: ProviderWindowCostAggregateRow = {
      apiKeyKey,
      apiKeyId,
      apiKeyName: displayName,
      requests: 0,
      promptTokens: 0,
      completionTokens: 0,
      totalTokens: 0,
      costUsd: 0,
      limitUsd,
      limitPeriod,
      limitUsedPercent: null,
      budgetResetAt,
      lastUsed: null,
      models: [],
      modelMap: new Map(),
    };

    groups.forEach((row, index) => {
      const costUsd = groupCosts[index] ?? 0;
      aggregate.requests += toNumber(row.requests);
      aggregate.promptTokens += toNumber(row.promptTokens);
      aggregate.completionTokens += toNumber(row.completionTokens);
      aggregate.totalTokens += toNumber(row.totalTokens);
      aggregate.costUsd = roundUsd(aggregate.costUsd + costUsd);
      if (!aggregate.lastUsed || (row.lastUsed && row.lastUsed > aggregate.lastUsed)) {
        aggregate.lastUsed = row.lastUsed || aggregate.lastUsed;
      }

      const modelKey = `${row.provider}\0${row.model}\0${row.serviceTier}`;
      const model = aggregate.modelMap.get(modelKey) ?? {
        model: row.model,
        provider: row.provider,
        serviceTier: row.serviceTier,
        requests: 0,
        totalTokens: 0,
        costUsd: 0,
      };
      model.requests += toNumber(row.requests);
      model.totalTokens += toNumber(row.totalTokens);
      model.costUsd = roundUsd(model.costUsd + costUsd);
      aggregate.modelMap.set(modelKey, model);
    });

    byApiKey.set(apiKeyKey, aggregate);
  }

  const breakdownRows = Array.from(byApiKey.values())
    .map((row) => {
      const limitUsedPercent =
        row.limitUsd && row.limitUsd > 0 ? roundPercent((row.costUsd / row.limitUsd) * 100) : null;
      const models = Array.from(row.modelMap.values())
        .map((model) => ({ ...model, costUsd: roundUsd(model.costUsd) }))
        .sort((left, right) => right.costUsd - left.costUsd);
      const { modelMap, ...publicRow } = row;
      void modelMap;
      return {
        ...publicRow,
        costUsd: roundUsd(row.costUsd),
        limitUsedPercent,
        models,
      };
    })
    .sort((left, right) => right.costUsd - left.costUsd);

  const totalCostUsd = roundUsd(breakdownRows.reduce((sum, row) => sum + row.costUsd, 0));
  const estimatedFullQuotaUsd =
    totalCostUsd > 0 && window.quotaUsedPercent && window.quotaUsedPercent > 0
      ? roundUsd(totalCostUsd / (window.quotaUsedPercent / 100))
      : null;

  return {
    provider: providerKey,
    connectionId,
    windowStartAt,
    windowResetAt,
    windowSource: window.source,
    windowStartSource: window.windowStartSource,
    quotaName: window.quotaName,
    quotaUsedPercent:
      window.quotaUsedPercent === null ? null : roundPercent(window.quotaUsedPercent),
    quotaRemainingPercent:
      window.quotaRemainingPercent === null ? null : roundPercent(window.quotaRemainingPercent),
    totalCostUsd,
    estimatedFullQuotaUsd,
    rows: breakdownRows,
  };
}
