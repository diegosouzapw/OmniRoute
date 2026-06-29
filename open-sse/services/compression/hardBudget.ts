/**
 * Hard-budget post-pass (#17): compress to ≤ N cl100k tokens.
 *
 * Deterministic, independent of the relevance engine. Splits prose into
 * sentences/lines, ranks by average scoreToken ascending, drops the lowest-
 * saliency units until the body fits the target, then reconstructs original order.
 * Units containing FORCE_PRESERVE_RE anchors (errors, numbers, URLs, code) are
 * never dropped.
 */

import type { CompressionResult } from "./types.ts";
import { scoreToken } from "./ultraHeuristic.ts";
import { countTextTokens } from "../../../src/shared/utils/tiktokenCounter.ts";
import { createCompressionStats } from "./stats.ts";

interface HardBudgetOptions {
  targetTokens?: number;
  targetRatio?: number;
}

/**
 * Units containing these patterns must never be dropped.
 * Anchored to meaningful signals only — never matches a bare end-of-sentence
 * period (which would make every prose line "preserve" → permanent no-op):
 *   - `\d`                      digits (numbers, line refs, ports)
 *   - `https?:\/\/`             URLs
 *   - `(?:Error|…|Traceback):`  error/exception headers
 *   - "```"                    code fences
 *   - `^\s*at\s`                stack-trace frames (digit-less)
 *   - `\/[\w.-]+\/`             real multi-segment paths (but NOT "and/or")
 *   - `[A-Za-z_]\w*=\S`         key=value (credential/config lines, digit-less)
 */
const UNIT_PRESERVE_RE =
  /\d|https?:\/\/|(?:Error|Exception|TypeError|RangeError|SyntaxError|ReferenceError|Traceback):|```|^\s*at\s|\/[\w.-]+\/|[A-Za-z_]\w*=\S/i;

/** Average scoreToken for each word in the unit (sentence/line). */
function scoreUnit(unit: string): number {
  const words = unit.split(/\s+/).filter(Boolean);
  if (words.length === 0) return 0.5;
  const total = words.reduce((sum, w) => sum + scoreToken(w), 0);
  return total / words.length;
}

/** Returns true when the unit must never be dropped. */
function mustPreserve(unit: string): boolean {
  return UNIT_PRESERVE_RE.test(unit);
}

/**
 * Split text into droppable units (lines, optionally sentence-split for long prose lines).
 */
function splitUnits(text: string): string[] {
  return text.split(/\n/).flatMap((line) => {
    if (line.trim() === "") return [line];
    // Only sentence-split pure prose lines (no numbers, URLs, error patterns, code)
    if (!UNIT_PRESERVE_RE.test(line) && line.length > 60) {
      const sentences = line.split(/(?<=[.!?])\s+/);
      return sentences.length > 1 ? sentences : [line];
    }
    return [line];
  });
}

interface TaggedUnit {
  i: number;
  u: string;
  tokens: number;
  score: number;
  preserve: boolean;
}

function tagUnits(units: string[]): TaggedUnit[] {
  return units.map((u, i) => ({
    i,
    u,
    tokens: countTextTokens(u),
    score: scoreUnit(u),
    preserve: mustPreserve(u),
  }));
}

function dropToTarget(tagged: TaggedUnit[], targetTokens: number): Set<number> {
  const dropped = new Set<number>();
  let tokCount = tagged.reduce((s, x) => s + x.tokens, 0);

  // Sort droppable candidates by score ascending (lowest first = drop first)
  const candidates = tagged
    .filter((x) => !x.preserve)
    .sort((a, b) => a.score - b.score);

  for (const candidate of candidates) {
    if (tokCount <= targetTokens) break;
    dropped.add(candidate.i);
    tokCount -= candidate.tokens;
  }

  return dropped;
}

function rebuildText(tagged: TaggedUnit[], dropped: Set<number>): string {
  return tagged
    .filter((x) => !dropped.has(x.i))
    .map((x) => x.u)
    .join("\n");
}

function compressText(text: string, targetTokens: number): string {
  const currentTokens = countTextTokens(text);
  if (currentTokens <= targetTokens) return text;

  const units = splitUnits(text);
  if (units.length <= 1) return text;

  const tagged = tagUnits(units);
  const dropped = dropToTarget(tagged, targetTokens);
  if (dropped.size === 0) return text;

  return rebuildText(tagged, dropped);
}

function extractMessages(body: Record<string, unknown>): Array<{ role: string; content: unknown }> {
  const msgs = body.messages;
  if (!Array.isArray(msgs)) return [];
  return msgs as Array<{ role: string; content: unknown }>;
}

export function applyHardBudget(
  body: Record<string, unknown>,
  opts: HardBudgetOptions
): CompressionResult {
  const { targetTokens, targetRatio } = opts;

  if (targetTokens == null && targetRatio == null) {
    return { body, compressed: false, stats: null };
  }

  const messages = extractMessages(body);
  if (messages.length === 0) return { body, compressed: false, stats: null };

  // Measure total tokens across all messages
  const totalText = messages
    .map((m) => (typeof m.content === "string" ? m.content : JSON.stringify(m.content)))
    .join(" ");
  const totalTokens = countTextTokens(totalText);

  // targetTokens wins when both are set
  const effectiveTarget =
    targetTokens != null
      ? targetTokens
      : Math.floor(totalTokens * (targetRatio as number));

  if (totalTokens <= effectiveTarget) {
    return { body, compressed: false, stats: null };
  }

  // Apply compression to each string message content
  const newMessages = messages.map((m) => {
    if (typeof m.content !== "string") return m;
    const out = compressText(m.content, effectiveTarget);
    return out === m.content ? m : { ...m, content: out };
  });

  const changed = newMessages.some(
    (m, i) => JSON.stringify(m) !== JSON.stringify(messages[i])
  );
  if (!changed) return { body, compressed: false, stats: null };

  const newBody = { ...body, messages: newMessages };
  const stats = createCompressionStats(body, newBody, "stacked", ["hard-budget"]);

  return { body: newBody, compressed: true, stats };
}
