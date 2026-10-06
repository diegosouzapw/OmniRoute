import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Isolated DATA_DIR: the refresh path persists tokens through the real
// updateProviderConnection — without this the test would write into the
// operator's ~/.omniroute database.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-oauth400-"));
process.env.DATA_DIR = TEST_DATA_DIR;

import {
  testOAuthConnection,
  isReactive400Recoverable,
} from "../../src/app/api/providers/[id]/test/route";

// 2026-08-22: connections imported with a NULL expires_at (X500 antigravity/agy
// accounts) never trigger the proactive token refresh before the probe —
// isTokenExpired() returns false when expiresAt is missing, so the probe goes
// out with a stale access token. Providers that reject a bad token with 400
// (not 401/403) then also miss the reactive refresh branch, and the connection
// is stuck on "API returned 400" until a manual re-auth. These tests pin the
// two recovery paths: unknown expiry + refreshable token ⇒ refresh before the
// probe; a 400 after (or without) refresh ⇒ one reactive refresh + retry.

const PROBE_URL =
  "https://daily-cloudcode-pa.googleapis.com/v1internal:streamGenerateContent?alt=sse";
const REFRESH_URL = "https://oauth2.googleapis.com/token";

function baseConnection(overrides: Record<string, unknown> = {}) {
  return {
    id: "conn-test-1",
    provider: "antigravity",
    authType: "oauth",
    accessToken: "stale-access",
    refreshToken: "valid-refresh",
    expiresAt: null,
    tokenExpiresAt: null,
    providerSpecificData: {},
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

test("unknown expiry (NULL expiresAt) with a refresh token refreshes before the probe", async (t) => {
  const original = globalThis.fetch;
  let refreshed = false;
  const { fn, calls } = mockFetch((url) => {
    if (url === REFRESH_URL) {
      refreshed = true;
      return new Response(
        JSON.stringify({
          access_token: "fresh-access",
          refresh_token: "new-refresh",
          expires_in: 3600,
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }
    if (url === PROBE_URL) {
      return new Response("ok", { status: 200 });
    }
    throw new Error(`Unexpected fetch to ${url}`);
  });
  globalThis.fetch = fn;
  t.after(() => {
    globalThis.fetch = original;
  });

  const result = await testOAuthConnection(baseConnection(), 5000);

  assert.equal(refreshed, true, "proactive refresh must run when expiresAt is unknown");
  assert.equal(result.valid, true);
});

test("reactive 400 recovery is skipped for rotating providers", async (t) => {
  const original = globalThis.fetch;
  let refreshCalls = 0;
  const { fn } = mockFetch((url, init) => {
    const headers = init?.headers as Record<string, string> | undefined;
    const bearer = headers?.Authorization ?? headers?.authorization ?? "";
    if (url === REFRESH_URL) {
      refreshCalls += 1;
      return new Response(
        JSON.stringify({ access_token: "x", refresh_token: "y", expires_in: 3600 }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }
    if (url === PROBE_URL) {
      return new Response("{}", {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }
    void bearer;
    throw new Error(`Unexpected fetch to ${url}`);
  });
  globalThis.fetch = fn;
  t.after(() => {
    globalThis.fetch = original;
  });

  // codex is in ROTATION_LOCK_GROUP (open-sse/services/refreshSerializer.ts):
  // its single-use refresh tokens must be left to the mutex-guarded 401 path.
  const connection = baseConnection({
    id: "conn-test-codex",
    provider: "codex",
    expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
  });

  const result = await testOAuthConnection(connection, 5000);

  assert.equal(refreshCalls, 0, "rotating provider must not refresh on a 400");
  assert.equal(result.valid, false, "codex 400 falls through to its own contract");
});

test("isReactive400Recoverable: only a hard 400 on a refreshable non-rotating connection recovers", () => {
  // Typed fixture matching the helper's parameter shape — no casts.
  const base = {
    status: 400,
    config: { refreshable: true },
    refreshed: false,
    connection: { refreshToken: "r".repeat(8) },
    isRotatingProvider: false,
  };
  assert.ok(isReactive400Recoverable(base), "hard 400 + refreshable + fresh -> recoverable");

  assert.ok(!isReactive400Recoverable({ ...base, status: 401 }), "only 400");
  assert.ok(
    !isReactive400Recoverable({
      ...base,
      config: { refreshable: true, acceptStatuses: [400] },
    }),
    "auth-ok 400 contract untouched"
  );
  assert.ok(
    !isReactive400Recoverable({
      ...base,
      config: { refreshable: true, inconclusiveStatuses: [400] },
    }),
    "inconclusive 400 keeps its classification"
  );
  assert.ok(!isReactive400Recoverable({ ...base, refreshed: true }), "never refresh twice");
  assert.ok(
    !isReactive400Recoverable({ ...base, config: { refreshable: false } }),
    "non-refreshable connection"
  );
  assert.ok(
    !isReactive400Recoverable({ ...base, connection: { refreshToken: "" } }),
    "empty refresh token"
  );
  assert.ok(!isReactive400Recoverable({ ...base, connection: {} }), "missing refresh token");
  assert.ok(
    !isReactive400Recoverable({ ...base, isRotatingProvider: true }),
    "rotating provider stays on the 401 path"
  );
});

test("antigravity/agy 400 stays inconclusive (no reactive refresh masks the verdict)", async (t) => {
  const original = globalThis.fetch;
  let refreshCalls = 0;
  const { fn } = mockFetch((url, init) => {
    const headers = init?.headers as Record<string, string> | undefined;
    const bearer = headers?.Authorization ?? headers?.authorization ?? "";
    if (url === REFRESH_URL) {
      refreshCalls += 1;
      return new Response(
        JSON.stringify({ access_token: "x", refresh_token: "y", expires_in: 3600 }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }
    if (url === PROBE_URL) {
      void bearer;
      return new Response(JSON.stringify({ error: "invalid_grant" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }
    throw new Error(`Unexpected fetch to ${url}`);
  });
  globalThis.fetch = fn;
  t.after(() => {
    globalThis.fetch = original;
  });

  const connection = baseConnection({
    id: "conn-test-agy-inconclusive",
    accessToken: "revoked-access",
    refreshToken: "agy-refresh",
    expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    providerSpecificData: { projectId: "preset-project" },
  });

  const result = await testOAuthConnection(connection, 5000);

  assert.equal(refreshCalls, 0, "inconclusive 400 must not trigger a refresh");
  assert.equal(result.valid, true, "inconclusive verdict stays valid:true + warning");
  // ?? binds looser than === — without parentheses this reads as
  // (warning ?? diagnosis?.code) === 'probe_inconclusive'. Split explicitly.
  const warningOk =
    typeof result.warning === "string" || result.diagnosis?.code === "probe_inconclusive";
  assert.ok(warningOk, "inconclusive 400 must surface a warning or the probe_inconclusive code");
});

test("isReactive400Recoverable fixtures compile with the real helper signature", () => {
  // No `as never`: the fixture matches the helper's declared parameter
  // shape, so a signature change fails to compile here.
  const config = {
    refreshable: true,
    acceptStatuses: [402],
    inconclusiveStatuses: undefined,
  };
  const ok = isReactive400Recoverable({
    status: 400,
    config,
    refreshed: false,
    connection: { refreshToken: "r".repeat(8) },
    isRotatingProvider: false,
  });
  assert.equal(ok, true);
});

test.after(() => {
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("isTokenExpired treats a corrupt expiresAt string as expired (refreshable)", () => {
  // Direct unit check — the integration path exercises this via
  // testOAuthConnection, but the NaN guard deserves its own assertion.
  const corrupt = baseConnection({
    id: "conn-corrupt-date",
    expiresAt: "not-a-date",
    refreshToken: "r",
  });
  // isTokenExpired is module-private; exercise through testOAuthConnection's
  // observable side effect: a corrupt date must behave like NULL expiry —
  // proactive refresh fires before the probe.
  const original = globalThis.fetch;
  let refreshCalls = 0;
  globalThis.fetch = async (url) => {
    if (String(url).includes("oauth2.googleapis.com/token")) refreshCalls += 1;
    return new Response(
      JSON.stringify({ access_token: "x", refresh_token: "y", expires_in: 3600 }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      }
    );
  };
  const t = { after: (fn: () => void) => fn() };
  void t;
  // Fire and verify — the proactive refresh path (route.ts:430s) must trigger.
  const promise = testOAuthConnection(corrupt, 5000).then((r) => {
    globalThis.fetch = original;
    assert.ok(refreshCalls >= 1, "corrupt expiresAt + refreshToken must refresh proactively");
    return r;
  });
  return promise;
});
