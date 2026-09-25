// tests/integration/combo-matrix/metered-budget-eligibility.test.ts
//
// End-to-end routing proof for the metered dollar budget as a CANDIDATE
// constraint rather than a pre-routing verdict.
//
// The budget is scoped by apiKeyId and used to be enforced before any provider
// was resolved, so a spent allowance rejected the whole request — taking down
// flat-rate subscription capacity that the allowance does not pay for. These
// tests drive the real chat pipeline and assert on WHICH upstream was actually
// dispatched, so they fail if the budget ever regains routing authority or
// loses its power to stop unbudgeted metered spend.
//
// openai is metered. claude (the Claude Code plan) is flat-rate — see
// FLAT_RATE_SUBSCRIPTION_PROVIDER_IDS in src/lib/usage/flatRateProviders.ts.
import test from "node:test";
import assert from "node:assert/strict";
import { createComboRoutingHarness } from "../_comboRoutingHarness.ts";

const h = await createComboRoutingHarness("combo-metered-budget");
const {
  BaseExecutor,
  combosDb,
  handleChat,
  buildRequest,
  seedApiKey,
  seedConnection,
  resetStorage,
} = h;
const costRules = await import("../../../src/domain/costRules.ts");
const providersDb = await import("../../../src/lib/db/providers.ts");

function body(model: string) {
  return { model, stream: false, messages: [{ role: "user", content: `route ${model}` }] };
}

/** A key whose daily allowance is configured, and optionally already spent. */
async function keyWithBudget({ limitUsd, spentUsd }: { limitUsd: number; spentUsd: number }) {
  const key = await seedApiKey({ name: "budgeted" });
  costRules.setBudget(key.id, { dailyLimitUsd: limitUsd, resetInterval: "daily" });
  if (spentUsd > 0) costRules.recordCost(key.id, spentUsd);
  return key;
}

async function seedMixedCombo(name: string) {
  await seedConnection("openai", { apiKey: "sk-openai-budget" });
  await seedConnection("claude", { apiKey: "sk-claude-budget" });
  await combosDb.createCombo({
    name,
    strategy: "priority",
    config: { maxRetries: 0, retryDelayMs: 0 },
    // Metered first: if the budget ever selected a provider instead of merely
    // filtering, this ordering is what would expose it.
    models: ["openai/gpt-4o-mini", "claude/claude-sonnet-4-6"],
  });
}

test.beforeEach(async () => {
  BaseExecutor.RETRY_CONFIG.delayMs = 0;
  await resetStorage();
  costRules.resetCostData();
});
test.afterEach(async () => {
  BaseExecutor.RETRY_CONFIG.delayMs = h.originalRetryDelayMs;
  costRules.resetCostData();
  await resetStorage();
});
test.after(async () => {
  await h.cleanup();
});

test("B1: with allowance remaining, normal routing is unchanged — the metered target still wins", async () => {
  await seedMixedCombo("b-budget-ok");
  const key = await keyWithBudget({ limitUsd: 100, spentUsd: 1 });
  h.installRecordingFetch();

  const r = await handleChat(buildRequest({ body: body("b-budget-ok"), authKey: key.key }));
  assert.equal(r.status, 200);
  assert.deepEqual(h.providersSeen(), ["openai"]);
});

test("B4: with the allowance spent, the metered target is filtered out and normal routing selects the flat-rate one", async () => {
  await seedMixedCombo("b-budget-spent");
  const key = await keyWithBudget({ limitUsd: 10, spentUsd: 25 });
  h.installRecordingFetch();

  const r = await handleChat(buildRequest({ body: body("b-budget-spent"), authKey: key.key }));

  assert.equal(r.status, 200, "flat-rate capacity must still serve the request");
  assert.deepEqual(h.providersSeen(), ["claude"]);
  assert.ok(
    !h.providersSeen().includes("openai"),
    "no metered transport may occur once the allowance is spent"
  );
});

test("B3: with the allowance spent and only metered candidates, the request fails closed and nothing is dispatched", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-only" });
  await combosDb.createCombo({
    name: "b-metered-only",
    strategy: "priority",
    config: { maxRetries: 0, retryDelayMs: 0 },
    models: ["openai/gpt-4o-mini"],
  });
  const key = await keyWithBudget({ limitUsd: 10, spentUsd: 25 });
  h.installRecordingFetch();

  const r = await handleChat(buildRequest({ body: body("b-metered-only"), authKey: key.key }));

  assert.notEqual(r.status, 200);
  assert.deepEqual(h.providersSeen(), [], "not one metered upstream call may be made");
});

