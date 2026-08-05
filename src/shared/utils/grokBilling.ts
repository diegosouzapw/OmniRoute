export const GROK_BUILD_ADDITIONAL_CREDITS_URL = "https://grok.com/build?_s=usage";

export interface GrokAutoTopUpStatus {
  available: boolean;
  enabled?: boolean;
  thresholdMinorUnits?: number;
  amountMinorUnits?: number;
  maxMonthlyMinorUnits?: number;
}

export interface GrokBillingStatus {
  currency: "USD";
  extraCreditsMinorUnits?: number;
  autoTopUp: GrokAutoTopUpStatus;
  additionalCreditsUrl: typeof GROK_BUILD_ADDITIONAL_CREDITS_URL;
}

export type GrokBillingTranslationKey =
  | "grokExtraUsageCredits"
  | "grokAutoTopUp"
  | "grokAutoTopUpUnavailable"
  | "grokAutoTopUpEnabled"
  | "grokAutoTopUpDisabled"
  | "grokAutoTopUpAt"
  | "grokAutoTopUpAdd"
  | "grokAutoTopUpMax"
  | "grokAutoTopUpMonth"
  | "grokAdditionalCredits";

export type GrokBillingTranslator = (key: GrokBillingTranslationKey, fallback: string) => string;

export type GrokBillingCardRow =
  | { kind: "balance" | "status"; label: string; value: string }
  | {
      kind: "link";
      label: string;
      href: typeof GROK_BUILD_ADDITIONAL_CREDITS_URL;
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

export function sanitizeGrokBillingStatus(value: unknown): GrokBillingStatus | undefined {
  const billing = toRecord(value);
  if (!billing || billing.currency !== "USD") return undefined;
  if (billing.additionalCreditsUrl !== GROK_BUILD_ADDITIONAL_CREDITS_URL) return undefined;

  const rawAutoTopUp = toRecord(billing.autoTopUp);
  if (!rawAutoTopUp || typeof rawAutoTopUp.available !== "boolean") return undefined;

  const available = rawAutoTopUp.available;
  const enabled =
    available && typeof rawAutoTopUp.enabled === "boolean" ? rawAutoTopUp.enabled : undefined;
  const extraCreditsMinorUnits = minorUnits(billing.extraCreditsMinorUnits);
  const thresholdMinorUnits =
    enabled === true ? minorUnits(rawAutoTopUp.thresholdMinorUnits) : undefined;
  const amountMinorUnits = enabled === true ? minorUnits(rawAutoTopUp.amountMinorUnits) : undefined;
  const maxMonthlyMinorUnits =
    enabled === true ? minorUnits(rawAutoTopUp.maxMonthlyMinorUnits) : undefined;

  return {
    currency: "USD",
    ...(extraCreditsMinorUnits !== undefined ? { extraCreditsMinorUnits } : {}),
    autoTopUp: {
      available,
      ...(enabled !== undefined ? { enabled } : {}),
      ...(thresholdMinorUnits !== undefined ? { thresholdMinorUnits } : {}),
      ...(amountMinorUnits !== undefined ? { amountMinorUnits } : {}),
      ...(maxMonthlyMinorUnits !== undefined ? { maxMonthlyMinorUnits } : {}),
    },
    additionalCreditsUrl: GROK_BUILD_ADDITIONAL_CREDITS_URL,
  };
}

export function formatGrokMinorUnits(
  value: number | undefined,
  currency: GrokBillingStatus["currency"],
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

const fallbackTranslation: GrokBillingTranslator = (_key, fallback) => fallback;

export function buildGrokBillingCardRows(
  billing: GrokBillingStatus,
  locales?: Intl.LocalesArgument,
  translate: GrokBillingTranslator = fallbackTranslation
): GrokBillingCardRow[] {
  const rows: GrokBillingCardRow[] = [];
  const extraCredits = formatGrokMinorUnits(
    billing.extraCreditsMinorUnits,
    billing.currency,
    locales
  );
  if (extraCredits !== null) {
    rows.push({
      kind: "balance",
      label: translate("grokExtraUsageCredits", "Extra Usage Credits"),
      value: extraCredits,
    });
  }

  const autoTopUp = billing.autoTopUp;
  let autoTopUpValue: string;
  if (!autoTopUp.available) {
    autoTopUpValue = translate("grokAutoTopUpUnavailable", "Unavailable");
  } else if (!autoTopUp.enabled) {
    autoTopUpValue = translate("grokAutoTopUpDisabled", "Disabled");
  } else {
    const threshold = formatGrokMinorUnits(
      autoTopUp.thresholdMinorUnits,
      billing.currency,
      locales
    );
    const amount = formatGrokMinorUnits(autoTopUp.amountMinorUnits, billing.currency, locales);
    const maximum = formatGrokMinorUnits(autoTopUp.maxMonthlyMinorUnits, billing.currency, locales);
    autoTopUpValue = [
      translate("grokAutoTopUpEnabled", "Enabled"),
      threshold ? `${translate("grokAutoTopUpAt", "at")} ${threshold}` : null,
      amount ? `${translate("grokAutoTopUpAdd", "add")} ${amount}` : null,
      maximum
        ? `${translate("grokAutoTopUpMax", "max")} ${maximum}/${translate(
            "grokAutoTopUpMonth",
            "month"
          )}`
        : null,
    ]
      .filter((part): part is string => part !== null)
      .join(" · ");
  }

  rows.push({
    kind: "status",
    label: translate("grokAutoTopUp", "Auto Top-Up"),
    value: autoTopUpValue,
  });
  rows.push({
    kind: "link",
    label: translate("grokAdditionalCredits", "Additional Credits"),
    href: billing.additionalCreditsUrl,
    target: "_blank",
    rel: "noreferrer noopener",
  });
  return rows;
}
