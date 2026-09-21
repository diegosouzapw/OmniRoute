/**
 * TDD repro for issue #12111: Vision Bridge auto-router can select a model
 * already locked after a 404.
 *
 * getVisionCapableModels() (src/lib/guardrails/visionBridgeRouter.ts) filters
 * candidates only on the registry vision flag and hasUsableCredentialsForModel
 * (connection-scoped). It never consults isModelLocked
 * (open-sse/services/accountFallback.ts), which the provider layer sets on a
 * 404 "model not found" (open-sse/handlers/chatCore.ts). This test locks a
 * vision-capable model exactly as chatCore.ts would after a 404, then asks
 * getBestVisionModel() for a pick while forcing every other vision-capable
 * provider to look uncredentialed (mirroring the reporter's setup: only one
 * provider connection is actually usable) -- the locked model must not win.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { getBestVisionModel, clearSelectionCache } =
  await import("../../../src/lib/guardrails/visionBridgeRouter.ts");
const { lockModel, clearAllModelLockouts, isModelLocked } =
  await import("../../../open-sse/services/accountFallback.ts");

test.beforeEach(() => {
  clearSelectionCache();
  clearAllModelLockouts();
});

test("getBestVisionModel must not select a model locked after a 404 (#12111)", async () => {
  const provider = "nvidia";
  const connectionId = "conn-nvidia-1";
  // The issue's original log line named "moonshotai/kimi-k2.6"; the registry
  // has since renamed that entry to "kimi-k3" (open-sse/config/providers/
  // registry/nvidia/index.ts) but it resolves the same way: it is the first
  // vision-capable nvidia model in registry order, so it is still the model
  // getBestVisionModel picks first when only nvidia is credentialed.
  const modelId = "moonshotai/kimi-k3";
  const fullModelId = `${provider}/${modelId}`;

  // Reproduce the exact runtime event from the issue log line:
  // "[provider] Node <redacted> model not found (404) for <model>
  //  - locking model for 120s (connection stays active)"
  lockModel(provider, connectionId, modelId, "not_found", 120_000);
  assert.equal(
    isModelLocked(provider, connectionId, modelId),
    true,
    "sanity check: accountFallback must report the model as locked"
  );

  // Only the nvidia provider looks credentialed -- mirrors the reporter's
  // setup where the NVIDIA connection tests 200 all day (connection-scoped
  // credential check passes) but the specific model 404s for the account.
  const model = await getBestVisionModel(
    {},
    { hasUsableCredentials: async (id) => id.startsWith(`${provider}/`) }
  );

  assert.notEqual(
    model,
    fullModelId,
    "getBestVisionModel selected a model that accountFallback has locked after " +
      "a 404 -- getVisionCapableModels() never consults isModelLocked " +
      "(src/lib/guardrails/visionBridgeRouter.ts)"
  );
});
