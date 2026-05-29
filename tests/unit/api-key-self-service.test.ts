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

test("self-service status treats unrestricted account quota connection access as ambiguous", async () => {
  const metadata = {
    id: "key-unrestricted",
    name: "unrestricted",
    scopes: [SELF_USAGE_SCOPE, SELF_ACCOUNT_QUOTA_SCOPE],
    allowedConnections: [],
  };
  const { deps } = makeDeps();

  const status = await buildApiKeySelfServiceStatus(metadata, deps);

  assert.deepEqual(status.accountQuota, {
    available: false,
    reason: "ambiguous_connection",
  });
});

test("self-service status normalizes Codex account quota only for one explicit connection", async () => {
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
