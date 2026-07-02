import test from "node:test";
import assert from "node:assert/strict";

import {
  isRecoverableCooldownConnection,
  resolveConnectionRecoveryIntervalMs,
  runConnectionRecoveryTick,
  selectRecoverableConnections,
  type RecoverableConnectionInput,
} from "../../src/lib/quota/connectionRecovery.ts";

const NOW = Date.UTC(2026, 5, 23, 12, 0, 0); // fixed clock for deterministic tests
const PAST = new Date(NOW - 60_000).toISOString(); // 60s in the past → cooldown elapsed
const FUTURE = new Date(NOW + 60_000).toISOString(); // 60s in the future → still cooling

function conn(overrides: Partial<RecoverableConnectionInput>): RecoverableConnectionInput {
  // Use the `in` operator so an EXPLICIT null/undefined override is honored
  // (??/|| would collapse it back to the default and hide the no-cooldown case).
  return {
    id: "id" in overrides ? (overrides.id as string) : "c1",
    testStatus: "testStatus" in overrides ? overrides.testStatus : "unavailable",
    rateLimitedUntil: "rateLimitedUntil" in overrides ? overrides.rateLimitedUntil : PAST,
  };
}

test("isRecoverableCooldownConnection: unavailable + elapsed cooldown → recoverable", () => {
  assert.equal(
    isRecoverableCooldownConnection(conn({ testStatus: "unavailable", rateLimitedUntil: PAST }), NOW),
    true
  );
});

test("isRecoverableCooldownConnection: cooldown still in the future → NOT recoverable", () => {
  assert.equal(
    isRecoverableCooldownConnection(
      conn({ testStatus: "unavailable", rateLimitedUntil: FUTURE }),
      NOW
    ),
    false
  );
});

test("isRecoverableCooldownConnection: terminal states are never recovered", () => {
  for (const status of ["banned", "expired", "credits_exhausted"]) {
    assert.equal(
      isRecoverableCooldownConnection(conn({ testStatus: status, rateLimitedUntil: PAST }), NOW),
      false,
      `${status} must not be recoverable`
    );
  }
});

test("isRecoverableCooldownConnection: terminal-status matching is case/space insensitive", () => {
  assert.equal(
    isRecoverableCooldownConnection(conn({ testStatus: " Banned ", rateLimitedUntil: PAST }), NOW),
    false
  );
});

test("isRecoverableCooldownConnection: no rateLimitedUntil → NOT recoverable", () => {
  assert.equal(
    isRecoverableCooldownConnection(conn({ testStatus: "unavailable", rateLimitedUntil: null }), NOW),
    false
  );
  assert.equal(
    isRecoverableCooldownConnection(
      conn({ testStatus: "unavailable", rateLimitedUntil: undefined }),
      NOW
    ),
    false
  );
});

test("isRecoverableCooldownConnection: status other than 'unavailable' is left alone", () => {
  // Only the transient-cooldown status should be proactively restored. An
  // 'active' or null status with a stale rateLimitedUntil is not this job's
  // concern (the lazy backoff-decay path already handles active rows).
  assert.equal(
    isRecoverableCooldownConnection(conn({ testStatus: "active", rateLimitedUntil: PAST }), NOW),
    false
  );
  assert.equal(
    isRecoverableCooldownConnection(conn({ testStatus: null, rateLimitedUntil: PAST }), NOW),
    false
  );
});

test("isRecoverableCooldownConnection: missing connection id → NOT recoverable", () => {
  assert.equal(
    isRecoverableCooldownConnection(conn({ id: "", rateLimitedUntil: PAST }), NOW),
    false
  );
});

test("isRecoverableCooldownConnection: numeric-epoch rateLimitedUntil string is tolerated", () => {
  // The rate_limited_until TEXT column can hold a numeric epoch string (#3954).
  assert.equal(
    isRecoverableCooldownConnection(
      conn({ testStatus: "unavailable", rateLimitedUntil: String(NOW - 1_000) }),
      NOW
    ),
    true
  );
  assert.equal(
    isRecoverableCooldownConnection(
      conn({ testStatus: "unavailable", rateLimitedUntil: String(NOW + 1_000) }),
      NOW
    ),
    false
  );
});

