import type { CompressionStats } from "./types.ts";
import { extractPreservedBlocks } from "./preservation.ts";
import { validateCompression } from "./validation.ts";

export interface CompressionDiffSegment {
  type: "same" | "removed" | "added";
  text: string;
}

export interface CompressionPreviewDiff {
  segments: CompressionDiffSegment[];
  preservedBlocks: Array<{ kind: string; preview: string }>;
  ruleRemovals: string[];
  validationWarnings: string[];
  validationErrors: string[];
  fallbackApplied: boolean;
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

export function buildCompressionPreviewDiff(
  original: string,
  compressed: string,
  stats: CompressionStats | null | undefined,
  options: CompressionPreviewDiffOptions = {}
): CompressionPreviewDiff {
  const validation = validateCompression(original, compressed);
  const preserved = extractPreservedBlocks(original).blocks.map((block) => ({
    kind: block.kind,
    preview: block.content.replace(/\s+/g, " ").slice(0, 120),
  }));
  const diffSkipWarning = getDiffSkipWarning(original, compressed, options);

  return {
    segments: diffSkipWarning
      ? [{ type: "same", text: "[diff omitted: input too large]" }]
      : buildCompressionDiff(original, compressed),
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
}
