/**
 * `/api/oauth/` is classified PUBLIC so each handler runs its own auth check. For a PUBLIC
 * path `isAuthenticated()` accepts any valid client API key, so the OAuth handlers that
 * start logins and create or overwrite provider connections must use the management check
 * instead: dashboard session, CLI token, access token, or a key with the `manage` scope.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-oauth-manage-scope-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "oauth-manage-scope-api-key-secret";
process.env.JWT_SECRET = "oauth-manage-scope-jwt-secret";

const core = await import("../../src/lib/db/core.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const { getProviderConnections } = await import("../../src/models/index.ts");
const { SignJWT } = await import("jose");
const { createAccessToken } = await import("../../src/lib/db/accessTokens.ts");
const actionRoute = await import("../../src/app/api/oauth/[provider]/[action]/route.ts");
const pasteCredentialsRoute =
  await import("../../src/app/api/oauth/[provider]/paste-credentials/route.ts");
const cursorStartRoute = await import("../../src/app/api/oauth/cursor/login/start/route.ts");
const cursorPollRoute = await import("../../src/app/api/oauth/cursor/login/poll/route.ts");
const cursorCancelRoute = await import("../../src/app/api/oauth/cursor/login/cancel/route.ts");
const kiroApiKeyRoute = await import("../../src/app/api/oauth/kiro/api-key/route.ts");
const kiroSocialAuthorizeRoute =
  await import("../../src/app/api/oauth/kiro/social-authorize/route.ts");
const kiroSocialExchangeRoute =
  await import("../../src/app/api/oauth/kiro/social-exchange/route.ts");

const originalFetch = globalThis.fetch;
let outboundCalls: string[] = [];

await updateSettings({ requireLogin: true, password: "configured-password-hash" });
const plainKey = await apiKeysDb.createApiKey("inference-only", "machine1234567890");
const manageKey = await apiKeysDb.createApiKey("manage", "machine1234567890", ["manage"]);

test.beforeEach(() => {
  outboundCalls = [];
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    outboundCalls.push(String(input instanceof Request ? input.url : input));
    return new Response("{}", { status: 500 });
  }) as typeof fetch;
});

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function jsonRequest(url: string, apiKey: string, body: unknown, method = "POST") {
  return new Request(`http://omniroute.example${url}`, {
    method,
    headers: { authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
    body: method === "GET" ? undefined : JSON.stringify(body),
  });
}

function actionParams(provider: string, action: string) {
  return { params: Promise.resolve({ provider, action }) };
}

const oauthCalls: Array<[string, (apiKey: string) => Promise<Response>]> = [
  [
    "POST /api/oauth/devin-cli/import-token",
    (key) =>
      actionRoute.POST(
        jsonRequest("/api/oauth/devin-cli/import-token", key, { token: "attacker-token" }),
        actionParams("devin-cli", "import-token")
      ),
  ],
  [
    "POST /api/oauth/github/poll",
    (key) =>
      actionRoute.POST(
        jsonRequest("/api/oauth/github/poll", key, { deviceCode: "device-code" }),
        actionParams("github", "poll")
      ),
  ],
  [
    "GET /api/oauth/github/device-code",
    (key) =>
      actionRoute.GET(
        jsonRequest("/api/oauth/github/device-code", key, null, "GET"),
        actionParams("github", "device-code")
      ),
  ],
  [
    "POST /api/oauth/antigravity/paste-credentials",
    (key) =>
      pasteCredentialsRoute.POST(
        jsonRequest("/api/oauth/antigravity/paste-credentials", key, { blob: "x" }),
        { params: Promise.resolve({ provider: "antigravity" }) }
      ),
  ],
  [
    "POST /api/oauth/cursor/login/start",
    (key) => cursorStartRoute.POST(jsonRequest("/api/oauth/cursor/login/start", key, {})),
  ],
  [
    "POST /api/oauth/cursor/login/poll",
    (key) =>
      cursorPollRoute.POST(jsonRequest("/api/oauth/cursor/login/poll", key, { sessionId: "s" })),
  ],
  [
    "POST /api/oauth/cursor/login/cancel",
    (key) =>
      cursorCancelRoute.POST(
        jsonRequest("/api/oauth/cursor/login/cancel", key, { sessionId: "s" })
      ),
  ],
  [
    "POST /api/oauth/kiro/api-key",
    (key) => kiroApiKeyRoute.POST(jsonRequest("/api/oauth/kiro/api-key", key, { apiKey: "k" })),
  ],
  [
    "GET /api/oauth/kiro/social-authorize",
    (key) =>
      kiroSocialAuthorizeRoute.GET(
        jsonRequest("/api/oauth/kiro/social-authorize?provider=github", key, null, "GET")
      ),
  ],
  [
    "POST /api/oauth/kiro/social-exchange",
    (key) =>
      kiroSocialExchangeRoute.POST(
        jsonRequest("/api/oauth/kiro/social-exchange", key, { deviceCode: "d" })
      ),
  ],
];

for (const [label, call] of oauthCalls) {
  test(`${label} rejects an API key without the manage scope`, async () => {
    const res = await call(plainKey.key);
    assert.equal(res.status, 403, `${label} answered ${res.status}`);
    assert.deepEqual(outboundCalls, []);
  });
}

test("an API key without the manage scope cannot add a provider connection", async () => {
  const before = (await getProviderConnections({ provider: "devin-cli" })).length;
  await oauthCalls[0][1](plainKey.key);
  const after = (await getProviderConnections({ provider: "devin-cli" })).length;
  assert.equal(after, before);
});

test("a manage-scope API key can still import a token", async () => {
  const before = (await getProviderConnections({ provider: "devin-cli" })).length;
  const res = await oauthCalls[0][1](manageKey.key);
  assert.equal(res.status, 200);
  const after = (await getProviderConnections({ provider: "devin-cli" })).length;
  assert.equal(after, before + 1);
});

function importTokenRequest(headers: Record<string, string>, url = "http://omniroute.example") {
  return new Request(`${url}/api/oauth/devin-cli/import-token`, {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body: JSON.stringify({ token: "attacker-token" }),
  });
}

async function callImportToken(headers: Record<string, string>, url?: string) {
  return actionRoute.POST(
    importTokenRequest(headers, url),
    actionParams("devin-cli", "import-token")
  );
}

test("a request without credentials or with an unknown key is refused with 401", async () => {
  assert.equal((await callImportToken({})).status, 401);
  assert.equal((await callImportToken({ authorization: "Bearer sk-not-a-real-key" })).status, 401);
  assert.deepEqual(outboundCalls, []);
});

test("an API key in the query string is not accepted", async () => {
  const res = await actionRoute.POST(
    new Request(
      `http://omniroute.example/api/oauth/devin-cli/import-token?api_key=${plainKey.key}`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token: "attacker-token" }),
      }
    ),
    actionParams("devin-cli", "import-token")
  );
  assert.equal(res.status, 401);
});

test("a dashboard session can still use the routes", async () => {
  const jwt = await new SignJWT({ authenticated: true })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
  const res = await callImportToken({ cookie: `auth_token=${jwt}` });
  assert.equal(res.status, 200);
});

test("an admin access token can use the routes and a read access token cannot", async () => {
  const admin = createAccessToken({ name: "oauth-admin", scope: "admin" });
  const read = createAccessToken({ name: "oauth-read", scope: "read" });
  assert.equal((await callImportToken({ authorization: `Bearer ${admin.secret}` })).status, 200);
  assert.equal((await callImportToken({ authorization: `Bearer ${read.secret}` })).status, 403);
});

test("before a password exists only a local caller may use the routes", async () => {
  const savedPassword = process.env.INITIAL_PASSWORD;
  delete process.env.INITIAL_PASSWORD;
  await updateSettings({ password: "", setupComplete: false });
  try {
    assert.equal((await callImportToken({})).status, 401);
    assert.equal((await callImportToken({}, "http://localhost")).status, 200);
  } finally {
    await updateSettings({ password: "configured-password-hash" });
    if (savedPassword !== undefined) process.env.INITIAL_PASSWORD = savedPassword;
  }
});
