import test from "node:test";
import assert from "node:assert/strict";

const { convertCursorToOpenAI } =
  await import("../../open-sse/translator/response/cursor-to-openai.ts");

test("Cursor -> OpenAI response translator passes through streaming chunks", () => {
  const chunk = {
    object: "chat.completion.chunk",
    choices: [{ index: 0, delta: { content: "Hello" }, finish_reason: null }],
  };

  assert.equal(convertCursorToOpenAI(chunk, {}), chunk);
});

test("Cursor -> OpenAI response translator passes through non-streaming completions", () => {
  const chunk = {
    object: "chat.completion",
    choices: [{ index: 0, message: { role: "assistant", content: "Hello" } }],
  };

  assert.equal(convertCursorToOpenAI(chunk, {}), chunk);
});

test("Cursor -> OpenAI response translator returns unknown objects unchanged", () => {
  const chunk = { foo: "bar" };
  assert.equal(convertCursorToOpenAI(chunk, {}), chunk);
});

test("Cursor -> OpenAI response translator ignores null chunks", () => {
  assert.equal(convertCursorToOpenAI(null, {}), null);
});
