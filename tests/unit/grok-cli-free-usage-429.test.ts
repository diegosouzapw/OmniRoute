/**
 * Grok Build free-tier rolling 24h cap is a 429, not a 402 wallet miss.
 *
 * Live body:
 *   "You've used all the included free usage for model grok-4.6 for now.
 *    Usage resets over a rolling 24-hour window — tokens (actual/limit):
 *    513161/500000."
 *
 * Before this fix the classifier treated it as a short rate_limit. Combo then
 * waited ~30s (comboCooldownWait.maxWaitMs) and retried the same grok-4.6
 * login instead of locking that model on that connection and advancing.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-grok-cli-429-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "grok-cli-429-test-secret";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const { classify429, looksLikeQuotaExhausted } =
  await import("../../src/shared/utils/classify429.ts");
const accountFallback = await import("../../open-sse/services/accountFallback.ts");
const { RateLimitReason } = await import("../../open-sse/config/constants.ts");
const { shouldWaitForComboCooldown } =
  await import("../../open-sse/services/combo/comboCooldownRetry.ts");
const { applyComboTargetExhaustion } =
  await import("../../open-sse/services/combo/targetExhaustion.ts");
const comboLog = { info() {}, warn() {}, error() {}, debug() {} };
const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/sse/services/auth.ts");

const GROK_FREE_USAGE_429 =
  "You've used all the included free usage for model grok-4.6 for now. " +
  "Usage resets over a rolling 24-hour window — tokens (actual/limit): 513161/500000. " +
  "Upgrade to a Grok subscription for higher limits: https://grok.com/supergrok";

const DAY_MS = 24 * 60 * 60 * 1000;

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 50 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedGrokCli(name: string) {
  return providersDb.createProviderConnection({
    provider: "grok-cli",
    authType: "oauth",
    name,
    email: name,
    accessToken: `grok-cli-${name}`,
    isActive: true,
    testStatus: "active",
  });
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 50 });
});

test("classify429: Grok Build free-usage rolling 24h 429 is quota_exhausted", () => {
  assert.equal(looksLikeQuotaExhausted(GROK_FREE_USAGE_429), true);
  assert.equal(classify429({ status: 429, body: GROK_FREE_USAGE_429 }), "quota_exhausted");
  assert.equal(
    classify429({ status: 429, body: { error: { message: GROK_FREE_USAGE_429 } } }),
    "quota_exhausted"
  );
});

test("classify429: a generic Grok 429 without the 24h free-usage phrase stays rate_limit", () => {
  assert.equal(
    classify429({ status: 429, body: "Too many requests. Please retry shortly." }),
    "rate_limit"
  );
});

test("checkFallbackError: Grok Build free-usage 429 is QUOTA_EXHAUSTED with a 24h cooldown", () => {
  const result = accountFallback.checkFallbackError(
    429,
    GROK_FREE_USAGE_429,
    0,
    "grok-4.6",
    "grok-cli"
  );
  assert.equal(result.shouldFallback, true);
  assert.equal(result.reason, RateLimitReason.QUOTA_EXHAUSTED);
  assert.ok(
    result.cooldownMs >= DAY_MS - 60_000,
    `expected ~24h cooldown, got ${result.cooldownMs}`
  );
});

test("combo must not wait 30s on this 429 — quota_exhausted is non-retryable", () => {
  const fallback = accountFallback.checkFallbackError(
    429,
    GROK_FREE_USAGE_429,
    0,
    "grok-4.6",
    "grok-cli"
  );
  const reason =
    fallback.reason === RateLimitReason.QUOTA_EXHAUSTED ? "quota_exhausted" : "rate_limited";
  const decision = shouldWaitForComboCooldown({
    reason,
    waitMs: 30_000,
    attempt: 0,
    budgetLeftMs: 90_000,
    settings: { enabled: true, maxWaitMs: 30_000, maxAttempts: 2, budgetMs: 90_000 },
  });
  assert.equal(reason, "quota_exhausted");
  assert.equal(decision.wait, false);
});

test("grok-cli 429 parks grok-4.6 on that login, not the whole connection", async () => {
  await resetStorage();
  const conn = await seedGrokCli("free@example.com");
  const id = (conn as { id: string }).id;

  const result = await auth.markAccountUnavailable(
    id,
    429,
    GROK_FREE_USAGE_429,
    "grok-cli",
    "grok-4.6"
  );
  assert.equal(result.shouldFallback, true);

  const after = await providersDb.getProviderConnectionById(id);
  assert.equal(after.testStatus, "active", "passthrough 429 must stay model-scoped");

  const lockout = accountFallback.getModelLockoutInfo("grok-cli", id, "grok-4.6");
  assert.equal(lockout?.reason, "quota_exhausted");
  assert.ok(
    (lockout?.remainingMs ?? 0) > 60_000,
    `lockout must outlast the 30s combo wait, got ${lockout?.remainingMs}`
  );
});

test("a sibling grok-cli login stays eligible after another login's 24h 429", async () => {
  await resetStorage();
  const empty = await seedGrokCli("empty@example.com");
  const live = await seedGrokCli("live@example.com");
  const emptyId = (empty as { id: string }).id;
  const liveId = (live as { id: string }).id;

  await auth.markAccountUnavailable(emptyId, 429, GROK_FREE_USAGE_429, "grok-cli", "grok-4.6");

  assert.equal(accountFallback.isModelLocked("grok-cli", liveId, "grok-4.6"), false);

  const selected = await auth.getProviderCredentials("grok-cli", null, null, "grok-4.6");
  assert.ok(selected);
  assert.equal(selected.connectionId, liveId);
});

test("combo exhaustion must not skip sibling grok-cli accounts on this 429", () => {
  const sets = {
    exhaustedProviders: new Set<string>(),
    exhaustedConnections: new Set<string>(),
    transientRateLimitedProviders: new Set<string>(),
  };
  const empty = {
    kind: "model",
    executionKey: "grok-cli/grok-4.6@empty",
    provider: "grok-cli",
    providerId: null,
    modelStr: "grok-cli/grok-4.6",
    connectionId: "empty",
  } as Parameters<typeof applyComboTargetExhaustion>[0];
  const fallbackResult = accountFallback.checkFallbackError(
    429,
    GROK_FREE_USAGE_429,
    0,
    "grok-4.6",
    "grok-cli"
  );
  applyComboTargetExhaustion(empty, {
    result: { status: 429 },
    fallbackResult,
    errorText: GROK_FREE_USAGE_429,
    rawModel: "grok-4.6",
    isTokenLimitBreach: false,
    allAccountsRateLimited: false,
    requestScopedFailure: false,
    sets,
    log: comboLog,
    tag: "COMBO",
    exhaustedLogLevel: "info",
  });
  assert.equal(
    sets.exhaustedProviders.has("grok-cli"),
    false,
    "passthrough per-model 429 must not exhaust the whole grok-cli provider"
  );
});
