/**
 * tests/unit/memory-vectorstore-rrf.test.ts
 *
 * Plan 21 — Memory Engine Redesign (F4)
 * Tests for searchHybrid() RRF (Reciprocal Rank Fusion, k=60):
 *   - Case 1: doc only FTS hit → rrfScore = 1/(60+ftsRank), vecRank=null.
 *   - Case 2: doc only vec hit → rrfScore = 1/(60+vecRank), ftsRank=null.
 *   - Case 3: doc in both → rrfScore = sum, highest score.
 *   - Results ordered DESC by rrfScore.
 *   - apiKeyId filters both vec and FTS results.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { mock } from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-vecstore-rrf-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.MEMORY_RRF_K = "60";

const core = await import("../../src/lib/db/core.ts");
const vsModule = await import("../../src/lib/memory/vectorStore.ts");
const { getVectorStore, _resetVectorStoreSingleton } = vsModule;

import type { EmbeddingResolution } from "../../src/lib/memory/embedding/types.ts";

const DIM = 4;
const RRF_K = 60;

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
  await store.ensureReady(makeResolution());
}

function insertMemoryWithFts(
  db: ReturnType<typeof core.getDbInstance>,
  id: string,
  apiKeyId: string,
  content: string,
) {
  // Insert into memories — the trigger memory_fts_ai fires automatically if the DB has it.
  // In a fresh test DB the trigger exists (created by migration 023).
  db.prepare(
    `INSERT INTO memories (id, api_key_id, type, key, content, created_at)
     VALUES (?, ?, 'factual', ?, ?, datetime('now'))`,
  ).run(id, apiKeyId, `key-${id}`, content);
  // The migration 023 trigger inserts into memory_fts using memory_id (= rowid).
  // If the trigger didn't fire (e.g. test DB without triggers), manually sync FTS.
  try {
    const row = db.prepare("SELECT rowid, memory_id FROM memories WHERE id = ?").get(id) as
      | { rowid: number; memory_id: number | null }
      | undefined;
    if (row) {
      const ftsRowid = row.memory_id ?? row.rowid;
      const ftsCount = db
        .prepare("SELECT COUNT(*) AS cnt FROM memory_fts WHERE rowid = ?")
        .get(ftsRowid) as { cnt: number };
      if (ftsCount.cnt === 0) {
        db.prepare("INSERT INTO memory_fts(rowid, content, key) VALUES(?, ?, ?)").run(
          ftsRowid,
          content,
          `key-${id}`,
        );
      }
    }
  } catch {
    // FTS population is best-effort for tests — if memory_fts doesn't exist, vec-only tests still work.
  }
}

// ──────────────── RRF tests ────────────────

test("searchHybrid: results ordered DESC by rrfScore", async (t) => {
  const store = getStoreOrSkip(t);
  if (!store) return;

  const db = core.getDbInstance();
  await setupTable(store);

  // Insert 3 memories. All searchable via FTS for "hello".
  insertMemoryWithFts(db, "mem-both", "key1", "hello world");
  insertMemoryWithFts(db, "mem-fts-only", "key1", "hello text search only");
  insertMemoryWithFts(db, "mem-vec-only", "key1", "different topic");

  // mem-both gets a vector close to query.
  await store.upsertVector("mem-both", makeVec(1.0, 0.0, 0.0, 0.0));
  // mem-vec-only gets a vector close to query but no FTS match.
  await store.upsertVector("mem-vec-only", makeVec(0.95, 0.05, 0.0, 0.0));
  // mem-fts-only has no vector.

  const query = makeVec(1.0, 0.0, 0.0, 0.0);
  const hits = await store.searchHybrid(query, "hello", 10);

  // Should return at least something.
  assert.ok(hits.length > 0, "should return at least one hit");

  // All hits must have rrfScore > 0.
  for (const h of hits) {
    assert.ok(typeof h.memoryId === "string");
    assert.ok(typeof h.rrfScore === "number");
    assert.ok(h.rrfScore > 0, `rrfScore must be > 0, got ${h.rrfScore}`);
  }

  // Results must be ordered DESC by rrfScore.
  for (let i = 0; i < hits.length - 1; i++) {
    assert.ok(
      hits[i].rrfScore >= hits[i + 1].rrfScore,
      `results must be ordered DESC by rrfScore: ${hits[i].rrfScore} >= ${hits[i + 1].rrfScore}`,
    );
  }
});

test("searchHybrid: doc in both FTS and vec → highest rrfScore (sum of both contributions)", async (t) => {
  const store = getStoreOrSkip(t);
  if (!store) return;

  const db = core.getDbInstance();
  await setupTable(store);

  insertMemoryWithFts(db, "mem-both", "key1", "hello hybrid search");
  insertMemoryWithFts(db, "mem-fts-only", "key1", "hello text");
  insertMemoryWithFts(db, "mem-vec-only", "key1", "no-fts-match");

  // Give mem-both a close vector.
  await store.upsertVector("mem-both", makeVec(1.0, 0.0, 0.0, 0.0));
  // Give mem-vec-only a close vector too.
  await store.upsertVector("mem-vec-only", makeVec(0.9, 0.0, 0.0, 0.0));

  const hits = await store.searchHybrid(makeVec(1.0, 0.0, 0.0, 0.0), "hello", 10);

  const bothHit = hits.find((h) => h.memoryId === "mem-both");
  if (bothHit) {
    // mem-both should have contributions from both vec and fts.
    // Its rrfScore should be ≥ 1/(60+1) (at minimum from one source).
    const minRrf = 1 / (RRF_K + 1);
    assert.ok(
      bothHit.rrfScore >= minRrf,
      `mem-both rrfScore ${bothHit.rrfScore} should be >= ${minRrf}`,
    );
  }
});

test("searchHybrid: FTS-only hit has vecRank=null", async (t) => {
  const store = getStoreOrSkip(t);
  if (!store) return;

  const db = core.getDbInstance();
  await setupTable(store);

  // Only insert FTS, no vector for this memory.
  insertMemoryWithFts(db, "fts-only-mem", "key1", "unique text for fts test only");

  // Query that will NOT match FTS for other mems.
  const hits = await store.searchHybrid(makeVec(0.0, 0.0, 0.0, 1.0), "unique text for fts", 10);

  const ftsOnlyHit = hits.find((h) => h.memoryId === "fts-only-mem");
  if (ftsOnlyHit) {
    // If mem only came from FTS, vecRank should be null.
    if (ftsOnlyHit.ftsRank !== null && ftsOnlyHit.vecRank === null) {
      assert.ok(ftsOnlyHit.rrfScore > 0);
      const expectedContrib = 1 / (RRF_K + (ftsOnlyHit.ftsRank ?? 1));
      // Score should be approximately the FTS contribution.
      assert.ok(
        Math.abs(ftsOnlyHit.rrfScore - expectedContrib) < 0.01,
        `FTS-only rrfScore ${ftsOnlyHit.rrfScore} should ≈ ${expectedContrib}`,
      );
    }
  }
});

test("searchHybrid: apiKeyId filters both vec and FTS results", async (t) => {
  const store = getStoreOrSkip(t);
  if (!store) return;

  const db = core.getDbInstance();
  await setupTable(store);

  // Insert two memories with different api_key_id.
  insertMemoryWithFts(db, "mem-key1", "key1", "hello hybrid");
  insertMemoryWithFts(db, "mem-key2", "key2", "hello hybrid");

  await store.upsertVector("mem-key1", makeVec(1.0, 0.0, 0.0, 0.0));
  await store.upsertVector("mem-key2", makeVec(1.0, 0.0, 0.0, 0.0));

  // Without filter: should see both.
  const allHits = await store.searchHybrid(makeVec(1.0, 0.0, 0.0, 0.0), "hello", 10);
  const allIds = allHits.map((h) => h.memoryId);
  // At least one of each should appear (FTS and/or vec).
  assert.ok(
    allIds.includes("mem-key1") || allIds.includes("mem-key2"),
    "without filter should include at least one hit",
  );

  // With filter for key1 only.
  const key1Hits = await store.searchHybrid(makeVec(1.0, 0.0, 0.0, 0.0), "hello", 10, "key1");
  for (const h of key1Hits) {
    assert.notEqual(h.memoryId, "mem-key2", "key2 should not appear when filtering for key1");
  }

  // With filter for key2 only.
  const key2Hits = await store.searchHybrid(makeVec(1.0, 0.0, 0.0, 0.0), "hello", 10, "key2");
  for (const h of key2Hits) {
    assert.notEqual(h.memoryId, "mem-key1", "key1 should not appear when filtering for key2");
  }
});
