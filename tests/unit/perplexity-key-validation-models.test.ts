import { describe, it } from "node:test";
import assert from "node:assert/strict";

const { getRegistryEntry } = await import("../../open-sse/config/providerRegistry.ts");
const { deriveConfigFromRegistryModelsUrl } =
  await import("../../src/app/api/providers/[id]/models/discoveryConfig.ts");
const { validateProviderApiKey } = await import("../../src/lib/providers/validation.ts");

describe("perplexity registry — key validation models endpoint", () => {
  it("keeps /v1/models for validation without enabling Agent catalog discovery", () => {
    const entry = getRegistryEntry("perplexity");
    assert.ok(entry, "perplexity must be registered in the execution registry");
    assert.equal(entry.testKeyModelsUrl, "https://api.perplexity.ai/v1/models");
    assert.equal(entry.modelsUrl, undefined);
    assert.equal(deriveConfigFromRegistryModelsUrl("perplexity"), undefined);
  });

  it("uses /v1/models when validating a Perplexity API key", async () => {
    const originalFetch = globalThis.fetch;
    const urls: string[] = [];
    globalThis.fetch = (async (input: string | URL | Request) => {
      urls.push(typeof input === "string" ? input : input instanceof URL ? input.href : input.url);
      return new Response(JSON.stringify({ data: [] }), { status: 200 });
    }) as typeof fetch;

    try {
      const result = await validateProviderApiKey({ provider: "perplexity", apiKey: "pplx-test" });
      assert.equal(result.valid, true);
      assert.deepEqual(urls, ["https://api.perplexity.ai/v1/models"]);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});
