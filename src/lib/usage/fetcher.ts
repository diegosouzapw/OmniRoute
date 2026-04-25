/**
 * Usage Fetcher - Get usage data from provider APIs
 */

import { GEMINI_CONFIG } from "@/lib/oauth/constants/oauth";
import {
  getGitHubCopilotInternalUserHeaders,
  getKiroServiceHeaders,
} from "@omniroute/open-sse/config/providerHeaderProfiles.ts";
import {
  getAntigravityHeaders,
  antigravityUserAgent,
  googApiClientHeader,
} from "@omniroute/open-sse/services/antigravityHeaders.ts";
import {
  getAntigravityFetchAvailableModelsUrls,
  ANTIGRAVITY_BASE_URLS,
} from "@omniroute/open-sse/config/antigravityUpstream.ts";
import {
  getAntigravityRemainingCredits,
  updateAntigravityRemainingCredits,
} from "@omniroute/open-sse/executors/antigravity.ts";
import { getCreditsMode } from "@omniroute/open-sse/services/antigravityCredits.ts";

/**
 * Get usage data for a provider connection
 * @param {Object} connection - Provider connection with accessToken
 * @returns {Object} Usage data with quotas
 */
export async function getUsageForProvider(connection) {
  const { provider, accessToken, providerSpecificData } = connection;

  switch (provider) {
    case "github":
      return await getGitHubUsage(accessToken, providerSpecificData);
    case "gemini-cli":
      return await getGeminiUsage(accessToken);
    case "antigravity":
      return await getAntigravityUsage(
        accessToken,
        providerSpecificData,
        connection.projectId,
        connection.id
      );
    case "claude":
      return await getClaudeUsage(accessToken);
    case "codex":
      return await getCodexUsage(accessToken, providerSpecificData);
    case "qwen":
      return await getQwenUsage(accessToken, providerSpecificData);
    case "qoder":
      return await getQoderUsage(accessToken);
    case "kiro":
    case "amazon-q":
      return await getKiroUsage(accessToken);
    default:
      return { message: `Usage API not implemented for ${provider}` };
  }
}

/**
 * GitHub Copilot Usage
 */
async function getGitHubUsage(accessToken, providerSpecificData) {
  try {
    // Use copilotToken for copilot_internal API, not GitHub OAuth accessToken
    const copilotToken = providerSpecificData?.copilotToken;
    if (!copilotToken) {
      throw new Error("Copilot token not found. Please refresh token first.");
    }

    const response = await fetch("https://api.github.com/copilot_internal/user", {
      headers: getGitHubCopilotInternalUserHeaders(`Bearer ${copilotToken}`),
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
      return {
        plan: data.copilot_plan,
        resetDate: data.quota_reset_date,
        quotas: {
          chat: formatGitHubQuotaSnapshot(snapshots.chat),
          completions: formatGitHubQuotaSnapshot(snapshots.completions),
          premium_interactions: formatGitHubQuotaSnapshot(snapshots.premium_interactions),
        },
      };
    } else if (data.monthly_quotas || data.limited_user_quotas) {
      // Free/limited plan format
      const monthlyQuotas = data.monthly_quotas || {};
      const usedQuotas = data.limited_user_quotas || {};

      return {
        plan: data.copilot_plan || data.access_type_sku,
        resetDate: data.limited_user_reset_date,
        quotas: {
          chat: {
            used: usedQuotas.chat || 0,
            total: monthlyQuotas.chat || 0,
            unlimited: false,
          },
          completions: {
            used: usedQuotas.completions || 0,
            total: monthlyQuotas.completions || 0,
            unlimited: false,
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
  projectId?: string | null
): Promise<number | null> {
  try {
    if (!projectId) return null; // Can't call streamGenerateContent without a projectId

    const baseUrl = ANTIGRAVITY_BASE_URLS[0];
    const url = `${baseUrl}/v1internal:streamGenerateContent?alt=sse`;

    const body = {
      project: projectId,
      model: "gemini-2-flash",
      userAgent: "antigravity",
      requestType: "agent",
      requestId: `credits-probe-${Date.now()}`,
      enabledCreditTypes: ["GOOGLE_ONE_AI"],
      request: {
        model: "gemini-2-flash",
        contents: [{ role: "user", parts: [{ text: "hi" }] }],
        generationConfig: { maxOutputTokens: 1 },
      },
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "User-Agent": antigravityUserAgent(),
      "X-Goog-Api-Client": googApiClientHeader(),
      Accept: "text/event-stream",
    };

    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) return null;

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
              // Cache the balance for future reads (also persists to DB)
              updateAntigravityRemainingCredits(accountId, balance);
              return balance;
            }
          }
        }
      } catch {
        // Skip malformed SSE lines
      }
    }

    return null;
  } catch {
    // Probe is best-effort — don't let it break the usage fetch
    return null;
  }
}

