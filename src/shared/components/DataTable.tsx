"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/shared/utils/cn";

/**
 * DataTable — Shared UI primitive (T-29)
 *
 * Configurable data table with sticky header, row click,
 * and optional loading/empty states. Extracts the shared
 * table rendering pattern from RequestLoggerV2 and ProxyLogger.
 *
 * Usage:
 *   <DataTable
 *     columns={visibleColumns}
 *     data={filteredLogs}
 *     renderCell={(row, column) => <span>{row[column.key]}</span>}
 *     onRowClick={(row) => openDetail(row)}
 *     selectedId={selectedLog?.id}
 *     loading={isLoading}
 *     emptyIcon="📋"
 *     emptyMessage="No logs found"
 *   />
 */

interface DataTableColumn {
  key: string;
  label: string;
  maxWidth?: string;
}

interface DataTableRow {
  id?: string | number;
  [key: string]: unknown;
}

interface DataTableProps {
  columns?: DataTableColumn[];
  data?: DataTableRow[];
  renderCell: (row: DataTableRow, column: DataTableColumn) => React.ReactNode;
  renderHeader?: (column: DataTableColumn) => React.ReactNode;
  onRowClick?: (row: DataTableRow) => void;
  selectedId?: string | number;
  loading?: boolean;
  maxHeight?: string;
  emptyIcon?: string;
  emptyMessage?: string;
}

export default function DataTable({
  columns = [],
  data = [],
  renderCell,
  renderHeader,
  onRowClick,
  selectedId,
  loading = false,
  maxHeight = "calc(100vh - 320px)",
  emptyIcon = "📭",
  emptyMessage,
}: DataTableProps) {
  const t = useTranslations("common");
  const resolvedEmptyMessage = emptyMessage ?? t("noData");

  if (loading) {
    return (
      <div className="datatable-loading">
        <span className="datatable-loading-icon material-symbols-outlined" aria-hidden="true">
          hourglass_top
        </span>
        {t("loading")}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="datatable-empty">
        <span className="datatable-empty-icon" aria-hidden="true">
          {emptyIcon}
        </span>
        {resolvedEmptyMessage}
      </div>
    );
  }

  return (
    <div className="datatable-root" style={{ overflow: "auto", maxHeight, borderRadius: "8px" }}>
      <table
        className="datatable-table"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "12px",
          tableLayout: "auto",
        }}
      >
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="datatable-head"
                style={{
                  padding: "8px 10px",
                  textAlign: "left",
                  fontWeight: 600,
                  color: "var(--datatable-text-secondary, var(--text-secondary, #888))",
                  borderBottom: "1px solid var(--datatable-border-strong, rgba(255,255,255,0.08))",
                  position: "sticky",
                  top: 0,
                  background:
                    "var(--bg-table-header, var(--datatable-header-bg, rgba(15,15,25,0.95)))",
                  zIndex: 1,
                  whiteSpace: "nowrap",
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                {renderHeader ? renderHeader(col) : col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={row.id || idx}
              onClick={() => onRowClick?.(row)}
              className={cn(
                "datatable-row",
                onRowClick && "is-clickable",
                row.id === selectedId && "is-selected"
              )}
              style={{
                cursor: onRowClick ? "pointer" : "default",
                transition: "background 0.15s",
              }}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className="datatable-cell"
                  style={{
                    padding: "6px 10px",
                    borderBottom: "1px solid var(--datatable-border-soft, rgba(255,255,255,0.04))",
                    whiteSpace: "nowrap",
                    maxWidth: col.maxWidth || "200px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {renderCell(row, col)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
