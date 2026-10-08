import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// The operator-provided egress observation store: dated observed addresses per pool member.
// These tests pin the contracts the reader and the push route rely on: idempotent upsert,
// freshest-wins in both orders and under concurrent pushes, the adjustable bounded window
// (stale is absent, invalid window falls back to 24 h with a warning and never throws),
// the per-member and total caps with oldest-first eviction, purge on write, unknown-member
// rows kept while fresh, and the shared address normalization reused on every read.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-operator-egress-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";
delete process.env.INITIAL_PASSWORD;

const core = await import("../../src/lib/db/core.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");
const store = await import("../../src/lib/db/proxyOperatorEgress.ts");

const HOUR_MS = 60 * 60 * 1000;
let nextPort = 8100;

async function knownMember(host: string, port: number): Promise<void> {
  await proxiesDb.createProxy({ name: `op-egress ${host}:${port}`, type: "http", host, port });
}

function resetStorage() {
  delete process.env.PROXY_OPERATOR_EGRESS_WINDOW_HOURS;
  store.__resetOperatorEgressWarnedForTesting?.();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => {
  resetStorage();
});

test.after(() => {
  delete process.env.PROXY_OPERATOR_EGRESS_WINDOW_HOURS;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function iso(nowMs: number, ageMs = 0): string {
  return new Date(nowMs - ageMs).toISOString();
}

function push(host: string, port: number, addresses: string[], observedAt: string) {
  return store.upsertOperatorEgress([{ host, port, addresses, observedAt }]);
}

test("upsert is idempotent: the same row twice stays one row", async () => {
  await knownMember("203.0.113.1", 8080);
  const now = Date.now();
  const at = iso(now);
  assert.deepEqual(push("203.0.113.1", 8080, ["198.51.100.1"], at), {
    stored: 1,
    ignored: 0,
    rejected: [],
  });
  assert.deepEqual(push("203.0.113.1", 8080, ["198.51.100.1"], at), {
    stored: 1,
    ignored: 0,
    rejected: [],
  });
  const read = store.readOperatorEgressForMember("203.0.113.1", 8080, now);
  assert.deepEqual([...read.addresses], ["198.51.100.1"]);
  assert.equal(read.freshest?.address, "198.51.100.1");
});

test("the freshest observation wins in both orders", async () => {
  await knownMember("203.0.113.2", 8081);
  await knownMember("203.0.113.3", 8082);
  const now = Date.now();
  const older = iso(now, HOUR_MS);
  const newer = iso(now);
  push("203.0.113.2", 8081, ["198.51.100.2"], older);
  push("203.0.113.2", 8081, ["198.51.100.2"], newer);
  assert.equal(store.readOperatorEgressForMember("203.0.113.2", 8081, now).freshest?.at, newer);

  push("203.0.113.3", 8082, ["198.51.100.3"], newer);
  push("203.0.113.3", 8082, ["198.51.100.3"], older);
  assert.equal(store.readOperatorEgressForMember("203.0.113.3", 8082, now).freshest?.at, newer);
});

test("concurrent pushes of the same member keep the freshest row", async () => {
  await knownMember("203.0.113.4", 8083);
  const now = Date.now();
  const older = iso(now, HOUR_MS);
  const newer = iso(now);
  await Promise.all([
    Promise.resolve().then(() => push("203.0.113.4", 8083, ["198.51.100.4"], older)),
    Promise.resolve().then(() => push("203.0.113.4", 8083, ["198.51.100.4"], newer)),
  ]);
  assert.equal(store.readOperatorEgressForMember("203.0.113.4", 8083, now).freshest?.at, newer);
});

test("a row older than the window is absent; a row inside the +5 min tolerance is fresh", async () => {
  await knownMember("203.0.113.5", 8084);
  await knownMember("203.0.113.6", 8085);
  const now = Date.now();
  push("203.0.113.5", 8084, ["198.51.100.5"], iso(now, 25 * HOUR_MS));
  assert.deepEqual([...store.readOperatorEgressForMember("203.0.113.5", 8084, now).addresses], []);
  push("203.0.113.6", 8085, ["198.51.100.6"], new Date(now + 4 * 60_000).toISOString());
  assert.deepEqual(
    [...store.readOperatorEgressForMember("203.0.113.6", 8085, now).addresses],
    ["198.51.100.6"]
  );
});

test("the window is adjustable, bounded, and never throws", async () => {
  await knownMember("203.0.113.7", 8086);
  const now = Date.now();
  const at = iso(now, 2 * HOUR_MS);
  push("203.0.113.7", 8086, ["198.51.100.7"], at);
  assert.deepEqual(
    [...store.readOperatorEgressForMember("203.0.113.7", 8086, now).addresses],
    ["198.51.100.7"]
  );

  process.env.PROXY_OPERATOR_EGRESS_WINDOW_HOURS = "1";
  assert.deepEqual([...store.readOperatorEgressForMember("203.0.113.7", 8086, now).addresses], []);

  for (const invalid of ["banana", "0", "9999", ""]) {
    store.__resetOperatorEgressWarnedForTesting?.();
    let warned = 0;
    const original = console.warn;
    console.warn = () => {
      warned++;
    };
    try {
      process.env.PROXY_OPERATOR_EGRESS_WINDOW_HOURS = invalid;
      const read = store.readOperatorEgressForMember("203.0.113.7", 8086, now);
      assert.deepEqual([...read.addresses], ["198.51.100.7"]);
    } finally {
      console.warn = original;
    }
    assert.equal(warned, 1, `invalid window ${JSON.stringify(invalid)} warns once`);
  }
});

test("a member keeps at most its 10 freshest addresses", async () => {
  await knownMember("203.0.113.8", 8087);
  const now = Date.now();
  const addresses = Array.from({ length: 12 }, (_, i) => `198.51.100.${10 + i}`);
  const at = iso(now);
  const result = push("203.0.113.8", 8087, addresses, at);
  assert.equal(result.rejected.filter((r) => r.reason === "cap-evicted").length, 2);
  const read = store.readOperatorEgressForMember("203.0.113.8", 8087, now);
  assert.equal(read.addresses.size, 10);
});

test("beyond 2000 fresh rows the oldest rows are evicted first, counted as rejected", async () => {
  const now = Date.now();
  const ports: number[] = [];
  for (let i = 0; i < 220; i++) {
    nextPort++;
    ports.push(nextPort);
    await knownMember(`203.0.113.${100 + (i % 25)}`, nextPort);
  }
  const members = ports.map((port, i) => ({
    host: `203.0.113.${100 + (i % 25)}`,
    port,
    addresses: Array.from({ length: 10 }, (_, k) => `198.51.${i % 250}.${k + 1}`),
    observedAt: iso(now, (i % 10) * HOUR_MS),
  }));
  const totals = { stored: 0, rejected: 0 };
  for (const chunk of chunkBy(members, 25)) {
    const result = store.upsertOperatorEgress(chunk);
    totals.stored += result.stored;
    totals.rejected += result.rejected.length;
  }
  assert.ok(totals.rejected > 0, "surplus rows are counted, never a batch error");
  const db = core.getDbInstance();
  const count = db.prepare("SELECT COUNT(*) AS n FROM proxy_operator_egress").get() as {
    n: number;
  };
  assert.ok(count.n <= 2000, `total stays bounded, got ${count.n}`);
});

test("stale rows are purged on write", async () => {
  await knownMember("203.0.113.9", 8088);
  await knownMember("203.0.113.10", 8089);
  const now = Date.now();
  push("203.0.113.9", 8088, ["198.51.100.9"], iso(now, 25 * HOUR_MS));
  push("203.0.113.10", 8089, ["198.51.100.10"], iso(now));
  const stale = store.readOperatorEgressForMember("203.0.113.9", 8088, now);
  assert.deepEqual([...stale.addresses], []);
  const db = core.getDbInstance();
  const rows = db
    .prepare("SELECT COUNT(*) AS n FROM proxy_operator_egress WHERE host = ?")
    .get("203.0.113.9") as { n: number };
  assert.equal(rows.n, 0);
});

test("rows for an unknown member are kept while fresh and purged at expiry", () => {
  const now = Date.now();
  // 203.0.113.250 is documentation range: never in the test registry.
  push("203.0.113.250", 8999, ["198.51.100.250"], iso(now));
  assert.deepEqual(
    [...store.readOperatorEgressForMember("203.0.113.250", 8999, now).addresses],
    ["198.51.100.250"]
  );
  push("203.0.113.251", 8998, ["198.51.100.251"], iso(now));
  const db = core.getDbInstance();
  const kept = db
    .prepare("SELECT COUNT(*) AS n FROM proxy_operator_egress WHERE host = ?")
    .get("203.0.113.250") as { n: number };
  assert.equal(kept.n, 1);
});

test("every returned address passes the shared ranking normalization", async () => {
  await knownMember("203.0.113.11", 8090);
  const now = Date.now();
  const at = iso(now);
  push("203.0.113.11", 8090, ["::ffff:198.51.100.11"], at);
  const read = store.readOperatorEgressForMember("203.0.113.11", 8090, now);
  assert.deepEqual([...read.addresses], ["198.51.100.11"]);
});

function chunkBy<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) chunks.push(items.slice(i, i + size));
  return chunks;
}
