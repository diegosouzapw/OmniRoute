import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { getModelsDevTierFitness } from "../../open-sse/services/autoCombo/taskFitness.ts";

describe("taskFitness - missing model_capabilities table (#8603)", () => {
  it("returns null safely when model_capabilities table does not exist in DB", () => {
    const result = getModelsDevTierFitness("claude-sonnet-3-5-20241022", "coding");
    assert.equal(result, null);
  });
});
