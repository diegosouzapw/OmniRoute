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
  passthroughModels: true,
  defaultContextLength: 200000,
  models: [
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
