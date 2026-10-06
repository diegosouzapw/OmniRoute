/**
 * Operator-facing embedding credential / provider errors.
 *
 * Native `gemini-embedding-2` is registered, but a host without a `gemini`
 * Google AI Studio key still 400s. OpenRouter already serves the same model
 * under `openrouter/google/gemini-embedding-2` (live default 3072-d). Name
 * that working id in the 400 so Hindsight / Memorix operators are not stuck
 * on a dead native id.
 */

export const OPENROUTER_GEMINI_EMBEDDING_2 = "openrouter/google/gemini-embedding-2";
export const OPENROUTER_GEMINI_EMBEDDING_2_PREVIEW =
  "openrouter/google/gemini-embedding-2-preview";
export const NATIVE_GEMINI_EMBEDDING_2 = "gemini/gemini-embedding-2";

const OPENROUTER_HINT =
  `use \`${OPENROUTER_GEMINI_EMBEDDING_2}\` or \`${OPENROUTER_GEMINI_EMBEDDING_2_PREVIEW}\` ` +
  "when OpenRouter is configured";

/**
 * 400 body when the resolved embedding provider has no usable credentials.
 */
export function formatMissingEmbeddingCredentialsError(provider: string): string {
  const base = `No credentials for embedding provider: ${provider}`;
  if (provider === "gemini") {
    return (
      `${base}. Native Gemini embeddings require a Google AI Studio API key on the \`gemini\` ` +
      `provider. Without that key, ${OPENROUTER_HINT}.`
    );
  }
  return base;
}

/**
 * 400 body when the first path segment is not a known embedding provider.
 */
export function formatUnknownEmbeddingProviderError(
  provider: string,
  model: string | null = null
): string {
  const base =
    `Unknown embedding provider: ${provider}. No matching hardcoded or local provider found.`;
  const looksLikeGeminiEmbedding2 =
    provider === "google" || (typeof model === "string" && model.includes("gemini-embedding-2"));
  if (!looksLikeGeminiEmbedding2) return base;
  return (
    `${base} For Gemini Embedding 2, ${OPENROUTER_HINT}, or call \`${NATIVE_GEMINI_EMBEDDING_2}\` ` +
    "after adding a Google AI Studio key on the `gemini` provider."
  );
}
