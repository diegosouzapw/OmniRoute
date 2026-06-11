/**
 * Usage Fetcher - Get usage data from provider APIs
 */

import { PROVIDERS } from "../../config/constants.ts";

import { sanitizeErrorMessage } from "../../utils/error.ts";

import { CODEX_CONFIG } from "./constants.ts";
import { toRecord, getFieldValue, toNumber, parseResetTime } from "./utils.ts";
import { UsageQuota } from "./types.ts";



/**
 * Codex (OpenAI) Usage - Fetch from ChatGPT backend API
 * IMPORTANT: Uses persisted workspaceId from OAuth to ensure correct workspace binding.
 * No fallback to other workspaces - strict binding to user's selected workspace.
 */
export async function getCodexUsage(
  accessToken?: string,
  providerSpecificData: Record<string, unknown> = {}
) {
  try {
    // Use persisted workspace ID from OAuth - NO FALLBACK
    const accountId =
      typeof providerSpecificData.workspaceId === "string"
        ? providerSpecificData.workspaceId
        : null;

    const headers: Record<string, string> = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    if (accountId) {
      headers["chatgpt-account-id"] = accountId;
    }

    const response = await fetch(CODEX_CONFIG.usageUrl, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        return {
          message: `Codex token expired or access denied. Please re-authenticate the connection.`,
        };
      }
      throw new Error(`Codex API error: ${response.status}`);
    }

    const data = await response.json();

    // Parse rate limit info (supports both snake_case and camelCase)
    const rateLimit = toRecord(getFieldValue(data, "rate_limit", "rateLimit"));
    const primaryWindow = toRecord(getFieldValue(rateLimit, "primary_window", "primaryWindow"));
    const secondaryWindow = toRecord(
      getFieldValue(rateLimit, "secondary_window", "secondaryWindow")
    );

    // Parse reset times (reset_at is Unix timestamp in seconds)
    const parseWindowReset = (window: unknown) => {
      const resetAt = toNumber(getFieldValue(window, "reset_at", "resetAt"), 0);
      const resetAfterSeconds = toNumber(
        getFieldValue(window, "reset_after_seconds", "resetAfterSeconds"),
        0
      );
      if (resetAt > 0) return parseResetTime(resetAt * 1000);
      if (resetAfterSeconds > 0) return parseResetTime(Date.now() + resetAfterSeconds * 1000);
      return null;
    };

    // Build quota windows
    const quotas: Record<string, UsageQuota> = {};

    // Primary window (5-hour)
    if (Object.keys(primaryWindow).length > 0) {
      const usedPercent = toNumber(getFieldValue(primaryWindow, "used_percent", "usedPercent"), 0);
      quotas.session = {
        used: usedPercent,
        total: 100,
        remaining: 100 - usedPercent,
        resetAt: parseWindowReset(primaryWindow),
        unlimited: false,
      };
    }

    // Secondary window (weekly)
    if (Object.keys(secondaryWindow).length > 0) {
      const usedPercent = toNumber(
        getFieldValue(secondaryWindow, "used_percent", "usedPercent"),
        0
      );
      quotas.weekly = {
        used: usedPercent,
        total: 100,
        remaining: 100 - usedPercent,
        resetAt: parseWindowReset(secondaryWindow),
        unlimited: false,
      };
    }

    // Code review rate limit (3rd window — differs per plan: Plus/Pro/Team)
    const codeReviewRateLimit = toRecord(
      getFieldValue(data, "code_review_rate_limit", "codeReviewRateLimit")
    );
    const codeReviewWindow = toRecord(
      getFieldValue(codeReviewRateLimit, "primary_window", "primaryWindow")
    );

    // Only include code review quota if the API returned data for it
    const codeReviewUsedRaw = getFieldValue(codeReviewWindow, "used_percent", "usedPercent");
    const codeReviewRemainingRaw = getFieldValue(
      codeReviewWindow,
      "remaining_count",
      "remainingCount"
    );
    if (codeReviewUsedRaw !== null || codeReviewRemainingRaw !== null) {
      const codeReviewUsedPercent = toNumber(codeReviewUsedRaw, 0);
      quotas.code_review = {
        used: codeReviewUsedPercent,
        total: 100,
        remaining: 100 - codeReviewUsedPercent,
        resetAt: parseWindowReset(codeReviewWindow),
        unlimited: false,
      };
    }

    return {
      plan: String(getFieldValue(data, "plan_type", "planType") || "unknown"),
      limitReached: Boolean(getFieldValue(rateLimit, "limit_reached", "limitReached")),
      quotas,
    };
  } catch (error) {
    return { message: `Failed to fetch Codex usage: ${(error as Error).message}` };
  }
}

