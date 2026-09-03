import test from "node:test";
import assert from "node:assert/strict";

import { FREE_MODEL_BUDGETS } from "../../../open-sse/config/freeModelCatalog.data.ts";
import reviewedLiveIds from "../../../open-sse/config/nvidiaHostedModels.snapshot.json" with { type: "json" };
import { nvidiaProvider } from "../../../open-sse/config/providers/registry/nvidia/index.ts";

const registryIds = new Set(nvidiaProvider.models.map((model) => model.id));

const documentedFreeIds = new Set(
  FREE_MODEL_BUDGETS.filter((model) => model.provider === "nvidia").map((model) => model.modelId)
);

const reviewedIds = new Set(reviewedLiveIds);

test("NVIDIA static catalog metadata excludes superseded model ids", () => {
  for (const modelId of [
    "z-ai/glm-5.1",
    "z-ai/glm-5.2",
    "deepseek-ai/deepseek-v4-pro",
    "deepseek-ai/deepseek-v4-flash",
    "minimaxai/minimax-m2.7",
  ]) {
    assert.ok(!registryIds.has(modelId), `${modelId} must not remain in the NVIDIA registry`);
    assert.ok(
      !reviewedIds.has(modelId),
      `${modelId} must not remain in the reviewed NVIDIA hosted-model snapshot`
    );

    assert.ok(
      !documentedFreeIds.has(modelId),
      `${modelId} must not remain in the NVIDIA free-model catalog`
    );
  }
});

test("NVIDIA reviewed snapshot matches the registry and trial entries remain valid", () => {
  assert.deepEqual([...reviewedIds], [...registryIds]);
  for (const modelId of documentedFreeIds) {
    assert.ok(registryIds.has(modelId), `${modelId} must exist in the NVIDIA hosted catalog`);
  }
});
