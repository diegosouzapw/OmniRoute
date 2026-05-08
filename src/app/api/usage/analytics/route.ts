import { NextResponse } from "next/server";
import { getApiKeys } from "@/lib/db/apiKeys";
import { getDbInstance } from "@/lib/db/core";

function getRangeStartIso(range: string): string | null {
  const end = new Date();
  const start = new Date(end);

  switch (range) {
    case "1d":
      start.setDate(start.getDate() - 1);
      break;
    case "7d":
      start.setDate(start.getDate() - 7);
      break;
    case "30d":
      start.setDate(start.getDate() - 30);
      break;
    case "90d":
      start.setDate(start.getDate() - 90);
      break;
    case "ytd":
      start.setMonth(0, 1);
      start.setHours(0, 0, 0, 0);
      break;
    case "all":
    default:
      return null;
  }

  return start.toISOString();
}

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type PricingByProvider = Record<string, Record<string, Record<string, unknown>>>;
type ComputeCostFromPricing = (
  pricing: Record<string, unknown> | null | undefined,
  tokens: Record<string, number | undefined> | null | undefined,
  options?: Record<string, unknown>
) => number;

function toNumber(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

function toStringValue(value: unknown, fallback = ""): string {
  return typeof value === "string" && value.trim().length > 0 ? value : fallback;
}

function roundCost(value: number): number {
  return Math.round(value * 1_000_000) / 1_000_000;
}

function normalizeServiceTier(value: unknown): "standard" | "priority" {
  const tier = typeof value === "string" ? value.trim().toLowerCase() : "";
  return tier === "priority" || tier === "fast" ? "priority" : "standard";
}

function getServiceTierLabel(serviceTier: string): string {
  return normalizeServiceTier(serviceTier) === "priority" ? "Fast" : "Standard";
}

function appendWhereCondition(whereClause: string, condition: string): string {
  return whereClause ? `${whereClause} AND (${condition})` : `WHERE (${condition})`;
}

function findKeyInsensitive(obj: Record<string, any> | undefined | null, key: string): any {
  if (!obj || !key) return undefined;
  return obj[key.toLowerCase()];
}

function uniqueValues(values: Array<string | null | undefined>): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const value of values) {
    const normalized = typeof value === "string" ? value.trim().toLowerCase() : "";
    if (!normalized || seen.has(normalized)) continue;
    seen.add(normalized);
    result.push(normalized);
  }
  return result;
}

function makeApiKeyUsageGroup(apiKeyId: string, fallbackName: string): string {
  return apiKeyId ? `id:${apiKeyId}` : `name:${fallbackName}`;
}

function addApiKeyAlias(target: Set<string>, value: unknown): void {
  if (typeof value !== "string") return;
  const trimmed = value.trim();
  if (trimmed) target.add(trimmed);
}

function stripCodexEffortSuffix(model: string): string {
  return model.replace(/-(?:xhigh|high|medium|low|none)$/i, "");
}

function getPricingModelCandidates(
  model: string,
  normalizeModelName: (model: string) => string
): string[] {
  const normalizedModel = normalizeModelName(model);
  const lowerModel = model.toLowerCase();
  const lowerNormalized = normalizedModel.toLowerCase();
  const hyphenModel = lowerModel.replace(/\./g, "-");
  const hyphenNormalized = lowerNormalized.replace(/\./g, "-");
  const effortBaseModel = stripCodexEffortSuffix(lowerNormalized);

  return uniqueValues([
    lowerModel,
    lowerNormalized,
    hyphenModel,
    hyphenNormalized,
    effortBaseModel,
    effortBaseModel.replace(/\./g, "-"),
    lowerNormalized === "codex-auto-review" ? "gpt-5.5" : null,
  ]);
}

