/**
 * #8965 — Antigravity quota reads must use the runtime host (daily-cloudcode-pa)
 * instead of hardcoding cloudcode-pa.googleapis.com.
 *
 * Antigravity inference, credit probe, OAuth, and the models catalog all use
 * ANTIGRAVITY_RUNTIME_BASE_URLS which starts with daily-cloudcode-pa.googleapis.com.
 * The two quota RPCs (retrieveUserQuota, retrieveUserQuotaSummary) were hardcoded
 * to cloudcode-pa.googleapis.com, so when only the runtime host serves them, the
 * live quota signal is lost and falls back to fetchAvailableModels.
 *
 * This regression test stubs globalThis.fetch so ONLY daily-cloudcode-pa serves
 * the RPCs (cloudcode-pa returns 500), then asserts:
 *  1. retrieveUserQuota is the quota source (not fetchAvailableModels)
 *  2. Weekly bucket data is populated (not lost)
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ag-host-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-ag-host-secret";

const core = await import("../../src/lib/db/core.ts");
const usageModule = await import("../../open-sse/services/usage.ts");
const { getUsageForProvider } = usageModule;

const originalFetch = globalThis.fetch;

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const RESET_IN_2_HOURS = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString();
const RESET_IN_3_DAYS = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString();

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

test("#8965: quota reads use the runtime host (daily-cloudcode-pa), not cloudcode-pa", async () => {
  core.resetDbInstance();

  const dailyCount = { value: 0 };
  const cloudcodeCount = { value: 0 };

  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const url =
      typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;

    if (url.includes("daily-cloudcode-pa.googleapis.com")) {
      dailyCount.value++;

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
                modelId: "gemini-3.7-flash-high",
                remainingFraction: 0.4,
                resetTime: RESET_IN_2_HOURS,
              },
            ],
          }),
        } as Response;
      }

      if (url.includes("fetchAvailableModels")) {
        return {
          ok: true,
          json: async () => ({
            models: {
              "gemini-3.7-flash-high": {
                quotaInfo: { remainingFraction: 1.0, resetTime: RESET_IN_2_HOURS },
              },
              "gemini-3.7-flash-medium": {
                quotaInfo: { remainingFraction: 0.8, resetTime: RESET_IN_2_HOURS },
              },
            },
          }),
        } as Response;
      }

      // subscription info
      return {
        ok: true,
        json: async () => ({
          cloudaicompanionProject: { id: "test-project" },
          tierId: "FREE",
          subscriptionType: "free",
        }),
      } as Response;
    }

    if (url.includes("cloudcode-pa.googleapis.com")) {
      cloudcodeCount.value++;
      return { ok: false, status: 500, json: async () => ({}) } as Response;
    }

    // Default: return 500 for anything else
    return { ok: false, status: 500, json: async () => ({}) } as Response;
  }) as typeof fetch;

  const connection = {
    id: "conn-host-8965",
    provider: "antigravity",
    accessToken: "fake-token-host-test-8965",
    providerSpecificData: { clientProfile: "cli" },
    projectId: "test-project",
  };

  const result = await getUsageForProvider(connection, { forceRefresh: true });
  assert.ok(result && "quotas" in result, "should return quotas");
  const quotas = (result as UsageResult).quotas;

  // The per-model quota should come from retrieveUserQuota (the live source),
  // NOT fetchAvailableModels (the stale catalog fallback).
  assert.ok(quotas["gemini-3.7-flash-high"], "gemini-3.7-flash-high quota present");
  assert.equal(
    quotas["gemini-3.7-flash-high"].quotaSource,
    "retrieveUserQuota",
    "quota source is retrieveUserQuota (live), not fetchAvailableModels"
  );

  // The weekly group quota should also be populated.
  assert.ok(quotas.gemini_weekly, "weekly group quota merged in");
  assert.equal(quotas.gemini_weekly.remainingPercentage, 60);

  // The runtime host should have been used for the quota RPCs.
  assert.ok(dailyCount.value > 0, "daily-cloudcode-pa was called at least once");
});

test("#8965 behavioral impact: live quota source + weekly bucket unreachable when only runtime host serves", async () => {
  core.resetDbInstance();

  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const url =
      typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;

    if (url.includes("daily-cloudcode-pa.googleapis.com")) {
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
                modelId: "gemini-3.7-flash-high",
                remainingFraction: 0.4,
                resetTime: RESET_IN_2_HOURS,
              },
            ],
          }),
        } as Response;
      }

      if (url.includes("fetchAvailableModels")) {
        return {
          ok: true,
          json: async () => ({
            models: {
              "gemini-3.7-flash-high": {
                quotaInfo: { remainingFraction: 1.0, resetTime: RESET_IN_2_HOURS },
              },
            },
          }),
        } as Response;
      }

      // subscription info
      return {
        ok: true,
        json: async () => ({
          cloudaicompanionProject: { id: "test-project" },
          tierId: "FREE",
          subscriptionType: "free",
        }),
      } as Response;
    }

    if (url.includes("cloudcode-pa.googleapis.com")) {
      return { ok: false, status: 500, json: async () => ({}) } as Response;
    }

    return { ok: false, status: 500, json: async () => ({}) } as Response;
  }) as typeof fetch;

  const connection = {
    id: "conn-host-8965-impact",
    provider: "antigravity",
    accessToken: "fake-token-host-impact",
    providerSpecificData: { clientProfile: "cli" },
    projectId: "test-project",
  };

  const result = await getUsageForProvider(connection, { forceRefresh: true });
  assert.ok(result && "quotas" in result, "should return quotas");
  const quotas = (result as UsageResult).quotas;

  // The per-model quota MUST come from retrieveUserQuota — the live signal.
  assert.ok(quotas["gemini-3.7-flash-high"], "gemini-3.7-flash-high quota present");
  assert.equal(
    quotas["gemini-3.7-flash-high"].quotaSource,
    "retrieveUserQuota",
    "quota source is retrieveUserQuota (live), not fetchAvailableModels"
  );

  // The weekly group quota MUST also be present because retrieveUserQuotaSummary
  // was served by the runtime host.
  assert.ok(quotas.gemini_weekly, "weekly group quota present");
});
