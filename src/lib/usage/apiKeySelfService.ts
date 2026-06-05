import {
  hasSelfAccountQuotaScope,
  hasSelfUsageScope,
} from "@/shared/constants/selfServiceScopes";
import { USAGE_SUPPORTED_PROVIDERS } from "@/shared/constants/providers";

type JsonRecord = Record<string, unknown>;
type DateLike = number | string | Date | null | undefined;

interface ApiKeySelfServiceMetadata {
  id: string;
  name: string;
  scopes: string[];
  allowedConnections: string[];
}

interface StatementLike {
  get: (...params: unknown[]) => unknown;
}

interface DbLike {
  prepare: (sql: string) => StatementLike;
}

interface CostSummaryLike {
  budget: unknown;
  totalCostMonth: number;
  totalCostPeriod: number;
  activeLimitUsd: number;
  resetInterval: string | null;
  budgetResetAt: DateLike;
  periodStartAt: DateLike;
  nextResetAt: DateLike;
  warningThreshold: number | null;
}

type GetCostSummaryFn = (apiKeyId: string) => CostSummaryLike;
type CheckBudgetFn = (apiKeyId: string) => unknown;
type GetDbInstanceFn = () => DbLike;
type GetProviderConnectionByIdFn = (connectionId: string) => Promise<unknown>;
type GetProviderConnectionsFn = (filters?: Record<string, unknown>) => Promise<unknown[]>;
type FetchAndPersistProviderLimitsFn = (
  connectionId: string,
  source: "manual"
) => Promise<{ usage: JsonRecord }>;

interface ApiKeySelfServiceDeps {
  now?: () => number;
  getCostSummary?: GetCostSummaryFn;
  checkBudget?: CheckBudgetFn;
  getDbInstance?: GetDbInstanceFn;
  getProviderConnectionById?: GetProviderConnectionByIdFn;
  getProviderConnections?: GetProviderConnectionsFn;
  fetchAndPersistProviderLimits?: FetchAndPersistProviderLimitsFn;
}

interface TokenTotals {
  inputTokens: number;
  outputTokens: number;
  cacheReadTokens: number;
  cacheCreationTokens: number;
  reasoningTokens: number;
  totalTokens: number;
}

interface AccountQuotaConnection {
  id: string;
  provider: string;
  lookupFailed?: boolean;
}

function toNumber(value: unknown, fallback = 0): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "bigint") return Number(value);
  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }
  return fallback;
}

function roundNumber(value: number, precision = 6): number {
  if (!Number.isFinite(value)) return 0;
  return Number(value.toFixed(precision));
}

function dateMsOrNull(value: DateLike): number | null {
  if (typeof value === "number" && Number.isFinite(value) && value > 0) {
    return value;
  }
  if (value instanceof Date) {
    const parsed = value.getTime();
    return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
  }
  if (typeof value === "string" && value.trim()) {
    const parsed = Date.parse(value);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
  }
  return null;
}

function isoOrNull(value: DateLike): string | null {
  const timestamp = dateMsOrNull(value);
  return timestamp === null ? null : new Date(timestamp).toISOString();
}

function withDateFallback(value: DateLike, fallback: number): DateLike {
  return isoOrNull(value) === null ? fallback : value;
}

function getCurrentMonthWindow(now: number) {
  const date = new Date(now);
  const start = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1, 0, 0, 0, 0);
  const next = Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 1, 0, 0, 0, 0);
  return { periodStartAt: start, resetAt: next };
}

function buildCostStatus(summary: CostSummaryLike, now: number) {
  const hasBudget = !!summary.budget && toNumber(summary.activeLimitUsd) > 0;
  const fallbackWindow = getCurrentMonthWindow(now);
  const periodStartAt = hasBudget
    ? withDateFallback(summary.periodStartAt, fallbackWindow.periodStartAt)
    : fallbackWindow.periodStartAt;
  const resetAt = hasBudget
    ? withDateFallback(summary.nextResetAt ?? summary.budgetResetAt, fallbackWindow.resetAt)
    : fallbackWindow.resetAt;
  const usedUsd = hasBudget
    ? roundNumber(toNumber(summary.totalCostPeriod))
    : roundNumber(toNumber(summary.totalCostMonth));
  const limitUsd = hasBudget ? roundNumber(toNumber(summary.activeLimitUsd)) : null;
  const remainingUsd = limitUsd === null ? null : roundNumber(Math.max(limitUsd - usedUsd, 0));
  const usedPercent =
    limitUsd === null || limitUsd <= 0 ? null : roundNumber((usedUsd / limitUsd) * 100, 2);

  return {
    period: (hasBudget ? summary.resetInterval : "monthly") ?? "monthly",
    currency: "USD",
    usedUsd,
    limitUsd,
    remainingUsd,
    usedPercent,
    warningThreshold: hasBudget ? (summary.warningThreshold ?? null) : null,
    resetAt: isoOrNull(resetAt),
    periodStartAt: isoOrNull(periodStartAt),
  };
}

