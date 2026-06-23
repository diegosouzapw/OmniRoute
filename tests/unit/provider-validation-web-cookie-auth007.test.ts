import test from "node:test";
import assert from "node:assert/strict";

// The validator probes the provider's /models endpoint via safeOutboundFetch →
// fetchWithTimeout, which binds globalThis.fetch at MODULE LOAD time. The mock MUST be
// installed BEFORE importing validation.ts — a late reassignment (inside a test) is
// ignored and the validator hits the real network instead. (That made the 401/403
// assertions pass only by coincidence — live chatgpt.com returns 401/403 — while the
// 200 case failed.) A mutable `nextResponse` lets each test vary the probe result, and
// `fetchCalls` proves the mocked probe ran rather than the live network.
let nextResponse: { status: number; body: string } = { status: 200, body: "{}" };
let fetchCalls = 0;
globalThis.fetch = (async () => {
  fetchCalls++;
  return new Response(nextResponse.body, {
    status: nextResponse.status,
    headers: { "content-type": "application/json" },
  });
}) as typeof fetch;

const { validateWebCookieProvider } = await import("../../src/lib/providers/validation/index.ts");

function mockFetch(status: number, body: string) {
  nextResponse = { status, body };
  fetchCalls = 0;
}

test("should_return_AUTH_007_when_models_endpoint_returns_401", async () => {
  mockFetch(401, JSON.stringify({ error: "unauthorized" }));

  const result = await validateWebCookieProvider({
    provider: "chatgpt-web",
    apiKey: "expired_cookie=session=abc123",
    providerSpecificData: {},
  });

  assert.equal(fetchCalls, 1, "the /models probe must be the mocked fetch, not the live network");
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

  assert.equal(fetchCalls, 1, "the /models probe must be the mocked fetch, not the live network");
  assert.equal(result.valid, false);
  assert.equal(result.errorCode, "AUTH_007");
  assert.equal(result.error, "SESSION_EXPIRED");
});

test("should_return_valid_when_models_endpoint_returns_200", async () => {
  // A non-401/403 status from the /models probe means the cookie was accepted,
  // so the session is treated as valid.
  mockFetch(200, JSON.stringify({ ok: true, data: [] }));

  const result = await validateWebCookieProvider({
    provider: "chatgpt-web",
    apiKey: "valid_cookie=session=abc123",
    providerSpecificData: {},
  });

  assert.equal(fetchCalls, 1, "the /models probe must be the mocked fetch, not the live network");
  assert.equal(result.valid, true);
});

test("should_return_unsupported_when_provider_not_in_registry", async () => {
  mockFetch(200, "{}");

  const result = await validateWebCookieProvider({
    provider: "nonexistent-provider",
    apiKey: "some_cookie",
    providerSpecificData: {},
  });

  // Unknown provider short-circuits before any network probe.
  assert.equal(fetchCalls, 0);
  assert.equal(result.valid, false);
  assert.equal(result.unsupported, true);
});

test("should_return_error_when_cookie_is_empty", async () => {
  mockFetch(200, "{}");

  const result = await validateWebCookieProvider({
    provider: "chatgpt-web",
    apiKey: "",
    providerSpecificData: {},
  });

  // Empty cookie short-circuits before any network probe.
  assert.equal(fetchCalls, 0);
  assert.equal(result.valid, false);
  assert.equal(result.unsupported, false);
  assert.match(result.error, /cookie/i);
});
