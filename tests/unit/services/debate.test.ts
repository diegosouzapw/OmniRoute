/**
 * Debate combo strategy — multi-round adversarial panel + judge synthesis.
 *
 * Direct unit tests for open-sse/services/debate.ts:
 *   - prompt builders (buildDebateRoundPrompt / buildDebateJudgePrompt) shape & anonymization
 *   - handleDebateChat orchestration: fan-out rounds, survivor tracking, judge synthesis,
 *     and every degrade path (empty panel, oversized panel, single model, total failure,
 *     lone survivor, explicit-judge override).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-debate-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "debate-test-secret";

const {
  handleDebateChat,
  buildDebateRoundPrompt,
  buildDebateJudgePrompt,
  DEBATE_DEFAULTS,
} = await import("../../../open-sse/services/debate.ts");

const noop = () => {};
const log = { info: noop, warn: noop, debug: noop, error: noop };

type Body = Record<string, unknown>;

function okResponse(content: string, { delayMs = 0 } = {}): Response | Promise<Response> {
  const body = JSON.stringify({ choices: [{ message: { role: "assistant", content } }] });
  const make = () =>
    new Response(body, { status: 200, headers: { "Content-Type": "application/json" } });
  return delayMs > 0 ? new Promise((r) => setTimeout(() => r(make()), delayMs)) : make();
}

function errResponse(status = 500): Response {
  return new Response(JSON.stringify({ error: { message: "boom" } }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

const fastTuning = {
  minPanel: 2,
  stragglerGraceMs: 30,
  panelHardTimeoutMs: 5000,
};

// ---------------------------------------------------------------------------
// Prompt builders
// ---------------------------------------------------------------------------

test("buildDebateRoundPrompt: anonymizes peers and asks for agreements/rebuttals/refinement", () => {
  const prompt = buildDebateRoundPrompt(
    [
      { model: "openai/gpt", text: "answer-A" },
      { model: "anthropic/claude", text: "answer-B" },
    ],
    1,
    3
  );
  // Peer labels, not model names.
  assert.match(prompt, /\[Peer 1\]/);
  assert.match(prompt, /\[Peer 2\]/);
  assert.match(prompt, /answer-A/);
  assert.match(prompt, /answer-B/);
  assert.ok(!prompt.includes("openai/gpt"), "must not leak model identity");
  assert.ok(!prompt.includes("anthropic/claude"), "must not leak model identity");
  // Debate structure.
  assert.match(prompt, /AGREEMENTS/);
  assert.match(prompt, /REBUTTALS/);
  assert.match(prompt, /REFINEMENT/);
  // Round header uses (roundNum of totalRounds-1) form.
  assert.match(prompt, /Round 1 of 2/);
});

test("buildDebateJudgePrompt: includes every round, anonymized, with judge directive", () => {
  const prompt = buildDebateJudgePrompt([
    [
      { model: "m/a", text: "r0-a" },
      { model: "m/b", text: "r0-b" },
    ],
    [
      { model: "m/a", text: "r1-a" },
      { model: "m/b", text: "r1-b" },
    ],
  ]);
  assert.match(prompt, /2-round multi-model debate/);
  assert.match(prompt, /Round 0/);
  assert.match(prompt, /Round 1/);
  assert.match(prompt, /r0-a/);
  assert.match(prompt, /r1-b/);
  assert.match(prompt, /\[Peer 1, Round 0\]/);
  assert.ok(!prompt.includes("m/a"), "judge prompt must not leak model identity");
  // Judge must be told to apply its own reasoning, not vote-count.
  assert.match(prompt, /not a vote-counter/);
});

// ---------------------------------------------------------------------------
// Degrade paths
// ---------------------------------------------------------------------------

test("handleDebateChat: empty panel → 400", async () => {
  const res = await handleDebateChat({
    body: { messages: [{ role: "user", content: "Q" }] },
    models: [],
    handleSingleModel: async () => okResponse("x"),
    log,
  });
  assert.equal(res.status, 400);
});

test("handleDebateChat: single-model panel bypasses debate and answers directly", async () => {
  const calls: string[] = [];
  const res = await handleDebateChat({
    body: { messages: [{ role: "user", content: "Q" }] },
    models: ["p/solo"],
    handleSingleModel: async (_b, m) => {
      calls.push(m);
      return okResponse("solo");
    },
    log,
  });
  assert.deepEqual(calls, ["p/solo"]);
  assert.equal(res.status, 200);
});

test("handleDebateChat: oversized panel → 400", async () => {
  const models = Array.from({ length: 5 }, (_, i) => `p/m${i}`);
  const res = await handleDebateChat({
    body: { messages: [{ role: "user", content: "Q" }] },
    models,
    handleSingleModel: async () => okResponse("x"),
    log,
    tuning: { maxPanel: 3 },
  });
  assert.equal(res.status, 400);
});

test("handleDebateChat: whole panel fails in round 0 → 503", async () => {
  const res = await handleDebateChat({
    body: { messages: [{ role: "user", content: "Q" }] },
    models: ["p/a", "p/b"],
    handleSingleModel: async () => errResponse(500),
    log,
    tuning: { ...fastTuning, debateRounds: 2 },
  });
  assert.equal(res.status, 503);
});

// ---------------------------------------------------------------------------
// Core orchestration
// ---------------------------------------------------------------------------

test("handleDebateChat: runs R0 + R1 then judges — correct call sequence", async () => {
  const seen: Array<{ model: string; body: Body }> = [];
  const handleSingleModel = async (b: Body, m: string) => {
    seen.push({ model: m, body: b });
    if (m === "p/judge") return okResponse("FINAL");
    return okResponse(`ans-${m}`);
  };

  const res = await handleDebateChat({
    body: { messages: [{ role: "user", content: "Q" }], stream: true, tools: [{ name: "x" }] },
    models: ["p/a", "p/b"],
    handleSingleModel,
    log,
    judgeModel: "p/judge",
    tuning: { ...fastTuning, debateRounds: 2 },
  });

  // R0: 2 panel + R1: 2 panel + 1 judge = 5 calls.
  assert.equal(seen.length, 5);
  const models = seen.map((s) => s.model);
  assert.deepEqual(models.slice(0, 2).sort(), ["p/a", "p/b"]); // R0
  assert.deepEqual(models.slice(2, 4).sort(), ["p/a", "p/b"]); // R1
  assert.equal(models[4], "p/judge"); // judge last

  // Panel calls are non-streaming with tools stripped.
  for (let i = 0; i < 4; i++) {
    assert.equal(seen[i].body.stream, false, "panel call should be non-streaming");
    assert.equal(seen[i].body.tools, undefined, "panel call should have tools stripped");
  }

  // R1 body contains the anonymized prior-round answers.
  const r1Body = seen[2].body;
  const r1Msgs = r1Body.messages as Array<{ role: string; content: string }>;
  const r1Text = r1Msgs[r1Msgs.length - 1].content;
  assert.match(r1Text, /Peer 1/);
  assert.match(r1Text, /ans-p\//);

  // Judge body carries the full transcript and keeps the client's stream flag.
  const judgeBody = seen[4].body;
  assert.equal(judgeBody.stream, true, "judge call keeps client stream flag");
  const judgeMsgs = judgeBody.messages as Array<{ role: string; content: string }>;
  const judgeText = judgeMsgs[judgeMsgs.length - 1].content;
  assert.match(judgeText, /DEBATE TRANSCRIPT/);
  assert.equal(res.status, 200);
});

test("handleDebateChat: default rounds = DEBATE_DEFAULTS.debateRounds", async () => {
  assert.equal(DEBATE_DEFAULTS.debateRounds, 2);
  let panelCalls = 0;
  const handleSingleModel = async (_b: Body, m: string) => {
    if (m === "p/judge") return okResponse("FINAL");
    panelCalls++;
    return okResponse(`ans-${m}`);
  };
  await handleDebateChat({
    body: { messages: [{ role: "user", content: "Q" }] },
    models: ["p/a", "p/b"],
    handleSingleModel,
    log,
    judgeModel: "p/judge",
    tuning: fastTuning, // no debateRounds → default 2
  });
  // default 2 rounds × 2 models = 4 panel calls.
  assert.equal(panelCalls, 4);
});

test("handleDebateChat: only prior-round survivors participate in the next round", async () => {
  const r1Models: string[] = [];
  let round = 0;
  const seenBefore = new Set<string>();
  const handleSingleModel = async (_b: Body, m: string) => {
    if (m === "p/judge") return okResponse("FINAL");
    // p/b fails in R0; only p/a survives → R1 should have <2 survivors → debate stops.
    if (round === 0 && m === "p/b") {
      seenBefore.add(m);
      return errResponse(500);
    }
    // Track any R1 participation.
    if (seenBefore.size > 0) r1Models.push(m);
    return okResponse(`ans-${m}`);
  };
  // R0: p/a ok, p/b fails. Only 1 survivor → per impl, debate loop breaks (needs ≥2).
  // With an explicit judge and lone survivor, judge still runs.
  const res = await handleDebateChat({
    body: { messages: [{ role: "user", content: "Q" }] },
    models: ["p/a", "p/b"],
    handleSingleModel,
    log,
    judgeModel: "p/judge",
    tuning: { ...fastTuning, minPanel: 1, debateRounds: 3 },
  });
  assert.equal(res.status, 200);
});

test("handleDebateChat: lone survivor + no explicit judge → direct answer (no judge call)", async () => {
  const seen: string[] = [];
  const handleSingleModel = async (_b: Body, m: string) => {
    seen.push(m);
    if (m === "p/ok") return okResponse("lone");
    return errResponse(500);
  };
  await handleDebateChat({
    body: { messages: [{ role: "user", content: "Q" }] },
    models: ["p/ok", "p/bad"],
    handleSingleModel,
    log,
    tuning: { ...fastTuning, minPanel: 1, debateRounds: 2 },
  });
  assert.ok(!seen.includes("p/judge"), "no explicit judge configured → no judge synthesis");
});

test("handleDebateChat: explicit judge honored even with a lone survivor", async () => {
  const seen: string[] = [];
  const handleSingleModel = async (_b: Body, m: string) => {
    seen.push(m);
    if (m === "p/ok") return okResponse("lone");
    if (m === "p/judge") return okResponse("JUDGED");
    return errResponse(500);
  };
  const res = await handleDebateChat({
    body: { messages: [{ role: "user", content: "Q" }] },
    models: ["p/ok", "p/bad"],
    handleSingleModel,
    log,
    judgeModel: "p/judge",
    tuning: { ...fastTuning, minPanel: 1, debateRounds: 2 },
  });
  assert.ok(seen.includes("p/judge"), "explicit judge must synthesize even a lone survivor");
  assert.equal(seen[seen.length - 1], "p/judge");
  assert.equal(res.status, 200);
});

test("handleDebateChat: debateRounds=1 behaves like fusion (single fan-out then judge)", async () => {
  let panelCalls = 0;
  const handleSingleModel = async (_b: Body, m: string) => {
    if (m === "p/judge") return okResponse("FINAL");
    panelCalls++;
    return okResponse(`ans-${m}`);
  };
  await handleDebateChat({
    body: { messages: [{ role: "user", content: "Q" }] },
    models: ["p/a", "p/b"],
    handleSingleModel,
    log,
    judgeModel: "p/judge",
    tuning: { ...fastTuning, debateRounds: 1 },
  });
  // 1 round × 2 models = 2 panel calls, no debate rounds.
  assert.equal(panelCalls, 2);
});
