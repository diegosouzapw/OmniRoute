// #2942 — rolling-window prompt memory for deepseek-web. The web API takes only a single
// `prompt` string, so multi-turn context must be stitched into that prompt. With an
// explicit `historyWindow > 0`, the last N turns are stitched into a role-tagged
// transcript.
//
// #10527 — with the window unset/<=0 (default), a genuinely multi-turn conversation
// (any assistant turn present, or more than one user turn) now auto-replays a bounded
// trajectory instead of the old "system + last user only" behavior, which silently
// dropped the original task for agentic clients (Cline) that never send OpenAI-native
// `tools[]`. Only a genuinely single-turn request (one user message, no assistant turns)
// keeps the minimal "system + last user only" prompt.
import test from "node:test";
import assert from "node:assert/strict";

const { messagesToPrompt } = await import("../../../open-sse/executors/deepseek-web.ts");

const CONVO = [
  { role: "system", content: "You are helpful." },
  { role: "user", content: "first question" },
  { role: "assistant", content: "first answer" },
  { role: "user", content: "second question" },
];

test("window 0 (default) on a multi-turn conversation auto-replays the bounded trajectory (#10527)", () => {
  const prompt = messagesToPrompt(CONVO, 0);
  assert.ok(prompt.includes("You are helpful."), "system prompt present");
  assert.ok(prompt.includes("second question"), "last user message present");
  assert.ok(prompt.includes("first question"), "earlier user turn must survive (#10527)");
  assert.ok(prompt.includes("first answer"), "assistant turn must survive (#10527)");
});

test("default call (no window arg) on a multi-turn conversation behaves like window 0 (#10527)", () => {
  const prompt = messagesToPrompt(CONVO);
  assert.ok(prompt.includes("second question"));
  assert.ok(prompt.includes("first answer"), "assistant turn must survive (#10527)");
});

test("window 0 (default) on a genuinely single-turn request keeps the minimal system + last-user-only prompt", () => {
  const singleTurn = [
    { role: "system", content: "You are helpful." },
    { role: "user", content: "second question" },
  ];
  const prompt = messagesToPrompt(singleTurn, 0);
  assert.equal(prompt, "You are helpful.\n\nsecond question");
});

test("window > 0 stitches recent turns into a role-tagged transcript", () => {
  const prompt = messagesToPrompt(CONVO, 10);
  assert.ok(prompt.includes("You are helpful."), "system prompt still leads");
  assert.ok(prompt.includes("first question"), "earlier user turn carried");
  assert.ok(prompt.includes("first answer"), "assistant turn carried");
  assert.ok(prompt.includes("second question"), "latest user turn carried");
  assert.ok(/User:\s*first question/.test(prompt), "user turns role-tagged");
  assert.ok(/Assistant:\s*first answer/.test(prompt), "assistant turns role-tagged");
});

test("window caps to the last N non-system turns", () => {
  const long = [
    { role: "system", content: "sys" },
    { role: "user", content: "u1" },
    { role: "assistant", content: "a1" },
    { role: "user", content: "u2" },
    { role: "assistant", content: "a2" },
    { role: "user", content: "u3" },
  ];
  const prompt = messagesToPrompt(long, 2);
  // last 2 non-system turns are a2 + u3
  assert.ok(prompt.includes("a2"), "second-to-last turn present");
  assert.ok(prompt.includes("u3"), "last turn present");
  assert.ok(!prompt.includes("u1"), "older turn dropped");
  assert.ok(!prompt.includes("a1"), "older turn dropped");
  assert.ok(prompt.includes("sys"), "system prompt always present");
});

test("empty messages -> empty prompt", () => {
  assert.equal(messagesToPrompt([], 10), "");
});
