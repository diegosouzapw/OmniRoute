/**
 * Combo must ADVANCE on model-scoped 400s even when the error text also
 * contains #2101 stop substrings ("invalid", "bad request").
 *
 * User intent: keep models in the combo whether or not every provider supports
 * them. If github rejects `claude-fable-5` with "not supported", try the next
 * target (claude / antigravity / …) instead of hard-stopping the combo.
 *
 * Regression shapes covered:
 *  - "requested model is not supported" (baseline #5249)
 *  - "invalid_request_error: model X is not supported" (wrapper + model)
 *  - "Bad Request: The model is not supported" (status text wrapper)
 *  - "model X does not support Responses API" (API capability rejection)
 *
 * Genuinely body-specific 400s ("invalid message format") must still stop —
 * covered by combo-body-specific-400-stop-4279.test.ts.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-model-400-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "combo-model-400-test-secret";

const { handleComboChat, isModelScoped400 } = await import("../../open-sse/services/combo.ts");

const noop = () => {};
const log = { info: noop, warn: noop, debug: noop, error: noop };

function makeCombo(models: string[]) {
  return {
    name: "test-combo-model-400",
    strategy: "priority",
    models: models.map((m) => ({ model: m })),
  };
}

function okResponse(modelStr: string) {
  return Response.json({
    id: "ok",
    object: "chat.completion",
    choices: [{ message: { role: "assistant", content: `ok from ${modelStr}` } }],
  });
}

test("isModelScoped400 recognizes model-not-supported shapes (incl. invalid/Bad Request wrappers)", () => {
  assert.equal(isModelScoped400("requested model is not supported"), true);
  assert.equal(isModelScoped400("model claude-fable-5 is not supported"), true);
  assert.equal(isModelScoped400("invalid_request_error: model is not supported"), true);
  assert.equal(isModelScoped400("Bad Request: The model is not supported"), true);
  assert.equal(isModelScoped400("model claude-fable-5 does not support Responses API."), true);
  assert.equal(isModelScoped400("unsupported_api_for_model"), true);
  assert.equal(isModelScoped400("The model `x` does not exist or you do not have access to it."), true);
  // Genuinely body-specific — must NOT be treated as model-scoped
  assert.equal(isModelScoped400("Invalid message format: the request body is malformed."), false);
  assert.equal(isModelScoped400("malformed JSON in request body"), false);
  assert.equal(isModelScoped400("Invalid field: foo is not a recognized field"), false);
});

async function assertAdvancesOn(errorMessage: string, label: string) {
  const modelsCalled: string[] = [];
  const response = await handleComboChat({
    body: { model: "test", messages: [{ role: "user", content: "hi" }] },
    combo: makeCombo(["github/claude-fable-5", "claude/claude-fable-5"]),
    handleSingleModel: async (_body: unknown, modelStr: string) => {
      modelsCalled.push(modelStr);
      if (modelStr === "github/claude-fable-5") {
        return Response.json({ error: { message: errorMessage, type: "invalid_request_error" } }, { status: 400 });
      }
      return okResponse(modelStr);
    },
    log,
    settings: {},
    allCombos: [],
  });

  assert.equal(
    response.status,
    200,
    `${label}: combo should advance to second model and return 200 (got ${response.status})`
  );
  assert.deepEqual(
    modelsCalled,
    ["github/claude-fable-5", "claude/claude-fable-5"],
    `${label}: must try both targets; tried: ${modelsCalled.join(", ")}`
  );
}

test("combo advances when first target returns plain 'model is not supported'", async () => {
  await assertAdvancesOn("requested model is not supported", "plain");
});

test("combo advances when first target wraps model rejection in invalid_request_error", async () => {
  await assertAdvancesOn(
    "invalid_request_error: model claude-fable-5 is not supported",
    "invalid_request_error wrapper"
  );
});

test("combo advances when first target returns Bad Request + model not supported", async () => {
  await assertAdvancesOn("Bad Request: The model is not supported", "Bad Request wrapper");
});

test("combo advances when first target rejects model for Responses API", async () => {
  await assertAdvancesOn(
    "model claude-fable-5 does not support Responses API.",
    "Responses API capability"
  );
});

test("combo still STOPS on genuinely body-specific invalid message format", async () => {
  const modelsCalled: string[] = [];
  const response = await handleComboChat({
    body: { model: "test", messages: [{ role: "user", content: "hi" }] },
    combo: makeCombo(["a/model-1", "b/model-2", "c/model-3"]),
    handleSingleModel: async (_body: unknown, modelStr: string) => {
      modelsCalled.push(modelStr);
      return Response.json(
        { detail: "Invalid message format: the request body is malformed." },
        { status: 400 }
      );
    },
    log,
    settings: {},
    allCombos: [],
  });

  assert.equal(modelsCalled.length, 1, `body-specific 400 must stop at target 1; tried: ${modelsCalled.join(", ")}`);
  assert.equal(response.status, 400, "body-specific 400 must surface to the client");
});
