/**
 * Extract usage from non-streaming response body
 * Handles different provider response formats
 */
export function extractUsageFromResponse(responseBody, provider) {
  if (!responseBody || typeof responseBody !== "object") return null;
  const providerId = typeof provider === "string" ? provider.toLowerCase() : "";
  const isClaudeProvider =
    providerId === "claude" ||
    providerId === "anthropic" ||
    providerId.startsWith("anthropic-compatible");

  // OpenAI format (has prompt_tokens / completion_tokens)
  if (
    responseBody.usage &&
    typeof responseBody.usage === "object" &&
    responseBody.usage.prompt_tokens !== undefined
  ) {
    return {
      prompt_tokens: responseBody.usage.prompt_tokens || 0,
      completion_tokens: responseBody.usage.completion_tokens || 0,
      // DeepSeek native API uses flat prompt_cache_hit_tokens (NOT
      // prompt_tokens_details.cached_tokens). Fall back to it so V4 cache
      // gets surfaced into kanban call_logs alongside the OpenAI/Claude paths.
      cached_tokens:
        responseBody.usage.prompt_tokens_details?.cached_tokens ??
        responseBody.usage.input_tokens_details?.cached_tokens ??
        responseBody.usage.prompt_cache_hit_tokens,
      reasoning_tokens:
        responseBody.usage.completion_tokens_details?.reasoning_tokens ??
        responseBody.usage.output_tokens_details?.reasoning_tokens,
    };
  }

  // Claude format
  if (
    isClaudeProvider &&
    responseBody.usage &&
    typeof responseBody.usage === "object" &&
    (responseBody.usage.input_tokens !== undefined ||
      responseBody.usage.output_tokens !== undefined)
  ) {
    const inputTokens = responseBody.usage.input_tokens || 0;
    const cacheRead = responseBody.usage.cache_read_input_tokens || 0;
    const cacheCreation = responseBody.usage.cache_creation_input_tokens || 0;

    // Total prompt tokens = input + cache_read + cache_creation (per Claude API docs)
    const promptTokens = inputTokens + cacheRead + cacheCreation;

    return {
      prompt_tokens: promptTokens,
      completion_tokens: responseBody.usage.output_tokens || 0,
      cache_read_input_tokens: cacheRead,
      cache_creation_input_tokens: cacheCreation,
    };
  }

  // OpenAI Responses API format (input_tokens / output_tokens)
  const responsesUsage = responseBody.response?.usage || responseBody.usage;
  if (
    responsesUsage &&
    typeof responsesUsage === "object" &&
    (responsesUsage.input_tokens !== undefined || responsesUsage.output_tokens !== undefined)
  ) {
    return {
      prompt_tokens: responsesUsage.input_tokens || 0,
      completion_tokens: responsesUsage.output_tokens || 0,
      cache_read_input_tokens: responsesUsage.cache_read_input_tokens,
      cached_tokens:
        responsesUsage.input_tokens_details?.cached_tokens ??
        responsesUsage.prompt_tokens_details?.cached_tokens ??
        responsesUsage.cache_read_input_tokens,
      cache_creation_input_tokens: responsesUsage.cache_creation_input_tokens,
      reasoning_tokens:
        responsesUsage.output_tokens_details?.reasoning_tokens ??
        responsesUsage.completion_tokens_details?.reasoning_tokens ??
        responsesUsage.reasoning_tokens,
    };
  }

  // Gemini format
  if (responseBody.usageMetadata && typeof responseBody.usageMetadata === "object") {
    return {
      prompt_tokens: responseBody.usageMetadata.promptTokenCount || 0,
      completion_tokens: responseBody.usageMetadata.candidatesTokenCount || 0,
      reasoning_tokens: responseBody.usageMetadata.thoughtsTokenCount,
    };
  }

  return null;
}
