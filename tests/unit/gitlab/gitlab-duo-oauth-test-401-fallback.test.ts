import test from "node:test";
import assert from "node:assert/strict";

import { testOAuthConnection } from "../../../src/app/api/providers/[id]/test/route";

// #10365 / #10499: the chat-completion path (open-sse/executors/gitlab.ts) already
// falls back to the public Code Suggestions completions endpoint when the
// `direct_access` exchange is rejected with 401 — but "Test Connection" / the
// dashboard's Retest button drove testOAuthConnection() straight against
// `direct_access` and reported the connection unhealthy on a plain 401, even though
// the exact same request would have succeeded through the real chat path via the
// fallback. These tests prove the connection-test path now applies the identical
// fallback contract before declaring the connection invalid.

const DIRECT_ACCESS_URL = "https://gitlab.example.com/api/v4/code_suggestions/direct_access";
const PUBLIC_COMPLETIONS_URL = "https://gitlab.example.com/api/v4/code_suggestions/completions";

function futureExpiresAt(): string {
  return new Date(Date.now() + 60 * 60 * 1000).toISOString();
}

function baseConnection(overrides: Record<string, unknown> = {}) {
  return {
    provider: "gitlab-duo",
    authType: "oauth",
    accessToken: "oauth-access",
    refreshToken: "oauth-refresh",
    expiresAt: futureExpiresAt(),
    providerSpecificData: { baseUrl: "https://gitlab.example.com" },
    ...overrides,
  };
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

test("gitlab-duo Retest falls back to the public completions endpoint on a direct_access 401 (#10365)", async (t) => {
  const original = globalThis.fetch;
  const { fn, calls } = mockFetch((url) => {
    if (url === DIRECT_ACCESS_URL) {
      return new Response(JSON.stringify({ error: "invalid_token" }), {
        status: 401,
        headers: { "content-type": "application/json" },
      });
    }
    if (url === PUBLIC_COMPLETIONS_URL) {
      return new Response(JSON.stringify({ model: { name: "code-gecko" }, choices: [] }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    throw new Error(`Unexpected fetch to ${url}`);
  });
  globalThis.fetch = fn;
  t.after(() => {
    globalThis.fetch = original;
  });

  const result = await testOAuthConnection(baseConnection(), 5000);

  assert.equal(
    result.valid,
    true,
    "a direct_access 401 must be recovered via the public completions fallback probe, mirroring the chat path"
  );
  assert.deepEqual(
    calls.map((c) => c.url),
    [DIRECT_ACCESS_URL, PUBLIC_COMPLETIONS_URL],
    "must probe direct_access first, then fall back to the public completions endpoint"
  );
  const fallbackHeaders = (calls[1].init?.headers ?? {}) as Record<string, string>;
  assert.equal(fallbackHeaders.Authorization, "Bearer oauth-access");
});

test("gitlab-duo Retest reports invalid when BOTH direct_access and the public fallback reject the token", async (t) => {
  const original = globalThis.fetch;
  const { fn, calls } = mockFetch((url) => {
    if (url === DIRECT_ACCESS_URL) {
      return new Response(JSON.stringify({ error: "invalid_token" }), {
        status: 401,
        headers: { "content-type": "application/json" },
      });
    }
    if (url === PUBLIC_COMPLETIONS_URL) {
      return new Response(JSON.stringify({ error: "invalid_token" }), {
        status: 401,
        headers: { "content-type": "application/json" },
      });
    }
    throw new Error(`Unexpected fetch to ${url}`);
  });
  globalThis.fetch = fn;
  t.after(() => {
    globalThis.fetch = original;
  });

  const result = await testOAuthConnection(baseConnection({ refreshToken: null }), 5000);

  assert.equal(
    result.valid,
    false,
    "a token rejected by BOTH endpoints is genuinely bad — the fallback must not paper over that"
  );
  assert.deepEqual(
    calls.map((c) => c.url),
    [DIRECT_ACCESS_URL, PUBLIC_COMPLETIONS_URL],
    "the fallback probe must still run before giving up"
  );
});

test("gitlab-duo Retest still falls back on the pre-existing 403 'direct connections are disabled' case", async (t) => {
  const original = globalThis.fetch;
  const { fn, calls } = mockFetch((url) => {
    if (url === DIRECT_ACCESS_URL) {
      return new Response("Direct connections are disabled for this instance", {
        status: 403,
        headers: { "content-type": "text/plain" },
      });
    }
    if (url === PUBLIC_COMPLETIONS_URL) {
      return new Response(JSON.stringify({ model: { name: "code-gecko" }, choices: [] }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    throw new Error(`Unexpected fetch to ${url}`);
  });
  globalThis.fetch = fn;
  t.after(() => {
    globalThis.fetch = original;
  });

  const result = await testOAuthConnection(baseConnection(), 5000);

  assert.equal(result.valid, true);
  assert.equal(calls.length, 2);
});
