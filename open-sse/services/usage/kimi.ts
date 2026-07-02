/**
 * usage/kimi.ts — Kimi Coding (kimi-coding / kimi-coding-apikey) usage fetcher + helpers.
 *
 * Extracted from services/usage.ts (god-file decomposition): the Kimi family — the coding
 * API config, membership-level → display-name mapping, and the getKimiUsage fetcher that
 * probes the official /v1/usages endpoint. Depends only on the sibling scalar/quota leaves
 * plus safePercentage — no host coupling — so it lives as a co-located provider leaf.
 * usage.ts imports getKimiUsage (dispatcher). Behavior-preserving move.
 */

import { safePercentage } from "@/shared/utils/formatting";
import { toRecord, toNumber } from "./scalars.ts";
import { type UsageQuota, parseResetTime } from "./quota.ts";

type JsonRecord = Record<string, unknown>;

// Kimi Coding API config
const KIMI_CONFIG = {
  baseUrl: "https://api.kimi.com/coding/v1",
  usageUrl: "https://api.kimi.com/coding/v1/usages",
  apiVersion: "2023-06-01",
};

/**
 * Map Kimi membership level to display name
 * LEVEL_BASIC = Moderato, LEVEL_INTERMEDIATE = Allegretto,
 * LEVEL_ADVANCED = Allegro, LEVEL_STANDARD = Vivace
 */
function getKimiPlanName(level: unknown): string {
  if (!level) return "";
  const normalizedLevel = String(level);

  const levelMap = {
    LEVEL_BASIC: "Moderato",
    LEVEL_INTERMEDIATE: "Allegretto",
    LEVEL_ADVANCED: "Allegro",
    LEVEL_STANDARD: "Vivace",
  };

  return (
    levelMap[normalizedLevel as keyof typeof levelMap] ||
    normalizedLevel.replace("LEVEL_", "").toLowerCase()
  );
}

/**
 * Kimi Coding Usage - Fetch quota from Kimi API
 * Uses the official /v1/usages endpoint with custom X-Msh-* headers
 */
