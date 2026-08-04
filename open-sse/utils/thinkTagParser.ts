/**
 * Think Tag Parser
 *
 * Parses <think>...</think> tags from LLM output and converts them
 * to a structured `reasoning_content` field.
 *
 * Used by providers like DeepSeek, Qwen, and Qoder that embed
 * chain-of-thought reasoning inside <think> tags.
 *
 * Usage:
 *   import { extractThinkTags, hasThinkTags } from "./thinkTagParser.ts";
 *
 *   const { reasoning, content } = extractThinkTags(rawOutput);
 *   // reasoning = "step-by-step thinking..."
 *   // content = "final answer..."
 */

import { shouldParseTextualReasoningTags } from "../handlers/responseSanitizer/reasoning.ts";
import { appendBoundedText, buildSyntheticChatChunk } from "./streamHelpers.ts";

const THINK_OPEN = "<think>";
const THINK_CLOSE = "</think>";

/**
 * Create the mutable streaming-parse context for one SSE stream.
 * `enabled` decides whether the caller should attempt think-tag parsing at
 * all for this stream (passthrough mode + a provider/model that is known to
 * emit textual `<think>` tags); `active`/`insideThink`/`buffer` track parse
 * progress once a tag has been seen. `model` is stashed for `flushThink`'s
 * synthetic chunk so callers don't need to pass it again at flush time.
 *
 * @param {boolean} isPassthroughMode
 * @param {unknown} provider
 * @param {string} [model]
 */
export function initThinkState(isPassthroughMode: boolean, provider?: unknown, model?: string) {
  return {
    enabled: isPassthroughMode && shouldParseTextualReasoningTags(provider, model),
    insideThink: false,
    buffer: "",
    active: false,
    model,
  };
}

/**
 * Check whether a streaming text chunk contains a full `<think>` open tag,
 * or ends with a prefix of one (so the caller knows to keep buffering
 * instead of treating the tag as ordinary content split across chunks).
 *
 * @param {string} value - Streaming text chunk
 * @returns {boolean}
 */
export function containsOrMayEndWithThinkOpenTag(value: string): boolean {
  return (
    value.includes(THINK_OPEN) ||
    ["<", "<t", "<th", "<thi", "<thin"].some((suffix) => value.endsWith(suffix))
  );
}

/**
 * Check if text contains think tags
 * @param {string} text - Raw output text
 * @returns {boolean}
 */
export function hasThinkTags(text) {
  if (!text) return false;
  return text.includes(THINK_OPEN);
}

/**
 * Extract think tags from text
 * Returns the reasoning content (inside <think>) and the cleaned final content
 *
 * @param {string} text - Raw output text
 * @returns {{ reasoning: string|null, content: string }}
 */
export function extractThinkTags(text) {
  if (!text || !text.includes(THINK_OPEN)) {
    return { reasoning: null, content: text || "" };
  }

  let reasoning = "";
  let content = text;
  let iterations = 0;
  const maxIterations = 10; // safety limit

  while (content.includes(THINK_OPEN) && iterations < maxIterations) {
    const openIdx = content.indexOf(THINK_OPEN);
    const closeIdx = content.indexOf(THINK_CLOSE, openIdx);

    if (closeIdx === -1) {
      // Unclosed think tag — treat everything after <think> as reasoning
      reasoning += content.slice(openIdx + THINK_OPEN.length);
      content = content.slice(0, openIdx);
      break;
    }

    // Extract the think content
    const thinkContent = content.slice(openIdx + THINK_OPEN.length, closeIdx);
    reasoning += (reasoning ? "\n" : "") + thinkContent;

    // Remove the think block from content
    content = content.slice(0, openIdx) + content.slice(closeIdx + THINK_CLOSE.length);
    iterations++;
  }

  return {
    reasoning: reasoning.trim() || null,
    content: content.trim(),
  };
}

/**
 * Process a streaming delta chunk and extract think content.
 * Maintains state across chunks using a context object.
 *
 * @param {string} delta - New text chunk
 * @param {object} ctx - Mutable context object { insideThink, buffer }
 * @returns {{ reasoningDelta: string|null, contentDelta: string|null }}
 */
