/**
 * usage/kiro.ts — Kiro / Amazon Q (AWS CodeWhisperer) usage fetcher + quota helpers.
 *
 * Extracted from services/usage.ts (god-file decomposition): the Kiro family — overage
 * detection, per-resource quota assembly (buildKiroQuota / buildKiroUsageResult), region-aware
 * profile-ARN discovery, the social-auth account marker, and the getKiroUsage fetcher that
 * calls GetUsageLimits on the region-matched CodeWhisperer endpoint. Depends only on the
 * sibling scalar/quota leaves — no host coupling — so it lives as a co-located provider leaf.
 * usage.ts imports getKiroUsage (dispatcher) + re-exports buildKiroUsageResult /
 * discoverKiroProfileArn (external kiro tests import them from services/usage) and pulls
 * getKiroUsage into __testing. Behavior-preserving move.
 */

import { toRecord, toNumber } from "./scalars.ts";
import { type UsageQuota, parseResetTime } from "./quota.ts";

type JsonRecord = Record<string, unknown>;

const CODEWHISPERER_BASE_URL =
  process.env.OMNIROUTE_CODEWHISPERER_BASE_URL ?? "https://codewhisperer.us-east-1.amazonaws.com";

function isKiroOverageEnabled(data: JsonRecord): boolean {
  const overageConfiguration = toRecord(data.overageConfiguration);
  const overageStatus = String(overageConfiguration.overageStatus || "")
    .trim()
    .toUpperCase();

  return (
    overageStatus === "ENABLED" ||
    data.overageEnabled === true ||
    overageConfiguration.overageEnabled === true
  );
}

function buildKiroQuota(
  used: number,
  total: number,
  resetAt: string | null,
  overageEnabled: boolean
): UsageQuota {
  const remaining = total - used;

  if (!overageEnabled) {
    return { used, total, remaining, resetAt, unlimited: false };
  }

  return {
    used,
    total,
    remaining,
    remainingPercentage: 100,
    resetAt,
    unlimited: true,
  };
}

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
  const overageEnabled = isKiroOverageEnabled(data);

  usageList.forEach((breakdownValue: unknown) => {
    const breakdown = toRecord(breakdownValue);
    const resourceType =
      typeof breakdown.resourceType === "string" ? breakdown.resourceType.toLowerCase() : "unknown";
    const used = toNumber(breakdown.currentUsageWithPrecision, 0);
    const total = toNumber(breakdown.usageLimitWithPrecision, 0);

    quotaInfo[resourceType] = buildKiroQuota(used, total, resetAt, overageEnabled);

    const freeTrialInfo = toRecord(breakdown.freeTrialInfo);
    if (Object.keys(freeTrialInfo).length > 0) {
      const freeUsed = toNumber(freeTrialInfo.currentUsageWithPrecision, 0);
      const freeTotal = toNumber(freeTrialInfo.usageLimitWithPrecision, 0);
      quotaInfo[`${resourceType}_freetrial`] = buildKiroQuota(
        freeUsed,
        freeTotal,
        resetAt,
        overageEnabled
      );
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
 * Discover a Kiro/CodeWhisperer profile ARN for an account that didn't persist one (common for
 * AWS IAM Identity Center logins and kiro-cli imports). Calls ListAvailableProfiles on the
 * region-matched endpoint and prefers a profile whose ARN is in the same region. Returns
 * undefined when no profile is available (e.g. the org/token has no Kiro entitlement).
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
    let profileArn =
      typeof providerSpecificData?.profileArn === "string"
        ? providerSpecificData.profileArn
        : undefined;

    // Enterprise IAM Identity Center accounts are region-bound: the profileArn, token and
    // endpoint must all match the region. Derive the region from the stored region (preferred)
    // or the profileArn, then route to the regional Amazon Q endpoint (us-east-1 keeps the
    // legacy codewhisperer host; codewhisperer.{region} does not resolve for other regions).
    const regionFromArn = profileArn
      ? profileArn.toLowerCase().match(/^arn:aws:codewhisperer:([a-z0-9-]+):/)?.[1]
      : undefined;
    const region =
      (typeof providerSpecificData?.region === "string" &&
        providerSpecificData.region.trim().toLowerCase()) ||
      regionFromArn ||
      "us-east-1";
    const usageBaseUrl =
      region === "us-east-1" ? CODEWHISPERER_BASE_URL : `https://q.${region}.amazonaws.com`;

    // IAM Identity Center logins and kiro-cli imports frequently don't persist a profileArn, which
    // previously caused the quota card to show nothing ("0 used"). Discover it on demand from
    // ListAvailableProfiles (region-matched) so usage still resolves for those accounts.
    if (!profileArn && accessToken) {
      profileArn = await discoverKiroProfileArn(accessToken, usageBaseUrl, region);
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

    const response = await fetch(usageBaseUrl, {
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
      // Social-auth Kiro accounts (added via /api/oauth/kiro/social-exchange with provider
      // Google or GitHub) use a different token format that AWS CodeWhisperer's GetUsageLimits
      // routinely rejects with 401/403, even when /messages still works. Surface a clear
      // "auth expired, chat may still work" message instead of a generic upstream-error blob
      // so the quota card matches what users with legacy social-auth accounts already see.
      // Inspired by https://github.com/decolua/9router/pull/620.
      if (
        (response.status === 401 || response.status === 403) &&
        isSocialAuthKiroAccount(providerSpecificData)
      ) {
        return {
          message: "Kiro quota API authentication expired. Chat may still work.",
          quotas: {},
        };
      }
      const errorText = await response.text();
      throw new Error(`Kiro API error (${response.status}): ${errorText}`);
    }

    const data = toRecord(await response.json());
    return buildKiroUsageResult(data);
  } catch (error) {
    throw new Error(`Failed to fetch Kiro usage: ${error.message}`);
  }
}

/**
 * Was this Kiro connection added via the Google/GitHub social-auth device flow
 * (POST /api/oauth/kiro/social-exchange)? That route persists
 * `{ authMethod: "imported", provider: "Google" | "Github" }` on the connection.
 * Builder-ID / IDC / kiro-cli imports use different markers and should keep the
 * existing throw-on-failure behavior.
 */
function isSocialAuthKiroAccount(providerSpecificData?: JsonRecord): boolean {
  if (!providerSpecificData || providerSpecificData.authMethod !== "imported") return false;
  const provider =
    typeof providerSpecificData.provider === "string"
      ? providerSpecificData.provider.toLowerCase()
      : "";
  return provider === "google" || provider === "github";
}
