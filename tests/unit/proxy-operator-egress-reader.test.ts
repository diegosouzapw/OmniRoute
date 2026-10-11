import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// The integrated reader merges the journal single-address read with the fresh
// operator rows: three operator addresses read as a set of three, the freshest
// observation wins in both directions (20 h vs 2 min), the flag-off path is
// byte-identical to the base behavior with zero operator DB read, and a row
// that crosses the window disappears on the next read even on the hot journal
// cache path (no operator cache). The predicate fires on any shared address,
// with the journal contributing only when non-opaque.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-operator-egress-reader-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";
delete process.env.INITIAL_PASSWORD;

const core = await import("../../src/lib/db/core.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");
const proxyLogger = await import("../../src/lib/proxyLogger.ts");
const rotation = await import("../../src/lib/db/proxies/rotation.ts");
const store = await import("../../src/lib/db/proxyOperatorEgress.ts");

const HOUR_MS = 60 * 60 * 1000;

function resetStorage() {
  process.env.PROXY_OPERATOR_EGRESS_ENABLED = "true";
  delete process.env.PROXY_OPERATOR_EGRESS_WINDOW_HOURS;
  rotation.__resetHotEgressCacheForTesting();
  proxyLogger.clearProxyLogs();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => {
  resetStorage();
});

