/**
 * `expiry-first` combo-level ordering (spec: _tasks/superpowers/specs/
 * 2026-10-20-expiry-first-combo-strategy-design.md §8).
 *
 * The provider-level strategy ranks the account whose quota is closest to being
 * thrown away first; this suite pins the same rule at combo scope, where the
 * projection is scoped to the family the requested model actually spends and
 * unknown windows (fractionReported === false) are skipped, never read as
 * exhausted. Quota state is seeded directly into the domain cache — no fetchers,
 * no network.
 */

import test, { after, describe, it } from "node:test";
import type { HandleSingleModel } from "../../open-sse/services/combo/types.ts";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-expiry-first-combo-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const dbCore = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { setQuotaCache, getQuotaCache } = await import("../../src/domain/quotaCache.ts");
const { orderTargetsByExpiryFirst, orderTargetsByResetAwareQuota, buildScopedExpiryQuotaView } =
  await import("../../open-sse/services/combo/quotaStrategies.ts");
const { resolveExpiryFirstConfig, scoreExpiryFirstQuota } =
  await import("../../open-sse/services/combo/quotaScoring.ts");
const { ROUTING_STRATEGY_VALUES } = await import("../../src/shared/constants/routingStrategies.ts");
const { getStrategyTraits } = await import("../../open-sse/services/combo/strategyRegistry.ts");
const { HANDLED_COMBO_STRATEGIES } =
  await import("../../open-sse/services/combo/strategyDispatch.ts");
const { createComboSchema } = await import("../../src/shared/validation/schemas.ts");
const { runComboCreateCommand } = await import("../../bin/cli/commands/combo.mjs");

after(() => {
  dbCore.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
});

const HOUR = 60 * 60 * 1000;
// Fixed anchor for scorer-exact cases; ordering-only cases use live times.
const NOW = Date.UTC(2026, 9, 21, 0, 0, 0);

function makeLog() {
  return {
    info() {},
    warn() {},
    debug() {},
    error() {},
  };
}

async function createConnection(provider: string, label: string) {
  const connection = await providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name: `${label}-${randomUUID()}`,
    accessToken: `token-${label}-${randomUUID()}`,
    isActive: true,
    testStatus: "active",
  });
  return String(connection.id);
}

function mkTarget(connectionId: string | null, provider: string, modelStr: string, n: number) {
  return {
    kind: "model" as const,
    stepId: `step-${n}`,
    executionKey: `exec-${n}`,
    modelStr,
    provider,
    providerId: provider,
    connectionId,
    weight: 1,
    label: null,
  };
}

function isoFromNow(ms: number) {
  return new Date(Date.now() + ms).toISOString();
}

/** Seed one weekly window: `remainingPercent` left, resetting in `resetInMs`. */
function seedWeekly(
  connectionId: string,
  provider: string,
  remainingPercent: number,
  resetInMs: number
) {
  setQuotaCache(connectionId, provider, {
    weekly: { remainingPercentage: remainingPercent, resetAt: isoFromNow(resetInMs) },
  });
}

async function orderIds(
  targets: ReturnType<typeof mkTarget>[],
  comboName: string,
  apiKeyAllowedConnectionIds?: string[] | null
) {
  const ordered = await orderTargetsByExpiryFirst(
    targets,
    comboName,
    null,
    makeLog(),
    apiKeyAllowedConnectionIds
  );
  return ordered.map((t) => t.connectionId);
}

