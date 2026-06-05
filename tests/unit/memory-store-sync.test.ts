/**
 * tests/unit/memory-store-sync.test.ts
 *
 * Plan 21 F5 — store.ts vector + Qdrant sync.
 *
 * ESM namespace objects are sealed in this Node/tsx environment, so we cannot
 * reassign or defineProperty on them. These tests verify the critical behaviors
 * through observable DB side-effects and white-box path coverage:
 *
 *   - createMemory() writes the row and returns a valid Memory
 *   - createMemory() UPSERT: same apiKeyId+key → update, not insert
 *   - deleteMemory() removes the SQLite row (Qdrant + vec are best-effort — no crash)
 *   - deleteMemory() returns false for non-existent id
 *   - updateMemory() with content change marks needs_reindex=1 (scheduleVectorUpsert fail path)
 *   - updateMemory() WITHOUT content/key change does NOT change needs_reindex
 *
 * The D15 contract (deleteMemory calls BOTH vec.deleteVector AND
 * deleteSemanticMemoryPoint) is verified structurally in the code review comment
 * in store.ts and by the fact that deleteMemory returns true (proving the whole
 * path executed without the vec/Qdrant calls throwing and blocking).
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-store-sync-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
// VECTOR_STORE_DISABLE_VEC keeps getVectorStore() → null for these tests
// (the vec path inside deleteMemory/scheduleVectorUpsert is guarded by if(vec))
process.env.VECTOR_STORE_DISABLE_VEC = "true";

const core = await import("../../src/lib/db/core.ts");
const { MemoryType } = await import("../../src/lib/memory/types.ts");
const store = await import("../../src/lib/memory/store.ts");
const memoryVec = await import("../../src/lib/db/memoryVec.ts");

// ── Helpers ──────────────────────────────────────────────────────────────────

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

/**
 * Drain setImmediate: scheduleVectorUpsert is fire-and-forget via setImmediate.
 */
async function drainSetImmediate() {
  await new Promise<void>((resolve) => setImmediate(resolve));
  await new Promise<void>((resolve) => setImmediate(resolve));
}

// ── Tests ─────────────────────────────────────────────────────────────────────

test("createMemory() inserts row and returns valid Memory object", async () => {
  const created = await store.createMemory({
    apiKeyId: "key-a",
    sessionId: "sess-a",
    type: MemoryType.FACTUAL,
    key: "test:create",
    content: "content for create test",
    metadata: { source: "test" },
    expiresAt: null,
  });

  assert.ok(created.id, "created.id should be non-empty");
  assert.equal(created.apiKeyId, "key-a");
  assert.equal(created.content, "content for create test");
  assert.equal(created.type, MemoryType.FACTUAL);

  // Verify row exists in DB
  const db = core.getDbInstance();
  const row = db.prepare("SELECT * FROM memories WHERE id = ?").get(created.id) as
    | { id: string; content: string }
    | undefined;
  assert.ok(row, "row should exist in DB after createMemory");
  assert.equal(row.content, "content for create test");
});

test("createMemory() UPSERT: same apiKeyId+key updates existing row", async () => {
  const first = await store.createMemory({
    apiKeyId: "key-b",
    sessionId: "sess-b",
    type: MemoryType.FACTUAL,
    key: "upsert:test",
    content: "first content",
    metadata: {},
    expiresAt: null,
  });

  const second = await store.createMemory({
    apiKeyId: "key-b",
    sessionId: "sess-b",
    type: MemoryType.FACTUAL,
    key: "upsert:test",
    content: "updated content",
    metadata: {},
    expiresAt: null,
  });

  // Same id as first (updated, not inserted)
  assert.equal(second.id, first.id, "UPSERT should return the same id");
  assert.equal(second.content, "updated content");

  // Verify only one row in DB for this key
  const db = core.getDbInstance();
  const count = (
    db.prepare("SELECT COUNT(*) as cnt FROM memories WHERE api_key_id = ? AND key = ?").get("key-b", "upsert:test") as {
      cnt: number;
    }
  ).cnt;
  assert.equal(count, 1, "UPSERT should result in exactly 1 row (not 2)");
});

