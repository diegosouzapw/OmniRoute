import { test } from "node:test";
import assert from "node:assert/strict";

import { normalizeDiscoveredModels } from "@/lib/providerModels/modelDiscovery";

// Regression guard for #3202.
//
// OpenRouter's /api/v1/models returns the context window as `context_length`
// (and `top_provider.context_length`), NOT `inputTokenLimit`. The provider
// discovery path (`parseResponse: (data) => data.data || []`) passes these raw
// records straight into `normalizeDiscoveredModels`, so before the fix synced
// OpenRouter models never carried `inputTokenLimit` and `/v1/models` fell back
// to the 128K provider default for every model.

test("#3202 maps OpenRouter context_length into inputTokenLimit", () => {
  const [model] = normalizeDiscoveredModels([
    { id: "deepseek/deepseek-v4", context_length: 1048576 },
  ]);

  assert.equal(model.id, "deepseek/deepseek-v4");
  assert.equal(model.inputTokenLimit, 1048576);
});

test("#3202 preserves an explicit inputTokenLimit when already present", () => {
  const [model] = normalizeDiscoveredModels([
    { id: "vendor/with-explicit", inputTokenLimit: 200000, context_length: 999999 },
  ]);

  // Explicit inputTokenLimit wins over the context_length fallback.
  assert.equal(model.inputTokenLimit, 200000);
});

test("#3202 falls back to top_provider.context_length", () => {
  const [model] = normalizeDiscoveredModels([
    { id: "vendor/top-provider-window", top_provider: { context_length: 262144 } },
  ]);

  assert.equal(model.inputTokenLimit, 262144);
});

test("#3202 maps OpenRouter output cap (top_provider.max_completion_tokens)", () => {
  const [model] = normalizeDiscoveredModels([
    {
      id: "vendor/with-output-cap",
      context_length: 131072,
      top_provider: { max_completion_tokens: 32768 },
    },
  ]);

  assert.equal(model.inputTokenLimit, 131072);
  assert.equal(model.outputTokenLimit, 32768);
});

test("#3202 leaves inputTokenLimit unset when no window field is present", () => {
  const [model] = normalizeDiscoveredModels([{ id: "vendor/no-window" }]);

  assert.equal(model.inputTokenLimit, undefined);
});
