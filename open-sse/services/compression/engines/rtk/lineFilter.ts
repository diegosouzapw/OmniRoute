import type { RtkFilterDefinition } from "./filterSchema.ts";
import { smartTruncate } from "./smartTruncate.ts";

export interface LineFilterResult {
  text: string;
  strippedLines: number;
  keptByRule: boolean;
  appliedRules: string[];
}

function compilePatterns(patterns: string[]): RegExp[] {
  return patterns.flatMap((pattern) => {
    try {
      return [new RegExp(pattern)];
    } catch {
      return [];
    }
  });
}

export function applyLineFilter(text: string, filter: RtkFilterDefinition): LineFilterResult {
  const stripPatterns = compilePatterns(filter.stripPatterns);
  const keepPatterns = compilePatterns(filter.keepPatterns);
  const collapsePatterns = compilePatterns(filter.collapsePatterns);
  const priorityPatterns = compilePatterns(filter.priorityPatterns);
  const appliedRules: string[] = [];

  let lines = text.split(/\r?\n/);
  const originalLineCount = lines.length;

  if (stripPatterns.length > 0) {
    lines = lines.filter((line) => !stripPatterns.some((pattern) => pattern.test(line)));
    if (lines.length !== originalLineCount) appliedRules.push(`${filter.id}:strip`);
  }

  if (keepPatterns.length > 0) {
    const kept = lines.filter((line) => keepPatterns.some((pattern) => pattern.test(line)));
    if (kept.length > 0) {
      lines = kept;
      appliedRules.push(`${filter.id}:keep`);
    }
  }

  if (collapsePatterns.length > 0) {
    const seen = new Set<string>();
    lines = lines.filter((line) => {
      if (!collapsePatterns.some((pattern) => pattern.test(line))) return true;
      const key = line.trim();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    appliedRules.push(`${filter.id}:collapse`);
  }

  const truncated = smartTruncate(lines.join("\n"), {
    maxLines: filter.maxLines,
    preserveHead: filter.preserveHead,
    preserveTail: filter.preserveTail,
    priorityPatterns,
  });
  if (truncated.truncated) appliedRules.push(`${filter.id}:truncate`);

  return {
    text: truncated.text,
    strippedLines: Math.max(0, originalLineCount - truncated.text.split(/\r?\n/).length),
    keptByRule: keepPatterns.length > 0,
    appliedRules,
  };
}
