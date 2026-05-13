"use client";

import { useState } from "react";
import FileDetailModal from "./FileDetailModal";

function relativeTime(ts: number): string {
  // ts is in seconds (Unix timestamp)
  const diffMs = Date.now() - ts * 1000;
  const diffSec = Math.round(diffMs / 1000);
  if (diffSec < 60) return `${diffSec}s ago`;
  const diffMin = Math.round(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.round(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDays = Math.round(diffHr / 24);
  return `${diffDays}d ago`;
}

function relativeExpiration(ts: number | null): string {
  if (!ts) return "Never";
  const diffMs = ts * 1000 - Date.now();
  if (diffMs <= 0) return "Expired";
  const diffSec = Math.round(diffMs / 1000);
  if (diffSec < 60) return `${diffSec}s`;
  const diffMin = Math.round(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m`;
  const diffHr = Math.round(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h`;
  const diffDays = Math.round(diffHr / 24);
  return `${diffDays}d`;
}

interface FileRecord {
  id: string;
  filename: string;
  bytes: number;
  purpose: string;
  createdAt: number;
  expiresAt?: number | null;
}

interface FilesListTabProps {
  files: FileRecord[];
  loading: boolean;
  onRefresh?: () => void;
}

const PURPOSE_STYLES_MAP: Record<string, string> = {
  batch: "bg-blue-500/15 text-blue-400 border-blue-500/25",
  "batch-output": "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  "fine-tune": "bg-violet-500/15 text-violet-400 border-violet-500/25",
  assistants: "bg-yellow-500/15 text-yellow-400 border-yellow-500/25",
};

function Badge({ value, styles }: Readonly<{ value: string; styles: Record<string, string> }>) {
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

export default function FilesListTab({ files, loading, onRefresh }: Readonly<FilesListTabProps>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [purposeFilter, setPurposeFilter] = useState("all");
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [fileContents, setFileContents] = useState<string | null>(null);
  const [contentsLoading, setContentsLoading] = useState(false);
  const [deleteInProgress, setDeleteInProgress] = useState<string | null>(null);

  const purposes = ["all", ...Array.from(new Set(files.map((f) => f.purpose)))];

  const filtered = files.filter((f) => {
    if (purposeFilter !== "all" && f.purpose !== purposeFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return f.id.toLowerCase().includes(q) || f.filename.toLowerCase().includes(q);
    }
    return true;
  });

  const selectedFile = selectedFileId ? files.find((f) => f.id === selectedFileId) : null;

  const handleFileClick = async (file: FileRecord) => {
    setSelectedFileId(file.id);
    setFileContents(null);
    setContentsLoading(true);
    try {
      const response = await fetch(`/api/v1/files/${file.id}/content`);
      if (response.ok) {
        const text = await response.text();
        setFileContents(text);
      } else {
        setFileContents("Failed to load file contents");
      }
    } catch (error) {
      console.error("Failed to fetch file contents:", error);
      setFileContents("Error loading file contents");
    } finally {
      setContentsLoading(false);
    }
  };

  const handleDeleteFile = async (e: React.MouseEvent, fileId: string) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this file?")) return;

    setDeleteInProgress(fileId);
    try {
      const response = await fetch(`/api/v1/files/${fileId}`, { method: "DELETE" });
      if (response.ok) {
        // File deleted successfully - refresh list
        if (selectedFileId === fileId) {
          setSelectedFileId(null);
          setFileContents(null);
        }
        if (onRefresh) onRefresh();
      } else {
        alert("Failed to delete file");
      }
    } catch (error) {
      console.error("Failed to delete file:", error);
      alert("Error deleting file");
    } finally {
      setDeleteInProgress(null);
    }
  };

  return (
    <div className="flex flex-col gap-4">
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
      <div className="overflow-x-auto overflow-y-hidden rounded-xl border border-[var(--color-border)]">
        <table className="w-full text-sm" role="table" aria-label="Files">
          <thead>
            <tr className="bg-[var(--color-bg-alt)] border-b border-[var(--color-border)]">
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
              <th className="text-left px-4 py-3 font-medium text-[var(--color-text-muted)] uppercase text-xs tracking-wider">
                Expires
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
              filtered.map((file) => {
                const fileCreatedAt = file.createdAt;
                const fileExpiresAt = file.expiresAt;
                return (
                  <tr
                    key={file.id}
                    onClick={() => handleFileClick(file)}
                    className={`border-b border-[var(--color-border)] cursor-pointer transition-colors ${
                      selectedFileId === file.id
                        ? "bg-[var(--color-accent)]/10"
                        : "hover:bg-[var(--color-bg-alt)]"
                    }`}
                  >
                    <td className="px-4 py-3 font-mono text-xs text-[var(--color-text-muted)] max-w-[140px]">
                      <span className="truncate block" title={file.id}>
                        {file.id}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[var(--color-text-main)] text-xs max-w-[180px]">
                      <span className="truncate block" title={file.filename}>
                        {file.filename}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Badge value={file.purpose} styles={PURPOSE_STYLES_MAP} />
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--color-text-muted)] whitespace-nowrap">
                      {formatBytes(file.bytes)}
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--color-text-muted)] whitespace-nowrap">
                      {fileCreatedAt ? relativeTime(fileCreatedAt) : "—"}
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--color-text-muted)] whitespace-nowrap">
                      {fileExpiresAt ? relativeExpiration(fileExpiresAt) : "Never"}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={(e) => handleDeleteFile(e, file.id)}
                        disabled={deleteInProgress === file.id}
                        className="flex items-center gap-1 px-2 py-1 text-xs rounded bg-red-500/10 border border-red-500/25 text-red-400 hover:text-red-300 transition-colors whitespace-nowrap disabled:opacity-50"
                        title="Delete file"
                      >
                        <span className="material-symbols-outlined text-[13px]">
                          {deleteInProgress === file.id ? "hourglass_empty" : "delete"}
                        </span>
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* File Info Modal */}
      {selectedFile && (
        <FileDetailModal
          file={selectedFile}
          contents={fileContents}
          loading={contentsLoading}
          onClose={() => setSelectedFileId(null)}
        />
      )}
    </div>
  );
}
