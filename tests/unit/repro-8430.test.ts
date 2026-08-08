import test from "node:test";
import assert from "node:assert/strict";

const { VisionBridgeGuardrail } = await import("../../src/lib/guardrails/visionBridge.ts");
const { resetGuardrailsForTests } = await import("../../src/lib/guardrails/registry.ts");
const { getBestVisionModel } = await import("../../src/lib/guardrails/visionBridgeRouter.ts");
import type { GuardrailContext } from "../../src/lib/guardrails/base.ts";
import type { VisionModelConfig } from "../../src/lib/guardrails/visionBridgeHelpers.ts";

const mockSettings: Record<string, unknown> = {
  visionBridgeEnabled: true,
  visionBridgePrompt: "Describe this image concisely.",
  visionBridgeTimeout: 30000,
  visionBridgeMaxImages: 10,
};

function createGuardrail(options?: Parameters<typeof VisionBridgeGuardrail>[0]) {
  return new VisionBridgeGuardrail({
    ...options,
    deps: {
      getSettings: async () => mockSettings,
      callVisionModel: async (_i: string, _c: VisionModelConfig) => {
        throw new Error("Vision API error 401: Missing API key");
      },
      hasUsableCredentials: async () => false,
      ...(options?.deps ?? {}),
    },
  });
}

function createContext(o: Partial<GuardrailContext> = {}): GuardrailContext {
  return { model: "deepseek/deepseek-v4-pro", log: console, ...o };
}

function createPayload(o: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    model: "deepseek/deepseek-v4-pro",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "What is in this image?" },
          { type: "image_url", image_url: { url: "https://example.com/image.png" } },
        ],
      },
    ],
    ...o,
  };
}

test.beforeEach(() => { resetGuardrailsForTests({ registerDefaults: false }); });

test("8430a: getBestVisionModel returns null when every vision-capable candidate is unusable", async () => {
  const model = await getBestVisionModel({}, { hasUsableCredentials: async () => false });
  assert.strictEqual(model, null, `no vision provider reachable, but returned unreachable '${model}'`);
});

test("8430b: fixedModel describe-path target must not be an unreachable model", async () => {
  const model = await getBestVisionModel(
    { fixedModel: "openai/gpt-4o-mini" },
    { hasUsableCredentials: async () => false }
  );
  assert.strictEqual(model, null, `fixedModel short-circuit returned unreachable '${model}'`);
});

test("8430c: describe path does not forward raw image when no vision provider is reachable", async () => {
  const guardrail = createGuardrail({
    deps: { checkModelHasComboMapping: async (_m: string) => true },
  });
  const result = await guardrail.preCall(createPayload(), createContext());
  assert.strictEqual(result.block, false);
  assert.ok(result.modifiedPayload, "expected a modified payload");
  const modified = result.modifiedPayload as {
    messages: Array<{ content: Array<{ type: string; text?: string }> }>;
  };
  const content = modified.messages[0].content;
  const imagePart = content.find((p) => p.type === "image_url" || p.type === "image");
  assert.strictEqual(imagePart, undefined, "raw image forwarded with no clear error (ask #2 unimplemented)");
});