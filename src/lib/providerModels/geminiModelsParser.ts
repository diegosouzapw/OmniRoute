/**
 * Parses the Google Generative Language `v1beta/models` listing into discovery models.
 *
 * Each model's `supportedGenerationMethods` is mapped to OmniRoute endpoints:
 *   - generateContent / generateAnswer → "chat"
 *   - predict / predictLongRunning      → "images"   (Imagen models)
 *   - embedContent                      → "embeddings"
 *   - bidiGenerateContent               → "audio"
 *
 * This is shared by the `gemini` discovery config and the `vertex` discovery branch: Vertex AI
 * Express keys (and Service Account JSON via a minted OAuth token) list models from the same
 * endpoint, so image models (imagen-*, gemini-*-image) surface dynamically instead of being
 * limited to the small static registry list.
 */
const METHOD_TO_ENDPOINT: Record<string, string> = {
  generateContent: "chat",
  embedContent: "embeddings",
  predict: "images",
  predictLongRunning: "images",
  bidiGenerateContent: "audio",
  generateAnswer: "chat",
};

const IGNORED_METHODS = new Set([
  "countTokens",
  "countTextTokens",
  "createCachedContent",
  "batchGenerateContent",
  "asyncBatchEmbedContent",
]);

export interface GeminiDiscoveryModel {
  id: string;
  name: string;
  supportedEndpoints: string[];
  inputTokenLimit?: number;
  outputTokenLimit?: number;
  description?: string;
  supportsThinking?: boolean;
  [key: string]: unknown;
}

export function parseGeminiModelsList(data: any): GeminiDiscoveryModel[] {
  return (data?.models || []).map((m: Record<string, unknown>) => {
    const methods: string[] = Array.isArray(m.supportedGenerationMethods)
      ? (m.supportedGenerationMethods as string[])
      : [];
    const endpoints = [
      ...new Set(
        methods
          .filter((method) => !IGNORED_METHODS.has(method))
          .map((method) => METHOD_TO_ENDPOINT[method] || "chat")
      ),
    ];
    if (endpoints.length === 0) endpoints.push("chat");

    return {
      ...m,
      id: ((m.name as string) || (m.id as string) || "").replace(/^models\//, ""),
      name: (m.displayName as string) || ((m.name as string) || "").replace(/^models\//, ""),
      supportedEndpoints: endpoints,
      ...(typeof m.inputTokenLimit === "number" ? { inputTokenLimit: m.inputTokenLimit } : {}),
      ...(typeof m.outputTokenLimit === "number" ? { outputTokenLimit: m.outputTokenLimit } : {}),
      ...(typeof m.description === "string" ? { description: m.description } : {}),
      ...(m.thinking === true ? { supportsThinking: true } : {}),
    } as GeminiDiscoveryModel;
  });
}
