"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

const MAX_BYTES = 512 * 1024 * 1024; // 512 MB

interface Props {
  onClose: () => void;
  onUploaded: (fileId: string) => void;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function UploadFileModal({ onClose, onUploaded }: Props) {
  const t = useTranslations("common");
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Escape key → onClose
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  function validateAndSet(picked: File) {
    setError(null);
    if (!picked.name.endsWith(".jsonl")) {
      setError(t("uploadModalError"));
      return;
    }
    if (picked.size > MAX_BYTES) {
      setError(t("uploadModalError"));
      return;
    }
    setFile(picked);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = e.target.files?.[0];
    if (picked) validateAndSet(picked);
    // Reset input so the same file can be re-picked after Remove
    e.target.value = "";
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(true);
  }

  function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);
    const picked = e.dataTransfer.files?.[0];
    if (picked) validateAndSet(picked);
  }

  async function handleUpload() {
    if (!file || uploading) return;
    setUploading(true);
    setError(null);
    try {
      const form = new FormData();
      form.append("purpose", "batch"); // D22 hardcoded
      form.append("file", file);
      const res = await fetch("/api/v1/files", { method: "POST", body: form });
      if (!res.ok) {
        setError(t("uploadModalError"));
        return;
      }
      const data = (await res.json()) as { id: string };
      onUploaded(data.id);
      onClose();
    } catch (err) {
      console.error("[UploadFileModal]", err);
      setError(t("uploadModalError"));
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className="relative w-full sm:max-w-md bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-200 flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-label={t("uploadModalTitle")}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[var(--color-accent)]">
              upload_file
            </span>
            <h2 className="text-base font-semibold text-[var(--color-text-main)]">
              {t("uploadModalTitle")}
            </h2>
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
        <div className="px-6 py-5 flex flex-col gap-4">
          {/* Error banner */}
          {error && (
            <div
              role="alert"
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/25 text-red-400 text-sm"
            >
              <span className="material-symbols-outlined text-[16px]">error</span>
              {error}
            </div>
          )}

          {/* Drop zone or file info */}
          {!file ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
              className={`flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-10 cursor-pointer transition-colors select-none ${
                dragging
                  ? "border-[var(--color-accent)] bg-[var(--color-accent)]/5"
                  : "border-[var(--color-border)] hover:border-[var(--color-accent)]/60 hover:bg-[var(--color-bg-alt)]"
              }`}
              role="button"
              tabIndex={0}
              aria-label={t("uploadModalDropOrPick")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
              }}
            >
              <span
                className={`material-symbols-outlined text-[40px] ${dragging ? "text-[var(--color-accent)]" : "text-[var(--color-text-muted)]"}`}
              >
                upload_file
              </span>
              <span className="text-sm text-[var(--color-text-main)] text-center">
                {t("uploadModalDropOrPick")}
              </span>
              <span className="text-xs text-[var(--color-text-muted)] text-center">
                {t("uploadModalSizeLimit")}
              </span>
              <input
                ref={inputRef}
                type="file"
                accept=".jsonl"
                className="hidden"
                onChange={handleInputChange}
                aria-hidden="true"
                tabIndex={-1}
              />
            </div>
          ) : (
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[var(--color-bg-alt)] border border-[var(--color-border)]">
              <span className="material-symbols-outlined text-[24px] text-[var(--color-accent)] shrink-0">
                description
              </span>
              <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                <span
                  className="text-sm font-medium text-[var(--color-text-main)] truncate"
                  title={file.name}
                >
                  {file.name}
                </span>
                <span className="text-xs text-[var(--color-text-muted)]">
                  {formatBytes(file.size)}
                </span>
              </div>
              <button
                onClick={() => {
                  setFile(null);
                  setError(null);
                }}
                className="shrink-0 text-xs text-[var(--color-text-muted)] hover:text-red-400 transition-colors px-2 py-1 rounded border border-[var(--color-border)] hover:border-red-400/40"
              >
                {t("uploadFileModalRemove")}
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[var(--color-border)]">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium rounded-lg text-[var(--color-text-muted)] hover:bg-[var(--color-bg-alt)] transition-colors border border-[var(--color-border)]"
          >
            {t("uploadModalCancel")}
          </button>
          <button
            onClick={() => void handleUpload()}
            disabled={!file || uploading}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-[var(--color-accent)] text-white hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {uploading ? (
              <>
                <span className="animate-spin inline-block rounded-full h-4 w-4 border-b-2 border-white" />
                {t("uploadFileModalUploading")}
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[16px]">upload</span>
                {t("uploadModalUpload")}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
