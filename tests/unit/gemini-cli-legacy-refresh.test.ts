import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { OAUTH_ENDPOINTS, PROVIDERS as LEGACY_PROVIDERS } from "../../open-sse/config/constants.ts";
import { REGISTRY } from "../../open-sse/config/providerRegistry.ts";
import {
  getAccessToken,
  REFRESH_LEAD_MS,
  supportsTokenRefresh,
} from "../../open-sse/services/tokenRefresh.ts";
import { OAUTH_PROVIDERS } from "../../src/shared/constants/providers.ts";

// The arc of this file, kept whole because each step is the reason the next made sense:
//
//   #8232  Restored OAuth auto-refresh for stored `gemini-cli` connections — a real user
//          report: the UI advertises automatic token rotation for OAuth providers, and
//          these rows never rotated. It overshot, restoring a routable, UI-visible
//          provider along the way.
//   #8275  Narrowed that to the legacy refresh path ONLY, keeping the discontinued
//          provider out of the public registries and out of routing.
//   now    Deprecated. What #8275 left was a refresh that WORKED (it redeemed against
//          PROVIDERS.gemini's client — the same public Gemini CLI OAuth client) for a
//          provider that is NOT routable. So the token stayed fresh and could never
//          answer a request: periodic upstream calls maintaining a dead credential.
//
// The refresh assertions below therefore now assert the deprecation instead of the
// refresh. They were rewritten, not removed — the count is unchanged and the behavior is
// pinned harder than before (a silent skip would pass a weaker test; a classified code
// does not). Registry-exclusion coverage from #8275 is untouched, because that guarantee
// still holds and is still worth guarding.
//
// Companion: tests/unit/gemini-cli-deprecation.test.ts covers the notice itself, the
// routability of the migration target, and the untouched CLIENT identity (#7034).

test("Gemini CLI stays out of the chat and OAuth provider registries", () => {
  assert.equal(REGISTRY["gemini-cli"], undefined);
  assert.equal(LEGACY_PROVIDERS["gemini-cli"], undefined);
  assert.equal((OAUTH_PROVIDERS as Record<string, unknown>)["gemini-cli"], undefined);
  assert.ok(REGISTRY.gemini);
  assert.ok(REGISTRY.antigravity);
});

test("legacy Gemini CLI connections are no longer refreshed at all", () => {
  // Was: lead time equal to antigravity's, supportsTokenRefresh === true.
  assert.equal(supportsTokenRefresh("gemini-cli"), false);
  assert.equal(REFRESH_LEAD_MS["gemini-cli"], undefined);
  // The sibling Google-backed providers must NOT be affected by the deprecation.
  assert.equal(supportsTokenRefresh("gemini"), true);
  assert.equal(REFRESH_LEAD_MS.antigravity, 15 * 60 * 1000);
});

test("Gemini CLI stays out of the provider translation snapshot", () => {
  const snapshotPath = new URL("../snapshots/provider/translate-path.json", import.meta.url);
  const snapshot = JSON.parse(readFileSync(snapshotPath, "utf8")) as Record<string, unknown>;
  assert.equal(snapshot["gemini-cli"], undefined);
});

test("legacy Gemini CLI refresh never reaches Google's token endpoint anymore", async () => {
  // Was: asserted a successful POST to OAUTH_ENDPOINTS.google.token carrying
  // PROVIDERS.gemini's client_id/secret, returning a new access token. That call is the
  // waste the deprecation removes — the token it produced could not route anywhere. Now
  // the assertion is stronger: not "it fails", but "no upstream call happens at all".
  const originalFetch = globalThis.fetch;
  const calls: string[] = [];

  globalThis.fetch = (async (url) => {
    calls.push(String(url));
    return new Response(JSON.stringify({ access_token: "should-never-be-requested" }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }) as typeof fetch;

  try {
    const result = await getAccessToken(
      "gemini-cli",
      { refreshToken: "legacy-gemini-cli-refresh-old" },
      {}
    );

    assert.deepEqual(calls, [], `expected zero upstream calls, got ${calls.join(", ")}`);
    assert.notEqual(
      calls[0],
      OAUTH_ENDPOINTS.google.token,
      "the Google token endpoint must not be contacted for a deprecated provider"
    );
    assert.equal(result.accessToken, undefined, "no token may be handed back");
    assert.equal(result.code, "provider_deprecated");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("legacy Gemini CLI refresh reports deprecation, not a revoked token", async () => {
  // Was: a 400 invalid_grant from upstream surfaced as
  // { error: "unrecoverable_refresh_error", code: "invalid_grant" }. The envelope is
  // deliberately unchanged — every existing caller keys on `error` and must keep
  // stopping its retries (isUnrecoverableRefreshError, the manual-refresh route). Only
  // the `code` differs, and that difference is the whole point: "your token was revoked"
  // and "this provider no longer exists" demand different actions from the operator.
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async () =>
    new Response(JSON.stringify({ error: "invalid_grant" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    })) as typeof fetch;

  try {
    const result = await getAccessToken(
      "gemini-cli",
      { refreshToken: "legacy-gemini-cli-refresh-revoked" },
      {}
    );
    assert.equal(result.error, "unrecoverable_refresh_error");
    assert.equal(result.code, "provider_deprecated");
    assert.equal(result.migrateTo, "gemini");
    assert.match(result.reason, /gemini/i);

    // The pre-deprecation behavior for a genuinely revoked token still works for the
    // provider that IS routable — proof the deprecation did not blunt the real path.
    const geminiResult = await getAccessToken("gemini", { refreshToken: "revoked" }, {});
    assert.equal(geminiResult.error, "unrecoverable_refresh_error");
    assert.equal(geminiResult.code, "invalid_grant");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
