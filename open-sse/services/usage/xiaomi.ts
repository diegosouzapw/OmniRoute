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

import { getDbInstance } from "@/lib/db/core";

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

import { createQuotaFromUsage } from "./utils.ts";

// Xiaomi MiMo Token Plan monthly limit (tokens). Keep in sync with the
// "xiaomi-mimo" preset in src/lib/quota/planRegistry.ts.
const XIAOMI_MIMO_MONTHLY_TOKEN_LIMIT = 4_100_000_000;

/**
 * Xiaomi MiMo — SELF-TRACKED monthly quota.
 *
 * Xiaomi exposes plan usage only behind the console session cookie (the API key
 * cannot reach the `tokenPlan/usage` endpoint), so there is no upstream usage
 * API to call. Instead we count the tokens OmniRoute itself routed to this
 * connection in the current UTC month (from `usage_history`) and compare them
 * to the known Token Plan monthly limit. This reflects only traffic that went
 * through OmniRoute, not the provider's own dashboard figure.
 */
export async function getXiaomiMimoUsage(connectionId: string) {
  if (!connectionId) {
    return { message: "Xiaomi MiMo: connection id unavailable for self-tracked quota." };
  }
  try {
    const { getMonthlyProviderTokensForConnection } = await import("@/lib/usage/usageStats");
    const used = getMonthlyProviderTokensForConnection("xiaomi-mimo", connectionId);
    const total = XIAOMI_MIMO_MONTHLY_TOKEN_LIMIT;
    const now = new Date();
    const resetAt = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1)
    ).toISOString();
    return {
      plan: "Xiaomi MiMo Token Plan (OmniRoute-tracked)",
      quotas: {
        monthly: createQuotaFromUsage(used, total, resetAt),
      },
    };
  } catch (error) {
    return { message: `Xiaomi MiMo self-tracked usage error: ${(error as Error).message}` };
  }
}
