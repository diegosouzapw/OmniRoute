/**
 * Combo steps store their model with the provider-alias prefix
 * (`{ providerId: "codex", model: "cx/<id>" }`), which is how the dashboard and
 * the combo builder write them. The combo capability filter and the Vision
 * Bridge resolve those steps through the OBJECT form of
 * getResolvedModelCapabilities({ provider, model }). The string form
 * (`"cx/<id>"`) goes through parseModel and strips the prefix; the object form
 * kept `cx/<id>` as the model, so the Custom Models "Vision capable" row
 * (`customModels/codex` → `{ id: "<id>", supportsVision: true }`) never matched
 * and every such step resolved `supportsVision: null`.
 *
 * Effect: an image request to that combo failed closed with
 * `capability_mismatch` ("No target in combo … has confirmed vision support"),
 * and the Vision Bridge classified the combo as "no-vision" and replaced the
 * image with an "(unavailable …)" stub.
 *
 * MODEL_ID is deliberately absent from every static source (provider registry,
 * MODEL_SPECS, models.dev sync, id-fragment heuristic), so the custom row is
 * the only capability evidence, exactly like a newly released model an
 * operator declares by hand.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-vision-prefix-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { addCustomModel } = await import("../../src/lib/db/models.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const { getResolvedModelCapabilities } = await import("../../src/lib/modelCapabilities.ts");
const { getComboVisionBridgeDecision } = await import("../../src/lib/guardrails/visionBridge.ts");
const { filterTargetsByRequestCompatibility, isVisionIncompatibleTarget } =
  await import("../../open-sse/services/combo/comboStructure.ts");
const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { resetAllComboMetrics } = await import("../../open-sse/services/comboMetrics.ts");
const { resetAllCircuitBreakers } = await import("../../src/shared/utils/circuitBreaker.ts");
const { resetAll: resetAllSemaphores } =
  await import("../../open-sse/services/rateLimitSemaphore.ts");
import type { ResolvedComboTarget } from "../../open-sse/services/combo/types.ts";

const MODEL_ID = "acme-sight-7";
const TEXT_ONLY_MODEL_ID = "acme-blind-7";

const log = { info() {}, warn() {}, error() {}, debug() {} };

/** Responses API tool result that carries an image (the fail-closed shape). */
const toolImageBody = {
  model: "prefixed-vision-combo",
  input: [
    {
      type: "function_call",
      call_id: "call_1",
      name: "screenshot",
      arguments: "{}",
    },
    {
      type: "function_call_output",
      call_id: "call_1",
      output: [{ type: "input_image", image_url: "https://example.com/swatch.png" }],
    },
  ],
};

function target(providerId: string, modelStr: string): ResolvedComboTarget {
  return {
    kind: "model",
    stepId: `step-${providerId}-${modelStr}`,
    executionKey: `step-${providerId}-${modelStr}`,
    modelStr,
    provider: providerId,
    providerId,
    connectionId: null,
    weight: 1,
    label: null,
  };
}

const visionRequirements = {
  requiresTools: false,
  requiresVision: true,
  requiresStructuredOutput: false,
  estimatedInputTokens: 10,
  requestedOutputTokens: 0,
  requiredContextTokens: 10,
};

test.before(async () => {
  await addCustomModel(
    "codex",
    MODEL_ID,
    "Acme Sight 7",
    "manual",
    "responses",
    ["chat"],
    undefined,
    {},
    true
  );
  await addCustomModel(
    "codex",
    TEXT_ONLY_MODEL_ID,
    "Acme Blind 7",
    "manual",
    "responses",
    ["chat"],
    undefined,
    {},
    false
  );
});

test.beforeEach(() => {
  resetAllComboMetrics();
  resetAllCircuitBreakers();
  resetAllSemaphores();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
});

test("control: the bare and string forms already honor the custom vision row", () => {
  assert.equal(
    getResolvedModelCapabilities({ provider: "codex", model: MODEL_ID }).supportsVision,
    true
  );
  assert.equal(getResolvedModelCapabilities(`cx/${MODEL_ID}`).supportsVision, true);
});

for (const providerId of ["codex", "cx"]) {
  test(`object form {${providerId}, cx/<id>} resolves like the string form`, () => {
    const caps = getResolvedModelCapabilities({ provider: providerId, model: `cx/${MODEL_ID}` });
    assert.equal(caps.provider, "codex");
    assert.equal(caps.model, MODEL_ID, "the alias prefix of the same provider must be stripped");
    assert.equal(caps.supportsVision, true, "Custom Models 'Vision capable' must apply");
  });

  test(`combo filter keeps a prefixed step {${providerId}, cx/<id>} for an image request`, () => {
    const step = target(providerId, `cx/${MODEL_ID}`);
    assert.equal(isVisionIncompatibleTarget(step, visionRequirements), false);
    const kept = filterTargetsByRequestCompatibility([step], toolImageBody, log);
    assert.deepEqual(
      kept.map((t) => t.modelStr),
      [`cx/${MODEL_ID}`]
    );
  });
}

