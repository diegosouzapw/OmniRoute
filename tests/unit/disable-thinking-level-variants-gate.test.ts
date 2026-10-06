import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { appendSyncedEffortVariants } from "../../open-sse/utils/syncedEffortVariants";

describe("OMNIROUTE_DISABLE_THINKING_LEVEL_VARIANTS helper behavior", () => {
  it("appendSyncedEffortVariants generates variants for eligible models", () => {
    const input = [
      {
        id: "my-provider/my-model",
        capabilities: { effort_tiers: ["low", "medium", "high"] },
      },
    ];
    const result = appendSyncedEffortVariants(input);
    assert.equal(result.length, 4);
    assert.deepEqual(
      result.map((m) => m.id),
      [
        "my-provider/my-model",
        "my-provider/my-model-low",
        "my-provider/my-model-medium",
        "my-provider/my-model-high",
      ]
    );
  });
});
