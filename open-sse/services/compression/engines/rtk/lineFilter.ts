import type { RtkFilterDefinition } from "./filterSchema.ts";
import { smartTruncate } from "./smartTruncate.ts";
import { deduplicateRepeatedLines } from "./deduplicator.ts";

export interface LineFilterResult {
  text: string;
  strippedLines: number;
  keptByRule: boolean;
  appliedRules: string[];
}

// ──────────────── RegExp cache ────────────────
//
// Patterns are static (loaded from filter JSON files on boot) but were being
// compiled via `new RegExp(...)` on every call to applyLineFilter().  For a
// busy proxy this means thousands of redundant RegExp instantiations per
// second.  Cache them here once.

const regexCache = new Map<string, RegExp>();

function cachedRegExp(pattern: string, flags: string): RegExp | null {
  const key = `${pattern}::${flags}`;
  const cached = regexCache.get(key);
  if (cached) return cached;
  try {
    const re = new RegExp(pattern, flags);
    regexCache.set(key, re);
    return re;
  } catch {
    return null;
  }
}

function compilePatterns(patterns: string[]): RegExp[] {
  return patterns.flatMap((pattern) => {
    const re = cachedRegExp(pattern, "i");
    return re ? [re] : [];
  });
}

function compileGlobalPattern(pattern: string): RegExp | null {
  return cachedRegExp(pattern, "g");
}

function compileBlobPattern(pattern: string): RegExp | null {
  return cachedRegExp(pattern, "im");
}

function stripAnsi(text: string): string {
  return text.replace(/\u001b\[[0-?]*[ -/]*[@-~]/g, "");
}

function normalizeStderrPrefix(line: string): string {
  return line.replace(/^\s*(?:stderr|err)\s*(?:\||:)\s*/i, "");
}

function applyRtkTomlLineLimits(
  lines: string[],
  filter: RtkFilterDefinition,
  appliedRules: string[]
): string[] {
  const head = filter.rtkTomlHeadLines;
  const tail = filter.rtkTomlTailLines;
  const total = lines.length;

  if (head !== undefined && tail !== undefined) {
    if (total > head + tail) {
      lines = [
        ...lines.slice(0, head),
        `... (${total - head - tail} lines omitted)`,
        ...(tail > 0 ? lines.slice(-tail) : []),
      ];
      appliedRules.push(`${filter.id}:rtk-head-tail`);
    }
  } else if (head !== undefined && total > head) {
    lines = [...lines.slice(0, head), `... (${total - head} lines omitted)`];
    appliedRules.push(`${filter.id}:rtk-head`);
  } else if (tail !== undefined && total > tail) {
    lines = [`... (${total - tail} lines omitted)`, ...(tail > 0 ? lines.slice(-tail) : [])];
    appliedRules.push(`${filter.id}:rtk-tail`);
  }

  const maxLines = filter.rtkTomlMaxLines;
  if (maxLines !== undefined && lines.length > maxLines) {
    const dropped = lines.length - maxLines;
    lines = [...lines.slice(0, maxLines), `... (${dropped} lines truncated)`];
    appliedRules.push(`${filter.id}:rtk-max-lines`);
  }
  return lines;
}

function truncateUnicodeSafe(line: string, maxChars: number): string {
  if (maxChars <= 0) return line;
  const chars = Array.from(line);
  if (chars.length <= maxChars) return line;
  if (maxChars <= 3) return chars.slice(0, maxChars).join("");
  return `${chars.slice(0, maxChars - 3).join("")}...`;
}

export function applyLineFilter(text: string, filter: RtkFilterDefinition): LineFilterResult {
  const stripPatterns = compilePatterns(filter.stripPatterns);
  const keepPatterns = compilePatterns(filter.keepPatterns);
  const collapsePatterns = compilePatterns(filter.collapsePatterns);
  const priorityPatterns = compilePatterns(filter.priorityPatterns);
  const appliedRules: string[] = [];

  let lines = text.split(/\r?\n/);
  if (filter.sourceFormat === "rtk-toml-v1" && lines.at(-1) === "") lines.pop();
  const originalLineCount = lines.length;

  if (filter.stripAnsi) {
    const stripped = lines.map(stripAnsi);
    if (stripped.join("\n") !== lines.join("\n")) {
      appliedRules.push(`${filter.id}:strip-ansi`);
    }
    lines = stripped;
  }

  if (filter.filterStderr) {
    const normalized = lines.map(normalizeStderrPrefix);
    if (normalized.join("\n") !== lines.join("\n")) {
      appliedRules.push(`${filter.id}:filter-stderr`);
    }
    lines = normalized;
  }

  for (const rule of filter.replace) {
    const pattern = compileGlobalPattern(rule.pattern);
    if (!pattern) continue;
    const replaced = lines.map((line) => line.replace(pattern, rule.replacement));
    if (replaced.join("\n") !== lines.join("\n")) {
      appliedRules.push(`${filter.id}:replace`);
    }
    lines = replaced;
  }

  if (filter.matchOutput.length > 0) {
    const blob = lines.join("\n");
    for (const rule of filter.matchOutput) {
      const pattern = compileBlobPattern(rule.pattern);
      if (!pattern?.test(blob)) continue;
      const unless = rule.unless ? compileBlobPattern(rule.unless) : null;
      if (unless?.test(blob)) continue;
      appliedRules.push(`${filter.id}:match-output`);
      return {
        text: rule.message,
        strippedLines: Math.max(0, originalLineCount - 1),
        keptByRule: false,
        appliedRules,
      };
    }
  }

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

  if (filter.truncateLineAt > 0) {
    const truncatedLines = lines.map((line) => truncateUnicodeSafe(line, filter.truncateLineAt));
    if (truncatedLines.join("\n") !== lines.join("\n")) {
      lines = truncatedLines;
      appliedRules.push(`${filter.id}:truncate-line`);
    }
  }

  // Per-filter line dedup (opt-in via the filter's `deduplicate` flag): collapse consecutive
  // duplicate lines before truncation. The engine-wide dedup (config.deduplicateThreshold) is
  // separate; this lets a single filter force it for its own output.
  if (filter.deduplicate) {
    const deduped = deduplicateRepeatedLines(lines.join("\n"));
    if (deduped.collapsed > 0) {
      lines = deduped.text.split(/\r?\n/);
      appliedRules.push(`${filter.id}:deduplicate`);
    }
  }

  if (filter.sourceFormat === "rtk-toml-v1") {
    lines = applyRtkTomlLineLimits(lines, filter, appliedRules);
    const output = lines.join("\n");
    const finalOutput = output.trim().length === 0 && filter.onEmpty ? filter.onEmpty : output;
    return {
      text: finalOutput,
      strippedLines: Math.max(0, originalLineCount - finalOutput.split(/\r?\n/).length),
      keptByRule: keepPatterns.length > 0,
      appliedRules,
    };
  }

  const truncated = smartTruncate(lines.join("\n"), {
    maxLines: filter.maxLines,
    preserveHead: filter.preserveHead,
    preserveTail: filter.preserveTail,
    priorityPatterns,
  });
  if (truncated.truncated) appliedRules.push(`${filter.id}:truncate`);
  const output =
    truncated.text.trim().length === 0 && filter.onEmpty ? filter.onEmpty : truncated.text;

  return {
    text: output,
    strippedLines: Math.max(0, originalLineCount - output.split(/\r?\n/).length),
    keptByRule: keepPatterns.length > 0,
    appliedRules,
  };
}