test.after(() => {
  delete process.env.PROXY_OPERATOR_EGRESS_ENABLED;
  delete process.env.PROXY_OPERATOR_EGRESS_WINDOW_HOURS;
  rotation.__resetHotEgressCacheForTesting();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function member(host: string, port: number) {
  return { type: "http", host, port };
}

function push(host: string, port: number, addresses: string[], observedAt: string) {
  return store.upsertOperatorEgress([{ host, port, addresses, observedAt }]);
}

function logEgress(host: string, port: number, egressIp: string | null) {
  proxyLogger.logProxyEvent({
    status: "success",
    provider: "opencode-go",
    targetUrl: "https://api.opencode.ai/chat",
    proxy: { type: "http", host, port },
    egressIp,
  });
  proxyLogger.flushProxyLogsSync();
}

async function knownMember(host: string, port: number): Promise<void> {
  await proxiesDb.createProxy({ name: `op-egress ${host}:${port}`, type: "http", host, port });
}

test("three operator addresses read as a set of three", async () => {
  await knownMember("203.0.113.1", 8180);
  const now = Date.now();
  push(
    "203.0.113.1",
    8180,
    ["198.51.100.1", "198.51.100.2", "198.51.100.3"],
    new Date(now).toISOString()
  );
  const set = rotation.readEgressAddressSetForMember(member("203.0.113.1", 8180), now);
  assert.deepEqual([...set.addresses].sort(), ["198.51.100.1", "198.51.100.2", "198.51.100.3"]);
});

test("the freshest observation wins: 20 h operator row loses to a 2 min probe", async () => {
  await knownMember("203.0.113.2", 8181);
  const now = Date.now();
  push("203.0.113.2", 8181, ["198.51.100.10"], new Date(now - 20 * HOUR_MS).toISOString());
  logEgress("203.0.113.2", 8181, "198.51.100.20");
  const set = rotation.readEgressAddressSetForMember(member("203.0.113.2", 8181), now);
  assert.ok(set.addresses.has("198.51.100.10"));
  assert.ok(set.addresses.has("198.51.100.20"));
  assert.equal(set.freshest?.address, "198.51.100.20");
});

test("the freshest observation wins, flipped: fresh operator row beats a stale probe", async () => {
  await knownMember("203.0.113.3", 8182);
  const now = Date.now();
  logEgress("203.0.113.3", 8182, "198.51.100.30");
  // Backdate the probe row 20 h: the logger stamps Date.now(), so shift it after.
  core
    .getDbInstance()
    .prepare("UPDATE proxy_logs SET timestamp = ? WHERE proxy_host = ? AND proxy_port = ?")
    .run(new Date(now - 20 * HOUR_MS).toISOString(), "203.0.113.3", 8182);
  rotation.__resetHotEgressCacheForTesting();
  push("203.0.113.3", 8182, ["198.51.100.31"], new Date(now).toISOString());
  const set = rotation.readEgressAddressSetForMember(member("203.0.113.3", 8182), now);
  assert.equal(set.freshest?.address, "198.51.100.31");
});

test("flag off reads exactly the base behavior with zero operator DB read", async () => {
  await knownMember("203.0.113.4", 8183);
  const now = Date.now();
  push("203.0.113.4", 8183, ["198.51.100.40"], new Date(now).toISOString());
  delete process.env.PROXY_OPERATOR_EGRESS_ENABLED;
  rotation.__resetHotEgressCacheForTesting();

  const db = core.getDbInstance();
  let operatorReads = 0;
  const originalPrepare = db.prepare.bind(db);
  (db as { prepare: typeof originalPrepare }).prepare = ((sql: string, ...rest: unknown[]) => {
    if (sql.includes("proxy_operator_egress")) operatorReads++;
    return (originalPrepare as (...args: unknown[]) => unknown)(sql, ...rest);
  }) as typeof originalPrepare;
  try {
    const set = rotation.readEgressAddressSetForMember(member("203.0.113.4", 8183), now);
    assert.deepEqual([...set.addresses], []);
    assert.equal(operatorReads, 0);
  } finally {
    (db as { prepare: typeof originalPrepare }).prepare = originalPrepare;
  }
});

test("cache-then-expire: a row past the window is absent even on the hot cache path", async () => {
  await knownMember("203.0.113.5", 8184);
  process.env.PROXY_OPERATOR_EGRESS_WINDOW_HOURS = "1";
  const start = Date.now();
  push("203.0.113.5", 8184, ["198.51.100.50"], new Date(start).toISOString());
  // Warm the journal cache path first (reads through it, locks the expiry case).
  const fresh = rotation.readEgressAddressSetForMember(member("203.0.113.5", 8184), start + 1000);
  assert.ok(fresh.addresses.has("198.51.100.50"));
  // Advance past the 1 h window but inside the 30 s journal TTL: the operator
  // row must be absent — there is no operator cache to go stale behind.
  const expired = rotation.readEgressAddressSetForMember(
    member("203.0.113.5", 8184),
    start + 2 * HOUR_MS
  );
  assert.ok(!expired.addresses.has("198.51.100.50"));
});

test("the predicate fires on any shared operator address", async () => {
  process.env.PROXY_SKIP_RECENTLY_FAILED = "true";
  process.env.PROXY_POOL_SHARED_EGRESS_ORDER = "true";
  const { noteProxyRefusal, proxyEgressKey, __resetProxyRefusalMemoryForTesting } =
    await import("../../open-sse/utils/proxyRefusalMemory.ts");
  try {
    await knownMember("203.0.113.6", 8185);
    await knownMember("203.0.113.7", 8186);
    const now = Date.now();
    const at = new Date(now).toISOString();
    push("203.0.113.6", 8185, ["198.51.100.60", "198.51.100.61"], at);
    push("203.0.113.7", 8186, ["198.51.100.61", "198.51.100.62"], at);
    const avoided = member("203.0.113.6", 8185);
    const candidate = member("203.0.113.7", 8186);
    noteProxyRefusal(proxyEgressKey(avoided), "ip_quota_429");
    const predicate = rotation.buildHotEgressPredicate(
      "opencode-go",
      [avoided, candidate],
      undefined,
      now
    );
    assert.equal(predicate(candidate), true);
    assert.equal(predicate(member("203.0.113.8", 8187)), false);
  } finally {
    delete process.env.PROXY_SKIP_RECENTLY_FAILED;
    delete process.env.PROXY_POOL_SHARED_EGRESS_ORDER;
    __resetProxyRefusalMemoryForTesting();
  }
});

test("the journal contributes to the predicate only when non-opaque", async () => {
  process.env.PROXY_SKIP_RECENTLY_FAILED = "true";
  process.env.PROXY_POOL_SHARED_EGRESS_ORDER = "true";
  const { noteProxyRefusal, proxyEgressKey, __resetProxyRefusalMemoryForTesting } =
    await import("../../open-sse/utils/proxyRefusalMemory.ts");
  try {
    await knownMember("203.0.113.9", 8188);
    const now = Date.now();
    // Opaque journal: two distinct addresses — contributes nothing.
    logEgress("203.0.113.9", 8188, "198.51.100.70");
    logEgress("203.0.113.9", 8188, "198.51.100.71");
    const opaque = member("203.0.113.9", 8188);
    noteProxyRefusal(proxyEgressKey(opaque), "ip_quota_429");
    const predicate = rotation.buildHotEgressPredicate("opencode-go", [opaque], undefined, now);
    // Empty hot set (opaque journal, no operator rows) -> predicate false for all.
    assert.equal(predicate(opaque), false);
  } finally {
    delete process.env.PROXY_SKIP_RECENTLY_FAILED;
    delete process.env.PROXY_POOL_SHARED_EGRESS_ORDER;
    __resetProxyRefusalMemoryForTesting();
  }
});
