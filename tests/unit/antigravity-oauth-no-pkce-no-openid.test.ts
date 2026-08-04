// Regression guard for the Antigravity OAuth login hang on Google's consent page.
//
// The embedded Antigravity client is a Google "Desktop/native" OAuth client.
// Sending a PKCE code_challenge AND the `openid` scope pushed Google into the
// `signin/oauth/firstparty/nativeapp` consent flow, which hung and never redirected
// back (operator report 2026-06-27). The working 9router flow uses a plain
// authorization_code grant (client_secret, no code_challenge) and does NOT request
// `openid`. This test pins our antigravity (and the `agy` alias) to that shape.
//
// Flip-proof: set flowType back to "authorization_code_pkce" → generateAuthData emits
// code_challenge → first assertion fails. Re-add "openid" → scope assertion fails.

import test from "node:test";
import assert from "node:assert/strict";
import { generateAuthData } from "../../src/lib/oauth/providers.ts";
import PROVIDERS from "../../src/lib/oauth/providers/index.ts";

const REDIRECT = "http://127.0.0.1:20128/callback";

for (const providerId of ["antigravity", "agy"]) {
  test(`${providerId}: no PKCE + no openid in the auth URL (matches working 9router flow)`, () => {
    assert.equal(
      PROVIDERS[providerId].flowType,
      "authorization_code",
      `${providerId} must use a plain authorization_code grant (no PKCE) for the Google native client`
    );

    const authData = generateAuthData(providerId, REDIRECT);
    assert.ok(authData.authUrl, `${providerId} must produce an auth URL`);

    const url = new URL(authData.authUrl);
    assert.equal(url.origin, "https://accounts.google.com");

    // No PKCE challenge — its presence triggers the hanging nativeapp consent.
    assert.equal(
      url.searchParams.get("code_challenge"),
      null,
      `${providerId} auth URL must NOT carry a PKCE code_challenge`
    );
    assert.equal(url.searchParams.get("code_challenge_method"), null);

    // No openid scope — only the Cloud Code / userinfo scopes 9router requests.
    const scopes = (url.searchParams.get("scope") || "").split(" ");
    assert.ok(!scopes.includes("openid"), `${providerId} must not request the openid scope`);
    assert.ok(
      scopes.includes("https://www.googleapis.com/auth/cloud-platform"),
      `${providerId} must still request the cloud-platform scope`
    );
  });
}

test("antigravity.exchangeToken never forwards code_verifier (no PKCE → no invalid_grant 500)", async () => {
  const origFetch = globalThis.fetch;
  let sentBody = "";
  globalThis.fetch = (async (_url: unknown, init: { body?: unknown } = {}) => {
    sentBody = String(init.body ?? "");
    return new Response(
      JSON.stringify({ access_token: "t", refresh_token: "r", expires_in: 3600 }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }) as typeof fetch;
  try {
    // Pass a codeVerifier (as the modal does — generateAuthData always mints one).
    // It MUST be ignored: the authorize URL had no code_challenge, so forwarding a
    // code_verifier makes Google reject the exchange (invalid_grant → 500).
    await PROVIDERS.antigravity.exchangeToken(
      {
        clientId: "cid",
        clientSecret: "sec",
        tokenUrl: "https://oauth2.googleapis.com/token",
      },
      "the-code",
      "http://127.0.0.1:20128/callback",
      "should-be-ignored-verifier"
    );
  } finally {
    globalThis.fetch = origFetch;
  }
  const params = new URLSearchParams(sentBody);
  assert.equal(params.get("code_verifier"), null, "must NOT forward code_verifier (no PKCE)");
  assert.equal(params.get("client_secret"), "sec", "must authenticate via client_secret");
  assert.equal(params.get("grant_type"), "authorization_code");
});
