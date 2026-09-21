import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// proxy_logs keeps the HTTP status the provider actually returned, next to the textual
// status column. Persistence only runs in local mode (!isCloud && !isBuildPhase), which a
// fresh DATA_DIR keeps.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-proxy-upstream-status-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const proxyLogger = await import("../../src/lib/proxyLogger.ts");

function resetStorage() {
  proxyLogger.clearProxyLogs();
  core.closeDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => {
  resetStorage();
});

test.after(() => {
  core.closeDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("a fresh install has upstream_status and the reconciler restores it", async () => {
  const { ensureProxyLogsColumns, hasColumn } = await import("../../src/lib/db/schemaColumns.ts");
  const db = core.getDbInstance();
  assert.equal(hasColumn(db, "proxy_logs", "upstream_status"), true, "column after migration");
  db.exec("ALTER TABLE proxy_logs DROP COLUMN upstream_status");
  assert.equal(hasColumn(db, "proxy_logs", "upstream_status"), false);
  ensureProxyLogsColumns(db);
  assert.equal(hasColumn(db, "proxy_logs", "upstream_status"), true, "column restored");
  assert.doesNotThrow(() => ensureProxyLogsColumns(db));
});

test("upstreamStatus is kept in memory, in SQLite and in the export", async () => {
  proxyLogger.logProxyEvent({
    status: "error",
    provider: "openai",
    targetUrl: "openai/gpt-5",
    upstreamStatus: 429,
  });

  const [entry] = proxyLogger.getProxyLogs();
  assert.equal(entry.upstreamStatus, 429);

  proxyLogger.flushProxyLogsSync();
  const row = core.getDbInstance().prepare("SELECT upstream_status FROM proxy_logs").get() as {
    upstream_status: number | null;
  };
  assert.equal(row.upstream_status, 429);

  const { exportProxyLogsSince } = await import("../../src/lib/db/proxyLogs.ts");
  const [exported] = exportProxyLogsSince("1970-01-01T00:00:00.000Z");
  assert.equal(exported.upstream_status, 429);
});

test("an entry without upstreamStatus stores null, never 0", () => {
  proxyLogger.logProxyEvent({ status: "error", provider: "openai", targetUrl: "openai/gpt-5" });

  const [entry] = proxyLogger.getProxyLogs();
  assert.equal(entry.upstreamStatus, null);

  proxyLogger.flushProxyLogsSync();
  const row = core.getDbInstance().prepare("SELECT upstream_status FROM proxy_logs").get() as {
    upstream_status: number | null;
  };
  assert.equal(row.upstream_status, null);
});

test("the textual status filters return the same rows as before", () => {
  proxyLogger.logProxyEvent({ status: "success", provider: "openai", upstreamStatus: 200 });
  proxyLogger.logProxyEvent({ status: "error", provider: "openai", upstreamStatus: 429 });
  proxyLogger.logProxyEvent({ status: "error", provider: "openai" });

  assert.equal(proxyLogger.getProxyLogs({ status: "ok" }).length, 1);
  assert.equal(proxyLogger.getProxyLogs({ status: "error" }).length, 2);
  assert.equal(proxyLogger.getProxyLogs({ status: "timeout" }).length, 0);
});
