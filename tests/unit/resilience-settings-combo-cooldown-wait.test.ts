/**
 * TDD — ResilienceSettings.comboCooldownWait (quota-share combo cooldown-aware
 * retry, Variante A). Locks the defaults, the resolve/merge round-trip and the
 * clamping/validation contract of normalizeComboCooldownWaitSettings.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  DEFAULT_RESILIENCE_SETTINGS,
  mergeResilienceSettings,
  resolveResilienceSettings,
  type ResilienceSettings,
} from "../../src/lib/resilience/settings.ts";

function cloneDefaults(): ResilienceSettings {
  return structuredClone(DEFAULT_RESILIENCE_SETTINGS);
}

test("default comboCooldownWait is conservative (on, 5s ceiling, 2 attempts, 8s budget)", () => {
  const s = cloneDefaults().comboCooldownWait;
  assert.equal(s.enabled, true);
  assert.equal(s.maxWaitMs, 5000);
  assert.equal(s.maxAttempts, 2);
  assert.equal(s.budgetMs, 8000);
});

test("resolveResilienceSettings returns the default block when nothing is stored", () => {
  const resolved = resolveResilienceSettings({});
  assert.deepEqual(resolved.comboCooldownWait, DEFAULT_RESILIENCE_SETTINGS.comboCooldownWait);
});

test("resolveResilienceSettings reads stored comboCooldownWait overrides", () => {
  const resolved = resolveResilienceSettings({
    resilienceSettings: {
      comboCooldownWait: { enabled: true, maxWaitMs: 3000, maxAttempts: 1, budgetMs: 4000 },
    },
  });
  assert.deepEqual(resolved.comboCooldownWait, {
    enabled: true,
    maxWaitMs: 3000,
    maxAttempts: 1,
    budgetMs: 4000,
  });
});

test("mergeResilienceSettings round-trips a partial patch", () => {
  const merged = mergeResilienceSettings(cloneDefaults(), {
    comboCooldownWait: { maxWaitMs: 2000 },
  });
  assert.equal(merged.comboCooldownWait.maxWaitMs, 2000);
  // Unspecified fields keep the current value.
  assert.equal(merged.comboCooldownWait.maxAttempts, 2);
  assert.equal(merged.comboCooldownWait.budgetMs, 8000);
  assert.equal(merged.comboCooldownWait.enabled, true);
});

test("enabled is forced false when maxWaitMs or maxAttempts is zero", () => {
  const a = mergeResilienceSettings(cloneDefaults(), {
    comboCooldownWait: { enabled: true, maxWaitMs: 0 },
  });
  assert.equal(a.comboCooldownWait.enabled, false);

  const b = mergeResilienceSettings(cloneDefaults(), {
    comboCooldownWait: { enabled: true, maxAttempts: 0 },
  });
  assert.equal(b.comboCooldownWait.enabled, false);
});

test("maxWaitMs is clamped to the 30s hard ceiling", () => {
  const merged = mergeResilienceSettings(cloneDefaults(), {
    comboCooldownWait: { maxWaitMs: 999_999 },
  });
  assert.equal(merged.comboCooldownWait.maxWaitMs, 30000);
});

test("budgetMs can never drop below a single maxWaitMs", () => {
  const merged = mergeResilienceSettings(cloneDefaults(), {
    comboCooldownWait: { maxWaitMs: 5000, budgetMs: 100 },
  });
  // budget floored at maxWaitMs so at least one wait can fire.
  assert.equal(merged.comboCooldownWait.budgetMs, 5000);
});

test("explicit disable is honored", () => {
  const merged = mergeResilienceSettings(cloneDefaults(), {
    comboCooldownWait: { enabled: false },
  });
  assert.equal(merged.comboCooldownWait.enabled, false);
});

test("garbage values fall back to the current numbers", () => {
  const merged = mergeResilienceSettings(cloneDefaults(), {
    comboCooldownWait: {
      maxWaitMs: "not-a-number" as never,
      maxAttempts: null as never,
      budgetMs: undefined,
    },
  });
  assert.equal(merged.comboCooldownWait.maxWaitMs, 5000);
  assert.equal(merged.comboCooldownWait.maxAttempts, 2);
  assert.equal(merged.comboCooldownWait.budgetMs, 8000);
});
