import test from "node:test";
import assert from "node:assert/strict";

const codexAccount = await import("../../open-sse/services/codexAccount/index.ts");

const SPARK_MODEL = "gpt-5.3-codex-spark";
const SOL_MODEL = "gpt-5.5";

function futureTimestamp(offsetMs = 60_000): string {
  return new Date(Date.now() + offsetMs).toISOString();
}

test("one persisted parent creates same-interface parent, Codex, and Spark accounts", () => {
  const connection = {
    id: "codex-parent-1",
    provider: "codex",
    providerSpecificData: {
      accessToken: "must remain on the parent connection",
    },
  };

  const pool = codexAccount.createCodexAccountPool(connection);

  assert.equal(pool.accounts.length, 3);
  assert.equal(pool.parent.scope, null);
  assert.equal(pool.parent.kind, "parent");
  assert.deepEqual(
    pool.children.map((account) => account.scope),
    ["codex", "spark"]
  );
  for (const account of pool.accounts) {
    assert.strictEqual(account.connection, connection);
    assert.equal(account.connectionId, connection.id);
    assert.deepEqual(account.key.parentConnectionId, connection.id);
    assert.equal("accessToken" in account, false);
    assert.equal("id" in account, false);
  }
  assert.deepEqual(
    pool.children.map((account) => account.key.scope),
    ["codex", "spark"]
  );
});

test("model resolution selects a scoped child and blank models resolve to the parent", () => {
  const pool = codexAccount.createCodexAccountPool({
    id: "codex-parent-2",
    provider: "codex",
    providerSpecificData: {},
  });

  assert.equal(codexAccount.resolveCodexAccount(pool, SPARK_MODEL).scope, "spark");
  assert.equal(codexAccount.resolveCodexAccount(pool, SOL_MODEL).scope, "codex");
  assert.equal(codexAccount.resolveCodexAccount(pool, null).kind, "parent");
  assert.equal(codexAccount.resolveCodexAccount(pool, undefined).kind, "parent");
  assert.equal(codexAccount.resolveCodexAccount(pool, "   ").kind, "parent");
});

test("quota hydration reads scoped facts without leaking legacy singleton state", () => {
  const sparkResetAt = futureTimestamp(90_000);
  const pool = codexAccount.createCodexAccountPool({
    id: "connection-quota-hydration",
    provider: "codex",
    providerSpecificData: {
      codexQuotaStateByScope: {
        codex: { usage5h: 25, limit5h: 100, resetAt5h: futureTimestamp(30_000) },
      },
      codexExhaustedWindowByScope: { codex: "5h" },
      codexQuotaState: {
        scope: "spark",
        usage5h: 100,
        limit5h: 100,
        resetAt5h: sparkResetAt,
      },
      codexExhaustedWindow: "7d",
    },
  });

  const codex = codexAccount.getCodexChildQuotaHydration(pool.children[0]);
  const spark = codexAccount.getCodexChildQuotaHydration(pool.children[1]);

  assert.equal(codex.quotaState?.usage5h, 25);
  assert.equal(codex.exhaustedWindow, "5h");
  assert.equal(spark.quotaState?.usage5h, 100);
  assert.equal(spark.exhaustedWindow, "7d");
});

test("parent inspection is an aggregate of child cooldowns", () => {
  const pool = codexAccount.createCodexAccountPool({
    id: "codex-parent-3",
    provider: "codex",
    providerSpecificData: {
      codexScopeRateLimitedUntil: { spark: futureTimestamp() },
    },
  });

  const parentState = codexAccount.inspectCodexAccount(pool, pool.parent);
  assert.equal(parentState.kind, "parent");
  if (parentState.kind === "parent") {
    assert.equal(parentState.status, "partially_limited");
    assert.deepEqual(parentState.limitedScopes, ["spark"]);
  }

  const sparkState = codexAccount.inspectCodexAccount(pool, pool.children[1]);
  assert.equal(sparkState.kind, "child");
  if (sparkState.kind === "child") {
    assert.equal(sparkState.scope, "spark");
    assert.equal(sparkState.unavailable, true);
  }
});

test("earliest scoped cooldown identifies the child and parent connection", () => {
  const earlier = futureTimestamp(30_000);
  const later = futureTimestamp(60_000);
  const pools = [
    codexAccount.createCodexAccountPool({
      id: "codex-parent-4",
      provider: "codex",
      providerSpecificData: { codexScopeRateLimitedUntil: { spark: later } },
    }),
    codexAccount.createCodexAccountPool({
      id: "codex-parent-5",
      provider: "codex",
      providerSpecificData: { codexScopeRateLimitedUntil: { spark: earlier } },
    }),
  ];

  const earliest = codexAccount.getEarliestCodexChildCooldown(pools, SPARK_MODEL);
  assert.equal(earliest?.account.connectionId, "codex-parent-5");
  assert.equal(earliest?.account.scope, "spark");
  assert.equal(earliest?.until, earlier);
  assert.equal(codexAccount.getEarliestCodexChildCooldown(pools, " "), null);
});

