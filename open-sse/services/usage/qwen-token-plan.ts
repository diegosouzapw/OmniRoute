/**
 * usage/qwen-token-plan.ts — Qwen Cloud / Alibaba Model Studio personal Token Plan
 * usage leaf (issue #9603).
 *
 * Delegates to qwenTokenPlanQuotaFetcher (cookie-authenticated console gateway) and
 * shapes the 5-hour / weekly sliding windows into the standard usage response. The
 * inference API key cannot read this quota — the connection needs a console session
 * cookie in providerSpecificData (qwenCloudCookie / alibabaConsoleCookie / cookie)
 * or the QWEN_CLOUD_COOKIE env var.
 */

import {
  fetchQwenTokenPlanQuota,
  resolveConsoleSite,
  QWEN_TOKEN_PLAN_WINDOW_5H,
  QWEN_TOKEN_PLAN_WINDOW_WEEKLY,
  type QwenTokenPlanQuota,
} from "../qwenTokenPlanQuotaFetcher.ts";
import type { UsageQuota } from "./quota.ts";

function windowToQuota(
  window: { percentUsed: number; resetAt: string | null } | undefined,
  totalCredits: number | null,
  displayName: string
): UsageQuota | null {
  if (!window) return null;
  const total = totalCredits ?? 100;
  const used = Math.round(window.percentUsed * total);
  const remaining = Math.max(0, total - used);
  return {
    used,
    total,
    remaining,
    remainingPercentage: Math.round((1 - window.percentUsed) * 1000) / 10,
    resetAt: window.resetAt,
    unlimited: false,
    displayName,
  };
}

/**
 * Qwen Cloud personal Token Plan usage (5-hour + weekly sliding windows).
 */
export async function getQwenTokenPlanUsage(
  connectionId: string,
  apiKey: string,
  providerSpecificData?: Record<string, unknown>,
  provider = "qwen-cloud-token-plan"
) {
  try {
    const quota = await fetchQwenTokenPlanQuota(connectionId, {
      apiKey,
      providerSpecificData,
      provider,
    });

    if (!quota) {
      // The same plan is sold through two consoles with different portals, gateway
      // hosts and login tickets — instructions for the wrong console produce a cookie
      // the gateway rejects (console mismatch → NotLogined). With no cookie stored the
      // console is inferred from the provider id, same rule the fetcher applies.
      const site = resolveConsoleSite("", provider);
      const guide =
        site.consoleSite === "ALIYUN"
          ? "Get it at modelstudio.console.alibabacloud.com (logged in): F12 › Network, " +
            "reload, filter by api.json, click a request to " +
            "bailian-singapore-cs.alibabacloud.com and copy the whole Cookie value from " +
            "Request Headers (it contains login_aliyunid_ticket)."
          : "Get it at home.qwencloud.com › Billing › Subscription (logged in): F12 › " +
            "Network, reload, filter by api.json, click a request to " +
            "cs-data.qwencloud.com and copy the whole Cookie value from Request Headers " +
            "(it contains login_qwencloud_ticket).";
      const brand = site.consoleSite === "ALIYUN" ? "Alibaba" : "Qwen";
      return {
        message:
          `${brand} Token Plan connected. Quota needs a console session cookie — the ` +
          `inference API key cannot read it. ${guide} Paste it into the connection's ` +
          "'Qwen / Model Studio console cookie' field, or set QWEN_CLOUD_COOKIE. " +
          "The cookie expires with the browser session — re-paste it when this message returns.",
      };
    }

    const tokenPlanQuota = quota as QwenTokenPlanQuota;
    const quotas: Record<string, UsageQuota> = {};

    const fiveHour = windowToQuota(
      tokenPlanQuota.windows[QWEN_TOKEN_PLAN_WINDOW_5H],
      tokenPlanQuota.tierLimits.fiveHour,
      "5-hour window"
    );
    if (fiveHour) quotas.five_hour = fiveHour;

    const weekly = windowToQuota(
      tokenPlanQuota.windows[QWEN_TOKEN_PLAN_WINDOW_WEEKLY],
      tokenPlanQuota.tierLimits.weekly,
      "Weekly window"
    );
    if (weekly) quotas.weekly = weekly;

    const specCode = tokenPlanQuota.specCode;
    const brand = tokenPlanQuota.consoleSite === "ALIYUN" ? "Alibaba" : "Qwen";
    const plan = specCode
      ? `${brand} Token Plan (${specCode.charAt(0).toUpperCase()}${specCode.slice(1)})`
      : `${brand} Token Plan`;

    return { plan, quotas };
  } catch (error) {
    return { message: `Qwen Token Plan error: ${(error as Error).message}` };
  }
}
