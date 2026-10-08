/**
 * `GET /authorize` is the loopback callback of the Trae browser login. It sits outside the
 * authz pipeline and carries the whole credential set in its query string, so it must only
 * save a connection for a login the dashboard started: a one-time state issued to a
 * management caller. The API host it stores must also stay on trae.ai, because the token
 * refresh posts to it.
 */

import test, { mock } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-trae-authorize-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "trae-authorize-api-key-secret";
process.env.JWT_SECRET = "trae-authorize-jwt-secret";

const core = await import("../../src/lib/db/core.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const { getProviderConnections } = await import("../../src/models/index.ts");
const { handleTraeCallback } = await import("../../src/app/authorize/handleCallback.ts");
const { createTraeLoginState } = await import("../../src/lib/oauth/traeLoginState.ts");
const authorizeStateRoute = await import("../../src/app/api/oauth/trae/authorize-state/route.ts");
const { consumeTraeLoginState } = await import("../../src/lib/oauth/traeLoginState.ts");
const { requestTraeAuthorizeState } = await import("../../src/shared/utils/traeAuthorizeState.ts");
const { TraeExecutor } = await import("../../open-sse/executors/trae.ts");

const originalFetch = globalThis.fetch;

await updateSettings({ requireLogin: true, password: "configured-password-hash" });
const plainKey = await apiKeysDb.createApiKey("inference-only", "machine1234567890");
const manageKey = await apiKeysDb.createApiKey("manage", "machine1234567890", ["manage"]);

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  mock.restoreAll();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function callbackQuery(
  overrides: { state?: string; host?: string; email?: string; token?: string } = {}
) {
  const q = new URLSearchParams();
  q.set(
    "userJwt",
    JSON.stringify({
      ClientID: "client",
      Token: overrides.token ?? "attacker-access-token",
      RefreshToken: "attacker-refresh-token",
      TokenExpireAt: 1,
    })
  );
  q.set("userInfo", JSON.stringify({ NonPlainTextEmail: overrides.email ?? "victim@example.com" }));
  if (overrides.host) q.set("host", overrides.host);
  if (overrides.state) q.set("loginTraceID", overrides.state);
  return q;
}

type TraeConnection = {
  email?: string;
  accessToken?: string;
  providerSpecificData: { host: string };
};

async function traeConnections() {
  return (await getProviderConnections({ provider: "trae" })) as unknown as TraeConnection[];
}

test("a callback without a server-issued state saves nothing", async () => {
  const before = (await traeConnections()).length;
  const result = await handleTraeCallback(callbackQuery());
  assert.equal(result.success, false);
  assert.equal((await traeConnections()).length, before);
});

test("a callback with an unknown state saves nothing", async () => {
  const before = (await traeConnections()).length;
  const result = await handleTraeCallback(callbackQuery({ state: crypto.randomUUID() }));
  assert.equal(result.success, false);
  assert.equal((await traeConnections()).length, before);
});

test("a login state is honoured once", async () => {
  const state = createTraeLoginState();
  const first = await handleTraeCallback(callbackQuery({ state, email: "once@example.com" }));
  assert.equal(first.success, true);
  const replay = await handleTraeCallback(callbackQuery({ state, email: "twice@example.com" }));
  assert.equal(replay.success, false);
});

test("a callback cannot overwrite an existing connection without a state", async () => {
  const state = createTraeLoginState();
  await handleTraeCallback(
    callbackQuery({ state, email: "operator@example.com", token: "operator-token" })
  );
  await handleTraeCallback(callbackQuery({ email: "operator@example.com", token: "forged-token" }));
  const [connection] = (await traeConnections()).filter((c) => c.email === "operator@example.com");
  assert.equal(connection.accessToken, "operator-token");
});

test("a callback with a host outside trae.ai is rejected without saving", async () => {
  const hosts = [
    "http://169.254.169.254",
    "https://evil.example.com",
    "https://api.trae.ai.evil.example.com",
    "https://api.trae.ai@evil.example.com",
  ];
  for (const [index, host] of hosts.entries()) {
    const state = createTraeLoginState();
    const email = `bad-host-${index}@example.com`;
    const result = await handleTraeCallback(callbackQuery({ state, host, email }));
    assert.equal(result.success, false, host);
    assert.equal(
      (await traeConnections()).some((c) => c.email === email),
      false,
      host
    );
  }
});

test("a callback with a trae.ai host keeps it", async () => {
  const state = createTraeLoginState();
  const result = await handleTraeCallback(
    callbackQuery({ state, host: "https://api-sg.trae.ai", email: "sg@example.com" })
  );
  assert.equal(result.success, true);
  const [connection] = (await traeConnections()).filter((c) => c.email === "sg@example.com");
  assert.equal(connection.providerSpecificData.host, "https://api-sg.trae.ai");
});

test("a callback without a host uses the default region", async () => {
  const state = createTraeLoginState();
  await handleTraeCallback(callbackQuery({ state, email: "nohost@example.com" }));
  const [connection] = (await traeConnections()).filter((c) => c.email === "nohost@example.com");
  assert.equal(connection.providerSpecificData.host, "https://api-us-east.trae.ai");
});

test("the token refresh ignores a stored host outside trae.ai", async () => {
  const urls: string[] = [];
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    urls.push(String(input instanceof Request ? input.url : input));
    return new Response("{}", { status: 500 });
  }) as typeof fetch;

  await new TraeExecutor()
    .refreshCredentials({
      refreshToken: "refresh-token",
      providerSpecificData: { host: "http://127.0.0.1:9" },
    })
    .catch(() => null);

  assert.deepEqual(urls, ["https://api-us-east.trae.ai/cloudide/api/v3/trae/oauth/ExchangeToken"]);
});

