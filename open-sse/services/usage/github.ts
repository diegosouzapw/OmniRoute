/**
 * Usage Fetcher - Get usage data from provider APIs
 */

import { PROVIDERS } from "../../config/constants.ts";

import {
  getAntigravityFetchAvailableModelsUrls,
  ANTIGRAVITY_BASE_URLS,
} from "../../config/antigravityUpstream.ts";

import {
  isUserCallableAntigravityModelId,
  toClientAntigravityModelId,
} from "../../config/antigravityModelAliases.ts";

import { isUserCallableAgyModelId } from "../../config/agyModels.ts";

import { getGlmQuotaUrl } from "../../config/glmProvider.ts";

import { getGitHubCopilotInternalUserHeaders } from "../../config/providerHeaderProfiles.ts";

import { fetchBailianQuota, type BailianTripleWindowQuota } from "../bailianQuotaFetcher.ts";

import { fetchDeepseekQuota, type DeepseekQuota } from "../deepseekQuotaFetcher.ts";

import { fetchOpencodeQuota, type OpencodeTripleWindowQuota } from "../opencodeQuotaFetcher.ts";

import {
  applyAntigravityClientProfileHeaders,
  getAntigravityBootstrapHeaders,
  getAntigravityClientProfile,
} from "../antigravityClientProfile.ts";

import {
  antigravityUserAgent,
  getAntigravityHeaders,
  getAntigravityLoadCodeAssistMetadata,
} from "../antigravityHeaders.ts";

import {
  getAntigravityRemainingCredits,
  updateAntigravityRemainingCredits,
} from "../../executors/antigravity.ts";

import { getCreditsMode } from "../antigravityCredits.ts";

import { CLAUDE_CODE_VERSION, fetchClaudeBootstrap } from "../../executors/claudeIdentity.ts";

import { generateAntigravityRequestId, getAntigravitySessionId } from "../antigravityIdentity.ts";

import {
  extractCodeAssistOnboardTierId,
  extractCodeAssistSubscriptionTier,
} from "../codeAssistSubscription.ts";

import { sanitizeErrorMessage } from "../../utils/error.ts";

import { JsonRecord, UsageQuota } from "./types.ts";
import {
  toRecord,
  parseResetTime,
  getFieldValue,
  shouldDisplayGitHubQuota,
  toNumber,
  clampPercentage,
  toDisplayLabel,
} from "./utils.ts";

/**
 * GitHub Copilot Usage
 * Uses GitHub accessToken (not copilotToken) to call copilot_internal/user API
 */
export async function getGitHubUsage(accessToken?: string, providerSpecificData?: JsonRecord) {
  try {
    if (!accessToken) {
      throw new Error("No GitHub access token available. Please re-authorize the connection.");
    }

    // copilot_internal/user API requires GitHub OAuth token, not copilotToken
    const response = await fetch("https://api.github.com/copilot_internal/user", {
      headers: getGitHubCopilotInternalUserHeaders(`token ${accessToken}`),
    });

    if (!response.ok) {
      const error = await response.text();
      if (response.status === 401 || response.status === 403) {
        return {
          message: `GitHub token expired or permission denied. Please re-authenticate the connection.`,
        };
      }
      throw new Error(`GitHub API error: ${error}`);
    }

    const data = await response.json();
    const dataRecord = toRecord(data);

    // Handle different response formats (paid vs free)
    if (dataRecord.quota_snapshots) {
      // Paid plan format
      const snapshots = toRecord(dataRecord.quota_snapshots);
      const resetAt = parseResetTime(
        getFieldValue(dataRecord, "quota_reset_date", "quotaResetDate")
      );
      const premiumQuota = formatGitHubQuotaSnapshot(snapshots.premium_interactions, resetAt);
      const chatQuota = formatGitHubQuotaSnapshot(snapshots.chat, resetAt);
      const completionsQuota = formatGitHubQuotaSnapshot(snapshots.completions, resetAt);
      const quotas: Record<string, UsageQuota> = {};

      if (shouldDisplayGitHubQuota(premiumQuota)) {
        quotas.premium_interactions = premiumQuota;
      }
      if (shouldDisplayGitHubQuota(chatQuota)) {
        quotas.chat = chatQuota;
      }
      if (shouldDisplayGitHubQuota(completionsQuota)) {
        quotas.completions = completionsQuota;
      }

      return {
        plan: inferGitHubPlanName(dataRecord, premiumQuota),
        resetDate: getFieldValue(dataRecord, "quota_reset_date", "quotaResetDate"),
        quotas,
      };
    } else if (dataRecord.monthly_quotas || dataRecord.limited_user_quotas) {
      // Free/limited plan format. NOTE (#2876): the upstream field
      // `limited_user_quotas[name]` is the *remaining* count for the month
      // (it counts down toward 0 and resets on `limited_user_reset_date`),
      // NOT the used count. The pre-3.8.6 implementation inverted this and
      // showed "0% when not used / 100% when fully used" on the dashboard.
      // Confirmed against three independent upstream parsers:
      //   - robinebers/openusage  docs/providers/copilot.md (Free Tier table)
      //   - raycast/extensions    agent-usage/src/copilot/fetcher.ts (inline comment)
      //   - looplj/axonhub        frontend/src/components/quota-badges.tsx
      const monthlyQuotas = toRecord(dataRecord.monthly_quotas);
      const remainingQuotas = toRecord(dataRecord.limited_user_quotas);
      const resetDate = getFieldValue(
        dataRecord,
        "limited_user_reset_date",
        "limitedUserResetDate"
      );
      const resetAt = parseResetTime(resetDate);
      const quotas: Record<string, UsageQuota> = {};

      const addLimitedQuota = (name: string) => {
        const total = toNumber(getFieldValue(monthlyQuotas, name, name), 0);
        if (total <= 0) return null;
        const remainingRaw = Math.max(0, toNumber(getFieldValue(remainingQuotas, name, name), 0));
        const remaining = Math.min(remainingRaw, total);
        const used = Math.max(total - remaining, 0);
        quotas[name] = {
          used,
          total,
          remaining,
          remainingPercentage: clampPercentage((remaining / total) * 100),
          unlimited: false,
          resetAt,
        };
        return quotas[name];
      };

      const premiumQuota = addLimitedQuota("premium_interactions");
      addLimitedQuota("chat");
      addLimitedQuota("completions");

      return {
        plan: inferGitHubPlanName(dataRecord, premiumQuota),
        resetDate,
        quotas,
      };
    }

    return { message: "GitHub Copilot connected. Unable to parse quota data." };
  } catch (error) {
    throw new Error(`Failed to fetch GitHub usage: ${error.message}`);
  }
}

