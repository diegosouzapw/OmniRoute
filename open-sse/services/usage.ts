/**
 * Usage Fetcher - Get usage data from provider APIs
 */

import { getGitHubCopilotInternalUserHeaders } from "../config/providerHeaderProfiles.ts";
import { getDbInstance } from "@/lib/db/core";
import { fetchBailianQuota, type BailianTripleWindowQuota } from "./bailianQuotaFetcher.ts";
import { fetchDeepseekQuota, type DeepseekQuota } from "./deepseekQuotaFetcher.ts";
import { fetchOpencodeQuota, type OpencodeTripleWindowQuota } from "./opencodeQuotaFetcher.ts";
import { getOllamaCloudUsage, getOpenCodeGoUsage } from "./opencodeOllamaUsage.ts";
import { getCodeBuddyCnUsage } from "./usage/codebuddy-cn.ts";
import {
  extractCodeAssistOnboardTierId,
  extractCodeAssistSubscriptionTier,
} from "./codeAssistSubscription.ts";
import { sanitizeErrorMessage } from "../utils/error.ts";
import {
  toRecord,
  toNumber,
  toPercentage,
  toTitleCase,
  getFieldValue,
  clampPercentage,
  roundCurrency,
  toDisplayLabel,
  pickFirstNonEmptyString,
} from "./usage/scalars.ts";
import { type UsageQuota, parseResetTime, createQuotaFromUsage } from "./usage/quota.ts";
import {
  getMiniMaxUsage,
  getMiniMaxPlanLabel,
  getMiniMaxSessionTotal,
  inferMiniMaxPlanLabelFromTotals,
  getMiniMaxQuotaResetAt,
  isMiniMaxTextQuotaModel,
  getMiniMaxWeeklyTotal,
  createMiniMaxQuotaFromCount,
  createMiniMaxQuotaFromPercent,
  getMiniMaxRemainingPercent,
  getMiniMaxAuthErrorMessage,
  getMiniMaxErrorSummary,
} from "./usage/minimax.ts";
import { getGlmUsage } from "./usage/glm.ts";
// Re-exported para o teste glm-coding-plan-monthly (importa de services/usage).
export { glmMonthlyRemainingPercentage } from "./usage/glm.ts";
import {
  getAntigravityUsage,
  getAntigravityPlanLabel,
  mapCodeAssistSubscriptionToPlanLabel,
  mapCodeAssistTierIdToLabel,
  mapSubscriptionTierStringToPlanLabel,
} from "./usage/antigravity.ts";
import { getCursorUsage } from "./usage/cursor.ts";
import { getKimiUsage } from "./usage/kimi.ts";
import { getCodexUsage } from "./usage/codex.ts";
import { getClaudeUsage, getClaudePlanLabel } from "./usage/claude.ts";
import { getKiroUsage, buildKiroUsageResult, discoverKiroProfileArn } from "./usage/kiro.ts";
// Re-exported para os testes kiro-* (importam de services/usage).
export { buildKiroUsageResult, discoverKiroProfileArn } from "./usage/kiro.ts";

// Quota / usage upstream URLs (overridable for testing or relays).
const CROF_USAGE_URL = process.env.OMNIROUTE_CROF_USAGE_URL ?? "https://crof.ai/usage_api/";

const NANOGPT_CONFIG = {
  usageUrl: "https://nano-gpt.com/api/subscription/v1/usage",
};

type JsonRecord = Record<string, unknown>;
type UsageProviderConnection = JsonRecord & {
  id?: string;
  provider?: string;
  accessToken?: string;
  apiKey?: string;
  providerSpecificData?: JsonRecord;
  projectId?: string;
  email?: string;
};

function shouldDisplayGitHubQuota(quota: UsageQuota | null): quota is UsageQuota {
  if (!quota) return false;
  if (quota.unlimited && quota.total <= 0) return false;
  return quota.total > 0 || quota.remainingPercentage !== undefined;
}