function stateRequest(apiKey: string) {
  return new Request("http://omniroute.example/api/oauth/trae/authorize-state", {
    method: "POST",
    headers: { authorization: `Bearer ${apiKey}` },
  });
}

test("authorize-state rejects an API key without the manage scope", async () => {
  const res = await authorizeStateRoute.POST(stateRequest(plainKey.key));
  assert.equal(res.status, 403);
});

test("a manage-scope key gets a state that completes one callback", async () => {
  const res = await authorizeStateRoute.POST(stateRequest(manageKey.key));
  assert.equal(res.status, 200);
  const { state } = (await res.json()) as { state: string };
  const result = await handleTraeCallback(callbackQuery({ state, email: "managed@example.com" }));
  assert.equal(result.success, true);
});

test("the login trace id is echoed on success and on failure", async () => {
  const state = createTraeLoginState();
  const ok = await handleTraeCallback(callbackQuery({ state, email: "echo@example.com" }));
  assert.equal(ok.success && ok.loginTraceId, state);

  const unknown = crypto.randomUUID();
  const failed = await handleTraeCallback(callbackQuery({ state: unknown }));
  assert.equal(failed.success, false);
  assert.equal(failed.loginTraceId, unknown);

  const q = callbackQuery({ state: unknown });
  q.delete("userJwt");
  const malformed = await handleTraeCallback(q);
  assert.equal(malformed.success, false);
  assert.equal(malformed.loginTraceId, unknown);
});

test("a login state expires after fifteen minutes", () => {
  const start = Date.now();
  const state = createTraeLoginState();
  mock.method(Date, "now", () => start + 15 * 60 * 1000 + 1);
  assert.equal(consumeTraeLoginState(state), false);
});

test("a login state is still valid just inside the time limit", () => {
  const start = Date.now();
  const state = createTraeLoginState();
  mock.method(Date, "now", () => start + 15 * 60 * 1000 - 1000);
  assert.equal(consumeTraeLoginState(state), true);
});

test("the oldest pending states are dropped once the cap is reached", () => {
  const first = createTraeLoginState();
  for (let i = 0; i < 100; i++) createTraeLoginState();
  assert.equal(consumeTraeLoginState(first), false);
});

test("authorize-state without credentials is refused", async () => {
  const res = await authorizeStateRoute.POST(
    new Request("http://omniroute.example/api/oauth/trae/authorize-state", { method: "POST" })
  );
  assert.equal(res.status, 401);
});

test("the state request returns the issued state", async () => {
  const fetchImpl = (async () =>
    Response.json({ state: "issued-state" }, { status: 200 })) as unknown as typeof fetch;
  assert.deepEqual(await requestTraeAuthorizeState(fetchImpl), { ok: true, state: "issued-state" });
});

test("the state request reports the server's message", async () => {
  const fetchImpl = (async () =>
    Response.json(
      { error: { message: "Invalid management token" } },
      { status: 403 }
    )) as unknown as typeof fetch;
  assert.deepEqual(await requestTraeAuthorizeState(fetchImpl), {
    ok: false,
    message: "Invalid management token",
  });
});

test("the state request falls back to the status for a non-json answer", async () => {
  const fetchImpl = (async () =>
    new Response("<html>bad gateway</html>", { status: 502 })) as unknown as typeof fetch;
  assert.deepEqual(await requestTraeAuthorizeState(fetchImpl), { ok: false, message: "HTTP 502" });
});

test("the state request gives up when the request fails or is aborted", async () => {
  const fetchImpl = (async () => {
    throw new DOMException("The operation was aborted due to timeout", "TimeoutError");
  }) as unknown as typeof fetch;
  assert.deepEqual(await requestTraeAuthorizeState(fetchImpl), { ok: false, message: null });
});

test("the state request passes a timeout signal", async () => {
  let signal: AbortSignal | null | undefined;
  const fetchImpl = (async (_url: RequestInfo | URL, init?: RequestInit) => {
    signal = init?.signal;
    return Response.json({ state: "s" });
  }) as unknown as typeof fetch;
  await requestTraeAuthorizeState(fetchImpl);
  assert.ok(signal instanceof AbortSignal);
});
