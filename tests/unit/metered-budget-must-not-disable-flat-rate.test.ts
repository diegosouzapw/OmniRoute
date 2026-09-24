/**
 * The metered dollar budget is scoped by apiKeyId and is enforced before the
 * provider is resolved, so an exhausted allowance rejects the request outright —
 * including when the provider that would have served it is a flat-rate
 * subscription the allowance does not pay for.
 *
 * These tests pin the two halves of the fix:
 *   - ELIGIBILITY: an exhausted allowance removes metered candidates and leaves
 *     flat-rate candidates eligible; an unknown provider stays metered.
 *   - ACCOUNTING: flat-rate traffic does not draw the allowance down, while
 *     metered traffic still does.
 *
 * Routing itself is unchanged and is proven end-to-end in
 * tests/integration/combo-matrix/metered-budget-eligibility.test.ts.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-metered-budget-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "metered-budget-test-secret";

const costRules = await import("../../src/domain/costRules.ts");
const policy = await import("../../src/lib/usage/meteredBudgetPolicy.ts");
const comboPredicates = await import("../../open-sse/services/combo/comboPredicates.ts");

const METERED_PROVIDER = "openai";
const FLAT_RATE_PROVIDER = "opencode-go";
const KEY = "key-under-test";

function giveBudget(limitUsd: number) {
  costRules.resetCostData();
  costRules.setBudget(KEY, { dailyLimitUsd: limitUsd, resetInterval: "daily" });
}

function spend(usd: number) {
  costRules.recordCost(KEY, usd);
}

test.after(() => {
  costRules.resetCostData();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

// ── B1 — budget available: every economic class is eligible ────────────────
test("B1: with allowance remaining, metered and flat-rate candidates are both eligible", () => {
  giveBudget(10);
  spend(1);
  assert.equal(policy.checkMeteredBudgetForProvider(KEY, METERED_PROVIDER).allowed, true);
  assert.equal(policy.checkMeteredBudgetForProvider(KEY, FLAT_RATE_PROVIDER).allowed, true);
});

// ── B2 — the defect: exhaustion must not take flat-rate down with it ───────
test("B2: with the allowance spent, the metered candidate is ineligible and the flat-rate candidate is NOT", () => {
  giveBudget(10);
  spend(25);

  const metered = policy.checkMeteredBudgetForProvider(KEY, METERED_PROVIDER);
  assert.equal(metered.allowed, false);
  assert.match(String(metered.reason), /budget exceeded/i);

  assert.equal(policy.checkMeteredBudgetForProvider(KEY, FLAT_RATE_PROVIDER).allowed, true);
});

// ── B9 — an unclassified provider must never become a spending bypass ──────
test("B9: an unknown provider is metered, so exhaustion still blocks it", () => {
  giveBudget(10);
  spend(25);
  for (const unknown of ["", null, undefined, "not-a-real-provider", "OPENCODE-GO-ISH"]) {
    assert.equal(
      policy.checkMeteredBudgetForProvider(KEY, unknown as string).allowed,
      false,
      `provider ${JSON.stringify(unknown)} must stay subject to the allowance`
    );
  }
  // Case and surrounding space are the classification's own normalisation, not
  // a similarity match: the real id in any casing is still flat-rate.
  assert.equal(policy.checkMeteredBudgetForProvider(KEY, " OpenCode-Go ").allowed, true);
});

// ── B6 — the block lifts on its own when the allowance returns ─────────────
test("B6: raising the limit makes the metered candidate eligible again, with no other state to clear", () => {
  giveBudget(10);
  spend(25);
  assert.equal(policy.checkMeteredBudgetForProvider(KEY, METERED_PROVIDER).allowed, false);
  costRules.setBudget(KEY, { dailyLimitUsd: 100, resetInterval: "daily" });
  assert.equal(policy.checkMeteredBudgetForProvider(KEY, METERED_PROVIDER).allowed, true);
});

// ── B10 — a key with no budget configured is untouched ─────────────────────
test("B10: a key with no budget configured is eligible for every provider", () => {
  costRules.resetCostData();
  assert.equal(policy.checkMeteredBudgetForProvider(KEY, METERED_PROVIDER).allowed, true);
  assert.equal(policy.checkMeteredBudgetForProvider(null, METERED_PROVIDER).allowed, true);
});

// ── B7 — flat-rate usage must not consume the metered allowance ────────────
test("B7: flat-rate usage records nothing against the allowance; metered usage records all of it", () => {
  assert.equal(policy.meteredBudgetCost(FLAT_RATE_PROVIDER, 4.2), 0);
  assert.equal(policy.meteredBudgetCost(METERED_PROVIDER, 4.2), 4.2);
  assert.equal(policy.consumesMeteredBudget(FLAT_RATE_PROVIDER), false);
  assert.equal(policy.consumesMeteredBudget(METERED_PROVIDER), true);

  // A bad pricing lookup can never credit the allowance back.
  assert.equal(policy.meteredBudgetCost(METERED_PROVIDER, -1), 0);
  assert.equal(policy.meteredBudgetCost(METERED_PROVIDER, Number.NaN), 0);
});

// ── B7 (end to end on the ledger) ─────────────────────────────────────────
test("B7: an exhausting run of flat-rate traffic leaves the metered allowance intact", () => {
  giveBudget(10);
  for (let i = 0; i < 20; i++) spend(policy.meteredBudgetCost(FLAT_RATE_PROVIDER, 3));
  assert.equal(policy.checkMeteredBudgetForProvider(KEY, METERED_PROVIDER).allowed, true);

  for (let i = 0; i < 20; i++) spend(policy.meteredBudgetCost(METERED_PROVIDER, 3));
  assert.equal(policy.checkMeteredBudgetForProvider(KEY, METERED_PROVIDER).allowed, false);
});

// ── Combo classification: a local budget refusal is not an upstream failure ─
test("a BUDGET_EXCEEDED 429 is classified as a local key-policy breach, never an upstream rate limit", () => {
  const budgetBody = { error: { code: "BUDGET_EXCEEDED", message: "Daily budget exceeded" } };
  const tokenBody = { error: { code: "TOKEN_LIMIT_EXCEEDED", message: "Token limit exceeded" } };
  const upstreamBody = { error: { code: "rate_limit_exceeded", message: "slow down" } };

  assert.equal(comboPredicates.isBudgetBreachErrorBody(budgetBody), true);
  assert.equal(comboPredicates.isLocalKeyPolicyBreachErrorBody(budgetBody), true);
  assert.equal(comboPredicates.isLocalKeyPolicyBreachErrorBody(tokenBody), true);
  assert.equal(comboPredicates.isLocalKeyPolicyBreachErrorBody(upstreamBody), false);

  // The pre-existing token-limit predicate keeps its exact meaning.
  assert.equal(comboPredicates.isTokenLimitBreachErrorBody(budgetBody), false);
  assert.equal(comboPredicates.isTokenLimitBreachErrorBody(tokenBody), true);
});

// ── The classification has to reach the combo exhaustion sets ──────────────
// A budget refusal carries HTTP 429 like an upstream rate limit does. If the
// combo loop classifies it as one, it adds the provider to
// transientRateLimitedProviders, which lets later targets in the SAME request
// reuse rate-limited connections for a provider nothing upstream refused.
test("a BUDGET_EXCEEDED 429 must not put the provider in the transient rate-limited set", async () => {
  const { applyComboTargetExhaustion } =
    await import("../../open-sse/services/combo/targetExhaustion.ts");
  const budgetBody = { error: { code: "BUDGET_EXCEEDED", message: "Daily budget exceeded" } };
  const upstreamBody = { error: { code: "rate_limit_exceeded", message: "slow down" } };
  const log = { info() {}, warn() {}, error() {}, debug() {} };
  const makeSets = () => ({
    exhaustedProviders: new Set<string>(),
    exhaustedConnections: new Set<string>(),
    transientRateLimitedProviders: new Set<string>(),
  });
  const target = {
    kind: "model",
    executionKey: "ek",
    modelStr: `${METERED_PROVIDER}/m1`,
    provider: METERED_PROVIDER,
    providerId: null,
    connectionId: "conn-budget",
  } as Parameters<typeof applyComboTargetExhaustion>[0];
  const base = {
    errorText: "Daily budget exceeded",
    rawModel: "m1",
    allAccountsRateLimited: false,
    requestScopedFailure: false,
    log,
    tag: "COMBO",
    exhaustedLogLevel: "info" as const,
    result: { status: 429 },
    fallbackResult: {},
  };

  const local = makeSets();
  applyComboTargetExhaustion(target, {
    ...base,
    isTokenLimitBreach: comboPredicates.isLocalKeyPolicyBreachErrorBody(budgetBody),
    sets: local,
  });
  assert.equal(local.transientRateLimitedProviders.size, 0);

  // Control: a real upstream 429 is still classified as one.
  const upstream = makeSets();
  applyComboTargetExhaustion(target, {
    ...base,
    isTokenLimitBreach: comboPredicates.isLocalKeyPolicyBreachErrorBody(upstreamBody),
    sets: upstream,
  });
  assert.ok(upstream.transientRateLimitedProviders.has(METERED_PROVIDER));
});
