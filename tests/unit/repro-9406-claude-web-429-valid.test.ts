// Issue #9406 — claude-web connection test treats 429 as healthy.
//
// Bug 1: validateClaudeWebProvider returns valid:true for 429, so
//   rate-limited sessions display as green (healthy) in the dashboard.
// Bug 2: errorResponseForTransport discards upstream Retry-After headers,
//   issuing a bare 429 with no retry timing.
//
// This test reproduces both bugs by:
// 1. Injecting a mock TLS fetch via __setTlsFetchOverrideForTesting that
//    returns 429, then asserting validateClaudeWebProvider yields valid:false.
// 2. Injecting a mock sendDirect into ClaudeWebExecutor that returns a 429
//    ClaudeWebTransportResult with a Retry-After header, then asserting the
//    executor's error response forwards that header.
import { test, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";

const TLS_CLIENT_PATH = "../../open-sse/services/claudeTlsClient.ts";
const VALIDATION_PATH = "../../src/lib/providers/validation/webProvidersB.ts";
const EXECUTOR_PATH = "../../open-sse/executors/claude-web.ts";

// ── Helpers ──

/** Calls __setTlsFetchOverrideForTesting with the given mock, resets on finish. */
async function withTlsMock<T>(
  mock: (
    url: string,
    options: Record<string, unknown>
  ) => Promise<{
    status: number;
    headers: Headers;
    text: string | null;
    body: null;
  }>,
  fn: () => Promise<T>
): Promise<T> {
  const { __setTlsFetchOverrideForTesting } = await import(TLS_CLIENT_PATH);
  __setTlsFetchOverrideForTesting(mock);
  try {
    return await fn();
  } finally {
    __setTlsFetchOverrideForTesting(null);
  }
}

// ── Test 1: validateClaudeWebProvider rejects 429 ──

test("validateClaudeWebProvider returns valid:false for 429", async () => {
  const { validateClaudeWebProvider } = await import(VALIDATION_PATH);

  await withTlsMock(
    async () => ({
      status: 429,
      headers: new Headers({ "retry-after": "60" }),
      text: "Too Many Requests",
      body: null,
    }),
    async () => {
      const result = await validateClaudeWebProvider({
        apiKey: "sessionKey=test-session-key",
      });
      assert.equal(result.valid, false, "expected valid:false for 429");
      assert.ok(
        result.error?.includes("429"),
        `expected error to mention 429, got: ${result.error}`
      );
    }
  );
});

// ── Test 2: validateMuseSparkWebProvider rejects 429 ──

test("validateMuseSparkWebProvider returns valid:false for 429", async () => {
  const { validateMuseSparkWebProvider } = await import(VALIDATION_PATH);
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (input, init) => {
    assert.equal(String(input), "https://www.meta.ai/api/graphql");
    assert.equal(init?.method, "POST");
    return new Response("Too Many Requests", { status: 429 });
  };

  try {
    const result = await validateMuseSparkWebProvider({ apiKey: "ecto_1_sess=test-session" });
    assert.equal(result.valid, false, "expected valid:false for 429");
    assert.match(result.error ?? "", /429|rate limit/i);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

// ── Test 3: errorResponseForTransport forwards Retry-After ──

test("errorResponseForTransport forwards upstream Retry-After on 429", async () => {
  const { ClaudeWebExecutor } = await import(EXECUTOR_PATH);

  // Inject a sendDirect that returns a 429 response with a Retry-After header.
  const mockSendDirect = async () => ({
    status: 429,
    headers: new Headers({ "retry-after": "120", "content-type": "application/json" }),
    body: null,
    bodyText: '{"error":"rate_limited"}',
  });

  const executor = new ClaudeWebExecutor({ sendDirect: mockSendDirect });

  const result = await executor.execute({
    model: "claude-sonnet-4-6",
    body: { messages: [{ role: "user", content: "Hello" }] },
    stream: false,
    credentials: {
      apiKey: "sessionKey=test-session-key",
      orgId: "test-org-id",
      deviceId: "test-device-id",
    },
    log: null,
  });

  assert.equal(result.response.status, 429, "expected 429 response");
  const retryAfter = result.response.headers.get("Retry-After");
  assert.equal(retryAfter, "120", "expected forwarded Retry-After header");
});

test("errorResponseForTransport only forwards bounded canonical Retry-After values", async () => {
  const { ClaudeWebExecutor } = await import(EXECUTOR_PATH);
  const validDate = new Date(Date.now() + 60_000).toUTCString();
  const cases = [
    { label: "normalized delta-seconds", value: "000120", expected: "120" },
    { label: "canonical HTTP-date", value: validDate, expected: validDate },
    {
      label: "credential and path payload",
      value: "120 access_token=sk-claude-retry /srv/private/retry.txt",
      expected: null,
    },
    { label: "over the one-day bound", value: "86401", expected: null },
    { label: "invalid HTTP-date", value: "Fri, 99 Foo 9999 99:99:99 GMT", expected: null },
    { label: "missing", value: null, expected: null },
  ];

  for (const { label, value, expected } of cases) {
    const headers = new Headers({ "content-type": "application/json" });
    if (value !== null) headers.set("retry-after", value);
    const executor = new ClaudeWebExecutor({
      sendDirect: async () => ({
        status: 429,
        headers,
        body: null,
        bodyText: '{"error":"rate_limited"}',
      }),
    });

    const result = await executor.execute({
      model: "claude-sonnet-4-6",
      body: { messages: [{ role: "user", content: "Hello" }] },
      stream: false,
      credentials: {
        apiKey: `sessionKey=test-${label}`,
        orgId: "test-org-id",
        deviceId: "test-device-id",
      },
      log: null,
    });

    assert.equal(result.response.status, 429, `${label}: status`);
    assert.equal(result.response.headers.get("Retry-After"), expected, `${label}: header`);
    const body = await result.response.json();
    assert.deepEqual(body.error, {
      message: "Rate limited by Claude Web API",
      type: "rate_limit_error",
      code: "rate_limit_exceeded",
    });
    assert.doesNotMatch(JSON.stringify(body), /sk-claude-retry|\/srv\/private/);
  }
});
