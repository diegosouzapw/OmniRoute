/**
 * #12341 follow-up: UNPRICED_USAGE_BUDGET_POLICY + admin unpriced-usage report.
 *
 * Drives the real request policy (`enforceApiKeyPolicy`) with a real metered key,
 * real usage_history rows and the real feature-flag store, so each assertion is
 * the verdict a client would actually get.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-unpriced-policy-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "unpriced-policy-test-secret";
delete process.env.UNPRICED_USAGE_BUDGET_POLICY;

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const featureFlagsDb = await import("../../src/lib/db/featureFlags.ts");
const usageHistory = await import("../../src/lib/usage/usageHistory.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const { enforceApiKeyPolicy } = await import("../../src/shared/utils/apiKeyPolicy.ts");
const { getUnpricedUsageBudgetPolicy } = await import("../../src/shared/utils/featureFlags.ts");
const { getUnpricedUsageReport } = await import("../../src/lib/usage/unpricedUsage.ts");
const { getApiKeyUsageLimitStatus, buildApiKeyUsageLimitRejection } =
  await import("../../src/lib/usage/apiKeyUsageLimits.ts");
const readCache = await import("../../src/lib/db/readCache.ts");

const UNPRICED_PROVIDER = "grok-cli";
const UNPRICED_MODEL = "grok-composer-2.5-fast";

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  usageHistory.clearPendingRequests();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  featureFlagsDb.clearAllFeatureFlagOverrides();
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function makeMeteredKeyWithUnpricedUsage() {
  await settingsDb.updatePricing({
    openai: { "gpt-4o": { input: 1, cached: 1, output: 1, reasoning: 1, cache_creation: 1 } },
  });
  const created = await apiKeysDb.createApiKey("Unpriced Policy Key", "machine-unpriced-01");
  await apiKeysDb.updateApiKeyPermissions(created.id, {
    usageLimitEnabled: true,
    weeklyUsageLimitUsd: 100,
  });
  apiKeysDb.clearApiKeyCaches();
  const now = new Date().toISOString();
  // $1 of priced spend — 1% of the weekly limit.
  await usageHistory.saveRequestUsage({
    provider: "openai",
    model: "gpt-4o",
    apiKeyId: created.id,
    apiKeyName: "Unpriced Policy Key",
    tokens: { input: 1_000_000, output: 0 },
    success: true,
    timestamp: now,
  });
  // One successful call to a built-in model that ships without a pricing row.
  await usageHistory.saveRequestUsage({
    provider: UNPRICED_PROVIDER,
    model: UNPRICED_MODEL,
    apiKeyId: created.id,
    apiKeyName: "Unpriced Policy Key",
    tokens: { input: 1_000, output: 100 },
    success: true,
    timestamp: now,
  });
  return created;
}

function chatRequest(key: string) {
  return new Request("http://localhost/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: "openai/gpt-4o", messages: [] }),
  });
}

test("default policy is fail_closed and names the unpriced model instead of a misleading quota %", async () => {
  const created = await makeMeteredKeyWithUnpricedUsage();
  assert.equal(getUnpricedUsageBudgetPolicy(), "fail_closed");

  const result = await enforceApiKeyPolicy(chatRequest(created.key), "openai/gpt-4o");

  assert.ok(result.rejection, "a limited key with unpriced usage must still be blocked by default");
  assert.equal(result.rejection!.status, 400);
  const message = JSON.stringify(await result.rejection!.json());
  assert.match(message, /no configured price/);
  // The test key has no provider quota window, so its weekly window is rolling
  // and has no fixed reset time; the message must not say "Resets in unknown".
  assert.doesNotMatch(message, /Resets in unknown/);
  assert.ok(
    message.includes(`${UNPRICED_PROVIDER}/${UNPRICED_MODEL}`),
    "the rejection must name the model that has no price"
  );
  assert.doesNotMatch(message, /reached its weekly usage quota \(1%\)/);
});

test("count_as_zero lets the key through while priced spend is under the limit", async () => {
  const created = await makeMeteredKeyWithUnpricedUsage();
  featureFlagsDb.setFeatureFlagOverride("UNPRICED_USAGE_BUDGET_POLICY", "count_as_zero");
  assert.equal(getUnpricedUsageBudgetPolicy(), "count_as_zero");

  const result = await enforceApiKeyPolicy(chatRequest(created.key), "openai/gpt-4o");

  assert.equal(result.rejection, null, "unpriced usage counts as $0; $1 of $100 is not exceeded");
});

test("count_as_zero still enforces the limit on priced spend", async () => {
  const created = await makeMeteredKeyWithUnpricedUsage();
  await apiKeysDb.updateApiKeyPermissions(created.id, { weeklyUsageLimitUsd: 0.5 });
  apiKeysDb.clearApiKeyCaches();
  featureFlagsDb.setFeatureFlagOverride("UNPRICED_USAGE_BUDGET_POLICY", "count_as_zero");

  const result = await enforceApiKeyPolicy(chatRequest(created.key), "openai/gpt-4o");

  assert.ok(result.rejection, "$1 of priced spend exceeds a $0.50 weekly limit");
  const message = JSON.stringify(await result.rejection!.json());
  assert.match(message, /reached its weekly usage quota/);
});

test("an unknown env value falls back to fail_closed", async () => {
  const created = await makeMeteredKeyWithUnpricedUsage();
  // The DB override store already rejects invalid enum values; env is unvalidated.
  process.env.UNPRICED_USAGE_BUDGET_POLICY = "yes-please";
  try {
    assert.equal(getUnpricedUsageBudgetPolicy(), "fail_closed");
    const result = await enforceApiKeyPolicy(chatRequest(created.key), "openai/gpt-4o");
    assert.ok(result.rejection);
  } finally {
    delete process.env.UNPRICED_USAGE_BUDGET_POLICY;
  }
});

test("a priced overage in another window keeps the regular quota message", async () => {
  const created = await makeMeteredKeyWithUnpricedUsage();
  // $1 priced spend today exceeds a $0.50 daily cap; the weekly window ($100)
  // is blocked only by the unpriced row. The real daily breach must win.
  await apiKeysDb.updateApiKeyPermissions(created.id, { dailyUsageLimitUsd: 0.5 });
  apiKeysDb.clearApiKeyCaches();

  const result = await enforceApiKeyPolicy(chatRequest(created.key), "openai/gpt-4o");

  assert.ok(result.rejection);
  const message = JSON.stringify(await result.rejection!.json());
  assert.match(message, /reached its daily usage quota/);
  assert.doesNotMatch(message, /no configured price/);
});

test("a priced weekly overage is reported even when the daily window is blocked only by unpriced usage", async () => {
  const created = await makeMeteredKeyWithUnpricedUsage();
  // Daily ($100) is blocked only by the unpriced row; weekly ($0.50) is over on
  // $1 of priced spend. The message must name the real (weekly) breach, not a
  // misleading "daily quota (1%)".
  await apiKeysDb.updateApiKeyPermissions(created.id, {
    dailyUsageLimitUsd: 100,
    weeklyUsageLimitUsd: 0.5,
  });
  apiKeysDb.clearApiKeyCaches();

  const result = await enforceApiKeyPolicy(chatRequest(created.key), "openai/gpt-4o");

  assert.ok(result.rejection);
  const message = JSON.stringify(await result.rejection!.json());
  assert.match(message, /reached its weekly usage quota/);
  assert.doesNotMatch(message, /daily usage quota/);
});

test("count_as_zero still fails closed when a cost lookup throws, and says so", async () => {
  const created = await makeMeteredKeyWithUnpricedUsage();
  // A real pricing-store failure: drop the cached pricing and make the pricing
  // namespace unreadable, so calculateCostDetailed's own catch path runs. This
  // is not "no price configured" — the true spend is unknown — so relaxing
  // unpriced usage must not relax it, and the message must not blame pricing rows.
  const db = core.getDbInstance();
  db.exec("ALTER TABLE key_value RENAME TO key_value_offline");
  readCache.invalidateDbCache("pricing", undefined, { skipModelCatalog: true });
  try {
    const status = await getApiKeyUsageLimitStatus(
      { id: created.id, usageLimitEnabled: true, weeklyUsageLimitUsd: 100 },
      {
        getUnpricedUsagePolicy: () => "count_as_zero",
        getProviderConnectionById: async () => null,
        getProviderConnections: async () => [],
        getProviderLimitsCache: () => null,
        getAllProviderLimitsCache: () => ({}),
      }
    );

    assert.equal(status.unpricedUsagePolicy, "count_as_zero");
    assert.equal(status.weeklyPricingFailure, true);
    assert.equal(status.weeklyExceeded, true);

    const rejection = buildApiKeyUsageLimitRejection(chatRequest(created.key), status);
    const message = JSON.stringify(await rejection.json());
    assert.match(message, /could not be calculated/);
    assert.doesNotMatch(message, /no configured price/);
    assert.doesNotMatch(message, /usage quota \(/);
  } finally {
    db.exec("ALTER TABLE key_value_offline RENAME TO key_value");
    readCache.invalidateDbCache("pricing", undefined, { skipModelCatalog: true });
  }
});

test("admin report lists unpriced models, affected limited keys and the active policy", async () => {
  await makeMeteredKeyWithUnpricedUsage();
  // Limits switched on but no USD limit set: enforcement can never block this
  // key, so it must not be counted as affected.
  const unlimited = await apiKeysDb.createApiKey("No Limit Value Key", "machine-unpriced-02");
  await apiKeysDb.updateApiKeyPermissions(unlimited.id, { usageLimitEnabled: true });
  await usageHistory.saveRequestUsage({
    provider: UNPRICED_PROVIDER,
    model: UNPRICED_MODEL,
    apiKeyId: unlimited.id,
    apiKeyName: "No Limit Value Key",
    tokens: { input: 1_000, output: 100 },
    success: true,
    timestamp: new Date().toISOString(),
  });

  const report = await getUnpricedUsageReport();

  assert.equal(report.policy, "fail_closed");
  assert.deepEqual(
    report.models.map((m) => `${m.provider}/${m.model}`),
    [`${UNPRICED_PROVIDER}/${UNPRICED_MODEL}`],
    "priced usage must not be reported"
  );
  assert.equal(report.models[0].requests, 2);
  assert.equal(report.models[0].apiKeys, 2);
  assert.equal(report.models[0].limitedApiKeys, 1);
  assert.equal(report.limitedApiKeysAffected, 1);
});

test("admin report is empty once the missing price is configured", async () => {
  await makeMeteredKeyWithUnpricedUsage();
  await settingsDb.updatePricing({
    [UNPRICED_PROVIDER]: { [UNPRICED_MODEL]: { input: 3, output: 15 } },
  });

  const report = await getUnpricedUsageReport();

  assert.deepEqual(report.models, []);
  assert.equal(report.limitedApiKeysAffected, 0);
});
