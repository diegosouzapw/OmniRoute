import type { EvalReport, KindSummary } from "./types.ts";

function fmtDelta(d: number | null): string {
  return d === null ? "n/a" : `${d > 0 ? "+" : ""}${d}%`;
}

function kindRow(k: KindSummary): string {
  return `| ${k.kind} | ${k.casesScored} | ${k.fidelityPreservedPct}% | ${fmtDelta(k.goldAccuracyDeltaPct)} | ${k.meanRatio} |`;
}

/**
 * Render the eval report as markdown with the pinned reproducibility stamps in the header
 * (D1 §4.1) and a prominent PARTIAL banner when the cost cap stopped the run.
 */
export function formatReport(report: EvalReport): string {
  const { stamps, overall } = report;
  const lines: string[] = [];
  lines.push("# Compression evaluation report (D1)");
  lines.push("");
  if (report.partial) {
    lines.push("> ⚠️ **PARTIAL RUN** — the per-run cost cap was reached; results below cover only the cases scored before the stop.");
    lines.push("");
  }
  lines.push(`- answer model: \`${stamps.answerModel}\``);
  lines.push(`- judge model: \`${stamps.judgeModel}\``);
  lines.push(`- corpus hash: \`${stamps.corpusHash}\``);
  lines.push(`- sample size: ${stamps.sampleSize}`);
  lines.push(`- total cost: $${Math.round(report.totalCostUsd * 1e4) / 1e4}`);
  lines.push("");
  lines.push("## Overall");
  lines.push("");
  lines.push(`- cases scored: ${overall.casesScored} (errored, excluded: ${overall.casesErrored})`);
  lines.push(`- fidelity preserved: ${overall.fidelityPreservedPct}%`);
  lines.push(`- gold-accuracy delta (compressed − full): ${fmtDelta(overall.goldAccuracyDeltaPct)}`);
  lines.push(`- mean compression ratio: ${overall.meanRatio}`);
  lines.push("");
  lines.push("## Per content-kind");
  lines.push("");
  lines.push("| kind | scored | fidelity preserved | gold Δ | mean ratio |");
  lines.push("|---|---|---|---|---|");
  for (const k of report.perKind) lines.push(kindRow(k));
  lines.push("");
  return lines.join("\n");
}