describe("expiry-first combo ordering", () => {
  it("case 1: drains the expiring account first (reversed priority input)", async () => {
    // A 80% left / resets in 39min vs B 48% left / resets in 9h44m. Priority
    // order is [B, A] so the expiry-first answer differs from the input order.
    const aId = await createConnection("codex", "c1-a");
    const bId = await createConnection("codex", "c1-b");
    seedWeekly(aId, "codex", 80, 39 * 60 * 1000);
    seedWeekly(bId, "codex", 48, (9 * 60 + 44) * 60 * 1000);

    const targets = [mkTarget(bId, "codex", "gpt-5", 1), mkTarget(aId, "codex", "gpt-5", 2)];
    const ids = await orderIds(targets, "ef-c1");
    assert.deepEqual(ids, [aId, bId]);
  });

  it("case 2: reset-aware answers the same fixture differently", async () => {
    const aId = await createConnection("codex", "c2-a");
    const bId = await createConnection("codex", "c2-b");
    seedWeekly(aId, "codex", 80, 39 * 60 * 1000);
    seedWeekly(bId, "codex", 48, (9 * 60 + 44) * 60 * 1000);

    const targets = [mkTarget(bId, "codex", "gpt-5", 1), mkTarget(aId, "codex", "gpt-5", 2)];
    const ordered = await orderTargetsByResetAwareQuota(targets, "ef-c2", null, makeLog());
    assert.deepEqual(
      ordered.map((t) => t.connectionId),
      [bId, aId]
    );
  });

  it("case 3: relative tie band rotates 4.0 vs 3.84", async () => {
    // Same absolute resetAt for both -> scores 0.8/h and 0.768/h, a 4% relative
    // gap: tied at the default 5% band regardless of clock drift. An absolute
    // 0.05 band would NOT tie them (diff ~= 0.16/h) — that is injection §8.3.2.
    const aId = await createConnection("codex", "c3-a");
    const bId = await createConnection("codex", "c3-b");
    const resetAt = isoFromNow(12 * 60 * 1000);
    setQuotaCache(aId, "codex", { weekly: { remainingPercentage: 80, resetAt } });
    setQuotaCache(bId, "codex", { weekly: { remainingPercentage: 76.8, resetAt } });

    const targets = [mkTarget(aId, "codex", "gpt-5", 1), mkTarget(bId, "codex", "gpt-5", 2)];
    const first1 = (await orderIds(targets, "ef-c3"))[0];
    const first2 = (await orderIds(targets, "ef-c3"))[0];
    assert.notEqual(first1, first2);
  });

  it("case 4: scores 10% apart do not rotate", async () => {
    const aId = await createConnection("codex", "c4-a");
    const bId = await createConnection("codex", "c4-b");
    const resetAt = isoFromNow(12 * 60 * 1000);
    setQuotaCache(aId, "codex", { weekly: { remainingPercentage: 80, resetAt } });
    setQuotaCache(bId, "codex", { weekly: { remainingPercentage: 72, resetAt } });

    const targets = [mkTarget(aId, "codex", "gpt-5", 1), mkTarget(bId, "codex", "gpt-5", 2)];
    const first1 = (await orderIds(targets, "ef-c4"))[0];
    const first2 = (await orderIds(targets, "ef-c4"))[0];
    assert.equal(first1, aId);
    assert.equal(first2, aId);
  });

  it("case 5: zero-score pass-through keeps priority order and stays stable", async () => {
    const aId = await createConnection("codex", "c5-a");
    const bId = await createConnection("codex", "c5-b");
    // No quota seeded at all -> both score 0 -> expanded order preserved.
    const targets = [mkTarget(aId, "codex", "gpt-5", 1), mkTarget(bId, "codex", "gpt-5", 2)];
    const ids1 = await orderIds(targets, "ef-c5");
    const ids2 = await orderIds(targets, "ef-c5");
    assert.deepEqual(ids1, [aId, bId]);
    assert.deepEqual(ids2, [aId, bId]);
  });

  it("case 6: cold cache degrades to priority order without throwing", async () => {
    const aId = await createConnection("codex", "c6-a");
    const bId = await createConnection("codex", "c6-b");
    const targets = [mkTarget(aId, "codex", "gpt-5", 1), mkTarget(bId, "codex", "gpt-5", 2)];
    const ids = await orderIds(targets, "ef-c6");
    assert.deepEqual(ids, [aId, bId]);
  });

  it("case 7: a target below the exhausted floor never leads", async () => {
    const aId = await createConnection("codex", "c7-a");
    const bId = await createConnection("codex", "c7-b");
    // 0.5% left < the default 1% exhausted floor -> scores 0.
    seedWeekly(aId, "codex", 0.5, 30 * 60 * 1000);
    seedWeekly(bId, "codex", 50, 1 * HOUR);

    const targets = [mkTarget(aId, "codex", "gpt-5", 1), mkTarget(bId, "codex", "gpt-5", 2)];
    const ids = await orderIds(targets, "ef-c7");
    assert.equal(ids[0], bId);
  });

  it("case 8: a reset in the past clamps to minHours, no crash, still positive", async () => {
    const aId = await createConnection("codex", "c8-a");
    // Weekly 80% left whose reset passed an hour before NOW.
    const resetAt = new Date(NOW - 1 * HOUR).toISOString();
    setQuotaCache(aId, "codex", { weekly: { remainingPercentage: 80, resetAt } });

    const view = buildScopedExpiryQuotaView(aId, "codex", "gpt-5");
    assert.ok(view, "projection must survive a stale snapshot");
    const config = resolveExpiryFirstConfig(null);
    const { score } = scoreExpiryFirstQuota(view, config, NOW);
    // Clamped to the default minHours 0.25: 0.8 / 0.25 = 3.2, maximally urgent.
    assert.ok(Math.abs(score - 3.2) < 1e-9, `expected 3.2, got ${score}`);
  });

  it("case 9: session window is capOnly — the weekly deadline wins", async () => {
    const aId = await createConnection("codex", "c9-a");
    setQuotaCache(aId, "codex", {
      weekly: {
        remainingPercentage: 20,
        resetAt: new Date(NOW + 2 * HOUR).toISOString(),
      },
      session: {
        remainingPercentage: 80,
        resetAt: new Date(NOW + 39 * 60 * 1000).toISOString(),
      },
    });
    const view = buildScopedExpiryQuotaView(aId, "codex", "gpt-5");
    const config = resolveExpiryFirstConfig(null);
    // usable = min(0.8 session-left, 0.2 weekly-left) = 0.2; deadline = weekly 2h.
    const { score } = scoreExpiryFirstQuota(view, config, NOW);
    assert.ok(Math.abs(score - 0.1) < 1e-9, `expected 0.1, got ${score}`);
  });

  it("case 9b: no weekly resetAt falls back to the session deadline", async () => {
    const aId = await createConnection("codex", "c9b-a");
    setQuotaCache(aId, "codex", {
      weekly: { remainingPercentage: 20, resetAt: null },
      session: {
        remainingPercentage: 80,
        resetAt: new Date(NOW + 39 * 60 * 1000).toISOString(),
      },
    });
    const view = buildScopedExpiryQuotaView(aId, "codex", "gpt-5");
    const config = resolveExpiryFirstConfig(null);
    // 0.2 / 0.65h
    const { score } = scoreExpiryFirstQuota(view, config, NOW);
    assert.ok(Math.abs(score - 0.2 / 0.65) < 1e-9, `expected ~0.3077, got ${score}`);
  });

  it("case 9c: an expired session window is skipped, not clamped", async () => {
    const aId = await createConnection("codex", "c9c-a");
    setQuotaCache(aId, "codex", {
      weekly: {
        remainingPercentage: 20,
        resetAt: new Date(NOW + 2 * HOUR).toISOString(),
      },
      // Session 95% used / 5% left, reset already past. A regression that keeps
      // the expired session's cap computes min(0.05, 0.2)/2 = 0.025 — this
      // fixture distinguishes that from the correct 0.1.
      session: {
        remainingPercentage: 5,
        resetAt: new Date(NOW - 5 * 60 * 1000).toISOString(),
      },
    });
    const view = buildScopedExpiryQuotaView(aId, "codex", "gpt-5");
    const config = resolveExpiryFirstConfig(null);
    const { score } = scoreExpiryFirstQuota(view, config, NOW);
    assert.ok(Math.abs(score - 0.1) < 1e-9, `expected 0.1, got ${score}`);
  });

  it("case 10: the API-key allowlist filters before scoring", async () => {
    const aId = await createConnection("codex", "c10-a");
    const bId = await createConnection("codex", "c10-b");
    // A holds the most urgent quota but is not on the allowlist.
    seedWeekly(aId, "codex", 95, 15 * 60 * 1000);
    seedWeekly(bId, "codex", 50, 24 * HOUR);

    const targets = [mkTarget(aId, "codex", "gpt-5", 1), mkTarget(bId, "codex", "gpt-5", 2)];
    const ids = await orderIds(targets, "ef-c10", [bId]);
    assert.deepEqual(ids, [bId]);
  });

  it("case 14: registry, schema and CLI all accept the strategy", async () => {
    assert.ok(ROUTING_STRATEGY_VALUES.includes("expiry-first"));
    assert.equal(getStrategyTraits("expiry-first").protectsFirstTargetFromAffinity, true);
    assert.ok(HANDLED_COMBO_STRATEGIES.includes("expiry-first"));

    const parsed = createComboSchema.safeParse({
      name: `ef-c14-${randomUUID()}`,
      strategy: "expiry-first",
      models: ["codex/gpt-5"],
    });
    assert.equal(parsed.success, true, JSON.stringify(parsed.success ? {} : parsed.error.issues));

    // CLI: strategy validation precedes the models check, so reaching the
    // models error proves VALID_STRATEGIES accepted "expiry-first".
    const errors: string[] = [];
    const originalError = console.error;
    console.error = (msg: unknown) => errors.push(String(msg));
    try {
      const rc = await runComboCreateCommand("ef-c14", "expiry-first", { models: [] });
      assert.equal(rc, 1);
    } finally {
      console.error = originalError;
    }
    assert.ok(
      !errors.some((line) => line.includes("Invalid strategy")),
      `CLI rejected the strategy: ${errors.join(" | ")}`
    );
  });

  it("case 16: Antigravity family scoping ranks on the bucket the model spends", async () => {
    const aId = await createConnection("agy", "c16-a");
    const bId = await createConnection("agy", "c16-b");
    // No resetAt anywhere -> the scorer's no-deadline branch ranks on usable.
    setQuotaCache(aId, "agy", {
      gemini_weekly: { remainingPercentage: 80, resetAt: null },
      claude_gpt_weekly: { remainingPercentage: 0, resetAt: null },
    });
    setQuotaCache(bId, "agy", {
      gemini_weekly: { remainingPercentage: 20, resetAt: null },
      claude_gpt_weekly: { remainingPercentage: 90, resetAt: null },
    });

    // Scoped to a Gemini model: A wins (0.8 vs 0.2 on gemini_weekly).
    const geminiTargets = [
      mkTarget(bId, "agy", "gemini-3.8-flash-high", 1),
      mkTarget(aId, "agy", "gemini-3.8-flash-high", 2),
    ];
    assert.deepEqual(await orderIds(geminiTargets, "ef-c16"), [aId, bId]);

    // Mirrored Claude model: A's claude_gpt_weekly bucket is empty, so the
    // expander's per-model exhaustion filter drops A before scoring — B leads,
    // and A may be absent entirely rather than merely second.
    const claudeTargets = [
      mkTarget(aId, "agy", "claude-opus-4-6-thinking", 1),
      mkTarget(bId, "agy", "claude-opus-4-6-thinking", 2),
    ];
    const claudeIds = await orderIds(claudeTargets, "ef-c16-claude");
    assert.equal(claudeIds[0], bId);
    assert.ok(!claudeIds.includes(aId) || claudeIds.indexOf(aId) > 0);

    // Control: with the family filter bypassed (no requested model), A's usable
    // collapses through the empty Claude bucket and B wins — the scoped result
    // above cannot pass for the wrong reason.
    const config = resolveExpiryFirstConfig(null);
    const viewA = buildScopedExpiryQuotaView(aId, "agy", null);
    const viewB = buildScopedExpiryQuotaView(bId, "agy", null);
    const scoreA = scoreExpiryFirstQuota(viewA, config, NOW).score;
    const scoreB = scoreExpiryFirstQuota(viewB, config, NOW).score;
    assert.ok(scoreB > scoreA, `unscoped control: B ${scoreB} should beat A ${scoreA}`);
  });

  it("case 17: Codex Spark scope selects only Spark-keyed windows", async () => {
    const aId = await createConnection("codex", "c17-a");
    setQuotaCache(aId, "codex", {
      weekly: {
        remainingPercentage: 90,
        resetAt: new Date(NOW + 1 * HOUR).toISOString(),
      },
      gpt_5_3_codex_spark_weekly: {
        remainingPercentage: 60,
        resetAt: new Date(NOW + 2 * HOUR).toISOString(),
      },
    });

    const sparkView = buildScopedExpiryQuotaView(aId, "codex", "gpt-5.3-codex-spark");
    assert.ok(sparkView);
    const sparkWindows = Object.keys((sparkView as { windows: Record<string, unknown> }).windows);
    assert.deepEqual(sparkWindows, ["gpt_5_3_codex_spark_weekly"]);

    const regularView = buildScopedExpiryQuotaView(aId, "codex", "gpt-5");
    assert.ok(regularView);
    const regularWindows = Object.keys(
      (regularView as { windows: Record<string, unknown> }).windows
    );
    assert.deepEqual(regularWindows, ["weekly"]);
  });

  it("case 18: an unknown window is skipped, not read as exhausted", async () => {
    const aId = await createConnection("codex", "c18-a");
    setQuotaCache(aId, "codex", {
      weekly: {
        remainingPercentage: 50,
        resetAt: new Date(NOW + 1 * HOUR).toISOString(),
      },
      monthly: { fractionReported: false, remainingPercentage: 0 },
    });

    const view = buildScopedExpiryQuotaView(aId, "codex", "gpt-5");
    assert.ok(view, "one reported window must produce a view");
    const windows = (view as { windows: Record<string, unknown> }).windows;
    assert.deepEqual(Object.keys(windows), ["weekly"]);

    const config = resolveExpiryFirstConfig(null);
    const { score } = scoreExpiryFirstQuota(view, config, NOW);
    // usable 0.5 / deadline 1h — NOT crushed to 0 by the unknown monthly row.
    assert.ok(Math.abs(score - 0.5) < 1e-9, `expected 0.5, got ${score}`);
  });

  it("case 19: all-unknown telemetry degrades to priority pass-through", async () => {
    const aId = await createConnection("codex", "c19-a");
    const bId = await createConnection("codex", "c19-b");
    setQuotaCache(aId, "codex", {
      weekly: { fractionReported: false, remainingPercentage: 0 },
    });
    setQuotaCache(bId, "codex", {
      weekly: { fractionReported: false, remainingPercentage: 0 },
    });

    assert.equal(buildScopedExpiryQuotaView(aId, "codex", "gpt-5"), null);

    const targets = [mkTarget(aId, "codex", "gpt-5", 1), mkTarget(bId, "codex", "gpt-5", 2)];
    const ids = await orderIds(targets, "ef-c19");
    assert.deepEqual(ids, [aId, bId]);
  });
});

