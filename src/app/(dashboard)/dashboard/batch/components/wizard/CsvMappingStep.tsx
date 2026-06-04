"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { csvToJsonl } from "@/lib/batches/csvToJsonl";
import type { WizardCsvMapping, WizardDestination } from "@/lib/batches/types";

// RFC 4180 minimal CSV row parser (inline — avoids coupling to csvToJsonl internals)
function parseCsvRow(line: string): string[] {
  const out: string[] = [];
  let buf = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"' && line[i + 1] === '"') {
        buf += '"';
        i++;
        continue;
      }
      if (ch === '"') {
        inQuotes = false;
        continue;
      }
      buf += ch;
    } else {
      if (ch === '"') {
        inQuotes = true;
        continue;
      }
      if (ch === ",") {
        out.push(buf);
        buf = "";
        continue;
      }
      buf += ch;
    }
  }
  out.push(buf);
  return out;
}

const MAPPING_OPTIONS: Array<{ value: string; label: string }> = [
  { value: "", label: "— ignore —" },
  { value: "custom_id", label: "custom_id" },
  { value: "body.messages[0].content", label: "body.messages[0].content" },
  { value: "body.messages[0].role", label: "body.messages[0].role" },
  { value: "body.input", label: "body.input" },
  { value: "body.prompt", label: "body.prompt" },
  { value: "body.max_tokens", label: "body.max_tokens" },
  { value: "body.temperature", label: "body.temperature" },
];

interface ConversionResult {
  rowsParsed: number;
  rowsSkipped: number;
  errors: Array<{ row: number; reason: string }>;
}

interface CsvMappingStepProps {
  csvContent: string;
  mapping: WizardCsvMapping;
  onChange: (mapping: WizardCsvMapping) => void;
  destination: WizardDestination | null;
  onJsonlReady: (jsonl: string, rowsParsed: number, rowsSkipped: number) => void;
}

export default function CsvMappingStep({
  csvContent,
  mapping,
  onChange,
  destination,
  onJsonlReady,
}: CsvMappingStepProps) {
  const t = useTranslations("common");
  const [conversionResult, setConversionResult] = useState<ConversionResult | null>(null);

  // Detect columns from the first CSV line
  const firstLine = csvContent.split(/\r?\n/)[0] ?? "";
  const columns = parseCsvRow(firstLine);

  const mappingValues = Object.values(mapping);
  const hasCustomId = mappingValues.includes("custom_id");
  const hasContent =
    mappingValues.some((v) => v.startsWith("body.messages[")) ||
    mappingValues.includes("body.input") ||
    mappingValues.includes("body.prompt");

  const isValid = hasCustomId && hasContent;

  function handleColumnMap(column: string, fieldPath: string) {
    const next = { ...mapping };
    if (!fieldPath) {
      delete next[column];
    } else {
      next[column] = fieldPath;
    }
    onChange(next);
  }

  function handleApply() {
    if (!isValid || !destination) return;

    let result: ReturnType<typeof csvToJsonl>;
    try {
      result = csvToJsonl({
        csv: csvContent,
        mapping,
        defaults: {
          method: "POST",
          url: destination.endpoint,
          model: destination.model,
        },
      });
    } catch (err) {
      console.error("[CsvMappingStep] csvToJsonl error:", err);
      return;
    }

    setConversionResult({
      rowsParsed: result.rowsParsed,
      rowsSkipped: result.rowsSkipped,
      errors: result.errors,
    });

    if (result.jsonl) {
      onJsonlReady(result.jsonl, result.rowsParsed, result.rowsSkipped);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm font-medium text-[var(--color-text)]">{t("wizardCsvMappingTitle")}</p>

      {columns.length === 0 && (
        <p className="text-xs text-[var(--color-text-muted)]">No columns detected in CSV header.</p>
      )}

      <div className="flex flex-col gap-3">
        {columns.map((col) => (
          <div key={col} className="flex items-center gap-3">
            <span className="text-xs text-[var(--color-text-muted)] font-mono min-w-[120px] truncate">
              {col}
            </span>
            <span className="text-xs text-[var(--color-text-muted)]">→</span>
            <select
              className="flex-1 rounded border border-[var(--color-border)] bg-[var(--color-bg-alt)] px-2 py-1 text-xs text-[var(--color-text)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
              value={mapping[col] ?? ""}
              onChange={(e) => handleColumnMap(col, e.target.value)}
            >
              {MAPPING_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* Validation hints */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-xs">
          <span
            className={`material-symbols-outlined text-sm ${hasCustomId ? "text-emerald-400" : "text-[var(--color-text-muted)]"}`}
          >
            {hasCustomId ? "check_circle" : "radio_button_unchecked"}
          </span>
          <span className={hasCustomId ? "text-emerald-400" : "text-[var(--color-text-muted)]"}>
            custom_id mapped
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span
            className={`material-symbols-outlined text-sm ${hasContent ? "text-emerald-400" : "text-[var(--color-text-muted)]"}`}
          >
            {hasContent ? "check_circle" : "radio_button_unchecked"}
          </span>
          <span className={hasContent ? "text-emerald-400" : "text-[var(--color-text-muted)]"}>
            Content field mapped (messages, input, or prompt)
          </span>
        </div>
      </div>

      {/* Apply button */}
      <button
        type="button"
        disabled={!isValid || !destination}
        onClick={handleApply}
        className="self-start rounded-lg px-4 py-2 text-sm font-medium bg-[var(--color-accent)] text-white disabled:opacity-40 hover:opacity-90 transition-opacity"
      >
        Apply mapping
      </button>

      {/* Conversion feedback */}
      {conversionResult && (
        <div className="flex flex-col gap-1 text-xs">
          <span className="text-emerald-400">{conversionResult.rowsParsed} rows parsed</span>
          {conversionResult.rowsSkipped > 0 && (
            <span className="text-yellow-400">{conversionResult.rowsSkipped} rows skipped</span>
          )}
          {conversionResult.errors.slice(0, 5).map((e) => (
            <span key={e.row} className="text-red-400">
              Row {e.row}: {e.reason}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
