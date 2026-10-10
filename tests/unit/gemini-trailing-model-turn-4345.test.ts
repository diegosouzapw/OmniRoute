import { test } from "node:test";
import assert from "node:assert/strict";

import { openaiToGeminiRequest } from "../../open-sse/translator/request/openai-to-gemini.ts";
import { claudeToGeminiRequest } from "../../open-sse/translator/request/claude-to-gemini.ts";
import {
  isGeminiTrailingModelTurnRejectingModel,
  stripTrailingGeminiModelTurns,
} from "../../open-sse/translator/helpers/geminiTrailingModelTurn.ts";

/**
 * Port of decolua/9router#4345 (ArchdukeViel): Gemini 3 rejects requests whose
 * `contents` end on a `model` turn ("Requests ending with a model turn are not
 * supported"). Only the Antigravity executor stripped it; the direct `gemini` /
 * Vertex Gemini translator paths still forwarded the trailing assistant turn.
 */

type Contents = Array<{ role: string; parts: Array<Record<string, unknown>> }>;

function lastRole(contents: Contents): string | undefined {
  return contents[contents.length - 1]?.role;
}

const openaiPrefill = {
  messages: [
    { role: "user", content: "Hello" },
    { role: "assistant", content: "I am thinking about your request." },
  ],
};

const openaiUnansweredToolCall = {
  messages: [
    { role: "user", content: "List files" },
    {
      role: "assistant",
      content: null,
      tool_calls: [{ id: "call_1", type: "function", function: { name: "ls", arguments: "{}" } }],
    },
  ],
  tools: [{ type: "function", function: { name: "ls", parameters: { type: "object" } } }],
};

const claudePrefill = {
  max_tokens: 256,
  messages: [
    { role: "user", content: [{ type: "text", text: "Hello" }] },
    { role: "assistant", content: [{ type: "text", text: "Sure, here" }] },
  ],
};

test("openai→gemini: gemini-3 model drops a trailing assistant (prefill) turn", () => {
  const result = openaiToGeminiRequest("gemini-3-pro-preview", openaiPrefill, false);
  const contents = result.contents as Contents;
  assert.equal(lastRole(contents), "user");
  assert.equal(contents.length, 1);
  assert.equal(contents[0].parts[0].text, "Hello");
});

test("openai→gemini: gemini-3.x model drops a trailing unanswered functionCall turn", () => {
  const result = openaiToGeminiRequest("gemini-3.1-flash", openaiUnansweredToolCall, false);
  const contents = result.contents as Contents;
  assert.equal(lastRole(contents), "user");
  assert.ok(
    !contents.some((c) => c.parts.some((p) => "functionCall" in p)),
    "unanswered trailing functionCall turn must not be forwarded"
  );
});

test("openai→gemini: gemini-2.5 (outside the gate) keeps the trailing model turn", () => {
  const result = openaiToGeminiRequest("gemini-2.5-pro", openaiPrefill, false);
  const contents = result.contents as Contents;
  assert.equal(lastRole(contents), "model");
  assert.equal(contents.length, 2);
});

test("claude→gemini: gemini-3 model drops a trailing assistant (prefill) turn", () => {
  const result = claudeToGeminiRequest("gemini-3-flash-preview", claudePrefill, false);
  const contents = result.contents as Contents;
  assert.equal(lastRole(contents), "user");
  assert.equal(contents.length, 1);
});

test("claude→gemini: gemini-2.5 (outside the gate) keeps the trailing model turn", () => {
  const result = claudeToGeminiRequest("gemini-2.5-flash", claudePrefill, false);
  const contents = result.contents as Contents;
  assert.equal(lastRole(contents), "model");
  assert.equal(contents.length, 2);
});

test("gate: matches gemini-3 chat families only", () => {
  assert.equal(isGeminiTrailingModelTurnRejectingModel("gemini-3-pro-preview"), true);
  assert.equal(isGeminiTrailingModelTurnRejectingModel("gemini-3.1-pro-high"), true);
  assert.equal(isGeminiTrailingModelTurnRejectingModel("gemini-pro-agent"), true);
  assert.equal(isGeminiTrailingModelTurnRejectingModel("gemini-3-pro-image"), false);
  assert.equal(isGeminiTrailingModelTurnRejectingModel("gemini-2.5-pro"), false);
  assert.equal(isGeminiTrailingModelTurnRejectingModel("claude-opus-4-8"), false);
  assert.equal(isGeminiTrailingModelTurnRejectingModel(undefined), false);
});

test("strip helper never empties contents", () => {
  const lone = [{ role: "model", parts: [{ text: "x" }] }];
  assert.equal(stripTrailingGeminiModelTurns(lone).length, 1);
  assert.deepEqual(stripTrailingGeminiModelTurns([]), []);
});
