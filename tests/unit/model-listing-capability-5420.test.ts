// #5420 — "Import Models" must be hidden for tool-only (search/fetch) providers,
// including ones whose id does NOT end in "-search" (e.g. firecrawl → webFetch),
// while staying visible for LLM and media providers that DO list models.
import { strict as assert } from "node:assert";
import { describe, it } from "node:test";
import { providerLacksModelListing } from "@/lib/providers/modelListingCapability";

describe("providerLacksModelListing (#5420)", () => {
  it("hides model listing for -search suffixed providers regardless of kinds", () => {
    assert.equal(providerLacksModelListing("brave-search", []), true);
    assert.equal(providerLacksModelListing("brave-search", ["webSearch"]), true);
    assert.equal(providerLacksModelListing("brave-search", ["llm"]), true);
  });

  it("hides model listing for tool-only providers without the -search suffix", () => {
    assert.equal(providerLacksModelListing("firecrawl", ["webFetch"]), true);
    assert.equal(providerLacksModelListing("x", ["webSearch"]), true);
    assert.equal(providerLacksModelListing("y", ["webSearch", "webFetch"]), true);
  });

  it("keeps model listing for LLM and media providers", () => {
    assert.equal(providerLacksModelListing("openai", []), false);
    assert.equal(providerLacksModelListing("openai", ["llm"]), false);
    assert.equal(providerLacksModelListing("falai", ["image"]), false);
    assert.equal(providerLacksModelListing("x", ["webSearch", "llm"]), false);
    assert.equal(providerLacksModelListing("z", ["embedding"]), false);
  });
});
