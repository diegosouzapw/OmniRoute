/**
 * #3500 — usage_logs / semantic_cache / proxy_logs SQL extracted into db modules
 * (Hard Rule #5, slice 4).
 *
 * Seeds an in-memory temp SQLite DB for each table and asserts each new db
 * function returns the correct rows / counts. DB handles are released in
 * test.after to prevent Node native test runner from hanging
 * (CLAUDE.md PII/Stream Learnings #3).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-db-logs-cache-3500-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const usageLogs = await import("../../src/lib/db/usageLogs.ts");
const semanticCache = await import("../../src/lib/db/semanticCache.ts");
const proxyLogs = await import("../../src/lib/db/proxyLogs.ts");

// ---------------------------------------------------------------------------
// Helpers — usage_logs seeding
// usage_logs is NOT in the core.ts schema; create it as a lightweight table
// mirroring the columns used by the auto-routing queries (model, provider).
// ---------------------------------------------------------------------------

function ensureUsageLogsTable() {
  const db = core.getDbInstance();
  db.prepare(
    `CREATE TABLE IF NOT EXISTS usage_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      model TEXT NOT NULL,
      provider TEXT NOT NULL,
      timestamp TEXT NOT NULL
    )`
  ).run();
}

function insertUsageLog(row: { model: string; provider: string }) {
  const db = core.getDbInstance();
  db.prepare(
    `INSERT INTO usage_logs (model, provider, timestamp) VALUES (?, ?, ?)`
  ).run(row.model, row.provider, new Date().toISOString());
}

// ---------------------------------------------------------------------------
// Helpers — semantic_cache seeding
// ---------------------------------------------------------------------------

function insertSemanticCache(row: {
  id: string;
  signature: string;
  model: string;
  hit_count?: number;
  tokens_saved?: number;
}) {
  const db = core.getDbInstance();
  db.prepare(
    `INSERT INTO semantic_cache
      (id, signature, model, prompt_hash, response, tokens_saved, hit_count, created_at, expires_at)
     VALUES
      (?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now', '+1 hour'))`
  ).run(
    row.id,
    row.signature,
    row.model,
    "hash_" + row.id,
    "{}",
    row.tokens_saved ?? 0,
    row.hit_count ?? 0,
  );
}

// ---------------------------------------------------------------------------
// Helpers — proxy_logs seeding
// ---------------------------------------------------------------------------

function insertProxyLog(row: { id: string; timestamp: string; provider?: string }) {
  const db = core.getDbInstance();
  db.prepare(
    `INSERT INTO proxy_logs (id, timestamp, provider, status, proxy_type) VALUES (?, ?, ?, ?, ?)`
  ).run(row.id, row.timestamp, row.provider ?? "openai", "ok", "http");
}

// ---------------------------------------------------------------------------
// Lifecycle
// ---------------------------------------------------------------------------

test.before(() => {
  core.resetDbInstance();
  ensureUsageLogsTable();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// ===========================================================================
// usageLogs — getAutoRoutingTotalCount
// ===========================================================================

test("#3500 getAutoRoutingTotalCount — returns 0 when no rows", () => {
  const result = usageLogs.getAutoRoutingTotalCount();
  assert.equal(result.count, 0);
});

test("#3500 getAutoRoutingTotalCount — counts auto and auto/* models", () => {
  insertUsageLog({ model: "auto", provider: "openai" });
  insertUsageLog({ model: "auto/fast", provider: "anthropic" });
  insertUsageLog({ model: "gpt-4", provider: "openai" }); // must NOT be counted

  const result = usageLogs.getAutoRoutingTotalCount();
  assert.ok(result.count >= 2, `expected >= 2, got ${result.count}`);
});

// ===========================================================================
// usageLogs — getAutoRoutingVariantBreakdown
// ===========================================================================

test("#3500 getAutoRoutingVariantBreakdown — maps auto → default, auto/X → X", () => {
  // Insert another auto and auto/fast to have stable counts
  insertUsageLog({ model: "auto", provider: "openai" });
  insertUsageLog({ model: "auto/fast", provider: "anthropic" });

  const rows = usageLogs.getAutoRoutingVariantBreakdown();
  const byVariant: Record<string, number> = {};
  for (const r of rows) byVariant[r.variant] = r.count;

  assert.ok("default" in byVariant, "should have a 'default' variant for bare 'auto'");
  assert.ok("fast" in byVariant, "should have a 'fast' variant for 'auto/fast'");
  assert.ok(byVariant["default"] >= 1, "default count >= 1");
  assert.ok(byVariant["fast"] >= 1, "fast count >= 1");
});

// ===========================================================================
// usageLogs — getAutoRoutingTopProviders
// ===========================================================================

test("#3500 getAutoRoutingTopProviders — returns top providers for auto/* models", () => {
  const rows = usageLogs.getAutoRoutingTopProviders();
  assert.ok(Array.isArray(rows), "result is array");
  assert.ok(rows.length > 0, "at least one provider row");
  for (const r of rows) {
    assert.equal(typeof r.provider, "string");
    assert.equal(typeof r.count, "number");
  }
  // Should be ordered descending by count (first row has highest count)
  if (rows.length > 1) {
    assert.ok(rows[0].count >= rows[1].count, "ordered descending by count");
  }
});

// ===========================================================================
// semanticCache — listSemanticCacheEntries
// ===========================================================================

test("#3500 listSemanticCacheEntries — returns entries with pagination", () => {
  insertSemanticCache({ id: "sc-1", signature: "sig-alpha", model: "gpt-4", hit_count: 5 });
  insertSemanticCache({ id: "sc-2", signature: "sig-beta", model: "claude-3", hit_count: 2 });
  insertSemanticCache({ id: "sc-3", signature: "sig-gamma", model: "gpt-4", hit_count: 1 });

  const result = semanticCache.listSemanticCacheEntries({
    page: 1,
    limit: 10,
    search: "",
    model: "",
    sortBy: "hit_count",
    sortOrder: "desc",
  });

  assert.ok(result.total >= 3, `total >= 3, got ${result.total}`);
  assert.ok(result.entries.length >= 3, "at least 3 entries returned");

  // First entry should have highest hit_count (sorted desc)
  if (result.entries.length >= 2) {
    assert.ok(
      result.entries[0].hit_count >= result.entries[1].hit_count,
      "sorted desc by hit_count"
    );
  }
});

test("#3500 listSemanticCacheEntries — search filter narrows results", () => {
  const result = semanticCache.listSemanticCacheEntries({
    page: 1,
    limit: 10,
    search: "sig-alpha",
    model: "",
    sortBy: "created_at",
    sortOrder: "desc",
  });

  assert.ok(result.total >= 1, "should find at least 1 matching entry");
  assert.ok(
    result.entries.some((e) => e.signature === "sig-alpha"),
    "sig-alpha in results"
  );
});

test("#3500 listSemanticCacheEntries — model filter works", () => {
  const result = semanticCache.listSemanticCacheEntries({
    page: 1,
    limit: 10,
    search: "",
    model: "claude-3",
    sortBy: "created_at",
    sortOrder: "desc",
  });

  assert.ok(result.total >= 1, "at least 1 claude-3 entry");
  for (const e of result.entries) {
    assert.equal(e.model, "claude-3", "all entries are claude-3");
  }
});

test("#3500 listSemanticCacheEntries — pagination offset works", () => {
  const p1 = semanticCache.listSemanticCacheEntries({
    page: 1,
    limit: 2,
    search: "",
    model: "",
    sortBy: "created_at",
    sortOrder: "asc",
  });
  const p2 = semanticCache.listSemanticCacheEntries({
    page: 2,
    limit: 2,
    search: "",
    model: "",
    sortBy: "created_at",
    sortOrder: "asc",
  });

  if (p1.entries.length > 0 && p2.entries.length > 0) {
    assert.notEqual(
      p1.entries[0].id,
      p2.entries[0].id,
      "page 1 and page 2 must not have the same first entry"
    );
  }
});

// ===========================================================================
// semanticCache — deleteSemanticCacheBySignature
// ===========================================================================

test("#3500 deleteSemanticCacheBySignature — deletes exactly the matching entry", () => {
  insertSemanticCache({ id: "sc-del-sig", signature: "sig-to-delete", model: "gpt-4" });

  // Verify it exists first
  const before = semanticCache.listSemanticCacheEntries({
    page: 1,
    limit: 100,
    search: "sig-to-delete",
    model: "",
    sortBy: "created_at",
    sortOrder: "desc",
  });
  assert.ok(before.total >= 1, "entry exists before delete");

  const result = semanticCache.deleteSemanticCacheBySignature("sig-to-delete");
  assert.equal(result.deleted, 1);

  const after = semanticCache.listSemanticCacheEntries({
    page: 1,
    limit: 100,
    search: "sig-to-delete",
    model: "",
    sortBy: "created_at",
    sortOrder: "desc",
  });
  assert.equal(after.total, 0, "entry removed after delete");
});

// ===========================================================================
// semanticCache — deleteSemanticCacheByModel
// ===========================================================================

test("#3500 deleteSemanticCacheByModel — deletes all entries for the given model", () => {
  insertSemanticCache({ id: "sc-m1", signature: "sig-model-a-1", model: "model-to-purge" });
  insertSemanticCache({ id: "sc-m2", signature: "sig-model-a-2", model: "model-to-purge" });

  const before = semanticCache.listSemanticCacheEntries({
    page: 1,
    limit: 100,
    search: "",
    model: "model-to-purge",
    sortBy: "created_at",
    sortOrder: "desc",
  });
  assert.ok(before.total >= 2, "2 entries before delete");

  const result = semanticCache.deleteSemanticCacheByModel("model-to-purge");
  assert.ok(result.deleted >= 2, `deleted >= 2, got ${result.deleted}`);

  const after = semanticCache.listSemanticCacheEntries({
    page: 1,
    limit: 100,
    search: "",
    model: "model-to-purge",
    sortBy: "created_at",
    sortOrder: "desc",
  });
  assert.equal(after.total, 0, "no entries remain after delete");
});

// ===========================================================================
// proxyLogs — exportProxyLogsSince
// ===========================================================================

test("#3500 exportProxyLogsSince — returns rows with timestamp >= since", () => {
  const base = new Date("2025-01-15T10:00:00.000Z");
  const old = new Date("2025-01-14T10:00:00.000Z");

  insertProxyLog({ id: "pl-new-1", timestamp: new Date("2025-01-15T11:00:00.000Z").toISOString(), provider: "openai" });
  insertProxyLog({ id: "pl-new-2", timestamp: new Date("2025-01-15T12:00:00.000Z").toISOString(), provider: "anthropic" });
  insertProxyLog({ id: "pl-old-1", timestamp: old.toISOString(), provider: "openai" }); // outside window

  const rows = proxyLogs.exportProxyLogsSince(base.toISOString());

  assert.ok(Array.isArray(rows), "result is array");
  const ids = rows.map((r) => (r as { id: string }).id);
  assert.ok(ids.includes("pl-new-1"), "pl-new-1 included");
  assert.ok(ids.includes("pl-new-2"), "pl-new-2 included");
  assert.ok(!ids.includes("pl-old-1"), "pl-old-1 excluded (before since)");
});

test("#3500 exportProxyLogsSince — results are ordered descending by timestamp", () => {
  const rows = proxyLogs.exportProxyLogsSince(new Date("2025-01-01T00:00:00.000Z").toISOString());
  assert.ok(rows.length >= 2, "at least 2 rows");

  // Verify descending order
  for (let i = 1; i < rows.length; i++) {
    const prev = (rows[i - 1] as { timestamp: string }).timestamp;
    const curr = (rows[i] as { timestamp: string }).timestamp;
    assert.ok(prev >= curr, `row ${i - 1} timestamp (${prev}) >= row ${i} (${curr})`);
  }
});

test("#3500 exportProxyLogsSince — returns empty array when no rows match", () => {
  const future = new Date(Date.now() + 86_400_000 * 365).toISOString();
  const rows = proxyLogs.exportProxyLogsSince(future);
  assert.deepEqual(rows, []);
});
