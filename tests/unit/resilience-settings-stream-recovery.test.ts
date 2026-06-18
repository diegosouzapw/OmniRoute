import { test } from "node:test";
import assert from "node:assert/strict";

import {
  DEFAULT_RESILIENCE_SETTINGS,
  resolveResilienceSettings,
  mergeResilienceSettings,
} from "../../src/lib/resilience/settings.ts";

test("streamRecovery is OFF by default (no STREAM_RECOVERY_ENABLED env in tests)", () => {
  assert.equal(DEFAULT_RESILIENCE_SETTINGS.streamRecovery.enabled, false);
  assert.equal(resolveResilienceSettings(null).streamRecovery.enabled, false);
  assert.equal(resolveResilienceSettings({}).streamRecovery.enabled, false);
});

test("resolveResilienceSettings honors a stored streamRecovery override", () => {
  const resolved = resolveResilienceSettings({
    resilienceSettings: { streamRecovery: { enabled: true } },
  });
  assert.equal(resolved.streamRecovery.enabled, true);
});

test("resolveResilienceSettings ignores a non-boolean enabled value", () => {
  const resolved = resolveResilienceSettings({
    resilienceSettings: { streamRecovery: { enabled: "yes" } },
  });
  assert.equal(
    resolved.streamRecovery.enabled,
    false,
    "non-boolean must fall back to the default, never coerce truthy strings on"
  );
});

test("mergeResilienceSettings toggles streamRecovery and preserves it when omitted", () => {
  const enabled = mergeResilienceSettings(DEFAULT_RESILIENCE_SETTINGS, {
    streamRecovery: { enabled: true },
  });
  assert.equal(enabled.streamRecovery.enabled, true);

  // Omitting the patch key must preserve the current value, not reset it.
  const preserved = mergeResilienceSettings(enabled, { requestQueue: {} });
  assert.equal(preserved.streamRecovery.enabled, true);
});

test("continueMidStream is OFF by default and independent of enabled", () => {
  assert.equal(DEFAULT_RESILIENCE_SETTINGS.streamRecovery.continueMidStream, false);
  assert.equal(resolveResilienceSettings({}).streamRecovery.continueMidStream, false);

  // Early-retry can be on while mid-stream continuation stays off (different risk).
  const onlyEarly = resolveResilienceSettings({
    resilienceSettings: { streamRecovery: { enabled: true } },
  });
  assert.equal(onlyEarly.streamRecovery.enabled, true);
  assert.equal(onlyEarly.streamRecovery.continueMidStream, false);

  const both = resolveResilienceSettings({
    resilienceSettings: { streamRecovery: { enabled: true, continueMidStream: true } },
  });
  assert.equal(both.streamRecovery.continueMidStream, true);
});

test("continueMidStream ignores a non-boolean value", () => {
  const resolved = resolveResilienceSettings({
    resilienceSettings: { streamRecovery: { continueMidStream: "yes" } },
  });
  assert.equal(resolved.streamRecovery.continueMidStream, false);
});
