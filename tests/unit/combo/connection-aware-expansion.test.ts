/**
 * Connection-aware expansion for all combo strategies.
 *
 * Group-B strategies (priority / weighted / round-robin / random / p2c /
 * least-used / cost-optimized / lkgp / fill-first / strict-random /
 * context-optimized / cache-optimized / context-relay / fusion / pipeline)
 * historically resolved targets WITHOUT a per-connection view: exhausted
 * accounts kept getting picked. This suite pins the new opt-in pipeline
 * stage `expandTargetsForAllStrategies` -- reusing the A-group expander
 * (`expandTargetsByQuotaAwareConnections`) -- behind the
 * `connectionAwareExpansion` config key (default false).
 *
 * T1-T10 mirror spec section 6 verbatim.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { randomUUID } from "node:crypto";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-conn-aware-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const coreDb = await import("../../../src/lib/db/core.ts");
const providersDb = await import("../../../src/lib/db/providers.ts");
const quotaCache = await import("../../../src/domain/quotaCache.ts");
const { registerQuotaFetcher } = await import("../../../open-sse/services/quotaPreflight.ts");
const {
  expandTargetsForAllStrategies,
  shouldApplyConnectionAwareExpansion,
  CONNECTION_AWARE_EXPANSION_GROUP_B,
} = await import("../../../open-sse/services/combo/connectionAwareExpansion.ts");
const { handleComboChat } = await import("../../../open-sse/services/combo.ts");
const { lockExactModel } = await import("../../../open-sse/services/accountFallback.ts");
const { tryPipelineDispatch } = await import("../../../open-sse/services/combo/dispatchPrelude.ts");
const { resolveComboSetupConfig } = await import("../../../open-sse/services/comboConfig.ts");

const noopLog = { warn: () => {}, info: () => {}, debug: () => {}, error: () => {} };

function makeTarget(overrides: Record<string, unknown> = {}) {
  return {
    kind: "model" as const,
    stepId: "step-1",
    executionKey: "step-1",
    modelStr: "test-provider/model-x",
    provider: "test-provider",
    providerId: null,
    connectionId: null,
    weight: 1,
    label: null,
    ...overrides,
  };
}

test.after(() => {
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

// Gate: strategy + config resolution

test("T0a: group B strategies are the 15 non-quota-aware strategies", () => {
  const groupA = new Set([
    "reset-aware",
    "reset-window",
    "headroom",
    "quota-weighted",
    "quota-share",
    "auto",
  ]);
  for (const strategy of CONNECTION_AWARE_EXPANSION_GROUP_B) {
    assert.ok(!groupA.has(strategy), `group B must not contain A-group strategy ${strategy}`);
  }
  assert.equal(CONNECTION_AWARE_EXPANSION_GROUP_B.length, 15);
  assert.equal(
    CONNECTION_AWARE_EXPANSION_GROUP_B.includes("quota-weighted"),
    false,
    "quota-weighted expands itself; must not sit in group B"
  );
});

test("T0b: gate is closed by default and for A-group strategies", () => {
  assert.equal(
    shouldApplyConnectionAwareExpansion("priority", {}),
    false,
    "default off for group B"
  );
  assert.equal(
    shouldApplyConnectionAwareExpansion("priority", { connectionAwareExpansion: true }),
    true,
    "on for group B when enabled"
  );
  assert.equal(
    shouldApplyConnectionAwareExpansion("priority", null, { connectionAwareExpansion: true }),
    true,
    "fallback to settings when combo config is unset"
  );
  assert.equal(
    shouldApplyConnectionAwareExpansion(
      "priority",
      { connectionAwareExpansion: false },
      { connectionAwareExpansion: true }
    ),
    false,
    "combo config overrides settings"
  );
  assert.equal(
    shouldApplyConnectionAwareExpansion("reset-aware", {
      connectionAwareExpansion: true,
    }),
    false,
    "A-group strategies never double-expand"
  );
  assert.equal(
    shouldApplyConnectionAwareExpansion("quota-weighted", {
      connectionAwareExpansion: true,
    }),
    false,
    "quota-weighted expands itself; never double-expand via group B"
  );
});

// T1: expansion filters exhausted, tags healthy @connectionId

test("T1: B-group target expands to healthy connections only (handleSingleModel receives healthy connectionId)", async () => {
  const provider = "cae-t1-" + randomUUID();
  registerQuotaFetcher(provider, async () => ({ used: 0, total: 100, percentUsed: 0 }));
  const healthy = await providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name: "healthy",
    apiKey: "key-" + randomUUID(),
    isActive: true,
  });
  const limited = await providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name: "limited",
    apiKey: "key-" + randomUUID(),
    isActive: true,
    rateLimitedUntil: new Date(Date.now() + 60_000).toISOString(),
  });

  const target = makeTarget({
    modelStr: `${provider}/model-x`,
    provider,
  });
  const out = await expandTargetsForAllStrategies({
    strategy: "priority",
    targets: [target],
    comboName: "cae-t1",
    config: { connectionAwareExpansion: true },
    log: noopLog,
  });

  assert.equal(out.length, 1, "one expanded target (healthy connection only)");
  assert.equal(out[0].connectionId, healthy.id);
  assert.ok(out[0].executionKey.includes("@" + healthy.id));
  assert.ok(
    !out.some((t) => t.connectionId === limited.id),
    "rate-limited connection must be filtered out"
  );

  // End-to-end through handleComboChat
  let receivedConnectionId: string | null = null;
  const res = await handleComboChat({
    body: { messages: [{ role: "user", content: "hi" }] },
    combo: {
      name: "cae-t1-combo-" + randomUUID(),
      strategy: "priority",
      models: [`${provider}/model-x`],
      config: { connectionAwareExpansion: true },
    },
    handleSingleModel: async (_b, _m, t) => {
      receivedConnectionId =
        (t as { connectionId?: string | null } | undefined)?.connectionId ?? null;
      return new Response(JSON.stringify({ choices: [] }), { status: 200 });
    },
    isModelAvailable: async () => true,
    log: noopLog,
    settings: null,
    allCombos: null,
  });
  assert.equal(res.status, 200);
  assert.equal(
    receivedConnectionId,
    healthy.id,
    "handleSingleModel must receive the healthy connectionId"
  );
});

// T2: switch off = byte-identical passthrough

test("T2: switch off keeps targets byte-identical (no @ suffix)", async () => {
  const provider = "cae-t2-" + randomUUID();
  registerQuotaFetcher(provider, async () => ({ used: 0, total: 100, percentUsed: 0 }));
  await providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name: "only",
    apiKey: "key-" + randomUUID(),
    isActive: true,
  });

  const target = makeTarget({ modelStr: `${provider}/model-x`, provider });
  const out = await expandTargetsForAllStrategies({
    strategy: "priority",
    targets: [target],
    comboName: "cae-t2",
    config: { connectionAwareExpansion: false },
    log: noopLog,
  });

  assert.equal(out.length, 1);
  assert.equal(out[0].connectionId, null, "no connection pinning when off");
  assert.equal(out[0].executionKey, "step-1", "no @connectionId suffix when off");
});

test("T2b: global setting enables expansion when combo config is unset", async () => {
  const provider = "cae-t2b-" + randomUUID();
  registerQuotaFetcher(provider, async () => ({ used: 0, total: 100, percentUsed: 0 }));
  const healthy = await providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name: "healthy",
    isActive: true,
  });

  let receivedConnectionId: string | null = null;
  const res = await handleComboChat({
    body: { messages: [{ role: "user", content: "hi" }] },
    combo: {
      name: "cae-t2b-combo-" + randomUUID(),
      strategy: "priority",
      models: [`${provider}/model-x`],
    },
    handleSingleModel: async (_b, _m, target) => {
      receivedConnectionId =
        (target as { connectionId?: string | null } | undefined)?.connectionId ?? null;
      return new Response(JSON.stringify({ choices: [] }), { status: 200 });
    },
    isModelAvailable: async () => true,
    log: noopLog,
    settings: { connectionAwareExpansion: true },
    allCombos: null,
  });

  assert.equal(res.status, 200);
  assert.equal(receivedConnectionId, healthy.id);
});

// T3: provider without a quota fetcher is not expanded

test("T3: no-fetcher provider passes through untouched", async () => {
  const provider = "cae-t3-nofetcher-" + randomUUID();
  // NOTE: no registerQuotaFetcher call for this provider.
  await providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name: "only",
    apiKey: "key-" + randomUUID(),
    isActive: true,
  });

  const target = makeTarget({ modelStr: `${provider}/model-x`, provider });
  const out = await expandTargetsForAllStrategies({
    strategy: "random",
    targets: [target],
    comboName: "cae-t3",
    config: { connectionAwareExpansion: true },
    log: noopLog,
  });

  assert.equal(out.length, 1);
  assert.equal(out[0].connectionId, null);
  assert.equal(out[0].executionKey, "step-1");
});

// T4: pinned connection that is exhausted drops the target

test("T4: pinned exhausted connection drops the whole target", async () => {
  const provider = "cae-t4-" + randomUUID();
  registerQuotaFetcher(provider, async () => ({ used: 0, total: 100, percentUsed: 0 }));
  const pinned = await providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name: "pinned",
    apiKey: "key-" + randomUUID(),
    isActive: true,
    rateLimitedUntil: new Date(Date.now() + 120_000).toISOString(),
  });

  const target = makeTarget({
    modelStr: `${provider}/model-x`,
    provider,
    connectionId: pinned.id,
  });
  const out = await expandTargetsForAllStrategies({
    strategy: "priority",
    targets: [target],
    comboName: "cae-t4",
    config: { connectionAwareExpansion: true },
    log: noopLog,
  });

  assert.equal(out.length, 0, "pinned exhausted target must be dropped entirely");
});

// T5: allowedConnectionIds intersects with the active pool

test("T5: step allowlist intersects with active connections", async () => {
  const provider = "cae-t5-" + randomUUID();
  registerQuotaFetcher(provider, async () => ({ used: 0, total: 100, percentUsed: 0 }));
  const connA = await providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name: "a",
    apiKey: "key-" + randomUUID(),
    isActive: true,
  });
  const connB = await providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name: "b",
    apiKey: "key-" + randomUUID(),
    isActive: true,
  });

  const target = makeTarget({
    modelStr: `${provider}/model-x`,
    provider,
    allowedConnectionIds: [connA.id],
  });
  const out = await expandTargetsForAllStrategies({
    strategy: "round-robin",
    targets: [target],
    comboName: "cae-t5",
    config: { connectionAwareExpansion: true },
    log: noopLog,
  });

  assert.equal(out.length, 1);
  assert.equal(out[0].connectionId, connA.id);
  assert.ok(!out.some((t) => t.connectionId === connB.id));
});

// T6: RR rotation granularity becomes model x connection

test("T6: RR rotation over expanded targets spans connections across consecutive requests", async () => {
  const provider = "cae-t6-" + randomUUID();
  registerQuotaFetcher(provider, async () => ({ used: 0, total: 100, percentUsed: 0 }));
  const ids: string[] = [];
  for (let i = 0; i < 3; i++) {
    const conn = await providersDb.createProviderConnection({
      provider,
      authType: "apikey",
      name: "conn" + i,
      apiKey: "key-" + randomUUID(),
      isActive: true,
    });
    ids.push(conn.id);
  }

  const comboName = "cae-t6-combo-" + randomUUID();
  const combo = {
    name: comboName,
    strategy: "round-robin",
    models: [`${provider}/model-x`],
    config: { connectionAwareExpansion: true },
  };

  const dispatchedConnections: string[] = [];
  for (let i = 0; i < 3; i++) {
    const res = await handleComboChat({
      body: { messages: [{ role: "user", content: `req-${i}` }] },
      combo,
      handleSingleModel: async (_b, _m, t) => {
        dispatchedConnections.push(
          (t as { connectionId?: string | null } | undefined)?.connectionId || ""
        );
        return new Response(JSON.stringify({ choices: [] }), { status: 200 });
      },
      isModelAvailable: async () => true,
      log: noopLog,
      settings: null,
      allCombos: null,
    });
    assert.equal(res.status, 200);
  }

  assert.equal(dispatchedConnections.length, 3);
  const distinct = new Set(dispatchedConnections);
  assert.equal(distinct.size, 3, "consecutive RR requests must hit 3 distinct connections");
  for (const id of ids) {
    assert.ok(distinct.has(id), `connection ${id} must be hit`);
  }
});

// T7: main loop model lockout gate skips locked connection

test("T7: main loop model lockout gate (combo.ts:1286) skips locked target", async () => {
  const provider = "cae-t7-" + randomUUID();
  registerQuotaFetcher(provider, async () => ({ used: 0, total: 100, percentUsed: 0 }));
  const connLocked = await providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name: "locked",
    apiKey: "key-" + randomUUID(),
    isActive: true,
  });
  const connHealthy = await providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name: "healthy",
    apiKey: "key-" + randomUUID(),
    isActive: true,
  });

  // Lock model-x on connLocked
  lockExactModel(provider, connLocked.id, "model-x", "cooldown", 60_000);

  const logs: string[] = [];
  const captureLog = {
    warn: () => {},
    info: (_cat: string, msg: string) => {
      logs.push(msg);
    },
    debug: () => {},
    error: () => {},
  };

  const dispatchedConnections: string[] = [];
  const res = await handleComboChat({
    body: { messages: [{ role: "user", content: "test" }] },
    combo: {
      name: "cae-t7-combo-" + randomUUID(),
      strategy: "priority",
      models: [`${provider}/model-x`],
      config: { connectionAwareExpansion: true },
    },
    handleSingleModel: async (_b, _m, t) => {
      dispatchedConnections.push(
        (t as { connectionId?: string | null } | undefined)?.connectionId || ""
      );
      return new Response(JSON.stringify({ choices: [] }), { status: 200 });
    },
    isModelAvailable: async () => true,
    log: captureLog,
    settings: null,
    allCombos: null,
  });

  assert.equal(res.status, 200);
  assert.deepEqual(
    dispatchedConnections,
    [connHealthy.id],
    "only the unlocked healthy connection is dispatched"
  );
  assert.ok(
    logs.some((msg) => msg.includes("model locked by resilience")),
    "must log that model is locked"
  );
});

// T8: fusion panel sizing is not inflated by expansion

test("T8: fusion panel does not inflate; members carry vetted connectionId", async () => {
  const provider1 = "cae-t8-p1-" + randomUUID();
  const provider2 = "cae-t8-p2-" + randomUUID();
  registerQuotaFetcher(provider1, async () => ({ used: 0, total: 100, percentUsed: 0 }));
  registerQuotaFetcher(provider2, async () => ({ used: 0, total: 100, percentUsed: 0 }));

  const p1Conns = [];
  for (let i = 0; i < 3; i++) {
    p1Conns.push(
      await providersDb.createProviderConnection({
        provider: provider1,
        authType: "apikey",
        name: "p1-c" + i,
        apiKey: "key-" + randomUUID(),
        isActive: true,
      })
    );
  }
  const p2Conns = [];
  for (let i = 0; i < 3; i++) {
    p2Conns.push(
      await providersDb.createProviderConnection({
        provider: provider2,
        authType: "apikey",
        name: "p2-c" + i,
        apiKey: "key-" + randomUUID(),
        isActive: true,
      })
    );
  }

  const combo = {
    name: "cae-t8-fusion-" + randomUUID(),
    strategy: "fusion",
    models: [`${provider1}/model-a`, `${provider2}/model-b`],
    config: { connectionAwareExpansion: true, judgeModel: "judge-p/judge-m" },
  };

  const dispatchedPanelTargets: Array<{ modelStr: string; connectionId?: string | null }> = [];
  const res = await handleComboChat({
    body: { messages: [{ role: "user", content: "fuse" }] },
    combo,
    handleSingleModel: async (_b, modelStr, t) => {
      dispatchedPanelTargets.push({
        modelStr,
        connectionId: (t as { connectionId?: string | null } | undefined)?.connectionId,
      });
      return new Response(
        JSON.stringify({
          choices: [{ message: { content: `response-from-${modelStr}` } }],
        }),
        { status: 200 }
      );
    },
    isModelAvailable: async () => true,
    log: noopLog,
    settings: null,
    allCombos: null,
  });

  assert.equal(res.status, 200);
  // Panel size should equal 2 (one per model), plus 1 judge synthesis call (or panel members)
  // Each panel member dispatched should have a vetted connectionId
  const p1Calls = dispatchedPanelTargets.filter((c) => c.modelStr === `${provider1}/model-a`);
  const p2Calls = dispatchedPanelTargets.filter((c) => c.modelStr === `${provider2}/model-b`);
  assert.equal(p1Calls.length, 1, "model-a should be called once in panel");
  assert.equal(p2Calls.length, 1, "model-b should be called once in panel");
  assert.equal(
    p1Calls[0].connectionId,
    p1Conns[0].id,
    "model-a should carry first healthy connection"
  );
  assert.equal(
    p2Calls[0].connectionId,
    p2Conns[0].id,
    "model-b should carry first healthy connection"
  );
});

// T9: quotaCache snapshot drives filtering

test("T9: isQuotaExhaustedForRequest=true connection is filtered", async () => {
  const provider = "cae-t9-" + randomUUID();
  registerQuotaFetcher(provider, async () => ({ used: 0, total: 100, percentUsed: 0 }));
  const exhausted = await providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name: "exhausted",
    apiKey: "key-" + randomUUID(),
    isActive: true,
  });
  const healthy = await providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name: "healthy",
    apiKey: "key-" + randomUUID(),
    isActive: true,
  });
  // Standard provider: aggregate exhausted=true with a far-future reset.
  quotaCache.setQuotaCache(exhausted.id, provider, {
    default: { remainingPercentage: 0, resetAt: new Date(Date.now() + 86_400_000).toISOString() },
  });

  const target = makeTarget({ modelStr: `${provider}/model-x`, provider });
  const out = await expandTargetsForAllStrategies({
    strategy: "priority",
    targets: [target],
    comboName: "cae-t9",
    config: { connectionAwareExpansion: true },
    log: noopLog,
  });

  assert.equal(out.length, 1);
  assert.equal(out[0].connectionId, healthy.id);
});

// T10: fail-open on connection-list load error

test("T10: load failure returns the original targets (fail-open)", async () => {
  const provider = "cae-t10-" + randomUUID();
  registerQuotaFetcher(provider, async () => ({ used: 0, total: 100, percentUsed: 0 }));
  const target = makeTarget({ modelStr: `${provider}/model-x`, provider });
  const out = await expandTargetsForAllStrategies({
    strategy: "priority",
    targets: [target],
    comboName: "cae-t10",
    config: { connectionAwareExpansion: true },
    log: noopLog,
    __testExpander: async () => {
      throw new Error("synthetic load failure");
    },
  });
  assert.ok(out[0] === target, "fail-open must return the ORIGINAL target objects");

  assert.equal(out.length, 1);
  assert.equal(out[0].connectionId, null);
  assert.equal(out[0].executionKey, "step-1");
});

// API-key allowedConnections intersects

test("apiKey allowedConnections intersects the expanded pool", async () => {
  const provider = "cae-apikey-" + randomUUID();
  registerQuotaFetcher(provider, async () => ({ used: 0, total: 100, percentUsed: 0 }));
  const connA = await providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name: "a",
    apiKey: "key-" + randomUUID(),
    isActive: true,
  });
  const connB = await providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name: "b",
    apiKey: "key-" + randomUUID(),
    isActive: true,
  });

  const target = makeTarget({ modelStr: `${provider}/model-x`, provider });
  const out = await expandTargetsForAllStrategies({
    strategy: "priority",
    targets: [target],
    comboName: "cae-apikey",
    config: { connectionAwareExpansion: true },
    log: noopLog,
    apiKeyAllowedConnectionIds: [connA.id],
  });

  assert.equal(out.length, 1);
  assert.equal(out[0].connectionId, connA.id);
  assert.ok(!out.some((t) => t.connectionId === connB.id));
});

// Pipeline dispatch

test("Pipeline strategy: each stage picks the first healthy connection", async () => {
  const provider1 = "cae-pipe-p1-" + randomUUID();
  const provider2 = "cae-pipe-p2-" + randomUUID();
  registerQuotaFetcher(provider1, async () => ({ used: 0, total: 100, percentUsed: 0 }));
  registerQuotaFetcher(provider2, async () => ({ used: 0, total: 100, percentUsed: 0 }));

  const p1Conn = await providersDb.createProviderConnection({
    provider: provider1,
    authType: "apikey",
    name: "p1-c0",
    apiKey: "key-" + randomUUID(),
    isActive: true,
  });
  const p2Conn = await providersDb.createProviderConnection({
    provider: provider2,
    authType: "apikey",
    name: "p2-c0",
    apiKey: "key-" + randomUUID(),
    isActive: true,
  });

  const combo = {
    name: "cae-pipe-combo-" + randomUUID(),
    strategy: "pipeline",
    models: [`${provider1}/model-1`, `${provider2}/model-2`],
    config: { connectionAwareExpansion: true },
  };

  const executedStages: string[] = [];
  const res = await tryPipelineDispatch({
    body: { messages: [{ role: "user", content: "pipe" }] },
    combo,
    config: resolveComboSetupConfig(combo, null),
    strategy: "pipeline",
    handleSingleModelWithTimeout: async (_b, modelStr, target) => {
      executedStages.push(
        `${modelStr}@${(target as { connectionId?: string | null } | undefined)?.connectionId}`
      );
      return new Response(JSON.stringify({ choices: [{ message: { content: "stage-out" } }] }), {
        status: 200,
      });
    },
    log: noopLog,
  });

  assert.ok(res !== null);
  assert.equal(res.status, 200);
  assert.equal(executedStages.length, 2);
  assert.equal(executedStages[0], `${provider1}/model-1@${p1Conn.id}`);
  assert.equal(executedStages[1], `${provider2}/model-2@${p2Conn.id}`);
});
