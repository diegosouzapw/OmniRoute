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

test("provider breaker defaults expose degradation thresholds", () => {
  const settings = cloneDefaults();
  assert.equal(typeof settings.providerBreaker.oauth.degradationThreshold, "number");
  assert.equal(typeof settings.providerBreaker.apikey.degradationThreshold, "number");
  assert.ok(settings.providerBreaker.oauth.degradationThreshold > 0);
  assert.ok(settings.providerBreaker.apikey.degradationThreshold > 0);
});

test("mergeResilienceSettings stores provider breaker degradation thresholds", () => {
  const next = mergeResilienceSettings(cloneDefaults(), {
    providerBreaker: {
      oauth: { degradationThreshold: 4 },
      apikey: { degradationThreshold: 6 },
    },
  });

  assert.equal(next.providerBreaker.oauth.degradationThreshold, 4);
  assert.equal(next.providerBreaker.apikey.degradationThreshold, 6);
});

test("resolveResilienceSettings round-trips stored provider breaker degradation thresholds", () => {
  const resolved = resolveResilienceSettings({
    resilienceSettings: {
      providerBreaker: {
        oauth: { failureThreshold: 8, degradationThreshold: 3, resetTimeoutMs: 60_000 },
        apikey: { failureThreshold: 12, degradationThreshold: 5, resetTimeoutMs: 30_000 },
      },
    },
  });

  assert.equal(resolved.providerBreaker.oauth.failureThreshold, 8);
  assert.equal(resolved.providerBreaker.oauth.degradationThreshold, 3);
  assert.equal(resolved.providerBreaker.oauth.resetTimeoutMs, 60_000);
  assert.equal(resolved.providerBreaker.apikey.failureThreshold, 12);
  assert.equal(resolved.providerBreaker.apikey.degradationThreshold, 5);
  assert.equal(resolved.providerBreaker.apikey.resetTimeoutMs, 30_000);
});
