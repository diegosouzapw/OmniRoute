"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";

interface ProviderWindowCostRow {
  apiKeyKey: string;
  apiKeyId: string | null;
  apiKeyName: string;
  requests: number;
  totalTokens: number;
  costUsd: number;
  limitUsd: number | null;
  limitPeriod: string | null;
  limitUsedPercent: number | null;
  budgetResetAt: string | null;
  lastUsed: string | null;
}

interface ProviderWindowCostPayload {
  provider: string;
  connectionId: string | null;
  windowStartAt: string;
  windowResetAt: string | null;
  windowSource: "provider_weekly_reset" | "fallback_rolling_7d";
  windowStartSource:
    | "recorded_reset_event"
    | "observed_snapshot_reset"
    | "inferred_from_reset_at"
    | "fallback_rolling_7d";
  quotaName: string | null;
  quotaUsedPercent: number | null;
  quotaRemainingPercent: number | null;
  totalCostUsd: number;
  estimatedFullQuotaUsd: number | null;
  rows: ProviderWindowCostRow[];
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  connection: any;
  providerLabel: string;
  accountLabel: string;
}

function formatUsd(value: number | null | undefined): string {
  const numeric = Number(value || 0);
  const abs = Math.abs(numeric);
  const digits = abs > 0 && abs < 0.01 ? 6 : abs < 1 ? 4 : 2;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(numeric);
}

