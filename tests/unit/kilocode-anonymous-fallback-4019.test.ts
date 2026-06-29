// Regression test for #4019 — anonymous (no-auth) access to Kilo Code free models.
//
// Kilo's gateway serves its free tier without signup: an OpenAI-compatible
// request to https://api.kilo.ai/api/openrouter/chat/completions authenticated
// with the literal API key `anonymous` (Authorization: Bearer anonymous) plus an
// X-KILOCODE-EDITORNAME header returns free models. OmniRoute now exposes this by
// (1) flagging the kilocode provider `anonymousFallback: true` so a request with
// no connected account synthesizes a noauth credential, and (2) having the
// DefaultExecutor send the registry `anonymousApiKey` as the bearer token when no
// real credential exists. The authenticated OAuth path must stay untouched.

import test from "node:test";
import assert from "node:assert/strict";

import { DefaultExecutor } from "../../open-sse/executors/default.ts";
import { getProviderById } from "../../src/shared/constants/providers.ts";

test("kilocode buildHeaders sends `Bearer anonymous` + editor header when no credential is present", () => {
  const executor = new DefaultExecutor("kilocode");
  // Synthetic noauth credential shape: no apiKey, no accessToken.
  const headers = executor.buildHeaders(
    { apiKey: null, accessToken: null } as never,
    true
  ) as Record<string, string>;

  assert.equal(
    headers["Authorization"],
    "Bearer anonymous",
    "anonymous free-tier request must carry the literal `anonymous` bearer token"
  );
  assert.equal(
    headers["X-KILOCODE-EDITORNAME"],
    "OmniRoute",
    "Kilo's gateway requires the editor-name header"
  );
});

test("kilocode buildHeaders prefers a real OAuth token over the anonymous fallback (regression guard)", () => {
  const executor = new DefaultExecutor("kilocode");
  const headers = executor.buildHeaders(
    { apiKey: null, accessToken: "kc-real-oauth-token" } as never,
    true
  ) as Record<string, string>;

  assert.equal(
    headers["Authorization"],
    "Bearer kc-real-oauth-token",
    "an authenticated account must use its own token, never `anonymous`"
  );
});

test("kilocode buildHeaders prefers a real API key over the anonymous fallback", () => {
  const executor = new DefaultExecutor("kilocode");
  const headers = executor.buildHeaders(
    { apiKey: "kc-user-key", accessToken: null } as never,
    true
  ) as Record<string, string>;

  assert.equal(headers["Authorization"], "Bearer kc-user-key");
});

test("kilocode provider is flagged anonymousFallback so no-auth requests synthesize a credential", () => {
  const provider = getProviderById("kilocode") as { anonymousFallback?: boolean } | undefined;
  assert.ok(provider, "kilocode must be a known provider");
  assert.equal(
    provider?.anonymousFallback,
    true,
    "anonymousFallback drives providerCanUseSyntheticNoAuthFallback → synthetic noauth credential"
  );
});
