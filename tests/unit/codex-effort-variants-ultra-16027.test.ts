import test from "node:test";
import assert from "node:assert/strict";

import { getRegisteredProviderEffortBaseModelId } from "../../open-sse/utils/registeredEffortVariants.ts";
import { shouldExposeSyncedEffortVariants } from "../../open-sse/utils/syncedEffortVariants.ts";

test("getRegisteredProviderEffortBaseModelId resolves ultra suffix for codex models (#16027)", () => {
  assert.equal(
    getRegisteredProviderEffortBaseModelId("codex", "gpt-6.1-sol-ultra"),
    "gpt-6.1-sol"
  );
  assert.equal(
    getRegisteredProviderEffortBaseModelId("codex", "gpt-6-sol-ultra"),
    "gpt-6-sol"
  );
  assert.equal(
    getRegisteredProviderEffortBaseModelId("codex", "gpt-5.6-sol-ultra"),
    "gpt-5.6-sol"
  );
});

test("shouldExposeSyncedEffortVariants treats ultra as a known effort token for non-base entries (#16026)", () => {
  const ultraModel = {
    id: "gpt-6.1-sol-ultra",
    owned_by: "codex",
    capabilities: { effort_tiers: ["low", "medium", "high", "xhigh", "max", "ultra"] },
    supportedThinkingEfforts: ["low", "medium", "high", "xhigh", "max", "ultra"],
  };

  // If a model already ends with a known effort token like -ultra, it should not expose nested variants
  assert.equal(shouldExposeSyncedEffortVariants(ultraModel), false);
});
