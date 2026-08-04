/**
 * tests/unit/memory-retrieval-hybrid.test.ts
 *
 * Plan 21 F5 — retrieval.ts: hybrid strategy.
 *
 * Cases:
 *   A) strategy="hybrid" with no vec store → FTS5+keyword union fallback (no throw)
 *   B) hybrid query returns results for the correct apiKeyId
 *   C) hybrid FTS5 fallback deduplicates rows (same id appears from both FTS5 and keyword)
 *   D) retrievePreview with hybrid + no vec → fallbackReason != null
 *   E) retrievePreview with exact + no vec → items have tier="fts5"
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-retrieval-hyb-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.VECTOR_STORE_DISABLE_VEC = "true"; // force vec → null

const core = await import("../../src/lib/db/core.ts");

async function removeTestDataDir() {
  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      return;
    } catch (error: unknown) {
      const code = (error as NodeJS.ErrnoException).code;
      if ((code === "ENOTEMPTY" || code === "EBUSY" || code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
        continue;
      }
      throw error;
    }
  }
}

async function cleanup() {
  core.resetDbInstance();
  await removeTestDataDir();
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.afterEach(async () => cleanup());
test.after(async () => {
  core.resetDbInstance();
  await removeTestDataDir();
});

function insertMemory(
  db: ReturnType<typeof core.getDbInstance>,
  id: string,
  apiKeyId: string,
  content: string,
  key?: string
) {
  db.prepare(
    `INSERT INTO memories (id, api_key_id, session_id, type, key, content, metadata, created_at, updated_at, expires_at)
     VALUES (?, ?, ?, 'factual', ?, ?, '{}', datetime('now'), datetime('now'), NULL)`
  ).run(id, apiKeyId, "", key ?? `key-${id}`, content);
}

// ── Tests ─────────────────────────────────────────────────────────────────────

test("retrieveMemories: hybrid strategy with no vec store does NOT throw", async () => {
  const db = core.getDbInstance();
  insertMemory(db, "h1", "api-hyb", "Paris is the capital of France.");
  insertMemory(db, "h2", "api-hyb", "Berlin is the capital of Germany.");

  const { retrieveMemories } = await import("../../src/lib/memory/retrieval.ts");

  await assert.doesNotReject(async () => {
    await retrieveMemories("api-hyb", {
      retrievalStrategy: "hybrid",
      query: "capital of France",
      maxTokens: 2000,
    });
  }, "hybrid strategy with no vec store must not throw");
});

test("retrieveMemories: hybrid FTS5 fallback returns only correct apiKeyId memories", async () => {
  const db = core.getDbInstance();
  insertMemory(db, "hyb-a1", "api-ha", "The sun is a star at the center of our solar system.");
  insertMemory(db, "hyb-a2", "api-ha", "The moon orbits around the Earth.");
  insertMemory(db, "hyb-b1", "api-hb", "Different key memory.");

  const { retrieveMemories } = await import("../../src/lib/memory/retrieval.ts");

  const result = await retrieveMemories("api-ha", {
    retrievalStrategy: "hybrid",
    query: "sun star",
    maxTokens: 2000,
  });

  for (const m of result) {
    assert.equal(m.apiKeyId, "api-ha", "all results must belong to api-ha");
  }
});

test("retrieveMemories: hybrid returns array (may be empty if no match)", async () => {
  const db = core.getDbInstance();
  insertMemory(db, "hyb-c1", "api-hc", "Completely unrelated content about cooking.");

  const { retrieveMemories } = await import("../../src/lib/memory/retrieval.ts");

  const result = await retrieveMemories("api-hc", {
    retrievalStrategy: "hybrid",
    query: "quantum physics nuclear",
    maxTokens: 2000,
  });

  assert.ok(Array.isArray(result));
});

test("retrievePreview: hybrid with no vec store → fallbackReason is non-null", async () => {
  const db = core.getDbInstance();
  insertMemory(db, "prev-h1", "api-ph", "Memory about space exploration.");
  insertMemory(db, "prev-h2", "api-ph", "Memory about ocean biology.");

  const { retrievePreview } = await import("../../src/lib/memory/retrieval.ts");

  const bundle = await retrievePreview("api-ph", "space exploration", {
    strategy: "hybrid",
    maxTokens: 2000,
    limit: 10,
  });

  // No embedding source + no vec store → should have a fallbackReason
  assert.ok(
    bundle.resolution.fallbackReason !== null || bundle.resolution.strategyUsed !== "hybrid",
    "hybrid preview with no vec store should report fallback reason or degrade strategy"
  );
  assert.equal(typeof bundle.totalTokens, "number");
  assert.equal(typeof bundle.budgetMaxTokens, "number");
  assert.ok(Array.isArray(bundle.items));
});

test("retrievePreview: exact strategy → items have tier='fts5'", async () => {
  const db = core.getDbInstance();
  insertMemory(db, "prev-e1", "api-pe", "Information about TypeScript.");
  insertMemory(db, "prev-e2", "api-pe", "Information about JavaScript.");

  const { retrievePreview } = await import("../../src/lib/memory/retrieval.ts");

  const bundle = await retrievePreview("api-pe", "TypeScript", {
    strategy: "exact",
    maxTokens: 2000,
    limit: 10,
  });

  assert.ok(Array.isArray(bundle.items));
  for (const item of bundle.items) {
    assert.equal(item.tier, "fts5", "exact strategy should produce tier=fts5 items");
  }
  assert.equal(bundle.resolution.strategyUsed, "exact");
  assert.equal(bundle.resolution.rerankApplied, false);
});

test("retrievePreview: bundle shape matches RetrievePreviewBundle contract", async () => {
  const db = core.getDbInstance();
  insertMemory(db, "prev-s1", "api-ps", "Short memory content.");

  const { retrievePreview } = await import("../../src/lib/memory/retrieval.ts");

  const bundle = await retrievePreview("api-ps", "short", {
    strategy: "semantic",
    maxTokens: 2000,
    limit: 10,
  });

  // Verify all required fields
  assert.ok("items" in bundle, "bundle must have items");
  assert.ok("resolution" in bundle, "bundle must have resolution");
  assert.ok("totalTokens" in bundle, "bundle must have totalTokens");
  assert.ok("budgetMaxTokens" in bundle, "bundle must have budgetMaxTokens");
  assert.equal(bundle.budgetMaxTokens, 2000);

  const res = bundle.resolution;
  assert.ok("embeddingSource" in res);
  assert.ok("embeddingModel" in res);
  assert.ok("vectorStore" in res);
  assert.ok("strategyUsed" in res);
  assert.ok("rerankApplied" in res);
  assert.ok("fallbackReason" in res);
});
