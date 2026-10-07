import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-probe-gate-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { createProviderConnection, deleteProviderConnection } =
  await import("../../src/lib/db/providers.ts");
const { runSingleModelTest, buildInternalChatRequest } =
  await import("../../src/lib/api/modelTestRunner.ts");
const chatRouteModule = await import("../../src/app/api/v1/chat/completions/route.ts");
const postChatCompletion = chatRouteModule.POST;
const { resetAllCircuitBreakers, getCircuitBreaker } =
  await import("../../src/shared/utils/circuitBreaker.ts");
const { invalidateDbCache } = await import("../../src/lib/db/readCache.ts");

const originalFetch = globalThis.fetch;

test.beforeEach(() => {
  resetAllCircuitBreakers();
  invalidateDbCache("connections");
});

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function readConnectionRow(connId: string) {
  const db = core.getDbInstance() as unknown as {
    prepare: (sql: string) => {
      get: (id: string) => Record<string, unknown> | undefined;
    };
  };
  return db
    .prepare(
      "SELECT is_active, test_status, rate_limited_until, last_error, refresh_token, access_token FROM provider_connections WHERE id = ?"
    )
    .get(connId);
}

async function createConnection(provider = "openai", extra: Record<string, unknown> = {}) {
  const conn = await createProviderConnection({
    provider,
    authType: "apikey",
    name: "probe-gate",
    apiKey: "sk-probe-gate", // pragma: allowlist secret
    isActive: true,
    testStatus: "active",
    ...extra,
  });
  return String((conn as { id: string }).id);
}

async function warmUp(connId: string): Promise<void> {
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ choices: [{ message: { role: "assistant", content: "OK" } }] }), {
      headers: { "content-type": "application/json" },
    });
  await runSingleModelTest({
    providerId: "openai",
    modelId: "gpt-4o",
    connectionId: connId,
    timeoutMs: 10_000,
  });
}

function mockUpstream(status: number, message: string): void {
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ error: { message } }), {
      status,
      headers: { "content-type": "application/json" },
    });
}

const ASSERT_NO_COOLDOWN = (connId: string, label: string) => {
  const row = readConnectionRow(connId);
  assert.equal(row?.is_active, 1, `${label}: connection stays active`);
  assert.notEqual(row?.test_status, "banned", `${label}: no terminal banned status`);
  assert.notEqual(row?.test_status, "deactivated", `${label}: no deactivated status`);
  assert.notEqual(row?.test_status, "credits_exhausted", `${label}: no credits_exhausted`);
  assert.equal(row?.rate_limited_until, null, `${label}: no persisted cooldown`);
  assert.ok(row?.last_error, `${label}: probe failure is recorded for visibility`);
};

test("GEO_BLOCKED (403 region) probe records but never persists the 24h cooldown", async () => {
  const connId = await createConnection("gemini");
  await warmUp(connId);
  mockUpstream(403, "user location is not supported");
  const result = await runSingleModelTest({
    providerId: "gemini",
    modelId: "gemini-2.5-flash",
    connectionId: connId,
    timeoutMs: 10_000,
  });
  assert.equal(result.status, "error");
  ASSERT_NO_COOLDOWN(connId, "GEO probe");
});

test("QUOTA_EXHAUSTED (402) probe records but never writes the terminal credits state", async () => {
  const connId = await createConnection();
  await warmUp(connId);
  mockUpstream(402, "billing cycle exhausted");
  const result = await runSingleModelTest({
    providerId: "openai",
    modelId: "gpt-4o",
    connectionId: connId,
    timeoutMs: 10_000,
  });
  assert.equal(result.status, "error");
  ASSERT_NO_COOLDOWN(connId, "QUOTA probe");
});

test("MODEL_NOT_FOUND (404) probe does not lock the model for real traffic", async () => {
  const connId = await createConnection();
  await warmUp(connId);
  mockUpstream(404, "Model gpt-4o not found");
  const failed = await runSingleModelTest({
    providerId: "openai",
    modelId: "gpt-4o",
    connectionId: connId,
    timeoutMs: 10_000,
  });
  assert.equal(failed.status, "error");
  ASSERT_NO_COOLDOWN(connId, "404 probe");

  globalThis.fetch = async () =>
    new Response(JSON.stringify({ choices: [{ message: { role: "assistant", content: "OK" } }] }), {
      headers: { "content-type": "application/json" },
    });
  const after = await runSingleModelTest({
    providerId: "openai",
    modelId: "gpt-4o",
    connectionId: connId,
    timeoutMs: 10_000,
  });
  assert.equal(after.status, "ok", "model lockout was not persisted by the probe");
});

