/**
 * Issue: the Embedding Source "remote provider" dropdown and the Rerank
 * (optional) selector both render from listEmbeddingProviders(), which
 * aggregates ONLY the hand-curated EMBEDDING_PROVIDERS + local provider_nodes.
 * Providers configured in OmniRoute but absent from that curated registry (groq,
 * vercel-ai-gateway, ...) never appear — and before the runtime
 * fallback existed, selecting them manually would fail with
 * "Unknown embedding provider".
 *
 * These tests pin the pure derivation helper used by listEmbeddingProviders():
 * every chat provider with a derivable /embeddings endpoint contributes a listing,
 * curated entries win, and rerank listings come from the rerank registry.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { REGISTRY } from "@omniroute/open-sse/config/providerRegistry.ts";
import {
  deriveEmbeddingProviderForChatProvider,
  getEmbeddingProvider,
} from "@omniroute/open-sse/config/embeddingRegistry.ts";
import {
  buildDerivedProviderListings,
  mergeProviderListings,
} from "../../src/lib/memory/embedding/providerListings";

describe("memory embedding listings: derived providers", () => {
  it("derives a listing for a configured OpenAI-compatible chat provider", () => {
    const listings = buildDerivedProviderListings(
      new Set(["groq"]),
      (id) => {
        const entry = REGISTRY[id] as { baseUrl?: string } | undefined;
        return entry ? deriveEmbeddingProviderForChatProvider(id, entry) : null;
      },
      (id) => id === "groq"
    );
    const groq = listings.find((p) => p.provider === "groq");
    assert.ok(groq, "groq should be listed once configured");
    assert.equal(groq?.hasKey, true);
    // Derived providers expose no curated model catalog; they exist so the
    // runtime accepts `groq/<model>` and the UI can offer free-text input.
    assert.deepEqual(groq?.models, []);
  });

  it("never shadows curated registry entries", () => {
    const listings = buildDerivedProviderListings(
      new Set(["deepinfra", "mistral"]),
      (id) => {
        const entry = REGISTRY[id] as { baseUrl?: string } | undefined;
        return entry ? deriveEmbeddingProviderForChatProvider(id, entry) : null;
      },
      () => true
    );
    for (const listing of listings) {
      assert.ok(
        !getEmbeddingProvider(listing.provider),
        "derived listings must not duplicate curated providers"
      );
    }
  });

  it("skips dynamic-URL providers without a static base", () => {
    const listings = buildDerivedProviderListings(
      new Set(["account-scoped"]),
      () => null,
      () => true
    );
    // Providers with no derivable static /embeddings endpoint contribute
    // nothing — no bogus derived entry may be produced here.
    assert.equal(listings.filter((p) => p.provider === "account-scoped").length, 0);
  });
});

describe("memory embedding listings: merge", () => {
  it("curated entries win over derived ones with the same id", () => {
    const merged = mergeProviderListings(
      [{ provider: "groq", hasKey: false, models: [{ id: "groq/curated", name: "C" }] }],
      [{ provider: "groq", hasKey: true, models: [] }]
    );
    assert.equal(merged.length, 1);
    assert.equal(merged[0].hasKey, false, "curated (first) entry is authoritative");
    assert.equal(merged[0].models.length, 1);
  });

  it("keeps curated order first, appends unseen derived/local providers", () => {
    const merged = mergeProviderListings(
      [{ provider: "openai", hasKey: true, models: [] }],
      [
        { provider: "zzz-local", hasKey: true, models: [] },
        { provider: "openai", hasKey: false, models: [] },
        { provider: "aaa-local", hasKey: true, models: [] },
      ]
    );
    assert.deepEqual(
      merged.map((p) => p.provider),
      ["openai", "zzz-local", "aaa-local"]
    );
  });
});
