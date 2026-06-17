/**
 * Usage Fetcher - Get usage data from provider APIs
 */

import { PROVIDERS } from "../../config/constants.ts";

import { sanitizeErrorMessage } from "../../utils/error.ts";

import { JsonRecord, UsageQuota } from "./types.ts";
import { parseResetTime, toRecord, toNumber } from "./utils.ts";
import { CODEWHISPERER_BASE_URL } from "./constants.ts";

/**
 * Build the Kiro usage result from a GetUsageLimits response. When the account returns no
 * usage breakdown (some AWS IAM / Builder ID accounts don't expose per-resource quota via
 * GetUsageLimits), return an informative message instead of empty `quotas:{}` — otherwise the
 * dashboard renders a blank quota card with no explanation (#3506). Exported for testing.
 */
export function buildKiroUsageResult(
  data: JsonRecord
): { plan: string; quotas: Record<string, UsageQuota> } | { message: string } {
  const usageList = Array.isArray(data.usageBreakdownList) ? data.usageBreakdownList : [];
  const quotaInfo: Record<string, UsageQuota> = {};
  const resetAt = parseResetTime(data.nextDateReset || data.resetDate);

  usageList.forEach((breakdownValue: unknown) => {
    const breakdown = toRecord(breakdownValue);
    const resourceType =
      typeof breakdown.resourceType === "string" ? breakdown.resourceType.toLowerCase() : "unknown";
    const used = toNumber(breakdown.currentUsageWithPrecision, 0);
    const total = toNumber(breakdown.usageLimitWithPrecision, 0);

    quotaInfo[resourceType] = { used, total, remaining: total - used, resetAt, unlimited: false };

    const freeTrialInfo = toRecord(breakdown.freeTrialInfo);
    if (Object.keys(freeTrialInfo).length > 0) {
      const freeUsed = toNumber(freeTrialInfo.currentUsageWithPrecision, 0);
      const freeTotal = toNumber(freeTrialInfo.usageLimitWithPrecision, 0);
      quotaInfo[`${resourceType}_freetrial`] = {
        used: freeUsed,
        total: freeTotal,
        remaining: freeTotal - freeUsed,
        resetAt,
        unlimited: false,
      };
    }
  });

  if (Object.keys(quotaInfo).length === 0) {
    return {
      message:
        "Kiro connected, but the account returned no usage breakdown. Some AWS IAM / Builder ID accounts don't expose per-resource quota via GetUsageLimits.",
    };
  }

  return {
    plan: String(toRecord(data.subscriptionInfo).subscriptionTitle || "").trim() || "Kiro",
    quotas: quotaInfo,
  };
}

/**
 * Discover the Kiro profile ARN when not persisted (via ListAvailableProfiles). Accounts from
 * AWS IAM Identity Center logins and kiro-cli imports frequently don't persist a profileArn, which
 * previously caused the quota card to show nothing ("0 used"). Discover it on demand from
 * ListAvailableProfiles (region-matched) so usage still resolves for those accounts.
 * Exported for testing.
 */
export async function discoverKiroProfileArn(
  accessToken: string,
  usageBaseUrl: string,
  region: string
): Promise<string | undefined> {
  try {
    const response = await fetch(usageBaseUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/x-amz-json-1.0",
        "x-amz-target": "AmazonCodeWhispererService.ListAvailableProfiles",
        Accept: "application/json",
      },
      body: JSON.stringify({ maxResults: 10 }),
      // Don't let a hung profile lookup block the usage/quota refresh indefinitely.
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) return undefined;

    const data = toRecord(await response.json());
    const profiles = Array.isArray(data.profiles) ? data.profiles : [];
    const normalizedRegion = region.toLowerCase();
    const matched =
      profiles.find((profile: unknown) => {
        const arn = toRecord(profile).arn;
        return typeof arn === "string" && arn.toLowerCase().includes(`:${normalizedRegion}:`);
      }) || profiles[0];
    const arn = toRecord(matched).arn;
    return typeof arn === "string" && arn.length > 0 ? arn : undefined;
  } catch {
    return undefined;
  }
}

/**
 * Kiro (AWS CodeWhisperer) Usage
 */
export async function getKiroUsage(accessToken?: string, providerSpecificData?: JsonRecord) {
  try {
    let profileArn = providerSpecificData?.profileArn;
    const region = providerSpecificData?.region || "us-east-1";
    const usageBaseUrl = CODEWHISPERER_BASE_URL;

    // IAM Identity Center logins and kiro-cli imports frequently don't persist a profileArn, which
    // previously caused the quota card to show nothing ("0 used"). Discover it on demand from
    // ListAvailableProfiles (region-matched) so usage still resolves for those accounts.
    if (!profileArn && accessToken) {
      profileArn = await discoverKiroProfileArn(accessToken, usageBaseUrl, String(region));
    }

    if (!profileArn) {
      return { message: "Kiro connected. Profile ARN not available for quota tracking." };
    }

    // Kiro uses AWS CodeWhisperer GetUsageLimits API
    const payload = {
      origin: "AI_EDITOR",
      profileArn: profileArn,
      resourceType: "AGENTIC_REQUEST",
    };

    const response = await fetch(CODEWHISPERER_BASE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/x-amz-json-1.0",
        "x-amz-target": "AmazonCodeWhispererService.GetUsageLimits",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Kiro API error (${response.status}): ${errorText}`);
    }

    const data = toRecord(await response.json());
    return buildKiroUsageResult(data);
  } catch (error) {
    throw new Error(`Failed to fetch Kiro usage: ${error.message}`);
  }
}
