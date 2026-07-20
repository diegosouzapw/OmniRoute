"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { validateJsonl } from "@/lib/batches/validateJsonl";
import type { ValidationResult } from "@/lib/batches/types";
import type { SupportedBatchEndpoint } from "@/lib/batches/types";

interface JsonlValidationStepProps {
  jsonl: string;
  endpoint: SupportedBatchEndpoint;
  onResult: (result: ValidationResult) => void;
}

export default function JsonlValidationStep({
  jsonl,
  endpoint,
  onResult,
}: JsonlValidationStepProps) {
  const t = useTranslations("common");
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setResult(null);
    try {
      const r = validateJsonl(jsonl, { endpoint });
      setResult(r);
      onResult(r);
    } catch (err) {
      console.error("[JsonlValidationStep] validate error:", err);
      // Provide a minimal failed result on exception
      const errResult: ValidationResult = {
        ok: false,
        totalLines: 0,
        sampledLines: 0,
        uniqueCustomIds: 0,
        duplicateCustomIds: [],
        errors: [{ lineNumber: 0, reason: "Validation failed — could not parse content." }],
        preview: [],
        byteSize: 0,
      };
      setResult(errResult);
      onResult(errResult);
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jsonl, endpoint]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-3">
        <span className="material-symbols-outlined text-3xl text-[var(--color-accent)] animate-spin">
          progress_activity
        </span>
        <span className="text-sm text-[var(--color-text-muted)]">Validating…</span>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="flex flex-col gap-5">
      {/* OK / Error banner — spec §5 "campos OK" appended on success (A-7) */}
      {result.ok ? (
        <div className="flex items-center gap-3 rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-4 py-3">
          <span className="material-symbols-outlined text-emerald-400">check_circle</span>
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium text-emerald-400">{t("wizardValidationOk")}</span>
            <span className="text-xs text-[var(--color-text-muted)]">
              {result.totalLines} lines · {result.uniqueCustomIds} unique custom_ids ·{" "}
              {t("wizardValidationFieldsOk")}
            </span>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3">
          <span className="material-symbols-outlined text-red-400">error</span>
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium text-red-400">{t("wizardValidationErrors")}</span>
            <span className="text-xs text-[var(--color-text-muted)]">
              {result.errors.length} error{result.errors.length !== 1 ? "s" : ""} found
            </span>
          </div>
        </div>
      )}

      {/* Sampling note */}
      {result.sampledLines < result.totalLines && (
        <div className="rounded-lg border border-yellow-500/25 bg-yellow-500/10 px-3 py-2 text-xs text-yellow-400">
          {t("wizardValidationSamplingNote")}
        </div>
      )}

      {/* Duplicate IDs */}
      {result.duplicateCustomIds.length > 0 && (
        <div className="rounded-lg border border-red-500/25 bg-red-500/10 px-3 py-2 flex flex-col gap-1">
          <span className="text-xs font-medium text-red-400">Duplicate custom_ids detected:</span>
          {result.duplicateCustomIds.slice(0, 10).map((id) => (
            <span key={id} className="text-xs text-red-300 font-mono">
              {id}
            </span>
          ))}
        </div>
      )}

      {/* Error table */}
      {result.errors.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-[var(--color-text-muted)]">
            Errors (first {Math.min(result.errors.length, 50)}):
          </span>
          <div className="max-h-60 overflow-auto rounded-lg border border-[var(--color-border)] divide-y divide-[var(--color-border)]">
            {result.errors.slice(0, 50).map((err) => (
              <div key={`${err.lineNumber}-${err.reason}`} className="px-3 py-2 flex gap-3 text-xs">
                <span className="text-[var(--color-text-muted)] min-w-[60px]">
                  Line {err.lineNumber}
                </span>
                <span className="text-red-400 flex-1">{err.reason}</span>
                {err.field && (
                  <span className="text-[var(--color-text-muted)] font-mono">{err.field}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Preview */}
      {result.preview.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-[var(--color-text-muted)]">
            {t("wizardValidationPreview")}
          </span>
          <pre className="max-h-40 overflow-auto rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-alt)] p-3 text-xs text-[var(--color-text)] whitespace-pre-wrap break-all">
            {JSON.stringify(result.preview, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
