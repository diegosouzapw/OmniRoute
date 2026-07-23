// Characterization of the validation.ts search + embedding split (god-file decomposition): the
// web-search validators (+ SEARCH_VALIDATOR_CONFIGS) moved into validation/searchProviders.ts and the
// embedding/rerank/clarifai validators into validation/embeddingProviders.ts. Behavior-preserving
// move — the lock is module surface; runtime behavior stays covered by the search-provider-validation
// and provider-validation-specialty suites.
import { test } from "node:test";
import assert from "node:assert/strict";

const search = await import("../../src/lib/providers/validation/searchProviders.ts");
const embed = await import("../../src/lib/providers/validation/embeddingProviders.ts");
const HOST = await import("../../src/lib/providers/validation.ts");

test("searchProviders exposes the search validators + the per-provider config map", () => {
  assert.equal(typeof (search as Record<string, unknown>).validateSearchProvider, "function");
  assert.equal("validateGenericProvider" in search, false);
  const cfg = (search as Record<string, Record<string, unknown>>).SEARCH_VALIDATOR_CONFIGS;
  assert.ok(cfg && typeof cfg === "object");
  assert.ok(
    Object.keys(cfg).length > 0,
    "SEARCH_VALIDATOR_CONFIGS must carry the provider configs"
  );
});

test("embeddingProviders exposes clarifai + embedding + rerank validators", () => {
  for (const name of [
    "validateClarifaiProvider",
    "validateEmbeddingApiProvider",
    "validateRerankApiProvider",
  ]) {
    assert.equal(typeof (embed as Record<string, unknown>)[name], "function", `missing ${name}`);
  }
});

test("host dispatcher surface stays intact after the move", () => {
  assert.equal(typeof (HOST as Record<string, unknown>).validateProviderApiKey, "function");
});
