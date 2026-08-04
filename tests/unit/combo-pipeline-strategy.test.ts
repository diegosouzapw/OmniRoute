/**
 * Pipeline combo strategy — sequential chain (#6297).
 *
 * The 18th combo strategy: run targets IN ORDER, thread each step's output into the
 * next step's input (each step has its own optional prompt), and return only the
 * final step's response. Sequential counterpart to `fusion` (parallel + judge).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-pipeline-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "combo-pipeline-test-secret";

const { handleComboChat } = await import("../../open-sse/services/combo.ts");

const noop = () => {};
const log = { info: noop, warn: noop, debug: noop, error: noop };

type Body = Record<string, unknown>;

// Minimal OpenAI-chat Response-shaped object compatible with the engine's
// .ok + .clone().json() + .json() surface.
function okResponse(content: string): Response {
  const body = JSON.stringify({ choices: [{ message: { role: "assistant", content } }] });
  return new Response(body, { status: 200, headers: { "Content-Type": "application/json" } });
}

function errResponse(status = 500): Response {
  return new Response(JSON.stringify({ error: { message: "boom" } }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

// steps: array of { model, prompt? }.
function pipelineCombo(steps: Array<{ model: string; prompt?: string }>) {
  return {
    name: "test-pipeline-combo",
    strategy: "pipeline",
    models: steps,
    config: {},
  };
}

function lastUserContent(b: Body): string {
  const msgs = b.messages as Array<{ role: string; content: string }>;
  for (let i = msgs.length - 1; i >= 0; i--) {
    if (msgs[i].role === "user") return msgs[i].content;
  }
  return "";
}

test("pipeline: 2 steps — step 1 gets the original input, step 2 gets step 1's output + its own prompt, only step 2's output is returned", async () => {
  const seen: string[] = [];
  const seenBodies: Body[] = [];
  const handleSingleModel = async (b: Body, m: string) => {
    seen.push(m);
    seenBodies.push(b);
    if (m === "p/a") return okResponse("OUT_A");
    return okResponse("FINAL_B");
  };

  const res = await handleComboChat({
    body: {
      messages: [{ role: "user", content: "hi" }],
      stream: true,
      tools: [{ name: "x" }],
    },
    combo: pipelineCombo([{ model: "p/a" }, { model: "p/b", prompt: "SUMMARIZE" }]),
    handleSingleModel,
    log,
    settings: {},
    allCombos: [],
  });

  // Exactly 2 calls, in order.
  assert.deepEqual(seen, ["p/a", "p/b"]);

  // Step 1 sees the original user request.
  assert.equal(lastUserContent(seenBodies[0]), "hi");
  // Step 1 is intermediate → non-streaming, tools stripped.
  assert.equal(seenBodies[0].stream, false);
  assert.equal(seenBodies[0].tools, undefined);

  // Step 2 receives step 1's output as its user input + its own prompt as a system turn.
  assert.equal(lastUserContent(seenBodies[1]), "OUT_A");
  const step2Msgs = seenBodies[1].messages as Array<{ role: string; content: string }>;
  assert.ok(
    step2Msgs.some((m) => m.role === "system" && m.content === "SUMMARIZE"),
    "step 2 should carry its own prompt as a system instruction"
  );
  // Final step keeps the client's original stream flag + tools.
  assert.equal(seenBodies[1].stream, true);
  assert.ok(Array.isArray(seenBodies[1].tools));

  // Only the final step's output is returned.
  assert.equal(res.status, 200);
  const json = (await res.json()) as { choices: Array<{ message: { content: string } }> };
  assert.equal(json.choices[0].message.content, "FINAL_B");
});

test("pipeline: 3-step chain threads output → input correctly", async () => {
  const seen: string[] = [];
  const seenBodies: Body[] = [];
  const outputs: Record<string, string> = { "p/1": "o1", "p/2": "o2", "p/3": "o3" };
  const handleSingleModel = async (b: Body, m: string) => {
    seen.push(m);
    seenBodies.push(b);
    return okResponse(outputs[m]);
  };

  const res = await handleComboChat({
    body: { messages: [{ role: "user", content: "start" }] },
    combo: pipelineCombo([{ model: "p/1" }, { model: "p/2" }, { model: "p/3" }]),
    handleSingleModel,
    log,
    settings: {},
    allCombos: [],
  });

  assert.deepEqual(seen, ["p/1", "p/2", "p/3"]);
  assert.equal(lastUserContent(seenBodies[0]), "start"); // original
  assert.equal(lastUserContent(seenBodies[1]), "o1"); // step 1 output
  assert.equal(lastUserContent(seenBodies[2]), "o2"); // step 2 output

  const json = (await res.json()) as { choices: Array<{ message: { content: string } }> };
  assert.equal(json.choices[0].message.content, "o3"); // final step output
});

test("pipeline: a failing middle step surfaces an error and short-circuits the chain", async () => {
  const seen: string[] = [];
  const handleSingleModel = async (_b: Body, m: string) => {
    seen.push(m);
    if (m === "p/a") return okResponse("OK");
    if (m === "p/bad") return errResponse(500);
    return okResponse("SHOULD_NOT_RUN");
  };

  const res = await handleComboChat({
    body: { messages: [{ role: "user", content: "go" }] },
    combo: pipelineCombo([{ model: "p/a" }, { model: "p/bad" }, { model: "p/c" }]),
    handleSingleModel,
    log,
    settings: {},
    allCombos: [],
  });

  // Failure is surfaced (not a silent pass), and the downstream step never runs.
  assert.equal(res.status, 500);
  assert.ok(!seen.includes("p/c"), "the step after the failure must not execute");

  // Error body must not leak a stack trace.
  const body = (await res.json()) as { error?: { message?: string } };
  const msg = body.error?.message ?? "";
  assert.ok(!msg.includes("at /"), "error response must not leak a stack trace");
});

test("pipeline: an intermediate step that returns empty output fails the pipeline", async () => {
  const seen: string[] = [];
  const handleSingleModel = async (_b: Body, m: string) => {
    seen.push(m);
    if (m === "p/empty") return okResponse("");
    return okResponse("FINAL");
  };

  const res = await handleComboChat({
    body: { messages: [{ role: "user", content: "go" }] },
    combo: pipelineCombo([{ model: "p/empty" }, { model: "p/final" }]),
    handleSingleModel,
    log,
    settings: {},
    allCombos: [],
  });

  assert.equal(res.status, 502);
  assert.ok(!seen.includes("p/final"), "the final step must not run after an empty intermediate");
});

test("pipeline: a single-step pipeline runs the one model directly and streams through", async () => {
  const seen: string[] = [];
  const seenBodies: Body[] = [];
  const handleSingleModel = async (b: Body, m: string) => {
    seen.push(m);
    seenBodies.push(b);
    return okResponse("solo");
  };

  const res = await handleComboChat({
    body: { messages: [{ role: "user", content: "hi" }], stream: true },
    combo: pipelineCombo([{ model: "p/only" }]),
    handleSingleModel,
    log,
    settings: {},
    allCombos: [],
  });

  assert.deepEqual(seen, ["p/only"]);
  // Single step is the final step → keeps the client's stream flag.
  assert.equal(seenBodies[0].stream, true);
  assert.equal(res.status, 200);
});
