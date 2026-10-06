/**
 * usage/kimi.ts — Kimi Coding (kimi-coding / kimi-coding-apikey) usage fetcher + helpers.
 *
 * Extracted from services/usage.ts (god-file decomposition): the Kimi family — the coding
 * API config, membership-level → display-name mapping, and the getKimiUsage fetcher that
 * probes the official /v1/usages endpoint. Depends only on the sibling scalar/quota leaves
 * plus safePercentage — no host coupling — so it lives as a co-located provider leaf.
 * usage.ts imports getKimiUsage (dispatcher). Behavior-preserving move.
 */

import { safePercentage } from "@/shared/utils/formatting";
import {
  KIMI_CODE_ADDITIONAL_CREDITS_URL,
  type KimiBillingStatus,
} from "@/shared/utils/kimiBilling";
import {
  buildKimiCodeIdentityHeaders,
  getKimiCodeCliUserAgent,
} from "../../config/providers/registry/kimi/coding/runtime.ts";
import { toRecord, toNumber, clampPercentage } from "./scalars.ts";
import { createQuotaFromUsage, type UsageQuota, parseResetTime } from "./quota.ts";

type JsonRecord = Record<string, unknown>;

// Kimi Coding API config
const KIMI_CONFIG = {
  baseUrl: "https://api.kimi.com/coding/v1",
  usageUrl: "https://api.kimi.com/coding/v1/usages",
  apiVersion: "2023-06-01",
};

const KIMI_BOOSTER_FIXED_POINT_PER_CENT = 1_000_000;

function toInteger(value: unknown): number | null {
  const parsed = toNumber(value, Number.NaN);
  return Number.isFinite(parsed) ? Math.trunc(parsed) : null;
}

function fixedPointToCents(value: number): number {
  const cents = value / KIMI_BOOSTER_FIXED_POINT_PER_CENT;
  if (cents > 0 && cents < 1) return 1;
  return Math.round(cents);
}

function parseKimiMoney(value: unknown): { cents: number; currency: string } | null {
  const money = toRecord(value);
  const cents = toInteger(money.priceInCents);
  const currency = money.currency;
  if (
    cents === null ||
    cents < 0 ||
    typeof currency !== "string" ||
    !/^[A-Za-z]{3}$/.test(currency)
  ) {
    return null;
  }
  return { cents, currency: currency.toUpperCase() };
}

function parseKimiExtraUsageStatus(value: unknown): KimiBillingStatus["extraUsageStatus"] {
  switch (value) {
    case "STATUS_ACTIVE":
      return "enabled";
    case "STATUS_DISABLED":
      return "disabled";
    case "STATUS_FROZEN":
      return "frozen";
    default:
      return "unavailable";
  }
}

function parseKimiBoosterWallet(value: unknown): KimiBillingStatus | null {
  const wallet = toRecord(value);
  const balance = toRecord(wallet.balance);
  if (balance.type !== "BOOSTER") return null;

  const amount = toInteger(balance.amount);
  const amountLeft = toInteger(balance.amountLeft);
  const monthlyLimit = parseKimiMoney(wallet.monthlyChargeLimit);
  const monthlyUsed = parseKimiMoney(wallet.monthlyUsed);
  const autoRefillCharge = parseKimiMoney(wallet.autoRefillCharge);
  const autoRefillThreshold = parseKimiMoney(wallet.autoRefillThreshold);
  const extraUsageStatus = parseKimiExtraUsageStatus(wallet.status);
  const hasWalletEvidence =
    (amount !== null && amount > 0) ||
    amountLeft !== null ||
    monthlyLimit !== null ||
    monthlyUsed !== null ||
    extraUsageStatus !== "unavailable";
  if (!hasWalletEvidence) return null;

  const currency =
    monthlyLimit?.currency ??
    monthlyUsed?.currency ??
    autoRefillCharge?.currency ??
    autoRefillThreshold?.currency ??
    "USD";

  return {
    currency,
    // Proto JSON omits numeric zero values. Production therefore returns a
    // BOOSTER balance record without amount/amountLeft when the preserved
    // balance is exactly zero; treat that as an explicit zero, not unknown.
    extraCreditsMinorUnits:
      amountLeft === null || amountLeft < 0 ? 0 : fixedPointToCents(amountLeft),
    monthlyUsedMinorUnits: monthlyUsed?.cents ?? 0,
    monthlyLimitEnabled: wallet.monthlyChargeLimitEnabled === true,
    monthlyLimitMinorUnits: monthlyLimit?.cents ?? 0,
    extraUsageStatus,
    additionalCreditsUrl: KIMI_CODE_ADDITIONAL_CREDITS_URL,
  };
}

