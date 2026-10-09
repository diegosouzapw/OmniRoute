/**
 * usage/clinepass.ts — ClinePass subscription quota fetcher.
 *
 * ClinePass meters usage against three rolling limits (5-hour, weekly, monthly). Cline
 * exposes them on the same account API its own clients use:
 *
 *   GET https://api.cline.bot/api/v1/users/me/plan/usage-limits
 *   → { success: true, data: { limits: [{ type: "five_hour", percentUsed: 3,
 *        resetsAt: "2026-10-03T11:00:10Z" }, { type: "weekly", … }, { type: "monthly", … }] } }
 *
 * Verified live against a ClinePass (Annual) OAuth account on 2026-10-03. Upstream only
 * reports percentages, so every window is rendered on a 0–100 scale. Window keys are the
 * canonical `session` / `weekly` / `monthly` names so the reset-aware / reset-window combo
 * strategies read them without a provider-specific mapping.
 */

import { getClineAuthorizationHeader } from "@/shared/utils/clineAuth";
import { toNumber, toRecord, clampPercentage } from "./scalars.ts";
import { parseResetTime, type UsageQuota } from "./quota.ts";

const CLINEPASS_USAGE_LIMITS_URL =
  process.env.OMNIROUTE_CLINEPASS_USAGE_URL ??
  "https://api.cline.bot/api/v1/users/me/plan/usage-limits";

const WINDOW_KEYS: Record<string, { key: string; displayName: string }> = {
  five_hour: { key: "session", displayName: "5 Hours Quota" },
  weekly: { key: "weekly", displayName: "Weekly Quota" },
  monthly: { key: "monthly", displayName: "Monthly Quota" },
};

/**
 * OAuth connections carry a WorkOS token that Cline expects as `Bearer workos:<token>`;
 * BYOK connections carry a plain `sk_…` ClinePass API key sent as-is.
 */
function buildAuthorization(accessToken?: string, apiKey?: string): string {
  if (accessToken) return getClineAuthorizationHeader(accessToken);
  return apiKey ? `Bearer ${apiKey.trim()}` : "";
}

/** Message for a non-OK usage-limits response, or null when the response is OK. */
function describeFailedStatus(response: Response): string | null {
  if (response.status === 401 || response.status === 403) {
    return "ClinePass connected. Cline rejected the credentials for usage limits.";
  }
  if (response.status === 404) {
    // Accounts without a ClinePass subscription have no plan to meter.
    return "ClinePass connected. No active ClinePass plan found for this account.";
  }
  if (!response.ok) {
    return `ClinePass connected. Usage limits returned HTTP ${response.status}.`;
  }
  return null;
}

/** Maps Cline's percentage-only limit windows onto 0–100 usage quotas. */
function mapLimitsToQuotas(limits: unknown[]): Record<string, UsageQuota> {
  const quotas: Record<string, UsageQuota> = {};
  for (const entry of limits) {
    const limit = toRecord(entry);
    const type = typeof limit.type === "string" ? limit.type.trim() : "";
    if (!type) continue;
    const mapped = WINDOW_KEYS[type] ?? { key: type, displayName: type };
    const used = clampPercentage(toNumber(limit.percentUsed, 0));
    const remaining = 100 - used;
    quotas[mapped.key] = {
      used,
      total: 100,
      remaining,
      remainingPercentage: remaining,
      resetAt: parseResetTime(limit.resetsAt),
      unlimited: false,
      fractionReported: limit.percentUsed !== undefined && limit.percentUsed !== null,
      displayName: mapped.displayName,
    };
  }
  return quotas;
}

export async function getClinepassUsage(accessToken?: string, apiKey?: string) {
  const authorization = buildAuthorization(accessToken, apiKey);
  if (!authorization) {
    return { message: "ClinePass credentials not available. Sign in again to view usage." };
  }

  let response: Response;
  try {
    response = await fetch(CLINEPASS_USAGE_LIMITS_URL, {
      method: "GET",
      headers: { Authorization: authorization, Accept: "application/json" },
    });
  } catch (error) {
    return { message: `ClinePass connected. Unable to fetch usage: ${(error as Error).message}` };
  }

  const statusMessage = describeFailedStatus(response);
  if (statusMessage) return { message: statusMessage };

  let payload: Record<string, unknown>;
  try {
    payload = toRecord(await response.json());
  } catch {
    return { message: "ClinePass connected. Unable to parse usage limits response." };
  }

  const limits = toRecord(payload.data).limits;
  if (payload.success === false || !Array.isArray(limits) || limits.length === 0) {
    return { message: "ClinePass connected. Cline did not report any usage limits." };
  }

  const quotas = mapLimitsToQuotas(limits);
  if (Object.keys(quotas).length === 0) {
    return { message: "ClinePass connected. Cline did not report any usage limits." };
  }
  return { quotas };
}
