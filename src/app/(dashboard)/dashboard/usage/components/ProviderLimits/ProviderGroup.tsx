"use client";

import { useTranslations } from "next-intl";
import ProviderIcon from "@/shared/components/ProviderIcon";
import { translateUsageOrFallback, type UsageTranslationValues } from "./i18nFallback";
import type { ResolvedColumn } from "./providerColumns";

/**
 * Provider group rendered as a 2-column grid:
 *  - left rail (fixed width) hosts the provider identity, vertically centered:
 *    icon + display name + account count + worst-status dot + bulk refresh
 *  - right content column hosts a thin per-group column-header row followed
 *    by the AccountRow stack passed in via `children`.
 *
 * The rail eliminates the per-row provider duplication seen in the previous
 * flat-table iteration without taking a full row for a header banner.
 *
 * `gridTemplateColumns` from `buildGridTemplate(columns.length)` is the
 * single source of truth shared between the column-header row inside this
 * component and each AccountRow nested in `children`.
 */
interface ProviderGroupProps {
  providerKey: string;
  providerLabel: string;
  accountCount: number;
  /** Worst status across the group — drives the rail dot color. */
  worstStatus: "critical" | "alert" | "ok" | "empty";
  columns: ResolvedColumn[];
  overflowMax: number;
  isRefreshing: boolean;
  onRefreshGroup: () => void;
  children: React.ReactNode;
}

const STATUS_DOT: Record<"critical" | "alert" | "ok" | "empty", string> = {
  critical: "#ef4444",
  alert: "#eab308",
  ok: "#22c55e",
  empty: "var(--color-text-muted)",
};

/**
 * Grid layout shared between the group's column-header row and each
 * AccountRow's collapsed body. Columns:
 *   identity | tier | quota-columns... | overflow | cutoff | refresh
 *
 * Provider lives in the rail (outside this grid), so it has no column here.
 */
export function buildGridTemplate(columnCount: number): string {
  const identityWidth = columnCount <= 1 ? "minmax(220px, 2.4fr)" : "minmax(180px, 2fr)";
  const tierWidth = "minmax(64px, 80px)";
  const columnsTpl =
    columnCount > 0 ? Array(columnCount).fill("minmax(76px, 1fr)").join(" ") : "minmax(120px, 1fr)";
  const overflowWidth = "36px";
  const cutoffWidth = "minmax(76px, 96px)";
  const refreshWidth = "32px";
  return [identityWidth, tierWidth, columnsTpl, overflowWidth, cutoffWidth, refreshWidth].join(" ");
}

export default function ProviderGroup({
  providerKey,
  providerLabel,
  accountCount,
  worstStatus,
  columns,
  overflowMax,
  isRefreshing,
  onRefreshGroup,
  children,
}: ProviderGroupProps) {
  const t = useTranslations("usage");
  const tr = (key: string, fallback: string, values?: UsageTranslationValues) =>
    translateUsageOrFallback(t, key, fallback, values);

  const grid = buildGridTemplate(columns.length);

  return (
    <div
      className="grid border border-border rounded-lg overflow-hidden bg-surface"
      style={{ gridTemplateColumns: "140px 1fr" }}
    >
      {/* Rail */}
      <div className="flex flex-col items-center justify-center gap-1.5 px-2 py-3 bg-bg-subtle/40 border-r border-border min-h-full">
        <div className="w-8 h-8 rounded-md flex items-center justify-center overflow-hidden shrink-0">
          <ProviderIcon
            providerId={providerKey}
            size={32}
            type="color"
            className="object-contain"
          />
        </div>
        <span
          className="text-[12px] font-semibold text-text-main text-center leading-tight truncate max-w-full"
          title={providerLabel}
        >
          {providerLabel}
        </span>
        <div className="flex items-center gap-1.5">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: STATUS_DOT[worstStatus] }}
            aria-hidden
            title={tr(`statusDot_${worstStatus}`, worstStatus)}
          />
          <span className="text-[10px] text-text-muted tabular-nums">
            {tr("groupAccountsCount", "{count} accounts", { count: accountCount })}
          </span>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (isRefreshing) return;
            onRefreshGroup();
          }}
          disabled={isRefreshing}
          title={tr("refreshGroup", "Refresh all accounts in this group")}
          className="mt-0.5 p-1 rounded-md text-text-muted hover:text-text-main hover:bg-black/[0.04] dark:hover:bg-white/[0.04] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
        >
          <span
            className={`material-symbols-outlined text-[14px] ${isRefreshing ? "animate-spin" : ""}`}
          >
            refresh
          </span>
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col min-w-0">
        {/* Column header row — thin, muted */}
        <div
          className="px-3 py-1 bg-bg-subtle/20 text-[9px] uppercase tracking-wider text-text-muted font-semibold border-b border-border/40"
          style={{
            display: "grid",
            gridTemplateColumns: grid,
            gap: "12px",
          }}
        >
          <div>{tr("columnAccount", "Account")}</div>
          <div>{tr("columnTier", "Tier")}</div>
          {columns.length > 0 ? (
            columns.map((c) => (
              <div key={c.key} className="truncate" title={c.label}>
                {c.label}
              </div>
            ))
          ) : (
            <div>{tr("columnQuota", "Quota")}</div>
          )}
          <div className="text-center" title={tr("overflowHint", "Additional quotas")}>
            {overflowMax > 0 ? "+" : ""}
          </div>
          <div className="text-center">{tr("columnCutoff", "Cutoff")}</div>
          <div className="text-center">↻</div>
        </div>

        {/* Account rows */}
        <div>{children}</div>
      </div>
    </div>
  );
}
