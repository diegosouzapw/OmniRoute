/**
 * usage/qoder.ts — Qoder usage fetcher + status parser.
 *
 * Extracted from services/usage.ts (god-file decomposition): the Qoder family —
 * the /api/v3/user/status endpoint config, the plan-label prettifier, the pure
 * status→quotas mapper (parseQoderUserStatusUsage), and the getQoderUsage
 * fetcher that exchanges the PAT for a short-lived job token then reads the
 * status endpoint. Depends only on the sibling scalar/quota leaves +
 * resolveQoderJobToken + sanitizeErrorMessage — no host coupling — so it lives
 * as a co-located provider leaf. usage.ts imports getQoderUsage (dispatcher) +
 * re-exports parseQoderUserStatusUsage (named export + __testing, used by the
 * qoder-usage-quota suite). Behavior-preserving move.
 */

import { sanitizeErrorMessage } from "../../utils/error.ts";
import { resolveQoderJobToken } from "../qoderCli.ts";
import { toRecord, toNumber, toTitleCase } from "./scalars.ts";
import { type UsageQuota, parseResetTime } from "./quota.ts";

type JsonRecord = Record<string, unknown>;

const QODER_USER_STATUS_URL = "https://openapi.qoder.sh/api/v3/user/status";

/** Human-readable plan label from Qoder's `PLAN_TIER_*` enum / `userTag`. */
function prettifyQoderPlan(planRaw: string, userTag: string): string {
  const tag = String(userTag || "").trim();
  if (tag) return tag;
  const stripped = String(planRaw || "")
    .trim()
    .replace(/^PLAN_TIER_/i, "");
  return stripped ? toTitleCase(stripped) : "Qoder";
}

/**
 * Map a Qoder `/user/status` payload into the shared `{ plan, quotas }` shape.
 * Pure (no I/O) so it can be unit-tested against captured payloads.
 */
export function parseQoderUserStatusUsage(status: JsonRecord): {
  plan: string;
  quotas: Record<string, UsageQuota>;
} {
  const userType = String(status.userType || "")
    .trim()
    .toLowerCase();
  const planLabel = prettifyQoderPlan(String(status.plan || ""), String(status.userTag || ""));
  const isExceeded = status.isQuotaExceeded === true;
  const quotaNum = toNumber(status.quota, 0);
  const resetAt = parseResetTime(status.nextResetAt);
  // Team/enterprise seats draw from a pooled org quota rather than a per-user
  // counter, so `quota: 0` there means "pooled", not "exhausted".
  const isPooled = userType === "teams" || userType === "enterprise";

  const quotas: Record<string, UsageQuota> = {};
  if (isExceeded) {
    // Genuinely out of quota — remainingPercentage 0 lets routing skip it until reset.
    quotas["Quota"] = {
      used: quotaNum,
      total: quotaNum,
      remaining: 0,
      remainingPercentage: 0,
      resetAt,
      unlimited: false,
      displayName: "Quota exceeded",
    };
  } else if (isPooled || quotaNum <= 0) {
    // Pooled/unlimited seat — MUST report 100% remaining. The quota→routing
    // conversion (src/domain/quotaCache.ts) ignores `unlimited` and would treat a
    // `total: 0` window as 0% (i.e. exhausted), wrongly 429-ing every request.
    quotas["Plan"] = {
      used: 0,
      total: 0,
      remaining: 0,
      remainingPercentage: 100,
      resetAt,
      unlimited: true,
      displayName: `${planLabel} plan · pooled quota`,
    };
  } else {
    quotas["Requests"] = {
      used: 0,
      total: quotaNum,
      remaining: quotaNum,
      remainingPercentage: 100,
      resetAt,
      unlimited: false,
      displayName: `${quotaNum} requests left`,
    };
  }

  return { plan: planLabel, quotas };
}

/**
 * Qoder Usage
 *
 * Qoder exposes account plan + quota at `openapi.qoder.sh/api/v3/user/status`,
 * the same endpoint the official qodercli reads for its usage badge. The status
 * call needs a short-lived `jt-*` job token, so we exchange the PAT the same way
 * the chat/validation paths do (see qoderCli.ts::resolveQoderJobToken).
 */
export async function getQoderUsage(apiKey?: string, providerSpecificData?: JsonRecord) {
  const token = (apiKey || "").trim() || String(providerSpecificData?.qoderPat || "").trim();
  if (!token) {
    return { message: "Qoder connected. Add a Personal Access Token to view quota." };
  }

  let jobToken: string;
  try {
    jobToken = await resolveQoderJobToken(token);
  } catch {
    return { message: "Qoder connected. Unable to resolve a usage token." };
  }

  let response: Response;
  try {
    response = await fetch(QODER_USER_STATUS_URL, {
      method: "GET",
      headers: { Authorization: `Bearer ${jobToken}`, Accept: "application/json" },
      // @ts-ignore — AbortSignal.timeout is available on the Node runtime
      signal: AbortSignal.timeout(15000),
    });
  } catch (error) {
    return {
      message: `Qoder connected. Unable to fetch usage: ${sanitizeErrorMessage((error as Error).message)}`,
    };
  }

  if (response.status === 401 || response.status === 403) {
    return {
      message: "Qoder connected. The token was rejected by the usage API — re-test the connection.",
    };
  }
  if (!response.ok) {
    return { message: `Qoder connected. Usage API returned HTTP ${response.status}.` };
  }

  let status: JsonRecord;
  try {
    status = toRecord(await response.json());
  } catch {
    return { message: "Qoder connected. Unable to parse the usage response." };
  }

  return parseQoderUserStatusUsage(status);
}
