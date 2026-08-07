import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-pin-validation-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;

process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
const comboAdaptation = await import("../../../src/lib/db/comboAdaptation.ts");
const { requestHasTools, requestHasImages, validatePinnedModelForRequest } =
  await import("../../../open-sse/services/combo/pinValidation.ts");

const COMBO = "pin-val-test";
const QWEN_VL = "ollama-local/qwen2.5vl:7b"; // toolCalling:false, supportsVision:true
const LLAMA = "ollama-local/llama3.1:latest"; // toolCalling:true, ctx 98304

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function withTools() {
  return { messages: [{ role: "user", content: "hi" }], tools: [{ type: "function" }] };
}

function withImage() {
  return {
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "describe" },
          { type: "image_url", image_url: { url: "data:image/png;base64,xxx" } },
        ],
      },
    ],
  };
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
});

test("requestHasTools detects tools, tool_choice, and tool-role messages", () => {
  assert.equal(requestHasTools({ tools: [{ type: "function" }] }), true);
  assert.equal(requestHasTools({ tool_choice: "auto" }), true);
  assert.equal(
    requestHasTools({
      messages: [
        { role: "user", content: "x" },
        { role: "tool", content: "r" },
      ],
    }),
    true
  );
  assert.equal(requestHasTools({ messages: [{ role: "user", content: "x" }] }), false);
  assert.equal(requestHasTools({}), false);
});

test("requestHasImages detects image content parts", () => {
  assert.equal(requestHasImages(withImage()), true);
  assert.equal(requestHasImages({ messages: [{ role: "user", content: "plain text" }] }), false);
  assert.equal(requestHasImages({}), false);
});

test("pinned tool-incapable model is dropped on a tool request (the qwen2.5vl fix)", () => {
  const result = validatePinnedModelForRequest({
    pinnedModel: QWEN_VL,
    comboName: COMBO,
    body: withTools(),
  });
  assert.equal(result.keep, false);
  assert.match(result.reason ?? "", /does not support tool calls/);
});

test("pinned tool-capable model survives a tool request", () => {
  const result = validatePinnedModelForRequest({
    pinnedModel: LLAMA,
    comboName: COMBO,
    body: withTools(),
  });
  assert.equal(result.keep, true);
});

test("vision-capable pinned model survives an image request", () => {
  const result = validatePinnedModelForRequest({
    pinnedModel: QWEN_VL,
    comboName: COMBO,
    body: withImage(),
  });
  assert.equal(result.keep, true);
});

test("plain request keeps any pinned model regardless of tool capability", () => {
  const result = validatePinnedModelForRequest({
    pinnedModel: QWEN_VL,
    comboName: COMBO,
    body: { messages: [{ role: "user", content: "hi" }] },
  });
  assert.equal(result.keep, true);
});

test("pinned model below combo minContextWindow is dropped", () => {
  const result = validatePinnedModelForRequest({
    pinnedModel: LLAMA, // 98304
    comboName: COMBO,
    body: { messages: [{ role: "user", content: "hi" }] },
    minContextWindow: 200000,
  });
  assert.equal(result.keep, false);
  assert.match(result.reason ?? "", /context window/);
});

test("pinned model in adaptation cooldown is dropped", () => {
  for (let i = 0; i < 3; i += 1) {
    comboAdaptation.recordComboAdaptationOutcome(COMBO, QWEN_VL, {
      success: false,
      latencyMs: 500,
    });
  }
  const result = validatePinnedModelForRequest({
    pinnedModel: QWEN_VL,
    comboName: COMBO,
    body: { messages: [{ role: "user", content: "hi" }] },
  });
  assert.equal(result.keep, false);
  assert.match(result.reason ?? "", /cooldown/);
});

test("pinned model with quality-degraded learned score is dropped when a better alternative exists", () => {
  // Pinned: 3 quality failures → learned drops, no cooldown (quality axis only).
  for (let i = 0; i < 3; i += 1) {
    comboAdaptation.recordComboAdaptationOutcome(COMBO, LLAMA, {
      success: false,
      latencyMs: 500,
      qualityFailure: true,
    });
  }
  // Alternative: 3 clean successes → learned climbs.
  for (let i = 0; i < 3; i += 1) {
    comboAdaptation.recordComboAdaptationOutcome(COMBO, QWEN_VL, {
      success: true,
      latencyMs: 300,
      firstPass: true,
    });
  }
  const result = validatePinnedModelForRequest({
    pinnedModel: LLAMA,
    comboName: COMBO,
    body: { messages: [{ role: "user", content: "hi" }] },
  });
  assert.equal(result.keep, false);
  assert.match(result.reason ?? "", /learned score/);
});

test("pinned model with no adaptation history is never dropped by score rules", () => {
  const result = validatePinnedModelForRequest({
    pinnedModel: "ollama-local/mistral-nemo:latest",
    comboName: COMBO,
    body: withTools(),
  });
  // mistral-nemo supports tools → keep; no adaptation row → no score/cooldown rules.
  assert.equal(result.keep, true);
});
