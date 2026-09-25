"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import type { ReportBreakdownRow } from "@/lib/usage/agentSessionReports";
import { fmtCompact, formatCost } from "@/shared/utils/formatting";

import { formatDateTime } from "./format";

type SortKey =
  "name" | "extra" | "sessions" | "requests" | "errors" | "tokens" | "cost" | "lastSeen";
type ExtraCount = "members" | "projects";

interface BreakdownTableProps {
  rows: ReportBreakdownRow[];
  nameHeader: string;
  /** Shown when a row has no key (e.g. requests without a project). */
  fallbackName: string;
  extraCount: ExtraCount;
  showDetail?: boolean;
  defaultSort?: SortKey;
  onFilter?: (key: string) => void;
}

function sortValue(row: ReportBreakdownRow, key: SortKey, extra: ExtraCount): string | number {
  switch (key) {
    case "name":
      return (row.label ?? row.key).toLowerCase();
    case "extra":
      return row[extra];
    case "tokens":
      return row.tokens.total;
    case "cost":
      return row.costUsd;
    case "lastSeen":
      return row.lastSeenAt ?? "";
    default:
      return row[key];
  }
}

export default function BreakdownTable({
  rows,
  nameHeader,
  fallbackName,
  extraCount,
  showDetail = false,
  defaultSort = "cost",
  onFilter,
}: BreakdownTableProps) {
  const t = useTranslations("reports");
  const [sort, setSort] = useState<{ key: SortKey; desc: boolean }>({
    key: defaultSort,
    desc: defaultSort !== "name",
  });

  const sortedRows = useMemo(() => {
    const direction = sort.desc ? -1 : 1;
    return [...rows].sort((a, b) => {
      const left = sortValue(a, sort.key, extraCount);
      const right = sortValue(b, sort.key, extraCount);
      return left < right ? -direction : left > right ? direction : 0;
    });
  }, [rows, sort, extraCount]);

  const toggleSort = (key: SortKey) =>
    setSort((current) => ({ key, desc: current.key === key ? !current.desc : key !== "name" }));

  const columns: Array<{ key: SortKey; label: string; numeric?: boolean }> = [
    { key: "name", label: nameHeader },
    {
      key: "extra",
      label: t(extraCount === "members" ? "colMembers" : "colProjects"),
      numeric: true,
    },
    { key: "sessions", label: t("colSessions"), numeric: true },
    { key: "requests", label: t("colRequests"), numeric: true },
    { key: "errors", label: t("colErrors"), numeric: true },
    { key: "tokens", label: t("colTokens"), numeric: true },
    { key: "cost", label: t("colCost"), numeric: true },
    { key: "lastSeen", label: t("colLastActive") },
  ];

  if (rows.length === 0) {
    return <p className="py-8 text-center text-sm text-text-muted">{t("noData")}</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border/30">
            {columns.map((column) => (
              <th
                key={column.key}
                aria-sort={
                  sort.key === column.key ? (sort.desc ? "descending" : "ascending") : undefined
                }
                className={`py-2 px-3 text-xs font-semibold uppercase tracking-wider text-text-muted ${
                  column.numeric ? "text-right" : "text-left"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleSort(column.key)}
                  className="inline-flex items-center gap-1 hover:text-text-main"
                >
                  {column.label}
                  {sort.key === column.key && (
                    <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
                      {sort.desc ? "arrow_downward" : "arrow_upward"}
                    </span>
                  )}
                </button>
              </th>
            ))}
            {onFilter && <th className="py-2 px-3" />}
          </tr>
        </thead>
        <tbody>
          {sortedRows.map((row) => (
            <tr
              key={row.key || "__none__"}
              className="border-b border-border/10 transition-colors hover:bg-surface/20"
            >
              <td className="py-2.5 px-3">
                <div className="font-medium text-text-main">
                  {row.label || row.key || fallbackName}
                </div>
                {showDetail && row.detail && (
                  <div className="max-w-[260px] truncate font-mono text-xs text-text-muted">
                    {row.detail}
                  </div>
                )}
              </td>
              <td className="py-2.5 px-3 text-right tabular-nums">{row[extraCount]}</td>
              <td className="py-2.5 px-3 text-right tabular-nums">{row.sessions}</td>
              <td className="py-2.5 px-3 text-right tabular-nums">{row.requests}</td>
              <td className="py-2.5 px-3 text-right tabular-nums">{row.errors}</td>
              <td className="py-2.5 px-3 text-right tabular-nums">
                {fmtCompact(row.tokens.total)}
              </td>
              <td className="py-2.5 px-3 text-right font-mono tabular-nums text-green-500">
                {formatCost(row.costUsd)}
              </td>
              <td className="py-2.5 px-3 text-text-muted">{formatDateTime(row.lastSeenAt)}</td>
              {onFilter && (
                <td className="py-2.5 px-3 text-right">
                  {row.key && (
                    <button
                      type="button"
                      onClick={() => onFilter(row.key)}
                      className="rounded px-2 py-1 text-xs text-primary hover:bg-primary/10"
                    >
                      {t("filterBy")}
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
