import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  EMBEDDING_PROVIDERS,
  getEmbeddingProvider,
} from "../../open-sse/config/embeddingRegistry.ts";
import { IMAGE_PROVIDERS, getImageProvider } from "../../open-sse/config/imageRegistry.ts";

describe("vercel-ai-gateway media registry entries (upstream #1704)", () => {
  describe("embeddingRegistry — vercel-ai-gateway", () => {
    it("is registered in EMBEDDING_PROVIDERS", () => {
      assert.ok(
        EMBEDDING_PROVIDERS["vercel-ai-gateway"],
        "vercel-ai-gateway should be in EMBEDDING_PROVIDERS"
      );
    });

    it("resolves vercel-ai-gateway provider config", () => {
      const p = getEmbeddingProvider("vercel-ai-gateway");
      assert.ok(p, "getEmbeddingProvider should resolve vercel-ai-gateway");
      assert.equal(p.id, "vercel-ai-gateway");
      assert.equal(p.baseUrl, "https://ai-gateway.vercel.sh/v1/embeddings");
      assert.equal(p.authType, "apikey");
      assert.equal(p.authHeader, "bearer");
    });

    it("has at least one embedding model", () => {
      const p = getEmbeddingProvider("vercel-ai-gateway");
      assert.ok(p.models.length >= 1, `Expected ≥1 models, got ${p.models.length}`);
    });
  });

  describe("imageRegistry — vercel-ai-gateway", () => {
    it("is registered in IMAGE_PROVIDERS", () => {
      assert.ok(IMAGE_PROVIDERS["vercel-ai-gateway"], "vercel-ai-gateway should be in IMAGE_PROVIDERS");
    });

    it("resolves vercel-ai-gateway image provider config", () => {
      const p = getImageProvider("vercel-ai-gateway");
      assert.ok(p, "getImageProvider should resolve vercel-ai-gateway");
      assert.equal(p.id, "vercel-ai-gateway");
      assert.equal(p.alias, "vag");
      assert.equal(p.baseUrl, "https://ai-gateway.vercel.sh/v1/images/generations");
      assert.equal(p.authType, "apikey");
      assert.equal(p.authHeader, "bearer");
      assert.equal(p.format, "openai");
    });

    it("has at least one image model", () => {
      const p = getImageProvider("vercel-ai-gateway");
      assert.ok(p.models.length >= 1, `Expected ≥1 models, got ${p.models.length}`);
    });
  });
});
