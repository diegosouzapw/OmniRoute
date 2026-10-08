import test from "node:test";
import assert from "node:assert/strict";
import { buildCodexUsageQuotas } from "../../open-sse/services/codexUsageQuotas.ts";
import {
  evaluateQuotaCutoff,
  preflightQuota,
  registerQuotaFetcher,
  type QuotaInfo,
} from "../../open-sse/services/quotaPreflight.ts";
import { normalizeProviderSpecificData } from "../../src/lib/providers/requestDefaults.ts";
import { updateProviderConnectionSchema } from "../../src/shared/validation/schemas.ts";
import { parseCodexPaidCredits } from "../../src/lib/providers/codexPaidCredits.ts";
import { toProviderLimitsCacheEntry } from "../../src/lib/usage/providerLimitsCache.ts";

const exhausted: QuotaInfo = {
  used: 100,
  total: 100,
  percentUsed: 1,
  limitReached: true,
  windows: { session: { percentUsed: 1 }, weekly: { percentUsed: 1 } },
};
const thresholds = { resolveMinRemainingPercent: () => 1 };
const scope = {
  provider: "codex",
  requestedModel: "codex/gpt-5.5",
  providerSpecificData: { allowPaidCredits: true },
};
const credits = { hasCredits: true, unlimited: false, overageLimitReached: false, balance: null };

test("Codex paid credits preserve Business availability without inventing a balance", () => {
  const parsed = buildCodexUsageQuotas({
    credits: { has_credits: true, unlimited: false, overage_limit_reached: false, balance: null },
    rate_limit: { limit_reached: true, primary_window: { used_percent: 100 } },
    rate_limit_reset_credits: { available_count: 3 },
  });
  assert.deepEqual(parsed.paidCredits, credits);
  assert.equal(parsed.quotas.session.remaining, 0);
  assert.equal(parsed.bankedResetCredits, 3);
  assert.equal(buildCodexUsageQuotas({}).paidCredits, undefined);
});

test("Codex paid-credit opt-in is a strict boolean", () => {
  assert.equal(
    updateProviderConnectionSchema.safeParse({ providerSpecificData: { allowPaidCredits: true } })
      .success,
    true
  );
  assert.equal(
    updateProviderConnectionSchema.safeParse({ providerSpecificData: { allowPaidCredits: "true" } })
      .success,
    false
  );
  assert.deepEqual(
    normalizeProviderSpecificData("codex", { allowPaidCredits: "true", tag: "test" }),
    { tag: "test" }
  );
});

test("credit parsing rejects truthy strings and keeps numeric credit units separate", () => {
  assert.deepEqual(
    parseCodexPaidCredits({ has_credits: "true", unlimited: "true", balance: "12.50" }),
    {
      hasCredits: false,
      unlimited: false,
      overageLimitReached: false,
      balance: 12.5,
    }
  );
  for (const value of [null, [], "true"]) assert.equal(parseCodexPaidCredits(value), undefined);
  const cache = toProviderLimitsCacheEntry(
    { paidCredits: credits, quotas: { session: { remaining: 0 } } },
    "test"
  );
  assert.deepEqual(cache.paidCredits, credits);
  assert.deepEqual(cache.quotas, { session: { remaining: 0 } });
});

test("only opted-in normal Codex requests with available credits bypass subscription cutoff", () => {
  const quota = { ...exhausted, paidCredits: credits };
  assert.equal(evaluateQuotaCutoff(quota, thresholds, scope).proceed, true);
  for (const providerSpecificData of [
    {},
    { allowPaidCredits: false },
    { allowPaidCredits: "true" },
  ]) {
    assert.equal(
      evaluateQuotaCutoff(quota, thresholds, { ...scope, providerSpecificData }).proceed,
      false
    );
  }
  assert.equal(
    evaluateQuotaCutoff(quota, thresholds, { ...scope, provider: "openai" }).proceed,
    false
  );
  assert.equal(
    evaluateQuotaCutoff(quota, thresholds, { ...scope, requestedModel: "gpt-5.3-codex-spark" })
      .proceed,
    false
  );
  assert.equal(
    evaluateQuotaCutoff({ ...quota, windows: undefined }, thresholds, scope).proceed,
    true
  );
  assert.equal(quota.percentUsed, 1);
});

test("missing, exhausted, and overage-blocked credits never override the cutoff", () => {
  for (const paidCredits of [
    undefined,
    { ...credits, hasCredits: false },
    { ...credits, balance: 0 },
    { ...credits, overageLimitReached: true },
  ]) {
    assert.equal(
      evaluateQuotaCutoff({ ...exhausted, paidCredits }, thresholds, scope).proceed,
      false
    );
  }
  assert.equal(
    evaluateQuotaCutoff(
      { ...exhausted, paidCredits: { ...credits, hasCredits: false, unlimited: true } },
      thresholds,
      scope
    ).proceed,
    true
  );
  assert.equal(
    evaluateQuotaCutoff(
      { ...exhausted, paidCredits: { ...credits, unlimited: true, overageLimitReached: true } },
      thresholds,
      scope
    ).proceed,
    false
  );
});

test("the global inclusive 1% cutoff is unchanged for subscription accounts", () => {
  assert.equal(
    evaluateQuotaCutoff({ used: 99, total: 100, percentUsed: 0.99 }, thresholds, {
      provider: "codex",
    }).proceed,
    false
  );
  assert.equal(
    evaluateQuotaCutoff({ used: 98, total: 100, percentUsed: 0.98 }, thresholds, {
      provider: "codex",
    }).proceed,
    true
  );
});

test("preflight honors paid credits even without window data and fails closed on unknown usage", async () => {
  registerQuotaFetcher("codex", async () => ({
    ...exhausted,
    windows: undefined,
    paidCredits: credits,
  }));
  const connection = {
    providerSpecificData: scope.providerSpecificData,
    requestedModel: scope.requestedModel,
  };
  assert.equal((await preflightQuota("codex", "paid-test", connection, thresholds)).proceed, true);
  registerQuotaFetcher("codex", async () => null);
  assert.equal((await preflightQuota("codex", "paid-test", connection, thresholds)).proceed, false);
  assert.equal((await preflightQuota("codex", "normal-test", {}, thresholds)).proceed, true);
});
