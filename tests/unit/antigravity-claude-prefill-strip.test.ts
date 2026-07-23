import { test } from "node:test";
import assert from "node:assert/strict";

import {
  AntigravityExecutor,
  __test_stripTrailingAntigravityAssistantTurn,
} from "../../open-sse/executors/antigravity.ts";

/**
 * Ports decolua/9router#2321 (anki1kr): Vertex AI (used by Antigravity for
 * Claude-branded models) rejects a conversation ending on an assistant turn —
 * "This model does not support assistant message prefill" — so the request must
 * always end on a user turn.
 *
 * Upstream's diff patched `openaiToClaudeRequestForAntigravity` in
 * `open-sse/translator/request/openai-to-claude.ts`, which has ZERO callers in
 * OmniRoute (dead code). The live Antigravity Claude dispatch path converts to
 * Gemini `contents` (`role: "user"/"model"`) in `AntigravityExecutor.transformRequest`
 * via `sanitizeAntigravityGeminiRequest` — this test drives THAT function end-to-end.
 */

async function transform(model: string, contents: Array<Record<string, unknown>>) {
  const executor = new AntigravityExecutor();
  const body = {
    request: {
      contents,
      generationConfig: {},
    },
  };
  const result = await executor.transformRequest(model, body, true, {
    projectId: "project-1",
  });
  if (result instanceof Response) throw new Error("Unexpected Response from transformRequest");
  return (result as Record<string, unknown>).request as Record<string, unknown>;
}

test("(a) strips a single trailing assistant (model) turn for Claude models", async () => {
  const request = await transform("antigravity/claude-opus-4-8", [
    { role: "user", parts: [{ text: "Hello" }] },
    { role: "model", parts: [{ text: "Hi there" }] }, // prefill to strip
  ]);
  const contents = request.contents as Array<{ role: string }>;
  assert.equal(contents.length, 1);
  assert.equal(contents.at(-1)?.role, "user");
});

test("(b) does NOT strip a trailing model turn for non-Claude (native Gemini) models", async () => {
  const request = await transform("antigravity/gemini-3.1-pro", [
    { role: "user", parts: [{ text: "Hello" }] },
    { role: "model", parts: [{ text: "Hi there" }] },
  ]);
  const contents = request.contents as Array<{ role: string }>;
  assert.equal(contents.length, 2);
  assert.equal(contents.at(-1)?.role, "model", "native Gemini requests via Antigravity are untouched");
});

test("(c) a Claude conversation already ending on user is unchanged", async () => {
  const request = await transform("antigravity/claude-opus-4-8", [
    { role: "user", parts: [{ text: "Hello" }] },
    { role: "model", parts: [{ text: "Hi" }] },
    { role: "user", parts: [{ text: "What is 2+2?" }] },
  ]);
  const contents = request.contents as Array<{ role: string }>;
  assert.equal(contents.length, 3);
  assert.equal(contents.at(-1)?.role, "user");
});

test("(d) multiple trailing model turns are all stripped", () => {
  // Under normal executor flow, adjacent same-role turns are merged before this
  // helper runs — this directly exercises the helper's robustness for an input
  // that (defensively) still carries multiple consecutive trailing "model" turns.
  const request = __test_stripTrailingAntigravityAssistantTurn({
    contents: [
      { role: "user", parts: [{ text: "Hello" }] },
      { role: "model", parts: [{ text: "A" }] },
      { role: "model", parts: [{ text: "B" }] },
    ],
  });
  const contents = request.contents as Array<{ role: string }>;
  assert.equal(contents.length, 1);
  assert.equal(contents.at(-1)?.role, "user");
});

test("(e) never strips contents down to empty", () => {
  const request = __test_stripTrailingAntigravityAssistantTurn({
    contents: [{ role: "model", parts: [{ text: "solo prefill" }] }],
  });
  const contents = request.contents as Array<{ role: string }>;
  // A lone trailing "model" turn is preserved rather than emptying `contents`
  // (an empty contents array is itself an invalid upstream request).
  assert.equal(contents.length, 1);
  assert.equal(contents[0].role, "model");
});

test("empty/missing contents does not throw", () => {
  const request = __test_stripTrailingAntigravityAssistantTurn({ contents: [] });
  assert.deepEqual(request.contents, []);

  const request2 = __test_stripTrailingAntigravityAssistantTurn({});
  assert.equal(request2.contents, undefined);
});