/* ------------------------------------------------------------------------ */
/* Group B -- dispatch-level interplay (spec §8 cases 11-15, 20-25)          */
/* ------------------------------------------------------------------------ */

const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { saveModelsDevCapabilities } = await import("../../src/lib/modelsDevSync.ts");
const evalsDb = await import("../../src/lib/db/evals.ts");
const { resetEvalRoutingCache } = await import("../../open-sse/services/evalRouting.ts");
const { clearAllStickyBindings } =
  await import("../../open-sse/services/combo/sessionStickiness.ts");
const { getCircuitBreaker, resetAllCircuitBreakers } =
  await import("../../src/shared/utils/circuitBreaker.ts");
const { connectionCircuitBreakerName } =
  await import("../../open-sse/services/connectionCircuitBreaker.ts");
const { pinNativeCodexTurn, clearNativeCodexTurnPinsForTests } =
  await import("../../open-sse/services/combo/nativeCodexTurnPin.ts");
const { applyPromptCacheAffinity } =
  await import("../../open-sse/services/combo/promptCacheAffinity.ts");

const URGENT_IN_MS = 39 * 60 * 1000; // resets in 39 minutes
const IDLE_IN_MS = 9 * HOUR + 44 * 60 * 1000; // resets in 9h44m

function dispatchLog() {
  const infos: string[] = [];
  return {
    infos,
    info(_tag: string, msg: string) {
      infos.push(String(msg));
    },
    warn() {},
    debug() {},
    error() {},
  };
}

