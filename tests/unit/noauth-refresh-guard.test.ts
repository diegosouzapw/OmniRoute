// @ts-nocheck
/**
 * A 401/403 from a provider that has no token to refresh must not start a refresh.
 *
 * The no-auth OpenCode connection carries no credentials, so every refresh attempt
 * fails after three retries (several seconds), and five failures open the
 * provider-wide refresh breaker for 30 minutes with "needs re-authentication". A
 * refusal that is scoped to the request (same verdict from every account) never
 * indicates a stale token either, keyed connection or not.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-refresh-guard-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-refresh-guard-secret";

const core = await import("../../src/lib/db/core.ts");
const auth = await import("../../src/sse/services/auth.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const { getExecutor } = await import("../../open-sse/executors/index.ts");
const { clearAllModelLockouts } = await import("../../open-sse/services/accountFallback.ts");
const { clearOpencodeFreeTierSkips } =
  await import("../../open-sse/services/opencodeFreeTierSkip.ts");

const originalFetch = globalThis.fetch;
const REFUSAL_BODY = JSON.stringify({
  type: "error",
  error: {
    type: "FreeTierError",
    message:
      "Error from provider (Console): OpenCode's free tier can only be used from within OpenCode",
  },
});
const AUTH_BODY = JSON.stringify({ error: { message: "invalid api key", type: "auth_error" } });
const noopLog = { debug() {}, info() {}, warn() {}, error() {} };

test.after(() => {
  globalThis.fetch = originalFetch;
  clearAllModelLockouts();
  clearOpencodeFreeTierSkips();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// #14313: a free-tier refusal on noauth records a short TTL skip; drop it so later
// cases in this file still resolve the synthetic credentials under test.
test.beforeEach(() => {
  clearOpencodeFreeTierSkips();
});

async function refreshAttemptsFor({ provider, model, credentials, status, body }) {
  const executor = await getExecutor(provider);
  const originalRefresh = executor.refreshCredentials;
  let attempts = 0;
  executor.refreshCredentials = async () => {
    attempts += 1;
    return null;
  };
  globalThis.fetch = async () =>
    new Response(body, { status, headers: { "content-type": "application/json" } });
  try {
    const requestBody = { model, messages: [{ role: "user", content: "hi" }], stream: false };
    await handleChatCore({
      body: structuredClone(requestBody),
      modelInfo: { provider, model, extendedContext: false },
      credentials,
      log: noopLog,
      clientRawRequest: {
        endpoint: "/v1/chat/completions",
        body: structuredClone(requestBody),
        headers: new Headers({ accept: "application/json" }),
      },
      connectionId: credentials.connectionId ?? null,
    });
    return attempts;
  } finally {
    executor.refreshCredentials = originalRefresh;
    globalThis.fetch = originalFetch;
  }
}

test("a request-scoped refusal on the no-auth connection starts no refresh", async () => {
  const credentials = await auth.getProviderCredentials("opencode", null, null, "big-pickle");
  assert.equal(credentials?.connectionId, "noauth");
  const attempts = await refreshAttemptsFor({
    provider: "opencode",
    model: "big-pickle",
    credentials,
    status: 403,
    body: REFUSAL_BODY,
  });
  assert.equal(attempts, 0);
});

test("a plain 401 on the no-auth connection starts no refresh (nothing to refresh)", async () => {
  const credentials = await auth.getProviderCredentials("opencode", null, null, "big-pickle");
  const attempts = await refreshAttemptsFor({
    provider: "opencode",
    model: "big-pickle",
    credentials,
    status: 401,
    body: AUTH_BODY,
  });
  assert.equal(attempts, 0);
});

test("a request-scoped refusal on a keyed OpenCode connection starts no refresh", async () => {
  const attempts = await refreshAttemptsFor({
    provider: "opencode-zen",
    model: "big-pickle",
    credentials: { apiKey: "sk-test", connectionId: "conn-keyed", providerSpecificData: {} },
    status: 403,
    body: REFUSAL_BODY,
  });
  assert.equal(attempts, 0);
});

test("a 401 on a keyed provider still attempts the refresh (unchanged)", async () => {
  const attempts = await refreshAttemptsFor({
    provider: "openai",
    model: "gpt-4o-mini",
    credentials: { apiKey: "sk-test", connectionId: "conn-openai", providerSpecificData: {} },
    status: 401,
    body: AUTH_BODY,
  });
  assert.ok(attempts >= 1, `expected a refresh attempt, got ${attempts}`);
});
