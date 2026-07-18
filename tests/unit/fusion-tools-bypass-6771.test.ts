/**
 * Regression guard for #6771 — fusion combos stripping tools/tool_choice for
 * tool-bearing requests via panel-fan-out-then-judge synthesis.
 *
 * Root cause: panel members answer tool-shaped prompts with no tool access
 * (degraded prose), and the judge's injected synthesis directive ("produce
 * ONE authoritative final answer" from anonymized panel sources) steers even
 * a tools-capable judge away from emitting a real tool call.
 *
 * Fix: detect a tool-bearing request up front (non-empty `tools`, and
 * `tool_choice` not explicitly "none") and bypass the panel fan-out +
 * judge-synthesis path entirely — route the full, unmodified body straight
 * to a single model (the configured judgeModel, or panel[0]).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-fusion-6771-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "fusion-6771-test-secret";

const { handleComboChat } = await import("../../open-sse/services/combo.ts");

type Body = Record<string, unknown>;

function jsonResponse(model: string, content: string): Response {
  const body = JSON.stringify({ model, choices: [{ message: { role: "assistant", content } }] });
  return new Response(body, { status: 200, headers: { "Content-Type": "application/json" } });
}

const noop = () => {};
const log = { info: noop, warn: noop, debug: noop, error: noop };

function fusionCombo(models: string[], extra: Record<string, unknown> = {}) {
  return {
    name: "fusion-tools",
    strategy: "fusion",
    models: models.map((m) => ({ model: m })),
    config: extra,
  };
}

const TOOLS = [
  {
    type: "function",
    function: { name: "get_weather", description: "Get the weather", parameters: {} },
  },
];

test("6771: tool-bearing request bypasses panel fan-out — single call, tools intact, targets configured judge", async () => {
  const calls: Array<{ model: string; body: Body }> = [];
  const handleSingleModel = async (b: Body, m: string) => {
    calls.push({ model: m, body: b });
    return jsonResponse(m, "tool decision");
  };

  const requestBody: Body = {
    messages: [{ role: "user", content: "what's the weather?" }],
    tools: TOOLS,
    tool_choice: "auto",
  };

  const res = await handleComboChat({
    body: requestBody,
    combo: fusionCombo(["panel/a", "panel/b"], { judgeModel: "judge/model" }),
    handleSingleModel,
    log,
    settings: {},
    allCombos: [],
  });

  // Exactly one call — not once per panel member + once for the judge.
  assert.equal(calls.length, 1, `expected exactly 1 call, got: ${calls.map((c) => c.model).join(", ")}`);
  assert.equal(calls[0].model, "judge/model");

  // The forwarded body still contains the original tools/tool_choice unmodified.
  assert.deepEqual(calls[0].body.tools, TOOLS);
  assert.equal(calls[0].body.tool_choice, "auto");

  assert.equal(res.status, 200);
});

test("6771: tool-bearing request with no explicit judgeModel targets panel[0]", async () => {
  const calls: string[] = [];
  const handleSingleModel = async (_b: Body, m: string) => {
    calls.push(m);
    return jsonResponse(m, "tool decision");
  };

  await handleComboChat({
    body: {
      messages: [{ role: "user", content: "what's the weather?" }],
      tools: TOOLS,
    },
    combo: fusionCombo(["panel/a", "panel/b"]), // no judgeModel — defaults to panel[0]
    handleSingleModel,
    log,
    settings: {},
    allCombos: [],
  });

  assert.deepEqual(calls, ["panel/a"]);
});

test("6771: tools present but tool_choice:\"none\" still goes through normal fan-out+judge path", async () => {
  const calls: string[] = [];
  const handleSingleModel = async (_b: Body, m: string) => {
    calls.push(m);
    return jsonResponse(m, "prose answer");
  };

  await handleComboChat({
    body: {
      messages: [{ role: "user", content: "hi" }],
      tools: TOOLS,
      tool_choice: "none",
    },
    combo: fusionCombo(["panel/a", "panel/b"], { judgeModel: "judge/model" }),
    handleSingleModel,
    log,
    settings: {},
    allCombos: [],
  });

  // panel.length (2) fan-out calls + 1 judge call = 3.
  assert.equal(calls.length, 3, `expected 3 calls (fan-out+judge), got: ${calls.join(", ")}`);
  assert.deepEqual(calls.slice(0, 2).sort(), ["panel/a", "panel/b"]);
  assert.equal(calls[2], "judge/model");
});

test("6771: no regression — request without tools still goes through normal fan-out+judge path", async () => {
  const calls: string[] = [];
  const handleSingleModel = async (_b: Body, m: string) => {
    calls.push(m);
    return jsonResponse(m, "prose answer");
  };

  await handleComboChat({
    body: { messages: [{ role: "user", content: "hi" }] },
    combo: fusionCombo(["panel/a", "panel/b"], { judgeModel: "judge/model" }),
    handleSingleModel,
    log,
    settings: {},
    allCombos: [],
  });

  assert.equal(calls.length, 3, `expected 3 calls (fan-out+judge), got: ${calls.join(", ")}`);
  assert.deepEqual(calls.slice(0, 2).sort(), ["panel/a", "panel/b"]);
  assert.equal(calls[2], "judge/model");
});
