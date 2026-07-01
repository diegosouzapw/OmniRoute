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

test("#3202 maps OpenRouter context_length into provider-first capabilities", () => {
  const [model] = normalizeDiscoveredModels([
    { id: "deepseek/deepseek-v4", context_length: 1048576 },
  ]);

  assert.equal(model.id, "deepseek/deepseek-v4");
  assert.equal(model.capabilities?.contextWindow, 1048576);
  assert.equal(model.capabilities?.maxInputTokens, 1048576);
  assert.equal("inputTokenLimit" in model, false);
});

test("#3202 preserves an explicit inputTokenLimit when already present", () => {
  const [model] = normalizeDiscoveredModels([
    { id: "vendor/with-explicit", inputTokenLimit: 200000, context_length: 999999 },
  ]);

  // Explicit inputTokenLimit wins over the context_length fallback.
  assert.equal(model.capabilities?.contextWindow, 200000);
  assert.equal(model.capabilities?.maxInputTokens, 200000);
});

test("#3202 falls back to top_provider.context_length", () => {
  const [model] = normalizeDiscoveredModels([
    { id: "vendor/top-provider-window", top_provider: { context_length: 262144 } },
  ]);

  assert.equal(model.capabilities?.contextWindow, 262144);
  assert.equal(model.capabilities?.maxInputTokens, 262144);
});

test("#3202 maps OpenRouter output cap (top_provider.max_completion_tokens)", () => {
  const [model] = normalizeDiscoveredModels([
    {
      id: "vendor/with-output-cap",
      context_length: 131072,
      top_provider: { max_completion_tokens: 32768 },
    },
  ]);

  assert.equal(model.capabilities?.contextWindow, 131072);
  assert.equal(model.capabilities?.maxInputTokens, 131072);
  assert.equal(model.capabilities?.maxOutputTokens, 32768);
});

test("#3202 leaves context capabilities unset when no window field is present", () => {
  const [model] = normalizeDiscoveredModels([{ id: "vendor/no-window" }]);

  assert.equal(model.capabilities?.contextWindow, undefined);
  assert.equal("inputTokenLimit" in model, false);
});

test("normalizeDiscoveredModels accepts provider-first capabilities and compat input", () => {
  const [model] = normalizeDiscoveredModels([
    {
      id: "vendor/nested-config",
      capabilities: {
        contextWindow: 512000,
        maxOutputTokens: 64000,
        supportsVision: true,
        supportsTools: true,
        supportsReasoning: true,
        supportsXHighEffort: true,
        supportsMaxEffort: null,
        defaultThinkingBudget: 0,
        interleavedField: "reasoning_content",
      },
      capabilityOverrides: {
        contextWindow: null,
      },
      compat: {
        targetFormat: "claude",
        unsupportedParams: ["temperature", "top_p"],
        normalizeToolCallId: true,
        preserveOpenAIDeveloperRole: false,
        upstreamHeaders: {
          "X-Test": "yes",
        },
        compatByProtocol: {
          openai: {
            normalizeToolCallId: false,
            upstreamHeaders: {
              "X-Proto": "1",
            },
          },
        },
      },
    },
  ]);

  assert.equal(model.capabilities?.contextWindow, 512000);
  assert.equal(model.capabilities?.maxInputTokens, 512000);
  assert.equal(model.capabilities?.maxOutputTokens, 64000);
  assert.equal(model.capabilities?.supportsVision, true);
  assert.equal(model.capabilities?.supportsTools, true);
  assert.equal(model.capabilities?.supportsReasoning, true);
  assert.equal(model.capabilities?.supportsXHighEffort, true);
  assert.equal(model.capabilities?.supportsMaxEffort, undefined);
  assert.equal(model.capabilities?.defaultThinkingBudget, 0);
  assert.equal(model.capabilities?.interleavedField, "reasoning_content");
  assert.deepEqual(model.capabilityOverrides, {
    contextWindow: null,
    supportsMaxEffort: null,
  });
  assert.equal(model.compat?.targetFormat, "claude");
  assert.deepEqual(model.compat?.unsupportedParams, ["temperature", "top_p"]);
  assert.equal(model.compat?.normalizeToolCallId, true);
  assert.equal(model.compat?.preserveOpenAIDeveloperRole, false);
  assert.deepEqual(model.compat?.upstreamHeaders, { "X-Test": "yes" });
  assert.deepEqual(model.compat?.compatByProtocol?.openai, {
    normalizeToolCallId: false,
    upstreamHeaders: { "X-Proto": "1" },
  });
  assert.equal("targetFormat" in model, false);
});
