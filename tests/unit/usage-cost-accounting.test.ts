/**
 * tests/unit/usage-cost-accounting.test.ts
 *
 * How a request's cost is recorded and read back, across the two accounting models
 * OmniRoute supports:
 *
 *  - token-billed providers are priced from their tokens, including a request that
 *    failed: there is no way to know a failed request consumed nothing;
 *  - credit-metered providers are billed by the credits the upstream reports, so
 *    their per-token pricing rows are never a cost basis — mixing the two would
 *    charge the same request twice, at a tariff that describes no real plan;
 *  - an exact provider-reported cost is persisted for ANY provider;
 *  - retention rollups archive the reported cost and price only the rest;
 *  - the metered budget is charged the exact cost.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// DB modules read DATA_DIR/API_KEY_SECRET at import time, so they load dynamically
// after the isolated temp dir and secret are in place.
const dir = fs.mkdtempSync(path.join(os.tmpdir(), "usage-cost-accounting-"));
process.env.DATA_DIR = dir;
process.env.API_KEY_SECRET = "unit-test-only";

const core = await import("../../src/lib/db/core.ts");
const { saveRequestUsage } = await import("../../src/lib/usage/usageHistory.ts");
const { getUsageStats, getConnectionSpendUsdSinceAdded } =
  await import("../../src/lib/usage/usageStats.ts");
const { getApiKeyUsageLimitStatus } = await import("../../src/lib/usage/apiKeyUsageLimits.ts");
const { rollupUsageHistoryBeforeDate } = await import("../../src/lib/usage/aggregateHistory.ts");
const { updateDatabaseSettings } = await import("../../src/lib/db/databaseSettings.ts");
const { updatePricing } = await import("../../src/lib/db/settings/pricing.ts");
const { createApiKey } = await import("../../src/lib/db/apiKeys.ts");
const { calculateCost } = await import("../../src/lib/usage/costCalculator.ts");
const { meteredBudgetCost } = await import("../../src/lib/usage/meteredBudgetPolicy.ts");
const { closeCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");

test.after(async () => {
  await closeCallLogSaves();
  core.resetDbInstance();
  fs.rmSync(dir, { recursive: true, force: true });
});

test("a reported USD cost persists for any provider while token-only usage stays priceable", async () => {
  const key = await createApiKey("Exact cost", "exact-machine");
  await updatePricing({ xai: { "grok-reported": { input: 1, output: 0 } } });
  const timestamp = new Date().toISOString();

  await saveRequestUsage({
    provider: "xai",
    model: "grok-reported",
    apiKeyId: key.id,
    timestamp,
    tokens: { prompt_tokens: 100000, cost_in_usd_ticks: 100000000 },
  });
  await saveRequestUsage({
    provider: "xai",
    model: "grok-reported",
    apiKeyId: key.id,
    timestamp,
    tokens: { prompt_tokens: 200000 },
  });

  const rows = core
    .getDbInstance()
    .prepare(
      "SELECT provider_cost_usd, provider_credits FROM usage_history WHERE api_key_id = ? ORDER BY tokens_input"
    )
    .all(key.id);
  assert.deepEqual(rows, [
    { provider_cost_usd: 0.01, provider_credits: null },
    { provider_cost_usd: null, provider_credits: null },
  ]);
  // 0.01 reported + 200k tokens × $1/M priced normally; the reported row's 100k
  // tokens are not priced again.
  assert.equal((await getApiKeyUsageLimitStatus({ id: key.id })).dailySpentUsd, 0.21);
  assert.ok(Math.abs((await getUsageStats()).byApiKey[`id:${key.id}`].cost - 0.21) < 1e-9);
});

test("a credit-metered provider is never priced by tokens, measured or not", async () => {
  const key = await createApiKey("Credit metered", "machine-credit");
  // A tariff this high makes any token-based charge unmistakable in the totals.
  await updatePricing({ kiro: { "gpt-5.6-luna": { input: 999, output: 999 } } });

  await saveRequestUsage({
    provider: "kiro",
    model: "gpt-5.6-luna",
    connectionId: "credit-conn",
    apiKeyId: key.id,
    timestamp: new Date().toISOString(),
    tokens: { prompt_tokens: 100000, provider_credits: 0.5, cost_in_usd_ticks: 100000000 },
  });
  // Metering never arrived even though the request succeeded: there are no credits
  // to bill, and the estimated tokens must not stand in for them.
  await saveRequestUsage({
    provider: "kiro",
    model: "gpt-5.6-luna",
    connectionId: "credit-conn",
    apiKeyId: key.id,
    timestamp: new Date(Date.now() + 1000).toISOString(),
    tokens: { prompt_tokens: 100000 },
  });

  const stored = core
    .getDbInstance()
    .prepare(
      "SELECT provider_cost_usd, provider_credits FROM usage_history WHERE api_key_id = ? ORDER BY timestamp"
    )
    .all(key.id);
  assert.deepEqual(stored, [
    { provider_cost_usd: 0.01, provider_credits: 0.5 },
    { provider_cost_usd: null, provider_credits: null },
  ]);

  const status = await getApiKeyUsageLimitStatus({
    id: key.id,
    usageLimitEnabled: true,
    dailyUsageLimitUsd: 1,
    weeklyUsageLimitUsd: 1,
  });
  assert.equal(status.dailySpentUsd, 0.01);
  assert.equal(status.dailyExceeded, false);
  assert.equal((await getUsageStats()).byApiKey[`id:${key.id}`].cost, 0.01);
  assert.equal((await getConnectionSpendUsdSinceAdded("kiro", "credit-conn")).costUsd, 0.01);
});

test("credits are only persisted for credit-metered providers", async () => {
  const key = await createApiKey("Foreign credits", "machine-foreign");
  await saveRequestUsage({
    provider: "xai",
    model: "grok-reported",
    apiKeyId: key.id,
    tokens: { prompt_tokens: 10, provider_credits: 3, cost_in_usd_ticks: 50000000 },
  });
  const row = core
    .getDbInstance()
    .prepare("SELECT provider_cost_usd, provider_credits FROM usage_history WHERE api_key_id = ?")
    .get(key.id);
  assert.deepEqual(row, { provider_cost_usd: 0.005, provider_credits: null });
});

test("a failed request from a token-billed provider still costs its tokens", async () => {
  const key = await createApiKey("Token billed failure", "machine-token-failure");
  await updatePricing({ openai: { "gpt-4o": { input: 2.5, output: 10 } } });

  // A stream can die after the provider already consumed (and billed) the prompt,
  // so a failure is not evidence that nothing was spent.
  await saveRequestUsage({
    provider: "openai",
    model: "gpt-4o",
    apiKeyId: key.id,
    timestamp: new Date().toISOString(),
    tokens: { prompt_tokens: 100000, completion_tokens: 0 },
    success: false,
    status: "502",
  });

  const stored = core
    .getDbInstance()
    .prepare("SELECT provider_cost_usd FROM usage_history WHERE api_key_id = ?")
    .get(key.id);
  assert.deepEqual(stored, { provider_cost_usd: null });
  assert.equal((await getUsageStats()).byApiKey[`id:${key.id}`].cost, 0.25);
});

test("a retention rollup archives reported costs and prices only unreported requests", async () => {
  updateDatabaseSettings({
    aggregation: { enabled: true, rawDataRetentionDays: 30, granularity: "daily" },
  });
  await updatePricing({ "rollup-example": { "old-model": { input: 1, output: 0 } } });
  const key = await createApiKey("Rolled-up surfaces", "machine-rolled");
  const timestamp = new Date(Date.now() - 400 * 86_400_000).toISOString();

  await saveRequestUsage({
    provider: "rollup-example",
    model: "old-model",
    apiKeyId: key.id,
    timestamp,
    tokens: { prompt_tokens: 100000, completion_tokens: 0 },
  });
  // Same token shape, but with a reported cost: it must not be priced at $0.10.
  await saveRequestUsage({
    provider: "rollup-example",
    model: "old-model",
    apiKeyId: key.id,
    timestamp: new Date(Date.parse(timestamp) + 1000).toISOString(),
    tokens: { prompt_tokens: 100000, completion_tokens: 0, cost_in_usd_ticks: 300000000 },
  });

  assert.equal((await rollupUsageHistoryBeforeDate("2100-01-01")).errors, 0);
  const summary = core
    .getDbInstance()
    .prepare(
      "SELECT total_requests, total_input_tokens, total_cost FROM daily_usage_summary WHERE provider = 'rollup-example' AND model = 'old-model'"
    )
    .get() as { total_requests: number; total_input_tokens: number; total_cost: number };
  assert.equal(summary.total_requests, 2);
  assert.equal(summary.total_input_tokens, 200000);
  // $0.10 priced + $0.03 reported.
  assert.ok(Math.abs(summary.total_cost - 0.13) < 1e-9);
});

test("the metered budget is charged the exact cost of a credit-metered request", async () => {
  await updatePricing({ kiro: { "gpt-5.6-luna": { input: 999, output: 999 } } });
  // The chat handlers compute the budget charge as
  // meteredBudgetCost(provider, await calculateCost(provider, model, usage)).
  const usage = { prompt_tokens: 100000, provider_credits: 0.5, cost_in_usd_ticks: 100000000 };
  assert.equal(meteredBudgetCost("kiro", await calculateCost("kiro", "gpt-5.6-luna", usage)), 0.01);
  // Without a measurement nothing is billable: the tokens are not a tariff.
  assert.equal(
    meteredBudgetCost(
      "kiro",
      await calculateCost("kiro", "gpt-5.6-luna", { prompt_tokens: 100000 })
    ),
    0
  );
});
