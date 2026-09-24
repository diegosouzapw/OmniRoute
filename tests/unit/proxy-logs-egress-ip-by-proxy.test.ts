import test from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// DATA_DIR must be assigned BEFORE any transitive DB import —
// core.ts captures resolveWritableDataDir at module-load time.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-egress-by-proxy-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const proxyLogger = await import("../../src/lib/proxyLogger.ts");
const { getRecentEgressIpForProxy } = await import("../../src/lib/db/proxyLogs.ts");

const HOST = "proxy-eu-1.example.com";
const PORT = 18080;

function resetStorage() {
  proxyLogger.clearProxyLogs();
  core.closeDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => resetStorage());
test.after(() => {
  core.closeDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function logEgress(host: string, port: number, egressIp: string | null) {
  proxyLogger.logProxyEvent({
    status: "success",
    provider: "opencode",
    targetUrl: "https://api.opencode.ai/chat",
    proxy: { type: "http", host, port },
    egressIp,
  });
  proxyLogger.flushProxyLogsSync(); // persist the enqueued batch before the DB-backed lookup
}

test("returns the last egress IP logged for the (host, port) couple", () => {
  logEgress(HOST, PORT, "203.0.113.7");
  logEgress(HOST, PORT, "203.0.113.9");
  const got = getRecentEgressIpForProxy(HOST, PORT);
  assert.deepEqual(got, { egressIp: "203.0.113.9", at: got!.at });
});

test("returns null for an unknown couple", () => {
  assert.equal(getRecentEgressIpForProxy("ghost-proxy.example.com", 19999), null);
});

test("isolates couples by port and by host", () => {
  logEgress(HOST, PORT, "203.0.113.7");
  assert.equal(getRecentEgressIpForProxy(HOST, PORT + 1), null);
  assert.equal(getRecentEgressIpForProxy("other-proxy.example.com", PORT), null);
  assert.deepEqual(getRecentEgressIpForProxy(HOST, PORT), {
    egressIp: "203.0.113.7",
    at: getRecentEgressIpForProxy(HOST, PORT)!.at,
  });
});

test("ignores rows with NULL egress_ip (never probed)", () => {
  logEgress(HOST, PORT, "203.0.113.7");
  logEgress(HOST, PORT, null);
  const got = getRecentEgressIpForProxy(HOST, PORT);
  assert.deepEqual(got, { egressIp: "203.0.113.7", at: got!.at });
});

test("does not return rows outside the window", () => {
  // logProxyEvent forces timestamp = now (proxyLogger.ts) — insert the old
  // row via raw SQL to control the timestamp, keyed by proxy_host/proxy_port.
  const db = core.getDbInstance();
  db.prepare(
    `INSERT INTO proxy_logs (id, timestamp, status, proxy_type, proxy_host, proxy_port, level, connection_id, egress_ip)
     VALUES (?, ?, 'success', 'http', ?, ?, 'provider', 'conn-old', '203.0.113.1')`
  ).run(randomUUID(), new Date(Date.now() - 48 * 3600_000).toISOString(), HOST, PORT);
  assert.equal(getRecentEgressIpForProxy(HOST, PORT), null);
});

test("normalizes host case and IPv6 brackets", () => {
  logEgress("proxy-eu-2.example.com", PORT, "203.0.113.21");
  assert.equal(
    getRecentEgressIpForProxy("  Proxy-EU-2.EXAMPLE.com ", PORT)?.egressIp,
    "203.0.113.21"
  );
  logEgress("2001:db8::1", PORT, "2001:db8::99");
  assert.equal(getRecentEgressIpForProxy("[2001:DB8::1]", PORT)?.egressIp, "2001:db8::99");
});

test("matches rows stored with mixed-case hosts or brackets (write-side normalization)", () => {
  logEgress("Proxy.Example.COM", 18081, "203.0.113.31");
  assert.equal(getRecentEgressIpForProxy("proxy.example.com", 18081)?.egressIp, "203.0.113.31");
  logEgress("[::1]", 18082, "203.0.113.32");
  assert.equal(getRecentEgressIpForProxy("::1", 18082)?.egressIp, "203.0.113.32");
  // Stored canonical form keeps the read side idempotent for already-normalized input.
  logEgress("proxy.example.com", 18083, "203.0.113.33");
  assert.equal(getRecentEgressIpForProxy("  PROXY.EXAMPLE.COM ", 18083)?.egressIp, "203.0.113.33");
});

test("returns null on empty host or invalid port without throwing", () => {
  logEgress(HOST, PORT, "203.0.113.7");
  assert.doesNotThrow(() => {
    assert.equal(getRecentEgressIpForProxy("", PORT), null);
    assert.equal(getRecentEgressIpForProxy("   ", PORT), null);
    assert.equal(getRecentEgressIpForProxy(null as unknown as string, PORT), null);
    assert.equal(getRecentEgressIpForProxy(undefined as unknown as string, PORT), null);
    for (const badPort of [0, -1, 65536, NaN, 1.5, "8080" as unknown as number]) {
      assert.equal(getRecentEgressIpForProxy(HOST, badPort), null);
    }
  });
});
