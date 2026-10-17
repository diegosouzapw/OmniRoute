/**
 * modelgrep.ts — Modelgrep benchmark snapshot → model_intelligence rows.
 *
 * Remediation of AUDIT_TASKS.md 1.1: the old nested-ternary
 * `mmlu → hellaswag → 0.5` invented a 0.5 measurement for "no data".
 * Now: collect every finite numeric benchmark value, skip the row when
 * there are none, average the rest, then clamp.
 */
import type { ModelIntelligenceEntry } from "../../db/modelIntelligence.ts";
import { asFinite, asRecord, clamp01, fanOutCategories, normId } from "./shared.ts";

export interface ModelgrepEntry {
  model?: string;
  name?: string;
  benchmarks?: Record<string, number> | null;
}

/**
 * Benchmark values arrive on a 0–100 scale; divide by this to reach 0..1.
 * Values already within 0..1 pass through unchanged.
 */
const BENCHMARK_PERCENT_SCALE = 100;

function toUnit(value: number): number {
  return value > 1 ? value / BENCHMARK_PERCENT_SCALE : value;
}

export function transformModelgrep(
  entries: ModelgrepEntry[] | null | undefined
): Array<Omit<ModelIntelligenceEntry, "syncedAt">> {
  const out: Array<Omit<ModelIntelligenceEntry, "syncedAt">> = [];
  if (!Array.isArray(entries)) return out;
  for (const entry of entries) {
    const record = asRecord(entry);
    if (record === null) continue;
    const model = normId(record.model ?? (record as ModelgrepEntry).name);
    if (!model) continue;
    const benches = asRecord(record.benchmarks);
    if (benches === null) continue;
    let sum = 0;
    let count = 0;
    for (const key of Object.keys(benches)) {
      const value = asFinite(benches[key]);
      if (value === null) continue;
      sum += toUnit(value);
      count++;
    }
    // No usable signal: skip the row, never fabricate a score.
    if (count === 0) continue;
    const score = clamp01(sum / count);
    // One scalar per model — no per-category signal exists, so the same
    // score fans out to all 7 categories (see fanOutCategories).
    out.push(
      ...fanOutCategories({ model, source: "modelgrep_intel", score })
    );
  }
  return out;
}
