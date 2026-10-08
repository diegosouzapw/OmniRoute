import test from "node:test";
import assert from "node:assert/strict";

const { shouldRetrySameAccountTransport, isRetryablePreOutputTransportError } =
  await import("../../src/sse/services/sameAccountTransportRetry.ts");
const { describeMalformedNonStream, UPSTREAM_RESPONDED_ERROR_TYPE } =
  await import("../../open-sse/utils/diagnostics.ts");
const { createErrorResult } = await import("../../open-sse/utils/error.ts");

// Build the exact result chatCore returns for a non-streaming "malformed 200":
// the upstream answered HTTP 200 with a body, the translated response carried
// no usable output, and chatCore surfaces a 502 (malformed_translated_response).
function malformedTranslatedResult(translated: unknown, reason: string) {
  const malformed = describeMalformedNonStream(translated, reason);
  return createErrorResult(
    502,
    `[synthetic/model-x] ${malformed.message}`,
    null,
    malformed.code,
    malformed.type
  );
}

const MALFORMED_CASES: Array<{ name: string; translated: unknown; reason: string; code: string }> =
  [
    {
      name: "empty choices",
      translated: { object: "chat.completion", choices: [] },
      reason: "empty_choices",
      code: "upstream_empty_response",
    },
    {
      name: "Responses API failed status",
      translated: { object: "response", status: "failed", output: [] },
      reason: "empty_choices",
      code: "upstream_response_failed",
    },
    {
      name: "fake success",
      translated: {
        object: "chat.completion",
        choices: [{ message: { role: "assistant", content: "x" } }],
      },
      reason: "content_is_upstream_error",
      code: "upstream_fake_success",
    },
  ];

for (const c of MALFORMED_CASES) {
  test(`malformed 200 (${c.name}) is not replayed on the same account`, () => {
    const result = malformedTranslatedResult(c.translated, c.reason);
    assert.equal(result.status, 502);
    assert.equal(result.errorCode, c.code);
    assert.equal(result.errorType, UPSTREAM_RESPONDED_ERROR_TYPE);

    assert.equal(
      shouldRetrySameAccountTransport({
        status: result.status,
        errorText: result.rawMessage,
        errorCode: result.errorCode,
        errorType: result.errorType,
        attempt: 0,
      }),
      false,
      "the upstream already answered 200 with a body; a same-account retry pays for the call twice"
    );
  });
}

test("the marker type is carried in the client-facing error body", async () => {
  const result = malformedTranslatedResult(
    { object: "chat.completion", choices: [] },
    "empty_choices"
  );
  const body = (await result.response.json()) as { error: { type: string; code: string } };
  assert.equal(body.error.type, UPSTREAM_RESPONDED_ERROR_TYPE);
  assert.equal(body.error.code, "upstream_empty_response");
});

test("a genuine pre-output 502 transport failure is still retried once", () => {
  assert.equal(
    shouldRetrySameAccountTransport({
      status: 502,
      errorText: "upstream connect error or disconnect/reset before headers",
      attempt: 0,
    }),
    true
  );
  assert.equal(
    shouldRetrySameAccountTransport({ status: 502, errorText: "Bad Gateway", attempt: 1 }),
    false
  );
});

test("an upstream-sent 502 without the local marker keeps the existing retry", () => {
  // An upstream that itself returns 502 { code: "upstream_empty_response" } never
  // produced a 200 body here, so the pre-output retry policy is unchanged.
  assert.equal(
    isRetryablePreOutputTransportError(
      502,
      "upstream returned an empty response",
      "upstream_empty_response",
      "server_error"
    ),
    true
  );
});
