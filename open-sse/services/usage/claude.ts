/**
 * Usage Fetcher - Get usage data from provider APIs
 */

import { PROVIDERS } from "../../config/constants.ts";

import { safePercentage } from "@/shared/utils/formatting";

import { CLAUDE_CODE_VERSION, fetchClaudeBootstrap } from "../../executors/claudeIdentity.ts";

import { sanitizeErrorMessage } from "../../utils/error.ts";

import { CLAUDE_CONFIG } from "./constants.ts";
import { toRecord, parseResetTime } from "./utils.ts";
import { UsageQuota, JsonRecord } from "./types.ts";



export function getClaudePlanLabel(...candidates: Array<string | null | undefined>): string | null {
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



/**
 * Claude Usage - Try to fetch from Anthropic API
 */
export async function getClaudeUsage(accessToken?: string) {
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

