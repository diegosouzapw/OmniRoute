import { test } from "node:test";
import assert from "node:assert/strict";
import { getModelsByProviderId } from "../../open-sse/config/providerModels.ts";

test("claude-web registry matches the current selectable model set", () => {
  const ids = getModelsByProviderId("claude-web")
    .map((model) => model.id)
    .sort();
  assert.deepEqual(
    ids,
    [
      "claude-fable-5",
      "claude-haiku-4-5-20251001",
      "claude-opus-4-8",
      "claude-opus-4-7",
      "claude-opus-4-6",
      "claude-sonnet-4-6",
      "claude-sonnet-5",
    ].sort()
  );
});

test("claude-web registry excludes the requested legacy Opus models", () => {
  const ids = new Set(getModelsByProviderId("claude-web").map((model) => model.id));

  assert.equal(ids.has("claude-3-opus-20240229"), false);
  assert.equal(ids.has("claude-opus-4-1-20250805-claude-ai"), false);
  assert.equal(ids.has("claude-opus-4-5-20251101"), false);
});
