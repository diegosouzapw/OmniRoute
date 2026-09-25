/**
 * GET /v1/me/status — usage.daily / usage.weekly windows and limits[].
 *
 * Every data source is stubbed through the builder's deps, so no DB is opened.
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  SELF_ACCOUNT_QUOTA_SCOPE,
  SELF_USAGE_SCOPE,
} from "../../src/shared/constants/selfServiceScopes.ts";
import { buildApiKeySelfServiceStatus } from "../../src/lib/usage/apiKeySelfService.ts";
import { createQuotaRefreshTracker } from "../../src/lib/usage/apiKeySelfServiceAccounts.ts";

// Wednesday 2026-05-27 15:30 UTC.
const NOW = Date.UTC(2026, 4, 27, 15, 30, 0);

type Row = Record<string, number>;
type LimitEntry = {
  id: string;
  source: string;
  metric: string;
  window: string;
  scope: { type: string; value: string | null };
  limit: number;
  used: number;
  remaining: number;
  utilization: number;
  exceeded: boolean;
  periodStartAt: string | null;
  resetAt: string | null;
};

const disabledKeyQuota = {
  enabled: false,
  limits: { tpmLimit: null, rpmLimit: null, monthlyAmountUsd: null },
  counters: { tpmUsed: 0, rpmUsed: 0, monthlyAmountUsd: 0 },
  tpmExceeded: false,
  rpmExceeded: false,
  monthlyExceeded: false,
  windowResetAtIso: "2026-05-27T15:31:00.000Z",
};

/** DB stub: window queries (COUNT(*)) answer per `since` param, the legacy token query answers `tokenRow`. */
function makeDb(windowRows: Record<string, Row>, tokenRow: Row = {}) {
  const windowQueries: unknown[][] = [];
  return {
    windowQueries,
    db: {
      prepare: (sql: string) => ({
        get: (...params: unknown[]) => {
          if (sql.includes("COUNT(*)")) {
            windowQueries.push(params);
            return windowRows[String(params[1])] ?? {};
          }
          return tokenRow;
        },
      }),
    },
  };
}

function makeDeps(overrides: Record<string, unknown> = {}) {
  return {
    now: () => NOW,
    getCostSummary: () => ({
      budget: null,
      totalCostMonth: 0,
      totalCostPeriod: 0,
      activeLimitUsd: 0,
      resetInterval: null,
      budgetResetAt: null,
      periodStartAt: null,
      nextResetAt: null,
      warningThreshold: null,
    }),
    checkBudget: () => ({ allowed: true, activeLimitUsd: 0, resetInterval: null }),
    getDbInstance: () => makeDb({}).db,
    getProviderConnectionById: async () => null,
    getProviderConnections: async () => [],
    fetchAndPersistProviderLimits: async () => {
      throw new Error("unexpected quota fetch");
    },
    getProviderLimitsCache: () => null,
    quotaRefreshTracker: createQuotaRefreshTracker(),
    getBudgetWindowTotal: () => 0,
    getApiKeyUsageLimitStatus: async () => {
      throw new Error("usage limits must not be read for this key");
    },
    listTokenLimits: () => [],
    getWindowUsage: () => 0,
    resetWindowIfElapsed: () => ({ periodStartAt: 0, nextResetAt: 0 }),
    getKeyQuotaStatus: () => disabledKeyQuota,
    ...overrides,
  };
}

const baseMetadata = {
  id: "key-1",
  name: "team",
  scopes: [SELF_USAGE_SCOPE],
  allowedConnections: [] as string[],
};

function byId(limits: LimitEntry[]) {
  return new Map(limits.map((entry) => [entry.id, entry]));
}

