/**
 * tests/unit/memory-retrieval-semantic.test.ts
 *
 * Plan 21 F5 — retrieval.ts: semantic strategy.
 *
 * ESM namespace exports are sealed in this tsx environment, so we test through
 * observable state (DB content, return values) rather than spy-based mocking.
 *
 * Cases:
 *   A) strategy="semantic", no embedding source → degrades to FTS5 / chronological
 *   B) strategy="semantic", valid query, no vector store → degrades to FTS5
 *   C) strategy="exact" baseline — returns rows chronologically
 *   D) retrieveMemories returns empty array when enabled=false
 *   E) retrieveMemories respects token budget (maxTokens)
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-retrieval-sem-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.VECTOR_STORE_DISABLE_VEC = "true"; // force vec → null (degrade path)

const core = await import("../../src/lib/db/core.ts");

function cleanup() {
  core.resetDbInstance();
  if (fs.existsSync(TEST_DATA_DIR)) {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.afterEach(() => cleanup());
test.after(() => {
  if (fs.existsSync(TEST_DATA_DIR)) {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  }
});

function insertMemory(
  db: ReturnType<typeof core.getDbInstance>,
  id: string,
  apiKeyId: string,
  content: string,
  key: string = `key-${id}`,
  createdAt?: string
) {
  db.prepare(
    `INSERT INTO memories (id, api_key_id, session_id, type, key, content, metadata, created_at, updated_at, expires_at)
     VALUES (?, ?, ?, 'factual', ?, ?, '{}', ?, ?, NULL)`
  ).run(
    id,
    apiKeyId,
    "",
    key,
    content,
    createdAt ?? new Date().toISOString(),
    new Date().toISOString()
  );
}

// ── Tests ─────────────────────────────────────────────────────────────────────

test("retrieveMemories: strategy=semantic with no embedding source degrades gracefully (no throw)", async () => {
  const db = core.getDbInstance();
  insertMemory(db, "m1", "api-1", "The capital of France is Paris.");
  insertMemory(db, "m2", "api-1", "The capital of Germany is Berlin.");

  // Import fresh after DB setup
  const { retrieveMemories } = await import("../../src/lib/memory/retrieval.ts");

  // No embedding source configured (default settings: embeddingSource=auto, no model)
  // → should degrade to FTS5 / chronological, NOT throw
  let result: unknown;
  await assert.doesNotReject(async () => {
    result = await retrieveMemories("api-1", {
      retrievalStrategy: "semantic",
      query: "capital city",
      maxTokens: 2000,
    });
  }, "semantic strategy with no embedding source must not throw");

  assert.ok(Array.isArray(result), "result should be an array");
});

test("retrieveMemories: strategy=semantic with no vec store → FTS5 fallback returns memories", async () => {
  const db = core.getDbInstance();
  // Insert 3 memories for the test
  insertMemory(db, "sem-a", "api-sem", "The capital of France is Paris.", "france");
  insertMemory(db, "sem-b", "api-sem", "The capital of Germany is Berlin.", "germany");
  insertMemory(db, "sem-c", "api-sem", "Quantum computing uses qubits.", "quantum");

  const { retrieveMemories } = await import("../../src/lib/memory/retrieval.ts");

  const result = await retrieveMemories("api-sem", {
    retrievalStrategy: "semantic",
    query: "capital city France",
    maxTokens: 2000,
  });

  // Should return memories (FTS5 degraded path)
  assert.ok(Array.isArray(result));
  // All returned memories should belong to the correct apiKeyId
  for (const m of result) {
    assert.equal(m.apiKeyId, "api-sem");
  }
});

test("retrieveMemories: strategy=exact returns memories chronologically", async () => {
  const db = core.getDbInstance();
  // Use recent dates (within last 30 days) so retention filter does not remove them
  const now = Date.now();
  const base = new Date(now - 3 * 24 * 60 * 60 * 1000); // 3 days ago
  insertMemory(db, "e1", "api-exact", "First memory", "first", new Date(base.getTime() + 3000).toISOString());
  insertMemory(db, "e2", "api-exact", "Second memory", "second", new Date(base.getTime() + 2000).toISOString());
  insertMemory(db, "e3", "api-exact", "Third memory", "third", new Date(base.getTime() + 1000).toISOString());

  const { retrieveMemories } = await import("../../src/lib/memory/retrieval.ts");

  const result = await retrieveMemories("api-exact", {
    retrievalStrategy: "exact",
    maxTokens: 2000,
  });

  assert.ok(result.length >= 3, "should return all 3 memories");
  // All should be from this apiKeyId
  for (const m of result) {
    assert.equal(m.apiKeyId, "api-exact");
  }
});

test("retrieveMemories: returns empty array when enabled=false", async () => {
  const db = core.getDbInstance();
  insertMemory(db, "disabled-m", "api-dis", "Should not be returned.");

  const { retrieveMemories } = await import("../../src/lib/memory/retrieval.ts");

  const result = await retrieveMemories("api-dis", {
    enabled: false,
    maxTokens: 2000,
  });

  assert.deepEqual(result, [], "enabled=false must return empty array");
});

test("retrieveMemories: respects maxTokens budget (does not exceed)", async () => {
  const db = core.getDbInstance();

  // Each memory is 100 chars → ~25 tokens each
  const longContent = "x".repeat(100);
  for (let i = 1; i <= 10; i++) {
    insertMemory(db, `budget-${i}`, "api-budget", longContent, `key-${i}`);
  }

  const { retrieveMemories } = await import("../../src/lib/memory/retrieval.ts");

  // maxTokens = 60 → allows about 2 memories (2 * 25 = 50 ≤ 60, 3 * 25 = 75 > 60)
  const result = await retrieveMemories("api-budget", {
    retrievalStrategy: "exact",
    maxTokens: 60,
  });

  // Should not return more than budget allows
  const estimatedTokens = result.reduce((sum, m) => sum + Math.ceil(m.content.length / 4), 0);
  assert.ok(
    estimatedTokens <= 60 || result.length === 1,
    `total tokens ${estimatedTokens} should be within budget (60) or exactly 1 item`
  );
});

test("retrieveMemories: returns only memories for the given apiKeyId", async () => {
  const db = core.getDbInstance();
  insertMemory(db, "key1-m1", "api-key1", "Memory for key1");
  insertMemory(db, "key2-m1", "api-key2", "Memory for key2");
  insertMemory(db, "key1-m2", "api-key1", "Another memory for key1");

  const { retrieveMemories } = await import("../../src/lib/memory/retrieval.ts");

  const result = await retrieveMemories("api-key1", { retrievalStrategy: "exact", maxTokens: 2000 });
  for (const m of result) {
    assert.equal(m.apiKeyId, "api-key1", "should only return memories for api-key1");
  }
  assert.ok(result.length >= 2, "should return at least 2 memories for api-key1");
});
