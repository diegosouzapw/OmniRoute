/**
 * Claude weekly exhaustion must not cool the whole agy/antigravity connection.
 * Gemini on the same account stays routable; only family:claude is locked.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-agy-family-cd-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "agy-family-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const quotaPreflight = await import("../../open-sse/services/quotaPreflight.ts");
const family = await import("../../open-sse/services/antigravityQuotaFamily.ts");
const fallback = await import("../../open-sse/services/accountFallback.ts");
const { markConnectionQuotaExhausted } = await import("../../open-sse/executors/antigravity.ts");
const { quotaRemainingPercentFromQuota } = await import(
  "../../open-sse/services/combo/comboPredicates.ts"
);

const CLAUDE_RESET = "2026-09-06T17:38:10.000Z";
const GEMINI_RESET = "2026-09-09T09:59:00.000Z";

function mixedWindows() {
  return {
    claude_gpt_weekly: { percentUsed: 1, resetAt: CLAUDE_RESET },
    gemini_weekly: { percentUsed: 0.022, resetAt: GEMINI_RESET },
    "gemini-3.1-flash-lite": { percentUsed: 0.1, resetAt: null },
  };
}

test.after(() => {
  fallback.clearAllModelLockouts();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("selectAntigravityQuotaWindowNames keeps Claude weekly off a Gemini request", () => {
  const names = family.selectAntigravityQuotaWindowNames(Object.keys(mixedWindows()), "gemini-3.1-flash-lite");
  assert.deepEqual(names.sort(), ["gemini-3.1-flash-lite", "gemini_weekly"].sort());
});

test("preflightQuota proceeds on Gemini when only Claude weekly is exhausted", async () => {
  quotaPreflight.registerQuotaFetcher("agy", async () => ({
    used: 0,
    total: 0,
    percentUsed: 1,
    limitReached: true,
    windows: mixedWindows(),
  }));

  const result = await quotaPreflight.preflightQuota("agy", "conn-1", {
    requestedModel: "agy/gemini-3.1-flash-lite",
  });
  assert.equal(result.proceed, true, "Gemini must not inherit Claude weekly exhaustion");
});

test("preflightQuota blocks Gemini when gemini_weekly is exhausted", async () => {
  quotaPreflight.registerQuotaFetcher("agy-gemini-dead", async () => ({
    used: 0,
    total: 0,
    percentUsed: 0.99,
    windows: {
      claude_gpt_weekly: { percentUsed: 0.1, resetAt: CLAUDE_RESET },
      gemini_weekly: { percentUsed: 0.99, resetAt: GEMINI_RESET },
    },
  }));

  const result = await quotaPreflight.preflightQuota("agy-gemini-dead", "conn-2", {
    requestedModel: "gemini-3.1-flash-lite",
  });
  assert.equal(result.proceed, false);
  assert.equal(result.windowName, "gemini_weekly");
  assert.equal(result.resetAt, GEMINI_RESET);
});

test("evaluateQuotaCutoff with requestedModel ignores the other family window", () => {
  const quota = {
    used: 0,
    total: 0,
    percentUsed: 1,
    limitReached: true,
    windows: mixedWindows(),
  };
  const gemini = quotaPreflight.evaluateQuotaCutoff(quota, undefined, {
    provider: "antigravity",
    requestedModel: "gemini-3.1-flash-lite",
  });
  assert.equal(gemini.proceed, true);

  const claude = quotaPreflight.evaluateQuotaCutoff(quota, undefined, {
    provider: "agy",
    requestedModel: "claude-opus-4-6-thinking",
  });
  assert.equal(claude.proceed, false);
  assert.equal(claude.windowName, "claude_gpt_weekly");
});

test("quotaRemainingPercentFromQuota for Gemini uses Gemini windows, not Claude", () => {
  const quota = { windows: mixedWindows(), percentUsed: 1, limitReached: true };
  const remaining = quotaRemainingPercentFromQuota(quota, {
    provider: "agy",
    requestedModel: "gemini-3.1-flash-lite",
  });
  assert.ok(remaining > 50, `expected Gemini remaining, got ${remaining}`);
});

test("markConnectionQuotaExhausted with a Gemini model locks the family, not the row", async () => {
  fallback.clearAllModelLockouts();
  const conn = await providersDb.createProviderConnection({
    provider: "agy",
    authType: "oauth",
    name: "agy-family-gemini",
  });
  const connId = (conn as { id: string }).id;

  markConnectionQuotaExhausted(connId, 24 * 60 * 60 * 1000, "gemini-3.1-flash-lite");

  assert.equal(
    providersDb.isConnectionRateLimited(connId),
    false,
    "connection row must stay selectable for the other family"
  );
  assert.equal(fallback.isModelLocked("agy", connId, "gemini-3.1-flash-lite"), true);
  assert.equal(fallback.isModelLocked("agy", connId, "gemini-3.7-flash-high"), true);
  assert.equal(fallback.isModelLocked("agy", connId, "claude-opus-4-6-thinking"), false);
});

test("Antigravity RPM 429 stays exact-model and does not persist a family cooldown", async () => {
  fallback.clearAllModelLockouts();
  const auth = await import("../../src/sse/services/auth.ts");
  const conn = await providersDb.createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    email: "rpm@example.test",
    accessToken: "tok-rpm",
    isActive: true,
    testStatus: "active",
  });
  const connId = (conn as { id: string }).id;

  await auth.markAccountUnavailable(
    connId,
    429,
    "RESOURCE_EXHAUSTED: Resource has been exhausted (requests per minute / RPM limit was reached)",
    "antigravity",
    "gemini-3-pro"
  );

  const sibling = await auth.getProviderCredentials("antigravity", null, null, "gemini-2.5-pro");
  assert.ok(sibling && !("allRateLimited" in sibling && sibling.allRateLimited));
  assert.equal(sibling.connectionId, connId);

  const fresh = await providersDb.getProviderConnectionById(connId);
  const psd = (fresh as { providerSpecificData?: Record<string, unknown> }).providerSpecificData;
  assert.equal(
    psd && typeof psd === "object" ? psd.antigravityFamilyRateLimitedUntil : undefined,
    undefined
  );
  await providersDb.updateProviderConnection(connId, { isActive: false });
});

test("Antigravity QPM 429 stays exact-model and does not persist a family cooldown", async () => {
  fallback.clearAllModelLockouts();
  const auth = await import("../../src/sse/services/auth.ts");
  const conn = await providersDb.createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    email: "qpm@example.test",
    accessToken: "tok-qpm",
    isActive: true,
    testStatus: "active",
  });
  const connId = (conn as { id: string }).id;

  await auth.markAccountUnavailable(
    connId,
    429,
    "RESOURCE_EXHAUSTED: Resource has been exhausted (queries per minute limit was reached)",
    "antigravity",
    "gemini-3-pro"
  );

  const sibling = await auth.getProviderCredentials("antigravity", null, null, "gemini-2.5-pro");
  assert.ok(sibling && !("allRateLimited" in sibling && sibling.allRateLimited));
  assert.equal(sibling.connectionId, connId);

  const fresh = await providersDb.getProviderConnectionById(connId);
  const psd = (fresh as { providerSpecificData?: Record<string, unknown> }).providerSpecificData;
  assert.equal(
    psd && typeof psd === "object" ? psd.antigravityFamilyRateLimitedUntil : undefined,
    undefined
  );
  await providersDb.updateProviderConnection(connId, { isActive: false });
});

test("persisted family cooldown rehydrates after a process-local lockout wipe", async () => {
  fallback.clearAllModelLockouts();
  const conn = await providersDb.createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    name: "ag-family-persist",
  });
  const connId = (conn as { id: string }).id;
  const until = new Date(Date.now() + 60 * 60 * 1000).toISOString();

  const { persistAntigravityFamilyCooldown, rehydrateAntigravityFamilyLocks } = await import(
    "../../open-sse/services/antigravityFamilyCooldown.ts"
  );
  await persistAntigravityFamilyCooldown({
    connectionId: connId,
    model: "claude-sonnet-4",
    rateLimitedUntil: until,
  });

  fallback.clearAllModelLockouts();
  assert.equal(fallback.isModelLocked("antigravity", connId, "claude-opus-4"), false);

  const fresh = await providersDb.getProviderConnectionById(connId);
  rehydrateAntigravityFamilyLocks(
    "antigravity",
    connId,
    (fresh as { providerSpecificData?: Record<string, unknown> }).providerSpecificData
  );
  assert.equal(fallback.isModelLocked("antigravity", connId, "claude-opus-4"), true);
  assert.equal(fallback.isModelLocked("antigravity", connId, "gemini-3.1-flash-lite"), false);
  assert.equal(providersDb.isConnectionRateLimited(connId), false);
});

test("preflight family lock covers both agy and antigravity spellings", async () => {
  fallback.clearAllModelLockouts();
  const { persistAntigravityPreflightFamilyLock } = await import(
    "../../open-sse/services/antigravityFamilyCooldown.ts"
  );
  const conn = await providersDb.createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    name: "ag-preflight-alias",
  });
  const connId = (conn as { id: string }).id;
  const until = new Date(Date.now() + 60 * 60 * 1000).toISOString();

  await persistAntigravityPreflightFamilyLock({
    provider: "antigravity",
    connectionId: connId,
    model: "claude-sonnet-4",
    unavailableUntil: until,
  });

  assert.equal(fallback.isModelLocked("antigravity", connId, "claude-opus-4"), true);
  assert.equal(fallback.isModelLocked("agy", connId, "claude-opus-4"), true);
  assert.equal(fallback.isModelLocked("antigravity", connId, "gemini-3.1-flash-lite"), false);
  assert.equal(fallback.isModelLocked("agy", connId, "gemini-3.1-flash-lite"), false);
});
