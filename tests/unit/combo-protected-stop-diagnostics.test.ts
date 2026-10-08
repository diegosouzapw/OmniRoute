import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-protected-diag-"));
const previousDataDir = process.env.DATA_DIR;
process.env.DATA_DIR = dataDir;
const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { getComboTrace, resetComboTraceStore } =
  await import("../../open-sse/services/combo/decisionTrace.ts");
const { resetAllCircuitBreakers } = await import("../../src/shared/utils/circuitBreaker.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

test.beforeEach(() => {
  resetAllCircuitBreakers();
  resetComboTraceStore();
});
test.after(() => {
  resetAllCircuitBreakers();
  resetDbInstance();
  if (previousDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = previousDataDir;
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function run(primaryFails: boolean) {
  const calls: string[] = [];
  const response = await handleComboChat({
    body: {},
    combo: {
      name: "synthetic-protected-fallback",
      strategy: "priority",
      models: [
        { model: "openai/primary" },
        { model: "claude/reserve", fallbackOnlyOnQuotaExhaustion: true },
      ],
      config: { maxRetries: 0, maxSetRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
    },
    isModelAvailable: (model) => model === "openai/primary",
    handleSingleModel: async (_body, model) => {
      calls.push(model);
      return new Response(
        JSON.stringify(
          primaryFails
            ? { error: { message: "Upstream response failed", type: "server_error" } }
            : { choices: [{ message: { content: "ok" } }] }
        ),
        {
          status: primaryFails ? 502 : 200,
          headers: { "content-type": "application/json" },
        }
      );
    },
    log: { info() {}, warn() {}, debug() {}, error() {} },
    settings: null,
    allCombos: null,
  });
  return {
    response,
    calls,
    trace: getComboTrace(response.headers.get("x-omniroute-combo-trace")!),
  };
}

test("protected fallback refusal must not record a successful terminal trace", async () => {
  const { response, calls, trace } = await run(true);
  assert.equal(response.status, 503);
  assert.deepEqual(calls, ["openai/primary"]);
  assert.equal(trace?.terminal?.status, response.status);
});

test("protected fallback refusal preserves evidence of the earlier upstream failure", async () => {
  const { response } = await run(true);
  const body = await response.json();
  assert.equal(response.status, 503, "keep the protected-stop policy status");
  assert.match(body.error.message, /claude\/reserve.*unavailable/);
  assert.match(body.error.message, /openai\/primary.*502/);
  assert.equal(body.diagnostics.attempted, 1);
  assert.equal(body.diagnostics.terminalReason, "protected_priority_stop");
});

test("healthy primary still returns its original response and a successful trace", async () => {
  const { response, calls, trace } = await run(false);
  assert.equal(response.status, 200);
  assert.equal(trace?.terminal?.status, 200);
  assert.deepEqual(calls, ["openai/primary"]);
  assert.equal((await response.json()).choices[0].message.content, "ok");
});
