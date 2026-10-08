import test from "node:test";
import assert from "node:assert/strict";

// Scoped token-refresh breaker: in "connection" scope, failures on one
// connection must not block refresh on another connection of the same
// provider. In the default "provider" scope, behavior is unchanged.
const { isProviderBlocked, getCircuitBreakerStatus, refreshWithRetry } =
  await import("../../open-sse/services/tokenRefresh/circuitBreaker.ts");

const silentLog = {
  info() {},
  warn() {},
  error() {},
  debug() {},
};

function uniqueProvider(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}

async function failRefresh(
  provider: string,
  connectionId: string | undefined,
  times: number,
  scope: "provider" | "connection" = "connection"
): Promise<void> {
  for (let i = 0; i < times; i++) {
    await refreshWithRetry(async () => null, 1, silentLog, provider, {
      scope,
      ...(connectionId === undefined ? {} : { connectionId }),
    });
  }
}

test("connection scope isolates failures: five failures on A do not block B", async () => {
  const provider = uniqueProvider("scope-conn");
  try {
    await failRefresh(provider, "conn-a", 5);
    assert.equal(
      isProviderBlocked(provider, { scope: "connection", connectionId: "conn-a" }),
      true
    );
    assert.equal(
      isProviderBlocked(provider, { scope: "connection", connectionId: "conn-b" }),
      false
    );
  } finally {
    // No reset hook: keys are unique per test run, entries expire on their own.
  }
});

test("connection scope serves a healthy connection after a dead one tripped", async () => {
  const provider = uniqueProvider("scope-serve");
  await failRefresh(provider, "dead-conn", 5);
  let called = false;
  const result = await refreshWithRetry(
    async () => {
      called = true;
      return { accessToken: "healthy" };
    },
    1,
    silentLog,
    provider,
    { scope: "connection", connectionId: "healthy-conn" }
  );
  assert.equal(called, true);
  assert.equal(result?.accessToken, "healthy");
});

test("default provider scope still blocks every connection after five failures", async () => {
  const provider = uniqueProvider("scope-prov");
  for (let i = 0; i < 5; i++) {
    await refreshWithRetry(async () => null, 1, silentLog, provider);
  }
  assert.equal(isProviderBlocked(provider), true);
});

test("connection scope without a connection id falls back to the provider key", async () => {
  const provider = uniqueProvider("scope-fallback");
  await failRefresh(provider, undefined, 5);
  assert.equal(isProviderBlocked(provider, { scope: "connection" }), true);
  assert.equal(isProviderBlocked(provider), true);
});

test("blank connection id falls back to the provider key", async () => {
  const provider = uniqueProvider("scope-blank");
  await failRefresh(provider, "   ", 5);
  assert.equal(isProviderBlocked(provider, { scope: "connection", connectionId: "other" }), false);
  assert.equal(isProviderBlocked(provider), true);
});

test("custom threshold and cooldown apply from options", async () => {
  const provider = uniqueProvider("scope-custom");
  await failRefresh(provider, "conn-a", 2, "connection");
  // Threshold is 3 here, so two failures must not trip yet.
  const before = isProviderBlocked(provider, {
    scope: "connection",
    connectionId: "conn-a",
    failureThreshold: 3,
    cooldownMs: 60_000,
  });
  assert.equal(before, false);
  await refreshWithRetry(async () => null, 1, silentLog, provider, {
    scope: "connection",
    connectionId: "conn-a",
    failureThreshold: 3,
    cooldownMs: 60_000,
  });
  assert.equal(
    isProviderBlocked(provider, {
      scope: "connection",
      connectionId: "conn-a",
      failureThreshold: 3,
      cooldownMs: 60_000,
    }),
    true
  );
});

test("expired entries are purged on read so the registry returns to baseline", async () => {
  const provider = uniqueProvider("scope-expiry");
  const tripOpts = {
    scope: "connection" as const,
    connectionId: "short-lived",
    failureThreshold: 1,
    cooldownMs: 50,
  };
  await refreshWithRetry(async () => null, 1, silentLog, provider, tripOpts);
  assert.equal(isProviderBlocked(provider, tripOpts), true);
  await new Promise((r) => setTimeout(r, 150));
  assert.equal(isProviderBlocked(provider, tripOpts), false);
  assert.equal(
    getCircuitBreakerStatus()[`${provider}::conn::short-lived`],
    undefined,
    "expired entry removed on read"
  );
});

test("registry stays bounded and a full blocked registry refuses new inserts", async () => {
  const provider = uniqueProvider("scope-cap");
  const baseline = Object.keys(getCircuitBreakerStatus()).length;
  const room = Math.max(0, 500 - baseline);
  const scopeOpts = (id: string) => ({
    scope: "connection" as const,
    connectionId: id,
    failureThreshold: 1,
    cooldownMs: 30 * 60 * 1000,
  });
  for (let i = 0; i < room + 100; i++) {
    await refreshWithRetry(async () => null, 1, silentLog, provider, scopeOpts(`cap-${i}`));
  }
  const status = getCircuitBreakerStatus();
  assert.ok(
    Object.keys(status).length <= 500,
    `registry capped at 500, got ${Object.keys(status).length}`
  );
  assert.equal(
    status[`${provider}::conn::cap-0`] !== undefined && status[`${provider}::conn::cap-0`].blocked,
    true,
    "blocked entries are never evicted"
  );
  // The cap test runs last: it fills all 500 slots with blocked entries, so
  // later inserts in this file would be refused by design (PM1).
});
