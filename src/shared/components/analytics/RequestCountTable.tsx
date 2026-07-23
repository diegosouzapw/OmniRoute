"use client";

/**
 * RequestCountTable — pure presentational table for #4009.
 * Split out of RequestCountByProviderDateTable to keep that container under
 * the max-lines-per-function complexity gate.
 */

import { PROVIDER_COLORS } from "./chartColors";
import { fmtCompact as fmt, fmtFull } from "@/shared/utils/formatting";
import { SortIndicator } from "./charts";

export interface ProviderDailyUsageRow {
  date: string;
  provider: string;
  requests: number;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

export type RequestCountSortField = "date" | "provider" | "requests" | "totalTokens";

interface RequestCountTableProps {
  rows: ProviderDailyUsageRow[];
  sortBy: RequestCountSortField;
  sortOrder: "asc" | "desc";
  onToggleSort: (field: RequestCountSortField) => void;
  dateLabel: string;
  providerLabel: string;
  requestsLabel: string;
  totalLabel: string;
}

export default function RequestCountTable({
  rows,
  sortBy,
  sortOrder,
  onToggleSort,
  dateLabel,
  providerLabel,
  requestsLabel,
  totalLabel,
}: RequestCountTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="text-xs text-text-muted uppercase bg-black/[0.02] dark:bg-white/[0.02]">
          <tr>
            <th
              className="px-4 py-2.5 text-left cursor-pointer group"
              onClick={() => onToggleSort("date")}
            >
              {dateLabel} <SortIndicator active={sortBy === "date"} sortOrder={sortOrder} />
            </th>
            <th
              className="px-4 py-2.5 text-left cursor-pointer group"
              onClick={() => onToggleSort("provider")}
            >
              {providerLabel} <SortIndicator active={sortBy === "provider"} sortOrder={sortOrder} />
            </th>
            <th
              className="px-4 py-2.5 text-right cursor-pointer group"
              onClick={() => onToggleSort("requests")}
            >
              {requestsLabel} <SortIndicator active={sortBy === "requests"} sortOrder={sortOrder} />
            </th>
            <th
              className="px-4 py-2.5 text-right cursor-pointer group"
              onClick={() => onToggleSort("totalTokens")}
            >
              {totalLabel} <SortIndicator active={sortBy === "totalTokens"} sortOrder={sortOrder} />
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((row, i) => (
            <tr
              key={`${row.date}::${row.provider}`}
              className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
            >
              <td className="px-4 py-2.5 font-mono text-text-muted">{row.date}</td>
              <td className="px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: PROVIDER_COLORS[i % PROVIDER_COLORS.length] }}
                  />
                  <span className="font-medium capitalize">{row.provider}</span>
                </div>
              </td>
              <td className="px-4 py-2.5 text-right font-mono font-semibold">
                {fmtFull(row.requests)}
              </td>
              <td className="px-4 py-2.5 text-right font-mono text-text-muted">
                {fmt(row.totalTokens)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
