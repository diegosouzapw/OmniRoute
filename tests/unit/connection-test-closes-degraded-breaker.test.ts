/**
 * A valid connection test closes a DEGRADED breaker.
 *
 * testSingleConnection() already clears the connection's error state when the probe passes
 * (and no quota cooldown is active), but it never touched the provider circuit breaker. A
 * provider left DEGRADED therefore stayed DEGRADED after the operator, or the credential-health
 * scheduler, proved it answers again; the only ways out were a chat success or a manual reset.
 *
 * Now a valid test closes the provider breaker and the tested connection's breaker when they are
 * DEGRADED. A CLOSED partial count, OPEN and HALF_OPEN are left alone: a cheap auth/models probe
 * does not prove the inference path, so the count keeps recovering one success at a time and only
 * a real request probe may settle OPEN or HALF_OPEN.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-test-closes-breaker-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.OMNIROUTE_DISABLE_CREDENTIAL_HEALTH_CHECK = "true";

const originalFetch = globalThis.fetch;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { testSingleConnection } = await import("../../src/app/api/providers/[id]/test/route.ts");
const { getCircuitBreaker, resetAllCircuitBreakers } =
  await import("../../src/shared/utils/circuitBreaker.ts");
const { connectionCircuitBreakerName } =
  await import("../../open-sse/services/connectionCircuitBreaker.ts");

const PROVIDER = "openai";

function mockFetchStatus(status: number) {
  globalThis.fetch = (async () =>
    new Response(JSON.stringify(status === 200 ? { data: [{ id: "m" }] } : { error: "x" }), {
      status,
      headers: { "content-type": "application/json" },
    })) as typeof fetch;
}

async function createConnection(name: string, rateLimitedUntil: string | null = null) {
  const created = await providersDb.createProviderConnection({
    provider: PROVIDER,
    authType: "apikey",
    name,
    apiKey: `test-key-${name}`,
    testStatus: rateLimitedUntil ? "unavailable" : "active",
    rateLimitedUntil,
  });
  assert.ok(created?.id);
  return created as { id: string };
}

const BREAKER_OPTIONS = { failureThreshold: 12, degradationThreshold: 7, resetTimeout: 30_000 };

function providerBreaker() {
  return getCircuitBreaker(PROVIDER, BREAKER_OPTIONS);
}

function connectionBreaker(connectionId: string) {
  return getCircuitBreaker(connectionCircuitBreakerName(PROVIDER, connectionId), BREAKER_OPTIONS);
}

function fail(breaker: ReturnType<typeof getCircuitBreaker>, times: number) {
  for (let i = 0; i < times; i++) breaker._onFailure();
}

test.beforeEach(() => {
  resetAllCircuitBreakers();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  mockFetchStatus(200);
});

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test.after(() => {
  resetAllCircuitBreakers();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("a valid connection test closes DEGRADED provider and connection breakers", async () => {
  const connection = await createConnection("valid");
  const breaker = providerBreaker();
  fail(breaker, 7);
  assert.equal(breaker.getStatus().state, "DEGRADED");
  const connBreaker = connectionBreaker(connection.id);
  fail(connBreaker, 8);
  assert.equal(connBreaker.getStatus().state, "DEGRADED");

  const result = await testSingleConnection(connection.id);
  assert.equal(result.valid, true);

  for (const status of [breaker.getStatus(), connBreaker.getStatus()]) {
    assert.equal(status.state, "CLOSED");
    assert.equal(status.failureCount, 0);
    assert.equal(status.transitionHistory.at(-1)?.reason, "connection-test");
  }
});

test("a valid connection test keeps a CLOSED breaker's partial count", async () => {
  const connection = await createConnection("partial");
  const breaker = providerBreaker();
  fail(breaker, 3);
  const connBreaker = connectionBreaker(connection.id);
  fail(connBreaker, 5);

  const result = await testSingleConnection(connection.id);
  assert.equal(result.valid, true);

  // Only successes wear a CLOSED count down; a probe does not prove the inference path.
  assert.equal(breaker.getStatus().state, "CLOSED");
  assert.equal(breaker.failureCount, 3);
  assert.equal(connBreaker.getStatus().state, "CLOSED");
  assert.equal(connBreaker.failureCount, 5);
});

test("a failed connection test leaves the DEGRADED breaker as it was", async () => {
  const connection = await createConnection("failed");
  const breaker = providerBreaker();
  fail(breaker, 7);
  mockFetchStatus(401);

  const result = await testSingleConnection(connection.id);
  assert.equal(result.valid, false);

  assert.equal(breaker.getStatus().state, "DEGRADED");
  assert.equal(breaker.failureCount, 7);
});

test("a valid connection test does not close an OPEN provider breaker", async () => {
  const connection = await createConnection("open");
  const breaker = providerBreaker();
  fail(breaker, 12);
  assert.equal(breaker.getStatus().state, "OPEN");

  const result = await testSingleConnection(connection.id);
  assert.equal(result.valid, true);

  assert.equal(breaker.getStatus().state, "OPEN");
  assert.equal(breaker.failureCount, 12);
});

test("a valid test during an active quota cooldown keeps the breaker counts", async () => {
  const cooldown = new Date(Date.now() + 60_000).toISOString();
  const connection = await createConnection("cooldown", cooldown);
  const breaker = providerBreaker();
  fail(breaker, 7);

  const result = await testSingleConnection(connection.id);
  assert.equal(result.valid, true);

  assert.equal(breaker.getStatus().state, "DEGRADED");
  assert.equal(breaker.failureCount, 7);
});
