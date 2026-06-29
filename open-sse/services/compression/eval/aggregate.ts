import type { ContentKind, EvalRecord, EvalReport, KindSummary, RunStamps } from "./types.ts";

function pct(n: number, d: number): number {
  return d > 0 ? Math.round((n / d) * 1000) / 10 : 0;
}

function goldDelta(scored: EvalRecord[]): number | null {
  const gold = scored.filter((r) => r.goldFull !== null && r.goldCompressed !== null);
  if (gold.length === 0) return null;
  const fullCorrect = gold.filter((r) => r.goldFull === true).length;
  const compCorrect = gold.filter((r) => r.goldCompressed === true).length;
  return Math.round((pct(compCorrect, gold.length) - pct(fullCorrect, gold.length)) * 10) / 10;
}

function meanRatio(scored: EvalRecord[]): number {
  if (scored.length === 0) return 1;
  const sum = scored.reduce((s, r) => s + r.savings.ratio, 0);
  return Math.round((sum / scored.length) * 10000) / 10000;
}

function summarizeKind(kind: ContentKind, scored: EvalRecord[]): KindSummary {
  const same = scored.filter((r) => r.fidelity === "same").length;
  return {
    kind,
    casesScored: scored.length,
    fidelityPreservedPct: pct(same, scored.length),
    goldAccuracyDeltaPct: goldDelta(scored),
    meanRatio: meanRatio(scored),
  };
}

/**
 * Aggregate per content-kind + overall. Errored records (D1 §6) are counted but EXCLUDED
 * from every rate so a failed model call can't masquerade as a fidelity loss. `run.partial`
 * (cost-cap stop) and `run.totalCostUsd` flow through unchanged.
 */
export function aggregateRecords(
  records: EvalRecord[],
  stamps: RunStamps,
  run: { partial: boolean; totalCostUsd: number }
): EvalReport {
  const scored = records.filter((r) => !r.errored);
  const errored = records.length - scored.length;

  const kinds = Array.from(new Set(scored.map((r) => r.kind)));
  const perKind = kinds.map((k) => summarizeKind(k, scored.filter((r) => r.kind === k)));

  const same = scored.filter((r) => r.fidelity === "same").length;
  return {
    stamps,
    partial: run.partial,
    totalCostUsd: run.totalCostUsd,
    overall: {
      casesScored: scored.length,
      casesErrored: errored,
      fidelityPreservedPct: pct(same, scored.length),
      goldAccuracyDeltaPct: goldDelta(scored),
      meanRatio: meanRatio(scored),
    },
    perKind,
  };
}
