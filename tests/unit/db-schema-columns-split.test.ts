// Characterization of the db/core.ts schema-column split (god-file decomposition): the idempotent
// ALTER-TABLE column reconcilers + table introspection helpers moved into db/schemaColumns.ts. These
// run an in-memory SQLite db through the helpers to lock the observable behavior: ensure* adds missing
// columns and is safe to re-run; hasTable/hasColumn/getTableColumns/quoteIdentifier introspect.
import { test } from "node:test";
import assert from "node:assert/strict";
import { tryOpenSync } from "../../src/lib/db/adapters/driverFactory.ts";
import {
  ensureUsageHistoryColumns,
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
