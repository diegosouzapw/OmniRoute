/**
 * Issue: dashboard/memory?tab=engine "Quick select" only listed models found by a
 * text heuristic over the CHAT catalog (AI_MODELS) plus live OpenRouter discovery.
 * Curated embedding-registry providers (EMBEDDING_PROVIDERS) never appeared — e.g.
 * configured providers with embedding models (mistral, gemini, nvidia nim,
 * groq, ...) was missing even though the provider
 * serves embeddings via a standard OpenAI-compatible /embeddings endpoint.
 *
 * These tests pin the pure catalog helper the route now uses: registry models must
 * be merged into the option list with provider-prefixed values, deduped against
 * heuristic/live options.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { EMBEDDING_PROVIDERS } from "@omniroute/open-sse/config/embeddingRegistry.ts";
import {
  buildRegistryEmbeddingOptions,
  mergeEmbeddingOptions,
} from "../../src/app/api/settings/qdrant/embedding-models/catalog";

describe("qdrant quick-select: registry catalog helpers", () => {
  it("emits one option per registered embedding model, provider-prefixed", () => {
    const options = buildRegistryEmbeddingOptions();
    assert.ok(options.length > 0, "registry should contribute options");

    const byValue = new Map(options.map((o) => [o.value, o.label]));
    for (const [providerId, cfg] of Object.entries(EMBEDDING_PROVIDERS)) {
      for (const m of cfg.models) {
        const value = `${providerId}/${m.id}`;
        assert.ok(byValue.has(value), `missing quick-select option for ${value}`);
      }
    }
  });

  it("skips providers without static curated models (dynamic-only)", () => {
    const options = buildRegistryEmbeddingOptions();
    assert.equal(
      options.filter((o) => o.value.startsWith("lmstudio/")).length,
      0,
      "lmstudio has no curated models; nothing to list"
    );
  });

  it("labels include dimensions when known", () => {
    const options = buildRegistryEmbeddingOptions();
    const hit = options.find((o) => o.value === "deepinfra/BAAI/bge-m3");
    assert.ok(hit, "deepinfra BAAI/bge-m3 expected in registry");
    assert.match(hit.label, /\b1024d\b/);
  });
});

describe("qdrant quick-select: merge with existing options", () => {
  it("dedupes by value and keeps first-seen label (heuristic wins ties)", () => {
    const merged = mergeEmbeddingOptions(
      [{ value: "openai/text-embedding-3-small", label: "heuristic-label" }],
      [{ value: "openai/text-embedding-3-small", label: "registry-label" }]
    );
    assert.equal(merged.length, 1);
    assert.equal(merged[0].label, "heuristic-label");
  });

  it("appends unseen registry options", () => {
    const merged = mergeEmbeddingOptions(
      [{ value: "a/x", label: "A" }],
      [{ value: "b/y", label: "B" }, { value: "b/z", label: "C" }]
    );
    assert.deepEqual(
      merged.map((o) => o.value),
      ["a/x", "b/y", "b/z"]
    );
  });

  it("output is sorted by value for stable UI ordering", () => {
    const merged = mergeEmbeddingOptions(
      [{ value: "z/1", label: "Z" }],
      [{ value: "a/1", label: "A" }, { value: "m/1", label: "M" }]
    );
    assert.deepEqual(
      merged.map((o) => o.value),
      ["a/1", "m/1", "z/1"]
    );
  });
});
