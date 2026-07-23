import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  normalizeMemorySettings,
  toMemorySettingsUpdates,
  DEFAULT_MEMORY_SETTINGS,
} from "../../src/lib/memory/settings.ts";

describe("normalizeMemorySettings — plan 21 D9 new fields", () => {
  it("returns all D9 defaults when raw is empty", () => {
    const s = normalizeMemorySettings({});
    assert.equal(s.embeddingSource, "auto");
    assert.equal(s.embeddingProviderModel, null);
    assert.equal(s.transformersEnabled, false);
    assert.equal(s.staticEnabled, false);
    assert.equal(s.rerankEnabled, false);
    assert.equal(s.rerankProviderModel, null);
    assert.equal(s.vectorStore, "auto");
  });

  it("reads embeddingSource from raw key memoryEmbeddingSource", () => {
    const s = normalizeMemorySettings({ memoryEmbeddingSource: "static" });
    assert.equal(s.embeddingSource, "static");
  });

  it("reads all 4 valid embeddingSource values", () => {
    for (const val of ["remote", "static", "transformers", "auto"] as const) {
      const s = normalizeMemorySettings({ memoryEmbeddingSource: val });
      assert.equal(s.embeddingSource, val);
    }
  });

  it("falls back to default for unknown embeddingSource", () => {
    const s = normalizeMemorySettings({ memoryEmbeddingSource: "unknown_value" });
    assert.equal(s.embeddingSource, DEFAULT_MEMORY_SETTINGS.embeddingSource);
  });

  it("reads embeddingProviderModel", () => {
    const s = normalizeMemorySettings({ memoryEmbeddingProviderModel: "openai/text-embedding-3-small" });
    assert.equal(s.embeddingProviderModel, "openai/text-embedding-3-small");
  });

  it("normalises empty string embeddingProviderModel to null", () => {
    const s = normalizeMemorySettings({ memoryEmbeddingProviderModel: "" });
    assert.equal(s.embeddingProviderModel, null);
  });

  it("reads transformersEnabled", () => {
    const s = normalizeMemorySettings({ memoryTransformersEnabled: true });
    assert.equal(s.transformersEnabled, true);
  });

  it("reads staticEnabled", () => {
    const s = normalizeMemorySettings({ memoryStaticEnabled: true });
    assert.equal(s.staticEnabled, true);
  });

  it("reads rerankEnabled", () => {
    const s = normalizeMemorySettings({ memoryRerankEnabled: true });
    assert.equal(s.rerankEnabled, true);
  });

  it("reads rerankProviderModel", () => {
    const s = normalizeMemorySettings({ memoryRerankProviderModel: "cohere/rerank-3" });
    assert.equal(s.rerankProviderModel, "cohere/rerank-3");
  });

  it("reads vectorStore — all 3 valid values", () => {
    for (const val of ["sqlite-vec", "qdrant", "auto"] as const) {
      const s = normalizeMemorySettings({ memoryVectorStore: val });
      assert.equal(s.vectorStore, val);
    }
  });

  it("falls back to auto for unknown vectorStore", () => {
    const s = normalizeMemorySettings({ memoryVectorStore: "invalid" });
    assert.equal(s.vectorStore, "auto");
  });

  it("does NOT break old fields (enabled, maxTokens, strategy, etc.)", () => {
    const s = normalizeMemorySettings({
      memoryEnabled: false,
      memoryMaxTokens: 4000,
      memoryRetentionDays: 90,
      memoryStrategy: "semantic",
      skillsEnabled: false,
    });
    assert.equal(s.enabled, false);
    assert.equal(s.maxTokens, 4000);
    assert.equal(s.retentionDays, 90);
    assert.equal(s.strategy, "semantic");
    assert.equal(s.skillsEnabled, false);
  });
});

describe("toMemorySettingsUpdates — plan 21 D9 new fields", () => {
  it("projects rerankEnabled correctly", () => {
    const updates = toMemorySettingsUpdates({ rerankEnabled: true });
    assert.equal(updates.memoryRerankEnabled, true);
  });

  it("projects embeddingSource correctly", () => {
    const updates = toMemorySettingsUpdates({ embeddingSource: "static" });
    assert.equal(updates.memoryEmbeddingSource, "static");
  });

  it("projects embeddingProviderModel including null", () => {
    const updates = toMemorySettingsUpdates({ embeddingProviderModel: null });
    assert.equal(updates.memoryEmbeddingProviderModel, null);
  });

  it("projects transformersEnabled", () => {
    const updates = toMemorySettingsUpdates({ transformersEnabled: true });
    assert.equal(updates.memoryTransformersEnabled, true);
  });

  it("projects staticEnabled", () => {
    const updates = toMemorySettingsUpdates({ staticEnabled: true });
    assert.equal(updates.memoryStaticEnabled, true);
  });

  it("projects rerankProviderModel", () => {
    const updates = toMemorySettingsUpdates({ rerankProviderModel: "cohere/rerank-3" });
    assert.equal(updates.memoryRerankProviderModel, "cohere/rerank-3");
  });

  it("projects vectorStore", () => {
    const updates = toMemorySettingsUpdates({ vectorStore: "sqlite-vec" });
    assert.equal(updates.memoryVectorStore, "sqlite-vec");
  });

  it("does not include undefined keys in the output", () => {
    const updates = toMemorySettingsUpdates({ rerankEnabled: true });
    assert.ok(!("memoryEmbeddingSource" in updates));
    assert.ok(!("memoryVectorStore" in updates));
  });

  it("still projects legacy fields", () => {
    const updates = toMemorySettingsUpdates({ enabled: false, strategy: "exact" as never });
    assert.equal(updates.memoryEnabled, false);
    assert.equal(updates.memoryStrategy, "exact");
  });
});
