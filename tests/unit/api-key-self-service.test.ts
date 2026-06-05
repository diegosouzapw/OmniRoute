import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import DatabaseSync from "better-sqlite3";

import { SELF_ACCOUNT_QUOTA_SCOPE, SELF_USAGE_SCOPE } from "../../src/shared/constants/selfServiceScopes.ts";
import { buildApiKeySelfServiceStatus } from "../../src/lib/usage/apiKeySelfService.ts";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const migrationPath = path.join(
  repoRoot,
  "src/lib/db/migrations/075_api_key_self_service_usage_scopes.sql"
);

test("self-service scope migration backfills own usage once and preserves explicit account quota opt-in", () => {
  const sql = fs.readFileSync(migrationPath, "utf8");
  const db = new DatabaseSync(":memory:");
  db.exec(`
    CREATE TABLE api_keys (
      id TEXT PRIMARY KEY,
      scopes TEXT
    );

    INSERT INTO api_keys (id, scopes) VALUES
      ('legacy-empty', '[]'),
      ('legacy-null', NULL),
      ('custom', '["custom:scope"]'),
      ('quota-opt-in', '["${SELF_ACCOUNT_QUOTA_SCOPE}"]'),
      ('already-disabled-after-migration', '["custom:scope"]');
  `);

  db.exec(sql);
  db.prepare("UPDATE api_keys SET scopes = ? WHERE id = ?").run(
    JSON.stringify(["custom:scope"]),
    "already-disabled-after-migration"
  );
  db.exec(sql);

  const rows = db.prepare("SELECT id, scopes FROM api_keys ORDER BY id").all() as Array<{
    id: string;
    scopes: string;
  }>;
  const scopesById = new Map(rows.map((row) => [row.id, JSON.parse(row.scopes) as string[]]));

  assert.deepEqual(scopesById.get("legacy-empty"), [SELF_USAGE_SCOPE]);
  assert.deepEqual(scopesById.get("legacy-null"), [SELF_USAGE_SCOPE]);
  assert.deepEqual(scopesById.get("custom"), ["custom:scope", SELF_USAGE_SCOPE]);
  assert.deepEqual(scopesById.get("quota-opt-in"), [
    SELF_ACCOUNT_QUOTA_SCOPE,
    SELF_USAGE_SCOPE,
  ]);
  assert.deepEqual(scopesById.get("already-disabled-after-migration"), ["custom:scope"]);
});

function makeDeps(overrides: Record<string, unknown> = {}) {
  const tokenRows = overrides.tokenRows ?? {
    inputTokens: 900,
    outputTokens: 30,
    cacheReadTokens: 120,
    cacheCreationTokens: 10,
    reasoningTokens: 5,
  };
  const dbParams: unknown[][] = [];

  return {
    dbParams,
    deps: {
      now: () => Date.UTC(2026, 4, 29, 12, 0, 0),
      getCostSummary: () => ({
        budget: null,
        totalCostMonth: 12.34,
        totalCostPeriod: 0,
        activeLimitUsd: 0,
        resetInterval: null,
        resetTime: null,
        budgetResetAt: null,
        lastBudgetResetAt: null,
        periodStartAt: null,
        nextResetAt: null,
        warningThreshold: null,
      }),
      checkBudget: () => ({ allowed: true }),
      getDbInstance: () => ({
        prepare: () => ({
          get: (...params: unknown[]) => {
            dbParams.push(params);
            return tokenRows;
          },
        }),
      }),
      getProviderConnectionById: async () => null,
      getProviderConnections: async () => [],
      fetchAndPersistProviderLimits: async () => {
        throw new Error("unexpected quota fetch");
      },
      ...overrides,
    },
  };
}

