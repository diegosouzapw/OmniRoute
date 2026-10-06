/**
 * Regression: the Vision Bridge describe cache must be keyed on the BASE
 * prompt (`config.prompt`), not the task-aware composed prompt.
 *
 * Zoo Code (Claude Code protocol) resends the FULL transcript on every turn.
 * A text-only follow-up turn still carries the turn-1 image inside the
 * history, so `extractImageParts` keeps finding it and the bridge re-enters
 * the describe path. When the cache key embeds the composed prompt — which
 * appends the LAST user text via `composeVisionPrompt` — every new turn
 * produces a different key, missing the shared cache and re-calling the
 * vision model (e.g. mimo-v2.5) even though the image bytes are identical.
 *
 * Fix: key the cache on the stable base prompt so an unchanged image in the
 * history reuses the cached description. The task-aware composed prompt is
 * still what the vision model receives on the first describe.
 *
 * Run: node --import tsx/esm --test tests/unit/guardrails/vision-bridge-cache-key.test.ts
 */
import test from "node:test";
import assert from "node:assert/strict";

const { VisionBridgeGuardrail } = await import("../../../src/lib/guardrails/visionBridge.ts");
const { resetGuardrailsForTests } = await import("../../../src/lib/guardrails/registry.ts");
const { getResolvedModelCapabilities } = await import("../../../src/lib/modelCapabilities.ts");
import type { GuardrailContext } from "../../../src/lib/guardrails/base.ts";
import type { VisionModelConfig } from "../../../src/lib/guardrails/visionBridgeHelpers.ts";

const TEXT_ONLY_MODEL = "command-code/deepseek/deepseek-v4-pro";

// Unique data-URI images per test → no cross-test cache pollution (the shared
// describe cache is a process-wide singleton). These are 1x1 PNGs; the
// describe path never fetches them over the network.
const IMAGE_A =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
const IMAGE_B =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=";
const IMAGE_C = "https://example.com/third.png";

let mockSettings: Record<string, unknown>;
let visionCallCount = 0;
let capturedPrompts: string[] = [];

function createGuardrail() {
  return new VisionBridgeGuardrail({
    deps: {
      getSettings: async () => mockSettings,
      callVisionModel: async (_img: string, config: VisionModelConfig) => {
        visionCallCount++;
        capturedPrompts.push(config.prompt);
        return "A black labrador puppy on a wooden floor";
      },
      // Fail-open (null): no credential DB in this unit test.
      hasUsableCredentials: async () => null,
    },
  });
}

test.beforeEach(() => {
  resetGuardrailsForTests({ registerDefaults: false });
  visionCallCount = 0;
  capturedPrompts = [];
  mockSettings = {
    // New modalityBridge* keys (PR-1). Mode forced to "describe" so the
    // whole-request reroute block is skipped and only the describe path runs.
    modalityBridgeVisionMode: "describe",
    modalityBridgeVisionModel: "openai/gpt-4o-mini",
    modalityBridgeVisionPrompt: "VB-CACHE-KEY: Describe this image concisely.",
    modalityBridgeVisionTimeout: 30000,
    modalityBridgeVisionMaxImages: 10,
    modalityBridgeCacheEnabled: true,
    modalityBridgeCacheTtlMinutes: 60,
    modalityBridgeCacheMaxEntries: 200,
  };
});

function createContext(overrides: Partial<GuardrailContext> = {}): GuardrailContext {
  return { model: TEXT_ONLY_MODEL, log: console, ...overrides };
}

// Fail loudly if the static capability drift makes the fixture invalid: the
// describe path only runs for non-vision models.
test("VB-CACHE-FIXTURE: text-only model resolves without vision support", () => {
  assert.notEqual(
    getResolvedModelCapabilities(TEXT_ONLY_MODEL).supportsVision,
    true,
    `${TEXT_ONLY_MODEL} must be text-only for this regression`
  );
});

function turn1Payload(imageUri: string) {
  return {
    model: TEXT_ONLY_MODEL,
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "What's in this image?" },
          { type: "image_url", image_url: { url: imageUri } },
        ],
      },
    ],
  };
}

// Zoo Code resends the FULL transcript: turn-1 user message (with the image),
// the assistant reply, and the new text-only follow-up.
function turn2Payload(imageUri: string) {
  return {
    model: TEXT_ONLY_MODEL,
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "What's in this image?" },
          { type: "image_url", image_url: { url: imageUri } },
        ],
      },
      { role: "assistant", content: "A black labrador puppy on a wooden floor." },
      { role: "user", content: "Now what is 2+2?" },
    ],
  };
}

test("VB-CACHE-01: same image in history reuses the cached description across turns", async () => {
  const guardrail = createGuardrail();

  // Turn 1: image present → describe once.
  const first = await guardrail.preCall(turn1Payload(IMAGE_A), createContext());
  assert.strictEqual(first.block, false);
  assert.ok(first.modifiedPayload, "turn 1 must describe the image");
  assert.strictEqual(visionCallCount, 1, "turn 1 must call the vision model once");
  // Task-aware prompt must reach the vision model on the first describe.
  assert.ok(
    capturedPrompts[0].includes("What's in this image?"),
    "task-aware composed prompt must be used for the first describe"
  );

  // Turn 2: full transcript resent; image unchanged in history, only the last
  // user text changed. The cached description must be reused → NO new call.
  const second = await guardrail.preCall(turn2Payload(IMAGE_A), createContext());
  assert.strictEqual(second.block, false);
  assert.ok(second.modifiedPayload, "turn 2 must still splice the description");
  assert.strictEqual(
    visionCallCount,
    1,
    "an unchanged image in the history must hit the cache, not re-describe"
  );
});

test("VB-CACHE-02: a NEW image still forces a fresh vision call", async () => {
  const guardrail = createGuardrail();

  // Turn 1 with a unique image (IMAGE_B — never used by VB-CACHE-01).
  await guardrail.preCall(turn1Payload(IMAGE_B), createContext());
  assert.strictEqual(visionCallCount, 1, "first describe of IMAGE_B must call once");

  // Turn 2 with a DIFFERENT image URL (IMAGE_C) → new contentRef → miss → call.
  const second = await guardrail.preCall(
    {
      model: TEXT_ONLY_MODEL,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "What about this one?" },
            { type: "image_url", image_url: { url: IMAGE_C } },
          ],
        },
      ],
    },
    createContext()
  );
  assert.strictEqual(second.block, false);
  assert.strictEqual(visionCallCount, 2, "a different image must be re-described");
});
