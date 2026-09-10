/**
 * #6977 — opt-in Codex quota auto-ping scheduler.
 *
 * Ported (Codex half) from the shipped 9router
 * src/shared/services/quotaAutoPing.js + its 351-line vitest suite. All
 * effects (settings, DB reads/writes, credential refresh, usage fetch, the
 * Codex executor, circuit breaker gate) are injected via `deps`, and time is
 * injected via `now()`, so every test is fully deterministic — no real
 * timers, no real DB, no real network.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// This module transitively imports src/lib/db/core.ts (via @/lib/localDb),
// which lazily opens the DB singleton on first use. Point DATA_DIR at a throwaway
// tmpdir *before* importing so the suite never touches the operator's real
// ~/.omniroute/storage.sqlite (deps are injected below anyway — nothing here
// exercises the real DB, this only prevents an accidental production open).
process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quota-autoping-"));

const { runQuotaAutoPingTick, createQuotaAutoPingState, resolveQuotaAutoPingModel } =
  await import("../../src/lib/services/quotaAutoPing.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { getProviderModels } = await import("../../open-sse/config/providerModels.ts");
const { isModelSelectable } = await import("../../open-sse/services/modelLifecycle.ts");
const { splitCodexReasoningSuffix } =
  await import("../../open-sse/executors/codex/reasoningSuffix.ts");

test.after(() => {
  resetDbInstance();
});

const NOW_ISO = "2026-01-01T12:00:00.000Z";
const NOW_MS = new Date(NOW_ISO).getTime();

function baseDeps(overrides = {}) {
  const calls = {
    updateProviderConnection: [],
    executorExecute: [],
    getExecutor: [],
  };
  const deps = {
    getSettings: async () => ({ codexAutoPing: { connections: { "codex-1": true } } }),
    getProviderConnections: async ({ provider }) =>
      provider === "codex"
        ? [{ id: "codex-1", provider: "codex", authType: "oauth", accessToken: "token" }]
        : [],
    updateProviderConnection: async (id, data) => {
      calls.updateProviderConnection.push([id, data]);
      return null;
    },
    refreshAndUpdateCredentials: async (connection) => ({ connection }),
    getCodexUsage: async () => ({ quotas: {} }),
    // #11904: real callers get this from createDefaultQuotaAutoPingDeps(); the fixture
    // mirrors it so tests exercise the gated path without a real timer.
    throttleQuotaFetch: async () => {},
    getExecutor: (provider) => {
      calls.getExecutor.push(provider);
      return {
        execute: async (input) => {
          calls.executorExecute.push(input);
          return { response: { ok: true, text: async () => "" } };
        },
      };
    },
    canExecuteProvider: () => true,
    isConnectionUnavailableToAuxiliaryActivity: async () => false,
    // #11905: real callers resolve the ping model from the live catalog; the fixture
    // does the same so the default path is exercised, and tests override it to
    // simulate an empty catalog.
    resolvePingModel: resolveQuotaAutoPingModel,
    ...overrides,
  };
  return { deps, calls };
}

test("#6977 does not touch anything when setting is absent", async () => {
  const { deps, calls } = baseDeps({ getSettings: async () => ({}) });
  const state = createQuotaAutoPingState();

  await runQuotaAutoPingTick(deps, state, () => NOW_MS);

  assert.equal(calls.getExecutor.length, 0);
  assert.equal(calls.updateProviderConnection.length, 0);
});

test("#6977 does not ping on the first resetAt observation (only caches it)", async () => {
  const { deps, calls } = baseDeps({
    getCodexUsage: async () => ({
      quotas: { session: { used: 1, resetAt: "2026-01-01T17:00:00.000Z" } },
    }),
  });
  const state = createQuotaAutoPingState();

  await runQuotaAutoPingTick(deps, state, () => NOW_MS);

  assert.equal(calls.getExecutor.length, 0);
  assert.equal(calls.updateProviderConnection.length, 0);
  assert.equal(state.resetCache["codex:codex-1"], "2026-01-01T17:00:00.000Z");
});

test("#6977 sends a ping once the session resetAt slides forward", async () => {
  const { deps, calls } = baseDeps({
    getCodexUsage: async () => ({
      quotas: {
        session: { used: 1, total: 100, remaining: 99, resetAt: "2026-01-01T17:01:00.000Z" },
      },
    }),
  });
  const state = createQuotaAutoPingState();
  state.resetCache["codex:codex-1"] = "2026-01-01T17:00:00.000Z";

  await runQuotaAutoPingTick(deps, state, () => NOW_MS);

  assert.equal(calls.getExecutor.length, 1);
  assert.equal(calls.executorExecute.length, 1);
  assert.equal(calls.updateProviderConnection.length, 1);
  const [id, data] = calls.updateProviderConnection[0];
  assert.equal(id, "codex-1");
  assert.equal(data.lastPingedResetKey, "2026-01-01T17:01:00.000Z");
  assert.equal(typeof data.lastPingAt, "string");
});

test("hard lease isolation skips an ACTIVE leased connection before quota or executor I/O", async () => {
  let usageCalls = 0;
  const { deps, calls } = baseDeps({
    isConnectionUnavailableToAuxiliaryActivity: async () => true,
    getCodexUsage: async () => {
      usageCalls += 1;
      throw new Error("unexpected quota provider call");
    },
  });
  const state = createQuotaAutoPingState();
  state.resetCache["codex:codex-1"] = "2026-01-01T17:00:00.000Z";

  await runQuotaAutoPingTick(deps, state, () => NOW_MS);

  assert.equal(usageCalls, 0);
  assert.equal(calls.getExecutor.length, 0);
  assert.equal(calls.updateProviderConnection.length, 0);
});

test("hard lease isolation excludes a FREE lease-only connection from background model pings", async () => {
  let usageCalls = 0;
  const { deps, calls } = baseDeps({
    isConnectionUnavailableToAuxiliaryActivity: async () => true,
    getCodexUsage: async () => {
      usageCalls += 1;
      throw new Error("unexpected quota provider call");
    },
  });
  const state = createQuotaAutoPingState();
  state.resetCache["codex:codex-1"] = "2026-01-01T17:00:00.000Z";

  await runQuotaAutoPingTick(deps, state, () => NOW_MS);

  assert.equal(usageCalls, 0);
  assert.equal(calls.getExecutor.length, 0);
  assert.equal(calls.updateProviderConnection.length, 0);
});

test("#6977 does not ping when resetAt is stable (no slide)", async () => {
  const { deps, calls } = baseDeps({
    getCodexUsage: async () => ({
      quotas: {
        session: { used: 1, total: 100, remaining: 99, resetAt: "2026-01-01T17:00:00.000Z" },
      },
    }),
  });
  const state = createQuotaAutoPingState();
  state.resetCache["codex:codex-1"] = "2026-01-01T17:00:00.000Z";

  await runQuotaAutoPingTick(deps, state, () => NOW_MS);

  assert.equal(calls.getExecutor.length, 0);
  assert.equal(calls.updateProviderConnection.length, 0);
});

test("#6977 does not repeat a ping inside the minimum ping interval", async () => {
  const { deps, calls } = baseDeps({
    getProviderConnections: async ({ provider }) =>
      provider === "codex"
        ? [
            {
              id: "codex-1",
              provider: "codex",
              authType: "oauth",
              accessToken: "token",
              lastPingAt: "2026-01-01T11:55:00.000Z",
            },
          ]
        : [],
    getCodexUsage: async () => ({
      quotas: {
        session: { used: 1, total: 100, remaining: 99, resetAt: "2026-01-01T17:01:00.000Z" },
      },
    }),
  });
  const state = createQuotaAutoPingState();
  state.resetCache["codex:codex-1"] = "2026-01-01T17:00:00.000Z";

  await runQuotaAutoPingTick(deps, state, () => NOW_MS);

  assert.equal(calls.getExecutor.length, 0);
  assert.equal(calls.updateProviderConnection.length, 0);
});

test("#6977 never re-pings the same resetKey twice even across small clock drift", async () => {
  const { deps, calls } = baseDeps({
    getProviderConnections: async ({ provider }) =>
      provider === "codex"
        ? [
            {
              id: "codex-1",
              provider: "codex",
              authType: "oauth",
              accessToken: "token",
              lastPingedResetKey: "2026-01-01T11:59:00.000Z",
            },
          ]
        : [],
    getCodexUsage: async () => ({
      quotas: {
        session: { used: 0, total: 100, remaining: 100, resetAt: "2026-01-01T11:59:03.000Z" },
      },
    }),
  });
  const state = createQuotaAutoPingState();
  state.resetCache["codex:codex-1"] = "2026-01-01T11:59:00.000Z";

  await runQuotaAutoPingTick(deps, state, () => NOW_MS);

  assert.equal(calls.getExecutor.length, 0);
});

test("#6977 skips when the session quota itself is exhausted", async () => {
  const { deps, calls } = baseDeps({
    getCodexUsage: async () => ({
      quotas: {
        session: { used: 100, total: 100, remaining: 0, resetAt: "2026-01-01T17:01:00.000Z" },
      },
    }),
  });
  const state = createQuotaAutoPingState();
  state.resetCache["codex:codex-1"] = "2026-01-01T17:00:00.000Z";

  await runQuotaAutoPingTick(deps, state, () => NOW_MS);

  assert.equal(calls.getExecutor.length, 0);
});

test("#6977 skips when a blocking (non-session) quota is exhausted", async () => {
  const { deps, calls } = baseDeps({
    getCodexUsage: async () => ({
      quotas: {
        session: { used: 0, total: 100, remaining: 100, resetAt: "2026-01-01T17:01:00.000Z" },
        weekly: { used: 100, total: 100, remaining: 0, resetAt: "2026-01-03T12:00:00.000Z" },
      },
    }),
  });
  const state = createQuotaAutoPingState();
  state.resetCache["codex:codex-1"] = "2026-01-01T17:00:00.000Z";

  await runQuotaAutoPingTick(deps, state, () => NOW_MS);

  assert.equal(calls.getExecutor.length, 0);
});

test("#6977 skips non-OAuth Codex connections", async () => {
  const { deps, calls } = baseDeps({
    getProviderConnections: async ({ provider }) =>
      provider === "codex"
        ? [{ id: "codex-1", provider: "codex", authType: "apikey", accessToken: "token" }]
        : [],
  });
  const state = createQuotaAutoPingState();

  await runQuotaAutoPingTick(deps, state, () => NOW_MS);

  assert.equal(calls.getExecutor.length, 0);
});

test("#6977 skips a connection whose provider circuit breaker is open", async () => {
  const { deps, calls } = baseDeps({
    canExecuteProvider: () => false,
    getCodexUsage: async () => ({
      quotas: {
        session: { used: 1, total: 100, remaining: 99, resetAt: "2026-01-01T17:01:00.000Z" },
      },
    }),
  });
  const state = createQuotaAutoPingState();
  state.resetCache["codex:codex-1"] = "2026-01-01T17:00:00.000Z";

  await runQuotaAutoPingTick(deps, state, () => NOW_MS);

  assert.equal(calls.getExecutor.length, 0);
});

test("#6977 skips a connection currently in cooldown (rateLimitedUntil in the future)", async () => {
  const { deps, calls } = baseDeps({
    getProviderConnections: async ({ provider }) =>
      provider === "codex"
        ? [
            {
              id: "codex-1",
              provider: "codex",
              authType: "oauth",
              accessToken: "token",
              rateLimitedUntil: "2026-01-01T13:00:00.000Z",
            },
          ]
        : [],
  });
  const state = createQuotaAutoPingState();

  await runQuotaAutoPingTick(deps, state, () => NOW_MS);

  assert.equal(calls.getExecutor.length, 0);
});

test("#6977 does not re-ping while inside the failure cooldown window", async () => {
  const { deps, calls } = baseDeps({
    getCodexUsage: async () => ({
      quotas: {
        session: { used: 1, total: 100, remaining: 99, resetAt: "2026-01-01T17:01:00.000Z" },
      },
    }),
  });
  const state = createQuotaAutoPingState();
  state.resetCache["codex:codex-1"] = "2026-01-01T17:00:00.000Z";
  state.failureCache["codex:codex-1"] = NOW_MS - 60_000; // failed 1 minute ago

  await runQuotaAutoPingTick(deps, state, () => NOW_MS);

  assert.equal(calls.getExecutor.length, 0);
});

test("#6977 caches the failure and skips the DB write when the ping itself fails", async () => {
  const { deps, calls } = baseDeps({
    getCodexUsage: async () => ({
      quotas: {
        session: { used: 1, total: 100, remaining: 99, resetAt: "2026-01-01T17:01:00.000Z" },
      },
    }),
    getExecutor: () => ({
      execute: async () => ({ response: { ok: false } }),
    }),
  });
  const state = createQuotaAutoPingState();
  state.resetCache["codex:codex-1"] = "2026-01-01T17:00:00.000Z";

  await runQuotaAutoPingTick(deps, state, () => NOW_MS);

  assert.equal(calls.updateProviderConnection.length, 0);
  assert.equal(state.failureCache["codex:codex-1"], NOW_MS);
});

test("#6977 sends the tiny ping request through the real Codex executor with the configured model", async () => {
  const { deps, calls } = baseDeps({
    getProviderConnections: async ({ provider }) =>
      provider === "codex"
        ? [
            {
              id: "codex-1",
              provider: "codex",
              authType: "oauth",
              accessToken: "token",
              providerSpecificData: { workspaceId: "ws-1" },
            },
          ]
        : [],
    getCodexUsage: async () => ({
      quotas: {
        session: { used: 1, total: 100, remaining: 99, resetAt: "2026-01-01T17:01:00.000Z" },
      },
    }),
  });
  const state = createQuotaAutoPingState();
  state.resetCache["codex:codex-1"] = "2026-01-01T17:00:00.000Z";

  await runQuotaAutoPingTick(deps, state, () => NOW_MS);

  assert.deepEqual(calls.getExecutor, ["codex"]);
  const input = calls.executorExecute[0];
  assert.equal(input.stream, true);
  assert.equal(input.credentials.accessToken, "token");
  assert.equal(input.credentials.connectionId, "codex-1");
  assert.deepEqual(input.credentials.providerSpecificData, { workspaceId: "ws-1" });
  assert.equal(input.body.stream, true);
  assert.equal(input.body.store, false);
  assert.deepEqual(input.body.input, [
    { type: "message", role: "user", content: [{ type: "input_text", text: "hi" }] },
  ]);
});

test("#6977 does not ping when credential refresh throws", async () => {
  const { deps, calls } = baseDeps({
    refreshAndUpdateCredentials: async () => {
      throw new Error("refresh exploded");
    },
  });
  const state = createQuotaAutoPingState();
  state.resetCache["codex:codex-1"] = "2026-01-01T17:00:00.000Z";

  await runQuotaAutoPingTick(deps, state, () => NOW_MS);

  assert.equal(calls.getExecutor.length, 0);
  assert.equal(state.failureCache["codex:codex-1"], NOW_MS);
});

test("routes the auto-ping usage read through the shared quota-fetch throttle (#11904)", async () => {
  // #11904: every other Codex quota read goes through `throttleQuotaFetch()` — the
  // #6009/#6058 gate that spaces genuine upstream calls so many accounts on one IP do
  // not fire in the same second, which is the pattern that got a Codex OAuth token
  // revoked. The auto-ping scheduler called `getCodexUsage` directly, so the one Codex
  // path that runs unattended every 60s per connection was the one skipping the
  // mitigation written for Codex.
  const order = [];
  const { deps } = baseDeps({
    getSettings: async () => ({
      codexAutoPing: { connections: { "codex-1": true, "codex-2": true } },
    }),
    getProviderConnections: async ({ provider }) =>
      provider === "codex"
        ? [
            { id: "codex-1", provider: "codex", authType: "oauth", accessToken: "t1" },
            { id: "codex-2", provider: "codex", authType: "oauth", accessToken: "t2" },
          ]
        : [],
    throttleQuotaFetch: async () => {
      order.push("throttle");
    },
    getCodexUsage: async () => {
      order.push("fetch");
      return { quotas: {} };
    },
  });

  await runQuotaAutoPingTick(deps, createQuotaAutoPingState(), () => NOW_MS);

  // Two connections, so two gated fetches, and the gate must precede each one.
  assert.deepEqual(order, ["throttle", "fetch", "throttle", "fetch"]);
});

test("does not consume a throttle slot when the connection is skipped before fetching (#11904)", async () => {
  // The throttle paces genuine upstream calls only. A connection filtered out by the
  // circuit breaker never reaches the network, so it must not take a slot and delay
  // the connections that do.
  const order = [];
  const { deps } = baseDeps({
    canExecuteProvider: () => false,
    throttleQuotaFetch: async () => {
      order.push("throttle");
    },
    getCodexUsage: async () => {
      order.push("fetch");
      return { quotas: {} };
    },
  });

  await runQuotaAutoPingTick(deps, createQuotaAutoPingState(), () => NOW_MS);

  assert.deepEqual(order, []);
});

const RETIRED_CODEX_PING_MODEL = "gpt-5.1-codex-mini";

test("resolves the Codex ping model from the live registry and lifecycle data (#11905)", async () => {
  // #11905: the ping model used to be pinned to gpt-5.1-codex-mini, which OpenAI
  // shut down on 2026-07-23 and which the repo's own lifecycle registry already
  // rejects on the request path. The resolver must hand back a model that is (a)
  // in the Codex catalog, (b) selectable by the same gate chatCore applies, and
  // (c) a base id — the ping sets `reasoning.effort` itself, so an effort-suffixed
  // variant would be redundant.
  const model = await resolveQuotaAutoPingModel("codex", NOW_MS);

  assert.equal(typeof model, "string");
  assert.notEqual(model, RETIRED_CODEX_PING_MODEL);
  assert.ok(
    getProviderModels("codex").some((entry) => entry.id === model),
    `${model} must come from the Codex catalog`
  );
  assert.equal(isModelSelectable("codex", model, { asOf: NOW_MS }), true);
  assert.equal(splitCodexReasoningSuffix(model).effort, null);
});

test("sends the ping with the runtime-resolved model instead of a hardcoded id (#11905)", async () => {
  const { deps, calls } = baseDeps({
    getCodexUsage: async () => ({
      quotas: {
        session: { used: 1, total: 100, remaining: 99, resetAt: "2026-01-01T17:01:00.000Z" },
      },
    }),
  });
  const state = createQuotaAutoPingState();
  state.resetCache["codex:codex-1"] = "2026-01-01T17:00:00.000Z";

  await runQuotaAutoPingTick(deps, state, () => NOW_MS);

  const expected = await resolveQuotaAutoPingModel("codex", NOW_MS);
  assert.equal(calls.executorExecute.length, 1);
  const input = calls.executorExecute[0];
  assert.equal(input.model, expected);
  assert.equal(input.body.model, expected);
  assert.notEqual(input.model, RETIRED_CODEX_PING_MODEL);
  assert.equal(state.pingModelCache.codex, expected);
});

test("pauses the provider without any network I/O when no selectable Codex model exists (#11905)", async () => {
  // A retired or empty catalog must surface as a diagnostic, not as a blind retry
  // of a dead id every failure-cooldown window: no throttle slot, no usage read,
  // no executor call, no DB write — on the first tick or any later one.
  const order = [];
  const { deps, calls } = baseDeps({
    resolvePingModel: async () => null,
    throttleQuotaFetch: async () => {
      order.push("throttle");
    },
    getCodexUsage: async () => {
      order.push("fetch");
      return {
        quotas: {
          session: { used: 1, total: 100, remaining: 99, resetAt: "2026-01-01T17:01:00.000Z" },
        },
      };
    },
  });
  const state = createQuotaAutoPingState();
  state.resetCache["codex:codex-1"] = "2026-01-01T17:00:00.000Z";

  await runQuotaAutoPingTick(deps, state, () => NOW_MS);
  await runQuotaAutoPingTick(deps, state, () => NOW_MS + 16 * 60 * 1000);

  assert.deepEqual(order, []);
  assert.equal(calls.getExecutor.length, 0);
  assert.equal(calls.updateProviderConnection.length, 0);
  assert.equal(state.pingModelCache.codex, null);
  assert.equal(state.failureCache["codex:codex-1"], undefined);
});
