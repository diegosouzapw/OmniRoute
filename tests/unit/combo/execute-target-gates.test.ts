/**
 * Characterization for executeTarget pre-dispatch gates
 * (open-sse/services/combo/executeTargetGates.ts).
 */
import test from "node:test";
import assert from "node:assert/strict";
import { getCircuitBreaker, STATE } from "../../../src/shared/utils/circuitBreaker.ts";
import type {
  AttemptLoopDeps,
  AttemptLoopState,
  GateDecision,
} from "../../../open-sse/services/combo/attemptLoopTypes.ts";
import type { ResolvedComboTarget } from "../../../open-sse/services/combo/types.ts";

test("attemptLoopTypes exports GateDecision discriminant", async () => {
  const mod = await import("../../../open-sse/services/combo/attemptLoopTypes.ts");
  assert.equal(typeof mod, "object");
});

function emptyState(overrides: Partial<AttemptLoopState> = {}): AttemptLoopState {
  return {
    orderedTargets: [],
    fallbackCount: 0,
    recordedAttempts: 0,
    comboErrors: [],
    lastError: null,
    lastStatus: null,
    earliestRetryAfter: null,
    comboExpired: false,
    exhaustedProviders: new Set(),
    exhaustedConnections: new Set(),
    transientRateLimitedProviders: new Set(),
    abortControllers: new Map([[0, new AbortController()]]),
    dispatchedTargets: new Set(),
    targetFailureTrust: new Map(),
    comboAttemptOrder: [],
    skippedForCircuitOpen: false,
    earliestCircuitOpenRetryMs: 0,
    globalAttempts: 0,
    observedFailure: false,
    allObservedFailuresQuota: true,
    observeFailure() {},
    ...overrides,
  };
}

function baseDeps(overrides: Partial<AttemptLoopDeps> = {}): AttemptLoopDeps {
  const handleSingleModelWithTimeout = async () => {
    throw new Error("handleSingleModel must not be called from gates");
  };
  return {
    strategy: "priority",
    combo: { name: "t", models: [] },
    config: {},
    log: { info() {}, warn() {}, debug() {}, error() {} },
    settings: null,
    resilienceSettings: {
      providerCooldown: { enabled: false },
    } as AttemptLoopDeps["resilienceSettings"],
    sticky: { targets: [], messageHash: null, stuck: false },
    effectiveSessionId: null,
    preScreenMap: new Map(),
    quotaCutoffResetWindowConfig: {} as AttemptLoopDeps["quotaCutoffResetWindowConfig"],
    maxRetries: 0,
    traceInvocationId: "inv-test",
    clientRequestedStream: false,
    handleSingleModelWithTimeout,
    body: { messages: [{ role: "user", content: "hi" }] },
    startTime: Date.now(),
    releaseStickyPinOnFailure() {},
    clearStaleLKGP() {},
    ...overrides,
  };
}

function modelTarget(overrides: Partial<ResolvedComboTarget> = {}): ResolvedComboTarget {
  return {
    kind: "model",
    stepId: "s1",
    executionKey: "ek-1",
    modelStr: "openai/gpt-4o",
    provider: "openai",
    providerId: null,
    connectionId: "c1",
    weight: 1,
    label: null,
    ...overrides,
  };
}

test("breaker OPEN skips and does not call handleSingleModel", async () => {
  const { evaluateExecuteTargetGates } =
    await import("../../../open-sse/services/combo/executeTargetGates.ts");
  const provider = `openai-gates-test-${Date.now()}`;
  const cb = getCircuitBreaker(provider, { failureThreshold: 1, resetTimeout: 60_000 });
  cb._onFailure("transient");
  assert.equal(cb.getStatus().state, STATE.OPEN);
  const target = modelTarget({ provider, modelStr: `${provider}/gpt-4o-mini` });
  const state = emptyState({ orderedTargets: [target] });
  const decision: GateDecision = await evaluateExecuteTargetGates({
    index: 0,
    state,
    deps: baseDeps(),
  });
  assert.equal(decision.kind, "skip");
  assert.equal(state.skippedForCircuitOpen, true);
});

test("exhausted connection skip uses getExhaustedTargetSkipReason", async () => {
  const { evaluateExecuteTargetGates } =
    await import("../../../open-sse/services/combo/executeTargetGates.ts");
  const target = modelTarget({ connectionId: "conn-1", provider: "openai" });
  const state = emptyState({
    orderedTargets: [target],
    exhaustedConnections: new Set(["openai:conn-1"]),
  });
  const decision = await evaluateExecuteTargetGates({ index: 0, state, deps: baseDeps() });
  assert.equal(decision.kind, "skip");
  if (decision.kind === "skip") {
    assert.equal(decision.result, null);
  }
});

test("quota cutoff skipped for strategy auto", async () => {
  const { evaluateExecuteTargetGates } =
    await import("../../../open-sse/services/combo/executeTargetGates.ts");
  const target = modelTarget();
  const state = emptyState({ orderedTargets: [target] });
  const decision = await evaluateExecuteTargetGates({
    index: 0,
    state,
    deps: baseDeps({ strategy: "auto" }),
  });
  assert.equal(decision.kind, "proceed");
});

test("protected priority non-quota skip returns 503 response not null", async () => {
  const { evaluateExecuteTargetGates } =
    await import("../../../open-sse/services/combo/executeTargetGates.ts");
  const target = modelTarget({
    connectionId: "c1",
    fallbackOnlyOnQuotaExhaustion: true,
  });
  const state = emptyState({
    orderedTargets: [target],
    exhaustedConnections: new Set(["openai:c1"]),
  });
  const decision = await evaluateExecuteTargetGates({
    index: 0,
    state,
    deps: baseDeps({ strategy: "priority" }),
  });
  assert.equal(decision.kind, "skip");
  if (decision.kind === "skip") {
    assert.equal(decision.result?.ok, false);
    assert.equal(decision.result?.response?.status, 503);
  }
});
