"use client";

import { useEffect, useState } from "react";
import { Button } from "@/shared/components";

function relativeTime(ts: number): string {
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

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

interface FileRecord {
  id: string;
  filename: string;
  bytes: number;
  purpose: string;
  createdAt: number;
  expiresAt?: number | null;
}

interface FileDetailModalProps {
  file: FileRecord;
  contents: string | null;
  loading: boolean;
  onClose: () => void;
}

export default function FileDetailModal({
  file,
  contents,
  loading,
  onClose,
}: Readonly<FileDetailModalProps>) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = `/api/v1/files/${file.id}/content`;
    a.download = file.filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handleCopy = () => {
    if (contents) {
      navigator.clipboard.writeText(contents);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const createdAtTs = file.created_at ?? file.createdAt;
  const expiresAtTs = file.expires_at ?? file.expiresAt;

  const lineCount = contents ? contents.split("\n").filter((l) => l.trim()).length : 0;
  const isTruncated = lineCount > 1000;
  const displayedLines = contents
    ? contents
        .split("\n")
        .filter((l) => l.trim())
        .slice(0, 1000)
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative w-full sm:max-w-3xl bg-[var(--color-surface)] border border-[var(--color-border)] rounded-t-2xl sm:rounded-xl shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)] flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[20px] text-[var(--color-text-muted)]">
              description
            </span>
            <div>
              <h2 className="text-base font-semibold text-[var(--color-text-main)]">
                File Contents
              </h2>
              <div className="flex items-center gap-2 mt-0.5">
                <p className="text-xs text-[var(--color-text-muted)] font-mono">{file.id}</p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(file.id);
                  }}
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] transition-colors"
                  title="Copy ID"
                >
                  <span className="material-symbols-outlined text-[12px]">content_copy</span>
                </button>
              </div>
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
        <div className="overflow-y-auto flex-1 p-6 flex flex-col gap-6">
          {/* Metadata */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-[var(--color-bg-alt)] border border-[var(--color-border)]">
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] uppercase tracking-wider font-medium text-[var(--color-text-muted)]">
                Size
              </span>
              <span className="text-sm text-[var(--color-text-main)]">
                {formatBytes(file.bytes)}
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] uppercase tracking-wider font-medium text-[var(--color-text-muted)]">
                Purpose
              </span>
              <span className="text-sm text-[var(--color-text-main)]">{file.purpose}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] uppercase tracking-wider font-medium text-[var(--color-text-muted)]">
                Created
              </span>
              <span className="text-sm text-[var(--color-text-main)]">
                {createdAtTs ? relativeTime(createdAtTs) : "—"}
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] uppercase tracking-wider font-medium text-[var(--color-text-muted)]">
                Expires
              </span>
              <span className="text-sm text-[var(--color-text-main)]">
                {expiresAtTs ? relativeExpiration(expiresAtTs) : "Never"}
              </span>
            </div>
          </div>

          {/* Contents */}
          <div className="flex-1 flex flex-col min-h-[300px]">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                Preview
              </h3>
              {contents && (
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded border border-[var(--color-border)] bg-[var(--color-bg-alt)] text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] transition-colors"
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {copied ? "check" : "content_copy"}
                  </span>
                  {copied ? "Copied!" : "Copy"}
                </button>
              )}
            </div>

            <div className="flex-1 relative group">
              {loading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-bg)]/50 rounded-lg">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-accent)]" />
                </div>
              ) : contents ? (
                <div className="h-full flex flex-col">
                  <pre className="flex-1 overflow-auto text-[11px] bg-[var(--color-bg)] rounded-lg p-4 border border-[var(--color-border)] text-[var(--color-text-muted)] font-mono leading-relaxed">
                    {displayedLines.join("\n")}
                  </pre>
                  {isTruncated && (
                    <div className="mt-3 p-3 bg-yellow-500/10 border border-yellow-500/25 rounded-lg text-xs text-yellow-400 flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px]">warning</span>
                      Showing first 1000 lines ({lineCount} total lines)
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full py-12 rounded-lg border border-dashed border-[var(--color-border)] text-[var(--color-text-muted)]">
                  <span className="material-symbols-outlined text-[40px] mb-2 opacity-20">
                    find_in_page
                  </span>
                  <p className="text-sm">Failed to load file contents</p>
                </div>
              )}
            </div>
          </div>

          {/* Footer Action */}
          <div className="flex justify-end gap-3 mt-2">
            <Button
              onClick={handleDownload}
              className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-[var(--color-accent)] text-white hover:opacity-90 transition-opacity"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              Download Full File
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
