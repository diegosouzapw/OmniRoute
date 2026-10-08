import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const testDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-breaker-combo-"));
const originalDataDir = process.env.DATA_DIR;
process.env.DATA_DIR = testDataDir;

const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { getComboMetrics, resetAllComboMetrics } =
  await import("../../open-sse/services/comboMetrics.ts");
const { getCircuitBreaker, resetAllCircuitBreakers } =
  await import("../../src/shared/utils/circuitBreaker.ts");
const { rrCounters, rrStickyTargets } = await import("../../open-sse/services/combo/rrState.ts");
const dbCore = await import("../../src/lib/db/core.ts");

const log = { info() {}, warn() {}, debug() {}, error() {} };
function localRefusal(): Response {
  return new Response(
    JSON.stringify({ error: { code: "provider_circuit_open", message: "Circuit open" } }),
    {
      status: 503,
      headers: { "content-type": "application/json", "x-omniroute-provider-breaker": "open" },
    }
  );
}

test.beforeEach(() => {
  resetAllCircuitBreakers();
  resetAllComboMetrics();
  rrCounters.clear();
  rrStickyTargets.clear();
});

test.after(() => {
  dbCore.resetDbInstance?.();
  if (originalDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = originalDataDir;
  fs.rmSync(testDataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

for (const strategy of ["priority", "round-robin"] as const) {
  test(`${strategy}: local provider refusal advances without retry or provider failure`, async () => {
    const name = `local-breaker-${strategy}`;
    const calls: string[] = [];
    const result = await handleComboChat({
      body: {},
      combo: {
        name,
        strategy,
        models: ["openai/model-a", "anthropic/model-b"],
        config: { maxRetries: 2, retryDelayMs: 1, disableSessionStickiness: true },
      },
      handleSingleModel: async (_body: unknown, modelStr: string) => {
        calls.push(modelStr);
        return modelStr === "openai/model-a"
          ? localRefusal()
          : Response.json({ choices: [{ message: { role: "assistant", content: "ok" } }] });
      },
      isModelAvailable: async () => true,
      log,
      settings: null,
      relayOptions: null,
      allCombos: null,
    });
    assert.equal(result.status, 200);
    assert.deepEqual(calls, ["openai/model-a", "anthropic/model-b"]);
    assert.equal(getCircuitBreaker("openai").failureCount, 0);
    assert.equal(getComboMetrics(name).byModel["openai/model-a"].requests, 1);
  });
}

test("priority still records a genuine upstream 503 against its provider", async () => {
  const calls: string[] = [];
  const result = await handleComboChat({
    body: {},
    combo: {
      name: "upstream-breaker-503",
      strategy: "priority",
      models: ["openai/model-a", "anthropic/model-b"],
      config: { maxRetries: 0 },
    },
    handleSingleModel: async (_body: unknown, modelStr: string) => {
      calls.push(modelStr);
      return modelStr === "openai/model-a"
        ? new Response(JSON.stringify({ error: { message: "upstream unavailable" } }), {
            status: 503,
            headers: { "content-type": "application/json" },
          })
        : Response.json({ choices: [{ message: { role: "assistant", content: "ok" } }] });
    },
    isModelAvailable: async () => true,
    log,
    settings: null,
    relayOptions: null,
    allCombos: null,
  });
  assert.equal(result.status, 200);
  assert.deepEqual(calls, ["openai/model-a", "anthropic/model-b"]);
  assert.equal(getCircuitBreaker("openai").failureCount, 1);
});
