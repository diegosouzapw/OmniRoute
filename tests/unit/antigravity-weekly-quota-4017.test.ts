/**
 * #4017 — Antigravity weekly-quota widget.
 *
 * Antigravity enforces both a 5-hour window (already surfaced per-model via
 * `retrieveUserQuota`) and a separate weekly window that only appears in the
 * `retrieveUserQuotaSummary` RPC, grouped by model family ("Gemini Models",
 * "Claude and GPT models") rather than by individual modelId. This guards:
 *  1. The pure parser (`parseAntigravityWeeklyQuotas`) against the documented
 *     bucket shape (bucketId/displayName/remainingFraction/resetTime, window
 *     inferred from bucketId+displayName text — there is no explicit type field).
 *  2. The end-to-end wiring: `getUsageForProvider()` merges the weekly group
 *     quotas alongside the existing per-model 5h quotas without clobbering them.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ag-weekly-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-ag-weekly-secret";

const core = await import("../../src/lib/db/core.ts");
const { parseAntigravityWeeklyQuotas } =
  await import("../../open-sse/services/usage/antigravityWeeklyQuota.ts");
// Load usage.ts up-front (its index.ts proxyFetch patch runs at module eval) before mocks.
const usageModule = await import("../../open-sse/services/usage.ts");
const { getUsageForProvider } = usageModule;

const originalFetch = globalThis.fetch;

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

const RESET_IN_3_DAYS = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString();
const RESET_IN_2_HOURS = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString();

function requestUrl(input: RequestInfo | URL): string {
  if (typeof input === "string") return input;
  if (input instanceof URL) return input.toString();
  return input.url;
}

interface UsageResult {
  quotas: Record<
    string,
    {
      remainingPercentage?: number;
      resetAt: string | null;
      unlimited: boolean;
      quotaSource?: string;
    }
  >;
}

test("parseAntigravityWeeklyQuotas extracts the weekly bucket per model-family group", () => {
  const summary = {
    groups: [
      {
        displayName: "Gemini Models",
        buckets: [
          {
            bucketId: "gemini-5h",
            displayName: "5 Hour Quota",
            remainingFraction: 0.4,
            resetTime: RESET_IN_2_HOURS,
          },
          {
            bucketId: "gemini-weekly",
            displayName: "Weekly Quota",
            remainingFraction: 0.75,
            resetTime: RESET_IN_3_DAYS,
          },
        ],
      },
      {
        displayName: "Claude and GPT models",
        buckets: [
          {
            bucketId: "claude-gpt-weekly",
            displayName: "Weekly Quota",
            remainingFraction: 0.1,
            resetTime: RESET_IN_3_DAYS,
          },
        ],
      },
    ],
  };

  const quotas = parseAntigravityWeeklyQuotas(summary);

  assert.ok(quotas.gemini_weekly, "gemini weekly bucket extracted");
  assert.equal(quotas.gemini_weekly.remainingPercentage, 75);
  assert.equal(quotas.gemini_weekly.resetAt, RESET_IN_3_DAYS);
  assert.equal(quotas.gemini_weekly.unlimited, false);

  assert.ok(quotas.claude_gpt_weekly, "claude/gpt weekly bucket extracted");
  assert.equal(quotas.claude_gpt_weekly.remainingPercentage, 10);

  // The 5h bucket in the same group must NOT be picked up as "weekly" —
  // only one entry per group, and it must be the one whose text says "weekly".
  assert.equal(Object.keys(quotas).length, 2);
});

test("parseAntigravityWeeklyQuotas tolerates the quotaSummary-nested envelope", () => {
  const summary = {
    quotaSummary: {
      groups: [
        {
          displayName: "Gemini Models",
          buckets: [
            {
              bucketId: "weekly",
              displayName: "Weekly",
              remainingFraction: 0.5,
              resetTime: RESET_IN_3_DAYS,
            },
          ],
        },
      ],
    },
  };

  const quotas = parseAntigravityWeeklyQuotas(summary);
  assert.ok(quotas.gemini_weekly);
  assert.equal(quotas.gemini_weekly.remainingPercentage, 50);
});

test("parseAntigravityWeeklyQuotas returns {} for missing/malformed data (best-effort)", () => {
  assert.deepEqual(parseAntigravityWeeklyQuotas(null), {});
  assert.deepEqual(parseAntigravityWeeklyQuotas(undefined), {});
  assert.deepEqual(parseAntigravityWeeklyQuotas({}), {});
  assert.deepEqual(
    parseAntigravityWeeklyQuotas({ groups: [{ displayName: "Gemini Models" }] }),
    {}
  );
});

test("getUsageForProvider(antigravity) merges weekly quotas with the selected CLI identity", async () => {
  core.resetDbInstance();

  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = requestUrl(input);
    const headers = new Headers(init?.headers);
    assert.match(headers.get("User-Agent") ?? "", /^antigravity\/cli\/1\.1\.5 /);
    assert.equal(headers.get("X-Goog-Api-Client"), null);

    if (url.includes("retrieveUserQuotaSummary")) {
      return {
        ok: true,
        json: async () => ({
          groups: [
            {
              displayName: "Gemini Models",
              buckets: [
                {
                  bucketId: "gemini-weekly",
                  displayName: "Weekly Quota",
                  remainingFraction: 0.6,
                  resetTime: RESET_IN_3_DAYS,
                },
              ],
            },
          ],
        }),
      } as Response;
    }

    if (url.includes("retrieveUserQuota")) {
      return {
        ok: true,
        json: async () => ({
          buckets: [
            {
              modelId: "gemini-3-flash-agent",
              remainingFraction: 0.4,
              resetTime: RESET_IN_2_HOURS,
            },
          ],
        }),
      } as Response;
    }

    // fetchAvailableModels
    return {
      ok: true,
      json: async () => ({
        models: {
          "gemini-3-flash-agent": {
            quotaInfo: { remainingFraction: 1.0, resetTime: RESET_IN_2_HOURS },
          },
        },
      }),
    } as Response;
  }) as typeof fetch;

  const connection = {
    id: "conn-weekly-1",
    provider: "antigravity",
    accessToken: "fake-token-weekly-unique",
    providerSpecificData: { clientProfile: "cli" },
    projectId: "test-project",
  };

  const result = await getUsageForProvider(connection, { forceRefresh: true });
  assert.ok(result && "quotas" in result, "should return quotas");
  const quotas = (result as UsageResult).quotas;

  // Existing per-model 5h quota is untouched.
  assert.ok(quotas["gemini-3-flash-agent"], "per-model 5h quota still present");
  assert.equal(quotas["gemini-3-flash-agent"].quotaSource, "retrieveUserQuota");

  // New weekly group quota is merged in alongside it.
  assert.ok(quotas.gemini_weekly, "weekly group quota merged in");
  assert.equal(quotas.gemini_weekly.remainingPercentage, 60);
  assert.equal(quotas.gemini_weekly.resetAt, RESET_IN_3_DAYS);
});

test("getUsageForProvider(antigravity) is unaffected when retrieveUserQuotaSummary is unavailable", async () => {
  core.resetDbInstance();

  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const url = requestUrl(input);
    if (url.includes("retrieveUserQuotaSummary")) {
      return { ok: false, status: 404, json: async () => ({}) } as Response;
    }
    if (url.includes("retrieveUserQuota")) {
      return { ok: false, status: 404, json: async () => ({}) } as Response;
    }
    return {
      ok: true,
      json: async () => ({
        models: {
          "gemini-3-flash-agent": {
            quotaInfo: { remainingFraction: 1.0, resetTime: RESET_IN_2_HOURS },
          },
        },
      }),
    } as Response;
  }) as typeof fetch;

  const connection = {
    id: "conn-weekly-2",
    provider: "antigravity",
    accessToken: "fake-token-weekly-unavailable",
    providerSpecificData: {},
    projectId: "test-project",
  };

  const result = await getUsageForProvider(connection, { forceRefresh: true });
  const quotas = (result as UsageResult).quotas;
  assert.ok(quotas["gemini-3-flash-agent"], "per-model quota still present without weekly data");
  assert.equal(quotas.gemini_weekly, undefined, "no weekly key when the RPC is unavailable");
});
