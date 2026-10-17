import test from "node:test";
import assert from "node:assert/strict";
import { getResolvedModelCapabilities } from "../../src/lib/modelCapabilities.ts";
import type { ModelCapabilityResolutionSnapshot } from "../../src/lib/modelCapabilityResolutionSnapshot.ts";

// models.dev sync persists effort tiers on the capability row. A model with no
// registry entry and no operator override must still expose those tiers, or the
// catalog never grows the -<tier> variants the request path strips back off.
test("synced models.dev effort tiers reach the resolved model", () => {
  const snapshot = {
    synced: {
      anthropic: {
        "claude-haiku-5-5": {
          tool_call: true,
          reasoning: true,
          reasoning_efforts: ["low", "medium", "high", "xhigh", "max"],
          attachment: false,
          structured_output: true,
          temperature: true,
          modalities_input: '["text"]',
          modalities_output: '["text"]',
          knowledge_cutoff: null,
          release_date: null,
          last_updated: null,
          status: null,
          family: null,
          open_weights: false,
          limit_context: 200000,
          limit_input: null,
          limit_output: 64000,
          interleaved_field: null,
        },
      },
    },
    maxTokenOverrides: new Map(),
    maxInputTokenOverrides: new Map(),
    reasoningEffortsOverrides: new Map(),
    contextOverrides: new Map(),
    customVisionOverrides: new Map(),
    compatVisionOverrides: new Map(),
    syncedAvailableModelVision: new Map(),
  } as ModelCapabilityResolutionSnapshot;

  const caps = getResolvedModelCapabilities("anthropic/claude-haiku-5-5", undefined, snapshot);
  assert.equal(caps.supportsThinking, true);
  assert.deepEqual(caps.supportedThinkingEfforts, ["low", "medium", "high", "xhigh", "max"]);
});

// GLM stores supportedThinkingEfforts: [] on purpose: the thinking toggle
// exists, reasoning_effort does not. An empty registry list must stay empty
// so synced tiers cannot invent catalog variants the executor rejects.
test("an empty registry effort list stays empty", () => {
  const snapshot = {
    synced: {
      glm: {
        "glm-5": {
          tool_call: true,
          reasoning: true,
          reasoning_efforts: ["low", "medium", "high", "max"],
          attachment: false,
          structured_output: true,
          temperature: true,
          modalities_input: '["text"]',
          modalities_output: '["text"]',
          knowledge_cutoff: null,
          release_date: null,
          last_updated: null,
          status: null,
          family: null,
          open_weights: false,
          limit_context: 200000,
          limit_input: null,
          limit_output: 131072,
          interleaved_field: null,
        },
      },
    },
    maxTokenOverrides: new Map(),
    maxInputTokenOverrides: new Map(),
    reasoningEffortsOverrides: new Map(),
    contextOverrides: new Map(),
    customVisionOverrides: new Map(),
    compatVisionOverrides: new Map(),
    syncedAvailableModelVision: new Map(),
  } as ModelCapabilityResolutionSnapshot;

  const caps = getResolvedModelCapabilities("glm/glm-5", undefined, snapshot);
  assert.deepEqual(caps.supportedThinkingEfforts, []);
});
