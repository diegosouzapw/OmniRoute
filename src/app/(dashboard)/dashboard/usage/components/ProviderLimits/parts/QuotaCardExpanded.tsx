"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import {
  formatCountdown,
  formatQuotaLabel,
  getBarColor,
  getQuotaRemainingPercentage,
  getQuotaVisibilityKey,
  shouldShowQuotaUsageCount,
} from "../utils";
import QuotaMiniBar from "../QuotaMiniBar";
import { translateUsageOrFallback, type UsageTranslationValues } from "../i18nFallback";
import { hasFixedQuotaOrder } from "../quotaParsing";

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$",
  CNY: "¥",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  KRW: "₩",
  INR: "₹",
};

const DEFAULT_VISIBLE_ROWS = 3;

/** Pure helper — sorts quotas by remaining percentage, highest first. */
export function sortQuotasByRemaining(quotas: any[]): any[] {
  return [...quotas].sort(
    (a, b) => getQuotaRemainingPercentage(b) - getQuotaRemainingPercentage(a)
  );
}

/**
 * Pure helper — resolves the display order for a provider's quotas.
 * Providers with a deterministic fixed-window order (codex, glm family — see
 * quotaParsing.ts's sortCodexOrder()/sortGlmOrder()) keep the order
 * parseQuotaData() already established. Every other provider still gets the
 * remaining-percentage sort. Fixes #6687 (bars re-sorted by % undid the fixed
 * session/weekly order).
 */
export function resolveQuotaDisplayOrder(providerId: string | undefined, quotas: any[]): any[] {
  return hasFixedQuotaOrder(providerId) ? [...quotas] : sortQuotasByRemaining(quotas);
}

/** Pure helper — slices the sorted quotas down to the visible window. */
export function getVisibleQuotas(sortedQuotas: any[], expanded: boolean): any[] {
  return expanded ? sortedQuotas : sortedQuotas.slice(0, DEFAULT_VISIBLE_ROWS);
}

/**
 * Pure helper — the loading placeholder replaces the entire quota section
 * with a spinner. Swapping rows for a spinner mid-refresh collapses the card
 * height, which rebalances the outer CSS multi-column layout (provider groups
 * visibly jump between columns). Only the initial load (nothing to display
 * yet) may show the placeholder; a refresh keeps the stale rows rendered
 * while the refresh button icon spins, and the UI updates once new data
 * arrives.
 */
export function shouldShowLoadingPlaceholder(
  loading: boolean,
  quotaCount: number,
  message?: string | null
): boolean {
  return loading && quotaCount === 0 && !message;
}

interface Props {
  quotas: any[];
  providerId?: string;
  loading: boolean;
  error: string | null;
  message?: string | null;
  refreshedAt?: string;
  hasStaleData: boolean;
  onRefresh: () => void;
  onOpenCutoff: () => void;
  onOpenCost: () => void;
  onOpenResetCredits?: () => void;
  canEditCutoff: boolean;
  hasCutoffOverrides: boolean;
  canRedeemResetCredit?: boolean;
  redeemingResetCredit?: boolean;
  loadingResetCredits?: boolean;
  /** Per-operator quota row visibility (upstream 9router#2371 port). */
  hiddenQuotaRows?: any[];
  onHideQuota?: (quota: any) => void;
  onShowQuota?: (quota: any) => void;
}

