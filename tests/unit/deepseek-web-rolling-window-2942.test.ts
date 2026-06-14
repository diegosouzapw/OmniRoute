// #2942 — rolling-window prompt memory for deepseek-web. The web API takes only a single
// `prompt` string, so multi-turn context must be stitched into that prompt. With the
// window disabled (default) the legacy behavior (system + last user only) is preserved;
// with a window > 0, the last N turns are stitched into a role-tagged transcript.
import test from "node:test";
import assert from "node:assert/strict";

const { messagesToPrompt } = await import("../../open-sse/executors/deepseek-web.ts");

const CONVO = [
  { role: "system", content: "You are helpful." },
  { role: "user", content: "first question" },
  { role: "assistant", content: "first answer" },
  { role: "user", content: "second question" },
];

test("window 0 (default) keeps legacy behavior: system + last user only", () => {
  const prompt = messagesToPrompt(CONVO, 0);
  assert.ok(prompt.includes("You are helpful."), "system prompt present");
  assert.ok(prompt.includes("second question"), "last user message present");
  assert.ok(!prompt.includes("first question"), "earlier user turn must be dropped");
  assert.ok(!prompt.includes("first answer"), "assistant turn must be dropped");
});

test("default call (no window arg) behaves like window 0", () => {
  const prompt = messagesToPrompt(CONVO);
  assert.ok(prompt.includes("second question"));
  assert.ok(!prompt.includes("first answer"));
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
