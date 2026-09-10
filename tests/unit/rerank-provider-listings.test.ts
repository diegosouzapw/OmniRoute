/**
 * Issue: the rerank listing endpoint (added alongside /api/memory/embedding-providers)
 * must expose curated rerank providers with hasKey state so the memory Rerank
 * selector can grey out unconfigured providers, mirroring the embedding listing.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  RERANK_PROVIDERS,
} from "../../open-sse/config/rerankRegistry.ts";
import {
  buildRerankProviderListing,
  mergeRerankProviderListings,
} from "../../src/lib/memory/embedding/rerankListings";

describe("rerank provider listings", () => {
  it("builds a curated listing per registry provider", () => {
    const cohere = buildRerankProviderListing("cohere", RERANK_PROVIDERS.cohere, true);
    assert.equal(cohere.provider, "cohere");
    assert.equal(cohere.hasKey, true);
    assert.ok(cohere.models.some((m) => m.id === "cohere/rerank-v3.5"));
  });

  it("merge keeps curated first and dedupes by provider id", () => {
    const merged = mergeRerankProviderListings(
      [buildRerankProviderListing("cohere", RERANK_PROVIDERS.cohere, false)],
      [{ provider: "cohere", hasKey: true, models: [] }, { provider: "local-x", hasKey: true, models: [] }]
    );
    assert.deepEqual(
      merged.map((p) => p.provider),
      ["cohere", "local-x"]
    );
    assert.equal(merged[0].hasKey, false, "curated entry wins");
  });
});
