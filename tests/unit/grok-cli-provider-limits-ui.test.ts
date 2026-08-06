import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-grok-limits-ui-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.STORAGE_ENCRYPTION_KEY = "grok-provider-limits-ui-test-key-32-bytes-minimum";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const { parseQuotaData, resolvePlanValue, buildProviderLimitsResolvedPlans, normalizePlanTier } =
  await import("../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/utils.tsx");
const { PROVIDER_LABEL } =
  await import("../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/constants.ts");
const { USAGE_SUPPORTED_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
const {
  buildGrokBillingCardRows,
  formatGrokMinorUnits,
  GROK_BUILD_ADDITIONAL_CREDITS_URL,
  sanitizeGrokBillingStatus,
} = await import("../../src/shared/utils/grokBilling.ts");
type GrokBillingTranslator =
  typeof import("../../src/shared/utils/grokBilling.ts").GrokBillingTranslator;

const baseBilling = {
  currency: "USD" as const,
  autoTopUp: { available: false },
  additionalCreditsUrl: GROK_BUILD_ADDITIONAL_CREDITS_URL,
};

test.after(() => {
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("Grok Build product aliases normalize to one stable row and preserve collisions", () => {
  const parsed = parseQuotaData("grok-cli", {
    quotas: {
      weekly: {
        used: 37.25,
        total: 100,
        remaining: 62.75,
        remainingPercentage: 62.75,
        resetAt: "2099-08-03T00:00:00.000Z",
        isPercentageOnly: true,
      },
      product_grok_build: {
        displayName: "Grok Build",
        used: 12.5,
        total: 100,
        remaining: 87.5,
        remainingPercentage: 87.5,
        resetAt: "2099-08-03T00:00:00.000Z",
        isPercentageOnly: true,
      },
      product_grok_build_2: {
        displayName: "Grok Build",
        used: 25,
        total: 100,
        remaining: 75,
        remainingPercentage: 75,
        resetAt: "2099-08-03T00:00:00.000Z",
        isPercentageOnly: true,
      },
    },
  });

  assert.deepEqual(
    parsed.map(({ name, displayName, remainingPercentage }) => ({
      name,
      displayName,
      remainingPercentage,
    })),
    [
      { name: "weekly", displayName: undefined, remainingPercentage: 62.75 },
      { name: "product_grok_build", displayName: "Grok Build", remainingPercentage: 87.5 },
      { name: "product_grok_build_2", displayName: "Grok Build", remainingPercentage: 75 },
    ]
  );
});

test("grok-cli plan display never infers persisted provider-specific tiers", () => {
  assert.equal(
    resolvePlanValue(
      null,
      { subscriptionTier: "Persisted Secret Tier", plan: "Persisted Plan" },
      "grok-cli"
    ),
    null
  );
  assert.equal(
    resolvePlanValue(
      "Future Experimental Tier",
      { subscriptionTier: "Persisted Tier" },
      "grok-cli"
    ),
    "Future Experimental Tier"
  );
});

test("page-level tier stats/filters ignore persisted Grok Free/Enterprise without live plan", () => {
  const connections = [
    {
      id: "grok-free",
      provider: "grok-cli",
      providerSpecificData: {
        tier: "Free",
        plan: "Free",
        subscriptionTier: "Free",
      },
    },
    {
      id: "grok-enterprise",
      provider: "grok-cli",
      providerSpecificData: {
        tier: "Enterprise",
        plan: "Enterprise",
        subscriptionTier: "Enterprise",
      },
    },
    {
      id: "grok-live",
      provider: "grok-cli",
      providerSpecificData: {
        tier: "Free",
        plan: "Free",
        subscriptionTier: "Free",
      },
    },
    {
      id: "codex-fallback",
      provider: "codex",
      providerSpecificData: { chatgptPlanType: "Pro" },
    },
    {
      id: "claude-fallback",
      provider: "claude",
      providerSpecificData: { plan: "Pro" },
    },
  ];

  const quotaData = {
    "grok-free": { plan: null },
    "grok-enterprise": {},
    "grok-live": { plan: "Enterprise" },
    "codex-fallback": { plan: "unknown" },
    "claude-fallback": { plan: null },
  };

  const resolvedPlans = buildProviderLimitsResolvedPlans(connections, quotaData);
  assert.equal(resolvedPlans["grok-free"], null);
  assert.equal(resolvedPlans["grok-enterprise"], null);
  assert.equal(resolvedPlans["grok-live"], "Enterprise");
  assert.equal(resolvedPlans["codex-fallback"], "Pro");
  assert.equal(resolvedPlans["claude-fallback"], "Pro");

  const tierByConnection = Object.fromEntries(
    connections.map((conn) => [conn.id, normalizePlanTier(resolvedPlans[conn.id])])
  );

  assert.equal(tierByConnection["grok-free"].key, "unknown");
  assert.equal(tierByConnection["grok-enterprise"].key, "unknown");
  assert.equal(tierByConnection["grok-live"].key, "enterprise");
  assert.equal(tierByConnection["codex-fallback"].key, "pro");
  assert.equal(tierByConnection["claude-fallback"].key, "pro");

  // Filter/stat bucket classification must not invent Free/Enterprise from PSD.
  assert.notEqual(tierByConnection["grok-free"].key, "free");
  assert.notEqual(tierByConnection["grok-enterprise"].key, "enterprise");

  const tierCounts = {
    free: 0,
    enterprise: 0,
    pro: 0,
    unknown: 0,
  };
  for (const conn of connections) {
    const key = tierByConnection[conn.id]?.key || "unknown";
    if (key in tierCounts) tierCounts[key] += 1;
  }

  assert.equal(tierCounts.free, 0);
  assert.equal(tierCounts.enterprise, 1); // only live Grok Enterprise
  assert.equal(tierCounts.pro, 2); // Codex + Claude fallbacks unchanged
  assert.equal(tierCounts.unknown, 2); // persisted Free + Enterprise without live plan
});

test("Grok billing rows omit a missing balance and show an explicit localized zero", () => {
  const missing = buildGrokBillingCardRows(baseBilling, "en-US");
  assert.equal(
    missing.some((row) => row.kind === "balance"),
    false
  );
  assert.deepEqual(missing[0], {
    kind: "status",
    label: "Auto Top-Up",
    value: "Unavailable",
  });

  const zero = buildGrokBillingCardRows({ ...baseBilling, extraCreditsMinorUnits: 0 }, "de-DE");
  assert.deepEqual(zero[0], {
    kind: "balance",
    label: "Extra Usage Credits",
    value: "0,00 $",
  });
});

test("Grok billing rows distinguish disabled and unavailable and translate enabled details", () => {
  const translate: GrokBillingTranslator = (key, fallback) =>
    ({
      grokExtraUsageCredits: "Credits translated",
      grokAutoTopUp: "Top-up translated",
      grokAutoTopUpEnabled: "On translated",
      grokAutoTopUpAt: "threshold translated",
      grokAutoTopUpAdd: "add translated",
      grokAutoTopUpMax: "maximum translated",
      grokAutoTopUpMonth: "month translated",
      grokAdditionalCredits: "Buy translated",
    })[key] ?? fallback;

  const disabled = buildGrokBillingCardRows(
    { ...baseBilling, autoTopUp: { available: true, enabled: false } },
    "en-US",
    translate
  );
  assert.equal(disabled.find((row) => row.kind === "status")?.value, "Disabled");

  const enabled = buildGrokBillingCardRows(
    {
      ...baseBilling,
      extraCreditsMinorUnits: 0,
      autoTopUp: {
        available: true,
        enabled: true,
        thresholdMinorUnits: 500,
        amountMinorUnits: 2000,
        maxMonthlyMinorUnits: 10000,
      },
    },
    "en-US",
    translate
  );
  assert.deepEqual(enabled, [
    { kind: "balance", label: "Credits translated", value: "$0.00" },
    {
      kind: "status",
      label: "Top-up translated",
      value:
        "On translated · threshold translated $5.00 · add translated $20.00 · maximum translated $100.00/month translated",
    },
    {
      kind: "link",
      label: "Buy translated",
      href: GROK_BUILD_ADDITIONAL_CREDITS_URL,
      target: "_blank",
      rel: "noreferrer noopener",
    },
  ]);
});

test("Provider Limits exposes only the sanitized Grok billing contract", () => {
  assert.ok(USAGE_SUPPORTED_PROVIDERS.includes("grok-cli"));
  assert.equal(PROVIDER_LABEL["grok-cli"], "Grok Build");

  const billing = sanitizeGrokBillingStatus({
    currency: "USD",
    extraCreditsMinorUnits: 0,
    autoTopUp: {
      available: true,
      enabled: true,
      thresholdMinorUnits: 500,
      amountMinorUnits: 2000,
      maxMonthlyMinorUnits: 10000,
      paymentMethodId: "secret",
    },
    additionalCreditsUrl: GROK_BUILD_ADDITIONAL_CREDITS_URL,
    rawBody: "secret",
  });

  assert.deepEqual(billing, {
    currency: "USD",
    extraCreditsMinorUnits: 0,
    autoTopUp: {
      available: true,
      enabled: true,
      thresholdMinorUnits: 500,
      amountMinorUnits: 2000,
      maxMonthlyMinorUnits: 10000,
    },
    additionalCreditsUrl: GROK_BUILD_ADDITIONAL_CREDITS_URL,
  });
  assert.equal(formatGrokMinorUnits(billing?.extraCreditsMinorUnits, "USD", "en-US"), "$0.00");
  assert.equal(formatGrokMinorUnits(billing?.autoTopUp.amountMinorUnits, "USD", "en-US"), "$20.00");

  assert.equal(
    sanitizeGrokBillingStatus({
      currency: "USD",
      autoTopUp: { available: false },
      additionalCreditsUrl: "https://attacker.invalid/credits",
    }),
    undefined
  );
});
