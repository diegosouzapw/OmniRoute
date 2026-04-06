type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function toFiniteNumber(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

function getPromptTokenDetails(tokens: unknown): JsonRecord {
  const tokenRecord = asRecord(tokens);
  const promptDetails = asRecord(tokenRecord.prompt_tokens_details);
  if (Object.keys(promptDetails).length > 0) return promptDetails;
  return asRecord(tokenRecord.input_tokens_details);
}

export function getPromptCacheReadTokens(tokens: unknown): number {
  const tokenRecord = asRecord(tokens);
  const promptDetails = getPromptTokenDetails(tokenRecord);
  return toFiniteNumber(
    tokenRecord.cacheRead ??
      tokenRecord.cache_read_input_tokens ??
      tokenRecord.cached_tokens ??
      promptDetails.cached_tokens
  );
}

export function getPromptCacheCreationTokens(tokens: unknown): number {
  const tokenRecord = asRecord(tokens);
  const promptDetails = getPromptTokenDetails(tokenRecord);
  return toFiniteNumber(
    tokenRecord.cacheCreation ??
      tokenRecord.cache_creation_input_tokens ??
      promptDetails.cache_creation_tokens
  );
}

export function getLoggedInputTokens(tokens: unknown): number {
  const tokenRecord = asRecord(tokens);

  if (tokenRecord.input !== undefined && tokenRecord.input !== null) {
    return toFiniteNumber(tokenRecord.input);
  }

  if (tokenRecord.input_tokens !== undefined && tokenRecord.input_tokens !== null) {
    // Anthropic / anthropic-compatible-cc streaming: input_tokens is only the
    // non-cached portion.  The cache counters sit as separate top-level fields
    // (cache_read_input_tokens, cache_creation_input_tokens).  We need to add
    // them to get the true total input.
    return (
      toFiniteNumber(tokenRecord.input_tokens) +
      toFiniteNumber(tokenRecord.cache_read_input_tokens) +
      toFiniteNumber(tokenRecord.cache_creation_input_tokens)
    );
  }

  // prompt_tokens from translator/extractor already includes cache tokens:
  //   - OpenAI format: prompt_tokens inherently includes cached
  //   - Claude non-streaming: extractUsageFromResponse sums input + cache_read + cache_creation
  //   - Claude streaming: extractUsage (after fix) sums input + cache_read + cache_creation
  // Do NOT add cache fields here — would double-count.
  const promptTokens = toFiniteNumber(tokenRecord.prompt_tokens);
  return promptTokens;
}

export function getLoggedOutputTokens(tokens: unknown): number {
  const tokenRecord = asRecord(tokens);
  if (tokenRecord.output !== undefined && tokenRecord.output !== null) {
    return toFiniteNumber(tokenRecord.output);
  }
  return toFiniteNumber(tokenRecord.completion_tokens ?? tokenRecord.output_tokens);
}

/**
 * Return the reasoning/thinking output token count.
 * Checks multiple field locations used by different providers:
 *   - completion_tokens_details.reasoning_tokens (OpenAI, OpenRouter)
 *   - reasoning_tokens (GitHub — top-level)
 *   - reasoning (usage_history DB format)
 */
export function getReasoningTokens(tokens: unknown): number {
  const tokenRecord = asRecord(tokens);
  const completionDetails = asRecord(tokenRecord.completion_tokens_details);
  return toFiniteNumber(
    tokenRecord.reasoning ?? tokenRecord.reasoning_tokens ?? completionDetails.reasoning_tokens
  );
}

// ─── Nullable variants ──────────────────────────────────────────────────
// Return `null` when the provider simply doesn't report the field,
// vs `0` when the provider explicitly reported zero.

function hasAnyKey(record: JsonRecord, keys: string[]): boolean {
  return keys.some((k) => record[k] !== undefined && record[k] !== null);
}

/**
 * Return prompt cache-read tokens, or `null` if the provider didn't
 * report any cache-read field at all.
 */
export function getPromptCacheReadTokensOrNull(tokens: unknown): number | null {
  const tokenRecord = asRecord(tokens);
  const promptDetails = getPromptTokenDetails(tokenRecord);
  if (
    hasAnyKey(tokenRecord, ["cacheRead", "cache_read_input_tokens", "cached_tokens"]) ||
    hasAnyKey(promptDetails, ["cached_tokens"])
  ) {
    return getPromptCacheReadTokens(tokens);
  }
  return null;
}

/**
 * Return prompt cache-creation (write) tokens, or `null` if the
 * provider didn't report any cache-creation field at all.
 */
export function getPromptCacheCreationTokensOrNull(tokens: unknown): number | null {
  const tokenRecord = asRecord(tokens);
  const promptDetails = getPromptTokenDetails(tokenRecord);
  if (
    hasAnyKey(tokenRecord, ["cacheCreation", "cache_creation_input_tokens"]) ||
    hasAnyKey(promptDetails, ["cache_creation_tokens"])
  ) {
    return getPromptCacheCreationTokens(tokens);
  }
  return null;
}

/**
 * Return reasoning tokens, or `null` if the provider didn't report
 * any reasoning field at all.
 */
export function getReasoningTokensOrNull(tokens: unknown): number | null {
  const tokenRecord = asRecord(tokens);
  const completionDetails = asRecord(tokenRecord.completion_tokens_details);
  if (
    hasAnyKey(tokenRecord, ["reasoning", "reasoning_tokens"]) ||
    hasAnyKey(completionDetails, ["reasoning_tokens"])
  ) {
    return getReasoningTokens(tokens);
  }
  return null;
}

export function formatUsageLog(tokens: unknown): string {
  const input = getLoggedInputTokens(tokens);
  const output = getLoggedOutputTokens(tokens);
  const cacheRead = getPromptCacheReadTokens(tokens);
  const cacheWrite = getPromptCacheCreationTokens(tokens);
  const reasoning = getReasoningTokens(tokens);

  let msg = `in=${input} | out=${output}`;
  if (cacheRead > 0) {
    msg += ` | CR=${cacheRead}`;
  }
  if (cacheWrite > 0) {
    msg += ` | CW=${cacheWrite}`;
  }
  if (reasoning > 0) {
    msg += ` | R=${reasoning}`;
  }
  return msg;
}
