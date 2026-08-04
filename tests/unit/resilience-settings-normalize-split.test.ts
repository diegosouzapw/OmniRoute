/**
 * Split-guard — resilience/settings ↔ settings/types + settings/normalize
 *
 * Guards the decomposition of the (fully pure) resilience settings module into
 * two leaves: settings/types.ts (the shape) and settings/normalize.ts (coercion
 * + per-section normalizers). Characterizes the coercers/normalizers and proves
 * the host still exposes DEFAULT_RESILIENCE_SETTINGS + resolve/merge/compat with
 * the re-exported types. DB-free — the whole layer is pure.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  asRecord,
  toInteger,
  toBoolean,
  normalizeProviderBreakerProfile,
  normalizeWaitForCooldownSettings,
} from "../../src/lib/resilience/settings/normalize.ts";

import {
  DEFAULT_RESILIENCE_SETTINGS,
  resolveResilienceSettings,
  mergeResilienceSettings,
  buildLegacyResilienceCompat,
} from "../../src/lib/resilience/settings.ts";
import type { ResilienceSettings } from "../../src/lib/resilience/settings.ts";

describe("resilience/settings normalize split-guard", () => {
  it("asRecord returns {} for non-objects and passes objects through", () => {
    assert.deepEqual(asRecord(null), {});
    assert.deepEqual(asRecord(42), {});
    assert.deepEqual(asRecord([1, 2]), {});
    assert.deepEqual(asRecord({ a: 1 }), { a: 1 });
  });

  it("toInteger clamps to [min,max], truncates, and falls back on NaN", () => {
    assert.equal(toInteger(5.9, 0), 5);
    assert.equal(toInteger("7", 0), 7);
    assert.equal(toInteger("nope", 3), 3);
    assert.equal(toInteger(-10, 0, { min: 1, max: 100 }), 1);
    assert.equal(toInteger(9999, 0, { min: 1, max: 100 }), 100);
  });

  it("toBoolean only accepts real booleans", () => {
    assert.equal(toBoolean(true, false), true);
    assert.equal(toBoolean("true", false), false);
    assert.equal(toBoolean(undefined, true), true);
  });

  it("normalizeProviderBreakerProfile keeps degradation below failure threshold", () => {
    const out = normalizeProviderBreakerProfile(
      { failureThreshold: 3, degradationThreshold: 10, resetTimeoutMs: 60000 },
      { failureThreshold: 5, degradationThreshold: 4, resetTimeoutMs: 30000 }
    );
    assert.equal(out.failureThreshold, 3);
    assert.equal(out.degradationThreshold, 2); // clamped to failureThreshold - 1
    assert.equal(out.resetTimeoutMs, 60000);
  });

  it("normalizeWaitForCooldownSettings derives ms and disables on zero retries/wait", () => {
    const on = normalizeWaitForCooldownSettings(
      { enabled: true, maxRetries: 2, maxRetryWaitSec: 30 },
      { enabled: true, maxRetries: 3, maxRetryWaitSec: 30, maxRetryWaitMs: 30000, budgetMs: 300000 }
    );
    assert.equal(on.enabled, true);
    assert.equal(on.maxRetryWaitMs, 30000);

    const off = normalizeWaitForCooldownSettings(
      { enabled: true, maxRetries: 0, maxRetryWaitSec: 30 },
      { enabled: true, maxRetries: 3, maxRetryWaitSec: 30, maxRetryWaitMs: 30000, budgetMs: 300000 }
    );
    assert.equal(off.enabled, false); // maxRetries 0 forces disabled
  });

  // #7360 follow-up: budgetMs caps the CUMULATIVE wait across all retries, not
  // just a single wait — without it, maxRetries x maxRetryWaitSec could exceed
  // the intended 5-minute give-up point.
  it("normalizeWaitForCooldownSettings floors budgetMs at maxRetryWaitMs and caps it at 5 minutes", () => {
    const floored = normalizeWaitForCooldownSettings(
      { maxRetryWaitSec: 90, budgetMs: 10000 },
      { enabled: true, maxRetries: 3, maxRetryWaitSec: 30, maxRetryWaitMs: 30000, budgetMs: 300000 }
    );
    assert.equal(floored.budgetMs, 90000, "budgetMs can never be smaller than a single wait");

    const capped = normalizeWaitForCooldownSettings(
      { budgetMs: 999999999 },
      { enabled: true, maxRetries: 3, maxRetryWaitSec: 30, maxRetryWaitMs: 30000, budgetMs: 300000 }
    );
    assert.equal(capped.budgetMs, 300000, "budgetMs is capped at 5 minutes");
  });

  it("host exposes DEFAULT_RESILIENCE_SETTINGS with the full section set", () => {
    const keys = Object.keys(DEFAULT_RESILIENCE_SETTINGS).sort();
    assert.deepEqual(keys, [
      "comboCooldownWait",
      "connectionCooldown",
      "providerBreaker",
      "providerCooldown",
      "providerQuotaOverrides",
      "quotaPreflight",
      "quotaShareConcurrencyLimit",
      "requestQueue",
      "streamRecovery",
      "waitForCooldown",
    ]);
  });

  it("host resolveResilienceSettings(null) yields normalized defaults", () => {
    const resolved: ResilienceSettings = resolveResilienceSettings(null);
    assert.equal(typeof resolved.requestQueue.requestsPerMinute, "number");
    assert.equal(typeof resolved.providerBreaker.oauth.failureThreshold, "number");
    // degradation is always kept below failure by the normalizer.
    assert.ok(
      resolved.providerBreaker.oauth.degradationThreshold <
        resolved.providerBreaker.oauth.failureThreshold ||
        resolved.providerBreaker.oauth.failureThreshold <= 1
    );
  });

  it("host mergeResilienceSettings applies a partial patch", () => {
    const base = resolveResilienceSettings(null);
    const merged = mergeResilienceSettings(base, {
      requestQueue: { concurrentRequests: 7 },
    });
    assert.equal(merged.requestQueue.concurrentRequests, 7);
    assert.equal(merged.requestQueue.requestsPerMinute, base.requestQueue.requestsPerMinute);
  });

  it("host buildLegacyResilienceCompat round-trips connection cooldown into profiles", () => {
    const compat = buildLegacyResilienceCompat(DEFAULT_RESILIENCE_SETTINGS);
    assert.equal(
      compat.profiles.oauth.transientCooldown,
      DEFAULT_RESILIENCE_SETTINGS.connectionCooldown.oauth.baseCooldownMs
    );
    assert.equal(
      compat.defaults.requestsPerMinute,
      DEFAULT_RESILIENCE_SETTINGS.requestQueue.requestsPerMinute
    );
  });
});
