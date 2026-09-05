import { describe, it, beforeEach, afterEach, mock } from "node:test";
import assert from "node:assert/strict";

import {
  generateCursorAuthParams,
  pollCursorAuthOnce,
  refreshCursorAccessToken,
  credentialsFromCursorTokens,
  createCursorLoginSession,
  getCursorLoginSession,
  consumeCursorLoginSession,
  cancelCursorLoginSession,
  clearCursorLoginSessions,
} from "../../../src/lib/oauth/services/cursorLogin.ts";
import { CURSOR_CONFIG } from "../../../src/lib/oauth/constants/oauth.ts";
import { CURSOR_AGENT_CLI_VERSION } from "../../../open-sse/utils/cursorAgentCliVersion.ts";

function b64urlJson(obj: Record<string, unknown>): string {
  return Buffer.from(JSON.stringify(obj)).toString("base64url");
}

function fakeJwt(payload: Record<string, unknown>): string {
  return `hdr.${b64urlJson(payload)}.sig`;
}

describe("CURSOR_CONFIG deep-control endpoints", () => {
  it("exposes OpenCodex-compatible login/poll/refresh URLs and AvailableModels path", () => {
    assert.equal(CURSOR_CONFIG.loginUrl, "https://cursor.com/loginDeepControl");
    assert.equal(CURSOR_CONFIG.pollUrl, "https://api2.cursor.sh/auth/poll");
    assert.equal(CURSOR_CONFIG.refreshUrl, "https://api2.cursor.sh/auth/exchange_user_api_key");
    assert.equal(CURSOR_CONFIG.modelsEndpoint, "/aiserver.v1.AiService/AvailableModels");
    assert.equal(CURSOR_CONFIG.dbKeys.refreshToken, "cursorAuth/refreshToken");
    assert.equal(CURSOR_CONFIG.clientVersion, CURSOR_AGENT_CLI_VERSION);
  });
});

describe("generateCursorAuthParams", () => {
  it("returns PKCE challenge (not verifier in loginUrl) plus uuid", async () => {
    const params = await generateCursorAuthParams();
    assert.ok(params.verifier.length >= 43);
    assert.ok(params.challenge.length > 0);
    assert.notEqual(params.challenge, params.verifier);
    assert.ok(params.uuid.length > 0);
    assert.ok(params.loginUrl.startsWith("https://cursor.com/loginDeepControl?"));
    assert.match(params.loginUrl, /challenge=/);
    assert.match(params.loginUrl, /uuid=/);
    assert.match(params.loginUrl, /mode=login/);
    assert.match(params.loginUrl, /redirectTarget=cli/);
    assert.doesNotMatch(params.loginUrl, /verifier=/);
  });
});

describe("credentialsFromCursorTokens", () => {
  it("extracts accountId/email/expiresAt from JWT claims", () => {
    const exp = Math.floor(Date.now() / 1000) + 3600;
    const access = fakeJwt({ sub: "user_abc", email: "A@Example.COM", exp });
    const refresh = "refresh-token-value";
    const creds = credentialsFromCursorTokens(access, refresh);
    assert.equal(creds.accessToken, access);
    assert.equal(creds.refreshToken, refresh);
    assert.equal(creds.accountId, "user_abc");
    assert.equal(creds.email, "a@example.com");
    assert.ok(creds.expiresAt instanceof Date);
    assert.ok(creds.expiresAt.getTime() < exp * 1000);
  });

  it("falls back to ~1h expiry when JWT has no exp", () => {
    const access = fakeJwt({ sub: "u1" });
    const before = Date.now();
    const creds = credentialsFromCursorTokens(access, "r");
    const after = Date.now();
    assert.ok(creds.expiresAt.getTime() >= before + 55 * 60 * 1000);
    assert.ok(creds.expiresAt.getTime() <= after + 65 * 60 * 1000);
  });
});

