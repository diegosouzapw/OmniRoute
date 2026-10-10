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
import {
  __clearForTests as clearQuotaCache,
  setQuotaCache,
} from "../../../src/domain/quotaCache.ts";
import {
  clearCooldownState,
  isProviderInCooldown,
} from "../../../open-sse/services/providerCooldownTracker.ts";
import {
  clearAllModelLockouts,
  getModelLockoutInfo,
} from "../../../open-sse/services/accountFallback.ts";

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

for (const protectedPriorityTarget of [false, true]) {
  test(`target stop records failure then clears the original target (protected=${protectedPriorityTarget})`, async () => {
    const { stopProtectedPriorityTarget } =
      await import("../../../open-sse/services/combo/executeTargetClassify.ts");
    const target = modelTarget();
    const calls: unknown[][] = [];
    const state = emptyState({
      orderedTargets: [target],
      recordedAttempts: 1,
      observeFailure(...args) {
        calls.push(["observeFailure", ...args]);
      },
    });
    const deps = baseDeps({
      combo: { id: "combo-stop", name: "t", models: [] },
      clearStaleLKGP(...args) {
        calls.push(["clearStaleLKGP", ...args]);
      },
    });
    const result = stopProtectedPriorityTarget({
      protectedPriorityTarget,
      state,
      deps,
      target,
      message: "Target is unavailable",
    });
    assert.deepEqual(calls, [
      ["observeFailure", false, target.executionKey],
      [
        "clearStaleLKGP",
        deps.combo.name,
        target.executionKey,
        deps.combo.id,
        deps.log,
        "COMBO",
        undefined,
        target,
      ],
    ]);
    assert.equal(calls[1][7], target, "cleanup receives the original target by identity");
    if (protectedPriorityTarget) {
      assert.equal(result?.ok, false);
      assert.equal(result?.response.status, 503);
      const body = await result!.response.json();
      assert.equal(body.diagnostics.attempted, 1);
      assert.equal(body.diagnostics.terminalReason, "protected_priority_stop");
    } else {
      assert.equal(result, null);
    }
  });
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

test("spreads stamped fallbackAttempts onto the handleSingleModel target", async () => {
  const { executeTargetAttempt } =
    await import("../../../open-sse/services/combo/executeTargetAttempt.ts");
  let seen: unknown;
  const target = {
    ...modelTarget({ connectionId: "c1" }),
    fallbackAttempts: 2,
  } as ResolvedComboTarget & { fallbackAttempts: number };
  const deps = baseDeps({
    maxRetries: 0,
    handleSingleModelWithTimeout: async (_body, _model, dispatched) => {
      seen = dispatched;
      return new Response(JSON.stringify({ choices: [{ message: { content: "ok" } }] }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
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
  assert.equal(result?.ok, true);
  assert.equal((seen as { fallbackAttempts?: number } | undefined)?.fallbackAttempts, 2);
});

test("injection: dropping fallbackAttempts from the dispatch target goes red", async () => {
  const { executeTargetAttempt } =
    await import("../../../open-sse/services/combo/executeTargetAttempt.ts");
  let seen: unknown;
  const target = {
    ...modelTarget({ connectionId: "c1" }),
    fallbackAttempts: 2,
  } as ResolvedComboTarget & { fallbackAttempts: number };
  const deps = baseDeps({
    maxRetries: 0,
    handleSingleModelWithTimeout: async (_body, _model, dispatched) => {
      seen = dispatched;
      return new Response(JSON.stringify({ choices: [{ message: { content: "ok" } }] }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    },
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
  assert.equal(Object.prototype.hasOwnProperty.call(seen as object, "fallbackAttempts"), true);
});

async function runScopedClaudeQuotaAttempt(maxRetries: number, provider = "claude") {
  const { executeTargetAttempt } =
    await import("../../../open-sse/services/combo/executeTargetAttempt.ts");
  clearQuotaCache();
  clearCooldownState();
  clearAllModelLockouts();

  const connectionId = "claude-scoped-combo";
  const resetWindowMs = 10_000;
  const resetAt = new Date(Date.now() + resetWindowMs).toISOString();
  setQuotaCache(
    connectionId,
    "claude",
    {},
    {
      "weekly Fable (7d)": {
        remainingPercentage: 0,
        resetAt,
        claudeQuota: {
          kind: "weekly_scoped",
          active: true,
          severity: "critical",
          scopeKey: "model:fable",
          modelId: "claude-fable-5-1",
          modelDisplayName: "Fable",
        },
      },
    }
  );

  const target = modelTarget({
    provider,
    modelStr: `${provider}/claude-fable-5-1`,
    connectionId,
  });
  const resilienceSettings = {
    providerCooldown: {
      enabled: true,
      minRetryCooldownMs: 1_000,
      maxRetryCooldownMs: 120_000,
    },
  } as AttemptLoopDeps["resilienceSettings"];
  const deps = baseDeps({
    maxRetries,
    resilienceSettings,
    settings: {
      modelLockout: {
        enabled: true,
        errorCodes: [429],
        baseCooldownMs: 60_000,
        maxCooldownMs: 120_000,
      },
    },
    handleSingleModelWithTimeout: async () =>
      new Response(
        JSON.stringify({
          error: {
            message: "This request would exceed your account's rate limit. Please try again later.",
          },
        }),
        {
          status: 429,
          headers: {
            "content-type": "application/json",
            "x-omniroute-selected-connection-id": connectionId,
          },
        }
      ),
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

  return {
    connectionId,
    lockout: getModelLockoutInfo(provider, connectionId, "claude-fable-5-1"),
    provider,
    resetWindowMs,
    resilienceSettings,
    state,
  };
}

function assertScopedClaudeQuotaAttempt(
  result: Awaited<ReturnType<typeof runScopedClaudeQuotaAttempt>>
) {
  const { connectionId, lockout, provider, resetWindowMs, resilienceSettings, state } = result;
  assert.equal(isProviderInCooldown(provider, connectionId, resilienceSettings), false);
  assert.equal(state.exhaustedProviders.size, 0);
  assert.equal(state.exhaustedConnections.size, 0);
  assert.equal(state.transientRateLimitedProviders.size, 0);
  assert.ok(lockout);
  assert.ok(lockout.remainingMs > 0 && lockout.remainingMs <= resetWindowMs);
}

test("priority combo final lock branch preserves a scoped Claude reset shorter than base", async () => {
  assertScopedClaudeQuotaAttempt(await runScopedClaudeQuotaAttempt(0));
});

test("priority combo retry lock branch preserves a scoped Claude reset shorter than base", async () => {
  assertScopedClaudeQuotaAttempt(await runScopedClaudeQuotaAttempt(1));
});

test("priority combo canonicalizes the cc alias for scoped Claude quota routing", async () => {
  assertScopedClaudeQuotaAttempt(await runScopedClaudeQuotaAttempt(0, "cc"));
});

test("priority combo exhausts a connection-scoped Claude quota without a model lock", async () => {
  const { executeTargetAttempt } =
    await import("../../../open-sse/services/combo/executeTargetAttempt.ts");
  clearQuotaCache();
  clearCooldownState();
  clearAllModelLockouts();

  const connectionId = "claude-global-combo";
  const resetWindowMs = 10_000;
  const resetAt = new Date(Date.now() + resetWindowMs).toISOString();
  setQuotaCache(connectionId, "claude", {
    "session (5h)": {
      remainingPercentage: 50,
      resetAt: new Date(Date.now() + 2_000).toISOString(),
      claudeQuota: {
        kind: "session",
        active: false,
        severity: "normal",
        scopeKey: null,
        modelId: null,
        modelDisplayName: null,
      },
    },
    "weekly (7d)": {
      remainingPercentage: 60,
      resetAt,
      claudeQuota: {
        kind: "weekly_all",
        active: true,
        severity: "critical",
        scopeKey: null,
        modelId: null,
        modelDisplayName: null,
      },
    },
  });

  const target = modelTarget({
    provider: "claude",
    modelStr: "claude/claude-fable-5-1",
    connectionId,
  });
  let attempts = 0;
  const deps = baseDeps({
    maxRetries: 1,
    settings: {
      modelLockout: {
        enabled: true,
        errorCodes: [429],
        baseCooldownMs: 60_000,
        maxCooldownMs: 120_000,
      },
    },
    handleSingleModelWithTimeout: async () => {
      attempts += 1;
      return Response.json(
        {
          error: {
            message: "This request would exceed your account's rate limit. Please try again later.",
          },
        },
        {
          status: 429,
          headers: { "x-omniroute-selected-connection-id": connectionId },
        }
      );
    },
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

  const lockout = getModelLockoutInfo("claude", connectionId, "claude-fable-5-1");
  assert.equal(attempts, 1);
  assert.equal(lockout, null);
  assert.ok(state.exhaustedConnections.has(`claude:${connectionId}`));
});

async function runUnprovenClaudeQuotaAttempt({
  provider,
  stale,
}: {
  provider: "claude" | "cc";
  stale: boolean;
}) {
  const { executeTargetAttempt } =
    await import("../../../open-sse/services/combo/executeTargetAttempt.ts");
  clearQuotaCache();
  clearCooldownState();
  clearAllModelLockouts();

  const connectionId = `claude-${stale ? "stale" : "cold"}-combo`;
  const originalNow = Date.now;
  const cachedAt = originalNow();
  if (stale) {
    setQuotaCache(
      connectionId,
      "claude",
      {},
      {
        "weekly Fable (7d)": {
          remainingPercentage: 0,
          resetAt: new Date(cachedAt + 10 * 60_000).toISOString(),
          claudeQuota: {
            kind: "weekly_scoped",
            active: true,
            severity: "critical",
            scopeKey: "model:fable",
            modelId: "claude-fable-5-1",
            modelDisplayName: "Fable",
          },
        },
      }
    );
    // setQuotaCache stamps fetchedAt with its own Date.now(), which can land a few ms
    // after cachedAt; step past the 5 min TTL with margin (reset is still 10 min out).
    Date.now = () => cachedAt + 5 * 60_000 + 1_000;
  }

  const target = modelTarget({
    provider,
    modelStr: `${provider}/claude-fable-5-1`,
    connectionId,
  });
  let attempts = 0;
  const deps = baseDeps({
    maxRetries: 1,
    settings: {
      modelLockout: {
        enabled: true,
        errorCodes: [429],
        baseCooldownMs: 60_000,
        maxCooldownMs: 120_000,
      },
    },
    handleSingleModelWithTimeout: async () => {
      attempts += 1;
      return Response.json(
        {
          error: {
            message: "This request would exceed your account's rate limit. Please try again later.",
          },
        },
        {
          status: 429,
          headers: { "x-omniroute-selected-connection-id": connectionId },
        }
      );
    },
  });
  const state = emptyState({
    orderedTargets: [target],
    abortControllers: new Map([[0, new AbortController()]]),
  });

  try {
    await executeTargetAttempt({
      index: 0,
      state,
      deps,
      targetForAttempt: target,
      profile: {},
      protectedPriorityTarget: false,
    });
  } finally {
    Date.now = originalNow;
  }

  return {
    attempts,
    connectionId,
    lockout: getModelLockoutInfo(provider, connectionId, "claude-fable-5-1"),
    provider,
    state,
  };
}

function assertUnprovenClaudeQuotaAttempt(
  result: Awaited<ReturnType<typeof runUnprovenClaudeQuotaAttempt>>
) {
  assert.equal(result.attempts, 1);
  assert.equal(result.lockout, null);
  assert.ok(result.state.exhaustedConnections.has(`${result.provider}:${result.connectionId}`));
}

test("priority combo treats a cold native Claude quota 429 as connection-only", async () => {
  assertUnprovenClaudeQuotaAttempt(
    await runUnprovenClaudeQuotaAttempt({ provider: "claude", stale: false })
  );
});

test("priority combo treats a stale native Claude alias quota 429 as connection-only", async () => {
  assertUnprovenClaudeQuotaAttempt(
    await runUnprovenClaudeQuotaAttempt({ provider: "cc", stale: true })
  );
});

test("astra-high quality fail hops same connection to astra-max", async () => {
  const { executeTargetAttempt } =
    await import("../../../open-sse/services/combo/executeTargetAttempt.ts");
  const seen: string[] = [];
  const target = modelTarget({
    modelStr: "codex/gpt-6-astra-high",
    provider: "codex",
    connectionId: "c-astra",
  });
  const deps = baseDeps({
    maxRetries: 1,
    clientRequestedStream: false,
    handleSingleModelWithTimeout: async (_body, model, _dispatched) => {
      const m = String(model);
      seen.push(m);
      if (m.includes("gpt-6-astra-high")) {
        return emptyContent200("c-astra");
      }
      return new Response(
        JSON.stringify({ choices: [{ message: { role: "assistant", content: "ok-max" } }] }),
        {
          status: 200,
          headers: {
            "content-type": "application/json",
            "x-omniroute-selected-connection-id": "c-astra",
          },
        }
      );
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
  assert.equal(seen[0], "codex/gpt-6-astra-high");
  assert.equal(seen[1], "codex/gpt-6-astra-max");
  assert.equal(result?.ok, true);
});

test("quality fail without provider does not hop", async () => {
  const { executeTargetAttempt } =
    await import("../../../open-sse/services/combo/executeTargetAttempt.ts");
  const seen: string[] = [];
  const target = modelTarget({
    modelStr: "codex/gpt-6-astra-high",
    provider: "",
    connectionId: "c-astra",
  });
  const deps = baseDeps({
    maxRetries: 1,
    clientRequestedStream: false,
    handleSingleModelWithTimeout: async (_body, model) => {
      seen.push(String(model));
      return emptyContent200("c-astra");
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
  assert.equal(seen.length, 1);
  assert.equal(result, null);
});

/**
 * Fallback counting. `state.fallbackCount` is the per-set-try number of ordered
 * targets abandoned before the one that serves the request: it is snapshotted
 * into every combo record (`fallbackCount: state.fallbackCount`) and drives
 * `totalFallbacks` / `fallbackRate` in /api/combos/metrics, and it must equal
 * the index of the target that wins (the value exposed to clients as
 * `X-OmniRoute-Fallback-Attempts`). Abandoning the FIRST target *is* the first
 * fallback, so it has to count.
 */
test("a retryable failure of the first ordered target counts one fallback", async () => {
  const { executeTargetAttempt } =
    await import("../../../open-sse/services/combo/executeTargetAttempt.ts");
  const target = modelTarget({ connectionId: "c-fail" });
  const deps = baseDeps({
    maxRetries: 0,
    handleSingleModelWithTimeout: async () => new Response("upstream exploded", { status: 500 }),
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
  assert.equal(result, null, "a retryable failure must hand over to the next target");
  assert.equal(state.fallbackCount, 1);
});

test("a first-target fallback reaches totalFallbacks, not just the counter", async () => {
  const { executeTargetAttempt } =
    await import("../../../open-sse/services/combo/executeTargetAttempt.ts");
  const { getComboMetrics, resetComboMetrics } =
    await import("../../../open-sse/services/comboMetrics.ts");
  const comboName = `t-fallback-metrics-${Date.now()}`;
  resetComboMetrics(comboName);
  const first = modelTarget({ executionKey: "ek-0", stepId: "s0", connectionId: "c-dead" });
  const second = modelTarget({
    executionKey: "ek-1",
    stepId: "s1",
    connectionId: "c-live",
    provider: "anthropic",
    modelStr: "anthropic/claude-sonnet-4",
  });
  let calls = 0;
  const deps = baseDeps({
    maxRetries: 0,
    combo: { name: comboName, models: [] },
    handleSingleModelWithTimeout: async () => {
      calls += 1;
      if (calls === 1) return new Response("upstream exploded", { status: 500 });
      return new Response(JSON.stringify({ choices: [{ message: { content: "ok" } }] }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    },
  });
  const state = emptyState({
    orderedTargets: [first, second],
    abortControllers: new Map([
      [0, new AbortController()],
      [1, new AbortController()],
    ]),
  });

  // Target 0 dies; null means "combo, try the next ordered target".
  const attempt0 = await executeTargetAttempt({
    index: 0,
    state,
    deps,
    targetForAttempt: first,
    profile: {},
    protectedPriorityTarget: false,
  });
  assert.equal(attempt0, null);
  assert.equal(state.fallbackCount, 1);

  // Target 1 serves the request: its record carries the fallback that bought it.
  const attempt1 = await executeTargetAttempt({
    index: 1,
    state,
    deps,
    targetForAttempt: second,
    profile: {},
    protectedPriorityTarget: false,
  });
  assert.equal(attempt1?.ok, true);
  assert.equal(state.fallbackCount, 1);

  const metrics = getComboMetrics(comboName);
  assert.equal(metrics?.totalFallbacks, 1, "one first-target fallback must be visible in metrics");
  assert.equal(metrics?.totalFailures, 1);
  assert.equal(metrics?.totalSuccesses, 1);
});

test("a same-target retry that succeeds is not a fallback", async () => {
  const { executeTargetAttempt } =
    await import("../../../open-sse/services/combo/executeTargetAttempt.ts");
  const target = modelTarget({ connectionId: "c-retry" });
  let calls = 0;
  const deps = baseDeps({
    maxRetries: 1,
    config: { retryDelayMs: 0 },
    handleSingleModelWithTimeout: async () => {
      calls += 1;
      if (calls === 1) return new Response("upstream exploded", { status: 500 });
      return new Response(JSON.stringify({ choices: [{ message: { content: "ok" } }] }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
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
  assert.equal(result?.ok, true);
  assert.equal(calls, 2, "the retry must hit the same target again");
  assert.equal(state.fallbackCount, 0, "retrying the same target is not a fallback");
});

/**
 * The mirror rule: a target that stops the combo is not a fallback either.
 * Three branches abort the whole combo instead of advancing — local queue
 * capacity, an input-bound failure the remaining targets would hit the same
 * way, and a body-specific 400 that must surface as-is. None of them tries
 * another target, so none of them may bump `state.fallbackCount`: counting them
 * inflated `totalFallbacks` and made a failed request look like it had failed
 * over. `roundRobinCombo.ts` already behaves this way on its own queue-capacity
 * branch, whose log line says "returning without upstream fallback".
 */
test("a local queue-capacity stop is not a fallback", async () => {
  const { executeTargetAttempt } =
    await import("../../../open-sse/services/combo/executeTargetAttempt.ts");
  const target = modelTarget({ connectionId: "c-queue" });
  const deps = baseDeps({
    maxRetries: 0,
    handleSingleModelWithTimeout: async () =>
      new Response(
        JSON.stringify({ error: { code: "RATE_LIMIT_QUEUE_FULL", message: "queue full" } }),
        { status: 429, headers: { "Content-Type": "application/json" } }
      ),
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
  assert.equal(result?.ok, false, "the terminal stop must surface the upstream response");
  assert.equal(state.fallbackCount, 0, "no other target was tried, so there is no fallback");
});

test("an input-bound stop is not a fallback", async () => {
  const { executeTargetAttempt } =
    await import("../../../open-sse/services/combo/executeTargetAttempt.ts");
  const target = modelTarget({ connectionId: "c-input" });
  const deps = baseDeps({
    maxRetries: 0,
    handleSingleModelWithTimeout: async () =>
      new Response(
        JSON.stringify({
          error: { code: "context_length_exceeded", message: "prompt is too long" },
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      ),
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
  assert.equal(state.fallbackCount, 0, "the combo aborts instead of falling back");
});

test("a body-specific 400 stop is not a fallback", async () => {
  const { executeTargetAttempt } =
    await import("../../../open-sse/services/combo/executeTargetAttempt.ts");
  const target = modelTarget({ connectionId: "c-body", modelStr: "codex/gpt-5.2" });
  const deps = baseDeps({
    maxRetries: 0,
    handleSingleModelWithTimeout: async () =>
      new Response(
        JSON.stringify({ detail: "Invalid message format: the request body is malformed." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      ),
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
  assert.equal(state.fallbackCount, 0, "stopping the combo is not a fallback");
});
