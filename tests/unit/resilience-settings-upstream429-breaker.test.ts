import { test } from "node:test";
import assert from "node:assert/strict";
import {
  DEFAULT_RESILIENCE_SETTINGS,
  mergeResilienceSettings,
  resolveResilienceSettings,
  type ResilienceSettings,
} from "../../src/lib/resilience/settings.ts";

function cloneDefaults(): ResilienceSettings {
  // structuredClone is enough for the plain-object settings shape.
  return structuredClone(DEFAULT_RESILIENCE_SETTINGS);
}

test("defaults: useUpstream429BreakerHints omitted (undefined) on both profiles", () => {
  const settings = cloneDefaults();
  assert.equal(settings.connectionCooldown.oauth.useUpstream429BreakerHints, undefined);
  assert.equal(settings.connectionCooldown.apikey.useUpstream429BreakerHints, undefined);
});

test("mergeResilienceSettings: explicit true is stored", () => {
  const current = cloneDefaults();
  const next = mergeResilienceSettings(current, {
    connectionCooldown: { oauth: { useUpstream429BreakerHints: true } },
  });
  assert.equal(next.connectionCooldown.oauth.useUpstream429BreakerHints, true);
  // apikey unchanged
  assert.equal(next.connectionCooldown.apikey.useUpstream429BreakerHints, undefined);
});

test("mergeResilienceSettings: explicit false is stored", () => {
  const current = cloneDefaults();
  const next = mergeResilienceSettings(current, {
    connectionCooldown: { apikey: { useUpstream429BreakerHints: false } },
  });
  assert.equal(next.connectionCooldown.apikey.useUpstream429BreakerHints, false);
});

test("mergeResilienceSettings: null sentinel deletes the field (back to undefined)", () => {
  // Start with explicit false on oauth
  const start = mergeResilienceSettings(cloneDefaults(), {
    connectionCooldown: { oauth: { useUpstream429BreakerHints: false } },
  });
  assert.equal(start.connectionCooldown.oauth.useUpstream429BreakerHints, false);
  // PATCH with null should reset to undefined
  const next = mergeResilienceSettings(start, {
    connectionCooldown: {
      oauth: { useUpstream429BreakerHints: null as unknown as boolean },
    },
  });
  assert.equal(next.connectionCooldown.oauth.useUpstream429BreakerHints, undefined);
  // Key should not appear in JSON
  const serialized = JSON.parse(JSON.stringify(next.connectionCooldown.oauth));
  assert.equal(
    "useUpstream429BreakerHints" in serialized,
    false,
    "key should be absent in serialized JSON"
  );
});

test("mergeResilienceSettings: omitted key (partial-merge) leaves existing value", () => {
  // Start with explicit true on apikey
  const start = mergeResilienceSettings(cloneDefaults(), {
    connectionCooldown: { apikey: { useUpstream429BreakerHints: true } },
  });
  // PATCH oauth only — apikey must keep its value
  const next = mergeResilienceSettings(start, {
    connectionCooldown: { oauth: { baseCooldownMs: 5000 } },
  });
  assert.equal(next.connectionCooldown.apikey.useUpstream429BreakerHints, true);
});

test("resolveResilienceSettings: omitted field in record stays undefined (no toBoolean coercion)", () => {
  const record = {
    connectionCooldown: {
      oauth: { baseCooldownMs: 1000, useUpstreamRetryHints: true, maxBackoffSteps: 5 },
      apikey: { baseCooldownMs: 2000, useUpstreamRetryHints: false, maxBackoffSteps: 3 },
    },
  };
  const resolved = resolveResilienceSettings(
    record as Parameters<typeof resolveResilienceSettings>[0]
  );
  assert.equal(resolved.connectionCooldown.oauth.useUpstream429BreakerHints, undefined);
  assert.equal(resolved.connectionCooldown.apikey.useUpstream429BreakerHints, undefined);
});

test("mixed-provider round-trip: oauth=false + apikey=true survives merge", () => {
  const next = mergeResilienceSettings(cloneDefaults(), {
    connectionCooldown: {
      oauth: { useUpstream429BreakerHints: false },
      apikey: { useUpstream429BreakerHints: true },
    },
  });
  assert.equal(next.connectionCooldown.oauth.useUpstream429BreakerHints, false);
  assert.equal(next.connectionCooldown.apikey.useUpstream429BreakerHints, true);
});
