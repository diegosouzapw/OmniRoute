import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-autoping-proxy-"));

const { createQuotaAutoPingState, runQuotaAutoPingTick } =
  await import("../../src/lib/services/quotaAutoPing.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { resolveProxyForRequest, runWithProxyContext } =
  await import("../../open-sse/utils/proxyFetch.ts");

test.after(() => {
  resetDbInstance();
});

const NOW_MS = Date.parse("2026-01-01T12:00:00.000Z");
const PREVIOUS_RESET = "2026-01-01T17:00:00.000Z";
const SLID_RESET = "2026-01-01T17:01:00.000Z";

type ProxyObservation = ReturnType<typeof resolveProxyForRequest>;

function createTickFixture(connectionId: string, overrides: Record<string, unknown> = {}) {
  const calls = {
    executor: 0,
    resolver: [] as string[],
    runner: [] as unknown[],
    update: 0,
    usage: 0,
  };
  const deps = {
    getSettings: async () => ({ codexAutoPing: { connections: { [connectionId]: true } } }),
    getProviderConnections: async () => [
      {
        id: connectionId,
        provider: "codex",
        authType: "oauth",
        accessToken: `token-${connectionId}`,
      },
    ],
    updateProviderConnection: async () => {
      calls.update += 1;
    },
    refreshAndUpdateCredentials: async (connection: unknown) => ({ connection }),
    getCodexUsage: async () => {
      calls.usage += 1;
      return {
        quotas: {
          session: { used: 1, total: 100, remaining: 99, resetAt: SLID_RESET },
        },
      };
    },
    throttleQuotaFetch: async () => {},
    getExecutor: async () => ({
      execute: async () => {
        calls.executor += 1;
        return { response: { ok: true, text: async () => "" } };
      },
    }),
    canExecuteProvider: () => true,
    isConnectionUnavailableToAuxiliaryActivity: async () => false,
    resolvePingModel: async () => "gpt-5-codex",
    resolveProxyForConnection: async (id: string) => {
      calls.resolver.push(id);
      return { proxy: null, level: "direct", levelId: null };
    },
    runWithProxyContext: async (proxy: unknown, callback: () => Promise<unknown>) => {
      calls.runner.push(proxy);
      return runWithProxyContext(proxy, callback);
    },
    ...overrides,
  };
  const state = createQuotaAutoPingState();
  state.resetCache[`codex:${connectionId}`] = PREVIOUS_RESET;
  return { calls, deps, state };
}

test("#14997 binds concurrent usage reads and warm-up pings to each connection proxy", async () => {
  let usageEntries = 0;
  let releaseUsage: (() => void) | undefined;
  const usageBarrier = new Promise<void>((resolve) => {
    releaseUsage = resolve;
  });
  const observations = new Map<string, ProxyObservation[]>();

  function fixtureFor(connectionId: string, proxyHost: string) {
    const proxy = { type: "vercel", host: proxyHost };
    const record = () => {
      const entries = observations.get(connectionId) ?? [];
      entries.push(resolveProxyForRequest("https://chatgpt.com/backend-api/wham/usage"));
      observations.set(connectionId, entries);
    };
    return createTickFixture(connectionId, {
      resolveProxyForConnection: async () => ({ proxy, level: "account", levelId: connectionId }),
      getCodexUsage: async () => {
        record();
        usageEntries += 1;
        if (usageEntries === 2) releaseUsage?.();
        await usageBarrier;
        record();
        return {
          quotas: {
            session: { used: 1, total: 100, remaining: 99, resetAt: SLID_RESET },
          },
        };
      },
      getExecutor: async () => ({
        execute: async () => {
          record();
          return { response: { ok: true, text: async () => "" } };
        },
      }),
    });
  }

  const first = fixtureFor("codex-a", "proxy-a.example.test");
  const second = fixtureFor("codex-b", "proxy-b.example.test");
  await Promise.all([
    runQuotaAutoPingTick(first.deps as never, first.state, () => NOW_MS),
    runQuotaAutoPingTick(second.deps as never, second.state, () => NOW_MS),
  ]);

  assert.deepEqual(observations.get("codex-a"), [
    { source: "context", proxyUrl: "https://proxy-a.example.test" },
    { source: "context", proxyUrl: "https://proxy-a.example.test" },
    { source: "context", proxyUrl: "https://proxy-a.example.test" },
  ]);
  assert.deepEqual(observations.get("codex-b"), [
    { source: "context", proxyUrl: "https://proxy-b.example.test" },
    { source: "context", proxyUrl: "https://proxy-b.example.test" },
    { source: "context", proxyUrl: "https://proxy-b.example.test" },
  ]);
});

test("#14997 proxy context failure cools down without a direct usage or ping retry", async () => {
  let callbackCalls = 0;
  const fixture = createTickFixture("codex-proxy-error", {
    resolveProxyForConnection: async () => ({
      proxy: { type: "http", host: "unreachable.example.test", port: 8080 },
      level: "account",
      levelId: "codex-proxy-error",
    }),
    runWithProxyContext: async (_proxy: unknown, _callback: () => Promise<unknown>) => {
      callbackCalls += 1;
      const error = new Error("assigned proxy is unavailable") as Error & { code?: string };
      error.code = "PROXY_UNREACHABLE";
      throw error;
    },
  });

  await runQuotaAutoPingTick(fixture.deps as never, fixture.state, () => NOW_MS);

  assert.equal(callbackCalls, 1);
  assert.equal(fixture.calls.usage, 0);
  assert.equal(fixture.calls.executor, 0);
  assert.equal(fixture.calls.update, 0);
  assert.equal(fixture.state.failureCache["codex:codex-proxy-error"], NOW_MS);
});

test("#14997 proxy resolver failure never degrades to an unscoped direct call", async () => {
  const fixture = createTickFixture("codex-resolver-error", {
    resolveProxyForConnection: async () => {
      throw new Error("proxy registry unavailable");
    },
  });

  await runQuotaAutoPingTick(fixture.deps as never, fixture.state, () => NOW_MS);

  assert.equal(fixture.calls.runner.length, 0);
  assert.equal(fixture.calls.usage, 0);
  assert.equal(fixture.calls.executor, 0);
  assert.equal(fixture.state.failureCache["codex:codex-resolver-error"], NOW_MS);
});

test("#14997 an unconfigured proxy preserves the existing usage and ping flow", async () => {
  const fixture = createTickFixture("codex-unconfigured");

  await runQuotaAutoPingTick(fixture.deps as never, fixture.state, () => NOW_MS);

  assert.deepEqual(fixture.calls.resolver, ["codex-unconfigured"]);
  assert.deepEqual(fixture.calls.runner, [null]);
  assert.equal(fixture.calls.usage, 1);
  assert.equal(fixture.calls.executor, 1);
  assert.equal(fixture.calls.update, 1);
  assert.equal(fixture.state.failureCache["codex:codex-unconfigured"], undefined);
});
