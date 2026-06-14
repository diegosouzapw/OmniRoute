import test from "node:test";
import assert from "node:assert/strict";

import {
  MemorySettingsExtendedSchema,
  MemoryUpdatePutSchema,
  RetrievePreviewSchema,
  MemoryReindexSchema,
  MemorySummarizeSchema,
  EmbeddingProviderListingSchema,
  MemoryEngineStatusSchema,
  RetrievePreviewResultSchema,
} from "../../src/shared/schemas/memory.ts";

import {
  QdrantSettingsSchema,
  QdrantSettingsUpdateSchema,
  QdrantSearchSchema,
  QdrantHealthResultSchema,
} from "../../src/shared/schemas/qdrant.ts";

// ---------------------------------------------------------------------------
// 1. MemorySettingsExtendedSchema
// ---------------------------------------------------------------------------

test("MemorySettingsExtendedSchema: accepts fully-populated valid payload", () => {
  const result = MemorySettingsExtendedSchema.safeParse({
    enabled: true,
    maxTokens: 4000,
    retentionDays: 30,
    strategy: "hybrid",
    skillsEnabled: false,
    embeddingSource: "auto",
    embeddingProviderModel: "openai/text-embedding-3-small",
    transformersEnabled: false,
    staticEnabled: true,
    rerankEnabled: false,
    rerankProviderModel: null,
    vectorStore: "sqlite-vec",
  });
  assert.equal(result.success, true, "Should accept all valid fields");
});

test("MemorySettingsExtendedSchema: rejects extra field (strict)", () => {
  const result = MemorySettingsExtendedSchema.safeParse({
    enabled: true,
    unknownExtraField: "nope",
  });
  assert.equal(result.success, false, "Strict schema must reject unknown keys");
});

test("MemorySettingsExtendedSchema: rejects maxTokens above max (16000)", () => {
  const result = MemorySettingsExtendedSchema.safeParse({ maxTokens: 16001 });
  assert.equal(result.success, false, "maxTokens 16001 must be rejected");
});

test("MemorySettingsExtendedSchema: rejects invalid embeddingSource value", () => {
  const result = MemorySettingsExtendedSchema.safeParse({ embeddingSource: "magic" });
  assert.equal(result.success, false, "Unknown embeddingSource must be rejected");
});

// ---------------------------------------------------------------------------
// 2. MemoryUpdatePutSchema
// ---------------------------------------------------------------------------

test("MemoryUpdatePutSchema: accepts valid partial update (content only)", () => {
  const result = MemoryUpdatePutSchema.safeParse({ content: "updated content" });
  assert.equal(result.success, true, "Should accept partial update with only content");
});

test("MemoryUpdatePutSchema: rejects extra field (strict)", () => {
  const result = MemoryUpdatePutSchema.safeParse({ content: "x", extra: true });
  assert.equal(result.success, false, "Strict schema must reject unknown keys");
});

test("MemoryUpdatePutSchema: rejects empty-string key", () => {
  const result = MemoryUpdatePutSchema.safeParse({ key: "" });
  assert.equal(result.success, false, "key must be min(1)");
});

test("MemoryUpdatePutSchema: rejects invalid type enum", () => {
  const result = MemoryUpdatePutSchema.safeParse({ type: "unknown_type" });
  assert.equal(result.success, false, "Invalid memory type must be rejected");
});

// ---------------------------------------------------------------------------
// 3. RetrievePreviewSchema
// ---------------------------------------------------------------------------

test("RetrievePreviewSchema: accepts minimal valid payload (query only)", () => {
  const result = RetrievePreviewSchema.safeParse({ query: "what is the capital of France?" });
  assert.equal(result.success, true, "Should accept minimal payload with query only");
  if (result.success) {
    assert.equal(result.data.strategy, "hybrid", "Default strategy should be hybrid");
    assert.equal(result.data.maxTokens, 2000, "Default maxTokens should be 2000");
    assert.equal(result.data.limit, 20, "Default limit should be 20");
  }
});

test("RetrievePreviewSchema: rejects empty query string", () => {
  const result = RetrievePreviewSchema.safeParse({ query: "" });
  assert.equal(result.success, false, "Empty query must be rejected");
});

test("RetrievePreviewSchema: rejects limit above 100", () => {
  const result = RetrievePreviewSchema.safeParse({ query: "test", limit: 101 });
  assert.equal(result.success, false, "limit > 100 must be rejected");
});

// ---------------------------------------------------------------------------
// 4. MemoryReindexSchema
// ---------------------------------------------------------------------------

test("MemoryReindexSchema: accepts empty object (all defaults)", () => {
  const result = MemoryReindexSchema.safeParse({});
  assert.equal(result.success, true, "Should accept empty object with defaults applied");
  if (result.success) {
    assert.equal(result.data.force, false, "Default force should be false");
  }
});

test("MemoryReindexSchema: rejects extra field (strict)", () => {
  const result = MemoryReindexSchema.safeParse({ force: true, extra: "not allowed" });
  assert.equal(result.success, false, "Strict schema must reject unknown keys");
});

