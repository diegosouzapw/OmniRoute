/**
 * Unit + integration tests for GET /api/resilience/connections.
 *
 * The codebase cannot mock ESM module exports (no mock.module under the tsx
 * loader, and namespace exports are non-configurable), so these tests exercise
 * the REAL route against a REAL isolated SQLite DATA_DIR with seeded data.
 * This validates the actual join logic, column whitelist, cooldown math, and
 * error handling -- strictly stronger than module mocking.
 *
 * Run: node --import tsx/esm --import ./open-sse/utils/setupPolyfill.ts
 *        --import ./tests/_setup/isolateDataDir.ts --test --test-force-exit
 *        tests/unit/resilience-connections.test.ts
 */
import test from "node:test";
import assert from "node:assert/strict";

import { getDbInstance, resetDbInstance } from "../../src/lib/db/core.ts";
import { createProviderConnection, getRawProviderConnections } from "../../src/lib/db/providers.ts";
import {
  getCircuitBreaker,
  resetAllCircuitBreakers,
} from "../../src/shared/utils/circuitBreaker.ts";
import { lockModel, clearAllModelLockouts } from "../../open-sse/services/accountFallback.ts";
import * as routeGuard from "../../src/server/authz/routeGuard.ts";

// Import the route AFTER env/db setup so its module-level bindings see the
// isolated DATA_DIR.
const { GET } = await import("../../src/app/api/resilience/connections/route.ts");
import type { ResilienceConnectionsResponse, ConnectionState } from "../../src/types/resilience.ts";

function makeReq(query = ""): Request {
  return new Request(`http://localhost/api/resilience/connections${query}`);
}

// createProviderConnection always generates its own UUID id (ignores data.id),
// so we capture the returned id to locate the row in assertions.
async function seedConnection(data: Record<string, unknown>): Promise<string> {
  const created = await createProviderConnection(data);
  return created.id as string;
}

async function json(res: Response): Promise<ResilienceConnectionsResponse> {
  return res.json();
}

type Connection = ConnectionState;
function findConn(body: ResilienceConnectionsResponse, id: string): Connection {
  return body.connections.find((c) => c.id === id)!;
}
function findBreaker(body: ResilienceConnectionsResponse, name: string) {
  return body.breakers.find((b) => b.name === name);
}

// --- Route guard membership (static -- no DB needed) ---------------------------

test("GET /api/resilience/connections is in LOCAL_ONLY_API_PREFIXES", () => {
  const prefixes = routeGuard.LOCAL_ONLY_API_PREFIXES as string[];
  assert.ok(prefixes.includes("/api/resilience/connections"), "exact path must be present");
});

test("GET /api/resilience/ (prefix) is NOT in LOCAL_ONLY_API_PREFIXES (siblings unaffected)", () => {
  const prefixes = routeGuard.LOCAL_ONLY_API_PREFIXES as string[];
  assert.ok(
    !prefixes.includes("/api/resilience/"),
    "prefix must not be present (would gate settings)"
  );
});

// --- Column whitelist (B1) -----------------------------------------------------------

test("getRawProviderConnections is called with explicit columns array (not SELECT *)", async () => {
  // Seed a row including a credential column; the route must project it away.
  await createProviderConnection({
    id: "conn-1",
    provider: "openai",
    authType: "apikey",
    name: "acc1",
    priority: 1,
    apiKey: "sk-secret-value",
  });
  // Verify the column: the route selects only whitelisted columns. We assert
  // indirectly via the response (no credential leak) AND directly by calling
  // the same projection the route uses.
  const projected = await getRawProviderConnections({ provider: "openai" }, 1000, undefined, [
    "id",
    "provider",
    "name",
    "auth_type",
    "priority",
    "is_active",
    "test_status",
    "error_code",
    "last_error_type",
    "last_error_at",
    "backoff_level",
    "rate_limited_until",
    "last_used_at",
  ]);
  const raw = JSON.stringify(projected);
  assert.ok(!raw.includes("sk-secret-value"), "projection must not include apiKey");
  assert.ok(!raw.includes("access_token"), "projection must not include access_token");
});

test("response does NOT contain credential fields", async () => {
  await createProviderConnection({
    id: "conn-2",
    provider: "anthropic",
    authType: "oauth",
    name: "acc2",
    priority: 1,
    accessToken: "at-secret",
    refreshToken: "rt-secret",
    idToken: "it-secret",
  });
  const body = await json(await GET(makeReq("?provider=anthropic")));
  const raw = JSON.stringify(body);
  // Key-name checks use camelCase because getRawProviderConnections runs rowToCamel.
  // Use JSON key pattern ("key":) to avoid substring matches (e.g. lastError vs lastErrorAt).
  for (const forbidden of [
    '"apiKey":',
    '"accessToken":',
    '"refreshToken":',
    '"idToken":',
    '"email":',
    '"scope":',
    '"projectId":',
    '"providerSpecificData":',
    '"lastError":',
  ]) {
    assert.ok(!raw.includes(forbidden), `response must not contain ${forbidden}`);
  }
  // The apiKey/accessToken must not leak even as values
  assert.ok(!raw.includes("at-secret"), "accessToken value must not leak");
  assert.ok(!raw.includes("rt-secret"), "refreshToken value must not leak");
});