function buildKimiBillingStatus(value: unknown): KimiBillingStatus {
  return (
    parseKimiBoosterWallet(value) ?? {
      currency: "USD",
      extraUsageStatus: "unavailable",
      additionalCreditsUrl: KIMI_CODE_ADDITIONAL_CREDITS_URL,
    }
  );
}

function optionalNumber(value: unknown): number | null {
  if (typeof value !== "number" && typeof value !== "string") return null;
  const parsed = toNumber(value, Number.NaN);
  return Number.isFinite(parsed) ? parsed : null;
}

function createKimiCountQuota(value: unknown): UsageQuota | null {
  const detail = toRecord(value);
  const limit = optionalNumber(detail.limit ?? detail.Limit);
  if (limit === null || limit <= 0) return null;

  const reportedUsed = optionalNumber(detail.used ?? detail.Used);
  const reportedRemaining = optionalNumber(detail.remaining ?? detail.Remaining);
  const used = reportedUsed ?? (reportedRemaining === null ? 0 : limit - reportedRemaining);
  return createQuotaFromUsage(used, limit, detail.resetTime ?? detail.reset_at ?? detail.resetAt);
}

function createKimiRatioQuota(value: unknown): UsageQuota | null {
  const detail = toRecord(value);
  const ratio = optionalNumber(detail.used_ratio ?? detail.usedRatio);
  if (ratio === null || ratio < 0) return null;
  // used_ratio is 0-1. ratio*100 is not binary-exact
  // (0.147051 * 100 === 14.705099999999998). Round to four decimal percent.
  const used = clampPercentage(Math.round(ratio * 1e6) / 1e4);
  return createQuotaFromUsage(used, 100, detail.reset_time ?? detail.resetTime ?? detail.resetAt);
}

function applyKimiMembershipRatios(quotas: Record<string, UsageQuota>, usages: unknown): void {
  const rec = toRecord(usages);
  const mapping: Array<[string, string, string]> = [
    ["limit_7d", "code_7d", "Code · 7d"],
    ["limit_5h", "code_5h", "Code · 5h"],
  ];
  for (const [source, key, displayName] of mapping) {
    const quota = createKimiRatioQuota(rec[source]);
    if (!quota) continue;
    quotas[key] = { ...quota, displayName };
  }
}

type KimiWindowLabel = { key: string; displayName: string };

function normalizeKimiWindow(value: unknown, fallbackIndex: number): KimiWindowLabel {
  const window = toRecord(value);
  const duration = optionalNumber(window.duration);
  const timeUnit = window.timeUnit;

  if (duration !== null && duration > 0) {
    if (timeUnit === "TIME_UNIT_MINUTE" && duration % 60 === 0) {
      const hours = duration / 60;
      return { key: `${hours}h`, displayName: `Code · ${hours}h` };
    }
    if (timeUnit === "TIME_UNIT_HOUR") {
      return { key: `${duration}h`, displayName: `Code · ${duration}h` };
    }
    if (timeUnit === "TIME_UNIT_DAY") {
      return { key: `${duration}d`, displayName: `Code · ${duration}d` };
    }
    if (timeUnit === "TIME_UNIT_WEEK") {
      return { key: `${duration}w`, displayName: `Code · ${duration}w` };
    }
    if (timeUnit === "TIME_UNIT_MINUTE") {
      return { key: `${duration}m`, displayName: `Code · ${duration}m` };
    }
  }

  return { key: `limit_${fallbackIndex}`, displayName: `Code · Limit ${fallbackIndex}` };
}

/**
 * Map Kimi membership level to display name
 * LEVEL_BASIC = Moderato, LEVEL_INTERMEDIATE = Allegretto,
 * LEVEL_ADVANCED = Allegro, LEVEL_STANDARD = Vivace
 */
function getKimiPlanName(level: unknown): string {
  if (!level) return "";
  const normalizedLevel = String(level);

  const levelMap = {
    LEVEL_BASIC: "Moderato",
    LEVEL_INTERMEDIATE: "Allegretto",
    LEVEL_ADVANCED: "Allegro",
    LEVEL_STANDARD: "Vivace",
  };

  return (
    levelMap[normalizedLevel as keyof typeof levelMap] ||
    normalizedLevel.replace("LEVEL_", "").toLowerCase()
  );
}

/**
 * Kimi Coding Usage - Fetch quota from Kimi API
 * Uses the official /v1/usages endpoint with custom X-Msh-* headers
 */
