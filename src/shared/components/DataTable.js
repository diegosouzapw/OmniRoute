"use client";

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
  emptyMessage = "No data found",
}) {
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 24px",
          color: "var(--text-secondary, #888)",
          fontSize: "14px",
        }}
      >
        <span style={{ animation: "spin 1s linear infinite", marginRight: "8px" }}>⏳</span>
        Loading...
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 24px",
          color: "var(--text-secondary, #888)",
          fontSize: "14px",
        }}
      >
        <span style={{ fontSize: "32px", marginBottom: "8px", opacity: 0.6 }}>{emptyIcon}</span>
        {emptyMessage}
      </div>
    );
  }

  return (
    <div style={{ overflow: "auto", maxHeight, borderRadius: "8px" }}>
      <table
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
                style={{
                  padding: "8px 10px",
                  textAlign: "left",
                  fontWeight: 600,
                  color: "var(--text-secondary, #888)",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                  position: "sticky",
                  top: 0,
                  background: "var(--bg-table-header, rgba(15,15,25,0.95))",
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
              style={{
                cursor: onRowClick ? "pointer" : "default",
                background:
                  row.id === selectedId
                    ? "rgba(99,102,241,0.1)"
                    : idx % 2 === 0
                      ? "transparent"
                      : "rgba(255,255,255,0.02)",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => {
                if (row.id !== selectedId) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                }
              }}
              onMouseLeave={(e) => {
                if (row.id !== selectedId) {
                  e.currentTarget.style.background =
                    idx % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)";
                }
              }}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  style={{
                    padding: "6px 10px",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
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