test("self-service status reports own cost and token usage with null budget fields when no budget exists", async () => {
  const metadata = {
    id: "key-a",
    name: "team-a",
    scopes: [SELF_USAGE_SCOPE],
    allowedConnections: [],
  };
  const { deps, dbParams } = makeDeps();

  const status = await buildApiKeySelfServiceStatus(metadata, deps);

  assert.deepEqual(status.apiKey, { id: "key-a", name: "team-a" });
  assert.equal(status.usage.cost.usedUsd, 12.34);
  assert.equal(status.usage.cost.limitUsd, null);
  assert.equal(status.usage.cost.remainingUsd, null);
  assert.equal(status.usage.cost.usedPercent, null);
  assert.equal(status.usage.cost.period, "monthly");
  assert.equal(status.usage.tokens.totalTokens, 1065);
  assert.equal(dbParams[0][0], "key-a");
  assert.equal(dbParams[0][1], "2026-05-01T00:00:00.000Z");
  assert.equal("accountQuota" in status, false);
});

test("self-service status reports USD budget percentage using the budget period", async () => {
  const metadata = {
    id: "key-budget",
    name: "budgeted",
    scopes: [SELF_USAGE_SCOPE],
    allowedConnections: [],
  };
  const periodStart = Date.UTC(2026, 4, 1, 0, 0, 0);
  const nextReset = Date.UTC(2026, 5, 1, 0, 0, 0);
  const { deps } = makeDeps({
    getCostSummary: () => ({
      budget: { resetInterval: "monthly" },
      totalCostMonth: 99,
      totalCostPeriod: 12.5,
      activeLimitUsd: 50,
      resetInterval: "monthly",
      resetTime: "00:00",
      budgetResetAt: nextReset,
      lastBudgetResetAt: periodStart,
      periodStartAt: periodStart,
      nextResetAt: nextReset,
      warningThreshold: 0.8,
    }),
  });

  const status = await buildApiKeySelfServiceStatus(metadata, deps);

  assert.equal(status.usage.cost.usedUsd, 12.5);
  assert.equal(status.usage.cost.limitUsd, 50);
  assert.equal(status.usage.cost.remainingUsd, 37.5);
  assert.equal(status.usage.cost.usedPercent, 25);
  assert.equal(status.usage.cost.periodStartAt, "2026-05-01T00:00:00.000Z");
  assert.equal(status.usage.cost.resetAt, "2026-06-01T00:00:00.000Z");
});

test("self-service status preserves ISO and Date budget timestamps", async () => {
  const metadata = {
    id: "key-budget-date",
    name: "budgeted date",
    scopes: [SELF_USAGE_SCOPE],
    allowedConnections: [],
  };
  const { deps, dbParams } = makeDeps({
    getCostSummary: () => ({
      budget: { resetInterval: "weekly" },
      totalCostMonth: 99,
      totalCostPeriod: 15,
      activeLimitUsd: 60,
      resetInterval: "weekly",
      resetTime: "00:00",
      budgetResetAt: null,
      lastBudgetResetAt: null,
      periodStartAt: "2026-05-18T00:00:00.000Z",
      nextResetAt: new Date("2026-05-25T00:00:00.000Z"),
      warningThreshold: 0.8,
    }),
  });

  const status = await buildApiKeySelfServiceStatus(metadata, deps);

  assert.equal(status.usage.cost.periodStartAt, "2026-05-18T00:00:00.000Z");
  assert.equal(status.usage.cost.resetAt, "2026-05-25T00:00:00.000Z");
  assert.equal(dbParams[0][1], "2026-05-18T00:00:00.000Z");
});

