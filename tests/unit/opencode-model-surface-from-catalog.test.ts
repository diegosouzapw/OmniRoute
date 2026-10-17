/**
 * Each key-based opencode model follows the request surface the published catalog
 * declares for it (`models.opencode.ai/api.json`, `provider.npm`), falling back to
 * the registry entry when the catalog is silent. No test touches the network: the
 * catalog map is seeded through the module's seam, and every entry is read back
 * through the production lookup (`getPublishedModelNpm`).
 */
import assert from "node:assert/strict";
import { afterEach, beforeEach, test } from "node:test";

import { getModelTargetFormat } from "../../open-sse/config/providerModels.ts";
import { resolveOpencodeTargetFormat } from "../../open-sse/executors/opencode.ts";
import {
  configurePublishedCatalogForTests,
  getPublishedModelNpm,
  surfaceTargetFormatForNpm,
} from "../../open-sse/utils/opencodePublishedCatalog.ts";
import { resetPublishedEndpointCache } from "../../open-sse/utils/opencodePublishedEndpoint.ts";

function catalogWithEntries() {
  return {
    opencode: {
      id: "opencode",
      api: "https://opencode.ai/inference/v1",
      models: {
        "respond-model": { provider: { npm: "@ai-sdk/openai" } },
        "message-model": { provider: { npm: "@ai-sdk/anthropic" } },
        "google-model": { provider: { npm: "@ai-sdk/google" } },
        "no-npm-model": { provider: {} },
      },
    },
    "opencode-go": {
      id: "opencode-go",
      api: "https://opencode.ai/inference/go/v1",
      models: {
        "respond-model": { provider: { npm: "@ai-sdk/openai" } },
        "message-model": { provider: { npm: "@ai-sdk/anthropic" } },
      },
    },
  };
}

beforeEach(() => {
  resetPublishedEndpointCache();
  configurePublishedCatalogForTests(catalogWithEntries());
});

afterEach(() => {
  resetPublishedEndpointCache();
});

test("a model published with @ai-sdk/openai resolves to /responses", () => {
  assert.equal(getPublishedModelNpm("opencode-zen", "respond-model"), "@ai-sdk/openai");
  assert.equal(surfaceTargetFormatForNpm("@ai-sdk/openai"), "openai-responses");
  assert.equal(resolveOpencodeTargetFormat("opencode-zen", "respond-model"), "openai-responses");
});

test("a model published with @ai-sdk/anthropic resolves to /messages", () => {
  assert.equal(getPublishedModelNpm("opencode-zen", "message-model"), "@ai-sdk/anthropic");
  assert.equal(surfaceTargetFormatForNpm("@ai-sdk/anthropic"), "claude");
  assert.equal(resolveOpencodeTargetFormat("opencode-zen", "message-model"), "claude");
});

test("the raw provider id and the public alias read the same catalog section", () => {
  // `opencode` (raw id) normalizes to the `oc` alias and reads the `opencode` section.
  assert.equal(getPublishedModelNpm("opencode", "respond-model"), "@ai-sdk/openai");
  assert.equal(getPublishedModelNpm("oc", "respond-model"), "@ai-sdk/openai");
  assert.equal(resolveOpencodeTargetFormat("opencode", "respond-model"), "openai-responses");
});

test("a model published without npm falls back to the registry", () => {
  assert.equal(getPublishedModelNpm("opencode-zen", "no-npm-model"), undefined);
  assert.equal(surfaceTargetFormatForNpm(undefined), null);
  // No registry entry and no catalog surface: chat completions.
  assert.equal(resolveOpencodeTargetFormat("opencode-zen", "no-npm-model"), "openai");
});

test("a missing catalog keeps the registry target format", () => {
  resetPublishedEndpointCache();
  configurePublishedCatalogForTests(null);
  // Registry pins this model to Responses; the silent catalog must not move it.
  assert.equal(getPublishedModelNpm("opencode-go", "deepseek-v4-pro"), undefined);
  assert.equal(resolveOpencodeTargetFormat("opencode-go", "deepseek-v4-pro"), "openai-responses");
});

test("a model unknown to the catalog keeps the registry target format", () => {
  assert.equal(getPublishedModelNpm("opencode-go", "deepseek-v4-pro"), undefined);
  assert.equal(resolveOpencodeTargetFormat("opencode-go", "deepseek-v4-pro"), "openai-responses");
});

test("a published SDK outside the measured set keeps the registry target format", () => {
  assert.equal(getPublishedModelNpm("opencode-zen", "google-model"), "@ai-sdk/google");
  assert.equal(surfaceTargetFormatForNpm("@ai-sdk/google"), null);
  assert.equal(surfaceTargetFormatForNpm("@ai-sdk/mistral"), null);
  assert.equal(resolveOpencodeTargetFormat("opencode-zen", "google-model"), "openai");
});

test("the registry override wins over the catalog", () => {
  // Registry pins this model to Messages; the catalog must not move it.
  assert.equal(resolveOpencodeTargetFormat("opencode-go", "qwen3.8-max"), "claude");
  assert.equal(getModelTargetFormat("opencode-go", "qwen3.8-max"), "claude");
});

test("non-opencode providers never read the catalog", () => {
  assert.equal(getPublishedModelNpm("openai", "respond-model"), undefined);
  assert.equal(getPublishedModelNpm("github", "respond-model"), undefined);
});

test("re-seeding the catalog drops every entry the new read does not carry", () => {
  // N lookups against a seeded map add nothing; the next catalog read rewrites the map as
  // a block, so an id the new read omits is gone instead of piling up per request.
  for (let index = 0; index < 5; index += 1) {
    assert.equal(getPublishedModelNpm("opencode-zen", "respond-model"), "@ai-sdk/openai");
  }
  configurePublishedCatalogForTests({
    opencode: { models: { "only-model": { provider: { npm: "@ai-sdk/anthropic" } } } },
  });
  assert.equal(getPublishedModelNpm("opencode-zen", "respond-model"), undefined);
  assert.equal(getPublishedModelNpm("opencode-zen", "only-model"), "@ai-sdk/anthropic");
});
