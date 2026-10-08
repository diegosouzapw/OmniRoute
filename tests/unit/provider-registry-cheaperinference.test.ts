import test from "node:test";
import assert from "node:assert/strict";
import { getRegistryEntry } from "../../open-sse/config/providerRegistry.ts";

test("cheaperinference resolves as openai-compat for model discovery", () => {
  const provider = getRegistryEntry("cheaperinference");
  assert.ok(provider, "cheaperinference provider should exist in registry");

  // Verify modelsUrl is configured for live discovery
  assert.equal(provider.modelsUrl, "https://api.cheaperinference.com/v1/models");
});
