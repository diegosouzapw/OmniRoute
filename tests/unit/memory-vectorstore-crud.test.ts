/**
 * tests/unit/memory-vectorstore-crud.test.ts
 *
 * Plan 21 — Memory Engine Redesign (F4)
 * Tests for upsertVector / searchVector / deleteVector:
 *   - Insert 3 memories; upsertVector for each → COUNT=3.
 *   - searchVector(query_vec, topK=2) returns 2 results ordered by distance ASC.
 *   - searchVector with apiKeyId filters results.
 *   - deleteVector removes the entry; COUNT=2.
 *   - deleteVector for non-existent memoryId is no-op (no throw).
 *   - upsertVector for non-existent memoryId throws.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { mock } from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-vecstore-crud-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const vsModule = await import("../../src/lib/memory/vectorStore.ts");
const { getVectorStore, _resetVectorStoreSingleton } = vsModule;

import type { EmbeddingResolution } from "../../src/lib/memory/embedding/types.ts";

const DIM = 4;

function makeResolution(): EmbeddingResolution {
  return {
    source: "remote",
    model: "test/dim4",
    dimensions: DIM,
    signature: `test:dim4:${DIM}`,
    reason: "test",
  };
}

function makeVec(...values: number[]): Float32Array {
  return new Float32Array(values);
}

function cleanup() {
  mock.restoreAll();
  _resetVectorStoreSingleton();
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
  core.resetDbInstance();
  if (fs.existsSync(TEST_DATA_DIR)) {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  }
});

function getStoreOrSkip(t: { skip: (msg: string) => void }): ReturnType<typeof getVectorStore> {
  _resetVectorStoreSingleton();
  const store = getVectorStore();
  if (store === null) {
    t.skip("sqlite-vec not available in this environment — skipping");
    return null;
  }
  return store;
}

async function setupTable(store: NonNullable<ReturnType<typeof getVectorStore>>) {
  const res = makeResolution();
  await store.ensureReady(res);
}

function insertMemory(
  db: ReturnType<typeof core.getDbInstance>,
  id: string,
  apiKeyId: string,
  content: string,
) {
  db.prepare(
    `INSERT INTO memories (id, api_key_id, type, key, content, created_at)
     VALUES (?, ?, 'factual', ?, ?, datetime('now'))`,
  ).run(id, apiKeyId, `key-${id}`, content);
}

// ──────────────── upsertVector + COUNT ────────────────

test("upsertVector: inserts 3 vectors, vec_memories count = 3", async (t) => {
  const store = getStoreOrSkip(t);
  if (!store) return;

  const db = core.getDbInstance();
  await setupTable(store);

  insertMemory(db, "mem-a", "key1", "alpha");
  insertMemory(db, "mem-b", "key1", "beta");
  insertMemory(db, "mem-c", "key1", "gamma");

  await store.upsertVector("mem-a", makeVec(1.0, 0.0, 0.0, 0.0));
  await store.upsertVector("mem-b", makeVec(0.0, 1.0, 0.0, 0.0));
  await store.upsertVector("mem-c", makeVec(0.0, 0.0, 1.0, 0.0));

  const cnt = db.prepare("SELECT COUNT(*) AS cnt FROM vec_memories").get() as { cnt: number };
  assert.equal(cnt.cnt, 3, "should have 3 vectors after 3 upserts");
});

test("upsertVector: idempotent (re-insert same memory updates the vector)", async (t) => {
  const store = getStoreOrSkip(t);
  if (!store) return;

  const db = core.getDbInstance();
  await setupTable(store);

  insertMemory(db, "mem-a", "key1", "alpha");
  await store.upsertVector("mem-a", makeVec(1.0, 0.0, 0.0, 0.0));
  await store.upsertVector("mem-a", makeVec(0.5, 0.5, 0.0, 0.0)); // re-insert

  const cnt = db.prepare("SELECT COUNT(*) AS cnt FROM vec_memories").get() as { cnt: number };
  assert.equal(cnt.cnt, 1, "re-inserting same memory_id should not create duplicates");
});

test("upsertVector: throws when memoryId does not exist in memories table", async (t) => {
  const store = getStoreOrSkip(t);
  if (!store) return;

  await setupTable(store);

  await assert.rejects(
    () => store.upsertVector("nonexistent-id", makeVec(1.0, 0.0, 0.0, 0.0)),
    /memory not found/i,
    "should throw when memoryId not found",
  );
});

// ──────────────── searchVector ────────────────

test("searchVector: returns topK=2 results ordered by distance ASC", async (t) => {
  const store = getStoreOrSkip(t);
  if (!store) return;

  const db = core.getDbInstance();
  await setupTable(store);

  insertMemory(db, "mem-a", "key1", "alpha");
  insertMemory(db, "mem-b", "key1", "beta");
  insertMemory(db, "mem-c", "key1", "gamma");

  // Three vectors in different directions.
  await store.upsertVector("mem-a", makeVec(1.0, 0.0, 0.0, 0.0));
  await store.upsertVector("mem-b", makeVec(0.0, 1.0, 0.0, 0.0));
  await store.upsertVector("mem-c", makeVec(0.0, 0.0, 1.0, 0.0));

  // Query similar to mem-a.
  const query = makeVec(0.9, 0.1, 0.0, 0.0);
  const hits = await store.searchVector(query, 2);

  assert.equal(hits.length, 2, "should return topK=2 results");

  // All hits should have valid structure.
  for (const h of hits) {
    assert.ok(typeof h.memoryId === "string");
    assert.ok(typeof h.distance === "number");
    assert.ok(typeof h.score === "number");
  }

  // Results should be ordered by distance ASC.
  if (hits.length >= 2) {
    assert.ok(
      hits[0].distance <= hits[1].distance,
      "results must be ordered by distance ASC (smaller = more similar)",
    );
  }

  // mem-a should be closest to the query.
  assert.equal(hits[0].memoryId, "mem-a", "mem-a should be the closest hit");
});

test("searchVector: score = 1/(1+distance) is always in (0, 1]", async (t) => {
  const store = getStoreOrSkip(t);
  if (!store) return;

  const db = core.getDbInstance();
  await setupTable(store);

  insertMemory(db, "mem-a", "key1", "alpha");
  await store.upsertVector("mem-a", makeVec(1.0, 0.0, 0.0, 0.0));

  const hits = await store.searchVector(makeVec(1.0, 0.0, 0.0, 0.0), 5);
  assert.ok(hits.length >= 1);
  for (const h of hits) {
    assert.ok(h.score > 0 && h.score <= 1, `score ${h.score} must be in (0, 1]`);
  }
});

test("searchVector: apiKeyId filter restricts results to matching api_key_id", async (t) => {
  const store = getStoreOrSkip(t);
  if (!store) return;

  const db = core.getDbInstance();
  await setupTable(store);

  // Two memories with different api_key_id.
  insertMemory(db, "mem-key1", "key1", "key1 doc");
  insertMemory(db, "mem-key2", "key2", "key2 doc");

  await store.upsertVector("mem-key1", makeVec(1.0, 0.0, 0.0, 0.0));
  await store.upsertVector("mem-key2", makeVec(1.0, 0.0, 0.0, 0.0));

  // Without filter: both should match.
  const allHits = await store.searchVector(makeVec(1.0, 0.0, 0.0, 0.0), 10);
  assert.equal(allHits.length, 2, "without apiKeyId filter, both should be returned");

  // With filter for key1 only.
  const key1Hits = await store.searchVector(makeVec(1.0, 0.0, 0.0, 0.0), 10, "key1");
  assert.equal(key1Hits.length, 1, "with apiKeyId=key1, only key1 doc should be returned");
  assert.equal(key1Hits[0].memoryId, "mem-key1");

  // With filter for key2 only.
  const key2Hits = await store.searchVector(makeVec(1.0, 0.0, 0.0, 0.0), 10, "key2");
  assert.equal(key2Hits.length, 1, "with apiKeyId=key2, only key2 doc should be returned");
  assert.equal(key2Hits[0].memoryId, "mem-key2");
});

// ──────────────── deleteVector ────────────────

test("deleteVector: removes the vector from vec_memories", async (t) => {
  const store = getStoreOrSkip(t);
  if (!store) return;

  const db = core.getDbInstance();
  await setupTable(store);

  insertMemory(db, "mem-a", "key1", "alpha");
  insertMemory(db, "mem-b", "key1", "beta");

  await store.upsertVector("mem-a", makeVec(1.0, 0.0, 0.0, 0.0));
  await store.upsertVector("mem-b", makeVec(0.0, 1.0, 0.0, 0.0));

  const before = db.prepare("SELECT COUNT(*) AS cnt FROM vec_memories").get() as { cnt: number };
  assert.equal(before.cnt, 2);

  await store.deleteVector("mem-a");

  const after = db.prepare("SELECT COUNT(*) AS cnt FROM vec_memories").get() as { cnt: number };
  assert.equal(after.cnt, 1, "count should decrease to 1 after delete");
});

test("deleteVector: no-op when memoryId does not exist (no throw)", async (t) => {
  const store = getStoreOrSkip(t);
  if (!store) return;

  await setupTable(store);

  // Should not throw.
  await assert.doesNotReject(
    () => store.deleteVector("nonexistent-id"),
    "deleteVector for non-existent id must be a no-op (not throw)",
  );
});
