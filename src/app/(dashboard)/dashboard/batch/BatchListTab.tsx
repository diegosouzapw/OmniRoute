"use client";

import { useState } from "react";
import BatchDetailModal from "./BatchDetailModal";

function relativeTime(ts: number): string {
  const diffMs = Date.now() - ts * 1000;
  const diffSec = Math.round(diffMs / 1000);
  if (diffSec < 60) return `${diffSec}s ago`;
  const diffMin = Math.round(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.round(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  return `${Math.round(diffHr / 24)}d ago`;
}

interface BatchRecord {
  id: string;
  endpoint: string;
  completionWindow: string;
  status: string;
  inputFileId: string;
  outputFileId?: string | null;
  errorFileId?: string | null;
  createdAt: number;
  inProgressAt?: number | null;
  expiresAt?: number | null;
  finalizingAt?: number | null;
  completedAt?: number | null;
  failedAt?: number | null;
  expiredAt?: number | null;
  cancellingAt?: number | null;
  cancelledAt?: number | null;
  requestCountsTotal: number;
  requestCountsCompleted: number;
  requestCountsFailed: number;
  metadata?: Record<string, unknown> | null;
  errors?: unknown | null;
  model?: string | null;
  usage?: unknown | null;
}

interface FileRecord {
  id: string;
  filename: string;
  bytes: number;
  purpose: string;
  status?: string | null;
  createdAt: number;
}

interface BatchListTabProps {
  batches: BatchRecord[];
  files: FileRecord[];
  loading: boolean;
}

const STATUS_STYLES: Record<string, string> = {
  completed: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  completed_with_failures: "bg-red-500/15 text-red-400 border-red-500/25",
  failed: "bg-red-500/15 text-red-400 border-red-500/25",
  in_progress: "bg-blue-500/15 text-blue-400 border-blue-500/25",
  in_progress_with_failures: "bg-orange-500/15 text-orange-400 border-orange-500/25",
  finalizing: "bg-violet-500/15 text-violet-400 border-violet-500/25",
  finalizing_with_failures: "bg-orange-500/15 text-orange-400 border-orange-500/25",
  validating: "bg-yellow-500/15 text-yellow-400 border-yellow-500/25",
  cancelling: "bg-orange-500/15 text-orange-400 border-orange-500/25",
  cancelled: "bg-gray-500/15 text-gray-400 border-gray-500/25",
  cancelled_with_failures: "bg-red-500/15 text-red-400 border-red-500/25",
  expired: "bg-gray-500/15 text-gray-400 border-gray-500/25",
};

const STATUS_LABELS: Record<string, string> = {
  completed_with_failures: "completed with failures",
  in_progress_with_failures: "in progress (with failures)",
  finalizing_with_failures: "finalizing (with failures)",
  cancelled_with_failures: "cancelled with failures",
};

/** Returns a composite key that reflects whether partial failures occurred. */
function effectiveStatus(batch: BatchRecord): string {
  const hasFailed = (batch.requestCountsFailed ?? 0) > 0;
  if (!hasFailed) return batch.status;
  const map: Record<string, string> = {
    completed: "completed_with_failures",
    in_progress: "in_progress_with_failures",
    finalizing: "finalizing_with_failures",
    cancelled: "cancelled_with_failures",
  };
  return map[batch.status] ?? batch.status;
}

function StatusBadge({ batch }: { batch: BatchRecord }) {
  const key = effectiveStatus(batch);
  const cls = STATUS_STYLES[key] ?? "bg-gray-500/15 text-gray-400 border-gray-500/25";
  const label = STATUS_LABELS[key] ?? key.replace(/_/g, " ");
  return (
    <span className={`inline-block px-2 py-0.5 rounded-md text-xs font-medium border ${cls}`}>
      {label}
    </span>
  );
}

const ALL_STATUSES = [
  "all",
  "in_progress",
  "validating",
  "finalizing",
  "completed",
  "failed",
  "cancelled",
  "cancelling",
  "expired",
];

export default function BatchListTab({ batches, files, loading }: BatchListTabProps) {
  const [selectedBatch, setSelectedBatch] = useState<BatchRecord | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = batches.filter((b) => {
    if (statusFilter !== "all" && b.status !== statusFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        b.id.toLowerCase().includes(q) ||
        b.endpoint.toLowerCase().includes(q) ||
        (b.model ?? "").toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <>
      {/* Filters */}
      <div className="flex flex-wrap gap-3 p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
        <input
          type="text"
          placeholder="Search by ID, endpoint, model…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 min-w-[200px] px-3 py-2 rounded-lg text-sm bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)] focus:outline-2 focus:outline-[var(--color-accent)]"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 rounded-lg text-sm bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text-main)] focus:outline-2 focus:outline-[var(--color-accent)]"
        >
          {ALL_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s === "all" ? "All statuses" : s}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-[var(--color-border)]">
        <table className="w-full text-sm" role="table" aria-label="Batches">
          <thead>
            <tr className="bg-[var(--color-bg-alt)] border-b border-[var(--color-border)]">
              <th className="text-left px-4 py-3 font-medium text-[var(--color-text-muted)] uppercase text-xs tracking-wider">
                Status
              </th>
              <th className="text-left px-4 py-3 font-medium text-[var(--color-text-muted)] uppercase text-xs tracking-wider">
                ID
              </th>
              <th className="text-left px-4 py-3 font-medium text-[var(--color-text-muted)] uppercase text-xs tracking-wider">
                Endpoint
              </th>
              <th className="text-left px-4 py-3 font-medium text-[var(--color-text-muted)] uppercase text-xs tracking-wider">
                Model
              </th>
              <th className="text-left px-4 py-3 font-medium text-[var(--color-text-muted)] uppercase text-xs tracking-wider">
                Progress
              </th>
              <th className="text-left px-4 py-3 font-medium text-[var(--color-text-muted)] uppercase text-xs tracking-wider">
                Created
              </th>
            </tr>
          </thead>
          <tbody>
            {loading && filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-[var(--color-text-muted)]">
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[var(--color-accent)]" />
                    Loading…
                  </div>
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-[var(--color-text-muted)]">
                  No batches found
                </td>
              </tr>
            ) : (
              filtered.map((batch) => {
                const total = batch.requestCountsTotal || 0;
                const done = batch.requestCountsCompleted || 0;
                const failed = batch.requestCountsFailed || 0;
                const donePct = total > 0 ? (done / total) * 100 : 0;
                const failedPct = total > 0 ? (failed / total) * 100 : 0;
                return (
                  <tr
                    key={batch.id}
                    onClick={() => setSelectedBatch(batch)}
                    className="border-b border-[var(--color-border)] hover:bg-[var(--color-bg-alt)] transition-colors cursor-pointer"
                  >
                    <td className="px-4 py-3">
                      <StatusBadge batch={batch} />
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-[var(--color-text-muted)] max-w-[180px]">
                      <span className="truncate block" title={batch.id}>
                        {batch.id}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[var(--color-text-main)] text-xs">
                      {batch.endpoint}
                    </td>
                    <td className="px-4 py-3 text-[var(--color-text-muted)] text-xs">
                      {batch.model ?? "—"}
                    </td>
                    <td className="px-4 py-3 min-w-[140px]">
                      {total > 0 ? (
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)]">
                            <span>
                              <span className="text-emerald-400">{done}</span>
                              {failed > 0 && <span className="text-red-400"> / {failed} err</span>}
                              <span> / {total}</span>
                            </span>
                            <span>{Math.round(donePct + failedPct)}%</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-[var(--color-bg-alt)] overflow-hidden flex">
                            <div
                              className="h-full bg-emerald-500 transition-all"
                              style={{ width: `${donePct}%` }}
                            />
                            <div
                              className="h-full bg-red-500 transition-all"
                              style={{ width: `${failedPct}%` }}
                            />
                          </div>
                        </div>
                      ) : (
                        <span className="text-xs text-[var(--color-text-muted)]">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--color-text-muted)] whitespace-nowrap">
                      {relativeTime(batch.createdAt)}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Detail modal */}
      {selectedBatch && (
        <BatchDetailModal
          batch={selectedBatch}
          files={files}
          onClose={() => setSelectedBatch(null)}
        />
      )}
    </>
  );
}
