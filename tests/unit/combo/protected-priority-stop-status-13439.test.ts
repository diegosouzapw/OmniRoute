/**
 * #13439 — status of a protected-priority stop (priority strategy, target marked
 * fallbackOnlyOnQuotaExhaustion) per stop cause, with PROTECTED_PRIORITY_INFRA_502_ENABLED
 * off (default: every stop stays 503, as on the release tip) and on (only provably
 * non-quota causes — circuit breaker open, predictive latency skip — answer 502).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-protected-stop-13439-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;
const FLAG = "PROTECTED_PRIORITY_INFRA_502_ENABLED";
delete process.env[FLAG];

const { evaluateExecuteTargetGates } =
  await import("../../../open-sse/services/combo/executeTargetGates.ts");
const { executeTargetAttempt } =
  await import("../../../open-sse/services/combo/executeTargetAttempt.ts");
const { getCircuitBreaker, STATE } = await import("../../../src/shared/utils/circuitBreaker.ts");
const { recordProviderCooldown } =
  await import("../../../open-sse/services/providerCooldownTracker.ts");
const { lockModel, clearAllModelLockouts } =
  await import("../../../open-sse/services/accountFallback.ts");
const { setCredentialHealth, __test_resetCredentialHealthCache } =
  await import("../../../src/lib/credentialHealth/cache.ts");
const semaphore = await import("../../../open-sse/services/accountSemaphore.ts");
const { recordComboRequest } = await import("../../../open-sse/services/comboMetrics.ts");
const { createProviderConnection } = await import("../../../src/lib/db/providers.ts");
const dbCore = await import("../../../src/lib/db/core.ts");

import type {
  AttemptLoopDeps,
  AttemptLoopState,
} from "../../../open-sse/services/combo/attemptLoopTypes.ts";
import type { ResolvedComboTarget } from "../../../open-sse/services/combo/types.ts";

test.afterEach(() => {
  delete process.env[FLAG];
  clearAllModelLockouts();
  __test_resetCredentialHealthCache();
  semaphore.resetAll();
});

test.after(() => {
  delete process.env[FLAG];
  try {
    dbCore.resetDbInstance();
  } catch {
    /* ignore */
  }
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

let seq = 0;
const uniqueProvider = (label: string) => `pp13439-${label}-${Date.now()}-${seq++}`;

function state(target: ResolvedComboTarget, overrides: Partial<AttemptLoopState> = {}) {
  return {
    orderedTargets: [target],
    fallbackCount: 0,
    recordedAttempts: 0,
    comboErrors: [],
    lastError: null,
    lastStatus: null,
    earliestRetryAfter: null,
    comboExpired: false,
    exhaustedProviders: new Set<string>(),
    exhaustedConnections: new Set<string>(),
    transientRateLimitedProviders: new Set<string>(),
    abortControllers: new Map([[0, new AbortController()]]),
    dispatchedTargets: new Set<string>(),
    targetFailureTrust: new Map(),
    comboAttemptOrder: [],
    skippedForCircuitOpen: false,
    earliestCircuitOpenRetryMs: 0,
    globalAttempts: 0,
    observedFailure: false,
    allObservedFailuresQuota: true,
    observeFailure() {},
    ...overrides,
  } as AttemptLoopState;
}

function deps(overrides: Partial<AttemptLoopDeps> = {}): AttemptLoopDeps {
  return {
    strategy: "priority",
    combo: { name: "pp13439", models: [] },
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
    traceInvocationId: "inv-pp13439",
    clientRequestedStream: false,
    handleSingleModelWithTimeout: async () => {
      throw new Error("a protected stop must not dispatch");
    },
    body: { messages: [{ role: "user", content: "hi" }] },
    startTime: Date.now(),
    releaseStickyPinOnFailure() {},
    clearStaleLKGP() {},
    ...overrides,
  };
}

function protectedTarget(provider: string, connectionId = "c1"): ResolvedComboTarget {
  return {
    kind: "model",
    stepId: "s1",
    executionKey: `ek-${provider}`,
    modelStr: `${provider}/m1`,
    provider,
    providerId: null,
    connectionId,
    weight: 1,
    label: null,
    fallbackOnlyOnQuotaExhaustion: true,
  } as ResolvedComboTarget;
}

type Case = {
  name: string;
  provablyNonQuota: boolean;
  /** Arrange the stop; returns the gate inputs. */
  arrange: () => Promise<{ target: ResolvedComboTarget; st: AttemptLoopState; d: AttemptLoopDeps }>;
  message: RegExp;
};

