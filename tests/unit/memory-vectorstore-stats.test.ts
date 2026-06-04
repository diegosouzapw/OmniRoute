/**
 * tests/unit/memory-vectorstore-stats.test.ts
 *
 * Plan 21 — Memory Engine Redesign (F4)
 * Tests for VectorStore.stats():
 *   - rowCount reflects actual vec_memories count.
 *   - needsReindex reflects memories.needs_reindex=1 count.
 *   - activeDim and signature reflect memory_vec_meta.
 *   - stats() returns zeros when vec_memories does not exist yet.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { mock } from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-vecstore-stats-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const { markAllMemoriesNeedReindex } = await import("../../src/lib/db/memoryVec.ts");
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

function insertMemory(
  db: ReturnType<typeof core.getDbInstance>,
  id: string,
) {
  db.prepare(
    `INSERT INTO memories (id, api_key_id, type, key, content, created_at)
     VALUES (?, 'key1', 'factual', ?, ?, datetime('now'))`,
  ).run(id, `key-${id}`, `content-${id}`);
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

// ──────────────── stats() ────────────────

test("stats(): rowCount=0 and activeDim=null before ensureReady", async (t) => {
  const store = getStoreOrSkip(t);
  if (!store) return;

  const result = await store.stats();

  assert.equal(result.rowCount, 0, "rowCount must be 0 when table doesn't exist yet");
  assert.equal(result.needsReindex, 0, "needsReindex must be 0 initially");
  assert.equal(result.activeDim, null, "activeDim must be null before ensureReady");
  assert.equal(result.signature, null, "signature must be null before ensureReady");
});

test("stats(): rowCount reflects actual vector count after upserts", async (t) => {
  const store = getStoreOrSkip(t);
  if (!store) return;

  const db = core.getDbInstance();
  await store.ensureReady(makeResolution());

  insertMemory(db, "m1");
  insertMemory(db, "m2");
  insertMemory(db, "m3");

  await store.upsertVector("m1", makeVec(1.0, 0.0, 0.0, 0.0));
  await store.upsertVector("m2", makeVec(0.0, 1.0, 0.0, 0.0));
  await store.upsertVector("m3", makeVec(0.0, 0.0, 1.0, 0.0));

  const result = await store.stats();
  assert.equal(result.rowCount, 3, "rowCount must equal number of inserted vectors");
});

test("stats(): needsReindex reflects memories marked for reindex", async (t) => {
  const store = getStoreOrSkip(t);
  if (!store) return;

  const db = core.getDbInstance();
  await store.ensureReady(makeResolution());

  // Insert 5 memories.
  for (let i = 0; i < 5; i++) {
    insertMemory(db, `m${i}`);
  }

  // Mark all as needing reindex.
  const affected = markAllMemoriesNeedReindex();
  assert.equal(affected, 5, "should mark 5 memories as needing reindex");

  const result = await store.stats();
  assert.equal(result.needsReindex, 5, "needsReindex must reflect 5 memories with needs_reindex=1");
});

test("stats(): activeDim and signature reflect meta after ensureReady", async (t) => {
  const store = getStoreOrSkip(t);
  if (!store) return;

  const sig = `test:dim4:${DIM}`;
  await store.ensureReady(makeResolution());

  const result = await store.stats();

  assert.equal(result.activeDim, DIM, "activeDim must match the dimension passed to ensureReady");
  assert.equal(result.signature, sig, "signature must match the resolution signature");
});

test("stats(): needsReindex decreases as vectors are inserted (marking reindex=0)", async (t) => {
  const store = getStoreOrSkip(t);
  if (!store) return;

  const db = core.getDbInstance();
  await store.ensureReady(makeResolution());

  insertMemory(db, "m1");
  insertMemory(db, "m2");

  // Mark all as pending.
  markAllMemoriesNeedReindex();

  const before = await store.stats();
  assert.equal(before.needsReindex, 2);

  // Clear needs_reindex for m1 manually (simulating successful reindex).
  db.prepare("UPDATE memories SET needs_reindex = 0 WHERE id = 'm1'").run();

  const after = await store.stats();
  assert.equal(after.needsReindex, 1, "needsReindex should decrease when a memory is cleared");
});

test("stats(): rowCount decreases after deleteVector", async (t) => {
  const store = getStoreOrSkip(t);
  if (!store) return;

  const db = core.getDbInstance();
  await store.ensureReady(makeResolution());

  insertMemory(db, "m1");
  insertMemory(db, "m2");

  await store.upsertVector("m1", makeVec(1.0, 0.0, 0.0, 0.0));
  await store.upsertVector("m2", makeVec(0.0, 1.0, 0.0, 0.0));

  const before = await store.stats();
  assert.equal(before.rowCount, 2);

  await store.deleteVector("m1");

  const after = await store.stats();
  assert.equal(after.rowCount, 1, "rowCount should decrease after deleteVector");
});
