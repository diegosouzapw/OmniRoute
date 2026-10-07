import assert from "node:assert/strict";
import { test } from "node:test";
import {
  getModelsByProviderId,
  supportsXHighEffort,
} from "../../open-sse/config/providerModels.ts";
import { getRegistryModelThinkingEfforts } from "../../open-sse/config/providerRegistry.ts";

// Tier lists follow Anthropic's published per-model effort table:
// xhigh exists on Opus 4.7+ / Opus 5 / Fable 5 (added with Opus 4.7); max exists on
// Opus 5/4.8/4.7/4.6 and Fable 5; Opus 4.5 tops out at high.
const FIVE = ["low", "medium", "high", "xhigh", "max"];
const FOUR = ["low", "medium", "high", "max"]; // no xhigh — Opus 4.6
const THREE = ["low", "medium", "high"]; // Opus 4.5

function entry(providerId: string, modelId: string) {
  const model = getModelsByProviderId(providerId).find((e) => e.id === modelId);
  assert.ok(model, `${providerId}/${modelId} must stay seeded`);
  return model;
}

const EXPECTED: Record<string, Array<[string, string[]]>> = {
  claude: [
    ["claude-fable-5", FIVE],
    ["claude-opus-4-8", FIVE],
    ["claude-opus-4-7", FIVE],
    ["claude-opus-4-6", FOUR],
    ["claude-opus-4-5-20251101", THREE],
  ],
  anthropic: [
    ["claude-fable-5", FIVE],
    ["claude-opus-5", FIVE],
    ["claude-opus-4.8", FIVE],
    ["claude-opus-4.7", FIVE],
    ["claude-opus-4.6", FOUR],
    ["claude-opus-4.5", THREE],
  ],
  github: [
    ["claude-fable-5", FIVE],
    ["claude-opus-5", FIVE],
    ["claude-opus-4.8-fast", FIVE],
    ["claude-opus-4.8", FIVE],
    ["claude-opus-4.7", FIVE],
    ["claude-opus-4.6", FOUR],
    ["claude-opus-4.5", THREE],
  ],
  "ghe-copilot": [
    ["claude-fable-5", FIVE],
    ["claude-opus-5", FIVE],
    ["claude-opus-4.8-fast", FIVE],
    ["claude-opus-4.8", FIVE],
    ["claude-opus-4.7", FIVE],
    ["claude-opus-4.5", THREE],
  ],
};

for (const [providerId, models] of Object.entries(EXPECTED)) {
  test(`${providerId} registry declares per-model thinking efforts`, () => {
    for (const [modelId, tiers] of models) {
      const model = entry(providerId, modelId);
      assert.deepEqual(model.supportedThinkingEfforts, tiers, `${providerId}/${modelId} tiers`);
      assert.equal(model.supportsReasoning, true, `${providerId}/${modelId} reasoning`);
      assert.equal(
        model.supportsXHighEffort,
        tiers.includes("xhigh") ? true : model.supportsXHighEffort,
        `${providerId}/${modelId} xhigh flag consistency`
      );
      // The lookup the catalog uses must resolve through the registry entry.
      assert.deepEqual(getRegistryModelThinkingEfforts(providerId, modelId), tiers);
    }
  });
}

test("xhigh-capable entries declare supportsXHighEffort; 4.6/4.5 must not", () => {
  for (const [providerId, models] of Object.entries(EXPECTED)) {
    for (const [modelId, tiers] of models) {
      const model = entry(providerId, modelId);
      if (tiers.includes("xhigh")) {
        assert.equal(model.supportsXHighEffort, true, `${providerId}/${modelId}`);
      } else {
        assert.notEqual(
          model.supportsXHighEffort,
          true,
          `${providerId}/${modelId} must not advertise xhigh`
        );
      }
    }
  }
});

// Behavior lock: supportsXHighEffort() defaults to true for unlisted models, so
// Opus 4.6/4.5 correctness on anthropic/github/ghe-copilot depends on the canonical
// fallback reaching the claude registry's explicit false entries (providerModels.ts:372-387).
// If those explicit false flags are ever dropped, xhigh requests would silently route
// to models that reject them — these assertions pin the end-to-end behavior.
test("supportsXHighEffort() end-to-end: 4.6/4.5 resolve false on every registry", () => {
  for (const providerId of Object.keys(EXPECTED)) {
    for (const modelId of ["claude-opus-4.6", "claude-opus-4.5"]) {
      // ghe-copilot has no 4.6 entry; claude registry uses dash ids.
      const id =
        providerId === "claude"
          ? modelId
              .replace("claude-opus-4.6", "claude-opus-4-6")
              .replace("claude-opus-4.5", "claude-opus-4-5-20251101")
          : modelId;
      if (!getModelsByProviderId(providerId).some((e) => e.id === id)) continue;
      assert.equal(supportsXHighEffort(providerId, id), false, `${providerId}/${id}`);
    }
  }
});

test("supportsXHighEffort() end-to-end: xhigh-capable models resolve true", () => {
  const cases: Array<[string, string]> = [
    ["claude", "claude-opus-4-8"],
    ["claude", "claude-opus-4-7"],
    ["anthropic", "claude-opus-4.8"],
    ["anthropic", "claude-opus-5"],
    ["github", "claude-opus-4.8-fast"],
    ["ghe-copilot", "claude-fable-5"],
  ];
  for (const [providerId, modelId] of cases) {
    assert.equal(supportsXHighEffort(providerId, modelId), true, `${providerId}/${modelId}`);
  }
});
