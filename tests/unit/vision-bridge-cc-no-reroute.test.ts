/**
 * End-to-end guardrail tests: verify Vision Bridge does NOT reroute
 * command-code vision-capable models. This is the core behavioral test
 * for the bug fix.
 *
 * BUG FLOW (before fix):
 *   command-code/gpt-5.5 + image
 *     → getResolvedModelCapabilities("command-code/gpt-5.5")
 *     → supportsVision = null/false (no registry flag, no heuristic match)
 *     → Vision Bridge auto-reroutes to opencode-zen/gpt-5.5
 *     → opencode-zen's executor returns 401 "Missing API key"
 *
 * FIXED FLOW (after fix):
 *   command-code/gpt-5.5 + image
 *     → getResolvedModelCapabilities("command-code/gpt-5.5")
 *     → supportsVision = true (registry flag)
 *     → Vision Bridge passes through unmodified
 *     → request reaches command-code upstream with correct API key
 */
import test from "node:test";
import assert from "node:assert/strict";

const { VisionBridgeGuardrail } = await import("../../src/lib/guardrails/visionBridge.ts");
const { resetGuardrailsForTests } = await import("../../src/lib/guardrails/registry.ts");
const { getResolvedModelCapabilities } = await import("../../src/lib/modelCapabilities.ts");
import type { GuardrailContext } from "../../src/lib/guardrails/base.ts";
import type { VisionModelConfig } from "../../src/lib/guardrails/visionBridgeHelpers.ts";

// ── Mock state ──────────────────────────────────────────────────────────────

let mockSettings: Record<string, unknown> = {
  visionBridgeEnabled: true,
  visionBridgeModel: "openai/gpt-4o-mini",
  visionBridgePrompt: "Describe this image concisely.",
  visionBridgeTimeout: 30000,
  visionBridgeMaxImages: 10,
};

let visionCallCount = 0;

function createGuardrail() {
  return new VisionBridgeGuardrail({
    deps: {
      getSettings: async () => mockSettings,
      callVisionModel: async (_imageDataUri: string, _config: VisionModelConfig) => {
        visionCallCount++;
        return "An image description";
      },
    },
  });
}

test.beforeEach(() => {
  resetGuardrailsForTests({ registerDefaults: false });
  visionCallCount = 0;
  mockSettings = {
    visionBridgeEnabled: true,
    visionBridgeModel: "openai/gpt-4o-mini",
    visionBridgePrompt: "Describe this image concisely.",
    visionBridgeTimeout: 30000,
    visionBridgeMaxImages: 10,
  };
});

function createContext(overrides: Partial<GuardrailContext> = {}): GuardrailContext {
  return { model: "command-code/gpt-5.4", log: console, ...overrides };
}

function imagePayload(model: string) {
  return {
    model,
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "What is in this image?" },
          {
            type: "image_url",
            image_url: { url: "https://example.com/image.png" },
          },
        ],
      },
    ],
  };
}

// ── Sanity: capabilities must resolve first ─────────────────────────────────

test("CC-VB-SANITY: getResolvedModelCapabilities reports vision for CC models", () => {
  for (const modelId of [
    "command-code/gpt-5.5",
    "command-code/gpt-5.4",
    "command-code/gpt-5.3-codex",
    "command-code/gpt-5.4-mini",
    "command-code/claude-opus-4-7",
    "command-code/claude-sonnet-4-6",
    "command-code/claude-haiku-4-5-20251001",
    "command-code/moonshotai/Kimi-K2.6",
    "command-code/moonshotai/Kimi-K2.5",
    "command-code/Qwen/Qwen3.6-Plus",
  ]) {
    const caps = getResolvedModelCapabilities(modelId);
    assert.equal(caps.supportsVision, true, `${modelId} must have supportsVision: true`);
  }
});

// ── THE FIX: CC vision models pass through, no reroute ──────────────────────