test("self-service status reports all explicitly allowed provider account quotas", async () => {
  const metadata = {
    id: "key-multi",
    name: "multi",
    scopes: [SELF_USAGE_SCOPE, SELF_ACCOUNT_QUOTA_SCOPE],
    allowedConnections: ["conn-codex", "conn-claude"],
  };
  const fetches: string[] = [];
  const { deps } = makeDeps({
    getProviderConnectionById: async (connectionId: string) => ({
      id: connectionId,
      provider: connectionId === "conn-codex" ? "codex" : "claude",
      isActive: true,
    }),
    fetchAndPersistProviderLimits: async (connectionId: string) => {
      fetches.push(connectionId);
      if (connectionId === "conn-codex") {
        return {
          connection: { id: connectionId, provider: "codex" },
          usage: {
            plan: "ChatGPT Plus",
            quotas: {
              session: { used: 1, remaining: 99, resetAt: "2026-05-29T18:11:44.000Z" },
            },
          },
          cache: { quotas: null, plan: null, message: null, fetchedAt: "" },
        };
      }
      return {
        connection: { id: connectionId, provider: "claude" },
        usage: {
          plan: "Claude Max",
          quotas: {
            daily: { usedPercentage: 35, remainingPercentage: 65, resetAt: "2026-05-30T00:00:00.000Z" },
          },
        },
        cache: { quotas: null, plan: null, message: null, fetchedAt: "" },
      };
    },
  });

  const status = await buildApiKeySelfServiceStatus(metadata, deps);

  assert.deepEqual(fetches, ["conn-codex", "conn-claude"]);
  assert.deepEqual(
    status.accountQuotas.map((quota: { connectionId: string }) => quota.connectionId),
    ["conn-codex", "conn-claude"]
  );
  assert.equal(status.accountQuotas[0].provider, "codex");
  assert.equal(status.accountQuotas[0].plan, "ChatGPT Plus");
  assert.equal(status.accountQuotas[0].quotas.session.remainingPercentage, 99);
  assert.equal(status.accountQuotas[1].provider, "claude");
  assert.equal(status.accountQuotas[1].plan, "Claude Max");
  assert.equal(status.accountQuotas[1].quotas.daily.usedPercentage, 35);
});

test("self-service status reports all active provider account quotas for unrestricted keys", async () => {
  const metadata = {
    id: "key-unrestricted",
    name: "unrestricted",
    scopes: [SELF_USAGE_SCOPE, SELF_ACCOUNT_QUOTA_SCOPE],
    allowedConnections: [],
  };
  const { deps } = makeDeps({
    getProviderConnections: async () => [
      { id: "conn-codex", provider: "codex", isActive: true },
      { id: "conn-cursor", provider: "cursor", isActive: true },
      { id: "conn-disabled", provider: "claude", isActive: false },
    ],
    fetchAndPersistProviderLimits: async (connectionId: string) => ({
      connection: { id: connectionId, provider: connectionId === "conn-codex" ? "codex" : "cursor" },
      usage: {
        plan: connectionId === "conn-codex" ? "ChatGPT Plus" : "Cursor Pro",
        quotas: {
          monthly: { used: 25, remaining: 75, resetAt: "2026-06-01T00:00:00.000Z" },
        },
      },
      cache: { quotas: null, plan: null, message: null, fetchedAt: "" },
    }),
  });

  const status = await buildApiKeySelfServiceStatus(metadata, deps);

  assert.deepEqual(
    status.accountQuotas.map((quota: { connectionId: string }) => quota.connectionId),
    ["conn-codex", "conn-cursor"]
  );
  assert.equal(status.accountQuotas[0].quotas.monthly.remainingPercentage, 75);
  assert.equal(status.accountQuotas[1].plan, "Cursor Pro");
});

test("self-service status isolates provider account quota fetch failures per connection", async () => {
  const metadata = {
    id: "key-partial",
    name: "partial",
    scopes: [SELF_USAGE_SCOPE, SELF_ACCOUNT_QUOTA_SCOPE],
    allowedConnections: ["conn-codex", "conn-cursor"],
  };
  const { deps } = makeDeps({
    getProviderConnectionById: async (connectionId: string) => ({
      id: connectionId,
      provider: connectionId === "conn-codex" ? "codex" : "cursor",
      isActive: true,
    }),
    fetchAndPersistProviderLimits: async (connectionId: string) => {
      if (connectionId === "conn-cursor") throw new Error("upstream unavailable");
      return {
        connection: { id: connectionId, provider: "codex" },
        usage: {
          quotas: {
            weekly: { used: 40, remaining: 60, resetAt: "2026-06-01T00:00:00.000Z" },
          },
        },
        cache: { quotas: null, plan: null, message: null, fetchedAt: "" },
      };
    },
  });

  const status = await buildApiKeySelfServiceStatus(metadata, deps);

  assert.equal(status.accountQuotas[0].connectionId, "conn-codex");
  assert.equal(status.accountQuotas[0].quotas.weekly.remainingPercentage, 60);
  assert.deepEqual(status.accountQuotas[1], {
    provider: "cursor",
    connectionId: "conn-cursor",
    shared: true,
    available: false,
    reason: "fetch_failed",
  });
});