describe("cursor login session store", () => {
  beforeEach(() => clearCursorLoginSessions());
  afterEach(() => clearCursorLoginSessions());

  it("stores verifier server-side and never exposes it via get", () => {
    const { sessionId, loginUrl } = createCursorLoginSession({
      verifier: "v-secret",
      challenge: "c",
      uuid: "u-1",
      loginUrl: "https://cursor.com/loginDeepControl?x=1",
    });
    assert.ok(sessionId);
    assert.ok(loginUrl.includes("loginDeepControl"));
    const publicView = getCursorLoginSession(sessionId);
    assert.ok(publicView);
    assert.equal(publicView.uuid, "u-1");
    assert.equal((publicView as { verifier?: string }).verifier, undefined);
  });

  it("consume returns full session once then clears", () => {
    const { sessionId } = createCursorLoginSession({
      verifier: "v-secret",
      challenge: "c",
      uuid: "u-2",
      loginUrl: "https://example",
    });
    const full = consumeCursorLoginSession(sessionId);
    assert.equal(full?.verifier, "v-secret");
    assert.equal(consumeCursorLoginSession(sessionId), null);
  });

  it("cancel drops the session", () => {
    const { sessionId } = createCursorLoginSession({
      verifier: "v",
      challenge: "c",
      uuid: "u-3",
      loginUrl: "https://example",
    });
    assert.equal(cancelCursorLoginSession(sessionId), true);
    assert.equal(getCursorLoginSession(sessionId), null);
  });
});

describe("pollCursorAuthOnce", () => {
  afterEach(() => {
    mock.restoreAll();
  });

  it("returns pending on 404", async () => {
    mock.method(globalThis, "fetch", async () => new Response(null, { status: 404 }));
    const result = await pollCursorAuthOnce("uuid", "verifier");
    assert.deepEqual(result, { status: "pending" });
  });

  it("returns tokens on 200", async () => {
    mock.method(
      globalThis,
      "fetch",
      async () =>
        new Response(JSON.stringify({ accessToken: "a", refreshToken: "r" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        })
    );
    const result = await pollCursorAuthOnce("uuid", "verifier");
    assert.deepEqual(result, { status: "ok", accessToken: "a", refreshToken: "r" });
  });

  it("returns error on non-404 failure", async () => {
    mock.method(globalThis, "fetch", async () => new Response("nope", { status: 500 }));
    const result = await pollCursorAuthOnce("uuid", "verifier");
    assert.equal(result.status, "error");
  });
});

describe("refreshCursorAccessToken", () => {
  afterEach(() => {
    mock.restoreAll();
  });

  it("returns new access and keeps old refresh when omitted", async () => {
    mock.method(
      globalThis,
      "fetch",
      async () =>
        new Response(JSON.stringify({ accessToken: fakeJwt({ sub: "u", exp: 9999999999 }) }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        })
    );
    const result = await refreshCursorAccessToken("old-refresh");
    assert.ok(result && !("error" in result));
    assert.equal(result.refreshToken, "old-refresh");
    assert.ok(result.accessToken);
  });

  it("fail-fasts as unrecoverable on 401", async () => {
    mock.method(globalThis, "fetch", async () => new Response("unauthorized", { status: 401 }));
    const result = await refreshCursorAccessToken("dead");
    assert.deepEqual(result, { error: "unrecoverable_refresh_error", code: "unauthorized" });
  });

  it("retries 503 then succeeds", async () => {
    let calls = 0;
    mock.method(globalThis, "fetch", async () => {
      calls += 1;
      if (calls === 1) return new Response("busy", { status: 503 });
      return new Response(
        JSON.stringify({
          accessToken: fakeJwt({ sub: "u2", exp: 9999999999 }),
          refreshToken: "new-r",
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    });
    const result = await refreshCursorAccessToken("r", undefined, { retryBaseMs: 1 });
    assert.ok(result && !("error" in result));
    assert.equal(result.refreshToken, "new-r");
    assert.equal(calls, 2);
  });
});