test("CC-VB-01: gpt-5.5 via command-code does NOT reroute", async () => {
  const guardrail = createGuardrail();
  const payload = imagePayload("command-code/gpt-5.5");
  const result = await guardrail.preCall(payload, createContext({ model: "command-code/gpt-5.5" }));

  assert.strictEqual(result.block, false);
  assert.strictEqual(visionCallCount, 0, "must NOT call vision API");
  assert.strictEqual(result.modifiedPayload, undefined, "must not reroute");
});

test("CC-VB-02: gpt-5.4 via command-code does NOT reroute", async () => {
  const guardrail = createGuardrail();
  const payload = imagePayload("command-code/gpt-5.4");
  const result = await guardrail.preCall(payload, createContext({ model: "command-code/gpt-5.4" }));

  assert.strictEqual(result.block, false);
  assert.strictEqual(visionCallCount, 0);
  assert.strictEqual(result.modifiedPayload, undefined);
});

test("CC-VB-03: Kimi K2.6 via command-code does NOT reroute", async () => {
  const guardrail = createGuardrail();
  const payload = imagePayload("command-code/moonshotai/Kimi-K2.6");
  const result = await guardrail.preCall(
    payload,
    createContext({ model: "command-code/moonshotai/Kimi-K2.6" })
  );

  assert.strictEqual(result.block, false);
  assert.strictEqual(visionCallCount, 0);
  assert.strictEqual(result.modifiedPayload, undefined);
});

test("CC-VB-04: Qwen 3.6 Plus via command-code does NOT reroute", async () => {
  const guardrail = createGuardrail();
  const payload = imagePayload("command-code/Qwen/Qwen3.6-Plus");
  const result = await guardrail.preCall(
    payload,
    createContext({ model: "command-code/Qwen/Qwen3.6-Plus" })
  );

  assert.strictEqual(result.block, false);
  assert.strictEqual(visionCallCount, 0);
  assert.strictEqual(result.modifiedPayload, undefined);
});

test("CC-VB-05: Claude Opus 4.7 via command-code does NOT reroute", async () => {
  const guardrail = createGuardrail();
  const payload = imagePayload("command-code/claude-opus-4-7");
  const result = await guardrail.preCall(
    payload,
    createContext({ model: "command-code/claude-opus-4-7" })
  );

  assert.strictEqual(result.block, false);
  assert.strictEqual(visionCallCount, 0);
  assert.strictEqual(result.modifiedPayload, undefined);
});

test("CC-VB-06: all CC vision models pass through unmodified (loop)", async () => {
  const guardrail = createGuardrail();

  const models = [
    "command-code/gpt-5.5",
    "command-code/gpt-5.4",
    "command-code/gpt-5.3-codex",
    "command-code/gpt-5.4-mini",
    "command-code/claude-opus-4-7",
    "command-code/claude-opus-4-6",
    "command-code/claude-sonnet-4-6",
    "command-code/claude-haiku-4-5-20251001",
    "command-code/moonshotai/Kimi-K2.6",
    "command-code/moonshotai/Kimi-K2.5",
    "command-code/Qwen/Qwen3.6-Plus",
  ];

  for (const model of models) {
    visionCallCount = 0;
    const payload = imagePayload(model);
    const result = await guardrail.preCall(payload, createContext({ model }));

    assert.strictEqual(result.block, false, `${model}: must not block`);
    assert.strictEqual(visionCallCount, 0, `${model}: must not call vision API`);
    assert.strictEqual(result.modifiedPayload, undefined, `${model}: must not reroute`);
  }
});

// ── Regression: text-only CC models still handled correctly ─────────────────

test("CC-VB-REGRESSION: text-only deepseek-v4-pro via command-code still triggers guardrail", async () => {
  const guardrail = createGuardrail();
  const payload = imagePayload("command-code/deepseek/deepseek-v4-pro");
  const result = await guardrail.preCall(
    payload,
    createContext({ model: "command-code/deepseek/deepseek-v4-pro" })
  );

  assert.strictEqual(result.block, false);
  const caps = getResolvedModelCapabilities("command-code/deepseek/deepseek-v4-pro");
  if (caps.supportsVision !== true) {
    assert.ok(
      result.modifiedPayload !== undefined || visionCallCount > 0,
      "text-only model with images must trigger reroute or describe"
    );
  }
});
