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

export function buildCodexUsageQuotas(dataValue: unknown): {
  rateLimit: JsonRecord;
  quotas: Record<string, CodexUsageQuota>;
} {
  const data = toRecord(dataValue);
  const rateLimit = toRecord(getFieldValue(data, "rate_limit", "rateLimit"));
  const quotas: Record<string, CodexUsageQuota> = {};

  const primaryWindow = toRecord(getFieldValue(rateLimit, "primary_window", "primaryWindow"));
  if (Object.keys(primaryWindow).length > 0) quotas.session = buildPercentageQuota(primaryWindow);

  const secondaryWindow = toRecord(getFieldValue(rateLimit, "secondary_window", "secondaryWindow"));
  if (Object.keys(secondaryWindow).length > 0)
    quotas.weekly = buildPercentageQuota(secondaryWindow);

  const codeReviewWindow = toRecord(
    getFieldValue(
      toRecord(getFieldValue(data, "code_review_rate_limit", "codeReviewRateLimit")),
      "primary_window",
      "primaryWindow"
    )
  );
  if (
    getFieldValue(codeReviewWindow, "used_percent", "usedPercent") !== null ||
    getFieldValue(codeReviewWindow, "remaining_count", "remainingCount") !== null
  ) {
    quotas.code_review = buildPercentageQuota(codeReviewWindow);
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

  return { rateLimit, quotas };
}
