"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, DataTable, FilterBar, ColumnToggle } from "@/shared/components";
import { useNotificationStore } from "@/store/notificationStore";

const ALL_COLUMNS = [
  { key: "timestamp", label: "Time" },
  { key: "action", label: "Action" },
  { key: "actor", label: "Actor" },
  { key: "details", label: "Details" },
];

export default function ComplianceTab() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<any>({});
  const [visibleCols, setVisibleCols] = useState({
    timestamp: true,
    action: true,
    actor: true,
    details: true,
  });
  const notify = useNotificationStore();

  useEffect(() => {
    fetch("/api/compliance/audit-log?limit=100")
      .then((r) => r.json())
      .then((data) => {
        setLogs(Array.isArray(data) ? data : data.logs || []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        notify.error("Failed to load audit log");
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const actionOptions = [...new Set(logs.map((l) => l.action).filter(Boolean))];
  const actorOptions = [...new Set(logs.map((l) => l.actor).filter(Boolean))];

  const filtered = logs.filter((l) => {
    if (search) {
      const q = search.toLowerCase();
      const matchesSearch =
        l.action?.toLowerCase().includes(q) ||
        l.actor?.toLowerCase().includes(q) ||
        (l.details && JSON.stringify(l.details).toLowerCase().includes(q));
      if (!matchesSearch) return false;
    }
    if (filters.action && l.action !== filters.action) return false;
    if (filters.actor && l.actor !== filters.actor) return false;
    return true;
  });

  const columns = ALL_COLUMNS.filter((c) => visibleCols[c.key]);

  const handleToggleCol = useCallback((key) => {
    setVisibleCols((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const renderCell = useCallback((row, col) => {
    switch (col.key) {
      case "timestamp":
        return (
          <span className="font-mono text-xs text-text-muted whitespace-nowrap">
            {row.timestamp ? new Date(row.timestamp).toLocaleString() : "—"}
          </span>
        );
      case "action":
        return (
          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-accent/10 text-accent">
            {row.action || "—"}
          </span>
        );
      case "actor":
        return <span className="text-text-main">{row.actor || "system"}</span>;
      case "details":
        return (
          <span className="text-text-muted text-xs max-w-xs truncate block">
            {row.details ? JSON.stringify(row.details) : "—"}
          </span>
        );
      default:
        return row[col.key] || "—";
    }
  }, []);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-main flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">policy</span>
          Audit Log
        </h3>
        <ColumnToggle columns={ALL_COLUMNS} visible={visibleCols} onToggle={handleToggleCol} />
      </div>

      <FilterBar
        searchValue={search}
        onSearchChange={setSearch}
        placeholder="Search audit logs..."
        filters={[
          { key: "action", label: "Action", options: actionOptions },
          { key: "actor", label: "Actor", options: actorOptions },
        ]}
        activeFilters={filters}
        onFilterChange={(key, val) => setFilters((prev) => ({ ...prev, [key]: val }))}
      >
        {null}
      </FilterBar>

      <DataTable
        columns={columns}
        data={filtered}
        renderCell={renderCell}
        loading={loading}
        maxHeight="400px"
        emptyIcon="📋"
        emptyMessage="No audit events found"
      />
    </Card>
  );
}
