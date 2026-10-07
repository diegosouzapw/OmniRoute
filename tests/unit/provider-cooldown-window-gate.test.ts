import { test, beforeEach, mock } from "node:test";
import assert from "node:assert";
import {
  recordProviderCooldown,
  isProviderInCooldown,
  getRemainingCooldownMs,
  recordProviderSuccess,
  clearCooldownState,
} from "../../open-sse/services/providerCooldownTracker.ts";
import { PROVIDER_PROFILES } from "../../open-sse/config/constants.ts";
import { DEFAULT_RESILIENCE_SETTINGS } from "../../src/lib/resilience/settings.ts";

// Provider-level entries (no connectionId) must honor the PROVIDER_PROFILES
// window gate: `providerFailureThreshold` failures inside
// `providerFailureWindowMs` put the whole provider in a `providerCooldownMs`
// cooldown — below the threshold the provider must NOT be considered cooling.
// These fields shipped in PROVIDER_PROFILES with no runtime consumer (2026-08-31
// docs audit, P0.1); this suite is the regression guard for wiring them in.
// Connection-level entries keep the pre-existing exponential-backoff behavior.

const settings = DEFAULT_RESILIENCE_SETTINGS;
// "openai" resolves to the apikey category in the provider registry.
const APIKEY = PROVIDER_PROFILES.apikey;

beforeEach(() => {
  clearCooldownState();
});

test("provider-level: below providerFailureThreshold the provider is NOT in cooldown", () => {
  for (let i = 0; i < APIKEY.providerFailureThreshold - 1; i++) {
    recordProviderCooldown("openai", undefined, settings);
  }
  assert.equal(
    isProviderInCooldown("openai", undefined, settings),
    false,
    `expected no provider-level cooldown below the ${APIKEY.providerFailureThreshold}-failure threshold`
  );
  assert.equal(getRemainingCooldownMs("openai", undefined, settings), 0);
});

test("provider-level: reaching providerFailureThreshold trips a providerCooldownMs cooldown", () => {
  for (let i = 0; i < APIKEY.providerFailureThreshold; i++) {
    recordProviderCooldown("openai", undefined, settings);
  }
  assert.equal(isProviderInCooldown("openai", undefined, settings), true);
  const remaining = getRemainingCooldownMs("openai", undefined, settings);
  assert.ok(
    remaining > 0 && remaining <= APIKEY.providerCooldownMs,
    `remaining ${remaining}ms should be within (0, providerCooldownMs=${APIKEY.providerCooldownMs}]`
  );
  assert.ok(
    remaining > APIKEY.providerCooldownMs - 5_000,
    `a freshly tripped cooldown should last ~providerCooldownMs (got ${remaining}ms)`
  );
});

test("provider-level: failures outside providerFailureWindowMs do not count toward the threshold", () => {
  mock.timers.enable({ apis: ["Date"], now: 1_000_000 });
  try {
    // threshold-1 failures, then jump past the window before the next one
    for (let i = 0; i < APIKEY.providerFailureThreshold - 1; i++) {
      recordProviderCooldown("openai", undefined, settings);
    }
    mock.timers.setTime(1_000_000 + APIKEY.providerFailureWindowMs + 60_000);
    recordProviderCooldown("openai", undefined, settings);
    assert.equal(
      isProviderInCooldown("openai", undefined, settings),
      false,
      "stale failures beyond the window must not trip the provider cooldown"
    );
  } finally {
    mock.timers.reset();
  }
});

test("provider-level: the cooldown expires providerCooldownMs after the tripping failure", () => {
  mock.timers.enable({ apis: ["Date"], now: 2_000_000 });
  try {
    for (let i = 0; i < APIKEY.providerFailureThreshold; i++) {
      recordProviderCooldown("openai", undefined, settings);
    }
    assert.equal(isProviderInCooldown("openai", undefined, settings), true);
    mock.timers.setTime(2_000_000 + APIKEY.providerCooldownMs + 1_000);
    assert.equal(
      isProviderInCooldown("openai", undefined, settings),
      false,
      "provider cooldown must expire after providerCooldownMs"
    );
  } finally {
    mock.timers.reset();
  }
});

test("provider-level: recordProviderSuccess clears the failure window", () => {
  for (let i = 0; i < APIKEY.providerFailureThreshold; i++) {
    recordProviderCooldown("openai", undefined, settings);
  }
  assert.equal(isProviderInCooldown("openai", undefined, settings), true);
  recordProviderSuccess("openai", undefined);
  assert.equal(isProviderInCooldown("openai", undefined, settings), false);
  recordProviderCooldown("openai", undefined, settings);
  assert.equal(
    isProviderInCooldown("openai", undefined, settings),
    false,
    "one failure after a success must not re-trip the threshold gate"
  );
});

test("connection-level entries keep the pre-existing backoff behavior (no window gate)", () => {
  recordProviderCooldown("openai", "conn-1", settings);
  assert.equal(
    isProviderInCooldown("openai", "conn-1", settings),
    true,
    "a single connection-level failure still starts the legacy min-cooldown backoff"
  );
  const remaining = getRemainingCooldownMs("openai", "conn-1", settings);
  assert.ok(
    remaining > 0 && remaining <= settings.providerCooldown.minRetryCooldownMs,
    `connection-level cooldown should follow minRetryCooldownMs (got ${remaining}ms)`
  );
});
