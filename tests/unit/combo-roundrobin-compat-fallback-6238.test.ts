// Regression guard for #6238: a round-robin combo returned
// `503 all upstream accounts are unavailable` immediately when every
// compatibility-KEPT target was runtime-unavailable, without ever
// reconsidering a compatibility-REJECTED-but-healthy target. The compat
// pre-filter (filterTargetsByRequestCompatibility) drops request-incompatible
// targets BEFORE availability is known, and its `compatible.length === 0`
// safety net only fires when ALL targets are filtered — not when the kept
// targets later all turn out unavailable. The fix makes the rejected targets a
// genuine last-resort fallback tier.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-rr-compat-6238-"));
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
  "round-robin falls back to a compat-rejected healthy target instead of 503 " +
    "when every compat-kept target is unavailable (#6238)",
  async () => {
    // rr-a is tool-INCAPABLE → the tools-requiring request makes the compat
    // pre-filter reject it. rr-b/rr-c are tool-capable → kept, but both are
    // runtime-unavailable. Only the rejected rr-a is actually healthy.
    saveModelsDevCapabilities({
      openai: {
        "rr-a": capabilityEntry(128000, { tool_call: false }),
        "rr-b": capabilityEntry(128000),
        "rr-c": capabilityEntry(128000),
      },
    });

    const attempted: string[] = [];
    const availabilityChecks: string[] = [];

    const result = await handleComboChat({
      body: {
        messages: [{ role: "user", content: "Use a tool to look something up" }],
        tools: [{ type: "function", function: { name: "lookup_weather" } }],
      },
      combo: {
        name: "rr-compat-fallback-6238",
        strategy: "round-robin",
        models: ["openai/rr-a", "openai/rr-b", "openai/rr-c"],
        config: { maxRetries: 0, concurrencyPerModel: 1, queueTimeoutMs: 1000 },
      },
      handleSingleModel: async (_body, modelStr) => {
        attempted.push(modelStr);
        return okResponse({ choices: [{ message: { content: `served by ${modelStr}` } }] });
      },
      // Only the compat-rejected rr-a is healthy; the compat-kept rr-b/rr-c
      // are all runtime-unavailable.
      isModelAvailable: async (modelStr) => {
        availabilityChecks.push(modelStr);
        return modelStr === "openai/rr-a";
      },
      log: createLog(),
      settings: null,
      relayOptions: null,
      allCombos: null,
    });

    // Before the fix this returned 503 ALL_ACCOUNTS_INACTIVE without ever
    // attempting rr-a. After the fix the compat-rejected-but-healthy rr-a
    // serves the request.
    assert.equal(result.status, 200, "expected a 200 from the compat-rejected fallback, not 503");
    assert.equal(result.ok, true);
    assert.deepEqual(attempted, ["openai/rr-a"], "only the healthy compat-rejected target is used");

    const payload = await result.json();
    assert.equal(payload.choices[0].message.content, "served by openai/rr-a");
    // Sanity: the compat-kept rr-b/rr-c were probed for availability first.
    assert.ok(
      availabilityChecks.includes("openai/rr-b") || availabilityChecks.includes("openai/rr-c"),
      "compat-kept targets should be probed before the last-resort fallback"
    );
  }
);
