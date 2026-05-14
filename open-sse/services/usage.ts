/**
 * Usage Fetcher - Get usage data from provider APIs
 */

import { PROVIDERS } from "../config/constants.ts";

// Quota / usage upstream URLs (overridable for testing or relays).
const CROF_USAGE_URL = process.env.OMNIROUTE_CROF_USAGE_URL ?? "https://crof.ai/usage_api/";
const GEMINI_CLI_USAGE_URL =
  process.env.OMNIROUTE_GEMINI_CLI_USAGE_URL ??
  "https://cloudcode-pa.googleapis.com/v1internal:loadCodeAssist";
const CODEWHISPERER_BASE_URL =
  process.env.OMNIROUTE_CODEWHISPERER_BASE_URL ?? "https://codewhisperer.us-east-1.amazonaws.com";
import {
  getAntigravityFetchAvailableModelsUrls,
  ANTIGRAVITY_BASE_URLS,
} from "../config/antigravityUpstream.ts";
import { isUserCallableAntigravityModelId } from "../config/antigravityModelAliases.ts";
import { getGlmQuotaUrl } from "../config/glmProvider.ts";
import { getGitHubCopilotInternalUserHeaders } from "../config/providerHeaderProfiles.ts";
import { safePercentage } from "@/shared/utils/formatting";
import { fetchBailianQuota, type BailianTripleWindowQuota } from "./bailianQuotaFetcher.ts";
import { fetchDeepseekQuota, type DeepseekQuota } from "./deepseekQuotaFetcher.ts";
import {
  antigravityUserAgent,
  getAntigravityHeaders,
  getAntigravityLoadCodeAssistMetadata,
} from "./antigravityHeaders.ts";
import {
  getAntigravityRemainingCredits,
  updateAntigravityRemainingCredits,
} from "../executors/antigravity.ts";
import { getCreditsMode } from "./antigravityCredits.ts";
import { CLAUDE_CODE_VERSION, fetchClaudeBootstrap } from "../executors/claudeIdentity.ts";
import {
  deriveAntigravityMachineId,
  generateAntigravityRequestId,
  getAntigravitySessionId,
  getAntigravityVscodeSessionId,
} from "./antigravityIdentity.ts";
import { getCachedAntigravityVersion } from "./antigravityVersion.ts";

// Antigravity API config (credentials from PROVIDERS via credential loader)
const ANTIGRAVITY_CONFIG = {
  quotaApiUrls: getAntigravityFetchAvailableModelsUrls(),
  loadProjectApiUrl: "https://daily-cloudcode-pa.sandbox.googleapis.com/v1internal:loadCodeAssist",
  tokenUrl: "https://oauth2.googleapis.com/token",
  get clientId() {
    return PROVIDERS.antigravity.clientId;
  },
  get clientSecret() {
    return PROVIDERS.antigravity.clientSecret;
  },
  get userAgent() {
    return antigravityUserAgent();
  },
};

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
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
};

const MINIMAX_USAGE_CONFIG = {
  minimax: {
    usageUrls: [
      "https://www.minimax.io/v1/token_plan/remains",
      "https://api.minimax.io/v1/api/openplatform/coding_plan/remains",
    ],
  },
  "minimax-cn": {
    usageUrls: [
      "https://www.minimaxi.com/v1/api/openplatform/coding_plan/remains",
      "https://api.minimaxi.com/v1/api/openplatform/coding_plan/remains",
    ],
  },
} as const;

type JsonRecord = Record<string, unknown>;
type UsageQuota = {
  used: number;
  total: number;
  remaining?: number;
  remainingPercentage?: number;
  resetAt: string | null;
  unlimited: boolean;
  displayName?: string;
  details?: Array<{
    name: string;
    used: number;
  }>;
  currency?: string;
  grantedBalance?: number;
  toppedUpBalance?: number;
};
type UsageProviderConnection = JsonRecord & {
  id?: string;
  provider?: string;
  accessToken?: string;
  apiKey?: string;
  providerSpecificData?: JsonRecord;
  projectId?: string;
  email?: string;
};
type SubscriptionCacheEntry = {
  data: unknown;
  fetchedAt: number;
};

function toRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function toNumber(value: unknown, fallback = 0): number {
  const parsed =
    typeof value === "number"
      ? value
      : typeof value === "string" && value.trim().length > 0
        ? Number(value)
        : Number.NaN;
  return Number.isFinite(parsed) ? parsed : fallback;
}

function toPercentage(value: unknown): number {
  return Math.max(0, Math.min(100, toNumber(value, 0)));
}

