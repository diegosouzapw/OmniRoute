/**
 * #5087 — derive model-discovery config from a provider's registry `modelsUrl`.
 *
 * When a provider is absent from the hardcoded PROVIDER_MODELS_CONFIG but its
 * registry entry carries a `modelsUrl`, `deriveConfigFromRegistryModelsUrl`
 * builds a Bearer `/v1/models` discovery config so the dashboard's "discover
 * models" path works (e.g. MiniMax). Providers without `modelsUrl` return
 * `undefined` (caller falls back to its existing undefined handling).
 */
import test from "node:test";
import assert from "node:assert/strict";

import { deriveConfigFromRegistryModelsUrl } from "../../src/app/api/providers/[id]/models/discoveryConfig.ts";

test("minimax (registry modelsUrl present) yields a Bearer /v1/models config", () => {
  const config = deriveConfigFromRegistryModelsUrl("minimax");
  assert.ok(config, "minimax must yield a config");
  assert.equal(config.url, "https://api.minimax.io/v1/models");
  assert.equal(config.method, "GET");
  assert.equal(config.authHeader, "Authorization");
  assert.equal(config.authPrefix, "Bearer ");
  // parseResponse tolerates both {data:[...]} and {models:[...]} shapes.
  assert.deepEqual(config.parseResponse({ data: [{ id: "abab6.5" }] }), [{ id: "abab6.5" }]);
  assert.deepEqual(config.parseResponse({ models: [{ id: "m" }] }), [{ id: "m" }]);
});

test("a provider without a registry modelsUrl returns undefined", () => {
  // `baseten` is a registry provider with no `modelsUrl`.
  assert.equal(deriveConfigFromRegistryModelsUrl("baseten"), undefined);
});

test("an unknown provider returns undefined", () => {
  assert.equal(deriveConfigFromRegistryModelsUrl("not-a-real-provider-xyz"), undefined);
});
