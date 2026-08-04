/**
 * TDD — OAuth refresh error classification must be resilient to body SHAPE.
 *
 * Root cause of the production "1352× refresh loop" (claude/aa5dd5cf): when the
 * Anthropic 400 body reaches `refreshClaudeOAuthToken` in a non-canonical shape
 * (a JSON string instead of an object, a double-encoded string, a nested
 * `{error:{code}}`, or the raw text in the catch branch), the old check
 * `errorBody.error === "invalid_grant"` evaluated to false, so the function
 * returned `null` instead of the `unrecoverable_refresh_error` sentinel.
 *
 * `null` makes the HealthCheck treat it as a recoverable failure → keeps the
 * connection `active` → retries every 60s forever (the loop). The fix is a
 * shape-agnostic extractor used by all refreshers that classify invalid_grant.
 *
 * These tests FAIL before the fix (functions return null) and pass after.
 */
import test from "node:test";
import assert from "node:assert/strict";

const tokenRefresh = await import("../../open-sse/services/tokenRefresh.ts");
const {
  extractOAuthErrorCode,
  refreshClaudeOAuthToken,
  refreshClineToken,
  refreshQoderToken,
  refreshGitHubToken,
  isUnrecoverableRefreshError,
} = tokenRefresh as unknown as {
  extractOAuthErrorCode: (raw: unknown) => string | null;
  refreshClaudeOAuthToken: (rt: string, log?: unknown, proxy?: unknown) => Promise<unknown>;
  refreshClineToken: (rt: string, log?: unknown, proxy?: unknown) => Promise<unknown>;
  refreshQoderToken: (rt: string, log?: unknown, proxy?: unknown) => Promise<unknown>;
  refreshGitHubToken: (rt: string, log?: unknown, proxy?: unknown) => Promise<unknown>;
  isUnrecoverableRefreshError: (r: unknown) => boolean;
};

function rawResponse(body: string, status = 400, contentType = "application/json") {
  return new Response(body, { status, headers: { "content-type": contentType } });
}

async function withMockedFetch<T>(impl: typeof fetch, fn: () => Promise<T>): Promise<T> {
  const original = globalThis.fetch;
  globalThis.fetch = impl;
  try {
    return await fn();
  } finally {
    globalThis.fetch = original;
  }
}

// ── extractOAuthErrorCode: shape matrix ─────────────────────────────────────

test("extractOAuthErrorCode: canonical object { error: 'invalid_grant' }", () => {
  assert.equal(extractOAuthErrorCode({ error: "invalid_grant" }), "invalid_grant");
});

test("extractOAuthErrorCode: nested object { error: { code: 'invalid_grant' } }", () => {
  assert.equal(extractOAuthErrorCode({ error: { code: "invalid_grant" } }), "invalid_grant");
});

test("extractOAuthErrorCode: bare string code 'invalid_grant'", () => {
  assert.equal(extractOAuthErrorCode("invalid_grant"), "invalid_grant");
});

test("extractOAuthErrorCode: JSON string body '{\"error\":\"invalid_grant\"}'", () => {
  assert.equal(extractOAuthErrorCode('{"error": "invalid_grant"}'), "invalid_grant");
});

test("extractOAuthErrorCode: double-encoded JSON string (the production case)", () => {
  // response.json() returned the inner JSON AS a string (proxy double-encode)
  const doubleEncoded = JSON.stringify('{"error": "invalid_grant", "error_description": "x"}');
  const parsedOnce = JSON.parse(doubleEncoded); // a string, still JSON inside
  assert.equal(extractOAuthErrorCode(parsedOnce), "invalid_grant");
});

test("extractOAuthErrorCode: catch-branch shape { error: '<raw json text>' }", () => {
  // refreshClaudeOAuthToken's catch did errorBody = { error: text }
  const errorBody = { error: '{"error": "invalid_grant", "error_description": "x"}' };
  assert.equal(extractOAuthErrorCode(errorBody), "invalid_grant");
});

test("extractOAuthErrorCode: invalid_request is recognized", () => {
  assert.equal(extractOAuthErrorCode({ error: "invalid_request" }), "invalid_request");
});

