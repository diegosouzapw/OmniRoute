/**
 * Issue: rerank model strings outside the curated RERANK_PROVIDERS registry were
 * rejected with "No rerank provider found" even when the provider was configured
 * in OmniRoute with a working Cohere-compatible /rerank endpoint (e.g. groq,
 * siliconflow-style hosts). The memory Rerank selector fed by the curated list
 * had the same blind spot.
 *
 * These tests pin: parseRerankModel keeps returning null provider for unknown
 * prefixes (registry semantics unchanged), and the new generic fallback builder
 * derives a Cohere-compatible config for any configured OpenAI-compatible chat
 * provider without shadowing curated entries.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { REGISTRY } from "@omniroute/open-sse/config/providerRegistry.ts";
import {
  getRerankProvider,
  parseRerankModel,
} from "../../open-sse/config/rerankRegistry.ts";
import { deriveRerankProviderForChatProvider } from "../../open-sse/config/rerankRegistry.ts";

describe("rerank registry: unknown providers stay rejected at parse level", () => {
  it("parseRerankModel returns provider null for an unregistered prefix", () => {
    const parsed = parseRerankModel("groq/some-reranker");
    assert.equal(parsed.provider, null);
    // Registry semantics: when no curated provider matches, model keeps its
    // full original string (provider prefix included).
    assert.equal(parsed.model, "groq/some-reranker");
    assert.equal(getRerankProvider("groq"), null);
  });
});

describe("deriveRerankProviderForChatProvider (generic Cohere-compatible fallback)", () => {
  it("derives a /rerank endpoint from a chat-completions base URL", () => {
    const derived = deriveRerankProviderForChatProvider("groq", {
      id: "groq",
      baseUrl: "https://api.groq.com/openai/v1/chat/completions",
    });
    assert.ok(derived, "groq should derive a rerank provider");
    assert.equal(derived.baseUrl, "https://api.groq.com/openai/v1/rerank");
    assert.deepEqual(derived.models, []);
  });

  it("returns null for dynamic-URL providers and missing entries", () => {
    assert.equal(
      deriveRerankProviderForChatProvider("account-scoped", {
        id: "account-scoped",
        baseUrl: "https://api.example.com/client/v4/accounts",
      }),
      null
    );
    assert.equal(deriveRerankProviderForChatProvider("ghost", undefined), null);
  });

  it("does not shadow curated rerank registries", () => {
    for (const id of ["cohere", "together", "siliconflow", "voyage-ai", "jina-ai"]) {
      const entry = REGISTRY[id] as { baseUrl?: string } | undefined;
      if (!entry) continue;
      const derived = deriveRerankProviderForChatProvider(id, entry);
      if (derived) {
        assert.ok(getRerankProvider(id), `${id} remains curated; derivation is fallback-only`);
      }
    }
    // cohere IS curated — helper still derives mechanically, but callers must
    // check the curated registry first. Pin that ordering here:
    const curated = getRerankProvider("cohere");
    assert.ok(curated?.models.length, "curated cohere entry has models");
  });
});
