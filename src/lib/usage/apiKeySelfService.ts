import { hasSelfAccountQuotaScope, hasSelfUsageScope } from "@/shared/constants/selfServiceScopes";

import {
  defaultQuotaRefreshTracker,
  listReachableProviders,
  resolveAccountQuotaEntries,
  type AccountQuotaDeps,
  type ProviderLimitsCacheLike,
  type ProviderLimitsFetchResultLike,
  type QuotaRefreshTracker,
} from "./apiKeySelfServiceAccounts";
import {
  buildSelfServiceLimits,
  buildUsageWindowSummary,
  getUtcDayWindow,
  getUtcIsoWeekWindow,
  type KeyQuotaStatusLike,
  type SelfServiceLimitDeps,
  type SelfServiceLimitMetadata,
  type TokenLimitLike,
  type UsageLimitStatusLike,
} from "./apiKeySelfServiceLimits";
import {
  isoOrNull,
  roundNumber,
  toNumber,
  type DateLike,
  type JsonRecord,
} from "./apiKeySelfServiceShared";

export interface ApiKeySelfServiceMetadata {
  id: string;
  name: string;
  scopes: string[];
  allowedConnections: string[];
  usageLimitEnabled?: boolean;
  dailyUsageLimitUsd?: number | null;
  weeklyUsageLimitUsd?: number | null;
  /** From the key's self-service settings. null/undefined = all providers; [] = none. */
  sharedQuotaProviders?: string[] | null;
}

export interface ApiKeySelfServiceOptions {
  /**
   * Admin preview (GET /api/keys/[id]/self-service): skip the self:usage scope
   * check and always include accountQuotas (still filtered by the settings).
   */
  adminPreview?: boolean;
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
  source: "manual" | "scheduled"
) => Promise<ProviderLimitsFetchResultLike>;

export interface ApiKeySelfServiceDeps {
  now?: () => number;
  getCostSummary?: GetCostSummaryFn;
  checkBudget?: CheckBudgetFn;
  getDbInstance?: GetDbInstanceFn;
  getProviderConnectionById?: GetProviderConnectionByIdFn;
  getProviderConnections?: GetProviderConnectionsFn;
  fetchAndPersistProviderLimits?: FetchAndPersistProviderLimitsFn;
  getProviderLimitsCache?: (connectionId: string) => ProviderLimitsCacheLike | null;
  quotaRefreshTracker?: QuotaRefreshTracker;
  getBudgetWindowTotal?: (apiKeyId: string, periodStartAt: number) => number;
  getApiKeyUsageLimitStatus?: (metadata: SelfServiceLimitMetadata) => Promise<UsageLimitStatusLike>;
  listTokenLimits?: (apiKeyId: string) => TokenLimitLike[];
  getWindowUsage?: (limit: TokenLimitLike, now: number) => number;
  resetWindowIfElapsed?: (
    limit: TokenLimitLike,
    now: number
  ) => { periodStartAt: number; nextResetAt: number };
  getKeyQuotaStatus?: (apiKeyId: string, deps: { now: () => number }) => KeyQuotaStatusLike;
}

