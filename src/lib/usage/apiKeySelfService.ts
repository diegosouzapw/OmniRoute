import {
  hasSelfAccountQuotaScope,
  hasSelfUsageScope,
} from "@/shared/constants/selfServiceScopes";

type JsonRecord = Record<string, unknown>;

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
  budgetResetAt: number | null;
  periodStartAt: number | null;
  nextResetAt: number | null;
  warningThreshold: number | null;
}

type GetCostSummaryFn = (apiKeyId: string) => CostSummaryLike;
type CheckBudgetFn = (apiKeyId: string) => unknown;
type GetDbInstanceFn = () => DbLike;
type GetProviderConnectionByIdFn = (connectionId: string) => Promise<unknown>;
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

function isoOrNull(value: number | string | null | undefined): string | null {
  if (typeof value === "number" && Number.isFinite(value) && value > 0) {
    return new Date(value).toISOString();
  }
  if (typeof value === "string" && value.trim()) {
    const parsed = Date.parse(value);
    return Number.isFinite(parsed) ? new Date(parsed).toISOString() : null;
  }
  return null;
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
    ? toNumber(summary.periodStartAt, fallbackWindow.periodStartAt)
    : fallbackWindow.periodStartAt;
  const resetAt = hasBudget
    ? toNumber(summary.nextResetAt ?? summary.budgetResetAt, fallbackWindow.resetAt)
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
    resetAt: isoOrNull(record.resetAt as string | number | null | undefined),
  };
}

async function resolveAccountQuota(metadata: ApiKeySelfServiceMetadata, deps: RequiredDeps) {
  if (!hasSelfAccountQuotaScope(metadata.scopes)) return undefined;

  const allowedConnections = Array.isArray(metadata.allowedConnections)
    ? metadata.allowedConnections
    : [];
  if (allowedConnections.length !== 1) {
    return unavailableAccountQuota("ambiguous_connection");
  }

  const connection = (await deps.getProviderConnectionById(allowedConnections[0])) as
    | JsonRecord
    | null;
  if (!connection) {
    return unavailableAccountQuota("no_allowed_connection");
  }

  const provider = typeof connection.provider === "string" ? connection.provider : "";
  if (provider !== "codex") {
    return unavailableAccountQuota("not_supported");
  }

  try {
    const result = await deps.fetchAndPersistProviderLimits(allowedConnections[0], "manual");
    const usage = result.usage as JsonRecord;
    const quotas =
      usage.quotas && typeof usage.quotas === "object" && !Array.isArray(usage.quotas)
        ? (usage.quotas as JsonRecord)
        : null;
    if (!quotas) return unavailableAccountQuota("not_available");

    const session = quotaWindow(quotas.session);
    const weekly = quotaWindow(quotas.weekly);
    if (!session && !weekly) return unavailableAccountQuota("not_available");

    return {
      provider,
      connectionId: allowedConnections[0],
      shared: true,
      quotas: {
        ...(session && { session }),
        ...(weekly && { weekly }),
      },
    };
  } catch {
    return unavailableAccountQuota("fetch_failed");
  }
}

type RequiredDeps = Required<ApiKeySelfServiceDeps>;

async function normalizeDeps(deps: ApiKeySelfServiceDeps): Promise<RequiredDeps> {
  const costRules =
    deps.getCostSummary && deps.checkBudget ? null : await import("@/domain/costRules");
  const dbCore = deps.getDbInstance ? null : await import("@/lib/db/core");
  const localDb = deps.getProviderConnectionById ? null : await import("@/lib/localDb");
  const providerLimits = deps.fetchAndPersistProviderLimits
    ? null
    : await import("@/lib/usage/providerLimits");

  return {
    now: deps.now ?? Date.now,
    getCostSummary: deps.getCostSummary ?? costRules!.getCostSummary,
    checkBudget: deps.checkBudget ?? costRules!.checkBudget,
    getDbInstance: deps.getDbInstance ?? dbCore!.getDbInstance,
    getProviderConnectionById: deps.getProviderConnectionById ?? localDb!.getProviderConnectionById,
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
  const accountQuota = await resolveAccountQuota(metadata, resolvedDeps);

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
    ...(accountQuota !== undefined && { accountQuota }),
  };
}
