/**
 * Usage Fetcher - Get usage data from provider APIs
 */

import { PROVIDERS } from "../config/constants.ts";
import { safePercentage } from "@/shared/utils/formatting";

// GitHub API config
const GITHUB_CONFIG = {
  apiVersion: "2022-11-28",
  userAgent: "GitHubCopilotChat/0.26.7",
};

// Antigravity API config (credentials from PROVIDERS via credential loader)
const ANTIGRAVITY_CONFIG = {
  quotaApiUrl: "https://cloudcode-pa.googleapis.com/v1internal:fetchAvailableModels",
  loadProjectApiUrl: "https://cloudcode-pa.googleapis.com/v1internal:loadCodeAssist",
  tokenUrl: "https://oauth2.googleapis.com/token",
  get clientId() {
    return PROVIDERS.antigravity.clientId;
  },
  get clientSecret() {
    return PROVIDERS.antigravity.clientSecret;
  },
  userAgent: "antigravity/1.11.3 Darwin/arm64",
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

type JsonRecord = Record<string, unknown>;
type UsageQuota = {
  used: number;
  total: number;
  remaining?: number;
  remainingPercentage?: number;
  resetAt: string | null;
  unlimited: boolean;
  displayName?: string;
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

// GLM (Z.AI) quota API config
const GLM_QUOTA_URLS: Record<string, string> = {
  international: "https://api.z.ai/api/monitor/usage/quota/limit",
  china: "https://open.bigmodel.cn/api/monitor/usage/quota/limit",
};

async function getGlmUsage(apiKey: string, providerSpecificData?: Record<string, unknown>) {
  const region = providerSpecificData?.apiRegion || "international";
  const quotaUrl = GLM_QUOTA_URLS[region] || GLM_QUOTA_URLS.international;

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
  const data = toRecord(json.data);
  const limits: unknown[] = Array.isArray(data.limits) ? data.limits : [];
  const quotas: Record<string, UsageQuota> = {};

  for (const limit of limits) {
    const src = toRecord(limit);
    if (src.type !== "TOKENS_LIMIT") continue;

    const usedPercent = toNumber(src.percentage, 0);
    const resetMs = toNumber(src.nextResetTime, 0);
    const remaining = Math.max(0, 100 - usedPercent);

    quotas["session"] = {
      used: usedPercent,
      total: 100,
      remaining,
      remainingPercentage: remaining,
      resetAt: resetMs > 0 ? new Date(resetMs).toISOString() : null,
      unlimited: false,
    };
  }

  const levelRaw = typeof data.level === "string" ? data.level : "";
  const plan = levelRaw
    ? levelRaw.charAt(0).toUpperCase() + levelRaw.slice(1).toLowerCase()
    : "Unknown";

  return { plan, quotas };
}

/**
 * Get usage data for a provider connection
 * @param {Object} connection - Provider connection with accessToken
 * @returns {Promise<unknown>} Usage data with quotas
 */
export async function getUsageForProvider(connection) {
  const { provider, accessToken, apiKey, providerSpecificData, projectId } = connection;

  switch (provider) {
    case "github":
      return await getGitHubUsage(accessToken, providerSpecificData);
    case "gemini-cli":
      return await getGeminiUsage(accessToken, providerSpecificData, projectId);
    case "antigravity":
      return await getAntigravityUsage(accessToken, undefined);
    case "claude":
      return await getClaudeUsage(accessToken);
    case "codex":
      return await getCodexUsage(accessToken, providerSpecificData);
    case "kiro":
      return await getKiroUsage(accessToken, providerSpecificData);
    case "kimi-coding":
      return await getKimiUsage(accessToken);
    case "qwen":
      return await getQwenUsage(accessToken, providerSpecificData);
    case "qoder":
      return await getIflowUsage(accessToken);
    case "glm":
      return await getGlmUsage(apiKey, providerSpecificData);
    default:
      return { message: `Usage API not implemented for ${provider}` };
  }
}

/**
 * Parse reset date/time to ISO string
 * Handles multiple formats: Unix timestamp (ms), ISO date string, etc.
 */
function parseResetTime(resetValue) {
  if (!resetValue) return null;

  try {
    let date;
    if (resetValue instanceof Date) {
      date = resetValue;
    } else if (typeof resetValue === "number") {
      date = new Date(resetValue);
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
async function getGitHubUsage(accessToken, providerSpecificData) {
  try {
    if (!accessToken) {
      throw new Error("No GitHub access token available. Please re-authorize the connection.");
    }

    // copilot_internal/user API requires GitHub OAuth token, not copilotToken
    const response = await fetch("https://api.github.com/copilot_internal/user", {
      headers: {
        Authorization: `token ${accessToken}`,
        Accept: "application/json",
        "X-GitHub-Api-Version": GITHUB_CONFIG.apiVersion,
        "User-Agent": GITHUB_CONFIG.userAgent,
        "Editor-Version": "vscode/1.100.0",
        "Editor-Plugin-Version": "copilot-chat/0.26.7",
      },
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

function formatGitHubQuotaSnapshot(quota, resetAt: string | null = null): UsageQuota | null {
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
const _geminiCliSubCache = new Map();
const GEMINI_CLI_CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Gemini CLI Usage — fetch per-model quota from Cloud Code Assist API.
 * Gemini CLI and Antigravity share the same upstream (cloudcode-pa.googleapis.com),
 * so this follows the same pattern as getAntigravityUsage().
 */
async function getGeminiUsage(accessToken, providerSpecificData?, connectionProjectId?) {
  if (!accessToken) {
    return { plan: "Free", message: "Gemini CLI access token not available." };
  }

  try {
    const subscriptionInfo = await getGeminiCliSubscriptionInfoCached(accessToken);
    const projectId =
      connectionProjectId ||
      providerSpecificData?.projectId ||
      subscriptionInfo?.cloudaicompanionProject ||
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

    if (Array.isArray(data.buckets)) {
      for (const bucket of data.buckets) {
        if (!bucket.modelId || bucket.remainingFraction == null) continue;

        const remainingFraction = toNumber(bucket.remainingFraction, 0);
        const remainingPercentage = remainingFraction * 100;
        const QUOTA_NORMALIZED_BASE = 1000;
        const total = QUOTA_NORMALIZED_BASE;
        const remaining = Math.round(total * remainingFraction);
        const used = Math.max(0, total - remaining);

        quotas[bucket.modelId] = {
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
async function getGeminiCliSubscriptionInfoCached(accessToken) {
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
async function getGeminiCliSubscriptionInfo(accessToken) {
  try {
    const response = await fetch("https://cloudcode-pa.googleapis.com/v1internal:loadCodeAssist", {
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
function getGeminiCliPlanLabel(subscriptionInfo) {
  if (!subscriptionInfo || Object.keys(subscriptionInfo).length === 0) return "Free";

  let tierId = "";
  if (Array.isArray(subscriptionInfo.allowedTiers)) {
    for (const tier of subscriptionInfo.allowedTiers) {
      if (tier.isDefault && tier.id) {
        tierId = tier.id.trim().toUpperCase();
        break;
      }
    }
  }

  if (!tierId) {
    tierId = (subscriptionInfo.currentTier?.id || "").toUpperCase();
  }

  if (tierId) {
    if (tierId.includes("ULTRA")) return "Ultra";
    if (tierId.includes("PRO")) return "Pro";
    if (tierId.includes("ENTERPRISE")) return "Enterprise";
    if (tierId.includes("BUSINESS") || tierId.includes("STANDARD")) return "Business";
    if (tierId.includes("FREE") || tierId.includes("INDIVIDUAL") || tierId.includes("LEGACY"))
      return "Free";
  }

  const tierName =
    subscriptionInfo.currentTier?.name ||
    subscriptionInfo.currentTier?.displayName ||
    subscriptionInfo.subscriptionType ||
    subscriptionInfo.tier ||
    "";
  const upper = tierName.toUpperCase();

  if (upper.includes("ULTRA")) return "Ultra";
  if (upper.includes("PRO")) return "Pro";
  if (upper.includes("ENTERPRISE")) return "Enterprise";
  if (upper.includes("STANDARD") || upper.includes("BUSINESS")) return "Business";
  if (upper.includes("INDIVIDUAL") || upper.includes("FREE")) return "Free";

  if (subscriptionInfo.currentTier?.upgradeSubscriptionType) return "Free";
  if (tierName) {
    return tierName.charAt(0).toUpperCase() + tierName.slice(1).toLowerCase();
  }

  return "Free";
}

// ── Antigravity subscription info cache ──────────────────────────────────────
// Prevents duplicate loadCodeAssist calls within the same quota cycle.
// Key: truncated accessToken → { data, fetchedAt }
const _antigravitySubCache = new Map();
const ANTIGRAVITY_CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Map raw loadCodeAssist tier data to short display labels.
 * Extracts tier from allowedTiers[].isDefault (same logic as providers.js postExchange).
 * Falls back to currentTier.id → currentTier.name → "Free".
 */
function getAntigravityPlanLabel(subscriptionInfo) {
  if (!subscriptionInfo || Object.keys(subscriptionInfo).length === 0) return "Free";

  // 1. Extract tier from allowedTiers (primary source — same as providers.js)
  let tierId = "";
  if (Array.isArray(subscriptionInfo.allowedTiers)) {
    for (const tier of subscriptionInfo.allowedTiers) {
      if (tier.isDefault && tier.id) {
        tierId = tier.id.trim().toUpperCase();
        break;
      }
    }
  }

  // 2. Fall back to currentTier.id
  if (!tierId) {
    tierId = (subscriptionInfo.currentTier?.id || "").toUpperCase();
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
  const tierName =
    subscriptionInfo.currentTier?.name ||
    subscriptionInfo.currentTier?.displayName ||
    subscriptionInfo.subscriptionType ||
    subscriptionInfo.tier ||
    "";
  const upper = tierName.toUpperCase();

  if (upper.includes("ULTRA")) return "Ultra";
  if (upper.includes("PRO")) return "Pro";
  if (upper.includes("ENTERPRISE")) return "Enterprise";
  if (upper.includes("STANDARD") || upper.includes("BUSINESS")) return "Business";
  if (upper.includes("INDIVIDUAL") || upper.includes("FREE")) return "Free";

  // 5. If upgradeSubscriptionType exists, account is on free tier
  if (subscriptionInfo.currentTier?.upgradeSubscriptionType) return "Free";

  // 6. If we have a tier name that didn't match known patterns, return it title-cased
  if (tierName) {
    return tierName.charAt(0).toUpperCase() + tierName.slice(1).toLowerCase();
  }

  return "Free";
}

/**
 * Antigravity Usage - Fetch quota from Google Cloud Code API
 * Uses fetchAvailableModels API which returns ALL models (including Claude)
 * with per-model quotaInfo (remainingFraction, resetTime).
 * retrieveUserQuota only returns Gemini models — not suitable for Antigravity.
 */
async function getAntigravityUsage(accessToken, providerSpecificData) {
  try {
    const subscriptionInfo = await getAntigravitySubscriptionInfoCached(accessToken);
    const projectId = subscriptionInfo?.cloudaicompanionProject || null;

    // Fetch model list with quota info from fetchAvailableModels
    const response = await fetch(ANTIGRAVITY_CONFIG.quotaApiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "User-Agent": ANTIGRAVITY_CONFIG.userAgent,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectId ? { project: projectId } : {}),
      signal: AbortSignal.timeout(10000),
    });

    if (response.status === 403) {
      return { message: "Antigravity access forbidden. Check subscription." };
    }

    if (!response.ok) {
      throw new Error(`Antigravity API error: ${response.status}`);
    }

    const data = await response.json();
    const dataObj = toRecord(data);
    const modelEntries = toRecord(dataObj.models);
    const quotas: Record<string, UsageQuota> = {};

    // Models excluded from quota display — internal/special-purpose models that
    // the Antigravity API returns quota for but are not user-callable via
    // generateContent.  Matches CLIProxyAPI's hardcoded exclusion list.
    const ANTIGRAVITY_EXCLUDED_MODELS = new Set([
      "chat_20706",
      "chat_23310",
      "tab_flash_lite_preview",
      "tab_jump_flash_lite_preview",
      "gemini-2.5-flash-thinking",
      "gemini-2.5-pro",                        // browser subagent model — not user-callable
      "gemini-2.5-flash",                      // internal — quota always exhausted on free tier
      "gemini-2.5-flash-lite",                 // internal — quota always exhausted on free tier
      "gemini-2.5-flash-preview-image-generation", // image-gen only, not usable for chat
      "gemini-3.1-flash-image-preview",        // image-gen preview, not usable for chat
      "gemini-3-flash-agent",                  // internal agent model — not user-callable
      "gemini-3.1-flash-lite",                 // not usable for chat
      "gemini-3-pro-low",                      // not usable for chat
      "gemini-3-pro-high",                     // not usable for chat
    ]);

    // Parse per-model quota info from fetchAvailableModels response.
    for (const [modelKey, infoValue] of Object.entries(modelEntries)) {
      const info = toRecord(infoValue);
      const quotaInfo = toRecord(info.quotaInfo);

      // Skip internal, excluded, and models without quota info
      if (info.isInternal === true || ANTIGRAVITY_EXCLUDED_MODELS.has(modelKey) || Object.keys(quotaInfo).length === 0) {
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
      quotas,
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
async function getAntigravitySubscriptionInfoCached(accessToken) {
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
async function getAntigravitySubscriptionInfo(accessToken) {
  try {
    const response = await fetch(ANTIGRAVITY_CONFIG.loadProjectApiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "User-Agent": "google-api-nodejs-client/9.15.1",
        "X-Goog-Api-Client": "google-cloud-sdk vscode_cloudshelleditor/0.1",
        "Client-Metadata": JSON.stringify({
          ideType: "IDE_UNSPECIFIED",
          platform: "PLATFORM_UNSPECIFIED",
          pluginType: "GEMINI",
        }),
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
 * Claude Usage - Try to fetch from Anthropic API
 */
async function getClaudeUsage(accessToken) {
  try {
    // Primary: Try OAuth usage endpoint (works with Claude Code consumer OAuth tokens)
    // Requires anthropic-beta: oauth-2025-04-20 header
    const oauthResponse = await fetch(CLAUDE_CONFIG.oauthUsageUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "anthropic-beta": "oauth-2025-04-20",
        "anthropic-version": CLAUDE_CONFIG.apiVersion,
      },
    });

    if (oauthResponse.ok) {
      const data = await oauthResponse.json();
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

      if (hasUtilization(data.five_hour)) {
        quotas["session (5h)"] = createQuotaObject(data.five_hour);
      }

      if (hasUtilization(data.seven_day)) {
        quotas["weekly (7d)"] = createQuotaObject(data.seven_day);
      }

      // Parse model-specific weekly windows (e.g., seven_day_sonnet, seven_day_opus)
      for (const [key, value] of Object.entries(data)) {
        const valueRecord = toRecord(value);
        if (key.startsWith("seven_day_") && key !== "seven_day" && hasUtilization(valueRecord)) {
          const modelName = key.replace("seven_day_", "");
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
      };
    }

    // Fallback: OAuth endpoint returned non-OK, try legacy settings/org endpoint
    console.warn(
      `[Claude Usage] OAuth endpoint returned ${oauthResponse.status}, falling back to legacy`
    );
    return await getClaudeUsageLegacy(accessToken);
  } catch (error) {
    return { message: `Claude connected. Unable to fetch usage: ${(error as Error).message}` };
  }
}

/**
 * Legacy Claude usage fetcher for API key / org admin users.
 * Uses /v1/settings + /v1/organizations/{org_id}/usage endpoints.
 */
async function getClaudeUsageLegacy(accessToken) {
  try {
    const settingsResponse = await fetch(CLAUDE_CONFIG.settingsUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "anthropic-version": CLAUDE_CONFIG.apiVersion,
      },
    });

    if (settingsResponse.ok) {
      const settings = await settingsResponse.json();

      if (settings.organization_id) {
        const usageResponse = await fetch(
          CLAUDE_CONFIG.usageUrl.replace("{org_id}", settings.organization_id),
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
async function getCodexUsage(accessToken, providerSpecificData: Record<string, unknown> = {}) {
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
async function getKiroUsage(accessToken, providerSpecificData) {
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

    const response = await fetch("https://codewhisperer.us-east-1.amazonaws.com", {
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

    const data = await response.json();

    // Parse usage data from usageBreakdownList
    const usageList = data.usageBreakdownList || [];
    const quotaInfo = {};

    // Parse reset time - supports multiple formats (nextDateReset, resetDate, etc.)
    const resetAt = parseResetTime(data.nextDateReset || data.resetDate);

    usageList.forEach((breakdown) => {
      const resourceType = breakdown.resourceType?.toLowerCase() || "unknown";
      const used = breakdown.currentUsageWithPrecision || 0;
      const total = breakdown.usageLimitWithPrecision || 0;

      quotaInfo[resourceType] = {
        used,
        total,
        remaining: total - used,
        resetAt,
        unlimited: false,
      };

      // Add free trial if available
      if (breakdown.freeTrialInfo) {
        const freeUsed = breakdown.freeTrialInfo.currentUsageWithPrecision || 0;
        const freeTotal = breakdown.freeTrialInfo.usageLimitWithPrecision || 0;

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
      plan: data.subscriptionInfo?.subscriptionTitle || "Kiro",
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
function getKimiPlanName(level) {
  if (!level) return "";

  const levelMap = {
    LEVEL_BASIC: "Moderato",
    LEVEL_INTERMEDIATE: "Allegretto",
    LEVEL_ADVANCED: "Allegro",
    LEVEL_STANDARD: "Vivace",
  };

  return levelMap[level] || level.replace("LEVEL_", "").toLowerCase();
}

/**
 * Kimi Coding Usage - Fetch quota from Kimi API
 * Uses the official /v1/usages endpoint with custom X-Msh-* headers
 */
async function getKimiUsage(accessToken) {
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
async function getQwenUsage(accessToken, providerSpecificData) {
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
async function getIflowUsage(accessToken) {
  try {
    // Qoder may have usage endpoint
    return { message: "Qoder connected. Usage tracked per request." };
  } catch (error) {
    return { message: "Unable to fetch Qoder usage." };
  }
}