export function processStreamingThinkDelta(delta, ctx) {
  if (!ctx.buffer) ctx.buffer = "";

  ctx.buffer += delta;
  let reasoningDelta = "";
  let contentDelta = "";

  while (ctx.buffer.length > 0) {
    if (ctx.insideThink) {
      // Looking for closing tag
      const closeIdx = ctx.buffer.indexOf(THINK_CLOSE);
      if (closeIdx === -1) {
        // Might be a partial tag at the end — keep last few chars
        if (ctx.buffer.length > THINK_CLOSE.length) {
          const safe = ctx.buffer.slice(0, -(THINK_CLOSE.length - 1));
          reasoningDelta += safe;
          ctx.buffer = ctx.buffer.slice(-(THINK_CLOSE.length - 1));
        }
        break;
      }
      reasoningDelta += ctx.buffer.slice(0, closeIdx);
      ctx.buffer = ctx.buffer.slice(closeIdx + THINK_CLOSE.length);
      ctx.insideThink = false;
    } else {
      // Looking for opening tag
      const openIdx = ctx.buffer.indexOf(THINK_OPEN);
      if (openIdx === -1) {
        // Might be a partial tag at the end
        if (ctx.buffer.length > THINK_OPEN.length) {
          const safe = ctx.buffer.slice(0, -(THINK_OPEN.length - 1));
          contentDelta += safe;
          ctx.buffer = ctx.buffer.slice(-(THINK_OPEN.length - 1));
        }
        break;
      }
      contentDelta += ctx.buffer.slice(0, openIdx);
      ctx.buffer = ctx.buffer.slice(openIdx + THINK_OPEN.length);
      ctx.insideThink = true;
    }
  }

  return {
    reasoningDelta: reasoningDelta || null,
    contentDelta: contentDelta || null,
  };
}

/**
 * Parse a streaming SSE delta's `content` field for `<think>` tags in place,
 * when applicable. No-ops (returns false, delta untouched) unless parsing is
 * `ctx.enabled` for this stream AND either a tag is already open or this
 * chunk contains/may end with a `<think>` open tag.
 *
 * Mutates `delta.content` (stripped of think markup) and sets
 * `delta.reasoning_content` when reasoning text was extracted.
 *
 * @param {object} ctx - Mutable context object from `initThinkState`
 * @param {{ content: unknown, reasoning_content?: string }} delta
 * @returns {boolean} true if the delta was parsed for think tags
 */
export function applyThinkTag(
  ctx,
  delta: { content: unknown; reasoning_content?: string }
): boolean {
  if (!ctx.enabled || typeof delta?.content !== "string") return false;
  if (!ctx.active && !containsOrMayEndWithThinkOpenTag(delta.content)) return false;

  ctx.active = true;
  const { reasoningDelta, contentDelta } = processStreamingThinkDelta(delta.content, ctx);
  delta.content = contentDelta || "";
  if (reasoningDelta) delta.reasoning_content = reasoningDelta;
  return true;
}

/**
 * Flush remaining buffer content from streaming context.
 * Call this when the stream ends.
 *
 * @param {object} ctx - Mutable context object { insideThink, buffer }
 * @returns {{ reasoningDelta: string|null, contentDelta: string|null }}
 */
export function flushThinkBuffer(ctx) {
  if (!ctx.buffer) return { reasoningDelta: null, contentDelta: null };

  const remaining = ctx.buffer;
  ctx.buffer = "";

  if (ctx.insideThink) {
    return { reasoningDelta: remaining || null, contentDelta: null };
  }
  return { reasoningDelta: null, contentDelta: remaining || null };
}

/**
 * Flush remaining buffer content from a streaming context at end-of-stream
 * and assemble a synthetic OpenAI-shaped chat completion chunk, plus the
 * accumulator updates for it, ready for the caller to enqueue as SSE output.
 *
 * Returns `null` when parsing was never `ctx.enabled`/`ctx.active` for this
 * stream, or when there is nothing left to flush — callers can skip
 * emitting an empty synthetic chunk and leave their accumulators untouched.
 *
 * @param {object} ctx - Mutable context object from `initThinkState`
 *   (its `model` is reused for the synthetic chunk)
 * @param {string} [responsesId] - Response id to reuse, falls back to a
 *   generated `chatcmpl-<timestamp>` id
 * @param {string} accReasoning - Caller's running reasoning accumulator
 * @param {string} accContent - Caller's running content accumulator
 * @returns {{
 *   syntheticChunk: Record<string, unknown>,
 *   flushOutput: string,
 *   reasoning: string,
 *   content: string,
 *   addedLength: number
 * }|null}
 */
export function flushThink(
  ctx,
  responsesId: string | undefined,
  accReasoning: string,
  accContent: string
): {
  syntheticChunk: Record<string, unknown>;
  flushOutput: string;
  reasoning: string;
  content: string;
  addedLength: number;
} | null {
  if (!ctx.enabled || !ctx.active) return null;

  const { reasoningDelta, contentDelta } = flushThinkBuffer(ctx);
  if (!reasoningDelta && !contentDelta) return null;

  const delta: Record<string, string> = {};
  if (reasoningDelta) delta.reasoning_content = reasoningDelta;
  if (contentDelta) delta.content = contentDelta;

  const syntheticChunk = buildSyntheticChatChunk(responsesId, ctx.model, delta);

  return {
    syntheticChunk,
    flushOutput: `data: ${JSON.stringify(syntheticChunk)}\n\n`,
    reasoning: appendBoundedText(accReasoning, reasoningDelta || ""),
    content: appendBoundedText(accContent, contentDelta || ""),
    addedLength: (reasoningDelta?.length || 0) + (contentDelta?.length || 0),
  };
}
