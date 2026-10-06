/**
 * #8032 — path-shaped custom/routed multimodal ids (e.g. `cp/cline-pass/kimi-k3`)
 * must resolve supportsVision=true from leaf static/registry metadata even when
 * models.dev sync stores attachment=false with empty modalities for that key.
 *
 * Without this, Vision Bridge activates and reroutes to openai/gpt-4o-mini.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-path-shaped-vision-8032-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const modelsDevSync = await import("../../src/lib/modelsDevSync.ts");
const modelCapabilities = await import("../../src/lib/modelCapabilities.ts");

function buildCapability(overrides: Record<string, unknown> = {}) {
  return {
    tool_call: null,
    reasoning: null,
    attachment: null,
    structured_output: null,
    temperature: null,
    modalities_input: "[]",
    modalities_output: "[]",
    knowledge_cutoff: null,
    release_date: null,
    last_updated: null,
    status: null,
    family: null,
    open_weights: null,
    limit_context: null,
    limit_input: null,
    limit_output: null,
    interleaved_field: null,
    ...overrides,
  };
}

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => {
  resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#8032 cp/cline-pass/kimi-k3: attachment=false empty modalities → vision via leaf/registry", () => {
  modelsDevSync.saveModelsDevCapabilities({
    clinepass: {
      "cline-pass/kimi-k3": buildCapability({
        attachment: false,
        modalities_input: JSON.stringify(["text"]),
        modalities_output: JSON.stringify(["text"]),
        tool_call: true,
        limit_context: 1048576,
      }),
    },
  });

  const caps = modelCapabilities.getResolvedModelCapabilities("cp/cline-pass/kimi-k3");
  assert.equal(caps.supportsVision, true);
});

test("#8032 leaf fallback: cline-pass/kimi-k3 resolves MODEL_SPECS kimi-k3 vision", () => {
  // No synced row — leaf static spec + registry must still confirm vision.
  const caps = modelCapabilities.getResolvedModelCapabilities("cline-pass/kimi-k3");
  assert.equal(caps.supportsVision, true);
});

test("#8032 leaf fallback is vision-only: aihorde/deepseek/deepseek-v4-flash keeps tools=false", () => {
  // Regression guard from PR review (#8495 / #8212): shared getStaticSpec leaf
  // lookup previously promoted this live-discovered AI Horde id to the real
  // DeepSeek V4 Flash supportsTools:true spec. Leaf lookup must stay vision-only.
  const caps = modelCapabilities.getResolvedModelCapabilities("aihorde/deepseek/deepseek-v4-flash");
  assert.equal(caps.toolCalling, false);
  assert.equal(caps.supportsTools, false);
  assert.equal(
    caps.contextWindow,
    null,
    "leaf MODEL_SPECS context must not leak onto unrelated path-shaped ids"
  );
});

test("#8032 #4071 text-only override still wins over path-shaped sync noise", () => {
  modelsDevSync.saveModelsDevCapabilities({
    xiaomi: {
      "mimo-v2.5-pro": buildCapability({
        attachment: true,
        modalities_input: JSON.stringify(["text", "image"]),
        modalities_output: JSON.stringify(["text"]),
      }),
    },
  });

  const caps = modelCapabilities.getResolvedModelCapabilities("xiaomi/mimo-v2.5-pro");
  assert.equal(caps.supportsVision, false);
});

test("#8032 Vision Bridge skips describe/reroute for cp/cline-pass/kimi-k3 with image", async () => {
  modelsDevSync.saveModelsDevCapabilities({
    clinepass: {
      "cline-pass/kimi-k3": buildCapability({
        attachment: false,
        modalities_input: JSON.stringify(["text"]),
        modalities_output: JSON.stringify(["text"]),
        tool_call: true,
      }),
    },
  });

  const model = "cp/cline-pass/kimi-k3";
  assert.equal(modelCapabilities.getResolvedModelCapabilities(model).supportsVision, true);

  const { VisionBridgeGuardrail } = await import("../../src/lib/guardrails/visionBridge.ts");
  let visionCallCount = 0;
  const guardrail = new VisionBridgeGuardrail({
    deps: {
      getSettings: async () => ({
        visionBridgeEnabled: true,
        visionBridgeModel: "openai/gpt-4o-mini",
        visionBridgePrompt: "Describe this image concisely.",
        visionBridgeTimeout: 30000,
        visionBridgeMaxImages: 10,
      }),
      callVisionModel: async () => {
        visionCallCount++;
        return "should not run";
      },
      hasUsableCredentials: async () => null,
    },
  });

  const result = await guardrail.preCall(
    {
      model,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "What is in this image?" },
            {
              type: "image_url",
              image_url: { url: "https://example.com/photo.png" },
            },
          ],
        },
      ],
    },
    { model, log: console }
  );

  assert.equal(result.block, false);
  assert.equal(visionCallCount, 0);
  assert.equal(result.modifiedPayload, undefined);
});
