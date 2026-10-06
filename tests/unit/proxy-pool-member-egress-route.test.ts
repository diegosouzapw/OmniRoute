import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { randomUUID } from "node:crypto";

// Per-member egress lines live behind their own route so that a failure there can never
// break GET /api/settings/proxies/pool. These tests pin its shape ({ windowHours,
// members: [{ host, port, egressIp, at }] }), the null-member contract, the stale-row
// exclusion, the two-members-one-entrypoint counting, the untouched GET /pool shape,
// and the opt-in flag (PROXY_POOL_EGRESS_OBSERVATION, default off).

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-pool-member-egress-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";
delete process.env.INITIAL_PASSWORD; // auth not required in this test env

const core = await import("../../src/lib/db/core.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");
const proxyLogger = await import("../../src/lib/proxyLogger.ts");
const observation = await import("../../src/lib/proxyPoolEgressObservation.ts");
const { GET } = await import("../../src/app/api/settings/proxies/pool/member-egress/route.ts");
const poolRoute = await import("../../src/app/api/settings/proxies/pool/route.ts");

function resetStorage() {
  delete process.env.INITIAL_PASSWORD;
  process.env.PROXY_POOL_EGRESS_OBSERVATION = "true";
  observation.resetPoolMemberEgressObservationCache();
  observation.resetPoolEgressObservationCache();
  proxyLogger.clearProxyLogs();
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

const MEMBER_PATH = "/api/settings/proxies/pool/member-egress";

function logEgress(host: string, port: number, egressIp: string | null) {
  proxyLogger.logProxyEvent({
    status: "success",
    provider: "opencode",
    targetUrl: "https://api.opencode.ai/chat",
    proxy: { type: "http", host, port },
    egressIp,
  });
  proxyLogger.flushProxyLogsSync();
}

async function pooledProxy(name: string, host: string, port: number, scopeId: string) {
  const proxy = await proxiesDb.createProxy({ name, type: "http", host, port });
  await proxiesDb.addProxyToScopePool("provider", scopeId, proxy.id);
  return proxy;
}

test("maps two members sharing one entry point through the same log row", async () => {
  await pooledProxy("member-a", "10.8.1.1", 22001, "openai");
  await pooledProxy("member-b", "10.8.1.1", 22001, "openai");
  logEgress("10.8.1.1", 22001, "203.0.113.50");
  const response = await GET(request(MEMBER_PATH, { scope: "provider", scopeId: "openai" }));
  assert.equal(response.status, 200);
  const body = (await response.json()) as {
    windowHours: number;
    members: Array<{ host: string; port: number; egressIp: string | null; at: string | null }>;
  };
  assert.equal(body.windowHours, 24);
  assert.equal(body.members.length, 2);
  for (const member of body.members) {
    assert.equal(member.egressIp, "203.0.113.50");
    assert.equal(typeof member.at, "string");
  }
});

test("reports a member with no traffic as a null member instead of hiding it", async () => {
  await pooledProxy("quiet", "10.8.2.2", 22002, "openai");
  const response = await GET(request(MEMBER_PATH, { scope: "provider", scopeId: "openai" }));
  assert.equal(response.status, 200);
  const body = (await response.json()) as {
    members: Array<{ host: string; port: number; egressIp: string | null; at: string | null }>;
  };
  assert.deepEqual(body.members, [{ host: "10.8.2.2", port: 22002, egressIp: null, at: null }]);
});

test("excludes stale rows older than the window", async () => {
  await pooledProxy("stale", "10.8.3.3", 22003, "openai");
  core
    .getDbInstance()
    .prepare(
      `INSERT INTO proxy_logs (id, timestamp, status, proxy_type, proxy_host, proxy_port, level, connection_id, egress_ip)
       VALUES (?, ?, 'success', 'http', '10.8.3.3', 22003, 'provider', 'conn-old', '203.0.113.9')`
    )
    .run(randomUUID(), new Date(Date.now() - 48 * 3600_000).toISOString());
  const response = await GET(request(MEMBER_PATH, { scope: "provider", scopeId: "openai" }));
  assert.equal(response.status, 200);
  const body = (await response.json()) as {
    members: Array<{ egressIp: string | null; at: string | null }>;
  };
  assert.equal(body.members.length, 1);
  assert.equal(body.members[0].egressIp, null);
  assert.equal(body.members[0].at, null);
});

test("notes the shared-entrypoint bound: a gateway row feeds every member behind it", async () => {
  // Two members behind one host:port each report the same egress IP — the row answers
  // per entry point, not per member, so gateway members cannot be told apart here.
  await pooledProxy("gw-a", "10.8.4.4", 22004, "openai");
  await pooledProxy("gw-b", "10.8.4.4", 22004, "openai");
  logEgress("10.8.4.4", 22004, "203.0.113.60");
  const response = await GET(request(MEMBER_PATH, { scope: "provider", scopeId: "openai" }));
  const body = (await response.json()) as {
    members: Array<{ egressIp: string | null }>;
  };
  assert.ok(body.members.every((member) => member.egressIp === "203.0.113.60"));
});

test("leaves GET /pool untouched and returns null when the flag is off", async () => {
  await pooledProxy("member", "10.8.5.5", 22005, "openai");
  logEgress("10.8.5.5", 22005, "203.0.113.70");
  const pool = await poolRoute.GET(
    request("/api/settings/proxies/pool", { scope: "provider", scopeId: "openai" })
  );
  assert.equal(pool.status, 200);
  const poolBody = (await pool.json()) as Record<string, unknown>;
  assert.deepEqual(Object.keys(poolBody).sort(), ["members", "strategy", "total"]);

  delete process.env.PROXY_POOL_EGRESS_OBSERVATION;
  observation.resetPoolMemberEgressObservationCache();
  const off = await GET(request(MEMBER_PATH, { scope: "provider", scopeId: "openai" }));
  assert.equal(off.status, 200);
  assert.equal(await off.json(), null);
});

test("returns null with status 200 when the read fails", async () => {
  await pooledProxy("member", "10.8.6.6", 22006, "openai");
  const db = core.getDbInstance();
  db.exec("ALTER TABLE proxy_logs RENAME TO proxy_logs_hidden");
  try {
    const response = await GET(request(MEMBER_PATH, { scope: "provider", scopeId: "openai" }));
    assert.equal(response.status, 200);
    assert.equal(await response.json(), null);
  } finally {
    db.exec("ALTER TABLE proxy_logs_hidden RENAME TO proxy_logs");
  }
});