// ---------------------------------------------------------------------------
// 5. MemorySummarizeSchema
// ---------------------------------------------------------------------------

test("MemorySummarizeSchema: accepts valid payload with all fields", () => {
  const result = MemorySummarizeSchema.safeParse({
    olderThanDays: 60,
    apiKeyId: "key-abc",
    dryRun: true,
  });
  assert.equal(result.success, true, "Should accept all valid fields");
});

test("MemorySummarizeSchema: rejects olderThanDays above 365", () => {
  const result = MemorySummarizeSchema.safeParse({ olderThanDays: 366 });
  assert.equal(result.success, false, "olderThanDays > 365 must be rejected");
});

test("MemorySummarizeSchema: rejects olderThanDays of 0 (positive required)", () => {
  const result = MemorySummarizeSchema.safeParse({ olderThanDays: 0 });
  assert.equal(result.success, false, "olderThanDays 0 must be rejected (must be positive)");
});

// ---------------------------------------------------------------------------
// 6. EmbeddingProviderListingSchema
// ---------------------------------------------------------------------------

test("EmbeddingProviderListingSchema: accepts valid providers array", () => {
  const result = EmbeddingProviderListingSchema.safeParse({
    providers: [
      {
        provider: "openai",
        hasKey: true,
        models: [
          { id: "openai/text-embedding-3-small", name: "text-embedding-3-small", dimensions: 1536 },
          { id: "openai/text-embedding-ada-002", name: "text-embedding-ada-002", dimensions: null },
        ],
      },
    ],
  });
  assert.equal(result.success, true, "Should accept valid provider listing");
});

test("EmbeddingProviderListingSchema: rejects missing required model fields", () => {
  const result = EmbeddingProviderListingSchema.safeParse({
    providers: [
      {
        provider: "openai",
        hasKey: true,
        models: [{ id: "openai/text-embedding-3-small" }], // missing name and dimensions
      },
    ],
  });
  assert.equal(result.success, false, "Missing model name/dimensions must be rejected");
});

// ---------------------------------------------------------------------------
// 7. MemoryEngineStatusSchema
// ---------------------------------------------------------------------------

test("MemoryEngineStatusSchema: accepts valid fully-populated status", () => {
  const result = MemoryEngineStatusSchema.safeParse({
    keyword: { available: true, backend: "FTS5" },
    embedding: {
      source: "remote",
      model: "openai/text-embedding-3-small",
      dimensions: 1536,
      available: true,
      reason: "provider openai com key configurada",
      cacheStats: { hits: 10, misses: 2, size: 12 },
    },
    vectorStore: {
      backend: "sqlite-vec",
      available: true,
      rowCount: 42,
      needsReindex: 0,
      reason: "sqlite-vec loaded",
    },
    qdrant: { enabled: false, healthy: null, latencyMs: null, error: null },
    rerank: {
      enabled: false,
      provider: null,
      model: null,
      available: false,
      reason: "no rerank provider configured",
    },
  });
  assert.equal(result.success, true, "Should accept fully-populated engine status");
});

test("MemoryEngineStatusSchema: rejects wrong literal for keyword.backend", () => {
  const result = MemoryEngineStatusSchema.safeParse({
    keyword: { available: true, backend: "BM25" }, // wrong backend literal
    embedding: {
      source: null,
      model: null,
      dimensions: null,
      available: false,
      reason: "none",
      cacheStats: { hits: 0, misses: 0, size: 0 },
    },
    vectorStore: { backend: "none", available: false, rowCount: 0, needsReindex: 0, reason: "" },
    qdrant: { enabled: false, healthy: null, latencyMs: null, error: null },
    rerank: { enabled: false, provider: null, model: null, available: false, reason: "" },
  });
  assert.equal(result.success, false, "backend 'BM25' must be rejected (must be literal 'FTS5')");
});

test("MemoryEngineStatusSchema: rejects invalid vectorStore backend", () => {
  const result = MemoryEngineStatusSchema.safeParse({
    keyword: { available: true, backend: "FTS5" },
    embedding: {
      source: null,
      model: null,
      dimensions: null,
      available: false,
      reason: "",
      cacheStats: { hits: 0, misses: 0, size: 0 },
    },
    vectorStore: { backend: "faiss", available: false, rowCount: 0, needsReindex: 0, reason: "" },
    qdrant: { enabled: false, healthy: null, latencyMs: null, error: null },
    rerank: { enabled: false, provider: null, model: null, available: false, reason: "" },
  });
  assert.equal(result.success, false, "backend 'faiss' must be rejected");
});

// ---------------------------------------------------------------------------
// 8. RetrievePreviewResultSchema
// ---------------------------------------------------------------------------