function capabilityEntry(limitContext: unknown, overrides: Record<string, unknown> = {}) {
  return {
    tool_call: true,
    reasoning: false,
    attachment: false,
    structured_output: true,
    temperature: true,
    modalities_input: JSON.stringify(["text"]),
    modalities_output: JSON.stringify(["text"]),
    knowledge_cutoff: null,
    release_date: null,
    last_updated: null,
    status: null,
    family: null,
    open_weights: false,
    limit_context: limitContext,
    limit_input: limitContext,
    limit_output: 4096,
    interleaved_field: null,
    ...overrides,
  };
}

function mkModelEntry(connectionId: string, model: string) {
  return {
    kind: "model",
    provider: "codex",
    providerId: "codex",
    model,
    connectionId,
    id: `${connectionId}:${model}`,
  };
}

function dispatchCombo(
  name: string,
  connectionIds: string[],
  config: Record<string, unknown> = {}
) {
  return {
    name,
    strategy: "expiry-first",
    models: connectionIds.map((cid) => mkModelEntry(cid, "gpt-5")),
    config: { maxRetries: 0, ...config },
  };
}

const DISPATCH_MESSAGES = [{ role: "user", content: "hi" }];

async function runDispatch(
  combo: Record<string, unknown>,
  body: Record<string, unknown>,
  extra: Record<string, unknown> = {}
) {
  const calls: Array<string | null> = [];
  const log = dispatchLog();
  const result = await handleComboChat({
    body,
    combo,
    allCombos: [combo],
    isModelAvailable: () => true,
    relayOptions: {},
    signal: undefined,
    settings: extra.settings ?? {},
    log,
    handleSingleModel: (async (_body: unknown, _modelStr: string, target) => {
      calls.push(target?.connectionId ?? null);
      return Response.json({ choices: [{ message: { role: "assistant", content: _modelStr } }] });
    }) as HandleSingleModel,
    apiKeyAllowedConnections: extra.apiKeyAllowedConnections,
    clientManagedResponsesContext: extra.clientManagedResponsesContext === true,
  });
  return { calls, result, log };
}