function QuotaDetailRow({
  q,
  onHideQuota,
  onOpenResetCredits,
  loadingResetCredits = false,
}: {
  q: any;
  onHideQuota?: (quota: any) => void;
  onOpenResetCredits?: () => void;
  loadingResetCredits?: boolean;
}) {
  const t = useTranslations("usage");
  const canHide = typeof onHideQuota === "function" && !q.isCredits && !q.isResetCredits;
  if (q.isResetCredits) {
    const count = Number(q.creditCount ?? q.remaining ?? 0);
    const colors = getBarColor(q.remainingPercentage ?? 100);
    return (
      <div className="flex min-h-[34px] items-center justify-between gap-2 py-1">
        <span className="flex min-w-0 flex-1 items-center gap-1.5 text-[12px] font-medium leading-none text-text-main">
          <span className="inline-flex size-6 shrink-0 items-center justify-center">
            <span
              className="material-symbols-outlined text-[15px] leading-none"
              style={{ color: colors.text }}
            >
              restart_alt
            </span>
          </span>
          <span className="truncate leading-none">
            {translateUsageOrFallback(t, "resetCreditsLabel", "Reset credits")}
          </span>
        </span>
        <button
          type="button"
          disabled={!onOpenResetCredits || loadingResetCredits}
          onClick={(event) => {
            event.stopPropagation();
            onOpenResetCredits?.();
          }}
          aria-label={translateUsageOrFallback(t, "viewResetCredits", "View reset credits")}
          className="inline-flex h-6 shrink-0 items-center gap-1 rounded-md px-1.5 text-[12px] font-bold leading-none tabular-nums hover:bg-black/[0.05] disabled:cursor-default dark:hover:bg-white/[0.05]"
          style={{ color: colors.text }}
        >
          {loadingResetCredits && (
            <span className="material-symbols-outlined animate-spin text-[12px]">
              progress_activity
            </span>
          )}
          {count.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          <span className="material-symbols-outlined text-[13px]">chevron_right</span>
        </button>
      </div>
    );
  }

  if (q.isCredits) {
    const colors = getBarColor(q.remainingPercentage ?? 0);
    const sym = CURRENCY_SYMBOLS[q.currency] ?? q.currency ?? "";
    const amount = (q.creditCount ?? q.remaining ?? 0).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return (
      <div className="flex min-h-[34px] items-center justify-between gap-2 py-1">
        <span className="flex min-w-0 flex-1 items-center gap-1.5 text-[12px] font-medium leading-none text-text-main">
          <span className="inline-flex size-6 shrink-0 items-center justify-center">
            <span
              className="material-symbols-outlined text-[15px] leading-none"
              style={{ color: colors.text }}
            >
              paid
            </span>
          </span>
          <span className="truncate leading-none">
            {formatQuotaLabel(q.name) || t("creditsLabel")}
          </span>
        </span>
        <span
          className="inline-flex h-6 shrink-0 items-center text-[12px] font-bold leading-none tabular-nums"
          style={{ color: colors.text }}
        >
          {sym}
          {amount}
        </span>
      </div>
    );
  }

  const pctRaw = getQuotaRemainingPercentage(q);
  const pct = Math.round(pctRaw);
  const colors = getBarColor(pct);
  const cd = formatCountdown(q.resetAt);
  const label = q.displayName || formatQuotaLabel(q.name);
  const usedNum = Number(q.used || 0);
  const totalNum = Number(q.total || 0);
  const showUsage = shouldShowQuotaUsageCount(q);

  return (
    <div className="flex flex-col gap-1 py-1" title={q.modelKey || q.name}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-[12px] font-medium text-text-main truncate">{label}</span>
        <span
          className="text-[12px] font-bold tabular-nums shrink-0"
          style={{ color: colors.text }}
        >
          {q.unlimited ? "∞" : translateUsageOrFallback(t, "percentLeft", `${pct}% left`, { pct })}
        </span>
        {canHide && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onHideQuota?.(q);
            }}
            className="inline-flex size-5 shrink-0 items-center justify-center rounded text-text-muted transition-colors hover:bg-black/5 hover:text-text-main dark:hover:bg-white/5"
            title={translateUsageOrFallback(t, "hideQuotaRow", "Hide this quota row")}
            aria-label={translateUsageOrFallback(t, "hideQuotaRow", "Hide this quota row")}
          >
            <span className="material-symbols-outlined text-[13px] leading-none">
              visibility_off
            </span>
          </button>
        )}
      </div>
      {!q.unlimited && <QuotaMiniBar percent={pct} size="sm" />}
      <div className="flex items-center justify-between gap-2 text-[10px] text-text-muted tabular-nums">
        <span>
          {showUsage && (
            <>
              {usedNum.toLocaleString()} / {totalNum.toLocaleString()}
            </>
          )}
        </span>
        {q.staleAfterReset ? (
          <span title={t("refreshing")}>⟳</span>
        ) : cd ? (
          <span>
            ⏱ {t("resetsIn")} {cd}
          </span>
        ) : null}
      </div>
    </div>
  );
}

