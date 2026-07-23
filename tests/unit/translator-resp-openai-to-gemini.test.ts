/**
 * Regression test: the response-translator registry had an OpenAI→Antigravity
 * projection registered, but no OpenAI→Gemini one. When a client request is
 * detected as Gemini format (`sourceFormat`, e.g. a body-shape match on
 * `contents: [...]` per `detectFormat()`) and combo routing lands on an
 * OpenAI-native provider (`targetFormat`), `translateResponse()` fell through
 * the hub-and-spoke path with no `openai -> gemini` translator registered, so
 * the raw OpenAI `chat.completion.chunk` shape reached a client expecting the
 * shared Gemini `response.candidates[]` envelope (mirrors upstream
 * decolua/9router#2398 / #2399).
 *
 * The fix registers `FORMATS.OPENAI -> FORMATS.GEMINI` reusing the existing
 * `openaiToAntigravityResponse` projection — both Gemini and Antigravity
 * consumers already share the same `{ response: { candidates: [...] } }`
 * envelope elsewhere in the pipeline (see `unwrapGeminiChunk` callers in
 * `open-sse/utils/stream.ts`), so no new projection logic is introduced.
 */

import test from "node:test";
import assert from "node:assert/strict";

const { translateResponse } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

test("OpenAI -> Gemini: registry projects a final OpenAI chunk into the Gemini candidates envelope", () => {
  const state: Record<string, unknown> = {};

  // Matches production call sites (open-sse/utils/stream.ts): targetFormat is
  // the upstream PROVIDER's native format, sourceFormat is the CLIENT's
  // requested format.
  const translated = translateResponse(
    FORMATS.OPENAI,
    FORMATS.GEMINI,
    {
      id: "chatcmpl-1",
      object: "chat.completion.chunk",
      model: "gpt-4.1",
      choices: [
        {
          index: 0,
          delta: { content: "hello" },
          finish_reason: "stop",
        },
      ],
      usage: { prompt_tokens: 3, completion_tokens: 2, total_tokens: 5 },
    },
    state
  );

  assert.equal(translated.length, 1);
  const [result] = translated as Array<Record<string, unknown>>;

  // The original bug: raw OpenAI shape leaking through unchanged.
  assert.equal((result as { choices?: unknown }).choices, undefined);
  assert.equal((result as { object?: unknown }).object, undefined);

  // The expected Gemini-family envelope (same shape as Antigravity's).
  const response = (result as { response?: Record<string, unknown> }).response;
  assert.ok(response, "expected a wrapped { response } envelope");
  const candidates = response!.candidates as Array<Record<string, unknown>>;
  const parts = (candidates[0].content as { parts: Array<Record<string, unknown>> }).parts;
  assert.deepEqual(parts[0], { text: "hello" });
  assert.equal(candidates[0].finishReason, "STOP");
  assert.equal((response!.usageMetadata as Record<string, unknown>).totalTokenCount, 5);
});

test("OpenAI -> Gemini: reasoning, text, and usage project correctly (mirrors Antigravity projection)", () => {
  const state: Record<string, unknown> = {};

  const chunk1 = translateResponse(
    FORMATS.OPENAI,
    FORMATS.GEMINI,
    {
      id: "chatcmpl-2",
      model: "gpt-4.1",
      choices: [
        { index: 0, delta: { reasoning_content: "think" }, finish_reason: null },
      ],
    },
    state
  );
  const chunk2 = translateResponse(
    FORMATS.OPENAI,
    FORMATS.GEMINI,
    {
      id: "chatcmpl-2",
      model: "gpt-4.1",
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
      usage: { prompt_tokens: 3, completion_tokens: 5, total_tokens: 8 },
    },
    state
  );

  const first = (chunk1 as Array<Record<string, unknown>>)[0];
  const firstResponse = (first as { response: Record<string, unknown> }).response;
  const firstParts = (
    (firstResponse.candidates as Array<Record<string, unknown>>)[0].content as {
      parts: Array<Record<string, unknown>>;
    }
  ).parts;
  assert.deepEqual(firstParts[0], { thought: true, text: "think" });

  const last = (chunk2 as Array<Record<string, unknown>>)[0];
  const lastResponse = (last as { response: Record<string, unknown> }).response;
  assert.equal(
    (lastResponse.candidates as Array<Record<string, unknown>>)[0].finishReason,
    "STOP"
  );
  assert.equal(
    (lastResponse.usageMetadata as Record<string, unknown>).totalTokenCount,
    8
  );
});
