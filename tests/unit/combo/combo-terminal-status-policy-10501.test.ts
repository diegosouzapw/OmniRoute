/**
 * #10314 / #10501 — integration-level regression for the combo terminal-error
 * aggregation + status policy. Drives the REAL `handleComboChat` wiring (via
 * an injected `handleSingleModel`, the same seam `combo-body-specific-400-
 * stop-4279.test.ts` uses) end-to-end, asserting the actual HTTP `Response`
 * the client receives — not just the pure `comboErrorAggregation.ts` helpers
 * in isolation (those are covered by `combo-error-aggregation.test.ts`).
 *
 * Scenario: a priority combo where target #1 returns a 200 that FAILS
 * response-quality validation (empty body — see validateQuality.ts) and
 * target #2 returns a real 401 (auth). Before #10314/#10501 this surfaced a
 * bare 401 ("last writer wins") and dropped the quality reason entirely; now
 * it must list BOTH reasons and surface a 5xx-class infra status instead of
 * the sibling's 401 (resolveComboTerminalStatus — the request itself was
 * never proven invalid on every target).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-10501-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "combo-10501-test-secret";

const { handleComboChat } = await import("../../../open-sse/services/combo.ts");

const noop = () => {};
const log = { info: noop, warn: noop, debug: noop, error: noop };

function makeCombo(models: string[]) {
  return {
    name: "test-combo-10501",
    strategy: "priority",
    models: models.map((m) => ({ model: m })),
  };
}

// Empty body + application/json content-type trips validateResponseQuality's
// "empty response body" case for a non-streaming response.
function qualityFailingResponse() {
  return new Response("", { status: 200, headers: { "Content-Type": "application/json" } });
}

function authFailureResponse() {
  return new Response(JSON.stringify({ error: { message: "invalid_api_key" } }), {
    status: 401,
    headers: { "Content-Type": "application/json" },
  });
}

function successResponse() {
  return new Response(
    JSON.stringify({
      id: "chatcmpl-1",
      choices: [{ index: 0, message: { role: "assistant", content: "hi there" }, finish_reason: "stop" }],
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

test("#10314/#10501: quality failure on target 1 + auth 401 on target 2 → 5xx terminal status, BOTH reasons listed", async () => {
  const modelsCalled: string[] = [];
  const handleSingleModel = async (_body: unknown, modelStr: string) => {
    modelsCalled.push(modelStr);
    if (modelStr.includes("model-a")) return qualityFailingResponse();
    return authFailureResponse();
  };

  const result = await handleComboChat({
    body: { model: "test", messages: [{ role: "user", content: "hi" }], stream: false },
    combo: makeCombo(["openai/model-a", "openai/model-b"]),
    handleSingleModel,
    log,
    settings: {},
    allCombos: [],
  });

  assert.deepEqual(modelsCalled, ["openai/model-a", "openai/model-b"]);

  // #10501: a heterogeneous quality+auth mix must NOT surface the sibling's
  // bare 401 (the old `lastStatus` behavior) — it is an infra/provider-class
  // outcome (neither target proved the CLIENT's request itself was invalid).
  assert.ok(
    result.status >= 500,
    `expected a 5xx terminal status for a heterogeneous quality+auth mix, got ${result.status}`
  );
  assert.notEqual(result.status, 401, "must not regress to surfacing the sibling target's bare 401");

  const body = (await result.json()) as { error?: { message?: string } };
  const message = body.error?.message ?? "";
  // #10314: both distinct reasons must be listed — neither silently dropped.
  assert.match(message, /quality/i, "quality-validation reason must be present in the message");
  assert.match(message, /invalid_api_key|auth/i, "auth reason must be present in the message");
});

test("#10314: success on target 2 after a quality failure on target 1 returns the real success response", async () => {
  const modelsCalled: string[] = [];
  const handleSingleModel = async (_body: unknown, modelStr: string) => {
    modelsCalled.push(modelStr);
    if (modelStr.includes("model-a")) return qualityFailingResponse();
    return successResponse();
  };

  const result = await handleComboChat({
    body: { model: "test", messages: [{ role: "user", content: "hi" }], stream: false },
    combo: makeCombo(["openai/model-a", "openai/model-b"]),
    handleSingleModel,
    log,
    settings: {},
    allCombos: [],
  });

  assert.deepEqual(
    modelsCalled,
    ["openai/model-a", "openai/model-b"],
    "must fail over from the quality-rejected target 1 to target 2"
  );
  assert.equal(result.status, 200, "combo must return the successful target's response");
  const body = (await result.json()) as { choices?: Array<{ message?: { content?: string } }> };
  assert.equal(body.choices?.[0]?.message?.content, "hi there");
});