export async function getKimiUsage(accessToken?: string, apiKey?: string) {
  // Generate device info for headers (same as OAuth flow)
  const deviceId = "kimi-usage-" + Date.now();
  const platform = "omniroute";
  const version = "2.1.2";
  const deviceModel =
    typeof process !== "undefined" ? `${process.platform} ${process.arch}` : "unknown";

  // API key auth takes precedence — Kimi's /usages endpoint accepts the same
  // API key used for /messages (verified live: responds with
  // authentication.method = METHOD_API_KEY). OAuth flow falls through to the
  // Bearer + device-headers shape used by Kimi Coding OAuth.
  const useApiKey = typeof apiKey === "string" && apiKey.length > 0;

  const authHeaders: Record<string, string> = useApiKey
    ? { "x-api-key": apiKey as string }
    : {
        Authorization: `Bearer ${accessToken}`,
        "X-Msh-Platform": platform,
        "X-Msh-Version": version,
        "X-Msh-Device-Model": deviceModel,
        "X-Msh-Device-Id": deviceId,
      };

  try {
    const response = await fetch(KIMI_CONFIG.usageUrl, {
      method: "GET",
      headers: {
        ...authHeaders,
        "Content-Type": "application/json",
      },
    });

    const responseText = await response.text();

    if (!response.ok) {
      return {
        plan: "Kimi Coding",
        message: `Kimi Coding connected. API Error ${response.status}: ${responseText.slice(0, 100)}`,
      };
    }

    let data;
    try {
      data = JSON.parse(responseText);
    } catch {
      return {
        plan: "Kimi Coding",
        message: "Kimi Coding connected. Invalid JSON response from API.",
      };
    }

    const quotas: Record<string, UsageQuota> = {};
    const dataObj = toRecord(data);

    // Parse Kimi usage response format
    // Format: { user: {...}, usage: { limit: "100", used: "92", remaining: "8", resetTime: "..." }, limits: [...] }
    const usageObj = toRecord(dataObj.usage);

    // Check for Kimi's actual usage fields (strings, not numbers)
    const usageLimit = toNumber(usageObj.limit || usageObj.Limit, 0);
    const usageUsed = toNumber(usageObj.used || usageObj.Used, 0);
    const usageRemaining = toNumber(usageObj.remaining || usageObj.Remaining, 0);
    const usageResetTime =
      usageObj.resetTime || usageObj.ResetTime || usageObj.reset_at || usageObj.resetAt;

    if (usageLimit > 0) {
      const percentRemaining = usageLimit > 0 ? (usageRemaining / usageLimit) * 100 : 0;

      quotas["Weekly"] = {
        used: usageUsed,
        total: usageLimit,
        remaining: usageRemaining,
        remainingPercentage: percentRemaining,
        resetAt: parseResetTime(usageResetTime),
        unlimited: false,
      };
    }

    // Also parse limits array for rate limits
    const limitsArray = Array.isArray(dataObj.limits) ? dataObj.limits : [];
    for (let i = 0; i < limitsArray.length; i++) {
      const limitItem = toRecord(limitsArray[i]);
      const window = toRecord(limitItem.window);
      const detail = toRecord(limitItem.detail);

      const limit = toNumber(detail.limit || detail.Limit, 0);
      const remaining = toNumber(detail.remaining || detail.Remaining, 0);
      const resetTime = detail.resetTime || detail.reset_at || detail.resetAt;

      if (limit > 0) {
        quotas["Ratelimit"] = {
          used: limit - remaining,
          total: limit,
          remaining,
          remainingPercentage: limit > 0 ? (remaining / limit) * 100 : 0,
          resetAt: parseResetTime(resetTime),
          unlimited: false,
        };
      }
    }

    // Check for quota windows (Claude-like format with utilization) as fallback
    const hasUtilization = (window: JsonRecord) =>
      window && typeof window === "object" && safePercentage(window.utilization) !== undefined;

    const createQuotaObject = (window: JsonRecord) => {
      const remaining = safePercentage(window.utilization) as number;
      const used = 100 - remaining;
      return {
        used,
        total: 100,
        remaining,
        resetAt: parseResetTime(window.resets_at),
        remainingPercentage: remaining,
        unlimited: false,
      };
    };

    if (hasUtilization(toRecord(dataObj.five_hour))) {
      quotas["session (5h)"] = createQuotaObject(toRecord(dataObj.five_hour));
    }

    if (hasUtilization(toRecord(dataObj.seven_day))) {
      quotas["weekly (7d)"] = createQuotaObject(toRecord(dataObj.seven_day));
    }

    // Check for model-specific quotas
    for (const [key, value] of Object.entries(dataObj)) {
      const valueRecord = toRecord(value);
      if (key.startsWith("seven_day_") && key !== "seven_day" && hasUtilization(valueRecord)) {
        const modelName = key.replace("seven_day_", "");
        quotas[`weekly ${modelName} (7d)`] = createQuotaObject(valueRecord);
      }
    }

    if (Object.keys(quotas).length > 0) {
      const userRecord = toRecord(dataObj.user);
      const membershipLevel = toRecord(userRecord.membership).level;
      const planName = getKimiPlanName(membershipLevel);
      return {
        plan: planName || "Kimi Coding",
        quotas,
      };
    }

    // No quota data in response
    const userRecord = toRecord(dataObj.user);
    const membershipLevel = toRecord(userRecord.membership).level;
    const planName = getKimiPlanName(membershipLevel);
    return {
      plan: planName || "Kimi Coding",
      message: "Kimi Coding connected. Usage tracked per request.",
    };
  } catch (error) {
    return {
      message: `Kimi Coding connected. Unable to fetch usage: ${(error as Error).message}`,
    };
  }
}
