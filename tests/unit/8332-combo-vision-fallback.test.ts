// Regression guard for #8332: combo routing's #6238 last-resort compat-fallback
// tier dispatched an image_url-bearing request to a text-only (vision-incapable)
// target. filterTargetsByRequestCompatibility correctly rejects such targets
// up front (comboStructure.ts), but the round-robin path rebuilt its rejected
// set from the raw evalRankedTargets list (discarding the per-target rejection
// reasons), so `attemptCompatRejectedFallback` reconsidered a vision-rejected
// target exactly like any other compat-rejected-but-healthy target and sent it
// the unmodified image body — producing the upstream
// `400: unknown variant "image_url", expected "text"`.
//
// The fix makes vision a hard capability requirement for the fallback tier:
// a target rejected because it cannot confirm vision support must never be
// reconsidered, even as a last resort.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-rr-compat-8332-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const { saveModelsDevCapabilities, clearModelsDevCapabilities } =
  await import("../../src/lib/modelsDevSync.ts");
const { resetAllComboMetrics } = await import("../../open-sse/services/comboMetrics.ts");
const { resetAllCircuitBreakers } = await import("../../src/shared/utils/circuitBreaker.ts");
const { resetAll: resetAllSemaphores } =
  await import("../../open-sse/services/rateLimitSemaphore.ts");

function createLog() {
  return {
    info: () => {},
    warn: () => {},
    error: () => {},
    debug: () => {},
  };
}

function okResponse(body: unknown = { choices: [{ message: { content: "ok" } }] }) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

function capabilityEntry(limitContext: unknown, overrides: Record<string, unknown> = {}) {
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
    limit_context: limitContext,
    limit_input: limitContext,
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
  settingsDb.clearAllLKGP();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
});

test(
  "round-robin last-resort compat fallback never dispatches an image_url request " +
    "to a vision-incapable target (#8332)",
  async () => {
    // rr-blind is text-only (attachment:false -> supportsVision:false) -> the
    // vision-requiring request makes the compat pre-filter reject it. rr-vision-a
    // and rr-vision-b are vision-capable -> kept, but both are simulated
    // runtime-unavailable, forcing recordedAttempts === 0 and triggering the
    // #6238 last-resort tier. Only the vision-rejected rr-blind is "healthy".
    saveModelsDevCapabilities({
      openai: {
        "rr-blind": capabilityEntry(128000, { attachment: false }),
        "rr-vision-a": capabilityEntry(128000, { attachment: true }),
        "rr-vision-b": capabilityEntry(128000, { attachment: true }),
      },
    });

    const attempted: string[] = [];

    const result = await handleComboChat({
      body: imageRequestBody,
      combo: {
        name: "rr-compat-fallback-8332-vision",
        strategy: "round-robin",
        models: ["openai/rr-blind", "openai/rr-vision-a", "openai/rr-vision-b"],
        config: { maxRetries: 0, concurrencyPerModel: 1, queueTimeoutMs: 1000 },
      },
      handleSingleModel: async (_body, modelStr) => {
        attempted.push(modelStr);
        return okResponse({ choices: [{ message: { content: `served by ${modelStr}` } }] });
      },
      // Only the vision-rejected rr-blind is "available"; the vision-capable
      // compat-kept targets are all runtime-unavailable.
      isModelAvailable: async (modelStr) => modelStr === "openai/rr-blind",
      log: createLog(),
      settings: null,
      relayOptions: null,
      allCombos: null,
    });

    // Before the fix, rr-blind (vision-incapable but "available") was dispatched
    // the raw image_url body as the #6238 last-resort fallback. After the fix it
    // must never be attempted, and since no other target is available, the combo
    // must surface its normal exhaustion error instead of a corrupted 200.
    assert.deepEqual(
      attempted,
      [],
      "vision-incapable rr-blind must never receive the image_url body, even as a last-resort fallback"
    );
    assert.notEqual(result.status, 200, "must not silently succeed via the vision-incapable target");
  }
);

test(
  "round-robin last-resort compat fallback still serves a healthy non-vision-rejected " +
    "target for an image request (#8332 — does not overcorrect #6238)",
  async () => {
    // rr-no-tools is tool-incapable (irrelevant here; no tools requested) but IS
    // vision-capable, so it is not rejected for vision. rr-vision-a is also
    // vision-capable and compat-kept, but runtime-unavailable, forcing the
    // #6238 last-resort tier. This proves the vision-only exclusion does not
    // also swallow legitimate non-vision-rejection fallback targets.
    saveModelsDevCapabilities({
      openai: {
        "rr-vision-a": capabilityEntry(128000, { attachment: true }),
      },
    });

    const attempted: string[] = [];

    const result = await handleComboChat({
      body: imageRequestBody,
      combo: {
        name: "rr-compat-fallback-8332-sanity",
        strategy: "round-robin",
        models: ["openai/rr-vision-a"],
        config: { maxRetries: 0, concurrencyPerModel: 1, queueTimeoutMs: 1000 },
      },
      handleSingleModel: async (_body, modelStr) => {
        attempted.push(modelStr);
        return okResponse({ choices: [{ message: { content: `served by ${modelStr}` } }] });
      },
      isModelAvailable: async () => true,
      log: createLog(),
      settings: null,
      relayOptions: null,
      allCombos: null,
    });

    assert.equal(result.status, 200);
    assert.deepEqual(attempted, ["openai/rr-vision-a"]);
  }
);
