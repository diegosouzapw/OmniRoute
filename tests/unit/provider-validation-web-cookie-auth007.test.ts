import test from "node:test";
import assert from "node:assert/strict";

// The validator probes the provider's /models endpoint via validationRead → safeOutboundFetch
// → fetchWithTimeout, which reads `globalThis.fetch` dynamically at CALL time (#7058 — routed
// through the proxy-aware patched fetch instead of a bypassing directHttpsRequest). Importing
// validation.ts pulls in the proxy-patch module, which installs its own `globalThis.fetch`
// exactly once at import time — so the mock must be (re)installed AFTER the import, not before,
// or the patch silently clobbers it. A mutable `nextResponse` lets each test vary the probe
// result, and `fetchCalls` proves the mocked probe ran rather than the live network.
let nextResponse: { status: number; body: string } = { status: 200, body: "{}" };
let fetchCalls = 0;

const { validateWebCookieProvider } = await import("../../src/lib/providers/validation.ts");

globalThis.fetch = (async () => {
  fetchCalls++;
  return new Response(nextResponse.body, {
    status: nextResponse.status,
    headers: { "content-type": "application/json" },
  });
}) as typeof fetch;

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

test("should_return_unsupported_when_models_endpoint_returns_200_for_a_conversation_baseUrl", async () => {
  // #7857: chatgpt-web's registry baseUrl is a conversation endpoint
  // ("https://chatgpt.com/backend-api/conversation"), not a real API root, so
  // "${baseUrl}/models" is a path that never existed upstream. A 200 from that
  // nonsense path (e.g. a login-page SPA shell) is not a meaningful auth signal and
  // is indistinguishable from a genuinely valid session — it must be reported as
  // unsupported, not silently accepted as valid.
  mockFetch(200, JSON.stringify({ ok: true, data: [] }));

  const result = await validateWebCookieProvider({
    provider: "chatgpt-web",
    apiKey: "valid_cookie=session=abc123",
    providerSpecificData: {},
  });

  assert.equal(fetchCalls, 1, "the /models probe must be the mocked fetch, not the live network");
  assert.equal(result.valid, false);
  assert.equal(result.unsupported, true);
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
