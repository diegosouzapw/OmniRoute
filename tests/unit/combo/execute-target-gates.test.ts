/**
 * Characterization for executeTarget pre-dispatch gates
 * (open-sse/services/combo/executeTargetGates.ts).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { getCircuitBreaker, STATE } from "../../../src/shared/utils/circuitBreaker.ts";
import { CliproxyManagementHealthCache } from "../../../src/lib/services/cliproxyManagementPreflight.ts";
import type { CliproxyAccountHealthResult } from "../../../src/lib/services/cliproxyAccountHealth.ts";
import type {
  AttemptLoopDeps,
  AttemptLoopState,
  GateDecision,
} from "../../../open-sse/services/combo/attemptLoopTypes.ts";
import type { ResolvedComboTarget } from "../../../open-sse/services/combo/types.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-execute-target-gates-"));
process.env.DATA_DIR = TEST_DATA_DIR;

test.after(async () => {
  const core = await import("../../../src/lib/db/core.ts");
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

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

// ──────────────── CLIProxyAPI management-health preflight wiring ────────────────

function accountFixture(
  overrides: Partial<CliproxyAccountHealthResult["accounts"][number]> = {}
): CliproxyAccountHealthResult["accounts"][number] {
  return {
    authIndex: `idx-${Math.random()}`,
    provider: "claude",
    type: "claude",
    label: "Account",
    status: "active",
    disabled: false,
    unavailable: false,
    createdAt: null,
    updatedAt: null,
    nextRetryAfter: null,
    success: 1,
    failed: 0,
    recentRequests: [],
    modelQuotas: {},
    ...overrides,
  };
}

async function makeCliproxyConnection(
  providersDb: typeof import("../../../src/lib/db/providers.ts"),
  readCache: typeof import("../../../src/lib/db/readCache.ts"),
  name: string,
  apiKey: string
) {
  const connection = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name,
    apiKey,
    providerSpecificData: {
      baseUrl: "http://cliproxy.internal:8317/v1",
      isCliproxy: true,
    },
  });
  readCache.invalidateDbCache("connections");
  return connection;
}

test("CLIProxyAPI preflight gate: two unavailable Claude accounts skip Claude but allow Gemini and Codex on the same instance", async () => {
  const providersDb = await import("../../../src/lib/db/providers.ts");
  const readCache = await import("../../../src/lib/db/readCache.ts");
  const { evaluateExecuteTargetGates } =
    await import("../../../open-sse/services/combo/executeTargetGates.ts");

  const connection = await makeCliproxyConnection(
    providersDb,
    readCache,
    "CLIProxy-Multi-Family",
    "cpa-secret-multi"
  );

  const health: CliproxyAccountHealthResult = {
    state: "ready",
    accounts: [
      accountFixture({ authIndex: "c1", provider: "claude", type: "claude", unavailable: true }),
      accountFixture({ authIndex: "c2", provider: "claude", type: "claude", disabled: true }),
      accountFixture({ authIndex: "g1", provider: "gemini", type: "gemini" }),
      accountFixture({ authIndex: "cx1", provider: "codex", type: "codex" }),
    ],
    version: "1.0",
  };
  const cache = new CliproxyManagementHealthCache({ fetcher: async () => health });

  const claudeDecision = await evaluateExecuteTargetGates({
    index: 0,
    state: emptyState({
      orderedTargets: [
        modelTarget({
          connectionId: connection.id,
          provider: "openai",
          modelStr: "claude-3-7-sonnet",
        }),
      ],
    }),
    deps: baseDeps({ cliproxyManagementHealthCache: cache }),
  });
  assert.equal(claudeDecision.kind, "skip");

  const geminiDecision = await evaluateExecuteTargetGates({
    index: 0,
    state: emptyState({
      orderedTargets: [
        modelTarget({
          connectionId: connection.id,
          provider: "openai",
          modelStr: "gemini-2.5-pro",
        }),
      ],
    }),
    deps: baseDeps({ cliproxyManagementHealthCache: cache }),
  });
  assert.equal(geminiDecision.kind, "proceed");

  const codexDecision = await evaluateExecuteTargetGates({
    index: 0,
    state: emptyState({
      orderedTargets: [
        modelTarget({ connectionId: connection.id, provider: "openai", modelStr: "gpt-4o" }),
      ],
    }),
    deps: baseDeps({ cliproxyManagementHealthCache: cache }),
  });
  assert.equal(codexDecision.kind, "proceed");
});

test("CLIProxyAPI preflight gate: one healthy Claude account among unavailable ones does not skip", async () => {
  const providersDb = await import("../../../src/lib/db/providers.ts");
  const readCache = await import("../../../src/lib/db/readCache.ts");
  const { evaluateExecuteTargetGates } =
    await import("../../../open-sse/services/combo/executeTargetGates.ts");

  const connection = await makeCliproxyConnection(
    providersDb,
    readCache,
    "CLIProxy-Healthy-Claude",
    "cpa-secret-healthy"
  );

  const health: CliproxyAccountHealthResult = {
    state: "ready",
    accounts: [
      accountFixture({ authIndex: "c1", provider: "claude", type: "claude", unavailable: true }),
      accountFixture({ authIndex: "c2", provider: "claude", type: "claude", unavailable: false }),
    ],
    version: "1.0",
  };
  const cache = new CliproxyManagementHealthCache({ fetcher: async () => health });

  const decision = await evaluateExecuteTargetGates({
    index: 0,
    state: emptyState({
      orderedTargets: [
        modelTarget({
          connectionId: connection.id,
          provider: "openai",
          modelStr: "claude-3-7-sonnet",
        }),
      ],
    }),
    deps: baseDeps({ cliproxyManagementHealthCache: cache }),
  });
  assert.equal(decision.kind, "proceed");
});

test("CLIProxyAPI preflight gate: only Opus quota rejected skips Opus but allows healthy Sonnet", async () => {
  const providersDb = await import("../../../src/lib/db/providers.ts");
  const readCache = await import("../../../src/lib/db/readCache.ts");
  const { evaluateExecuteTargetGates } =
    await import("../../../open-sse/services/combo/executeTargetGates.ts");

  const connection = await makeCliproxyConnection(
    providersDb,
    readCache,
    "CLIProxy-Model-Quota",
    "cpa-secret-quota"
  );

  const now = new Date().toISOString();
  const health: CliproxyAccountHealthResult = {
    state: "ready",
    accounts: [
      accountFixture({
        authIndex: "c1",
        provider: "claude",
        type: "claude",
        modelQuotas: {
          "claude-opus-4-6": {
            observedAt: now,
            signals: {
              "Anthropic-Ratelimit-Unified-Status": "rejected",
              "Retry-After": "3600",
            },
          },
          "claude-sonnet-4-6": {
            observedAt: now,
            signals: { "Anthropic-Ratelimit-Unified-Status": "allowed" },
          },
        },
      }),
    ],
    version: "1.0",
  };
  const cache = new CliproxyManagementHealthCache({ fetcher: async () => health });

  const opusDecision = await evaluateExecuteTargetGates({
    index: 0,
    state: emptyState({
      orderedTargets: [
        modelTarget({
          connectionId: connection.id,
          provider: "openai",
          modelStr: "claude-opus-4-6",
        }),
      ],
    }),
    deps: baseDeps({ cliproxyManagementHealthCache: cache }),
  });
  assert.equal(opusDecision.kind, "skip");

  const sonnetDecision = await evaluateExecuteTargetGates({
    index: 0,
    state: emptyState({
      orderedTargets: [
        modelTarget({
          connectionId: connection.id,
          provider: "openai",
          modelStr: "claude-sonnet-4-6",
        }),
      ],
    }),
    deps: baseDeps({ cliproxyManagementHealthCache: cache }),
  });
  assert.equal(sonnetDecision.kind, "proceed");
});

test("CLIProxyAPI preflight gate: management API error fails open (never skips)", async () => {
  const providersDb = await import("../../../src/lib/db/providers.ts");
  const readCache = await import("../../../src/lib/db/readCache.ts");
  const { evaluateExecuteTargetGates } =
    await import("../../../open-sse/services/combo/executeTargetGates.ts");

  const connection = await makeCliproxyConnection(
    providersDb,
    readCache,
    "CLIProxy-Mgmt-Error",
    "cpa-secret-error"
  );

  for (const errState of [
    "missing_key",
    "unauthorized",
    "unsupported",
    "invalid_response",
    "unreachable",
  ] as const) {
    const cache = new CliproxyManagementHealthCache({
      fetcher: async () => ({ state: errState, accounts: [], version: null }),
    });
    const decision = await evaluateExecuteTargetGates({
      index: 0,
      state: emptyState({
        orderedTargets: [
          modelTarget({
            connectionId: connection.id,
            provider: "openai",
            modelStr: "claude-3-7-sonnet",
          }),
        ],
      }),
      deps: baseDeps({ cliproxyManagementHealthCache: cache }),
    });
    assert.equal(decision.kind, "proceed", `state ${errState} must fail open`);
  }
});

test("CLIProxyAPI preflight gate: TTL + singleflight coalesce concurrent fetches", async () => {
  const providersDb = await import("../../../src/lib/db/providers.ts");
  const readCache = await import("../../../src/lib/db/readCache.ts");
  const { evaluateExecuteTargetGates } =
    await import("../../../open-sse/services/combo/executeTargetGates.ts");

  const connection = await makeCliproxyConnection(
    providersDb,
    readCache,
    "CLIProxy-TTL-Singleflight",
    "cpa-secret-ttl"
  );

  let fetchCount = 0;
  const cache = new CliproxyManagementHealthCache({
    ttlMs: 50,
    fetcher: async () => {
      fetchCount++;
      await new Promise((resolve) => setTimeout(resolve, 10));
      return {
        state: "ready",
        accounts: [accountFixture({ authIndex: "c1", provider: "claude", type: "claude" })],
        version: "1.0",
      };
    },
  });

  const makeTargetDecision = () =>
    evaluateExecuteTargetGates({
      index: 0,
      state: emptyState({
        orderedTargets: [
          modelTarget({
            connectionId: connection.id,
            provider: "openai",
            modelStr: "claude-3-7-sonnet",
          }),
        ],
      }),
      deps: baseDeps({ cliproxyManagementHealthCache: cache }),
    });

  await Promise.all([makeTargetDecision(), makeTargetDecision(), makeTargetDecision()]);
  assert.equal(fetchCount, 1, "singleflight must coalesce concurrent requests");

  await makeTargetDecision();
  assert.equal(fetchCount, 1, "cached result must be served within TTL");

  await new Promise((resolve) => setTimeout(resolve, 60));
  await makeTargetDecision();
  assert.equal(fetchCount, 2, "expired TTL must trigger a fresh fetch");
});

test("CLIProxyAPI preflight gate: generic non-CLIProxy OpenAI-compatible connection is never checked", async () => {
  const providersDb = await import("../../../src/lib/db/providers.ts");
  const readCache = await import("../../../src/lib/db/readCache.ts");
  const { evaluateExecuteTargetGates } =
    await import("../../../open-sse/services/combo/executeTargetGates.ts");

  const connection = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Generic-OpenAI",
    apiKey: "sk-plain-key",
    providerSpecificData: {
      baseUrl: "https://api.openai.com/v1",
    },
  });
  readCache.invalidateDbCache("connections");

  let managementCalled = false;
  const cache = new CliproxyManagementHealthCache({
    fetcher: async () => {
      managementCalled = true;
      return { state: "ready", accounts: [], version: "1.0" };
    },
  });

  const decision = await evaluateExecuteTargetGates({
    index: 0,
    state: emptyState({
      orderedTargets: [
        modelTarget({
          connectionId: connection.id,
          provider: "openai",
          modelStr: "claude-3-7-sonnet",
        }),
      ],
    }),
    deps: baseDeps({ cliproxyManagementHealthCache: cache }),
  });
  assert.equal(decision.kind, "proceed");
  assert.equal(
    managementCalled,
    false,
    "management API must never be called for a generic OpenAI-compatible connection"
  );
});

test("CLIProxyAPI preflight gate: stale per-model rejected flag on a recovered account does not skip; a live sibling rejection skips only that model (#14206)", async () => {
  const providersDb = await import("../../../src/lib/db/providers.ts");
  const readCache = await import("../../../src/lib/db/readCache.ts");
  const { evaluateExecuteTargetGates } =
    await import("../../../open-sse/services/combo/executeTargetGates.ts");

  const connection = await makeCliproxyConnection(
    providersDb,
    readCache,
    "CLIProxy-Stale-Rejected",
    "cpa-secret-stale"
  );

  const staleObservedAt = new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString();
  const liveObservedAt = new Date(Date.now() - 5 * 60 * 1000).toISOString();
  const health: CliproxyAccountHealthResult = {
    state: "ready",
    accounts: [
      accountFixture({
        authIndex: "c1",
        provider: "claude",
        type: "claude",
        unavailable: false,
        nextRetryAfter: null,
        modelQuotas: {
          "claude-opus-5": {
            observedAt: staleObservedAt,
            signals: {
              "Anthropic-Ratelimit-Unified-Status": "rejected",
              "Retry-After": "0",
            },
          },
          "claude-sonnet-5": {
            observedAt: liveObservedAt,
            signals: {
              "Anthropic-Ratelimit-Unified-Status": "rejected",
              "Retry-After": "3600",
            },
          },
        },
      }),
    ],
    version: "1.0",
  };
  const cache = new CliproxyManagementHealthCache({ fetcher: async () => health });

  const opusDecision = await evaluateExecuteTargetGates({
    index: 0,
    state: emptyState({
      orderedTargets: [
        modelTarget({
          connectionId: connection.id,
          provider: "openai",
          modelStr: "claude-opus-5",
        }),
      ],
    }),
    deps: baseDeps({ cliproxyManagementHealthCache: cache }),
  });
  assert.equal(opusDecision.kind, "proceed");

  const sonnetDecision = await evaluateExecuteTargetGates({
    index: 0,
    state: emptyState({
      orderedTargets: [
        modelTarget({
          connectionId: connection.id,
          provider: "openai",
          modelStr: "claude-sonnet-5",
        }),
      ],
    }),
    deps: baseDeps({ cliproxyManagementHealthCache: cache }),
  });
  assert.equal(sonnetDecision.kind, "skip");
});