export function formatGitHubQuotaSnapshot(
  quota: unknown,
  resetAt: string | null = null
): UsageQuota | null {
  const source = toRecord(quota);
  if (Object.keys(source).length === 0) return null;

  const unlimited = source.unlimited === true;
  const entitlement = toNumber(source.entitlement, Number.NaN);
  const totalValue = toNumber(source.total, Number.NaN);
  const remainingValue = toNumber(source.remaining, Number.NaN);
  const usedValue = toNumber(source.used, Number.NaN);
  const percentRemainingValue = toNumber(
    getFieldValue(source, "percent_remaining", "percentRemaining"),
    Number.NaN
  );

  let total = Number.isFinite(totalValue)
    ? Math.max(0, totalValue)
    : Number.isFinite(entitlement)
      ? Math.max(0, entitlement)
      : 0;
  let remaining = Number.isFinite(remainingValue) ? Math.max(0, remainingValue) : undefined;
  let used = Number.isFinite(usedValue) ? Math.max(0, usedValue) : undefined;
  let remainingPercentage = Number.isFinite(percentRemainingValue)
    ? clampPercentage(percentRemainingValue)
    : undefined;

  if (used === undefined && total > 0 && remaining !== undefined) {
    used = Math.max(total - remaining, 0);
  }

  if (remaining === undefined && total > 0 && used !== undefined) {
    remaining = Math.max(total - used, 0);
  }

  if (remainingPercentage === undefined && total > 0 && remaining !== undefined) {
    remainingPercentage = clampPercentage((remaining / total) * 100);
  }

  if (total <= 0 && remainingPercentage !== undefined) {
    total = 100;
    used = 100 - remainingPercentage;
    remaining = remainingPercentage;
  }

  return {
    used: Math.max(0, used ?? 0),
    total,
    remaining,
    remainingPercentage,
    resetAt,
    unlimited,
  };
}

export function inferGitHubPlanName(data: JsonRecord, premiumQuota: UsageQuota | null): string {
  const rawPlan = getFieldValue(data, "copilot_plan", "copilotPlan");
  const rawSku = getFieldValue(data, "access_type_sku", "accessTypeSku");
  const planText = typeof rawPlan === "string" ? rawPlan.trim() : "";
  const skuText = typeof rawSku === "string" ? rawSku.trim() : "";
  const combined = `${skuText} ${planText}`.trim().toUpperCase();
  const monthlyQuotas = toRecord(getFieldValue(data, "monthly_quotas", "monthlyQuotas"));
  const premiumTotal =
    premiumQuota?.total ||
    toNumber(getFieldValue(monthlyQuotas, "premium_interactions", "premiumInteractions"), 0);
  const chatTotal = toNumber(getFieldValue(monthlyQuotas, "chat", "chat"), 0);

  if (combined.includes("PRO+") || combined.includes("PRO_PLUS") || combined.includes("PROPLUS")) {
    return "Copilot Pro+";
  }
  if (combined.includes("ENTERPRISE")) return "Copilot Enterprise";
  if (combined.includes("BUSINESS")) return "Copilot Business";
  if (combined.includes("STUDENT")) return "Copilot Student";
  if (combined.includes("FREE")) return "Copilot Free";
  if (combined.includes("PRO")) return "Copilot Pro";

  if (premiumTotal >= 1400) return "Copilot Pro+";
  if (premiumTotal >= 900) return "Copilot Enterprise";
  if (premiumTotal >= 250) {
    if (combined.includes("INDIVIDUAL")) return "Copilot Pro";
    return "Copilot Business";
  }
  if (premiumTotal > 0 || chatTotal === 50) return "Copilot Free";

  if (skuText) {
    const label = toDisplayLabel(skuText);
    return label ? `Copilot ${label}` : "GitHub Copilot";
  }
  if (planText) {
    const label = toDisplayLabel(planText);
    return label ? `Copilot ${label}` : "GitHub Copilot";
  }
  return "GitHub Copilot";
}
