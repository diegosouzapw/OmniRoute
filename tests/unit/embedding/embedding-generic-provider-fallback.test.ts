import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  getEmbeddingProvider,
  parseEmbeddingModel,
  deriveEmbeddingProviderForChatProvider,
  type EmbeddingProvider,
} from "@omniroute/open-sse/config/embeddingRegistry.ts";

describe("deriveEmbeddingProviderForChatProvider (global OpenAI-compatible fallback)", () => {
  it("derives an embeddings endpoint from a chat-completions base URL", () => {
    const derived = deriveEmbeddingProviderForChatProvider("groq", {
      id: "groq",
      baseUrl: "https://api.groq.com/openai/v1/chat/completions",
    });
    assert.ok(derived, "groq should derive an embedding provider");
    assert.equal(derived.baseUrl, "https://api.groq.com/openai/v1/embeddings");
    assert.equal(derived.authType, "apikey");
    assert.equal(derived.authHeader, "bearer");
    assert.deepEqual(derived.models, []);
  });

  it("returns null for providers without a usable static base URL", () => {
    assert.equal(deriveEmbeddingProviderForChatProvider("x", null), null);
    assert.equal(
      deriveEmbeddingProviderForChatProvider("dynamic-provider", {
        id: "dynamic-provider",
        baseUrl: "https://host.example/accounts",
      }),
      null,
      "non chat/completions bases must not derive a bogus /embeddings endpoint"
    );
  });

  it("is a fallback only: curated registry entries stay authoritative", () => {
    const derived = deriveEmbeddingProviderForChatProvider("deepinfra", {
      id: "deepinfra",
      baseUrl: "https://api.deepinfra.com/v1/openai/chat/completions",
    });
    // deepinfra IS in EMBEDDING_PROVIDERS — the helper still derives mechanically;
    // callers must check getEmbeddingProvider() first.
    assert.ok(derived);
    assert.ok(getEmbeddingProvider("deepinfra"), "curated entry remains authoritative");
  });

  it("covers known embedding-capable chat providers with derivable endpoints", () => {
    for (const id of ["mistral", "together", "upstage", "fireworks", "nvidia"]) {
      const derived = deriveEmbeddingProviderForChatProvider(id, {
        id,
        baseUrl: `https://${id}.example.com/v1/chat/completions`,
      });
      assert.ok(derived, `${id} should derive`);
      assert.equal(derived?.baseUrl, `https://${id}.example.com/v1/embeddings`);
    }
  });
});

describe("parseEmbeddingModel precedence (provider_node vs registry)", () => {
  it("a configured provider_node prefix wins over alias resolution", () => {
    const dynamic: EmbeddingProvider[] = [
      {
        id: "jina-ai",
        baseUrl: "http://127.0.0.1:9/embeddings",
        authType: "none",
        authHeader: "none",
        models: [],
      },
    ];
    const parsed = parseEmbeddingModel("jina-ai/my-local-model", dynamic);
    assert.deepEqual(parsed, { provider: "jina-ai", model: "my-local-model" });
  });

  it("unknown prefixes fall through to the generic provider segment", () => {
    const parsed = parseEmbeddingModel("totally-unknown/model-id");
    assert.deepEqual(parsed, { provider: "totally-unknown", model: "model-id" });
  });
});