test("extractOAuthErrorCode: transient errors are NOT misclassified (no false positives)", () => {
  assert.equal(extractOAuthErrorCode({ error: "server_error" }), null);
  assert.equal(extractOAuthErrorCode("rate_limited"), null);
  assert.equal(extractOAuthErrorCode("<!DOCTYPE html><html>502 Bad Gateway</html>"), null);
  assert.equal(extractOAuthErrorCode(""), null);
  assert.equal(extractOAuthErrorCode(null), null);
  assert.equal(extractOAuthErrorCode(undefined), null);
});

// ── refreshClaudeOAuthToken: every shape → unrecoverable sentinel ────────────

const SENTINEL_SHAPES: Array<{ name: string; body: string; ct?: string }> = [
  { name: "canonical object", body: '{"error": "invalid_grant", "error_description": "Refresh token not found or invalid"}' },
  { name: "double-encoded JSON string", body: JSON.stringify('{"error": "invalid_grant", "error_description": "x"}') },
  { name: "bare string code", body: '"invalid_grant"' },
  { name: "nested error.code", body: '{"error": {"code": "invalid_grant", "message": "x"}}' },
  { name: "json served as text/plain", body: '{"error": "invalid_grant"}', ct: "text/plain" },
];

for (const shape of SENTINEL_SHAPES) {
  test(`refreshClaudeOAuthToken → unrecoverable sentinel for shape: ${shape.name}`, async () => {
    await withMockedFetch(
      (async () => rawResponse(shape.body, 400, shape.ct ?? "application/json")) as unknown as typeof fetch,
      async () => {
        const result = await refreshClaudeOAuthToken("dead-refresh-token");
        assert.ok(
          isUnrecoverableRefreshError(result),
          `shape "${shape.name}" must yield an unrecoverable sentinel, got ${JSON.stringify(result)}`
        );
        assert.equal((result as { code?: string }).code, "invalid_grant");
      }
    );
  });
}

test("refreshClaudeOAuthToken: transient 500 server_error stays null (NOT unrecoverable)", async () => {
  await withMockedFetch(
    (async () => rawResponse('{"error": "server_error"}', 500)) as unknown as typeof fetch,
    async () => {
      const result = await refreshClaudeOAuthToken("token");
      assert.equal(result, null, "transient errors must remain recoverable (null), not deactivate the account");
    }
  );
});

test("refreshClaudeOAuthToken: 502 HTML gateway error stays null", async () => {
  await withMockedFetch(
    (async () => rawResponse("<html>502 Bad Gateway</html>", 502, "text/html")) as unknown as typeof fetch,
    async () => {
      const result = await refreshClaudeOAuthToken("token");
      assert.equal(result, null);
    }
  );
});

// ── Previously-frágil refreshers that NEVER emitted a sentinel ──────────────
// refreshClineToken / refreshQoderToken / refreshGitHubToken returned null on
// ANY error → invalid_grant looked recoverable → HealthCheck refresh loop.

// Note: refreshQoderToken also got the same fix, but it early-returns null via a
// config guard (no clientId/secret in the test env) so it can't be exercised here.
const FRAGILE_REFRESHERS: Array<{
  name: string;
  fn: (rt: string) => Promise<unknown>;
}> = [
  { name: "refreshClineToken", fn: (rt) => refreshClineToken(rt) },
  { name: "refreshGitHubToken", fn: (rt) => refreshGitHubToken(rt) },
];

void refreshQoderToken; // fixed in source; not unit-testable without OAuth config

for (const r of FRAGILE_REFRESHERS) {
  test(`${r.name}: invalid_grant now yields an unrecoverable sentinel`, async () => {
    await withMockedFetch(
      (async () => rawResponse('{"error": "invalid_grant"}', 400)) as unknown as typeof fetch,
      async () => {
        const result = await r.fn("dead-token");
        assert.ok(
          isUnrecoverableRefreshError(result),
          `${r.name} must classify invalid_grant as unrecoverable, got ${JSON.stringify(result)}`
        );
      }
    );
  });

  test(`${r.name}: transient 500 server_error stays null`, async () => {
    await withMockedFetch(
      (async () => rawResponse('{"error": "server_error"}', 500)) as unknown as typeof fetch,
      async () => {
        const result = await r.fn("token");
        assert.equal(result, null, `${r.name} must keep transient errors recoverable`);
      }
    );
  });
}
