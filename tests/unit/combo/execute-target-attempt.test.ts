/**
 * Characterization for executeTarget retry loop + classify
 * (open-sse/services/combo/executeTargetAttempt.ts,
 *  open-sse/services/combo/executeTargetClassify.ts).
 *
 * Plan Task 3. RED until those modules exist.
 */
import test from "node:test";
import assert from "node:assert/strict";
import type {
  AttemptLoopDeps,
  AttemptLoopState,
} from "../../../open-sse/services/combo/attemptLoopTypes.ts";
import type { ResolvedComboTarget } from "../../../open-sse/services/combo/types.ts";

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
    throw new Error("handleSingleModel must be stubbed");
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
    traceInvocationId: "inv-attempt",
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
    connectionId: "c-fail",
    weight: 1,
    label: null,
    ...overrides,
  };
}

function emptyContent200(connectionId = "c-fail"): Response {
  return new Response(
    JSON.stringify({ choices: [{ message: { role: "assistant", content: "" } }] }),
    {
      status: 200,
      headers: {
        "content-type": "application/json",
        "x-omniroute-selected-connection-id": connectionId,
      },
    }
  );
}

// "invalid message format" — same fixture as combo-body-specific-400-stop-4279.test.ts
function bodySpecific400(): Response {
  return new Response(
    JSON.stringify({
      detail: "Invalid message format: the request body is malformed.",
    }),
    { status: 400, headers: { "Content-Type": "application/json" } }
  );
}

test("remainderIsHomogeneous is true only when remaining targets share modelStr", async () => {
  const { remainderIsHomogeneous } =
    await import("../../../open-sse/services/combo/executeTargetClassify.ts");
  const same = [
    { modelStr: "openai/gpt-4o" },
    { modelStr: "openai/gpt-4o" },
    { modelStr: "openai/gpt-4o" },
  ];
  assert.equal(remainderIsHomogeneous(same, 0, "openai/gpt-4o"), true);
  const mixed = [{ modelStr: "openai/gpt-4o" }, { modelStr: "anthropic/claude" }];
  assert.equal(remainderIsHomogeneous(mixed, 0, "openai/gpt-4o"), false);
  assert.equal(remainderIsHomogeneous(same, 2, "openai/gpt-4o"), true);
});

test("shouldAbortOnInputBoundFailure requires homogeneous remainder", async () => {
  const { shouldAbortOnInputBoundFailure } =
    await import("../../../open-sse/services/combo/executeTargetClassify.ts");
  const structured = { code: "context_length_exceeded" };
  assert.equal(
    shouldAbortOnInputBoundFailure({ structuredError: structured, remainderIsHomogeneous: true }),
    true
  );
  assert.equal(
    shouldAbortOnInputBoundFailure({ structuredError: structured, remainderIsHomogeneous: false }),
    false
  );
  assert.equal(
    shouldAbortOnInputBoundFailure({
      structuredError: { code: "rate_limit" },
      remainderIsHomogeneous: true,
    }),
    false
  );
});

test("shouldSurfaceBodySpecific400 matches #4279 invalid-format 400, not model-scoped", async () => {
  const { shouldSurfaceBodySpecific400 } =
    await import("../../../open-sse/services/combo/executeTargetClassify.ts");
  assert.equal(
    shouldSurfaceBodySpecific400({
      status: 400,
      errorText: "Invalid message format: the request body is malformed.",
      shouldFallback: true,
    }),
    true
  );
  assert.equal(
    shouldSurfaceBodySpecific400({
      status: 400,
      errorText: "The requested model is not supported",
      shouldFallback: true,
    }),
    false
  );
  assert.equal(
    shouldSurfaceBodySpecific400({
      status: 429,
      errorText: "Invalid message format: the request body is malformed.",
      shouldFallback: true,
    }),
    false
  );
});

test("quality-rejected 200 calls releaseStickyPinOnFailure and records kind quality", async () => {
  const { executeTargetAttempt } =
    await import("../../../open-sse/services/combo/executeTargetAttempt.ts");
  let released: string | null = null;
  const target = modelTarget({ connectionId: "c-fail" });
  const deps = baseDeps({
    maxRetries: 0,
    clientRequestedStream: false,
    releaseStickyPinOnFailure(_hash, id) {
      released = String(id);
    },
    handleSingleModelWithTimeout: async () => emptyContent200("c-fail"),
    sticky: { targets: [], messageHash: "h", stuck: true },
  });
  const state = emptyState({
    orderedTargets: [target],
    abortControllers: new Map([[0, new AbortController()]]),
  });
  const result = await executeTargetAttempt({
    index: 0,
    state,
    deps,
    targetForAttempt: target,
    profile: {},
    protectedPriorityTarget: false,
  });
  assert.equal(released, "c-fail");
  assert.equal(
    state.comboErrors.some((e) => e.kind === "quality"),
    true
  );
  assert.equal(result, null);
});

test("injection: missing releaseStickyPinOnFailure forwarding goes red on quality fail", async () => {
  const { executeTargetAttempt } =
    await import("../../../open-sse/services/combo/executeTargetAttempt.ts");
  let callCount = 0;
  const target = modelTarget({ connectionId: "c-fail" });
  const deps = baseDeps({
    maxRetries: 0,
    clientRequestedStream: false,
    releaseStickyPinOnFailure() {
      callCount += 1;
    },
    handleSingleModelWithTimeout: async () => emptyContent200("c-fail"),
    sticky: { targets: [], messageHash: "h", stuck: true },
  });
  const state = emptyState({
    orderedTargets: [target],
    abortControllers: new Map([[0, new AbortController()]]),
  });
  await executeTargetAttempt({
    index: 0,
    state,
    deps,
    targetForAttempt: target,
    profile: {},
    protectedPriorityTarget: false,
  });
  assert.equal(callCount, 1);
});

test("499 surfaces {ok:false,response} and does not continue retries", async () => {
  const { executeTargetAttempt } =
    await import("../../../open-sse/services/combo/executeTargetAttempt.ts");
  let calls = 0;
  const target = modelTarget({ connectionId: "c1" });
  const deps = baseDeps({
    maxRetries: 3,
    handleSingleModelWithTimeout: async () => {
      calls += 1;
      return new Response("disconnected", { status: 499 });
    },
  });
  const state = emptyState({
    orderedTargets: [target],
    abortControllers: new Map([[0, new AbortController()]]),
  });
  const result = await executeTargetAttempt({
    index: 0,
    state,
    deps,
    targetForAttempt: target,
    profile: {},
    protectedPriorityTarget: false,
  });
  assert.equal(result?.ok, false);
  assert.equal(result?.response?.status, 499);
  assert.equal(calls, 1);
});

test("body-specific 400 surfaces via {ok,response} not null", async () => {
  const { executeTargetAttempt } =
    await import("../../../open-sse/services/combo/executeTargetAttempt.ts");
  const target = modelTarget({ connectionId: "c1", modelStr: "codex/gpt-5.2" });
  const deps = baseDeps({
    maxRetries: 0,
    handleSingleModelWithTimeout: async () => bodySpecific400(),
  });
  const state = emptyState({
    orderedTargets: [target],
    abortControllers: new Map([[0, new AbortController()]]),
  });
  const result = await executeTargetAttempt({
    index: 0,
    state,
    deps,
    targetForAttempt: target,
    profile: {},
    protectedPriorityTarget: false,
  });
  assert.equal(result?.ok, false);
  assert.equal(result?.response?.status, 400);
});
