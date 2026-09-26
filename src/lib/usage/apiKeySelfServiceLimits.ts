/**
 * GET /v1/me/status — usage windows (usage.daily / usage.weekly) and the
 * normalized limits[] list.
 *
 * Every limit entry reports the ENFORCER's own window and comparison so the key
 * holder sees exactly what will block them:
 *   - usage_limit: per-key daily/weekly USD caps (apiKeyUsageLimits.ts)
 *   - budget:      the per-key cost budget (domain/costRules.checkBudget)
 *   - token_limit: per-key token budgets (db/tokenLimits.ts)
 *   - key_quota:   tpm / rpm / monthly USD (db/keyQuota.ts)
 *
 * All data access goes through injected deps so tests can stub every source.
 */

import {
  asRecord,
  isoOrNull,
  roundNumber,
  toNumber,
  type DateLike,
  type JsonRecord,
} from "./apiKeySelfServiceShared";

const MINUTE_MS = 60_000;
const DAY_MS = 24 * 60 * 60 * 1000;
const WEEK_MS = 7 * DAY_MS;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type SelfServiceLimitSource = "usage_limit" | "budget" | "token_limit" | "key_quota";
export type SelfServiceLimitMetric = "usd" | "tokens" | "requests";
export type SelfServiceLimitWindow = "minute" | "daily" | "weekly" | "monthly";
export type SelfServiceLimitScopeType = "global" | "provider" | "model";

export interface SelfServiceLimitEntry {
  id: string;
  source: SelfServiceLimitSource;
  metric: SelfServiceLimitMetric;
  window: SelfServiceLimitWindow;
  scope: { type: SelfServiceLimitScopeType; value: string | null };
  limit: number;
  used: number;
  remaining: number;
  /** used / limit, clamped to [0, 1]. */
  utilization: number;
  exceeded: boolean;
  periodStartAt: string | null;
  resetAt: string | null;
}

export interface UsageWindowTokens {
  input: number;
  output: number;
  cacheRead: number;
  cacheCreation: number;
  reasoning: number;
  total: number;
}

export interface UsageWindowSummary {
  periodStartAt: string;
  resetAt: string;
  costUsd: number;
  requests: number;
  tokens: UsageWindowTokens;
}

export interface SelfServiceLimitMetadata {
  id: string;
  usageLimitEnabled?: boolean;
  dailyUsageLimitUsd?: number | null;
  weeklyUsageLimitUsd?: number | null;
}

export interface UsageLimitStatusLike {
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

export interface TokenLimitLike {
  id: string;
  scopeType: string;
  scopeValue: string;
  tokenLimit: number;
  resetInterval: string;
  resetTime?: string;
  enabled: boolean;
}

export interface KeyQuotaStatusLike {
  enabled: boolean;
  limits: { tpmLimit: number | null; rpmLimit: number | null; monthlyAmountUsd: number | null };
  counters: { tpmUsed: number; rpmUsed: number; monthlyAmountUsd: number };
  tpmExceeded: boolean;
  rpmExceeded: boolean;
  monthlyExceeded: boolean;
  windowResetAtIso: string;
}

interface StatementLike {
  get: (...params: unknown[]) => unknown;
}

export interface UsageDbLike {
  prepare: (sql: string) => StatementLike;
}

export interface SelfServiceLimitDeps {
  now: () => number;
  checkBudget: (apiKeyId: string) => unknown;
  getApiKeyUsageLimitStatus: (metadata: SelfServiceLimitMetadata) => Promise<UsageLimitStatusLike>;
  listTokenLimits: (apiKeyId: string) => TokenLimitLike[];
  getWindowUsage: (limit: TokenLimitLike, now: number) => number;
  resetWindowIfElapsed: (
    limit: TokenLimitLike,
    now: number
  ) => { periodStartAt: number; nextResetAt: number };
  getKeyQuotaStatus: (apiKeyId: string, deps: { now: () => number }) => KeyQuotaStatusLike;
}

// ---------------------------------------------------------------------------
// Usage windows (UTC calendar day / UTC ISO week)
// ---------------------------------------------------------------------------

export function getUtcDayWindow(now: number): { periodStartAt: number; resetAt: number } {
  const date = new Date(now);
  const start = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  return { periodStartAt: start, resetAt: start + DAY_MS };
}

/** ISO week: Monday 00:00Z through the next Monday 00:00Z. */
export function getUtcIsoWeekWindow(now: number): { periodStartAt: number; resetAt: number } {
  const date = new Date(now);
  const daysSinceMonday = (date.getUTCDay() + 6) % 7;
  const start = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate() - daysSinceMonday
  );
  return { periodStartAt: start, resetAt: start + WEEK_MS };
}

