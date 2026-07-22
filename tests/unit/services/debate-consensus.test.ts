/**
 * Consensus measurement + consensus-stop for the debate strategy.
 *
 * The consensus functions (tokenizeForConsensus / jaccard / measureConsensus) are
 * pure and deterministic — no LLM call — so early-stop behavior is fully unit-
 * testable. These tests pin the math and the end-to-end early-stop wiring in
 * handleDebateChat (a panel that converges stops before running all rounds).
 */
import test from "node:test";
import assert from "node:assert/strict";

const {
  tokenizeForConsensus,
  jaccard,
  measureConsensus,
  handleDebateChat,
} = await import("../../../open-sse/services/debate.ts");

const noop = () => {};
const log = { info: noop, warn: noop, debug: noop, error: noop };

type Body = Record<string, unknown>;

function okResponse(content: string): Response {
  return new Response(JSON.stringify({ choices: [{ message: { role: "assistant", content } }] }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

// --- Pure math ---------------------------------------------------------------

test("tokenizeForConsensus: lowercases, strips punctuation, drops short tokens", () => {
  const set = tokenizeForConsensus("The Quick, brown FOX! a to");
  assert.ok(set.has("the"));
  assert.ok(set.has("quick"));
  assert.ok(set.has("brown"));
  assert.ok(set.has("fox"));
  // "a"/"to" are < 3 chars → dropped
  assert.ok(!set.has("a"));
  assert.ok(!set.has("to"));
});

test("jaccard: identical sets = 1, disjoint = 0, two empty = 1", () => {
  assert.equal(jaccard(new Set(["a", "b"]), new Set(["a", "b"])), 1);
  assert.equal(jaccard(new Set(["a"]), new Set(["b"])), 0);
  assert.equal(jaccard(new Set(), new Set()), 1);
  assert.equal(jaccard(new Set(["a"]), new Set()), 0);
});

test("jaccard: partial overlap", () => {
  // {a,b,c} vs {b,c,d}: ∩={b,c}=2, ∪={a,b,c,d}=4 → 0.5
  assert.equal(jaccard(new Set(["a", "b", "c"]), new Set(["b", "c", "d"])), 0.5);
});

test("measureConsensus: <2 answers → 1", () => {
  assert.equal(measureConsensus([]), 1);
  assert.equal(measureConsensus([{ model: "a", text: "hello world" }]), 1);
});

test("measureConsensus: identical answers → 1, distinct → low", () => {
  const identical = measureConsensus([
    { model: "a", text: "the sky is blue today" },
    { model: "b", text: "the sky is blue today" },
  ]);
  assert.equal(identical, 1);

  const distinct = measureConsensus([
    { model: "a", text: "quantum entanglement physics theory" },
    { model: "b", text: "medieval european castle architecture" },
  ]);
  assert.ok(distinct < 0.2, `distinct answers should score low, got ${distinct}`);
});

// --- End-to-end early stop ---------------------------------------------------

test("handleDebateChat: converged panel stops before running all rounds", async () => {
  // All models return the SAME text every round → consensus = 1 ≥ 0.85 → early stop
  // after round 1. With debateRounds=5 we'd otherwise see R0..R4; early stop means
  // the panel is called for R0 + R1 only (then judge).
  const roundsSeen = new Set<string>();
  let panelCalls = 0;
  const handleSingleModel = async (b: Body, m: string) => {
    const msgs = (b.messages as Array<{ content: string }>) ?? [];
    const last = msgs[msgs.length - 1]?.content ?? "";
    const isJudge = last.includes("JUDGE");
    if (isJudge) return okResponse("FINAL");
    panelCalls++;
    // identical answer regardless of model → forces consensus
    return okResponse("the answer is exactly forty two units precisely");
  };

  const res = await handleDebateChat({
    body: { messages: [{ role: "user", content: "q" }] },
    models: ["p/a", "p/b"],
    handleSingleModel,
    log,
    tuning: { debateRounds: 5, consensusThreshold: 0.85 },
  });

  assert.equal(res.status, 200);
  // R0 (2 calls) + R1 (2 calls) = 4 panel calls, then early stop. Without early stop
  // a 5-round debate on 2 models would make 10 panel calls.
  assert.equal(panelCalls, 4, `expected early stop after R1 (4 panel calls), got ${panelCalls}`);
  void roundsSeen;
});

test("handleDebateChat: consensusThreshold > 1 disables early stop (runs all rounds)", async () => {
  let panelCalls = 0;
  const handleSingleModel = async (b: Body, m: string) => {
    const msgs = (b.messages as Array<{ content: string }>) ?? [];
    const last = msgs[msgs.length - 1]?.content ?? "";
    if (last.includes("JUDGE")) return okResponse("FINAL");
    panelCalls++;
    return okResponse("identical text every round for all models here");
  };

  await handleDebateChat({
    body: { messages: [{ role: "user", content: "q" }] },
    models: ["p/a", "p/b"],
    handleSingleModel,
    log,
    tuning: { debateRounds: 3, consensusThreshold: 1.01 },
  });

  // 3 rounds × 2 models = 6 panel calls (no early stop despite identical answers).
  assert.equal(panelCalls, 6, `expected all 3 rounds (6 calls), got ${panelCalls}`);
});
