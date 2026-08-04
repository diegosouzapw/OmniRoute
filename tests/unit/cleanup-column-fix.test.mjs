import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

// Source-level invariant tests for cleanup.ts fixes.
// These verify the critical column name fixes that were causing silent cleanup failures.

const CLEANUP_PATH = path.resolve(import.meta.dirname, "../../src/lib/db/cleanup.ts");
const source = fs.readFileSync(CLEANUP_PATH, "utf-8");

test("cleanup: compression_analytics uses 'timestamp' column (not 'created_at')", () => {
  // The bug: cleanup used WHERE created_at < ? but the table has 'timestamp' column.
  // This caused silent failures — 600K+ rows accumulated over 52 days.
  assert.ok(
    source.includes("DELETE FROM compression_analytics WHERE timestamp < ?"),
    "compression_analytics cleanup must use 'timestamp' column, not 'created_at'"
  );
  assert.ok(
    !source.includes("DELETE FROM compression_analytics WHERE created_at"),
    "must NOT use created_at for compression_analytics (column doesn't exist)"
  );
});

test("cleanup: call_logs uses 'timestamp' column (not 'created_at')", () => {
  // Same bug as compression_analytics.
  assert.ok(
    source.includes("DELETE FROM call_logs WHERE timestamp < ?"),
    "call_logs cleanup must use 'timestamp' column"
  );
  assert.ok(
    !source.includes("DELETE FROM call_logs WHERE created_at"),
    "must NOT use created_at for call_logs (column doesn't exist)"
  );
});

test("cleanup: has proxy_logs cleanup function", () => {
  assert.ok(
    source.includes("cleanupProxyLogs"),
    "must have cleanupProxyLogs function for the proxy_logs table"
  );
  assert.ok(
    source.includes("DELETE FROM proxy_logs WHERE timestamp < ?"),
    "proxy_logs cleanup must use timestamp column"
  );
});

test("cleanup: proxy_logs is included in runAutoCleanup", () => {
  assert.ok(
    source.includes("proxyLogs: await cleanupProxyLogs()"),
    "runAutoCleanup must include proxyLogs cleanup"
  );
});

test("cleanup: has background scheduler (startCleanupScheduler)", () => {
  assert.ok(
    source.includes("startCleanupScheduler"),
    "must export startCleanupScheduler for periodic background cleanup"
  );
  assert.ok(
    source.includes("CLEANUP_INTERVAL_MS"),
    "must have a cleanup interval constant"
  );
  assert.ok(
    source.includes("VACUUM"),
    "scheduler must run VACUUM after deletes to reclaim disk space"
  );
});

test("cleanup: scheduler is wired into server-init.ts", () => {
  const serverInitPath = path.resolve(import.meta.dirname, "../../src/server-init.ts");
  const serverInit = fs.readFileSync(serverInitPath, "utf-8");
  assert.ok(
    serverInit.includes('import { startCleanupScheduler } from "./lib/db/cleanup"'),
    "server-init.ts must import startCleanupScheduler"
  );
  assert.ok(
    serverInit.includes("startCleanupScheduler()"),
    "server-init.ts must call startCleanupScheduler() at startup"
  );
});

test("cleanup: mcp_tool_audit uses correct table name (not 'mcp_audit_log')", () => {
  assert.ok(
    source.includes("DELETE FROM mcp_tool_audit WHERE"),
    "must use correct table name mcp_tool_audit"
  );
  assert.ok(
    !source.includes("DELETE FROM mcp_audit_log WHERE"),
    "must NOT use non-existent table name mcp_audit_log"
  );
});

test("cleanup: a2a_task_events uses correct table name (not 'a2a_events')", () => {
  assert.ok(
    source.includes("DELETE FROM a2a_task_events WHERE"),
    "must use correct table name a2a_task_events"
  );
  assert.ok(
    !source.includes("DELETE FROM a2a_events WHERE"),
    "must NOT use non-existent table name a2a_events"
  );
});

test("cleanup: memories uses correct table name (not 'memory_entries')", () => {
  assert.ok(
    source.includes("DELETE FROM memories WHERE"),
    "must use correct table name memories"
  );
  assert.ok(
    !source.includes("DELETE FROM memory_entries WHERE"),
    "must NOT use non-existent table name memory_entries"
  );
});
