import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-provider-costs-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.API_KEY_SECRET = "provider-window-costs-test-secret";

const core = await import("../../src/lib/db/core.ts");
const apiKeys = await import("../../src/lib/db/apiKeys.ts");
const localDb = await import("../../src/lib/localDb.ts");
const providerLimits = await import("../../src/lib/db/providerLimits.ts");
const usageHistory = await import("../../src/lib/usage/usageHistory.ts");
const costRules = await import("../../src/domain/costRules.ts");
const { getProviderWindowCostBreakdown } =
  await import("../../src/lib/usage/providerWindowCosts.ts");

async function resetStorage() {
  core.resetDbInstance();
  apiKeys.resetApiKeyState();
  costRules.resetCostData();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  apiKeys.resetApiKeyState();
  costRules.resetCostData();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("Codex provider window costs use the weekly reset window and API key USD limit", async () => {
  await localDb.updatePricing({
    codex: {
      "gpt-5.5": { input: 10, output: 20, cached: 1, cache_creation: 5, reasoning: 30 },
    },
  });

  const key = await apiKeys.createApiKey("Codex Key", "machine-codex-window");
  costRules.setBudget(key.id, {
    dailyLimitUsd: 0,
    weeklyLimitUsd: 40,
    resetInterval: "weekly",
    resetTime: "00:00",
  });

  providerLimits.setProviderLimitsCache("codex-conn", {
    quotas: {
      "session (5h)": {
        used: 0,
        total: 100,
        remainingPercentage: 100,
        resetAt: "2026-06-28T16:00:00.000Z",
      },
      "weekly (7d)": {
        used: 13,
        total: 100,
        remainingPercentage: 87,
        resetAt: "2026-07-02T23:00:00.000Z",
      },
    },
    plan: "Prolite",
    message: null,
    fetchedAt: "2026-06-28T12:00:00.000Z",
  });

  await usageHistory.saveRequestUsage({
    provider: "codex",
    model: "gpt-5.5",
    connectionId: "codex-conn",
    apiKeyId: key.id,
    apiKeyName: "Old Codex Key",
    tokens: { input: 1_000_000, output: 0 },
    timestamp: "2026-06-26T00:00:00.000Z",
  });
  await usageHistory.saveRequestUsage({
    provider: "codex",
    model: "gpt-5.5",
    connectionId: "codex-conn",
    apiKeyId: key.id,
    apiKeyName: "Old Codex Key",
    tokens: { input: 1_000_000, output: 0 },
    timestamp: "2026-06-25T22:59:59.000Z",
  });

  const result = await getProviderWindowCostBreakdown({
    provider: "codex",
    connectionId: "codex-conn",
    now: Date.parse("2026-06-28T12:00:00.000Z"),
  });

  assert.equal(result.windowStartAt, "2026-06-25T23:00:00.000Z");
  assert.equal(result.windowResetAt, "2026-07-02T23:00:00.000Z");
  assert.equal(result.windowSource, "provider_weekly_reset");
  assert.equal(result.quotaUsedPercent, 13);
  assert.equal(result.totalCostUsd, 10);
  assert.equal(result.estimatedFullQuotaUsd, 76.923077);
  assert.equal(result.rows.length, 1);
  assert.equal(result.rows[0].apiKeyName, "Codex Key");
  assert.equal(result.rows[0].costUsd, 10);
  assert.equal(result.rows[0].limitUsd, 40);
  assert.equal(result.rows[0].limitUsedPercent, 25);
});

test("Claude provider window costs split spending across API keys from the current weekly window", async () => {
  await localDb.updatePricing({
    claude: {
      "claude-sonnet-4": { input: 3, output: 15, cached: 0.3, cache_creation: 3.75 },
    },
  });

  const heavyKey = await apiKeys.createApiKey("Claude Heavy", "machine-claude-heavy");
  const lightKey = await apiKeys.createApiKey("Claude Light", "machine-claude-light");
  costRules.setBudget(heavyKey.id, {
    dailyLimitUsd: 0,
    weeklyLimitUsd: 20,
    resetInterval: "weekly",
    resetTime: "00:00",
  });

  providerLimits.setProviderLimitsCache("claude-conn", {
    quotas: {
      "Session (5hr)": {
        used: 2,
        total: 100,
        remainingPercentage: 98,
        resetAt: "2026-06-28T15:30:00.000Z",
      },
      "Weekly (7 day)": {
        used: 54,
        total: 100,
        remainingPercentage: 46,
        resetAt: "2026-07-02T23:00:00.000Z",
      },
      "Weekly Sonnet": {
        used: 18,
        total: 100,
        remainingPercentage: 82,
        resetAt: "2026-07-02T23:00:00.000Z",
      },
    },
    plan: "default_claude_max_20x",
    message: null,
    fetchedAt: "2026-06-28T12:00:00.000Z",
  });

  await usageHistory.saveRequestUsage({
    provider: "claude",
    model: "claude-sonnet-4",
    connectionId: "claude-conn",
    apiKeyId: heavyKey.id,
    apiKeyName: "Heavy old",
    tokens: { input: 1_000_000, output: 0 },
    timestamp: "2026-06-26T00:00:00.000Z",
  });
  await usageHistory.saveRequestUsage({
    provider: "claude",
    model: "claude-sonnet-4",
    connectionId: "claude-conn",
    apiKeyId: lightKey.id,
    apiKeyName: "Light old",
    tokens: { input: 500_000, output: 0 },
    timestamp: "2026-06-27T00:00:00.000Z",
  });

  const result = await getProviderWindowCostBreakdown({
    provider: "claude",
    connectionId: "claude-conn",
    now: Date.parse("2026-06-28T12:00:00.000Z"),
  });

  assert.equal(result.windowStartAt, "2026-06-25T23:00:00.000Z");
  assert.equal(result.quotaName, "Weekly (7 day)");
  assert.equal(result.quotaUsedPercent, 54);
  assert.equal(result.quotaRemainingPercent, 46);
  assert.equal(result.totalCostUsd, 4.5);
  assert.equal(result.estimatedFullQuotaUsd, 8.333333);
  assert.equal(result.rows.length, 2);
  assert.equal(result.rows[0].apiKeyName, "Claude Heavy");
  assert.equal(result.rows[0].costUsd, 3);
  assert.equal(result.rows[0].limitUsd, 20);
  assert.equal(result.rows[0].limitUsedPercent, 15);
  assert.equal(result.rows[1].apiKeyName, "Claude Light");
  assert.equal(result.rows[1].costUsd, 1.5);
  assert.equal(result.rows[1].limitUsd, null);
});

test("provider window costs use the recorded reset event as the cost cutoff", async () => {
  await localDb.updatePricing({
    claude: {
      "claude-opus-4-8": { input: 1, output: 1, cached: 1, cache_creation: 1, reasoning: 1 },
    },
  });

  providerLimits.setProviderLimitsCache("claude-reset-event", {
    quotas: {
      "weekly (7d)": {
        used: 25,
        total: 100,
        remainingPercentage: 75,
        resetAt: "2026-07-01T10:00:00.000Z",
      },
    },
    plan: "default_claude_max_20x",
    message: null,
    fetchedAt: "2026-06-25T12:00:00.000Z",
  });

  core
    .getDbInstance()
    .prepare(
      `
      INSERT INTO provider_quota_reset_events
        (provider, connection_id, window_key, window_started_at, window_resets_at,
         observed_at, previous_remaining_percentage, new_remaining_percentage,
         previous_used_percentage, new_used_percentage, raw_data)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
    )
    .run(
      "claude",
      "claude-reset-event",
      "weekly (7d)",
      "2026-06-24T12:00:00.000Z",
      "2026-07-01T10:00:00.000Z",
      "2026-06-24T12:01:00.000Z",
      0,
      100,
      100,
      0,
      null
    );

  await usageHistory.saveRequestUsage({
    provider: "claude",
    model: "claude-opus-4-8",
    connectionId: "claude-reset-event",
    tokens: { input: 5_000_000, output: 0 },
    timestamp: "2026-06-24T11:30:00.000Z",
  });
  await usageHistory.saveRequestUsage({
    provider: "claude",
    model: "claude-opus-4-8",
    connectionId: "claude-reset-event",
    tokens: { input: 500_000, output: 0 },
    timestamp: "2026-06-24T12:30:00.000Z",
  });

  const result = await getProviderWindowCostBreakdown({
    provider: "claude",
    connectionId: "claude-reset-event",
    now: Date.parse("2026-06-25T12:00:00.000Z"),
  });

  assert.equal(result.windowStartAt, "2026-06-24T12:00:00.000Z");
  assert.equal(result.totalCostUsd, 0.5);
  assert.equal(result.estimatedFullQuotaUsd, 2);
  assert.equal(result.rows.length, 1);
  assert.equal(result.rows[0].requests, 1);
});

test("provider window costs cut at an observed same-resetAt quota reset", async () => {
  await localDb.updatePricing({
    claude: {
      "claude-opus-4-8": { input: 1, output: 1, cached: 1, cache_creation: 1, reasoning: 1 },
    },
  });

  const targetResetAt = "2026-07-02T23:00:00.000Z";
  providerLimits.setProviderLimitsCache("claude-early-reset", {
    quotas: {
      "weekly (7d)": {
        used: 7,
        total: 100,
        remainingPercentage: 93,
        resetAt: targetResetAt,
      },
    },
    plan: "default_claude_max_20x",
    message: null,
    fetchedAt: "2026-07-02T00:04:00.000Z",
  });

  const db = core.getDbInstance();
  db.prepare(
    `
    INSERT INTO provider_quota_reset_events
      (provider, connection_id, window_key, window_started_at, window_resets_at,
       observed_at, previous_remaining_percentage, new_remaining_percentage,
       previous_used_percentage, new_used_percentage, raw_data)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `
  ).run(
    "claude",
    "claude-early-reset",
    "weekly (7d)",
    "2026-06-25T23:00:00.000Z",
    targetResetAt,
    "2026-06-25T23:04:00.000Z",
    0,
    100,
    100,
    0,
    null
  );

  const insertSnapshot = db.prepare(`
    INSERT INTO quota_snapshots (
      provider,
      connection_id,
      window_key,
      remaining_percentage,
      is_exhausted,
      next_reset_at,
      window_duration_ms,
      raw_data,
      created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  insertSnapshot.run(
    "claude",
    "claude-early-reset",
    "weekly (7d)",
    4,
    0,
    targetResetAt,
    null,
    null,
    "2026-07-01T00:05:00.000Z"
  );
  insertSnapshot.run(
    "claude",
    "claude-early-reset",
    "weekly (7d)",
    100,
    0,
    targetResetAt,
    null,
    null,
    "2026-07-01T21:41:13.293Z"
  );
  insertSnapshot.run(
    "claude",
    "claude-early-reset",
    "weekly (7d)",
    93,
    0,
    targetResetAt,
    null,
    null,
    "2026-07-02T00:04:00.000Z"
  );

  await usageHistory.saveRequestUsage({
    provider: "claude",
    model: "claude-opus-4-8",
    connectionId: "claude-early-reset",
    tokens: { input: 8_000_000, output: 0 },
    timestamp: "2026-07-01T20:00:00.000Z",
  });
  await usageHistory.saveRequestUsage({
    provider: "claude",
    model: "claude-opus-4-8",
    connectionId: "claude-early-reset",
    tokens: { input: 2_000_000, output: 0 },
    timestamp: "2026-07-01T22:00:00.000Z",
  });

  const result = await getProviderWindowCostBreakdown({
    provider: "claude",
    connectionId: "claude-early-reset",
    now: Date.parse("2026-07-02T00:10:00.000Z"),
  });

  assert.equal(result.windowStartAt, "2026-07-01T21:41:13.293Z");
  assert.equal(result.windowStartSource, "observed_snapshot_reset");
  assert.equal(result.totalCostUsd, 2);
  assert.equal(result.rows.length, 1);
  assert.equal(result.rows[0].requests, 1);
});

test("provider window costs prefer recorded USD history over repricing usage tokens", async () => {
  await localDb.updatePricing({
    claude: {
      "claude-opus-4-8": { input: 1, output: 1, cached: 0.1, cache_creation: 1, reasoning: 1 },
    },
  });

  const key = await apiKeys.createApiKey("Recorded USD Key", "machine-recorded-usd");

  providerLimits.setProviderLimitsCache("claude-recorded-cost", {
    quotas: {
      "weekly (7d)": {
        used: 50,
        total: 100,
        remainingPercentage: 50,
        resetAt: "2026-07-01T10:00:00.000Z",
      },
    },
    plan: "default_claude_max_20x",
    message: null,
    fetchedAt: "2026-06-25T12:00:00.000Z",
  });

  await usageHistory.saveRequestUsage({
    provider: "claude",
    model: "claude-opus-4-8",
    connectionId: "claude-recorded-cost",
    apiKeyId: key.id,
    apiKeyName: "Recorded old",
    tokens: { input: 1_000_000, cacheRead: 1_000_000, output: 0 },
    timestamp: "2026-06-24T10:00:00.000Z",
  });
  await usageHistory.saveRequestUsage({
    provider: "claude",
    model: "claude-opus-4-8",
    connectionId: "claude-recorded-cost",
    apiKeyId: key.id,
    apiKeyName: "Recorded old",
    tokens: { input: 1_000_000, cacheRead: 1_000_000, output: 0 },
    timestamp: "2026-06-24T10:01:00.000Z",
  });

  core
    .getDbInstance()
    .prepare("INSERT INTO domain_cost_history (api_key_id, cost, timestamp) VALUES (?, ?, ?)")
    .run(key.id, 10, Date.parse("2026-06-24T10:00:00.010Z"));
  core
    .getDbInstance()
    .prepare("INSERT INTO domain_cost_history (api_key_id, cost, timestamp) VALUES (?, ?, ?)")
    .run(key.id, 7, Date.parse("2026-06-24T10:01:00.010Z"));

  const result = await getProviderWindowCostBreakdown({
    provider: "claude",
    connectionId: "claude-recorded-cost",
    now: Date.parse("2026-06-25T12:00:00.000Z"),
  });

  assert.equal(result.totalCostUsd, 17);
  assert.equal(result.estimatedFullQuotaUsd, 34);
  assert.equal(result.rows.length, 1);
  assert.equal(result.rows[0].apiKeyName, "Recorded USD Key");
  assert.equal(result.rows[0].costUsd, 17);
});