export async function getKimiUsage(
  accessToken?: string,
  apiKey?: string,
  providerSpecificData: JsonRecord = {}
) {
  // API key auth takes precedence — Kimi's /usages endpoint accepts the same
  // API key used for /messages (verified live: responds with
  // authentication.method = METHOD_API_KEY). OAuth flow falls through to the
  // Bearer + device-headers shape used by Kimi Coding OAuth.
  const useApiKey = typeof apiKey === "string" && apiKey.length > 0;

  const authHeaders: Record<string, string> = useApiKey
    ? { "x-api-key": apiKey as string }
    : {
        Authorization: `Bearer ${accessToken}`,
        ...buildKimiCodeIdentityHeaders(providerSpecificData),
        "User-Agent": getKimiCodeCliUserAgent(),
      };

  try {
    const response = await fetch(KIMI_CONFIG.usageUrl, {
      method: "GET",
      headers: {
        ...authHeaders,
        "Content-Type": "application/json",
      },
    });

    const responseText = await response.text();

    if (!response.ok) {
      return {
        plan: "Kimi Coding",
        message: `Kimi Coding connected. API Error ${response.status}: ${responseText.slice(0, 100)}`,
      };
    }

    let data;
    try {
      data = JSON.parse(responseText);
    } catch {
      return {
        plan: "Kimi Coding",
        message: "Kimi Coding connected. Invalid JSON response from API.",
      };
    }

    const quotas: Record<string, UsageQuota> = {};
    const dataObj = toRecord(data);
    const billing = buildKimiBillingStatus(dataObj.boosterWallet ?? dataObj.booster_wallet);

    // The managed Kimi Code API reports the Code 7-day quota in `usage`.
    // The website's separate shared-membership total/Kimi split comes from a
    // Web-session-only endpoint and cannot be read with a Coding OAuth token.
    const weeklyQuota = createKimiCountQuota(dataObj.usage);
    if (weeklyQuota) {
      quotas.code_7d = { ...weeklyQuota, displayName: "Code · 7d" };
    }

    // Each limits[] item is an independent rolling window. Preserve all of
    // them with deterministic window-derived keys instead of overwriting one
    // generic `Ratelimit` row.
    const limitsArray = Array.isArray(dataObj.limits) ? dataObj.limits : [];
    for (let i = 0; i < limitsArray.length; i++) {
      const limitItem = toRecord(limitsArray[i]);
      const quota = createKimiCountQuota(limitItem.detail);
      if (!quota) continue;

      const normalized = normalizeKimiWindow(limitItem.window, i + 1);
      const baseKey = `code_${normalized.key}`;
      let key = baseKey;
      let suffix = 2;
      while (key in quotas) key = `${baseKey}_${suffix++}`;
      const reportedName =
        typeof limitItem.name === "string" && limitItem.name.trim() ? limitItem.name.trim() : null;
      const displayName = reportedName
        ? /^code\b/i.test(reportedName)
          ? reportedName
          : `Code · ${reportedName}`
        : normalized.displayName;
      quotas[key] = { ...quota, displayName };
    }

    applyKimiMembershipRatios(quotas, dataObj.usages);

    // Check for quota windows (Claude-like format with utilization) as fallback
    const hasUtilization = (window: JsonRecord) =>
      window && typeof window === "object" && safePercentage(window.utilization) !== undefined;

    const createQuotaObject = (window: JsonRecord) => {
      const remaining = safePercentage(window.utilization) as number;
      const used = 100 - remaining;
      return {
        used,
        total: 100,
        remaining,
        resetAt: parseResetTime(window.resets_at),
        remainingPercentage: remaining,
        unlimited: false,
      };
    };

    if (hasUtilization(toRecord(dataObj.five_hour))) {
      quotas["session (5h)"] = createQuotaObject(toRecord(dataObj.five_hour));
    }

    if (hasUtilization(toRecord(dataObj.seven_day))) {
      quotas["weekly (7d)"] = createQuotaObject(toRecord(dataObj.seven_day));
    }

    // Check for model-specific quotas
    for (const [key, value] of Object.entries(dataObj)) {
      const valueRecord = toRecord(value);
      if (key.startsWith("seven_day_") && key !== "seven_day" && hasUtilization(valueRecord)) {
        const modelName = key.replace("seven_day_", "");
        quotas[`weekly ${modelName} (7d)`] = createQuotaObject(valueRecord);
      }
    }

    if (Object.keys(quotas).length > 0) {
      const userRecord = toRecord(dataObj.user);
      const membershipLevel = toRecord(userRecord.membership).level;
      const planName = getKimiPlanName(membershipLevel);
      return {
        plan: planName || "Kimi Coding",
        quotas,
        billing,
      };
    }

    // No quota data in response
    const userRecord = toRecord(dataObj.user);
    const membershipLevel = toRecord(userRecord.membership).level;
    const planName = getKimiPlanName(membershipLevel);
    return {
      plan: planName || "Kimi Coding",
      message: "Kimi Coding connected. Usage tracked per request.",
      billing,
    };
  } catch (error) {
    return {
      message: `Kimi Coding connected. Unable to fetch usage: ${(error as Error).message}`,
    };
  }
}
