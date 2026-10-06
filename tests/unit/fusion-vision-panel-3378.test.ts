// Regression guard for upstream decolua/9router#3378: "Fusion combo sometimes
// can't see images even when all models support vision".
//
// Every non-fusion combo strategy runs the request through
// filterTargetsByRequestCompatibility (comboStructure.ts) before dispatch, which
// treats a target whose vision support is not *confirmed* `=== true` (unknown OR
// false) as vision-incompatible and excludes it (#8332). The fusion dispatch
// branch (dispatchPrelude.ts::tryFusionDispatch) resolves its panel via the raw
// resolveComboTargets() and skips that compat filter entirely — so a panel
// member whose model id is unrecognized by the capability registry (and thus
// resolves to supportsVision !== true) still receives the unmodified
// image-bearing body, without any signal that its capability could not be
// confirmed.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-fusion-vision-3378-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "fusion-vision-3378-test-secret";

const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { saveModelsDevCapabilities, clearModelsDevCapabilities } =
  await import("../../src/lib/modelsDevSync.ts");
const { resetAllComboMetrics } = await import("../../open-sse/services/comboMetrics.ts");
const { resetAllCircuitBreakers } = await import("../../src/shared/utils/circuitBreaker.ts");
const { resetAll: resetAllSemaphores } =
  await import("../../open-sse/services/rateLimitSemaphore.ts");
const core = await import("../../src/lib/db/core.ts");

function createLog() {
  return { info: () => {}, warn: () => {}, error: () => {}, debug: () => {} };
}

function okResponse(content: string) {
  return new Response(JSON.stringify({ choices: [{ message: { role: "assistant", content } }] }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

function capabilityEntry(overrides: Record<string, unknown> = {}) {
  return {
    tool_call: true,
    reasoning: false,
    attachment: false,
    structured_output: true,
    temperature: true,
    modalities_input: JSON.stringify(["text"]),
    modalities_output: JSON.stringify(["text"]),
    knowledge_cutoff: null,
    release_date: null,
    last_updated: null,
    status: null,
    family: null,
    open_weights: false,
    limit_context: 128000,
    limit_input: 128000,
    limit_output: 4096,
    interleaved_field: null,
    ...overrides,
  };
}

const imageRequestBody = {
  messages: [
    {
      role: "user",
      content: [
        { type: "text", text: "What is in this image?" },
        { type: "image_url", image_url: { url: "https://example.com/cat.png" } },
      ],
    },
  ],
};

test.beforeEach(() => {
  resetAllComboMetrics();
  resetAllCircuitBreakers();
  resetAllSemaphores();
  clearModelsDevCapabilities();
});

test.after(() => {
  resetAllComboMetrics();
  resetAllCircuitBreakers();
  resetAllSemaphores();
  clearModelsDevCapabilities();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
});

test(
  "fusion panel must not dispatch an image_url request to a member whose vision " +
    "support cannot be confirmed (#3378)",
  async () => {
    // fusion-vision-a is confirmed vision-capable. fusion-unknown has no
    // capability entry at all (unrecognized id) -> getResolvedModelCapabilities
    // resolves supportsVision to something other than `true`, exactly like the
    // "unknown id silently treated as no vision" failure mode from the upstream
    // report.
    saveModelsDevCapabilities({
      openai: {
        "fusion-vision-a": capabilityEntry({ attachment: true }),
      },
    });

    const dispatched: string[] = [];
    const result = await handleComboChat({
      body: imageRequestBody,
      combo: {
        name: "fusion-vision-panel-3378",
        strategy: "fusion",
        models: ["openai/fusion-vision-a", "openai/fusion-unknown"],
        config: { judgeModel: "openai/fusion-vision-a" },
      },
      handleSingleModel: async (_body, modelStr) => {
        dispatched.push(modelStr);
        return okResponse(`answer from ${modelStr}`);
      },
      log: createLog(),
      settings: {},
      allCombos: [],
    });

    assert.ok(result.status < 500, "combo call should not hard-fail");
    assert.ok(
      !dispatched.includes("openai/fusion-unknown"),
      "a panel member with unconfirmed vision support must never receive the raw image_url body"
    );
  }
);
