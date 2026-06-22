import type { LadderStage } from "./types.ts";

/**
 * Default escalation ladder (design D-C2): cheapest/most-lossless → most aggressive.
 * Ordered by the engine catalog's stackPriority. `ccr` and `llmlingua` are intentionally
 * excluded from the AUTOMATIC ladder (ccr = retrieval markers, llmlingua = optional ONNX
 * SLM tier wired through `ultra`); an operator can still add them via ladderOverride.
 */
export const DEFAULT_LADDER: LadderStage[] = [
  { engine: "session-dedup" },        // lossless cross-turn dedup (catalog pri 3)
  { engine: "rtk", intensity: "standard" }, // command-output filtering (pri 10)
  { engine: "headroom" },             // tabular JSON compaction (pri 15)
  { engine: "lite" },                 // whitespace/format cleanup (pri 5, but cheap prose pass)
  { engine: "caveman", intensity: "full" }, // rule-based prose (pri 20)
  { engine: "aggressive" },           // summarize + age old turns (pri 30)
  { engine: "ultra" },                // heuristic token pruning + optional SLM (pri 40)
];

/**
 * Aggressiveness rank used to know where a base plan sits so `floor` mode escalates
 * BEYOND it (design §4.2). Keyed by engine id AND by the equivalent CompressionMode name
 * ("standard" === caveman) so a base plan's `mode` string maps cleanly.
 */
const AGGRESSIVENESS: Record<string, number> = {
  off: 0,
  "session-dedup": 1,
  rtk: 2,
  headroom: 3,
  lite: 4,
  caveman: 5,
  standard: 5, // mode-name alias for caveman
  stacked: 5,  // a derived/stacked base plan sits at the prose tier; floor escalates past it
  aggressive: 6,
  ultra: 7,
};

export function aggressivenessOf(engineOrMode: string): number {
  return AGGRESSIVENESS[engineOrMode] ?? 0;
}

/**
 * Cheap per-engine EXPECTED reduction factor (output/input). Used by the default injected
 * estimator to model "apply this stage" WITHOUT a dry-run (design §9: no per-stage dry-run
 * in the hot path). Conservative, monotonic with aggressiveness; never 0 (content preserved).
 */
const REDUCTION_FACTOR: Record<string, number> = {
  "session-dedup": 0.95,
  rtk: 0.85,
  headroom: 0.8,
  lite: 0.92,
  caveman: 0.7,
  standard: 0.7,
  aggressive: 0.55,
  ultra: 0.4,
};

export function expectedReductionFactor(engine: string): number {
  return REDUCTION_FACTOR[engine] ?? 0.9;
}