function resolveModelPricing(
  pricingByProvider: PricingByProvider,
  providerAliasMap: Record<string, string>,
  providerRaw: string,
  model: string,
  normalizeModelName: (model: string) => string
): Record<string, unknown> | null {
  const pLower = (providerRaw || "").toLowerCase();

  let providerPricing = findKeyInsensitive(pricingByProvider, pLower);

  if (!providerPricing) {
    // providerAliasMap maps ID -> ALIAS. So if pLower is "codex", alias is "cx".
    const alias = providerAliasMap[pLower];
    if (alias) {
      providerPricing = findKeyInsensitive(pricingByProvider, alias);
    }
  }

  if (!providerPricing) {
    // In case pLower was ALIAS and we want to try the ID (reverse search values)
    for (const [id, alias] of Object.entries(providerAliasMap)) {
      if (alias.toLowerCase() === pLower) {
        providerPricing = findKeyInsensitive(pricingByProvider, id);
        if (providerPricing) break;
      }
    }
  }

  if (!providerPricing) {
    const np = pLower.replace(/-cn$/, "");
    if (np && np !== pLower) {
      providerPricing = findKeyInsensitive(pricingByProvider, np);
    }
  }

  // Hardcoded known fallbacks
  if (!providerPricing) {
    if (pLower === "antigravity") providerPricing = findKeyInsensitive(pricingByProvider, "ag");
  }

  const modelCandidates = getPricingModelCandidates(model, normalizeModelName);

  const tryFind = (prov: Record<string, unknown> | null | undefined) => {
    if (!prov || typeof prov !== "object") return null;
    for (const candidate of modelCandidates) {
      const pricing = findKeyInsensitive(prov as Record<string, unknown>, candidate);
      if (pricing) return pricing;
    }
    return null;
  };

  let pricing = providerPricing ? tryFind(providerPricing) : null;

  if (!pricing) {
    // Global fallback: search all providers for this exact model (helps with aliases)
    for (const prov of Object.values(pricingByProvider)) {
      const found = tryFind(prov as Record<string, unknown>);
      if (found) {
        pricing = found;
        break;
      }
    }
  }

  // Last resort fallback for historical usage (e.g. "gpt-4" missing, matches "gpt-4.1" or first available)
  if (!pricing && providerPricing && typeof providerPricing === "object") {
    for (const [key, val] of Object.entries(providerPricing as Record<string, unknown>)) {
      const lm = model.toLowerCase();
      if (key.includes(lm) || lm.includes(key)) {
        pricing = val;
        break;
      }
    }
    if (!pricing) {
      const keys = Object.keys(providerPricing as Record<string, unknown>);
      if (keys.length > 0) pricing = (providerPricing as Record<string, unknown>)[keys[0]];
    }
  }

  return pricing as Record<string, unknown> | null;
}

function computeUsageRowCost(
  row: Record<string, unknown>,
  pricingByProvider: PricingByProvider,
  providerAliasMap: Record<string, string>,
  normalizeModelName: (model: string) => string,
  computeCostFromPricing: ComputeCostFromPricing
): number {
  const provider = toStringValue(row.provider);
  const model = toStringValue(row.model);
  if (!provider || !model) return 0;
  const serviceTier = normalizeServiceTier(row.serviceTier ?? row.service_tier);

  const pricing = resolveModelPricing(
    pricingByProvider,
    providerAliasMap,
    provider,
    model,
    normalizeModelName
  );
  if (!pricing) return 0;

  return computeCostFromPricing(
    pricing,
    {
      input: toNumber(row.promptTokens),
      output: toNumber(row.completionTokens),
      cacheRead: toNumber(row.cacheReadTokens),
      cacheCreation: toNumber(row.cacheCreationTokens),
      reasoning: toNumber(row.reasoningTokens),
    },
    {
      provider,
      model,
      serviceTier,
    }
  );
}

function formatUtcDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function computeActivityStreak(activityMap: Record<string, number>): number {
  const cursor = new Date();
  let streak = 0;

  while ((activityMap[formatUtcDate(cursor)] || 0) > 0) {
    streak += 1;
    cursor.setUTCDate(cursor.getUTCDate() - 1);
  }

  return streak;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const range = searchParams.get("range") || "30d";
    const startDate = searchParams.get("startDate") || undefined;
    const endDate = searchParams.get("endDate") || undefined;
    const apiKeyIdsParam = searchParams.get("apiKeyIds") || "";
    const apiKeyIds = apiKeyIdsParam ? apiKeyIdsParam.split(",").filter(Boolean) : [];

    const sinceIso = startDate || getRangeStartIso(range);
    const untilIso = endDate || null;
    const presetsParam = searchParams.get("presets");

    const db = getDbInstance();
    const apiKeys = await getApiKeys();
    const currentApiKeyNames = new Map<string, string>();
    for (const apiKey of apiKeys) {
      if (typeof apiKey.id === "string" && typeof apiKey.name === "string") {
        currentApiKeyNames.set(apiKey.id, apiKey.name);
      }
    }

    const conditions = [];
    const params: Record<string, string> = {};

    if (sinceIso) {
      conditions.push("timestamp >= @since");
      params.since = sinceIso;
    }
    if (untilIso) {
      conditions.push("timestamp <= @until");
      params.until = untilIso;
    }

    let apiKeyWhere = "";
    if (apiKeyIds.length > 0) {
      const placeholders = apiKeyIds.map((_, i) => `@apiKey${i}`);
      apiKeyIds.forEach((key, i) => {
        params[`apiKey${i}`] = key;
      });
      apiKeyWhere = `(api_key_name IN (${placeholders.join(",")}) OR api_key_id IN (${placeholders.join(",")}))`;
      conditions.push(apiKeyWhere);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    // Fetch pricing data for cost calculation (no rows loaded)
    const { getPricing } = await import("@/lib/db/settings");
    const rawPricingByProvider = (await getPricing()) as PricingByProvider;

    // Pre-process pricing data to lowercase keys for O(1) lookups
    const pricingByProvider: PricingByProvider = {};
    for (const [providerKey, providerVal] of Object.entries(rawPricingByProvider || {})) {
      const lowerProvider = {};
      for (const [modelKey, modelVal] of Object.entries(providerVal || {})) {
        (lowerProvider as any)[modelKey.toLowerCase()] = modelVal;
      }
      pricingByProvider[providerKey.toLowerCase()] = lowerProvider;
    }
    const { computeCostFromPricing, normalizeModelName } =
      await import("@/lib/usage/costCalculator");
    const { PROVIDER_ID_TO_ALIAS } = await import("@omniroute/open-sse/config/providerModels");

    const summaryRow = db
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
        FROM usage_history
        ${whereClause}
      `
      )
      .get(params) as Record<string, unknown>;

    const dailyRows = db
      .prepare(
        `
        SELECT
          DATE(timestamp) as date,
          COUNT(*) as requests,
          COALESCE(SUM(tokens_input), 0) as promptTokens,
          COALESCE(SUM(tokens_output), 0) as completionTokens,
          COALESCE(SUM(tokens_input + tokens_output), 0) as totalTokens
        FROM usage_history
        ${whereClause}
        GROUP BY DATE(timestamp)
        ORDER BY date ASC
      `
      )
      .all(params) as Array<Record<string, unknown>>;

    const dailyCostRows = db
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
        FROM usage_history
        ${whereClause}
        GROUP BY DATE(timestamp), LOWER(provider), LOWER(model), serviceTier
        ORDER BY date ASC
      `
      )
      .all(params) as Array<Record<string, unknown>>;

    const heatmapStart = new Date();
    heatmapStart.setUTCDate(heatmapStart.getUTCDate() - 364);
    // Custom date range might need a wider heatmap window
    if (startDate) {
      const customStart = new Date(startDate);
      if (customStart.getTime() < heatmapStart.getTime()) {
        heatmapStart.setTime(customStart.getTime());
      }
    }

    // Heatmap needs its own whereClause if api keys are filtered
    const heatmapConditions = ["timestamp >= @heatmapStart"];
    if (apiKeyWhere) heatmapConditions.push(apiKeyWhere);
    const heatmapParams: Record<string, string> = { heatmapStart: heatmapStart.toISOString() };
    if (apiKeyIds.length > 0) {
      apiKeyIds.forEach((key, i) => {
        heatmapParams[`apiKey${i}`] = key;
      });
    }

    const heatmapRows = db
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
      .all(heatmapParams) as Array<Record<string, unknown>>;

    const modelRows = db
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
        FROM usage_history
        ${whereClause}
        GROUP BY LOWER(model), LOWER(provider), serviceTier
        ORDER BY requests DESC
      `
      )
      .all(params) as Array<Record<string, unknown>>;

    const providerCostRows = db
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
        FROM usage_history
        ${whereClause}
        GROUP BY LOWER(provider), LOWER(model), serviceTier
      `
      )
      .all(params) as Array<Record<string, unknown>>;

    const providerRows = db
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
        FROM usage_history
        ${whereClause}
        GROUP BY LOWER(provider)
        ORDER BY requests DESC
      `
      )
      .all(params) as Array<Record<string, unknown>>;

    const accountCostRows = db
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
        ${whereClause.replace(/timestamp/g, "usage_history.timestamp").replace(/api_key_/g, "usage_history.api_key_")}
        GROUP BY account, LOWER(usage_history.provider), LOWER(usage_history.model), serviceTier
      `
      )
      .all(params) as Array<Record<string, unknown>>;

    const accountRows = db
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
        ${whereClause.replace(/timestamp/g, "usage_history.timestamp").replace(/api_key_/g, "usage_history.api_key_")}
        GROUP BY account
        ORDER BY requests DESC
        LIMIT 50
      `
      )
      .all(params) as Array<Record<string, unknown>>;

    const apiKeyWhereClause = appendWhereCondition(
      whereClause,
      "(api_key_id IS NOT NULL AND api_key_id != '') OR (api_key_name IS NOT NULL AND api_key_name != '')"
    );
    const apiKeyRows = db
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
      .all(params) as Array<Record<string, unknown>>;

    const serviceTierRows = db
      .prepare(
        `
        SELECT
          COALESCE(NULLIF(service_tier, ''), 'standard') as serviceTier,
          LOWER(provider) as provider,
          LOWER(model) as model,
          COUNT(*) as requests,
          COALESCE(SUM(tokens_input), 0) as promptTokens,
          COALESCE(SUM(tokens_output), 0) as completionTokens,
          COALESCE(SUM(tokens_cache_read), 0) as cacheReadTokens,
          COALESCE(SUM(tokens_cache_creation), 0) as cacheCreationTokens,
          COALESCE(SUM(tokens_reasoning), 0) as reasoningTokens,
          COALESCE(SUM(tokens_input + tokens_output), 0) as totalTokens
        FROM usage_history
        ${whereClause}
        GROUP BY serviceTier, LOWER(provider), LOWER(model)
      `
      )
      .all(params) as Array<Record<string, unknown>>;

    const apiKeyMetadataRows = db
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
      .all(params) as Array<Record<string, unknown>>;

    const apiKeyMetadata = new Map<string, { latestName: string; aliases: Set<string> }>();
    for (const row of apiKeyMetadataRows) {
      const apiKeyId = toStringValue(row.apiKeyId);
      const apiKeyGroupKey = toStringValue(row.apiKeyGroupKey, "unknown");
      const groupKey = makeApiKeyUsageGroup(apiKeyId, apiKeyGroupKey);
      const existing = apiKeyMetadata.get(groupKey) || {
        latestName: "",
        aliases: new Set<string>(),
      };
      const apiKeyName = toStringValue(row.apiKeyName);
      if (!existing.latestName && apiKeyName) existing.latestName = apiKeyName;
      addApiKeyAlias(existing.aliases, apiKeyName);
      apiKeyMetadata.set(groupKey, existing);
    }

    const weeklyRows = db
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
          FROM usage_history
          ${whereClause}
          GROUP BY DATE(timestamp), strftime('%w', timestamp)
        )
        GROUP BY dayOfWeek
        ORDER BY dayOfWeek ASC
      `
      )
      .all(params) as Array<Record<string, unknown>>;

    const fallbackRow = db
      .prepare(
        `
        SELECT
          SUM(CASE WHEN (combo_name IS NULL OR combo_name = '') THEN 1 ELSE 0 END) as total,
          SUM(CASE WHEN requested_model IS NOT NULL AND requested_model != '' AND (combo_name IS NULL OR combo_name = '') THEN 1 ELSE 0 END) as with_requested,
          SUM(CASE
            WHEN (combo_name IS NULL OR combo_name = '')
             AND requested_model IS NOT NULL
             AND requested_model != ''
             AND model IS NOT NULL
             AND model != ''
            THEN 1 ELSE 0 END
          ) as fallback_eligible,
          SUM(CASE
            WHEN (combo_name IS NULL OR combo_name = '')
             AND requested_model IS NOT NULL
             AND requested_model != ''
             AND model IS NOT NULL
             AND model != ''
             AND LOWER(CASE WHEN instr(requested_model, '/') > 0 THEN substr(requested_model, instr(requested_model, '/') + 1) ELSE requested_model END) != LOWER(model)
            THEN 1 ELSE 0 END
          ) as fallbacks
        FROM call_logs
        ${whereClause}
      `
      )
      .get(params) as Record<string, unknown>;

    const summary = {
      totalRequests: Number(summaryRow?.totalRequests || 0),
      promptTokens: Number(summaryRow?.promptTokens || 0),
      completionTokens: Number(summaryRow?.completionTokens || 0),
      totalTokens: Number(summaryRow?.totalTokens || 0),
      uniqueModels: Number(summaryRow?.uniqueModels || 0),
      uniqueAccounts: Number(summaryRow?.uniqueAccounts || 0),
      uniqueApiKeys: Number(summaryRow?.uniqueApiKeys || 0),
      successfulRequests: Number(summaryRow?.successfulRequests || 0),
      successRatePct:
        Number(summaryRow?.totalRequests || 0) > 0
          ? Number(
              (
                (Number(summaryRow?.successfulRequests || 0) /
                  Number(summaryRow?.totalRequests || 1)) *
                100
              ).toFixed(2)
            )
          : 0,
      avgLatencyMs: Math.round(Number(summaryRow?.avgLatencyMs || 0)),
      totalCost: 0,
      firstRequest: summaryRow?.firstRequest || "",
      lastRequest: summaryRow?.lastRequest || "",
      fallbackCount: Number(fallbackRow?.fallbacks || 0),
      fastRequests: 0,
      standardRequests: 0,
      fastCost: 0,
      standardCost: 0,
      fastRequestSharePct: 0,
      fallbackRatePct:
        Number(fallbackRow?.fallback_eligible || 0) > 0
          ? Number(
              (
                (Number(fallbackRow?.fallbacks || 0) /
                  Number(fallbackRow?.fallback_eligible || 1)) *
                100
              ).toFixed(2)
            )
          : 0,
      requestedModelCoveragePct:
        Number(fallbackRow?.total || 0) > 0
          ? Number(
              (
                (Number(fallbackRow?.with_requested || 0) / Number(fallbackRow?.total || 1)) *
                100
              ).toFixed(2)
            )
          : 0,
      streak: 0,
    };

    const dailyByModelMap: Record<string, Record<string, number>> = {};
    const allModels = new Set<string>();

    const dailyCostByDate = new Map<string, number>();
    for (const row of dailyCostRows) {
      const date = toStringValue(row.date);
      if (!date) continue;

      // Calculate costs
      const cost = computeUsageRowCost(
        row,
        pricingByProvider,
        PROVIDER_ID_TO_ALIAS,
        normalizeModelName,
        computeCostFromPricing
      );
      dailyCostByDate.set(date, (dailyCostByDate.get(date) || 0) + cost);

      // Group tokens by model for the day
      const model = normalizeModelName(row.model as string);
      const tokens = Number(row.promptTokens) + Number(row.completionTokens);

      if (!dailyByModelMap[date]) dailyByModelMap[date] = {};
      dailyByModelMap[date][model] = (dailyByModelMap[date][model] || 0) + tokens;
      allModels.add(model);
    }

    const dailyTrend = dailyRows.map((row) => ({
      date: row.date,
      requests: Number(row.requests),
      promptTokens: Number(row.promptTokens),
      completionTokens: Number(row.completionTokens),
      totalTokens: Number(row.totalTokens),
      cost: roundCost(dailyCostByDate.get(toStringValue(row.date)) || 0),
    }));

    const activityMap: Record<string, number> = {};
    for (const row of heatmapRows) {
      activityMap[row.date as string] = Number(row.totalTokens);
    }
    summary.streak = computeActivityStreak(activityMap);

    const modelMap = new Map<string, Record<string, unknown>>();
    for (const row of modelRows) {
      const model = row.model as string;
      const provider = row.provider as string;
      const short = normalizeModelName(model);
      const cost = computeUsageRowCost(
        row,
        pricingByProvider,
        PROVIDER_ID_TO_ALIAS,
        normalizeModelName,
        computeCostFromPricing
      );
      const key = `${provider}::${model}`;
      const existing = modelMap.get(key) || {
        model: short,
        provider,
        rawModel: model,
        requests: 0,
        promptTokens: 0,
        completionTokens: 0,
        totalTokens: 0,
        latencyWeightedTotal: 0,
        successfulRequests: 0,
        lastUsed: "",
        cost: 0,
      };
      const requests = Number(row.requests) || 0;
      existing.requests = Number(existing.requests || 0) + requests;
      existing.promptTokens = Number(existing.promptTokens || 0) + Number(row.promptTokens || 0);
      existing.completionTokens =
        Number(existing.completionTokens || 0) + Number(row.completionTokens || 0);
      existing.totalTokens = Number(existing.totalTokens || 0) + Number(row.totalTokens || 0);
      existing.latencyWeightedTotal =
        Number(existing.latencyWeightedTotal || 0) + Number(row.avgLatencyMs || 0) * requests;
      existing.successfulRequests =
        Number(existing.successfulRequests || 0) + Number(row.successfulRequests || 0);
      if (!existing.lastUsed || String(row.lastUsed || "") > String(existing.lastUsed || "")) {
        existing.lastUsed = row.lastUsed;
      }
      existing.cost = Number(existing.cost || 0) + cost;
      modelMap.set(key, existing);
    }

    const byModel = Array.from(modelMap.values())
      .map((row) => ({
        model: row.model,
        provider: row.provider,
        rawModel: row.rawModel,
        requests: Number(row.requests),
        promptTokens: Number(row.promptTokens),
        completionTokens: Number(row.completionTokens),
        totalTokens: Number(row.totalTokens),
        avgLatencyMs:
          Number(row.requests) > 0
            ? Math.round(Number(row.latencyWeightedTotal || 0) / Number(row.requests))
            : 0,
        successRatePct:
          Number(row.requests) > 0
            ? Number((Number(row.successfulRequests || 0) / Number(row.requests)) * 100).toFixed(2)
            : 0,
        lastUsed: row.lastUsed,
        cost: roundCost(Number(row.cost || 0)),
      }))
      .sort((left, right) => Number(right.requests) - Number(left.requests))
      .slice(0, 50);

    const totalCost = Array.from(dailyCostByDate.values()).reduce((sum, cost) => sum + cost, 0);
    summary.totalCost = roundCost(totalCost);

    const providerCostByProvider = new Map<string, number>();
    for (const row of providerCostRows) {
      const provider = toStringValue(row.provider);
      if (!provider) continue;
      const cost = computeUsageRowCost(
        row,
        pricingByProvider,
        PROVIDER_ID_TO_ALIAS,
        normalizeModelName,
        computeCostFromPricing
      );
      providerCostByProvider.set(provider, (providerCostByProvider.get(provider) || 0) + cost);
    }

    const byProvider = providerRows.map((row) => ({
      provider: row.provider,
      requests: Number(row.requests),
      promptTokens: Number(row.promptTokens),
      completionTokens: Number(row.completionTokens),
      totalTokens: Number(row.totalTokens),
      avgLatencyMs: Math.round(Number(row.avgLatencyMs)),
      successRatePct:
        Number(row.requests) > 0
          ? Number((Number(row.successfulRequests) / Number(row.requests)) * 100).toFixed(2)
          : 0,
      cost: roundCost(providerCostByProvider.get(toStringValue(row.provider)) || 0),
    }));

    const accountCostByAccount = new Map<string, number>();
    for (const row of accountCostRows) {
      const account = toStringValue(row.account, "unknown");
      const cost = computeUsageRowCost(
        row,
        pricingByProvider,
        PROVIDER_ID_TO_ALIAS,
        normalizeModelName,
        computeCostFromPricing
      );
      accountCostByAccount.set(account, (accountCostByAccount.get(account) || 0) + cost);
    }

    const byAccount = accountRows.map((row) => ({
      account: toStringValue(row.account, "unknown"),
      requests: Number(row.requests),
      promptTokens: Number(row.promptTokens),
      completionTokens: Number(row.completionTokens),
      totalTokens: Number(row.totalTokens),
      avgLatencyMs: Math.round(Number(row.avgLatencyMs)),
      lastUsed: row.lastUsed,
      cost: roundCost(accountCostByAccount.get(toStringValue(row.account, "unknown")) || 0),
    }));

    const apiKeyMap = new Map<
      string,
      {
        apiKey: string;
        apiKeyId: string | null;
        apiKeyName: string;
        historicalApiKeyNames: string[];
        requests: number;
        promptTokens: number;
        completionTokens: number;
        totalTokens: number;
        cost: number;
      }
    >();
    for (const row of apiKeyRows) {
      const apiKeyId = toStringValue(row.apiKeyId);
      const apiKeyGroupKey = toStringValue(row.apiKeyGroupKey, "unknown");
      const key = makeApiKeyUsageGroup(apiKeyId, apiKeyGroupKey);
      const metadata = apiKeyMetadata.get(key);
      const apiKeyName =
        (apiKeyId ? currentApiKeyNames.get(apiKeyId) : undefined) ||
        metadata?.latestName ||
        apiKeyId ||
        apiKeyGroupKey ||
        "Unknown API key";
      const existing = apiKeyMap.get(key) || {
        apiKey: apiKeyId && apiKeyName !== apiKeyId ? `${apiKeyName} (${apiKeyId})` : apiKeyName,
        apiKeyId: apiKeyId || null,
        apiKeyName,
        historicalApiKeyNames: Array.from(metadata?.aliases || []),
        requests: 0,
        promptTokens: 0,
        completionTokens: 0,
        totalTokens: 0,
        cost: 0,
      };

      existing.requests += Number(row.requests);
      existing.promptTokens += Number(row.promptTokens);
      existing.completionTokens += Number(row.completionTokens);
      existing.totalTokens += Number(row.totalTokens);
      existing.cost += computeUsageRowCost(
        row,
        pricingByProvider,
        PROVIDER_ID_TO_ALIAS,
        normalizeModelName,
        computeCostFromPricing
      );
      apiKeyMap.set(key, existing);
    }
    const byApiKey = Array.from(apiKeyMap.values())
      .map((row) => ({ ...row, cost: roundCost(row.cost) }))
      .sort((left, right) => right.cost - left.cost);

    const serviceTierMap = new Map<
      string,
      {
        serviceTier: "standard" | "priority";
        label: string;
        requests: number;
        promptTokens: number;
        completionTokens: number;
        totalTokens: number;
        cost: number;
      }
    >();
    for (const row of serviceTierRows) {
      const serviceTier = normalizeServiceTier(row.serviceTier);
      const existing = serviceTierMap.get(serviceTier) || {
        serviceTier,
        label: getServiceTierLabel(serviceTier),
        requests: 0,
        promptTokens: 0,
        completionTokens: 0,
        totalTokens: 0,
        cost: 0,
      };
      existing.requests += Number(row.requests || 0);
      existing.promptTokens += Number(row.promptTokens || 0);
      existing.completionTokens += Number(row.completionTokens || 0);
      existing.totalTokens += Number(row.totalTokens || 0);
      existing.cost += computeUsageRowCost(
        row,
        pricingByProvider,
        PROVIDER_ID_TO_ALIAS,
        normalizeModelName,
        computeCostFromPricing
      );
      serviceTierMap.set(serviceTier, existing);
    }
    const byServiceTier = Array.from(serviceTierMap.values())
      .map((row) => ({ ...row, cost: roundCost(row.cost) }))
      .sort((left, right) => (left.serviceTier === "priority" ? -1 : 1));
    const fastTier = serviceTierMap.get("priority");
    const standardTier = serviceTierMap.get("standard");
    summary.fastRequests = fastTier?.requests || 0;
    summary.fastCost = roundCost(fastTier?.cost || 0);
    summary.standardRequests = standardTier?.requests || 0;
    summary.standardCost = roundCost(standardTier?.cost || 0);
    summary.fastRequestSharePct =
      summary.totalRequests > 0
        ? Number(((Number(summary.fastRequests) / Number(summary.totalRequests)) * 100).toFixed(2))
        : 0;

    const weeklyTokens = [0, 0, 0, 0, 0, 0, 0];
    const weeklyCounts = [0, 0, 0, 0, 0, 0, 0];
    const weeklyPattern = WEEKDAY_LABELS.map((day) => ({
      day,
      avgTokens: 0,
      totalTokens: 0,
    }));
    for (const row of weeklyRows) {
      const dayIdx = Number(row.dayOfWeek);
      if (dayIdx >= 0 && dayIdx <= 6) {
        const totalTokens = Number(row.totalTokens);
        const days = Number(row.days);
        weeklyTokens[dayIdx] = totalTokens;
        weeklyCounts[dayIdx] = Number(row.requests);
        weeklyPattern[dayIdx] = {
          day: WEEKDAY_LABELS[dayIdx],
          avgTokens: days > 0 ? Math.round(totalTokens / days) : 0,
          totalTokens,
        };
      }
    }

    const dailyByModel = Object.keys(dailyByModelMap)
      .sort()
      .map((date) => ({ date, ...dailyByModelMap[date] }));
    const modelNames = Array.from(allModels);

    const analytics = {
      summary,
      dailyTrend,
      activityMap,
      byModel,
      byProvider,
      byApiKey,
      byAccount,
      byServiceTier,
      weeklyPattern,
      weeklyTokens,
      weeklyCounts,
      dailyByModel,
      modelNames,
      range,
    } as any;

    if (presetsParam) {
      const allowedRanges = new Set(["1d", "7d", "30d", "90d", "ytd", "all"]);
      const presetRanges = presetsParam
        .split(",")
        .map((preset) => preset.trim())
        .filter((preset) => allowedRanges.has(preset));
      const presetSummaries: Record<string, { totalCost: number }> = {};

      for (const presetRange of presetRanges) {
        if (presetRange === range) {
          presetSummaries[presetRange] = {
            totalCost: Number(analytics.summary?.totalCost || 0),
          };
          continue;
        }

        const presetSinceIso = getRangeStartIso(presetRange);
        const presetConditions = [];
        const presetParams: Record<string, string> = {};
        if (presetSinceIso) {
          presetConditions.push("timestamp >= @presetSince");
          presetParams.presetSince = presetSinceIso;
        }
        if (apiKeyWhere) {
          presetConditions.push(apiKeyWhere);
          Object.assign(presetParams, params);
        }

        const presetWhere =
          presetConditions.length > 0 ? `WHERE ${presetConditions.join(" AND ")}` : "";

        const presetModelRows = db
          .prepare(
            `
            SELECT
              LOWER(model) as model,
              LOWER(provider) as provider,
              COALESCE(SUM(tokens_input), 0) as promptTokens,
              COALESCE(SUM(tokens_output), 0) as completionTokens,
              COALESCE(SUM(tokens_cache_read), 0) as cacheReadTokens,
              COALESCE(SUM(tokens_cache_creation), 0) as cacheCreationTokens,
              COALESCE(SUM(tokens_reasoning), 0) as reasoningTokens
            FROM usage_history
            ${presetWhere}
            GROUP BY LOWER(model), LOWER(provider)
          `
          )
          .all(presetParams) as Array<Record<string, unknown>>;

        let presetTotalCost = 0;
        for (const row of presetModelRows) {
          presetTotalCost += computeUsageRowCost(
            row,
            pricingByProvider,
            PROVIDER_ID_TO_ALIAS,
            normalizeModelName,
            computeCostFromPricing
          );
        }

        presetSummaries[presetRange] = {
          totalCost: roundCost(presetTotalCost),
        };
      }

      analytics.presetSummaries = presetSummaries;
    }

    return NextResponse.json(analytics);
  } catch (error) {
    console.error("Error computing analytics:", error);
    return NextResponse.json({ error: "Failed to compute analytics" }, { status: 500 });
  }
}
