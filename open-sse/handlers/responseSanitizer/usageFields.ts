/**
 * Usage fields kept by the response sanitizer. Anything else in a provider's
 * `usage` object is stripped before it reaches the client and the billing path.
 */

/** Chat Completions `usage` fields. */
export const ALLOWED_USAGE_FIELDS = new Set([
  // Credit metering and the exact cost derived from it (credit-metered providers
  // such as Kiro, xAI's exact cost); billing reads them after sanitization.
  "provider_credits",
  "cost_in_usd_ticks",
  "prompt_tokens",
  "completion_tokens",
  "total_tokens",
  "cached_tokens",
  "prompt_tokens_details",
  "completion_tokens_details",
  "cache_read_input_tokens",
  "cache_creation_input_tokens",
  // Keep through sanitize → applyClientUsageBuffer so heuristic web usage is
  // not inflated by the default USAGE_TOKEN_BUFFER (2000).
  "estimated",
]);

/** Responses API `usage` fields. */
export const ALLOWED_RESPONSES_USAGE_FIELDS = new Set([
  "input_tokens",
  "output_tokens",
  "total_tokens",
  "input_tokens_details",
  "output_tokens_details",
  "estimated",
  "provider_credits",
  "cost_in_usd_ticks",
  "server_side_tool_usage_details",
  "server_side_tool_usage",
]);