/**
 * Antigravity Usage
 * Calls fetchAvailableModels to get per-model quota fractions.
 * Credit balance (GOOGLE_ONE_AI) is read from the executor's in-memory cache,
 * which is populated automatically after each successful credit-injected SSE call.
 * If the cache is empty and credits mode is enabled, fires a minimal probe request
 * to fetch the balance proactively.
 */
async function getAntigravityUsage(
  accessToken: string,
  providerSpecificData: Record<string, unknown> = {},
  projectId?: string | null,
  connectionId?: string | null
) {
  try {
    // Use connectionId as the cache key — matches executor's credentials.connectionId
    const accountId: string = connectionId || "unknown";

    // Read cached credit balance from executor module (populated from SSE remainingCredits)
    let creditBalance = getAntigravityRemainingCredits(accountId);

    // If no cached balance and credits mode is enabled, fire a minimal probe
    const creditsMode = getCreditsMode();
    if (creditBalance === null && creditsMode !== "off") {
      creditBalance = await probeAntigravityCreditBalance(accessToken, accountId, projectId);
    }

    // fetchAvailableModels — resolves project from token, no projectId needed
    let res: Response | null = null;
    let lastError: Error | null = null;

    for (const endpoint of getAntigravityFetchAvailableModelsUrls()) {
      try {
        res = await fetch(endpoint, {
          method: "POST",
          headers: getAntigravityHeaders("fetchAvailableModels", accessToken),
          body: JSON.stringify({}),
          signal: AbortSignal.timeout(15_000),
        });

        if (res.ok || res.status === 401 || res.status === 403) {
          break;
        }
      } catch (error) {
        lastError = error as Error;
      }
    }

    if (!res) {
      throw lastError || new Error("Antigravity API unavailable");
    }

    if (!res.ok) {
      return {
        plan: "Antigravity",
        message: "Antigravity connected. Unable to fetch model quotas.",
        ...(creditBalance !== null && {
          quotas: {
            credits: {
              used: 0,
              total: 0,
              remaining: creditBalance,
              unlimited: false,
              resetAt: null,
            },
          },
        }),
      };
    }

    const data = await res.json();
    const models: Record<string, unknown> = data?.models ?? {};

    // Walk quota-based models (those with remainingFraction in quotaInfo)
    let quotaModelsTotal = 0;
    let quotaModelsAvailable = 0;
    const modelQuotas: Record<
      string,
      { remaining: number; resetAt: string | null; limited: boolean }
    > = {};

    for (const [modelId, rawInfo] of Object.entries(models)) {
      const info = rawInfo as Record<string, unknown>;
      if (info.isInternal) continue;
      const quotaInfo = (info.quotaInfo as Record<string, unknown>) ?? {};

      if ("remainingFraction" in quotaInfo) {
        const fraction =
          typeof quotaInfo.remainingFraction === "number" ? quotaInfo.remainingFraction : 1;
        const resetTime = typeof quotaInfo.resetTime === "string" ? quotaInfo.resetTime : null;
        modelQuotas[modelId] = {
          remaining: Math.round(fraction * 100),
          resetAt: resetTime,
          limited: fraction <= 0,
        };
        quotaModelsTotal++;
        if (fraction > 0) quotaModelsAvailable++;
      }
      // Credit-based models have no remainingFraction — their availability is
      // tracked via the GOOGLE_ONE_AI credit balance cached from SSE responses.
    }

    const allLimited = quotaModelsTotal > 0 && quotaModelsAvailable === 0;

    return {
      plan: "Antigravity",
      quotas: {
        models: {
          used: quotaModelsTotal - quotaModelsAvailable,
          total: quotaModelsTotal,
          remaining: quotaModelsAvailable,
          limited: allLimited,
          unlimited: false,
          resetAt: null,
        },
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
      modelQuotas,
      limitReached: allLimited,
    };
  } catch (error) {
    return { message: `Unable to fetch Antigravity usage: ${(error as Error).message}` };
  }
}

/**
 * Claude Usage (legacy fallback)
 * Real Claude OAuth quota windows are fetched in @omniroute/open-sse/services/usage.ts.
 */
async function getClaudeUsage(accessToken?: string) {
  try {
    return {
      message:
        "Claude connected. Detailed quota windows are handled by the open-sse usage service.",
    };
  } catch (error) {
    return { message: "Unable to fetch Claude usage." };
  }
}

/**
 * Codex (OpenAI) Usage
 * Note: Actual quota tracking is handled by open-sse/services/usage.ts
 * This fallback returns a message directing users to the dashboard.
 */
async function getCodexUsage(accessToken, providerSpecificData: Record<string, any> = {}) {
  try {
    // Check if workspace is bound
    const workspaceId = providerSpecificData?.workspaceId;
    if (workspaceId) {
      return {
        message: `Codex connected (workspace: ${workspaceId.slice(0, 8)}...). Check dashboard for quota.`,
      };
    }
    return { message: "Codex connected. Check OpenAI dashboard for usage." };
  } catch (error) {
    return { message: "Unable to fetch Codex usage." };
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
async function getQoderUsage(accessToken) {
  try {
    // Qoder may have usage endpoint
    return { message: "Qoder connected. Usage tracked per request." };
  } catch (error) {
    return { message: "Unable to fetch Qoder usage." };
  }
}

/**
 * Kiro Credits
 * Fetches credit balance from Kiro's AWS CodeWhisperer backend.
 * The endpoint mirrors what Kiro IDE uses internally for the credit badge.
 */
async function getKiroUsage(accessToken: string) {
  try {
    const response = await fetch("https://codewhisperer.us-east-1.amazonaws.com/getUserCredits", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...getKiroServiceHeaders("application/json"),
      },
    });

    if (!response.ok) {
      const errText = await response.text();
      // 401/403 = expired token, show user-friendly message
      if (response.status === 401 || response.status === 403) {
        return { message: "Kiro token expired. Please reconnect in Dashboard → Providers → Kiro." };
      }
      throw new Error(`Kiro credits API error (${response.status}): ${errText}`);
    }

    const data = await response.json();

    // Response shape: { remainingCredits, totalCredits, resetDate, subscriptionType }
    const remaining = data.remainingCredits ?? data.remaining_credits ?? null;
    const total = data.totalCredits ?? data.total_credits ?? null;
    const resetDate = data.resetDate ?? data.reset_date ?? null;
    const plan = data.subscriptionType ?? data.subscription_type ?? "unknown";

    if (remaining === null) {
      return { message: "Kiro connected. Credit data unavailable — check Kiro IDE for balance." };
    }

    return {
      plan,
      credits: {
        remaining,
        total: total ?? remaining,
        used: total != null ? total - remaining : 0,
        unlimited: total === null || total === 0,
        resetDate,
      },
    };
  } catch (error: any) {
    return { message: `Unable to fetch Kiro credits: ${error.message}` };
  }
}
