/**
 * tests/unit/memory-vectorstore-upsert-self-heal.test.ts
 *
 * Regression test: `upsertVector`/`deleteVector` must self-heal from a missing
 * `vec_memories` table instead of throwing "no such table: vec_memories".
 *
 * Live incident: `memory.vec.upsert.fail {"error":"no such table: vec_memories"}`
 * recurred repeatedly in production right after restarts, even though
 * `ensureReady()` is called immediately beforehand. Root cause: `ensureReady()`'s
 * signature-check-then-maybe-recreate logic (`resetForSignature` does
 * `DROP TABLE IF EXISTS` + `CREATE VIRTUAL TABLE`) is not synchronized against
 * a concurrent caller's `upsertVector`/`deleteVector` — a second in-flight
 * memory write that decides (from a stale read of `memory_vec_meta`) it also
 * needs to reset the table can drop it out from under another write's insert.
 * `store.ts`/`retrieval.ts`/`reindex.ts` also never check `ensureReady()`'s
 * `{ready: boolean}` return value before proceeding.
 *
 * Rather than chase the exact interleaving (every underlying SQLite call is
 * synchronous, so the race window is narrow and timing-dependent), this makes
 * the write path resilient to arriving after the table was dropped: on a
 * "no such table" error, recreate `vec_memories` from the last-known-good
 * `memory_vec_meta` dimension and retry once.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { mock } from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-vecstore-self-heal-"));
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

test("upsertVector: self-heals when vec_memories is missing after ensureReady already ran once", async (t) => {
  const store = getStoreOrSkip(t);
  if (!store) return;

  const db = core.getDbInstance();
  await store.ensureReady(makeResolution());
  insertMemory(db, "mem-a", "key1", "alpha");
  insertMemory(db, "mem-b", "key1", "beta");

  // Baseline: works normally.
  await store.upsertVector("mem-a", makeVec(1.0, 0.0, 0.0, 0.0));

  // Simulate a concurrent coroutine's resetForSignature() racing ahead and
  // dropping the table between this caller's own ensureReady() and its
  // upsertVector() — the exact live-incident interleaving.
  db.exec("DROP TABLE IF EXISTS vec_memories");
  assert.equal(
    db.prepare("SELECT name FROM sqlite_master WHERE name = 'vec_memories'").get(),
    undefined,
    "table must actually be gone for this test to be meaningful",
  );

  // Must NOT throw "no such table: vec_memories" — must self-heal and succeed.
  await store.upsertVector("mem-b", makeVec(0.0, 1.0, 0.0, 0.0));

  const cnt = db.prepare("SELECT COUNT(*) AS cnt FROM vec_memories").get() as { cnt: number };
  assert.equal(cnt.cnt, 1, "table was recreated fresh, so only the post-heal insert is present");
});

test("deleteVector: self-heals when vec_memories is missing (no throw)", async (t) => {
  const store = getStoreOrSkip(t);
  if (!store) return;

  const db = core.getDbInstance();
  await store.ensureReady(makeResolution());
  insertMemory(db, "mem-a", "key1", "alpha");
  await store.upsertVector("mem-a", makeVec(1.0, 0.0, 0.0, 0.0));

  db.exec("DROP TABLE IF EXISTS vec_memories");

  await assert.doesNotReject(
    () => store.deleteVector("mem-a"),
    "deleteVector must self-heal from a missing table, not throw",
  );
});

test("upsertVector: still throws a genuine unrelated error unchanged (no over-broad catch)", async (t) => {
  const store = getStoreOrSkip(t);
  if (!store) return;

  await store.ensureReady(makeResolution());

  // memoryId that was never inserted into `memories` — this is a real,
  // unrelated error path and must still surface exactly as before.
  await assert.rejects(
    () => store.upsertVector("nonexistent-id", makeVec(1.0, 0.0, 0.0, 0.0)),
    /memory not found/i,
    "unrelated errors must not be swallowed by the self-heal retry",
  );
});
