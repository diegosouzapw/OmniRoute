/**
 * Vision Bridge × named-combo reroute tests.
 *
 * Regression: a named combo whose targets have ZERO vision-capable models was
 * never reroute-eligible. The bridge only described images for it, and when
 * the describe path could not run (unreachable bridge model, failed self-loop,
 * missing credentials) the raw images stayed in the payload, the combo
 * capability filter excluded every target, and the request died with
 * capability_mismatch — "vision bridge does not affect combo models".
 *
 * Fix under test: `getComboVisionBridgeDecision` returns "no-vision" for a
 * combo with model targets but no vision-capable target, and preCall treats
 * that decision as reroute-eligible (mirroring non-combo text-only models),
 * falling back to describe only when no usable reroute target exists.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-vb-combo-reroute-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { VisionBridgeGuardrail, getComboVisionBridgeDecision } =
  await import("../../../src/lib/guardrails/visionBridge.ts");
const { resetGuardrailsForTests } = await import("../../../src/lib/guardrails/registry.ts");
const { getResolvedModelCapabilities } = await import("../../../src/lib/modelCapabilities.ts");
const core = await import("../../../src/lib/db/core.ts");
const combosDb = await import("../../../src/lib/db/combos.ts");
const mappingsDb = await import("../../../src/lib/db/modelComboMappings.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function createCombo(name, models, overrides = {}) {
  return combosDb.createCombo({
    name,
    models,
    strategy: "priority",
    ...overrides,
  });
}

// ── Fixtures ────────────────────────────────────────────────────────────────

const VISION_MODEL = "openai/gpt-4o";
const TEXT_MODEL_A = "google/gemma-2-27b";
const TEXT_MODEL_B = "mistral/mistral-large-latest";

// Fail loudly if the static vision heuristic drifts: these fixtures drive
// every assertion in this file.
test("fixture models have the expected static vision capability", () => {
  assert.equal(getResolvedModelCapabilities(VISION_MODEL).supportsVision, true);
  assert.notEqual(getResolvedModelCapabilities(TEXT_MODEL_A).supportsVision, true);
  assert.notEqual(getResolvedModelCapabilities(TEXT_MODEL_B).supportsVision, true);
});

const mockSettings = {
  visionBridgeEnabled: true,
  visionBridgeModel: VISION_MODEL,
  visionBridgePrompt: "Describe this image concisely.",
  visionBridgeTimeout: 30000,
  visionBridgeMaxImages: 10,
};

let visionCallCount = 0;

// Each describe-path test uses a UNIQUE prompt: the shared describe cache keys
// on (contentRef, prompt, model), so a reused prompt would serve a cached
// description and skip callVisionModel, breaking the assertion on call count.
function createGuardrail(depsOverrides = {}, prompt = "Describe this image concisely.") {
  return new VisionBridgeGuardrail({
    deps: {
      getSettings: async () => ({ ...mockSettings, visionBridgePrompt: prompt }),
      callVisionModel: async () => {
        visionCallCount++;
        return "A red circle on a white background";
      },
      // null = fail-open (no credential DB in unit tests), matching the
      // existing visionBridge.test.ts convention.
      hasUsableCredentials: async () => null,
      ...depsOverrides,
    },
  });
}

const IMAGE_PAYLOAD = {
  model: "text-only-combo",
  messages: [
    {
      role: "user",
      content: [
        { type: "text", text: "Describe this image in one sentence." },
        {
          type: "image_url",
          image_url: {
            url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
          },
        },
      ],
    },
  ],
};

function hasImagePart(messages) {
  return JSON.stringify(messages).includes("image_url");
}

// GuardrailResult<unknown> types modifiedPayload as `unknown`; the existing
// visionBridge.test.ts casts it the same way.
type ModifiedBody = { model?: string; messages?: unknown[] };
function asModifiedBody(result: { modifiedPayload?: unknown }): ModifiedBody {
  return (result.modifiedPayload ?? {}) as ModifiedBody;
}

// ── getComboVisionBridgeDecision ────────────────────────────────────────────

test("decision: combo with zero vision-capable targets returns 'no-vision'", async () => {
  await createCombo("text-only-combo", [
    { provider: "google", model: TEXT_MODEL_A },
    { provider: "mistral", model: TEXT_MODEL_B },
  ]);
  assert.equal(await getComboVisionBridgeDecision("text-only-combo"), "no-vision");
});

test("decision: combo with all vision-capable targets returns 'skip'", async () => {
  await createCombo("vision-combo", [
    { provider: "openai", model: VISION_MODEL },
    { provider: "anthropic", model: "anthropic/claude-sonnet-4-20250514" },
  ]);
  assert.equal(await getComboVisionBridgeDecision("vision-combo"), "skip");
});

test("decision: explicit combo/ prefix resolves the stored bare combo name", async () => {
  await createCombo("prefixed-vision-combo", [{ provider: "openai", model: VISION_MODEL }]);
  assert.equal(await getComboVisionBridgeDecision("combo/prefixed-vision-combo"), "skip");
});

test("decision: mixed combo (some vision, some not) returns 'process'", async () => {
  await createCombo("mixed-combo", [
    { provider: "openai", model: VISION_MODEL },
    { provider: "google", model: TEXT_MODEL_A },
  ]);
  assert.equal(await getComboVisionBridgeDecision("mixed-combo"), "process");
});

test("decision: unknown model returns 'not-combo'", async () => {
  assert.equal(await getComboVisionBridgeDecision("not-a-combo"), "not-combo");
});

test("decision: model-combo mapping routes to the combo decision", async () => {
  const combo = await createCombo("mapped-text-only", [
    { provider: "google", model: TEXT_MODEL_A },
  ]);
  await mappingsDb.createModelComboMapping({
    pattern: "mapped-model-alias",
    comboId: combo.id as string,
    priority: 20,
    description: "test alias",
  });
  assert.equal(await getComboVisionBridgeDecision("mapped-model-alias"), "no-vision");
});

// ── preCall: no-vision combo reroutes whole request ─────────────────────────

test("preCall: zero-vision combo reroutes the whole request to the bridge model", async () => {
  resetGuardrailsForTests({ registerDefaults: false });
  await createCombo("text-only-combo", [
    { provider: "google", model: TEXT_MODEL_A },
    { provider: "mistral", model: TEXT_MODEL_B },
  ]);
  visionCallCount = 0;
  const guardrail = createGuardrail();
  const result = await guardrail.preCall(IMAGE_PAYLOAD, {});

  assert.equal(result.block, false);
  // Rerouted: model swapped to the vision bridge model, image bytes KEPT.
  assert.equal(asModifiedBody(result).model, VISION_MODEL);
  assert.equal(result.meta.rerouted, true);
  assert.equal(result.meta.fromModel, "text-only-combo");
  assert.equal(hasImagePart(asModifiedBody(result).messages), true);
  // Describe never ran — no extra vision call.
  assert.equal(visionCallCount, 0);
});

test("preCall: zero-vision combo falls back to describe when reroute target is unusable", async () => {
  resetGuardrailsForTests({ registerDefaults: false });
  await createCombo("text-only-combo", [{ provider: "google", model: TEXT_MODEL_A }]);
  visionCallCount = 0;
  // Reroute target has no usable credentials → describe path must run.
  const guardrail = createGuardrail(
    { hasUsableCredentials: async () => false },
    "Describe the fallback image."
  );
  const result = await guardrail.preCall(IMAGE_PAYLOAD, {});

  assert.equal(result.block, false);
  assert.equal(result.meta.rerouted, undefined);
  // Images replaced with the described text; combo model kept.
  assert.equal(asModifiedBody(result).model, "text-only-combo");
  assert.equal(hasImagePart(asModifiedBody(result).messages), false);
  assert.equal(visionCallCount, 1);
});

test("preCall: no-vision combo, unusable reroute target AND describe failure -> stub text", async () => {
  resetGuardrailsForTests({ registerDefaults: false });
  await createCombo("text-only-combo", [{ provider: "google", model: TEXT_MODEL_A }]);
  visionCallCount = 0;
  // Double failure: the reroute target has no usable credentials AND the
  // describe call fails for every image. The allNull stub fallback must fire
  // for "no-vision" too — otherwise the raw images stay in the payload, the
  // combo capability filter rejects every target, and the original
  // capability_mismatch recurs.
  const guardrail = createGuardrail(
    {
      hasUsableCredentials: async () => false,
      callVisionModel: async () => {
        visionCallCount++;
        throw new Error("no vision-capable provider connected");
      },
    },
    "Describe the double-failure image."
  );
  const result = await guardrail.preCall(IMAGE_PAYLOAD, {});

  assert.equal(result.block, false);
  assert.equal(result.meta.rerouted, undefined);
  // Combo model kept; raw image replaced with the stub text.
  assert.equal(asModifiedBody(result).model, "text-only-combo");
  assert.equal(hasImagePart(asModifiedBody(result).messages), false);
  assert.match(
    JSON.stringify(asModifiedBody(result).messages),
    /\(unavailable — no vision-capable provider connected\)/
  );
  assert.equal(visionCallCount, 1);
});

test("preCall: zero-vision combo with no images is left untouched", async () => {
  resetGuardrailsForTests({ registerDefaults: false });
  await createCombo("text-only-combo", [{ provider: "google", model: TEXT_MODEL_A }]);
  visionCallCount = 0;
  const guardrail = createGuardrail();
  const result = await guardrail.preCall(
    {
      model: "text-only-combo",
      messages: [{ role: "user", content: "no images here" }],
    },
    {}
  );
  assert.equal(result.block, false);
  assert.equal(result.modifiedPayload, undefined);
  assert.equal(visionCallCount, 0);
});

// ── preCall: unchanged semantics for other combo shapes ─────────────────────

test("preCall: all-vision combo still skips the bridge entirely", async () => {
  resetGuardrailsForTests({ registerDefaults: false });
  await createCombo("vision-combo", [{ provider: "openai", model: VISION_MODEL }]);
  visionCallCount = 0;
  const guardrail = createGuardrail();
  const result = await guardrail.preCall({ ...IMAGE_PAYLOAD, model: "vision-combo" }, {});
  assert.equal(result.block, false);
  assert.equal(result.modifiedPayload, undefined);
  assert.equal(visionCallCount, 0);
});

test("preCall: mixed combo keeps the describe path (no reroute, model unchanged)", async () => {
  resetGuardrailsForTests({ registerDefaults: false });
  await createCombo("mixed-combo", [
    { provider: "openai", model: VISION_MODEL },
    { provider: "google", model: TEXT_MODEL_A },
  ]);
  visionCallCount = 0;
  const guardrail = createGuardrail({}, "Describe the mixed-combo image.");
  const result = await guardrail.preCall({ ...IMAGE_PAYLOAD, model: "mixed-combo" }, {});

  assert.equal(result.block, false);
  // Mixed combo is NOT reroute-eligible: model stays, images described.
  assert.equal(result.meta.rerouted, undefined);
  assert.equal(asModifiedBody(result).model, "mixed-combo");
  assert.equal(hasImagePart(asModifiedBody(result).messages), false);
  assert.equal(visionCallCount, 1);
});
