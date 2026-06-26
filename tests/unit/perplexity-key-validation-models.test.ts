// Regression test for perplexity API key validation.
//
// Perplexity deprecated the unversioned `/models` endpoint (returns 404), so
// our default validation probe — which derives `<baseUrl>/models` from the
// perplexity registry entry via `addModelsSuffix` — would always fail to
// confirm a valid key, falling through to the chat-completions probe and
// often misclassifying live keys as "Invalid". Inspired by upstream
// 9router fix (see commit message); we port it OmniRoute-style by
// declaring an explicit `modelsUrl` on the perplexity registry entry.

import { describe, it } from "node:test";
import assert from "node:assert";

describe("perplexity registry — key validation models endpoint", () => {
  it("declares a modelsUrl pointing at /v1/models (not the deprecated /models)", async () => {
    const { getRegistryEntry } = await import(
      "../../open-sse/config/providerRegistry.ts"
    );
    const entry = getRegistryEntry("perplexity");
    assert.ok(entry, "perplexity must be registered in the execution registry");
    assert.equal(entry.format, "openai");
    assert.ok(
      typeof entry.modelsUrl === "string" && entry.modelsUrl.length > 0,
      "perplexity registry entry must declare an explicit modelsUrl so key " +
        "validation does not hit the deprecated <baseUrl>/models endpoint"
    );
    assert.equal(
      entry.modelsUrl,
      "https://api.perplexity.ai/v1/models",
      "perplexity modelsUrl must point at the versioned /v1/models endpoint " +
        "(unversioned /models was deprecated and now returns 404)"
    );
  });

  it("does not derive a /models URL that ends in /chat/completions/models", async () => {
    const { getRegistryEntry } = await import(
      "../../open-sse/config/providerRegistry.ts"
    );
    const entry = getRegistryEntry("perplexity");
    assert.ok(entry?.modelsUrl, "modelsUrl required");
    assert.ok(
      !entry.modelsUrl.includes("/chat/completions"),
      "modelsUrl must not include /chat/completions"
    );
    assert.ok(
      entry.modelsUrl.endsWith("/v1/models"),
      "modelsUrl must end with /v1/models"
    );
  });
});
