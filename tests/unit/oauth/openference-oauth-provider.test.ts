import test from "node:test";
import assert from "node:assert/strict";

import { generateAuthData } from "../../../src/lib/oauth/providers.ts";
import {
  openference,
  decodeOpenferenceIdTokenIdentity,
} from "../../../src/lib/oauth/providers/openference.ts";
import { OPENFERENCE_CONFIG } from "../../../src/lib/oauth/constants/oauth.ts";
import { getExecutor, hasSpecializedExecutor } from "../../../open-sse/executors/index.ts";
import { OAUTH_ENDPOINTS } from "../../../open-sse/config/constants.ts";
import { openferenceProvider } from "../../../open-sse/config/providers/registry/openference/index.ts";
import { refreshOpenferenceToken } from "../../../open-sse/services/tokenRefresh/providers/openference.ts";
import { OAUTH_TEST_CONFIG } from "../../../src/app/api/providers/[id]/test/oauthTestConfig.ts";
import { testOAuthConnection } from "../../../src/app/api/providers/[id]/test/route.ts";
import { supportsTokenRefresh } from "../../../open-sse/services/tokenRefresh.ts";
import { NAMED_OPENAI_STYLE_PROVIDERS } from "../../../src/app/api/providers/[id]/models/discovery/providerSets.ts";
import { OAUTH_PROVIDERS } from "../../../src/shared/constants/providers/oauth.ts";
import PROVIDERS from "../../../src/lib/oauth/providers/index.ts";

const originalFetch = globalThis.fetch;

function createJwt(payload: Record<string, unknown>) {
  const encode = (value: Record<string, unknown>) =>
    Buffer.from(JSON.stringify(value)).toString("base64url");
  return `${encode({ alg: "none" })}.${encode(payload)}.signature`;
}

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test("Openference OAuth builds the PKCE authorization request", () => {
  const authData = generateAuthData("openference", "http://127.0.0.1:56123/callback");
  const url = new URL(authData.authUrl);

  assert.equal(url.origin, "https://openference.com");
  assert.equal(url.pathname, "/app/oauth/authorize");
  assert.equal(url.searchParams.get("client_id"), OPENFERENCE_CONFIG.clientId);
  assert.equal(url.searchParams.get("scope"), OPENFERENCE_CONFIG.scope);
  assert.equal(url.searchParams.get("code_challenge_method"), "S256");
  assert.ok(url.searchParams.get("code_challenge"));
  assert.equal(authData.fixedPort, 56123);
  assert.equal(authData.callbackPath, "/callback");
  assert.equal(authData.callbackHost, "127.0.0.1");
});

test("Openference OAuth exchanges a code with form-urlencoded PKCE fields", async () => {
  globalThis.fetch = async (input, init) => {
    assert.equal(String(input), OPENFERENCE_CONFIG.tokenUrl);
    assert.equal(init?.method, "POST");
    assert.equal(init?.headers?.["Content-Type"], "application/x-www-form-urlencoded");
    const body = init?.body as URLSearchParams;
    assert.equal(body.get("grant_type"), "authorization_code");
    assert.equal(body.get("client_id"), OPENFERENCE_CONFIG.clientId);
    assert.equal(body.get("code"), "auth-code");
    assert.equal(body.get("redirect_uri"), "http://127.0.0.1:56123/callback");
    assert.equal(body.get("code_verifier"), "verifier");
    return Response.json({
      access_token: "access",
      refresh_token: "oar_refresh",
      expires_in: 3600,
      id_token: createJwt({ email: "user@openference.com", name: "Openference User" }),
    });
  };

  const tokens = await openference.exchangeToken(
    OPENFERENCE_CONFIG,
    "auth-code",
    "http://127.0.0.1:56123/callback",
    "verifier"
  );
  assert.equal(tokens.access_token, "access");
});

test("Openference OAuth maps refreshable tokens and id_token display metadata", () => {
  const idToken = createJwt({ email: "user@openference.com", name: "Openference User" });
  assert.deepEqual(decodeOpenferenceIdTokenIdentity(idToken), {
    email: "user@openference.com",
    name: "Openference User",
  });

  const mapped = openference.mapTokens({
    access_token: "access",
    refresh_token: "oar_refresh",
    id_token: idToken,
    expires_in: 3600,
    scope: OPENFERENCE_CONFIG.scope,
  });
  assert.equal(mapped.accessToken, "access");
  assert.equal(mapped.refreshToken, "oar_refresh");
  assert.equal(mapped.email, "user@openference.com");
  assert.equal(mapped.name, "Openference User");
});