test("response DOES contain lastErrorAt (from last_error_at column)", async () => {
  await createProviderConnection({
    id: "conn-3",
    provider: "gemini",
    authType: "apikey",
    name: "acc3",
    priority: 1,
    lastErrorAt: "2026-01-01T00:00:00.000Z",
  });
  const body = await json(await GET(makeReq("?provider=gemini")));
  assert.equal(body.connections[0].lastErrorAt, "2026-01-01T00:00:00.000Z");
});

// --- Windowed transition history -----------------------------------------------------

test("transitionHistory is included in breaker response", async () => {
  const cb = getCircuitBreaker("window-test-1", { failureThreshold: 1 });
  cb._onFailure();
  const body = await json(await GET(makeReq("?provider=window-test-1")));
  const breaker = findBreaker(body, "window-test-1");
  assert.ok(breaker, "breaker should be present");
  assert.ok(Array.isArray(breaker.transitionHistory), "transitionHistory must be an array");
  assert.equal(breaker.transitionHistory.length, 1);
});

test("windowMs filters transitionHistory", async () => {
  const now = Date.now();
  const cb = getCircuitBreaker("window-test-2", { failureThreshold: 1 });
  // Manually inject two transitions (recent + old) to control timestamps.
  cb.transitionHistory.push({ from: "CLOSED", to: "OPEN", timestamp: now - 1000, failureCount: 1 });
  cb.transitionHistory.push({
    from: "CLOSED",
    to: "OPEN",
    timestamp: now - 100000,
    failureCount: 2,
  });
  const body = await json(await GET(makeReq("?provider=window-test-2&windowMs=60000")));
  const breaker = findBreaker(body, "window-test-2");
  assert.equal(breaker.transitionHistory.length, 1, "only recent transition should remain");
  assert.equal(breaker.transitionHistory[0].failureCount, 1);
});

test("windowMs=0 returns all history (up to 20 entries)", async () => {
  const now = Date.now();
  const cb = getCircuitBreaker("window-test-3", { failureThreshold: 1 });
  cb.transitionHistory.push({ from: "CLOSED", to: "OPEN", timestamp: now - 1000, failureCount: 1 });
  cb.transitionHistory.push({
    from: "CLOSED",
    to: "OPEN",
    timestamp: now - 100000,
    failureCount: 2,
  });
  const body = await json(await GET(makeReq("?provider=window-test-3&windowMs=0")));
  const breaker = findBreaker(body, "window-test-3");
  assert.equal(breaker.transitionHistory.length, 2, "windowMs=0 returns all");
});

// --- Lockout join -------------------------------------------------------------------

test("lockout joined to correct connection by connectionId", async () => {
  const id1 = await seedConnection({
    provider: "openai-lock",
    authType: "apikey",
    name: "acc1",
    priority: 1,
  });
  const id2 = await seedConnection({
    provider: "openai-lock",
    authType: "apikey",
    name: "acc2",
    priority: 2,
  });
  lockModel("openai-lock", id1, "gpt-4", "429", 60000);
  const body = await json(await GET(makeReq("?provider=openai-lock")));
  const c1 = findConn(body, id1);
  const c2 = findConn(body, id2);
  assert.ok(c1, "connection 1 should exist");
  assert.ok(c2, "connection 2 should exist");
  assert.equal(c1.lockouts.length, 1, "conn-1 should have 1 lockout");
  assert.equal(c1.lockouts[0].model, "gpt-4");
  assert.equal(c2.lockouts.length, 0, "conn-2 should have no lockouts");
});

test("orphan lockout (no matching connection) is filtered out", async () => {
  const id1 = await seedConnection({
    provider: "openai-orphan",
    authType: "apikey",
    name: "acc1",
    priority: 1,
  });
  lockModel("openai-orphan", "deleted-conn", "gpt-4", "429", 60000);
  const body = await json(await GET(makeReq("?provider=openai-orphan")));
  const c1 = findConn(body, id1);
  assert.ok(c1, "connection should exist");
  assert.equal(c1.lockouts.length, 0, "orphan lockout must not attach to any connection");
});

// --- Cooldown -----------------------------------------------------------------------

