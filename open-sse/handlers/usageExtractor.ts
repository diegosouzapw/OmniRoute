/**
 * Extract usage from non-streaming response body
 * Handles different provider response formats
 */
import { carryEstimatedUsageMarker } from "../utils/usageTracking.ts";

/**
 * True for an Anthropic Messages response body (`type: "message"`), whatever provider
 * id served it: kimi-coding, deepseek, xiaomi-mimo and every other Claude-format or
 * Anthropic-endpoint provider return this shape. Its `usage.input_tokens` EXCLUDES
 * prompt-cache reads and writes, unlike the Responses API, whose `input_tokens`
 * already includes the cache (`input_tokens_details.cached_tokens`). A usage object
 * carrying those cached-token details is therefore never re-totalled.
 */
function isAnthropicMessageUsage(
  responseBody: Record<string, unknown>,
  usage: Record<string, unknown>
): boolean {
  return (
    responseBody.type === "message" &&
    usage.input_tokens_details === undefined &&
    usage.prompt_tokens_details === undefined
  );
}

export function extractUsageFromResponse(responseBody, provider) {
  if (!responseBody || typeof responseBody !== "object") return null;
  const providerId = typeof provider === "string" ? provider.toLowerCase() : "";
  const isClaudeProvider =
    providerId === "claude" ||
    providerId === "anthropic" ||
    providerId === "vertex" ||
    providerId === "vertex-partner" ||
    providerId.startsWith("anthropic-compatible");

  // OpenAI format (has prompt_tokens / completion_tokens)
  if (
    responseBody.usage &&
    typeof responseBody.usage === "object" &&
    responseBody.usage.prompt_tokens !== undefined
  ) {
    const cacheCreationTokens =
      responseBody.usage.cache_creation_input_tokens ??
      responseBody.usage.prompt_tokens_details?.cache_creation_tokens ??
      responseBody.usage.input_tokens_details?.cache_creation_tokens ??
      responseBody.usage.prompt_tokens_details?.cache_write_tokens ??
      responseBody.usage.input_tokens_details?.cache_write_tokens ??
      responseBody.usage.cache_write_tokens;
    const openAiUsage = {
      prompt_tokens: responseBody.usage.prompt_tokens || 0,
      completion_tokens: responseBody.usage.completion_tokens || 0,
      // DeepSeek native API uses flat prompt_cache_hit_tokens (NOT
      // prompt_tokens_details.cached_tokens). Fall back to it so V4 cache
      // gets surfaced into kanban call_logs alongside the OpenAI/Claude paths.
      cached_tokens:
        responseBody.usage.prompt_tokens_details?.cached_tokens ??
        responseBody.usage.input_tokens_details?.cached_tokens ??
        responseBody.usage.prompt_cache_hit_tokens ??
        responseBody.usage.cached_tokens ??
        responseBody.usage.cache_read_input_tokens,
      // Cache WRITE tokens. Anthropic models reached through an OpenAI-compatible
      // endpoint carry the count nested in prompt/input token details (see
      // translator/response/claude-to-openai.ts, #2215) or under the
      // `cache_write_tokens` alias used by OpenRouter/Devin/codex-chatgpt-web.
      // Reading only the flat Anthropic key made the dashboard show "Cache Write:
      // N/A" for the very same model that reports a real count natively.
      // Only emit the key when a provider actually reported one, so a provider
      // with no cache-write concept (plain gpt/codex) stays N/A instead of 0.
      ...(cacheCreationTokens !== undefined
        ? { cache_creation_input_tokens: cacheCreationTokens }
        : {}),
      reasoning_tokens:
        responseBody.usage.completion_tokens_details?.reasoning_tokens ??
        responseBody.usage.output_tokens_details?.reasoning_tokens ??
        responseBody.usage.reasoning_tokens,
      // xAI's exact provider-reported cost (port of decolua/9router#2453, capability A —
      // @ryanngit). Only set the key when present so non-xAI OpenAI-shaped usage
      // (Codex, DeepSeek, etc.) is unaffected. Ticks → USD conversion happens in
      // costCalculator.ts, not here.
      ...(typeof responseBody.usage.cost_in_usd_ticks === "number" &&
      Number.isFinite(responseBody.usage.cost_in_usd_ticks) &&
      responseBody.usage.cost_in_usd_ticks >= 0
        ? { cost_in_usd_ticks: responseBody.usage.cost_in_usd_ticks }
        : {}),
    };
    return carryEstimatedUsageMarker(responseBody.usage, openAiUsage);
  }

  // Claude format: known Anthropic provider ids, or any Anthropic Messages body.
  if (
    responseBody.usage &&
    typeof responseBody.usage === "object" &&
    (responseBody.usage.input_tokens !== undefined ||
      responseBody.usage.output_tokens !== undefined) &&
    (isClaudeProvider || isAnthropicMessageUsage(responseBody, responseBody.usage))
  ) {
    const inputTokens = responseBody.usage.input_tokens || 0;
    const cacheRead = responseBody.usage.cache_read_input_tokens || 0;
    const cacheCreation = responseBody.usage.cache_creation_input_tokens || 0;

    // Total prompt tokens = input + cache_read + cache_creation (per Claude API docs)
    const promptTokens = inputTokens + cacheRead + cacheCreation;
    // Anthropic reports thinking under output_tokens_details.thinking_tokens; some
    // Claude-format providers use the OpenAI-style reasoning_tokens names instead.
    const reasoningTokens =
      responseBody.usage.output_tokens_details?.thinking_tokens ??
      responseBody.usage.output_tokens_details?.reasoning_tokens ??
      responseBody.usage.reasoning_tokens;
    // Native Claude ids always carry both cache counters. Other Claude-format
    // providers may have no prompt cache at all (devin-cli-agentic reports only
    // input/output), so emit a counter only when it was reported: the dashboard then
    // shows N/A instead of 0, as the OpenAI branch above does for cache writes.
    const reportedCache = (value: unknown) =>
      isClaudeProvider || (value !== undefined && value !== null);

    return {
      prompt_tokens: promptTokens,
      completion_tokens: responseBody.usage.output_tokens || 0,
      ...(reportedCache(responseBody.usage.cache_read_input_tokens)
        ? { cache_read_input_tokens: cacheRead }
        : {}),
      ...(reportedCache(responseBody.usage.cache_creation_input_tokens)
        ? { cache_creation_input_tokens: cacheCreation }
        : {}),
      ...(typeof reasoningTokens === "number" ? { reasoning_tokens: reasoningTokens } : {}),
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

  // Gemini format. Antigravity / gemini-cli wrap the payload in
  // { response: { ... } } — read the envelope so non-streaming requests do
  // not silently log zero usage (port of decolua/9router#59d858b).
  const usageMetadata = responseBody.usageMetadata || responseBody.response?.usageMetadata;
  if (usageMetadata && typeof usageMetadata === "object") {
    // Gemini reports thoughts outside candidates. Fold them into completion so
    // every provider keeps reasoning as a subset of completion tokens.
    const thoughts = usageMetadata.thoughtsTokenCount || 0;
    return {
      prompt_tokens: usageMetadata.promptTokenCount || 0,
      completion_tokens: (usageMetadata.candidatesTokenCount || 0) + thoughts,
      cached_tokens: usageMetadata.cachedContentTokenCount || 0,
      reasoning_tokens: thoughts,
    };
  }

  return null;
}
