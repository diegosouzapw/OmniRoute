/**
 * Characterization for executeTarget pre-dispatch gates
 * (open-sse/services/combo/executeTargetGates.ts).
 */
import test from "node:test";
import assert from "node:assert/strict";
import { getCircuitBreaker, STATE } from "../../../src/shared/utils/circuitBreaker.ts";
import { connectionCircuitBreakerName } from "../../../open-sse/services/connectionCircuitBreaker.ts";
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

/**
 * #14530 — the pre-dispatch circuit gate must look the connection breaker up
 * under `connectionCircuitBreakerName(provider, target.connectionId)`, not
 * under the bare provider name. Pins the breaker NAME, not just the skip:
 * the provider breaker stays CLOSED in both tests, so a lookup that fell back
 * to `getCircuitBreaker(provider)` would let the dead connection proceed, and
 * a lookup that widened to the provider would wrongly skip its healthy sibling.
 */
test("#14530: an OPEN connection breaker skips only that connection", async () => {
  const { evaluateExecuteTargetGates } =
    await import("../../../open-sse/services/combo/executeTargetGates.ts");
  const provider = `openai-gates-14530-${Date.now()}`;
  const deadConnectionId = `conn-dead-${Date.now()}`;
  const connectionBreaker = getCircuitBreaker(
    connectionCircuitBreakerName(provider, deadConnectionId),
    { failureThreshold: 1, resetTimeout: 60_000 }
  );
  connectionBreaker._onFailure("transient");
  assert.equal(connectionBreaker.getStatus().state, STATE.OPEN);
  // The provider-wide breaker must be untouched — that is the whole point.
  assert.notEqual(getCircuitBreaker(provider).getStatus().state, STATE.OPEN);

  const target = modelTarget({
    provider,
    modelStr: `${provider}/gpt-4o-mini`,
    connectionId: deadConnectionId,
  });
  const state = emptyState({ orderedTargets: [target] });
  const decision = await evaluateExecuteTargetGates({ index: 0, state, deps: baseDeps() });
  assert.equal(decision.kind, "skip");
  assert.equal(state.skippedForCircuitOpen, true);
});

