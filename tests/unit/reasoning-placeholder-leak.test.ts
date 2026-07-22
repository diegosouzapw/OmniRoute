/**
 * Unit tests for reasoning placeholder leak fix (Issue #8081).
 *
 * The internal sentinel "(prior reasoning summary unavailable)" must never
 * leak into visible message.content — it should only appear inside
 * reasoning_content / reasoning fields.
 */
import { describe, test } from "node:test";
import assert from "node:assert/strict";

import {
  sanitizeOpenAIResponse,
  sanitizeStreamingChunk,
} from "../../open-sse/handlers/responseSanitizer.ts";

describe("Reasoning placeholder leak (#8081)", () => {
  // ── Non-streaming ──────────────────────────────────────────────

  test("strips bare placeholder from content (non-streaming)", () => {
    const body = {
      id: "chatcmpl-1",
      object: "chat.completion",
      created: 1,
      model: "test",
      choices: [
        {
          index: 0,
          message: {
            role: "assistant",
            content: "(prior reasoning summary unavailable)",
          },
          finish_reason: "stop",
        },
      ],
    };
    const result = sanitizeOpenAIResponse(body) as Record<string, unknown>;
    assert.equal(
      result.choices[0].message.content,
      "",
      "bare placeholder should be stripped to empty string"
    );
  });

  test("strips placeholder with trailing period and case variation", () => {
    const body = {
      id: "chatcmpl-2",
      object: "chat.completion",
      created: 1,
      model: "test",
      choices: [
        {
          index: 0,
          message: {
            role: "assistant",
            content: "(Prior reasoning summary unavailable.)",
          },
          finish_reason: "stop",
        },
      ],
    };
    const result = sanitizeOpenAIResponse(body) as Record<string, unknown>;
    assert.equal(result.choices[0].message.content, "");
  });

  test("strips <think>-wrapped placeholder", () => {
    const body = {
      id: "chatcmpl-3",
      object: "chat.completion",
      created: 1,
      model: "test",
      choices: [
        {
          index: 0,
          message: {
            role: "assistant",
            content: "<think>(prior reasoning summary unavailable)</think>",
          },
          finish_reason: "stop",
        },
      ],
    };
    const result = sanitizeOpenAIResponse(body) as Record<string, unknown>;
    assert.equal(result.choices[0].message.content, "");
  });

  test("strips 'Thinking:' prefixed placeholder", () => {
    const body = {
      id: "chatcmpl-4",
      object: "chat.completion",
      created: 1,
      model: "test",
      choices: [
        {
          index: 0,
          message: {
            role: "assistant",
            content: "Thinking: (prior reasoning summary unavailable)",
          },
          finish_reason: "stop",
        },
      ],
    };
    const result = sanitizeOpenAIResponse(body) as Record<string, unknown>;
    assert.equal(result.choices[0].message.content, "");
  });

  test("preserves real content when placeholder is mixed in", () => {
    const body = {
      id: "chatcmpl-5",
      object: "chat.completion",
      created: 1,
      model: "test",
      choices: [
        {
          index: 0,
          message: {
            role: "assistant",
            content: "Hello! (prior reasoning summary unavailable) How are you?",
          },
          finish_reason: "stop",
        },
      ],
    };
    const result = sanitizeOpenAIResponse(body) as Record<string, unknown>;
    assert.equal(result.choices[0].message.content, "Hello! How are you?");
  });

  test("does NOT strip placeholder from reasoning_content", () => {
    const body = {
      id: "chatcmpl-6",
      object: "chat.completion",
      created: 1,
      model: "test",
      choices: [
        {
          index: 0,
          message: {
            role: "assistant",
            content: "The answer is 42.",
            reasoning_content: "(prior reasoning summary unavailable)",
          },
          finish_reason: "stop",
        },
      ],
    };
    const result = sanitizeOpenAIResponse(body) as Record<string, unknown>;
    assert.equal(result.choices[0].message.content, "The answer is 42.");
    // reasoning_content is preserved (it's the correct field for the placeholder)
    assert.equal(
      result.choices[0].message.reasoning_content,
      "(prior reasoning summary unavailable)"
    );
  });

  test("leaves unrelated content untouched", () => {
    const body = {
      id: "chatcmpl-7",
      object: "chat.completion",
      created: 1,
      model: "test",
      choices: [
        {
          index: 0,
          message: {
            role: "assistant",
            content: "Just a normal response without any placeholders.",
          },
          finish_reason: "stop",
        },
      ],
    };
    const result = sanitizeOpenAIResponse(body) as Record<string, unknown>;
    assert.equal(
      result.choices[0].message.content,
      "Just a normal response without any placeholders."
    );
  });

  // ── Streaming ──────────────────────────────────────────────────

  test("strips placeholder from streaming delta content", () => {
    const chunk = {
      id: "chatcmpl-s1",
      object: "chat.completion.chunk",
      created: 1,
      model: "test",
      choices: [
        {
          index: 0,
          delta: {
            content: "(prior reasoning summary unavailable)",
          },
        },
      ],
    };
    const result = sanitizeStreamingChunk(chunk) as Record<string, unknown>;
    assert.equal(result.choices[0].delta.content, "");
  });

  test("preserves real content in streaming delta alongside placeholder", () => {
    const chunk = {
      id: "chatcmpl-s2",
      object: "chat.completion.chunk",
      created: 1,
      model: "test",
      choices: [
        {
          index: 0,
          delta: {
            content: "Sure! (prior reasoning summary unavailable) Here is the answer.",
          },
        },
      ],
    };
    const result = sanitizeStreamingChunk(chunk) as Record<string, unknown>;
    assert.equal(result.choices[0].delta.content, "Sure! Here is the answer.");
  });
});