test("account inspection rejects an account from a different parent pool", () => {
  const first = codexAccount.createCodexAccountPool({
    id: "codex-parent-5a",
    provider: "codex",
    providerSpecificData: {},
  });
  const second = codexAccount.createCodexAccountPool({
    id: "codex-parent-5b",
    provider: "codex",
    providerSpecificData: {},
  });

  assert.throws(
    () => codexAccount.inspectCodexAccount(first, second.children[0]),
    /does not belong to this pool/
  );
});

test("expired and invalid legacy timestamps are not active cooldowns", () => {
  const pool = codexAccount.createCodexAccountPool({
    id: "codex-parent-6",
    provider: "codex",
    providerSpecificData: {
      codexScopeRateLimitedUntil: {
        codex: new Date(Date.now() - 60_000).toISOString(),
        spark: "not-a-timestamp",
      },
    },
  });

  const codexState = codexAccount.inspectCodexAccount(pool, pool.children[0]);
  const sparkState = codexAccount.inspectCodexAccount(pool, pool.children[1]);
  assert.equal(codexState.kind, "child");
  assert.equal(sparkState.kind, "child");
  if (codexState.kind === "child") assert.equal(codexState.unavailable, false);
  if (sparkState.kind === "child") assert.equal(sparkState.unavailable, false);
  assert.equal(codexAccount.inspectCodexAccount(pool, pool.parent).status, "available");
});

test("projects quota exhaustion and active cooldown as distinct child facts", () => {
  const now = Date.parse("2026-01-01T00:00:00.000Z");
  const sparkCooldown = "2026-01-01T01:00:00.000Z";
  const projected = codexAccount.projectCodexAccountPool(
    {
      id: "codex-projection",
      provider: "codex",
      providerSpecificData: {
        codexScopeRateLimitedUntil: { spark: sparkCooldown },
        codexQuotaStateByScope: {
          codex: {
            usage5h: 100,
            limit5h: 100,
            resetAt5h: "2026-01-01T02:00:00.000Z",
            observedAt: "2025-12-31T23:59:00.000Z",
          },
          spark: { usage7d: 80, limit7d: 100, resetAt7d: "2026-01-02T00:00:00.000Z" },
        },
        codexExhaustedWindowByScope: { codex: "5h" },
      },
    },
    now
  );

  assert.equal(projected.parentConnectionId, "codex-projection");
  assert.equal(projected.aggregate.status, "fully_limited");
  assert.equal(projected.aggregate.limitedChildCount, 2);
  assert.deepEqual(
    projected.children.map((child) => child.key),
    [
      { parentConnectionId: "codex-projection", scope: "codex" },
      { parentConnectionId: "codex-projection", scope: "spark" },
    ]
  );
  assert.equal("connectionId" in projected.children[0], false);
  assert.deepEqual(
    projected.children.map((child) => ({
      unavailable: child.unavailable,
      cooldown: child.cooldown,
      exhaustedWindow: child.quota.exhaustedWindow,
    })),
    [
      {
        unavailable: true,
        cooldown: { active: false, rateLimitedUntil: null },
        exhaustedWindow: "5h",
      },
      {
        unavailable: true,
        cooldown: { active: true, rateLimitedUntil: sparkCooldown },
        exhaustedWindow: null,
      },
    ]
  );
  assert.equal(projected.children[0].quota.windows["5h"]?.usedPercentage, 100);
});

test("projects neither exhaustion nor an expired cooldown as unavailable", () => {
  const now = Date.parse("2026-01-01T00:00:00.000Z");
  const projected = codexAccount.projectCodexAccountPool(
    {
      id: "codex-available-projection",
      provider: "codex",
      providerSpecificData: {
        codexScopeRateLimitedUntil: { spark: "2025-12-31T23:59:00.000Z" },
      },
    },
    now
  );

  assert.equal(projected.aggregate.status, "available");
  assert.equal(projected.aggregate.limitedChildCount, 0);
  assert.equal(projected.children[1].unavailable, false);
  assert.deepEqual(projected.children[1].cooldown, {
    active: false,
    rateLimitedUntil: null,
  });
});

test("projects an exhausted window as available after its reset passes", () => {
  const now = Date.parse("2026-01-01T00:00:00.000Z");
  const projected = codexAccount.projectCodexAccountPool(
    {
      id: "codex-expired-quota-projection",
      provider: "codex",
      providerSpecificData: {
        codexScopeRateLimitedUntil: { codex: "2025-12-31T23:59:59.000Z" },
        codexQuotaStateByScope: {
          codex: {
            usage5h: 100,
            limit5h: 100,
            resetAt5h: "2025-12-31T23:59:59.000Z",
            observedAt: "2025-12-31T18:59:00.000Z",
          },
        },
        codexExhaustedWindowByScope: { codex: "5h" },
      },
    },
    now
  );

  assert.equal(projected.aggregate.status, "available");
  assert.equal(projected.aggregate.limitedChildCount, 0);
  assert.equal(projected.children[0].unavailable, false);
  assert.equal(projected.children[0].quota.exhaustedWindow, null);
  assert.equal(projected.children[0].quota.windows["5h"]?.resetAt, "2025-12-31T23:59:59.000Z");
});
