import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import Database from "better-sqlite3";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-write-lifecycle-"));
process.env.DATA_DIR = dataDir;
process.env.NODE_ENV = "test";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../src/lib/db/core.ts");
const callLogs = await import("../../../src/lib/usage/callLogs.ts");

test.after(async () => {
  await callLogs.closeCallLogSaves();
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

test("a call log awaiting preparation cannot write through a replacement database", async (t) => {
  core.getDbInstance();
  t.mock.method(console, "error", () => {});
  const pending = callLogs.saveCallLog({
    id: "before-db-reset",
    provider: "test-provider",
    model: "test-model",
    status: 200,
    noLog: true,
  });
  core.resetDbInstance();
  core.getDbInstance();
  await pending;
  assert.equal(
    (await callLogs.getCallLogs()).some((row) => row.id === "before-db-reset"),
    false
  );
});

test("a locked proxy batch cannot retry through a replacement database", async (t) => {
  const proxy = await import("../../../src/lib/proxyLogger.ts");
  proxy.clearProxyLogs();
  const original = core.getDbInstance();
  original.pragma("busy_timeout = 20");
  t.mock.method(console, "warn", () => {});
  const locker = new Database(path.join(dataDir, "storage.sqlite"));
  try {
    locker.exec("BEGIN IMMEDIATE");
    proxy.logProxyEvent({ status: "success", correlationId: "proxy-before-reset" });
    proxy.flushProxyLogsSync();
    locker.exec("ROLLBACK");
    core.resetDbInstance();
    const replacement = core.getDbInstance();
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const row = replacement
      .prepare("SELECT COUNT(*) AS count FROM proxy_logs WHERE correlation_id = ?")
      .get("proxy-before-reset") as { count: number };
    assert.equal(row.count, 0);
  } finally {
    locker.close();
    proxy.clearProxyLogs();
  }
});

test("clearing proxy logs also discards the batch waiting for its first flush", async () => {
  const proxy = await import("../../../src/lib/proxyLogger.ts");
  proxy.clearProxyLogs();
  proxy.logProxyEvent({ status: "success", correlationId: "cleared-before-flush" });
  proxy.clearProxyLogs();
  proxy.flushProxyLogsSync();
  const row = core
    .getDbInstance()
    .prepare("SELECT COUNT(*) AS count FROM proxy_logs WHERE correlation_id = ?")
    .get("cleared-before-flush") as { count: number };
  assert.equal(row.count, 0);
});

test("deferred physical usage attempts preserve the deduplication opt-out", async () => {
  const { saveRequestUsage } = await import("../../../src/lib/usage/usageHistory.ts");
  const db = core.getDbInstance();
  db.pragma("busy_timeout = 20");
  const locker = new Database(path.join(dataDir, "storage.sqlite"));
  const entry = {
    provider: "test-provider",
    model: "physical-retry",
    timestamp: "2026-10-17T12:00:00.000Z",
    tokens: { input_tokens: 10, output_tokens: 20 },
  };
  try {
    locker.exec("BEGIN IMMEDIATE");
    await saveRequestUsage(entry, { deduplicate: false });
    await saveRequestUsage(entry, { deduplicate: false });
    locker.exec("ROLLBACK");
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const row = db
      .prepare("SELECT COUNT(*) AS count FROM usage_history WHERE model = ?")
      .get(entry.model) as { count: number };
    assert.equal(row.count, 2);
  } finally {
    locker.close();
  }
});

test("prepared call logs retain request-scoped API key and connection attribution", async () => {
  const { runWithCallLogApiKeyContext } =
    await import("../../../src/lib/usage/callLogApiKeyContext.ts");
  await runWithCallLogApiKeyContext(
    { apiKeyId: "context-key", apiKeyName: "context-name", connectionId: "context-connection" },
    () => callLogs.saveCallLog({ id: "context-attribution", status: 200, noLog: true })
  );
  const row = (await callLogs.getCallLogs()).find((entry) => entry.id === "context-attribution");
  assert.equal(row?.apiKeyId, "context-key");
  assert.equal(row?.apiKeyName, "context-name");
  assert.equal(row?.connectionId, "context-connection");
});
