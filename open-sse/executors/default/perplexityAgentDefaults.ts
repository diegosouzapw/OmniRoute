const PERPLEXITY_AGENT_DEFAULT_MAX_OUTPUT_TOKENS = 4096;

export function defaultPerplexityAgentMaxOutputTokens<T>(body: T): T {
  if (!body || typeof body !== "object" || Array.isArray(body)) return body;

  const record = body as Record<string, unknown>;
  if (
    record.max_output_tokens !== undefined ||
    record.max_completion_tokens !== undefined ||
    record.max_tokens !== undefined
  ) {
    return body;
  }

  return {
    ...record,
    max_output_tokens: PERPLEXITY_AGENT_DEFAULT_MAX_OUTPUT_TOKENS,
  } as T;
}
