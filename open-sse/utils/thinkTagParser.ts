/**
 * Think Tag Parser
 *
 * Parses <think>...</think> tags from LLM output and converts them
 * to a structured `reasoning_content` field.
 *
 * Used by providers like DeepSeek, Qwen, and iFlow that embed
 * chain-of-thought reasoning inside <think> tags.
 *
 * Usage:
 *   import { extractThinkTags, hasThinkTags } from "./thinkTagParser.ts";
 *
 *   const { reasoning, content } = extractThinkTags(rawOutput);
 *   // reasoning = "step-by-step thinking..."
 *   // content = "final answer..."
 */

const THINK_OPEN = "<think>";
const THINK_CLOSE = "</think>";

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
