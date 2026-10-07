"use client";

import { useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { getBarColor } from "../utils";
import { translateUsageOrFallback } from "../i18nFallback";

interface KiloPassMeterProps {
  base: number;
  bonus: number;
  used: number;
  total: number;
  remaining: number;
  nextBillingAt?: string | null;
  balance?: number | null;
}

function formatCurrency(value: number, currency: string = "USD"): string {
  return value.toLocaleString(undefined, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function calculateDaysUntil(dateString: string | null | undefined): number | null {
  if (!dateString) return null;
  try {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return null;
    const now = Date.now();
    const diff = date.getTime() - now;
    if (diff <= 0) return null;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  } catch {
    return null;
  }
}

type KiloPassMeterValues = Pick<
  KiloPassMeterProps,
  "base" | "bonus" | "used" | "total" | "remaining"
>;

function nonNegativeNumber(value: number): number {
  return Number.isFinite(value) ? Math.max(0, value) : 0;
}

function percentage(value: number, total: number): number {
  return total > 0 ? Math.min(100, (value / total) * 100) : 0;
}

export function buildKiloPassMeterModel({
  base,
  bonus,
  used,
  total,
  remaining,
}: KiloPassMeterValues) {
  const paid = nonNegativeNumber(base);
  const bonusAmount = nonNegativeNumber(bonus);
  const usedAmount = nonNegativeNumber(used);
  const totalAmount = nonNegativeNumber(total);
  const remainingAmount = nonNegativeNumber(remaining);
  const paidUsed = Math.min(usedAmount, paid);
  const bonusUsed = Math.min(Math.max(usedAmount - paid, 0), bonusAmount);

  return {
    paid,
    bonus: bonusAmount,
    used: usedAmount,
    total: totalAmount,
    remaining: remainingAmount,
    progressValue: Math.min(totalAmount, usedAmount),
    paidPercent: percentage(paid, totalAmount),
    bonusPercent: percentage(bonusAmount, totalAmount),
    paidUsedPercent: percentage(paidUsed, paid),
    bonusUsedPercent: percentage(bonusUsed, bonusAmount),
    hasPaidSegment: paid > 0,
    hasBonusSegment: bonusAmount > 0,
  };
}

export default function KiloPassMeter({
  base,
  bonus,
  used,
  total,
  remaining,
  nextBillingAt,
  balance,
}: KiloPassMeterProps) {
  const t = useTranslations("usage");
  const locale = useLocale();

  const model = useMemo(
    () => buildKiloPassMeterModel({ base, bonus, used, total, remaining }),
    [base, bonus, used, total, remaining]
  );

  const colors = getBarColor(
    model.total > 0 ? 100 - (model.progressValue / model.total) * 100 : 100
  );
  const daysUntilRenewal = calculateDaysUntil(nextBillingAt);
  const renewalDate = nextBillingAt
    ? new Date(nextBillingAt).toLocaleDateString(locale, {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <div className="flex flex-col gap-2 py-2">
      {/* Header: Usage / Total */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-[12px] font-medium text-text-main">
          {translateUsageOrFallback(t, "kiloPassUsageLabel", "This month's usage")}
        </span>
        <span className="text-[12px] font-bold tabular-nums" style={{ color: colors.text }}>
          {formatCurrency(model.used)} / {formatCurrency(model.total)}
        </span>
      </div>

      <div className="flex flex-col gap-1.5">
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={model.total}
          aria-valuenow={model.progressValue}
          aria-valuetext={`${formatCurrency(model.used)} of ${formatCurrency(model.total)}`}
          aria-label={translateUsageOrFallback(t, "kiloPassMeterLabel", "Kilo Pass usage meter")}
          className="flex h-3 min-w-0 overflow-hidden rounded-full bg-bg-subtle ring-1 ring-inset ring-border/60"
        >
          {model.hasPaidSegment && (
            <div
              data-kilo-pass-segment="paid"
              data-kilo-pass-boundary={model.hasBonusSegment ? "true" : undefined}
              className={`relative min-w-0 bg-emerald-500/15 ${
                model.hasBonusSegment ? "border-r-2 border-text-muted" : ""
              }`}
              style={{ width: `${model.paidPercent}%` }}
              aria-hidden="true"
            >
              <div
                className="absolute inset-y-0 left-0 bg-emerald-500 transition-[width] duration-300 ease-out"
                style={{ width: `${model.paidUsedPercent}%` }}
              />
            </div>
          )}
          {model.hasBonusSegment && (
            <div
              data-kilo-pass-segment="bonus"
              className="relative min-w-0 bg-sky-500/15"
              style={{ width: `${model.bonusPercent}%` }}
              aria-hidden="true"
            >
              <div
                className="absolute inset-y-0 left-0 bg-sky-500 transition-[width] duration-300 ease-out"
                style={{ width: `${model.bonusUsedPercent}%` }}
              />
            </div>
          )}
        </div>

        <div className="flex min-w-0 items-start text-[11px] text-text-main">
          {model.hasPaidSegment && (
            <div className="min-w-0" style={{ width: `${model.paidPercent}%` }}>
              <div className="flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-0.5 leading-4">
                <span
                  className="inline-block size-2 shrink-0 rounded-full bg-emerald-500"
                  aria-hidden="true"
                />
                <span>{translateUsageOrFallback(t, "kiloPassPaid", "Paid")}</span>
              </div>
              <span className="block pt-0.5 font-semibold tabular-nums">
                {formatCurrency(model.paid)}
              </span>
            </div>
          )}
          {model.hasBonusSegment && (
            <div className="min-w-0" style={{ width: `${model.bonusPercent}%` }}>
              <div className="flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-0.5 leading-4">
                <span
                  className="inline-block size-2 shrink-0 rounded-full bg-sky-500"
                  aria-hidden="true"
                />
                <span>{translateUsageOrFallback(t, "kiloPassBonus", "Available bonus")}</span>
              </div>
              <span className="block pt-0.5 font-semibold tabular-nums">
                {formatCurrency(model.bonus)}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-text-main">
        <div className="flex items-center gap-1.5">
          <span
            className="material-symbols-outlined text-[13px] text-text-muted"
            aria-hidden="true"
          >
            account_balance_wallet
          </span>
          <span>{translateUsageOrFallback(t, "kiloPassRemaining", "Remaining")}</span>
          <span className="font-semibold tabular-nums">{formatCurrency(model.remaining)}</span>
        </div>
      </div>

      {/* Renewal info */}
      {daysUntilRenewal !== null && renewalDate && (
        <div className="flex items-center gap-1.5 text-[11px] text-text-muted">
          <span className="material-symbols-outlined text-[13px]" aria-hidden="true">
            schedule
          </span>
          <span>
            {translateUsageOrFallback(t, "kiloPassRenews", "Renews in {count} days", {
              count: daysUntilRenewal,
            })}
          </span>
          <span className="tabular-nums">({renewalDate})</span>
        </div>
      )}

      {/* Account Balance (separate from Kilo Pass) */}
      {balance !== null && balance !== undefined && (
        <div className="flex items-center justify-between gap-2 border-t border-border/40 pt-2 text-[11px]">
          <div className="flex items-center gap-1.5">
            <span
              className="material-symbols-outlined text-[13px] text-text-muted"
              aria-hidden="true"
            >
              payments
            </span>
            <span className="text-text-main">
              {translateUsageOrFallback(t, "kiloAccountBalance", "Account Balance")}
            </span>
          </div>
          <span className="font-semibold tabular-nums text-text-main">
            {formatCurrency(balance)}
          </span>
        </div>
      )}
    </div>
  );
}
