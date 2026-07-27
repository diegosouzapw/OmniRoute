import assert from "node:assert/strict";
import test from "node:test";
import { resolveComboTargets } from "../../open-sse/services/combo/comboStructure.ts";
import { getTokenLimit } from "../../open-sse/services/contextManager.ts";
import { parseModel } from "../../open-sse/services/model.ts";

test("comboTargetLimits resolution respects t.provider override", () => {
  const comboConfig = {
    name: "test-combo",
    models: [
      { model: "openai/gpt-4o", providerId: "custom-provider-id" },
      { model: "anthropic/claude-3-5-sonnet" },
    ],
  };
  const targets = resolveComboTargets(comboConfig, null);

  const comboTargetLimits = targets.map((t: { modelStr?: string; provider?: string }) => {
    const parsed = parseModel(t.modelStr);
    const provider = t.provider || parsed.provider || parsed.providerAlias;
    return getTokenLimit(provider, parsed.model);
  });

  assert.equal(targets.length, 2);
  assert.equal(targets[0].provider, "custom-provider-id");
  assert.equal(typeof comboTargetLimits[0], "number");
  assert.equal(comboTargetLimits[1], 200000);
});
