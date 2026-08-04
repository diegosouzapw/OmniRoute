/**
 * #7360 follow-up — cumulative wait budget for the single-model cooldown-aware
 * retry (waitForCooldown / cooldownAwareRetry.ts).
 *
 * Before this, getCooldownAwareRetryDecision only bounded a SINGLE wait
 * (maxRetryWaitMs) and a retry COUNT (maxRetries) — with no cap on the total
 * time spent waiting across all retries. A request could re-wait maxRetries
 * times at up to maxRetryWaitMs each with no overall ceiling. budgetMs (mirrors
 * combo.ts's comboCooldownWait.budgetMs) now bounds the cumulative total,
 * capped at 5 minutes, matching the "give up after 5 minutes" requirement.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { getCooldownAwareRetryDecision, resolveCooldownAwareRetrySettings } =
  await import("../../src/sse/services/cooldownAwareRetry.ts");

function baseSettings(overrides: Partial<Record<string, unknown>> = {}) {
  return {
    enabled: true,
    maxRetries: 5,
    maxRetryWaitSec: 90,
    maxRetryWaitMs: 90000,
    budgetMs: 300000,
    ...overrides,
  };
}

test("getCooldownAwareRetryDecision retries when the wait fits both the per-wait cap and the remaining budget", () => {
  const decision = getCooldownAwareRetryDecision({
    retryAfter: new Date(Date.now() + 60000).toISOString(),
    settings: baseSettings(),
    attempt: 0,
    budgetLeftMs: 300000,
  });
  assert.equal(decision.shouldRetry, true);
});

test("getCooldownAwareRetryDecision refuses to wait once the cumulative budget is exhausted, even if the single wait is under maxRetryWaitMs", () => {
  const decision = getCooldownAwareRetryDecision({
    retryAfter: new Date(Date.now() + 60000).toISOString(),
    settings: baseSettings(),
    attempt: 1,
    budgetLeftMs: 30000, // less than the 60s wait needed
  });
  assert.equal(decision.shouldRetry, false);
});

test("getCooldownAwareRetryDecision allows a wait that exactly exhausts the remaining budget", () => {
  const decision = getCooldownAwareRetryDecision({
    retryAfter: new Date(Date.now() + 60000).toISOString(),
    settings: baseSettings(),
    attempt: 0,
    budgetLeftMs: 60000,
  });
  assert.equal(decision.shouldRetry, true);
});

test("getCooldownAwareRetryDecision defaults budgetLeftMs to settings.budgetMs when the caller doesn't track it (backward compat)", () => {
  const withinDefaultBudget = getCooldownAwareRetryDecision({
    retryAfter: new Date(Date.now() + 60000).toISOString(),
    settings: baseSettings({ budgetMs: 90000 }),
    attempt: 0,
    // budgetLeftMs omitted — should fall back to settings.budgetMs (90000ms).
  });
  assert.equal(withinDefaultBudget.shouldRetry, true);

  const exceedsDefaultBudget = getCooldownAwareRetryDecision({
    retryAfter: new Date(Date.now() + 200000).toISOString(),
    settings: baseSettings({ budgetMs: 90000 }),
    attempt: 0,
  });
  assert.equal(exceedsDefaultBudget.shouldRetry, false);
});

test("resolveCooldownAwareRetrySettings floors budgetMs at maxRetryWaitMs and caps at 5 minutes", () => {
  const floored = resolveCooldownAwareRetrySettings({
    resilienceSettings: {
      waitForCooldown: { enabled: true, maxRetries: 3, maxRetryWaitSec: 90, budgetMs: 10000 },
    },
  });
  assert.equal(floored.budgetMs, 90000, "budgetMs can never be smaller than a single wait");

  const capped = resolveCooldownAwareRetrySettings({
    resilienceSettings: {
      waitForCooldown: {
        enabled: true,
        maxRetries: 3,
        maxRetryWaitSec: 90,
        budgetMs: 999999999,
      },
    },
  });
  assert.equal(capped.budgetMs, 300000, "budgetMs is capped at 5 minutes");
});

test("resolveCooldownAwareRetrySettings defaults to a 5-minute-capable budget out of the box", () => {
  const settings = resolveCooldownAwareRetrySettings(null);
  assert.equal(settings.budgetMs, 300000);
  assert.equal(settings.maxRetryWaitSec, 90);
  assert.equal(settings.maxRetries, 5);
});
