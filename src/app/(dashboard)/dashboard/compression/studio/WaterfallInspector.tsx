"use client";

import type { CompressionRunModel, CompressionEngineStep } from "./compressionFlowModel";
import { useTranslations } from "next-intl";

// ── Helpers ───────────────────────────────────────────────────────────────

function savingsColor(pct: number): string {
  if (pct >= 30) return "#22c55e";
  if (pct >= 15) return "#f59e0b";
  return "#6b7280";
}

function pctWidth(tokIn: number, tokOut: number): string {
  if (tokIn === 0) return "100%";
  return `${((tokOut / tokIn) * 100).toFixed(1)}%`;
}

function fmt(n: number): string {
  return n.toLocaleString();
}

// ── Row ───────────────────────────────────────────────────────────────────

function StepRow({ step, maxTokens }: { step: CompressionEngineStep; maxTokens: number }) {
  const t = useTranslations("compressionStudio");
  const skipped = step.originalTokens === step.compressedTokens;
  const color = skipped ? "#6b7280" : savingsColor(step.savingsPercent);
  const barWidthIn = maxTokens > 0 ? (step.originalTokens / maxTokens) * 100 : 100;
  const barWidthOut = maxTokens > 0 ? (step.compressedTokens / maxTokens) * 100 : 100;

  return (
    <div
      className="flex items-start gap-3 py-2 border-b border-border/50 last:border-0"
      data-testid="waterfall-step-row"
    >
      {/* Engine label */}
      <div className="w-28 shrink-0">
        <span className="text-xs font-semibold" style={{ color: skipped ? "#6b7280" : color }}>
          {step.engine}
        </span>
        {skipped && (
          <span className="ml-1.5 text-[10px] text-muted bg-muted/10 px-1 rounded">
            {t("skipped")}
          </span>
        )}
      </div>

      {/* Savings bar column */}
      <div className="flex-1 flex flex-col gap-1 min-w-0">
        {/* in bar */}
        <div className="relative h-2 rounded-full bg-border/30 overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-muted/40"
            style={{ width: `${barWidthIn.toFixed(1)}%` }}
          />
        </div>
        {/* out bar */}
        {!skipped && (
          <div className="relative h-2 rounded-full bg-border/30 overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{ width: `${barWidthOut.toFixed(1)}%`, backgroundColor: color }}
            />
          </div>
        )}
      </div>

      {/* Token counts */}
      <div className="w-36 shrink-0 text-right">
        <div className="text-[10px] text-muted">
          {fmt(step.originalTokens)} → {fmt(step.compressedTokens)}
        </div>
        {!skipped && (
          <div
            className="text-[11px] font-bold"
            style={{ color }}
            data-testid="waterfall-savings-text"
          >
            {`-${step.savingsPercent.toFixed(1)}%`}
          </div>
        )}
        {step.durationMs != null && (
          <div className="text-[9px] text-muted">{step.durationMs.toFixed(1)}ms</div>
        )}
      </div>
    </div>
  );
}

// ── Props ─────────────────────────────────────────────────────────────────

export interface WaterfallInspectorProps {
  run: CompressionRunModel;
  className?: string;
}

// ── Component ─────────────────────────────────────────────────────────────

/**
 * WaterfallInspector — A1 waterfall list view for a `CompressionRunModel`.
 *
 * One row per engine step showing a horizontal savings bar (Langfuse-style):
 * - Top bar: tokens in (relative width).
 * - Bottom bar: tokens out (colored by savings %).
 * Reads the same `CompressionRunModel` as the Canvas / Cockpit.
 * Plain divs — no ReactFlow.
 */
export function WaterfallInspector({ run, className = "" }: WaterfallInspectorProps) {
  const t = useTranslations("compressionStudio");
  const maxTokens = run.originalTokens;

  return (
    <div className={`flex flex-col ${className}`} data-testid="waterfall-inspector">
      {/* Header — INPUT */}
      <div className="flex items-center gap-3 py-2 border-b border-border font-semibold text-xs text-muted">
        <span className="w-28 shrink-0 text-primary">⌁ {t("input")}</span>
        <div className="flex-1">
          <div className="h-2 rounded-full bg-muted/30 overflow-hidden">
            <div className="h-full w-full rounded-full bg-muted/50" />
          </div>
        </div>
        <span className="w-36 shrink-0 text-right">
          {t("tokenCount", { count: run.originalTokens })}
        </span>
      </div>

      {/* Steps */}
      {run.steps.map((step, i) => (
        <StepRow key={`${step.engine}-${i}`} step={step} maxTokens={maxTokens} />
      ))}

      {/* Footer — OUTPUT */}
      <div className="flex items-center gap-3 py-2 border-t border-border mt-1">
        <span className="w-28 shrink-0 text-xs font-semibold text-green-500">✦ {t("output")}</span>
        <div className="flex-1">
          <div className="h-2 rounded-full bg-border/30 overflow-hidden">
            <div
              className="h-full rounded-full bg-green-500"
              style={{ width: pctWidth(run.originalTokens, run.compressedTokens) }}
            />
          </div>
        </div>
        <div className="w-36 shrink-0 text-right">
          <div className="text-xs font-semibold text-green-500">
            {t("tokenCount", { count: run.compressedTokens })}
          </div>
          <div
            className="text-[11px] font-bold"
            style={{ color: "#22c55e" }}
            data-testid="waterfall-total-savings"
          >
            {`-${run.savingsPercent.toFixed(1)}%`}
          </div>
        </div>
      </div>

      {/* Summary bar */}
      <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-border/10 mt-2 text-[11px] text-muted">
        <span>
          {fmt(run.originalTokens)} → {fmt(run.compressedTokens)} {t("tokenShort")}
        </span>
        <span className="text-green-500 font-bold">−{run.savingsPercent.toFixed(1)}%</span>
        {run.comboId && <span className="font-mono opacity-70">{run.comboId}</span>}
        <span className="ml-auto opacity-60">{run.mode}</span>
      </div>
    </div>
  );
}

export default WaterfallInspector;
