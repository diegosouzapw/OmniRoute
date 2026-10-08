/**
 * TDD — #13183: a Claude OAuth refresh failure must not make the #11414 retry
 * budget unreachable.
 *
 * #11414 keeps an unrecoverable refresh failure retryable: the connection stays
 * active with testStatus "expired" until EXPIRED_RETRY_MAX attempts are spent.
 * The same update, however, ran `refreshToken: null` for every rotating provider
 * — Claude included. On the next sweep `checkConnection` hits the
 * `!conn.refreshToken` guard, whose self-heal branch only fires while testStatus
 * is empty or "active"; the row is already "expired", so the sweep returns
 * silently. The connection sits active, expired and unrecoverable until a manual
 * re-auth — the sticky-dead report in #13183.
 *
 * The existing #11414 regression test never caught it: it drives a synthetic
 * provider that is NOT in ROTATING_REFRESH_PROVIDERS, so the refresh token was
 * never nulled there.
 *
 * Guards, with the real `claude` provider:
 *   ① first unrecoverable failure preserves the refresh token
 *   ② the second sweep therefore reaches the retry path (budget is spendable)
 *   ③ a rotating provider that does NOT opt in still gets its token cleared
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-claude-refresh-preserve-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.NODE_ENV = "test";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const tokenHealthCheck = await import("../../src/lib/tokenHealthCheck.ts");

const ANTHROPIC_TOKEN_URL = "https://api.anthropic.com/v1/oauth/token";
const CODEX_TOKEN_URL = "https://auth.openai.com/oauth/token";

async function resetStorage() {
  core.resetDbInstance();
  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
      }
      break;
    } catch (error: unknown) {
      const code = (error as { code?: string })?.code;
      if ((code === "EBUSY" || code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw error;
      }
    }
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

/** Answer every OAuth token endpoint with invalid_grant; pass everything else through. */
function mockInvalidGrant() {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === "string" ? input : (input as Request).url;
    if (url === ANTHROPIC_TOKEN_URL || url === CODEX_TOKEN_URL) {
      return new Response(JSON.stringify({ error: "invalid_grant" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }
    return originalFetch(
      input as Parameters<typeof originalFetch>[0],
      init as Parameters<typeof originalFetch>[1]
    );
  }) as typeof fetch;
  return originalFetch;
}

const EXPIRED_ISO = new Date(Date.now() - 60 * 60 * 1000).toISOString();

async function createOAuthConnection(provider: string, overrides: Record<string, unknown> = {}) {
  return (await providersDb.createProviderConnection({
    provider,
    authType: "oauth",
    name: `${provider} sticky-refresh account`,
    email: "[EMAIL_REDACTED]",
    refreshToken: `rt_${provider}_test`,
    accessToken: `at_${provider}_test`,
    // Expired access token: without it the rotating-provider sweep returns before
    // ever attempting a refresh (refresh is expiry-driven, not interval-driven).
    expiresAt: EXPIRED_ISO,
    tokenExpiresAt: EXPIRED_ISO,
    healthCheckInterval: 60,
    isActive: true,
    testStatus: "active",
    ...overrides,
  })) as { id: string; [key: string]: unknown };
}

test.after(async () => {
  core.resetDbInstance();
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  } catch {
    // ignore cleanup errors
  }
});

// ── ① Claude keeps its refresh token on the first unrecoverable failure ──────
test("claude preserves refreshToken on the first unrecoverable refresh failure", async () => {
  await resetStorage();
  const originalFetch = mockInvalidGrant();
  try {
    const connection = await createOAuthConnection("claude");

    await tokenHealthCheck.checkConnection({
      ...connection,
      lastHealthCheckAt: new Date(Date.now() - 61 * 60 * 1000).toISOString(),
    });

    const updated = await providersDb.getProviderConnectionById(connection.id);

    assert.equal(
      updated?.refreshToken,
      "rt_claude_test",
      "refresh token must survive — the retry budget cannot be spent without it"
    );
    assert.equal(updated?.isActive, true, "connection stays active while retries remain");
    assert.equal(updated?.testStatus, "expired", "status reflects the expired token");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

// ── ② The retry budget is actually reachable on the next sweep ───────────────
// Two REAL consecutive sweeps, re-reading the row in between — the second sweep
// must see whatever the first one persisted. With the refresh token nulled the
// second sweep bails out at the `!conn.refreshToken` guard and the counter is
// stuck at 1 forever.
test("claude spends a second retry on the next sweep instead of returning silently", async () => {
  await resetStorage();
  const originalFetch = mockInvalidGrant();
  try {
    const created = await createOAuthConnection("claude");
    const staleCheck = new Date(Date.now() - 61 * 60 * 1000).toISOString();

    await tokenHealthCheck.checkConnection({ ...created, lastHealthCheckAt: staleCheck });

    const afterFirst = await providersDb.getProviderConnectionById(created.id);
    const firstPsd = afterFirst?.providerSpecificData as
      { expiredRetry?: { count?: number } } | undefined;
    assert.equal(firstPsd?.expiredRetry?.count, 1, "first sweep spends retry 1");

    // Backdate the retry timestamp so the exponential backoff window has elapsed.
    await providersDb.updateProviderConnection(created.id, {
      providerSpecificData: {
        ...(afterFirst?.providerSpecificData as Record<string, unknown>),
        expiredRetry: { count: 1, at: new Date(Date.now() - 60 * 60 * 1000).toISOString() },
      },
    });

    const beforeSecond = await providersDb.getProviderConnectionById(created.id);
    await tokenHealthCheck.checkConnection({
      ...(beforeSecond as Record<string, unknown>),
      lastHealthCheckAt: staleCheck,
    });

    const afterSecond = await providersDb.getProviderConnectionById(created.id);
    const secondPsd = afterSecond?.providerSpecificData as
      { expiredRetry?: { count?: number } } | undefined;

    assert.equal(
      secondPsd?.expiredRetry?.count,
      2,
      "second sweep must spend retry 2 — a nulled refresh token makes it return early"
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

// ── ③ Rotating providers that do not opt in still get the token cleared ──────
test("codex still clears its single-use refresh token", async () => {
  await resetStorage();
  const originalFetch = mockInvalidGrant();
  try {
    const connection = await createOAuthConnection("codex");

    await tokenHealthCheck.checkConnection({
      ...connection,
      lastHealthCheckAt: new Date(Date.now() - 61 * 60 * 1000).toISOString(),
    });

    const updated = await providersDb.getProviderConnectionById(connection.id);
    assert.ok(
      !updated?.refreshToken,
      "a consumed one-time-use Codex token is worthless and must still be cleared"
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

// ── Opt-in list is explicit ──────────────────────────────────────────────────
test("only claude opts out of clearing the rotating refresh token", () => {
  assert.equal(tokenHealthCheck.preservesRefreshTokenOnUnrecoverable("claude"), true);
  assert.equal(tokenHealthCheck.preservesRefreshTokenOnUnrecoverable("Claude"), true);
  assert.equal(tokenHealthCheck.preservesRefreshTokenOnUnrecoverable("codex"), false);
  assert.equal(tokenHealthCheck.preservesRefreshTokenOnUnrecoverable(undefined), false);
});
