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

test("request-scoped failed-response 502 does not exhaust the connection", () => {
  const s = sets();
  const exhausted = applyComboTargetExhaustion(target(), {
    ...baseOpts,
    result: { status: 502, headers: null },
    fallbackResult: {},
    errorText: "upstream reported a failed response without usable output",
    structuredError: {
      code: "upstream_response_failed",
      type: "upstream_response_error",
    },
    sets: s,
  });

  assert.equal(exhausted, false);
  assert.equal(s.exhaustedProviders.size, 0);
  assert.equal(s.exhaustedConnections.size, 0);
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

test("does NOT mark provider exhausted for per-model-quota providers (different model)", () => {
  const s = sets();
  const exhausted = applyComboTargetExhaustion(target({ provider: "gemini" }), {
    ...baseOpts,
    result: { status: 429 },
    fallbackResult: { reason: "quota_exhausted" },
    errorText: "quota exceeded for model gpt-4",
    sets: s,
  });
  assert.equal(exhausted, false);
  assert.equal(s.exhaustedProviders.has("gemini"), false);
  assert.ok(s.transientRateLimitedProviders.has("gemini"));
});

test("does NOT mark provider exhausted for empty provider strings", () => {
  const s = sets();
  const exhausted = applyComboTargetExhaustion(target({ provider: "" }), {
    ...baseOpts,
    result: { status: 503 },
    fallbackResult: { error: { code: "quota_exhausted" } },
    errorText: "quota exhausted",
    allAccountsRateLimited: true,
    sets: s,
  });
  assert.equal(exhausted, false);
});

test("does NOT mark transientRateLimited on 429 when isTokenLimitBreach is true", () => {
  const s = sets();
  const exhausted = applyComboTargetExhaustion(target(), {
    ...baseOpts,
    result: { status: 429 },
    fallbackResult: {},
    errorText: "Token limit exceeded",
    isTokenLimitBreach: true,
    sets: s,
  });
  assert.equal(exhausted, false);
  assert.equal(s.transientRateLimitedProviders.has("test-dedup-provider"), false);
  assert.equal(s.exhaustedProviders.has("test-dedup-provider"), false);
});

test("does NOT mark anything for circuit-open (X-OmniRoute-Provider-Breaker header)", () => {
  const s = sets();
  const exhausted = applyComboTargetExhaustion(target(), {
    ...baseOpts,
    result: { status: 503, headers: new Map([["x-omniroute-provider-breaker", "open"]]) },
    fallbackResult: {},
    errorText: "",
    sets: s,
  });
  assert.equal(exhausted, false);
  assert.equal(s.exhaustedProviders.has("test-dedup-provider"), false);
  assert.equal(s.exhaustedConnections.has("test-dedup-provider:conn-1"), false);
  assert.equal(s.transientRateLimitedProviders.has("test-dedup-provider"), false);
});

test("does NOT mark exhaustion for non-connection-level status codes (400)", () => {
  const s = sets();
  const exhausted = applyComboTargetExhaustion(target(), {
    ...baseOpts,
    result: { status: 400 },
    fallbackResult: {},
    errorText: "Bad Request",
    sets: s,
  });
  assert.equal(exhausted, false);
  assert.equal(s.exhaustedConnections.size, 0);
  assert.equal(s.exhaustedProviders.size, 0);
  assert.equal(s.transientRateLimitedProviders.size, 0);
});

test("does NOT mark connection exhausted for per-model-quota provider on 500 (gemini model-level error)", () => {
  const s = sets();
  const exhausted = applyComboTargetExhaustion(
    target({ provider: "gemini", connectionId: "gemini-conn-1" }),
    {
      ...baseOpts,
      result: { status: 500 },
      fallbackResult: {},
      errorText: "Internal error encountered.",
      rawModel: "gemma-4-31b-it",
      sets: s,
    }
  );
  assert.equal(exhausted, false);
  assert.equal(s.exhaustedProviders.has("gemini"), false);
  assert.equal(s.exhaustedConnections.has("gemini:gemini-conn-1"), false);
  assert.equal(s.transientRateLimitedProviders.has("gemini"), false);
});

// Sanitized Gemini 500 response — model-level "Internal error encountered" should NOT exhaust
// the connection, allowing sibling models on the same provider to be tried.
test("gemini 500 INTERNAL (sanitized real response) does NOT exhaust connection — sibling retry", () => {
  const s = sets();
  const exhausted = applyComboTargetExhaustion(
    target({ provider: "gemini", connectionId: "gemini-key-abc" }),
    {
      ...baseOpts,
      result: { status: 500 },
      fallbackResult: {},
      errorText: "Internal error encountered.",
      rawModel: "gemma-4-31b-it",
      structuredError: { code: 500, status: "INTERNAL", message: "Internal error encountered." },
      sets: s,
    }
  );
  assert.equal(exhausted, false, "providerExhausted must be false");
  assert.equal(s.exhaustedProviders.has("gemini"), false, "must not exhaust provider");
  assert.equal(
    s.exhaustedConnections.has("gemini:gemini-key-abc"),
    false,
    "must not exhaust connection — sibling model may succeed"
  );
  assert.equal(s.transientRateLimitedProviders.has("gemini"), false);
});

// Non-500 connection-level errors MUST exhaust the connection even for per-model-quota providers.
// A 503 (Service Unavailable) means the upstream is down — retrying sibling models wastes calls.
test("gemini 503 DOES exhaust connection (upstream down, not model-level)", () => {
  const s = sets();
  const exhausted = applyComboTargetExhaustion(
    target({ provider: "gemini", connectionId: "gemini-key-abc" }),
    {
      ...baseOpts,
      result: { status: 503 },
      fallbackResult: {},
      errorText: "The service is currently unavailable.",
      rawModel: "gemma-4-31b-it",
      sets: s,
    }
  );
  assert.equal(exhausted, false, "providerExhausted is false (not quota)");
  assert.equal(
    s.exhaustedConnections.has("gemini:gemini-key-abc"),
    true,
    "503 must exhaust connection — upstream is down"
  );
  assert.equal(s.exhaustedProviders.size, 0);
});

test("gemini 502 DOES exhaust connection (bad gateway)", () => {
  const s = sets();
  const exhausted = applyComboTargetExhaustion(
    target({ provider: "gemini", connectionId: "gemini-key-abc" }),
    {
      ...baseOpts,
      result: { status: 502 },
      fallbackResult: {},
      errorText: "Bad Gateway",
      rawModel: "gemma-4-31b-it",
      sets: s,
    }
  );
  assert.equal(exhausted, false);
  assert.equal(s.exhaustedConnections.has("gemini:gemini-key-abc"), true);
});

test("gemini 504 DOES exhaust connection (gateway timeout)", () => {
  const s = sets();
  applyComboTargetExhaustion(target({ provider: "gemini", connectionId: "gemini-key-abc" }), {
    ...baseOpts,
    result: { status: 504 },
    fallbackResult: {},
    errorText: "Gateway Timeout",
    rawModel: "gemini-2.0-flash",
    sets: s,
  });
  assert.equal(s.exhaustedConnections.has("gemini:gemini-key-abc"), true);
});

test("gemini 408 DOES exhaust connection (request timeout)", () => {
  const s = sets();
  applyComboTargetExhaustion(target({ provider: "gemini", connectionId: "gemini-key-abc" }), {
    ...baseOpts,
    result: { status: 408 },
    fallbackResult: {},
    errorText: "Request Timeout",
    rawModel: "gemini-2.0-flash",
    sets: s,
  });
  assert.equal(s.exhaustedConnections.has("gemini:gemini-key-abc"), true);
});

test("gemini 524 DOES exhaust connection (cloudflare timeout)", () => {
  const s = sets();
  applyComboTargetExhaustion(target({ provider: "gemini", connectionId: "gemini-key-abc" }), {
    ...baseOpts,
    result: { status: 524 },
    fallbackResult: {},
    errorText: "A Timeout Occurred",
    rawModel: "gemini-2.0-flash",
    sets: s,
  });
  assert.equal(s.exhaustedConnections.has("gemini:gemini-key-abc"), true);
});

// #8133/#8137: auth-level failures (401/403) mean THAT connection's credentials are bad.
// When the target carries a connectionId, only that connection is marked exhausted — sibling
// connections on the same provider must stay eligible (#8137: whole-provider exhaustion wrongly
// skipped healthy sibling connections). Only fall back to whole-provider exhaustion when no
// connectionId is available.
test("401 auth failure marks only that connection exhausted, not the whole provider (#8137)", () => {
  const s = sets();
  const exhausted = applyComboTargetExhaustion(target(), {
    ...baseOpts,
    result: { status: 401 },
    fallbackResult: {},
    errorText: "Missing API key.",
    sets: s,
  });
  assert.equal(exhausted, true);
  assert.equal(
    s.exhaustedProviders.size,
    0,
    "must NOT exhaust the whole provider when a connectionId is present"
  );
  assert.ok(
    s.exhaustedConnections.has("test-dedup-provider:conn-1"),
    "must exhaust the specific connection"
  );
  assert.equal(s.transientRateLimitedProviders.size, 0);
});

test("403 forbidden marks only that connection exhausted, not the whole provider (#8137)", () => {
  const s = sets();
  const exhausted = applyComboTargetExhaustion(target(), {
    ...baseOpts,
    result: { status: 403 },
    fallbackResult: {},
    errorText: "Forbidden.",
    sets: s,
  });
  assert.equal(exhausted, true);
  assert.equal(s.exhaustedProviders.size, 0);
  assert.ok(s.exhaustedConnections.has("test-dedup-provider:conn-1"));
});

test("401 without a connectionId falls back to whole-provider exhaustion (#8133)", () => {
  const s = sets();
  const exhausted = applyComboTargetExhaustion(target({ connectionId: null }), {
    ...baseOpts,
    result: { status: 401 },
    fallbackResult: {},
    errorText: "Missing API key.",
    sets: s,
  });
  assert.equal(exhausted, true);
  assert.ok(
    s.exhaustedProviders.has("test-dedup-provider"),
    "no connectionId to scope to — must fall back to whole-provider"
  );
  assert.equal(s.exhaustedConnections.size, 0);
});

test("401 on unknown provider does NOT mark anything (guard)", () => {
  const s = sets();
  const exhausted = applyComboTargetExhaustion(target({ provider: "unknown" }), {
    ...baseOpts,
    result: { status: 401 },
    fallbackResult: {},
    errorText: "Missing API key.",
    sets: s,
  });
  assert.equal(exhausted, false, "unknown provider must not be marked exhausted");
  assert.equal(s.exhaustedProviders.size, 0);
  assert.equal(s.exhaustedConnections.size, 0);
});

test("401 on per-model-quota provider marks only the failing connection (auth is connection-scoped, not model-specific)", () => {
  const s = sets();
  const exhausted = applyComboTargetExhaustion(
    target({ provider: "gemini", connectionId: "gemini-conn-1" }),
    {
      ...baseOpts,
      result: { status: 401 },
      fallbackResult: {},
      errorText: "Missing API key.",
      rawModel: "gemini-2.0-flash",
      sets: s,
    }
  );
  assert.equal(exhausted, true);
  assert.equal(s.exhaustedProviders.size, 0, "must not exhaust the whole provider");
  assert.ok(
    s.exhaustedConnections.has("gemini:gemini-conn-1"),
    "auth failure is scoped to the failing connection"
  );
});

// #8137 regression: a SIBLING connection on the SAME provider must NOT be skipped when a
// DIFFERENT connection on that provider returned 401/403 — proves the fix at the call-site
// level (getExhaustedTargetSkipReason-style check), not just the raw Set contents above.
test("sibling connection on the same provider is NOT skipped after a different connection's 401 (#8137)", () => {
  const s = sets();
  const failingTarget = target({ provider: "test-dedup-provider", connectionId: "conn-1" });
  const siblingTarget = target({ provider: "test-dedup-provider", connectionId: "conn-2" });

  applyComboTargetExhaustion(failingTarget, {
    ...baseOpts,
    result: { status: 401 },
    fallbackResult: {},
    errorText: "Missing API key.",
    sets: s,
  });

  // Whole-provider check (what the OLD buggy code would have used) must be false.
  assert.equal(s.exhaustedProviders.has(siblingTarget.provider), false);
  // Connection-level check for the sibling's OWN connection must also be false — it was never
  // marked, so combo routing must still consider it eligible.
  assert.equal(
    s.exhaustedConnections.has(`${siblingTarget.provider}:${siblingTarget.connectionId}`),
    false,
    "sibling connection must remain eligible after a different connection's auth failure"
  );
  // The failing connection itself IS marked.
  assert.ok(s.exhaustedConnections.has(`${failingTarget.provider}:${failingTarget.connectionId}`));
});
