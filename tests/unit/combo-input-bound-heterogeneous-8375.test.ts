/**
 * #8375 (regression) — the input-bound short-circuit added for the homogeneous
 * same-model pool case must NOT fire across a heterogeneous combo whose remaining
 * targets are different models with (potentially) larger context windows.
 *
 * Without this scoping:
 * - `isInputBoundFailure` in open-sse/services/combo.ts fires unconditionally on
 *   the first `context_length_exceeded`/`context_window_exceeded`, even when a
 *   later target in the combo is a different model that could still succeed.
 * - This regresses the intentional heterogeneous-combo behavior protected by
 *   `isContextOverflow400` (#6637): a small-context model failing must not abort
 *   the whole combo when a larger-context model is still queued.
 *
 * Fix: the short-circuit only fires when every remaining target shares the same
 * `modelStr` as the one that just failed (a true homogeneous remainder) —
 * see `remainderIsHomogeneous` in combo.ts.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-hetero-8375-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "combo-hetero-8375-test-secret";

const { handleComboChat } = await import("../../open-sse/services/combo.ts");

const noop = () => {};
const log = { info: noop, warn: noop, debug: noop, error: noop };

function contextLengthExceededResponse() {
  return new Response(
    JSON.stringify({
      error: {
        code: "context_length_exceeded",
        message: "Input exceeds the context window: estimated 159324 input tokens, limit 128000.",
      },
    }),
    { status: 400, headers: { "Content-Type": "application/json" } }
  );
}

function healthyResponse() {
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

test("#8375 heterogeneous combo: small-ctx model fails, larger-ctx model must still be tried", async () => {
  const modelsCalled: string[] = [];
  const handleSingleModel = async (_body: unknown, modelStr: string) => {
    modelsCalled.push(modelStr);
    if (modelStr === "providerA/model-small-ctx") return contextLengthExceededResponse();
    return healthyResponse();
  };

  const result = await handleComboChat({
    body: { model: "test", messages: [{ role: "user", content: "hi" }] },
    combo: {
      name: "test-combo-hetero-8375",
      strategy: "priority",
      models: [{ model: "providerA/model-small-ctx" }, { model: "providerB/model-huge-ctx" }],
    },
    handleSingleModel,
    log,
    settings: {},
    allCombos: [],
  });

  assert.equal(
    modelsCalled.length,
    2,
    `expected the combo to still try the larger-context target 2, but tried: ${modelsCalled.join(", ")}`
  );
  assert.equal(result.status, 200);
});

test("#8375 homogeneous remainder still short-circuits (no regression on the original fix)", async () => {
  const modelsCalled: string[] = [];
  const handleSingleModel = async (_body: unknown, modelStr: string) => {
    modelsCalled.push(modelStr);
    return contextLengthExceededResponse();
  };

  const result = await handleComboChat({
    body: { model: "test", messages: [{ role: "user", content: "hi" }] },
    combo: {
      name: "test-combo-homogeneous-8375",
      strategy: "priority",
      models: [
        { model: "nvidia/z-ai/glm-5.2" },
        { model: "nvidia/z-ai/glm-5.2" },
        { model: "nvidia/z-ai/glm-5.2" },
      ],
    },
    handleSingleModel,
    log,
    settings: {},
    allCombos: [],
  });

  assert.equal(
    modelsCalled.length,
    1,
    `input-bound 400 on a homogeneous remainder must still stop at target 1, but tried: ${modelsCalled.join(", ")}`
  );
  assert.equal(result.status, 400);
});
