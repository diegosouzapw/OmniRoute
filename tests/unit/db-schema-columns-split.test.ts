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
