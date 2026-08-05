import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Persistence to SQLite only runs when shouldPersistToDisk is true
// (local mode: !isCloud && !isBuildPhase). Setting DATA_DIR to a fresh temp
// dir keeps the test in local mode; the assertions below would otherwise fail
// with no explanatory guard.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-proxy-egress-ip-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const proxyLogger = await import("../../src/lib/proxyLogger.ts");

// Fresh DB + fresh in-memory buffer per test (mirrors
// proxy-logger-client-ip.test.ts). clearProxyLogs() runs BEFORE closeDbInstance()
// so it never reopens a closed DB.
function resetStorage() {
  proxyLogger.clearProxyLogs();
  core.closeDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => {
  resetStorage();
});

test.after(() => {
  core.closeDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("fresh install exposes egress_ip and the reconciler is idempotent", async () => {
  const { ensureProxyLogsColumns, hasColumn } = await import("../../src/lib/db/schemaColumns.ts");
  const db = core.getDbInstance();
  assert.equal(hasColumn(db, "proxy_logs", "egress_ip"), true, "column exists after migration");
  assert.doesNotThrow(() => ensureProxyLogsColumns(db));
  assert.doesNotThrow(() => ensureProxyLogsColumns(db));
});

test("logProxyEvent persists egressIp into proxy_logs.egress_ip", () => {
  proxyLogger.logProxyEvent({
    status: "success",
    provider: "codex",
    targetUrl: "codex/gpt-5.5",
    egressIp: "203.0.113.9",
  });
  const db = core.getDbInstance();
  const row = db.prepare("SELECT egress_ip FROM proxy_logs ORDER BY rowid DESC LIMIT 1").get() as {
    egress_ip: string | null;
  };
  assert.equal(row.egress_ip, "203.0.113.9");
});

test("egress_ip survives a DB close/reopen cycle (on-disk)", () => {
  proxyLogger.logProxyEvent({
    status: "success",
    provider: "openai",
    egressIp: "198.51.100.7",
  });
  core.closeDbInstance();
  const db = core.getDbInstance();
  const row = db.prepare("SELECT egress_ip FROM proxy_logs ORDER BY rowid DESC LIMIT 1").get() as {
    egress_ip: string | null;
  };
  assert.equal(row.egress_ip, "198.51.100.7");
});

test("egress_ip is NULL when not provided (never synthesized)", () => {
  proxyLogger.logProxyEvent({ status: "success", provider: "claude" });
  const db = core.getDbInstance();
  const row = db.prepare("SELECT egress_ip FROM proxy_logs ORDER BY rowid DESC LIMIT 1").get() as {
    egress_ip: string | null;
  };
  assert.equal(row.egress_ip, null);
});

test("getProxyLogs search matches the egress IP", () => {
  proxyLogger.logProxyEvent({ status: "success", provider: "codex", egressIp: "203.0.113.55" });
  const [log] = proxyLogger.getProxyLogs({ search: "203.0.113.55" });
  assert.ok(log, "expected a matching log");
  assert.equal(log.egressIp, "203.0.113.55");
});
