"use client";

/**
 * ConnectionQuotaPanel — per-account usage/limits strip rendered under each
 * connection row on the provider detail page.
 *
 * Data comes entirely from the server-owned `providerLimitsCache` (loaded by
 * useProviderQuota). Parsing and window ordering reuse the Usage page's
 * quotaParsing module — the same code path that feeds Provider Limits — so
 * the numbers here can never drift from that page. Cross-page import of that
 * module follows the established pattern (home/ProviderQuotaWidget.tsx).
 */

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  parseQuotaData,
  sortQuotasByWindow,
  hasCanonicalWindowOrder,
  hasFixedQuotaOrder,
  quotaWindowRank,
} from "../../../usage/components/ProviderLimits/quotaParsing";
import { getBarColor, formatCountdown } from "../../../usage/components/ProviderLimits/utils";
import type { ProviderQuotaCacheEntry } from "../hooks/useProviderQuota";
import type { ConnectionRowConnection } from "./ConnectionRow";

export interface ConnectionQuotaPanelProps {
  providerId: string;
  connection: ConnectionRowConnection;
  cache?: ProviderQuotaCacheEntry | null;
  refreshing?: boolean;
  onRefresh?: () => void;
}

interface QuotaRowLike {
  name: string;
  used?: number;
  total?: number;
  remaining?: number;
  remainingPercentage?: number;
  resetAt?: string | null;
  displayName?: string;
  isCredits?: boolean;
  isResetCredits?: boolean;
  isPercentageOnly?: boolean;
  staleAfterReset?: boolean;
  creditCount?: number;
  unlimited?: boolean;
  message?: string;
}

function usedPercent(row: QuotaRowLike): number | null {
  if (typeof row.remainingPercentage === "number" && Number.isFinite(row.remainingPercentage)) {
    return Math.min(100, Math.max(0, Math.round(100 - row.remainingPercentage)));
  }
  const total = Number(row.total || 0);
  const used = Number(row.used || 0);
  if (total > 0) return Math.min(100, Math.max(0, Math.round((used / total) * 100)));
  return null;
}

function remainingOf(row: QuotaRowLike): number {
  if (typeof row.remainingPercentage === "number" && Number.isFinite(row.remainingPercentage)) {
    return row.remainingPercentage;
  }
  const total = Number(row.total || 0);
  const used = Number(row.used || 0);
  return total > 0 ? (1 - used / total) * 100 : 100;
}

// How many non-window (per-model) rows become chips: more when they are the
// only signal the provider reports, fewer when they supplement 5h/7d windows.
const MAX_MODEL_CHIPS_ALONE = 3;
const MAX_MODEL_CHIPS_WITH_WINDOWS = 1;

const MODEL_CHIP_LABEL_MAX = 20;

/** Compact chip label for a per-model bucket — truncated, full name in title. */
function modelChipLabel(name: string): string {
  return name.length > MODEL_CHIP_LABEL_MAX ? `${name.slice(0, MODEL_CHIP_LABEL_MAX - 1)}…` : name;
}

/** Compact chip label for a quota window: "5h", "7d", "Monthly", "Spark 5h". */
function shortWindowLabel(name: string, monthlyLabel: string, sparkLabel: string): string {
  const key = name.trim().toLowerCase();
  const spark = /spark/.test(key) ? `${sparkLabel} ` : "";
  if (/month/.test(key)) return monthlyLabel;
  if (/week|7\s*d\b|_7d\b|seven[_\s-]?day/.test(key)) return `${spark}7d`;
  if (/session|hour|\b5\s*h\b|_5h\b/.test(key)) return `${spark}5h`;
  return name;
}

function formatAgo(iso: string | null | undefined, locale: string): string | null {
  if (!iso) return null;
  const ms = Date.now() - new Date(iso).getTime();
  if (!Number.isFinite(ms) || ms < 0) return null;
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
  const minutes = Math.round(ms / 60_000);
  if (minutes < 1) return rtf.format(0, "minute");
  if (minutes < 60) return rtf.format(-minutes, "minute");
  const hours = Math.round(minutes / 60);
  if (hours < 24) return rtf.format(-hours, "hour");
  return rtf.format(-Math.round(hours / 24), "day");
}

