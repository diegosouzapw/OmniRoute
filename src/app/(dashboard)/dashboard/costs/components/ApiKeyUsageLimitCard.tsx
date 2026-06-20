"use client";

import { useEffect, useMemo, useState } from "react";
import { Card } from "@/shared/components";

export interface ApiKeyUsageLimitPayload {
  key: {
    id: string;
    name: string;
    usageLimitEnabled: boolean;
    dailyUsageLimitUsd: number | null;
    weeklyUsageLimitUsd: number | null;
  };
  status: {
    enabled: boolean;
    dailyLimitUsd: number | null;
    weeklyLimitUsd: number | null;
    dailySpentUsd: number;
    weeklySpentUsd: number;
    dailyWindowStartIso: string;
    weeklyWindowStartIso: string;
    weeklyResetAtIso: string | null;
    dailyExceeded: boolean;
    weeklyExceeded: boolean;
  };
}

export interface ApiKeyUsageLimitSavePayload {
  usageLimitEnabled: boolean;
  dailyUsageLimitUsd: number | null;
  weeklyUsageLimitUsd: number | null;
}

function createCurrencyFormatter(locale: string) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function parseUsdInput(value: string): number | null {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

function formatResetHint(resetAtIso: string | null): string {
  if (!resetAtIso) return "fallback: rolling 7 days";
  const resetMs = Date.parse(resetAtIso);
  if (!Number.isFinite(resetMs)) return "fallback: rolling 7 days";
  const deltaMs = resetMs - Date.now();
  if (deltaMs <= 0) return "reset due now";
  const hourMs = 60 * 60 * 1000;
  const dayMs = 24 * hourMs;
  if (deltaMs < dayMs) return `resets in ${Math.max(1, Math.ceil(deltaMs / hourMs))}h`;
  return `resets in ${Math.max(1, Math.ceil(deltaMs / dayMs))}d`;
}

function UsageQuotaMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border/20 bg-surface/20 px-4 py-3">
      <p className="text-xs uppercase tracking-wide text-text-muted font-semibold">{label}</p>
      <p className="text-lg font-semibold text-text-main mt-1">{value}</p>
    </div>
  );
}

export function ApiKeyUsageLimitCard({
  payload,
  loading,
  locale,
  onSave,
}: {
  payload: ApiKeyUsageLimitPayload | null;
  loading: boolean;
  locale: string;
  onSave: (next: ApiKeyUsageLimitSavePayload) => Promise<void>;
}) {
  const [enabled, setEnabled] = useState(false);
  const [dailyLimit, setDailyLimit] = useState("");
  const [weeklyLimit, setWeeklyLimit] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!payload) return;
    setEnabled(payload.key.usageLimitEnabled);
    setDailyLimit(
      typeof payload.key.dailyUsageLimitUsd === "number"
        ? String(payload.key.dailyUsageLimitUsd)
        : ""
    );
    setWeeklyLimit(
      typeof payload.key.weeklyUsageLimitUsd === "number"
        ? String(payload.key.weeklyUsageLimitUsd)
        : ""
    );
    setError(null);
  }, [payload]);

  const formatter = useMemo(() => createCurrencyFormatter(locale), [locale]);
  const status = payload?.status;

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      await onSave({
        usageLimitEnabled: enabled,
        dailyUsageLimitUsd: parseUsdInput(dailyLimit),
        weeklyUsageLimitUsd: parseUsdInput(weeklyLimit),
      });
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Failed to save usage limits");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="p-5 border-emerald-500/20">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-400 text-lg">paid</span>
            <h3 className="text-sm font-semibold text-text-main">API key USD quota</h3>
            {payload?.key.name && (
              <span className="truncate rounded bg-surface px-2 py-0.5 text-xs text-text-muted">
                {payload.key.name}
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-text-muted">
            When enabled, @@om-usage returns daily quota, weekly quota, daily spend, and weekly
            spend in USD. Weekly follows the cached Claude reset when available.
          </p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          disabled={loading || !payload}
          onClick={() => setEnabled((prev) => !prev)}
          className={`inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md border px-3 py-2 text-xs font-semibold transition-colors ${
            enabled
              ? "border-emerald-500/30 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
              : "border-border bg-black/5 text-text-muted dark:bg-white/5"
          } ${loading || !payload ? "opacity-50" : ""}`}
        >
          <span className="material-symbols-outlined text-[14px]">paid</span>
          {enabled ? "Enabled" : "Disabled"}
        </button>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <UsageQuotaMetric
          label="Daily spend"
          value={loading || !status ? "..." : formatter.format(status.dailySpentUsd)}
        />
        <UsageQuotaMetric
          label="Weekly spend"
          value={loading || !status ? "..." : formatter.format(status.weeklySpentUsd)}
        />
        <div className="rounded-lg border border-border/20 bg-surface/20 px-4 py-3">
          <label className="text-xs uppercase tracking-wide text-text-muted font-semibold">
            Daily quota
          </label>
          <input
            type="number"
            min={0}
            step="0.01"
            value={dailyLimit}
            onChange={(event) => setDailyLimit(event.target.value)}
            className="mt-2 w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm text-text-main"
            placeholder="0.00"
          />
        </div>
        <div className="rounded-lg border border-border/20 bg-surface/20 px-4 py-3">
          <label className="text-xs uppercase tracking-wide text-text-muted font-semibold">
            Weekly quota
          </label>
          <input
            type="number"
            min={0}
            step="0.01"
            value={weeklyLimit}
            onChange={(event) => setWeeklyLimit(event.target.value)}
            className="mt-2 w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm text-text-main"
            placeholder="0.00"
          />
          <p className="mt-1 text-[10px] text-text-muted">
            {formatResetHint(status?.weeklyResetAtIso ?? null)}
          </p>
        </div>
      </div>

      {error && <p className="mt-3 text-xs text-red-500">{error}</p>}
      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving || loading || !payload}
          className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-primary/90 disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-[14px]">
            {saving ? "hourglass_empty" : "save"}
          </span>
          {saving ? "Saving..." : "Save quota"}
        </button>
      </div>
    </Card>
  );
}
