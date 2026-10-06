/**
 * #12758 — vision-bridge must honor Custom Models "Vision capable" for the
 * same three id forms /v1/models advertises, not only the internal
 * providerId/modelPath string.
 *
 * parseModel splits on the first slash, so a path-shaped custom id such as
 * `orcarouter/Qwen3.8-27B-Uncensored-NVFP4` is looked up as provider
 * `orcarouter` + model `Qwen3.8-...`. The override lives under the real
 * openai-compatible connection id. Text chat already resolves that record;
 * the bridge used a narrower pair and silently swapped in glm/glm-4.6v.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-12758-vision-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "custom-vision-12758-test-secret";

const core = await import("../../src/lib/db/core.ts");
const { addCustomModel, getCustomModelVisionOverride } = await import("../../src/lib/db/models.ts");
const { getResolvedModelCapabilities } = await import("../../src/lib/modelCapabilities.ts");
const { VisionBridgeGuardrail } = await import("../../src/lib/guardrails/visionBridge.ts");
import type { GuardrailContext } from "../../src/lib/guardrails/base.ts";
import type { VisionModelConfig } from "../../src/lib/guardrails/visionBridgeHelpers.ts";

const CONNECTION_ID = "openai-compatible-chat-12758-vllm";
const CUSTOM_MODEL_ID = "orcarouter/Qwen3.8-27B-Uncensored-NVFP4";
const ADVERTISED_ALIAS = `vllm/${CUSTOM_MODEL_ID}`;
const FULL_INTERNAL = `${CONNECTION_ID}/${CUSTOM_MODEL_ID}`;
const FALLBACK_VISION_MODEL = "glm/glm-4.6v";

const ID_FORMS = [
  { name: "advertised alias vllm/path", model: ADVERTISED_ALIAS },
  { name: "bare path-shaped id", model: CUSTOM_MODEL_ID },
  { name: "full providerId/modelPath", model: FULL_INTERNAL },
] as const;

async function seedVisionCustomModel() {
  await addCustomModel(
    CONNECTION_ID,
    CUSTOM_MODEL_ID,
    "Qwen 3.8 vision",
    "manual",
    "chat-completions",
    ["chat"],
    undefined,
    {},
    true
  );
}

function imagePayload(model: string): Record<string, unknown> {
  return {
    model,
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "What color is this image? One word." },
          {
            type: "image_url",
            image_url: { url: "https://example.com/swatch.png" },
          },
        ],
      },
    ],
  };
}

test.beforeEach(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  await seedVisionCustomModel();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#12758 custom vision override matches all three advertised id forms", () => {
  assert.equal(
    getCustomModelVisionOverride(CONNECTION_ID, CUSTOM_MODEL_ID),
    true,
    "exact connection-id lookup is the control"
  );

  assert.equal(
    getCustomModelVisionOverride("vllm", CUSTOM_MODEL_ID, undefined, {
      lookupKey: ADVERTISED_ALIAS,
    }),
    true,
    "vllm/path advertised alias must resolve the custom override"
  );

  assert.equal(
    getCustomModelVisionOverride("orcarouter", "Qwen3.8-27B-Uncensored-NVFP4", undefined, {
      lookupKey: CUSTOM_MODEL_ID,
    }),
    true,
    "first-slash split of the path-shaped id must still hit the override"
  );
});

for (const form of ID_FORMS) {
  test(`#12758 capabilities.supportsVision is true for ${form.name}`, () => {
    const caps = getResolvedModelCapabilities(form.model);
    assert.equal(
      caps.supportsVision,
      true,
      `${form.model} must inherit the Custom Models Vision capable flag`
    );
  });

  test(`#12758 vision-bridge does not swap ${form.name} to ${FALLBACK_VISION_MODEL}`, async () => {
    let visionCallCount = 0;
    const guardrail = new VisionBridgeGuardrail({
      deps: {
        getSettings: async () => ({
          visionBridgeEnabled: true,
          visionBridgeModel: FALLBACK_VISION_MODEL,
        }),
        callVisionModel: async (_imageDataUri: string, _config: VisionModelConfig) => {
          visionCallCount++;
          return "should never describe";
        },
        hasUsableCredentials: async () => null,
      },
    });

    const payload = imagePayload(form.model);
    const result = await guardrail.preCall(payload, {
      model: form.model,
      log: { debug() {}, info() {}, warn() {}, error() {} },
    } as unknown as GuardrailContext);

    assert.equal(result.block, false);
    assert.equal(visionCallCount, 0, "native vision must not call the describe model");
    assert.equal(
      result.modifiedPayload,
      undefined,
      `${form.model} must not be rewritten to ${FALLBACK_VISION_MODEL}`
    );
    const rewritten = (result.modifiedPayload as { model?: string } | undefined)?.model;
    assert.notEqual(rewritten, FALLBACK_VISION_MODEL);
  });
}

test("#12758 explicit supportsVision:false still wins on the advertised alias", async () => {
  const textOnlyId = "orcarouter/text-only-qwen";
  await addCustomModel(
    CONNECTION_ID,
    textOnlyId,
    "Qwen text only",
    "manual",
    "chat-completions",
    ["chat"],
    undefined,
    {},
    false
  );
  const advertised = `vllm/${textOnlyId}`;
  assert.equal(
    getCustomModelVisionOverride("vllm", textOnlyId, undefined, { lookupKey: advertised }),
    false
  );
  assert.equal(getResolvedModelCapabilities(advertised).supportsVision, false);
});

test("#12758 bare registry id does not inherit an unrelated custom vision flag", () => {
  assert.equal(
    getCustomModelVisionOverride("", "gpt-4o", undefined, { lookupKey: "gpt-4o" }),
    null,
    "empty-provider gpt-4o must not scan customModels"
  );
  assert.equal(getResolvedModelCapabilities("gpt-4o").supportsVision, true);
});

test("#12758 a leaf stored id does not suffix-steal openai/gpt-4o", async () => {
  await addCustomModel(
    CONNECTION_ID,
    "4o",
    "stolen leaf",
    "manual",
    "chat-completions",
    ["chat"],
    undefined,
    {},
    true
  );
  assert.equal(
    getCustomModelVisionOverride("openai", "gpt-4o", undefined, { lookupKey: "openai/gpt-4o" }),
    null,
    "leaf '4o' must not match lookupKey openai/gpt-4o"
  );
});
