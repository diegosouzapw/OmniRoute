/**
 * Parses the Google Generative Language `v1beta/models` listing into discovery models.
 *
 * Each model's `supportedGenerationMethods` is mapped to OmniRoute endpoints:
 *   - generateContent / generateAnswer → "chat"
 *   - predict                          → "images"  (Imagen image generation)
 *   - predictLongRunning               → "videos"  (Veo video generation)
 *   - embedContent                     → "embeddings"
 *   - bidiGenerateContent              → ignored   (Gemini Live is not proxied)
 *
 * Model-id heuristics refine the long-running bucket because Google exposes both
 * Imagen and Veo via long-running methods on the same endpoint:
 *   - id contains "veo"    → ensure "videos"
 *   - id contains "imagen" → force "images" (never "videos")
 *
 * Note: `gemini-*-image` models (e.g. gemini-3-pro-image) generate images via the
 * regular `generateContent` path, so they stay "chat" (image output is a chat
 * modality) and are intentionally NOT reclassified as "images".
 *
 * This is shared by the `gemini` discovery config and the `vertex` /
 * `vertex-partner` (incl. Vertex AI Express key) discovery branches, so every
 * supported model the account can access — chat, image, video and embeddings —
 * surfaces dynamically instead of being limited to the small static registry.
 */
const METHOD_TO_ENDPOINT: Record<string, string> = {
  generateContent: "chat",
  embedContent: "embeddings",
  predict: "images",
  predictLongRunning: "videos",
  bidiGenerateContent: "audio",
  generateAnswer: "chat",
};

const IGNORED_METHODS = new Set([
  "countTokens",
  "countTextTokens",
  "createCachedContent",
  "batchGenerateContent",
  "asyncBatchEmbedContent",
  "bidiGenerateContent",
]);

const RETIRED_GEMINI_MODEL_IDS = new Set(["gemini-3.5-flash"]);

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
  return (data?.models || [])
    .map((m: Record<string, unknown>) => {
      const methods: string[] = Array.isArray(m.supportedGenerationMethods)
        ? (m.supportedGenerationMethods as string[])
        : [];

      const endpoints = new Set<string>(
        methods
          .filter((method) => !IGNORED_METHODS.has(method))
          .map((method) => METHOD_TO_ENDPOINT[method] || "chat")
      );

      const id = ((m.name as string) || (m.id as string) || "").replace(/^models\//, "");
      const lowerId = id.toLowerCase();

      // Google exposes Imagen (image) and Veo (video) via long-running methods; the
      // method alone can't always distinguish them, so refine by model id.
      if (lowerId.includes("veo")) {
        endpoints.add("videos");
      }
      if (lowerId.includes("imagen")) {
        endpoints.delete("videos");
        endpoints.add("images");
      }

      if (
        endpoints.size === 0 &&
        methods.length > 0 &&
        methods.every((method) => IGNORED_METHODS.has(method))
      ) {
        return null;
      }
      if (endpoints.size === 0) endpoints.add("chat");

      return {
        ...m,
        id,
        name: (m.displayName as string) || id,
        supportedEndpoints: [...endpoints],
        ...(typeof m.inputTokenLimit === "number" ? { inputTokenLimit: m.inputTokenLimit } : {}),
        ...(typeof m.outputTokenLimit === "number" ? { outputTokenLimit: m.outputTokenLimit } : {}),
        ...(typeof m.description === "string" ? { description: m.description } : {}),
        ...(m.thinking === true ? { supportsThinking: true } : {}),
      } as GeminiDiscoveryModel;
    })
    .filter(
      (model: GeminiDiscoveryModel | null): model is GeminiDiscoveryModel =>
        Boolean(model) && !RETIRED_GEMINI_MODEL_IDS.has(model.id)
    );
}
