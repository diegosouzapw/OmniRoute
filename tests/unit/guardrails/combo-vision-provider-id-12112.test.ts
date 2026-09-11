import test from "node:test";
import assert from "node:assert/strict";

process.env.DATA_DIR = `/tmp/omniroute-test-12112-${Date.now()}`;

const { getComboVisionBridgeDecision } =
  await import("../../../src/lib/guardrails/visionBridge.ts");
const combosDb = await import("../../../src/lib/db/combos.ts");
const core = await import("../../../src/lib/db/core.ts");
const { isVisionIncompatibleTarget } =
  await import("../../../open-sse/services/combo/comboStructure.ts");
import type { ResolvedComboTarget } from "../../../open-sse/services/combo/types.ts";

test.after(() => {
  core.resetDbInstance();
});

test("#12112: checkComboVision respects providerId for namespaced vision models (e.g. nvidia/nemotron-3-nano-omni-30b-a3b-reasoning)", async () => {
  // Model 'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning' is declared with supportsVision: true in nvidia provider registry.
  // It has a slash in model id and requires providerId="nvidia" to resolve capabilities.
  await combosDb.createCombo({
    name: "nvidia-vision-combo-12112",
    models: [
      {
        providerId: "nvidia",
        model: "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning",
        weight: 1,
      },
    ],
  });

  const decision = await getComboVisionBridgeDecision("nvidia-vision-combo-12112");
  assert.equal(
    decision,
    "skip",
    "Combo with explicit nvidia vision model must resolve as 'skip' (vision supported), not 'no-vision'"
  );
});

test("#12112: isVisionIncompatibleTarget passes providerId to resolve vision capability", () => {
  const target: ResolvedComboTarget = {
    kind: "model",
    stepId: "step-1",
    executionKey: "step-1",
    modelStr: "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning",
    provider: "nvidia",
    providerId: "nvidia",
    connectionId: "conn-1",
    weight: 1,
    label: null,
  };

  const incompatible = isVisionIncompatibleTarget(target, {
    requiresTools: false,
    requiresVision: true,
    requiresStructuredOutput: false,
    estimatedInputTokens: 10,
    requestedOutputTokens: 10,
    requiredContextTokens: 10,
  });

  assert.equal(
    incompatible,
    false,
    "Target with providerId='nvidia' and model='nvidia/nemotron-3-nano-omni-30b-a3b-reasoning' must be vision-compatible"
  );
});
