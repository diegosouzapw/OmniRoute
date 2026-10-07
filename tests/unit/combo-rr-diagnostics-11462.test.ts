import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-rr-diag-11462-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const core = await import("../../src/lib/db/core.ts");
const { resetAllComboMetrics } = await import("../../open-sse/services/comboMetrics.ts");
const { resetAllCircuitBreakers } = await import("../../src/shared/utils/circuitBreaker.ts");
const { resetAll: resetAllSemaphores } =
  await import("../../open-sse/services/rateLimitSemaphore.ts");

function createLog() {
  return { info: () => {}, warn: () => {}, error: () => {}, debug: () => {} };
}
function failResponse() {
  return new Response(JSON.stringify({ error: { message: "upstream 500" } }), {
    status: 500,
    headers: { "content-type": "application/json" },
  });
}

test.beforeEach(() => {
  resetAllComboMetrics();
  resetAllCircuitBreakers();
  resetAllSemaphores();
});
test.after(() => {
  resetAllComboMetrics();
  resetAllCircuitBreakers();
  resetAllSemaphores();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
});

test(
  "#11462: round-robin combo's 'Maximum combo retry limit reached' 503 must carry " +
    "the combo diagnostics trace (poolSize/attemptOrder/excluded/terminalReason)",
  async () => {
    const result = await handleComboChat({
      body: { messages: [{ role: "user", content: "hi" }] },
      combo: {
        name: "rr-probe-11462",
        strategy: "round-robin",
        models: ["openai/rr-a", "anthropic/rr-b"],
        config: {
          maxRetries: 0,
          maxGlobalAttempts: 1,
          concurrencyPerModel: 1,
          queueTimeoutMs: 1000,
        },
      },
      handleSingleModel: async () => failResponse(),
      isModelAvailable: async () => true,
      log: createLog(),
      settings: null,
      relayOptions: null,
      allCombos: null,
    });

    assert.equal(result.status, 503);
    const body = await result.json();
    assert.equal(body.error.message, "Maximum combo retry limit reached");
    assert.ok(body.diagnostics, "round-robin 503 should carry a diagnostics field");
    assert.ok(typeof body.diagnostics.poolSize === "number");
    assert.ok(Array.isArray(body.diagnostics.attemptOrder));
    assert.ok(typeof body.diagnostics.terminalReason === "string");
  }
);
