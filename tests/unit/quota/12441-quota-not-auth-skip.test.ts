/**
 * #12441 — credits-exhausted / quota bodies restated as HTTP 401 must not
 * take the combo AUTH_LEVEL skip path (#8133 authentication expired).
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  applyComboTargetExhaustion,
  isQuotaOrCreditsError,
  type ComboExhaustionSets,
} from "../../../open-sse/services/combo/targetExhaustion.ts";

function emptySets(): ComboExhaustionSets {
  return {
    exhaustedProviders: new Set<string>(),
    exhaustedConnections: new Set<string>(),
    transientRateLimitedProviders: new Set<string>(),
  };
}

const log = { info() {}, warn() {}, error() {}, debug() {} };

function chutesTarget() {
  return {
    kind: "model",
    executionKey: "ek",
    modelStr: "chutes/moonshotai/Kimi-K3-TEE",
    provider: "chutes",
    providerId: null,
    connectionId: "conn-chutes-1",
  } as Parameters<typeof applyComboTargetExhaustion>[0];
}

test("#12441 isQuotaOrCreditsError detects credits-exhausted 401 bodies", () => {
  assert.equal(
    isQuotaOrCreditsError(
      "[chutes] All 3 connection(s) credits exhausted — please reconnect in the dashboard"
    ),
    true
  );
  assert.equal(
    isQuotaOrCreditsError(
      "[claude] All 1 connection(s) authentication expired — please reconnect in the dashboard"
    ),
    false
  );
});

test("#12441 isQuotaOrCreditsError still matches quota text when structuredError.code is non-quota", () => {
  assert.equal(
    isQuotaOrCreditsError("generic upstream failure", {
      code: "invalid_request",
      type: "api_error",
      message: "You've reached your usage limit for this billing cycle",
    }),
    true
  );
  assert.equal(
    isQuotaOrCreditsError(
      "[chutes] All 3 connection(s) credits exhausted — please reconnect in the dashboard",
      { code: "unauthorized", type: "auth_error" }
    ),
    true
  );
  assert.equal(
    isQuotaOrCreditsError("generic upstream failure", {
      code: "unauthorized",
      message: "authentication expired",
    }),
    false
  );
});

test("#12441 credits-exhausted HTTP 401 does not mark auth-level connection skip", () => {
  const s = emptySets();
  const exhausted = applyComboTargetExhaustion(chutesTarget(), {
    result: { status: 401 },
    fallbackResult: {},
    errorText: "[chutes] All 3 connection(s) credits exhausted — please reconnect in the dashboard",
    rawModel: "moonshotai/Kimi-K3-TEE",
    isTokenLimitBreach: false,
    allAccountsRateLimited: false,
    requestScopedFailure: false,
    sets: s,
    log,
    tag: "COMBO",
    exhaustedLogLevel: "info",
  });
  assert.equal(exhausted, false);
  assert.equal(s.exhaustedConnections.has("chutes:conn-chutes-1"), false);
  assert.equal(s.exhaustedProviders.has("chutes"), false);
});

test("#12441 structuredError quota message with a non-quota code does not auth-skip", () => {
  const s = emptySets();
  const exhausted = applyComboTargetExhaustion(chutesTarget(), {
    result: { status: 401 },
    fallbackResult: {},
    errorText: "generic upstream failure",
    rawModel: "moonshotai/Kimi-K3-TEE",
    isTokenLimitBreach: false,
    allAccountsRateLimited: false,
    requestScopedFailure: false,
    sets: s,
    log,
    tag: "COMBO",
    exhaustedLogLevel: "info",
    structuredError: {
      code: "invalid_request",
      message: "You've reached your usage limit for this billing cycle",
    },
  });
  assert.equal(exhausted, false);
  assert.equal(s.exhaustedConnections.has("chutes:conn-chutes-1"), false);
});

test("#12441 real authentication expired 401 still marks the connection", () => {
  const s = emptySets();
  const exhausted = applyComboTargetExhaustion(chutesTarget(), {
    result: { status: 401 },
    fallbackResult: {},
    errorText:
      "[claude] All 1 connection(s) authentication expired — please reconnect in the dashboard",
    rawModel: "claude-opus-4-8",
    isTokenLimitBreach: false,
    allAccountsRateLimited: false,
    requestScopedFailure: false,
    sets: s,
    log,
    tag: "COMBO",
    exhaustedLogLevel: "info",
  });
  assert.equal(exhausted, true);
  assert.equal(s.exhaustedConnections.has("chutes:conn-chutes-1"), true);
});

function quotaTarget() {
  return {
    kind: "model",
    executionKey: "ek",
    modelStr: "test-dedup-provider/m1",
    provider: "test-dedup-provider",
    providerId: null,
    connectionId: "conn-1",
  } as Parameters<typeof applyComboTargetExhaustion>[0];
}

test("#12441 credits-exhausted 401 on a non-passthrough provider takes quota skip (#1731) not auth skip (#8133)", () => {
  const s = emptySets();
  const exhausted = applyComboTargetExhaustion(quotaTarget(), {
    result: { status: 401 },
    fallbackResult: {},
    errorText: "[chutes] All 3 connection(s) credits exhausted — please reconnect in the dashboard",
    rawModel: "m1",
    isTokenLimitBreach: false,
    allAccountsRateLimited: false,
    requestScopedFailure: false,
    sets: s,
    log,
    tag: "COMBO",
    exhaustedLogLevel: "info",
  });
  assert.equal(exhausted, true);
  assert.equal(
    s.exhaustedConnections.has("test-dedup-provider:conn-1"),
    false,
    "must not take the #8133 auth-level connection skip"
  );
  assert.equal(
    s.exhaustedProviders.has("test-dedup-provider"),
    true,
    "quota body restated as 401 must still follow #1731 provider skip"
  );
});