test("401 probe never consumes the OAuth refresh token (no executor refresh call)", async () => {
  let fetchCalls = 0;
  const countingFetch = async (): Promise<Response> => {
    fetchCalls += 1;
    return new Response(JSON.stringify({ error: { message: "invalid token" } }), {
      status: 401,
      headers: { "content-type": "application/json" },
    });
  };
  globalThis.fetch = countingFetch as typeof fetch;
  const connId = await createConnection("github", {
    authType: "oauth",
    accessToken: "gh-probe-access",
    refreshToken: "gh-probe-refresh",
    providerSpecificData: { copilotToken: "gh-probe-copilot" },
  });
  const result = await runSingleModelTest({
    providerId: "github",
    modelId: "gpt-4o",
    connectionId: connId,
    timeoutMs: 10_000,
  });
  assert.equal(result.status, "error");
  assert.equal(
    fetchCalls,
    1,
    "exactly one upstream call — the refresh executor must never run for a probe"
  );
  const row = readConnectionRow(connId);
  assert.equal(row?.refresh_token, "gh-probe-refresh", "refresh token untouched");
  assert.equal(row?.access_token, "gh-probe-access", "access token untouched");
  ASSERT_NO_COOLDOWN(connId, "401 probe");
  // Remove this connection so the stale-token test below runs with exactly
  // one github connection (the chatCore fallback would otherwise try the
  // second github account, inflating its upstream fetch count).
  await deleteProviderConnection(connId);
});

test("probe with a stale token never runs the PROACTIVE refresh (base.ts execute)", async () => {
  let fetchCalls = 0;
  globalThis.fetch = (async () => {
    fetchCalls += 1;
    return new Response(JSON.stringify({ error: { message: "invalid token" } }), {
      status: 401,
      headers: { "content-type": "application/json" },
    });
  }) as typeof fetch;
  const connId = await createConnection("github", {
    authType: "oauth",
    accessToken: "gh-probe-access",
    refreshToken: "gh-probe-refresh",
    providerSpecificData: {
      copilotToken: "gh-probe-copilot",
      copilotTokenExpiresAt: new Date(Date.now() + 60_000).toISOString(),
    },
  });
  const result = await runSingleModelTest({
    providerId: "github",
    modelId: "gpt-4o",
    connectionId: connId,
    timeoutMs: 10_000,
  });
  assert.equal(result.status, "error");
  assert.equal(
    fetchCalls,
    1,
    "stale-token probe must skip the proactive refresh rotation (no extra fetch)"
  );
  ASSERT_NO_COOLDOWN(connId, "stale-token probe");
});

test("gitlab stale-token probe never runs its own execute() refresh override", async () => {
  let fetchCalls = 0;
  globalThis.fetch = (async () => {
    fetchCalls += 1;
    return new Response(JSON.stringify({ error: { message: "invalid token" } }), {
      status: 401,
      headers: { "content-type": "application/json" },
    });
  }) as typeof fetch;
  const connId = await createConnection("gitlab", {
    authType: "oauth",
    accessToken: "gl-probe-access",
    refreshToken: "gl-probe-refresh",
    expiresAt: new Date(Date.now() + 60_000).toISOString(),
  });
  const result = await runSingleModelTest({
    providerId: "gitlab",
    modelId: "gpt-4o",
    connectionId: connId,
    timeoutMs: 10_000,
  });
  assert.equal(result.status, "error");
  assert.equal(
    fetchCalls,
    1,
    "GitLabExecutor.execute must not consume a refresh rotation under a probe"
  );
  ASSERT_NO_COOLDOWN(connId, "gitlab stale-token probe");
});

test("codex 429 probe never runs the account-rotation failover (no persisted cooldown)", async () => {
  const connId = await createConnection("codex");
  await warmUp(connId);
  mockUpstream(429, "rate limited");
  const result = await runSingleModelTest({
    providerId: "codex",
    modelId: "gpt-5.6-sol",
    connectionId: connId,
    timeoutMs: 10_000,
  });
  assert.equal(result.status, "rate_limited");
  ASSERT_NO_COOLDOWN(connId, "codex 429 probe");
});

test("upstream-timeout probe keeps the breaker and the connection intact", async () => {
  const connId = await createConnection();
  await warmUp(connId);

  const timeoutError = new Error("upstream deadline exceeded");
  timeoutError.name = "TimeoutError";
  globalThis.fetch = async () => {
    throw timeoutError;
  };

  const realRes = await postChatCompletion(
    buildInternalChatRequest(
      { model: "openai/gpt-4o", messages: [{ role: "user", content: "hi" }], stream: false },
      new AbortController().signal,
      connId
    )
  );
  assert.notEqual(realRes.status, 200, "real timeout path exercised");
  const breaker = getCircuitBreaker("openai");
  assert.equal(breaker.failureCount, 0, "locally-tagged timeout never trips the breaker (design)");

  const probe = await runSingleModelTest({
    providerId: "openai",
    modelId: "gpt-4o",
    connectionId: connId,
    timeoutMs: 10_000,
  });
  assert.equal(probe.status, "error");
  assert.equal(breaker.failureCount, 0, "probe failure must not degrade the breaker");
  assert.equal(
    readConnectionRow(connId)?.is_active,
    1,
    "probe timeout keeps the connection active"
  );
});
