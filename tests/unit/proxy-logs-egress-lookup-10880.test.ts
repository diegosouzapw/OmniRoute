import test from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// #10460/#10525: DATA_DIR must be assigned BEFORE any transitive DB import —
// core.ts captures resolveWritableDataDir at module-load time.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-egress-lookup-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const proxyLogger = await import("../../src/lib/proxyLogger.ts");
const { getRecentEgressIpForConnection } = await import("../../src/lib/db/proxyLogs.ts");

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

test("returns the LAST known egress IP of the connection in the window", () => {
  proxyLogger.logProxyEvent({
    status: "success",
    provider: "opencode",
    targetUrl: "https://api.opencode.ai/chat",
    egressIp: "203.0.113.7",
    connectionId: "conn-a",
  });
  proxyLogger.logProxyEvent({
    status: "success",
    provider: "opencode",
    targetUrl: "https://api.opencode.ai/chat",
    egressIp: "203.0.113.9",
    connectionId: "conn-a",
  });
  proxyLogger.flushProxyLogsSync(); // persist the enqueued batch before the DB-backed lookup
  const got = getRecentEgressIpForConnection(
    "conn-a",
    new Date(Date.now() - 24 * 3600_000).toISOString()
  );
  assert.deepEqual(got, { egressIp: "203.0.113.9", at: got!.at });
});

test("ignores rows with NULL egress_ip (never probed)", () => {
  proxyLogger.logProxyEvent({
    status: "success",
    provider: "opencode",
    targetUrl: "https://api.opencode.ai/chat",
    egressIp: null,
    connectionId: "conn-b",
  });
  assert.equal(
    getRecentEgressIpForConnection("conn-b", new Date(Date.now() - 24 * 3600_000).toISOString()),
    null
  );
});

test("returns null when the connection has no row in the window", () => {
  assert.equal(
    getRecentEgressIpForConnection(
      "ghost-conn",
      new Date(Date.now() - 24 * 3600_000).toISOString()
    ),
    null
  );
});

test("does not return rows outside the since window", () => {
  // logProxyEvent forces timestamp = now (proxyLogger.ts) — insert the old
  // row via raw SQL to control the timestamp.
  const db = core.getDbInstance();
  db.prepare(
    `INSERT INTO proxy_logs (id, timestamp, status, provider, target_url, egress_ip, connection_id)
     VALUES (?, ?, 'success', 'opencode', 'https://api.opencode.ai/chat', '203.0.113.1', 'conn-c')`
  ).run(randomUUID(), new Date(Date.now() - 48 * 3600_000).toISOString());
  assert.equal(
    getRecentEgressIpForConnection("conn-c", new Date(Date.now() - 24 * 3600_000).toISOString()),
    null
  );
});
