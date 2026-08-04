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
import {
  countTextTokens,
  tokenizerContextFromBody,
  type TokenizerContext,
} from "../../../src/shared/utils/tiktokenCounter.ts";
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

function tagUnits(units: string[], tokenizerContext: TokenizerContext): TaggedUnit[] {
  return units.map((u, i) => ({
    i,
    u,
    tokens: countTextTokens(u, tokenizerContext),
    score: scoreUnit(u),
    preserve: mustPreserve(u),
  }));
}

function dropToTarget(tagged: TaggedUnit[], targetTokens: number): Set<number> {
  const dropped = new Set<number>();
  let tokCount = tagged.reduce((s, x) => s + x.tokens, 0);

  // Sort droppable candidates by score ascending (lowest first = drop first)
  const candidates = tagged.filter((x) => !x.preserve).sort((a, b) => a.score - b.score);

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

function compressText(
  text: string,
  targetTokens: number,
  tokenizerContext: TokenizerContext
): string {
  const currentTokens = countTextTokens(text, tokenizerContext);
  if (currentTokens <= targetTokens) return text;

  const units = splitUnits(text);
  if (units.length <= 1) return text;

  const tagged = tagUnits(units, tokenizerContext);
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

  const tokenizerContext = tokenizerContextFromBody(body);

  // Measure total tokens across all messages
  const totalText = messages
    .map((m) => (typeof m.content === "string" ? m.content : JSON.stringify(m.content)))
    .join(" ");
  const totalTokens = countTextTokens(totalText, tokenizerContext);

  // targetTokens wins when both are set
  const effectiveTarget =
    targetTokens != null ? targetTokens : Math.floor(totalTokens * (targetRatio as number));

  if (totalTokens <= effectiveTarget) {
    return { body, compressed: false, stats: null };
  }

  // Distribute the aggregate budget proportionally per message so the SUM stays
  // ≤ target (passing the full target to each message would let an N-message body
  // come back N× over budget).
  const newMessages = messages.map((m) => {
    if (typeof m.content !== "string") return m;
    const msgTokens = countTextTokens(m.content, tokenizerContext);
    const perMsgTarget =
      totalTokens > 0 ? Math.floor(effectiveTarget * (msgTokens / totalTokens)) : effectiveTarget;
    const out = compressText(m.content, perMsgTarget, tokenizerContext);
    return out === m.content ? m : { ...m, content: out };
  });

  const changed = newMessages.some((m, i) => JSON.stringify(m) !== JSON.stringify(messages[i]));

  // Measure the result to detect when preserve-guarded content makes the target
  // unreachable, so callers are not silently left over budget.
  const usedMessages = changed ? newMessages : messages;
  const resultTokens = countTextTokens(
    usedMessages
      .map((m) => (typeof m.content === "string" ? m.content : JSON.stringify(m.content)))
      .join(" "),
    tokenizerContext
  );
  const overBudget = resultTokens > effectiveTarget;

  // Nothing changed and we are within budget → genuine no-op.
  if (!changed && !overBudget) {
    return { body, compressed: false, stats: null };
  }

  const newBody = changed ? { ...body, messages: newMessages } : body;
  const stats = createCompressionStats(body, newBody, "stacked", ["hard-budget"]);

  if (overBudget) {
    const warning = `hard-budget: could not reach target (${resultTokens} > ${effectiveTarget}; preserved content exceeds budget)`;
    stats.validationWarnings = [...(stats.validationWarnings ?? []), warning];
  }

  return { body: newBody, compressed: changed, stats };
}