function aggregateTokens(db: DbLike, apiKeyId: string, periodStartAt: string): TokenTotals {
  const row = db
    .prepare(
      `
      SELECT
        COALESCE(SUM(tokens_input), 0) AS inputTokens,
        COALESCE(SUM(tokens_output), 0) AS outputTokens,
        COALESCE(SUM(tokens_cache_read), 0) AS cacheReadTokens,
        COALESCE(SUM(tokens_cache_creation), 0) AS cacheCreationTokens,
        COALESCE(SUM(tokens_reasoning), 0) AS reasoningTokens
      FROM usage_history
      WHERE api_key_id = ?
        AND timestamp >= ?
    `
    )
    .get(apiKeyId, periodStartAt) as JsonRecord | undefined;

  const inputTokens = toNumber(row?.inputTokens);
  const outputTokens = toNumber(row?.outputTokens);
  const cacheReadTokens = toNumber(row?.cacheReadTokens);
  const cacheCreationTokens = toNumber(row?.cacheCreationTokens);
  const reasoningTokens = toNumber(row?.reasoningTokens);

  return {
    inputTokens,
    outputTokens,
    cacheReadTokens,
    cacheCreationTokens,
    reasoningTokens,
    totalTokens:
      inputTokens + outputTokens + cacheReadTokens + cacheCreationTokens + reasoningTokens,
  };
}

function unavailableAccountQuota(reason: string) {
  return { available: false, reason };
}

function quotaWindow(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const record = value as JsonRecord;
  const usedPercentage = toNumber(record.usedPercentage ?? record.used, Number.NaN);
  const remainingPercentage = toNumber(
    record.remainingPercentage ?? record.remaining,
    Number.isFinite(usedPercentage) ? 100 - usedPercentage : Number.NaN
  );
  if (!Number.isFinite(usedPercentage) && !Number.isFinite(remainingPercentage)) return null;

  return {
    usedPercentage: Number.isFinite(usedPercentage)
      ? roundNumber(usedPercentage, 2)
      : roundNumber(100 - remainingPercentage, 2),
    remainingPercentage: Number.isFinite(remainingPercentage)
      ? roundNumber(remainingPercentage, 2)
      : roundNumber(100 - usedPercentage, 2),
    resetAt: isoOrNull(record.resetAt as DateLike),
  };
}

function normalizePlan(value: unknown): unknown {
  if (typeof value === "string" && value.trim()) return value;
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "boolean") return value;
  return undefined;
}

function isSupportedProvider(provider: string): boolean {
  return USAGE_SUPPORTED_PROVIDERS.includes(provider as (typeof USAGE_SUPPORTED_PROVIDERS)[number]);
}

function getConnectionIdentity(value: unknown): { id: string; provider: string } | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const record = value as JsonRecord;
  if (record.isActive === false) return null;

  const id = typeof record.id === "string" ? record.id : "";
  const provider = typeof record.provider === "string" ? record.provider : "";
  if (!id || !provider) return null;

  return { id, provider };
}

async function listAccountQuotaConnections(
  metadata: ApiKeySelfServiceMetadata,
  deps: RequiredDeps
) {
  const allowedConnections = Array.isArray(metadata.allowedConnections)
    ? metadata.allowedConnections
    : [];

  const rawConnections =
    allowedConnections.length > 0
      ? await Promise.all(
          allowedConnections.map(async (id) => {
            try {
              return await deps.getProviderConnectionById(id);
            } catch {
              return { id, provider: "unknown", lookupFailed: true };
            }
          })
        )
      : await deps.getProviderConnections({ isActive: true }).catch(() => []);

  const connections: AccountQuotaConnection[] = [];
  const seen = new Set<string>();
  for (const rawConnection of rawConnections) {
    if (
      rawConnection &&
      typeof rawConnection === "object" &&
      !Array.isArray(rawConnection) &&
      (rawConnection as JsonRecord).lookupFailed === true
    ) {
      const record = rawConnection as JsonRecord;
      const id = typeof record.id === "string" ? record.id : "";
      const provider = typeof record.provider === "string" ? record.provider : "unknown";
      if (!id || seen.has(id)) continue;
      seen.add(id);
      connections.push({ id, provider, lookupFailed: true });
      continue;
    }

    const connection = getConnectionIdentity(rawConnection);
    if (!connection || seen.has(connection.id)) continue;
    seen.add(connection.id);
    connections.push(connection);
  }

  return connections;
}