// case 13: the "expiry-first" combo value reaches the strategy-map entry at dispatch level.
test("dispatch: expiry-first combo routes through orderTargetsByExpiryFirst", async () => {
  const aId = await createConnection("codex", "c13-a");
  const bId = await createConnection("codex", "c13-b");
  seedWeekly(bId, "codex", 20, IDLE_IN_MS);
  seedWeekly(aId, "codex", 90, URGENT_IN_MS);
  const combo = dispatchCombo("expiry-first-dispatch-13", [bId, aId]);
  const { calls, log } = await runDispatch(combo, {
    model: combo.name,
    messages: DISPATCH_MESSAGES,
  });
  assert.equal(calls[0], aId, "expiry-urgent connection must be dialed first");
  assert.ok(
    log.infos.some((line) => line.includes("Expiry-first ordering")),
    "expected the expiry-first dispatch branch log line"
  );
});

// case 12: session stickiness pins the first pick; disabling it restores ordering.
test("dispatch: session stickiness pins the expiry-first winner until disabled", async () => {
  clearAllStickyBindings();
  const aId = await createConnection("codex", "c12-a");
  const bId = await createConnection("codex", "c12-b");
  const combo = dispatchCombo("expiry-first-sticky-12", [bId, aId]);
  const body = { model: combo.name, messages: [{ role: "user", content: "sticky-probe-12" }] };
  seedWeekly(aId, "codex", 90, URGENT_IN_MS);
  seedWeekly(bId, "codex", 20, IDLE_IN_MS);
  const first = await runDispatch(combo, body);
  assert.equal(first.calls[0], aId);
  // flip urgency: B is now the expiry-first winner
  seedWeekly(aId, "codex", 20, IDLE_IN_MS);
  seedWeekly(bId, "codex", 90, URGENT_IN_MS);
  const second = await runDispatch(combo, body);
  assert.equal(second.calls[0], aId, "stickiness must pin the first pick");
  // control: same combo shape with stickiness disabled re-evaluates the ordering
  const comboNoSticky = dispatchCombo("expiry-first-nosticky-12", [bId, aId], {
    disableSessionStickiness: true,
  });
  const third = await runDispatch(comboNoSticky, {
    model: comboNoSticky.name,
    messages: body.messages,
  });
  assert.equal(third.calls[0], bId, "without stickiness the new winner must be dialed");
});

// case 15: every candidate filtered -> the combo's existing empty-target error path.
test("dispatch: all-filtered pool fails via the existing empty-target path", async () => {
  const aId = await createConnection("codex", "c15-a");
  const bId = await createConnection("codex", "c15-b");
  seedWeekly(aId, "codex", 0, URGENT_IN_MS);
  seedWeekly(bId, "codex", 0, IDLE_IN_MS);
  const combo = dispatchCombo("expiry-first-empty-15", [aId, bId]);
  const { calls, result } = await runDispatch(combo, {
    model: combo.name,
    messages: DISPATCH_MESSAGES,
  });
  assert.equal(calls.length, 0, "no connection may be dialed");
  assert.notEqual(result.status, 200, "empty pool must not surface as a successful response");
});

