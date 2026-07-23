/**
 * tests/unit/memory-summarization-older-than.test.ts
 *
 * Plan 21 F5 — summarization.ts: summarizeMemoriesOlderThan (D19).
 *
 * Cases:
 *   A) dryRun=true: returns candidates + totalTokens, deletedCount=0, summaryId=null
 *   B) dryRun=false: creates summary memory, deletes candidates, returns correct counts
 *   C) candidates=[] (no old memories): returns empty result, no crash
 *   D) result.dryRun mirrors the input flag
 *   E) summary memory content includes count of summarized memories
 *   F) apiKeyId=undefined → scopes to ALL memories
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-summarize-older-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.VECTOR_STORE_DISABLE_VEC = "true";

const core = await import("../../src/lib/db/core.ts");
const { summarizeMemoriesOlderThan } = await import("../../src/lib/memory/summarization.ts");

function cleanup() {
  core.resetDbInstance();
  if (fs.existsSync(TEST_DATA_DIR)) {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

/**
 * Drain setImmediate callbacks. createMemory / deleteMemory schedule
 * fire-and-forget vector operations via setImmediate. These must drain
 * before the test DB is destroyed, or the Node.js test runner reports
 * "asynchronous activity after the test ended".
 */
async function drainSetImmediate() {
  await new Promise<void>((resolve) => setImmediate(resolve));
  await new Promise<void>((resolve) => setImmediate(resolve));
  await new Promise<void>((resolve) => setImmediate(resolve));
}

test.afterEach(async () => {
  // Drain any pending fire-and-forget setImmediate callbacks before cleanup
  await drainSetImmediate();
  cleanup();
});
test.after(() => {
  if (fs.existsSync(TEST_DATA_DIR)) {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  }
});

function insertOldMemory(
  db: ReturnType<typeof core.getDbInstance>,
  id: string,
  apiKeyId: string,
  content: string,
  daysAgo: number
) {
  const createdAt = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString();
  db.prepare(
    `INSERT INTO memories (id, api_key_id, session_id, type, key, content, metadata, created_at, updated_at, expires_at)
     VALUES (?, ?, ?, 'factual', ?, ?, '{}', ?, ?, NULL)`
  ).run(id, apiKeyId, "", `key-${id}`, content, createdAt, createdAt);
}

// ── Tests ─────────────────────────────────────────────────────────────────────

test("summarizeMemoriesOlderThan: dryRun=true returns candidates without touching DB", async () => {
  const db = core.getDbInstance();
  // Insert 5 memories older than 30 days
  for (let i = 1; i <= 5; i++) {
    insertOldMemory(db, `dry-${i}`, "api-dry", `Old memory number ${i} with some content.`, 35);
  }

  const result = await summarizeMemoriesOlderThan("api-dry", 30, true);

  assert.equal(result.dryRun, true, "dryRun flag must be preserved");
  assert.equal(result.deletedCount, 0, "dryRun=true must not delete any memories");
  assert.equal(result.summaryId, null, "dryRun=true must not create a summary");
  assert.equal(result.candidates.length, 5, "should find 5 candidates older than 30 days");
  assert.ok(result.totalTokens > 0, "totalTokens must be > 0 for non-empty candidates");

  // Verify DB was not modified
  const count = (
    db.prepare("SELECT COUNT(*) as cnt FROM memories WHERE api_key_id = ?").get("api-dry") as {
      cnt: number;
    }
  ).cnt;
  assert.equal(count, 5, "dryRun=true must leave all 5 memories in the DB");
});

