/**
 * tests/unit/memory-vectorstore-int8-quant.test.ts
 *
 * F4.4 / Q2 — opt-in sqlite-vec int8 storage quantization.
 *   - When MEMORY_VEC_QUANTIZATION=int8, ensureReady stores an ":int8"-suffixed
 *     signature and creates the vec table with an int8[N] column (vectors stored
 *     via vec_quantize_int8 'unit').
 *   - Recall: int8 nearest-neighbor matches the exact float32 nearest-neighbor on
 *     a deterministic fixture (top-1 identical, top-3 overlap >= 2/3).
 *   - Switching mode (none -> int8) is a signature change → resetForSignature
 *     recreates the table and marks all memories needs_reindex.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-vecstore-int8-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const vsModule = await import("../../src/lib/memory/vectorStore.ts");
const { getVectorStore, _resetVectorStoreSingleton } = vsModule;

import type { EmbeddingResolution } from "../../src/lib/memory/embedding/types.ts";

const DIM = 8;

function makeResolution(): EmbeddingResolution {
  return {
    source: "remote",
    model: "test/dim8",
    dimensions: DIM,
    signature: `test:dim8:${DIM}`,
    reason: "test",
  };
}

function vec(values: number[]): Float32Array {
  return new Float32Array(values);
}

// Deterministic, well-separated unit-ish fixture (8 dims, 6 memories).
const FIXTURE: Array<{ id: string; v: number[] }> = [
  { id: "m0", v: [1, 0, 0, 0, 0, 0, 0, 0] },
  { id: "m1", v: [0, 1, 0, 0, 0, 0, 0, 0] },
  { id: "m2", v: [0, 0, 1, 0, 0, 0, 0, 0] },
  { id: "m3", v: [0.6, 0.8, 0, 0, 0, 0, 0, 0] },
  { id: "m4", v: [0, 0, 0, 1, 0, 0, 0, 0] },
  { id: "m5", v: [0, 0, 0, 0, 0.7071, 0.7071, 0, 0] },
];

function l2(a: number[], b: number[]): number {
  let s = 0;
  for (let i = 0; i < a.length; i++) s += (a[i] - b[i]) ** 2;
  return Math.sqrt(s);
}

function exactNearestIds(query: number[], k: number): string[] {
  return [...FIXTURE]
    .map((f) => ({ id: f.id, d: l2(f.v, query) }))
    .sort((a, b) => a.d - b.d)
    .slice(0, k)
    .map((x) => x.id);
}

function cleanup() {
  _resetVectorStoreSingleton();
  core.resetDbInstance();
  if (fs.existsSync(TEST_DATA_DIR)) fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.afterEach(() => {
  delete process.env.MEMORY_VEC_QUANTIZATION;
  cleanup();
});

test.after(() => {
  core.resetDbInstance();
  if (fs.existsSync(TEST_DATA_DIR)) fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
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

function insertMemory(db: ReturnType<typeof core.getDbInstance>, id: string) {
  db.prepare(
    `INSERT INTO memories (id, api_key_id, type, key, content, created_at)
     VALUES (?, 'key1', 'factual', ?, ?, datetime('now'))`,
  ).run(id, `key-${id}`, `content-${id}`);
}

async function seedFixture(store: NonNullable<ReturnType<typeof getVectorStore>>) {
  const db = core.getDbInstance();
  await store.ensureReady(makeResolution());
  for (const f of FIXTURE) {
    insertMemory(db, f.id);
    await store.upsertVector(f.id, vec(f.v));
  }
}

test("int8 mode: ensureReady stores an ':int8' signature", async (t) => {
  process.env.MEMORY_VEC_QUANTIZATION = "int8";
  const store = getStoreOrSkip(t);
  if (!store) return;

  await store.ensureReady(makeResolution());
  const stats = await store.stats();
  assert.ok(
    stats.signature?.endsWith(":int8"),
    `signature must carry the int8 marker, got ${stats.signature}`,
  );
});

test("int8 recall: nearest-neighbor matches exact float32 NN on the fixture", async (t) => {
  process.env.MEMORY_VEC_QUANTIZATION = "int8";
  const store = getStoreOrSkip(t);
  if (!store) return;

  await seedFixture(store);

  // Query close to m2 ([0,0,1,...]).
  const query = [0.05, 0.05, 0.95, 0, 0, 0, 0, 0];
  const hits = await store.searchVector(vec(query), 3);
  assert.ok(hits.length >= 1, "int8 search must return results");

  const exact = exactNearestIds(query, 3);
  assert.equal(hits[0].memoryId, exact[0], `top-1 must match exact NN (${exact[0]})`);

  const overlap = hits.slice(0, 3).filter((h) => exact.includes(h.memoryId)).length;
  assert.ok(overlap >= 2, `top-3 overlap must be >= 2/3 (got ${overlap}; int8=${hits
    .map((h) => h.memoryId)
    .join(",")} exact=${exact.join(",")})`);
});

test("switching none → int8 is a signature change that triggers reindex", async (t) => {
  const store = getStoreOrSkip(t);
  if (!store) return;

  // Start in float32 mode and seed.
  await seedFixture(store);
  const before = await store.stats();
  assert.ok(!before.signature?.endsWith(":int8"), "baseline should be float32 (no int8 marker)");

  // Flip to int8 and re-run ensureReady → recreate + mark all needs_reindex.
  process.env.MEMORY_VEC_QUANTIZATION = "int8";
  const res = await store.ensureReady(makeResolution());
  assert.match(res.reason, /recreated/i, "ensureReady must recreate the table on mode switch");

  const after = await store.stats();
  assert.ok(after.signature?.endsWith(":int8"), "signature must now carry the int8 marker");
  assert.equal(after.rowCount, 0, "table recreated empty (vectors await reindex)");
  assert.ok(after.needsReindex >= FIXTURE.length, "all memories must be marked needs_reindex");
});
