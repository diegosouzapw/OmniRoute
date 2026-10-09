import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { ResolvedComboUnit } from "../../open-sse/services/combo/types.ts";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "combo-budget-15289-"));
process.env.DATA_DIR = dataDir;
const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { executeRuntimeUnitCombo } = await import("../../open-sse/services/combo/runtimeUnits.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const log = { info() {}, warn() {}, error() {}, debug() {} };

test.after(() => {
  resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

function failure(overflow: boolean): Response {
  return new Response(
    JSON.stringify({
      error: {
        message: overflow ? "Input exceeds the context window" : "upstream unavailable",
        code: overflow ? "context_length_exceeded" : "service_unavailable",
      },
    }),
    { status: overflow ? 400 : 503, headers: { "content-type": "application/json" } }
  );
}

for (const strategy of ["round-robin", "nested"] as const) {
  for (const failures of [
    [true, true, true],
    [false, false, true],
    [true, true, false],
  ]) {
    test(`#15289 ${strategy} budget preserves dominant context cause: ${failures}`, async () => {
      const models = ["openai/budget-a", "anthropic/budget-b", "gemini/budget-c", "codex/budget-d"];
      let called = 0;
      const handleSingleModel = async () => failure(failures[called++]);
      const config = { maxRetries: 0, maxGlobalAttempts: 3, retryDelayMs: 0, fallbackDelayMs: 0 };
      const response =
        strategy === "round-robin"
          ? await handleComboChat({
              body: { messages: [{ role: "user", content: "hi" }] },
              combo: { name: `rr-15289-${failures}`, strategy, models, config },
              handleSingleModel,
              isModelAvailable: async () => true,
              log,
              settings: {},
              allCombos: [],
            })
          : (
              await executeRuntimeUnitCombo({
                body: { messages: [{ role: "user", content: "hi" }] },
                combo: { name: "nested-15289", strategy: "pipeline" },
                strategy: "pipeline",
                units: models.map((modelStr, i): ResolvedComboUnit => ({
                  kind: "model",
                  modelStr,
                  provider: modelStr.split("/")[0],
                  stepId: `s${i}`,
                  executionKey: `s${i}`,
                  providerId: null,
                  connectionId: null,
                  weight: 1,
                  label: null,
                })),
                handleSingleModel,
                log,
                config,
                allCombos: [],
                baseOptions: {},
                nesting: {
                  depth: 0,
                  maxDepth: 5,
                  visitedComboNames: [],
                  rootComboName: "nested-15289",
                  attemptBudget: { count: 0, limit: 3 },
                },
                runCombo: async () => failure(true),
              })
            ).response;
      const body = await response.json();
      assert.equal(called, 3, "the global dispatch budget is unchanged");
      const dominant = failures[2] && failures.filter(Boolean).length >= 2;
      assert.equal(response.status, dominant ? 400 : 503);
      assert.equal(body.error.code, dominant ? "context_length_exceeded" : "service_unavailable");
      assert.match(body.error.message, dominant ? /context window/ : /Maximum combo retry limit/);
      assert.equal(body.diagnostics.terminalReason, "max_attempts_exceeded");
      assert.equal(body.diagnostics.attemptOrder.length, 3);
      assert.equal(body.diagnostics.poolSize, 4);
    });
  }
}
