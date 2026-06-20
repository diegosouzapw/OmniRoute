import { getDbInstance } from "@/lib/db/core";
import type { ProviderLimitsCacheEntry } from "@/lib/db/providerLimits";
import { calculateCost } from "./costCalculator";
import { buildErrorBody, sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

const FORTALEZA_UTC_OFFSET_MS = 3 * 60 * 60 * 1000;
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

export interface ApiKeyUsageLimitMetadata {
  id: string;
  allowedConnections?: string[] | null;
  usageLimitEnabled?: boolean;
  dailyUsageLimitUsd?: number | null;
  weeklyUsageLimitUsd?: number | null;
}

export interface ApiKeyUsageLimitStatus {
  enabled: boolean;
  dailyLimitUsd: number | null;
  weeklyLimitUsd: number | null;
  dailySpentUsd: number;
  weeklySpentUsd: number;
  dailyWindowStartIso: string;
  weeklyWindowStartIso: string;
  weeklyResetAtIso: string | null;
  dailyExceeded: boolean;
  weeklyExceeded: boolean;
}

export interface ApiKeyUsageLimitDeps {
  now?: () => number;
  getProviderConnectionById?: (connectionId: string) => Promise<unknown>;
  getProviderConnections?: (filter?: Record<string, unknown>) => Promise<unknown[]>;
  getProviderLimitsCache?: (connectionId: string) => ProviderLimitsCacheEntry | null;
  getAllProviderLimitsCache?: () => Record<string, ProviderLimitsCacheEntry>;
}

interface UsageCostRow {
  provider: string | null;
  model: string | null;
  serviceTier: string | null;
  promptTokens: number | null;
  completionTokens: number | null;
  cacheReadTokens: number | null;
  cacheCreationTokens: number | null;
  reasoningTokens: number | null;
}

function toNumber(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function normalizeLimitUsd(value: unknown): number | null {
  const numeric = toNumber(value);
  return numeric > 0 ? numeric : null;
}

function roundUsd(value: number): number {
  return Math.round(value * 1_000_000) / 1_000_000;
}

function formatUsd(value: number | null): string {
  if (value === null || !Number.isFinite(value)) return "Not configured";
  return `$${value.toFixed(2)}`;
}

export function getFortalezaDayStartIso(nowMs = Date.now()): string {
  const fortalezaLocal = new Date(nowMs - FORTALEZA_UTC_OFFSET_MS);
  return new Date(
    Date.UTC(
      fortalezaLocal.getUTCFullYear(),
      fortalezaLocal.getUTCMonth(),
      fortalezaLocal.getUTCDate(),
      3,
      0,
      0,
      0
    )
  ).toISOString();
}

export function getRollingWeekStartIso(nowMs = Date.now()): string {
  return new Date(nowMs - WEEK_MS).toISOString();
}

function normalizeQuotaName(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function findWeeklyQuotaResetAt(quotas: unknown, nowMs: number): string | null {
  const quotaEntries: Array<[string, Record<string, unknown>]> = [];
  if (Array.isArray(quotas)) {
    for (const item of quotas) {
      const quota = asRecord(item);
      if (!quota) continue;
      const name = typeof quota.name === "string" ? quota.name : "";
      quotaEntries.push([name, quota]);
    }
  } else {
    const quotaMap = asRecord(quotas);
    if (quotaMap) {
      for (const [name, value] of Object.entries(quotaMap)) {
        const quota = asRecord(value);
        if (quota) quotaEntries.push([name, quota]);
      }
    }
  }

  for (const [name, quota] of quotaEntries) {
    const label = normalizeQuotaName(`${name} ${typeof quota.name === "string" ? quota.name : ""}`);
    if (!label) continue;
    const isWeekly = label.includes("weekly") || label.includes("7d");
    if (!isWeekly || label.includes("sonnet")) continue;
    const resetAt = typeof quota.resetAt === "string" && quota.resetAt.trim() ? quota.resetAt : "";
    const resetMs = Date.parse(resetAt);
    if (Number.isFinite(resetMs) && resetMs > nowMs) {
      return new Date(resetMs).toISOString();
    }
  }

  return null;
}

function connectionFromValue(value: unknown): { id: string; provider: string } | null {
  const record = asRecord(value);
  if (!record) return null;
  const id = typeof record.id === "string" ? record.id : "";
  const provider = typeof record.provider === "string" ? record.provider : "";
  if (!id || !provider || record.isActive === false) return null;
  return { id, provider };
}

async function resolveDeps(deps: ApiKeyUsageLimitDeps): Promise<Required<ApiKeyUsageLimitDeps>> {
  const providers =
    deps.getProviderConnectionById && deps.getProviderConnections
      ? null
      : await import("@/lib/db/providers");
  const providerLimits =
    deps.getProviderLimitsCache && deps.getAllProviderLimitsCache
      ? null
      : await import("@/lib/db/providerLimits");

  return {
    now: deps.now ?? Date.now,
    getProviderConnectionById:
      deps.getProviderConnectionById ?? providers!.getProviderConnectionById,
    getProviderConnections: deps.getProviderConnections ?? providers!.getProviderConnections,
    getProviderLimitsCache: deps.getProviderLimitsCache ?? providerLimits!.getProviderLimitsCache,
    getAllProviderLimitsCache:
      deps.getAllProviderLimitsCache ?? providerLimits!.getAllProviderLimitsCache,
  };
}

async function getProviderWeeklyResetAt(
  metadata: ApiKeyUsageLimitMetadata,
  deps: Required<ApiKeyUsageLimitDeps>,
  nowMs: number
): Promise<string | null> {
  const allowedConnections = Array.isArray(metadata.allowedConnections)
    ? metadata.allowedConnections.filter((id) => typeof id === "string" && id.trim())
    : [];

  const resetCandidates: string[] = [];
  if (allowedConnections.length > 0) {
    for (const connectionId of allowedConnections) {
      const connection = connectionFromValue(await deps.getProviderConnectionById(connectionId));
      if (!connection || connection.provider.toLowerCase() !== "claude") continue;
      const resetAt = findWeeklyQuotaResetAt(
        deps.getProviderLimitsCache(connection.id)?.quotas,
        nowMs
      );
      if (resetAt) resetCandidates.push(resetAt);
    }
  } else {
    const caches = deps.getAllProviderLimitsCache();
    const connections = await deps.getProviderConnections({ isActive: true });
    for (const rawConnection of connections) {
      const connection = connectionFromValue(rawConnection);
      if (!connection || connection.provider.toLowerCase() !== "claude") continue;
      const resetAt = findWeeklyQuotaResetAt(caches[connection.id]?.quotas, nowMs);
      if (resetAt) resetCandidates.push(resetAt);
    }
  }

  return resetCandidates.sort((left, right) => Date.parse(left) - Date.parse(right)).at(0) ?? null;
}

async function getApiKeyUsdSpendSince(apiKeyId: string, sinceIso: string): Promise<number> {
  if (!apiKeyId) return 0;
  const db = getDbInstance();
  const rows = db
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
      WHERE api_key_id = @apiKeyId
        AND timestamp >= @sinceIso
        AND success = 1
      GROUP BY LOWER(provider), LOWER(model), serviceTier
    `
    )
    .all({ apiKeyId, sinceIso }) as UsageCostRow[];

  let total = 0;
  for (const row of rows) {
    const provider = typeof row.provider === "string" ? row.provider : "";
    const model = typeof row.model === "string" ? row.model : "";
    if (!provider || !model) continue;

    total += await calculateCost(
      provider,
      model,
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
        serviceTier: row.serviceTier || "standard",
      }
    );
  }

  return roundUsd(total);
}

export async function getApiKeyUsageLimitStatus(
  metadata: ApiKeyUsageLimitMetadata,
  deps: ApiKeyUsageLimitDeps = {}
): Promise<ApiKeyUsageLimitStatus> {
  const resolvedDeps = await resolveDeps(deps);
  const now = resolvedDeps.now();
  const dailyWindowStartIso = getFortalezaDayStartIso(now);
  const weeklyResetAtIso = await getProviderWeeklyResetAt(metadata, resolvedDeps, now);
  const weeklyWindowStartIso = weeklyResetAtIso
    ? new Date(Date.parse(weeklyResetAtIso) - WEEK_MS).toISOString()
    : getRollingWeekStartIso(now);
  const dailyLimitUsd = normalizeLimitUsd(metadata.dailyUsageLimitUsd);
  const weeklyLimitUsd = normalizeLimitUsd(metadata.weeklyUsageLimitUsd);
  const enabled = metadata.usageLimitEnabled === true;

  const [dailySpentUsd, weeklySpentUsd] = await Promise.all([
    getApiKeyUsdSpendSince(metadata.id, dailyWindowStartIso),
    getApiKeyUsdSpendSince(metadata.id, weeklyWindowStartIso),
  ]);

  return {
    enabled,
    dailyLimitUsd,
    weeklyLimitUsd,
    dailySpentUsd,
    weeklySpentUsd,
    dailyWindowStartIso,
    weeklyWindowStartIso,
    weeklyResetAtIso,
    dailyExceeded: enabled && dailyLimitUsd !== null && dailySpentUsd >= dailyLimitUsd,
    weeklyExceeded: enabled && weeklyLimitUsd !== null && weeklySpentUsd >= weeklyLimitUsd,
  };
}

export function buildApiKeyUsageLimitText(status: ApiKeyUsageLimitStatus): string {
  return [
    "Cota diaria",
    formatUsd(status.dailyLimitUsd),
    "Gasto diario",
    formatUsd(status.dailySpentUsd),
    "",
    "Cota semanal",
    formatUsd(status.weeklyLimitUsd),
    "Gasto semanal",
    formatUsd(status.weeklySpentUsd),
  ].join("\n");
}

function buildUsageLimitExceededMessage(status: ApiKeyUsageLimitStatus): string {
  if (status.dailyExceeded && status.dailyLimitUsd !== null) {
    return `This API key reached its daily USD usage quota (${formatUsd(status.dailySpentUsd)} of ${formatUsd(status.dailyLimitUsd)}). Choose another allowed model or wait for quota reset.`;
  }
  if (status.weeklyExceeded && status.weeklyLimitUsd !== null) {
    return `This API key reached its weekly USD usage quota (${formatUsd(status.weeklySpentUsd)} of ${formatUsd(status.weeklyLimitUsd)}). Choose another allowed model or wait for quota reset.`;
  }
  return "This API key reached its USD usage quota. Choose another allowed model or wait for quota reset.";
}

function isAnthropicMessagesRequest(request: Request): boolean {
  if (request.headers.has("anthropic-version")) return true;
  try {
    return new URL(request.url).pathname.endsWith("/v1/messages");
  } catch {
    return false;
  }
}

export function buildApiKeyUsageLimitRejection(
  request: Request,
  status: ApiKeyUsageLimitStatus
): Response {
  const message = sanitizeErrorMessage(buildUsageLimitExceededMessage(status));
  if (isAnthropicMessagesRequest(request)) {
    return new Response(
      JSON.stringify({
        type: "error",
        error: {
          type: "invalid_request_error",
          message,
        },
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  return new Response(JSON.stringify(buildErrorBody(400, message)), {
    status: 400,
    headers: { "Content-Type": "application/json" },
  });
}

export async function buildApiKeyUsageLimitPolicyRejection(
  request: Request,
  metadata: ApiKeyUsageLimitMetadata
): Promise<Response | null> {
  const status = await getApiKeyUsageLimitStatus(metadata);
  if (!status.enabled || (!status.dailyExceeded && !status.weeklyExceeded)) return null;
  return buildApiKeyUsageLimitRejection(request, status);
}
