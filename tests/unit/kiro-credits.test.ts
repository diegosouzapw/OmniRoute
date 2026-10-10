/**
 * tests/unit/kiro-credits.test.ts
 *
 * Kiro bills by credits reported in `meteringEvent` frames. These tests follow one
 * credit measurement from the executor's accumulator through usage normalization,
 * persistence, quota, stats, retention rollup and the streaming billing callback.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { addKiroCredits } from "../../open-sse/executors/kiroCredits.ts";
import { normalizeUsage, hasValidUsage, extractUsage } from "../../open-sse/utils/usageTracking.ts";
import { extractUsageFromResponse } from "../../open-sse/handlers/usageExtractor.ts";

// DB modules read DATA_DIR/API_KEY_SECRET at import time, so they load dynamically
// after the isolated temp dir is in place.
const dir = fs.mkdtempSync(path.join(os.tmpdir(), "kiro-credits-"));
process.env.DATA_DIR = dir;
process.env.API_KEY_SECRET = "unit-test-only";
process.env.KIRO_CREDIT_PRICE_USD = "0.02";

const core = await import("../../src/lib/db/core.ts");
const { saveRequestUsage } = await import("../../src/lib/usage/usageHistory.ts");
const { calculateCost } = await import("../../src/lib/usage/costCalculator.ts");
const limits = await import("../../src/lib/usage/apiKeyUsageLimits.ts");
const stats = await import("../../src/lib/usage/usageStats.ts");
const { createApiKey } = await import("../../src/lib/db/apiKeys.ts");
const { updatePricing } = await import("../../src/lib/db/settings/pricing.ts");
const { rollupUsageHistoryBeforeDate } = await import("../../src/lib/usage/aggregateHistory.ts");
const { closeCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");
// The stream pipeline pulls in usage persistence, so it also loads after DATA_DIR.
const { createSSEStream } = await import("../../open-sse/utils/stream.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

test.after(async () => {
  await closeCallLogSaves();
  core.resetDbInstance();
  delete process.env.KIRO_CREDIT_PRICE_USD;
  fs.rmSync(dir, { recursive: true, force: true });
});

test("credits are summed, converted to an exact cost, and survive usage normalization", async () => {
  const first = addKiroCredits(
    { prompt_tokens: 100, completion_tokens: 1 },
    { usage: 0.3, unit: "credit" }
  );
  const usage = addKiroCredits(first, { usage: 0.2, unit: "credit" });
  assert.equal(usage.provider_credits, 0.5);
  assert.equal(usage.cost_in_usd_ticks, 1e8);

  for (const normalized of [
    normalizeUsage(usage),
    extractUsage({ usage }),
    extractUsageFromResponse({ usage }, "kiro"),
  ]) {
    assert.equal((normalized as Record<string, number>).provider_credits, 0.5);
    // The exact cost wins even for a model with no pricing row.
    assert.equal(await calculateCost("kiro", "unlisted-model", normalized), 0.01);
  }

  assert.equal(addKiroCredits(undefined, { usage: 0, unit: "credit" }).cost_in_usd_ticks, 0);
  assert.equal(hasValidUsage(addKiroCredits(undefined, { usage: 0.5, unit: "credit" })), true);
  for (const payload of [
    {},
    { usage: -1, unit: "credit" },
    { usage: 1, unit: "token" },
    { usage: Number.NaN, unit: "credit" },
  ]) {
    assert.throws(() => addKiroCredits(undefined, payload), /invalid credit metering/);
  }
});

test("an invalid KIRO_CREDIT_PRICE_USD fails loudly instead of billing zero", () => {
  process.env.KIRO_CREDIT_PRICE_USD = "0";
  try {
    assert.throws(
      () => addKiroCredits(undefined, { usage: 1, unit: "credit" }),
      /KIRO_CREDIT_PRICE_USD/
    );
  } finally {
    process.env.KIRO_CREDIT_PRICE_USD = "0.02";
  }
});

test("quota, stats and rollup read the persisted cost; a later price does not rewrite it", async () => {
  const key = await createApiKey("Credit test", "test-machine");
  const usage = addKiroCredits(
    { prompt_tokens: 100000, completion_tokens: 1 },
    { usage: 0.5, unit: "credit" }
  );
  const entry = {
    provider: "kiro",
    model: "gpt-5.6-luna",
    tokens: usage,
    apiKeyId: key.id,
    timestamp: new Date().toISOString(),
  };
  // The same request reported twice is deduplicated.
  await saveRequestUsage(entry);
  await saveRequestUsage(entry);

  const row = core
    .getDbInstance()
    .prepare("SELECT provider_credits, provider_cost_usd FROM usage_history WHERE api_key_id = ?")
    .get(key.id);
  assert.deepEqual(row, { provider_credits: 0.5, provider_cost_usd: 0.01 });

  // A tariff this high makes any token-based charge unmistakable.
  await updatePricing({ kiro: { "gpt-5.6-luna": { input: 999, output: 999 } } });
  process.env.KIRO_CREDIT_PRICE_USD = "0.04";
  try {
    const status = await limits.getApiKeyUsageLimitStatus({
      id: key.id,
      usageLimitEnabled: true,
      dailyUsageLimitUsd: 0.005,
      weeklyUsageLimitUsd: 0.005,
    });
    assert.equal(status.dailySpentUsd, 0.01);
    assert.equal(status.dailyExceeded, true);
    assert.equal(status.weeklySpentUsd, 0.01);
    assert.equal(status.weeklyExceeded, true);
    assert.equal(status.dailyHasUnpricedUsage, false);
    assert.equal((await stats.getUsageStats()).byApiKey[`id:${key.id}`].cost, 0.01);

    assert.equal((await rollupUsageHistoryBeforeDate("2100-01-01")).errors, 0);
    const summary = core
      .getDbInstance()
      .prepare("SELECT total_cost FROM daily_usage_summary WHERE provider = 'kiro'")
      .get() as { total_cost: number };
    assert.equal(summary.total_cost, 0.01);
  } finally {
    process.env.KIRO_CREDIT_PRICE_USD = "0.02";
  }
});

test("a failed Kiro request without metering is not charged", async () => {
  const key = await createApiKey("Failure without metering", "failure-machine");
  await saveRequestUsage({
    provider: "kiro",
    model: "gpt-5.6-luna",
    apiKeyId: key.id,
    tokens: { prompt_tokens: 100000 },
    success: false,
    status: "502",
  });
  assert.equal((await limits.getApiKeyUsageLimitStatus({ id: key.id })).dailySpentUsd, 0);
  assert.equal((await stats.getUsageStats()).byApiKey[`id:${key.id}`].cost, 0);
});

test("the streaming pipeline hands credits and exact cost to the billing callback", async () => {
  for (const format of [FORMATS.OPENAI, FORMATS.OPENAI_RESPONSES]) {
    const usage = {
      prompt_tokens: 100,
      completion_tokens: 1,
      total_tokens: 101,
      provider_credits: 0.5,
      cost_in_usd_ticks: 100000000,
    };
    const chunks = [
      {
        id: "credit-test",
        model: "gpt-5.6-luna",
        choices: [{ index: 0, delta: { role: "assistant", content: "OK" }, finish_reason: null }],
      },
      {
        id: "credit-test",
        model: "gpt-5.6-luna",
        choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
        usage,
      },
    ];
    let completed: { usage: Record<string, number> } | undefined;
    const transform = createSSEStream({
      mode: format === FORMATS.OPENAI ? "passthrough" : "translate",
      sourceFormat: format,
      targetFormat: FORMATS.OPENAI,
      provider: "kiro",
      model: "gpt-5.6-luna",
      body: { messages: [{ role: "user", content: "OK" }] },
      onComplete: (value) => {
        completed = value;
      },
    });
    const encoder = new TextEncoder();
    const source = new ReadableStream({
      start(controller) {
        for (const chunk of chunks) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`));
        }
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      },
    });
    await new Response(source.pipeThrough(transform)).text();
    assert.equal(completed?.usage.provider_credits, 0.5, format);
    assert.equal(completed?.usage.cost_in_usd_ticks, 100000000, format);
    assert.equal(await calculateCost("kiro", "gpt-5.6-luna", completed?.usage), 0.01);
  }
});
