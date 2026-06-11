/**
 * Usage Fetcher - Get usage data from provider APIs
 */

import { PROVIDERS } from "../../config/constants.ts";

import { sanitizeErrorMessage } from "../../utils/error.ts";

import { JsonRecord, UsageQuota } from "./types.ts";
import {
  toNumber,
  toPercentage,
  roundCurrency,
  clampPercentage,
  toRecord,
  parseResetTime,
  toTitleCase,
} from "./utils.ts";
import {
  OpenCodeGoQuotaName,
  OPENCODE_GO_QUOTA_TOTALS,
  OPENCODE_GO_QUOTA_ORDER,
  OPENCODE_GO_QUOTA_URL,
} from "./constants.ts";

function getOpenCodeGoTokenQuotaName(
  limit: JsonRecord,
  existingQuotas: Record<string, UsageQuota>
): "session" | "weekly" {
  const unit = toNumber(limit.unit, 0);
  const number = toNumber(limit.number, 0);

  if (unit === 3 && number === 5) return "session";
  if (unit === 6 && number === 1) return "weekly";
  if ((unit === 4 && number === 7) || (unit === 3 && number >= 24 * 7)) return "weekly";

  return existingQuotas.session ? "weekly" : "session";
}

function getOpenCodeGoQuotaDisplayName(quotaName: OpenCodeGoQuotaName): string {
  if (quotaName === "session") return "5-hour rolling";
  if (quotaName === "weekly") return "Weekly";
  return "Monthly";
}

function normalizeOpenCodeGoQuotaToken(apiKey: string): string {
  return apiKey.trim().replace(/^Bearer\s+/i, "");
}

function buildOpenCodeGoDollarQuota(
  quotaName: OpenCodeGoQuotaName,
  percentage: unknown,
  resetAt: string | null,
  usedOverride?: unknown,
  details?: UsageQuota["details"]
): UsageQuota {
  const total = OPENCODE_GO_QUOTA_TOTALS[quotaName];
  const percentUsed = toPercentage(percentage);
  const rawUsed = toNumber(usedOverride, Number.NaN);
  const used = roundCurrency(
    Number.isFinite(rawUsed) ? Math.max(0, Math.min(total, rawUsed)) : (total * percentUsed) / 100
  );
  const remaining = roundCurrency(Math.max(0, total - used));
  const remainingPercentage =
    total > 0
      ? clampPercentage(Math.round((remaining / total) * 100))
      : clampPercentage(100 - percentUsed);

  return {
    used,
    total,
    remaining,
    remainingPercentage,
    resetAt,
    unlimited: false,
    displayName: getOpenCodeGoQuotaDisplayName(quotaName),
    currency: "USD",
    details,
  };
}

function orderOpenCodeGoQuotas(quotas: Record<string, UsageQuota>): Record<string, UsageQuota> {
  const ordered: Record<string, UsageQuota> = {};

  for (const key of OPENCODE_GO_QUOTA_ORDER) {
    if (quotas[key]) ordered[key] = quotas[key];
  }

  for (const [key, quota] of Object.entries(quotas)) {
    if (!ordered[key]) ordered[key] = quota;
  }

  return ordered;
}

export async function getOpenCodeGoUsage(apiKey: string) {
  const token = normalizeOpenCodeGoQuotaToken(apiKey);

  if (!token) {
    return { message: "API key not available. Add an OpenCode Go API key to view usage." };
  }

  const res = await fetch(OPENCODE_GO_QUOTA_URL, {
    headers: {
      Authorization: token,
      "Accept-Language": "en-US,en",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    if (res.status === 401 || res.status === 403) {
      return {
        message: "OpenCode Go quota endpoint rejected this API key. Chat requests still work.",
      };
    }
    return { message: `OpenCode Go quota API error (${res.status})` };
  }

  let json: unknown;
  try {
    json = await res.json();
  } catch {
    return { message: "OpenCode Go quota response parsing failed." };
  }

  const code = toNumber((json as Record<string, unknown>).code, 200);
  if (code === 401 || code === 403 || (json as Record<string, unknown>).success === false) {
    return {
      message: "OpenCode Go quota endpoint rejected this API key. Chat requests still work.",
    };
  }

  const data = toRecord((json as Record<string, unknown>).data);
  const limits: unknown[] = Array.isArray(data.limits) ? data.limits : [];
  const quotas: Record<string, UsageQuota> = {};

  for (const limit of limits) {
    const src = toRecord(limit);
    const type = String(src.type || "").toUpperCase();
    const resetAt = parseResetTime(src.nextResetTime);

    if (type === "TOKENS_LIMIT" || type === "TOKEN_LIMIT") {
      const quotaName = getOpenCodeGoTokenQuotaName(src, quotas);

      quotas[quotaName] = buildOpenCodeGoDollarQuota(
        quotaName,
        src.percentage,
        resetAt,
        undefined,
        Array.isArray(src.models)
          ? (src.models as unknown[]).map((model) => {
              const modelInfo = toRecord(model);
              return {
                name: String(modelInfo.model || modelInfo.modelCode || "usage"),
                used: toNumber(modelInfo.percentage, 0),
              };
            })
          : undefined
      );
      continue;
    }

    if (type === "TIME_LIMIT" || type === "TIME_USAGE_LIMIT") {
      quotas.mcp_monthly = buildOpenCodeGoDollarQuota(
        "mcp_monthly",
        src.percentage,
        resetAt,
        src.currentValue,
        Array.isArray(src.usageDetails)
          ? src.usageDetails.map((item) => {
              const detail = toRecord(item);
              return {
                name: String(detail.modelCode || detail.name || "usage"),
                used: toNumber(detail.usage, 0),
              };
            })
          : undefined
      );
    }
  }

  const levelRaw =
    typeof data.planName === "string"
      ? data.planName
      : typeof data.level === "string"
        ? data.level
        : "";
  const planLabel = toTitleCase(levelRaw.replace(/\s*plan$/i, ""));
  const plan = planLabel
    ? /^opencode\s+go\b/i.test(planLabel)
      ? planLabel
      : `OpenCode Go ${planLabel}`
    : null;

  return { plan, quotas: orderOpenCodeGoQuotas(quotas) };
}
