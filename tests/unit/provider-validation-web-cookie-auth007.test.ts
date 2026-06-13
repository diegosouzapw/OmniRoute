import test from "node:test";
import assert from "node:assert/strict";

const { validateWebCookieProvider } = await import("../../src/lib/providers/validation.ts");

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

function mockFetch(status: number, body: string) {
  globalThis.fetch = async () =>
    new Response(body, {
      status,
      headers: { "content-type": "application/json" },
    });
}

test("should_return_AUTH_007_when_models_endpoint_returns_401", async () => {
  mockFetch(401, JSON.stringify({ error: "unauthorized" }));

  const result = await validateWebCookieProvider({
    provider: "chatgpt-web",
    apiKey: "expired_cookie=session=abc123",
    providerSpecificData: {},
  });

  assert.equal(result.valid, false);
  assert.equal(result.errorCode, "AUTH_007");
  assert.equal(result.error, "SESSION_EXPIRED");
});

test("should_return_AUTH_007_when_models_endpoint_returns_403", async () => {
  mockFetch(403, JSON.stringify({ error: "forbidden" }));

  const result = await validateWebCookieProvider({
    provider: "chatgpt-web",
    apiKey: "expired_cookie=session=abc123",
    providerSpecificData: {},
  });

  assert.equal(result.valid, false);
  assert.equal(result.errorCode, "AUTH_007");
  assert.equal(result.error, "SESSION_EXPIRED");
});

test("should_return_valid_when_models_endpoint_returns_200", async () => {
  // Mock Phase 1 (success)
  mockFetch(200, JSON.stringify({ data: [{ id: "gpt-4o" }] }));

  const result = await validateWebCookieProvider({
    provider: "chatgpt-web",
    apiKey: "valid_cookie=session=abc123",
    providerSpecificData: {},
  });

  // Note: Since Phase 1 returns 200, it goes to Phase 2 (chat completion).
  // In this simple mock, the Phase 2 call also hits our 200 mock.
  assert.equal(result.valid, true);
  assert.equal(result.errorCode, undefined);
});

test("should_return_unsupported_when_provider_not_in_registry", async () => {
  const result = await validateWebCookieProvider({
    provider: "nonexistent-provider",
    apiKey: "some_cookie",
    providerSpecificData: {},
  });

  assert.equal(result.valid, false);
  assert.equal(result.unsupported, true);
});

test("should_return_error_when_cookie_is_empty", async () => {
  const result = await validateWebCookieProvider({
    provider: "chatgpt-web",
    apiKey: "",
    providerSpecificData: {},
  });

  assert.equal(result.valid, false);
  assert.equal(result.unsupported, false);
  assert.match(result.error, /cookie/i);
});