test("#14530: a sibling connection on the same provider still proceeds", async () => {
  const { evaluateExecuteTargetGates } =
    await import("../../../open-sse/services/combo/executeTargetGates.ts");
  const provider = `openai-gates-14530-sibling-${Date.now()}`;
  const deadConnectionId = `conn-dead-${Date.now()}`;
  getCircuitBreaker(connectionCircuitBreakerName(provider, deadConnectionId), {
    failureThreshold: 1,
    resetTimeout: 60_000,
  })._onFailure("transient");

  const healthy = modelTarget({
    provider,
    modelStr: `${provider}/gpt-4o-mini`,
    connectionId: `conn-healthy-${Date.now()}`,
  });
  const state = emptyState({ orderedTargets: [healthy] });
  const decision = await evaluateExecuteTargetGates({ index: 0, state, deps: baseDeps() });
  assert.equal(decision.kind, "proceed");
  assert.equal(state.skippedForCircuitOpen, false);
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

test("proceed stamps fallbackAttempts from the ordered-target index", async () => {
  const { evaluateExecuteTargetGates } =
    await import("../../../open-sse/services/combo/executeTargetGates.ts");
  const first = modelTarget({ executionKey: "ek-0", stepId: "s0" });
  const second = modelTarget({ executionKey: "ek-1", stepId: "s1" });
  const state = emptyState({
    orderedTargets: [first, second],
    abortControllers: new Map([
      [0, new AbortController()],
      [1, new AbortController()],
    ]),
  });
  const firstDecision = await evaluateExecuteTargetGates({
    index: 0,
    state,
    deps: baseDeps(),
  });
  const secondDecision = await evaluateExecuteTargetGates({
    index: 1,
    state,
    deps: baseDeps(),
  });
  assert.equal(firstDecision.kind, "proceed");
  assert.equal(secondDecision.kind, "proceed");
  if (firstDecision.kind === "proceed") {
    assert.equal(
      (firstDecision.targetForAttempt as ResolvedComboTarget & { fallbackAttempts?: number })
        .fallbackAttempts,
      0
    );
  }
  if (secondDecision.kind === "proceed") {
    assert.equal(
      (secondDecision.targetForAttempt as ResolvedComboTarget & { fallbackAttempts?: number })
        .fallbackAttempts,
      1
    );
  }
});

/**
 * #13694 — combos 503d with ALL_TARGETS_SKIPPED after the 3.8.49→3.8.50
 * upgrade, with zero upstream attempts and no recovery after reboot.
 *
 * The 3.8.50 persisted-connection-cooldown gate (#11360) read SQLite rows
 * that 3.8.49 had written but never consulted pre-dispatch, so upgrade-shaped
 * state (stale `unavailable` labels) skipped every target before dispatch.
 * #12168 bounded the bare-label skip with a grace window; these tests pin the
 * gate — not just the predicate — so a whole pool of stale/orphan rows can
 * never again produce a zero-attempt 503, while a genuinely fresh cooldown
 * still skips (burst protection intact).
 */
async function seedCooldownConnection(input: {
  provider: string;
  testStatus: string;
  lastErrorAt?: string | null;
  rateLimitedUntil?: string | null;
}): Promise<string> {
  const providersDb = await import("../../../src/lib/db/providers.ts");
  const readCache = await import("../../../src/lib/db/readCache.ts");
  const connection = (await providersDb.createProviderConnection({
    provider: input.provider,
    authType: "apikey",
    name: `gates-13694-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    apiKey: "[REDACTED]",
    testStatus: input.testStatus,
    lastErrorAt: input.lastErrorAt ?? null,
    rateLimitedUntil: input.rateLimitedUntil ?? null,
  } as unknown as Record<string, unknown>)) as { id: string };
  readCache.invalidateDbCache("connections");
  return connection.id;
}

test("#13694: stale persisted unavailable label proceeds through pre-dispatch gates", async () => {
  const { evaluateExecuteTargetGates } =
    await import("../../../open-sse/services/combo/executeTargetGates.ts");
  const provider = `openai-gates-13694-stale-${Date.now()}`;
  const connectionId = await seedCooldownConnection({
    provider,
    testStatus: "unavailable",
    // Well past the 60s unavailable-label grace window (#12168): the label is
    // upgrade-shaped stale state, not a live cooldown.
    lastErrorAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
  });
  const target = modelTarget({ provider, modelStr: `${provider}/gpt-4o-mini`, connectionId });
  const state = emptyState({ orderedTargets: [target] });
  const decision = await evaluateExecuteTargetGates({ index: 0, state, deps: baseDeps() });
  assert.equal(decision.kind, "proceed");
});

test("#13694: orphan persisted unavailable label (no timestamps) proceeds", async () => {
  const { evaluateExecuteTargetGates } =
    await import("../../../open-sse/services/combo/executeTargetGates.ts");
  const provider = `openai-gates-13694-orphan-${Date.now()}`;
  const connectionId = await seedCooldownConnection({ provider, testStatus: "unavailable" });
  const target = modelTarget({ provider, modelStr: `${provider}/gpt-4o-mini`, connectionId });
  const state = emptyState({ orderedTargets: [target] });
  const decision = await evaluateExecuteTargetGates({ index: 0, state, deps: baseDeps() });
  assert.equal(decision.kind, "proceed");
});

test("#13694 control: recent persisted unavailable label still skips", async () => {
  const { evaluateExecuteTargetGates } =
    await import("../../../open-sse/services/combo/executeTargetGates.ts");
  const provider = `openai-gates-13694-fresh-${Date.now()}`;
  const connectionId = await seedCooldownConnection({
    provider,
    testStatus: "unavailable",
    lastErrorAt: new Date().toISOString(),
  });
  const target = modelTarget({ provider, modelStr: `${provider}/gpt-4o-mini`, connectionId });
  const state = emptyState({ orderedTargets: [target] });
  const decision = await evaluateExecuteTargetGates({ index: 0, state, deps: baseDeps() });
  assert.equal(decision.kind, "skip");
});

test("injection: dropping fallbackAttempts from targetForAttempt goes red", async () => {
  const { evaluateExecuteTargetGates } =
    await import("../../../open-sse/services/combo/executeTargetGates.ts");
  const first = modelTarget({ executionKey: "ek-0", stepId: "s0" });
  const second = modelTarget({ executionKey: "ek-1", stepId: "s1" });
  const state = emptyState({
    orderedTargets: [first, second],
    abortControllers: new Map([
      [0, new AbortController()],
      [1, new AbortController()],
    ]),
  });
  const decision = await evaluateExecuteTargetGates({
    index: 1,
    state,
    deps: baseDeps(),
  });
  assert.equal(decision.kind, "proceed");
  if (decision.kind === "proceed") {
    assert.equal(
      Object.prototype.hasOwnProperty.call(decision.targetForAttempt, "fallbackAttempts"),
      true
    );
  }
});
