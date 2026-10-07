import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-194-astra-vision-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "prompt194-astra-vision-test-secret";

const { getResolvedModelCapabilities } = await import("../../src/lib/modelCapabilities.ts");
const core = await import("../../src/lib/db/core.ts");
const { isVisionIncompatibleTarget } =
  await import("../../open-sse/services/combo/comboStructure.ts");
import type { ResolvedComboTarget } from "../../open-sse/services/combo/types.ts";

const visionRequirements = {
  requiresTools: false,
  requiresVision: true,
  requiresStructuredOutput: false,
  estimatedInputTokens: 1,
  requestedOutputTokens: 1,
  requiredContextTokens: 1,
};

function target(provider: string, modelStr: string): ResolvedComboTarget {
  return {
    kind: "model",
    stepId: `${provider}:${modelStr}`,
    executionKey: `${provider}:${modelStr}`,
    modelStr,
    provider,
    providerId: provider,
    connectionId: "prompt194-provider-free",
    weight: 1,
    label: null,
  };
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
});

test("prompt194: codex/gpt-6-astra remains admitted for image requests", () => {
  const astra = target("codex", "codex/gpt-6-astra");
  assert.equal(
    getResolvedModelCapabilities({ provider: "codex", model: astra.modelStr }).supportsVision,
    true
  );
  assert.equal(isVisionIncompatibleTarget(astra, visionRequirements), false);
});

test("prompt194: unknown and explicit non-vision targets remain fail-closed", () => {
  const unknown = target("unknown-provider", "unknown-model");
  const nonVision = target("cnl", "deepseek/deepseek-v4-pro");

  assert.equal(
    getResolvedModelCapabilities({ provider: unknown.providerId, model: unknown.modelStr })
      .supportsVision,
    null
  );
  assert.equal(isVisionIncompatibleTarget(unknown, visionRequirements), true);

  assert.equal(
    getResolvedModelCapabilities({ provider: nonVision.providerId, model: nonVision.modelStr })
      .supportsVision,
    false
  );
  assert.equal(isVisionIncompatibleTarget(nonVision, visionRequirements), true);
});
