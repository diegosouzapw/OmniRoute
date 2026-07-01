// tests/unit/combo/combo-target-exhaustion.test.ts
// Characterization of applyComboTargetExhaustion — the de-duplicated #1731/#1731v2 upstream-error
// → exhaustion-set classification shared by both combo dispatchers. Locks the SET mutations
// (which drive same-request target skipping) and the providerExhausted return.
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  applyComboTargetExhaustion,
  type ComboExhaustionSets,
} from "../../../open-sse/services/combo/targetExhaustion.ts";

const log = { info() {}, warn() {}, error() {}, debug() {} };

function sets(): ComboExhaustionSets {
  return {
    exhaustedProviders: new Set<string>(),
    exhaustedConnections: new Set<string>(),
    transientRateLimitedProviders: new Set<string>(),
  };
}

function target(overrides: Record<string, unknown> = {}) {
  return {
    kind: "model",
    executionKey: "ek",
    modelStr: "test-dedup-provider/m1",
    provider: "test-dedup-provider",
    providerId: null,
    connectionId: "conn-1",
    ...overrides,
  } as Parameters<typeof applyComboTargetExhaustion>[0];
}

const baseOpts = {
  errorText: "plain upstream error",
  rawModel: "m1",
  isTokenLimitBreach: false,
  allAccountsRateLimited: false,
  log,
  tag: "COMBO",
  exhaustedLogLevel: "info" as const,
};

test("marks provider exhausted when the fallback result signals quota exhaustion", () => {
  const s = sets();
  const exhausted = applyComboTargetExhaustion(target(), {
    ...baseOpts,
    result: { status: 429 },
    fallbackResult: { creditsExhausted: true },
    sets: s,
  });
  assert.equal(exhausted, true);
  assert.ok(s.exhaustedProviders.has("test-dedup-provider"));
  assert.equal(s.transientRateLimitedProviders.size, 0);
});

test("round-robin's allAccountsRateLimited term also marks the provider exhausted", () => {
  const s = sets();
  const exhausted = applyComboTargetExhaustion(target(), {
    ...baseOpts,
    result: { status: 503 },
    fallbackResult: {},
    allAccountsRateLimited: true,
    sets: s,
  });
  assert.equal(exhausted, true);
  assert.ok(s.exhaustedProviders.has("test-dedup-provider"));
});

test("a transient 429 (not exhausted) marks the provider rate-limited, not exhausted", () => {
  const s = sets();
  const exhausted = applyComboTargetExhaustion(target(), {
    ...baseOpts,
    result: { status: 429 },
    fallbackResult: {},
    sets: s,
  });
  assert.equal(exhausted, false);
  assert.ok(s.transientRateLimitedProviders.has("test-dedup-provider"));
  assert.equal(s.exhaustedProviders.size, 0);
});

test("connection-level 5xx with a connectionId poisons exhaustedConnections (#1731v2)", () => {
  const s = sets();
  const exhausted = applyComboTargetExhaustion(target(), {
    ...baseOpts,
    result: { status: 502, headers: null },
    fallbackResult: {},
    sets: s,
  });
  assert.equal(exhausted, false);
  assert.ok(s.exhaustedConnections.has("test-dedup-provider:conn-1"));
  assert.equal(s.exhaustedProviders.size, 0);
});

test("connection-level 5xx without a connectionId poisons exhaustedProviders (#1731)", () => {
  const s = sets();
  applyComboTargetExhaustion(target({ connectionId: null }), {
    ...baseOpts,
    result: { status: 503, headers: null },
    fallbackResult: {},
    sets: s,
  });
  assert.ok(s.exhaustedProviders.has("test-dedup-provider"));
  assert.equal(s.exhaustedConnections.size, 0);
});

test("an unknown provider is never marked (guard)", () => {
  const s = sets();
  applyComboTargetExhaustion(target({ provider: "unknown" }), {
    ...baseOpts,
    result: { status: 502, headers: null },
    fallbackResult: { creditsExhausted: true },
    allAccountsRateLimited: true,
    sets: s,
  });
  assert.equal(s.exhaustedProviders.size, 0);
  assert.equal(s.exhaustedConnections.size, 0);
});

test("structuredError.code takes precedence over raw errorText for exhaustion classification", () => {
  const s = sets();
  const exhausted = applyComboTargetExhaustion(target(), {
    ...baseOpts,
    errorText: "Resource has been exhausted (e.g. check quota).",
    result: { status: 429 },
    fallbackResult: {},
    sets: s,
    structuredError: { code: "rate_limit_exceeded" },
  });
  assert.equal(exhausted, false, "rate_limit_exceeded should NOT mark provider exhausted");
  assert.ok(
    s.transientRateLimitedProviders.has("test-dedup-provider"),
    "should be in transientRateLimitedProviders"
  );
});

test("structuredError.code with non-matching value falls back to classifyErrorText behavior", () => {
  const s = sets();
  const exhausted = applyComboTargetExhaustion(target(), {
    ...baseOpts,
    errorText: "Rate limit reached",
    result: { status: 429 },
    fallbackResult: {},
    sets: s,
    structuredError: { code: "some_unknown_code" },
  });
  assert.equal(exhausted, false, "unknown code + non-quota errorText → not exhausted");
  assert.ok(
    s.transientRateLimitedProviders.has("test-dedup-provider"),
    "should be in transientRateLimitedProviders"
  );
});

test("a 200/benign status with no exhaustion mutates nothing and returns false", () => {
  const s = sets();
  const exhausted = applyComboTargetExhaustion(target(), {
    ...baseOpts,
    result: { status: 200 },
    fallbackResult: {},
    sets: s,
  });
  assert.equal(exhausted, false);
  assert.equal(
    s.exhaustedProviders.size + s.exhaustedConnections.size + s.transientRateLimitedProviders.size,
    0
  );
});
