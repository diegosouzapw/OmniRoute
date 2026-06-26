/**
 * usage/glm.ts — GLM (Zhipu) usage fetcher + quota helpers.
 *
 * Extracted from services/usage.ts (god-file decomposition): the GLM family — token/window
 * quota naming, quota ordering, monthly-remaining math, and the getGlmUsage fetcher that
 * probes the Zhipu quota endpoint. Depends only on the sibling scalar/quota leaves plus the
 * GLM quota-URL config — no host coupling — so it lives as a co-located provider leaf.
 * usage.ts imports getGlmUsage (dispatcher) and re-exports glmMonthlyRemainingPercentage
 * (used by the glm-coding-plan-monthly test). Behavior-preserving move.
 */

import { toNumber, toRecord, toTitleCase, toPercentage } from "./scalars.ts";
import { type UsageQuota } from "./quota.ts";
import { getGlmQuotaUrl } from "../../config/glmProvider.ts";

type JsonRecord = Record<string, unknown>;

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

/**
 * Remaining-percentage for a GLM/z.ai TIME_LIMIT ("Monthly") quota. With an absolute
 * monthly cap (`total > 0`) it is `remaining / total`. Coding plans that have no
 * monthly cap (only 5-hour windows) report `total = 0`; in that case fall back to the
 * percentage-derived remaining so "no monthly cap" renders as full/100% instead of a
 * misleading 0% (#3580).
 */
export function glmMonthlyRemainingPercentage(total: number, remaining: number): number {
  if (total > 0) {
    return Math.max(0, Math.min(100, Math.round((remaining / total) * 100)));
  }
  return Math.max(0, Math.min(100, Math.round(remaining)));
}

export async function getGlmUsage(apiKey: string, providerSpecificData?: Record<string, unknown>) {
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
      const remainingPercentage = glmMonthlyRemainingPercentage(total, remaining);

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