function toTitleCase(value: string): string {
  return value
    .trim()
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

function getGlmTokenQuotaName(
  limit: JsonRecord,
  existingQuotas: Record<string, UsageQuota>
): string {
  const unit = toNumber(limit.unit, 0);
  const number = toNumber(limit.number, 0);

  if (unit === 3 && number === 5) return "session";
  if ((unit === 4 && number === 7) || (unit === 3 && number >= 24 * 7)) return "weekly";

  return existingQuotas.session ? "weekly" : "session";
}

function getGlmQuotaDisplayName(quotaName: string): string {
  if (quotaName === "session") return "5 Hours Quota";
  if (quotaName === "weekly") return "Weekly Quota";
  return quotaName;
}

function getFieldValue(source: unknown, snakeKey: string, camelKey: string): unknown {
  const obj = toRecord(source);
  return obj[snakeKey] ?? obj[camelKey] ?? null;
}

function clampPercentage(value: number): number {
  return Math.max(0, Math.min(100, value));
}

function toDisplayLabel(value: string): string {
  return value
    .replace(/^copilot[_\s-]*/i, "")
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((part) => {
      if (/^pro\+$/i.test(part)) return "Pro+";
      if (/^[a-z]{2,}$/.test(part))
        return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
      return part;
    })
    .join(" ")
    .trim();
}

function shouldDisplayGitHubQuota(quota: UsageQuota | null): quota is UsageQuota {
  if (!quota) return false;
  if (quota.unlimited && quota.total <= 0) return false;
  return quota.total > 0 || quota.remainingPercentage !== undefined;
}

function createQuotaFromUsage(
  usedValue: unknown,
  totalValue: unknown,
  resetValue: unknown
): UsageQuota {
  const total = Math.max(0, toNumber(totalValue, 0));
  const used = total > 0 ? Math.min(Math.max(0, toNumber(usedValue, 0)), total) : 0;
  const remaining = total > 0 ? Math.max(total - used, 0) : 0;

  return {
    used,
    total,
    remaining,
    remainingPercentage: total > 0 ? clampPercentage((remaining / total) * 100) : 0,
    resetAt: parseResetTime(resetValue),
    unlimited: false,
  };
}

function getMiniMaxQuotaResetAt(
  model: JsonRecord,
  capturedAtMs: number,
  remainsTimeSnakeKey: string,
  remainsTimeCamelKey: string,
  endTimeSnakeKey: string,
  endTimeCamelKey: string
): string | null {
  const remainsMs = toNumber(getFieldValue(model, remainsTimeSnakeKey, remainsTimeCamelKey), 0);
  if (remainsMs > 0) {
    return new Date(capturedAtMs + remainsMs).toISOString();
  }

  return parseResetTime(getFieldValue(model, endTimeSnakeKey, endTimeCamelKey));
}

function isMiniMaxTextQuotaModel(modelName: string): boolean {
  const normalized = modelName.trim().toLowerCase();
  return normalized.startsWith("minimax-m") || normalized.startsWith("coding-plan");
}

function getMiniMaxSessionTotal(model: JsonRecord): number {
  return Math.max(
    0,
    toNumber(getFieldValue(model, "current_interval_total_count", "currentIntervalTotalCount"), 0)
  );
}

function getMiniMaxWeeklyTotal(model: JsonRecord): number {
  return Math.max(
    0,
    toNumber(getFieldValue(model, "current_weekly_total_count", "currentWeeklyTotalCount"), 0)
  );
}

function pickMiniMaxRepresentativeModel(
  models: JsonRecord[],
  getTotal: (model: JsonRecord) => number
): JsonRecord | null {
  const withQuota = models.filter((model) => getTotal(model) > 0);
  const pool = withQuota.length > 0 ? withQuota : models;
  if (pool.length === 0) return null;

  return pool.reduce((best, current) => (getTotal(current) > getTotal(best) ? current : best));
}

function createMiniMaxQuotaFromCount(
  total: number,
  count: number,
  resetAt: string | null,
  countMeansRemaining: boolean
): UsageQuota {
  const used = countMeansRemaining ? Math.max(total - count, 0) : count;
  return createQuotaFromUsage(used, total, resetAt);
}

function getMiniMaxAuthErrorMessage(message: string): string {
  const normalized = message.toLowerCase();
  if (
    normalized.includes("token plan") ||
    normalized.includes("coding plan") ||
    normalized.includes("active period") ||
    normalized.includes("invalid api key") ||
    normalized.includes("invalid key") ||
    normalized.includes("subscription")
  ) {
    return "MiniMax Token Plan API key invalid or inactive. Use an active Token Plan key.";
  }

  return "MiniMax access denied. Confirm the key is an active Token Plan API key.";
}

function getMiniMaxErrorSummary(status: number, message: string): string {
  const compact = message.replace(/\s+/g, " ").trim();
  if (!compact) {
    return `MiniMax usage endpoint error (${status}).`;
  }
  if (compact.length <= 160) {
    return `MiniMax usage endpoint error (${status}): ${compact}`;
  }
  return `MiniMax usage endpoint error (${status}): ${compact.slice(0, 157)}...`;
}

async function getMiniMaxUsage(apiKey: string, provider: "minimax" | "minimax-cn") {
  if (!apiKey) {
    return { message: "MiniMax API key not available. Add a Token Plan API key." };
  }

  const usageUrls = MINIMAX_USAGE_CONFIG[provider].usageUrls;
  let lastErrorMessage = "";

  for (let index = 0; index < usageUrls.length; index += 1) {
    const usageUrl = usageUrls[index];
    const canFallback = index < usageUrls.length - 1;

    try {
      const response = await fetch(usageUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const rawText = await response.text();
      let payload: JsonRecord = {};
      if (rawText) {
        try {
          payload = toRecord(JSON.parse(rawText));
        } catch {
          payload = {};
        }
      }

      const baseResp = toRecord(getFieldValue(payload, "base_resp", "baseResp"));
      const apiStatusCode = toNumber(getFieldValue(baseResp, "status_code", "statusCode"), 0);
      const apiStatusMessage = String(
        getFieldValue(baseResp, "status_msg", "statusMsg") ?? ""
      ).trim();
      const combinedMessage = `${apiStatusMessage} ${rawText}`.trim();
      const authLikeMessage =
        /token plan|coding plan|invalid api key|invalid key|unauthorized|inactive/i;

      if (
        response.status === 401 ||
        response.status === 403 ||
        apiStatusCode === 1004 ||
        authLikeMessage.test(combinedMessage)
      ) {
        return { message: getMiniMaxAuthErrorMessage(combinedMessage) };
      }

      if (!response.ok) {
        lastErrorMessage = getMiniMaxErrorSummary(response.status, combinedMessage);
        if (
          (response.status === 404 || response.status === 405 || response.status >= 500) &&
          canFallback
        ) {
          continue;
        }
        return { message: `MiniMax connected. ${lastErrorMessage}` };
      }

      if (rawText && Object.keys(payload).length === 0) {
        return { message: "MiniMax connected. Unable to parse usage response." };
      }

      if (apiStatusCode !== 0) {
        if (apiStatusMessage) {
          return { message: `MiniMax connected. ${apiStatusMessage}` };
        }
        return { message: "MiniMax connected. Upstream quota API returned an error." };
      }

      const capturedAtMs = Date.now();
      const modelRemains = getFieldValue(payload, "model_remains", "modelRemains");
      const allModels = Array.isArray(modelRemains)
        ? modelRemains.map((item) => toRecord(item))
        : [];
      const textModels = allModels.filter((model) => {
        const modelName = String(getFieldValue(model, "model_name", "modelName") ?? "");
        return isMiniMaxTextQuotaModel(modelName);
      });

      if (textModels.length === 0) {
        return { message: "MiniMax connected. No text quota data was returned." };
      }

      const countMeansRemaining = usageUrl.includes("/coding_plan/remains");
      const quotas: Record<string, UsageQuota> = {};
      const sessionModel = pickMiniMaxRepresentativeModel(textModels, getMiniMaxSessionTotal);
      if (sessionModel) {
        const total = getMiniMaxSessionTotal(sessionModel);
        const count = Math.max(
          0,
          toNumber(
            getFieldValue(
              sessionModel,
              "current_interval_usage_count",
              "currentIntervalUsageCount"
            ),
            0
          )
        );
        quotas["session (5h)"] = createMiniMaxQuotaFromCount(
          total,
          count,
          getMiniMaxQuotaResetAt(
            sessionModel,
            capturedAtMs,
            "remains_time",
            "remainsTime",
            "end_time",
            "endTime"
          ),
          countMeansRemaining
        );
      }

      const weeklyModel = pickMiniMaxRepresentativeModel(textModels, getMiniMaxWeeklyTotal);
      if (weeklyModel && getMiniMaxWeeklyTotal(weeklyModel) > 0) {
        const total = getMiniMaxWeeklyTotal(weeklyModel);
        const count = Math.max(
          0,
          toNumber(
            getFieldValue(weeklyModel, "current_weekly_usage_count", "currentWeeklyUsageCount"),
            0
          )
        );
        quotas["weekly (7d)"] = createMiniMaxQuotaFromCount(
          total,
          count,
          getMiniMaxQuotaResetAt(
            weeklyModel,
            capturedAtMs,
            "weekly_remains_time",
            "weeklyRemainsTime",
            "weekly_end_time",
            "weeklyEndTime"
          ),
          countMeansRemaining
        );
      }

      if (Object.keys(quotas).length === 0) {
        return { message: "MiniMax connected. Unable to extract text quota usage." };
      }

      return { quotas };
    } catch (error) {
      lastErrorMessage = (error as Error).message;
      if (!canFallback) {
        break;
      }
    }
  }

  return {
    message: lastErrorMessage
      ? `MiniMax connected. Unable to fetch usage: ${lastErrorMessage}`
      : "MiniMax connected. Unable to fetch usage.",
  };
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

const GLM_QUOTA_ORDER = ["5 Hours Quota", "Weekly Quota", "Monthly Tools", "Tokens", "Time Limit"];

function getGlmQuotaLabel(type: unknown, unit: unknown): string | null {
  const normalized = typeof type === "string" ? type.trim().toUpperCase() : "";
  const unitValue = toNumber(unit, -1);

  switch (normalized) {
    case "TOKENS_LIMIT":
    case "TOKEN_LIMIT":
      if (unitValue === 3) return "5 Hours Quota";
      if (unitValue === 6) return "Weekly Quota";
      return "Tokens";
    case "TIME_LIMIT":
    case "TIME_USAGE_LIMIT":
      if (unitValue === 5) return "Monthly Tools";
      return "Time Limit";
    default:
      return null;
  }
}

function orderGlmQuotas(quotas: Record<string, UsageQuota>): Record<string, UsageQuota> {
  const ordered: Record<string, UsageQuota> = {};

  for (const key of GLM_QUOTA_ORDER) {
    if (quotas[key]) ordered[key] = quotas[key];
  }

  for (const [key, quota] of Object.entries(quotas)) {
    if (!ordered[key]) ordered[key] = quota;
  }

  return ordered;
}

async function getGlmUsage(apiKey: string, providerSpecificData?: Record<string, unknown>) {
  if (!apiKey) {
    return { message: "API key not available. Add a coding plan API key to view usage." };
  }

  const quotaUrl = getGlmQuotaUrl(providerSpecificData);

  const res = await fetch(quotaUrl, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    if (res.status === 401) throw new Error("Invalid API key");
    throw new Error(`GLM quota API error (${res.status})`);
  }

  const json = await res.json();
  if (toNumber(json.code, 200) === 401 || json.success === false) {
    throw new Error("Invalid API key");
  }

  const data = toRecord(json.data);
  const limits: unknown[] = Array.isArray(data.limits) ? data.limits : [];
  const quotas: Record<string, UsageQuota> = {};

  for (const limit of limits) {
    const src = toRecord(limit);
    const type = String(src.type || "").toUpperCase();
    const resetMs = toNumber(src.nextResetTime, 0);
    const resetAt = resetMs > 0 ? new Date(resetMs).toISOString() : null;

    if (type === "TOKENS_LIMIT") {
      const quotaName = getGlmTokenQuotaName(src, quotas);
      const usedPercent = toPercentage(src.percentage);
      const remaining = Math.max(0, 100 - usedPercent);

      quotas[quotaName] = {
        used: usedPercent,
        total: 100,
        remaining,
        remainingPercentage: remaining,
        resetAt,
        displayName: getGlmQuotaDisplayName(quotaName),
        details: Array.isArray(src.models)
          ? (src.models as unknown[]).map((m) => {
              const modelInfo = toRecord(m);
              return {
                name: String(modelInfo.model || ""),
                used: toNumber(modelInfo.percentage, 0),
              };
            })
          : [],
        unlimited: false,
      };
      continue;
    }

    if (type === "TIME_LIMIT") {
      const total = toNumber(src.usage, toNumber(src.total, 0));
      const remaining = toNumber(src.remaining, Math.max(0, 100 - toPercentage(src.percentage)));
      const used = toNumber(src.currentValue, Math.max(0, total - remaining));
      const remainingPercentage =
        total > 0 ? Math.max(0, Math.min(100, Math.round((remaining / total) * 100))) : 0;

      quotas["mcp_monthly"] = {
        used,
        total,
        remaining,
        remainingPercentage,
        resetAt,
        unlimited: false,
        displayName: "Monthly",
        details: Array.isArray(src.usageDetails)
          ? src.usageDetails.map((item) => {
              const detail = toRecord(item);
              return {
                name: String(detail.modelCode || detail.name || "usage"),
                used: toNumber(detail.usage, 0),
              };
            })
          : undefined,
      };
    }
  }

  const levelRaw =
    typeof data.planName === "string"
      ? data.planName
      : typeof data.level === "string"
        ? data.level
        : "";
  const plan = levelRaw ? toTitleCase(levelRaw.replace(/\s*plan$/i, "")) : null;

  return { plan, quotas: orderGlmQuotas(quotas) };
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
    case "gemini-cli":
      return await getGeminiUsage(accessToken, providerSpecificData, projectId);
    case "antigravity":
      return await getAntigravityUsage(accessToken, providerSpecificData, projectId, id, options);
    case "claude":
      return await getClaudeUsage(accessToken);
    case "codex":
      return await getCodexUsage(accessToken, providerSpecificData);
    case "cursor":
      return await getCursorUsage(accessToken || "", providerSpecificData);
    case "kiro":
    case "amazon-q":
      return await getKiroUsage(accessToken, providerSpecificData);
    case "kimi-coding":
      return await getKimiUsage(accessToken);
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
    default:
      return { message: `Usage API not implemented for ${provider}` };
  }
}

/**
 * Parse reset date/time to ISO string
 * Handles multiple formats: Unix timestamp (ms), ISO date string, etc.
 */
function parseResetTime(resetValue: unknown): string | null {
  if (!resetValue) return null;

  try {
    let date: Date;
    if (resetValue instanceof Date) {
      date = resetValue;
    } else if (typeof resetValue === "number") {
      date = new Date(resetValue < 1e12 ? resetValue * 1000 : resetValue);
    } else if (typeof resetValue === "string") {
      date = new Date(resetValue);
    } else {
      return null;
    }

    // Epoch-zero (1970-01-01) means no scheduled reset — treat as null
    if (date.getTime() <= 0) return null;

    return date.toISOString();
  } catch (error) {
    return null;
  }
}

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
      // Free/limited plan format
      const monthlyQuotas = toRecord(dataRecord.monthly_quotas);
      const usedQuotas = toRecord(dataRecord.limited_user_quotas);
      const resetDate = getFieldValue(
        dataRecord,
        "limited_user_reset_date",
        "limitedUserResetDate"
      );
      const resetAt = parseResetTime(resetDate);
      const quotas: Record<string, UsageQuota> = {};

      const addLimitedQuota = (name: string) => {
        const total = toNumber(getFieldValue(monthlyQuotas, name, name), 0);
        const used = Math.max(0, toNumber(getFieldValue(usedQuotas, name, name), 0));
        if (total <= 0) return null;
        const clampedUsed = Math.min(used, total);
        quotas[name] = {
          used: clampedUsed,
          total,
          remaining: Math.max(total - clampedUsed, 0),
          remainingPercentage: clampPercentage(((total - clampedUsed) / total) * 100),
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

// ── Gemini CLI subscription info cache ──────────────────────────────────────
// Prevents duplicate loadCodeAssist calls within the same quota cycle.
// Key: accessToken → { data, fetchedAt }
const _geminiCliSubCache = new Map<string, SubscriptionCacheEntry>();
const GEMINI_CLI_CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Gemini CLI Usage — fetch per-model quota from Cloud Code Assist API.
 * Gemini CLI and Antigravity share the same upstream (cloudcode-pa.googleapis.com),
 * so this follows the same pattern as getAntigravityUsage().
 */
async function getGeminiUsage(
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
function getGeminiCliPlanLabel(subscriptionInfo: unknown): string {
  const subscription = toRecord(subscriptionInfo);
  if (Object.keys(subscription).length === 0) return "Free";

  let tierId = "";
  if (Array.isArray(subscription.allowedTiers)) {
    for (const tierValue of subscription.allowedTiers) {
      const tier = toRecord(tierValue);
      if (tier.isDefault && typeof tier.id === "string") {
        tierId = tier.id.trim().toUpperCase();
        break;
      }
    }
  }

  if (!tierId) {
    const currentTier = toRecord(subscription.currentTier);
    tierId = typeof currentTier.id === "string" ? currentTier.id.toUpperCase() : "";
  }

  if (tierId) {
    if (tierId.includes("ULTRA")) return "Ultra";
    if (tierId.includes("PRO")) return "Pro";
    if (tierId.includes("ENTERPRISE")) return "Enterprise";
    if (tierId.includes("BUSINESS") || tierId.includes("STANDARD")) return "Business";
    if (tierId.includes("FREE") || tierId.includes("INDIVIDUAL") || tierId.includes("LEGACY"))
      return "Free";
  }

  const tierName = String(
    getFieldValue(toRecord(subscription.currentTier), "name", "displayName") ||
      subscription.subscriptionType ||
      subscription.tier ||
      ""
  );
  const upper = tierName.toUpperCase();

  if (upper.includes("ULTRA")) return "Ultra";
  if (upper.includes("PRO")) return "Pro";
  if (upper.includes("ENTERPRISE")) return "Enterprise";
  if (upper.includes("STANDARD") || upper.includes("BUSINESS")) return "Business";
  if (upper.includes("INDIVIDUAL") || upper.includes("FREE")) return "Free";

  if (toRecord(subscription.currentTier).upgradeSubscriptionType) return "Free";
  if (tierName) {
    return tierName.charAt(0).toUpperCase() + tierName.slice(1).toLowerCase();
  }

  return "Free";
}

// ── Antigravity subscription info cache ──────────────────────────────────────
// Prevents duplicate loadCodeAssist calls within the same quota cycle.
// Key: truncated accessToken → { data, fetchedAt }
const _antigravitySubCache = new Map<string, SubscriptionCacheEntry>();
const ANTIGRAVITY_CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
const ANTIGRAVITY_MODELS_CACHE_TTL_MS = 60 * 1000;
const ANTIGRAVITY_CREDIT_PROBE_TTL_MS = 5 * 60 * 1000;
const _antigravityAvailableModelsCache = new Map<string, { data: unknown; fetchedAt: number }>();
const _antigravityAvailableModelsInflight = new Map<string, Promise<unknown>>();
const _antigravityCreditProbeCache = new Map<string, { data: number | null; fetchedAt: number }>();
const _antigravityCreditProbeInflight = new Map<string, Promise<number | null>>();

interface AntigravityUsageOptions {
  forceRefresh?: boolean;
}

function buildAntigravityUsageCacheKey(accessToken: string, projectId?: string | null): string {
  return `${accessToken.substring(0, 16)}:${projectId || "default"}`;
}

async function fetchAntigravityAvailableModelsCached(
  accessToken: string,
  projectId?: string | null,
  options: AntigravityUsageOptions = {}
): Promise<unknown> {
  if (!accessToken) throw new Error("Access token is required");

  const cacheKey = buildAntigravityUsageCacheKey(accessToken, projectId);
  const cached = _antigravityAvailableModelsCache.get(cacheKey);
  if (
    !options.forceRefresh &&
    cached &&
    Date.now() - cached.fetchedAt < ANTIGRAVITY_MODELS_CACHE_TTL_MS
  ) {
    return cached.data;
  }

  const inflight = _antigravityAvailableModelsInflight.get(cacheKey);
  if (inflight) return inflight;

  const promise = (async () => {
    let response: Response | null = null;
    let lastError: Error | null = null;

    for (const quotaApiUrl of ANTIGRAVITY_CONFIG.quotaApiUrls) {
      try {
        response = await fetch(quotaApiUrl, {
          method: "POST",
          headers: getAntigravityHeaders("fetchAvailableModels", accessToken),
          body: JSON.stringify(projectId ? { project: projectId } : {}),
          signal: AbortSignal.timeout(10000),
        });

        if (response.ok || response.status === 401 || response.status === 403) {
          break;
        }
      } catch (error) {
        lastError = error as Error;
      }
    }

    if (!response) {
      throw lastError || new Error("Antigravity API unavailable");
    }

    if (response.status === 403) {
      return { __antigravityForbidden: true };
    }

    if (!response.ok) {
      throw new Error(`Antigravity API error: ${response.status}`);
    }

    const data = await response.json();
    _antigravityAvailableModelsCache.set(cacheKey, { data, fetchedAt: Date.now() });
    return data;
  })().finally(() => {
    _antigravityAvailableModelsInflight.delete(cacheKey);
  });

  _antigravityAvailableModelsInflight.set(cacheKey, promise);
  return promise;
}

/**
 * Map raw loadCodeAssist tier data to short display labels.
 * Extracts tier from allowedTiers[].isDefault (same logic as providers.js postExchange).
 * Falls back to currentTier.id → currentTier.name → "Free".
 */
function getAntigravityPlanLabel(subscriptionInfo: unknown): string {
  const subscription = toRecord(subscriptionInfo);
  if (Object.keys(subscription).length === 0) return "Free";

  // 1. Extract tier from allowedTiers (primary source — same as providers.js)
  let tierId = "";
  if (Array.isArray(subscription.allowedTiers)) {
    for (const tierValue of subscription.allowedTiers) {
      const tier = toRecord(tierValue);
      if (tier.isDefault && typeof tier.id === "string") {
        tierId = tier.id.trim().toUpperCase();
        break;
      }
    }
  }

  // 2. Fall back to currentTier.id
  if (!tierId) {
    const currentTier = toRecord(subscription.currentTier);
    tierId = typeof currentTier.id === "string" ? currentTier.id.toUpperCase() : "";
  }

  // 3. Map tier ID to display label
  if (tierId) {
    if (tierId.includes("ULTRA")) return "Ultra";
    if (tierId.includes("PRO")) return "Pro";
    if (tierId.includes("ENTERPRISE")) return "Enterprise";
    if (tierId.includes("BUSINESS") || tierId.includes("STANDARD")) return "Business";
    if (tierId.includes("FREE") || tierId.includes("INDIVIDUAL") || tierId.includes("LEGACY"))
      return "Free";
  }

  // 4. Try tier name fields as last resort
  const tierName = String(
    getFieldValue(toRecord(subscription.currentTier), "name", "displayName") ||
      subscription.subscriptionType ||
      subscription.tier ||
      ""
  );
  const upper = tierName.toUpperCase();

  if (upper.includes("ULTRA")) return "Ultra";
  if (upper.includes("PRO")) return "Pro";
  if (upper.includes("ENTERPRISE")) return "Enterprise";
  if (upper.includes("STANDARD") || upper.includes("BUSINESS")) return "Business";
  if (upper.includes("INDIVIDUAL") || upper.includes("FREE")) return "Free";

  // 5. If upgradeSubscriptionType exists, account is on free tier
  if (toRecord(subscription.currentTier).upgradeSubscriptionType) return "Free";

  // 6. If we have a tier name that didn't match known patterns, return it title-cased
  if (tierName) {
    return tierName.charAt(0).toUpperCase() + tierName.slice(1).toLowerCase();
  }

  return "Free";
}

/**
 * Proactive credit balance probe for Antigravity.
 *
 * Fires a minimal streamGenerateContent request with GOOGLE_ONE_AI credits enabled
 * and maxOutputTokens=1 to extract the `remainingCredits` field from the SSE stream.
 * This uses ~1 credit but lets us show the balance on the dashboard without waiting
 * for a real user request.
 *
 * Returns the credit balance, or null if the probe failed.
 */
async function probeAntigravityCreditBalance(
  accessToken: string,
  accountId: string,
  projectId?: string | null,
  options: AntigravityUsageOptions = {}
): Promise<number | null> {
  if (!accessToken) return null;

  const cacheKey = buildAntigravityUsageCacheKey(accessToken, projectId || accountId);
  const cached = _antigravityCreditProbeCache.get(cacheKey);
  if (
    !options.forceRefresh &&
    cached &&
    Date.now() - cached.fetchedAt < ANTIGRAVITY_CREDIT_PROBE_TTL_MS
  ) {
    return cached.data;
  }

  const inflight = _antigravityCreditProbeInflight.get(cacheKey);
  if (inflight) return inflight;

  const promise = probeAntigravityCreditBalanceUncached(accessToken, accountId, projectId)
    .then(
      (data) => {
        _antigravityCreditProbeCache.set(cacheKey, { data, fetchedAt: Date.now() });
        return data;
      },
      (error) => {
        _antigravityCreditProbeCache.set(cacheKey, { data: null, fetchedAt: Date.now() });
        throw error;
      }
    )
    .finally(() => {
      _antigravityCreditProbeInflight.delete(cacheKey);
    });

  _antigravityCreditProbeInflight.set(cacheKey, promise);
  return promise;
}

async function probeAntigravityCreditBalanceUncached(
  accessToken: string,
  accountId: string,
  projectId?: string | null
): Promise<number | null> {
  try {
    if (!projectId) return null;

    // Try all base URLs (some accounts only work with specific endpoints)
    for (const baseUrl of ANTIGRAVITY_BASE_URLS) {
      const url = `${baseUrl}/v1internal:streamGenerateContent?alt=sse`;

      const sessionId = getAntigravitySessionId({ connectionId: accountId, projectId });
      const body = {
        project: projectId,
        model: "gemini-2-flash",
        userAgent: "antigravity",
        requestType: "agent",
        requestId: generateAntigravityRequestId(),
        enabledCreditTypes: ["GOOGLE_ONE_AI"],
        request: {
          model: "gemini-2-flash",
          contents: [{ role: "user", parts: [{ text: "hi" }] }],
          generationConfig: { maxOutputTokens: 1 },
          sessionId,
        },
      };

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "User-Agent": antigravityUserAgent(),
        "x-client-name": "antigravity",
        "x-client-version": getCachedAntigravityVersion(),
        "x-machine-id": deriveAntigravityMachineId({ connectionId: accountId, projectId }),
        "x-vscode-sessionid": getAntigravityVscodeSessionId(),
        "x-goog-user-project": projectId,
        Accept: "text/event-stream",
      };

      try {
        const res = await fetch(url, {
          method: "POST",
          headers,
          body: JSON.stringify(body),
          signal: AbortSignal.timeout(10_000),
        });

        if (!res.ok) continue;

        // Read the full SSE response and scan for remainingCredits
        const rawSSE = await res.text();
        const lines = rawSSE.split("\n");

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue;
          const payload = trimmed.slice(5).trim();
          if (payload === "[DONE]") break;
          try {
            const parsed = JSON.parse(payload);
            if (Array.isArray(parsed?.remainingCredits)) {
              const googleCredit = parsed.remainingCredits.find(
                (c: { creditType?: string }) => c?.creditType === "GOOGLE_ONE_AI"
              );
              if (googleCredit) {
                const balance = parseInt(googleCredit.creditAmount, 10);
                if (!isNaN(balance)) {
                  updateAntigravityRemainingCredits(accountId, balance);
                  return balance;
                }
              }
            }
          } catch {
            // Skip malformed SSE lines
          }
        }
      } catch {
        // Individual endpoint failure; try next
      }
    }

    return null;
  } catch {
    // Probe is best-effort — don't let it break the usage fetch
    return null;
  }
}

/**
 * Antigravity Usage - Fetch quota from Google Cloud Code API
 * Uses fetchAvailableModels API which returns ALL models (including Claude)
 * with per-model quotaInfo (remainingFraction, resetTime).
 * retrieveUserQuota only returns Gemini models — not suitable for Antigravity.
 */
async function getAntigravityUsage(
  accessToken?: string,
  providerSpecificData?: JsonRecord,
  connectionProjectId?: string,
  connectionId?: string,
  options: AntigravityUsageOptions = {}
) {
  void providerSpecificData;
  if (!accessToken) {
    return { plan: "Free", message: "Antigravity access token not available." };
  }

  try {
    const subscriptionInfo = await getAntigravitySubscriptionInfoCached(accessToken);
    const projectId =
      connectionProjectId || toRecord(subscriptionInfo).cloudaicompanionProject?.toString() || null;

    // Derive accountId for credit balance cache.
    // Must match executor key: credentials.connectionId
    const accountId: string = connectionId || "unknown";

    // Read cached credit balance (hydrated from DB on first access)
    let creditBalance = getAntigravityRemainingCredits(accountId);

    // If no cached balance and credits mode is enabled, fire a minimal probe
    const creditsMode = getCreditsMode();
    if ((options.forceRefresh || creditBalance === null) && creditsMode !== "off") {
      creditBalance = await probeAntigravityCreditBalance(
        accessToken,
        accountId,
        projectId,
        options
      );
    }

    const data = await fetchAntigravityAvailableModelsCached(accessToken, projectId, options);
    const dataObj = toRecord(data);
    if (dataObj.__antigravityForbidden === true) {
      return { message: "Antigravity access forbidden. Check subscription." };
    }
    const modelEntries = toRecord(dataObj.models);
    const quotas: Record<string, UsageQuota> = {};

    // Parse per-model quota info from fetchAvailableModels response.
    for (const [modelKey, infoValue] of Object.entries(modelEntries)) {
      const info = toRecord(infoValue);
      const quotaInfo = toRecord(info.quotaInfo);

      // Skip internal, excluded, and models without quota info
      if (
        info.isInternal === true ||
        !isUserCallableAntigravityModelId(modelKey) ||
        Object.keys(quotaInfo).length === 0
      ) {
        continue;
      }

      const rawFraction = toNumber(quotaInfo.remainingFraction, -1);
      const resetAt = parseResetTime(quotaInfo.resetTime);
      // Default to 100% when the API doesn't report a fraction
      const remainingFraction = rawFraction < 0 ? 1 : rawFraction;
      // Models with no resetTime and full remaining are unlimited (e.g. tab-completion models)
      const isUnlimited = !resetAt && remainingFraction >= 1;
      const remainingPercentage = remainingFraction * 100;
      const QUOTA_NORMALIZED_BASE = 1000;
      const total = QUOTA_NORMALIZED_BASE;
      const remaining = Math.round(total * remainingFraction);
      const used = isUnlimited ? 0 : Math.max(0, total - remaining);

      quotas[modelKey] = {
        used,
        total: isUnlimited ? 0 : total,
        resetAt,
        remainingPercentage: isUnlimited ? 100 : remainingPercentage,
        unlimited: isUnlimited,
      };
    }

    return {
      plan: getAntigravityPlanLabel(subscriptionInfo),
      quotas: {
        ...quotas,
        ...(creditBalance !== null && {
          credits: {
            used: 0,
            total: 0,
            remaining: creditBalance,
            unlimited: false,
            resetAt: null,
          },
        }),
      },
      subscriptionInfo,
    };
  } catch (error) {
    return { message: `Antigravity error: ${(error as Error).message}` };
  }
}

/**
 * Get Antigravity subscription info (cached, 5 min TTL)
 * Prevents duplicate loadCodeAssist calls within the same quota cycle.
 */
async function getAntigravitySubscriptionInfoCached(accessToken: string): Promise<unknown> {
  const cacheKey = accessToken.substring(0, 16);
  const cached = _antigravitySubCache.get(cacheKey);

  if (cached && Date.now() - cached.fetchedAt < ANTIGRAVITY_CACHE_TTL_MS) {
    return cached.data;
  }

  const data = await getAntigravitySubscriptionInfo(accessToken);
  _antigravitySubCache.set(cacheKey, { data, fetchedAt: Date.now() });
  return data;
}

/**
 * Get Antigravity subscription info using correct Antigravity headers.
 * Must match the headers used in providers.js postExchange (not CLI headers).
 */
async function getAntigravitySubscriptionInfo(accessToken: string): Promise<unknown | null> {
  try {
    const response = await fetch(ANTIGRAVITY_CONFIG.loadProjectApiUrl, {
      method: "POST",
      headers: getAntigravityHeaders("loadCodeAssist", accessToken),
      body: JSON.stringify({ metadata: getAntigravityLoadCodeAssistMetadata() }),
    });

    if (!response.ok) return null;

    return await response.json();
  } catch {
    return null;
  }
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

      // Try to extract plan tier from the OAuth response
      const planRaw =
        typeof data.tier === "string"
          ? data.tier
          : typeof data.plan === "string"
            ? data.plan
            : typeof data.subscription_type === "string"
              ? data.subscription_type
              : null;

      return {
        plan: planRaw || "Claude Code",
        quotas,
        extraUsage: data.extra_usage ?? null,
        bootstrap: await bootstrapPromise,
      };
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

/**
 * Kiro (AWS CodeWhisperer) Usage
 */
async function getKiroUsage(accessToken?: string, providerSpecificData?: JsonRecord) {
  try {
    const profileArn = providerSpecificData?.profileArn;
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

    // Parse usage data from usageBreakdownList
    const usageList = Array.isArray(data.usageBreakdownList) ? data.usageBreakdownList : [];
    const quotaInfo: Record<string, UsageQuota> = {};

    // Parse reset time - supports multiple formats (nextDateReset, resetDate, etc.)
    const resetAt = parseResetTime(data.nextDateReset || data.resetDate);

    usageList.forEach((breakdownValue: unknown) => {
      const breakdown = toRecord(breakdownValue);
      const resourceType =
        typeof breakdown.resourceType === "string"
          ? breakdown.resourceType.toLowerCase()
          : "unknown";
      const used = toNumber(breakdown.currentUsageWithPrecision, 0);
      const total = toNumber(breakdown.usageLimitWithPrecision, 0);

      quotaInfo[resourceType] = {
        used,
        total,
        remaining: total - used,
        resetAt,
        unlimited: false,
      };

      // Add free trial if available
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

    return {
      plan: String(toRecord(data.subscriptionInfo).subscriptionTitle || "").trim() || "Kiro",
      quotas: quotaInfo,
    };
  } catch (error) {
    throw new Error(`Failed to fetch Kiro usage: ${error.message}`);
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
async function getKimiUsage(accessToken?: string) {
  // Generate device info for headers (same as OAuth flow)
  const deviceId = "kimi-usage-" + Date.now();
  const platform = "omniroute";
  const version = "2.1.2";
  const deviceModel =
    typeof process !== "undefined" ? `${process.platform} ${process.arch}` : "unknown";

  try {
    const response = await fetch(KIMI_CONFIG.usageUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "X-Msh-Platform": platform,
        "X-Msh-Version": version,
        "X-Msh-Device-Model": deviceModel,
        "X-Msh-Device-Id": deviceId,
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
  getGeminiCliPlanLabel,
  getAntigravityPlanLabel,
};
