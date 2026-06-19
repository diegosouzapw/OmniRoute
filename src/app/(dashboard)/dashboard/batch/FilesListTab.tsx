"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { matchesSearch } from "@/shared/utils/turkishText";
import FileDetailModal from "./FileDetailModal";
import ExpirationBadge from "./components/ExpirationBadge";

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


interface FileRecord {
  id: string;
  filename: string;
  bytes: number;
  purpose: string;
  createdAt: number;
  expiresAt?: number | null;
}

interface BatchRecord {
  id: string;
  endpoint: string;
  status: string;
  inputFileId: string;
  outputFileId?: string | null;
  errorFileId?: string | null;
  model?: string | null;
}

interface FilesListTabProps {
  files: FileRecord[];
  filesTotal?: number;
  loading: boolean;
  onRefresh?: () => void;
  batches?: BatchRecord[];
}

const PURPOSE_STYLES_MAP: Record<string, string> = {
  batch: "bg-blue-500/15 text-blue-400 border-blue-500/25",
  "batch-output": "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  "fine-tune": "bg-violet-500/15 text-violet-400 border-violet-500/25",
  assistants: "bg-yellow-500/15 text-yellow-400 border-yellow-500/25",
};

const TERMINAL_STATUSES = new Set(["completed", "failed", "cancelled", "expired"]);

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

export default function FilesListTab({
  files,
  filesTotal,
  loading,
  onRefresh,
  batches,
}: Readonly<FilesListTabProps>) {
  const t = useTranslations("common");
  const [searchQuery, setSearchQuery] = useState("");
  const [purposeFilter, setPurposeFilter] = useState("all");
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [fileContents, setFileContents] = useState<string | null>(null);
  const [contentsLoading, setContentsLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const purposes = ["all", ...Array.from(new Set(files.map((f) => f.purpose)))];

  const filtered = files.filter((f) => {
    if (purposeFilter !== "all" && f.purpose !== purposeFilter) return false;
    if (searchQuery) {
      return matchesSearch(f.id, searchQuery) || matchesSearch(f.filename, searchQuery);
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

  const handleDeleteFile = async (file: FileRecord) => {
    setDeletingId(file.id);
    try {
      const res = await fetch(`/api/v1/files/${file.id}`, { method: "DELETE" });
      if (res.ok) {
        onRefresh?.();
      } else {
        console.error("[FilesListTab] DELETE returned", res.status);
      }
    } catch (err) {
      console.error("[FilesListTab] DELETE threw", err);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-3 p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
        <span className="text-sm text-[var(--color-text-muted)] self-center">
          {filesTotal ? `${filesTotal} files` : "Files"}
        </span>
        <input
          type="text"
          placeholder={t("batchFilesListSearchPlaceholder")}
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
      <div className="overflow-x-auto overflow-y-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <table className="w-full text-sm" role="table" aria-label={t("batchFilesListFilesTable")}>
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
                {t("filesListSizeColumn")}
              </th>
              <th className="text-left px-4 py-3 font-medium text-[var(--color-text-muted)] uppercase text-xs tracking-wider">
                {t("filesListUsedByColumn")}
              </th>
              <th className="text-left px-4 py-3 font-medium text-[var(--color-text-muted)] uppercase text-xs tracking-wider">
                Created
              </th>
              <th className="text-left px-4 py-3 font-medium text-[var(--color-text-muted)] uppercase text-xs tracking-wider">
                Expires
              </th>
              <th className="text-left px-4 py-3 font-medium text-[var(--color-text-muted)] uppercase text-xs tracking-wider">
                {/* Actions */}
              </th>
            </tr>
          </thead>
          <tbody>
            {loading && filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-[var(--color-text-muted)]">
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[var(--color-accent)]" />
                    Loading…
                  </div>
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-[var(--color-text-muted)]">
                  No files found
                </td>
              </tr>
            ) : (
              filtered.map((file) => {
                const fileCreatedAt = file.createdAt;
                const fileExpiresAt = file.expiresAt;

                // D12 — derive "Used by" from batches prop
                const related = (batches ?? []).filter(
                  (b) =>
                    b.inputFileId === file.id ||
                    b.outputFileId === file.id ||
                    b.errorFileId === file.id
                );
                const allTerminal = related.every((b) => TERMINAL_STATUSES.has(b.status));
                const canDelete = related.length === 0 || allTerminal;

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
                    {/* "Used by" column (D12) — shows batch id + role (input/output/error) per plan §4 */}
                    <td className="px-4 py-3 text-xs">
                      {related.length === 0 ? (
                        <span className="text-[var(--color-text-muted)]">
                          {t("filesListUsedByNone")}
                        </span>
                      ) : (
                        (() => {
                          const roleFor = (b: BatchRecord): string =>
                            b.inputFileId === file.id
                              ? t("filesListUsedByRoleInput")
                              : b.outputFileId === file.id
                                ? t("filesListUsedByRoleOutput")
                                : t("filesListUsedByRoleError");
                          return (
                            <div
                              className="flex flex-col gap-0.5"
                              title={related.map((b) => `${b.id} (${roleFor(b)})`).join(", ")}
                            >
                              {related.slice(0, 2).map((b) => (
                                <span
                                  key={b.id}
                                  className="font-mono text-[10px] text-[var(--color-text-main)]"
                                >
                                  {b.id.slice(0, 12)}…{" "}
                                  <span className="text-[var(--color-text-muted)]">
                                    ({roleFor(b)})
                                  </span>
                                </span>
                              ))}
                              {related.length > 2 && (
                                <span className="text-[10px] text-[var(--color-text-muted)]">
                                  +{related.length - 2}
                                </span>
                              )}
                            </div>
                          );
                        })()
                      )}
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--color-text-muted)] whitespace-nowrap">
                      {fileCreatedAt ? relativeTime(fileCreatedAt) : "—"}
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--color-text-muted)] whitespace-nowrap">
                      {fileExpiresAt ? (
                        <ExpirationBadge expiresAt={fileExpiresAt} variant="compact" />
                      ) : (
                        <span className="text-xs text-[var(--color-text-muted)]">Never</span>
                      )}
                    </td>
                    {/* Actions column */}
                    <td
                      className="px-4 py-3 whitespace-nowrap"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center gap-1">
                        {/* Download button */}
                        <a
                          href={`/api/v1/files/${file.id}/content`}
                          download={file.filename}
                          className="p-1.5 rounded text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:bg-[var(--color-bg-alt)] transition-colors"
                          title={t("filesListDownload")}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span className="material-symbols-outlined text-[16px]">download</span>
                        </a>
                        {/* Delete button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            void handleDeleteFile(file);
                          }}
                          disabled={!canDelete || deletingId === file.id}
                          title={
                            canDelete
                              ? t("filesListDelete")
                              : "File in use by active batch"
                          }
                          className="p-1.5 rounded text-[var(--color-text-muted)] hover:text-red-400 hover:bg-[var(--color-bg-alt)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            {deletingId === file.id ? "hourglass_empty" : "delete"}
                          </span>
                        </button>
                      </div>
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
          batches={batches}
          onClose={() => setSelectedFileId(null)}
        />
      )}
    </div>
  );
}
