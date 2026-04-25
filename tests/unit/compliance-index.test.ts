import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-compliance-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.APP_LOG_RETENTION_DAYS = "10";
process.env.CALL_LOG_RETENTION_DAYS = "5";

const core = await import("../../src/lib/db/core.ts");
const compliance = await import("../../src/lib/compliance/index.ts");

function resetDb() {
  core.resetDbInstance();
  if (fs.existsSync(TEST_DATA_DIR)) {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => {
  resetDb();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("compliance audit log initialization, writes and filtered reads work end to end", () => {
  compliance.initAuditLog();
  compliance.logAuditEvent({
    action: "settings.update",
    actor: "admin",
    target: "system-settings",
    details: { changed: ["theme"] },
    resourceType: "settings",
    status: "success",
    requestId: "req-123",
    ipAddress: "127.0.0.1",
  });
  compliance.logAuditEvent({
    action: "apiKey.create",
    details: '"manual note"',
  });

  const all = compliance.getAuditLog();
  const filtered = compliance.getAuditLog({
    action: "settings.update",
    actor: "admin",
    limit: 1,
    offset: 0,
  });

  assert.equal(all.length, 2);
  assert.equal(all[0].action, "apiKey.create");
  assert.equal(all[0].actor, "system");
  assert.equal(all[0].details, "manual note");
  assert.equal(filtered[0].resourceType, "settings");
  assert.equal(filtered[0].resource_type, "settings");
  assert.equal(filtered[0].status, "success");
  assert.equal(filtered[0].requestId, "req-123");
  assert.equal(filtered[0].request_id, "req-123");
  assert.equal(filtered[0].ip, "127.0.0.1");
  assert.deepEqual(filtered[0].metadata, { changed: ["theme"] });
  assert.deepEqual(filtered, [
    {
      ...filtered[0],
      action: "settings.update",
      actor: "admin",
      target: "system-settings",
      details: { changed: ["theme"] },
      ip_address: "127.0.0.1",
    },
  ]);
});

test("compliance audit log supports structured filters, totals and secret redaction", () => {
  compliance.initAuditLog();

  compliance.logAuditEvent({
    action: "provider.credentials.updated",
    actor: "admin",
    target: "openai:primary",
    resourceType: "provider_credentials",
    status: "success",
    requestId: "req-provider-1",
    details: {
      apiKey: "sk-secret",
      nested: {
        refreshToken: "refresh-secret",
      },
      changedFields: ["defaultModel"],
    },
    ipAddress: "10.0.0.4",
    createdAt: "2026-04-14T10:00:00.000Z",
  });
  compliance.logAuditEvent({
    action: "provider.validation.ssrf_blocked",
    actor: "admin",
    target: "provider-node",
    resourceType: "provider_validation",
    status: "blocked",
    requestId: "req-provider-2",
    metadata: {
      reason: "Blocked private or local provider URL",
      baseUrl: "http://127.0.0.1:11434/v1",
    },
    createdAt: "2026-04-14T11:00:00.000Z",
  });

  const filtered = compliance.getAuditLog({
    resourceType: "provider_validation",
    status: "blocked",
    requestId: "req-provider-2",
    from: "2026-04-14T10:30:00.000Z",
    to: "2026-04-14T12:00:00.000Z",
  });

  assert.equal(compliance.countAuditLog({ actor: "admin" }), 2);
  assert.equal(filtered.length, 1);
  assert.equal(filtered[0].action, "provider.validation.ssrf_blocked");
  assert.deepEqual(filtered[0].metadata, {
    reason: "Blocked private or local provider URL",
    baseUrl: "http://127.0.0.1:11434/v1",
  });

  const updatedEntry = compliance.getAuditLog({ action: "provider.credentials.updated" })[0];
  assert.deepEqual(updatedEntry.details, {
    apiKey: "[redacted]",
    nested: {
      refreshToken: "[redacted]",
    },
    changedFields: ["defaultModel"],
  });
  assert.deepEqual(updatedEntry.metadata, updatedEntry.details);
});

test("compliance noLog helpers cover missing ids, in-memory overrides and persisted DB values", () => {
  const db = core.getDbInstance();
  const now = new Date().toISOString();

  db.prepare(
    "INSERT INTO api_keys (id, name, key, machine_id, allowed_models, no_log, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)"
  ).run("persisted-no-log", "Persisted", "sk-persisted", null, "[]", 1, now);

  assert.equal(compliance.isNoLog(""), false);
  assert.equal(compliance.isNoLog("persisted-no-log"), true);

  compliance.setNoLog("manual-no-log", true);
  assert.equal(compliance.isNoLog("manual-no-log"), true);

  compliance.setNoLog("manual-no-log", false);
  assert.equal(compliance.isNoLog("manual-no-log"), false);
  assert.deepEqual(compliance.getRetentionDays(), { app: 10, call: 5 });
});

test("cleanupExpiredLogs removes stale rows across all log tables and records an audit entry", () => {
  compliance.initAuditLog();
  const db = core.getDbInstance();

  const oldCallTs = new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString();
  const oldAppTs = new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString();
  const freshTs = new Date().toISOString();

  db.prepare("INSERT INTO usage_history (provider, model, timestamp) VALUES (?, ?, ?)").run(
    "openai",
    "gpt-4o",
    oldCallTs
  );
  db.prepare("INSERT INTO usage_history (provider, model, timestamp) VALUES (?, ?, ?)").run(
    "openai",
    "gpt-4o",
    freshTs
  );

  db.prepare("INSERT INTO call_logs (id, timestamp, method, path) VALUES (?, ?, ?, ?)").run(
    "call-old",
    oldCallTs,
    "POST",
    "/v1/chat/completions"
  );
  db.prepare("INSERT INTO call_logs (id, timestamp, method, path) VALUES (?, ?, ?, ?)").run(
    "call-new",
    freshTs,
    "POST",
    "/v1/chat/completions"
  );

  db.prepare("INSERT INTO proxy_logs (id, timestamp, status, proxy_type) VALUES (?, ?, ?, ?)").run(
    "proxy-old",
    oldCallTs,
    "ok",
    "http"
  );
  db.prepare("INSERT INTO proxy_logs (id, timestamp, status, proxy_type) VALUES (?, ?, ?, ?)").run(
    "proxy-new",
    freshTs,
    "ok",
    "http"
  );

  db.prepare("INSERT INTO request_detail_logs (id, call_log_id, timestamp) VALUES (?, ?, ?)").run(
    "rdl-old",
    "call-old",
    oldCallTs
  );
  db.prepare("INSERT INTO request_detail_logs (id, call_log_id, timestamp) VALUES (?, ?, ?)").run(
    "rdl-new",
    "call-new",
    freshTs
  );

  db.prepare("INSERT INTO mcp_tool_audit (tool_name, created_at) VALUES (?, ?)").run(
    "memory_search",
    oldAppTs
  );
  db.prepare("INSERT INTO mcp_tool_audit (tool_name, created_at) VALUES (?, ?)").run(
    "memory_add",
    freshTs
  );

  compliance.logAuditEvent({
    action: "admin.cleanup.seed",
    actor: "admin",
    details: { seeded: true },
  });
  db.prepare("UPDATE audit_log SET timestamp = ? WHERE action = ?").run(
    oldAppTs,
    "admin.cleanup.seed"
  );

  const result = compliance.cleanupExpiredLogs();
  const usageCount = (db.prepare("SELECT COUNT(*) as count FROM usage_history").get() as any).count;
  const callCount = (db.prepare("SELECT COUNT(*) as count FROM call_logs").get() as any).count;
  const proxyCount = (db.prepare("SELECT COUNT(*) as count FROM proxy_logs").get() as any).count;
  const requestDetailCount = (
    db.prepare("SELECT COUNT(*) as count FROM request_detail_logs") as any
  ).get().count;
  const mcpAuditCount = (db.prepare("SELECT COUNT(*) as count FROM mcp_tool_audit").get() as any)
    .count;
  const auditEntries = compliance.getAuditLog();
  const auditActions = auditEntries.map((entry) => entry.action);

  assert.deepEqual(result, {
    deletedUsage: 1,
    deletedCallLogs: 1,
    deletedProxyLogs: 1,
    deletedRequestDetailLogs: 1,
    deletedAuditLogs: 1,
    deletedMcpAuditLogs: 1,
    trimmedCallLogs: 0,
    trimmedProxyLogs: 0,
    appRetentionDays: 10,
    callRetentionDays: 5,
    callLogsMaxRows: result.callLogsMaxRows,
    proxyLogsMaxRows: result.proxyLogsMaxRows,
  });
  assert.equal(usageCount, 1);
  assert.equal(callCount, 1);
  assert.equal(proxyCount, 1);
  assert.equal(requestDetailCount, 1);
  assert.equal(mcpAuditCount, 1);
  assert.ok(auditActions.includes("compliance.cleanup"));
  const cleanupEntry = auditEntries.find((entry) => entry.action === "compliance.cleanup");
  assert.equal(cleanupEntry.resourceType, "maintenance");
  assert.equal(cleanupEntry.status, "success");
  assert.equal(cleanupEntry.target, "log-retention");
});

test("cleanupExpiredLogs tolerates missing tables and logAuditEvent failures without breaking", () => {
  compliance.initAuditLog();
  const db = core.getDbInstance();

  db.exec(`
    DROP TABLE usage_history;
    DROP TABLE call_logs;
    DROP TABLE proxy_logs;
    DROP TABLE request_detail_logs;
    DROP TABLE audit_log;
    DROP TABLE mcp_tool_audit;
  `);

  compliance.logAuditEvent({
    action: "will.fail.silently",
    details: { reason: "table dropped" },
  });

  const result = compliance.cleanupExpiredLogs();

  assert.deepEqual(result, {
    deletedUsage: 0,
    deletedCallLogs: 0,
    deletedProxyLogs: 0,
    deletedRequestDetailLogs: 0,
    deletedAuditLogs: 0,
    deletedMcpAuditLogs: 0,
    trimmedCallLogs: 0,
    trimmedProxyLogs: 0,
    appRetentionDays: 10,
    callRetentionDays: 5,
    callLogsMaxRows: result.callLogsMaxRows,
    proxyLogsMaxRows: result.proxyLogsMaxRows,
  });
});
