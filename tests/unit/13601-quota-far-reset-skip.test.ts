// #13601.4: QuotaAutoPing must not hammer an account whose quota reset is
// days away — warming a window that cannot roll soon has no benefit, so the
// ping is skipped instead of failing every tick (146 warns for one account).
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-13601-farreset-"));

const { runQuotaAutoPingTick, createQuotaAutoPingState } =
  await import("../../src/lib/services/quotaAutoPing.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

test.after(() => {
  resetDbInstance();
});

const NOW_MS = new Date("2026-09-13T12:00:00.000Z").getTime();
const FAR_RESET = new Date(NOW_MS + 30 * 24 * 3600 * 1000).toISOString();
const FAR_RESET_SLID = new Date(new Date(FAR_RESET).getTime() + 120_000).toISOString();
const NEAR_RESET = new Date(NOW_MS + 4 * 3600 * 1000).toISOString();
const NEAR_RESET_SLID = new Date(new Date(NEAR_RESET).getTime() + 120_000).toISOString();

function farResetDeps(getCodexUsage: () => Promise<unknown>) {
  const calls = { executorExecute: 0, getExecutor: 0, updateProviderConnection: 0 };
  return {
    calls,
    deps: {
      getSettings: async () => ({ codexAutoPing: { connections: { "codex-1": true } } }),
      getProviderConnections: async () => [
        { id: "codex-1", provider: "codex", authType: "oauth", accessToken: "token" },
      ],
      updateProviderConnection: async () => {
        calls.updateProviderConnection += 1;
        return null;
      },
      refreshAndUpdateCredentials: async (connection: unknown) => ({
        connection: connection as never,
      }),
      getCodexUsage: getCodexUsage as never,
      throttleQuotaFetch: async () => {},
      getExecutor: () => {
        calls.getExecutor += 1;
        return {
          execute: async () => {
            calls.executorExecute += 1;
            return { response: { ok: true, text: async () => "" } };
          },
        };
      },
      canExecuteProvider: () => true,
      isConnectionUnavailableToAuxiliaryActivity: async () => false,
      resolvePingModel: async () => "gpt-5-codex",
    },
  };
}

test("#13601.4: no ping when resetAt is a month away, even after a window slide", async () => {
  let resetAt = FAR_RESET;
  const { deps, calls } = farResetDeps(async () => ({
    quotas: { session: { used: 1, resetAt } },
  }));
  const state = createQuotaAutoPingState();

  await runQuotaAutoPingTick(deps as never, state as never, () => NOW_MS);
  assert.equal(calls.getExecutor, 0);

  resetAt = FAR_RESET_SLID;
  await runQuotaAutoPingTick(deps as never, state as never, () => NOW_MS);
  assert.equal(calls.getExecutor, 0);
  assert.equal(calls.executorExecute, 0);
});

test("#13601.4: a near reset still pings after a window slide", async () => {
  let resetAt = NEAR_RESET;
  const { deps, calls } = farResetDeps(async () => ({
    quotas: { session: { used: 1, resetAt } },
  }));
  const state = createQuotaAutoPingState();

  await runQuotaAutoPingTick(deps as never, state as never, () => NOW_MS);
  assert.equal(calls.executorExecute, 0);

  resetAt = NEAR_RESET_SLID;
  await runQuotaAutoPingTick(deps as never, state as never, () => NOW_MS);
  assert.equal(calls.executorExecute, 1);
});
