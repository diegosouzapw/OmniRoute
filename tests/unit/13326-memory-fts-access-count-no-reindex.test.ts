/**
 * #13326 — memory_fts_au trigger should NOT reindex on access_count-only updates.
 *
 * Before the fix, the AFTER UPDATE trigger on `memories` had no WHEN clause,
 * so recordMemoryAccess() (which only touches access_count + last_accessed_at)
 * triggered a full FTS delete+insert cycle — accumulating unbounded tombstones
 * in memory_fts_data/docsize.
 *
 * After the fix (migration 149), the trigger only fires when `content` or `key`
 * actually change.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-fts-trigger-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.VECTOR_STORE_DISABLE_VEC = "true";

const core = await import("../../src/lib/db/core.ts");
const { MemoryType } = await import("../../src/lib/memory/types.ts");
const store = await import("../../src/lib/memory/store.ts");

function cleanup() {
  core.resetDbInstance();
  if (fs.existsSync(TEST_DATA_DIR)) {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.afterEach(() => {
  cleanup();
});

test.after(() => {
  if (fs.existsSync(TEST_DATA_DIR)) {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  }
});

function ftsRowCount(): number {
  const db = core.getDbInstance();
  const row = db.prepare("SELECT count(*) as cnt FROM memory_fts").get() as { cnt: number };
  return row.cnt;
}

function ftsDataRowCount(): number {
  const db = core.getDbInstance();
  const row = db.prepare("SELECT count(*) as cnt FROM memory_fts_data").get() as { cnt: number };
  return row.cnt;
}

function triggerHasWhenClause(): boolean {
  const db = core.getDbInstance();
  const row = db.prepare(
    "SELECT sql FROM sqlite_master WHERE type='trigger' AND name='memory_fts_au'"
  ).get() as { sql: string } | undefined;
  return row?.sql?.includes("WHEN") ?? false;
}

// ── Tests ────────────────────────────────────────────────────────────────────

test("#13326: migration 149 adds WHEN clause to memory_fts_au trigger", () => {
  assert.ok(
    triggerHasWhenClause(),
    "memory_fts_au trigger must have a WHEN clause to skip content-irrelevant updates"
  );
});

test("#13326: access_count update does not create new FTS rows", async () => {
  const mem = await store.createMemory({
    content: "The backup files .app-prev-* must never be deleted.",
    key: "deploy-rule",
    type: MemoryType.FACTUAL,
    apiKeyId: "test-key",
    sessionId: "test-sess",
    metadata: {},
    expiresAt: null,
  });

  const baselineCount = ftsRowCount();
  assert.ok(baselineCount >= 1, "FTS should have at least 1 row after insert");

  // Simulate recordMemoryAccess — bumps access_count + last_accessed_at only
  store.recordMemoryAccess([mem.id]);
  store.recordMemoryAccess([mem.id]);
  store.recordMemoryAccess([mem.id]);

  const afterAccessCount = ftsRowCount();
  assert.equal(
    afterAccessCount,
    baselineCount,
    `FTS row count must not change after access_count-only updates (was ${baselineCount}, got ${afterAccessCount})`
  );
});

test("#13326: access_count update does not bloat FTS internal data", async () => {
  const mem = await store.createMemory({
    content: "The backup files .app-prev-* must never be deleted.",
    key: "bloat-test",
    type: MemoryType.FACTUAL,
    apiKeyId: "test-key",
    sessionId: "test-sess",
    metadata: {},
    expiresAt: null,
  });

  const baselineDataRows = ftsDataRowCount();

  // Do many access_count updates to verify no internal bloat
  for (let i = 0; i < 20; i++) {
    store.recordMemoryAccess([mem.id]);
  }

  const afterDataRows = ftsDataRowCount();
  assert.equal(
    afterDataRows,
    baselineDataRows,
    `FTS internal data rows must not grow from access_count updates (was ${baselineDataRows}, got ${afterDataRows})`
  );
});

test("#13326: content change DOES update FTS index", async () => {
  const mem = await store.createMemory({
    content: "Original content for FTS test",
    key: "fts-content-test",
    type: MemoryType.SEMANTIC,
    apiKeyId: "test-key",
    sessionId: "test-sess",
    metadata: {},
    expiresAt: null,
  });

  // Verify original content is searchable
  const db = core.getDbInstance();
  const beforeUpdate = db.prepare(
    "SELECT count(*) as cnt FROM memory_fts WHERE memory_fts MATCH ?"
  ).get("Original") as { cnt: number };
  assert.ok(beforeUpdate.cnt >= 1, "FTS should find 'Original' before update");

  // Update content
  await store.updateMemory(mem.id, { content: "Updated content for FTS test" });

  // After the trigger fires, new content should be findable
  const afterNew = db.prepare(
    "SELECT count(*) as cnt FROM memory_fts WHERE memory_fts MATCH ?"
  ).get("Updated") as { cnt: number };

  assert.ok(afterNew.cnt >= 1, "FTS should find 'Updated' after content change");
});

test("#13326: key change DOES update FTS index", async () => {
  const mem = await store.createMemory({
    content: "Some content for key change test",
    key: "old_key",
    type: MemoryType.SEMANTIC,
    apiKeyId: "test-key",
    sessionId: "test-sess",
    metadata: {},
    expiresAt: null,
  });

  const db = core.getDbInstance();
  // FTS5 treats hyphens as minus operators, so use double-quotes to match literal
  const beforeKey = db.prepare(
    "SELECT count(*) as cnt FROM memory_fts WHERE memory_fts MATCH ?"
  ).get("old_key") as { cnt: number };
  assert.ok(beforeKey.cnt >= 1, "FTS should find 'old_key' before update");

  await store.updateMemory(mem.id, { key: "new_key" });

  const afterNewKey = db.prepare(
    "SELECT count(*) as cnt FROM memory_fts WHERE memory_fts MATCH ?"
  ).get("new_key") as { cnt: number };

  assert.ok(afterNewKey.cnt >= 1, "FTS should find 'new_key' after key change");
});
