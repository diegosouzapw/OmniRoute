// @vitest-environment jsdom
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { parseQuotaData } from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/quotaParsing";
import QuotaCardExpanded from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/parts/QuotaCardExpanded";
import KiloPassMeter, {
  buildKiloPassMeterModel,
} from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/parts/KiloPassMeter";

vi.mock("next-intl", () => ({
  useLocale: () => "en-US",
  useTranslations: () =>
    Object.assign(
      (key: string, values?: { count?: number; pct?: number }) => {
        if (key === "kiloPassUsageLabel") return "This month's usage";
        if (key === "kiloPassPaid") return "Paid";
        if (key === "kiloPassBonus") return "Available bonus";
        if (key === "kiloPassRemaining") return "Remaining";
        if (key === "kiloAccountBalance") return "Account Balance";
        if (key === "percentLeft") return `${values?.pct}% left`;
        return key;
      },
      { has: () => true }
    ),
}));

const rawKilocodeUsage = {
  quotas: {
    balance: {
      remaining: 11.51,
      remainingPercentage: 100,
      currency: "USD",
      displayName: "Personal Balance",
      unlimited: true,
    },
    kiloPassBase: {
      total: 49,
      remaining: 49,
      resetAt: "2030-09-15T00:00:00.000Z",
    },
    kiloPassBonus: { total: 24.5, remaining: 24.5 },
    kiloPassUsage: {
      used: 73.55,
      total: 73.5,
      resetAt: "2030-09-15T00:00:00.000Z",
    },
    kiloPassRemaining: { remaining: 0, total: 73.5 },
  },
};

describe("Kilo Pass meter production render path", () => {
  it("renders the dedicated meter rather than a generic 0% left quota row", () => {
    const quotas = parseQuotaData("kilocode", rawKilocodeUsage);
    const kiloPass = quotas.find((quota) => quota.kiloPass);

    expect(kiloPass).toMatchObject({
      name: "kiloPass",
      kiloPass: true,
      kiloPassBase: 49,
      kiloPassBonus: 24.5,
      used: 73.55,
      total: 73.5,
      remaining: 0,
      kiloPassBalance: 11.51,
    });

    const html = renderToStaticMarkup(
      <QuotaCardExpanded
        quotas={quotas}
        providerId="kilocode"
        loading={false}
        error={null}
        hasStaleData={false}
        onRefresh={() => {}}
        onOpenCutoff={() => {}}
        onOpenCost={() => {}}
        canEditCutoff={false}
        hasCutoffOverrides={false}
      />
    );

    expect(html).toContain("This month&#x27;s usage");
    expect(html).toContain("Paid");
    expect(html).toContain("Available bonus");
    expect(html).toContain("Remaining");
    expect(html).toContain("Account Balance");
    expect(html).toContain("$73.55");
    expect(html).toContain("$73.50");
    expect(html).toContain('aria-valuemax="73.5"');
    expect(html).toContain('aria-valuenow="73.5"');
    expect(html).not.toContain("0% left");
  });
});

const renderMeter = (props: Partial<React.ComponentProps<typeof KiloPassMeter>> = {}) =>
  renderToStaticMarkup(
    <KiloPassMeter
      base={49}
      bonus={24.5}
      used={47.95}
      total={73.5}
      remaining={25.55}
      balance={11.51}
      {...props}
    />
  );

