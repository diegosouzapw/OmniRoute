// Cache impact is a qualitative estimate of how much an engine's per-request output
// variance disrupts upstream prompt-prefix caching (e.g. Anthropic/OpenAI prompt
// caching): "none"/"low" = deterministic, cache-friendly; "high" = output shape varies
// enough across requests (summarization, query-dependent pruning) that cached prefixes
// are less likely to be reused. Source: docs/compression/COMPRESSION_GUIDE.md,
// docs/compression/COMPRESSION_ENGINES.md (#7530).
export type CacheImpact = "none" | "low" | "moderate" | "high";

export interface EngineGuidance {
  // Short, in-product explanation of the quality/latency tradeoff — adapted from
  // docs/compression/COMPRESSION_GUIDE.md / COMPRESSION_ENGINES.md, not invented.
  tradeoffs: string;
  // true = the engine can drop/alter content a later turn might have needed (semantic
  // condensation, summarization, pruning). false = structural/formatting-only, safe to
  // leave on. "Safe default" status is DERIVED from this flag (see isSafeDefault) rather
  // than duplicated as its own field.
  lossy: boolean;
  cacheImpact: CacheImpact;
}

export interface EngineMeta {
  id: string;
  label: string;
  stackPriority: number;
  levels?: string[]; // intensity options; undefined = no level selector
  isSingleMode: boolean; // can be the effective mode when it is the only engine on
  description: string;
  guidance: EngineGuidance;
}

export const ENGINE_CATALOG: Record<string, EngineMeta> = {
  "session-dedup": {
    id: "session-dedup",
    label: "Session Dedup",
    stackPriority: 3,
    isSingleMode: false,
    description: "Cross-turn block deduplication.",
    guidance: {
      tradeoffs:
        "Lossless — elides only text already sent earlier in the same session; nothing is summarized or dropped. Negligible latency overhead.",
      lossy: false,
      cacheImpact: "low",
    },
  },
  ccr: {
    id: "ccr",
    label: "CCR (Retrieval)",
    stackPriority: 4,
    isSingleMode: false,
    description: "Content-addressed retrieval markers.",
    guidance: {
      tradeoffs:
        "Lossless — replaces large repeated/contiguous blocks with content-addressed references instead of deleting them; the original content stays retrievable.",
      lossy: false,
      cacheImpact: "low",
    },
  },
  lite: {
    id: "lite",
    label: "Lite",
    stackPriority: 5,
    isSingleMode: true,
    description: "Whitespace/format cleanup.",
    guidance: {
      tradeoffs:
        "Safest mode (~15% savings, <1ms latency): whitespace/dedup/formatting cleanup only, zero semantic change. Always safe to leave on.",
      lossy: false,
      cacheImpact: "none",
    },
  },
  rtk: {
    id: "rtk",
    label: "RTK",
    stackPriority: 10,
    levels: ["minimal", "standard", "aggressive"],
    isSingleMode: true,
    description: "Command-output filtering.",
    guidance: {
      tradeoffs:
        "Strips ANSI noise, progress bars, and repeated lines from command/tool output while preserving failures, warnings, and summaries (60-90% upstream savings). The 'aggressive' level trims more tail context than 'minimal'/'standard'.",
      lossy: true,
      cacheImpact: "moderate",
    },
  },
  "codex-responses": {
    id: "codex-responses",
    label: "Responses Tool Output",
    stackPriority: 12,
    isSingleMode: true,
    description: "Conservative compression for supported Responses tool outputs.",
    guidance: {
      tradeoffs:
        "Lossless-first JSON and bounded diagnostic compression for shell, patch, search, and build outputs. Protected tools and uncertain shapes pass through unchanged.",
      lossy: true,
      cacheImpact: "low",
    },
  },
  headroom: {
    id: "headroom",
    label: "Headroom",
    stackPriority: 15,
    isSingleMode: false,
    description: "Tabular JSON compaction.",
    guidance: {
      tradeoffs:
        "Lossless columnar compaction (SmartCrusher) of homogeneous JSON-array payloads into a compact '[N rows]' form — no data is discarded.",
      lossy: false,
      cacheImpact: "low",
    },
  },
  relevance: {
    id: "relevance",
    label: "Relevance",
    stackPriority: 18,
    isSingleMode: true,
    description: "Extractive sentence scoring against the last user query.",
    guidance: {
      tradeoffs:
        "Drops sentences scored as less relevant to the last user query — output depends on the query, so it can omit context a later turn needs.",
      lossy: true,
      cacheImpact: "moderate",
    },
  },
  caveman: {
    id: "caveman",
    label: "Caveman",
    stackPriority: 20,
    levels: ["lite", "full", "ultra"],
    isSingleMode: true,
    description: "Rule-based prose compression.",
    guidance: {
      tradeoffs:
        "Rule-based prose condensation (~30% savings at 'full'): strips filler and hedging while preserving meaning, but rewrites text so it is not byte-identical to the original.",
      lossy: true,
      cacheImpact: "moderate",
    },
  },
  aggressive: {
    id: "aggressive",
    label: "Aggressive",
    stackPriority: 30,
    isSingleMode: true,
    description: "Summarize + age old turns.",
    guidance: {
      tradeoffs:
        "Summarizes and progressively ages older turns (~50% savings) — trades older-turn fidelity for context headroom in long sessions; summarized turns can't be perfectly reconstructed.",
      lossy: true,
      cacheImpact: "high",
    },
  },
  llmlingua: {
    id: "llmlingua",
    label: "LLMLingua (SLM)",
    stackPriority: 35,
    isSingleMode: false,
    description: "Semantic pruning (ONNX).",
    guidance: {
      tradeoffs:
        "Semantic token pruning via a small ONNX classifier — removes individual tokens judged low-information. Fail-opens (returns the original text) on any error, so the worst case is no savings, never corruption.",
      lossy: true,
      cacheImpact: "high",
    },
  },
  ultra: {
    id: "ultra",
    label: "Ultra",
    stackPriority: 40,
    isSingleMode: true,
    description: "Heuristic token pruning (+ optional SLM).",
    guidance: {
      tradeoffs:
        "Maximum-compression mode (~75% savings): heuristic pruning, code-block thinning, and binary-search truncation. Highest risk of losing context a later turn depended on — best reserved for hitting context limits.",
      lossy: true,
      cacheImpact: "high",
    },
  },
  omniglyph: {
    id: "omniglyph",
    label: "OmniGlyph",
    stackPriority: 90,
    isSingleMode: true,
    description: "Contexto-como-imagem (Claude Fable 5, rota direta).",
    guidance: {
      tradeoffs:
        "Experimental context-as-image encoding routed directly to Claude Fable 5 only — the most aggressive and least broadly compatible option; not recommended as a general-purpose default.",
      lossy: true,
      cacheImpact: "high",
    },
  },
};

export const ENGINE_IDS: string[] = Object.values(ENGINE_CATALOG)
  .sort((a, b) => a.stackPriority - b.stackPriority)
  .map((e) => e.id);

export function engineMeta(id: string): EngineMeta {
  return ENGINE_CATALOG[id];
}

// "Safe default" = not lossy. Derived rather than a duplicated stored field (open
// question resolved in #7530: engineCatalog had no prior lossy-style attribute, so we
// added one and compute safe-default from it instead of two independently-maintained
// booleans).
export function isSafeDefault(id: string): boolean {
  return !engineMeta(id).guidance.lossy;
}
