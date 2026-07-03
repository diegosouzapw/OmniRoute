import {
  CODEX_SPARK_DISPLAY_NAME,
  CODEX_SPARK_QUOTA_SESSION,
  CODEX_SPARK_QUOTA_WEEKLY,
  isCodexSparkLimitDescriptor,
} from "../config/codexQuotaScopes.ts";

type JsonRecord = Record<string, unknown>;

export type CodexUsageQuota = {
  used: number;
  total: number;
  remaining?: number;
  resetAt: string | null;
  unlimited: boolean;
  displayName?: string;
};

export function getFieldValue(record: unknown, ...keys: string[]): unknown {
  if (!record || typeof record !== "object") return null;
  const typed = record as JsonRecord;
  for (const key of keys) {
    if (typed[key] !== undefined && typed[key] !== null) return typed[key];
  }
  return null;
}

function toRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function toNumber(value: unknown, fallback = 0): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }
  return fallback;
}

function parseResetTime(resetValue: unknown): string | null {
  if (!resetValue) return null;
  try {
    let date: Date | null = null;
    if (resetValue instanceof Date) {
      date = resetValue;
    } else if (typeof resetValue === "number") {
      date = new Date(resetValue < 1e12 ? resetValue * 1000 : resetValue);
    } else if (typeof resetValue === "string") {
      // Numeric strings are Unix timestamps too (seconds or milliseconds).
      if (/^\d+$/.test(resetValue)) {
        const ts = Number(resetValue);
        date = new Date(ts < 1e12 ? ts * 1000 : ts);
      } else {
        date = new Date(resetValue);
      }
    }
    if (!date || date.getTime() <= 0) return null;
    return date.toISOString();
  } catch {
    return null;
  }
}

function parseWindowReset(window: unknown): string | null {
  const resetAt = toNumber(getFieldValue(window, "reset_at", "resetAt"), 0);
  const resetAfterSeconds = toNumber(
    getFieldValue(window, "reset_after_seconds", "resetAfterSeconds"),
    0
  );
  if (resetAt > 0) return parseResetTime(resetAt * 1000);
  if (resetAfterSeconds > 0) return parseResetTime(Date.now() + resetAfterSeconds * 1000);
  return null;
}

function buildPercentageQuota(window: JsonRecord, displayName?: string): CodexUsageQuota {
  const usedPercent = toNumber(getFieldValue(window, "used_percent", "usedPercent"), 0);
  return {
    used: usedPercent,
    total: 100,
    remaining: 100 - usedPercent,
    resetAt: parseWindowReset(window),
    unlimited: false,
    ...(displayName ? { displayName } : {}),
  };
}

function findCodexSparkRateLimit(data: JsonRecord): JsonRecord {
  const additionalRateLimits = getFieldValue(
    data,
    "additional_rate_limits",
    "additionalRateLimits"
  );
  if (!Array.isArray(additionalRateLimits)) return {};

  for (const entryValue of additionalRateLimits) {
    const entry = toRecord(entryValue);
    if (
      isCodexSparkLimitDescriptor(
        getFieldValue(entry, "limit_name", "limitName"),
        getFieldValue(entry, "metered_feature", "meteredFeature"),
        getFieldValue(entry, "limit_id", "limitId"),
        entry["id"],
        entry["name"],
        entry["title"],
        entry["model"],
        getFieldValue(entry, "model_id", "modelId")
      )
    ) {
      return toRecord(getFieldValue(entry, "rate_limit", "rateLimit"));
    }
  }
  return {};
}

/**
 * Upstream parity (decolua/9router PR #836): some ChatGPT Codex plans report
 * the review-window rate limit inside `additional_rate_limits` rather than the
 * dedicated `code_review_rate_limit` block. Detect that descriptor so the
 * caller can fall back to it when the dedicated block is empty.
 */
function isCodexReviewLimitDescriptor(...values: unknown[]): boolean {
  return values.some((value) => {
    if (typeof value !== "string") return false;
    const normalized = value.trim().toLowerCase();
    if (!normalized) return false;
    return (
      normalized === "code_review" ||
      normalized === "codex_review" ||
      normalized === "review" ||
      normalized.includes("code_review") ||
      normalized.includes("codex_review") ||
      normalized.includes("code review")
    );
  });
}

function findCodexReviewRateLimit(data: JsonRecord): JsonRecord {
  const additionalRateLimits = getFieldValue(
    data,
    "additional_rate_limits",
    "additionalRateLimits"
  );
  if (!Array.isArray(additionalRateLimits)) return {};

  for (const entryValue of additionalRateLimits) {
    const entry = toRecord(entryValue);
    if (
      isCodexReviewLimitDescriptor(
        getFieldValue(entry, "limit_name", "limitName"),
        getFieldValue(entry, "metered_feature", "meteredFeature"),
        getFieldValue(entry, "limit_id", "limitId"),
        entry["id"],
        entry["name"]
      )
    ) {
      return toRecord(getFieldValue(entry, "rate_limit", "rateLimit"));
    }
  }
  return {};
}