test("usage.daily is the UTC calendar day and usage.weekly the UTC ISO week, with token, request and cost sums", async () => {
  const dayStart = "2026-05-27T00:00:00.000Z";
  const weekStart = "2026-05-25T00:00:00.000Z"; // Monday
  const { db, windowQueries } = makeDb({
    [dayStart]: {
      requests: 4,
      inputTokens: 100,
      outputTokens: 20,
      cacheReadTokens: 5,
      cacheCreationTokens: 3,
      reasoningTokens: 2,
    },
    [weekStart]: {
      requests: 9,
      inputTokens: 700,
      outputTokens: 80,
      cacheReadTokens: 10,
      cacheCreationTokens: 6,
      reasoningTokens: 4,
    },
  });
  const costCalls: Array<[string, number]> = [];
  const deps = makeDeps({
    getDbInstance: () => db,
    getBudgetWindowTotal: (apiKeyId: string, periodStartAt: number) => {
      costCalls.push([apiKeyId, periodStartAt]);
      return periodStartAt === Date.parse(dayStart) ? 1.2345678 : 7.5;
    },
  });

  const status = await buildApiKeySelfServiceStatus(baseMetadata, deps);

  assert.equal(status.generatedAt, "2026-05-27T15:30:00.000Z");
  assert.deepEqual(status.usage.daily, {
    periodStartAt: dayStart,
    resetAt: "2026-05-28T00:00:00.000Z",
    costUsd: 1.234568,
    requests: 4,
    tokens: { input: 100, output: 20, cacheRead: 5, cacheCreation: 3, reasoning: 2, total: 130 },
  });
  assert.deepEqual(status.usage.weekly, {
    periodStartAt: weekStart,
    resetAt: "2026-06-01T00:00:00.000Z",
    costUsd: 7.5,
    requests: 9,
    tokens: { input: 700, output: 80, cacheRead: 10, cacheCreation: 6, reasoning: 4, total: 800 },
  });
  assert.deepEqual(
    windowQueries.map((params) => params[0]),
    ["key-1", "key-1"],
    "window sums are scoped to the calling key"
  );
  assert.deepEqual(costCalls, [
    ["key-1", Date.parse(dayStart)],
    ["key-1", Date.parse(weekStart)],
  ]);
  // Existing fields keep their shape.
  assert.equal(status.usage.cost.period, "monthly");
  assert.equal(typeof status.usage.tokens.totalTokens, "number");
  assert.deepEqual(status.limits, []);
});

test("the ISO week of a Sunday still starts on the previous Monday", async () => {
  const deps = makeDeps({ now: () => Date.UTC(2026, 4, 31, 23, 59, 0) });

  const status = await buildApiKeySelfServiceStatus(baseMetadata, deps);

  assert.equal(status.usage.daily.periodStartAt, "2026-05-31T00:00:00.000Z");
  assert.equal(status.usage.weekly.periodStartAt, "2026-05-25T00:00:00.000Z");
  assert.equal(status.usage.weekly.resetAt, "2026-06-01T00:00:00.000Z");
});

test("usage_limit entries mirror the enforcer's windows, clamp utilization and keep its exceeded flag", async () => {
  const seen: unknown[] = [];
  const deps = makeDeps({
    getApiKeyUsageLimitStatus: async (metadata: unknown) => {
      seen.push(metadata);
      return {
        enabled: true,
        dailyLimitUsd: 10,
        weeklyLimitUsd: 50,
        dailySpentUsd: 12,
        weeklySpentUsd: 5,
        dailyWindowStartIso: "2026-05-27T03:00:00.000Z",
        dailyResetAtIso: "2026-05-28T03:00:00.000Z",
        weeklyWindowStartIso: "2026-05-20T15:30:00.000Z",
        weeklyResetAtIso: null,
        dailyExceeded: true,
        weeklyExceeded: false,
      };
    },
  });

  const status = await buildApiKeySelfServiceStatus(
    { ...baseMetadata, usageLimitEnabled: true, dailyUsageLimitUsd: 10, weeklyUsageLimitUsd: 50 },
    deps
  );
  const limits = byId(status.limits);

  assert.deepEqual(seen, [
    { id: "key-1", usageLimitEnabled: true, dailyUsageLimitUsd: 10, weeklyUsageLimitUsd: 50 },
  ]);
  assert.deepEqual(limits.get("usage_limit:daily"), {
    id: "usage_limit:daily",
    source: "usage_limit",
    metric: "usd",
    window: "daily",
    scope: { type: "global", value: null },
    limit: 10,
    used: 12,
    remaining: 0,
    utilization: 1,
    exceeded: true,
    periodStartAt: "2026-05-27T03:00:00.000Z",
    resetAt: "2026-05-28T03:00:00.000Z",
  });
  const weekly = limits.get("usage_limit:weekly");
  assert.equal(weekly?.utilization, 0.1);
  assert.equal(weekly?.remaining, 45);
  assert.equal(weekly?.exceeded, false);
  assert.equal(weekly?.resetAt, null);
});

