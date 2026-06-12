import test from "node:test";
import assert from "node:assert/strict";
import {
  shouldUseFallback,
  isEmergencyFallbackEnvEnabled,
  EMERGENCY_FALLBACK_CONFIG,
} from "../../../open-sse/services/emergencyFallback.ts";

function withEnv(value: string | undefined, fn: () => void) {
  const previous = process.env.OMNIROUTE_EMERGENCY_FALLBACK;
  if (value === undefined) {
    delete process.env.OMNIROUTE_EMERGENCY_FALLBACK;
  } else {
    process.env.OMNIROUTE_EMERGENCY_FALLBACK = value;
  }
  try {
    fn();
  } finally {
    if (previous === undefined) {
      delete process.env.OMNIROUTE_EMERGENCY_FALLBACK;
    } else {
      process.env.OMNIROUTE_EMERGENCY_FALLBACK = previous;
    }
  }
}

test("emergency fallback stays enabled when the env switch is unset (default behavior)", () => {
  withEnv(undefined, () => {
    assert.equal(isEmergencyFallbackEnvEnabled(), true);
    const decision = shouldUseFallback(402, "", false);
    assert.equal(decision.shouldFallback, true);
    if (decision.shouldFallback) {
      assert.equal(decision.provider, EMERGENCY_FALLBACK_CONFIG.provider);
      assert.equal(decision.model, EMERGENCY_FALLBACK_CONFIG.model);
    }
  });
});

test("budget keywords trigger fallback when the env switch is unset", () => {
  withEnv(undefined, () => {
    const decision = shouldUseFallback(429, "All accounts quota exceeded", false);
    assert.equal(decision.shouldFallback, true);
  });
});

test("OMNIROUTE_EMERGENCY_FALLBACK=false disables the 402 redirect", () => {
  withEnv("false", () => {
    assert.equal(isEmergencyFallbackEnvEnabled(), false);
    const decision = shouldUseFallback(402, "", false);
    assert.equal(decision.shouldFallback, false);
    assert.match(decision.reason, /OMNIROUTE_EMERGENCY_FALLBACK/);
  });
});

test("OMNIROUTE_EMERGENCY_FALLBACK=0 disables the budget-keyword redirect", () => {
  withEnv("0", () => {
    const decision = shouldUseFallback(429, "quota exceeded for account", false);
    assert.equal(decision.shouldFallback, false);
    assert.match(decision.reason, /OMNIROUTE_EMERGENCY_FALLBACK/);
  });
});

test("explicit truthy values keep the fallback enabled", () => {
  withEnv("true", () => {
    assert.equal(isEmergencyFallbackEnvEnabled(), true);
    assert.equal(shouldUseFallback(402, "", false).shouldFallback, true);
  });
});

test("env switch does not override config.enabled=false", () => {
  withEnv("true", () => {
    const decision = shouldUseFallback(402, "", false, {
      ...EMERGENCY_FALLBACK_CONFIG,
      enabled: false,
    });
    assert.equal(decision.shouldFallback, false);
  });
});

test("tool-bearing requests are still skipped regardless of env switch", () => {
  withEnv(undefined, () => {
    const decision = shouldUseFallback(402, "", true);
    assert.equal(decision.shouldFallback, false);
    assert.match(decision.reason, /tools/);
  });
});
