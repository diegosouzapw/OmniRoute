import type { LadderStage } from "./types.ts";

/**
 * Default escalation ladder (design D-C2): cheapest/most-lossless → most aggressive.
 * Ordered by the engine catalog's stackPriority. `ccr` and `llmlingua` are intentionally
 * excluded from the AUTOMATIC ladder (ccr = retrieval markers, llmlingua = optional ONNX
 * SLM tier wired through `ultra`); an operator can still add them via ladderOverride.
 */
export const DEFAULT_LADDER: LadderStage[] = [
  { engine: "session-dedup" }, // lossless cross-turn dedup (catalog pri 3)
  { engine: "rtk", intensity: "standard" }, // command-output filtering (pri 10)
  { engine: "headroom" }, // tabular JSON compaction (pri 15)
  { engine: "lite" }, // whitespace/format cleanup (pri 5, but cheap prose pass)
  { engine: "caveman", intensity: "full" }, // rule-based prose (pri 20)
  { engine: "aggressive" }, // summarize + age old turns (pri 30)
  { engine: "ultra" }, // heuristic token pruning + optional SLM (pri 40)
];

/**
 * Aggressiveness rank used to know where a base plan sits so `floor` mode escalates
 * BEYOND it (design §4.2). Keyed by engine id AND by the equivalent CompressionMode name
 * ("standard" === caveman) so a base plan's `mode` string maps cleanly.
 *
 * Rescaled ×10 vs the original 7-entry scale (#6533) to make room for the novel catalog
 * engines that ship in `open-sse/services/compression/engines/index.ts` but are not part
 * of DEFAULT_LADDER: `ccr` and `llmlingua` are intentionally excluded from the AUTOMATIC
 * ladder (see DEFAULT_LADDER doc comment) yet must still rank correctly when an operator
 * adds them via `ladderOverride` — same for `ionizer`, `relevance`, `llm`, and
 * `read-lifecycle`. Placement follows each engine's documented `stackPriority` in
 * `engineCatalog.ts` / its own module header, interpolated onto the existing 7-tier scale
 * (the `lite` exception — ranked after `headroom` despite a lower stackPriority — is a
 * pre-existing, deliberate design call and is left untouched).
 */
const AGGRESSIVENESS: Record<string, number> = {
  off: 0,
  "session-dedup": 10, // stackPriority 3 — lossless cross-turn dedup
  ccr: 15, // stackPriority 4 — reversible retrieval marker, only if it shrinks
  rtk: 20, // stackPriority 10 — command-output filtering
  ionizer: 25, // stackPriority 13 — tabular row sampling (lighter than headroom)
  headroom: 30, // stackPriority 15 — tabular JSON compaction
  lite: 40, // pri 5, but cheap prose pass (pre-existing reorder, kept as-is)
  "read-lifecycle": 42, // stackPriority 5 (ties lite) — narrow-scope, opt-in, fully lossy
  relevance: 45, // stackPriority 18 — extractive sentence scoring, opt-in
  caveman: 50,
  standard: 50, // mode-name alias for caveman
  stacked: 50, // a derived/stacked base plan sits at the prose tier; floor escalates past it
  aggressive: 60,
  llmlingua: 65, // stackPriority 35 — semantic pruning (ONNX), after aggressive, before ultra/llm
  llm: 68, // stackPriority 38 — full LLM-tier compressor, opt-in default-off
  ultra: 70,
  omniglyph: 80, // stackPriority 90 — context-as-image (lossy render), runs after every text engine
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
  ccr: 0.9, // conservative: only replaces a block when the marker is shorter than it
  rtk: 0.85,
  ionizer: 0.83, // row sampling, lighter than headroom's full tabular compaction
  headroom: 0.8,
  lite: 0.92,
  "read-lifecycle": 0.88, // scope-limited to stale/superseded Read tool-results
  relevance: 0.75, // extractive sentence dropping
  caveman: 0.7,
  standard: 0.7,
  aggressive: 0.55,
  llmlingua: 0.5, // semantic pruning (ONNX)
  llm: 0.45, // full LLM-tier compressor, stronger than llmlingua
  ultra: 0.4,
  omniglyph: 0.35, // measured 0.23-0.33 on converted blocks (254->84 tokens); 0.35 stays conservative
};

export function expectedReductionFactor(engine: string): number {
  return REDUCTION_FACTOR[engine] ?? 0.9;
}
