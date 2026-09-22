import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

/**
 * Muse Code CLI — Meta's agentic coding tool (API-key / pay-as-you-go path).
 *
 * Wire format: OpenAI Responses API (POST /responses).
 *
 * The `default` executor returns `config.baseUrl` verbatim and does not consult
 * `responsesBaseUrl`, so `baseUrl` points at the Responses endpoint itself —
 * every model below is tagged `targetFormat: "openai-responses"`. This mirrors
 * the responses-only providers `deepseek` and `perplexity-agent`.
 *
 * Auth: Bearer API key created at https://dev.meta.ai/ → API keys tab
 * (https://dev.meta.ai/docs/authentication).
 * Reasoning efforts: xhigh/ultra -> high (handled generically).
 *
 * @see https://dev.meta.ai/docs/authentication
 */
export const muse_codeProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "muse-code",
  alias: "mc",
  passthroughModels: true,
  baseUrl: "https://api.meta.ai/v1/responses",
  reasoningTransport: "opaque",
  defaultContextLength: 1048576,
  models: [
    {
      id: "muse-spark-1.3",
      name: "Muse Spark 1.3",
      contextLength: 1048576,
      maxOutputTokens: 131072,
      supportsReasoning: true,
      supportsXHighEffort: true,
      toolCalling: true,
      targetFormat: "openai-responses",
      unsupportedParams: ["logprobs", "topLogprobs", "logitBias"],
    },
    {
      id: "muse-spark-1.2",
      name: "Muse Spark 1.2",
      contextLength: 1048576,
      maxOutputTokens: 131072,
      supportsReasoning: true,
      supportsXHighEffort: true,
      toolCalling: true,
      targetFormat: "openai-responses",
      unsupportedParams: ["logprobs", "topLogprobs", "logitBias"],
    },
    {
      id: "muse-spark-1.1",
      name: "Muse Spark 1.1",
      contextLength: 1048576,
      maxOutputTokens: 131072,
      supportsReasoning: true,
      supportsXHighEffort: true,
      toolCalling: true,
      targetFormat: "openai-responses",
      unsupportedParams: ["logprobs", "topLogprobs", "logitBias"],
    },
    {
      id: "muse-spark-1.3-contributor",
      name: "Muse Spark 1.3 Contributor",
      contextLength: 1048576,
      maxOutputTokens: 131072,
      supportsReasoning: true,
      supportsXHighEffort: true,
      toolCalling: true,
      targetFormat: "openai-responses",
      unsupportedParams: ["logprobs", "topLogprobs", "logitBias"],
    },
    {
      id: "muse-spark-1.2-contributor",
      name: "Muse Spark 1.2 Contributor",
      contextLength: 1048576,
      maxOutputTokens: 131072,
      supportsReasoning: true,
      supportsXHighEffort: true,
      toolCalling: true,
      targetFormat: "openai-responses",
      unsupportedParams: ["logprobs", "topLogprobs", "logitBias"],
    },
  ],
});
