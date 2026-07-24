/**
 * #8375 — A combo whose first target returns `context_length_exceeded` for an
 * oversized input must propagate the 400 immediately instead of re-dispatching
 * the identical oversized request against other accounts of the same model.
 *
 * Without this fix:
 * - The 400 `context_length_exceeded` is request-scoped and deterministic for
 *   the same input — every account of the same model will reject it identically.
 * - `isRequestScopedUpstreamFailure()` correctly classifies it, but the combo
 *   loop never acts on that classification to short-circuit.
 * - The combo retries MAX_GLOBAL_ATTEMPTS=30 times, burning all attempts, and
 *   returns a misleading 503 "Maximum combo retry limit reached".
 *
 * Fix: new `isInputBoundRequestFailure()` predicate that detects input-bound
 * deterministic errors. When it fires, the combo returns `{ ok: false, response }`
 * from `executeTarget`, which the outer loop treats as fatal — stopping the
 * combo and propagating the original 400.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-8375-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "combo-8375-test-secret";

const { handleComboChat } = await import("../../open-sse/services/combo.ts");

const noop = () => {};
const log = { info: noop, warn: noop, debug: noop, error: noop };

function contextLengthExceededResponse() {
  return new Response(
    JSON.stringify({
      error: {
        code: "context_length_exceeded",
        message:
          "Input exceeds the context window for nvidia/z-ai/glm-5.2: estimated 159324 input tokens, limit 128000.",
      },
    }),
    { status: 400, headers: { "Content-Type": "application/json" } }
  );
}

function makeCombo(models: string[]) {
  return {
    name: "test-combo-8375",
    strategy: "priority",
    models: models.map((m) => ({ model: m })),
  };
}

test("#8375 combo stops at the first context_length_exceeded instead of re-dispatching", async () => {
  const modelsCalled: string[] = [];
  const handleSingleModel = async (_body: unknown, modelStr: string) => {
    modelsCalled.push(modelStr);
    return contextLengthExceededResponse();
  };

  const result = await handleComboChat({
    body: { model: "test", messages: [{ role: "user", content: "hi" }] },
    combo: makeCombo(["nvidia/z-ai/glm-5.2", "nvidia/z-ai/glm-5.2", "nvidia/z-ai/glm-5.2"]),
    handleSingleModel,
    log,
    settings: {},
    allCombos: [],
  });

  // The guard must short-circuit after the FIRST target — never reach #2 or #3.
  assert.equal(
    modelsCalled.length,
    1,
    `input-bound 400 must stop the combo at target 1, but it tried: ${modelsCalled.join(", ")}`
  );
  assert.equal(
    result.status,
    400,
    "the combo must surface the original 400 to the client, not a 503"
  );
});
