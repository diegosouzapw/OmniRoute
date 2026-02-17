/**
 * Usage Fetcher - Get usage data from provider APIs
 */

import { PROVIDERS } from "../config/constants.js";

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
  usageUrl: "https://api.anthropic.com/v1/organizations/{org_id}/usage",
  settingsUrl: "https://api.anthropic.com/v1/settings",
};

/**
 * Get usage data for a provider connection
 * @param {Object} connection - Provider connection with accessToken
 * @returns {Promise<any>} Usage data with quotas
 */
export async function getUsageForProvider(connection) {
  const { provider, accessToken, providerSpecificData } = connection;

  switch (provider) {
    case "github":
      return await getGitHubUsage(accessToken, providerSpecificData);
    case "gemini-cli":
      return await getGeminiUsage(accessToken);
    case "antigravity":
      return await getAntigravityUsage(accessToken, undefined);
    case "claude":
      return await getClaudeUsage(accessToken);
    case "codex":
      return await getCodexUsage(accessToken);
    case "kiro":
      return await getKiroUsage(accessToken, providerSpecificData);
    case "qwen":
      return await getQwenUsage(accessToken, providerSpecificData);
    case "iflow":
      return await getIflowUsage(accessToken);
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
    // If it's already a Date object
    if (resetValue instanceof Date) {
      return resetValue.toISOString();
    }

    // If it's a number (Unix timestamp in milliseconds)
    if (typeof resetValue === "number") {
      return new Date(resetValue).toISOString();
    }

    // If it's a string (ISO date or any parseable date string)
    if (typeof resetValue === "string") {
      return new Date(resetValue).toISOString();
    }

    return null;
  } catch (error) {
    console.warn(`Failed to parse reset time: ${resetValue}`, error);
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
      throw new Error(`GitHub API error: ${error}`);
    }

    const data = await response.json();

    // Handle different response formats (paid vs free)
    if (data.quota_snapshots) {
      // Paid plan format
      const snapshots = data.quota_snapshots;
      const resetAt = parseResetTime(data.quota_reset_date);

      return {
        plan: data.copilot_plan,
        resetDate: data.quota_reset_date,
        quotas: {
          chat: { ...formatGitHubQuotaSnapshot(snapshots.chat), resetAt },
          completions: { ...formatGitHubQuotaSnapshot(snapshots.completions), resetAt },
          premium_interactions: {
            ...formatGitHubQuotaSnapshot(snapshots.premium_interactions),
            resetAt,
          },
        },
      };
    } else if (data.monthly_quotas || data.limited_user_quotas) {
      // Free/limited plan format
      const monthlyQuotas = data.monthly_quotas || {};
      const usedQuotas = data.limited_user_quotas || {};
      const resetAt = parseResetTime(data.limited_user_reset_date);

      return {
        plan: data.copilot_plan || data.access_type_sku,
        resetDate: data.limited_user_reset_date,
        quotas: {
          chat: {
            used: usedQuotas.chat || 0,
            total: monthlyQuotas.chat || 0,
            unlimited: false,
            resetAt,
          },
          completions: {
            used: usedQuotas.completions || 0,
            total: monthlyQuotas.completions || 0,
            unlimited: false,
            resetAt,
          },
        },
      };
    }

    return { message: "GitHub Copilot connected. Unable to parse quota data." };
  } catch (error) {
    throw new Error(`Failed to fetch GitHub usage: ${error.message}`);
  }
}

function formatGitHubQuotaSnapshot(quota) {
  if (!quota) return { used: 0, total: 0, unlimited: true };

  return {
    used: quota.entitlement - quota.remaining,
    total: quota.entitlement,
    remaining: quota.remaining,
    unlimited: quota.unlimited || false,
  };
}

/**
 * Gemini CLI Usage (Google Cloud)
 */
async function getGeminiUsage(accessToken) {
  try {
    // Gemini CLI uses Google Cloud quotas
    // Try to get quota info from Cloud Resource Manager
    const response = await fetch(
      "https://cloudresourcemanager.googleapis.com/v1/projects?filter=lifecycleState:ACTIVE",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      // Quota API may not be accessible, return generic message
      return {
        message: "Gemini CLI uses Google Cloud quotas. Check Google Cloud Console for details.",
      };
    }

    return { message: "Gemini CLI connected. Usage tracked via Google Cloud Console." };
  } catch (error) {
    return { message: "Unable to fetch Gemini usage. Check Google Cloud Console." };
  }
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

  // 6. If we have a tier name that didn't match any pattern, return it title-cased
  if (tierName) {
    return tierName.charAt(0).toUpperCase() + tierName.slice(1).toLowerCase();
  }

  return "Free";
}

/**
 * Antigravity Usage - Fetch quota from Google Cloud Code API
 * Now calls loadCodeAssist ONCE (cached) and reuses for projectId + plan.
 */
