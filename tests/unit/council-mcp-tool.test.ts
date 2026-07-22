/**
 * omniroute_council MCP tool — pure SSE→result fold.
 *
 * The council MCP tool POSTs to /api/v1/council and drains the SSE envelope.
 * foldCouncilResult + parseSseEvents are pure (no I/O), so we test the
 * event-folding contract against fixture event logs — no live server needed.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { foldCouncilResult, parseSseEvents } = await import(
  "../../open-sse/mcp-server/tools/councilTool.ts"
);

test("parseSseEvents: extracts data: JSON lines, skips [DONE] and noise", () => {
  const text = [
    'data: {"type":"round_start","round":0,"models":["a","b"]}',
    "",
    ": comment line",
    'data: {"type":"done","rounds":1,"totalAnswers":2}',
    "data: [DONE]",
    "data: not-json",
  ].join("\n");
  const events = parseSseEvents(text);
  assert.equal(events.length, 2);
  assert.equal(events[0].type, "round_start");
  assert.equal(events[1].type, "done");
});

test("foldCouncilResult: folds a full non-stream run into a structured result", () => {
  const events = [
    { type: "round_start", round: 0, models: ["p/a", "p/b"] },
    { type: "panel_answer", round: 0, model: "p/a", text: "ans a" },
    { type: "panel_answer", round: 0, model: "p/b", text: "ans b" },
    { type: "round_end", round: 0, answers: 2 },
    { type: "round_start", round: 1, models: ["p/a", "p/b"] },
    { type: "panel_answer", round: 1, model: "p/a", text: "refine a" },
    { type: "panel_answer", round: 1, model: "p/b", text: "refine b" },
    { type: "round_end", round: 1, answers: 2 },
    { type: "synthesis_start", judge: "p/a" },
    { type: "synthesis", completion: { choices: [{ message: { content: "FINAL" } }] } },
    { type: "done", rounds: 2, totalAnswers: 4, durationMs: 1234 },
  ];
  const result = foldCouncilResult(events);
  assert.equal(result.answer, "FINAL");
  assert.equal(result.judge, "p/a");
  assert.equal(result.rounds, 2);
  assert.equal(result.totalAnswers, 4);
  assert.deepEqual(result.panel.sort(), ["p/a", "p/b"]);
  assert.equal(result.consensusStoppedEarly, false);
});

test("foldCouncilResult: accumulates streamed judge tokens", () => {
  const events = [
    { type: "round_start", round: 0, models: ["p/a", "p/b"] },
    { type: "panel_answer", round: 0, model: "p/a", text: "x" },
    { type: "synthesis_start", judge: "p/b" },
    { type: "token", text: "Hello " },
    { type: "token", text: "world" },
    { type: "done", rounds: 1, totalAnswers: 1 },
  ];
  const result = foldCouncilResult(events);
  assert.equal(result.answer, "Hello world");
  assert.equal(result.judge, "p/b");
});

test("foldCouncilResult: consensus event flags an early stop", () => {
  const events = [
    { type: "round_start", round: 0, models: ["p/a", "p/b"] },
    { type: "panel_answer", round: 0, model: "p/a", text: "x" },
    { type: "consensus", round: 1, score: 0.91 },
    { type: "synthesis", text: "done" },
    { type: "done", rounds: 2, totalAnswers: 4 },
  ];
  const result = foldCouncilResult(events);
  assert.equal(result.consensusStoppedEarly, true);
});

test("foldCouncilResult: fatal error with no answer throws", () => {
  const events = [
    { type: "round_start", round: 0, models: ["p/a"] },
    { type: "error", message: "All panel models failed in round 0" },
  ];
  assert.throws(() => foldCouncilResult(events), /All panel models failed/);
});

test("foldCouncilResult: an answer despite a late error does not throw", () => {
  const events = [
    { type: "synthesis", text: "partial answer" },
    { type: "error", message: "trailing hiccup" },
  ];
  const result = foldCouncilResult(events);
  assert.equal(result.answer, "partial answer");
});
