/**
 * LEDGER-3 (#3821-review) — the Antigravity local-usage fallback (#3604) replaces a
 * stale full `fetchAvailableModels` bucket (used=0) with real consumption summed from
 * `usage_history`, flipping quotaSource to "localUsageHistory". Every prior #3604 test
 * mocks only the HTTP layer, so the model-id match against usage_history.model was never
 * exercised end-to-end. This seeds a real usage_history row keyed by the CLIENT tier id
 * the fallback queries and asserts the flip — the regression guard for the id contract.
 *
 * Contract note: the fallback queries `usage_history WHERE model = <client tier id>`
 * (e.g. gemini-3.5-flash-high), so the executor MUST log usage under that same client id
 * for the fallback to fire. This test pins exactly that join.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ag-local-usage-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-ag-local-usage-secret";

const core = await import("../../src/lib/db/core.ts");
// Load usage.ts up-front (its index.ts proxyFetch patch runs at module eval) before mocks.
const usageModule = await import("../../open-sse/services/usage.ts");
const { getUsageForProvider } = usageModule;

const originalFetch = globalThis.fetch;

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("Antigravity fetchAvailableModels(used=0) → localUsageHistory when usage_history has rows", async () => {
  core.resetDbInstance();

  // resetTime an hour out → the 5h local-usage window is [now-4h, now+1h).
  const resetTime = new Date(Date.now() + 60 * 60 * 1000).toISOString();
  const seededTimestamp = new Date(Date.now() - 30 * 60 * 1000).toISOString(); // within window

  // Seed a usage_history row keyed by the CLIENT tier id the fallback queries.
  const db = core.getDbInstance() as unknown as { prepare: (sql: string) => { run: (...a: unknown[]) => unknown } };
  db.prepare(
    `INSERT INTO usage_history (provider, model, connection_id, tokens_input, tokens_output, tokens_reasoning, success, timestamp)
     VALUES (?, ?, ?, ?, ?, ?, 1, ?)`
  ).run("antigravity", "gemini-3.5-flash-high", "conn-local-1", 1000, 1500, 500, seededTimestamp);
  // Total seeded tokens = 3000 → ceil(3000/1000) = 3 units used.

  globalThis.fetch = (async (input: any) => {
    const url = typeof input === "string" ? input : input?.url || "";
    // retrieveUserQuota (the live signal) is unavailable → falls back to fetchAvailableModels.
    if (url.includes("retrieveUserQuota")) {
      return { ok: false, status: 404, json: async () => ({}) } as Response;
    }
    // fetchAvailableModels returns a FULL (stale) bucket: remainingFraction 1.0 + resetTime.
    return {
      ok: true,
      json: async () => ({
        models: {
          "gemini-3.5-flash-high": {
            quotaInfo: { remainingFraction: 1.0, resetTime },
          },
        },
      }),
    } as Response;
  }) as typeof fetch;

  const connection = {
    id: "conn-local-1",
    provider: "antigravity",
    accessToken: "fake-token-local-usage-unique",
    providerSpecificData: {},
    projectId: undefined,
  };

  const result = await getUsageForProvider(connection, { forceRefresh: true });
  assert.ok(result && "quotas" in result, "should return quotas");
  const quota = (result as any).quotas["gemini-3.5-flash-high"];
  assert.ok(quota, "should have the gemini-3.5-flash-high quota");
  assert.equal(quota.quotaSource, "localUsageHistory", "stale full bucket replaced by local usage");
  assert.equal(quota.used, 3, "3000 seeded tokens → 3 units used");
});

test("Antigravity stays fetchAvailableModels when usage_history has no matching rows", async () => {
  core.resetDbInstance();

  const resetTime = new Date(Date.now() + 60 * 60 * 1000).toISOString();

  globalThis.fetch = (async (input: any) => {
    const url = typeof input === "string" ? input : input?.url || "";
    if (url.includes("retrieveUserQuota")) {
      return { ok: false, status: 404, json: async () => ({}) } as Response;
    }
    return {
      ok: true,
      json: async () => ({
        models: {
          "gemini-3.5-flash-high": { quotaInfo: { remainingFraction: 1.0, resetTime } },
        },
      }),
    } as Response;
  }) as typeof fetch;

  const connection = {
    id: "conn-local-2",
    provider: "antigravity",
    accessToken: "fake-token-local-usage-empty",
    providerSpecificData: {},
    projectId: undefined,
  };

  const result = await getUsageForProvider(connection, { forceRefresh: true });
  const quota = (result as any).quotas["gemini-3.5-flash-high"];
  assert.ok(quota, "should have the quota");
  assert.equal(quota.quotaSource, "fetchAvailableModels", "no local rows → keep the catalog view");
  assert.equal(quota.used, 0, "full bucket stays at 0 used");
});
