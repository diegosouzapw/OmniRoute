/**
 * Non-streaming Responses API & Chat Completions mid-stream error handling.
 *
 * When Gemini returns an error JSON (e.g. 503 UNAVAILABLE) as the non-streaming
 * response body, the non-streaming translator must handle it gracefully.
 *
 * Streaming Responses API mid-stream error coverage is in
 * `gemini-midstream-responses.test.ts` (via `translateResponse`).
 */
import test from "node:test";
import assert from "node:assert/strict";

const { translateNonStreamingResponse } =
  await import("../../open-sse/handlers/responseTranslator.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

const ERROR_BODY = {
  error: {
    code: 503,
    message:
      "This model is currently experiencing high demand. Spikes in demand are usually temporary. Please try again later.",
    status: "UNAVAILABLE",
  },
};

const ERROR_BODY_RESOURCE_EXHAUSTED = {
  error: {
    code: 429,
    message: "Resource has been exhausted (e.g. check quota).",
    status: "RESOURCE_EXHAUSTED",
  },
};

test("Responses API non-streaming: Gemini error returns raw error body (no candidates)", () => {
  const result = translateNonStreamingResponse(
    ERROR_BODY,
    FORMATS.GEMINI,
    FORMATS.OPENAI_RESPONSES
  );

  // The translator has no candidates or promptFeedback to work with
  // so it returns the raw error body unchanged. The caller's
  // detectMalformedNonStream catches this as `empty_choices`.
  assert.equal(result, ERROR_BODY);
});

test("Responses API non-streaming: Gemini error body has no valid output", () => {
  const result = translateNonStreamingResponse(
    ERROR_BODY,
    FORMATS.GEMINI,
    FORMATS.OPENAI_RESPONSES
  ) as Record<string, unknown>;

  // No chat.completion shape, no choices, no output array
  assert.equal(result.object, undefined);
  assert.equal(result.choices, undefined);
  assert.ok(result.error, "raw error object should be preserved");
});

test("Chat Completions non-streaming: Gemini error returns raw error body", () => {
  const result = translateNonStreamingResponse(ERROR_BODY, FORMATS.GEMINI, FORMATS.OPENAI);

  // Same behavior as Responses API: no candidates → pass-through
  assert.equal(result, ERROR_BODY);
});

test("Non-streaming: 429 RESOURCE_EXHAUSTED also returns raw error body", () => {
  const result = translateNonStreamingResponse(
    ERROR_BODY_RESOURCE_EXHAUSTED,
    FORMATS.GEMINI,
    FORMATS.OPENAI_RESPONSES
  ) as Record<string, unknown>;

  assert.equal(result, ERROR_BODY_RESOURCE_EXHAUSTED);
  if (result.error) {
    assert.equal((result.error as Record<string, unknown>).code, 429);
    assert.equal((result.error as Record<string, unknown>).status, "RESOURCE_EXHAUSTED");
  }
});

test("Non-streaming: Antigravity error inside response envelope is passed through", () => {
  const agErrorBody = {
    response: {
      error: { code: 503, message: "overloaded", status: "UNAVAILABLE" },
    },
  };

  const result = translateNonStreamingResponse(
    agErrorBody,
    FORMATS.GEMINI,
    FORMATS.OPENAI_RESPONSES
  );

  // The response envelope has no candidates → passes through
  assert.equal(result, agErrorBody);
});

test("Non-streaming: valid Gemini response with candidates still translates correctly", () => {
  const result = translateNonStreamingResponse(
    {
      responseId: "resp-ok",
      modelVersion: "gemini-2.5-flash",
      createTime: "2026-04-05T12:00:00.000Z",
      candidates: [
        {
          content: { parts: [{ text: "Hello" }] },
          finishReason: "STOP",
        },
      ],
      usageMetadata: {
        promptTokenCount: 1,
        candidatesTokenCount: 1,
        totalTokenCount: 2,
      },
    },
    FORMATS.GEMINI,
    FORMATS.OPENAI_RESPONSES
  ) as Record<string, unknown>;

  assert.equal(result.object, "chat.completion");
  assert.equal((result.choices as unknown[])[0]?.message?.content, "Hello");
});

test("detectMalformedNonStream classifies Gemini error body as empty_choices", async () => {
  const { detectMalformedNonStream } = await import("../../open-sse/utils/diagnostics.ts");

  // translateNonStreamingResponse returns the raw error body
  const raw = translateNonStreamingResponse(ERROR_BODY, FORMATS.GEMINI, FORMATS.OPENAI_RESPONSES);

  const diagnosis = detectMalformedNonStream(raw);
  assert.equal(
    diagnosis,
    "empty_choices",
    "error body without choices should be classified as empty_choices"
  );
});
