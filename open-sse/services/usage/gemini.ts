/**
 * Usage Fetcher - Get usage data from provider APIs
 */

import { PROVIDERS } from "../../config/constants.ts";

import { sanitizeErrorMessage } from "../../utils/error.ts";

import { SubscriptionCacheEntry, JsonRecord, UsageQuota } from "./types.ts";
import { getAntigravityUsage, mapCodeAssistSubscriptionToPlanLabel } from "./antigravity.ts";
import { toRecord, toNumber, parseResetTime } from "./utils.ts";
import { GEMINI_CLI_USAGE_URL } from "./constants.ts";

// ── Gemini CLI subscription info cache ──────────────────────────────────────
// Prevents duplicate loadCodeAssist calls within the same quota cycle.
// Key: accessToken → { data, fetchedAt }
export const _geminiCliSubCache = new Map<string, SubscriptionCacheEntry>();

export const GEMINI_CLI_CACHE_TTL_MS = 5 * 60 * 1000;

// 5 minutes

// ── Proactive TTL purging for the gemini CLI cache ───────────────────────────
// The cache only evicts on read (passive TTL). This interval proactively purges
// stale entries so keys accessed once and never again don't leak memory. Owned
// locally to avoid a circular dependency on antigravity.ts.
const _geminiCliCacheCleanupTimer = setInterval(
  () => {
    const now = Date.now();
    for (const [key, entry] of _geminiCliSubCache) {
      if (now - entry.fetchedAt > GEMINI_CLI_CACHE_TTL_MS) _geminiCliSubCache.delete(key);
    }
  },
  5 * 60 * 1000
);

// every 5 minutes
_geminiCliCacheCleanupTimer.unref?.();

/**
 * Gemini CLI Usage — fetch per-model quota from Cloud Code Assist API.
 * Gemini CLI and Antigravity share the same upstream (cloudcode-pa.googleapis.com),
 * so this follows the same pattern as getAntigravityUsage().
 */
export async function getGeminiUsage(
  accessToken?: string,
  providerSpecificData?: JsonRecord,
  connectionProjectId?: string
) {
  if (!accessToken) {
    return { plan: "Free", message: "Gemini CLI access token not available." };
  }

  try {
    const subscriptionInfo = await getGeminiCliSubscriptionInfoCached(accessToken);
    const projectId =
      connectionProjectId ||
      providerSpecificData?.projectId ||
      toRecord(subscriptionInfo).cloudaicompanionProject ||
      null;

    const plan = getGeminiCliPlanLabel(subscriptionInfo);

    if (!projectId) {
      return { plan, message: "Gemini CLI project ID not available." };
    }

    // Use retrieveUserQuota (same endpoint as Gemini CLI /stats command).
    // Returns per-model buckets with remainingFraction and resetTime.
    const response = await fetch(
      "https://cloudcode-pa.googleapis.com/v1internal:retrieveUserQuota",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ project: projectId }),
        signal: AbortSignal.timeout(10000),
      }
    );

    if (!response.ok) {
      return { plan, message: `Gemini CLI quota error (${response.status}).` };
    }

    const data = await response.json();
    const quotas: Record<string, UsageQuota> = {};

    const dataRecord = toRecord(data);
    if (Array.isArray(dataRecord.buckets)) {
      for (const bucketValue of dataRecord.buckets) {
        const bucket = toRecord(bucketValue);
        if (!bucket.modelId || bucket.remainingFraction == null) continue;

        const remainingFraction = toNumber(bucket.remainingFraction, 0);
        const remainingPercentage = remainingFraction * 100;
        const QUOTA_NORMALIZED_BASE = 1000;
        const total = QUOTA_NORMALIZED_BASE;
        const remaining = Math.round(total * remainingFraction);
        const used = Math.max(0, total - remaining);

        quotas[String(bucket.modelId)] = {
          used,
          total,
          resetAt: parseResetTime(bucket.resetTime),
          remainingPercentage,
          unlimited: false,
        };
      }
    }

    return { plan, quotas };
  } catch (error) {
    return { message: `Gemini CLI error: ${(error as Error).message}` };
  }
}

/**
 * Get Gemini CLI subscription info (cached, 5 min TTL)
 */
async function getGeminiCliSubscriptionInfoCached(accessToken: string): Promise<unknown> {
  const cacheKey = accessToken;
  const cached = _geminiCliSubCache.get(cacheKey);

  if (cached && Date.now() - cached.fetchedAt < GEMINI_CLI_CACHE_TTL_MS) {
    return cached.data;
  }

  const data = await getGeminiCliSubscriptionInfo(accessToken);
  _geminiCliSubCache.set(cacheKey, { data, fetchedAt: Date.now() });
  return data;
}

/**
 * Get Gemini CLI subscription info using correct headers.
 */
async function getGeminiCliSubscriptionInfo(accessToken: string): Promise<unknown | null> {
  try {
    const response = await fetch(GEMINI_CLI_USAGE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        metadata: {
          ideType: "IDE_UNSPECIFIED",
          platform: "PLATFORM_UNSPECIFIED",
          pluginType: "GEMINI",
        },
      }),
    });

    if (!response.ok) return null;

    return await response.json();
  } catch {
    return null;
  }
}

/**
 * Map Gemini CLI subscription tier to display label (same tiers as Antigravity).
 */
export function getGeminiCliPlanLabel(subscriptionInfo: unknown): string {
  return mapCodeAssistSubscriptionToPlanLabel(subscriptionInfo);
}
