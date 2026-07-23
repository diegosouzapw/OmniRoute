import test from "node:test";
import assert from "node:assert/strict";

import { generateAuthData } from "../../src/lib/oauth/providers.ts";
import { xaiOauth, decodeXaiIdTokenIdentity } from "../../src/lib/oauth/providers/xai-oauth.ts";
import { XAI_OAUTH_CONFIG } from "../../src/lib/oauth/constants/oauth.ts";
import { getExecutor, hasSpecializedExecutor } from "../../open-sse/executors/index.ts";
import { XaiExecutor } from "../../open-sse/executors/xai.ts";
import { xai_oauthProvider } from "../../open-sse/config/providers/registry/xai-oauth/index.ts";

const originalFetch = globalThis.fetch;

function createJwt(payload: Record<string, unknown>) {
  const encode = (value: Record<string, unknown>) =>
    Buffer.from(JSON.stringify(value)).toString("base64url");
  return `${encode({ alg: "none" })}.${encode(payload)}.signature`;
}

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test("xAI OAuth builds the official PKCE authorization request", () => {
  const authData = generateAuthData("xai-oauth", "http://127.0.0.1:56121/callback");
  const url = new URL(authData.authUrl);

  assert.equal(url.origin, "https://auth.x.ai");
  assert.equal(url.pathname, "/oauth2/authorize");
  assert.equal(url.searchParams.get("client_id"), XAI_OAUTH_CONFIG.clientId);
  assert.equal(url.searchParams.get("scope"), XAI_OAUTH_CONFIG.scope);
  assert.equal(url.searchParams.get("code_challenge_method"), "S256");
  assert.equal(url.searchParams.get("plan"), "generic");
  assert.equal(url.searchParams.get("referrer"), "cli-proxy-api");
  assert.ok(url.searchParams.get("nonce"));
  assert.equal(authData.codeVerifier.length, 128);
  assert.equal(authData.fixedPort, 56121);
  assert.equal(authData.callbackPath, "/callback");
  assert.equal(authData.callbackHost, "127.0.0.1");
});

test("xAI OAuth exchanges a code with form-urlencoded PKCE fields", async () => {
  globalThis.fetch = async (input, init) => {
    assert.equal(String(input), XAI_OAUTH_CONFIG.tokenUrl);
    assert.equal(init?.method, "POST");
    assert.equal(init?.headers?.["Content-Type"], "application/x-www-form-urlencoded");
    const body = init?.body as URLSearchParams;
    assert.equal(body.get("grant_type"), "authorization_code");
    assert.equal(body.get("client_id"), XAI_OAUTH_CONFIG.clientId);
    assert.equal(body.get("code"), "auth-code");
    assert.equal(body.get("redirect_uri"), "http://127.0.0.1:56121/callback");
    assert.equal(body.get("code_verifier"), "verifier");
    return Response.json({ access_token: "access", refresh_token: "refresh", expires_in: 3600 });
  };

  const tokens = await xaiOauth.exchangeToken(
    XAI_OAUTH_CONFIG,
    "auth-code",
    "http://127.0.0.1:56121/callback",
    "verifier"
  );
  assert.equal(tokens.access_token, "access");
});

test("xAI OAuth maps refreshable tokens and safe id_token display metadata", () => {
  const idToken = createJwt({ email: "user@example.com", name: "Grok User" });
  assert.deepEqual(decodeXaiIdTokenIdentity(idToken), {
    email: "user@example.com",
    name: "Grok User",
  });

  const mapped = xaiOauth.mapTokens({
    access_token: "access",
    refresh_token: "refresh",
    id_token: idToken,
    expires_in: 3600,
    scope: XAI_OAUTH_CONFIG.scope,
  });
  assert.equal(mapped.accessToken, "access");
  assert.equal(mapped.refreshToken, "refresh");
  assert.equal(mapped.email, "user@example.com");
  assert.equal(mapped.name, "Grok User");
});

test("xAI OAuth is a distinct OAuth registry entry backed by the xAI executor", () => {
  assert.equal(xai_oauthProvider.authType, "oauth");
  assert.equal(xai_oauthProvider.baseUrl, "https://api.x.ai/v1/chat/completions");
  assert.ok(xai_oauthProvider.models?.some((model) => model.id === "grok-4.5"));
  assert.equal(hasSpecializedExecutor("xai-oauth"), true);
  assert.ok(getExecutor("xai-oauth") instanceof XaiExecutor);

  const headers = getExecutor("xai-oauth").buildHeaders({ accessToken: "oauth-access" }, false);
  assert.equal(headers.Authorization, "Bearer oauth-access");
});

test("xAI OAuth executor rotates refresh tokens", async () => {
  globalThis.fetch = async (input, init) => {
    assert.equal(String(input), XAI_OAUTH_CONFIG.tokenUrl);
    const body = init?.body as URLSearchParams;
    assert.equal(body.get("grant_type"), "refresh_token");
    assert.equal(body.get("client_id"), XAI_OAUTH_CONFIG.clientId);
    assert.equal(body.get("refresh_token"), "old-refresh");
    return Response.json({
      access_token: "new-access",
      refresh_token: "new-refresh",
      expires_in: 7200,
    });
  };

  const executor = new XaiExecutor("xai-oauth");
  const refreshed = await executor.refreshCredentials({ refreshToken: "old-refresh" }, null);
  assert.equal(refreshed?.accessToken, "new-access");
  assert.equal(refreshed?.refreshToken, "new-refresh");
  assert.ok(refreshed?.expiresAt);
});