const CASES: Case[] = [
  {
    name: "circuit breaker open",
    provablyNonQuota: true,
    message: /circuit breaker is open/,
    async arrange() {
      const provider = uniqueProvider("cb");
      const cb = getCircuitBreaker(provider, { failureThreshold: 1, resetTimeout: 60_000 });
      cb._onFailure("transient");
      assert.equal(cb.getStatus().state, STATE.OPEN);
      const target = protectedTarget(provider);
      return { target, st: state(target), d: deps() };
    },
  },
  {
    name: "provider cooldown",
    provablyNonQuota: false,
    message: /is in cooldown/,
    async arrange() {
      const provider = uniqueProvider("cooldown");
      const d = deps({
        resilienceSettings: {
          providerCooldown: { enabled: true },
        } as AttemptLoopDeps["resilienceSettings"],
      });
      recordProviderCooldown(provider, "c1", d.resilienceSettings);
      const target = protectedTarget(provider);
      return { target, st: state(target), d };
    },
  },
  {
    name: "request exhaustion (provider)",
    provablyNonQuota: false,
    message: /is unavailable/,
    async arrange() {
      const provider = uniqueProvider("exhausted");
      const target = protectedTarget(provider);
      return {
        target,
        st: state(target, { exhaustedProviders: new Set([provider]) }),
        d: deps(),
      };
    },
  },
  {
    name: "request exhaustion (connection)",
    provablyNonQuota: false,
    message: /is unavailable/,
    async arrange() {
      const provider = uniqueProvider("conn-exhausted");
      const target = protectedTarget(provider);
      return {
        target,
        st: state(target, { exhaustedConnections: new Set([`${provider}:c1`]) }),
        d: deps(),
      };
    },
  },
  {
    name: "model lockout",
    provablyNonQuota: false,
    message: /is locked/,
    async arrange() {
      const provider = uniqueProvider("lock");
      lockModel(provider, "c1", "m1", "quota_exhausted", 60_000);
      const target = protectedTarget(provider);
      return { target, st: state(target), d: deps() };
    },
  },
  {
    name: "model unavailable (no credentials)",
    provablyNonQuota: false,
    message: /Model .* is unavailable/,
    async arrange() {
      const target = protectedTarget(uniqueProvider("unavailable"));
      return { target, st: state(target), d: deps({ isModelAvailable: async () => false }) };
    },
  },
  {
    name: "credential gate",
    provablyNonQuota: false,
    message: /Credential gate blocked/,
    async arrange() {
      const provider = uniqueProvider("credgate");
      setCredentialHealth("c-credgate", provider, "error", "probe failed");
      const target = protectedTarget(provider, "c-credgate");
      return { target, st: state(target), d: deps() };
    },
  },
  {
    name: "connection concurrency cap",
    provablyNonQuota: false,
    message: /Connection capacity reached/,
    async arrange() {
      const provider = uniqueProvider("cap");
      const conn = (await createProviderConnection({
        provider,
        authType: "apikey",
        name: `cap-${provider}`,
        apiKey: "sk-test-13439-cap",
        maxConcurrent: 1,
      })) as { id: string };
      semaphore.markBlocked(
        semaphore.buildAccountSemaphoreKey({ provider, accountKey: conn.id }),
        60_000
      );
      const target = protectedTarget(provider, conn.id);
      return { target, st: state(target), d: deps() };
    },
  },
];

for (const c of CASES) {
  for (const flagOn of [false, true]) {
    const expected = flagOn && c.provablyNonQuota ? 502 : 503;
    test(`gate stop "${c.name}" with flag ${flagOn ? "on" : "off"} answers ${expected}`, async () => {
      const { st, d } = await c.arrange();
      if (flagOn) process.env[FLAG] = "true";
      const decision = await evaluateExecuteTargetGates({ index: 0, state: st, deps: d });
      assert.equal(decision.kind, "skip");
      assert.ok(decision.kind === "skip" && decision.result && !decision.result.ok);
      const response = decision.result.response;
      assert.equal(response.status, expected);
      const body = (await response.json()) as { error: { message: string } };
      assert.match(body.error.message, c.message);
    });
  }
}

for (const flagOn of [false, true]) {
  const expected = flagOn ? 502 : 503;
  test(`attempt stop "predictive latency" with flag ${flagOn ? "on" : "off"} answers ${expected}`, async () => {
    const provider = uniqueProvider("ttft");
    const target = protectedTarget(provider);
    const comboName = `pp13439-ttft-${seq++}`;
    for (let i = 0; i < 6; i++) {
      recordComboRequest(comboName, target.modelStr, {
        success: true,
        latencyMs: 9_000,
        fallbackCount: 0,
        strategy: "priority",
        target: { executionKey: target.executionKey, modelStr: target.modelStr, provider },
      } as Parameters<typeof recordComboRequest>[2]);
    }
    if (flagOn) process.env[FLAG] = "true";
    const result = await executeTargetAttempt({
      index: 0,
      state: state(target),
      deps: deps({
        combo: { name: comboName, models: [] },
        config: { zeroLatencyOptimizationsEnabled: true, predictiveTtftMs: 1_000 },
      }),
      targetForAttempt: target,
      profile: {},
      protectedPriorityTarget: true,
    });
    assert.ok(result && !result.ok, "predictive latency must stop the protected target");
    assert.equal(result.response.status, expected);
    const body = (await result.response.json()) as { error: { message: string } };
    assert.match(body.error.message, /Predictive latency check rejected/);
  });
}

test("a non-protected target is never stopped (flag on)", async () => {
  process.env[FLAG] = "true";
  const provider = uniqueProvider("unprotected");
  const cb = getCircuitBreaker(provider, { failureThreshold: 1, resetTimeout: 60_000 });
  cb._onFailure("transient");
  const target = { ...protectedTarget(provider), fallbackOnlyOnQuotaExhaustion: false };
  const decision = await evaluateExecuteTargetGates({
    index: 0,
    state: state(target as ResolvedComboTarget),
    deps: deps(),
  });
  assert.equal(decision.kind, "skip");
  assert.ok(decision.kind === "skip" && decision.result === null);
});
