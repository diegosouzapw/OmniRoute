/**
 * Public Dashboard contract for Kimi Coding Extra Usage (额度加油包).
 *
 * The existing read-only `GET /coding/v1/usages` response carries both the
 * Code quota windows and `boosterWallet`. Only the strictly whitelisted fields
 * below may cross the Provider Limits cache/UI boundary.
 */

export const KIMI_CODE_ADDITIONAL_CREDITS_URL =
  "https://www.kimi.com/membership/subscription?tab=quota&aff=omniroute";

type KimiExtraUsageStatus = "enabled" | "disabled" | "frozen" | "unavailable";

export interface KimiBillingStatus {
  /** ISO 4217 currency reported by the wallet money wrappers. */
  currency: string;
  /** Remaining Extra Usage balance in cents. */
  extraCreditsMinorUnits?: number;
  /** Extra Usage spend so far this calendar month, in cents. */
  monthlyUsedMinorUnits?: number;
  /** Whether the member enabled a monthly spending cap. */
  monthlyLimitEnabled?: boolean;
  /** Monthly spending cap in cents; 0/absent means unlimited. */
  monthlyLimitMinorUnits?: number;
  extraUsageStatus: KimiExtraUsageStatus;
  additionalCreditsUrl: typeof KIMI_CODE_ADDITIONAL_CREDITS_URL;
}

type KimiBillingTranslationKey =
  | "kimiExtraUsageCredits"
  | "kimiExtraUsage"
  | "kimiExtraUsageEnabled"
  | "kimiExtraUsageDisabled"
  | "kimiExtraUsageFrozen"
  | "kimiExtraUsageUnavailable"
  | "kimiMonthlyUsed"
  | "kimiMonthlyLimit"
  | "kimiMonthlyLimitUnlimited"
  | "kimiAdditionalCredits";

type KimiBillingTranslator = (key: KimiBillingTranslationKey, fallback: string) => string;

type KimiBillingCardRow =
  | { kind: "balance" | "status"; label: string; value: string }
  | {
      kind: "link";
      label: string;
      href: typeof KIMI_CODE_ADDITIONAL_CREDITS_URL;
      target: "_blank";
      rel: "noreferrer noopener";
    };

type JsonRecord = Record<string, unknown>;

function toRecord(value: unknown): JsonRecord | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : null;
}

function minorUnits(value: unknown): number | undefined {
  return typeof value === "number" && Number.isSafeInteger(value) && value >= 0 ? value : undefined;
}

const ISO_4217 = /^[A-Za-z]{3}$/;
const EXTRA_USAGE_STATUSES = new Set<KimiExtraUsageStatus>([
  "enabled",
  "disabled",
  "frozen",
  "unavailable",
]);

export function sanitizeKimiBillingStatus(value: unknown): KimiBillingStatus | undefined {
  const billing = toRecord(value);
  if (!billing || billing.additionalCreditsUrl !== KIMI_CODE_ADDITIONAL_CREDITS_URL)
    return undefined;

  const currency =
    typeof billing.currency === "string" && ISO_4217.test(billing.currency)
      ? billing.currency.toUpperCase()
      : undefined;
  const extraUsageStatus =
    typeof billing.extraUsageStatus === "string" &&
    EXTRA_USAGE_STATUSES.has(billing.extraUsageStatus as KimiExtraUsageStatus)
      ? (billing.extraUsageStatus as KimiExtraUsageStatus)
      : undefined;
  if (!currency || !extraUsageStatus) return undefined;

  const extraCreditsMinorUnits = minorUnits(billing.extraCreditsMinorUnits);
  const monthlyUsedMinorUnits = minorUnits(billing.monthlyUsedMinorUnits);
  const monthlyLimitMinorUnits = minorUnits(billing.monthlyLimitMinorUnits);
  const monthlyLimitEnabled =
    typeof billing.monthlyLimitEnabled === "boolean" ? billing.monthlyLimitEnabled : undefined;

  return {
    currency,
    ...(extraCreditsMinorUnits !== undefined ? { extraCreditsMinorUnits } : {}),
    ...(monthlyUsedMinorUnits !== undefined ? { monthlyUsedMinorUnits } : {}),
    ...(monthlyLimitEnabled !== undefined ? { monthlyLimitEnabled } : {}),
    ...(monthlyLimitMinorUnits !== undefined ? { monthlyLimitMinorUnits } : {}),
    extraUsageStatus,
    additionalCreditsUrl: KIMI_CODE_ADDITIONAL_CREDITS_URL,
  };
}

function formatKimiMinorUnits(
  value: number | undefined,
  currency: KimiBillingStatus["currency"],
  locales?: Intl.LocalesArgument
): string | null {
  if (value === undefined) return null;
  return new Intl.NumberFormat(locales, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value / 100);
}

const fallbackTranslation: KimiBillingTranslator = (_key, fallback) => fallback;

function formatExtraUsageStatus(
  status: KimiExtraUsageStatus,
  translate: KimiBillingTranslator
): string {
  switch (status) {
    case "enabled":
      return translate("kimiExtraUsageEnabled", "Enabled");
    case "disabled":
      return translate("kimiExtraUsageDisabled", "Disabled");
    case "frozen":
      return translate("kimiExtraUsageFrozen", "Frozen");
    default:
      return translate("kimiExtraUsageUnavailable", "Unavailable");
  }
}

export function buildKimiBillingCardRows(
  billing: KimiBillingStatus,
  locales?: Intl.LocalesArgument,
  translate: KimiBillingTranslator = fallbackTranslation
): KimiBillingCardRow[] {
  const rows: KimiBillingCardRow[] = [];
  const walletPresent = billing.extraCreditsMinorUnits !== undefined;

  const extraCredits = formatKimiMinorUnits(
    billing.extraCreditsMinorUnits,
    billing.currency,
    locales
  );
  if (extraCredits !== null) {
    rows.push({
      kind: "balance",
      label: translate("kimiExtraUsageCredits", "Extra Usage Credits"),
      value: extraCredits,
    });
  }

  rows.push({
    kind: "status",
    label: translate("kimiExtraUsage", "Extra Usage"),
    value: formatExtraUsageStatus(billing.extraUsageStatus, translate),
  });

  if (walletPresent) {
    const monthlyUsed = formatKimiMinorUnits(
      billing.monthlyUsedMinorUnits,
      billing.currency,
      locales
    );
    if (monthlyUsed !== null) {
      rows.push({
        kind: "status",
        label: translate("kimiMonthlyUsed", "Used this month"),
        value: monthlyUsed,
      });
    }

    const capped =
      billing.monthlyLimitEnabled === true &&
      billing.monthlyLimitMinorUnits !== undefined &&
      billing.monthlyLimitMinorUnits > 0;
    const monthlyLimit = capped
      ? formatKimiMinorUnits(billing.monthlyLimitMinorUnits, billing.currency, locales)
      : null;
    rows.push({
      kind: "status",
      label: translate("kimiMonthlyLimit", "Monthly limit"),
      value: monthlyLimit ?? translate("kimiMonthlyLimitUnlimited", "Unlimited"),
    });
  }

  rows.push({
    kind: "link",
    label: translate("kimiAdditionalCredits", "Additional Credits"),
    href: billing.additionalCreditsUrl,
    target: "_blank",
    rel: "noreferrer noopener",
  });
  return rows;
}