test("usage limits are skipped when disabled or when no limit value is set", async () => {
  // The default stub throws if called, so reaching the assertions proves it was not read.
  for (const metadata of [
    { ...baseMetadata, usageLimitEnabled: false, dailyUsageLimitUsd: 10 },
    { ...baseMetadata, usageLimitEnabled: true, dailyUsageLimitUsd: null },
  ]) {
    const status = await buildApiKeySelfServiceStatus(metadata, makeDeps());
    assert.equal(
      status.limits.some((entry: LimitEntry) => entry.source === "usage_limit"),
      false
    );
  }
});

test("budget entry uses the budget's own window and reports exceeded only when the enforcer rejects", async () => {
  const periodStartAt = Date.UTC(2026, 4, 25);
  const budgetResetAt = Date.UTC(2026, 5, 1);
  const verdict = {
    allowed: true,
    activeLimitUsd: 20,
    periodUsed: 5,
    resetInterval: "weekly",
    periodStartAt,
    budgetResetAt,
  };

  const within = await buildApiKeySelfServiceStatus(
    baseMetadata,
    makeDeps({ checkBudget: () => verdict })
  );
  assert.deepEqual(byId(within.limits).get("budget"), {
    id: "budget",
    source: "budget",
    metric: "usd",
    window: "weekly",
    scope: { type: "global", value: null },
    limit: 20,
    used: 5,
    remaining: 15,
    utilization: 0.25,
    exceeded: false,
    periodStartAt: "2026-05-25T00:00:00.000Z",
    resetAt: "2026-06-01T00:00:00.000Z",
  });

  const over = await buildApiKeySelfServiceStatus(
    baseMetadata,
    makeDeps({ checkBudget: () => ({ ...verdict, allowed: false, periodUsed: 25 }) })
  );
  const budget = byId(over.limits).get("budget");
  assert.equal(budget?.exceeded, true);
  assert.equal(budget?.utilization, 1);
  assert.equal(budget?.remaining, 0);

  const none = await buildApiKeySelfServiceStatus(
    baseMetadata,
    makeDeps({ checkBudget: () => ({ allowed: true, activeLimitUsd: 0, resetInterval: null }) })
  );
  assert.equal(byId(none.limits).has("budget"), false);
});

test("token_limit entries cover enabled limits with their scope and the enforcer's >= comparison", async () => {
  const windows: Record<string, { periodStartAt: number; nextResetAt: number }> = {
    "lim-provider": { periodStartAt: Date.UTC(2026, 4, 27), nextResetAt: Date.UTC(2026, 4, 28) },
    "lim-global": { periodStartAt: Date.UTC(2026, 4, 1), nextResetAt: Date.UTC(2026, 5, 1) },
  };
  const usage: Record<string, number> = { "lim-provider": 1500, "lim-global": 250 };
  const deps = makeDeps({
    listTokenLimits: () => [
      {
        id: "lim-provider",
        scopeType: "provider",
        scopeValue: "claude",
        tokenLimit: 1000,
        resetInterval: "daily",
        enabled: true,
      },
      {
        id: "lim-off",
        scopeType: "model",
        scopeValue: "gpt-5",
        tokenLimit: 10,
        resetInterval: "daily",
        enabled: false,
      },
      {
        id: "lim-global",
        scopeType: "global",
        scopeValue: "",
        tokenLimit: 1000,
        resetInterval: "monthly",
        enabled: true,
      },
    ],
    getWindowUsage: (limit: { id: string }) => usage[limit.id],
    resetWindowIfElapsed: (limit: { id: string }) => windows[limit.id],
  });

  const status = await buildApiKeySelfServiceStatus(baseMetadata, deps);
  const limits = byId(status.limits);

  assert.equal(limits.has("token_limit:lim-off"), false, "disabled limits are not reported");
  assert.deepEqual(limits.get("token_limit:lim-provider"), {
    id: "token_limit:lim-provider",
    source: "token_limit",
    metric: "tokens",
    window: "daily",
    scope: { type: "provider", value: "claude" },
    limit: 1000,
    used: 1500,
    remaining: 0,
    utilization: 1,
    exceeded: true,
    periodStartAt: "2026-05-27T00:00:00.000Z",
    resetAt: "2026-05-28T00:00:00.000Z",
  });
  const global = limits.get("token_limit:lim-global");
  assert.deepEqual(global?.scope, { type: "global", value: null });
  assert.equal(global?.window, "monthly");
  assert.equal(global?.utilization, 0.25);
  assert.equal(global?.exceeded, false);
});

