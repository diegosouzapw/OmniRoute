import test from "node:test";
import assert from "node:assert/strict";

import {
  getConnectionExcludedModels,
  hasEligibleConnectionForModel,
  isModelExcludedByConnection,
  normalizeExcludedModelPatterns,
} from "../../src/domain/connectionModelRules.ts";

test("normalizeExcludedModelPatterns accepts arrays and CSV strings, trims values, and removes duplicates", () => {
  assert.deepEqual(normalizeExcludedModelPatterns([" gpt-4o* ", "gpt-4o*", "", "**"]), ["gpt-4o*"]);
  assert.deepEqual(normalizeExcludedModelPatterns("gpt-4.1*, gpt-4o*, gpt-4.1*"), [
    "gpt-4.1*",
    "gpt-4o*",
  ]);
});

test("isModelExcludedByConnection matches both provider-scoped and raw model ids", () => {
  const providerSpecificData = {
    excludedModels: ["gpt-4o*", "claude-opus-*"],
  };

  assert.equal(isModelExcludedByConnection("openai/gpt-4o-mini", providerSpecificData), true);
  assert.equal(isModelExcludedByConnection("gpt-4o-mini", providerSpecificData), true);
  assert.equal(isModelExcludedByConnection("claude-sonnet-4-5", providerSpecificData), false);
});

test("hasEligibleConnectionForModel only returns true when at least one connection can serve the model", () => {
  const connections = [
    { providerSpecificData: { excludedModels: ["gpt-4o*"] } },
    { providerSpecificData: { excludedModels: ["gpt-4.1*"] } },
  ];

  assert.equal(hasEligibleConnectionForModel(connections, "gpt-4o-mini"), true);
  assert.equal(
    hasEligibleConnectionForModel(
      [
        { providerSpecificData: { excludedModels: ["gpt-4o*"] } },
        { providerSpecificData: { excludedModels: ["gpt-4o-mini"] } },
      ],
      "gpt-4o-mini"
    ),
    false
  );
  assert.deepEqual(getConnectionExcludedModels({ excluded_models: ["gpt-4o*"] }), ["gpt-4o*"]);
});
