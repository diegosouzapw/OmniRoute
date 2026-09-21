// Characterization of the db/core.ts schema-column split (god-file decomposition): the idempotent
// ALTER-TABLE column reconcilers + table introspection helpers moved into db/schemaColumns.ts. These
// run an in-memory SQLite db through the helpers to lock the observable behavior: ensure* adds missing
// columns and is safe to re-run; hasTable/hasColumn/getTableColumns/quoteIdentifier introspect.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { tryOpenSync } from "../../src/lib/db/adapters/driverFactory.ts";
import {
  ensureUsageHistoryColumns,
  ensureProviderConnectionsColumns,
  ensureProxyLogsColumns,
  ensureCallLogsColumns,
  hasColumn,
  hasTable,
  quoteIdentifier,
  getTableColumns,
} from "../../src/lib/db/schemaColumns.ts";

function openMemoryDb() {
  // Synchronous in-memory adapter — no DATA_DIR / file handles to clean up.
  const db = tryOpenSync(":memory:");
  assert.ok(db, "expected a synchronous sqlite adapter for :memory:");
  return db!;
}

test("quoteIdentifier escapes embedded double quotes", () => {
  assert.equal(quoteIdentifier("plain"), '"plain"');
  assert.equal(quoteIdentifier('we"ird'), '"we""ird"');
});

test("hasTable / hasColumn / getTableColumns introspect a live table", () => {
  const db = openMemoryDb();
  try {
    db.exec("CREATE TABLE usage_history (id INTEGER PRIMARY KEY, model TEXT)");
    assert.equal(hasTable(db, "usage_history"), true);
    assert.equal(hasTable(db, "does_not_exist"), false);
    assert.equal(hasColumn(db, "usage_history", "model"), true);
    assert.equal(hasColumn(db, "usage_history", "nope"), false);
    assert.deepEqual(getTableColumns(db, "usage_history").sort(), ["id", "model"]);
  } finally {
    db.close?.();
  }
});

test("ensureUsageHistoryColumns adds missing columns and is idempotent", () => {
  const db = openMemoryDb();
  try {
    db.exec("CREATE TABLE usage_history (id INTEGER PRIMARY KEY, model TEXT)");
    assert.equal(hasColumn(db, "usage_history", "service_tier"), false);

    ensureUsageHistoryColumns(db);
    for (const col of [
      "success",
      "latency_ms",
      "ttft_ms",
      "error_code",
      "service_tier",
      "combo_strategy",
    ]) {
      assert.equal(hasColumn(db, "usage_history", col), true, `expected ${col} after ensure`);
    }

    // Re-running must not throw (columns already present) — idempotency.
    assert.doesNotThrow(() => ensureUsageHistoryColumns(db));
  } finally {
    db.close?.();
  }
});

test("ensureProviderConnectionsColumns repairs quota visibility with a visible default", () => {
  const db = openMemoryDb();
  try {
    db.exec("CREATE TABLE provider_connections (id TEXT PRIMARY KEY, provider TEXT NOT NULL)");
    assert.equal(hasColumn(db, "provider_connections", "quota_visible"), false);

    ensureProviderConnectionsColumns(db);
    assert.equal(hasColumn(db, "provider_connections", "quota_visible"), true);
    const column = db
      .prepare("PRAGMA table_info(provider_connections)")
      .all()
      .find((entry: { name?: string }) => entry.name === "quota_visible") as
      { notnull?: number; dflt_value?: string } | undefined;
    assert.equal(column?.notnull, 1);
    assert.equal(column?.dflt_value, "1");
    assert.doesNotThrow(() => ensureProviderConnectionsColumns(db));
  } finally {
    db.close?.();
  }
});

test("ensureProxyLogsColumns self-heals a bare proxy_logs (upgrade path)", () => {
  const db = openMemoryDb();
  try {
    db.exec("CREATE TABLE proxy_logs (id TEXT PRIMARY KEY, timestamp TEXT NOT NULL)");
    assert.equal(hasColumn(db, "proxy_logs", "egress_ip"), false);

    ensureProxyLogsColumns(db);
    assert.equal(hasColumn(db, "proxy_logs", "egress_ip"), true);
    assert.doesNotThrow(() => ensureProxyLogsColumns(db));
  } finally {
    db.close?.();
  }
});

