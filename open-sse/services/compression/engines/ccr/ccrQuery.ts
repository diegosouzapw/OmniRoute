/**
 * ccrQuery.ts — ranged/grep/stats retrieval over a CCR block (pure).
 *
 * `full`/absent → whole text (backward-compat). All modes are fail-safe:
 * incoherent params or an unsafe regex yield { error }, never throw. The grep
 * mode validates the pattern with `safe-regex` (no catastrophic backtracking)
 * before compiling, and bounds matches/pattern length.
 */
import safeRegex from "safe-regex";

export type CcrMode = "full" | "head" | "tail" | "lines" | "grep" | "stats";

export interface CcrQuery {
  mode?: CcrMode;
  n?: number;
  start?: number;
  end?: number;
  pattern?: string;
  unique?: boolean;
}

export type CcrQueryResult = { content: string } | { error: string };

export const MAX_RANGE_LINES = 10_000;
export const MAX_GREP_MATCHES = 1_000;
export const MAX_PATTERN_LEN = 512;

const err = (m: string): CcrQueryResult => ({ error: m });
const ok = (c: string): CcrQueryResult => ({ content: c });

function clampCount(n: number | undefined): number | null {
  if (typeof n !== "number" || !Number.isFinite(n) || n < 1) return null;
  return Math.min(Math.floor(n), MAX_RANGE_LINES);
}

function sliceHead(lines: string[], n: number | undefined): CcrQueryResult {
  const c = clampCount(n);
  if (c === null) return err("head requires a positive 'n'");
  return ok(lines.slice(0, c).join("\n"));
}

function sliceTail(lines: string[], n: number | undefined): CcrQueryResult {
  const c = clampCount(n);
  if (c === null) return err("tail requires a positive 'n'");
  return ok(lines.slice(Math.max(0, lines.length - c)).join("\n"));
}

function sliceLines(lines: string[], start?: number, end?: number): CcrQueryResult {
  if (typeof start !== "number" || typeof end !== "number" || start < 1 || end < 1) {
    return err("lines requires positive 'start' and 'end' (1-indexed)");
  }
  if (start > end) return err("lines: 'start' must be <= 'end'");
  return ok(lines.slice(start - 1, Math.min(end, lines.length)).join("\n"));
}

function grepLines(lines: string[], pattern?: string, unique?: boolean): CcrQueryResult {
  if (!pattern) return err("grep requires a 'pattern'");
  if (pattern.length > MAX_PATTERN_LEN) return err(`pattern exceeds ${MAX_PATTERN_LEN} chars`);
  if (!safeRegex(pattern)) return err("pattern rejected: potentially catastrophic backtracking");
  let re: RegExp;
  try {
    re = new RegExp(pattern);
  } catch {
    return err("invalid regex pattern");
  }
  const matched: string[] = [];
  let truncated = false;
  for (const line of lines) {
    if (re.test(line)) {
      matched.push(line);
      if (matched.length >= MAX_GREP_MATCHES) {
        truncated = true;
        break;
      }
    }
  }
  const out = unique ? [...new Set(matched)] : matched;
  const body = out.join("\n");
  return ok(truncated ? `${body}\n…[truncated at ${MAX_GREP_MATCHES} matches]` : body);
}

function blockStats(text: string, lines: string[]): CcrQueryResult {
  return ok(
    JSON.stringify({
      lines: lines.length,
      chars: text.length,
      bytes: Buffer.byteLength(text, "utf8"),
    })
  );
}

export function queryBlock(text: string, q: CcrQuery): CcrQueryResult {
  const mode = q.mode ?? "full";
  if (mode === "full") return ok(text);
  const lines = text.split("\n");
  switch (mode) {
    case "head":
      return sliceHead(lines, q.n);
    case "tail":
      return sliceTail(lines, q.n);
    case "lines":
      return sliceLines(lines, q.start, q.end);
    case "grep":
      return grepLines(lines, q.pattern, q.unique);
    case "stats":
      return blockStats(text, lines);
    default:
      return err(`unknown mode: ${String(mode)}`);
  }
}
