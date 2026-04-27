"use client";

import { useState } from "react";

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

interface FileRecord {
  id: string;
  filename: string;
  bytes: number;
  purpose: string;
  status?: string | null;
  createdAt: number;
}

interface FilesListTabProps {
  files: FileRecord[];
  loading: boolean;
}

const PURPOSE_STYLES: Record<string, string> = {
  batch: "bg-blue-500/15 text-blue-400 border-blue-500/25",
  "batch-output": "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  "fine-tune": "bg-violet-500/15 text-violet-400 border-violet-500/25",
  assistants: "bg-yellow-500/15 text-yellow-400 border-yellow-500/25",
};

const STATUS_STYLES: Record<string, string> = {
  uploaded: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  processed: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  validating: "bg-yellow-500/15 text-yellow-400 border-yellow-500/25",
  error: "bg-red-500/15 text-red-400 border-red-500/25",
  deleting: "bg-gray-500/15 text-gray-400 border-gray-500/25",
};

function Badge({ value, styles }: { value: string; styles: Record<string, string> }) {
  const cls = styles[value] ?? "bg-gray-500/15 text-gray-400 border-gray-500/25";
  return (
    <span className={`inline-block px-2 py-0.5 rounded-md text-xs font-medium border ${cls}`}>
      {value}
    </span>
  );
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

export default function FilesListTab({ files, loading }: FilesListTabProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [purposeFilter, setPurposeFilter] = useState("all");

  const purposes = ["all", ...Array.from(new Set(files.map((f) => f.purpose)))];

  const filtered = files.filter((f) => {
    if (purposeFilter !== "all" && f.purpose !== purposeFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return f.id.toLowerCase().includes(q) || f.filename.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <>
      {/* Filters */}
      <div className="flex flex-wrap gap-3 p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
        <input
          type="text"
          placeholder="Search by ID or filename…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 min-w-[200px] px-3 py-2 rounded-lg text-sm bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)] focus:outline-2 focus:outline-[var(--color-accent)]"
        />
        <select
          value={purposeFilter}
          onChange={(e) => setPurposeFilter(e.target.value)}
          className="px-3 py-2 rounded-lg text-sm bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text-main)] focus:outline-2 focus:outline-[var(--color-accent)]"
        >
          {purposes.map((p) => (
            <option key={p} value={p}>
              {p === "all" ? "All purposes" : p}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-[var(--color-border)]">
        <table className="w-full text-sm" role="table" aria-label="Files">
          <thead>
            <tr className="bg-[var(--color-bg-alt)] border-b border-[var(--color-border)]">
              <th className="text-left px-4 py-3 font-medium text-[var(--color-text-muted)] uppercase text-xs tracking-wider">
                Status
              </th>
              <th className="text-left px-4 py-3 font-medium text-[var(--color-text-muted)] uppercase text-xs tracking-wider">
                ID
              </th>
              <th className="text-left px-4 py-3 font-medium text-[var(--color-text-muted)] uppercase text-xs tracking-wider">
                Filename
              </th>
              <th className="text-left px-4 py-3 font-medium text-[var(--color-text-muted)] uppercase text-xs tracking-wider">
                Purpose
              </th>
              <th className="text-left px-4 py-3 font-medium text-[var(--color-text-muted)] uppercase text-xs tracking-wider">
                Size
              </th>
              <th className="text-left px-4 py-3 font-medium text-[var(--color-text-muted)] uppercase text-xs tracking-wider">
                Created
              </th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {loading && filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-[var(--color-text-muted)]">
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[var(--color-accent)]" />
                    Loading…
                  </div>
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-[var(--color-text-muted)]">
                  No files found
                </td>
              </tr>
            ) : (
              filtered.map((file) => (
                <tr
                  key={file.id}
                  className="border-b border-[var(--color-border)] hover:bg-[var(--color-bg-alt)] transition-colors"
                >
                  <td className="px-4 py-3">
                    {file.status ? (
                      <Badge value={file.status} styles={STATUS_STYLES} />
                    ) : (
                      <span className="text-xs text-[var(--color-text-muted)]">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-[var(--color-text-muted)] max-w-[160px]">
                    <span className="truncate block" title={file.id}>
                      {file.id}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[var(--color-text-main)] text-xs max-w-[200px]">
                    <span className="truncate block" title={file.filename}>
                      {file.filename}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Badge value={file.purpose} styles={PURPOSE_STYLES} />
                  </td>
                  <td className="px-4 py-3 text-xs text-[var(--color-text-muted)] whitespace-nowrap">
                    {formatBytes(file.bytes)}
                  </td>
                  <td className="px-4 py-3 text-xs text-[var(--color-text-muted)] whitespace-nowrap">
                    {relativeTime(file.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <a
                      href={`/api/files/${file.id}/content`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1 px-2 py-1 text-xs rounded bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] transition-colors whitespace-nowrap"
                    >
                      <span className="material-symbols-outlined text-[13px]">download</span>
                      Download
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
