"use client";

/**
 * Model Breakdown table for Usage analytics (#8769).
 * Extracted from charts.tsx so sort logic can be fixed/tested without
 * growing the frozen charts god-file.
 */

import { useCallback, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import Card from "../Card";
import { getModelColor } from "@/shared/constants/colors";
import { fmtCompact as fmt, fmtFull, fmtCost } from "@/shared/utils/formatting";
import {
  nextModelBreakdownSort,
  sortModelBreakdownRows,
  withModelBreakdownShare,
  type ModelBreakdownRow,
  type ModelBreakdownSortField,
  type ModelBreakdownSortOrder,
} from "./modelBreakdownSort";

interface ModelTableProps {
  byModel?: ModelBreakdownRow[] | null;
  summary?: { totalTokens?: number | null } | null;
}

type Column = {
  field: ModelBreakdownSortField;
  labelKey: string;
  align: "left" | "right";
};

const COLUMNS: Column[] = [
  { field: "model", labelKey: "chartModel", align: "left" },
  { field: "requests", labelKey: "chartRequests", align: "right" },
  { field: "promptTokens", labelKey: "chartInput", align: "right" },
  { field: "completionTokens", labelKey: "chartOutput", align: "right" },
  { field: "totalTokens", labelKey: "chartTotal", align: "right" },
  { field: "cost", labelKey: "chartCost", align: "right" },
];

function SortIndicator({ active, sortOrder }: { active: boolean; sortOrder: string }) {
  if (!active) {
    return (
      <span className="material-symbols-outlined text-[12px] opacity-0 group-hover:opacity-30">
        unfold_more
      </span>
    );
  }
  return (
    <span className="material-symbols-outlined text-[12px] text-primary">
      {sortOrder === "asc" ? "expand_less" : "expand_more"}
    </span>
  );
}

export function ModelTable({ byModel, summary }: ModelTableProps) {
  const t = useTranslations("analytics");
  const [sort, setSort] = useState<{
    by: ModelBreakdownSortField;
    order: ModelBreakdownSortOrder;
  }>({ by: "totalTokens", order: "desc" });

  const toggleSort = useCallback((field: ModelBreakdownSortField) => {
    setSort((prev) => {
      const next = nextModelBreakdownSort(prev.by, prev.order, field);
      return { by: next.sortBy, order: next.sortOrder };
    });
  }, []);

  const rowsWithShare = useMemo(
    () => withModelBreakdownShare(byModel, summary?.totalTokens),
    [byModel, summary?.totalTokens]
  );

  const sorted = useMemo(
    () => sortModelBreakdownRows(rowsWithShare, sort.by, sort.order),
    [rowsWithShare, sort.by, sort.order]
  );

  return (
    <Card className="overflow-hidden">
      <div className="p-4 border-b border-border">
        <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider">
          {t("chartModelBreakdown")}
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-xs text-text-muted uppercase bg-black/[0.02] dark:bg-white/[0.02]">
            <tr>
              {COLUMNS.map((col) => (
                <th
                  key={col.field}
                  className={`px-4 py-2.5 ${col.align === "right" ? "text-right" : "text-left"}`}
                >
                  <button
                    type="button"
                    className={`inline-flex items-center gap-1 cursor-pointer group hover:text-text-main ${
                      col.align === "right" ? "justify-end w-full" : "justify-start"
                    }`}
                    onClick={() => toggleSort(col.field)}
                  >
                    <span>{t(col.labelKey)}</span>
                    <SortIndicator active={sort.by === col.field} sortOrder={sort.order} />
                  </button>
                </th>
              ))}
              <th className="px-4 py-2.5 text-right w-36">{t("chartShare")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sorted.map((m, i) => (
              <tr
                key={String(m.model ?? i)}
                className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
              >
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: getModelColor(i) }}
                    />
                    <span className="font-medium">{m.model}</span>
                  </div>
                </td>
                <td className="px-4 py-2.5 text-right font-mono text-text-muted">
                  {fmtFull(m.requests)}
                </td>
                <td className="px-4 py-2.5 text-right font-mono text-primary">
                  {fmt(m.promptTokens)}
                </td>
                <td className="px-4 py-2.5 text-right font-mono text-emerald-500">
                  {fmt(m.completionTokens)}
                </td>
                <td className="px-4 py-2.5 text-right font-mono font-semibold">
                  {fmt(m.totalTokens)}
                </td>
                <td className="px-4 py-2.5 text-right font-mono text-amber-500">
                  {fmtCost(m.cost)}
                </td>
                <td className="px-4 py-2.5 text-right">
                  <div className="flex items-center gap-2 justify-end">
                    <div className="w-16 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${m.pct ?? 0}%`,
                          backgroundColor: getModelColor(i),
                        }}
                      />
                    </div>
                    <span className="text-xs font-mono text-text-muted w-10 text-right">
                      {m.pct ?? 0}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default ModelTable;
