/**
 * Usage Fetcher - Get usage data from provider APIs
 */

import { PROVIDERS } from "../../config/constants.ts";

import { sanitizeErrorMessage } from "../../utils/error.ts";

import { JsonRecord, UsageQuota } from "./types.ts";
import {
  pickFirstNonEmptyString,
  getFieldValue,
  toNumber,
  parseResetTime,
  createQuotaFromUsage,
  toRecord,
} from "./utils.ts";
import { MINIMAX_USAGE_CONFIG } from "./constants.ts";

export function inferMiniMaxPlanLabelFromTotals(models: JsonRecord[]): string | null {
  const maxSessionTotal = models.reduce(
    (maxTotal, model) => Math.max(maxTotal, getMiniMaxSessionTotal(model)),
    0
  );

  if (maxSessionTotal >= 15_000) return "Max";
  if (maxSessionTotal >= 4_500) return "Plus";
  if (maxSessionTotal >= 1_500) return "Starter";
  return null;
}

export function getMiniMaxPlanLabel(payload: JsonRecord, models: JsonRecord[] = []): string {
  const raw = pickFirstNonEmptyString(
    getFieldValue(payload, "current_subscribe_title", "currentSubscribeTitle"),
    getFieldValue(payload, "plan_name", "planName"),
    getFieldValue(payload, "plan", "plan"),
    getFieldValue(payload, "current_plan_title", "currentPlanTitle"),
    getFieldValue(payload, "combo_title", "comboTitle")
  );

  if (!raw) return inferMiniMaxPlanLabelFromTotals(models) || "Coding Plan";

  const cleaned = raw
    .replace(/^minimax\s+/i, "")
    .replace(/\bcoding\s+plan\b/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();

  return cleaned || inferMiniMaxPlanLabelFromTotals(models) || "Coding Plan";
}

export function getMiniMaxQuotaResetAt(
  model: JsonRecord,
  capturedAtMs: number,
  remainsTimeSnakeKey: string,
  remainsTimeCamelKey: string,
  endTimeSnakeKey: string,
  endTimeCamelKey: string
): string | null {
  const remainsMs = toNumber(getFieldValue(model, remainsTimeSnakeKey, remainsTimeCamelKey), 0);
  if (remainsMs > 0) {
    return new Date(capturedAtMs + remainsMs).toISOString();
  }

  return parseResetTime(getFieldValue(model, endTimeSnakeKey, endTimeCamelKey));
}

export function isMiniMaxTextQuotaModel(modelName: string): boolean {
  const normalized = modelName.trim().toLowerCase();
  return (
    normalized.startsWith("minimax-m") ||
    normalized.startsWith("coding-plan") ||
    // MiniMax Coding Plan surfaces the text/coding quota under model "general"
    // (media buckets like "video"/"image"/"music" are excluded).
    normalized === "general"
  );
}

export function getMiniMaxSessionTotal(model: JsonRecord): number {
  return Math.max(
    0,
    toNumber(getFieldValue(model, "current_interval_total_count", "currentIntervalTotalCount"), 0)
  );
}

export function getMiniMaxWeeklyTotal(model: JsonRecord): number {
  return Math.max(
    0,
    toNumber(getFieldValue(model, "current_weekly_total_count", "currentWeeklyTotalCount"), 0)
  );
}

function pickMiniMaxRepresentativeModel(
  models: JsonRecord[],
  getTotal: (model: JsonRecord) => number
): JsonRecord | null {
  const withQuota = models.filter((model) => getTotal(model) > 0);
  const pool = withQuota.length > 0 ? withQuota : models;
  if (pool.length === 0) return null;

  return pool.reduce((best, current) => (getTotal(current) > getTotal(best) ? current : best));
}

export function createMiniMaxQuotaFromCount(
  total: number,
  count: number,
  resetAt: string | null,
  countMeansRemaining: boolean
): UsageQuota {
  const used = countMeansRemaining ? Math.max(total - count, 0) : count;
  return createQuotaFromUsage(used, total, resetAt);
}

/**
 * MiniMax Coding Plan exposes per-window remaining as a 0–100 percent
 * (`current_interval_remaining_percent` / `current_weekly_remaining_percent`)
 * with zero request counts. Read it defensively (string-encoded numbers ok).
 */
export function getMiniMaxRemainingPercent(
  model: JsonRecord,
  snakeKey: string,
  camelKey: string
): number | null {
  const raw = getFieldValue(model, snakeKey, camelKey);
  if (raw === null || raw === undefined || raw === "") return null;
  const parsed = toNumber(raw, NaN);
  return Number.isFinite(parsed) ? Math.max(0, Math.min(100, parsed)) : null;
}

/** Build a 0–100 percent-based window quota (used = 100 − remaining). */
export function createMiniMaxQuotaFromPercent(
  remainingPercent: number,
  resetAt: string | null
): UsageQuota {
  const clamped = Math.max(0, Math.min(100, remainingPercent));
  return createQuotaFromUsage(100 - clamped, 100, resetAt);
}

/**
 * Build one MiniMax usage window (session or weekly) from the representative
 * model. Token Plan keys report request counts (`*_total_count`); Coding Plan
 * keys report zero counts and a `*_remaining_percent` instead — fall back to
 * that so the Coding Plan still surfaces a quota. The percent signal is keyed
 * off "counts == 0 + percent present", NOT the endpoint URL, because the
 * `token_plan/remains` and `coding_plan/remains` endpoints return identical
 * Coding-Plan payloads for a Coding Plan key.
 */
function buildMiniMaxWindow(
  models: JsonRecord[],
  getTotal: (model: JsonRecord) => number,
  usageCountKeys: [string, string],
  percentKeys: [string, string],
  resetKeys: [string, string, string, string],
  capturedAtMs: number,
  countMeansRemaining: boolean
): UsageQuota | null {
  const model = pickMiniMaxRepresentativeModel(models, getTotal);
  if (!model) return null;

  const resetAt = getMiniMaxQuotaResetAt(model, capturedAtMs, ...resetKeys);
  const total = getTotal(model);

  if (total > 0) {
    const count = Math.max(0, toNumber(getFieldValue(model, ...usageCountKeys), 0));
    return createMiniMaxQuotaFromCount(total, count, resetAt, countMeansRemaining);
  }

  const remainingPercent = getMiniMaxRemainingPercent(model, ...percentKeys);
  return remainingPercent !== null
    ? createMiniMaxQuotaFromPercent(remainingPercent, resetAt)
    : null;
}

export function getMiniMaxAuthErrorMessage(message: string): string {
  const normalized = message.toLowerCase();
  if (
    normalized.includes("token plan") ||
    normalized.includes("coding plan") ||
    normalized.includes("active period") ||
    normalized.includes("invalid api key") ||
    normalized.includes("invalid key") ||
    normalized.includes("subscription")
  ) {
    return "MiniMax Token Plan API key invalid or inactive. Use an active Token Plan key.";
  }

  return "MiniMax access denied. Confirm the key is an active Token Plan API key.";
}

export function getMiniMaxErrorSummary(status: number, message: string): string {
  const compact = message.replace(/\s+/g, " ").trim();
  if (!compact) {
    return `MiniMax usage endpoint error (${status}).`;
  }
  if (compact.length <= 160) {
    return `MiniMax usage endpoint error (${status}): ${compact}`;
  }
  return `MiniMax usage endpoint error (${status}): ${compact.slice(0, 157)}...`;
}

export async function getMiniMaxUsage(apiKey: string, provider: "minimax" | "minimax-cn") {
  if (!apiKey) {
    return { message: "MiniMax API key not available. Add a Token Plan API key." };
  }

  const usageUrls = MINIMAX_USAGE_CONFIG[provider].usageUrls;
  let lastErrorMessage = "";

  for (let index = 0; index < usageUrls.length; index += 1) {
    const usageUrl = usageUrls[index];
    const canFallback = index < usageUrls.length - 1;

    try {
      const response = await fetch(usageUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const rawText = await response.text();
      let payload: JsonRecord = {};
      if (rawText) {
        try {
          payload = toRecord(JSON.parse(rawText));
        } catch {
          payload = {};
        }
      }

      const baseResp = toRecord(getFieldValue(payload, "base_resp", "baseResp"));
      const apiStatusCode = toNumber(getFieldValue(baseResp, "status_code", "statusCode"), 0);
      const apiStatusMessage = String(
        getFieldValue(baseResp, "status_msg", "statusMsg") ?? ""
      ).trim();
      const combinedMessage = `${apiStatusMessage} ${rawText}`.trim();
      const authLikeStatusMessage =
        /token plan|coding plan|invalid api key|invalid key|unauthorized|inactive/i;

      if (
        response.status === 401 ||
        response.status === 403 ||
        apiStatusCode === 1004 ||
        authLikeStatusMessage.test(apiStatusMessage)
      ) {
        return { message: getMiniMaxAuthErrorMessage(apiStatusMessage || combinedMessage) };
      }

      if (!response.ok) {
        lastErrorMessage = getMiniMaxErrorSummary(response.status, combinedMessage);
        if (
          (response.status === 404 || response.status === 405 || response.status >= 500) &&
          canFallback
        ) {
          continue;
        }
        return { message: `MiniMax connected. ${lastErrorMessage}` };
      }

      if (rawText && Object.keys(payload).length === 0) {
        return { message: "MiniMax connected. Unable to parse usage response." };
      }

      if (apiStatusCode !== 0) {
        if (apiStatusMessage) {
          return { message: `MiniMax connected. ${apiStatusMessage}` };
        }
        return { message: "MiniMax connected. Upstream quota API returned an error." };
      }

      const capturedAtMs = Date.now();
      const modelRemains = getFieldValue(payload, "model_remains", "modelRemains");
      const allModels = Array.isArray(modelRemains)
        ? modelRemains.map((item) => toRecord(item))
        : [];
      const textModels = allModels.filter((model) => {
        const modelName = String(getFieldValue(model, "model_name", "modelName") ?? "");
        return isMiniMaxTextQuotaModel(modelName);
      });

      if (textModels.length === 0) {
        return { message: "MiniMax connected. No text quota data was returned." };
      }

      const countMeansRemaining = usageUrl.includes("/coding_plan/remains");
      const quotas: Record<string, UsageQuota> = {};

      const sessionQuota = buildMiniMaxWindow(
        textModels,
        getMiniMaxSessionTotal,
        ["current_interval_usage_count", "currentIntervalUsageCount"],
        ["current_interval_remaining_percent", "currentIntervalRemainingPercent"],
        ["remains_time", "remainsTime", "end_time", "endTime"],
        capturedAtMs,
        countMeansRemaining
      );
      if (sessionQuota) {
        quotas["session (5h)"] = sessionQuota;
      }

      const weeklyQuota = buildMiniMaxWindow(
        textModels,
        getMiniMaxWeeklyTotal,
        ["current_weekly_usage_count", "currentWeeklyUsageCount"],
        ["current_weekly_remaining_percent", "currentWeeklyRemainingPercent"],
        ["weekly_remains_time", "weeklyRemainsTime", "weekly_end_time", "weeklyEndTime"],
        capturedAtMs,
        countMeansRemaining
      );
      if (weeklyQuota) {
        quotas["weekly (7d)"] = weeklyQuota;
      }

      if (Object.keys(quotas).length === 0) {
        return { message: "MiniMax connected. Unable to extract text quota usage." };
      }

      return { plan: getMiniMaxPlanLabel(payload, textModels), quotas };
    } catch (error) {
      lastErrorMessage = (error as Error).message;
      if (!canFallback) {
        break;
      }
    }
  }

  return {
    message: lastErrorMessage
      ? `MiniMax connected. Unable to fetch usage: ${lastErrorMessage}`
      : "MiniMax connected. Unable to fetch usage.",
  };
}
