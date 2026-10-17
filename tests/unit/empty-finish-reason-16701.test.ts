import test from "node:test";
import assert from "node:assert/strict";

import {
  normalizeOpenAICompatibleFinishReason,
  normalizeOpenAICompatibleFinishReasonString,
} from "../../open-sse/utils/finishReason.ts";
import { sanitizeStreamingChunk } from "../../open-sse/handlers/responseSanitizer.ts";

test("normalizeOpenAICompatibleFinishReason normalizes empty and whitespace-only strings to null (#16701)", () => {
  assert.equal(normalizeOpenAICompatibleFinishReason(""), null);
  assert.equal(normalizeOpenAICompatibleFinishReason("   "), null);
  assert.equal(normalizeOpenAICompatibleFinishReason("\t\n"), null);
});

test("normalizeOpenAICompatibleFinishReasonString keeps fallback for empty and whitespace-only strings (#16701)", () => {
  assert.equal(normalizeOpenAICompatibleFinishReasonString(""), "stop");
  assert.equal(normalizeOpenAICompatibleFinishReasonString("   "), "stop");
  assert.equal(normalizeOpenAICompatibleFinishReasonString("", "length"), "length");
});

test("sanitizeStreamingChunk normalizes empty string finish_reason to null (#16701)", () => {
  const rawChunk = {
    id: "chunk-1",
    object: "chat.completion.chunk",
    created: 1234567890,
    model: "test-model",
    choices: [
      {
        index: 0,
        delta: { content: "hello" },
        finish_reason: "",
      },
    ],
  };

  const sanitized = sanitizeStreamingChunk(rawChunk);
  assert.equal(sanitized.choices[0].finish_reason, null);
});

test("sanitizeStreamingChunk preserves valid finish_reasons (#16701)", () => {
  const rawChunk = {
    id: "chunk-2",
    object: "chat.completion.chunk",
    created: 1234567890,
    model: "test-model",
    choices: [
      {
        index: 0,
        delta: {},
        finish_reason: "tool_calls",
      },
    ],
  };

  const sanitized = sanitizeStreamingChunk(rawChunk);
  assert.equal(sanitized.choices[0].finish_reason, "tool_calls");
});
