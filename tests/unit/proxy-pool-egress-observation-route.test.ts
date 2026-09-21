import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { randomUUID } from "node:crypto";

// The pool egress observation has its own route so that a failure there can never break
// GET /api/settings/proxies/pool. These tests pin its shape, its null-on-failure contract,
// its opt-in flag (PROXY_POOL_EGRESS_OBSERVATION, default off) and its Zod parameter checks.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-pool-egress-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";
delete process.env.INITIAL_PASSWORD; // auth not required in this test env

const core = await import("../../src/lib/db/core.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");
const observation = await import("../../src/lib/proxyPoolEgressObservation.ts");
const { GET } = await import("../../src/app/api/settings/proxies/pool/egress-observation/route.ts");
const poolRoute = await import("../../src/app/api/settings/proxies/pool/route.ts");

function resetStorage() {
  delete process.env.INITIAL_PASSWORD;
  process.env.PROXY_POOL_EGRESS_OBSERVATION = "true";
  observation.resetPoolEgressObservationCache();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => {
  resetStorage();
});

test.after(() => {
  delete process.env.PROXY_POOL_EGRESS_OBSERVATION;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function request(base: string, query: Record<string, string>): Request {
  const params = new URLSearchParams(query);
  return new Request(`http://localhost${base}?${params.toString()}`, { method: "GET" });
}

const OBSERVATION_PATH = "/api/settings/proxies/pool/egress-observation";

async function pooledProxyWithTraffic() {
  const proxy = await proxiesDb.createProxy({
    name: "member",
    type: "http",
    host: "10.9.1.1",
    port: 21001,
  });
  await proxiesDb.addProxyToScopePool("provider", "openai", proxy.id);
  core
    .getDbInstance()
    .prepare(
      `INSERT INTO proxy_logs (id, timestamp, status, proxy_type, proxy_host, proxy_port, level, connection_id, egress_ip)
       VALUES (?, ?, 'success', 'http', '10.9.1.1', 21001, 'provider', 'c1', '203.0.113.1')`
    )
    .run(randomUUID(), new Date(Date.now() - 60_000).toISOString());
}

test("returns the observation with exactly the four documented keys", async () => {
  await pooledProxyWithTraffic();
  const response = await GET(request(OBSERVATION_PATH, { scope: "provider", scopeId: "openai" }));
  assert.equal(response.status, 200);
  const body = (await response.json()) as Record<string, unknown>;
  assert.deepEqual(Object.keys(body).sort(), [
    "connections",
    "distinctExits",
    "maxConnectionsOnOneExit",
    "windowHours",
  ]);
  assert.deepEqual(body, {
    connections: 1,
    distinctExits: 1,
    maxConnectionsOnOneExit: 1,
    windowHours: 24,
  });
});

test("returns zeros for an empty pool and leaves the pool route untouched", async () => {
  const response = await GET(request(OBSERVATION_PATH, { scope: "provider", scopeId: "nobody" }));
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), {
    connections: 0,
    distinctExits: 0,
    maxConnectionsOnOneExit: 0,
    windowHours: 24,
  });

  const pool = await poolRoute.GET(
    request("/api/settings/proxies/pool", { scope: "provider", scopeId: "nobody" })
  );
  assert.equal(pool.status, 200);
  const poolBody = (await pool.json()) as Record<string, unknown>;
  assert.deepEqual(Object.keys(poolBody).sort(), ["members", "strategy", "total"]);
});

test("returns null with status 200 when the read fails", async () => {
  await pooledProxyWithTraffic();
  const db = core.getDbInstance();
  db.exec("ALTER TABLE proxy_logs RENAME TO proxy_logs_hidden");
  try {
    const response = await GET(request(OBSERVATION_PATH, { scope: "provider", scopeId: "openai" }));
    assert.equal(response.status, 200);
    assert.equal(await response.json(), null);
  } finally {
    db.exec("ALTER TABLE proxy_logs_hidden RENAME TO proxy_logs");
  }
});

test("returns null when the feature flag is at its default (off) or turned off", async () => {
  await pooledProxyWithTraffic();
  for (const value of [undefined, "false"]) {
    if (value === undefined) delete process.env.PROXY_POOL_EGRESS_OBSERVATION;
    else process.env.PROXY_POOL_EGRESS_OBSERVATION = value;
    observation.resetPoolEgressObservationCache();
    const response = await GET(request(OBSERVATION_PATH, { scope: "provider", scopeId: "openai" }));
    assert.equal(response.status, 200);
    assert.equal(await response.json(), null, String(value));
  }
});

test("rejects an unknown scope with 400 instead of reading the global pool", async () => {
  const global = await proxiesDb.createProxy({
    name: "global member",
    type: "http",
    host: "10.9.2.2",
    port: 21002,
  });
  await proxiesDb.addProxyToScopePool("global", null, global.id);
  for (const scope of ["globals", "GLOBAL", "tenant", " "]) {
    const response = await GET(request(OBSERVATION_PATH, { scope, scopeId: "openai" }));
    assert.equal(response.status, 400, scope);
    const body = (await response.json()) as { error?: { message?: string } };
    assert.equal(typeof body?.error?.message, "string");
    assert.ok(!body.error!.message!.includes("at /"), "no stack trace in the error body");
  }
});

test("rejects an over-long scopeId with 400", async () => {
  const response = await GET(
    request(OBSERVATION_PATH, { scope: "provider", scopeId: "x".repeat(300) })
  );
  assert.equal(response.status, 400);
});

test("rejects a missing scope, or a missing scopeId outside global, like the pool route", async () => {
  const noScope = await GET(request(OBSERVATION_PATH, {}));
  assert.equal(noScope.status, 400);
  const noScopeId = await GET(request(OBSERVATION_PATH, { scope: "provider" }));
  assert.equal(noScopeId.status, 400);
  const global = await GET(request(OBSERVATION_PATH, { scope: "global" }));
  assert.equal(global.status, 200);
});
