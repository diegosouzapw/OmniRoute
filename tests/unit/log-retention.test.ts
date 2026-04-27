import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-log-retention-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.APP_LOG_RETENTION_DAYS = "2";
process.env.CALL_LOG_RETENTION_DAYS = "1";
process.env.CALL_LOGS_TABLE_MAX_ROWS = "5";
process.env.PROXY_LOGS_TABLE_MAX_ROWS = "5";

const core = await import("../../src/lib/db/core.ts");
const compliance = await import("../../src/lib/compliance/index.ts");

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => {
  resetStorage();
});

test.after(() => {
  resetStorage();
});

test("cleanupExpiredLogs uses separate APP and CALL retention windows", () => {
  compliance.initAuditLog();
  const db = core.getDbInstance();

  const oldCallTs = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString();
  const freshCallTs = new Date().toISOString();
  const oldAppTs = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString();
  const freshAppTs = new Date().toISOString();

  db.prepare(
    "INSERT INTO usage_history (provider, model, tokens_input, tokens_output, success, latency_ms, ttft_ms, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
  ).run("openai", "old-usage", 1, 1, 1, 1, 1, oldCallTs);
  db.prepare(
    "INSERT INTO usage_history (provider, model, tokens_input, tokens_output, success, latency_ms, ttft_ms, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
  ).run("openai", "fresh-usage", 1, 1, 1, 1, 1, freshCallTs);

  db.prepare(
    "INSERT INTO call_logs (id, timestamp, method, path, status, model, provider, account, duration, tokens_in, tokens_out, has_pipeline_details) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
  ).run(
    "old-call",
    oldCallTs,
    "POST",
    "/v1/chat/completions",
    200,
    "old",
    "openai",
    "-",
    1,
    1,
    1,
    0
  );
  db.prepare(
    "INSERT INTO call_logs (id, timestamp, method, path, status, model, provider, account, duration, tokens_in, tokens_out, has_pipeline_details) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
  ).run(
    "fresh-call",
    freshCallTs,
    "POST",
    "/v1/chat/completions",
    200,
    "fresh",
    "openai",
    "-",
    1,
    1,
    1,
    0
  );

  db.prepare(
    "INSERT INTO proxy_logs (id, timestamp, status, level, latency_ms) VALUES (?, ?, ?, ?, ?)"
  ).run("old-proxy", oldCallTs, "success", "direct", 1);
  db.prepare(
    "INSERT INTO proxy_logs (id, timestamp, status, level, latency_ms) VALUES (?, ?, ?, ?, ?)"
  ).run("fresh-proxy", freshCallTs, "success", "direct", 1);

  db.prepare("INSERT INTO request_detail_logs (id, timestamp, duration_ms) VALUES (?, ?, ?)").run(
    "old-detail",
    oldCallTs,
    1
  );
  db.prepare("INSERT INTO request_detail_logs (id, timestamp, duration_ms) VALUES (?, ?, ?)").run(
    "fresh-detail",
    freshCallTs,
    1
  );

  db.prepare("INSERT INTO audit_log (timestamp, action, actor) VALUES (?, ?, ?)").run(
    oldAppTs,
    "old-audit",
    "system"
  );
  db.prepare("INSERT INTO audit_log (timestamp, action, actor) VALUES (?, ?, ?)").run(
    freshAppTs,
    "fresh-audit",
    "system"
  );

  db.prepare("INSERT INTO mcp_tool_audit (tool_name, success, created_at) VALUES (?, ?, ?)").run(
    "old-tool",
    1,
    oldAppTs
  );
  db.prepare("INSERT INTO mcp_tool_audit (tool_name, success, created_at) VALUES (?, ?, ?)").run(
    "fresh-tool",
    1,
    freshAppTs
  );

  const result = compliance.cleanupExpiredLogs();

  assert.equal(result.deletedUsage, 1);
  assert.equal(result.deletedCallLogs, 1);
  assert.equal(result.deletedProxyLogs, 1);
  assert.equal(result.deletedRequestDetailLogs, 1);
  assert.equal(result.deletedAuditLogs, 1);
  assert.equal(result.deletedMcpAuditLogs, 1);
  assert.deepEqual(compliance.getRetentionDays(), { app: 2, call: 1 });

  assert.equal((db.prepare("SELECT COUNT(*) AS cnt FROM usage_history").get() as any).cnt, 1);
  assert.equal((db.prepare("SELECT COUNT(*) AS cnt FROM call_logs").get() as any).cnt, 1);
  assert.equal((db.prepare("SELECT COUNT(*) AS cnt FROM proxy_logs").get() as any).cnt, 1);
  assert.equal((db.prepare("SELECT COUNT(*) AS cnt FROM request_detail_logs").get() as any).cnt, 1);
  assert.equal((db.prepare("SELECT COUNT(*) AS cnt FROM audit_log").get() as any).cnt, 2);
  assert.equal((db.prepare("SELECT COUNT(*) AS cnt FROM mcp_tool_audit").get() as any).cnt, 1);
});

test("cleanupExpiredLogs enforces row count limits", () => {
  compliance.initAuditLog();
  const db = core.getDbInstance();

  const now = new Date().toISOString();

  for (let i = 0; i < 10; i++) {
    db.prepare(
      "INSERT INTO call_logs (id, timestamp, method, path, status, model, provider, account, duration, tokens_in, tokens_out, has_pipeline_details) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    ).run(
      `call-${i}`,
      now,
      "POST",
      "/v1/chat/completions",
      200,
      "model",
      "provider",
      "-",
      1,
      1,
      1,
      0
    );
  }

  for (let i = 0; i < 10; i++) {
    db.prepare(
      "INSERT INTO proxy_logs (id, timestamp, status, level, latency_ms) VALUES (?, ?, ?, ?, ?)"
    ).run(`proxy-${i}`, now, "success", "direct", 1);
  }

  assert.equal((db.prepare("SELECT COUNT(*) AS cnt FROM call_logs").get() as any).cnt, 10);
  assert.equal((db.prepare("SELECT COUNT(*) AS cnt FROM proxy_logs").get() as any).cnt, 10);

  const result = compliance.cleanupExpiredLogs();

  assert.equal(result.trimmedCallLogs, 5);
  assert.equal(result.trimmedProxyLogs, 5);
  assert.equal(result.callLogsMaxRows, 5);
  assert.equal(result.proxyLogsMaxRows, 5);

  assert.equal((db.prepare("SELECT COUNT(*) AS cnt FROM call_logs").get() as any).cnt, 5);
  assert.equal((db.prepare("SELECT COUNT(*) AS cnt FROM proxy_logs").get() as any).cnt, 5);
});

test("getCallLogsTableMaxRows returns configured value", async () => {
  const { getCallLogsTableMaxRows, getProxyLogsTableMaxRows } =
    await import("../../src/lib/logEnv.ts");

  assert.equal(getCallLogsTableMaxRows(), 5);
  assert.equal(getProxyLogsTableMaxRows(), 5);
});
