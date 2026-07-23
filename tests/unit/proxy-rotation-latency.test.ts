/**
 * Unit tests for latency-optimized proxy rotation strategy.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-proxy-latency-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";
process.env.PROXY_LATENCY_WINDOW_HOURS = "6"; // Set custom 6-hour window at startup

const core = await import("../../src/lib/db/core.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

let proxySeq = 0;
async function makeProxy(host: string, port: number) {
  proxySeq++;
  const proxy = await proxiesDb.createProxy({
    name: `Latency proxy ${proxySeq}`,
    type: "http",
    host,
    port,
    status: "active",
  });
  return proxy!;
}

function insertLog(
  db: ReturnType<typeof core.getDbInstance>,
  host: string,
  port: number,
  latencyMs: number,
  timestampIso: string
) {
  db.prepare(
    "INSERT INTO proxy_logs (id, timestamp, proxy_host, proxy_port, latency_ms) VALUES (?, ?, ?, ?, ?)"
  ).run(`log-${Date.now()}-${Math.random()}`, timestampIso, host, port, latencyMs);
}

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("latency strategy chooses proxy with lowest average latency within the window", async () => {
  await resetStorage();
  const db = core.getDbInstance();

  const p1 = await makeProxy("10.0.0.1", 8081);
  const p2 = await makeProxy("10.0.0.2", 8082);

  await proxiesDb.addProxyToScopePool("provider", "openai", p1.id);
  await proxiesDb.addProxyToScopePool("provider", "openai", p2.id);
  await proxiesDb.setScopeRotationStrategy("provider", "openai", "latency");

  const now = Date.now();
  // Insert logs inside the window (e.g. 2 hours ago)
  const insideWindow = new Date(now - 2 * 60 * 60 * 1000).toISOString();

  // p1 average latency: (100 + 150) / 2 = 125ms
  insertLog(db, "10.0.0.1", 8081, 100, insideWindow);
  insertLog(db, "10.0.0.1", 8081, 150, insideWindow);

  // p2 average latency: (200 + 300) / 2 = 250ms
  insertLog(db, "10.0.0.2", 8082, 200, insideWindow);
  insertLog(db, "10.0.0.2", 8082, 300, insideWindow);

  const resolved = await proxiesDb.resolveProxyForScopeFromRegistry("provider", "openai");
  assert.ok(resolved);
  assert.equal(
    (resolved as { proxy: { host: string } }).proxy.host,
    "10.0.0.1",
    "Should pick the one with lower average latency"
  );
});

test("latency strategy prioritizes untested proxies (no logs)", async () => {
  await resetStorage();
  const db = core.getDbInstance();

  const p1 = await makeProxy("10.0.0.1", 8081);
  const p2 = await makeProxy("10.0.0.2", 8082); // untested

  await proxiesDb.addProxyToScopePool("provider", "openai", p1.id);
  await proxiesDb.addProxyToScopePool("provider", "openai", p2.id);
  await proxiesDb.setScopeRotationStrategy("provider", "openai", "latency");

  // Insert log for p1 only
  const insideWindow = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();
  insertLog(db, "10.0.0.1", 8081, 50, insideWindow);

  const resolved = await proxiesDb.resolveProxyForScopeFromRegistry("provider", "openai");
  assert.ok(resolved);
  assert.equal(
    (resolved as { proxy: { host: string } }).proxy.host,
    "10.0.0.2",
    "Should prioritize untested proxy over tested one"
  );
});

test("latency strategy ignores logs outside the configured time window", async () => {
  await resetStorage();
  const db = core.getDbInstance();

  const p1 = await makeProxy("10.0.0.1", 8081);
  const p2 = await makeProxy("10.0.0.2", 8082);

  await proxiesDb.addProxyToScopePool("provider", "openai", p1.id);
  await proxiesDb.addProxyToScopePool("provider", "openai", p2.id);
  await proxiesDb.setScopeRotationStrategy("provider", "openai", "latency");

  const now = Date.now();

  // p1 has 300ms latency log inside 6h window (e.g. 2 hours ago)
  const insideWindow = new Date(now - 2 * 60 * 60 * 1000).toISOString();
  insertLog(db, "10.0.0.1", 8081, 300, insideWindow);

  // p2 has 50ms latency log but OUTSIDE 6h window (e.g. 8 hours ago)
  const outsideWindow = new Date(now - 8 * 60 * 60 * 1000).toISOString();
  insertLog(db, "10.0.0.2", 8082, 50, outsideWindow);

  // Since p2's log is outside the 6h window, p2 is considered untested within the window.
  // Untested proxies are prioritized (score -1) over tested ones (score 300).
  const resolved = await proxiesDb.resolveProxyForScopeFromRegistry("provider", "openai");
  assert.ok(resolved);
  assert.equal(
    (resolved as { proxy: { host: string } }).proxy.host,
    "10.0.0.2",
    "p2 should be prioritized as untested within the 6h window"
  );
});

test("latency strategy works normally with empty proxy_logs table", async () => {
  await resetStorage();
  const p1 = await makeProxy("10.0.0.1", 8081);
  const p2 = await makeProxy("10.0.0.2", 8082);

  await proxiesDb.addProxyToScopePool("provider", "openai", p1.id);
  await proxiesDb.addProxyToScopePool("provider", "openai", p2.id);
  await proxiesDb.setScopeRotationStrategy("provider", "openai", "latency");

  // No logs inserted, both are untested. Should return one of them without crash.
  const resolved = await proxiesDb.resolveProxyForScopeFromRegistry("provider", "openai");
  assert.ok(resolved);
  assert.ok(
    ["10.0.0.1", "10.0.0.2"].includes((resolved as { proxy: { host: string } }).proxy.host)
  );
});
