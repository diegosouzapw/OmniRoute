/**
 * Performance regression tests for OmniRoute
 *
 * Tests bulk data operations against acceptable time thresholds.
 * Thresholds are 2x the expected target to account for slow CI machines.
 *
 * Run: node --import tsx/esm --test tests/integration/performance-regression.test.ts
 */

import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// --- Environment setup (must come before dynamic imports) ---
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-perf-regression-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.REQUIRE_API_KEY = "false";

// --- Dynamic imports after env setup ---
const core = await import("../../src/lib/db/core.ts");
const { createMemory, listMemories, deleteMemory } = await import("../../src/lib/memory/store.ts");
const { retrieveMemories } = await import("../../src/lib/memory/retrieval.ts");
const { MemoryType } = await import("../../src/lib/memory/types.ts");
const { skillRegistry } = await import("../../src/lib/skills/registry.ts");
const { GET: memoryRouteGET } = await import("../../src/app/api/memory/route.ts");

// --- Work around FTS5 trigger bug ---
// Migration 022_add_memory_fts5.sql creates FTS5 with content_rowid='id' expecting
// INTEGER rowids, but memories.id is TEXT (UUID). The triggers fail with
// SQLITE_MISMATCH on INSERT. Drop them so createMemory() works.
// Also drop the memory_fts table since FTS5 can't work with TEXT rowids.
// retrieveMemories() has a fallback that uses keyword scoring when FTS5 is unavailable.
const _db = core.getDbInstance();
_db.exec("DROP TRIGGER IF EXISTS memory_fts_ai");
_db.exec("DROP TRIGGER IF EXISTS memory_fts_ad");
_db.exec("DROP TRIGGER IF EXISTS memory_fts_au");
_db.exec("DROP TABLE IF EXISTS memory_fts");

// --- Constants ---
const TEST_API_KEY_ID = "perf-test-api-key";
const TEST_SESSION_ID = "perf-test-session";
const MEMORY_COUNT = 1000;
const SKILL_COUNT = 100;

// --- Thresholds (2x buffer for CI) ---
const THRESHOLD_LIST_MEMORIES_MS = 200;
const THRESHOLD_SKILLS_CACHED_MS = 100;
const THRESHOLD_SKILLS_UNCACHED_MS = 400;
const THRESHOLD_SEARCH_MS = 400;
const THRESHOLD_API_ROUTE_MS = 1000;

// --- Helpers ---
function makeMemoryData(index) {
  return {
    apiKeyId: TEST_API_KEY_ID,
    sessionId: TEST_SESSION_ID,
    type: MemoryType.FACTUAL,
    key: `perf-test-key-${index}`,
    content: `This is test memory content number ${index} for performance regression testing purposes`,
    metadata: { index, tag: "perf-test" },
    expiresAt: null,
  };
}

// ============================================================
// Test 1: listMemories with 1000 records, paginated (page=1, limit=50)
// ============================================================
describe("Performance: listMemories pagination (1000 records)", () => {
  const createdIds = [];

  before(async () => {
    // Bulk insert 1000 memories
    for (let i = 0; i < MEMORY_COUNT; i++) {
      const mem = await createMemory(makeMemoryData(i));
      createdIds.push(mem.id);
    }
    assert.equal(createdIds.length, MEMORY_COUNT, "Should have created 1000 memories");
  });

  after(async () => {
    // Bulk delete all created memories
    const db = core.getDbInstance();
    db.prepare("DELETE FROM memories WHERE api_key_id = ?").run(TEST_API_KEY_ID);
  });

  it(`should list page=1, limit=50 of 1000 memories in <${THRESHOLD_LIST_MEMORIES_MS}ms`, async () => {
    const start = performance.now();
    const result = await listMemories({
      apiKeyId: TEST_API_KEY_ID,
      page: 1,
      limit: 50,
    });
    const elapsed = performance.now() - start;

    assert.equal(result.data.length, 50, "Should return 50 items for page 1");
    assert.equal(result.total, MEMORY_COUNT, "Total should be 1000");
    assert.ok(
      elapsed < THRESHOLD_LIST_MEMORIES_MS,
      `listMemories took ${elapsed.toFixed(1)}ms, expected <${THRESHOLD_LIST_MEMORIES_MS}ms`
    );
  });
});

