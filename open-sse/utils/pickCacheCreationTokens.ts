type CacheWriteDetails = {
  cache_creation_tokens?: number;
  cache_write_tokens?: number;
  cache_creation_in_prompt?: boolean;
};

type CacheWriteUsageSource = {
  cache_creation_input_tokens?: number;
  cache_write_tokens?: number;
  prompt_tokens_details?: CacheWriteDetails;
  input_tokens_details?: CacheWriteDetails;
};

/**
 * Resolve prompt cache-CREATION (write) tokens from any container shape.
 *
 * Anthropic reports a flat `cache_creation_input_tokens`, but the same count
 * arrives nested under prompt/input token details once usage has been translated
 * into OpenAI shape (translator/response/claude-to-openai.ts, #2215), and several
 * gateways (OpenRouter, Devin Desktop, the codex-chatgpt-web bridge) spell it
 * `cache_write_tokens`. Reading only the flat Anthropic key made every
 * OpenAI-shaped path drop the value, so the dashboard showed "Cache Write: N/A"
 * for a model that reports a real count natively.
 *
 * Mirrors the key precedence of getPromptCacheCreationTokens() in
 * src/lib/usage/tokenAccounting.ts, but returns `undefined` (not 0) when no
 * provider reported anything, so normalizeUsage() keeps omitting the key and the
 * dashboard can still tell "not reported" (N/A) from "reported as zero".
 */
export function pickCacheCreationTokens(usage: CacheWriteUsageSource | null | undefined) {
  if (!usage || typeof usage !== "object") return undefined;
  const promptDetails = usage.prompt_tokens_details;
  const inputDetails = usage.input_tokens_details;
  return (
    usage.cache_creation_input_tokens ??
    promptDetails?.cache_creation_tokens ??
    inputDetails?.cache_creation_tokens ??
    promptDetails?.cache_write_tokens ??
    inputDetails?.cache_write_tokens ??
    usage.cache_write_tokens
  );
}

export function pickCacheCreationInPrompt(
  usage: CacheWriteUsageSource | null | undefined
): boolean | undefined {
  if (!usage || typeof usage !== "object") return undefined;
  for (const details of [usage.input_tokens_details, usage.prompt_tokens_details]) {
    const flag = details?.cache_creation_in_prompt;
    if (typeof flag === "boolean") return flag;
  }
  return undefined;
}

// A top-level write alias has no verified inclusion contract.
export function isTopLevelCacheWriteOnly(usage: CacheWriteUsageSource | null | undefined) {
  if (!usage || typeof usage !== "object" || !usage.cache_write_tokens) return false;
  const promptDetails = usage.prompt_tokens_details;
  const inputDetails = usage.input_tokens_details;
  return (
    usage.cache_creation_input_tokens === undefined &&
    promptDetails?.cache_creation_tokens === undefined &&
    inputDetails?.cache_creation_tokens === undefined &&
    promptDetails?.cache_write_tokens === undefined &&
    inputDetails?.cache_write_tokens === undefined
  );
}

// Only nested cache-write aliases have a known inclusive total.
export function resolveCacheCreationInPrompt(
  usage: CacheWriteUsageSource | null | undefined
): boolean | undefined {
  const explicit = pickCacheCreationInPrompt(usage);
  if (explicit !== undefined || !usage || typeof usage !== "object") return explicit;
  const promptDetails = usage.prompt_tokens_details;
  const inputDetails = usage.input_tokens_details;
  const namedWrite =
    usage.cache_creation_input_tokens ??
    promptDetails?.cache_creation_tokens ??
    inputDetails?.cache_creation_tokens;
  if (namedWrite !== undefined) return undefined;
  const nestedAliasWrite = promptDetails?.cache_write_tokens ?? inputDetails?.cache_write_tokens;
  return nestedAliasWrite ? true : undefined;
}