test("RetrievePreviewResultSchema: accepts valid response with memories", () => {
  const result = RetrievePreviewResultSchema.safeParse({
    memories: [
      {
        id: "mem-1",
        type: "factual",
        key: "capital_of_france",
        content: "The capital of France is Paris.",
        score: 0.95,
        tokens: 10,
        tier: "hybrid-rrf",
        vecScore: 0.93,
        ftsScore: 0.88,
      },
    ],
    resolution: {
      embeddingSource: "remote",
      embeddingModel: "openai/text-embedding-3-small",
      vectorStore: "sqlite-vec",
      strategyUsed: "hybrid",
      rerankApplied: false,
      fallbackReason: null,
    },
    totalTokensUsed: 10,
    budgetMaxTokens: 2000,
  });
  assert.equal(result.success, true, "Should accept valid preview result");
});

test("RetrievePreviewResultSchema: rejects invalid tier value", () => {
  const result = RetrievePreviewResultSchema.safeParse({
    memories: [
      {
        id: "mem-1",
        type: "factual",
        key: "k",
        content: "c",
        score: 0.5,
        tokens: 5,
        tier: "bm25", // invalid tier
        vecScore: null,
        ftsScore: null,
      },
    ],
    resolution: {
      embeddingSource: null,
      embeddingModel: null,
      vectorStore: "none",
      strategyUsed: "exact",
      rerankApplied: false,
      fallbackReason: null,
    },
    totalTokensUsed: 5,
    budgetMaxTokens: 2000,
  });
  assert.equal(result.success, false, "tier 'bm25' must be rejected");
});

// ---------------------------------------------------------------------------
// 9. QdrantSettingsSchema
// ---------------------------------------------------------------------------

test("QdrantSettingsSchema: accepts valid settings with defaults applied", () => {
  const result = QdrantSettingsSchema.safeParse({
    enabled: true,
    host: "localhost",
  });
  assert.equal(result.success, true, "Should accept minimal settings with defaults");
  if (result.success) {
    assert.equal(result.data.port, 6333, "Default port should be 6333");
    assert.equal(result.data.collection, "omniroute_memory", "Default collection");
    assert.equal(result.data.hasApiKey, false, "Default hasApiKey should be false");
    assert.equal(result.data.apiKeyMasked, null, "Default apiKeyMasked should be null");
  }
});

test("QdrantSettingsSchema: rejects port above 65535", () => {
  const result = QdrantSettingsSchema.safeParse({
    enabled: false,
    host: "",
    port: 99999,
  });
  assert.equal(result.success, false, "Port 99999 must be rejected");
});

// ---------------------------------------------------------------------------
// 10. QdrantSettingsUpdateSchema
// ---------------------------------------------------------------------------

test("QdrantSettingsUpdateSchema: accepts valid partial update", () => {
  const result = QdrantSettingsUpdateSchema.safeParse({
    enabled: true,
    host: "qdrant.example.com",
    port: 6334,
  });
  assert.equal(result.success, true, "Should accept partial update");
});

test("QdrantSettingsUpdateSchema: rejects extra field (strict)", () => {
  const result = QdrantSettingsUpdateSchema.safeParse({
    enabled: true,
    unknownField: "not allowed",
  });
  assert.equal(result.success, false, "Strict schema must reject unknown keys");
});

test("QdrantSettingsUpdateSchema: rejects empty collection string", () => {
  const result = QdrantSettingsUpdateSchema.safeParse({ collection: "" });
  assert.equal(result.success, false, "collection min(1) must reject empty string");
});

// ---------------------------------------------------------------------------
// 11. QdrantSearchSchema
// ---------------------------------------------------------------------------

test("QdrantSearchSchema: accepts valid search payload with default topK", () => {
  const result = QdrantSearchSchema.safeParse({ query: "semantic search test" });
  assert.equal(result.success, true, "Should accept query with default topK");
  if (result.success) {
    assert.equal(result.data.topK, 5, "Default topK should be 5");
  }
});

test("QdrantSearchSchema: rejects topK above 50", () => {
  const result = QdrantSearchSchema.safeParse({ query: "test", topK: 51 });
  assert.equal(result.success, false, "topK > 50 must be rejected");
});

test("QdrantSearchSchema: rejects empty query string", () => {
  const result = QdrantSearchSchema.safeParse({ query: "" });
  assert.equal(result.success, false, "Empty query must be rejected");
});

// ---------------------------------------------------------------------------
// 12. QdrantHealthResultSchema (bonus — extra coverage)
// ---------------------------------------------------------------------------

test("QdrantHealthResultSchema: accepts healthy result without error field", () => {
  const result = QdrantHealthResultSchema.safeParse({ ok: true, latencyMs: 12 });
  assert.equal(result.success, true, "Healthy result must be accepted");
});

test("QdrantHealthResultSchema: accepts unhealthy result with error field", () => {
  const result = QdrantHealthResultSchema.safeParse({
    ok: false,
    latencyMs: 0,
    error: "connection refused",
  });
  assert.equal(result.success, true, "Unhealthy result with error string must be accepted");
});

test("QdrantHealthResultSchema: rejects non-boolean ok field", () => {
  const result = QdrantHealthResultSchema.safeParse({ ok: "yes", latencyMs: 10 });
  assert.equal(result.success, false, "ok must be boolean");
});