test("Openference OAuth postExchange fetches userinfo when id_token lacks email", async () => {
  globalThis.fetch = async (input) => {
    assert.equal(String(input), OPENFERENCE_CONFIG.userinfoUrl);
    return Response.json({ email: "from-userinfo@openference.com", name: "Userinfo Name" });
  };

  const extra = await openference.postExchange({ access_token: "access" });
  const mapped = openference.mapTokens(
    { access_token: "access", refresh_token: "oar_refresh", expires_in: 3600 },
    extra
  );
  assert.equal(mapped.email, "from-userinfo@openference.com");
  assert.equal(mapped.name, "Userinfo Name");
});
test("Openference is registered as an OAuth gateway with default executor", async () => {
  assert.ok(OAUTH_PROVIDERS.openference);
  assert.equal(OAUTH_PROVIDERS.openference.alias, "of");
  assert.equal(OAUTH_PROVIDERS.openference.color, "#6366F1");
  assert.equal(OAUTH_PROVIDERS.openference.hasFree, true);
  assert.equal(typeof OAUTH_PROVIDERS.openference.freeNote, "string");
  assert.ok(PROVIDERS.openference);

  assert.equal(openferenceProvider.authType, "oauth");
  assert.equal(openferenceProvider.executor, "default");
  assert.equal(openferenceProvider.oauth?.clientIdDefault, OPENFERENCE_CONFIG.clientId);
  assert.equal(OAUTH_ENDPOINTS.openference.clientId, OPENFERENCE_CONFIG.clientId);
  assert.match(OPENFERENCE_CONFIG.clientId, /^[a-z]+$/);
  assert.equal(OPENFERENCE_CONFIG.clientId.length, 9);
  assert.equal(openferenceProvider.baseUrl, "https://api.openference.com/v1/chat/completions");
  assert.deepEqual(
    openferenceProvider.models?.map((model) => model.id),
    ["GLM-5.2"]
  );
  assert.equal(hasSpecializedExecutor("openference"), false);

  const headers = (await getExecutor("openference")).buildHeaders({ accessToken: "oauth-access" }, false);
  assert.equal(headers.Authorization, "Bearer oauth-access");
});

test("Openference is classified for live OpenAI-style model discovery", () => {
  assert.ok(NAMED_OPENAI_STYLE_PROVIDERS.has("openference"));
});

test("OAUTH_TEST_CONFIG covers openference and alias of", () => {
  assert.ok((OAUTH_TEST_CONFIG as Record<string, unknown>).openference);
  assert.ok((OAUTH_TEST_CONFIG as Record<string, unknown>).of);
});

test("Openference Test Connection probes /v1/models instead of reporting unsupported", async () => {
  let calledUrl = "";
  globalThis.fetch = async (url) => {
    calledUrl = String(url);
    return new Response(JSON.stringify({ data: [{ id: "GLM-5.2" }] }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };

  const result = await testOAuthConnection({
    provider: "openference",
    accessToken: "healthy-access-token",
    refreshToken: "oar_refresh",
    tokenExpiresAt: new Date(Date.now() + 3600_000).toISOString(),
  });

  assert.notEqual(result.diagnosis?.type, "unsupported");
  assert.notEqual(result.error, "Provider test not supported");
  assert.equal(result.valid, true);
  assert.equal(calledUrl, "https://api.openference.com/v1/models");
});

test("Openference Test Connection treats 402 as authenticated (plan required for inference)", async () => {
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ error: "payment_required" }), {
      status: 402,
      headers: { "content-type": "application/json" },
    });

  const result = await testOAuthConnection({
    provider: "openference",
    accessToken: "healthy-access-token",
    refreshToken: "oar_refresh",
    tokenExpiresAt: new Date(Date.now() + 3600_000).toISOString(),
  });

  assert.equal(result.valid, true);
});

test("Openference refresh rotates oar_* tokens", async () => {
  assert.equal(supportsTokenRefresh("openference"), true);

  globalThis.fetch = async (input, init) => {
    assert.equal(String(input), OPENFERENCE_CONFIG.tokenUrl);
    const body = init?.body as URLSearchParams;
    assert.equal(body.get("grant_type"), "refresh_token");
    assert.equal(body.get("client_id"), OPENFERENCE_CONFIG.clientId);
    assert.equal(body.get("refresh_token"), "oar_old");
    return Response.json({
      access_token: "new-access",
      refresh_token: "oar_new",
      expires_in: 3600,
    });
  };

  const refreshed = await refreshOpenferenceToken("oar_old", null, null);
  assert.equal(refreshed?.accessToken, "new-access");
  assert.equal(refreshed?.refreshToken, "oar_new");
});