export default function QuotaCardExpanded({
  quotas,
  providerId,
  loading,
  error,
  message,
  refreshedAt,
  hasStaleData,
  onRefresh,
  onOpenCutoff,
  onOpenCost,
  onOpenResetCredits,
  canEditCutoff,
  hasCutoffOverrides,
  canRedeemResetCredit = false,
  redeemingResetCredit = false,
  loadingResetCredits = false,
  hiddenQuotaRows = [],
  onHideQuota,
  onShowQuota,
}: Props) {
  const t = useTranslations("usage");
  const tr = (key: string, fallback: string, values?: UsageTranslationValues) =>
    translateUsageOrFallback(t, key, fallback, values);

  const [expanded, setExpanded] = useState(false);
  const sortedQuotas = useMemo(
    () => resolveQuotaDisplayOrder(providerId, quotas),
    [quotas, providerId]
  );
  const visibleQuotas = useMemo(
    () => getVisibleQuotas(sortedQuotas, expanded),
    [sortedQuotas, expanded]
  );
  const hiddenCount = sortedQuotas.length - visibleQuotas.length;

  const refreshedLabel = refreshedAt
    ? new Date(refreshedAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })
    : null;

  return (
    <div className="border-t border-border bg-bg-subtle/30 px-3 py-2.5 flex flex-col gap-1.5">
      {shouldShowLoadingPlaceholder(loading, sortedQuotas.length, message) ? (
        <div className="text-[11px] text-text-muted flex items-center gap-1.5">
          <span className="material-symbols-outlined animate-spin text-[13px]">
            progress_activity
          </span>
          {t("loadingQuotas")}
        </div>
      ) : error ? (
        <div className="text-[11px] text-red-500 flex items-start gap-1.5">
          <span className="material-symbols-outlined text-[13px]">error</span>
          <span>{error}</span>
        </div>
      ) : quotas.length === 0 && message ? (
        <div className="text-[11px] text-text-muted italic" title={message}>
          {message}
        </div>
      ) : quotas.length === 0 ? (
        <div className="text-[11px] text-text-muted italic">{t("noQuotaData")}</div>
      ) : (
        <div className="flex flex-col divide-y divide-border/40">
          {visibleQuotas.map((q, i) => (
            <QuotaDetailRow
              key={`${q.name}-${q.modelKey ?? ""}-${i}`}
              q={q}
              onHideQuota={onHideQuota}
              onOpenResetCredits={q.isResetCredits ? onOpenResetCredits : undefined}
              loadingResetCredits={loadingResetCredits}
            />
          ))}
        </div>
      )}

      {hiddenQuotaRows.length > 0 && (
        <div className="flex flex-wrap items-center gap-1 border-t border-border/40 pt-1.5 text-[10px] text-text-muted">
          <span className="material-symbols-outlined text-[12px]">visibility_off</span>
          <span>{tr("hiddenQuotaRowsLabel", "Hidden:")}</span>
          {hiddenQuotaRows.map((q) => (
            <button
              key={getQuotaVisibilityKey(q)}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onShowQuota?.(q);
              }}
              className="rounded-md border border-border px-1.5 py-0.5 transition-colors hover:bg-black/5 hover:text-text-main dark:hover:bg-white/5"
              title={translateUsageOrFallback(t, "showQuotaRow", "Show this quota row")}
            >
              {q.displayName || formatQuotaLabel(q.name)}
            </button>
          ))}
        </div>
      )}

      {!error && sortedQuotas.length > DEFAULT_VISIBLE_ROWS && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setExpanded((prev) => !prev);
          }}
          className="inline-flex items-center justify-center gap-1 text-[11px] font-medium px-2 py-1 rounded-md border border-border bg-bg-subtle hover:bg-black/[0.04] dark:hover:bg-white/[0.04] cursor-pointer"
        >
          <span className="material-symbols-outlined text-[12px]">
            {expanded ? "expand_less" : "expand_more"}
          </span>
          {expanded
            ? tr("showLessQuotas", "Show less")
            : tr("showMoreQuotas", `Show ${hiddenCount} more`, { count: hiddenCount })}
        </button>
      )}

      <div className="flex items-center justify-between gap-2 pt-1.5 border-t border-border/40">
        {refreshedLabel && (
          <span
            className={`text-[10px] tabular-nums ${
              hasStaleData ? "text-amber-500" : "text-text-muted"
            }`}
            title={
              hasStaleData
                ? t("staleQuotaTooltip")
                : `${tr("lastRefreshed", "Last refreshed")}: ${refreshedLabel}`
            }
          >
            {tr("updatedShort", "Updated")} {refreshedLabel}
          </span>
        )}
        <div className="flex items-center gap-1.5 ml-auto">
          {canRedeemResetCredit && (
            <button
              type="button"
              disabled={loading || redeemingResetCredit || loadingResetCredits}
              onClick={(e) => {
                e.stopPropagation();
                onOpenResetCredits?.();
              }}
              className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-md border border-primary/40 text-primary bg-bg-subtle hover:bg-black/[0.04] dark:hover:bg-white/[0.04] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <span
                className={`material-symbols-outlined text-[12px] ${
                  redeemingResetCredit || loadingResetCredits ? "animate-spin" : ""
                }`}
              >
                {redeemingResetCredit || loadingResetCredits ? "progress_activity" : "restart_alt"}
              </span>
              {tr("manageResetCredits", "View credits")}
            </button>
          )}
          <button
            type="button"
            disabled={!canEditCutoff}
            onClick={(e) => {
              e.stopPropagation();
              onOpenCutoff();
            }}
            className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-md border bg-bg-subtle hover:bg-black/[0.04] dark:hover:bg-white/[0.04] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer ${
              hasCutoffOverrides ? "border-primary/40 text-primary" : "border-border"
            }`}
          >
            <span className="material-symbols-outlined text-[12px]">tune</span>
            {tr("editCutoffs", "Edit cutoffs")}
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenCost();
            }}
            className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-md border border-border bg-bg-subtle hover:bg-black/[0.04] dark:hover:bg-white/[0.04] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[12px]">bar_chart</span>
            {t("usdCost")}
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={(e) => {
              e.stopPropagation();
              onRefresh();
            }}
            className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-md border border-border bg-bg-subtle hover:bg-black/[0.04] dark:hover:bg-white/[0.04] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <span
              className={`material-symbols-outlined text-[12px] ${loading ? "animate-spin" : ""}`}
            >
              refresh
            </span>
            {tr("forceRefresh", "Refresh now")}
          </button>
        </div>
      </div>
    </div>
  );
}
