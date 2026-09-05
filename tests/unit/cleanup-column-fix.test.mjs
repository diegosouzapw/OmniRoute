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
  assert.ok(source.includes("CLEANUP_INTERVAL_MS"), "must have a cleanup interval constant");
  // #12821: reclaim freed pages without a blocking full VACUUM on the serving thread.
  assert.ok(
    source.includes("incremental_vacuum("),
    "scheduler must reclaim freed pages via PRAGMA incremental_vacuum after deletes"
  );
  assert.ok(
    !/\b(exec|run|prepare)\s*\(\s*[`'"]\s*VACUUM\b/i.test(source),
    "scheduler must never run a blocking full VACUUM — defer to vacuumScheduler (#12821)"
  );
});

test("cleanup: scheduler is wired into instrumentation-node.ts", () => {
  const instrumentationPath = path.resolve(
    import.meta.dirname,
    "../../src/instrumentation-node.ts"
  );
  const instrumentation = fs.readFileSync(instrumentationPath, "utf-8");
  assert.ok(
    instrumentation.includes("startCleanupScheduler"),
    "instrumentation-node.ts must import startCleanupScheduler"
  );
  assert.ok(
    instrumentation.includes("startCleanupScheduler()"),
    "instrumentation-node.ts must call startCleanupScheduler() at startup"
  );
});

test("cleanup: mcp_tool_audit uses correct table name (not 'mcp_audit_log')", () => {
  assert.ok(
    source.includes("DELETE FROM mcp_tool_audit WHERE created_at < ?"),
    "mcp_tool_audit cleanup must use its created_at column"
  );
  assert.ok(
    !source.includes("DELETE FROM mcp_audit_log WHERE"),
    "must NOT use non-existent table name mcp_audit_log"
  );
  assert.ok(
    !source.includes("DELETE FROM mcp_tool_audit WHERE timestamp"),
    "must NOT use timestamp for mcp_tool_audit"
  );
});

test("cleanup: a2a_task_events uses correct table name (not 'a2a_events')", () => {
  assert.ok(
    source.includes("DELETE FROM a2a_task_events WHERE created_at < ?"),
    "a2a_task_events cleanup must use its created_at column"
  );
  assert.ok(
    !source.includes("DELETE FROM a2a_events WHERE"),
    "must NOT use non-existent table name a2a_events"
  );
  assert.ok(
    !source.includes("DELETE FROM a2a_task_events WHERE timestamp"),
    "must NOT use timestamp for a2a_task_events"
  );
});

test("cleanup: memories uses correct table name (not 'memory_entries')", () => {
  assert.ok(source.includes("DELETE FROM memories WHERE"), "must use correct table name memories");
  assert.ok(
    !source.includes("DELETE FROM memory_entries WHERE"),
    "must NOT use non-existent table name memory_entries"
  );
});

test("cleanup: mcp_tool_audit prunes by created_at (existing column), not timestamp", () => {
  // mcp_tool_audit has created_at (see 002_mcp_a2a_tables.sql); timestamp does
  // not exist, so WHERE timestamp < ? raised SqliteError "no such column" at
  // every boot-time cleanup and the retention pruning never ran.
  assert.ok(
    source.includes("DELETE FROM mcp_tool_audit WHERE created_at < ?"),
    "mcp_tool_audit cleanup must use created_at column"
  );
  assert.ok(
    !source.includes("DELETE FROM mcp_tool_audit WHERE timestamp"),
    "must NOT use timestamp for mcp_tool_audit (column doesn't exist)"
  );
});

test("cleanup: a2a_task_events prunes by created_at (existing column), not timestamp", () => {
  // Same schema fact for a2a_task_events (created_at, no timestamp column).
  assert.ok(
    source.includes("DELETE FROM a2a_task_events WHERE created_at < ?"),
    "a2a_task_events cleanup must use created_at column"
  );
  assert.ok(
    !source.includes("DELETE FROM a2a_task_events WHERE timestamp"),
    "must NOT use timestamp for a2a_task_events (column doesn't exist)"
  );
});
