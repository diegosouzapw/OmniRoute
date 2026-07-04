/**
 * Gemini MALFORMED_RESPONSE detection — when the upstream returns HTTP 200 with an SSE body
 * containing `finishReason: "MALFORMED_RESPONSE"` and empty text, the combo should treat it
 * as a quality failure and retry on a sibling model.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { isGeminiMalformedFinishReason } from "../../open-sse/utils/streamHelpers.ts";

// ── isGeminiMalformedFinishReason ────────────────────────────────────────────

test("detects MALFORMED_RESPONSE with empty text in candidates", () => {
  const parsed = {
    candidates: [
      {
        content: { parts: [{ text: "" }], role: "model" },
        finishReason: "MALFORMED_RESPONSE",
        index: 0,
      },
    ],
    usageMetadata: { promptTokenCount: 477, totalTokenCount: 2079 },
    modelVersion: "gemma-4-31b-it",
  };
  assert.equal(isGeminiMalformedFinishReason(parsed), true);
});

test("detects MALFORMED_RESPONSE with no parts array", () => {
  const parsed = {
    candidates: [
      {
        content: { parts: [], role: "model" },
        finishReason: "MALFORMED_RESPONSE",
        index: 0,
      },
    ],
  };
  assert.equal(isGeminiMalformedFinishReason(parsed), true);
});

test("detects MALFORMED_RESPONSE with missing content", () => {
  const parsed = {
    candidates: [
      {
        finishReason: "MALFORMED_RESPONSE",
        index: 0,
      },
    ],
  };
  assert.equal(isGeminiMalformedFinishReason(parsed), true);
});

test("does NOT flag MALFORMED_RESPONSE when text is non-empty", () => {
  const parsed = {
    candidates: [
      {
        content: { parts: [{ text: "some output" }], role: "model" },
        finishReason: "MALFORMED_RESPONSE",
        index: 0,
      },
    ],
  };
  assert.equal(isGeminiMalformedFinishReason(parsed), false);
});

test("does NOT flag STOP finish reason with empty text", () => {
  const parsed = {
    candidates: [
      {
        content: { parts: [{ text: "" }], role: "model" },
        finishReason: "STOP",
        index: 0,
      },
    ],
  };
  assert.equal(isGeminiMalformedFinishReason(parsed), false);
});

test("does NOT flag when candidates array is missing", () => {
  assert.equal(isGeminiMalformedFinishReason({ usageMetadata: {} }), false);
});

test("does NOT flag when candidates array is empty", () => {
  assert.equal(isGeminiMalformedFinishReason({ candidates: [] }), false);
});

test("handles nested response.candidates shape", () => {
  const parsed = {
    response: {
      candidates: [
        {
          content: { parts: [{ text: "" }], role: "model" },
          finishReason: "MALFORMED_RESPONSE",
          index: 0,
        },
      ],
    },
  };
  assert.equal(isGeminiMalformedFinishReason(parsed), true);
});

test("does NOT flag non-malformed Gemini response with functionCall", () => {
  const parsed = {
    candidates: [
      {
        content: {
          parts: [{ functionCall: { name: "tool", args: {} } }],
          role: "model",
        },
        finishReason: "STOP",
        index: 0,
      },
    ],
  };
  assert.equal(isGeminiMalformedFinishReason(parsed), false);
});

test("real-world sanitized Gemini 500 response body is NOT malformed (error field, not candidates)", () => {
  // The Gemini 500 response has an error field, not candidates — this is handled by the
  // HTTP status check, not the MALFORMED_RESPONSE detector.
  const parsed = {
    error: {
      code: 500,
      message: "Internal error encountered.",
      status: "INTERNAL",
    },
  };
  assert.equal(isGeminiMalformedFinishReason(parsed), false);
});
