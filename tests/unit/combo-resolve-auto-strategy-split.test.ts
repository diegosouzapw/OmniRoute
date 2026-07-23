import { test, after } from "node:test";
import assert from "node:assert/strict";

import { resolveAutoStrategyOrder } from "@omniroute/open-sse/services/combo/resolveAutoStrategy.ts";
import { resetDbInstance } from "@/lib/db/core.ts";

// resolveAutoStrategyOrder loads the LKGP via the DB singleton (dynamic import);
// release the handle so the node:test runner does not hang on teardown (learning #3).
after(() => {
  resetDbInstance();
});

// Split guard for Block J Task 2 (coupled slice): the `if (strategy === "auto")`
// branch of handleComboChat was extracted verbatim into resolveAutoStrategyOrder,
// with `buildAutoCandidates` injected (it lives in combo.ts, so a direct import
// would cycle). These tests pin the DI contract and the two control-flow exits
// that the host now forwards: an early 429 Response, and the default-ordering
// pass-through. The routable-selection path is covered end-to-end by the 60
// consumer tests (router-strategies / auto-combo-engine / combo-strategy-fallbacks).

const noopLog = {
  info() {},
  warn() {},
  error() {},
  debug() {},
} as never;

const target = (provider: string, modelStr: string): never =>
  ({
    kind: "model",
    stepId: "s1",
    executionKey: `${provider}>${modelStr}`,
    modelStr,
    provider,
    providerId: null,
    connectionId: null,
    weight: 1,
    label: null,
  }) as never;

const baseDeps = (buildAutoCandidates: never) =>
  ({
    orderedTargets: [target("openai", "gpt-4o"), target("anthropic", "claude-3")],
    body: { messages: [{ role: "user", content: "hi" }] },
    combo: { id: "c1", name: "autoc", config: {} },
    settings: null,
    config: {},
    relayOptions: null,
    resilienceSettings: { quotaPreflight: { enabled: false } },
    log: noopLog,
    buildAutoCandidates,
  }) as never;

test("exports resolveAutoStrategyOrder", () => {
  assert.equal(typeof resolveAutoStrategyOrder, "function");
});

test("no candidates -> keeps default ordering, no explicit router", async () => {
  const build = (async () => []) as never;
  const result = await resolveAutoStrategyOrder(baseDeps(build));
  assert.ok(!("earlyResponse" in result));
  if ("orderedTargets" in result) {
    assert.equal(result.autoUsedExplicitRouter, false);
    // default ordering preserved (both original targets survive)
    assert.equal(result.orderedTargets.length, 2);
    assert.equal(result.orderedTargets[0].provider, "openai");
  }
});

test("all candidates quota-cutoff-blocked -> early 429 Response", async () => {
  const build = (async () => [
    {
      kind: "model",
      stepId: "s1",
      executionKey: "openai>gpt-4o",
      modelStr: "gpt-4o",
      provider: "openai",
      model: "gpt-4o",
      quotaCutoffBlocked: true,
    },
  ]) as never;
  const result = await resolveAutoStrategyOrder(baseDeps(build));
  assert.ok("earlyResponse" in result);
  if ("earlyResponse" in result) {
    assert.ok(result.earlyResponse instanceof Response);
    assert.equal(result.earlyResponse.status, 429);
  }
});

test("cache affinity scores expanded auto account candidates directly", async () => {
  const candidates = [
    {
      kind: "model",
      stepId: "s1",
      executionKey: "openai>gpt-4o@account-a",
      modelStr: "gpt-4o",
      provider: "openai",
      model: "gpt-4o",
      connectionId: "account-a",
      quotaRemaining: 100,
      quotaTotal: 100,
      circuitBreakerState: "CLOSED",
      costPer1MTokens: 1,
      p95LatencyMs: 100,
      latencyStdDev: 10,
      errorRate: 0,
    },
    {
      kind: "model",
      stepId: "s1",
      executionKey: "openai>gpt-4o@account-b",
      modelStr: "gpt-4o",
      provider: "openai",
      model: "gpt-4o",
      connectionId: "account-b",
      quotaRemaining: 100,
      quotaTotal: 100,
      circuitBreakerState: "CLOSED",
      costPer1MTokens: 1,
      p95LatencyMs: 100,
      latencyStdDev: 10,
      errorRate: 0,
    },
  ];
  const deps = baseDeps((async () => candidates) as never);
  deps.orderedTargets = [target("openai", "gpt-4o")];
  deps.body = { prompt_cache_key: "expanded-account-key", messages: [] };
  deps.combo.autoConfig = {
    candidatePool: ["openai"],
    explorationRate: 0,
    weights: { cacheAffinity: 1 },
  };

  await resolveAutoStrategyOrder(deps);

  assert.deepEqual(candidates.map((candidate) => candidate.cacheAffinity).sort(), [0, 1]);
});

