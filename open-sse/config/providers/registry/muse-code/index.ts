import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

/**
 * Muse Code — Meta's agentic coding model API.
 *
 * Wire format: OpenAI Responses API (POST /responses).
 * Auth: either a direct META_API_KEY or a Model API key minted from Meta OIDC
 * device OAuth. OAuth connections keep the Meta identity token separately so
 * the short-lived Model API key can be re-minted automatically.
 *
 * The list below is a safe fallback for startup/offline operation. Meta's live
 * catalog at GET https://api.meta.ai/v1/models remains the stronger source of
 * truth and should replace/augment these entries when model sync is enabled.
 */
export const muse_codeProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "muse-code",
  alias: "mc",
  baseUrl: "https://api.meta.ai/v1/responses",
  passthroughModels: true,
  reasoningTransport: "opaque",
  defaultContextLength: 1048576,
  models: [
    {
      id: "muse-spark-1.3",
      name: "Muse Spark 1.3",
      contextLength: 1048576,
      maxOutputTokens: 256000,
      supportsReasoning: true,
      supportsXHighEffort: true,
      toolCalling: true,
      supportsVision: true,
      targetFormat: "openai-responses",
      unsupportedParams: ["logprobs", "topLogprobs", "logitBias"],
    },
    {
      id: "muse-spark-1.3-contributor",
      name: "Muse Spark 1.3 Contributor",
      contextLength: 1048576,
      maxOutputTokens: 256000,
      supportsReasoning: true,
      supportsXHighEffort: true,
      toolCalling: true,
      supportsVision: true,
      targetFormat: "openai-responses",
      unsupportedParams: ["logprobs", "topLogprobs", "logitBias"],
    },
    {
      id: "muse-spark-1.2",
      name: "Muse Spark 1.2",
      contextLength: 1048576,
      maxOutputTokens: 256000,
      supportsReasoning: true,
      supportsXHighEffort: true,
      toolCalling: true,
      supportsVision: true,
      targetFormat: "openai-responses",
      unsupportedParams: ["logprobs", "topLogprobs", "logitBias"],
    },
    {
      id: "muse-spark-1.2-contributor",
      name: "Muse Spark 1.2 Contributor",
      contextLength: 1048576,
      maxOutputTokens: 256000,
      supportsReasoning: true,
      supportsXHighEffort: true,
      toolCalling: true,
      supportsVision: true,
      targetFormat: "openai-responses",
      unsupportedParams: ["logprobs", "topLogprobs", "logitBias"],
    },
    {
      id: "muse-spark-1.1",
      name: "Muse Spark 1.1",
      contextLength: 1048576,
      maxOutputTokens: 256000,
      supportsReasoning: true,
      supportsXHighEffort: true,
      toolCalling: true,
      supportsVision: true,
      targetFormat: "openai-responses",
      unsupportedParams: ["logprobs", "topLogprobs", "logitBias"],
    },
  ],
});
