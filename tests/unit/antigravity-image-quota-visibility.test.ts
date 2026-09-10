/**
 * Antigravity image generation uses a non-chat model, but Google reports a
 * model-specific quota bucket for it. Provider Limits must keep that bucket
 * without adding image/TTS/tab models to chat discovery.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ag-image-quota-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-ag-image-quota-secret";

const core = await import("../../src/lib/db/core.ts");
const { getUsageForProvider } = await import("../../open-sse/services/usage.ts");
const {
  isDiscoverableAntigravityModelId,
  isUserVisibleAntigravityQuotaModelId,
} = await import("../../open-sse/config/antigravityModelAliases.ts");
const originalFetch = globalThis.fetch;

const RESET_IN_2_HOURS = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString();

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("image quota visibility stays separate from chat discovery", () => {
  assert.equal(isDiscoverableAntigravityModelId("gemini-3.1-flash-image"), false);
  assert.equal(isUserVisibleAntigravityQuotaModelId("gemini-3.1-flash-image"), true);
  assert.equal(isUserVisibleAntigravityQuotaModelId("gemini-3-pro-image-preview"), true);

  assert.equal(isUserVisibleAntigravityQuotaModelId("gemini-3.8-flash-high"), true);
  assert.equal(isUserVisibleAntigravityQuotaModelId("gemini-3.1-flash-tts-preview"), false);
  assert.equal(isUserVisibleAntigravityQuotaModelId("tab_flash_lite_preview"), false);
  assert.equal(isUserVisibleAntigravityQuotaModelId("gemini-3.5-flash-preview"), false);
  assert.equal(isUserVisibleAntigravityQuotaModelId(""), false);
});

test("Provider Limits surfaces gemini-3.1-flash-image quota but hides unrelated non-chat buckets", async () => {
  core.resetDbInstance();

  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const url =
      typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;

    if (url.includes("retrieveUserQuotaSummary")) {
      return { ok: false, status: 404, json: async () => ({}) } as Response;
    }

    if (url.includes("retrieveUserQuota")) {
      return {
        ok: true,
        json: async () => ({
          buckets: [
            {
              modelId: "gemini-3.1-flash-image",
              remainingFraction: 0.25,
              resetTime: RESET_IN_2_HOURS,
            },
            {
              modelId: "gemini-3.1-flash-tts-preview",
              remainingFraction: 0.5,
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
            "gemini-3.1-flash-image": {
              quotaInfo: { remainingFraction: 1, resetTime: RESET_IN_2_HOURS },
            },
            "gemini-3.1-flash-tts-preview": {
              quotaInfo: { remainingFraction: 1, resetTime: RESET_IN_2_HOURS },
            },
          },
        }),
      } as Response;
    }

    return {
      ok: true,
      json: async () => ({
        cloudaicompanionProject: { id: "test-project" },
        tierId: "FREE",
        subscriptionType: "free",
      }),
    } as Response;
  }) as typeof fetch;

  const result = await getUsageForProvider(
    {
      id: "conn-image-quota",
      provider: "antigravity",
      accessToken: "fake-token-image-quota",
      providerSpecificData: { clientProfile: "cli" },
      projectId: "test-project",
    },
    { forceRefresh: true }
  );

  assert.ok(result && "quotas" in result, "should return quotas");
  const quotas = (
    result as {
      quotas: Record<string, { remainingPercentage?: number; quotaSource?: string }>;
    }
  ).quotas;

  assert.ok(quotas["gemini-3.1-flash-image"], "image quota should be visible");
  assert.equal(quotas["gemini-3.1-flash-image"].remainingPercentage, 25);
  assert.equal(quotas["gemini-3.1-flash-image"].quotaSource, "retrieveUserQuota");
  assert.equal(quotas["gemini-3.1-flash-tts-preview"], undefined);
});