async function getAntigravityUsage(accessToken, providerSpecificData) {
  try {
    // Single cached call for subscription info (provides both projectId and plan)
    const subscriptionInfo = await getAntigravitySubscriptionInfoCached(accessToken);
    const projectId = subscriptionInfo?.cloudaicompanionProject || null;

    // Fetch quota data
    const response = await fetch(ANTIGRAVITY_CONFIG.quotaApiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "User-Agent": ANTIGRAVITY_CONFIG.userAgent,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectId ? { project: projectId } : {}),
    });

    if (response.status === 403) {
      return { message: "Antigravity access forbidden. Check subscription." };
    }

    if (!response.ok) {
      throw new Error(`Antigravity API error: ${response.status}`);
    }

    const data = await response.json();
    const quotas: Record<string, any> = {};

    // Parse model quotas (inspired by vscode-antigravity-cockpit)
    if (data.models) {
      // Filter only recommended/important models (must match PROVIDER_MODELS ag ids)
      const importantModels = [
        "claude-opus-4-6-thinking",
        "claude-opus-4-5-thinking",
        "claude-opus-4-5",
        "claude-sonnet-4-5-thinking",
        "claude-sonnet-4-5",
        "gemini-3-pro-high",
        "gemini-3-pro-low",
        "gemini-3-flash",
        "gemini-2.5-flash",
      ];

      for (const [modelKey, info] of Object.entries(data.models) as [string, any][]) {
        // Skip models without quota info
        if (!info.quotaInfo) {
          continue;
        }

        // Skip internal models and non-important models
        if (info.isInternal || !importantModels.includes(modelKey)) {
          continue;
        }

        const remainingFraction = info.quotaInfo.remainingFraction || 0;
        const remainingPercentage = remainingFraction * 100;

        // Convert percentage to used/total for UI compatibility
        // QUOTA_NORMALIZED_BASE is an arbitrary base for converting fractions
        // to integer used/total pairs that the dashboard UI can display as bars.
        const QUOTA_NORMALIZED_BASE = 1000;
        const total = QUOTA_NORMALIZED_BASE;
        const remaining = Math.round(total * remainingFraction);
        const used = total - remaining;

        // Use modelKey as key (matches PROVIDER_MODELS id)
        quotas[modelKey] = {
          used,
          total,
          resetAt: parseResetTime(info.quotaInfo.resetTime),
          remainingPercentage,
          unlimited: false,
          displayName: info.displayName || modelKey,
        };
      }
    }

    return {
      plan: getAntigravityPlanLabel(subscriptionInfo),
      quotas,
      subscriptionInfo,
    };
  } catch (error) {
    return { message: `Antigravity error: ${error.message}` };
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
    // Try to get organization/account settings first
    const settingsResponse = await fetch("https://api.anthropic.com/v1/settings", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "anthropic-version": "2023-06-01",
      },
    });

    if (settingsResponse.ok) {
      const settings = await settingsResponse.json();

      // Try usage endpoint if we have org info
      if (settings.organization_id) {
        const usageResponse = await fetch(
          `https://api.anthropic.com/v1/organizations/${settings.organization_id}/usage`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
              "anthropic-version": "2023-06-01",
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

    // If settings API fails, OAuth token may not have required scope
    return { message: "Claude connected. Usage API requires admin permissions." };
  } catch (error) {
    return { message: `Claude connected. Unable to fetch usage: ${error.message}` };
  }
}

/**
 * Codex (OpenAI) Usage - Fetch from ChatGPT backend API
 */
async function getCodexUsage(accessToken) {
  try {
    const response = await fetch(CODEX_CONFIG.usageUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Codex API error: ${response.status}`);
    }

    const data = await response.json();

    // Parse rate limit info
    const rateLimit = data.rate_limit || {};
    const primaryWindow = rateLimit.primary_window || {};
    const secondaryWindow = rateLimit.secondary_window || {};

    // Parse reset dates (reset_at is Unix timestamp in seconds, multiply by 1000 for ms)
    const sessionResetAt = parseResetTime(
      primaryWindow.reset_at ? primaryWindow.reset_at * 1000 : null
    );
    const weeklyResetAt = parseResetTime(
      secondaryWindow.reset_at ? secondaryWindow.reset_at * 1000 : null
    );

    return {
      plan: data.plan_type || "unknown",
      limitReached: rateLimit.limit_reached || false,
      quotas: {
        session: {
          used: primaryWindow.used_percent || 0,
          total: 100,
          remaining: 100 - (primaryWindow.used_percent || 0),
          resetAt: sessionResetAt,
          unlimited: false,
        },
        weekly: {
          used: secondaryWindow.used_percent || 0,
          total: 100,
          remaining: 100 - (secondaryWindow.used_percent || 0),
          resetAt: weeklyResetAt,
          unlimited: false,
        },
      },
    };
  } catch (error) {
    throw new Error(`Failed to fetch Codex usage: ${error.message}`);
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
 * iFlow Usage
 */
async function getIflowUsage(accessToken) {
  try {
    // iFlow may have usage endpoint
    return { message: "iFlow connected. Usage tracked per request." };
  } catch (error) {
    return { message: "Unable to fetch iFlow usage." };
  }
}
