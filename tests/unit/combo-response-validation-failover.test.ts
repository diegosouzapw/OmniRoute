/**
 * Feature 4985 — a combo with a configured `responseValidation` predicate must fail over
 * when a leg returns a 200 OK whose body fails the predicate, exactly like an HTTP error.
 * Mirrors the #5085 empty-content failover harness (2 legs, different providers).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-4985-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "combo-4985-test-secret";

const { handleComboChat } = await import("../../open-sse/services/combo.ts");

const noop = () => {};
const log = { info: noop, warn: noop, debug: noop, error: noop };

function content200(model: string, text: string) {
  return new Response(
    JSON.stringify({
      id: "ok",
      object: "chat.completion",
      model,
      choices: [{ index: 0, message: { role: "assistant", content: text }, finish_reason: "stop" }],
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

function makeCombo(models: string[], responseValidation: Record<string, unknown>) {
  return {
    name: "test-combo-4985",
    strategy: "priority",
    models: models.map((m) => ({ model: m })),
    config: { responseValidation },
  };
}

test("4985 fails over when leg 1's 200 body trips a forbidden substring", async () => {
  const modelsCalled: string[] = [];
  const handleSingleModel = async (_body: unknown, modelStr: string) => {
    modelsCalled.push(modelStr);
    if (modelsCalled.length === 1) return content200(modelStr, "Sorry, I cannot help with that.");
    return content200(modelStr, "Here is the answer you asked for.");
  };

  const result = await handleComboChat({
    body: { model: "test", messages: [{ role: "user", content: "hi" }] },
    combo: makeCombo(["nvidia/minimaxai/minimax-m3", "openai/gpt-4o-mini"], {
      forbiddenSubstrings: ["I cannot help"],
    }),
    handleSingleModel,
    log,
    settings: {},
    allCombos: [],
  });

  assert.equal(
    modelsCalled.length,
    2,
    `predicate failure on leg 1 must advance to leg 2, tried: ${modelsCalled.join(", ")}`
  );
  assert.equal(result.status, 200, "the combo must surface the healthy second leg's 200");
  const body = JSON.parse(await result.text());
  assert.match(
    String(body?.choices?.[0]?.message?.content ?? ""),
    /answer you asked for/,
    "surfaced content must come from the leg that passed the predicate"
  );
});

test("4985 does NOT fail over when the configured predicate passes", async () => {
  const modelsCalled: string[] = [];
  const handleSingleModel = async (_body: unknown, modelStr: string) => {
    modelsCalled.push(modelStr);
    return content200(modelStr, "A perfectly good answer.");
  };

  const result = await handleComboChat({
    body: { model: "test", messages: [{ role: "user", content: "hi" }] },
    combo: makeCombo(["nvidia/minimaxai/minimax-m3", "openai/gpt-4o-mini"], {
      forbiddenSubstrings: ["I cannot help"],
      minContentLength: 5,
    }),
    handleSingleModel,
    log,
    settings: {},
    allCombos: [],
  });

  assert.equal(modelsCalled.length, 1, "a passing predicate must not trigger a needless failover");
  assert.equal(result.status, 200);
});