test("migration 134 SQL applies egress_ip to a bare proxy_logs", () => {
  const db = openMemoryDb();
  try {
    db.exec("CREATE TABLE proxy_logs (id TEXT PRIMARY KEY, timestamp TEXT NOT NULL)");
    const sql = fs.readFileSync(
      path.join(process.cwd(), "src/lib/db/migrations/134_proxy_logs_egress_ip.sql"),
      "utf8"
    );
    db.exec(sql);
    assert.equal(hasColumn(db, "proxy_logs", "egress_ip"), true);
  } finally {
    db.close?.();
  }
});

test("ensureProviderConnectionsColumns restores base columns required by later migrations", () => {
  const db = openMemoryDb();
  try {
    db.exec(`
      CREATE TABLE provider_connections (
        id TEXT PRIMARY KEY,
        provider TEXT NOT NULL,
        auth_type TEXT,
        is_active INTEGER NOT NULL DEFAULT 1
      )
    `);
    assert.equal(hasColumn(db, "provider_connections", "provider_specific_data"), false);
    assert.equal(hasColumn(db, "provider_connections", "default_model"), false);

    ensureProviderConnectionsColumns(db);

    assert.equal(hasColumn(db, "provider_connections", "provider_specific_data"), true);
    assert.equal(hasColumn(db, "provider_connections", "default_model"), true);
    assert.equal(hasColumn(db, "provider_connections", "last_ping_at"), true);
    assert.equal(hasColumn(db, "provider_connections", "last_pinged_reset_key"), true);
    const columnsAfterFirstRun = getTableColumns(db, "provider_connections").sort();
    const indexesAfterFirstRun = (
      db.prepare("PRAGMA index_list(provider_connections)").all() as Array<{ name: string }>
    )
      .map((index) => index.name)
      .sort();
    const warnings: unknown[][] = [];
    const originalWarn = console.warn;
    try {
      console.warn = (...args: unknown[]) => warnings.push(args);
      ensureProviderConnectionsColumns(db);
    } finally {
      console.warn = originalWarn;
    }

    assert.deepEqual(getTableColumns(db, "provider_connections").sort(), columnsAfterFirstRun);
    assert.deepEqual(
      (db.prepare("PRAGMA index_list(provider_connections)").all() as Array<{ name: string }>)
        .map((index) => index.name)
        .sort(),
      indexesAfterFirstRun
    );
    assert.deepEqual(warnings, []);
  } finally {
    db.close?.();
  }
});

test("ensureProviderConnectionsColumns back-fills last_ping columns on a pre-123 lineage", () => {
  const db = openMemoryDb();
  try {
    db.exec("CREATE TABLE provider_connections (id TEXT PRIMARY KEY, provider TEXT NOT NULL)");
    assert.equal(hasColumn(db, "provider_connections", "last_ping_at"), false);
    assert.equal(hasColumn(db, "provider_connections", "last_pinged_reset_key"), false);

    ensureProviderConnectionsColumns(db);

    assert.equal(hasColumn(db, "provider_connections", "last_ping_at"), true);
    assert.equal(hasColumn(db, "provider_connections", "last_pinged_reset_key"), true);
    assert.doesNotThrow(() => ensureProviderConnectionsColumns(db));
  } finally {
    db.close?.();
  }
});

// #12150 P2b: `resolvePreviousResponseState` SELECTs `video_content_removed` on
// every previous_response_id lookup. Migration 173 adds it, but a lineage that
// skipped 173 would raise "no such column" there instead of failing closed, so
// the reconciliation has to carry it too — the hole #12470 closed for
// provider_connections.
test("ensureCallLogsColumns back-fills video_content_removed on a pre-173 lineage", () => {
  const db = openMemoryDb();
  try {
    db.exec("CREATE TABLE call_logs (id TEXT PRIMARY KEY, timestamp TEXT)");
    assert.equal(hasColumn(db, "call_logs", "video_content_removed"), false);

    ensureCallLogsColumns(db);

    assert.equal(hasColumn(db, "call_logs", "video_content_removed"), true);
    const row = db
      .prepare("SELECT video_content_removed AS v FROM call_logs WHERE id = ?")
      .get("missing") as { v: number } | undefined;
    assert.equal(row, undefined, "empty table — the column just has to be selectable");
    assert.doesNotThrow(() => ensureCallLogsColumns(db));
  } finally {
    db.close?.();
  }
});
