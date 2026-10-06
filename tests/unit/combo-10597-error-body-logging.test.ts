/**
 * #10597 — When a combo target fails with a non-2xx status, the per-target
 * "Model X failed, trying next" COMBO log line only carries `{ status }` —
 * the upstream error BODY (e.g. Anthropic's "prompt is too long" or a
 * tool_use/tool_result pairing 400) is captured in `errorText` but never
 * logged, so operators cannot distinguish failure causes from server logs
 * without reproducing the request.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-10597-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "combo-10597-test-secret";

const { handleComboChat } = await import("../../open-sse/services/combo.ts");

const DISTINCTIVE_ERROR_TEXT =
  "messages.450: `tool_use` ids were found without `tool_result` blocks immediately after";

type WarnCall = { tag: string; msg: string; meta: unknown };
const warnCalls: WarnCall[] = [];
const log = {
  info: () => {},
  debug: () => {},
  error: () => {},
  warn: (tag: string, msg: string, meta?: unknown) => {
    warnCalls.push({ tag, msg, meta });
  },
};

function failing400() {
  return new Response(
    JSON.stringify({
      type: "error",
      error: { type: "invalid_request_error", message: DISTINCTIVE_ERROR_TEXT },
    }),
    { status: 400, headers: { "Content-Type": "application/json" } }
  );
}

function healthy200(model: string) {
  return new Response(
    JSON.stringify({
      id: "ok",
      object: "chat.completion",
      model,
      choices: [{ index: 0, message: { role: "assistant", content: "hello from " + model }, finish_reason: "stop" }],
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

function makeCombo(models: string[]) {
  return { name: "test-combo-10597", strategy: "priority", models: models.map((m) => ({ model: m })) };
}

test("#10597 COMBO failure log must surface the upstream error body, not just the status code", async () => {
  const modelsCalled: string[] = [];
  const handleSingleModel = async (_body: unknown, modelStr: string) => {
    modelsCalled.push(modelStr);
    if (modelsCalled.length === 1) return failing400();
    return healthy200(modelStr);
  };

  const result = await handleComboChat({
    body: { model: "test", messages: [{ role: "user", content: "hi" }] },
    combo: makeCombo(["claude/claude-opus-4-8", "openai/gpt-4o-mini"]),
    handleSingleModel,
    log,
    settings: {},
    allCombos: [],
  });

  assert.equal(result.status, 200);
  assert.equal(modelsCalled.length, 2);

  const failureLog = warnCalls.find(
    (c) => typeof c.msg === "string" && c.msg.includes("claude/claude-opus-4-8") && c.msg.includes("failed")
  );
  assert.ok(failureLog, "expected a COMBO warn log for the failing leg");

  const serialized = JSON.stringify(failureLog);
  assert.ok(
    serialized.includes("tool_use") || serialized.includes(DISTINCTIVE_ERROR_TEXT),
    `expected the upstream error body to appear in the COMBO failure log, but got: ${serialized}`
  );
});
