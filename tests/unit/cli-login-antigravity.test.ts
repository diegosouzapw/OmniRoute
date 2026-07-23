// Tests for the `omniroute login antigravity` local OAuth helper.
//
// The helper runs the OAuth on the user's own machine (where the Google
// native-loopback consent can complete) and prints a credential blob to paste
// into a remote install. We test the two pieces that, if wrong, silently break
// the flow: the authorization request (must be a plain authorization_code grant
// with a 127.0.0.1 loopback redirect and NO PKCE challenge) and the end-to-end
// orchestration (state validation + exchange + blob emission), with the browser,
// loopback server, and token exchange injected as fakes.

import test from "node:test";
import assert from "node:assert/strict";
import {
  buildAntigravityAuthRequest,
  runAntigravityLogin,
} from "../../bin/cli/commands/login.mjs";
import { decodeCredentialBlob } from "../../src/lib/oauth/credentialBlob.ts";

test("buildAntigravityAuthRequest: loopback redirect on 127.0.0.1 + no PKCE", async () => {
  const { authUrl, redirectUri, state } = await buildAntigravityAuthRequest(54321, () => "fixed");
  assert.equal(redirectUri, "http://127.0.0.1:54321/callback");
  assert.equal(state, "fixed");

  const url = new URL(authUrl);
  assert.equal(url.origin, "https://accounts.google.com");
  assert.equal(url.searchParams.get("redirect_uri"), redirectUri);
  assert.equal(url.searchParams.get("response_type"), "code");
  assert.equal(url.searchParams.get("state"), "fixed");
  assert.equal(url.searchParams.get("code_challenge"), null, "must NOT carry a PKCE challenge");
});

test("runAntigravityLogin: validates state, exchanges code, prints a decodable blob", async () => {
  let exchangedCode = null;
  let exchangedRedirect = null;

  const blob = await runAntigravityLogin(
    {},
    {
      makeState: () => "S",
      openBrowser: async () => {},
      startServer: async () => ({
        port: 54321,
        waitForCallback: async () => ({ code: "the-code", state: "S" }),
        close: async () => {},
      }),
      exchange: async (code, redirectUri) => {
        exchangedCode = code;
        exchangedRedirect = redirectUri;
        return { access_token: "ya29.a", refresh_token: "1//r", expires_in: 3600, scope: "x" };
      },
      print: () => {},
      log: () => {},
    }
  );

  assert.equal(exchangedCode, "the-code");
  assert.equal(exchangedRedirect, "http://127.0.0.1:54321/callback");

  const decoded = decodeCredentialBlob(blob);
  assert.equal(decoded.provider, "antigravity");
  assert.equal(decoded.tokens.access_token, "ya29.a");
  assert.equal(decoded.tokens.refresh_token, "1//r");
});

test("runAntigravityLogin: rejects a state mismatch (CSRF guard)", async () => {
  await assert.rejects(
    () =>
      runAntigravityLogin(
        {},
        {
          makeState: () => "expected",
          openBrowser: async () => {},
          startServer: async () => ({
            port: 1,
            waitForCallback: async () => ({ code: "c", state: "ATTACKER" }),
            close: async () => {},
          }),
          exchange: async () => ({ access_token: "x" }),
          print: () => {},
          log: () => {},
        }
      ),
    /state mismatch|csrf/i
  );
});

test("runAntigravityLogin: surfaces an OAuth error param", async () => {
  await assert.rejects(
    () =>
      runAntigravityLogin(
        {},
        {
          makeState: () => "S",
          openBrowser: async () => {},
          startServer: async () => ({
            port: 1,
            waitForCallback: async () => ({ error: "access_denied", state: "S" }),
            close: async () => {},
          }),
          exchange: async () => ({ access_token: "x" }),
          print: () => {},
          log: () => {},
        }
      ),
    /access_denied|authorization failed/i
  );
});
