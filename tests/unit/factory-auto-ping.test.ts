import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-factory-autoping-"));

const { runQuotaAutoPingTick, createQuotaAutoPingState, resolveQuotaAutoPingModel } =
  await import("../../src/lib/services/quotaAutoPing.ts");
const { FACTORY_PING_MODEL } = await import("../../src/shared/constants/quotaAutoPing.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { factoryQuotaTierFor } = await import("../../open-sse/config/factory.ts");

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
    getSettings: async () => ({ factoryAutoPing: { connections: { "factory-1": true } } }),
    getProviderConnections: async ({ provider }) =>
      provider === "factory"
        ? [{ id: "factory-1", provider: "factory", authType: "oauth", accessToken: "token" }]
        : [],
    updateProviderConnection: async (id, data) => {
      calls.updateProviderConnection.push([id, data]);
      return null;
    },
    refreshAndUpdateCredentials: async (connection) => ({ connection }),
    getCodexUsage: async () => ({ quotas: {} }),
    getFactoryUsage: async () => ({
      quotas: {
        standard_5h: { used: 0, total: 100, remaining: 100, resetAt: "2026-01-01T11:00:00.000Z" },
      },
    }),
    throttleQuotaFetch: async () => {},
    resolveProxyForConnection: async () => ({ proxy: null, level: "direct", levelId: null }),
    runWithProxyContext: async (_proxy, callback) => callback(),
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
    resolvePingModel: resolveQuotaAutoPingModel,
    ...overrides,
  };
  return { deps, calls };
}

test("Factory ping model is Claude Haiku 4.5 (Standard) matching the Standard quota gate", async () => {
  const model = await resolveQuotaAutoPingModel("factory", NOW_MS);
  assert.equal(model, FACTORY_PING_MODEL);
  assert.equal(model, "claude-haiku-4-5-20251001");
  assert.equal(factoryQuotaTierFor(model), "standard");
});

test("Factory auto-ping is a no-op until a connection is opted in", async () => {
  const { deps, calls } = baseDeps({ getSettings: async () => ({}) });
  await runQuotaAutoPingTick(deps, createQuotaAutoPingState(), () => NOW_MS);
  assert.equal(calls.executorExecute.length, 0);
});

test("Factory pings Claude Haiku 4.5 when the Standard 5h window is inactive", async () => {
  const { deps, calls } = baseDeps();
  await runQuotaAutoPingTick(deps, createQuotaAutoPingState(), () => NOW_MS);
  assert.equal(calls.getExecutor[0], "factory");
  assert.equal(calls.executorExecute.length, 1);
  assert.equal(calls.executorExecute[0].model, FACTORY_PING_MODEL);
  assert.equal(calls.executorExecute[0].body.model, FACTORY_PING_MODEL);
  assert.equal(calls.executorExecute[0].body.max_tokens, 1);
  assert.equal(calls.updateProviderConnection.length, 1);
});

test("Factory does not ping when Standard weekly is exhausted", async () => {
  const { deps, calls } = baseDeps({
    getFactoryUsage: async () => ({
      quotas: {
        standard_5h: { used: 0, total: 100, remaining: 100, resetAt: "2026-01-01T11:00:00.000Z" },
        standard_weekly: {
          used: 100,
          total: 100,
          remaining: 0,
          resetAt: "2026-01-08T00:00:00.000Z",
        },
      },
    }),
  });
  await runQuotaAutoPingTick(deps, createQuotaAutoPingState(), () => NOW_MS);
  assert.equal(calls.executorExecute.length, 0);
});

test("Factory does not ping when billing fetch fails or Standard 5h is missing", async () => {
  const missing = baseDeps({
    getFactoryUsage: async () => ({ error: "Factory billing API error: HTTP 503" }),
  });
  await runQuotaAutoPingTick(missing.deps, createQuotaAutoPingState(), () => NOW_MS);
  assert.equal(missing.calls.executorExecute.length, 0);

  const noBucket = baseDeps({
    getFactoryUsage: async () => ({ quotas: { core_5h: { used: 0, total: 100, remaining: 100 } } }),
  });
  await runQuotaAutoPingTick(noBucket.deps, createQuotaAutoPingState(), () => NOW_MS);
  assert.equal(noBucket.calls.executorExecute.length, 0);
});

test("Factory Standard ping is not blocked by exhausted Core weekly", async () => {
  const { deps, calls } = baseDeps({
    getFactoryUsage: async () => ({
      quotas: {
        standard_5h: { used: 0, total: 100, remaining: 100, resetAt: "2026-01-01T11:00:00.000Z" },
        core_weekly: { used: 100, total: 100, remaining: 0, resetAt: "2026-01-08T00:00:00.000Z" },
      },
    }),
  });
  await runQuotaAutoPingTick(deps, createQuotaAutoPingState(), () => NOW_MS);
  assert.equal(calls.executorExecute.length, 1);
  assert.equal(calls.executorExecute[0].model, FACTORY_PING_MODEL);
});
