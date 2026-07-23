import test from "node:test";
import assert from "node:assert/strict";

// Port of upstream decolua/9router PR #730 — `/v1/models` must surface models added
// through alias mappings (key_value namespace `modelAliases`) so compatible-provider
// entries like `custom/kimi-k2.6` registered only via `setModelAlias("kimi-k2.6",
// "custom/kimi-k2.6")` are still discoverable by OpenAI clients.
//
// The catalog already iterates `PROVIDER_MODELS`, synced available models, and
// `customModels`. It never iterated `modelAliases`, so values pointing to bare
// `<providerAlias>/<modelId>` entries were silently dropped from the listing even
// though the model resolves at request time. This helper exposes the alias-backed
// pairs as a pure function so the route can merge them into the per-provider model
// list without changing the rest of the pipeline.

import { extractAliasBackedModels } from "../../src/app/api/v1/models/aliasBackedModels.ts";

test("returns the {providerKey, modelId} pair for each alias-backed entry", () => {
  const aliases = {
    "kimi-k2.6": "custom/kimi-k2.6",
    "gpt-4o-mini-fast": "openai/gpt-4o-mini",
  };
  const out = extractAliasBackedModels(aliases);
  assert.deepEqual(out.sort((a, b) => a.providerKey.localeCompare(b.providerKey)), [
    { providerKey: "custom", modelId: "kimi-k2.6" },
    { providerKey: "openai", modelId: "gpt-4o-mini" },
  ]);
});

test("ignores alias values that are not strings", () => {
  const aliases = {
    bad1: 42,
    bad2: null,
    bad3: { foo: "openai/gpt-4o" },
    good: "anthropic/claude-3-5-sonnet",
  };
  const out = extractAliasBackedModels(aliases);
  assert.deepEqual(out, [{ providerKey: "anthropic", modelId: "claude-3-5-sonnet" }]);
});

test("ignores alias values without a provider/model split", () => {
  const aliases = {
    no_slash: "just-a-model-id",
    empty: "",
    only_prefix: "openai/",
    only_suffix: "/model",
  };
  const out = extractAliasBackedModels(aliases);
  assert.deepEqual(out, []);
});

test("preserves the full sub-path when the model id itself contains a slash", () => {
  // e.g. openrouter-style "owner/model" identifiers
  const aliases = {
    or_alias: "openrouter/anthropic/claude-3.5-sonnet",
  };
  const out = extractAliasBackedModels(aliases);
  assert.deepEqual(out, [
    { providerKey: "openrouter", modelId: "anthropic/claude-3.5-sonnet" },
  ]);
});

test("returns an empty list for an empty / null / undefined input", () => {
  assert.deepEqual(extractAliasBackedModels({}), []);
  assert.deepEqual(extractAliasBackedModels(null as unknown as Record<string, unknown>), []);
  assert.deepEqual(
    extractAliasBackedModels(undefined as unknown as Record<string, unknown>),
    []
  );
});

test("de-duplicates entries that resolve to the same {providerKey, modelId}", () => {
  const aliases = {
    primary: "custom/kimi-k2.6",
    secondary: "custom/kimi-k2.6",
  };
  const out = extractAliasBackedModels(aliases);
  assert.deepEqual(out, [{ providerKey: "custom", modelId: "kimi-k2.6" }]);
});