test("self-service status isolates explicit provider connection lookup failures", async () => {
  const metadata = {
    id: "key-lookup-partial",
    name: "lookup partial",
    scopes: [SELF_USAGE_SCOPE, SELF_ACCOUNT_QUOTA_SCOPE],
    allowedConnections: ["conn-codex", "conn-missing"],
  };
  const { deps } = makeDeps({
    getProviderConnectionById: async (connectionId: string) => {
      if (connectionId === "conn-missing") throw new Error("database unavailable");
      return {
        id: connectionId,
        provider: "codex",
        isActive: true,
      };
    },
    fetchAndPersistProviderLimits: async (connectionId: string) => ({
      connection: { id: connectionId, provider: "codex" },
      usage: {
        quotas: {
          weekly: { used: 40, remaining: 60, resetAt: "2026-06-01T00:00:00.000Z" },
        },
      },
      cache: { quotas: null, plan: null, message: null, fetchedAt: "" },
    }),
  });

  const status = await buildApiKeySelfServiceStatus(metadata, deps);

  assert.equal(status.accountQuotas[0].connectionId, "conn-codex");
  assert.equal(status.accountQuotas[0].quotas.weekly.remainingPercentage, 60);
  assert.deepEqual(status.accountQuotas[1], {
    provider: "unknown",
    connectionId: "conn-missing",
    shared: true,
    available: false,
    reason: "connection_lookup_failed",
  });
});

test("self-service status keeps usage visible when unrestricted provider lookup fails", async () => {
  const metadata = {
    id: "key-lookup-failed",
    name: "lookup failed",
    scopes: [SELF_USAGE_SCOPE, SELF_ACCOUNT_QUOTA_SCOPE],
    allowedConnections: [],
  };
  const { deps } = makeDeps({
    getProviderConnections: async () => {
      throw new Error("database unavailable");
    },
  });

  const status = await buildApiKeySelfServiceStatus(metadata, deps);

  assert.equal(status.usage.cost.usedUsd, 12.34);
  assert.deepEqual(status.accountQuotas, []);
  assert.equal("accountQuota" in status, false);
});

test("self-service status normalizes Codex account quota for one explicit connection", async () => {
  const metadata = {
    id: "key-codex",
    name: "codex",
    scopes: [SELF_USAGE_SCOPE, SELF_ACCOUNT_QUOTA_SCOPE],
    allowedConnections: ["conn-codex"],
  };
  const { deps } = makeDeps({
    getProviderConnectionById: async (connectionId: string) => ({
      id: connectionId,
      provider: "codex",
    }),
    fetchAndPersistProviderLimits: async () => ({
      connection: { id: "conn-codex", provider: "codex" },
      usage: {
        quotas: {
          session: { used: 1, remaining: 99, resetAt: "2026-05-29T18:11:44.000Z" },
          weekly: { used: 97, remaining: 3, resetAt: "2026-05-31T01:23:38.000Z" },
        },
      },
      cache: { quotas: null, plan: null, message: null, fetchedAt: "" },
    }),
  });

  const status = await buildApiKeySelfServiceStatus(metadata, deps);

  assert.equal(status.accountQuotas.length, 1);
  assert.deepEqual(status.accountQuotas[0], status.accountQuota);
  assert.deepEqual(status.accountQuota, {
    provider: "codex",
    connectionId: "conn-codex",
    shared: true,
    quotas: {
      session: {
        usedPercentage: 1,
        remainingPercentage: 99,
        resetAt: "2026-05-29T18:11:44.000Z",
      },
      weekly: {
        usedPercentage: 97,
        remainingPercentage: 3,
        resetAt: "2026-05-31T01:23:38.000Z",
      },
    },
  });
});
