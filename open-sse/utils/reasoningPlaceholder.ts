/**
 * #8081 — Internal reasoning replay placeholder must never leak into
 * user-visible assistant content. Models can echo the sentinel text that
 * OmniRoute injects into request-side reasoning fields.
 *
 * This module provides helpers to strip the placeholder from response content
 * across all output paths (streaming deltas, non-streaming messages, tool-call
 * preambles, Claude text blocks, Responses API output).
 */

import { NON_ANTHROPIC_THINKING_PLACEHOLDER } from "../translator/helpers/claudeHelper.ts";

/**
 * Returns true if the string contains the placeholder sentinel.
 * Substring match — catches model-added prefixes/wrappers.
 */
export function containsReasoningPlaceholder(text: string | undefined | null): boolean {
  if (!text) return false;
  return text.includes(NON_ANTHROPIC_THINKING_PLACEHOLDER);
}

/**
 * Remove the placeholder text from a content string.
 * Strips the exact sentinel and any resulting leading/trailing whitespace.
 * If the string was ONLY the placeholder (possibly with surrounding whitespace),
 * returns empty string rather than removing legitimate surrounding text.
 */
export function stripPlaceholderFromContent(text: string | undefined | null): string {
  if (!text) return "";
  if (!containsReasoningPlaceholder(text)) return text;
  return text.split(NON_ANTHROPIC_THINKING_PLACEHOLDER)
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .join(" ");
}
