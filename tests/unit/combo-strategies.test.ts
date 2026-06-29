import test, { after } from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-strategies-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_FETCH = globalThis.fetch;
process.env.DATA_DIR = TEST_DATA_DIR;

const dbCore = await import("../../src/lib/db/core.ts");
const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { clearAllStickyBindings } =
  await import("../../open-sse/services/combo/sessionStickiness.ts");
const { invalidateCodexQuotaCache, registerCodexConnection, registerCodexQuotaFetcher } =
  await import("../../open-sse/services/codexQuotaFetcher.ts");
const { registerQuotaFetcher } = await import("../../open-sse/services/quotaPreflight.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { recordComboRequest } = await import("../../open-sse/services/comboMetrics.ts");
const { saveModelsDevCapabilities } = await import("../../src/lib/modelsDevSync.ts");

after(() => {
  dbCore.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
  globalThis.fetch = ORIGINAL_FETCH;
});

const reqBodyNullContext = {
  model: "comboTest",
  messages: [{ role: "user", content: null }], // hit toTextContent (!string, !array)
  stream: false,
};

const reqBodyTextArray = {
  model: "comboTest",
  messages: [{ role: "user", content: [{ text: "hi array" }, { image: "url" }, null] }],
  stream: false,
};

function capability(limitContext: number) {
  return {
    tool_call: true,
    reasoning: null,
    attachment: null,
    structured_output: null,
    temperature: null,
    modalities_input: "[]",
    modalities_output: "[]",
    knowledge_cutoff: null,
    release_date: null,
    last_updated: null,
    status: null,
    family: null,
    open_weights: null,
    limit_context: limitContext,
    limit_input: null,
    limit_output: null,
    interleaved_field: null,
  };
}

function okResponse(model: string) {
  return Response.json({ choices: [{ message: { role: "assistant", content: model } }] });
}

function makeLog() {
  return {
    info() {},
    warn() {},
    debug() {},
    error() {},
  };
}

async function selectedModelFor(combo: Record<string, unknown>, body: Record<string, unknown>) {
  const calls: string[] = [];
  const response = await handleComboChat({
    body,
    combo,
    allCombos: [combo],
    isModelAvailable: undefined,
    relayOptions: undefined,
    signal: undefined,
    settings: {},
    log: makeLog(),
    handleSingleModel: async (_body: unknown, modelStr: string) => {
      calls.push(modelStr);
      return okResponse(modelStr);
    },
  });

  assert.equal(response.status, 200);
  assert.equal(calls.length > 0, true);
  return calls[0];
}

function codexQuota({
  used5h,
  reset5hSeconds,
  used7d,
  reset7dSeconds,
}: {
  used5h: number;
  reset5hSeconds: number;
  used7d: number;
  reset7dSeconds: number;
}) {
  return {
    rate_limit: {
      primary_window: {
        used_percent: used5h,
        reset_after_seconds: reset5hSeconds,
      },
      secondary_window: {
        used_percent: used7d,
        reset_after_seconds: reset7dSeconds,
      },
    },
  };
}

function installCodexQuotaMock(quotasByToken: Record<string, unknown>) {
  const previousFetch = globalThis.fetch;
  globalThis.fetch = async (_input: RequestInfo | URL, init?: RequestInit) => {
    const headers = init?.headers as Record<string, string> | undefined;
    const authorization = headers?.Authorization || headers?.authorization || "";
    const token = authorization.replace(/^Bearer\s+/i, "");
    const quota = quotasByToken[token];
    if (!quota) return Response.json({ error: "missing quota" }, { status: 404 });
    return Response.json(quota);
  };
  return () => {
    globalThis.fetch = previousFetch;
  };
}

function resetAwareCombo(
  name: string,
  connections: Array<{ id: string; token: string }>,
  config: Record<string, unknown> = {}
) {
  registerCodexQuotaFetcher();

  for (const connection of connections) {
    invalidateCodexQuotaCache(connection.id);
    registerCodexConnection(connection.id, { accessToken: connection.token });
  }

  return {
    name,
    strategy: "reset-aware",
    config,
    models: connections.map((connection, index) => ({
      kind: "model",
      provider: "codex",
      providerId: "codex",
      model: "gpt-5",
      connectionId: connection.id,
      id: `${name}-${index}`,
    })),
  };
}

async function selectedConnectionFor(
  combo: Record<string, unknown>,
  options: { apiKeyAllowedConnections?: string[] | null } = {}
) {
  // Isolate strategy/round-robin assertions from session stickiness (#5): this helper
  // reuses the same body, so a sticky binding from a prior call would pin the connection
  // and break tie-break rotation. Stickiness has its own suite (combo-session-stickiness).
  clearAllStickyBindings();
  const calls: Array<string | null> = [];
  const response = await handleComboChat({
    body: reqBodyTextArray,
    combo,
    allCombos: [combo],
    isModelAvailable: undefined,
    relayOptions: undefined,
    signal: undefined,
    settings: {},
    log: makeLog(),
    apiKeyAllowedConnections: options.apiKeyAllowedConnections,
    handleSingleModel: async (
      _body: unknown,
      modelStr: string,
      target?: { connectionId?: string | null; allowedConnectionIds?: string[] | null }
    ) => {
      calls.push(target?.connectionId ?? null);
      return okResponse(modelStr);
    },
  });

  assert.equal(response.status, 200);
  assert.equal(calls.length > 0, true);
  return calls[0];
}

test("least-used strategy prefers the model with fewer recorded combo requests", async () => {
  const name = `least-used-${randomUUID()}`;
  const busyModel = "openai/gpt-4";
  const idleModel = "openai/gpt-3.5-turbo";
  const combo = await combosDb.createCombo({
    name,
    strategy: "least-used",
    models: [busyModel, idleModel],
  });

  recordComboRequest(name, busyModel, {
    success: true,
    latencyMs: 10,
    strategy: "least-used",
  });

  assert.equal(await selectedModelFor(combo, reqBodyTextArray), idleModel);
});

test("context-optimized strategy prefers the largest context window", async () => {
  saveModelsDevCapabilities({
    "test-context": {
      small: capability(8_000),
      large: capability(64_000),
    },
  });

  const combo = await combosDb.createCombo({
    name: `context-optimized-${randomUUID()}`,
    strategy: "context-optimized",
    models: ["test-context/small", "test-context/large", "unknown/unknown"],
  });

  assert.equal(await selectedModelFor(combo, reqBodyNullContext), "test-context/large");
});

test("auto strategy handles null and empty prompt edge cases without throwing", async () => {
  const combo = await combosDb.createCombo({
    name: `auto-${randomUUID()}`,
    strategy: "auto",
    config: { auto: { explorationRate: 0 } },
    models: ["openai/gpt-4"],
  });

  assert.equal(
    await selectedModelFor(combo, {
      model: combo.name,
      messages: [{ role: "user", content: null }],
    }),
    "openai/gpt-4"
  );
  assert.equal(await selectedModelFor(combo, { model: combo.name, messages: [] }), "openai/gpt-4");
});

test("reset-aware strategy prefers lower weekly remaining quota when reset is much sooner", async (t) => {
  const soon = { id: `soon-${randomUUID()}`, token: `token-soon-${randomUUID()}` };
  const later = { id: `later-${randomUUID()}`, token: `token-later-${randomUUID()}` };
  t.after(
    installCodexQuotaMock({
      [soon.token]: codexQuota({
        used5h: 10,
        reset5hSeconds: 3600,
        used7d: 40,
        reset7dSeconds: 24 * 3600,
      }),
      [later.token]: codexQuota({
        used5h: 10,
        reset5hSeconds: 3600,
        used7d: 20,
        reset7dSeconds: 5 * 24 * 3600,
      }),
    })
  );

  const combo = resetAwareCombo(`reset-aware-soon-${randomUUID()}`, [soon, later]);

  assert.equal(await selectedConnectionFor(combo), soon.id);
});

test("reset-aware strategy aggressively spends quota that resets soon", async (t) => {
  const team = { id: `team-${randomUUID()}`, token: `token-team-${randomUUID()}` };
  const fullLater = { id: `full-${randomUUID()}`, token: `token-full-${randomUUID()}` };
  const soonLow = { id: `soon-low-${randomUUID()}`, token: `token-soon-low-${randomUUID()}` };
  const soonLower = {
    id: `soon-lower-${randomUUID()}`,
    token: `token-soon-lower-${randomUUID()}`,
  };
  t.after(
    installCodexQuotaMock({
      [team.token]: codexQuota({
        used5h: 29,
        reset5hSeconds: 2.5 * 3600,
        used7d: 40,
        reset7dSeconds: 2.25 * 24 * 3600,
      }),
      [fullLater.token]: codexQuota({
        used5h: 1,
        reset5hSeconds: 5 * 3600,
        used7d: 0,
        reset7dSeconds: 7 * 24 * 3600,
      }),
      [soonLow.token]: codexQuota({
        used5h: 1,
        reset5hSeconds: 5 * 3600,
        used7d: 86,
        reset7dSeconds: 1.5 * 3600,
      }),
      [soonLower.token]: codexQuota({
        used5h: 1,
        reset5hSeconds: 5 * 3600,
        used7d: 84,
        reset7dSeconds: 1.5 * 3600,
      }),
    })
  );

  const combo = resetAwareCombo(`reset-aware-pressure-${randomUUID()}`, [
    team,
    fullLater,
    soonLow,
    soonLower,
  ]);
  const selections = [await selectedConnectionFor(combo), await selectedConnectionFor(combo)];

  assert.deepEqual(new Set(selections), new Set([soonLow.id, soonLower.id]));
});

test("reset-aware strategy prioritizes soon-reset weekly quota over empty later accounts", async (t) => {
  const fullerSoon = {
    id: `fuller-soon-${randomUUID()}`,
    token: `token-fuller-soon-${randomUUID()}`,
  };
  const emptyLater = {
    id: `empty-later-${randomUUID()}`,
    token: `token-empty-later-${randomUUID()}`,
  };
  t.after(
    installCodexQuotaMock({
      [fullerSoon.token]: codexQuota({
        used5h: 25,
        reset5hSeconds: 2 * 3600,
        used7d: 70,
        reset7dSeconds: 2 * 3600,
      }),
      [emptyLater.token]: codexQuota({
        used5h: 1,
        reset5hSeconds: 5 * 3600,
        used7d: 0,
        reset7dSeconds: 7 * 24 * 3600,
      }),
    })
  );

  const combo = resetAwareCombo(`reset-aware-weekly-pressure-${randomUUID()}`, [
    emptyLater,
    fullerSoon,
  ]);

  assert.equal(await selectedConnectionFor(combo), fullerSoon.id);
});

test("reset-aware strategy keeps 5h reset pressure softer than weekly pressure", async (t) => {
  const fullerSoon = {
    id: `session-fuller-soon-${randomUUID()}`,
    token: `token-session-fuller-soon-${randomUUID()}`,
  };
  const emptyLater = {
    id: `session-empty-later-${randomUUID()}`,
    token: `token-session-empty-later-${randomUUID()}`,
  };
  t.after(
    installCodexQuotaMock({
      [fullerSoon.token]: codexQuota({
        used5h: 70,
        reset5hSeconds: 2 * 3600,
        used7d: 1,
        reset7dSeconds: 7 * 24 * 3600,
      }),
      [emptyLater.token]: codexQuota({
        used5h: 0,
        reset5hSeconds: 5 * 3600,
        used7d: 0,
        reset7dSeconds: 7 * 24 * 3600,
      }),
    })
  );

  const combo = resetAwareCombo(`reset-aware-session-pressure-${randomUUID()}`, [
    fullerSoon,
    emptyLater,
  ]);

  assert.equal(await selectedConnectionFor(combo), emptyLater.id);
});

test("reset-aware strategy avoids accounts near 5h exhaustion", async (t) => {
  const exhausted5h = {
    id: `exhausted-${randomUUID()}`,
    token: `token-exhausted-${randomUUID()}`,
  };
  const healthy5h = {
    id: `healthy-${randomUUID()}`,
    token: `token-healthy-${randomUUID()}`,
  };
  t.after(
    installCodexQuotaMock({
      [exhausted5h.token]: codexQuota({
        used5h: 98,
        reset5hSeconds: 20 * 60,
        used7d: 5,
        reset7dSeconds: 24 * 3600,
      }),
      [healthy5h.token]: codexQuota({
        used5h: 20,
        reset5hSeconds: 4 * 3600,
        used7d: 50,
        reset7dSeconds: 4 * 24 * 3600,
      }),
    })
  );

  const combo = resetAwareCombo(`reset-aware-guard-${randomUUID()}`, [exhausted5h, healthy5h]);

  assert.equal(await selectedConnectionFor(combo), healthy5h.id);
});

test("reset-aware strategy rotates similar scores with round-robin tie breaking", async () => {
  const provider = `tie-provider-${randomUUID()}`;
  const first = `first-${randomUUID()}`;
  const second = `second-${randomUUID()}`;
  const quota = {
    used: 50,
    total: 100,
    percentUsed: 0.5,
    resetAt: "2099-01-01T00:00:00.000Z",
  };

  registerQuotaFetcher(provider, async () => quota);

  const combo = {
    name: `reset-aware-rr-${randomUUID()}`,
    strategy: "reset-aware",
    config: { resetAwareTieBandPercent: 100 },
    models: [first, second].map((connectionId, index) => ({
      kind: "model",
      provider,
      providerId: provider,
      model: "balanced-model",
      connectionId,
      id: `tie-${index}`,
    })),
  };

  const selections = [
    await selectedConnectionFor(combo),
    await selectedConnectionFor(combo),
    await selectedConnectionFor(combo),
  ];

  assert.equal(selections.includes(first), true);
  assert.equal(selections.includes(second), true);
});

test("reset-aware strategy uses registered quota fetchers for non-Codex providers", async () => {
  const provider = `quota-provider-${randomUUID()}`;
  const soon = `soon-${randomUUID()}`;
  const later = `later-${randomUUID()}`;
  const resetAtSoon = new Date(Date.now() + 24 * 3600 * 1000).toISOString();
  const resetAtLater = new Date(Date.now() + 5 * 24 * 3600 * 1000).toISOString();

  registerQuotaFetcher(provider, async (connectionId) => {
    if (connectionId === soon) {
      return { used: 40, total: 100, percentUsed: 0.4, resetAt: resetAtSoon };
    }
    if (connectionId === later) {
      return { used: 20, total: 100, percentUsed: 0.2, resetAt: resetAtLater };
    }
    return null;
  });

  const combo = {
    name: `reset-aware-generic-${randomUUID()}`,
    strategy: "reset-aware",
    models: [soon, later].map((connectionId, index) => ({
      kind: "model",
      provider,
      providerId: provider,
      model: "balanced-model",
      connectionId,
      id: `generic-${index}`,
    })),
  };

  assert.equal(await selectedConnectionFor(combo), soon);
});

test("reset-aware strategy deduplicates quota fetches for repeated connection targets", async () => {
  const provider = `dedupe-provider-${randomUUID()}`;
  const connectionId = `shared-${randomUUID()}`;
  let fetchCount = 0;

  registerQuotaFetcher(provider, async (id) => {
    fetchCount++;
    assert.equal(id, connectionId);
    return {
      used: 20,
      total: 100,
      percentUsed: 0.2,
      resetAt: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
    };
  });

  const combo = {
    name: `reset-aware-dedupe-${randomUUID()}`,
    strategy: "reset-aware",
    models: ["model-a", "model-b"].map((model, index) => ({
      kind: "model",
      provider,
      providerId: provider,
      model,
      connectionId,
      id: `dedupe-${index}`,
    })),
  };

  assert.equal(await selectedConnectionFor(combo), connectionId);
  assert.equal(fetchCount, 1);
});

test("reset-aware quota SWR serves stale ordering while refreshing in background", async () => {
  const provider = `swr-provider-${randomUUID()}`;
  const cachedFirst = `cached-first-${randomUUID()}`;
  const cachedSecond = `cached-second-${randomUUID()}`;
  const fetchCounts = new Map<string, number>();

  registerQuotaFetcher(provider, async (connectionId) => {
    fetchCounts.set(connectionId, (fetchCounts.get(connectionId) || 0) + 1);
    if (connectionId === cachedFirst) {
      return {
        used: 40,
        total: 100,
        percentUsed: 0.4,
        resetAt: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
      };
    }
    return {
      used: 20,
      total: 100,
      percentUsed: 0.2,
      resetAt: new Date(Date.now() + 5 * 24 * 3600 * 1000).toISOString(),
    };
  });

  const combo = {
    name: `reset-aware-swr-${randomUUID()}`,
    strategy: "reset-aware",
    config: {
      resetAwareQuotaCacheTtlMs: 1,
      resetAwareQuotaCacheMaxStaleMs: 60_000,
    },
    models: [cachedFirst, cachedSecond].map((connectionId, index) => ({
      kind: "model",
      provider,
      providerId: provider,
      model: "balanced-model",
      connectionId,
      id: `swr-${index}`,
    })),
  };

  assert.equal(await selectedConnectionFor(combo), cachedFirst);
  await new Promise((resolve) => setTimeout(resolve, 5));
  assert.equal(await selectedConnectionFor(combo), cachedFirst);

  assert.equal(fetchCounts.get(cachedFirst), 2);
  assert.equal(fetchCounts.get(cachedSecond), 2);
});

test("reset-aware strategy respects API-key allowed connections during expansion", async () => {
  const provider = `limited-provider-${randomUUID()}`;
  const disallowed = await providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name: `disallowed-${randomUUID()}`,
    apiKey: "sk-disallowed",
    isActive: true,
  });
  const allowed = await providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name: `allowed-${randomUUID()}`,
    apiKey: "sk-allowed",
    isActive: true,
  });
  const allowedId = String(allowed.id);
  const disallowedId = String(disallowed.id);
  const fetchedConnectionIds: string[] = [];

  registerQuotaFetcher(provider, async (connectionId) => {
    fetchedConnectionIds.push(connectionId);
    return {
      used: connectionId === disallowedId ? 60 : 20,
      total: 100,
      percentUsed: connectionId === disallowedId ? 0.6 : 0.2,
      resetAt: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
    };
  });

  const combo = {
    name: `reset-aware-api-key-${randomUUID()}`,
    strategy: "reset-aware",
    models: [
      {
        kind: "model",
        provider,
        providerId: provider,
        model: "balanced-model",
        id: "limited-provider-step",
      },
    ],
  };

  assert.equal(
    await selectedConnectionFor(combo, { apiKeyAllowedConnections: [allowedId] }),
    allowedId
  );
  assert.deepEqual(fetchedConnectionIds, [allowedId]);
});

