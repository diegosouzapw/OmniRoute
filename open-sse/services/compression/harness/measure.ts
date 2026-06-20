import { estimateCompressionTokens } from "../stats.ts";
import { extractPreservedBlocks } from "../preservation.ts";

/**
 * Compression eval harness — measurement primitives (C1).
 *
 * Two cheap, API-free signals per compression:
 *  - **ratio**: token savings via the same estimator the pipeline uses for stats.
 *  - **retention**: how many technical entities (URLs, identifiers, env vars,
 *    versions, file paths, error messages, …) survive the compression. We reuse
 *    the canonical preservation extractor so "what counts as important" stays in
 *    one place and tracks the real preservation rules.
 */

/** Entity kinds (from preservation.ts) that carry technical meaning worth keeping. */
const RETENTION_KINDS = new Set<string>([
  "url",
  "markdown_link",
  "const_case",
  "env_var",
  "version",
  "dotted_identifier",
  "function_call",
  "file_path",
  "error_message",
  "inline_code",
]);

export interface RetentionScore {
  /** Distinct technical entities found in the original. */
  total: number;
  /** How many of those appear verbatim in the compressed text. */
  survived: number;
  /** survived / total — 1 when the original had no technical entities. */
  score: number;
  /** Entities present in the original but missing from the compressed text. */
  lost: string[];
}

export interface CompressionMeasurement {
  originalTokens: number;
  compressedTokens: number;
  /** Percentage of tokens saved (0 when nothing was saved, negative if it grew). */
  savingsPercent: number;
  retention: RetentionScore;
}

/** Distinct technical entities in `text`, using the canonical preservation rules. */
export function extractEntities(text: string): string[] {
  const { blocks } = extractPreservedBlocks(text);
  const set = new Set<string>();
  for (const block of blocks) {
    if (RETENTION_KINDS.has(block.kind)) {
      const content = block.content.trim();
      if (content) set.add(content);
    }
  }
  return [...set];
}

/** Fraction of the original's technical entities that survive in `compressed`. */
export function computeRetention(original: string, compressed: string): RetentionScore {
  const entities = extractEntities(original);
  if (entities.length === 0) {
    return { total: 0, survived: 0, score: 1, lost: [] };
  }
  if (compressed === original) {
    return { total: entities.length, survived: entities.length, score: 1, lost: [] };
  }
  const lost: string[] = [];
  let survived = 0;
  for (const entity of entities) {
    if (compressed.includes(entity)) survived++;
    else lost.push(entity);
  }
  return {
    total: entities.length,
    survived,
    score: survived / entities.length,
    lost,
  };
}

/** Measure ratio + retention for one (original, compressed) pair. */
export function measureCompression(original: string, compressed: string): CompressionMeasurement {
  const originalTokens = estimateCompressionTokens(original);
  const compressedTokens = estimateCompressionTokens(compressed);
  const savingsPercent =
    originalTokens > 0
      ? Math.round(((originalTokens - compressedTokens) / originalTokens) * 1000) / 10
      : 0;
  return {
    originalTokens,
    compressedTokens,
    savingsPercent,
    retention: computeRetention(original, compressed),
  };
}
