import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  getEmbeddingProvider,
  parseEmbeddingModel,
  getAllEmbeddingModels,
} from "../../open-sse/config/embeddingRegistry.ts";
import { getImageProvider, parseImageModel } from "../../open-sse/config/imageRegistry.ts";

describe("OpenRouter & GitHub registry entries (#960)", () => {
  // ── Embedding Registry ──────────────────────────────────────────────────

  describe("embeddingRegistry — openrouter", () => {
    it("resolves openrouter provider config", () => {
      const p = getEmbeddingProvider("openrouter");
      assert.ok(p, "openrouter should be in EMBEDDING_PROVIDERS");
      assert.equal(p.baseUrl, "https://openrouter.ai/api/v1/embeddings");
      assert.equal(p.authHeader, "bearer");
    });

    it("openrouter has at least 3 models", () => {
      const p = getEmbeddingProvider("openrouter");
      assert.ok(p.models.length >= 3, `Expected ≥3 models, got ${p.models.length}`);
    });

    it("parses openrouter/openai/text-embedding-3-small correctly", () => {
      const result = parseEmbeddingModel("openrouter/openai/text-embedding-3-small");
      assert.equal(result.provider, "openrouter");
      assert.equal(result.model, "openai/text-embedding-3-small");
    });

    it("openrouter models appear in getAllEmbeddingModels", () => {
      const all = getAllEmbeddingModels();
      const orModels = all.filter((m) => m.provider === "openrouter");
      assert.ok(orModels.length > 0, "Expected openrouter models in full list");
    });
  });

  describe("embeddingRegistry — github", () => {
    it("resolves github provider config", () => {
      const p = getEmbeddingProvider("github");
      assert.ok(p, "github should be in EMBEDDING_PROVIDERS");
      assert.equal(p.baseUrl, "https://models.inference.ai.azure.com/embeddings");
      assert.equal(p.authHeader, "bearer");
    });

    it("github has at least 2 models", () => {
      const p = getEmbeddingProvider("github");
      assert.ok(p.models.length >= 2, `Expected ≥2 models, got ${p.models.length}`);
    });

    it("parses github/text-embedding-3-small correctly", () => {
      const result = parseEmbeddingModel("github/text-embedding-3-small");
      assert.equal(result.provider, "github");
      assert.equal(result.model, "text-embedding-3-small");
    });
  });

  // ── Image Registry ───────────────────────────────────────────────────────

  describe("imageRegistry — openrouter", () => {
    it("resolves openrouter image provider config", () => {
      const p = getImageProvider("openrouter");
      assert.ok(p, "openrouter should be in IMAGE_PROVIDERS");
      assert.equal(p.baseUrl, "https://openrouter.ai/api/v1/images/generations");
      assert.equal(p.format, "openai");
    });

    it("openrouter image provider has at least 2 models", () => {
      const p = getImageProvider("openrouter");
      assert.ok(p.models.length >= 2, `Expected ≥2 models, got ${p.models.length}`);
    });

    it("parses openrouter/openai/gpt-5.4-image-2 correctly", () => {
      const result = parseImageModel("openrouter/openai/gpt-5.4-image-2");
      assert.equal(result.provider, "openrouter");
      assert.equal(result.model, "openai/gpt-5.4-image-2");
    });
  });
});
