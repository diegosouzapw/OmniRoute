import test from "node:test";
import assert from "node:assert/strict";

import { FORMATS } from "../../open-sse/translator/formats.ts";
import { translateNonStreamingResponse } from "../../open-sse/handlers/responseTranslator.ts";

interface GeminiFamilyPart {
  text?: string;
  thought?: boolean;
  functionCall?: { name: string; args: Record<string, unknown> };
}

interface GeminiFamilyResponse {
  choices?: unknown;
  response?: {
    candidates: Array<{
      content: { role: string; parts: GeminiFamilyPart[] };
      finishReason: string;
      index: number;
    }>;
    usageMetadata: {
      promptTokenCount: number;
      candidatesTokenCount: number;
      totalTokenCount: number;
    };
  };
}

/**
 * Regression guard for the projection drift ported from decolua/9router#2348.
 *
 * The streaming SSE path already projects an OpenAI-shaped chunk into the
 * Antigravity/Gemini `{ response: { candidates: [...] } }` envelope via the
 * registered `FORMATS.OPENAI -> FORMATS.ANTIGRAVITY` translator
 * (open-sse/translator/response/openai-to-antigravity.ts).
 *
 * The non-streaming JSON path (`/v1/antigravity` with `stream:false`, or any
 * combo target whose provider speaks a different wire format than the
 * client) goes through `translateNonStreamingResponse` instead — a
 * hand-rolled function whose "Phase 3: translate back to client format" step
 * only special-cases FORMATS.CLAUDE. For every other non-OpenAI client format
 * (Gemini, Antigravity) it silently falls through and returns the raw OpenAI
 * chat.completion shape, leaking `choices[]`/`tool_calls` instead of the
 * client's expected `candidates[]`/`functionCall` envelope — the exact
 * "leaks OpenAI format to non-OpenAI clients, function calls dropped" bug
 * class from the upstream report.
 */
test("translateNonStreamingResponse projects an OpenAI provider payload back to the Antigravity/Gemini envelope for antigravity clients", () => {
  const openAICompletion = {
    id: "chatcmpl-1",
    object: "chat.completion",
    created: 1700000000,
    model: "gpt-4o",
    choices: [
      {
        index: 0,
        message: {
          role: "assistant",
          content: "",
          tool_calls: [
            {
              id: "call_1",
              type: "function",
              function: { name: "lookup", arguments: '{"q":"x"}' },
            },
          ],
        },
        finish_reason: "tool_calls",
      },
    ],
    usage: { prompt_tokens: 3, completion_tokens: 5, total_tokens: 8 },
  };

  const translated = translateNonStreamingResponse(
    openAICompletion,
    FORMATS.OPENAI,
    FORMATS.ANTIGRAVITY
  ) as GeminiFamilyResponse;

  // The Antigravity/Gemini client expects a `{ response: { candidates: [...] } }`
  // envelope with `functionCall` parts, never a raw OpenAI `choices[]`/`tool_calls`
  // shape.
  assert.ok(
    translated?.response?.candidates,
    `expected {response:{candidates:[...]}} envelope for an antigravity client, got: ${JSON.stringify(translated)}`
  );
  assert.equal(translated.choices, undefined);

  const candidate = translated.response!.candidates[0];
  assert.equal(candidate.content.role, "model");
  assert.deepEqual(candidate.content.parts[0].functionCall, {
    name: "lookup",
    args: { q: "x" },
  });
  assert.equal(candidate.finishReason, "STOP");
  assert.equal(translated.response!.usageMetadata.totalTokenCount, 8);
});

test("translateNonStreamingResponse projects a Claude provider payload back to the Gemini envelope for gemini clients", () => {
  const claudeMessage = {
    id: "msg_1",
    type: "message",
    role: "assistant",
    model: "claude-sonnet",
    content: [
      { type: "thinking", thinking: "reasoning trace" },
      { type: "text", text: "final answer" },
    ],
    stop_reason: "end_turn",
    stop_sequence: null,
    usage: { input_tokens: 4, output_tokens: 6 },
  };

  const translated = translateNonStreamingResponse(
    claudeMessage,
    FORMATS.CLAUDE,
    FORMATS.GEMINI
  ) as GeminiFamilyResponse;

  assert.ok(
    translated?.response?.candidates,
    `expected {response:{candidates:[...]}} envelope for a gemini client, got: ${JSON.stringify(translated)}`
  );
  const parts = translated.response!.candidates[0].content.parts;
  assert.deepEqual(
    parts.find((p) => p.thought === true),
    { text: "reasoning trace", thought: true }
  );
  assert.ok(parts.some((p) => p.text === "final answer"));
});

test("translateNonStreamingResponse degrades malformed tool-call arguments to {} instead of throwing", () => {
  // A provider emitting truncated/invalid JSON in `arguments` must not take down the
  // whole non-streaming response path with an uncaught SyntaxError.
  const openAICompletion = {
    id: "chatcmpl-2",
    object: "chat.completion",
    created: 1700000000,
    model: "gpt-4o",
    choices: [
      {
        index: 0,
        message: {
          role: "assistant",
          content: "",
          tool_calls: [
            { id: "call_1", type: "function", function: { name: "lookup", arguments: '{"q":' } },
          ],
        },
        finish_reason: "tool_calls",
      },
    ],
  };

  const translated = translateNonStreamingResponse(
    openAICompletion,
    FORMATS.OPENAI,
    FORMATS.GEMINI
  ) as GeminiFamilyResponse;

  assert.deepEqual(translated.response!.candidates[0].content.parts[0].functionCall, {
    name: "lookup",
    args: {},
  });
});
