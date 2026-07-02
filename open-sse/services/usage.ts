/**
 * Usage Fetcher - Get usage data from provider APIs
 */

import { buildCodexUsageQuotas } from "./codexUsageQuotas.ts";
import { getGlmQuotaUrl } from "../config/glmProvider.ts";
import { getGitHubCopilotInternalUserHeaders } from "../config/providerHeaderProfiles.ts";
import { safePercentage } from "@/shared/utils/formatting";
import { getDbInstance } from "@/lib/db/core";
import { fetchBailianQuota, type BailianTripleWindowQuota } from "./bailianQuotaFetcher.ts";
import { fetchDeepseekQuota, type DeepseekQuota } from "./deepseekQuotaFetcher.ts";
import { fetchOpencodeQuota, type OpencodeTripleWindowQuota } from "./opencodeQuotaFetcher.ts";
import { getOllamaCloudUsage, getOpenCodeGoUsage } from "./opencodeOllamaUsage.ts";
import { getCodeBuddyCnUsage } from "./usage/codebuddy-cn.ts";
import { CLAUDE_CODE_VERSION, fetchClaudeBootstrap } from "../executors/claudeIdentity.ts";
import { isClaudeOauthUsageCoolingDown, markClaudeOauthUsage429 } from "./claudeUsageCooldown.ts";
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

// Quota / usage upstream URLs (overridable for testing or relays).
const CROF_USAGE_URL = process.env.OMNIROUTE_CROF_USAGE_URL ?? "https://crof.ai/usage_api/";
const CODEWHISPERER_BASE_URL =
  process.env.OMNIROUTE_CODEWHISPERER_BASE_URL ?? "https://codewhisperer.us-east-1.amazonaws.com";

// Codex (OpenAI) API config
const CODEX_CONFIG = {
  usageUrl: "https://chatgpt.com/backend-api/wham/usage",
};

// Claude API config
const CLAUDE_CONFIG = {
  oauthUsageUrl: "https://api.anthropic.com/api/oauth/usage",
  usageUrl: "https://api.anthropic.com/v1/organizations/{org_id}/usage",
  settingsUrl: "https://api.anthropic.com/v1/settings",
  apiVersion: "2023-06-01",
};

// Kimi Coding API config
const KIMI_CONFIG = {
  baseUrl: "https://api.kimi.com/coding/v1",
  usageUrl: "https://api.kimi.com/coding/v1/usages",
  apiVersion: "2023-06-01",
};

const NANOGPT_CONFIG = {
  usageUrl: "https://nano-gpt.com/api/subscription/v1/usage",
};

