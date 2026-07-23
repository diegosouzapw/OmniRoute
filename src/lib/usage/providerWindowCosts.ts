import { getCostSummary } from "@/domain/costRules";
import { getApiKeys } from "@/lib/db/apiKeys";
import { getDbInstance } from "@/lib/db/core";
import { getAllProviderLimitsCache, getProviderLimitsCache } from "@/lib/db/providerLimits";
import { getProviderQuotaWindowStart } from "@/lib/db/quotaResetEvents";
import { calculateCost } from "@/lib/usage/costCalculator";

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const RECORDED_COST_MATCH_TOLERANCE_MS = 30_000;

type JsonRecord = Record<string, unknown>;

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

function uniqueApiKeyIds(rows: UsageCostRow[]): string[] {
  return Array.from(
    new Set(
      rows
        .map((row) => (typeof row.apiKeyId === "string" ? row.apiKeyId : ""))
        .filter((value) => value.length > 0)
    )
  );
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

  const usageRows = getDbInstance()
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
      WHERE ${where.join(" AND ")}
      ORDER BY timestamp ASC, id ASC
      `
    )
    .all(params);

  const currentApiKeyNames = await getCurrentApiKeyNames();
  const recordedCostsByApiKey = getRecordedCostsByApiKey(
    uniqueApiKeyIds(usageRows),
    window.startMs,
    nowMs
  );
  const usedRecordedRows = new Set<number>();
  const byApiKey = new Map<string, ProviderWindowCostAggregateRow>();

  for (const row of usageRows) {
    const apiKeyId = row.apiKeyId || null;
    const apiKeyName = row.apiKeyName || null;
    const apiKeyKey = makeApiKeyKey(apiKeyId, apiKeyName);
    const displayName =
      (apiKeyId ? currentApiKeyNames.get(apiKeyId) : null) ||
      apiKeyName ||
      apiKeyId ||
      "Unattributed";
    const costUsd = roundUsd(
      await getUsageRowCostUsd(row, recordedCostsByApiKey, usedRecordedRows)
    );

    let aggregate = byApiKey.get(apiKeyKey);
    if (!aggregate) {
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
      aggregate = {
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
      byApiKey.set(apiKeyKey, aggregate);
    }

    aggregate.requests += 1;
    aggregate.promptTokens += toNumber(row.promptTokens);
    aggregate.completionTokens += toNumber(row.completionTokens);
    aggregate.totalTokens += toNumber(row.totalTokens);
    aggregate.costUsd = roundUsd(aggregate.costUsd + costUsd);
    if (!aggregate.lastUsed || (row.timestamp && row.timestamp > aggregate.lastUsed)) {
      aggregate.lastUsed = row.timestamp || aggregate.lastUsed;
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
    model.requests += 1;
    model.totalTokens += toNumber(row.totalTokens);
    model.costUsd = roundUsd(model.costUsd + costUsd);
    aggregate.modelMap.set(modelKey, model);
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