test("summarizeMemoriesOlderThan: dryRun=false creates summary and deletes candidates", async () => {
  const db = core.getDbInstance();
  // Insert 5 memories older than 30 days
  for (let i = 1; i <= 5; i++) {
    insertOldMemory(db, `del-${i}`, "api-del", `Content of old memory ${i}.`, 40);
  }

  const result = await summarizeMemoriesOlderThan("api-del", 30, false);

  assert.equal(result.dryRun, false, "dryRun flag must be false");
  assert.equal(result.candidates.length, 5, "should identify 5 candidates");
  assert.equal(result.deletedCount, 5, "all 5 candidates must be deleted");
  assert.ok(result.summaryId !== null, "summaryId must be non-null after real run");
  assert.equal(typeof result.summaryId, "string", "summaryId must be a string UUID");

  // Verify originals are gone but summary exists
  const originals = db.prepare("SELECT id FROM memories WHERE id LIKE 'del-%'").all();
  assert.equal(originals.length, 0, "original 5 memories must be deleted");

  const summary = db
    .prepare("SELECT id, content, type FROM memories WHERE id = ?")
    .get(result.summaryId) as { id: string; content: string; type: string } | undefined;
  assert.ok(summary, "summary memory must exist in DB");
  assert.equal(summary.type, "semantic", "summary memory must have type='semantic'");
  assert.ok(
    summary.content.includes("5"),
    "summary content should mention the count of summarized memories"
  );
});

test("summarizeMemoriesOlderThan: no candidates → returns empty result without crash", async () => {
  core.getDbInstance(); // trigger migrations

  // Insert memories from today (NOT older than 30 days)
  const db = core.getDbInstance();
  db.prepare(
    `INSERT INTO memories (id, api_key_id, session_id, type, key, content, metadata, created_at, updated_at, expires_at)
     VALUES (?, ?, ?, 'factual', ?, ?, '{}', datetime('now'), datetime('now'), NULL)`
  ).run("recent-1", "api-recent", "", "recent-key", "Recent memory content.");

  const result = await summarizeMemoriesOlderThan("api-recent", 30, false);

  assert.equal(result.candidates.length, 0, "should find 0 candidates (memory is recent)");
  assert.equal(result.deletedCount, 0, "no deletions expected");
  assert.equal(result.summaryId, null, "no summary created when no candidates");
  assert.equal(result.dryRun, true, "empty candidates forces dryRun=true path");
});

test("summarizeMemoriesOlderThan: only older-than-N-days memories are candidates", async () => {
  const db = core.getDbInstance();
  // 3 old memories (35 days ago) + 2 recent memories (1 day ago)
  for (let i = 1; i <= 3; i++) {
    insertOldMemory(db, `old-${i}`, "api-mixed", `Old content ${i}.`, 35);
  }
  for (let i = 1; i <= 2; i++) {
    insertOldMemory(db, `new-${i}`, "api-mixed", `New content ${i}.`, 1);
  }

  const result = await summarizeMemoriesOlderThan("api-mixed", 30, true);

  assert.equal(result.candidates.length, 3, "should find only 3 old memories as candidates");
  const candidateIds = result.candidates.map((m) => m.id);
  for (const id of candidateIds) {
    assert.ok(id.startsWith("old-"), `candidate ${id} must be an old memory`);
  }
});

test("summarizeMemoriesOlderThan: totalTokens equals sum of candidates' content tokens", async () => {
  const db = core.getDbInstance();
  insertOldMemory(db, "tok-a", "api-tok", "Hello world content.", 40);
  insertOldMemory(db, "tok-b", "api-tok", "Another content here.", 40);

  const result = await summarizeMemoriesOlderThan("api-tok", 30, true);

  const expectedTokens = result.candidates.reduce(
    (sum, m) => sum + Math.ceil(m.content.length / 4),
    0
  );
  assert.equal(result.totalTokens, expectedTokens, "totalTokens must equal sum of candidate tokens");
});

test("summarizeMemoriesOlderThan: apiKeyId=undefined scopes to ALL memories", async () => {
  const db = core.getDbInstance();
  insertOldMemory(db, "all-1", "api-x", "Memory from api-x.", 40);
  insertOldMemory(db, "all-2", "api-y", "Memory from api-y.", 40);

  const result = await summarizeMemoriesOlderThan(undefined, 30, true);

  // Should include memories from both api keys
  assert.ok(result.candidates.length >= 2, "undefined apiKeyId should scope to all memories");
});
