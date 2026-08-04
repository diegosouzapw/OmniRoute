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

  // Prefer prompt_tokens when present: translators normalize provider-specific
  // usage into OpenAI shape there, and may keep input_tokens for compatibility.
  // Treating that input_tokens as raw Claude usage would add cache tokens again.
  if (tokenRecord.prompt_tokens !== undefined && tokenRecord.prompt_tokens !== null) {
    return toFiniteNumber(tokenRecord.prompt_tokens);
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

  return 0;
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

// Non-greedy, single-capture, no nested variable-length quantifiers → ReDoS-safe.
const THINK_BLOCK_RE = /<think>([\s\S]*?)<\/think>/gi;

/**
 * Inspect an assistant message for reasoning/thinking content that the usage
 * object may not have metered (#6187 — e.g. stepfun step-3.7-flash emits
 * `reasoning_content` but reports `reasoning_tokens=0`).
 *
 * Returns the reasoning SOURCE and the raw CHARACTER count of the observed
 * reasoning text.
 *
 * IMPORTANT: `chars` is a CHARACTER count, NOT a token count. It must NEVER be
 * fed into cost math (`costCalculator` prices `tokens.reasoning`). It exists
 * only so call logs can distinguish "reasoned but metered 0" from
 * "did not reason at all" without corrupting billing.
 */
export function getObservedReasoning(message: unknown): {
  source: "content" | "think" | null;
  chars: number;
} {
  const record = asRecord(message);

  // Explicit reasoning field: `reasoning_content` is the raw provider field;
  // `reasoning` is what sseTextTransform maps it to.
  const explicit = record.reasoning_content ?? record.reasoning;
  if (typeof explicit === "string" && explicit.trim().length > 0) {
    return { source: "content", chars: explicit.length };
  }

  // Inline <think>...</think> blocks embedded in message content.
  const content = record.content;
  if (typeof content === "string" && content.length > 0) {
    let chars = 0;
    for (const match of content.matchAll(THINK_BLOCK_RE)) {
      chars += (match[1] ?? "").length;
    }
    if (chars > 0) return { source: "think", chars };
  }

  return { source: null, chars: 0 };
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
