import type { CompressionStats } from "./types.ts";
import { extractPreservedBlocks } from "./preservation.ts";
import { validateCompression } from "./validation.ts";
import { scoreToken } from "./ultraHeuristic.ts";

export interface CompressionDiffSegment {
  type: "same" | "removed" | "added";
  text: string;
}

export type HeatmapMode = "ultra" | "universal";

export interface HeatmapToken {
  text: string;
  score: number;
  kept: boolean;
}

export interface CompressionHeatmap {
  mode: HeatmapMode;
  tokens: HeatmapToken[];
}

export interface CompressionPreviewDiff {
  segments: CompressionDiffSegment[];
  preservedBlocks: Array<{ kind: string; preview: string }>;
  ruleRemovals: string[];
  validationWarnings: string[];
  validationErrors: string[];
  fallbackApplied: boolean;
  heatmap?: CompressionHeatmap;
}

export interface CompressionPreviewDiffOptions {
  maxTokenProduct?: number;
}

export const DEFAULT_MAX_PREVIEW_DIFF_TOKEN_PRODUCT = 1_000_000;

function tokenize(text: string): string[] {
  return text.match(/\s+|[^\s]+/g) ?? [];
}

function getDiffSkipWarning(
  original: string,
  compressed: string,
  options: CompressionPreviewDiffOptions = {}
): string | null {
  const maxTokenProduct = options.maxTokenProduct ?? DEFAULT_MAX_PREVIEW_DIFF_TOKEN_PRODUCT;
  if (maxTokenProduct <= 0) return null;

  const originalTokens = tokenize(original).length;
  const compressedTokens = tokenize(compressed).length;
  if (originalTokens * compressedTokens <= maxTokenProduct) return null;

  return `Preview diff omitted because token product ${originalTokens}x${compressedTokens} exceeds safe limit ${maxTokenProduct}.`;
}

export function buildCompressionDiff(
  original: string,
  compressed: string
): CompressionDiffSegment[] {
  const a = tokenize(original);
  const b = tokenize(compressed);
  const dp = Array.from({ length: a.length + 1 }, () => Array<number>(b.length + 1).fill(0));

  for (let i = a.length - 1; i >= 0; i--) {
    for (let j = b.length - 1; j >= 0; j--) {
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }

  const segments: CompressionDiffSegment[] = [];
  const push = (type: CompressionDiffSegment["type"], text: string) => {
    if (!text) return;
    const last = segments[segments.length - 1];
    if (last?.type === type) {
      last.text += text;
    } else {
      segments.push({ type, text });
    }
  };

  let i = 0;
  let j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      push("same", a[i]);
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      push("removed", a[i]);
      i++;
    } else {
      push("added", b[j]);
      j++;
    }
  }
  while (i < a.length) push("removed", a[i++]);
  while (j < b.length) push("added", b[j++]);

  return segments;
}

/**
 * Build a per-token saliency heatmap for the original text.
 *
 * ultra: score each token using scoreToken (0–1); kept = token not in a removed-only diff segment.
 * universal: score is binary (1 = kept, 0 = removed); kept derived from diff segments.
 */
function buildHeatmap(
  mode: HeatmapMode,
  original: string,
  segments: CompressionDiffSegment[]
): CompressionHeatmap {
  const rawTokens = tokenize(original);

  if (mode === "universal") {
    // Walk original tokens in parallel with "removed" and "same" segments to determine kept status.
    // "added" segments have no original counterpart — skip them.
    const keptSet = new Set<number>();
    let cursor = 0;
    for (const seg of segments) {
      if (seg.type === "added") continue;
      const segTokens = tokenize(seg.text);
      if (seg.type === "same") {
        for (let k = 0; k < segTokens.length; k++) {
          keptSet.add(cursor + k);
        }
      }
      cursor += segTokens.length;
    }

    return {
      mode,
      tokens: rawTokens.map((text, idx) => {
        const kept = keptSet.has(idx);
        return { text, score: kept ? 1 : 0, kept };
      }),
    };
  }

  // ultra mode: use scoreToken; kept = not in a purely removed segment position
  const removedRanges: Array<[number, number]> = [];
  let cursor = 0;
  for (const seg of segments) {
    if (seg.type === "added") continue;
    const segTokens = tokenize(seg.text);
    if (seg.type === "removed") {
      removedRanges.push([cursor, cursor + segTokens.length - 1]);
    }
    cursor += segTokens.length;
  }

  return {
    mode,
    tokens: rawTokens.map((text, idx) => {
      const removed = removedRanges.some(([lo, hi]) => idx >= lo && idx <= hi);
      return { text, score: scoreToken(text), kept: !removed };
    }),
  };
}

export function buildCompressionPreviewDiff(
  original: string,
  compressed: string,
  stats: CompressionStats | null | undefined,
  options: CompressionPreviewDiffOptions = {},
  heatmapMode?: HeatmapMode
): CompressionPreviewDiff {
  const validation = validateCompression(original, compressed);
  const preserved = extractPreservedBlocks(original).blocks.map((block) => ({
    kind: block.kind,
    preview: block.content.replace(/\s+/g, " ").slice(0, 120),
  }));
  const diffSkipWarning = getDiffSkipWarning(original, compressed, options);
  const segments: CompressionDiffSegment[] = diffSkipWarning
    ? [{ type: "same", text: "[diff omitted: input too large]" }]
    : buildCompressionDiff(original, compressed);

  const result: CompressionPreviewDiff = {
    segments,
    preservedBlocks: preserved,
    ruleRemovals: stats?.rulesApplied ?? [],
    validationWarnings: [
      ...(stats?.validationWarnings ?? []),
      ...validation.warnings,
      ...(diffSkipWarning ? [diffSkipWarning] : []),
    ],
    validationErrors: [...(stats?.validationErrors ?? []), ...validation.errors],
    fallbackApplied: Boolean(stats?.fallbackApplied || validation.fallbackApplied),
  };

  if (heatmapMode) {
    result.heatmap = buildHeatmap(heatmapMode, original, segments);
  }

  return result;
}
