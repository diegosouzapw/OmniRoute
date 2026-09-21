import test from "node:test";
import assert from "node:assert/strict";

import { testOAuthConnection } from "../../src/app/api/providers/[id]/test/route";

// #12958: the reporter has a valid Duo seat and a configured default namespace, but
// gitlab.com returns an entitlement/scope-resolution 403 from `direct_access` for their
// API-only client. That 403 is NOT the "direct connections are disabled" tenant-config
// message the #10365/#10499 fallback guard recognizes, so the connection test never tries
// the public Code Suggestions fallback (which the reporter proved works with the same
// token) and instead reports the connection unhealthy with a generic "Access denied" that
// discards the real upstream body. These tests lock in the corrected contract: ANY
// direct_access 403 is recoverable via the fallback probe (same as 401 already is), and
// when both endpoints genuinely reject the token, the real upstream body is surfaced.

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

test("gitlab-duo Retest does NOT fall back on an entitlement-flavored 403 (#12958)", async (t) => {
  const original = globalThis.fetch;
  const { fn, calls } = mockFetch((url) => {
    if (url === DIRECT_ACCESS_URL) {
      return new Response(JSON.stringify({ message: "Access denied" }), {
        status: 403,
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
    "an entitlement-flavored direct_access 403 must also be verified against the public " +
      "completions fallback before declaring the connection unhealthy — same contract as " +
      "401 and the 'direct connections are disabled' 403"
  );
  assert.deepEqual(
    calls.map((c) => c.url),
    [DIRECT_ACCESS_URL, PUBLIC_COMPLETIONS_URL],
    "the fallback probe must be attempted for ANY direct_access 403, not only the exact " +
      "'direct connections are disabled' tenant-config message"
  );
});

test("gitlab-duo Retest surfaces the real upstream 403 body when BOTH endpoints reject (#12958)", async (t) => {
  const original = globalThis.fetch;
  const { fn } = mockFetch((url) => {
    if (url === DIRECT_ACCESS_URL) {
      return new Response(JSON.stringify({ error: "insufficient_scope", scope: "ai_features" }), {
        status: 403,
        headers: { "content-type": "application/json" },
      });
    }
    if (url === PUBLIC_COMPLETIONS_URL) {
      return new Response(JSON.stringify({ message: "Access denied" }), {
        status: 403,
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

  assert.equal(result.valid, false);
  assert.ok(
    result.error && result.error.includes("insufficient_scope"),
    `expected the real upstream direct_access body to be surfaced, got: ${JSON.stringify(result.error)}`
  );
});
