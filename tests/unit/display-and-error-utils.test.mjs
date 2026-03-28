import test from "node:test";
import assert from "node:assert/strict";

const { toJsonErrorPayload } = await import("../../src/shared/utils/upstreamError.ts");
const { createErrorResponse, createErrorResponseFromUnknown } =
  await import("../../src/lib/api/errorResponse.ts");
const { getAccountDisplayName, getProviderDisplayName } =
  await import("../../src/lib/display/names.ts");

test("toJsonErrorPayload: preserves upstream error objects that already have error payloads", () => {
  const payload = {
    error: {
      message: "provider exploded",
      code: "quota_exceeded",
    },
  };

  assert.deepEqual(toJsonErrorPayload(payload), payload);
});

test("toJsonErrorPayload: normalizes object payloads with string error", () => {
  assert.deepEqual(toJsonErrorPayload({ error: "plain provider error" }), {
    error: {
      message: "plain provider error",
      type: "upstream_error",
      code: "upstream_error",
    },
  });
});

test("toJsonErrorPayload: wraps plain objects under error key", () => {
  assert.deepEqual(toJsonErrorPayload({ status: 503, message: "backend down" }), {
    error: {
      status: 503,
      message: "backend down",
    },
  });
});

test("toJsonErrorPayload: parses JSON strings recursively", () => {
  const raw = JSON.stringify({ error: { message: "nested json", code: "bad_request" } });
  assert.deepEqual(toJsonErrorPayload(raw), {
    error: {
      message: "nested json",
      code: "bad_request",
    },
  });
});

test("toJsonErrorPayload: falls back for blank strings and unsupported values", () => {
  const fallback = {
    error: {
      message: "custom fallback",
      type: "upstream_error",
      code: "upstream_error",
    },
  };

  assert.deepEqual(toJsonErrorPayload("   ", "custom fallback"), fallback);
  assert.deepEqual(toJsonErrorPayload(null, "custom fallback"), fallback);
});

test("toJsonErrorPayload: converts non-JSON strings into normalized error payloads", () => {
  assert.deepEqual(toJsonErrorPayload("gateway timeout"), {
    error: {
      message: "gateway timeout",
      type: "upstream_error",
      code: "upstream_error",
    },
  });
});

test("createErrorResponse: infers error types from status and preserves details", async () => {
  const response = createErrorResponse({
    status: 409,
    message: "Conflict detected",
    details: { field: "name" },
  });
  const body = await response.json();

  assert.equal(response.status, 409);
  assert.equal(body.error.message, "Conflict detected");
  assert.equal(body.error.type, "conflict");
  assert.deepEqual(body.error.details, { field: "name" });
  assert.match(body.requestId, /^[0-9a-f-]{36}$/i);
});

test("createErrorResponse: uses explicit type when provided", async () => {
  const response = createErrorResponse({
    status: 418,
    message: "teapot",
    type: "not_found",
  });
  const body = await response.json();

  assert.equal(body.error.type, "not_found");
});

test("createErrorResponseFromUnknown: normalizes typed errors", async () => {
  const response = createErrorResponseFromUnknown({
    message: "db exploded",
    status: 503,
    type: "server_error",
    details: { retryable: true },
  });
  const body = await response.json();

  assert.equal(response.status, 503);
  assert.equal(body.error.message, "db exploded");
  assert.equal(body.error.type, "server_error");
  assert.deepEqual(body.error.details, { retryable: true });
});

test("createErrorResponseFromUnknown: falls back for non-object errors", async () => {
  const response = createErrorResponseFromUnknown("boom", "fallback message");
  const body = await response.json();

  assert.equal(response.status, 500);
  assert.equal(body.error.message, "fallback message");
  assert.equal(body.error.type, "server_error");
});

test("getAccountDisplayName: respects priority order and fallback", () => {
  assert.equal(
    getAccountDisplayName({
      id: "abcdef123456",
      name: "Primary Name",
      displayName: "Display Name",
      email: "account@example.com",
    }),
    "Primary Name"
  );
  assert.equal(
    getAccountDisplayName({
      id: "abcdef123456",
      name: "   ",
      displayName: "Display Name",
      email: "account@example.com",
    }),
    "Display Name"
  );
  assert.equal(
    getAccountDisplayName({
      id: "abcdef123456",
      name: null,
      displayName: " ",
      email: "account@example.com",
    }),
    "account@example.com"
  );
  assert.equal(getAccountDisplayName({ id: "abcdef123456" }), "Account #abcdef");
  assert.equal(getAccountDisplayName(null), "Unknown Account");
});

test("getProviderDisplayName: prefers node metadata and simplifies compatible IDs", () => {
  assert.equal(
    getProviderDisplayName("openai-compatible-chat-02669115-2545-4896-b003-cb4dac09d441", {
      name: "Friendly Node",
      prefix: "ignored-prefix",
    }),
    "Friendly Node"
  );
  assert.equal(
    getProviderDisplayName("anthropic-compatible-responses-02669115-2545-4896-b003-cb4dac09d441", {
      name: " ",
      prefix: "Anthropic Prefix",
    }),
    "Anthropic Prefix"
  );
  assert.equal(
    getProviderDisplayName("openai-compatible-chat-02669115-2545-4896-b003-cb4dac09d441"),
    "Compatible (openai)"
  );
  assert.equal(
    getProviderDisplayName("anthropic-compatible-responses-02669115-2545-4896-b003-cb4dac09d441"),
    "Compatible (anthropic)"
  );
  assert.equal(getProviderDisplayName(undefined), "Unknown Provider");
  assert.equal(getProviderDisplayName("plain-provider-id"), "plain-provider-id");
});
