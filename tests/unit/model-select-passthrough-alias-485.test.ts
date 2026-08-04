import test from "node:test";
import assert from "node:assert/strict";
import { buildPassthroughAliasModels } from "../../src/shared/components/modelSelectModalHelpers.ts";

// Regression guard for port of decolua/9router#485 (Anurag Saxena).
//
// In ModelSelectModal, passthrough-provider model aliases are stored in
// `modelAliases` prefixed by the provider's CANONICAL id (e.g. "github/gpt-4"),
// while the public alias may differ (e.g. providerId "github" → alias "gh").
// The passthrough branch previously filtered/stripped by `${alias}/`, so any
// provider whose alias differed from its id resolved to ZERO models. The fix
// filters by `${providerId}/`, mirroring the sibling custom-provider branch.

test("buildPassthroughAliasModels: resolves aliases keyed by providerId even when the public alias differs", () => {
  // providerId "github", public alias would be "gh" — aliases are stored under the id.
  const modelAliases = {
    "GPT 4o": "github/gpt-4o",
    "GPT 4o mini": "github/gpt-4o-mini",
    Sonnet: "anthropic/claude-3-5-sonnet",
  };

  const result = buildPassthroughAliasModels(modelAliases, "github");

  // The bug (filtering by alias "gh/") would yield [] here. The fix yields the
  // two github-prefixed entries, with the providerId prefix stripped from `id`.
  assert.deepEqual(result, [
    { id: "gpt-4o", name: "GPT 4o", value: "github/gpt-4o", source: "alias" },
    { id: "gpt-4o-mini", name: "GPT 4o mini", value: "github/gpt-4o-mini", source: "alias" },
  ]);
});

test("buildPassthroughAliasModels: only matches the requested providerId prefix", () => {
  const modelAliases = {
    a: "openrouter/model-a",
    b: "github/model-b",
  };
  const result = buildPassthroughAliasModels(modelAliases, "openrouter");
  assert.deepEqual(result, [
    { id: "model-a", name: "a", value: "openrouter/model-a", source: "alias" },
  ]);
});

test("buildPassthroughAliasModels: tolerates empty / malformed maps", () => {
  assert.deepEqual(buildPassthroughAliasModels({}, "github"), []);
  assert.deepEqual(
    buildPassthroughAliasModels({ x: undefined as unknown as string }, "github"),
    []
  );
});