describe("KiloPassMeter segment model", () => {
  it("splits the pool into paid and bonus segments and uses paid credits first", () => {
    const model = buildKiloPassMeterModel({
      base: 49,
      bonus: 24.5,
      used: 47.95,
      total: 73.5,
      remaining: 25.55,
    });

    expect(model.paidPercent).toBeCloseTo(66.67, 1);
    expect(model.bonusPercent).toBeCloseTo(33.33, 1);
    expect(model.paidUsedPercent).toBeCloseTo(97.86, 1);
    expect(model.bonusUsedPercent).toBe(0);
  });

  it("fills paid completely before consuming the bonus segment", () => {
    const model = buildKiloPassMeterModel({
      base: 49,
      bonus: 24.5,
      used: 60,
      total: 73.5,
      remaining: 13.5,
    });

    expect(model.paidUsedPercent).toBe(100);
    expect(model.bonusUsedPercent).toBeCloseTo(44.9, 1);
  });

  it("fills both segments exactly when usage reaches the total", () => {
    const model = buildKiloPassMeterModel({
      base: 49,
      bonus: 24.5,
      used: 73.5,
      total: 73.5,
      remaining: 0,
    });

    expect(model.paidUsedPercent).toBe(100);
    expect(model.bonusUsedPercent).toBe(100);
    expect(model.progressValue).toBe(73.5);
  });

  it("clamps only visual progress when usage exceeds the total", () => {
    const model = buildKiloPassMeterModel({
      base: 49,
      bonus: 24.5,
      used: 73.55,
      total: 73.5,
      remaining: 0,
    });

    expect(model.used).toBe(73.55);
    expect(model.progressValue).toBe(73.5);
    expect(model.paidUsedPercent).toBe(100);
    expect(model.bonusUsedPercent).toBe(100);
  });

  it("handles absent paid or bonus pools and zero totals without NaN percentages", () => {
    const onlyPaid = buildKiloPassMeterModel({
      base: 49,
      bonus: 0,
      used: 10,
      total: 49,
      remaining: 39,
    });
    const onlyBonus = buildKiloPassMeterModel({
      base: 0,
      bonus: 24.5,
      used: 10,
      total: 24.5,
      remaining: 14.5,
    });
    const empty = buildKiloPassMeterModel({
      base: 0,
      bonus: 0,
      used: 0,
      total: 0,
      remaining: 0,
    });

    expect(onlyPaid.bonusPercent).toBe(0);
    expect(onlyBonus.paidPercent).toBe(0);
    expect(empty.paidPercent).toBe(0);
    expect(empty.bonusPercent).toBe(0);
    expect(empty.paidUsedPercent).toBe(0);
    expect(empty.bonusUsedPercent).toBe(0);
  });
});

describe("KiloPassMeter segmented presentation", () => {
  it("renders two labeled segments, their boundary, semantic usage, and separate account balance", () => {
    const html = renderMeter();

    expect(html).toContain('data-kilo-pass-segment="paid"');
    expect(html).toContain('data-kilo-pass-segment="bonus"');
    expect(html).toContain('data-kilo-pass-boundary="true"');
    expect(html).toContain('aria-valuemin="0"');
    expect(html).toContain('aria-valuemax="73.5"');
    expect(html).toContain('aria-valuenow="47.95"');
    expect(html).toContain("Paid");
    expect(html).toContain("Available bonus");
    expect(html).toContain("Account Balance");
    expect(html).toContain("$11.51");
    expect(html).not.toContain("kiloPassBase");
    expect(html).not.toContain("kiloPassBonus");
    expect(html).not.toContain("kiloPassUsage");
  });

  it("omits the bonus segment and boundary when no free bonus exists", () => {
    const html = renderMeter({ bonus: 0, total: 49, used: 10, remaining: 39 });

    expect(html).toContain('data-kilo-pass-segment="paid"');
    expect(html).not.toContain('data-kilo-pass-segment="bonus"');
    expect(html).not.toContain('data-kilo-pass-boundary="true"');
  });

  it("omits the paid segment when only the free bonus pool exists", () => {
    const html = renderMeter({ base: 0, bonus: 24.5, total: 24.5, used: 10, remaining: 14.5 });

    expect(html).not.toContain('data-kilo-pass-segment="paid"');
    expect(html).toContain('data-kilo-pass-segment="bonus"');
  });

  it("keeps the real overage in text while clamping its accessible progress value", () => {
    const html = renderMeter({ used: 73.55, remaining: 0 });

    expect(html).toContain("$73.55 / $73.50");
    expect(html).toContain('aria-valuenow="73.5"');
  });

  it("renders a stable empty meter for a zero total", () => {
    const html = renderMeter({ base: 0, bonus: 0, used: 0, total: 0, remaining: 0, balance: null });

    expect(html).toContain('aria-valuemax="0"');
    expect(html).toContain('aria-valuenow="0"');
    expect(html).not.toContain("NaN");
  });
});
