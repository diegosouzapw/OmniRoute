// A 401 on an OAuth connection whose token is still valid (it was just refreshed)
// is not terminal, but it got no cooldown either (the status_401 rule has cooldownMs 0).
// Every request then re-selected the account, refreshed the token and failed again: on
// a production instance (21 min of upstream 401s on two codex accounts) that was 273 token
// refreshes and 216 requests that each lost ~3 s before falling back. Now such a 401
// cools the connection down with exponential backoff, capped at COOLDOWN_MS.unauthorized,
// and a later success resets it.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-oauth-401-backoff-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "oauth-401-backoff-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const auth = await import("../../src/sse/services/auth.ts");
const { COOLDOWN_MS } = await import("../../open-sse/config/constants.ts");

const MODEL = "gpt-6-sol-high";
const UPSTREAM_401 =
  "[401]: Incorrect API key provided: sk-svcac***. You can find your API key at https://platform.openai.com/account/api-keys.";

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

/** A codex OAuth account whose access token was refreshed moments ago (10-day expiry). */
async function freshCodexAccount(name: string) {
  const expiresAt = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString();
  const connection = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    priority: 1,
    name,
    accessToken: `at-${name}`,
    refreshToken: `rt-${name}`,
    tokenExpiresAt: expiresAt,
    expiresAt,
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
  return String(connection.id);
}

const unavailable = (connId: string) =>
  auth.markAccountUnavailable(connId, 401, UPSTREAM_401, "codex", MODEL);

/** The next request only reaches the account after its cooldown; simulate that moment. */
const expireCooldown = (connId: string) =>
  providersDb.updateProviderConnection(connId, {
    rateLimitedUntil: new Date(Date.now() - 1000).toISOString(),
  });

const cooldownLeftMs = async (connId: string) => {
  const conn = await providersDb.getProviderConnectionById(connId);
  return Date.parse(String(conn.rateLimitedUntil ?? "")) - Date.now();
};

test.beforeEach(resetStorage);

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("a 401 on a freshly refreshed OAuth token cools the account down without parking it", async () => {
  const connId = await freshCodexAccount("a");
  const result = await unavailable(connId);
  const after = await providersDb.getProviderConnectionById(connId);

  assert.equal(result.shouldFallback, true);
  assert.ok(result.cooldownMs > 0, `cooldownMs ${result.cooldownMs} must be positive`);
  assert.ok((await cooldownLeftMs(connId)) > 0, "rateLimitedUntil must be in the future");
  assert.notEqual(after.testStatus, "expired", "a still-valid token is not expired (#12452)");
  assert.equal(after.testStatus, "active", "an OAuth 401 stays refreshable (#12594)");
  assert.equal(after.isActive, true);
});

test("repeated 401s back off exponentially and stop at the unauthorized cap", async () => {
  const connId = await freshCodexAccount("a");
  const cooldowns: number[] = [];
  for (let i = 0; i < 8; i++) {
    cooldowns.push((await unavailable(connId)).cooldownMs);
    await expireCooldown(connId);
    // As in production: the next request selects the account again once the cooldown has
    // passed. Selection resets backoffLevel at that moment, so the streak must survive it.
    const credentials = await auth.getProviderCredentials("codex", null, null, MODEL);
    assert.equal(credentials?.connectionId, connId);
  }

  for (let i = 1; i < 5; i++) {
    assert.ok(cooldowns[i] > cooldowns[i - 1], `cooldown ${i} (${cooldowns}) must grow`);
  }
  assert.ok(
    cooldowns.every((ms) => ms <= COOLDOWN_MS.unauthorized),
    `cooldowns ${cooldowns} must stay within ${COOLDOWN_MS.unauthorized}`
  );
  assert.equal(cooldowns.at(-1), COOLDOWN_MS.unauthorized);
});

test("the next request goes straight to a healthy account", async () => {
  await freshCodexAccount("a");
  await freshCodexAccount("b");
  const pick = async () =>
    (await auth.getProviderCredentials("codex", null, null, MODEL))?.connectionId;
  // Fail the account the router would pick anyway, so the assertion is not a coin toss.
  const failing = await pick();
  assert.ok(failing, "expected a codex account");
  await unavailable(failing);

  for (let i = 0; i < 3; i++) {
    assert.notEqual(await pick(), failing, "the cooling account is skipped");
  }
});

test("a success resets the backoff", async () => {
  const connId = await freshCodexAccount("a");
  const first = (await unavailable(connId)).cooldownMs;
  assert.ok(first > 0, "the first 401 already cools the account down");
  for (let i = 0; i < 2; i++) {
    await expireCooldown(connId);
    await unavailable(connId);
  }

  const conn = await providersDb.getProviderConnectionById(connId);
  await auth.clearAccountError(connId, conn);
  await expireCooldown(connId);
  const afterReset = (await unavailable(connId)).cooldownMs;
  assert.equal(afterReset, first, "backoff restarts from the base cooldown after a success");
});

test("a 401 that only says the model is unsupported does not cool the whole connection (#7268)", async () => {
  const connId = await freshCodexAccount("a");
  const result = await auth.markAccountUnavailable(
    connId,
    401,
    "Model grok-4.6 is not supported for format oa-compat",
    "codex",
    MODEL
  );
  assert.equal(result.cooldownMs, 0);
  assert.ok(!((await cooldownLeftMs(connId)) > 0), "other models on the connection stay usable");
});

test("a direct request does not wait out an auth cooldown, it would only hit the same 401", async () => {
  const { getCooldownAwareRetryDecision } =
    await import("../../src/sse/services/cooldownAwareRetry.ts");
  const settings = {
    enabled: true,
    maxRetries: 5,
    maxRetryWaitSec: 90,
    maxRetryWaitMs: 90_000,
    budgetMs: 300_000,
  };
  const retryAfter = new Date(Date.now() + 5_000).toISOString();
  const decide = (lastErrorCode: unknown) =>
    getCooldownAwareRetryDecision({ retryAfter, settings, attempt: 0, lastErrorCode }).shouldRetry;

  assert.equal(decide(401), false);
  assert.equal(decide("401.0"), false, "errorCode is stored as text on some rows");
  assert.equal(decide(429), true, "a rate-limit cooldown is still worth waiting for");
  assert.equal(decide(null), true);
});