test("the codex/<id> prefix form is treated the same as cx/<id>", () => {
  const caps = getResolvedModelCapabilities({ provider: "codex", model: `codex/${MODEL_ID}` });
  assert.equal(caps.model, MODEL_ID);
  assert.equal(caps.supportsVision, true);
});

test("explicit supportsVision:false on a prefixed step still wins", () => {
  const caps = getResolvedModelCapabilities({
    provider: "codex",
    model: `cx/${TEXT_ONLY_MODEL_ID}`,
  });
  assert.equal(caps.supportsVision, false);
  assert.equal(
    isVisionIncompatibleTarget(target("codex", `cx/${TEXT_ONLY_MODEL_ID}`), visionRequirements),
    true
  );
});

test("a slash in a native model id is not stripped when the prefix is another provider", () => {
  // nvidia's registry id starts with `nvidia/`, but openrouter-style and
  // namespaced ids (`meta/…`, `openai/…`) under a different provider must keep
  // their full path: the first segment is part of the provider's model id.
  const openrouter = getResolvedModelCapabilities({
    provider: "openrouter",
    model: "meta-llama/llama-3.3-70b-instruct",
  });
  assert.equal(openrouter.provider, "openrouter");
  assert.equal(openrouter.model, "meta-llama/llama-3.3-70b-instruct");

  const crossProvider = getResolvedModelCapabilities({
    provider: "nvidia",
    model: `cx/${MODEL_ID}`,
  });
  assert.equal(crossProvider.provider, "nvidia");
  assert.equal(
    crossProvider.model,
    `cx/${MODEL_ID}`,
    "a prefix that resolves to a DIFFERENT provider is part of the model id"
  );
  assert.notEqual(crossProvider.supportsVision, true, "codex's custom row must not leak to nvidia");
});

test("a provider whose native ids carry its own name keeps resolving (#12112)", () => {
  const caps = getResolvedModelCapabilities({
    provider: "nvidia",
    model: "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning",
  });
  assert.equal(caps.supportsVision, true);
});

test("a step provider whose alias chain stops early (#2901) resolves like its bare id", () => {
  const prefixed = getResolvedModelCapabilities({ provider: "opencode", model: "oc/big-pickle" });
  const bare = getResolvedModelCapabilities({ provider: "opencode", model: "big-pickle" });
  assert.equal(prefixed.provider, bare.provider);
  assert.equal(prefixed.model, bare.model);
  assert.equal(prefixed.supportsThinking, bare.supportsThinking);
});

test("a custom row stored under the verbatim prefixed id keeps matching", async () => {
  // Operators worked around this bug by declaring the exact step string as the
  // custom model id. That row must keep resolving after the prefix is stripped.
  const verbatimOnly = "acme-verbatim-7";
  await addCustomModel(
    "codex",
    `cx/${verbatimOnly}`,
    "Acme Verbatim 7",
    "manual",
    "responses",
    ["chat"],
    undefined,
    {},
    true
  );
  const caps = getResolvedModelCapabilities({ provider: "codex", model: `cx/${verbatimOnly}` });
  assert.equal(caps.supportsVision, true);
});

test("Vision Bridge classifies an all-prefixed custom-vision combo as skip, not no-vision", async () => {
  await combosDb.createCombo({
    name: "prefixed-vision-combo-bridge",
    models: [
      { providerId: "codex", model: `cx/${MODEL_ID}`, weight: 1 },
      { providerId: "cx", model: `cx/${MODEL_ID}`, weight: 1 },
    ],
  });
  assert.equal(await getComboVisionBridgeDecision("prefixed-vision-combo-bridge"), "skip");
});

test("image tool result reaches a prefixed custom-vision step instead of 400 capability_mismatch", async () => {
  const dispatched: string[] = [];
  const response = await handleComboChat({
    body: toolImageBody,
    combo: {
      name: "prefixed-vision-combo",
      strategy: "priority",
      models: [{ providerId: "codex", model: `cx/${MODEL_ID}`, weight: 1 }],
      config: { maxRetries: 0 },
    },
    handleSingleModel: async (_body, modelStr) => {
      dispatched.push(modelStr);
      return new Response(JSON.stringify({ output_text: "red" }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    },
    isModelAvailable: async () => true,
    log,
    settings: null,
    relayOptions: null,
    allCombos: null,
  });

  const text = response.status === 200 ? "" : await response.text();
  assert.equal(response.status, 200, `expected dispatch, got ${response.status} ${text}`);
  assert.deepEqual(dispatched, [`cx/${MODEL_ID}`]);
});
