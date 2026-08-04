// #7013: Grok Build (grok-cli) browser login (PKCE) — unit coverage for
// everything testable without a real auth.x.ai round-trip (that half is
// validated live on the VPS per Hard Rule #18, see the PR description).
//
// DB handles released in test.after (CLAUDE.md learning: unreleased SQLite
// handles hang node:test).

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-oauth-grok-cli-7013-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const route = await import("../../src/app/api/oauth/[provider]/[action]/route.ts");
const { generateAuthData } = await import("../../src/lib/oauth/providers.ts");
const { grokCli } = await import("../../src/lib/oauth/providers/grok-cli.ts");
const { GROK_BUILD_OAUTH_CONFIG, XAI_OAUTH_CONFIG } = await import(
  "../../src/lib/oauth/constants/oauth.ts"
);

const originalFetch = globalThis.fetch;

test.before(async () => {
  await settingsDb.updateSettings({ requireLogin: false });
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

function getRoute(provider: string, action: string, search = "") {
  const request = new Request(`http://localhost:20128/api/oauth/${provider}/${action}${search}`);
  return route.GET(request, { params: Promise.resolve({ provider, action }) });
}

function postRoute(provider: string, action: string, body: unknown) {
  const request = new Request(`http://localhost:20128/api/oauth/${provider}/${action}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return route.POST(request, { params: Promise.resolve({ provider, action }) });
}

// ── buildAuthUrl ─────────────────────────────────────────────────────────

test("grok-cli buildAuthUrl targets GROK_BUILD_OAUTH_CONFIG.authorizeUrl with the Grok Build scope", () => {
  const authData = generateAuthData("grok-cli", "http://127.0.0.1:56122/callback");
  const url = new URL(authData.authUrl);

  assert.equal(url.origin, "https://auth.x.ai");
  assert.equal(url.pathname, "/oauth2/authorize");
  assert.equal(url.searchParams.get("response_type"), "code");
  assert.equal(url.searchParams.get("client_id"), GROK_BUILD_OAUTH_CONFIG.clientId);
  assert.equal(url.searchParams.get("code_challenge_method"), "S256");
  assert.equal(url.searchParams.get("scope"), GROK_BUILD_OAUTH_CONFIG.scope);
  assert.equal(authData.fixedPort, 56122);
  assert.equal(authData.callbackPath, "/callback");
  assert.equal(authData.callbackHost, "127.0.0.1");
});

test("grok-cli and xai-oauth reuse the same public client id but scope Grok Build separately", () => {
  assert.equal(GROK_BUILD_OAUTH_CONFIG.clientId, XAI_OAUTH_CONFIG.clientId);
  assert.notEqual(GROK_BUILD_OAUTH_CONFIG.scope, XAI_OAUTH_CONFIG.scope);
  assert.ok(GROK_BUILD_OAUTH_CONFIG.scope.includes("grok-cli:access"));
});

// ── loopback port collision guard ───────────────────────────────────────

test("grok-cli's loopback port does not collide with xai-oauth or codex", () => {
  assert.equal(GROK_BUILD_OAUTH_CONFIG.loopbackPort, 56122);
  assert.equal(XAI_OAUTH_CONFIG.loopbackPort, 56121);
  assert.notEqual(GROK_BUILD_OAUTH_CONFIG.loopbackPort, XAI_OAUTH_CONFIG.loopbackPort);
  assert.notEqual(GROK_BUILD_OAUTH_CONFIG.loopbackPort, 1455); // codex's fixedPort
});

// ── exchangeToken ────────────────────────────────────────────────────────

test("grok-cli exchangeToken POSTs grant_type=authorization_code with the PKCE verifier", async () => {
  globalThis.fetch = async (input, init) => {
    assert.equal(String(input), GROK_BUILD_OAUTH_CONFIG.tokenUrl);
    assert.equal(init?.method, "POST");
    assert.equal(init?.headers?.["Content-Type"], "application/x-www-form-urlencoded");
    const body = init?.body as URLSearchParams;
    assert.equal(body.get("grant_type"), "authorization_code");
    assert.equal(body.get("client_id"), GROK_BUILD_OAUTH_CONFIG.clientId);
    assert.equal(body.get("code"), "auth-code");
    assert.equal(body.get("redirect_uri"), "http://127.0.0.1:56122/callback");
    assert.equal(body.get("code_verifier"), "verifier");
    return Response.json({ access_token: "gb-access", refresh_token: "gb-refresh", expires_in: 3600 });
  };

  const tokens = await grokCli.exchangeToken(
    GROK_BUILD_OAUTH_CONFIG,
    "auth-code",
    "http://127.0.0.1:56122/callback",
    "verifier"
  );
  assert.equal(tokens.access_token, "gb-access");
});

test("grok-cli exchangeToken throws (not a raw stack leak) on a non-OK upstream response", async () => {
  globalThis.fetch = async () => new Response("upstream said no", { status: 400 });

  await assert.rejects(
    () =>
      grokCli.exchangeToken(
        GROK_BUILD_OAUTH_CONFIG,
        "bad-code",
        "http://127.0.0.1:56122/callback",
        "verifier"
      ),
    (err: Error) => {
      assert.ok(err instanceof Error);
      assert.doesNotMatch(err.message, /at \//, "must not carry a stack-trace-shaped fragment");
      return true;
    }
  );
});

// ── mapTokens: unified dispatch (browser vs paste-token) ────────────────

test("grok-cli mapTokens maps a browser PKCE exchange response (access_token shape)", () => {
  const mapped = grokCli.mapTokens({
    access_token: "browser-access",
    refresh_token: "browser-refresh",
    expires_in: 3600,
  });
  assert.equal(mapped.accessToken, "browser-access");
  assert.equal(mapped.refreshToken, "browser-refresh");
  assert.equal(mapped.expiresIn, 3600);
  assert.ok(mapped.providerSpecificData);
});

test("grok-cli mapTokens still maps a pasted JWT (accessToken shape, paste-token path)", () => {
  const payload = { sub: "12345", email: "paste@example.com", team_id: "team-1", tier: 2 };
  const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const mockJwt = `eyJhbGciOiJFUzI1NiJ9.${payloadBase64}.signature`;

  const mapped = grokCli.mapTokens(mockJwt);
  assert.equal(mapped.accessToken, mockJwt);
  assert.equal(mapped.email, "paste@example.com");
  assert.equal(mapped.providerSpecificData?.userId, "12345");
});

test("grok-cli mapTokens browser output clamps expiresIn to a positive TTL (#5775 pattern, duplicated)", () => {
  const mapped = grokCli.mapTokens({
    access_token: "browser-access",
    refresh_token: "browser-refresh",
    expires_in: -100,
  });
  assert.ok(mapped.expiresIn >= 1, `expected expiresIn >= 1, got ${mapped.expiresIn}`);
});

// ── route dispatch: PKCE path is reachable, import-token still works ────

test("GET /api/oauth/grok-cli/authorize dispatches through the PKCE path (not the disabled-import_token branch)", async () => {
  const res = await getRoute("grok-cli", "authorize");
  assert.equal(res.status, 200);
  const body = await res.json();
  // #7013 rework: flowType stays "device_code" (the primary/default method,
  // #7358) — the PKCE authUrl is built off the supportsBrowserPkce capability
  // marker (providers.ts::generateAuthData), not off flowType equality.
  assert.equal(body.flowType, "device_code");
  assert.ok(body.authUrl, "authUrl must be present — PKCE is enabled, not disabled");
  assert.ok(!("supported" in body) || body.supported !== false);
});

test("POST /api/oauth/grok-cli/exchange requires a codeVerifier (PKCE branch reached)", async () => {
  const res = await postRoute("grok-cli", "exchange", {
    code: "auth-code",
    redirectUri: "http://127.0.0.1:56122/callback",
  });
  assert.equal(res.status, 400);
  const body = await res.json();
  assert.match(body.error.details[0].message, /Code verifier is required for grok-cli/);
});

test("POST /api/oauth/grok-cli/exchange failure returns a sanitized 500 (Hard Rule #12)", async () => {
  globalThis.fetch = async () => new Response("upstream secret leak: token=abc123", { status: 500 });

  const res = await postRoute("grok-cli", "exchange", {
    code: "auth-code",
    redirectUri: "http://127.0.0.1:56122/callback",
    codeVerifier: "verifier",
  });
  assert.equal(res.status, 500);
  const body = await res.json();
  assert.doesNotMatch(String(body.error), /token=abc123/, "must not leak the upstream error body");
  assert.doesNotMatch(String(body.error), /at \//, "must not leak a stack trace");
});

test("POST /api/oauth/grok-cli/import-token still works — no regression to the paste-token path", async () => {
  const payload = { sub: "import-1", email: "import-regress@example.com", team_id: "t1", tier: 1 };
  const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const mockJwt = `eyJhbGciOiJFUzI1NiJ9.${payloadBase64}.signature`;

  const res = await postRoute("grok-cli", "import-token", { token: mockJwt });
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.success, true);
  assert.equal(body.connection.email, "import-regress@example.com");
});