test("selectRecoverableConnections returns only the elapsed-cooldown unavailable rows", () => {
  const connections: RecoverableConnectionInput[] = [
    conn({ id: "elapsed", testStatus: "unavailable", rateLimitedUntil: PAST }),
    conn({ id: "still-cooling", testStatus: "unavailable", rateLimitedUntil: FUTURE }),
    conn({ id: "banned", testStatus: "banned", rateLimitedUntil: PAST }),
    conn({ id: "expired", testStatus: "expired", rateLimitedUntil: PAST }),
    conn({ id: "credits", testStatus: "credits_exhausted", rateLimitedUntil: PAST }),
    conn({ id: "no-cooldown", testStatus: "unavailable", rateLimitedUntil: null }),
    conn({ id: "active", testStatus: "active", rateLimitedUntil: PAST }),
  ];

  const recoverable = selectRecoverableConnections(connections, NOW);
  assert.deepEqual(
    recoverable.map((c) => c.id),
    ["elapsed"]
  );
});

test("selectRecoverableConnections returns [] for empty / non-array input", () => {
  assert.deepEqual(selectRecoverableConnections([], NOW), []);
  assert.deepEqual(
    selectRecoverableConnections(undefined as unknown as RecoverableConnectionInput[], NOW),
    []
  );
});

test("selectRecoverableConnections does not mutate the input array", () => {
  const connections: RecoverableConnectionInput[] = [
    conn({ id: "a", rateLimitedUntil: PAST }),
    conn({ id: "b", rateLimitedUntil: FUTURE }),
  ];
  const before = connections.length;
  selectRecoverableConnections(connections, NOW);
  assert.equal(connections.length, before);
});

test("runConnectionRecoveryTick clears only the elapsed-cooldown connections (injected deps, no DB)", async () => {
  const cleared: string[] = [];
  const result = await runConnectionRecoveryTick({
    nowMs: NOW,
    loadConnections: async () => [
      conn({ id: "elapsed", testStatus: "unavailable", rateLimitedUntil: PAST }),
      conn({ id: "still-cooling", testStatus: "unavailable", rateLimitedUntil: FUTURE }),
      conn({ id: "banned", testStatus: "banned", rateLimitedUntil: PAST }),
      conn({ id: "active", testStatus: "active", rateLimitedUntil: PAST }),
    ],
    clearConnectionError: async (connectionId) => {
      cleared.push(connectionId);
    },
  });

  assert.deepEqual(cleared, ["elapsed"]);
  assert.equal(result.scanned, 4);
  assert.equal(result.recovered, 1);
  assert.deepEqual(result.recoveredIds, ["elapsed"]);
});

test("runConnectionRecoveryTick isolates a per-connection clear failure (others still recovered)", async () => {
  const cleared: string[] = [];
  const warnings: string[] = [];
  const result = await runConnectionRecoveryTick({
    nowMs: NOW,
    loadConnections: async () => [
      conn({ id: "boom", testStatus: "unavailable", rateLimitedUntil: PAST }),
      conn({ id: "ok", testStatus: "unavailable", rateLimitedUntil: PAST }),
    ],
    clearConnectionError: async (connectionId) => {
      if (connectionId === "boom") throw new Error("db write failed");
      cleared.push(connectionId);
    },
    logger: { warn: (m) => warnings.push(m) },
  });

  assert.deepEqual(cleared, ["ok"]);
  assert.equal(result.recovered, 1);
  assert.equal(warnings.length, 1);
});

test("runConnectionRecoveryTick returns a zero result and never throws when loading fails", async () => {
  const result = await runConnectionRecoveryTick({
    nowMs: NOW,
    loadConnections: async () => {
      throw new Error("DB unavailable");
    },
    clearConnectionError: async () => {
      throw new Error("must not be called");
    },
  });
  assert.deepEqual(result, { scanned: 0, recovered: 0, recoveredIds: [] });
});

test("resolveConnectionRecoveryIntervalMs defaults to 60s and clamps to a floor", () => {
  assert.equal(resolveConnectionRecoveryIntervalMs(undefined), 60_000);
  assert.equal(resolveConnectionRecoveryIntervalMs(""), 60_000);
  assert.equal(resolveConnectionRecoveryIntervalMs("not-a-number"), 60_000);
  assert.equal(resolveConnectionRecoveryIntervalMs("0"), 60_000);
  assert.equal(resolveConnectionRecoveryIntervalMs("-5"), 60_000);
  assert.equal(resolveConnectionRecoveryIntervalMs("120000"), 120_000);
  assert.equal(resolveConnectionRecoveryIntervalMs("1000"), 5_000); // clamped up to MIN_TICK_MS
});