// #7008 follow-up: parseAutoConfig() (see combo-auto-config-split.test.ts) already
// makes `weights` honor a combo's own STORED modePack. But resolveAutoStrategyOrder()
// also supports a per-request `X-OmniRoute-Mode` override (relayOptions.mode) that can
// pick a *different* mode pack than the one stored on the combo for that single
// request — and `weights` must track that EFFECTIVE (post-override) modePack, not the
// stored one, so scoreAutoTargets' fallback ranking doesn't drift from the primary
// selection. These three synthetic candidates are built so every scoring factor is
// IDENTICAL between them except cost/latency/stability, and "dominant" clearly wins
// selection under any weight profile (so the engine's own randomized tier-rotation
// never affects which one becomes `orderedTargets[0]`) — isolating the assertion to
// the *fallback ranking order* of the remaining two, which is exactly what
// scoreAutoTargets (and only scoreAutoTargets) controls.
const weightSensitiveCandidates = () =>
  [
    {
      kind: "model",
      stepId: "dominant",
      executionKey: "groq>dominant-model",
      modelStr: "dominant-model",
      provider: "groq",
      model: "dominant-model",
      quotaRemaining: 100,
      quotaTotal: 100,
      circuitBreakerState: "CLOSED",
      costPer1MTokens: 0.01,
      p95LatencyMs: 10,
      latencyStdDev: 1,
      errorRate: 0,
    },
    {
      // Wins under "quality-first" (high taskFit/stability weight): low latencyStdDev
      // (=> high stability), but the highest cost and highest latency in the pool.
      kind: "model",
      stepId: "quality-leaning",
      executionKey: "openai>model-alpha",
      modelStr: "model-alpha",
      provider: "openai",
      model: "model-alpha",
      quotaRemaining: 100,
      quotaTotal: 100,
      circuitBreakerState: "CLOSED",
      costPer1MTokens: 20,
      p95LatencyMs: 5000,
      latencyStdDev: 1,
      errorRate: 0,
    },
    {
      // Wins under "ship-fast" (high latencyInv/health weight): lowest latency and
      // lowest cost in the pool, but the highest latencyStdDev (=> low stability).
      kind: "model",
      stepId: "speed-leaning",
      executionKey: "anthropic>model-beta",
      modelStr: "model-beta",
      provider: "anthropic",
      model: "model-beta",
      quotaRemaining: 100,
      quotaTotal: 100,
      circuitBreakerState: "CLOSED",
      costPer1MTokens: 1,
      p95LatencyMs: 100,
      latencyStdDev: 900,
      errorRate: 0,
    },
  ] as never;

const weightSensitiveDeps = (autoConfig: Record<string, unknown>, mode?: string) =>
  ({
    orderedTargets: [
      target("groq", "dominant-model"),
      target("openai", "model-alpha"),
      target("anthropic", "model-beta"),
    ],
    body: { messages: [{ role: "user", content: "hi" }] },
    combo: {
      id: "auto-mode-override",
      name: "auto-mode-override",
      autoConfig: {
        // Fixed candidatePool skips the DB-backed expandAutoComboCandidatePool
        // path entirely (see the `candidatePool.length > 0` early-return there) —
        // this test only cares about weight-driven ranking, not pool expansion.
        candidatePool: ["groq", "openai", "anthropic"],
        explorationRate: 0,
        ...autoConfig,
      },
    },
    settings: null,
    config: {},
    relayOptions: mode ? { mode } : null,
    resilienceSettings: { quotaPreflight: { enabled: false } },
    log: noopLog,
    buildAutoCandidates: (async () => weightSensitiveCandidates()) as never,
  }) as never;

test("per-request X-OmniRoute-Mode override changes the EFFECTIVE weights used for fallback ranking, not just selection", async () => {
  // Combo's own stored modePack is "quality-first" (would rank model-alpha before
  // model-beta if the override were ignored), but the request overrides to
  // "ship-fast" for this one call.
  const overridden = await resolveAutoStrategyOrder(
    weightSensitiveDeps({ modePack: "quality-first" }, "ship-fast")
  );
  assert.ok("orderedTargets" in overridden, "expected a normal ordering result, not earlyResponse");
  if (!("orderedTargets" in overridden)) return;

  // A combo natively configured with "ship-fast" (no override at all) is the ground
  // truth for what "effective modePack = ship-fast" should rank like.
  const native = await resolveAutoStrategyOrder(weightSensitiveDeps({ modePack: "ship-fast" }));
  assert.ok("orderedTargets" in native, "expected a normal ordering result, not earlyResponse");
  if (!("orderedTargets" in native)) return;

  // "dominant" overwhelms every weight profile tried here, so it is always the
  // engine's selection (position 0) regardless of any exploration/tier-rotation
  // randomness — the two asserted positions below are populated exclusively by
  // scoreAutoTargets' deterministic weight-driven sort.
  assert.equal(overridden.orderedTargets[0].provider, "groq");
  assert.equal(native.orderedTargets[0].provider, "groq");

  // Ship-fast weights favor low-latency/high-health over stability, so the
  // speed-leaning candidate outranks the quality-leaning one when the effective
  // modePack is ship-fast — whether that's because it's natively configured that
  // way, or because a per-request override made it so.
  assert.equal(
    overridden.orderedTargets[1].provider,
    "anthropic",
    "request-level ship-fast override should rank the speed-leaning candidate above the quality-leaning one"
  );
  assert.equal(overridden.orderedTargets[2].provider, "openai");

  // The override case must match the native ship-fast case EXACTLY — proving the
  // override drives an identical effective weight vector for fallback ranking, not
  // just for the initial selection.
  assert.deepEqual(
    overridden.orderedTargets.map((t) => t.provider),
    native.orderedTargets.map((t) => t.provider)
  );
});
