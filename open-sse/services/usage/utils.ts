import {
  extractCodeAssistOnboardTierId,
  extractCodeAssistSubscriptionTier,
} from "../codeAssistSubscription.ts";

import { sanitizeErrorMessage } from "../../utils/error.ts";

import { JsonRecord, UsageQuota } from "./types.ts";
import { formatGitHubQuotaSnapshot, inferGitHubPlanName } from "./github.ts";
import { getGeminiCliPlanLabel } from "./gemini.ts";
import {
  getAntigravityPlanLabel,
  mapCodeAssistSubscriptionToPlanLabel,
  mapCodeAssistTierIdToLabel,
  mapSubscriptionTierStringToPlanLabel,
} from "./antigravity.ts";
import {
  getMiniMaxPlanLabel,
  inferMiniMaxPlanLabelFromTotals,
  getMiniMaxQuotaResetAt,
  isMiniMaxTextQuotaModel,
  getMiniMaxSessionTotal,
  getMiniMaxWeeklyTotal,
  createMiniMaxQuotaFromCount,
  createMiniMaxQuotaFromPercent,
  getMiniMaxRemainingPercent,
  getMiniMaxUsage,
  getMiniMaxAuthErrorMessage,
  getMiniMaxErrorSummary,
} from "./minimax.ts";
import { getOpencodeUsage } from "./opencode.ts";
import { getClaudePlanLabel } from "./claude.ts";
import { getXiaomiMimoUsage } from "./xiaomi.ts";

export function toRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

export function toNumber(value: unknown, fallback = 0): number {
  const parsed =
    typeof value === "number"
      ? value
      : typeof value === "string" && value.trim().length > 0
        ? Number(value)
        : Number.NaN;
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function toPercentage(value: unknown): number {
  return Math.max(0, Math.min(100, toNumber(value, 0)));
}

export function toTitleCase(value: string): string {
  return value
    .trim()
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

export function getFieldValue(source: unknown, snakeKey: string, camelKey: string): unknown {
  const obj = toRecord(source);
  return obj[snakeKey] ?? obj[camelKey] ?? null;
}

export function clampPercentage(value: number): number {
  return Math.max(0, Math.min(100, value));
}

export function roundCurrency(value: number): number {
  return Math.round(value * 100) / 100;
}

export function toDisplayLabel(value: string): string {
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

export function shouldDisplayGitHubQuota(quota: UsageQuota | null): quota is UsageQuota {
  if (!quota) return false;
  if (quota.unlimited && quota.total <= 0) return false;
  return quota.total > 0 || quota.remainingPercentage !== undefined;
}

export function pickFirstNonEmptyString(...values: unknown[]): string | undefined {
  for (const value of values) {
    if (typeof value !== "string") continue;
    const trimmed = value.trim();
    if (trimmed) return trimmed;
  }
  return undefined;
}

export function createQuotaFromUsage(
  usedValue: unknown,
  totalValue: unknown,
  resetValue: unknown
): UsageQuota {
  const total = Math.max(0, toNumber(totalValue, 0));
  const used = total > 0 ? Math.min(Math.max(0, toNumber(usedValue, 0)), total) : 0;
  const remaining = total > 0 ? Math.max(total - used, 0) : 0;

  return {
    used,
    total,
    remaining,
    remainingPercentage: total > 0 ? clampPercentage((remaining / total) * 100) : 0,
    resetAt: parseResetTime(resetValue),
    unlimited: false,
  };
}

/**
 * Parse reset date/time to ISO string
 * Handles multiple formats: Unix timestamp (ms), ISO date string, etc.
 */
export function parseResetTime(resetValue: unknown): string | null {
  if (!resetValue) return null;

  try {
    let date: Date;
    if (resetValue instanceof Date) {
      date = resetValue;
    } else if (typeof resetValue === "number") {
      date = new Date(resetValue < 1e12 ? resetValue * 1000 : resetValue);
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

export const __testing = {
  parseResetTime,
  formatGitHubQuotaSnapshot,
  inferGitHubPlanName,
  getGeminiCliPlanLabel,
  getAntigravityPlanLabel,
  extractCodeAssistSubscriptionTier,
  extractCodeAssistOnboardTierId,
  getMiniMaxPlanLabel,
  inferMiniMaxPlanLabelFromTotals,
  getOpencodeUsage,
  getClaudePlanLabel,
  createQuotaFromUsage,
  getMiniMaxQuotaResetAt,
  isMiniMaxTextQuotaModel,
  getMiniMaxSessionTotal,
  getMiniMaxWeeklyTotal,
  createMiniMaxQuotaFromCount,
  createMiniMaxQuotaFromPercent,
  getMiniMaxRemainingPercent,
  getMiniMaxUsage,
  getXiaomiMimoUsage,
  getMiniMaxAuthErrorMessage,
  getMiniMaxErrorSummary,
  mapCodeAssistSubscriptionToPlanLabel,
  mapCodeAssistTierIdToLabel,
  mapSubscriptionTierStringToPlanLabel,
  toDisplayLabel,
};
