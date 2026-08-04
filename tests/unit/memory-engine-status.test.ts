/**
 * tests/unit/memory-engine-status.test.ts
 *
 * Plan 21 F5 — retrieval.ts: engineStatus() function.
 *
 * Verifies the output shape matches MemoryEngineStatusSchema from
 * src/shared/schemas/memory.ts (§3.2 D11).
 *
 * Cases:
 *   A) engineStatus() returns correct shape when vec is null (FTS5 only)
 *   B) keyword section: available=true, backend="FTS5"
 *   C) embedding section: source=null when no source configured
 *   D) vectorStore section: backend="none" when vec is null
 *   E) qdrant section: enabled=false by default, healthy=null
 *   F) rerank section: enabled=false by default
 *   G) MemoryEngineStatusSchema validates engineStatus() output
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-engine-status-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.VECTOR_STORE_DISABLE_VEC = "true"; // force vec → null

const core = await import("../../src/lib/db/core.ts");
const { MemoryEngineStatusSchema } = await import("../../src/shared/schemas/memory.ts");

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

// ── Tests ─────────────────────────────────────────────────────────────────────

test("engineStatus(): output validates against MemoryEngineStatusSchema", async () => {
  core.getDbInstance(); // trigger migrations

  const { engineStatus } = await import("../../src/lib/memory/retrieval.ts");
  const status = await engineStatus();

  const result = MemoryEngineStatusSchema.safeParse(status);
  assert.equal(
    result.success,
    true,
    `engineStatus output failed schema validation: ${JSON.stringify((result as { error?: unknown }).error)}`
  );
});

test("engineStatus(): keyword section is always available with FTS5 backend", async () => {
  core.getDbInstance();

  const { engineStatus } = await import("../../src/lib/memory/retrieval.ts");
  const status = await engineStatus();

  assert.equal(status.keyword.available, true, "keyword.available must always be true");
  assert.equal(status.keyword.backend, "FTS5", "keyword.backend must be 'FTS5'");
});

test("engineStatus(): embedding section when no source configured", async () => {
  core.getDbInstance();

  const { engineStatus } = await import("../../src/lib/memory/retrieval.ts");
  const status = await engineStatus();

  // With default settings (no embeddingProviderModel, staticEnabled=false, transformersEnabled=false)
  // → embedding.source should be null (no source available)
  assert.equal(status.embedding.available, false, "embedding not available with no source");
  assert.equal(status.embedding.source, null, "embedding.source should be null when unconfigured");
  assert.equal(typeof status.embedding.reason, "string", "embedding.reason must be a string");
  assert.ok(typeof status.embedding.cacheStats === "object", "cacheStats must be an object");
  assert.equal(typeof status.embedding.cacheStats.hits, "number");
  assert.equal(typeof status.embedding.cacheStats.misses, "number");
  assert.equal(typeof status.embedding.cacheStats.size, "number");
});

test("engineStatus(): vectorStore section when VECTOR_STORE_DISABLE_VEC=true", async () => {
  core.getDbInstance();

  const { engineStatus } = await import("../../src/lib/memory/retrieval.ts");
  const status = await engineStatus();

  // With VECTOR_STORE_DISABLE_VEC=true, getVectorStore() returns null
  assert.equal(status.vectorStore.available, false, "vectorStore not available when vec disabled");
  assert.equal(status.vectorStore.backend, "none", "vectorStore.backend must be 'none'");
  assert.equal(typeof status.vectorStore.rowCount, "number", "rowCount must be a number");
  assert.equal(typeof status.vectorStore.needsReindex, "number", "needsReindex must be a number");
  assert.equal(typeof status.vectorStore.reason, "string", "reason must be a string");
});

test("engineStatus(): qdrant section when not configured", async () => {
  core.getDbInstance();

  const { engineStatus } = await import("../../src/lib/memory/retrieval.ts");
  const status = await engineStatus();

  // Default: Qdrant not configured (qdrantEnabled=false in settings)
  assert.equal(status.qdrant.enabled, false, "qdrant.enabled should be false by default");
  // healthy and latencyMs can be null when not configured
  assert.ok(
    status.qdrant.healthy === null || typeof status.qdrant.healthy === "boolean",
    "qdrant.healthy must be null or boolean"
  );
});

test("engineStatus(): rerank section when not configured", async () => {
  core.getDbInstance();

  const { engineStatus } = await import("../../src/lib/memory/retrieval.ts");
  const status = await engineStatus();

  // Default: rerankEnabled=false
  assert.equal(status.rerank.enabled, false, "rerank.enabled should be false by default");
  assert.equal(status.rerank.available, false, "rerank.available should be false when disabled");
  assert.equal(typeof status.rerank.reason, "string", "rerank.reason must be a string");
});

test("engineStatus(): detail strings are English, not mixed Portuguese (#5596)", async () => {
  core.getDbInstance();

  const { engineStatus } = await import("../../src/lib/memory/retrieval.ts");
  const status = await engineStatus();

  // Exact English values for the default (no-config, vec-disabled) state the
  // reporter saw rendered in Portuguese next to English UI labels.
  assert.equal(status.embedding.reason, "auto: no embedding source available");
  assert.equal(status.vectorStore.reason, "sqlite-vec not available — using FTS5 only");
  assert.equal(status.rerank.reason, "rerank disabled");

  // Guard: no leftover Portuguese in any surfaced reason string.
  const ptWords = [
    "não",
    "disponível",
    "configurado",
    "desabilitado",
    "nenhuma",
    "desconhecida",
    "habilitado",
    "degradado",
    "selecionado",
  ];
  for (const reason of [
    status.embedding.reason,
    status.vectorStore.reason,
    status.rerank.reason,
  ]) {
    for (const w of ptWords) {
      assert.ok(!reason.includes(w), `reason "${reason}" still contains Portuguese "${w}"`);
    }
  }
});

test("engineStatus(): no throw when called multiple times", async () => {
  core.getDbInstance();

  const { engineStatus } = await import("../../src/lib/memory/retrieval.ts");

  await assert.doesNotReject(async () => {
    await engineStatus();
    await engineStatus();
  }, "engineStatus must not throw when called multiple times");
});

test("engineStatus(): cacheStats shape matches schema (hits, misses, size are numbers)", async () => {
  core.getDbInstance();

  const { engineStatus } = await import("../../src/lib/memory/retrieval.ts");
  const status = await engineStatus();

  const cs = status.embedding.cacheStats;
  assert.equal(typeof cs.hits, "number");
  assert.equal(typeof cs.misses, "number");
  assert.equal(typeof cs.size, "number");
  assert.ok(cs.hits >= 0, "hits must be >= 0");
  assert.ok(cs.misses >= 0, "misses must be >= 0");
  assert.ok(cs.size >= 0, "size must be >= 0");
});