// Cursor dashboard usage API config
// The endpoint that powers https://cursor.com/dashboard/spending. Validates the WorkOS
// session via the WorkosCursorSessionToken cookie (format: `${userId}::${jwt}`) and
// rejects requests without a matching Origin/Referer (Invalid origin for state-changing request).
const CURSOR_USAGE_CONFIG = {
  usageUrl: "https://cursor.com/api/dashboard/get-current-period-usage",
  origin: "https://cursor.com",
  referer: "https://cursor.com/dashboard/spending",
  userAgent:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36",
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

function getClaudePlanLabel(...candidates: Array<string | null | undefined>): string | null {
  for (const candidate of candidates) {
    if (typeof candidate !== "string") continue;
    const trimmed = candidate.trim();
    if (
      !trimmed ||
      trimmed.toLowerCase() === "claude code" ||
      trimmed.toLowerCase() === "unknown"
    ) {
      continue;
    }
    return trimmed;
  }
  return null;
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
 * Decode the `sub` claim of a Cursor JWT (the WorkOS user id).
 * Returns null if the token is not a parseable JWT.
 */
function decodeCursorJwtSub(token: string): string | null {
  if (!token || typeof token !== "string") return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  try {
    let payload = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    while (payload.length % 4 !== 0) payload += "=";
    const decoded = JSON.parse(Buffer.from(payload, "base64").toString("utf8"));
    const sub = decoded?.sub;
    return typeof sub === "string" && sub.length > 0 ? sub : null;
  } catch {
    return null;
  }
}

/**
 * Cursor Pro Plan Usage
 * Fetches current-billing-cycle spend from the cursor.com dashboard API and exposes three
 * windows that mirror the cursor.com/dashboard/spending UI: Total / Auto + Composer / API.
 */
async function getCursorUsage(accessToken: string, providerSpecificData?: unknown) {
  if (!accessToken) {
    return { message: "Cursor access token missing. Re-import the connection from Cursor IDE." };
  }

  const storedUserId = (() => {
    const raw = toRecord(providerSpecificData).userId;
    return typeof raw === "string" && raw.length > 0 ? raw : null;
  })();
  const userId = storedUserId || decodeCursorJwtSub(accessToken);

  if (!userId) {
    return {
      message: "Cursor token missing user id. Re-import the connection from Cursor IDE.",
    };
  }

  try {
    const response = await fetch(CURSOR_USAGE_CONFIG.usageUrl, {
      method: "POST",
      redirect: "manual",
      headers: {
        Cookie: `WorkosCursorSessionToken=${userId}::${accessToken}`,
        Origin: CURSOR_USAGE_CONFIG.origin,
        Referer: CURSOR_USAGE_CONFIG.referer,
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": CURSOR_USAGE_CONFIG.userAgent,
      },
      body: "{}",
    });

    // 3xx redirect to WorkOS authkit means the session cookie was rejected.
    if (response.status >= 300 && response.status < 400) {
      return {
        plan: "Cursor",
        message: "Cursor session expired. Re-import the token from Cursor IDE.",
      };
    }

    if (!response.ok) {
      const errorText = (await response.text()).slice(0, 200);
      if (response.status === 401 || response.status === 403) {
        return {
          plan: "Cursor",
          message: "Cursor session unauthorized. Re-import the token from Cursor IDE.",
        };
      }
      return {
        plan: "Cursor",
        message: `Cursor usage endpoint error (${response.status}): ${errorText}`,
      };
    }

    const data = toRecord(await response.json());
    const planUsage = toRecord(data.planUsage);

    if (Object.keys(planUsage).length === 0) {
      return {
        plan: "Cursor",
        message: "Cursor connected. No active plan usage returned.",
      };
    }

    const limitCents = Math.max(0, toNumber(planUsage.limit, 0));
    const totalSpendCents = Math.max(0, toNumber(planUsage.totalSpend, 0));
    const autoPercentUsed = clampPercentage(toNumber(planUsage.autoPercentUsed, 0));
    const apiPercentUsed = clampPercentage(toNumber(planUsage.apiPercentUsed, 0));
    const totalPercentUsed = clampPercentage(toNumber(planUsage.totalPercentUsed, 0));

    // billingCycleEnd is a numeric-string in ms; coerce so parseResetTime sees a number.
    const billingCycleEndMs = toNumber(data.billingCycleEnd, 0);
    const resetAt = billingCycleEndMs > 0 ? parseResetTime(billingCycleEndMs) : null;

    // Convert cents → dollars rounded to 2 decimal places.
    const toDollars = (cents: number) => Math.round(cents) / 100;

    const limitDollars = toDollars(limitCents);
    const buildWindow = (percentUsed: number, usedCentsOverride?: number): UsageQuota => {
      const usedCents =
        typeof usedCentsOverride === "number"
          ? usedCentsOverride
          : Math.round((limitCents * percentUsed) / 100);
      const used = toDollars(Math.min(usedCents, limitCents));
      const remaining = toDollars(Math.max(limitCents - Math.min(usedCents, limitCents), 0));
      return {
        used,
        total: limitDollars,
        remaining,
        remainingPercentage: clampPercentage(100 - percentUsed),
        resetAt,
        unlimited: false,
      };
    };

    const quotas: Record<string, UsageQuota> = {
      Total: buildWindow(totalPercentUsed, totalSpendCents),
      "Auto + Composer": buildWindow(autoPercentUsed),
      API: buildWindow(apiPercentUsed),
    };

    return {
      plan: "Cursor Pro",
      quotas,
    };
  } catch (error) {
    return {
      plan: "Cursor",
      message: `Cursor connected. Unable to fetch usage: ${(error as Error).message}`,
    };
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
 * Claude Usage - Try to fetch from Anthropic API
 */
async function getClaudeUsage(accessToken?: string) {
  if (!accessToken) {
    return { message: "Claude connected. Access token not available.", bootstrap: null };
  }

  // Refresh bootstrap in parallel; best-effort, failure non-fatal.
  const bootstrapPromise = fetchClaudeBootstrap(accessToken).catch(() => null);
  // Skip OAuth usage call while this token is cooling down from a recent 429
  // (chat with the same token still works — only the quota endpoint is throttled).
  if (isClaudeOauthUsageCoolingDown(accessToken)) {
    const legacy = await getClaudeUsageLegacy(accessToken);
    return { ...legacy, bootstrap: await bootstrapPromise };
  }
  try {
    // Real CLI uses axios here, not Stainless — UA is `claude-code/<version>`
    // (not `claude-cli/...`) and the shape is simpler than /v1/messages.
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 10_000);
    let oauthResponse;
    try {
      oauthResponse = await fetch(CLAUDE_CONFIG.oauthUsageUrl, {
        method: "GET",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Accept-Encoding": "gzip, compress, deflate, br",
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "User-Agent": `claude-code/${CLAUDE_CODE_VERSION}`,
          "anthropic-beta": "oauth-2025-04-20",
        },
        signal: ctrl.signal,
      });
    } finally {
      clearTimeout(timer);
    }

    if (oauthResponse.ok) {
      const data = toRecord(await oauthResponse.json());
      const quotas: Record<string, UsageQuota> = {};

      // utilization = percentage USED (e.g., 90 means 90% used, 10% remaining)
      // Confirmed via user report #299: Claude.ai shows 87% used = OmniRoute must show 13% remaining.
      const hasUtilization = (window: JsonRecord) =>
        window && typeof window === "object" && safePercentage(window.utilization) !== undefined;

      const createQuotaObject = (window: JsonRecord) => {
        const used = safePercentage(window.utilization) as number; // utilization = % used
        const remaining = Math.max(0, 100 - used);
        return {
          used,
          total: 100,
          remaining,
          resetAt: parseResetTime(window.resets_at),
          remainingPercentage: remaining,
          unlimited: false,
        };
      };

      const fiveHour = toRecord(data.five_hour);
      if (hasUtilization(fiveHour)) {
        quotas["session (5h)"] = createQuotaObject(fiveHour);
      }

      const sevenDay = toRecord(data.seven_day);
      if (hasUtilization(sevenDay)) {
        quotas["weekly (7d)"] = createQuotaObject(sevenDay);
      }

      // Map Anthropic's internal codenames (e.g., omelette → Designer) for display.
      const MODEL_DISPLAY_NAMES: Record<string, string> = {
        omelette: "designer",
      };
      for (const [key, value] of Object.entries(data)) {
        const valueRecord = toRecord(value);
        if (key.startsWith("seven_day_") && key !== "seven_day" && hasUtilization(valueRecord)) {
          const codename = key.replace("seven_day_", "");
          const modelName = MODEL_DISPLAY_NAMES[codename] || codename;
          quotas[`weekly ${modelName} (7d)`] = createQuotaObject(valueRecord);
        }
      }

      const bootstrap = await bootstrapPromise;
      const plan =
        getClaudePlanLabel(
          typeof data.tier === "string" ? data.tier : null,
          typeof data.plan === "string" ? data.plan : null,
          typeof data.subscription_type === "string" ? data.subscription_type : null,
          bootstrap?.organization_rate_limit_tier
        ) ?? undefined;

      return {
        ...(plan ? { plan } : {}),
        quotas,
        extraUsage: data.extra_usage ?? null,
        bootstrap,
      };
    }

    // Cool down OAuth usage polling after a 429 (quota endpoint only — chat is unaffected).
    if (oauthResponse.status === 429) {
      markClaudeOauthUsage429(accessToken);
    }

    // Fallback: OAuth endpoint returned non-OK, try legacy settings/org endpoint
    console.warn(
      `[Claude Usage] OAuth endpoint returned ${oauthResponse.status}, falling back to legacy`
    );
    const legacy = await getClaudeUsageLegacy(accessToken);
    return { ...legacy, bootstrap: await bootstrapPromise };
  } catch (error) {
    return {
      message: `Claude connected. Unable to fetch usage: ${(error as Error).message}`,
      bootstrap: await bootstrapPromise,
    };
  }
}

/**
 * Legacy Claude usage fetcher for API key / org admin users.
 * Uses /v1/settings + /v1/organizations/{org_id}/usage endpoints.
 */
async function getClaudeUsageLegacy(accessToken?: string) {
  try {
    const settingsResponse = await fetch(CLAUDE_CONFIG.settingsUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "anthropic-version": CLAUDE_CONFIG.apiVersion,
      },
    });

    if (settingsResponse.ok) {
      const settings = toRecord(await settingsResponse.json());

      const organizationId =
        typeof settings.organization_id === "string" ? settings.organization_id : "";
      if (organizationId) {
        const usageResponse = await fetch(
          CLAUDE_CONFIG.usageUrl.replace("{org_id}", organizationId),
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "anthropic-version": CLAUDE_CONFIG.apiVersion,
            },
          }
        );

        if (usageResponse.ok) {
          const usage = await usageResponse.json();
          return {
            plan: settings.plan || "Unknown",
            organization: settings.organization_name,
            quotas: usage,
          };
        }
      }

      return {
        plan: settings.plan || "Unknown",
        organization: settings.organization_name,
        message: "Claude connected. Usage details require admin access.",
      };
    }

    return { message: "Claude connected. Usage API requires admin permissions." };
  } catch (error) {
    return { message: `Claude connected. Unable to fetch usage: ${(error as Error).message}` };
  }
}

/**
 * Codex (OpenAI) Usage - Fetch from ChatGPT backend API
 * IMPORTANT: Uses persisted workspaceId from OAuth to ensure correct workspace binding.
 * No fallback to other workspaces - strict binding to user's selected workspace.
 */
async function getCodexUsage(
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

    const { rateLimit, quotas } = buildCodexUsageQuotas(data);

    return {
      plan: String(getFieldValue(data, "plan_type", "planType") || "unknown"),
      limitReached: Boolean(getFieldValue(rateLimit, "limit_reached", "limitReached")),
      quotas,
    };
  } catch (error) {
    return { message: `Failed to fetch Codex usage: ${(error as Error).message}` };
  }
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
async function getKiroUsage(accessToken?: string, providerSpecificData?: JsonRecord) {
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
async function getKimiUsage(accessToken?: string, apiKey?: string) {
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