function formatDateTime(value: string | null | undefined, fallback: string): string {
  if (!value) return fallback;
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) return fallback;
  return date.toLocaleString([], {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatPercent(value: number | null | undefined): string {
  if (value === null || value === undefined || !Number.isFinite(value)) return "n/a";
  return `${value.toFixed(value % 1 === 0 ? 0 : 1)}%`;
}

export default function ProviderUsdCostModal({
  isOpen,
  onClose,
  connection,
  providerLabel,
  accountLabel,
}: Props) {
  const t = useTranslations("usageLimits");
  const [payload, setPayload] = useState<ProviderWindowCostPayload | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [simulatedPercent, setSimulatedPercent] = useState(25);

  useEffect(() => {
    if (!isOpen || !connection?.provider) return;
    let alive = true;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({ provider: String(connection.provider) });
        if (connection.id) params.set("connectionId", String(connection.id));
        const response = await fetch(`/api/usage/provider-window-costs?${params.toString()}`);
        if (!response.ok) {
          const body = await response.json().catch(() => ({}));
          throw new Error(body.error || `HTTP ${response.status}`);
        }
        const data = (await response.json()) as ProviderWindowCostPayload;
        if (alive) setPayload(data);
      } catch (loadError) {
        if (alive) {
          setError(loadError instanceof Error ? loadError.message : t("loadUsdCostsFailed"));
          setPayload(null);
        }
      } finally {
        if (alive) setLoading(false);
      }
    }

    void load();
    return () => {
      alive = false;
    };
  }, [isOpen, connection?.id, connection?.provider, t]);

  const maxCost = useMemo(
    () => Math.max(...(payload?.rows || []).map((row) => row.costUsd), 0),
    [payload]
  );
  const simulatedUsd =
    payload?.estimatedFullQuotaUsd !== null && payload?.estimatedFullQuotaUsd !== undefined
      ? (payload.estimatedFullQuotaUsd * simulatedPercent) / 100
      : null;

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 py-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl max-h-[88vh] overflow-hidden rounded-lg border border-border bg-surface shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
          <div>
            <h2 className="m-0 text-lg font-semibold text-text-main">{t("usdCost")}</h2>
            <p className="mt-1 text-xs text-text-muted">
              {providerLabel} · {accountLabel || connection?.id}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-bg-subtle text-text-main hover:bg-black/[0.04] dark:hover:bg-white/[0.04]"
            aria-label={t("close")}
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-4">
          {loading ? (
            <div className="flex items-center gap-2 text-sm text-text-muted">
              <span className="material-symbols-outlined animate-spin text-[16px]">
                progress_activity
              </span>
              {t("loadingUsdCosts")}
            </div>
          ) : error ? (
            <div className="flex items-start gap-2 rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-500">
              <span className="material-symbols-outlined text-[16px]">error</span>
              {error}
            </div>
          ) : payload ? (
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                <div className="rounded-md border border-border bg-bg-subtle px-3 py-2">
                  <div className="text-[10px] uppercase tracking-wide text-text-muted">
                    {t("used")}
                  </div>
                  <div className="mt-1 text-lg font-semibold tabular-nums text-text-main">
                    {formatUsd(payload.totalCostUsd)}
                  </div>
                </div>
                <div className="rounded-md border border-border bg-bg-subtle px-3 py-2">
                  <div className="text-[10px] uppercase tracking-wide text-text-muted">
                    {t("quotaUsed")}
                  </div>
                  <div className="mt-1 text-lg font-semibold tabular-nums text-text-main">
                    {formatPercent(payload.quotaUsedPercent)}
                  </div>
                </div>
                <div className="rounded-md border border-border bg-bg-subtle px-3 py-2">
                  <div className="text-[10px] uppercase tracking-wide text-text-muted">
                    {t("estimatedFullQuota")}
                  </div>
                  <div className="mt-1 text-lg font-semibold tabular-nums text-text-main">
                    {payload.estimatedFullQuotaUsd === null
                      ? "n/a"
                      : formatUsd(payload.estimatedFullQuotaUsd)}
                  </div>
                </div>
                <div className="rounded-md border border-border bg-bg-subtle px-3 py-2">
                  <div className="text-[10px] uppercase tracking-wide text-text-muted">
                    {t("rows")}
                  </div>
                  <div className="mt-1 text-lg font-semibold tabular-nums text-text-main">
                    {payload.rows.length}
                  </div>
                </div>
              </div>

              <div className="rounded-md border border-border bg-surface px-3 py-3">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-text-muted">
                  <span>
                    {t("window")}: {formatDateTime(payload.windowStartAt, t("unknown"))} →{" "}
                    {formatDateTime(payload.windowResetAt, t("unknown"))}
                  </span>
                  <span>
                    {payload.windowStartSource === "recorded_reset_event"
                      ? t("fromRecordedReset", { quota: payload.quotaName || t("weeklyQuota") })
                      : payload.windowStartSource === "observed_snapshot_reset"
                        ? t("fromObservedReset", { quota: payload.quotaName || t("weeklyQuota") })
                        : payload.windowSource === "provider_weekly_reset"
                          ? t("fromReset", { quota: payload.quotaName || t("weeklyQuota") })
                          : t("fallbackRollingDaysShort", { days: 7 })}
                  </span>
                </div>
                <div className="mt-3 flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-3 text-xs">
                    <span className="font-medium text-text-main">{t("quotaEstimator")}</span>
                    <span className="tabular-nums text-text-main">
                      {simulatedPercent}% ={" "}
                      {simulatedUsd === null ? "n/a" : formatUsd(simulatedUsd)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    step="1"
                    value={simulatedPercent}
                    onChange={(event) => setSimulatedPercent(Number(event.target.value))}
                    className="w-full accent-[var(--color-primary,#E54D5E)]"
                    disabled={payload.estimatedFullQuotaUsd === null}
                  />
                </div>
              </div>

              {payload.rows.length === 0 ? (
                <div className="rounded-md border border-border px-3 py-8 text-center text-sm text-text-muted">
                  {t("noApiKeyUsage")}
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {payload.rows.map((row) => {
                    const barPercent = maxCost > 0 ? Math.max(4, (row.costUsd / maxCost) * 100) : 0;
                    return (
                      <div
                        key={row.apiKeyKey}
                        className="rounded-md border border-border bg-surface px-3 py-2"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="truncate text-sm font-semibold text-text-main">
                              {row.apiKeyName}
                            </div>
                            <div className="mt-0.5 text-[11px] text-text-muted">
                              {t("requestTokenCounts", {
                                requests: row.requests.toLocaleString(),
                                tokens: row.totalTokens.toLocaleString(),
                              })}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-semibold tabular-nums text-text-main">
                              {formatUsd(row.costUsd)}
                            </div>
                            {row.limitUsd ? (
                              <div className="mt-0.5 text-[11px] tabular-nums text-text-muted">
                                {formatPercent(row.limitUsedPercent)} of {formatUsd(row.limitUsd)}
                                {row.limitPeriod ? ` ${row.limitPeriod}` : ""}
                              </div>
                            ) : (
                              <div className="mt-0.5 text-[11px] text-text-muted">
                                {t("noUsdLimit")}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="mt-2 h-2 overflow-hidden rounded-sm bg-border/60">
                          <div
                            className="h-full rounded-sm bg-[var(--color-primary,#E54D5E)]"
                            style={{ width: `${barPercent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
