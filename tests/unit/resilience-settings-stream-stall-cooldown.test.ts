/**
 * ResilienceSettings.streamStallCooldown — whether a stream content stall cools down the
 * account that served it. Locks the default (off), the resolve/merge round-trip and the
 * wire schema accepted by PATCH /api/resilience.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  DEFAULT_RESILIENCE_SETTINGS,
  mergeResilienceSettings,
  resolveResilienceSettings,
} from "../../src/lib/resilience/settings.ts";
import { updateResilienceSchema } from "../../src/shared/validation/schemas/settings.ts";

test("stream stalls do not cool down accounts by default", () => {
  assert.deepEqual(DEFAULT_RESILIENCE_SETTINGS.streamStallCooldown, { enabled: false });
  assert.deepEqual(resolveResilienceSettings({}).streamStallCooldown, { enabled: false });
});

test("resolveResilienceSettings reads a stored opt-in", () => {
  const resolved = resolveResilienceSettings({
    resilienceSettings: { streamStallCooldown: { enabled: true } },
  });
  assert.equal(resolved.streamStallCooldown.enabled, true);
});

test("mergeResilienceSettings applies and keeps the setting", () => {
  const enabled = mergeResilienceSettings(structuredClone(DEFAULT_RESILIENCE_SETTINGS), {
    streamStallCooldown: { enabled: true },
  });
  assert.equal(enabled.streamStallCooldown.enabled, true);

  const untouched = mergeResilienceSettings(enabled, { comboCooldownWait: { maxWaitMs: 2000 } });
  assert.equal(untouched.streamStallCooldown.enabled, true);
});

test("PATCH /api/resilience schema accepts streamStallCooldown on its own", () => {
  assert.equal(
    updateResilienceSchema.safeParse({ streamStallCooldown: { enabled: true } }).success,
    true
  );
  assert.equal(
    updateResilienceSchema.safeParse({ streamStallCooldown: { enabled: "yes" } }).success,
    false
  );
  assert.equal(
    updateResilienceSchema.safeParse({ streamStallCooldown: { enabled: true, extra: 1 } }).success,
    false
  );
});
