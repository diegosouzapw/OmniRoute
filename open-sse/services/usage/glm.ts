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
import { buildGlmQuotaFetch, getGlmTeamQuotaConfig } from "../../config/glmProvider.ts";
import { fetchGlmResetCardCount } from "./glmResetCards.ts";

type JsonRecord = Record<string, unknown>;

function getGlmTokenQuotaName(
  limit: JsonRecord,
  existingQuotas: Record<string, UsageQuota>
): string {
  const unit = toNumber(limit.unit, 0);
  const number = toNumber(limit.number, 0);

  if (unit === 3 && number === 5) return "session";
  if (unit === 6 && number === 1) return "weekly";
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

function glmTeamQuotaIncompleteMessage(missing: "glmOrganizationId" | "glmProjectId"): string {
  const fieldLabel = missing === "glmOrganizationId" ? "Organization ID" : "Project ID";
  return `GLM team plan quota requires both Organization ID and Project ID. Add the missing ${fieldLabel} on this connection.`;
}

function glmTeamQuotaHintMessage(): string {
  return "This API key appears to be a GLM Coding team plan. Add Organization ID and Project ID on this connection to view usage.";
}

function sanitizeGlmQuotaErrorMessage(msg: unknown): string {
  if (typeof msg !== "string" || !msg.trim()) {
    return "Unable to fetch GLM quota.";
  }
  return msg.trim();
}

function shouldSuggestGlmTeamQuota(
  teamConfig: ReturnType<typeof getGlmTeamQuotaConfig>,
  _providerSpecificData: unknown,
  _json: JsonRecord,
  upstreamMsg: string
): boolean {
  if (teamConfig.state !== "none") return false;
  return /coding\s*plan|不存在.*plan|没有.*coding|团队|编码套餐/i.test(upstreamMsg);
}

/**
 * A reset card can only clear the 5-hour or the weekly coding-plan window, so a key that
 * reports neither can never have one banked — used to skip the extra reset-card request.
 */
function hasResettableGlmWindow(quotas: Record<string, UsageQuota>): boolean {
  return Boolean(quotas.session || quotas.weekly);
}

export async function getGlmUsage(apiKey: string, providerSpecificData?: Record<string, unknown>) {
  if (!apiKey) {
    return { message: "API key not available. Add a coding plan API key to view usage." };
  }

  const teamConfig = getGlmTeamQuotaConfig(providerSpecificData);
  if (teamConfig.state === "incomplete") {
    return { message: glmTeamQuotaIncompleteMessage(teamConfig.missing) };
  }

  const { url: quotaUrl, headers } = buildGlmQuotaFetch(apiKey, providerSpecificData);

  const res = await fetch(quotaUrl, { headers });

  if (!res.ok) {
    if (res.status === 401) throw new Error("Invalid API key");
    throw new Error(`GLM quota API error (${res.status})`);
  }

  const json = await res.json();
  if (!json || typeof json !== "object") {
    throw new Error("Invalid JSON response from GLM quota API");
  }
  if (toNumber(json.code, 200) === 401) {
    throw new Error("Invalid API key");
  }

  if (json.success === false) {
    const upstreamMsg = sanitizeGlmQuotaErrorMessage(json.msg ?? json.message);
    if (shouldSuggestGlmTeamQuota(teamConfig, providerSpecificData, toRecord(json), upstreamMsg)) {
      return { message: glmTeamQuotaHintMessage() };
    }
    return { message: upstreamMsg };
  }

  const data = toRecord(json.data);
  const limits: unknown[] = Array.isArray(data.limits) ? data.limits : [];
  const quotas: Record<string, UsageQuota> = {};

  for (const limit of limits) {
    const src = toRecord(limit);
    const type = String(src.type || "").toUpperCase();
    const resetMs = toNumber(src.nextResetTime, 0);
    const resetAt = resetMs > 0 ? new Date(resetMs).toISOString() : null;

    // Z.ai coding-plan keys (CREDIT-based, e.g. GLM Coding Max/Lite) report
    // CREDIT_LIMIT rows with the same unit/number semantics as TOKENS_LIMIT
    // (unit=3/number=5 → 5-hour window, unit=6/number=1 → weekly). Without
    // this branch every CREDIT_LIMIT row is dropped and the quota card
    // renders empty for subscription keys.
    if (type === "TOKENS_LIMIT" || type === "CREDIT_LIMIT") {
      const quotaName = getGlmTokenQuotaName(src, quotas);
      const usedPercent = toPercentage(src.percentage);
      const remaining = Math.max(0, 100 - usedPercent);

      // CREDIT_LIMIT rows (z.ai coding-plan keys) carry absolute credits on
      // top of the percentage: usage = window total, currentValue = consumed,
      // remaining = credits left. Prefer them so the quota card renders
      // "3341 / 28000" like z.ai's own dashboard instead of a percent-only
      // scale. TOKENS_LIMIT rows without absolute fields keep the percent path.
      const totalCredits = toNumber(src.usage, 0);
      const usedCredits = totalCredits > 0 ? toNumber(src.currentValue, usedPercent) : usedPercent;
      const remainingCredits = totalCredits > 0 ? toNumber(src.remaining, remaining) : remaining;
      const total = totalCredits > 0 ? totalCredits : 100;

      quotas[quotaName] = {
        used: usedCredits,
        total,
        remaining: remainingCredits,
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

  const orderedQuotas = orderGlmQuotas(quotas);

  // Coding Plan Reset Cards live on a separate endpoint, so surfacing the banked count costs
  // one extra request. Only pay it for keys that actually report a resettable window — a
  // pay-as-you-go key can never hold a card — and keep it best-effort (the helper never
  // throws). The count is tri-state: a successful list reports a number (0 is an
  // authoritative "no cards"), while a transport/envelope failure reports null so the
  // cache layer can preserve the previously known count instead of erasing it.
  const bankedResetCredits = hasResettableGlmWindow(quotas)
    ? await fetchGlmResetCardCount(apiKey, providerSpecificData)
    : 0;

  return {
    plan,
    quotas: orderedQuotas,
    ...(bankedResetCredits !== null ? { bankedResetCredits } : {}),
  };
}
