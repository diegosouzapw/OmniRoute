/**
 * tests/unit/memory-vec-meta.test.ts
 *
 * Plan 21 — Memory Engine Redesign (F2)
 * Tests for getMemoryVecMeta / setMemoryVecMeta and migration idempotency.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-memory-vec-meta-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const memoryVec = await import("../../src/lib/db/memoryVec.ts");

async function resetStorage() {
  core.resetDbInstance();

  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch (error: unknown) {
      const code = (error as NodeJS.ErrnoException)?.code;
      if ((code === "EBUSY" || code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw error;
      }
    }
  }

  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// ──────────────── getMemoryVecMeta initial state ────────────────

test("getMemoryVecMeta() returns safe defaults when sentinel row is missing", () => {
  // Simulate the edge case where the row was deleted (e.g. manual DB manipulation)
  const db = core.getDbInstance();
  db.prepare("DELETE FROM memory_vec_meta WHERE id = 1").run();

  const meta = memoryVec.getMemoryVecMeta();

  assert.equal(meta.activeDim, null);
  assert.equal(meta.embeddingSignature, null);
  assert.equal(meta.lastResetAt, null);
  assert.equal(meta.vecLoaded, false);
});

test("getMemoryVecMeta() returns expected defaults on a fresh DB", () => {
  // getDbInstance() triggers migrations including 073_memory_vec.sql
  const db = core.getDbInstance();
  assert.ok(db, "DB instance should be created");

  const meta = memoryVec.getMemoryVecMeta();

  assert.equal(meta.activeDim, null, "activeDim should be null initially");
  assert.equal(meta.embeddingSignature, null, "embeddingSignature should be null initially");
  assert.equal(meta.lastResetAt, null, "lastResetAt should be null initially");
  assert.equal(meta.vecLoaded, false, "vecLoaded should be false initially");
});

// ──────────────── setMemoryVecMeta + getMemoryVecMeta round-trip ────────────────

test("setMemoryVecMeta persists activeDim and embeddingSignature", () => {
  core.getDbInstance(); // ensure migrations run

  memoryVec.setMemoryVecMeta({
    activeDim: 1536,
    embeddingSignature: "remote:openai/text-embedding-3-small:1536",
  });

  const meta = memoryVec.getMemoryVecMeta();

  assert.equal(meta.activeDim, 1536);
  assert.equal(meta.embeddingSignature, "remote:openai/text-embedding-3-small:1536");
  assert.equal(meta.lastResetAt, null); // not set
  assert.equal(meta.vecLoaded, false);  // not set
});

test("setMemoryVecMeta persists vecLoaded = true", () => {
  core.getDbInstance();

  memoryVec.setMemoryVecMeta({ vecLoaded: true });

  const meta = memoryVec.getMemoryVecMeta();
  assert.equal(meta.vecLoaded, true);
});

test("setMemoryVecMeta updates only the provided fields (partial update)", () => {
  core.getDbInstance();

  // First set all fields
  memoryVec.setMemoryVecMeta({
    activeDim: 768,
    embeddingSignature: "static:potion-base-8M:768",
    vecLoaded: true,
  });

  // Then update only activeDim
  memoryVec.setMemoryVecMeta({ activeDim: 1536 });

  const meta = memoryVec.getMemoryVecMeta();
  assert.equal(meta.activeDim, 1536, "activeDim should be updated");
  assert.equal(meta.embeddingSignature, "static:potion-base-8M:768", "embeddingSignature should be preserved");
  assert.equal(meta.vecLoaded, true, "vecLoaded should be preserved");
});

test("setMemoryVecMeta sets lastResetAt correctly", () => {
  core.getDbInstance();

  const now = new Date().toISOString();
  memoryVec.setMemoryVecMeta({ lastResetAt: now });

  const meta = memoryVec.getMemoryVecMeta();
  assert.equal(meta.lastResetAt, now);
});

// ──────────────── Migration idempotency ────────────────

test("migration 073 does not duplicate memory_vec_meta sentinel row on second run", () => {
  // The first getDbInstance() runs all migrations including 073
  const db = core.getDbInstance();

  // Run migration SQL a second time manually to simulate re-run
  // The runner would normally catch "duplicate column name" and skip,
  // but here we test CREATE TABLE IF NOT EXISTS + INSERT OR IGNORE
  db.exec(`
    CREATE TABLE IF NOT EXISTS memory_vec_meta (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      active_dim INTEGER,
      embedding_signature TEXT,
      last_reset_at TEXT,
      vec_loaded INTEGER NOT NULL DEFAULT 0
    );
    INSERT OR IGNORE INTO memory_vec_meta (id, active_dim, embedding_signature, last_reset_at, vec_loaded)
    VALUES (1, NULL, NULL, NULL, 0);
  `);

  // Count should still be exactly 1
  const row = db.prepare("SELECT COUNT(*) AS cnt FROM memory_vec_meta").get() as { cnt: number };
  assert.equal(row.cnt, 1, "migration re-run must not duplicate the sentinel row");
});

test("migration 073 creates needs_reindex column in memories table", () => {
  const db = core.getDbInstance();

  const columns = db.prepare("PRAGMA table_info(memories)").all() as Array<{ name: string }>;
  const colNames = columns.map((col) => col.name);

  assert.ok(
    colNames.includes("needs_reindex"),
    "memories table must have needs_reindex column after migration 073"
  );
});