/**
 * Codex "banked reset credits" — an eligibility-gated field some ChatGPT plans
 * expose on the /wham/usage payload: a count of extra rate-limit resets the
 * account has banked (available_count), plus an optional descriptor of which
 * window is currently blocking (rate_limit_reached_type). DISPLAY ONLY — this
 * reads the field defensively (many accounts will not have it) and never
 * throws; redemption is an unofficial mutating endpoint and out of scope
 * (issue #5199).
 */
function parseBankedResetCredits(data: JsonRecord): number | undefined {
  const resetCredits = toRecord(getFieldValue(data, "rate_limit_reset_credits", "rateLimitResetCredits"));
  const availableCount = getFieldValue(resetCredits, "available_count", "availableCount");
  const count = toNumber(availableCount, NaN);
  return Number.isFinite(count) ? count : undefined;
}

function parseRateLimitReachedType(data: JsonRecord): string | undefined {
  const reachedType = getFieldValue(data, "rate_limit_reached_type", "rateLimitReachedType");
  if (typeof reachedType === "string" && reachedType.trim().length > 0) return reachedType.trim();
  const reachedTypeObj = toRecord(reachedType);
  const type = getFieldValue(reachedTypeObj, "type");
  return typeof type === "string" && type.trim().length > 0 ? type.trim() : undefined;
}

export function buildCodexUsageQuotas(dataValue: unknown): {
  rateLimit: JsonRecord;
  quotas: Record<string, CodexUsageQuota>;
  /** Banked reset credits available on the account (undefined when absent/not eligible). */
  bankedResetCredits?: number;
  /** Which window is currently reported as blocking, when the upstream exposes it. */
  rateLimitReachedType?: string;
} {
  const data = toRecord(dataValue);
  const rateLimit = toRecord(getFieldValue(data, "rate_limit", "rateLimit"));
  const quotas: Record<string, CodexUsageQuota> = {};
  const bankedResetCredits = parseBankedResetCredits(data);
  const rateLimitReachedType = parseRateLimitReachedType(data);

  const primaryWindow = toRecord(getFieldValue(rateLimit, "primary_window", "primaryWindow"));
  if (Object.keys(primaryWindow).length > 0) quotas.session = buildPercentageQuota(primaryWindow);

  const secondaryWindow = toRecord(getFieldValue(rateLimit, "secondary_window", "secondaryWindow"));
  if (Object.keys(secondaryWindow).length > 0)
    quotas.weekly = buildPercentageQuota(secondaryWindow);

  // Resolve the code-review rate limit block. ChatGPT Codex exposes the same
  // information under two different shapes depending on the plan tier
  // (decolua/9router PR #836):
  //   1. Dedicated `code_review_rate_limit` block at the top level (preferred).
  //   2. An entry inside `additional_rate_limits` with a `code_review` /
  //      `review` descriptor (fallback for plans that bucket every secondary
  //      limit into the same array).
  const dedicatedReviewRateLimit = toRecord(
    getFieldValue(data, "code_review_rate_limit", "codeReviewRateLimit")
  );
  const reviewRateLimit =
    Object.keys(dedicatedReviewRateLimit).length > 0
      ? dedicatedReviewRateLimit
      : findCodexReviewRateLimit(data);

  const codeReviewWindow = toRecord(
    getFieldValue(reviewRateLimit, "primary_window", "primaryWindow")
  );
  if (
    getFieldValue(codeReviewWindow, "used_percent", "usedPercent") !== null ||
    getFieldValue(codeReviewWindow, "remaining_count", "remainingCount") !== null
  ) {
    quotas.code_review = buildPercentageQuota(codeReviewWindow);
  }

  const codeReviewSecondaryWindow = toRecord(
    getFieldValue(reviewRateLimit, "secondary_window", "secondaryWindow")
  );
  if (
    getFieldValue(codeReviewSecondaryWindow, "used_percent", "usedPercent") !== null ||
    getFieldValue(codeReviewSecondaryWindow, "remaining_count", "remainingCount") !== null
  ) {
    quotas.code_review_weekly = buildPercentageQuota(codeReviewSecondaryWindow);
  }

  const sparkRateLimit = findCodexSparkRateLimit(data);
  const sparkPrimaryWindow = toRecord(
    getFieldValue(sparkRateLimit, "primary_window", "primaryWindow")
  );
  if (Object.keys(sparkPrimaryWindow).length > 0) {
    quotas[CODEX_SPARK_QUOTA_SESSION] = buildPercentageQuota(
      sparkPrimaryWindow,
      CODEX_SPARK_DISPLAY_NAME
    );
  }

  const sparkSecondaryWindow = toRecord(
    getFieldValue(sparkRateLimit, "secondary_window", "secondaryWindow")
  );
  if (Object.keys(sparkSecondaryWindow).length > 0) {
    quotas[CODEX_SPARK_QUOTA_WEEKLY] = buildPercentageQuota(
      sparkSecondaryWindow,
      `${CODEX_SPARK_DISPLAY_NAME} Weekly`
    );
  }

  return {
    rateLimit,
    quotas,
    ...(bankedResetCredits !== undefined ? { bankedResetCredits } : {}),
    ...(rateLimitReachedType !== undefined ? { rateLimitReachedType } : {}),
  };
}
