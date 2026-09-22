import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

/**
 * Muse Code CLI — Meta's agentic coding tool.
 *
 * Wire format: OpenAI Responses API (POST /responses).
 * Auth: Bearer token from META_API_KEY env var.
 * Reasoning efforts: xhigh/ultra -> high (handled generically).
 *
 * @see https://github.com/joymadhu49/muse-openrouter-shim
 */
export const muse_codeProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "muse-code",
  alias: "mc",
  // Subscription and API-key connections share this entry: inference is the
  // Responses API in both cases, authenticated by the connection bearer
  // (subscription key for OAuth, META_API_KEY for API-key connections).
  baseUrl: "https://api.meta.ai/v1",
  urlSuffix: "/responses",
  // Live catalog for entitled-model discovery (subscription Spark ids for
  // OAuth connections, Llama ids for API-key connections). The generic
  // models route derives its fetch config from here.
  modelsUrl: "https://api.meta.ai/v1/models",
  passthroughModels: true,
  reasoningTransport: "opaque",
  defaultContextLength: 200000,
  models: [
    // Subscription Spark family: served only on the Responses API. Declaring
    // the wire format (instead of relying on per-request apiFormat) keeps
    // Chat Completions callers translated to Responses. Live discovery
    // remains authoritative: ids a key is not entitled to are rejected, so
    // these entries never route traffic a credential cannot serve. The model
    // set and fallback windows mirror the verified subscription contract
    // (five known ids; live limits win, 1048576/131072 fallback).
    {
      id: "muse-spark-1.1",
      name: "Muse Spark 1.1",
      contextLength: 1048576,
      maxOutputTokens: 131072,
      supportsReasoning: true,
      supportsXHighEffort: true,
      toolCalling: true,
      targetFormat: "openai-responses",
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
    },
    {
      id: "muse-spark-1.3",
      name: "Muse Spark 1.3",
      contextLength: 1048576,
      maxOutputTokens: 131072,
      supportsReasoning: true,
      supportsXHighEffort: true,
      toolCalling: true,
      targetFormat: "openai-responses",
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
    },
    {
      id: "llama-4-maverick",
      name: "Llama 4 Maverick",
      contextLength: 1048576,
      maxOutputTokens: 131072,
      supportsReasoning: true,
      supportsXHighEffort: true,
      toolCalling: true,
      supportsVision: true,
      targetFormat: "openai-responses",
      unsupportedParams: ["logprobs", "topLogprobs", "logitBias"],
    },
    {
      id: "llama-4-scout",
      name: "Llama 4 Scout",
      contextLength: 1048576,
      maxOutputTokens: 131072,
      supportsReasoning: true,
      supportsXHighEffort: true,
      toolCalling: true,
      supportsVision: true,
      targetFormat: "openai-responses",
      unsupportedParams: ["logprobs", "topLogprobs", "logitBias"],
    },
    {
      id: "llama-3.3-70b",
      name: "Llama 3.3 70B",
      contextLength: 131072,
      maxOutputTokens: 32768,
      supportsReasoning: false,
      toolCalling: true,
      targetFormat: "openai-responses",
      unsupportedParams: ["logprobs", "topLogprobs"],
    },
    {
      id: "llama-3.1-405b",
      name: "Llama 3.1 405B",
      contextLength: 131072,
      maxOutputTokens: 32768,
      supportsReasoning: false,
      toolCalling: true,
      targetFormat: "openai-responses",
      unsupportedParams: ["logprobs", "topLogprobs"],
    },
    {
      id: "llama-3.1-70b",
      name: "Llama 3.1 70B",
      contextLength: 131072,
      maxOutputTokens: 32768,
      supportsReasoning: false,
      toolCalling: true,
      targetFormat: "openai-responses",
      unsupportedParams: ["logprobs", "topLogprobs"],
    },
    {
      id: "llama-3.1-8b",
      name: "Llama 3.1 8B",
      contextLength: 131072,
      maxOutputTokens: 32768,
      supportsReasoning: false,
      toolCalling: true,
      targetFormat: "openai-responses",
      unsupportedParams: ["logprobs", "topLogprobs"],
    },
    {
      id: "llama-3.2-90b-vision",
      name: "Llama 3.2 90B Vision",
      contextLength: 131072,
      maxOutputTokens: 32768,
      supportsReasoning: false,
      toolCalling: true,
      supportsVision: true,
      targetFormat: "openai-responses",
      unsupportedParams: ["logprobs", "topLogprobs"],
    },
    {
      id: "llama-3.2-11b-vision",
      name: "Llama 3.2 11B Vision",
      contextLength: 131072,
      maxOutputTokens: 32768,
      supportsReasoning: false,
      toolCalling: true,
      supportsVision: true,
      targetFormat: "openai-responses",
      unsupportedParams: ["logprobs", "topLogprobs"],
    },
  ],
});