test("key_quota entries report tpm/rpm minute windows and the monthly USD cap, non-null limits only", async () => {
  const deps = makeDeps({
    getKeyQuotaStatus: () => ({
      enabled: true,
      limits: { tpmLimit: 1000, rpmLimit: null, monthlyAmountUsd: 100 },
      counters: { tpmUsed: 250.456, rpmUsed: 3, monthlyAmountUsd: 100 },
      tpmExceeded: false,
      rpmExceeded: false,
      monthlyExceeded: true,
      windowResetAtIso: "2026-05-27T15:31:00.000Z",
    }),
  });

  const status = await buildApiKeySelfServiceStatus(baseMetadata, deps);
  const limits = byId(status.limits);

  assert.equal(limits.has("key_quota:rpm"), false, "an unlimited dimension is not reported");
  assert.deepEqual(limits.get("key_quota:tpm"), {
    id: "key_quota:tpm",
    source: "key_quota",
    metric: "tokens",
    window: "minute",
    scope: { type: "global", value: null },
    limit: 1000,
    used: 250.46,
    remaining: 749.54,
    utilization: 0.2505,
    exceeded: false,
    periodStartAt: "2026-05-27T15:30:00.000Z",
    resetAt: "2026-05-27T15:31:00.000Z",
  });
  const monthly = limits.get("key_quota:monthly");
  assert.equal(monthly?.metric, "usd");
  assert.equal(monthly?.window, "monthly");
  assert.equal(monthly?.exceeded, true);
  assert.equal(monthly?.periodStartAt, "2026-05-01T00:00:00.000Z");
  assert.equal(monthly?.resetAt, "2026-06-01T00:00:00.000Z");
});

test("a failing limit source is omitted without failing the status or leaking the error", async (t) => {
  const warnings: string[] = [];
  t.mock.method(console, "warn", (...args: unknown[]) => {
    warnings.push(args.map(String).join(" "));
  });
  const deps = makeDeps({
    listTokenLimits: () => {
      throw new Error("SQLITE_CORRUPT: database disk image is malformed");
    },
    checkBudget: () => ({
      allowed: true,
      activeLimitUsd: 10,
      periodUsed: 1,
      resetInterval: "daily",
      periodStartAt: Date.UTC(2026, 4, 27),
      budgetResetAt: Date.UTC(2026, 4, 28),
    }),
  });

  const status = await buildApiKeySelfServiceStatus(baseMetadata, deps);

  assert.deepEqual(
    status.limits.map((entry: LimitEntry) => entry.id),
    ["budget"]
  );
  assert.equal(JSON.stringify(status).includes("SQLITE_CORRUPT"), false);
  assert.equal(warnings.length, 1);
  assert.match(warnings[0], /token_limit/);
  assert.equal(warnings[0].includes("SQLITE_CORRUPT"), false);
});

test("admin preview skips the self:usage scope check and always includes filtered account quotas", async () => {
  const metadata = {
    ...baseMetadata,
    scopes: [] as string[],
    sharedQuotaProviders: ["claude"],
  };
  const deps = makeDeps({
    getProviderConnections: async () => [
      { id: "conn-codex", provider: "codex", isActive: true, name: "Codex team" },
      { id: "conn-claude", provider: "claude", isActive: true, name: "Claude team" },
    ],
    getProviderLimitsCache: () => ({
      quotas: { session: { used: 10, remaining: 90, resetAt: "2026-05-27T18:00:00.000Z" } },
      plan: "Claude Max",
      fetchedAt: "2026-05-27T15:29:00.000Z",
    }),
  });

  await assert.rejects(
    () => buildApiKeySelfServiceStatus(metadata, deps),
    /missing_self_usage_scope/
  );

  const preview = await buildApiKeySelfServiceStatus(metadata, deps, { adminPreview: true });
  assert.deepEqual(
    preview.accountQuotas?.map((entry: { connectionId: string }) => entry.connectionId),
    ["conn-claude"]
  );
  assert.ok(Array.isArray(preview.limits));

  // Without the preview flag, a self:usage key lacking self:account-quota sees no quotas.
  const holder = await buildApiKeySelfServiceStatus(
    { ...metadata, scopes: [SELF_USAGE_SCOPE] },
    deps
  );
  assert.equal("accountQuotas" in holder, false);
  const optedIn = await buildApiKeySelfServiceStatus(
    { ...metadata, scopes: [SELF_USAGE_SCOPE, SELF_ACCOUNT_QUOTA_SCOPE] },
    deps
  );
  assert.equal(optedIn.accountQuotas?.length, 1);
});
