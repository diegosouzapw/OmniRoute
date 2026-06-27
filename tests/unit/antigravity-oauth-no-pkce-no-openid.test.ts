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