// CrofAI surfaces a tiny endpoint with two signals:
//   GET https://crof.ai/usage_api/  →  { usable_requests: number|null, credits: number }
// `usable_requests` is the daily request bucket on a subscription plan; `null`
// for pay-as-you-go. `credits` is the USD credit balance. We surface both as
// quotas so the Limits & Quotas page can render whichever the account uses.
async function getCrofUsage(apiKey: string) {
  if (!apiKey) {
    return { message: "CrofAI API key not available. Add a key to view usage." };
  }

  let response: Response;
  try {
    response = await fetch(CROF_USAGE_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
      },
    });
  } catch (error) {
    return { message: `CrofAI connected. Unable to fetch usage: ${(error as Error).message}` };
  }

  const rawText = await response.text();

  if (response.status === 401 || response.status === 403) {
    return { message: "CrofAI connected. The API key was rejected by /usage_api/." };
  }

  if (!response.ok) {
    return { message: `CrofAI connected. /usage_api/ returned HTTP ${response.status}.` };
  }

  let payload: JsonRecord = {};
  if (rawText) {
    try {
      payload = toRecord(JSON.parse(rawText));
    } catch {
      return { message: "CrofAI connected. Unable to parse /usage_api/ response." };
    }
  }

  const usableRequestsRaw = payload["usable_requests"];
  const usableRequests =
    usableRequestsRaw === null || usableRequestsRaw === undefined
      ? null
      : toNumber(usableRequestsRaw, 0);
  const credits = toNumber(payload["credits"], 0);

  const quotas: Record<string, UsageQuota> = {};

  if (usableRequests !== null) {
    // CrofAI's /usage_api/ returns only the remaining count; the daily
    // allotment is not exposed. CrofAI Pro plan = 1,000 requests/day per
    // their pricing page, so use that as the baseline total. If the user
    // is on a plan with a higher cap we widen the total to whatever they
    // currently report so we never compute a negative `used`.
    // Without this, total=0 makes the dashboard's percentage formula read
    // 0% (interpreted as "depleted" → red) even on a fresh bucket.
    const CROF_DAILY_BASELINE = 1000;
    const remaining = Math.max(0, usableRequests);
    const total = Math.max(CROF_DAILY_BASELINE, remaining);
    const used = Math.max(0, total - remaining);

    // CrofAI also does not return a reset timestamp and the docs only say
    // "requests left today". The Crof.ai dashboard shows the daily bucket
    // resetting at ~05:00 UTC (verified against the live countdown on
    // 2026-04-25), so synthesize the next 05:00 UTC instant to match.
    // Swap for a real field if Crof ever exposes one.
    const now = new Date();
    const RESET_HOUR_UTC = 5;
    const todayResetMs = Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      RESET_HOUR_UTC
    );
    const nextResetMs =
      todayResetMs > now.getTime() ? todayResetMs : todayResetMs + 24 * 60 * 60 * 1000;
    const nextResetIso = new Date(nextResetMs).toISOString();

    quotas["Requests Today"] = {
      used,
      total,
      remaining,
      resetAt: nextResetIso,
      unlimited: false,
      displayName: `Requests Today: ${remaining} left`,
    };
  }

  // Credits are an open balance — render as unlimited so the UI shows the
  // dollar value rather than a misleading 0/0 bar.
  quotas["Credits"] = {
    used: 0,
    total: 0,
    remaining: 0,
    resetAt: null,
    unlimited: true,
    displayName: `Credits: $${credits.toFixed(4)}`,
  };

  return { quotas };
}

/**
 * Bailian (Alibaba Coding Plan) Usage
 * Fetches triple-window quota (5h, weekly, monthly) and returns worst-case.
 */
async function getBailianCodingPlanUsage(
  connectionId: string,
  apiKey: string,
  providerSpecificData?: Record<string, unknown>
) {
  try {
    const connection = { apiKey, providerSpecificData };
    const quota = await fetchBailianQuota(connectionId, connection);

    if (!quota) {
      return { message: "Bailian Coding Plan connected. Unable to fetch quota." };
    }

    const bailianQuota = quota as BailianTripleWindowQuota;
    const used = bailianQuota.used;
    const total = bailianQuota.total;
    const remaining = Math.max(0, total - used);
    const remainingPercentage = Math.round(remaining);

    return {
      plan: "Alibaba Coding Plan",
      used,
      total,
      remaining,
      remainingPercentage,
      resetAt: bailianQuota.resetAt,
      unlimited: false,
      displayName: "Alibaba Coding Plan",
    };
  } catch (error) {
    return { message: `Bailian Coding Plan error: ${(error as Error).message}` };
  }
}

/**
 * DeepSeek Usage
 * Fetches balance from the DeepSeek balance API.
 * Returns all balances (USD and CNY) as "credits" for credits-style UI display.
 */