function normalizeQuotaWindows(quotas: JsonRecord | null) {
  if (!quotas) return null;

  const normalized: Record<string, ReturnType<typeof quotaWindow>> = {};
  for (const [key, value] of Object.entries(quotas)) {
    const window = quotaWindow(value);
    if (window) normalized[key] = window;
  }

  return Object.keys(normalized).length > 0 ? normalized : null;
}

async function resolveConnectionAccountQuota(
  connection: AccountQuotaConnection,
  deps: RequiredDeps
) {
  if (connection.lookupFailed) {
    return {
      provider: connection.provider,
      connectionId: connection.id,
      shared: true,
      ...unavailableAccountQuota("connection_lookup_failed"),
    };
  }

  if (!isSupportedProvider(connection.provider)) {
    return {
      provider: connection.provider,
      connectionId: connection.id,
      shared: true,
      ...unavailableAccountQuota("not_supported"),
    };
  }

  try {
    const result = await deps.fetchAndPersistProviderLimits(connection.id, "manual");
    const usage = result.usage as JsonRecord;
    const quotas =
      usage.quotas && typeof usage.quotas === "object" && !Array.isArray(usage.quotas)
        ? (usage.quotas as JsonRecord)
        : null;
    const normalizedQuotas = normalizeQuotaWindows(quotas);
    const plan = normalizePlan(usage.plan);

    if (!normalizedQuotas && plan === undefined) {
      return {
        provider: connection.provider,
        connectionId: connection.id,
        shared: true,
        ...unavailableAccountQuota("not_available"),
      };
    }

    return {
      provider: connection.provider,
      connectionId: connection.id,
      shared: true,
      ...(plan !== undefined && { plan }),
      ...(normalizedQuotas && { quotas: normalizedQuotas }),
    };
  } catch {
    return {
      provider: connection.provider,
      connectionId: connection.id,
      shared: true,
      ...unavailableAccountQuota("fetch_failed"),
    };
  }
}

async function resolveAccountQuotas(metadata: ApiKeySelfServiceMetadata, deps: RequiredDeps) {
  if (!hasSelfAccountQuotaScope(metadata.scopes)) return undefined;

  const connections = await listAccountQuotaConnections(metadata, deps);
  return Promise.all(
    connections.map((connection) => resolveConnectionAccountQuota(connection, deps))
  );
}

type RequiredDeps = Required<ApiKeySelfServiceDeps>;

async function normalizeDeps(deps: ApiKeySelfServiceDeps): Promise<RequiredDeps> {
  const costRules =
    deps.getCostSummary && deps.checkBudget ? null : await import("@/domain/costRules");
  const dbCore = deps.getDbInstance ? null : await import("@/lib/db/core");
  const localDb =
    deps.getProviderConnectionById && deps.getProviderConnections
      ? null
      : await import("@/lib/localDb");
  const providerLimits = deps.fetchAndPersistProviderLimits
    ? null
    : await import("@/lib/usage/providerLimits");

  return {
    now: deps.now ?? Date.now,
    getCostSummary: deps.getCostSummary ?? costRules!.getCostSummary,
    checkBudget: deps.checkBudget ?? costRules!.checkBudget,
    getDbInstance: deps.getDbInstance ?? dbCore!.getDbInstance,
    getProviderConnectionById: deps.getProviderConnectionById ?? localDb!.getProviderConnectionById,
    getProviderConnections: deps.getProviderConnections ?? localDb!.getProviderConnections,
    fetchAndPersistProviderLimits:
      deps.fetchAndPersistProviderLimits ?? providerLimits!.fetchAndPersistProviderLimits,
  };
}

export async function buildApiKeySelfServiceStatus(
  metadata: ApiKeySelfServiceMetadata,
  deps: ApiKeySelfServiceDeps = {}
) {
  if (!hasSelfUsageScope(metadata.scopes)) {
    throw new Error("missing_self_usage_scope");
  }

  const resolvedDeps = await normalizeDeps(deps);
  const summary = resolvedDeps.getCostSummary(metadata.id);
  resolvedDeps.checkBudget(metadata.id);

  const cost = buildCostStatus(summary, resolvedDeps.now());
  const tokens = aggregateTokens(
    resolvedDeps.getDbInstance() as DbLike,
    metadata.id,
    cost.periodStartAt ?? new Date(getCurrentMonthWindow(resolvedDeps.now()).periodStartAt).toISOString()
  );
  const accountQuotas = await resolveAccountQuotas(metadata, resolvedDeps);
  const accountQuota =
    accountQuotas && accountQuotas.length === 1 ? accountQuotas[0] : undefined;

  return {
    apiKey: {
      id: metadata.id,
      name: metadata.name,
    },
    usage: {
      cost,
      tokens: {
        periodStartAt: cost.periodStartAt,
        ...tokens,
      },
    },
    ...(accountQuotas !== undefined && { accountQuotas }),
    ...(accountQuota !== undefined && { accountQuota }),
  };
}