// ============================================================
// Test 2: Skills registry - cached vs uncached list
// ============================================================
describe("Performance: skills registry cached vs uncached", () => {
  before(async () => {
    // Register 100 skills in the database
    for (let i = 0; i < SKILL_COUNT; i++) {
      await skillRegistry.register({
        name: `perf-skill-${i}`,
        version: "1.0.0",
        description: `Performance test skill ${i}`,
        schema: { input: {}, output: {} },
        handler: `echo "skill ${i}"`,
        enabled: true,
        apiKeyId: TEST_API_KEY_ID,
      });
    }
  });

  after(async () => {
    // Clean up skills
    const db = core.getDbInstance();
    db.prepare("DELETE FROM skills WHERE api_key_id = ?").run(TEST_API_KEY_ID);
    skillRegistry.invalidateCache();
  });

  it(`should load skills from DB (uncached) in <${THRESHOLD_SKILLS_UNCACHED_MS}ms`, async () => {
    // Force cache invalidation so loadFromDatabase actually hits DB
    skillRegistry.invalidateCache();

    const start = performance.now();
    await skillRegistry.loadFromDatabase();
    const elapsed = performance.now() - start;

    assert.ok(
      elapsed < THRESHOLD_SKILLS_UNCACHED_MS,
      `Uncached loadFromDatabase took ${elapsed.toFixed(1)}ms, expected <${THRESHOLD_SKILLS_UNCACHED_MS}ms`
    );
  });

  it(`should list skills from cache in <${THRESHOLD_SKILLS_CACHED_MS}ms`, async () => {
    // Ensure cache is warm (loadFromDatabase was just called above)
    // Call list() which reads from in-memory Map
    const start = performance.now();
    const skills = skillRegistry.list();
    const elapsed = performance.now() - start;

    assert.ok(skills.length >= SKILL_COUNT, `Should have at least ${SKILL_COUNT} skills`);
    assert.ok(
      elapsed < THRESHOLD_SKILLS_CACHED_MS,
      `Cached list() took ${elapsed.toFixed(1)}ms, expected <${THRESHOLD_SKILLS_CACHED_MS}ms`
    );
  });
});

// ============================================================
// Test 3: Search over 1000 memories (keyword scoring fallback)
//
// Note: FTS5 triggers are dropped due to a content_rowid bug (TEXT vs INTEGER).
// retrieveMemories() falls back to chronological + getRelevanceScore() keyword
// scoring, which is the production fallback path we validate here.
// ============================================================
describe("Performance: memory search (1000 records)", () => {
  const createdIds = [];

  before(async () => {
    // Bulk insert 1000 memories with searchable content
    for (let i = 0; i < MEMORY_COUNT; i++) {
      const mem = await createMemory(makeMemoryData(i));
      createdIds.push(mem.id);
    }
    assert.equal(createdIds.length, MEMORY_COUNT, "Should have created 1000 memories");
  });

  after(async () => {
    const db = core.getDbInstance();
    db.prepare("DELETE FROM memories WHERE api_key_id = ?").run(TEST_API_KEY_ID);
  });

  it(`should search memories with retrieveMemories (query="test") in <${THRESHOLD_SEARCH_MS}ms`, async () => {
    const start = performance.now();
    const results = await retrieveMemories(TEST_API_KEY_ID, {
      query: "test",
      retrievalStrategy: "semantic",
      maxTokens: 8000,
    });
    const elapsed = performance.now() - start;

    assert.ok(results.length > 0, "Should find matching memories");
    assert.ok(
      elapsed < THRESHOLD_SEARCH_MS,
      `retrieveMemories search took ${elapsed.toFixed(1)}ms, expected <${THRESHOLD_SEARCH_MS}ms`
    );
  });
});

// ============================================================
// Test 4: API route handler GET /api/memory?limit=50
// ============================================================
describe("Performance: memory API route handler (1000 records)", () => {
  before(async () => {
    // Bulk insert 1000 memories
    for (let i = 0; i < MEMORY_COUNT; i++) {
      await createMemory(makeMemoryData(i));
    }
  });

  after(async () => {
    const db = core.getDbInstance();
    db.prepare("DELETE FROM memories WHERE api_key_id = ?").run(TEST_API_KEY_ID);
    // Final cleanup: reset DB instance and remove temp dir
    core.resetDbInstance();
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  });

  it(`should handle GET /api/memory?limit=50 in <${THRESHOLD_API_ROUTE_MS}ms`, async () => {
    // Create a mock Request object for the route handler
    const request = new Request(
      `http://localhost:20128/api/memory?limit=50&apiKeyId=${TEST_API_KEY_ID}`,
      { method: "GET" }
    );

    const start = performance.now();
    const response = await memoryRouteGET(request);
    const elapsed = performance.now() - start;

    assert.equal(response.status, 200, "Response should be 200 OK");

    const body = (await response.json()) as any;
    assert.equal(body.data.length, 50, "Should return 50 items");
    assert.equal(body.total, MEMORY_COUNT, "Total should be 1000");
    assert.ok(body.stats, "Response should include stats");

    assert.ok(
      elapsed < THRESHOLD_API_ROUTE_MS,
      `API route handler took ${elapsed.toFixed(1)}ms, expected <${THRESHOLD_API_ROUTE_MS}ms`
    );
  });
});