test("reset-aware strategy parses numeric reset timestamps from quota telemetry", async () => {
  const provider = `timestamp-provider-${randomUUID()}`;
  const soon = `timestamp-soon-${randomUUID()}`;
  const later = `timestamp-later-${randomUUID()}`;
  const soonResetSeconds = Math.floor((Date.now() + 24 * 3600 * 1000) / 1000);
  const laterResetMs = Date.now() + 5 * 24 * 3600 * 1000;

  registerQuotaFetcher(provider, async (connectionId) => ({
    used: connectionId === soon ? 40 : 20,
    total: 100,
    percentUsed: connectionId === soon ? 0.4 : 0.2,
    resetAt: connectionId === soon ? soonResetSeconds : laterResetMs,
  }));

  const combo = {
    name: `reset-aware-timestamps-${randomUUID()}`,
    strategy: "reset-aware",
    models: [soon, later].map((connectionId, index) => ({
      kind: "model",
      provider,
      providerId: provider,
      model: "balanced-model",
      connectionId,
      id: `timestamp-${index}`,
    })),
  };

  assert.equal(await selectedConnectionFor(combo), soon);
});

test("reset-aware strategy scores provider-specific weekly windows when available", async () => {
  const provider = `weekly-provider-${randomUUID()}`;
  const soon = `weekly-soon-${randomUUID()}`;
  const later = `weekly-later-${randomUUID()}`;
  const resetAtSoon = new Date(Date.now() + 24 * 3600 * 1000).toISOString();
  const resetAtLater = new Date(Date.now() + 5 * 24 * 3600 * 1000).toISOString();

  registerQuotaFetcher(provider, async (connectionId) => {
    if (connectionId === soon) {
      return {
        used: 40,
        total: 100,
        percentUsed: 0.4,
        resetAt: resetAtSoon,
        window5h: { percentUsed: 0.1, resetAt: resetAtSoon },
        windowWeekly: { percentUsed: 0.4, resetAt: resetAtSoon },
      };
    }
    if (connectionId === later) {
      return {
        used: 20,
        total: 100,
        percentUsed: 0.2,
        resetAt: resetAtLater,
        window5h: { percentUsed: 0.1, resetAt: resetAtSoon },
        windowWeekly: { percentUsed: 0.2, resetAt: resetAtLater },
      };
    }
    return null;
  });

  const combo = {
    name: `reset-aware-weekly-${randomUUID()}`,
    strategy: "reset-aware",
    models: [soon, later].map((connectionId, index) => ({
      kind: "model",
      provider,
      providerId: provider,
      model: "balanced-model",
      connectionId,
      id: `weekly-${index}`,
    })),
  };

  assert.equal(await selectedConnectionFor(combo), soon);
});

test("priority combo advances to next model when first returns 400 'model not supported'", async () => {
  const name = `model-not-supported-${randomUUID()}`;
  const combo = await combosDb.createCombo({
    name,
    strategy: "priority",
    models: ["openai/gpt-4", "openai/gpt-3.5-turbo"],
  });

  const calls: string[] = [];
  const response = await handleComboChat({
    body: reqBodyTextArray,
    combo,
    allCombos: [combo],
    isModelAvailable: undefined,
    relayOptions: undefined,
    signal: undefined,
    settings: {},
    log: makeLog(),
    handleSingleModel: async (_body: unknown, modelStr: string) => {
      calls.push(modelStr);
      if (modelStr === "openai/gpt-4") {
        return Response.json(
          { error: { message: "requested model is not supported" } },
          { status: 400 }
        );
      }
      return okResponse(modelStr);
    },
  });

  assert.equal(response.status, 200, "combo should advance to second model and return 200");
  assert.equal(calls.length, 2, "combo should have tried both models");
  assert.equal(calls[0], "openai/gpt-4", "first model should be tried first");
  assert.equal(calls[1], "openai/gpt-3.5-turbo", "second model should be tried after 400");
});
