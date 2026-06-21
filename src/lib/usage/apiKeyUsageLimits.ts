import { getDbInstance } from "@/lib/db/core";
import type { ProviderLimitsCacheEntry } from "@/lib/db/providerLimits";
import { calculateCost } from "./costCalculator";
import { buildErrorBody, sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

const FORTALEZA_UTC_OFFSET_MS = 3 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;
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
  dailyResetAtIso: string;
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

interface WeeklyResetCandidate {
  connectionId: string;
  resetAtIso: string;
  observedWindowStartIso: string | null;
}

interface QuotaSnapshotRow {
  remainingPercentage: number | null;
  nextResetAt: string | null;
  createdAt: string | null;
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

function clampPercent(value: number): number {
  return Math.max(0, Math.min(100, value));
}

function formatUsd(value: number | null): string {
  if (value === null || !Number.isFinite(value)) return "Not configured";
  return `$${value.toFixed(2)}`;
}

function getUsagePercent(spentUsd: number, limitUsd: number | null): number | null {
  if (limitUsd === null || !Number.isFinite(limitUsd) || limitUsd <= 0) return null;
  return (spentUsd / limitUsd) * 100;
}

function formatUsagePercent(percent: number | null): string {
  if (percent === null || !Number.isFinite(percent)) return "Unavailable";
  return `${Math.round(percent)}%`;
}

function formatResetIn(resetAt: string | null, now = Date.now()): string {
  if (!resetAt) return "unknown";
  const resetMs = Date.parse(resetAt);
  if (!Number.isFinite(resetMs)) return "unknown";

  const deltaMs = resetMs - now;
  if (deltaMs <= 0) return "now";

  const minuteMs = 60_000;
  const hourMs = 60 * minuteMs;
  const dayMs = 24 * hourMs;

  if (deltaMs < hourMs) return `${Math.max(1, Math.ceil(deltaMs / minuteMs))}m`;
  if (deltaMs < dayMs) return `${Math.max(1, Math.ceil(deltaMs / hourMs))}h`;
  return `${Math.max(1, Math.ceil(deltaMs / dayMs))}d`;
}

function resetDay(value: string | null): string | null {
  if (!value) return null;
  const parsed = Date.parse(value);
  if (!Number.isFinite(parsed)) return null;
  return new Date(parsed).toISOString().slice(0, 10);
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

export function getFortalezaDayResetIso(nowMs = Date.now()): string {
  return new Date(Date.parse(getFortalezaDayStartIso(nowMs)) + DAY_MS).toISOString();
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

function isWeeklyQuotaResetSnapshot(row: QuotaSnapshotRow, targetResetAtIso: string): boolean {
  const targetDay = resetDay(targetResetAtIso);
  if (!targetDay) return false;
  return resetDay(row.nextResetAt) === targetDay;
}

function getObservedWeeklyWindowStartIso(
  connectionId: string,
  targetResetAtIso: string,
  nowMs: number
): string | null {
  if (!connectionId || !targetResetAtIso) return null;

  try {
    const rows = getDbInstance()
      .prepare(
        `
        SELECT
          remaining_percentage as remainingPercentage,
          next_reset_at as nextResetAt,
          created_at as createdAt
        FROM quota_snapshots
        WHERE connection_id = @connectionId
          AND LOWER(window_key) LIKE '%weekly%'
          AND LOWER(window_key) NOT LIKE '%sonnet%'
          AND created_at <= @nowIso
        ORDER BY created_at ASC, id ASC
      `
      )
      .all({ connectionId, nowIso: new Date(nowMs).toISOString() }) as QuotaSnapshotRow[];

    let observedStartIso: string | null = null;
    let previousUsedPercent: number | null = null;

    for (const row of rows) {
      if (!row.createdAt || !isWeeklyQuotaResetSnapshot(row, targetResetAtIso)) continue;
      const remaining = toNumber(row.remainingPercentage);
      const usedPercent = clampPercent(100 - remaining);

      if (!observedStartIso) {
        observedStartIso = row.createdAt;
      } else if (previousUsedPercent !== null) {
        const droppedToResetFloor = usedPercent <= 1 && previousUsedPercent > usedPercent;
        const significantDrop = previousUsedPercent - usedPercent >= 5;
        if (droppedToResetFloor || significantDrop) {
          observedStartIso = row.createdAt;
        }
      }

      previousUsedPercent = usedPercent;
    }

    return observedStartIso;
  } catch {
    return null;
  }
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

async function getProviderWeeklyWindow(
  metadata: ApiKeyUsageLimitMetadata,
  deps: Required<ApiKeyUsageLimitDeps>,
  nowMs: number
): Promise<{ resetAtIso: string | null; windowStartIso: string | null }> {
  const allowedConnections = Array.isArray(metadata.allowedConnections)
    ? metadata.allowedConnections.filter((id) => typeof id === "string" && id.trim())
    : [];

  const resetCandidates: WeeklyResetCandidate[] = [];
  if (allowedConnections.length > 0) {
    for (const connectionId of allowedConnections) {
      const connection = connectionFromValue(await deps.getProviderConnectionById(connectionId));
      if (!connection || connection.provider.toLowerCase() !== "claude") continue;
      const resetAt = findWeeklyQuotaResetAt(
        deps.getProviderLimitsCache(connection.id)?.quotas,
        nowMs
      );
      if (resetAt) {
        resetCandidates.push({
          connectionId: connection.id,
          resetAtIso: resetAt,
          observedWindowStartIso: getObservedWeeklyWindowStartIso(connection.id, resetAt, nowMs),
        });
      }
    }
  } else {
    const caches = deps.getAllProviderLimitsCache();
    const connections = await deps.getProviderConnections({ isActive: true });
    for (const rawConnection of connections) {
      const connection = connectionFromValue(rawConnection);
      if (!connection || connection.provider.toLowerCase() !== "claude") continue;
      const resetAt = findWeeklyQuotaResetAt(caches[connection.id]?.quotas, nowMs);
      if (resetAt) {
        resetCandidates.push({
          connectionId: connection.id,
          resetAtIso: resetAt,
          observedWindowStartIso: getObservedWeeklyWindowStartIso(connection.id, resetAt, nowMs),
        });
      }
    }
  }

  const selected =
    resetCandidates
      .sort((left, right) => Date.parse(left.resetAtIso) - Date.parse(right.resetAtIso))
      .at(0) ?? null;
  return {
    resetAtIso: selected?.resetAtIso ?? null,
    windowStartIso: selected?.observedWindowStartIso ?? null,
  };
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
  const dailyResetAtIso = getFortalezaDayResetIso(now);
  const weeklyWindow = await getProviderWeeklyWindow(metadata, resolvedDeps, now);
  const weeklyResetAtIso = weeklyWindow.resetAtIso;
  const weeklyWindowStartIso = weeklyWindow.windowStartIso
    ? weeklyWindow.windowStartIso
    : weeklyResetAtIso
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
    dailyResetAtIso,
    weeklyWindowStartIso,
    weeklyResetAtIso,
    dailyExceeded: enabled && dailyLimitUsd !== null && dailySpentUsd >= dailyLimitUsd,
    weeklyExceeded: enabled && weeklyLimitUsd !== null && weeklySpentUsd >= weeklyLimitUsd,
  };
}

export function buildApiKeyUsageLimitText(
  status: ApiKeyUsageLimitStatus,
  now = Date.now()
): string {
  return [
    "Cota diaria",
    formatUsd(status.dailyLimitUsd),
    "Gasto diario",
    formatUsd(status.dailySpentUsd),
    "Uso diario",
    formatUsagePercent(getUsagePercent(status.dailySpentUsd, status.dailyLimitUsd)),
    `Resets in ${formatResetIn(status.dailyResetAtIso, now)}`,
    "",
    "Cota semanal",
    formatUsd(status.weeklyLimitUsd),
    "Gasto semanal",
    formatUsd(status.weeklySpentUsd),
    "Uso semanal",
    formatUsagePercent(getUsagePercent(status.weeklySpentUsd, status.weeklyLimitUsd)),
    `Resets in ${formatResetIn(status.weeklyResetAtIso, now)}`,
  ].join("\n");
}

function buildUsageLimitExceededMessage(status: ApiKeyUsageLimitStatus, now = Date.now()): string {
  if (status.dailyExceeded && status.dailyLimitUsd !== null) {
    const percent = formatUsagePercent(getUsagePercent(status.dailySpentUsd, status.dailyLimitUsd));
    return `This API key reached its daily USD usage quota (${formatUsd(status.dailySpentUsd)} of ${formatUsd(status.dailyLimitUsd)}, ${percent}). Resets in ${formatResetIn(status.dailyResetAtIso, now)}. Choose another allowed model after reset.`;
  }
  if (status.weeklyExceeded && status.weeklyLimitUsd !== null) {
    const percent = formatUsagePercent(
      getUsagePercent(status.weeklySpentUsd, status.weeklyLimitUsd)
    );
    return `This API key reached its weekly USD usage quota (${formatUsd(status.weeklySpentUsd)} of ${formatUsd(status.weeklyLimitUsd)}, ${percent}). Resets in ${formatResetIn(status.weeklyResetAtIso, now)}. Choose another allowed model after reset.`;
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
  status: ApiKeyUsageLimitStatus,
  now = Date.now()
): Response {
  const message = sanitizeErrorMessage(buildUsageLimitExceededMessage(status, now));
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
