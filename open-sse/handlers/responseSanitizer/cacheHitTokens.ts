/**
 * Cache-hit token normalization — shared by chat-completions and Responses API
 * usage sanitizers.
 *
 * Several providers report a prompt-cache-hit count using a flat, non-standard
 * field instead of the OpenAI-style nested `*_tokens_details.cached_tokens`
 * shape. Without this mapping, clients (Cline / Cursor / Claude Code / any
 * OpenAI-SDK consumer) never see the real cache-hit count (#8171).
 *
 * - DeepSeek native API: flat `prompt_cache_hit_tokens`.
 * - MiniMax / Bedrock etc.: flat `cache_read_input_tokens`.
 */

type JsonRecord = Record<string, unknown>;

/**
 * Chat Completions shape: writes into `sanitized.prompt_tokens_details.cached_tokens`.
 * `usageRecord` is the raw (pre-whitelist) usage object; `sanitized` is the
 * whitelisted usage object being built.
 */
export function applyCacheHitTokensToUsage(usageRecord: JsonRecord, sanitized: JsonRecord): void {
  if (
    usageRecord.prompt_cache_hit_tokens !== undefined &&
    (!sanitized.prompt_tokens_details ||
      !(sanitized.prompt_tokens_details as JsonRecord).cached_tokens)
  ) {
    const details = (sanitized.prompt_tokens_details as JsonRecord) ?? {};
    details.cached_tokens = usageRecord.prompt_cache_hit_tokens;
    sanitized.prompt_tokens_details = details;
  }

  if (
    sanitized.cache_read_input_tokens !== undefined &&
    sanitized.cache_read_input_tokens !== 0 &&
    (!sanitized.prompt_tokens_details ||
      !(sanitized.prompt_tokens_details as JsonRecord).cached_tokens)
  ) {
    const details = (sanitized.prompt_tokens_details as JsonRecord) ?? {};
    details.cached_tokens = sanitized.cache_read_input_tokens;
    sanitized.prompt_tokens_details = details;
  }
}

/**
 * Responses API shape: writes into `normalized.input_tokens_details.cached_tokens`.
 * `toRecordFn` is injected to reuse the caller's `toRecord()` helper.
 */
export function applyCacheHitTokensToResponsesUsage(
  normalized: JsonRecord,
  toRecordFn: (value: unknown) => JsonRecord | null
): void {
  if (
    normalized.prompt_cache_hit_tokens !== undefined &&
    !toRecordFn(normalized.input_tokens_details)?.cached_tokens
  ) {
    normalized.input_tokens_details = {
      ...(toRecordFn(normalized.input_tokens_details) || {}),
      cached_tokens: normalized.prompt_cache_hit_tokens,
    };
  }

  if (
    normalized.cache_read_input_tokens !== undefined &&
    normalized.cache_read_input_tokens !== 0 &&
    !toRecordFn(normalized.input_tokens_details)?.cached_tokens
  ) {
    normalized.input_tokens_details = {
      ...(toRecordFn(normalized.input_tokens_details) || {}),
      cached_tokens: normalized.cache_read_input_tokens,
    };
  }
}