// case 25: hard capability mismatch deletes the expiry winner; control fails closed.
test("dispatch: hard capability mismatch deletes the expiry-first winner", async () => {
  saveModelsDevCapabilities({
    codex: {
      "gpt-5-no-tools-25": capabilityEntry(1048576, { tool_call: false }),
      "gpt-5-tools-25": capabilityEntry(1048576, { tool_call: true }),
      "gpt-5-notools-25c": capabilityEntry(1048576, { tool_call: false }),
      "gpt-5-notools-25d": capabilityEntry(1048576, { tool_call: false }),
    },
  });
  const aId = await createConnection("codex", "c25-a");
  const bId = await createConnection("codex", "c25-b");
  seedWeekly(aId, "codex", 90, URGENT_IN_MS);
  seedWeekly(bId, "codex", 20, IDLE_IN_MS);
  const combo = {
    name: "expiry-first-cap-25",
    strategy: "expiry-first",
    models: [mkModelEntry(aId, "gpt-5-no-tools-25"), mkModelEntry(bId, "gpt-5-tools-25")],
    config: { maxRetries: 0 },
  };
  const toolsBody = {
    model: combo.name,
    messages: DISPATCH_MESSAGES,
    tools: [{ type: "function", function: { name: "f", parameters: { type: "object" } } }],
  };
  const { calls } = await runDispatch(combo, toolsBody);
  assert.equal(calls[0], bId, "tool-capable account must be dialed");
  // control: no candidate qualifies -> rejected fail-closed. Fresh models and a fresh
  // combo avoid relying on capability-store mutation between dispatches.
  const cId = await createConnection("codex", "c25-c");
  const dId = await createConnection("codex", "c25-d");
  seedWeekly(cId, "codex", 90, URGENT_IN_MS);
  seedWeekly(dId, "codex", 20, IDLE_IN_MS);
  const emptyCombo = {
    name: "expiry-first-cap-25-empty",
    strategy: "expiry-first",
    models: [mkModelEntry(cId, "gpt-5-notools-25c"), mkModelEntry(dId, "gpt-5-notools-25d")],
    config: { maxRetries: 0 },
  };
  const second = await runDispatch(emptyCombo, { ...toolsBody, model: emptyCombo.name });
  assert.equal(second.calls.length, 0, "fail-closed: no connection dialed");
  assert.notEqual(second.result.status, 200);
});

// case 22: default request-compatibility promotion (context length) beats the expiry pick.
test("dispatch: request context compatibility promotes the fitting account", async () => {
  saveModelsDevCapabilities({
    codex: {
      "gpt-5-smallctx-22": capabilityEntry(8192),
      "gpt-5-largectx-22": capabilityEntry(1048576),
    },
  });
  const aId = await createConnection("codex", "c22-a");
  const bId = await createConnection("codex", "c22-b");
  seedWeekly(aId, "codex", 90, URGENT_IN_MS);
  seedWeekly(bId, "codex", 20, IDLE_IN_MS);
  const combo = {
    name: "expiry-first-ctx-22",
    strategy: "expiry-first",
    models: [mkModelEntry(aId, "gpt-5-smallctx-22"), mkModelEntry(bId, "gpt-5-largectx-22")],
    config: { maxRetries: 0 },
  };
  const bigBody = {
    model: combo.name,
    messages: [{ role: "user", content: "x".repeat(40000) }],
  };
  const big = await runDispatch(combo, bigBody);
  assert.equal(big.calls[0], bId, "oversized request must promote the large-context account");
  const small = await runDispatch(combo, { model: combo.name, messages: DISPATCH_MESSAGES });
  assert.equal(small.calls[0], aId, "small request keeps the expiry-first winner");
});

// case 24: an open circuit breaker is skipped inside the reordered list.
test("dispatch: open circuit breaker on the expiry winner falls to the next survivor", async () => {
  const aId = await createConnection("codex", "c24-a");
  const bId = await createConnection("codex", "c24-b");
  seedWeekly(aId, "codex", 90, URGENT_IN_MS);
  seedWeekly(bId, "codex", 20, IDLE_IN_MS);
  const combo = dispatchCombo("expiry-first-breaker-24", [bId, aId]);
  const body = { model: combo.name, messages: DISPATCH_MESSAGES };
  try {
    const before = await runDispatch(combo, body);
    assert.equal(before.calls[0], aId, "sanity: expiry winner dialed before the breaker opens");
    const breaker = getCircuitBreaker(connectionCircuitBreakerName("codex", aId));
    for (let i = 0; i < 5; i += 1) {
      await assert.rejects(
        breaker.execute(async () => {
          throw new Error("forced failure");
        })
      );
    }
    assert.equal(breaker.getStatus().state, "OPEN");
    const after = await runDispatch(combo, body);
    assert.equal(after.calls[0], bId, "breaker-open connection must be skipped");
  } finally {
    resetAllCircuitBreakers();
  }
});

