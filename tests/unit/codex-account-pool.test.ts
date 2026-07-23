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