interface TokenTotals {
  inputTokens: number;
  outputTokens: number;
  cacheReadTokens: number;
  cacheCreationTokens: number;
  reasoningTokens: number;
  totalTokens: number;
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

type RequiredDeps = Required<ApiKeySelfServiceDeps>;

interface DefaultDepsLoader {
  /** The injectable deps this loader provides; it runs only if one of them is missing. */
  keys: ReadonlyArray<keyof ApiKeySelfServiceDeps>;
  load: () => Promise<Partial<RequiredDeps>>;
}

// Modules are imported lazily, and only for deps the caller did not inject, so tests that
// stub a whole group never touch the real DB or network modules behind it.
const DEFAULT_DEPS_LOADERS: DefaultDepsLoader[] = [
  {
    keys: ["getCostSummary", "checkBudget", "getBudgetWindowTotal"],
    load: async () => {
      const m = await import("@/domain/costRules");
      return {
        getCostSummary: m.getCostSummary,
        checkBudget: m.checkBudget,
        getBudgetWindowTotal: m.getBudgetWindowTotal,
      };
    },
  },
  {
    keys: ["getDbInstance"],
    load: async () => ({ getDbInstance: (await import("@/lib/db/core")).getDbInstance }),
  },
  {
    keys: ["getProviderConnectionById", "getProviderConnections"],
    load: async () => {
      const m = await import("@/lib/db/providers");
      return {
        getProviderConnectionById: m.getProviderConnectionById,
        getProviderConnections: m.getProviderConnections,
      };
    },
  },
  {
    keys: ["fetchAndPersistProviderLimits"],
    load: async () => ({
      fetchAndPersistProviderLimits: (await import("@/lib/usage/providerLimits"))
        .fetchAndPersistProviderLimits,
    }),
  },
  {
    keys: ["getProviderLimitsCache"],
    load: async () => ({
      getProviderLimitsCache: (await import("@/lib/db/providerLimits")).getProviderLimitsCache,
    }),
  },
  {
    keys: ["getApiKeyUsageLimitStatus"],
    load: async () => ({
      getApiKeyUsageLimitStatus: (await import("@/lib/usage/apiKeyUsageLimits"))
        .getApiKeyUsageLimitStatus,
    }),
  },
  {
    keys: ["listTokenLimits", "getWindowUsage", "resetWindowIfElapsed"],
    load: async () => {
      const m = await import("@/lib/db/tokenLimits");
      return {
        listTokenLimits: m.listTokenLimits,
        getWindowUsage: m.getWindowUsage as unknown as RequiredDeps["getWindowUsage"],
        resetWindowIfElapsed:
          m.resetWindowIfElapsed as unknown as RequiredDeps["resetWindowIfElapsed"],
      };
    },
  },
  {
    keys: ["getKeyQuotaStatus"],
    load: async () => ({
      getKeyQuotaStatus: (await import("@/lib/db/keyQuota")).getKeyQuotaStatus,
    }),
  },
];

async function normalizeDeps(deps: ApiKeySelfServiceDeps): Promise<RequiredDeps> {
  const resolved: Partial<RequiredDeps> = {
    now: Date.now,
    quotaRefreshTracker: defaultQuotaRefreshTracker,
  };
  for (const loader of DEFAULT_DEPS_LOADERS) {
    if (loader.keys.some((key) => deps[key] === undefined)) {
      Object.assign(resolved, await loader.load());
    }
  }
  for (const [key, value] of Object.entries(deps)) {
    if (value !== undefined) (resolved as Record<string, unknown>)[key] = value;
  }
  return resolved as RequiredDeps;
}

function accountQuotaDeps(deps: RequiredDeps): AccountQuotaDeps {
  return {
    now: deps.now,
    getProviderConnectionById: deps.getProviderConnectionById,
    getProviderConnections: deps.getProviderConnections,
    getProviderLimitsCache: deps.getProviderLimitsCache,
    fetchAndPersistProviderLimits: deps.fetchAndPersistProviderLimits,
    quotaRefreshTracker: deps.quotaRefreshTracker,
  };
}

function limitDeps(deps: RequiredDeps): SelfServiceLimitDeps {
  return {
    now: deps.now,
    checkBudget: deps.checkBudget,
    getApiKeyUsageLimitStatus: deps.getApiKeyUsageLimitStatus,
    listTokenLimits: deps.listTokenLimits,
    getWindowUsage: deps.getWindowUsage,
    resetWindowIfElapsed: deps.resetWindowIfElapsed,
    getKeyQuotaStatus: deps.getKeyQuotaStatus,
  };
}

async function resolveAccountQuotas(
  metadata: ApiKeySelfServiceMetadata,
  deps: RequiredDeps,
  options: ApiKeySelfServiceOptions
) {
  if (!options.adminPreview && !hasSelfAccountQuotaScope(metadata.scopes)) return undefined;
  return resolveAccountQuotaEntries(
    {
      allowedConnections: Array.isArray(metadata.allowedConnections)
        ? metadata.allowedConnections
        : [],
      sharedQuotaProviders: metadata.sharedQuotaProviders ?? null,
    },
    accountQuotaDeps(deps)
  );
}

export async function buildApiKeySelfServiceStatus(
  metadata: ApiKeySelfServiceMetadata,
  deps: ApiKeySelfServiceDeps = {},
  options: ApiKeySelfServiceOptions = {}
) {
  if (!options.adminPreview && !hasSelfUsageScope(metadata.scopes)) {
    throw new Error("missing_self_usage_scope");
  }

  const resolvedDeps = await normalizeDeps(deps);
  const now = resolvedDeps.now();
  const summary = resolvedDeps.getCostSummary(metadata.id);

  const cost = buildCostStatus(summary, now);
  const db = resolvedDeps.getDbInstance() as DbLike;
  const tokens = aggregateTokens(
    db,
    metadata.id,
    cost.periodStartAt ?? new Date(getCurrentMonthWindow(now).periodStartAt).toISOString()
  );
  const daily = buildUsageWindowSummary(
    db,
    metadata.id,
    getUtcDayWindow(now),
    resolvedDeps.getBudgetWindowTotal
  );
  const weekly = buildUsageWindowSummary(
    db,
    metadata.id,
    getUtcIsoWeekWindow(now),
    resolvedDeps.getBudgetWindowTotal
  );
  const [limits, accountQuotas] = await Promise.all([
    buildSelfServiceLimits(
      {
        id: metadata.id,
        usageLimitEnabled: metadata.usageLimitEnabled,
        dailyUsageLimitUsd: metadata.dailyUsageLimitUsd,
        weeklyUsageLimitUsd: metadata.weeklyUsageLimitUsd,
      },
      limitDeps(resolvedDeps)
    ),
    resolveAccountQuotas(metadata, resolvedDeps, options),
  ]);
  const accountQuota = accountQuotas && accountQuotas.length === 1 ? accountQuotas[0] : undefined;

  return {
    apiKey: {
      id: metadata.id,
      name: metadata.name,
    },
    generatedAt: new Date(now).toISOString(),
    usage: {
      cost,
      tokens: {
        periodStartAt: cost.periodStartAt,
        ...tokens,
      },
      daily,
      weekly,
    },
    limits,
    ...(accountQuotas !== undefined && { accountQuotas }),
    ...(accountQuota !== undefined && { accountQuota }),
  };
}

/** Providers of the connections a key can reach (admin self-service settings UI). */
export async function listApiKeyReachableProviders(
  allowedConnections: string[],
  deps: Pick<ApiKeySelfServiceDeps, "getProviderConnectionById" | "getProviderConnections"> = {}
) {
  const providers =
    deps.getProviderConnectionById && deps.getProviderConnections
      ? null
      : await import("@/lib/db/providers");
  return listReachableProviders(Array.isArray(allowedConnections) ? allowedConnections : [], {
    getProviderConnectionById:
      deps.getProviderConnectionById ?? providers!.getProviderConnectionById,
    getProviderConnections: deps.getProviderConnections ?? providers!.getProviderConnections,
  });
}
