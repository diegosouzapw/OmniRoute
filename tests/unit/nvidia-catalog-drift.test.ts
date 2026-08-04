import { test } from "node:test";
import assert from "node:assert/strict";
import { computeNvidiaCatalogDrift } from "../../scripts/check/check-nvidia-catalog-drift.ts";

test("NVIDIA catalog drift separates new live ids from removed documented ids", () => {
  assert.deepEqual(
    computeNvidiaCatalogDrift(
      ["z-ai/glm-5.2", "openai/gpt-oss-120b", "new/model", "new/model"],
      ["z-ai/glm-5.2", "openai/gpt-oss-120b", "removed/model"],
      ["z-ai/glm-5.2", "openai/gpt-oss-120b", "retired/model"]
    ),
    {
      liveCount: 3,
      reviewedLiveCount: 3,
      documentedFreeCount: 3,
      newLiveIds: ["new/model"],
      removedLiveIds: ["removed/model"],
      documentedMissingUpstreamIds: ["retired/model"],
    }
  );
});

test("NVIDIA catalog drift is empty when live and documented ids match", () => {
  const drift = computeNvidiaCatalogDrift(["b", "a"], ["a", "b"], ["a"]);
  assert.deepEqual(drift.newLiveIds, []);
  assert.deepEqual(drift.removedLiveIds, []);
  assert.deepEqual(drift.documentedMissingUpstreamIds, []);
});
