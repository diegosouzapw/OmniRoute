"use client";

import { useEffect } from "react";

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

interface BatchDetailModalProps {
  batch: BatchRecord;
  files: FileRecord[];
  onClose: () => void;
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

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[11px] uppercase tracking-wider font-medium text-[var(--color-text-muted)]">
        {label}
      </span>
      <span className="text-sm text-[var(--color-text-main)] font-mono break-all">{value}</span>
    </div>
  );
}

function formatTs(ts: number | null | undefined): string {
  if (!ts) return "—";
  const d = new Date(ts * 1000);
  return d.toLocaleString(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export default function BatchDetailModal({ batch, files, onClose }: BatchDetailModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const total = batch.requestCountsTotal || 0;
  const completed = batch.requestCountsCompleted || 0;
  const failed = batch.requestCountsFailed || 0;
  const donePct = total > 0 ? (completed / total) * 100 : 0;
  const failedPct = total > 0 ? (failed / total) * 100 : 0;
  const pct = Math.round(donePct + failedPct);

  const inputFile = files.find((f) => f.id === batch.inputFileId);
  const outputFile = batch.outputFileId ? files.find((f) => f.id === batch.outputFileId) : null;
  const errorFile = batch.errorFileId ? files.find((f) => f.id === batch.errorFileId) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative w-full sm:max-w-2xl bg-[var(--color-surface)] border border-[var(--color-border)] rounded-t-2xl sm:rounded-xl shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)] flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[20px] text-[var(--color-text-muted)]">
              pending_actions
            </span>
            <div>
              <h2 className="text-base font-semibold text-[var(--color-text-main)]">
                Batch Details
              </h2>
              <p className="text-xs text-[var(--color-text-muted)] font-mono mt-0.5">{batch.id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-lg text-[var(--color-text-muted)] hover:bg-[var(--color-bg-alt)] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 p-6 space-y-6">
          {/* Status + meta */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="flex flex-col gap-0.5">
              <span className="text-[11px] uppercase tracking-wider font-medium text-[var(--color-text-muted)]">
                Status
              </span>
              <StatusBadge batch={batch} />
            </div>
            <Field label="Endpoint" value={batch.endpoint} />
            {batch.model && <Field label="Model" value={batch.model} />}
            <Field label="Window" value={batch.completionWindow} />
            <Field
              label="Created"
              value={<span title={formatTs(batch.createdAt)}>{relativeTime(batch.createdAt)}</span>}
            />
          </div>

          {/* Progress */}
          {total > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[var(--color-text-muted)] uppercase tracking-wider font-medium">
                  Progress
                </span>
                <span className="text-[var(--color-text-muted)]">
                  {completed} / {total} ({pct}%)
                </span>
              </div>
              <div className="h-2 rounded-full bg-[var(--color-bg-alt)] overflow-hidden flex">
                <div
                  className="h-full bg-emerald-500 transition-all"
                  style={{ width: `${donePct}%` }}
                />
                <div
                  className="h-full bg-red-500 transition-all"
                  style={{ width: `${failedPct}%` }}
                />
              </div>
              <div className="flex gap-4 text-xs text-[var(--color-text-muted)]">
                <span>
                  <span className="text-emerald-400 font-medium">{completed}</span> completed
                </span>
                {failed > 0 && (
                  <span>
                    <span className="text-red-400 font-medium">{failed}</span> failed
                  </span>
                )}
                <span>
                  <span className="font-medium">{total - completed - failed}</span> pending
                </span>
              </div>
            </div>
          )}

          {/* Timestamps */}
          <div>
            <h3 className="text-[11px] uppercase tracking-wider font-medium text-[var(--color-text-muted)] mb-3">
              Timeline
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
              {[
                { label: "Created", ts: batch.createdAt },
                { label: "In Progress", ts: batch.inProgressAt },
                { label: "Finalizing", ts: batch.finalizingAt },
                { label: "Completed", ts: batch.completedAt },
                { label: "Failed", ts: batch.failedAt },
                { label: "Expires", ts: batch.expiresAt },
                { label: "Expired", ts: batch.expiredAt },
                { label: "Cancelling", ts: batch.cancellingAt },
                { label: "Cancelled", ts: batch.cancelledAt },
              ]
                .filter((t) => t.ts)
                .map(({ label, ts }) => (
                  <div key={label} className="flex flex-col gap-0.5">
                    <span className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">
                      {label}
                    </span>
                    <span className="text-xs font-mono text-[var(--color-text-main)]">
                      {formatTs(ts)}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          {/* Files */}
          <div>
            <h3 className="text-[11px] uppercase tracking-wider font-medium text-[var(--color-text-muted)] mb-3">
              Files
            </h3>
            <div className="space-y-2">
              {[
                { role: "Input", fileId: batch.inputFileId, record: inputFile },
                { role: "Output", fileId: batch.outputFileId, record: outputFile },
                { role: "Errors", fileId: batch.errorFileId, record: errorFile },
              ]
                .filter((f) => f.fileId)
                .map(({ role, fileId, record }) => (
                  <div
                    key={role}
                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-[var(--color-bg-alt)] border border-[var(--color-border)]"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="material-symbols-outlined text-[16px] text-[var(--color-text-muted)] flex-shrink-0">
                        insert_drive_file
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-[var(--color-text-muted)]">{role}</p>
                        <p className="text-xs font-mono text-[var(--color-text-main)] truncate">
                          {record?.filename ?? fileId}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                      {record && (
                        <span className="text-xs text-[var(--color-text-muted)]">
                          {(record.bytes / 1024).toFixed(1)} KB
                        </span>
                      )}
                      <a
                        href={`/api/files/${fileId}/content`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-2 py-1 text-xs rounded bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] transition-colors"
                      >
                        <span className="material-symbols-outlined text-[13px]">download</span>
                        Download
                      </a>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Usage */}
          {batch.usage && (
            <div>
              <h3 className="text-[11px] uppercase tracking-wider font-medium text-[var(--color-text-muted)] mb-3">
                Token Usage
              </h3>
              <pre className="p-3 rounded-lg bg-[var(--color-bg-alt)] border border-[var(--color-border)] text-xs font-mono text-[var(--color-text-main)] overflow-x-auto">
                {JSON.stringify(batch.usage, null, 2)}
              </pre>
            </div>
          )}

          {/* Errors */}
          {batch.errors && (
            <div>
              <h3 className="text-[11px] uppercase tracking-wider font-medium text-red-400 mb-3">
                Errors
              </h3>
              <pre className="p-3 rounded-lg bg-red-500/5 border border-red-500/20 text-xs font-mono text-red-300 overflow-x-auto">
                {JSON.stringify(batch.errors, null, 2)}
              </pre>
            </div>
          )}

          {/* Metadata */}
          {batch.metadata && Object.keys(batch.metadata).length > 0 && (
            <div>
              <h3 className="text-[11px] uppercase tracking-wider font-medium text-[var(--color-text-muted)] mb-3">
                Metadata
              </h3>
              <div className="space-y-1">
                {Object.entries(batch.metadata).map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded bg-[var(--color-bg-alt)] border border-[var(--color-border)]"
                  >
                    <span className="text-[var(--color-text-muted)]">{k}</span>
                    <span className="text-[var(--color-text-muted)]">=</span>
                    <span className="text-[var(--color-text-main)]">{String(v)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
