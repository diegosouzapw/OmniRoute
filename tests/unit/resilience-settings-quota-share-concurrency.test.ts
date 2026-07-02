/**
 * TDD — ResilienceSettings.quotaShareConcurrencyLimit (FASE 2.1, the
 * per-connection concurrency kill-switch for quota-share combos). Locks the
 * default, the resolve/merge round-trip, and the boolean normalization.
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

test("default quotaShareConcurrencyLimit is enabled (kill-switch on)", () => {
  assert.deepEqual(cloneDefaults().quotaShareConcurrencyLimit, { enabled: true });
});

test("resolveResilienceSettings returns the default block when nothing is stored", () => {
  const resolved = resolveResilienceSettings({});
  assert.deepEqual(
    resolved.quotaShareConcurrencyLimit,
    DEFAULT_RESILIENCE_SETTINGS.quotaShareConcurrencyLimit
  );
});

test("resolveResilienceSettings reads a stored disable override", () => {
  const resolved = resolveResilienceSettings({
    resilienceSettings: { quotaShareConcurrencyLimit: { enabled: false } },
  });
  assert.equal(resolved.quotaShareConcurrencyLimit.enabled, false);
});

test("mergeResilienceSettings round-trips a disable patch", () => {
  const current = cloneDefaults();
  const next = mergeResilienceSettings(current, {
    quotaShareConcurrencyLimit: { enabled: false },
  });
  assert.equal(next.quotaShareConcurrencyLimit.enabled, false);
  // unrelated blocks are preserved
  assert.deepEqual(next.comboCooldownWait, current.comboCooldownWait);
});

test("garbage values fall back to the current enabled flag", () => {
  const resolved = resolveResilienceSettings({
    resilienceSettings: {
      quotaShareConcurrencyLimit: { enabled: "nope" as unknown as boolean },
    },
  });
  // non-boolean → falls back to the default (true)
  assert.equal(resolved.quotaShareConcurrencyLimit.enabled, true);
});

test("an explicit re-enable patch is honored", () => {
  const disabled = mergeResilienceSettings(cloneDefaults(), {
    quotaShareConcurrencyLimit: { enabled: false },
  });
  const reenabled = mergeResilienceSettings(disabled, {
    quotaShareConcurrencyLimit: { enabled: true },
  });
  assert.equal(reenabled.quotaShareConcurrencyLimit.enabled, true);
});
