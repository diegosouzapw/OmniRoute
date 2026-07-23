"use client";

import { useState, useCallback } from "react";
import { buildRetryPlan } from "@/lib/batches/retryFailed";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface BatchActionsState {
  cancelling: boolean;
  retrying: boolean;
  error: string | null;
}

export interface UseBatchActionsResult extends BatchActionsState {
  cancel: (batchId: string) => Promise<void>;
  retry: (batch: {
    id: string;
    inputFileId: string;
    errorFileId?: string | null;
    endpoint: string;
  }) => Promise<{ newBatchId: string } | null>;
  downloadHrefOutput: (outputFileId: string | null | undefined) => string | null;
  downloadHrefErrors: (errorFileId: string | null | undefined) => string | null;
}

// ── Hook ──────────────────────────────────────────────────────────────────────

/**
 * Shared hook for batch row actions: cancel, retry-failed, download output/errors.
 * Reused by BatchListTab (F6) and BatchDetailModal (F7).
 *
 * All error messages use i18n keys via the `t()` passed in opts — never raw err.message/stack.
 * Technical errors are only logged via console.error for diagnostics (D14 compliance).
 *
 * @param opts.onRefresh  Optional callback to call after a successful mutating action.
 * @param opts.t          Translation function (key: string) => string from useTranslations("common").
 */
export function useBatchActions(opts: {
  onRefresh?: () => void;
  t: (key: string, params?: Record<string, unknown>) => string;
}): UseBatchActionsResult {
  const [cancelling, setCancelling] = useState(false);
  const [retrying, setRetrying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ── cancel ────────────────────────────────────────────────────────────────

  const cancel = useCallback(
    async (batchId: string): Promise<void> => {
      setCancelling(true);
      setError(null);
      try {
        const res = await fetch(`/api/v1/batches/${batchId}/cancel`, { method: "POST" });
        if (!res.ok) {
          // Log technical context; surface sanitized i18n key to user (D14)
          console.error("[useBatchActions] cancel", batchId, "status", res.status);
          setError(opts.t("batchActionCancelError"));
          return;
        }
        opts.onRefresh?.();
      } catch (e) {
        // Never expose e.message/stack in UI — diagnostics only (D14)
        console.error("[useBatchActions] cancel threw", e);
        setError(opts.t("batchActionCancelError"));
      } finally {
        setCancelling(false);
      }
    },
    [opts],
  );

  // ── retry ─────────────────────────────────────────────────────────────────

  const retry = useCallback(
    async (batch: {
      id: string;
      inputFileId: string;
      errorFileId?: string | null;
      endpoint: string;
    }): Promise<{ newBatchId: string } | null> => {
      // Guard: no error file means nothing to retry
      if (!batch.errorFileId) {
        return null;
      }

      setRetrying(true);
      setError(null);

      try {
        // 1. Download both input and error files in parallel
        const [inputRes, errorRes] = await Promise.all([
          fetch(`/api/v1/files/${batch.inputFileId}/content`),
          fetch(`/api/v1/files/${batch.errorFileId}/content`),
        ]);

        if (!inputRes.ok || !errorRes.ok) {
          console.error(
            "[useBatchActions] retry file download failed",
            "input",
            inputRes.status,
            "error",
            errorRes.status,
          );
          setError(opts.t("batchActionRetryError"));
          return null;
        }

        const inputJsonl = await inputRes.text();
        const errorJsonl = await errorRes.text();

        // 2. Build retry plan — pure helper, no side effects (D9)
        const plan = buildRetryPlan({ inputJsonl, errorJsonl });

        if (plan.retriableLines === 0) {
          // i18n key surfaced to user; technical context stays in console
          console.error("[useBatchActions] retry: no retriable lines found for", batch.id);
          setError(opts.t("batchActionRetryError"));
          return null;
        }

        // 3. Upload new JSONL file (purpose=batch)
        const formData = new FormData();
        formData.append("purpose", "batch");
        formData.append(
          "file",
          new Blob([plan.newJsonl], { type: "application/jsonl" }),
          `retry-${batch.id}.jsonl`,
        );

        const fileRes = await fetch("/api/v1/files", { method: "POST", body: formData });
        if (!fileRes.ok) {
          console.error("[useBatchActions] retry file upload failed", fileRes.status);
          setError(opts.t("batchActionRetryError"));
          return null;
        }

        const file = (await fileRes.json()) as { id: string };

        // 4. Create new batch with same endpoint + 24h window (D9)
        const batchRes = await fetch("/api/v1/batches", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            input_file_id: file.id,
            endpoint: batch.endpoint,
            completion_window: "24h",
          }),
        });

        if (!batchRes.ok) {
          console.error("[useBatchActions] retry batch create failed", batchRes.status);
          setError(opts.t("batchActionRetryError"));
          return null;
        }

        const newBatch = (await batchRes.json()) as { id: string };
        opts.onRefresh?.();
        return { newBatchId: newBatch.id };
      } catch (e) {
        // Never surface e.message/stack to UI (D14)
        console.error("[useBatchActions] retry threw", e);
        setError(opts.t("batchActionRetryError"));
        return null;
      } finally {
        setRetrying(false);
      }
    },
    [opts],
  );

  // ── download hrefs (pure — no side effects) ───────────────────────────────

  const downloadHrefOutput = useCallback(
    (outputFileId: string | null | undefined): string | null => {
      if (!outputFileId) return null;
      return `/api/v1/files/${outputFileId}/content`;
    },
    [],
  );

  const downloadHrefErrors = useCallback(
    (errorFileId: string | null | undefined): string | null => {
      if (!errorFileId) return null;
      return `/api/v1/files/${errorFileId}/content`;
    },
    [],
  );

  return {
    cancelling,
    retrying,
    error,
    cancel,
    retry,
    downloadHrefOutput,
    downloadHrefErrors,
  };
}