// case 21: contextRequirements configuration wins over the expiry-first pick.
test("dispatch: contextRequirements configuration outranks the expiry-first pick", async () => {
  saveModelsDevCapabilities({
    codex: {
      "gpt-5-creq-a-21": capabilityEntry(8192),
      "gpt-5-creq-b-21": capabilityEntry(1048576),
    },
  });
  const aId = await createConnection("codex", "c21-a");
  const bId = await createConnection("codex", "c21-b");
  seedWeekly(aId, "codex", 90, URGENT_IN_MS);
  seedWeekly(bId, "codex", 20, IDLE_IN_MS);
  const combo = {
    name: "expiry-first-creq-21",
    strategy: "expiry-first",
    models: [mkModelEntry(aId, "gpt-5-creq-a-21"), mkModelEntry(bId, "gpt-5-creq-b-21")],
    config: { maxRetries: 0, contextRequirements: { minContextWindow: 100000 } },
  };
  const { calls } = await runDispatch(combo, { model: combo.name, messages: DISPATCH_MESSAGES });
  assert.equal(calls[0], bId, "context requirement must remove the small-window account");
});

// case 20: evalRouting, when configured, wins over the expiry-first pick.
test("dispatch: evalRouting overrides the expiry-first pick when configured", async () => {
  resetEvalRoutingCache();
  const aId = await createConnection("codex", "c20-a");
  const bId = await createConnection("codex", "c20-b");
  seedWeekly(aId, "codex", 90, URGENT_IN_MS);
  seedWeekly(bId, "codex", 20, IDLE_IN_MS);
  evalsDb.saveEvalRun({
    suiteId: "expiry-routing-20",
    suiteName: "Expiry Routing 20",
    target: { type: "model", id: "codex/gpt-5-evala-20", label: "Model: codex/gpt-5-evala-20" },
    summary: { total: 10, passed: 4, failed: 6, passRate: 40 },
    avgLatencyMs: 100,
    results: [],
    createdAt: new Date().toISOString(),
  });
  evalsDb.saveEvalRun({
    suiteId: "expiry-routing-20",
    suiteName: "Expiry Routing 20",
    target: { type: "model", id: "codex/gpt-5-evalb-20", label: "Model: codex/gpt-5-evalb-20" },
    summary: { total: 10, passed: 9, failed: 1, passRate: 90 },
    avgLatencyMs: 120,
    results: [],
    createdAt: new Date().toISOString(),
  });
  const combo = {
    name: "expiry-first-eval-20",
    strategy: "expiry-first",
    models: [mkModelEntry(aId, "gpt-5-evala-20"), mkModelEntry(bId, "gpt-5-evalb-20")],
    config: {
      maxRetries: 0,
      evalRouting: {
        enabled: true,
        suiteIds: ["expiry-routing-20"],
        qualityWeight: 1,
        latencyWeight: 0,
        minCases: 1,
      },
    },
  };
  const { calls } = await runDispatch(combo, { model: combo.name, messages: DISPATCH_MESSAGES });
  assert.equal(calls[0], bId, "eval routing must promote the higher-scoring model");
  // control: without evalRouting the expiry-first winner stands
  const comboPlain = {
    name: "expiry-first-eval-20-plain",
    strategy: "expiry-first",
    models: combo.models,
    config: { maxRetries: 0 },
  };
  const plain = await runDispatch(comboPlain, {
    model: comboPlain.name,
    messages: DISPATCH_MESSAGES,
  });
  assert.equal(plain.calls[0], aId);
});

// case 23: a live native Codex turn pin outranks the expiry-first pick.
test("dispatch: native Codex turn pin outranks the expiry-first pick", async () => {
  clearNativeCodexTurnPinsForTests();
  const aId = await createConnection("codex", "c23-a");
  const bId = await createConnection("codex", "c23-b");
  seedWeekly(aId, "codex", 90, URGENT_IN_MS);
  seedWeekly(bId, "codex", 20, IDLE_IN_MS);
  const combo = dispatchCombo("expiry-first-nativepin-23", [bId, aId]);
  const body = {
    model: combo.name,
    messages: DISPATCH_MESSAGES,
    client_metadata: {
      "x-codex-turn-metadata": { thread_id: "thread-23", turn_id: "turn-23" },
    },
  };
  try {
    pinNativeCodexTurn({
      body,
      comboName: combo.name,
      target: { modelStr: "codex/gpt-5", provider: "codex" },
      connectionId: bId,
    });
    const pinned = await runDispatch(combo, body, { clientManagedResponsesContext: true });
    assert.equal(pinned.calls[0], bId, "live turn pin must be honored first");
    clearAllStickyBindings();
    const unpinned = await runDispatch(combo, body, { clientManagedResponsesContext: false });
    assert.equal(unpinned.calls[0], aId, "without the pin context the expiry winner stands");
  } finally {
    clearNativeCodexTurnPinsForTests();
  }
});

// cases 11a/11b/11c: prompt-cache affinity never overrides the expiry-first first pick.
function mkAffinityTarget(connectionId: string) {
  return mkTarget(connectionId, "codex", "gpt-5", 1);
}

// Rendezvous hashing is deterministic: search for a body whose affinity order would put
// `preferredId` first, so the dispatch assertion below actually discriminates.
function findAffinityBody(
  preferredId: string,
  otherId: string,
  makeBody: (i: number) => Record<string, unknown>
) {
  for (let i = 0; i < 500; i += 1) {
    const body = makeBody(i);
    const ordered = applyPromptCacheAffinity(
      [mkAffinityTarget(otherId), mkAffinityTarget(preferredId)],
      body
    );
    if (ordered.applied && ordered.targets[0]?.connectionId === preferredId) {
      return body;
    }
  }
  throw new Error("no affinity-preferring body found within the search budget");
}

