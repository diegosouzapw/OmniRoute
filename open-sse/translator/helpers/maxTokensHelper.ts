import { DEFAULT_MAX_TOKENS, DEFAULT_MIN_TOKENS } from "../../config/constants.ts";

/**
 * Adjust max_tokens based on request context
 * @param {object} body - Request body
 * @returns {number} Adjusted max_tokens
 */
export function adjustMaxTokens(body) {
  const requestedMaxTokens = body.max_tokens ?? body.max_completion_tokens;
  let maxTokens = requestedMaxTokens || DEFAULT_MAX_TOKENS;

  // Auto-increase for tool calling to prevent truncated arguments
  // Tool calls with large content (like writing files) need more tokens
  if (body.tools && Array.isArray(body.tools) && body.tools.length > 0) {
    if (maxTokens < DEFAULT_MIN_TOKENS) {
      maxTokens = DEFAULT_MIN_TOKENS;
    }
  }

  return Math.max(1, maxTokens);
}
