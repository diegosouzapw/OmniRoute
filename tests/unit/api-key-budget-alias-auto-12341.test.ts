import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-api-key-budget-alias-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "budget-alias-test-secret";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const usageHistory = await import("../../src/lib/usage/usageHistory.ts");
const usageLimits = await import("../../src/lib/usage/apiKeyUsageLimits.ts");

const NOW = Date.parse("2026-06-19T20:00:00.000Z");

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  usageHistory.clearPendingRequests();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function makeMeteredKey() {
  const created = await apiKeysDb.createApiKey("Budget Alias Key", "machine-budget-01");
  await apiKeysDb.updateApiKeyPermissions(created.id, {
    usageLimitEnabled: true,
    dailyUsageLimitUsd: 10,
    weeklyUsageLimitUsd: 50,
  });
  apiKeysDb.clearApiKeyCaches();
  const metadata = await apiKeysDb.getApiKeyMetadata(created.key);
  assert.ok(metadata);
  return { created, metadata: metadata! };
}

test("BUG #12341: a real, billable completion routed through cursor/auto (unpriced) must not silently pass the daily budget cap as $0", async () => {
  const { created, metadata } = await makeMeteredKey();

  // Cursor's own default routing alias ("Auto (current, default)") has no
  // pricing row anywhere — this is real, mainstream billable traffic, not an
  // edge case.
  await usageHistory.saveRequestUsage({
    provider: "cursor",
    model: "auto",
    apiKeyId: created.id,
    apiKeyName: "Budget Alias Key",
    tokens: { input: 1_000_000, output: 1_000_000 },
    success: true,
    timestamp: "2026-06-19T12:00:00.000Z",
  });

  const status = await usageLimits.getApiKeyUsageLimitStatus(
    { ...metadata, allowedConnections: null },
    { now: () => NOW }
  );

  // Fail closed (#12341): unpriced usage in a window with a configured limit
  // must flip the window to exceeded, even though the naive USD total is $0.
  assert.equal(status.dailySpentUsd, 0, "cost stays $0 — no pricing row exists for cursor/auto");
  assert.equal(
    status.dailyHasUnpricedUsage,
    true,
    "status must flag that unpriced usage was seen in the daily window"
  );
  assert.equal(
    status.dailyExceeded,
    true,
    "enforcement must fail closed instead of silently allowing unlimited unpriced usage"
  );
});

test("control: a priced model routed at the same tokens does NOT trip fail-closed enforcement", async () => {
  const { updatePricing } = await import("@/lib/db/settings");
  await updatePricing({
    openai: {
      "gpt-4o": { input: 1, cached: 1, output: 1, reasoning: 1, cache_creation: 1 },
    },
  });

  const { created, metadata } = await makeMeteredKey();

  await usageHistory.saveRequestUsage({
    provider: "openai",
    model: "gpt-4o",
    apiKeyId: created.id,
    apiKeyName: "Budget Alias Key",
    tokens: { input: 1_000_000, output: 0 },
    success: true,
    timestamp: "2026-06-19T12:00:00.000Z",
  });

  const status = await usageLimits.getApiKeyUsageLimitStatus(
    { ...metadata, allowedConnections: null },
    { now: () => NOW }
  );

  assert.equal(status.dailySpentUsd, 1);
  assert.equal(status.dailyHasUnpricedUsage, false);
  assert.equal(status.dailyExceeded, false);
});
