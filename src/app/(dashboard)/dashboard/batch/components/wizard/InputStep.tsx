"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import CsvMappingStep from "./CsvMappingStep";
import type { WizardInput, WizardCsvMapping, WizardDestination } from "@/lib/batches/types";

const MAX_FULL_BYTES = 5_000_000; // 5 MB — full read threshold (D7)
const SAMPLE_HEAD_BYTES = 5_000_000;
const SAMPLE_TAIL_BYTES = 100_000;

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

async function readFileContent(file: File): Promise<string> {
  if (file.size <= MAX_FULL_BYTES) {
    return await file.text();
  }
  // Sampling for large files (D7)
  const headText = await file.slice(0, SAMPLE_HEAD_BYTES).text();
  const tailText = await file.slice(file.size - SAMPLE_TAIL_BYTES).text();
  return headText + "\n[...sample only...]\n" + tailText;
}

interface InputStepProps {
  input: WizardInput;
  onChange: (input: WizardInput) => void;
  destination: WizardDestination | null;
}

export default function InputStep({ input, onChange, destination }: InputStepProps) {
  const t = useTranslations("common");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isReading, setIsReading] = useState(false);
  // B-2b — synchronous stale-proof guard for concurrent drops/picks in the same
  // event-loop tick (React state lags behind dispatches within a tick).
  const isReadingRef = useRef(false);
  const [csvJsonl, setCsvJsonl] = useState<string | null>(null);

  const isJsonl = input.kind === "jsonl";
  const isCsv = input.kind === "csv";

  function handleKindChange(kind: "jsonl" | "csv") {
    onChange({ kind, fileName: null, rawContent: null, csvMapping: kind === "csv" ? {} : undefined });
    setCsvJsonl(null);
  }

  async function processFile(file: File) {
    // B-2/B-2b race guard — ref is checked & flipped synchronously so concurrent
    // calls in the same tick (e.g. drop + file-input-change firing back-to-back)
    // cannot both pass. State mirror is for UI only.
    if (isReadingRef.current) return;
    isReadingRef.current = true;
    const expectedExt = isJsonl ? ".jsonl" : ".csv";
    if (!file.name.toLowerCase().endsWith(expectedExt)) {
      // Soft warning — don't block, let validation catch it
    }
    setIsReading(true);
    try {
      const content = await readFileContent(file);
      onChange({
        kind: input.kind,
        fileName: file.name,
        rawContent: content,
        csvMapping: input.kind === "csv" ? (input.csvMapping ?? {}) : undefined,
      });
    } catch (err) {
      console.error("[InputStep] file read error:", err);
    } finally {
      isReadingRef.current = false;
      setIsReading(false);
    }
  }

  function handleFileInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    // Reset input so same file can be re-picked
    e.target.value = "";
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave() {
    setIsDragging(false);
  }

  function handleCsvMappingChange(mapping: WizardCsvMapping) {
    onChange({ ...input, csvMapping: mapping });
    setCsvJsonl(null);
  }

  function handleJsonlReady(jsonl: string, _rowsParsed: number, _rowsSkipped: number) {
    setCsvJsonl(jsonl);
    // Replace rawContent with the converted JSONL so validation step gets it
    onChange({ ...input, rawContent: jsonl, csvMapping: input.csvMapping });
  }

  const isLargeFile = input.rawContent != null && input.rawContent.includes("[...sample only...]");
  const hasFile = input.fileName != null && input.rawContent != null;
  const csvMappingReady = isCsv && csvJsonl != null;

  // For CSV: needs mapping complete + jsonl generated to be "ready"
  // rawContent will be updated by handleJsonlReady once mapping applied

  const acceptAttr = isJsonl ? ".jsonl" : ".csv";

  return (
    <div className="flex flex-col gap-6">
      {/* Kind toggle */}
      <div className="flex rounded-lg border border-[var(--color-border)] overflow-hidden self-start">
        <button
          type="button"
          onClick={() => handleKindChange("jsonl")}
          className={`px-4 py-2 text-sm font-medium transition-colors ${isJsonl ? "bg-[var(--color-accent)] text-white" : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"}`}
        >
          {t("wizardInputKindJsonl")}
        </button>
        <button
          type="button"
          onClick={() => handleKindChange("csv")}
          className={`px-4 py-2 text-sm font-medium transition-colors ${isCsv ? "bg-[var(--color-accent)] text-white" : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"}`}
        >
          {t("wizardInputKindCsv")}
        </button>
      </div>

      {/* Drop zone — disabled while reading to prevent race (B-2) */}
      <div
        role="button"
        tabIndex={isReading ? -1 : 0}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !isReading && fileInputRef.current?.click()}
        onKeyDown={(e) => {
          if (isReading) return;
          if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click();
        }}
        aria-disabled={isReading}
        className={`rounded-xl border-2 border-dashed p-8 flex flex-col items-center gap-3 transition-colors
          ${isReading ? "cursor-wait opacity-60 pointer-events-none" : "cursor-pointer"}
          ${isDragging ? "border-[var(--color-accent)] bg-[var(--color-accent)]/5" : "border-[var(--color-border)] hover:border-[var(--color-accent)]/50"}`}
      >
        <span className="material-symbols-outlined text-3xl text-[var(--color-text-muted)]">
          upload_file
        </span>
        {isReading ? (
          <span className="text-sm text-[var(--color-text-muted)]">{t("wizardInputReading")}</span>
        ) : hasFile ? (
          <div className="flex flex-col items-center gap-1">
            <span className="text-sm text-[var(--color-text)] font-medium">{input.fileName}</span>
            <span className="text-xs text-[var(--color-text-muted)]">
              {isLargeFile ? t("wizardInputLargeFileLabel") : t("wizardInputReady")}
            </span>
          </div>
        ) : (
          <span className="text-sm text-[var(--color-text-muted)]">{t("wizardDropOrPick")}</span>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptAttr}
          className="hidden"
          onChange={handleFileInputChange}
        />
      </div>

      {/* Large file warning */}
      {isLargeFile && (
        <div className="rounded-lg border border-yellow-500/25 bg-yellow-500/10 px-3 py-2 text-xs text-yellow-400">
          {t("wizardInputLargeFileWarning")}
        </div>
      )}

      {/* CSV mapping (inline step 2.5) */}
      {isCsv && hasFile && input.rawContent && (
        <div className="rounded-xl border border-[var(--color-border)] p-4">
          <CsvMappingStep
            csvContent={input.rawContent}
            mapping={input.csvMapping ?? {}}
            onChange={handleCsvMappingChange}
            destination={destination}
            onJsonlReady={handleJsonlReady}
          />
          {csvMappingReady && (
            <p className="mt-3 text-xs text-emerald-400">{t("wizardInputCsvJsonlReady")}</p>
          )}
        </div>
      )}
    </div>
  );
}