export default function ConnectionQuotaPanel({
  providerId,
  connection,
  cache,
  refreshing,
  onRefresh,
}: ConnectionQuotaPanelProps) {
  const t = useTranslations("providers");
  const locale = useLocale();
  const [expanded, setExpanded] = useState(false);

  const providerKey = String(connection.provider || providerId || "").toLowerCase();

  const rows = useMemo<QuotaRowLike[]>(() => {
    if (!cache) return [];
    let parsed = parseQuotaData(providerKey, cache) as QuotaRowLike[];
    // #6687/#7764: keep the deterministic order of providers that have one
    // (codex/GLM/kimi); everyone else falls into session→weekly→monthly.
    if (!hasFixedQuotaOrder(providerKey) && hasCanonicalWindowOrder(parsed)) {
      parsed = sortQuotasByWindow(parsed);
    }
    return parsed;
  }, [cache, providerKey]);

  const messageRow = rows.length === 1 && rows[0].message ? rows[0] : null;
  // Failed fetches keep the previous cache but leave `message` set; show it
  // whenever there is nothing else to render (claude folds it into an error
  // row, other providers keep it next to stale/empty quotas).
  const messageText =
    messageRow?.message ?? (rows.length === 0 && cache?.message ? cache.message : null);
  const creditRows = rows.filter((r) => r.isCredits || r.isResetCredits);
  const windowRows = rows.filter(
    (r) => !r.isCredits && !r.isResetCredits && quotaWindowRank(r.name) !== null && !r.message
  );
  const otherRows = rows.filter(
    (r) => !r.isCredits && !r.isResetCredits && quotaWindowRank(r.name) === null && r !== messageRow
  );
  // Providers like antigravity/agy report ONLY per-model buckets — no 5h/7d
  // keys at all — so ranked windows can be empty. Surface the most-consumed
  // model windows directly as chips (worst remaining first) instead of hiding
  // everything behind a bare "+N", and fold the rest.
  const worstOtherRows = [...otherRows]
    .filter((r) => !r.unlimited)
    .sort((a, b) => remainingOf(a) - remainingOf(b))
    .slice(0, windowRows.length === 0 ? MAX_MODEL_CHIPS_ALONE : MAX_MODEL_CHIPS_WITH_WINDOWS);
  const otherCount = Math.max(0, otherRows.length - worstOtherRows.length);

  const numberFmt = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const updatedAgo = formatAgo(cache?.fetchedAt, locale);
  const hasDetails = rows.length > 0 && !messageRow;

  function renderUsedText(row: QuotaRowLike): string {
    if (row.isCredits || row.isResetCredits) {
      return t("quotaCredits", {
        count: numberFmt.format(Number(row.creditCount ?? row.remaining ?? 0)),
      });
    }
    if (row.unlimited) return t("quotaUnlimited");
    const pct = usedPercent(row);
    if (row.isPercentageOnly || !(Number(row.total || 0) > 0)) {
      return pct === null ? "—" : `${pct}%`;
    }
    return `${numberFmt.format(Number(row.used || 0))}/${numberFmt.format(
      Number(row.total || 0)
    )} (${pct === null ? "—" : `${pct}%`})`;
  }

  function chipTitle(row: QuotaRowLike): string {
    const label = row.displayName || row.name;
    const countdown = formatCountdown(row.resetAt);
    return countdown ? `${label} — ${t("quotaResetIn", { time: countdown })}` : label;
  }

  const refreshControl = onRefresh ? (
    <button
      type="button"
      onClick={onRefresh}
      disabled={refreshing}
      className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[11px] font-medium text-text-muted hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"
      title={t("quotaRefresh")}
    >
      <span className={`material-symbols-outlined text-[13px] ${refreshing ? "animate-spin" : ""}`}>
        refresh
      </span>
    </button>
  ) : null;

  // No cached data at all — offer the first fetch inline instead of an empty strip.
  if (!cache) {
    return (
      <div className="mt-2 flex items-center gap-2 text-xs text-text-muted">
        <span className="material-symbols-outlined text-[13px] opacity-60">data_usage</span>
        <span>{t("quotaNoData")}</span>
        {refreshControl}
      </div>
    );
  }

  return (
    <div className="mt-2">
      <div className="flex flex-wrap items-center gap-1.5 text-xs">
        {messageText ? (
          <span className="text-amber-500" title={messageText}>
            {messageText}
          </span>
        ) : (
          windowRows.map((row) => {
            const pct = usedPercent(row);
            const remaining =
              typeof row.remainingPercentage === "number"
                ? row.remainingPercentage
                : pct === null
                  ? null
                  : 100 - pct;
            const colors = remaining === null ? null : getBarColor(remaining);
            return (
              <span
                key={row.name}
                title={chipTitle(row)}
                className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-medium"
                style={
                  colors
                    ? { color: colors.text, background: colors.bg }
                    : { color: "inherit", background: "rgba(120,120,120,0.12)" }
                }
              >
                {shortWindowLabel(
                  row.displayName || row.name,
                  t("quotaWindowMonthly"),
                  t("quotaWindowSpark")
                )}
                {pct === null ? " —" : ` ${pct}%`}
              </span>
            );
          })
        )}
        {creditRows.map((row) => (
          <span
            key={row.name}
            title={chipTitle(row)}
            className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-medium text-text-muted"
            style={{ background: "rgba(120,120,120,0.12)" }}
          >
            <span className="material-symbols-outlined text-[13px]">toll</span>
            {renderUsedText(row)}
          </span>
        ))}
        {worstOtherRows.map((row) => {
          const pct = usedPercent(row);
          const colors = getBarColor(remainingOf(row));
          return (
            <span
              key={row.name}
              title={chipTitle(row)}
              className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-medium"
              style={{ color: colors.text, background: colors.bg }}
            >
              {modelChipLabel(row.displayName || row.name)}
              {pct === null ? " —" : ` ${pct}%`}
            </span>
          );
        })}
        {otherCount > 0 && (
          <span
            className="px-1.5 py-0.5 rounded font-medium text-text-muted"
            style={{ background: "rgba(120,120,120,0.12)" }}
            title={t("quotaMoreWindows", { count: otherCount })}
          >
            +{otherCount}
          </span>
        )}
        {refreshControl}
        {updatedAgo && !refreshing ? (
          <span className="text-[11px] text-text-muted/70">{updatedAgo}</span>
        ) : null}
        {hasDetails && (
          <button
            type="button"
            aria-expanded={expanded}
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center px-1 py-0.5 rounded text-[11px] font-medium text-text-muted hover:text-primary"
            title={t("quotaDetails")}
          >
            <span className="material-symbols-outlined text-[14px]">
              {expanded ? "expand_less" : "expand_more"}
            </span>
          </button>
        )}
      </div>

      {expanded && hasDetails ? (
        <div className="mt-2 rounded-lg border border-border/50 bg-surface-secondary/30 p-2.5 grid gap-1.5">
          {rows.map((row) => {
            if (row.message) return null;
            const pct = usedPercent(row);
            const remaining =
              typeof row.remainingPercentage === "number"
                ? row.remainingPercentage
                : pct === null
                  ? null
                  : 100 - pct;
            const colors = remaining === null ? null : getBarColor(remaining);
            const countdown = formatCountdown(row.resetAt);
            const isCreditRow = row.isCredits || row.isResetCredits;
            return (
              <div key={row.name} className="flex items-center gap-2 text-xs">
                <span
                  className="w-40 shrink-0 truncate font-medium"
                  title={row.displayName || row.name}
                >
                  {row.displayName || row.name}
                </span>
                {isCreditRow || remaining === null ? (
                  <span className="flex-1" />
                ) : (
                  <span className="h-1.5 flex-1 rounded-full overflow-hidden bg-black/[0.06] dark:bg-white/[0.06]">
                    <span
                      className="block h-full rounded-full"
                      style={{
                        width: `${Math.min(100, Math.max(0, remaining))}%`,
                        background: colors?.bar,
                      }}
                    />
                  </span>
                )}
                <span
                  className="w-44 shrink-0 text-right tabular-nums text-text-muted"
                  style={colors && !isCreditRow ? { color: colors.text } : undefined}
                >
                  {renderUsedText(row)}
                  {countdown ? (
                    <span className="block text-[10px] opacity-70">
                      {t("quotaResetIn", { time: countdown })}
                    </span>
                  ) : null}
                </span>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