test("B5: with the allowance spent and the flat-rate candidate unhealthy, the request fails closed", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-unhealthy" });
  await seedConnection("claude", { apiKey: "sk-claude-unhealthy", isActive: false });
  await combosDb.createCombo({
    name: "b-flat-rate-down",
    strategy: "priority",
    config: { maxRetries: 0, retryDelayMs: 0 },
    models: ["openai/gpt-4o-mini", "claude/claude-sonnet-4-6"],
  });
  const key = await keyWithBudget({ limitUsd: 10, spentUsd: 25 });
  h.installRecordingFetch();

  const r = await handleChat(buildRequest({ body: body("b-flat-rate-down"), authKey: key.key }));

  assert.notEqual(r.status, 200);
  assert.deepEqual(
    h.providersSeen(),
    [],
    "a spent allowance must never fall through to metered capacity"
  );
});

test("B6: once the allowance is raised, the metered target is routed to again", async () => {
  await seedMixedCombo("b-budget-restored");
  const key = await keyWithBudget({ limitUsd: 10, spentUsd: 25 });
  h.installRecordingFetch();

  const blocked = await handleChat(
    buildRequest({ body: body("b-budget-restored"), authKey: key.key })
  );
  assert.equal(blocked.status, 200);
  assert.deepEqual(h.providersSeen(), ["claude"]);

  costRules.setBudget(key.id, { dailyLimitUsd: 1000, resetInterval: "daily" });
  const restored = await handleChat(
    buildRequest({ body: body("b-budget-restored"), authKey: key.key })
  );
  assert.equal(restored.status, 200);
  assert.deepEqual(h.providersSeen(), ["claude", "openai"]);
});

test("a single metered model outside any combo still fails closed when the allowance is spent", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-direct" });
  const key = await keyWithBudget({ limitUsd: 10, spentUsd: 25 });
  h.installRecordingFetch();

  const r = await handleChat(buildRequest({ body: body("openai/gpt-4o-mini"), authKey: key.key }));

  assert.equal(r.status, 429);
  assert.deepEqual(h.providersSeen(), []);
});

test("a single FLAT-RATE model outside any combo is served while the allowance is spent", async () => {
  await seedConnection("claude", { apiKey: "sk-claude-direct" });
  const key = await keyWithBudget({ limitUsd: 10, spentUsd: 25 });
  h.installRecordingFetch();

  const r = await handleChat(
    buildRequest({ body: body("claude/claude-sonnet-4-6"), authKey: key.key })
  );

  assert.equal(r.status, 200);
  assert.deepEqual(h.providersSeen(), ["claude"]);
});

test("a budget refusal leaves the provider connection healthy — it is a local verdict, not an upstream one", async () => {
  const conn = await seedConnection("openai", { apiKey: "sk-openai-health" });
  const key = await keyWithBudget({ limitUsd: 10, spentUsd: 25 });
  h.installRecordingFetch();

  const refused = await handleChat(
    buildRequest({ body: body("openai/gpt-4o-mini"), authKey: key.key })
  );
  assert.equal(refused.status, 429);

  // The account was never even selected, so nothing about it may have changed.
  // Reading the row is the assertion that matters: a behavioural retry can pass
  // while the connection is quietly cooling, because an all-accounts-cooled
  // provider still gets a last-resort attempt.
  const after = (await providersDb.getProviderConnectionById(
    (conn as { id: string }).id
  )) as Record<string, unknown> | null;
  assert.ok(after);
  assert.equal(
    after!.rateLimitedUntil ?? null,
    null,
    "a local budget refusal must not cool the account"
  );
  assert.equal(after!.lastErrorType ?? null, null);
  assert.equal(after!.testStatus, "active");

  // And it is usable the moment the allowance returns.
  costRules.setBudget(key.id, { dailyLimitUsd: 1000, resetInterval: "daily" });
  const served = await handleChat(
    buildRequest({ body: body("openai/gpt-4o-mini"), authKey: key.key })
  );
  assert.equal(served.status, 200);
  assert.deepEqual(h.providersSeen(), ["openai"]);
});

test("B7/B8: a served flat-rate request stays visible in telemetry and still does not move the allowance", async () => {
  await seedConnection("claude", { apiKey: "sk-claude-accounting" });
  const key = await seedApiKey({ name: "accounting" });
  costRules.setBudget(key.id, { dailyLimitUsd: 10, resetInterval: "daily" });
  h.installRecordingFetch();

  const before = costRules.getCostSummary(key.id).totalCostPeriod;
  const r = await handleChat(
    buildRequest({ body: body("claude/claude-sonnet-4-6"), authKey: key.key })
  );
  assert.equal(r.status, 200);

  // Observability: the request is still recorded, with its provider and model.
  await h.callLogsDb.waitForCallLogSaves(10_000);
  const logged = await h.getLatestCallLog();
  assert.ok(logged, "flat-rate traffic must not disappear from the request log");
  assert.equal((logged as { provider?: string }).provider, "claude");

  // Budget consumption: unchanged. The subscription is not paid for out of the
  // metered allowance, so the allowance must not move.
  assert.equal(costRules.getCostSummary(key.id).totalCostPeriod, before);
});