test("dispatch: prompt-cache affinity (implicit prefix) keeps the expiry-first pick", async () => {
  const aId = await createConnection("codex", "c11a-a");
  const bId = await createConnection("codex", "c11a-b");
  seedWeekly(aId, "codex", 90, URGENT_IN_MS);
  seedWeekly(bId, "codex", 20, IDLE_IN_MS);
  const combo = dispatchCombo("expiry-first-affinity-11a", [bId, aId]);
  const body = findAffinityBody(bId, aId, (i) => ({
    model: combo.name,
    messages: [
      { role: "system", content: `affinity-prefix-probe-${i}` },
      { role: "user", content: "hello" },
    ],
  }));
  const { calls } = await runDispatch(combo, body);
  assert.equal(calls[0], aId, "protectsFirstTargetFromAffinity must keep the expiry winner");
});

test("dispatch: prompt-cache affinity (explicit key) keeps the expiry-first pick", async () => {
  const aId = await createConnection("codex", "c11b-a");
  const bId = await createConnection("codex", "c11b-b");
  seedWeekly(aId, "codex", 90, URGENT_IN_MS);
  seedWeekly(bId, "codex", 20, IDLE_IN_MS);
  const combo = dispatchCombo("expiry-first-affinity-11b", [bId, aId]);
  const body = findAffinityBody(bId, aId, (i) => ({
    model: combo.name,
    messages: DISPATCH_MESSAGES,
    prompt_cache_key: `pc-key-11b-${i}`,
  }));
  const { calls } = await runDispatch(combo, body);
  assert.equal(calls[0], aId, "explicit prompt_cache_key must not override the expiry winner");
});

test("dispatch: promptCacheAffinityEnabled false leaves the expiry-first order untouched", async () => {
  const aId = await createConnection("codex", "c11c-a");
  const bId = await createConnection("codex", "c11c-b");
  seedWeekly(aId, "codex", 90, URGENT_IN_MS);
  seedWeekly(bId, "codex", 20, IDLE_IN_MS);
  const combo = dispatchCombo("expiry-first-affinity-11c", [bId, aId]);
  const body = findAffinityBody(bId, aId, (i) => ({
    model: combo.name,
    messages: DISPATCH_MESSAGES,
    prompt_cache_key: `pc-key-11c-${i}`,
  }));
  const { calls } = await runDispatch(combo, body, {
    settings: { promptCacheAffinityEnabled: false },
  });
  assert.equal(calls[0], aId, "with affinity disabled the strategy order stands");
});

// case 26: coerceRemainingPercent. setQuotaCache normalizes numbers, so these
// cases write the raw value into the cached row directly, as a row restored
// from an older or external source could carry it.
describe("expiry-first: remainingPercentage coercion", () => {
  async function seedRawWeekly(label: string, raw: unknown, resetInMs = HOUR) {
    const id = await createConnection("codex", label);
    setQuotaCache(id, "codex", {
      weekly: { remainingPercentage: 50, resetAt: isoFromNow(resetInMs) },
    });
    const entry = getQuotaCache(id);
    assert.ok(entry?.quotas.weekly, "seeded weekly window must exist");
    (entry.quotas.weekly as { remainingPercentage: unknown }).remainingPercentage = raw;
    return id;
  }

  function weeklyPercentUsed(view: Record<string, unknown> | null) {
    assert.ok(view, "expected a quota view");
    const windows = (view as { windows: Record<string, { percentUsed: number }> }).windows;
    return windows.weekly.percentUsed;
  }

  it("case 26a: a numeric string is parsed, with surrounding spaces trimmed", async () => {
    const aId = await seedRawWeekly("c26a-a", "40");
    assert.ok(
      Math.abs(weeklyPercentUsed(buildScopedExpiryQuotaView(aId, "codex", "gpt-5")) - 0.6) < 1e-9
    );
    const bId = await seedRawWeekly("c26a-b", " 40 ");
    assert.ok(
      Math.abs(weeklyPercentUsed(buildScopedExpiryQuotaView(bId, "codex", "gpt-5")) - 0.6) < 1e-9
    );
  });

  it("case 26b: an empty or blank string is skipped, not read as 0% left", async () => {
    for (const [i, raw] of ["", "   "].entries()) {
      const id = await seedRawWeekly(`c26b-${i}`, raw);
      assert.equal(
        buildScopedExpiryQuotaView(id, "codex", "gpt-5"),
        null,
        `raw ${JSON.stringify(raw)}`
      );
    }
  });

  it("case 26c: undefined is skipped, not read as exhausted", async () => {
    const id = await seedRawWeekly("c26c", undefined);
    assert.equal(buildScopedExpiryQuotaView(id, "codex", "gpt-5"), null);
  });

  it("case 26d: NaN and a non-numeric string are skipped", async () => {
    for (const [i, raw] of [Number.NaN, "abc", Number.POSITIVE_INFINITY].entries()) {
      const id = await seedRawWeekly(`c26d-${i}`, raw);
      assert.equal(buildScopedExpiryQuotaView(id, "codex", "gpt-5"), null, `raw ${String(raw)}`);
    }
  });
});