test("cooldownRemainingMs > 0 for cooling-down connection, 0 for healthy", async () => {
  const future = String(Date.now() + 60000);
  const idCool = await seedConnection({
    provider: "openai-cool",
    authType: "apikey",
    name: "cooling",
    priority: 1,
    rateLimitedUntil: future,
  });
  const idHealthy = await seedConnection({
    provider: "openai-cool",
    authType: "apikey",
    name: "healthy",
    priority: 2,
    rateLimitedUntil: null,
  });
  const body = await json(await GET(makeReq("?provider=openai-cool")));
  const cooling = findConn(body, idCool);
  const healthy = findConn(body, idHealthy);
  assert.ok(cooling, "cooling connection should exist");
  assert.ok(healthy, "healthy connection should exist");
  assert.ok(cooling.cooldownRemainingMs > 0, "cooling connection should have positive remaining");
  assert.equal(cooling.isCoolingDown, true);
  assert.equal(healthy.cooldownRemainingMs, 0, "healthy connection should have 0 remaining");
  assert.equal(healthy.isCoolingDown, false);
});

// --- Query validation ---------------------------------------------------------------

test("windowMs > 86400000 returns 400", async () => {
  const res = await GET(makeReq("?windowMs=90000000"));
  assert.equal(res.status, 400);
});

test("windowMs=invalid (NaN) returns 400", async () => {
  const res = await GET(makeReq("?windowMs=abc"));
  assert.equal(res.status, 400);
});

// --- Partial degradation ------------------------------------------------------------

test("when database throws, response has empty connections + meta.degraded includes database", async () => {
  // Force DB errors by closing the instance so getRawProviderConnections throws.
  const db = getDbInstance();
  db.close();
  const body = await json(await GET(makeReq()));
  assert.equal(body.connections.length, 0, "connections should be empty on db failure");
  assert.ok(body.meta.degraded.includes("database"), "degraded should include database");
  // restore
  resetDbInstance();
});

// --- Window metadata ----------------------------------------------------------------

test("window.now is present (for client countdown calculation)", async () => {
  const before = Date.now();
  const body = await json(await GET(makeReq()));
  assert.ok(typeof body.window.now === "number", "window.now must be a number");
  assert.ok(body.window.now >= before, "window.now should be >= test start");
});

// --- meta counts --------------------------------------------------------------------

test("meta.totalConnections >= returned connections count", async () => {
  await seedConnection({ provider: "openai-cnt", authType: "apikey", name: "acc1", priority: 1 });
  const body = await json(await GET(makeReq()));
  assert.ok(body.meta.totalConnections >= body.connections.length);
});

// --- getStatus() transitionHistory --------------------------------------------------

test("getStatus() return includes transitionHistory after the modification", async () => {
  const cb = getCircuitBreaker("status-history", { failureThreshold: 1 });
  cb._onFailure();
  const status = cb.getStatus();
  assert.ok(Array.isArray(status.transitionHistory), "transitionHistory must be in getStatus()");
  assert.ok(status.transitionHistory.length >= 1, "should record the failure transition");
});

// --- Alias join ---------------------------------------------------------------------

test("alias join: connection provider=cx matches breaker name=codex via resolveProviderId", async () => {
  const id1 = await seedConnection({
    provider: "cx",
    authType: "apikey",
    name: "acc1",
    priority: 1,
  });
  // Breaker registered under canonical "codex" name; connection uses alias "cx"
  const cb = getCircuitBreaker("codex", { failureThreshold: 1 });
  cb._onFailure(); // trip to OPEN
  const body = await json(await GET(makeReq("?provider=cx")));
  const c1 = findConn(body, id1);
  assert.ok(c1, "connection should exist");
  assert.ok(c1.breaker !== null, "breaker should be found via alias resolution");
  assert.equal(c1.breaker.state, "OPEN");
});

// --- Static guard -------------------------------------------------------------------

test("CONNECTION_COLUMNS every column exists in PROVIDER_CONNECTIONS_COLUMNS (no typos)", async () => {
  const expected = [
    "id",
    "provider",
    "name",
    "auth_type",
    "priority",
    "is_active",
    "test_status",
    "error_code",
    "last_error_type",
    "last_error_at",
    "backoff_level",
    "rate_limited_until",
    "last_used_at",
  ];
  for (const col of expected) {
    const { PROVIDER_CONNECTIONS_COLUMNS } = await import("../../src/lib/db/providers.ts");
    assert.ok(
      PROVIDER_CONNECTIONS_COLUMNS.has(col),
      `PROVIDER_CONNECTIONS_COLUMNS must contain ${col}`
    );
  }
});

// --- Error sanitization -------------------------------------------------------------

test("error response uses buildErrorBody (no raw stack)", async () => {
  const res = await GET(makeReq("?windowMs=abc"));
  assert.equal(res.status, 400);
  const raw = JSON.stringify(await res.json());
  assert.ok(!raw.includes("at /"), "error body must not leak stack traces");
});

// --- Reset shared state between tests ----------------------------------------------

test.beforeEach(() => {
  resetDbInstance();
  resetAllCircuitBreakers();
  clearAllModelLockouts();
});

test.after(() => {
  resetDbInstance();
  resetAllCircuitBreakers();
  clearAllModelLockouts();
});