async function getDeepseekUsage(connectionId: string, apiKey: string) {
  try {
    const connection = { apiKey };
    const quota = await fetchDeepseekQuota(connectionId, connection);

    if (!quota) {
      return { message: "DeepSeek API key not available. Add a key to view usage." };
    }

    const deepseekQuota = quota as DeepseekQuota;
    const { balances, isAvailable, limitReached } = deepseekQuota;

    const quotas: Record<string, UsageQuota> = {};

    // Show all balances as credits-style entries (e.g., credits_usd, credits_cny)
    // The UI will display them as "🪙 Balance (USD) $50.00"
    for (const balanceInfo of balances) {
      const key = `credits_${balanceInfo.currency.toLowerCase()}`;
      quotas[key] = {
        used: 0,
        total: 0,
        remaining: balanceInfo.balance,
        remainingPercentage: 100,
        resetAt: null,
        unlimited: true,
        currency: balanceInfo.currency,
        grantedBalance: balanceInfo.grantedBalance,
        toppedUpBalance: balanceInfo.toppedUpBalance,
      };
    }

    const plan = isAvailable ? "DeepSeek" : "DeepSeek (Insufficient Balance)";

    return {
      plan,
      quotas,
      isAvailable,
      limitReached,
    };
  } catch (error) {
    return { message: `DeepSeek error: ${(error as Error).message}` };
  }
}

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
async function getXiaomiMimoUsage(connectionId: string) {
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

/**
 * OpenCode Go / OpenCode / OpenCode Zen Usage
 * Delegates to the dedicated opencodeQuotaFetcher and shapes the result into
 * the standard `{ plan, quotas }` usage response expected by the limits page.
 *
 * Three rolling windows are surfaced: $12/5h, $30/wk, $60/mo.
 */
async function getOpencodeUsage(connectionId: string, apiKey: string) {
  if (!apiKey) {
    return { message: "OpenCode API key not available. Add a key to view usage." };
  }

  try {
    const quota = (await fetchOpencodeQuota(connectionId, {
      apiKey,
    })) as OpencodeTripleWindowQuota | null;

    if (!quota) {
      return { message: "OpenCode connected. Unable to fetch quota data." };
    }

    const { window5h, windowWeekly, windowMonthly, limitReached } = quota;

    const quotas: Record<string, UsageQuota> = {};

    // $12 / 5-hour rolling window
    quotas["window_5h"] = {
      used: window5h.percentUsed * 12,
      total: 12,
      remaining: (1 - window5h.percentUsed) * 12,
      remainingPercentage: (1 - window5h.percentUsed) * 100,
      resetAt: window5h.resetAt,
      unlimited: false,
      displayName: "$12 / 5-hour",
      currency: "USD",
    };

    // $30 / weekly window
    quotas["window_weekly"] = {
      used: windowWeekly.percentUsed * 30,
      total: 30,
      remaining: (1 - windowWeekly.percentUsed) * 30,
      remainingPercentage: (1 - windowWeekly.percentUsed) * 100,
      resetAt: windowWeekly.resetAt,
      unlimited: false,
      displayName: "$30 / week",
      currency: "USD",
    };

    // $60 / monthly window
    quotas["window_monthly"] = {
      used: windowMonthly.percentUsed * 60,
      total: 60,
      remaining: (1 - windowMonthly.percentUsed) * 60,
      remainingPercentage: (1 - windowMonthly.percentUsed) * 100,
      resetAt: windowMonthly.resetAt,
      unlimited: false,
      displayName: "$60 / month",
      currency: "USD",
    };

    return {
      plan: "OpenCode Go",
      quotas,
      limitReached,
    };
  } catch (error) {
    return { message: `OpenCode error: ${sanitizeErrorMessage(error)}` };
  }
}

/**
 * NanoGPT Usage
 * Fetches subscription-level quota from the NanoGPT API.
 * Returns daily/weekly token limits and daily image limits for PRO accounts.
 */
async function getNanoGptUsage(apiKey: string) {
  if (!apiKey) {
    return { message: "NanoGPT API key not available. Add a key to view usage." };
  }

  try {
    const res = await fetch(NANOGPT_CONFIG.usageUrl, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    if (!res.ok) {
      if (res.status === 401) return { message: "Invalid NanoGPT API key." };
      return { message: `NanoGPT quota API error (${res.status})` };
    }

    const data = toRecord(await res.json());
    const quotas: Record<string, UsageQuota> = {};

    // active -> PRO, otherwise FREE
    const plan = data.active ? "PRO" : "FREE";

    if (data.active) {
      // 1. Tokens limit
      // dailyInputTokens if exists, else weeklyInputTokens
      let tokenQuota = toRecord(data.dailyInputTokens);
      let tokenLabel = "Daily Tokens";
      if (!tokenQuota.resetAt) {
        const weeklyQuota = toRecord(data.weeklyInputTokens);
        if (weeklyQuota.remaining !== undefined) {
          tokenQuota = weeklyQuota;
          tokenLabel = "Weekly Tokens";
        }
      }

      if (tokenQuota.remaining !== undefined) {
        const used = toNumber(tokenQuota.used, 0);
        const remaining = toNumber(tokenQuota.remaining, 0);
        const total = used + remaining;
        quotas[tokenLabel] = {
          used,
          total,
          remaining,
          remainingPercentage: clampPercentage(100 - toNumber(tokenQuota.percentUsed, 0) * 100),
          resetAt: parseResetTime(tokenQuota.resetAt),
          unlimited: false,
        };
      }

      // 2. Images limit
      const imageQuota = toRecord(data.dailyImages);
      if (imageQuota.remaining !== undefined) {
        const used = toNumber(imageQuota.used, 0);
        const remaining = toNumber(imageQuota.remaining, 0);
        const total = used + remaining;
        quotas["Daily Images"] = {
          used,
          total,
          remaining,
          remainingPercentage: clampPercentage(100 - toNumber(imageQuota.percentUsed, 0) * 100),
          resetAt: parseResetTime(imageQuota.resetAt),
          unlimited: false,
        };
      }

      if (Object.keys(quotas).length === 0) {
        return { plan, message: "NanoGPT connected, but no active limits found." };
      }
    }

    return { plan, quotas };
  } catch (error) {
    return { message: `NanoGPT connected. Unable to fetch usage: ${(error as Error).message}` };
  }
}

/**
 * Single source of truth for which providers have a `getUsageForProvider`
 * implementation. Consumers like `genericQuotaFetcher.ts` reference this so
 * the registration list can't drift from the switch statement below.
 *
 * If you add a new provider to the switch, add it here too.
 */
export const USAGE_FETCHER_PROVIDERS = [
  "github",
  "antigravity",
  "agy",
  "claude",
  "codex",
  "cursor",
  "kiro",
  "amazon-q",
  "kimi-coding",
  "kimi-coding-apikey",
  "qwen",
  "qoder",
  "glm",
  "glm-cn",
  "zai",
  "glmt",
  "opencode-go",
  "minimax",
  "minimax-cn",
  "crof",
  "bailian-coding-plan",
  "nanogpt",
  "deepseek",
  "opencode",
  "opencode-zen",
  "xiaomi-mimo",
  "vertex",
  "vertex-partner",
  "codebuddy-cn",
] as const;

export type UsageFetcherProvider = (typeof USAGE_FETCHER_PROVIDERS)[number];

/**
 * Get usage data for a provider connection
 * @param {Object} connection - Provider connection with accessToken
 * @returns {Promise<unknown>} Usage data with quotas
 */
export async function getUsageForProvider(
  connection: UsageProviderConnection,
  options: { forceRefresh?: boolean } = {}
) {
  const { id, provider, accessToken, apiKey, providerSpecificData, projectId, email } = connection;

  switch (provider) {
    case "github":
      return await getGitHubUsage(accessToken, providerSpecificData);
    case "antigravity":
    case "agy":
      return await getAntigravityUsage(
        provider,
        accessToken,
        providerSpecificData,
        projectId,
        id,
        options
      );
    case "claude":
      return await getClaudeUsage(accessToken);
    case "codex":
      return await getCodexUsage(accessToken, providerSpecificData);
    case "cursor":
      return await getCursorUsage(accessToken || "", providerSpecificData);
    case "kiro":
    case "amazon-q":
      return await getKiroUsage(accessToken, providerSpecificData);
    case "vertex":
    case "vertex-partner":
      return await getVertexUsage(id || "", provider);
    case "kimi-coding":
      return await getKimiUsage(accessToken);
    case "kimi-coding-apikey":
      return await getKimiUsage(undefined, apiKey);
    case "qwen":
      return await getQwenUsage(accessToken, providerSpecificData);
    case "qoder":
      return await getQoderUsage(accessToken);
    case "glm":
    case "glm-cn":
    case "zai":
    case "glmt":
      return await getGlmUsage(apiKey || "", {
        ...(providerSpecificData || {}),
        ...(provider === "glm-cn" ? { apiRegion: "china" } : {}),
      });
    case "opencode-go":
      return await getOpenCodeGoUsage(apiKey || "", providerSpecificData);
    case "ollama-cloud":
      return await getOllamaCloudUsage(providerSpecificData);
    case "minimax":
    case "minimax-cn":
      return await getMiniMaxUsage(apiKey || "", provider);
    case "crof":
      return await getCrofUsage(apiKey || "");
    case "bailian-coding-plan":
      return await getBailianCodingPlanUsage(id || "", apiKey || "", providerSpecificData);
    case "nanogpt":
      return await getNanoGptUsage(apiKey || "");
    case "deepseek":
      return await getDeepseekUsage(id || "", apiKey || "");
    case "opencode":
    case "opencode-zen":
      return await getOpencodeUsage(id || "", apiKey || "");
    case "xiaomi-mimo":
      return await getXiaomiMimoUsage(id || "");
    case "codebuddy-cn":
      return await getCodeBuddyCnUsage(accessToken, apiKey, providerSpecificData);
    default:
      return { message: `Usage API not implemented for ${provider}` };
  }
}

/**
 * Parse reset date/time to ISO string
 * Handles multiple formats: Unix timestamp (ms), ISO date string, etc.
 */
/**
 * GitHub Copilot Usage
 * Uses GitHub accessToken (not copilotToken) to call copilot_internal/user API
 */
async function getGitHubUsage(accessToken?: string, providerSpecificData?: JsonRecord) {
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

function formatGitHubQuotaSnapshot(
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

function inferGitHubPlanName(data: JsonRecord, premiumQuota: UsageQuota | null): string {
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

/**
 * Vertex AI — SELF-TRACKED spend.
 *
 * Vertex AI exposes no usage/quota API for an API key or Service Account (billing/credit balance
 * lives behind the Cloud Billing API, which the proxy credential can't reach). Instead we report
 * the USD that OmniRoute has spent through this connection since the account was added — summed
 * from `usage_history` and priced via the backend pricing table. Returns a `message` (with the $
 * figure) plus a `spend` quota entry so the limits cache persists it (a message-only result is
 * treated as a transient error and not cached).
 */
async function getVertexUsage(connectionId: string, provider: string) {
  if (!connectionId) {
    return { message: "Vertex connected. Connection id unavailable for usage tracking." };
  }
  try {
    const { getConnectionSpendUsdSinceAdded } = await import("@/lib/usage/usageStats");
    const { costUsd, requests } = await getConnectionSpendUsdSinceAdded(provider, connectionId);

    const spend: JsonRecord = {
      used: Number(costUsd.toFixed(6)),
      displayName: "Spend (USD)",
      quotaSource: "localUsageHistory",
      resetAt: null,
      unlimited: false,
    };

    if (requests === 0) {
      return {
        plan: "Vertex AI",
        message: "Vertex connected. No usage recorded through OmniRoute yet for this account.",
        quotas: { spend },
      };
    }

    const costStr = costUsd >= 1 ? costUsd.toFixed(2) : costUsd.toFixed(4);
    return {
      plan: "Vertex AI",
      message: `$${costStr} used since this account was added \u00b7 ${requests} request${
        requests === 1 ? "" : "s"
      }`,
      quotas: { spend },
    };
  } catch (error) {
    return { message: `Vertex usage tracking error: ${(error as Error).message}` };
  }
}

/**
 * Qwen Usage
 */
async function getQwenUsage(accessToken?: string, providerSpecificData?: JsonRecord) {
  void accessToken;
  try {
    const resourceUrl = providerSpecificData?.resourceUrl;
    if (!resourceUrl) {
      return { message: "Qwen connected. No resource URL available." };
    }

    // Qwen may have usage endpoint at resource URL
    return { message: "Qwen connected. Usage tracked per request." };
  } catch (error) {
    return { message: "Unable to fetch Qwen usage." };
  }
}

/**
 * Qoder Usage
 */
async function getQoderUsage(accessToken?: string) {
  void accessToken;
  try {
    // Qoder may have usage endpoint
    return { message: "Qoder connected. Usage tracked per request." };
  } catch (error) {
    return { message: "Unable to fetch Qoder usage." };
  }
}

export const __testing = {
  parseResetTime,
  formatGitHubQuotaSnapshot,
  inferGitHubPlanName,
  getAntigravityPlanLabel,
  extractCodeAssistSubscriptionTier,
  extractCodeAssistOnboardTierId,
  getMiniMaxPlanLabel,
  inferMiniMaxPlanLabelFromTotals,
  getOpencodeUsage,
  getClaudePlanLabel,
  createQuotaFromUsage,
  getMiniMaxQuotaResetAt,
  isMiniMaxTextQuotaModel,
  getMiniMaxSessionTotal,
  getMiniMaxWeeklyTotal,
  createMiniMaxQuotaFromCount,
  createMiniMaxQuotaFromPercent,
  getMiniMaxRemainingPercent,
  getMiniMaxUsage,
  getXiaomiMimoUsage,
  getVertexUsage,
  getMiniMaxAuthErrorMessage,
  getMiniMaxErrorSummary,
  mapCodeAssistSubscriptionToPlanLabel,
  mapCodeAssistTierIdToLabel,
  mapSubscriptionTierStringToPlanLabel,
  toDisplayLabel,
  getKiroUsage,
};