function getUtcMonthWindow(now: number): { periodStartAt: number; resetAt: number } {
  const date = new Date(now);
  return {
    periodStartAt: Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1),
    resetAt: Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 1),
  };
}

/**
 * Tokens + request count from usage_history (same source as usage.tokens) and
 * USD from the recorded cost history the budget enforcer uses.
 */
export function buildUsageWindowSummary(
  db: UsageDbLike,
  apiKeyId: string,
  window: { periodStartAt: number; resetAt: number },
  getBudgetWindowTotal: (apiKeyId: string, periodStartAt: number) => number
): UsageWindowSummary {
  const periodStartAt = new Date(window.periodStartAt).toISOString();
  const row = asRecord(
    db
      .prepare(
        `
        SELECT
          COUNT(*) AS requests,
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
      .get(apiKeyId, periodStartAt)
  );

  const input = toNumber(row?.inputTokens);
  const output = toNumber(row?.outputTokens);
  const cacheRead = toNumber(row?.cacheReadTokens);
  const cacheCreation = toNumber(row?.cacheCreationTokens);
  const reasoning = toNumber(row?.reasoningTokens);

  return {
    periodStartAt,
    resetAt: new Date(window.resetAt).toISOString(),
    costUsd: roundNumber(toNumber(getBudgetWindowTotal(apiKeyId, window.periodStartAt))),
    requests: toNumber(row?.requests),
    tokens: {
      input,
      output,
      cacheRead,
      cacheCreation,
      reasoning,
      total: input + output + cacheRead + cacheCreation + reasoning,
    },
  };
}

// ---------------------------------------------------------------------------
// limits[]
// ---------------------------------------------------------------------------

interface LimitEntryInput {
  id: string;
  source: SelfServiceLimitSource;
  metric: SelfServiceLimitMetric;
  window: SelfServiceLimitWindow;
  scope?: { type: SelfServiceLimitScopeType; value: string | null };
  limit: number;
  used: number;
  exceeded: boolean;
  periodStartAt: DateLike;
  resetAt: DateLike;
}

function makeLimitEntry(input: LimitEntryInput): SelfServiceLimitEntry {
  const precision = input.metric === "usd" ? 6 : 2;
  const limit = roundNumber(input.limit, precision);
  const used = roundNumber(Math.max(input.used, 0), precision);
  const utilization = limit > 0 ? Math.min(Math.max(used / limit, 0), 1) : 0;
  return {
    id: input.id,
    source: input.source,
    metric: input.metric,
    window: input.window,
    scope: input.scope ?? { type: "global", value: null },
    limit,
    used,
    remaining: roundNumber(Math.max(limit - used, 0), precision),
    utilization: roundNumber(utilization, 4),
    exceeded: input.exceeded === true,
    periodStartAt: isoOrNull(input.periodStartAt),
    resetAt: isoOrNull(input.resetAt),
  };
}

function toWindow(value: unknown): SelfServiceLimitWindow | null {
  return value === "daily" || value === "weekly" || value === "monthly" ? value : null;
}

function positiveOrNull(value: unknown): number | null {
  const numeric = toNumber(value, Number.NaN);
  return Number.isFinite(numeric) && numeric > 0 ? numeric : null;
}

async function usageLimitEntries(
  metadata: SelfServiceLimitMetadata,
  deps: SelfServiceLimitDeps
): Promise<SelfServiceLimitEntry[]> {
  if (metadata.usageLimitEnabled !== true) return [];
  const dailyLimit = positiveOrNull(metadata.dailyUsageLimitUsd);
  const weeklyLimit = positiveOrNull(metadata.weeklyUsageLimitUsd);
  if (dailyLimit === null && weeklyLimit === null) return [];

  // Same input the policy enforcer passes (apiKeyPolicy.validateKeyScheduleAndUsage),
  // so the reported windows match the ones that block requests.
  const status = await deps.getApiKeyUsageLimitStatus({
    id: metadata.id,
    usageLimitEnabled: true,
    dailyUsageLimitUsd: metadata.dailyUsageLimitUsd ?? null,
    weeklyUsageLimitUsd: metadata.weeklyUsageLimitUsd ?? null,
  });
  if (!status.enabled) return [];

  const entries: SelfServiceLimitEntry[] = [];
  if (status.dailyLimitUsd !== null && status.dailyLimitUsd > 0) {
    entries.push(
      makeLimitEntry({
        id: "usage_limit:daily",
        source: "usage_limit",
        metric: "usd",
        window: "daily",
        limit: status.dailyLimitUsd,
        used: toNumber(status.dailySpentUsd),
        exceeded: status.dailyExceeded,
        periodStartAt: status.dailyWindowStartIso,
        resetAt: status.dailyResetAtIso,
      })
    );
  }
  if (status.weeklyLimitUsd !== null && status.weeklyLimitUsd > 0) {
    entries.push(
      makeLimitEntry({
        id: "usage_limit:weekly",
        source: "usage_limit",
        metric: "usd",
        window: "weekly",
        limit: status.weeklyLimitUsd,
        used: toNumber(status.weeklySpentUsd),
        exceeded: status.weeklyExceeded,
        periodStartAt: status.weeklyWindowStartIso,
        resetAt: status.weeklyResetAtIso,
      })
    );
  }
  return entries;
}

function budgetEntries(apiKeyId: string, deps: SelfServiceLimitDeps): SelfServiceLimitEntry[] {
  const verdict: JsonRecord = asRecord(deps.checkBudget(apiKeyId)) ?? {};
  const limit = positiveOrNull(verdict.activeLimitUsd);
  const window = toWindow(verdict.resetInterval);
  if (limit === null || window === null) return [];

  return [
    makeLimitEntry({
      id: "budget",
      source: "budget",
      metric: "usd",
      window,
      limit,
      used: toNumber(verdict.periodUsed),
      // checkBudget rejects only when the period total is strictly above the limit.
      exceeded: verdict.allowed === false,
      periodStartAt: verdict.periodStartAt as DateLike,
      resetAt: verdict.budgetResetAt as DateLike,
    }),
  ];
}

function toScope(limit: TokenLimitLike): { type: SelfServiceLimitScopeType; value: string | null } {
  if (limit.scopeType === "model" || limit.scopeType === "provider") {
    return { type: limit.scopeType, value: limit.scopeValue || null };
  }
  return { type: "global", value: null };
}

function tokenLimitEntries(
  apiKeyId: string,
  deps: SelfServiceLimitDeps,
  now: number
): SelfServiceLimitEntry[] {
  const entries: SelfServiceLimitEntry[] = [];
  for (const limit of deps.listTokenLimits(apiKeyId)) {
    if (!limit || limit.enabled === false) continue;
    const limitValue = positiveOrNull(limit.tokenLimit);
    const window = toWindow(limit.resetInterval);
    if (limitValue === null || window === null || !limit.id) continue;

    const used = toNumber(deps.getWindowUsage(limit, now));
    const { periodStartAt, nextResetAt } = deps.resetWindowIfElapsed(limit, now);
    entries.push(
      makeLimitEntry({
        id: `token_limit:${limit.id}`,
        source: "token_limit",
        metric: "tokens",
        window,
        scope: toScope(limit),
        limit: limitValue,
        used,
        // Same comparison as tokenLimitCounter.checkTokenLimits.
        exceeded: used >= limitValue,
        periodStartAt,
        resetAt: nextResetAt,
      })
    );
  }
  return entries;
}

function keyQuotaEntries(
  apiKeyId: string,
  deps: SelfServiceLimitDeps,
  now: number
): SelfServiceLimitEntry[] {
  const status = deps.getKeyQuotaStatus(apiKeyId, { now: () => now });
  if (!status?.enabled) return [];

  const minuteResetMs = Date.parse(status.windowResetAtIso);
  const minuteResetAt = Number.isFinite(minuteResetMs) ? minuteResetMs : null;
  const minuteStartAt = minuteResetAt === null ? null : minuteResetAt - MINUTE_MS;
  const month = getUtcMonthWindow(now);
  const entries: SelfServiceLimitEntry[] = [];

  if (status.limits.tpmLimit !== null && status.limits.tpmLimit > 0) {
    entries.push(
      makeLimitEntry({
        id: "key_quota:tpm",
        source: "key_quota",
        metric: "tokens",
        window: "minute",
        limit: status.limits.tpmLimit,
        used: toNumber(status.counters.tpmUsed),
        exceeded: status.tpmExceeded,
        periodStartAt: minuteStartAt,
        resetAt: minuteResetAt,
      })
    );
  }
  if (status.limits.rpmLimit !== null && status.limits.rpmLimit > 0) {
    entries.push(
      makeLimitEntry({
        id: "key_quota:rpm",
        source: "key_quota",
        metric: "requests",
        window: "minute",
        limit: status.limits.rpmLimit,
        used: toNumber(status.counters.rpmUsed),
        exceeded: status.rpmExceeded,
        periodStartAt: minuteStartAt,
        resetAt: minuteResetAt,
      })
    );
  }
  if (status.limits.monthlyAmountUsd !== null && status.limits.monthlyAmountUsd > 0) {
    entries.push(
      makeLimitEntry({
        id: "key_quota:monthly",
        source: "key_quota",
        metric: "usd",
        window: "monthly",
        limit: status.limits.monthlyAmountUsd,
        used: toNumber(status.counters.monthlyAmountUsd),
        exceeded: status.monthlyExceeded,
        periodStartAt: month.periodStartAt,
        resetAt: month.resetAt,
      })
    );
  }
  return entries;
}

function reportSourceFailure(source: SelfServiceLimitSource): void {
  // Server log only; the response simply omits the failed source.
  console.warn(`[apiKeySelfService] could not read ${source} limits; omitting them from status`);
}

/**
 * Every configured, enabled limit for the key. A failing source is omitted
 * (and logged) instead of failing the whole status response.
 */
export async function buildSelfServiceLimits(
  metadata: SelfServiceLimitMetadata,
  deps: SelfServiceLimitDeps
): Promise<SelfServiceLimitEntry[]> {
  const now = deps.now();
  const limits: SelfServiceLimitEntry[] = [];

  try {
    limits.push(...(await usageLimitEntries(metadata, deps)));
  } catch {
    reportSourceFailure("usage_limit");
  }

  const syncSources: Array<[SelfServiceLimitSource, () => SelfServiceLimitEntry[]]> = [
    ["budget", () => budgetEntries(metadata.id, deps)],
    ["token_limit", () => tokenLimitEntries(metadata.id, deps, now)],
    ["key_quota", () => keyQuotaEntries(metadata.id, deps, now)],
  ];
  for (const [source, read] of syncSources) {
    try {
      limits.push(...read());
    } catch {
      reportSourceFailure(source);
    }
  }

  return limits;
}
