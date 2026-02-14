"use client";

import { useState, useEffect } from "react";
import { Card, DataTable } from "@/shared/components";

export default function ComplianceTab() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetch("/api/compliance/audit-log?limit=100")
      .then((r) => r.json())
      .then((data) => {
        setLogs(Array.isArray(data) ? data : data.logs || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = filter
    ? logs.filter(
        (l) =>
          l.action?.toLowerCase().includes(filter.toLowerCase()) ||
          l.actor?.toLowerCase().includes(filter.toLowerCase())
      )
    : logs;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-main flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">policy</span>
          Audit Log
        </h3>
        <input
          type="text"
          placeholder="Filter by action or actor..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-1.5 text-sm rounded-lg bg-black/5 dark:bg-white/5 border border-border text-text-main placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>

      {loading ? (
        <p className="text-sm text-text-muted">Loading audit log…</p>
      ) : filtered.length === 0 ? (
        <p className="text-sm text-text-muted">No audit events found.</p>
      ) : (
        <div className="overflow-auto max-h-96 rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-bg border-b border-border">
              <tr>
                <th className="text-left px-3 py-2 text-text-muted font-medium">Time</th>
                <th className="text-left px-3 py-2 text-text-muted font-medium">Action</th>
                <th className="text-left px-3 py-2 text-text-muted font-medium">Actor</th>
                <th className="text-left px-3 py-2 text-text-muted font-medium">Details</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((log, i) => (
                <tr key={i} className="border-b border-border/50 hover:bg-black/5 dark:hover:bg-white/5">
                  <td className="px-3 py-2 text-text-muted font-mono text-xs whitespace-nowrap">
                    {log.timestamp ? new Date(log.timestamp).toLocaleString() : "—"}
                  </td>
                  <td className="px-3 py-2">
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-accent/10 text-accent">
                      {log.action || "—"}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-text-main">{log.actor || "system"}</td>
                  <td className="px-3 py-2 text-text-muted text-xs max-w-xs truncate">
                    {log.details ? JSON.stringify(log.details) : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
