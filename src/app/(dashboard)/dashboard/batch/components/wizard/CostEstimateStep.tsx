"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { estimateBatchCost } from "@/lib/batches/costEstimator";
import type { CostEstimate } from "@/lib/batches/types";
import type { SupportedBatchEndpoint } from "@/lib/batches/types";

interface CostEstimateStepProps {
  jsonl: string;
  model: string;
  endpoint: SupportedBatchEndpoint;
  onCreate: () => void;
  creating: boolean;
  error: string | null;
}

export default function CostEstimateStep({
  jsonl,
  model,
  endpoint,
  onCreate,
  creating,
  error,
}: CostEstimateStepProps) {
  const t = useTranslations("common");
  const [estimate, setEstimate] = useState<CostEstimate | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    try {
      const est = estimateBatchCost({ jsonl, model, endpoint });
      setEstimate(est);
    } catch (err) {
      console.error("[CostEstimateStep] cost estimation error:", err);
      // Fallback: zero-cost estimate so user can still proceed
      setEstimate({
        model,
        totalRequests: 0,
        estimatedInputTokens: 0,
        estimatedOutputTokens: 0,
        syncCostUsd: 0,
        batchCostUsd: 0,
        savingsUsd: 0,
        pricingSource: "fallback",
        warnings: ["Cost estimation failed — shown as $0."],
      });
    } finally {
      setLoading(false);
    }
  }, [jsonl, model, endpoint]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-3">
        <span className="material-symbols-outlined text-3xl text-[var(--color-accent)] animate-spin">
          progress_activity
        </span>
        <span className="text-sm text-[var(--color-text-muted)]">{t("wizardCostEstimating")}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Cost breakdown card */}
      {estimate && (
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-alt)] divide-y divide-[var(--color-border)]">
          {/* Sync cost (baseline) */}
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-sm text-[var(--color-text-muted)]">{t("wizardCostSync")}</span>
            <span className="text-sm text-[var(--color-text-muted)] line-through">
              ${estimate.syncCostUsd.toFixed(4)}
            </span>
          </div>

          {/* Batch cost (-50%) */}
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-sm font-medium text-emerald-400">{t("wizardCostBatch")}</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-emerald-500/80 bg-emerald-500/10 rounded px-1.5 py-0.5">
                -50%
              </span>
              <span className="text-sm font-semibold text-emerald-400">
                ${estimate.batchCostUsd.toFixed(4)}
              </span>
            </div>
          </div>

          {/* Savings */}
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-sm text-[var(--color-text-muted)]">{t("wizardCostSavings")}</span>
            <span className="text-sm text-emerald-400">${estimate.savingsUsd.toFixed(4)}</span>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-xs text-[var(--color-text-muted)]">{t("wizardCostRequests")}</span>
            <span className="text-xs text-[var(--color-text-muted)]">
              {estimate.totalRequests.toLocaleString()} ·{" "}
              {estimate.estimatedInputTokens.toLocaleString()} {t("wizardCostInputTok")} ·{" "}
              {estimate.estimatedOutputTokens.toLocaleString()} {t("wizardCostOutputTok")}
            </span>
          </div>

          {/* Completion window — spec §5 "janela 24h" (A-3) */}
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-xs text-[var(--color-text-muted)]">{t("wizardCostWindow")}</span>
            <span className="inline-flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
              <span className="material-symbols-outlined text-[12px]">schedule</span>
              {t("wizardCostWindow24h")}
            </span>
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <p className="text-xs text-[var(--color-text-muted)] italic">{t("wizardCostEstimatedNotice")}</p>

      {/* Warnings */}
      {estimate && estimate.warnings.length > 0 && (
        <div className="flex flex-col gap-1">
          {estimate.warnings.map((w) => (
            <div
              key={w}
              className="rounded-lg border border-yellow-500/25 bg-yellow-500/10 px-3 py-2 text-xs text-yellow-400"
            >
              {w}
            </div>
          ))}
        </div>
      )}

      {/* Error banner (already sanitized by orchestrator) */}
      {error && (
        <div
          role="alert"
          className="rounded-lg border border-red-500/25 bg-red-500/10 px-3 py-2 text-sm text-red-400"
        >
          {error}
        </div>
      )}

      {/* Create button */}
      <button
        type="button"
        onClick={onCreate}
        disabled={creating}
        className="w-full rounded-xl py-3 text-sm font-semibold bg-[var(--color-accent)] text-white disabled:opacity-60 hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
      >
        {creating ? (
          <>
            <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
            {t("wizardCreating")}
          </>
        ) : (
          <>
            <span className="material-symbols-outlined text-sm">rocket_launch</span>
            {t("wizardCreate")}
          </>
        )}
      </button>
    </div>
  );
}