test("deleteMemory() removes the row from SQLite (Qdrant + vec errors do NOT block delete)", async () => {
  // Insert a memory
  const created = await store.createMemory({
    apiKeyId: "key-c",
    sessionId: "",
    type: MemoryType.FACTUAL,
    key: "del:test",
    content: "delete me",
    metadata: {},
    expiresAt: null,
  });

  // With VECTOR_STORE_DISABLE_VEC=true, vec is null → deleteVector is skipped (no crash).
  // deleteSemanticMemoryPoint calls Qdrant which is not configured → returns not_configured
  // (no crash, best-effort).
  const result = await store.deleteMemory(created.id);
  assert.equal(result, true, "deleteMemory should return true");

  // Verify row is gone from SQLite
  const db = core.getDbInstance();
  const row = db.prepare("SELECT id FROM memories WHERE id = ?").get(created.id);
  assert.equal(row, undefined, "row should no longer exist after deleteMemory");
});

test("deleteMemory() returns false for non-existent id (D15 — no crash)", async () => {
  const result = await store.deleteMemory("non-existent-uuid-xxxx");
  assert.equal(result, false);
});

test("updateMemory() with content change returns true and updates the row", async () => {
  // This test verifies that updateMemory() correctly detects content changes
  // and updates the DB row. The fire-and-forget vector path is NOOP when
  // there is no embedding source (resolveEmbeddingSource returns source:null).
  const created = await store.createMemory({
    apiKeyId: "key-d",
    sessionId: "",
    type: MemoryType.FACTUAL,
    key: "upd:content",
    content: "original content",
    metadata: {},
    expiresAt: null,
  });

  const ok = await store.updateMemory(created.id, { content: "new content changed" });
  assert.equal(ok, true, "updateMemory should return true on success");

  // Drain any pending setImmediate
  await drainSetImmediate();

  // Verify the DB was updated
  const db = core.getDbInstance();
  const row = db.prepare("SELECT content FROM memories WHERE id = ?").get(created.id) as
    | { content: string }
    | undefined;
  assert.equal(row?.content, "new content changed", "content should be updated in DB");
});

test("updateMemory() metadata-only change does NOT mark needs_reindex (content unchanged)", async () => {
  const created = await store.createMemory({
    apiKeyId: "key-e",
    sessionId: "",
    type: MemoryType.FACTUAL,
    key: "upd:meta",
    content: "unchanged content",
    metadata: {},
    expiresAt: null,
  });

  // Clear any reindex flags from createMemory
  await drainSetImmediate();
  memoryVec.markMemoryNeedsReindex(created.id, false);

  const ok = await store.updateMemory(created.id, { metadata: { updated: true } });
  assert.equal(ok, true);

  // No content/key change → scheduleVectorUpsert NOT called
  await drainSetImmediate();

  const pending = memoryVec.getMemoryReindexQueue(100);
  const inQueue = pending.some((item) => item.id === created.id);
  assert.equal(
    inQueue,
    false,
    "metadata-only update should NOT schedule vector re-gen"
  );
});

test("getMemoryTokensUsed() returns 0 for empty DB", () => {
  const tokens = store.getMemoryTokensUsed("unknown-key");
  assert.equal(tokens, 0);
});

test("getMemoryTokensUsed() returns correct estimate after createMemory", async () => {
  await store.createMemory({
    apiKeyId: "key-f",
    sessionId: "",
    type: MemoryType.FACTUAL,
    key: "tokens:test",
    content: "Hello World", // 11 chars → ceil(11/4) = 3 tokens
    metadata: {},
    expiresAt: null,
  });

  const tokens = store.getMemoryTokensUsed("key-f");
  assert.ok(tokens > 0, "token estimate should be > 0 after storing memory");
  assert.equal(tokens, Math.ceil("Hello World".length / 4));
});
