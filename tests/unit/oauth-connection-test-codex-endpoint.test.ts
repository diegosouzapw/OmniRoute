import test from "node:test";
import assert from "node:assert/strict";

import { testOAuthConnection } from "../../src/app/api/providers/[id]/test/route";

// Port of decolua/9router#347 (author: Ibrahim Ryan).
//
// Prior to this fix, the Codex OAuth test only validated `checkExpiry: true` — i.e.
// it inspected the local token's `expiresAt` and returned valid=true if the
// timestamp wasn't in the past. A token that the server has already revoked or that
// belongs to a deactivated account would still report as valid. The new test
// actually probes ChatGPT's `/backend-api/codex/responses` endpoint with a minimal
// invalid body. The endpoint returns 400 (bad request) when auth is accepted and
// 401/403 when the token is bad — exactly the signal the test should be using.
//
// Important OmniRoute-specific constraint: codex is a `rotating` provider (shares
// an Auth0 family with openai — see `rotationGroupFor`). The probe path must NOT
// burn a single-use refresh_token from a connection test (precedent: openai/codex
// #9648, see comment in route.ts above the rotating-provider guard). The probe
// only validates the access token as-is.

const CODEX_TEST_URL = "https://chatgpt.com/backend-api/codex/responses";

function futureExpiresAt(): string {
  return new Date(Date.now() + 60 * 60 * 1000).toISOString();
}

function mockFetch(handler: (url: string, init?: RequestInit) => Response) {
  const calls: Array<{ url: string; init?: RequestInit }> = [];
  const fn = (async (url: RequestInfo | URL, init?: RequestInit) => {
    const u = typeof url === "string" ? url : url instanceof URL ? url.toString() : String(url);
    calls.push({ url: u, init });
    return handler(u, init);
  }) as typeof fetch;
  return { fn, calls };
}

test("codex test probes the real /responses endpoint and treats 400 as 'auth ok' (port PR#347)", async (t) => {
  const original = globalThis.fetch;
  const { fn, calls } = mockFetch(
    () =>
      new Response(JSON.stringify({ error: { message: "Bad request" } }), {
        status: 400,
        headers: { "content-type": "application/json" },
      })
  );
  globalThis.fetch = fn;
  t.after(() => {
    globalThis.fetch = original;
  });

  const result = await testOAuthConnection(
    {
      provider: "codex",
      authType: "oauth",
      accessToken: "fake-codex-token",
      refreshToken: "fake-refresh",
      expiresAt: futureExpiresAt(),
    },
    5000
  );

  assert.equal(result.valid, true, "400 from the real endpoint must be treated as auth ok");
  assert.equal(calls.length, 1, "exactly one upstream probe");
  assert.equal(calls[0].url, CODEX_TEST_URL, "must probe the actual codex /responses endpoint");
  assert.equal(calls[0].init?.method, "POST");
  const headers = (calls[0].init?.headers ?? {}) as Record<string, string>;
  assert.equal(headers.Authorization, "Bearer fake-codex-token");
  assert.ok(calls[0].init?.body, "must send a minimal body so the endpoint returns 400 (not 405)");
});

test("codex test reports invalid when the endpoint returns 401 (port PR#347)", async (t) => {
  const original = globalThis.fetch;
  const { fn, calls } = mockFetch(
    () =>
      new Response(JSON.stringify({ error: { message: "Unauthorized" } }), {
        status: 401,
        headers: { "content-type": "application/json" },
      })
  );
  globalThis.fetch = fn;
  t.after(() => {
    globalThis.fetch = original;
  });

  const result = await testOAuthConnection(
    {
      provider: "codex",
      authType: "oauth",
      accessToken: "revoked-token",
      // Token NOT expired locally — that's the whole point: the local check would
      // have lied; the real endpoint surfaces the revocation.
      refreshToken: "fake-refresh",
      expiresAt: futureExpiresAt(),
    },
    5000
  );

  assert.equal(result.valid, false, "401 from the real endpoint must be reported as invalid");
  assert.equal(
    calls.length,
    1,
    "must NOT burn the refresh_token from a connection test (codex is a rotating provider — openai/codex#9648)"
  );
});

test("codex test reports invalid when the endpoint returns 403 (port PR#347)", async (t) => {
  const original = globalThis.fetch;
  const { fn } = mockFetch(
    () =>
      new Response("Forbidden", {
        status: 403,
        headers: { "content-type": "text/plain" },
      })
  );
  globalThis.fetch = fn;
  t.after(() => {
    globalThis.fetch = original;
  });

  const result = await testOAuthConnection(
    {
      provider: "codex",
      authType: "oauth",
      accessToken: "fake-token",
      refreshToken: "fake-refresh",
      expiresAt: futureExpiresAt(),
    },
    5000
  );

  assert.equal(result.valid, false);
  assert.equal(result.statusCode, 403);
});
