import test from "node:test";
import assert from "node:assert/strict";

const { buildKimiBillingCardRows, KIMI_CODE_ADDITIONAL_CREDITS_URL, sanitizeKimiBillingStatus } =
  await import("../../../src/shared/utils/kimiBilling.ts");
const { isKimiBillingStatus, isProviderBillingProvider, sanitizeProviderBillingStatus } =
  await import("../../../src/shared/utils/providerBilling.ts");
const { PROVIDER_LABEL } =
  await import("../../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/constants.ts");
const { USAGE_SUPPORTED_PROVIDERS } = await import("../../../src/shared/constants/providers.ts");

const baseBilling = {
  currency: "CNY",
  extraUsageStatus: "unavailable" as const,
  additionalCreditsUrl: KIMI_CODE_ADDITIONAL_CREDITS_URL,
};

test("Kimi billing rows show the real Extra Usage status when the wallet is unavailable", () => {
  const rows = buildKimiBillingCardRows(baseBilling, "en-US");
  assert.deepEqual(rows, [
    { kind: "status", label: "Extra Usage", value: "Unavailable" },
    {
      kind: "link",
      label: "Additional Credits",
      href: KIMI_CODE_ADDITIONAL_CREDITS_URL,
      target: "_blank",
      rel: "noreferrer noopener",
    },
  ]);
});

test("Kimi billing rows show balance, wallet status, monthly spend, cap and buy link", () => {
  const rows = buildKimiBillingCardRows(
    {
      ...baseBilling,
      extraCreditsMinorUnits: 1234,
      monthlyUsedMinorUnits: 250,
      monthlyLimitEnabled: true,
      monthlyLimitMinorUnits: 5000,
      extraUsageStatus: "enabled",
    },
    "en-US"
  );

  assert.deepEqual(rows, [
    { kind: "balance", label: "Extra Usage Credits", value: "CN¥12.34" },
    { kind: "status", label: "Extra Usage", value: "Enabled" },
    { kind: "status", label: "Used this month", value: "CN¥2.50" },
    { kind: "status", label: "Monthly limit", value: "CN¥50.00" },
    {
      kind: "link",
      label: "Additional Credits",
      href: KIMI_CODE_ADDITIONAL_CREDITS_URL,
      target: "_blank",
      rel: "noreferrer noopener",
    },
  ]);
});

test("Kimi monthly cap displays Unlimited when disabled or zero", () => {
  for (const billing of [
    { ...baseBilling, extraCreditsMinorUnits: 0, monthlyLimitEnabled: false },
    {
      ...baseBilling,
      extraCreditsMinorUnits: 0,
      monthlyLimitEnabled: true,
      monthlyLimitMinorUnits: 0,
    },
  ]) {
    const row = buildKimiBillingCardRows(billing, "en-US").find(
      (candidate) => candidate.kind === "status" && candidate.label === "Monthly limit"
    );
    assert.deepEqual(row, { kind: "status", label: "Monthly limit", value: "Unlimited" });
  }
});

test("Kimi billing labels support localized translation fallbacks", () => {
  const translate = (key: string, fallback: string) =>
    ({
      kimiExtraUsageCredits: "加油包余额",
      kimiExtraUsage: "额度加油包",
      kimiExtraUsageEnabled: "已开启",
      kimiExtraUsageDisabled: "已关闭",
      kimiExtraUsageFrozen: "已冻结",
      kimiExtraUsageUnavailable: "不可用",
      kimiMonthlyUsed: "本月已用",
      kimiMonthlyLimit: "每月限额",
      kimiMonthlyLimitUnlimited: "无限制",
      kimiAdditionalCredits: "充值加油包",
    })[key] ?? fallback;

  assert.deepEqual(
    buildKimiBillingCardRows(
      {
        ...baseBilling,
        extraCreditsMinorUnits: 0,
        monthlyLimitEnabled: false,
        extraUsageStatus: "disabled",
      },
      "zh-CN",
      translate
    ),
    [
      { kind: "balance", label: "加油包余额", value: "¥0.00" },
      { kind: "status", label: "额度加油包", value: "已关闭" },
      { kind: "status", label: "每月限额", value: "无限制" },
      {
        kind: "link",
        label: "充值加油包",
        href: KIMI_CODE_ADDITIONAL_CREDITS_URL,
        target: "_blank",
        rel: "noreferrer noopener",
      },
    ]
  );
});

test("Kimi billing sanitizer strips private fields and rejects forged public contracts", () => {
  const billing = sanitizeKimiBillingStatus({
    currency: "cny",
    extraCreditsMinorUnits: 0,
    monthlyUsedMinorUnits: 250,
    monthlyLimitEnabled: true,
    monthlyLimitMinorUnits: 5000,
    extraUsageStatus: "disabled",
    paymentMethodId: "secret",
    additionalCreditsUrl: KIMI_CODE_ADDITIONAL_CREDITS_URL,
    rawBody: "secret",
  });

  assert.deepEqual(billing, {
    currency: "CNY",
    extraCreditsMinorUnits: 0,
    monthlyUsedMinorUnits: 250,
    monthlyLimitEnabled: true,
    monthlyLimitMinorUnits: 5000,
    extraUsageStatus: "disabled",
    additionalCreditsUrl: KIMI_CODE_ADDITIONAL_CREDITS_URL,
  });
  assert.equal(buildKimiBillingCardRows(billing!, "zh-CN")[0]?.value, "¥0.00");
  assert.equal(isKimiBillingStatus(billing!), true);
  assert.deepEqual(sanitizeProviderBillingStatus(billing), billing);

  for (const forged of [
    { ...baseBilling, currency: "US<script>" },
    { ...baseBilling, extraUsageStatus: "attacker-controlled" },
    { ...baseBilling, additionalCreditsUrl: "https://attacker.invalid/credits" },
  ]) {
    assert.equal(sanitizeKimiBillingStatus(forged), undefined);
  }
});

test("Provider Limits registers both Kimi Coding billing providers", () => {
  for (const provider of ["kimi-coding", "kimi-coding-apikey"]) {
    assert.equal(isProviderBillingProvider(provider), true);
    assert.ok((USAGE_SUPPORTED_PROVIDERS as readonly string[]).includes(provider));
  }
  assert.equal(PROVIDER_LABEL["kimi-coding"], "Kimi Coding");
});
