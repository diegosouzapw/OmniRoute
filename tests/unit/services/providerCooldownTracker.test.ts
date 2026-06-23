import test from "node:test";
import assert from "node:assert/strict";
import {
  recordProviderCooldown,
  isProviderInCooldown,
  getRemainingCooldownMs,
  recordProviderSuccess,
  clearCooldownState,
  getCooldownEntryCount,
  cleanupExpiredCooldownEntries,
} from "../../../open-sse/services/providerCooldownTracker.ts";
import {
  resolveResilienceSettings,
  DEFAULT_RESILIENCE_SETTINGS,
} from "../../../src/lib/resilience/settings.ts";

test("global provider cooldown is OFF by default (opt-in)", () => {
  // This global cross-request cooldown overlaps the existing Connection Cooldown
  // / Provider Circuit Breaker layers, so it must default to disabled. Operators
  // opt in via PROVIDER_COOLDOWN_ENABLED=true.
  assert.equal(DEFAULT_RESILIENCE_SETTINGS.providerCooldown.enabled, false);
  // resolving with no stored settings inherits the default (disabled).
  assert.equal(resolveResilienceSettings(null).providerCooldown.enabled, false);
  // an explicit stored value still wins.
  assert.equal(
    resolveResilienceSettings({ resilienceSettings: { providerCooldown: { enabled: true } } })
      .providerCooldown.enabled,
    true
  );
});

function makeSettings(minMs = 5000, maxMs = 300000) {
  return resolveResilienceSettings({
    resilienceSettings: {
      providerCooldown: {
        enabled: true,
        minRetryCooldownMs: minMs,
        maxRetryCooldownMs: maxMs,
      },
    },
  });
}

test.beforeEach(() => {
  clearCooldownState();
});

test("recordProviderCooldown creates entry for new provider", () => {
  const settings = makeSettings();
  recordProviderCooldown("openai", "conn-1", settings);

  assert.equal(getCooldownEntryCount(), 1);
  assert.ok(isProviderInCooldown("openai", "conn-1", settings));
});

test("recordProviderCooldown increments failure count", () => {
  const settings = makeSettings();
  recordProviderCooldown("openai", "conn-1", settings);
  recordProviderCooldown("openai", "conn-1", settings);
  recordProviderCooldown("openai", "conn-1", settings);

  assert.equal(getCooldownEntryCount(), 1);
  assert.ok(isProviderInCooldown("openai", "conn-1", settings));
});

test("isProviderInCooldown returns false for unknown provider", () => {
  const settings = makeSettings();
  assert.equal(isProviderInCooldown("unknown", "conn-1", settings), false);
});

test("isProviderInCooldown returns false for empty provider", () => {
  const settings = makeSettings();
  assert.equal(isProviderInCooldown("", "conn-1", settings), false);
});

test("isProviderInCooldown returns false when not recorded", () => {
  const settings = makeSettings();
  assert.equal(isProviderInCooldown("openai", "conn-1", settings), false);
});

test("getRemainingCooldownMs returns 0 for unknown provider", () => {
  const settings = makeSettings();
  assert.equal(getRemainingCooldownMs("unknown", "conn-1", settings), 0);
});

test("getRemainingCooldownMs returns 0 when not recorded", () => {
  const settings = makeSettings();
  assert.equal(getRemainingCooldownMs("openai", "conn-1", settings), 0);
});

test("recordProviderSuccess resets failure count", () => {
  const settings = makeSettings();
  recordProviderCooldown("openai", "conn-1", settings);
  recordProviderCooldown("openai", "conn-1", settings);
  assert.ok(isProviderInCooldown("openai", "conn-1", settings));

  recordProviderSuccess("openai", "conn-1");
  assert.equal(isProviderInCooldown("openai", "conn-1", settings), false);
});

test("recordProviderSuccess does nothing for unknown provider", () => {
  recordProviderSuccess("unknown", "conn-1");
  assert.equal(getCooldownEntryCount(), 0);
});

test("clearCooldownState removes all entries", () => {
  const settings = makeSettings();
  recordProviderCooldown("openai", "conn-1", settings);
  recordProviderCooldown("anthropic", "conn-2", settings);
  assert.equal(getCooldownEntryCount(), 2);

  clearCooldownState();
  assert.equal(getCooldownEntryCount(), 0);
});

test("cooldown scales exponentially with failure count", () => {
  const settings = makeSettings(5000);

  recordProviderCooldown("openai", "conn-1", settings);
  const remaining1 = getRemainingCooldownMs("openai", "conn-1", settings);

  recordProviderCooldown("openai", "conn-1", settings);
  const remaining2 = getRemainingCooldownMs("openai", "conn-1", settings);

  recordProviderCooldown("openai", "conn-1", settings);
  const remaining3 = getRemainingCooldownMs("openai", "conn-1", settings);

  assert.ok(remaining1 > 0, "first failure has cooldown");
  assert.ok(remaining2 > remaining1, "second failure has longer cooldown");
  assert.ok(remaining3 > remaining2, "third failure has even longer cooldown");
});

test("cooldown respects maxRetryCooldownMs cap", () => {
  const settings = makeSettings(5000, 20000);

  for (let i = 0; i < 10; i++) {
    recordProviderCooldown("openai", "conn-1", settings);
  }

  const remaining = getRemainingCooldownMs("openai", "conn-1", settings);
  assert.ok(remaining <= 20000, "cooldown capped at maxRetryCooldownMs");
});

test("cleanup keeps entries for configured long maxRetryCooldownMs", () => {
  const settings = makeSettings(5000, 60 * 60 * 1000);
  const originalNow = Date.now;

  try {
    let fakeNow = Date.now();
    Date.now = () => fakeNow;

    recordProviderCooldown("openai", "conn-1", settings);
    assert.equal(getCooldownEntryCount(), 1);

    fakeNow += 31 * 60 * 1000;
    cleanupExpiredCooldownEntries();
    assert.equal(
      getCooldownEntryCount(),
      1,
      "cleanup must not evict entries before configured maxRetryCooldownMs"
    );

    fakeNow += 30 * 60 * 1000;
    cleanupExpiredCooldownEntries();
    assert.equal(getCooldownEntryCount(), 0);
  } finally {
    Date.now = originalNow;
  }
});

test("different connections have independent cooldowns", () => {
  const settings = makeSettings();
  recordProviderCooldown("openai", "conn-1", settings);
  recordProviderCooldown("openai", "conn-2", settings);

  assert.ok(isProviderInCooldown("openai", "conn-1", settings));
  assert.ok(isProviderInCooldown("openai", "conn-2", settings));

  recordProviderSuccess("openai", "conn-1");
  assert.equal(isProviderInCooldown("openai", "conn-1", settings), false);
  assert.ok(isProviderInCooldown("openai", "conn-2", settings));
});

test("provider-only key works without connectionId", () => {
  const settings = makeSettings();
  recordProviderCooldown("openai", undefined, settings);

  assert.ok(isProviderInCooldown("openai", undefined, settings));
  assert.equal(isProviderInCooldown("openai", "conn-1", settings), false);
});

test("cooldown entry count tracks correctly", () => {
  assert.equal(getCooldownEntryCount(), 0);

  const settings = makeSettings();
  recordProviderCooldown("openai", "conn-1", settings);
  assert.equal(getCooldownEntryCount(), 1);

  recordProviderCooldown("anthropic", "conn-2", settings);
  assert.equal(getCooldownEntryCount(), 2);

  clearCooldownState();
  assert.equal(getCooldownEntryCount(), 0);
});
