import {
  MUSE_CODE_INFERENCE_USER_AGENT,
  MUSE_CODE_RESPONSES_URL,
} from "../../../museCode.ts";
import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

const MUSE_SPARK_THINKING = ["minimal", "low", "medium", "high", "xhigh", "max"] as const;

function museSparkModel(
  id: string,
  name: string,
  options: { vision?: boolean; thinking?: readonly string[] } = {}
) {
  return {
    id,
    name,
    contextLength: 1048576,
    maxOutputTokens: 65536,
    supportsReasoning: true,
    supportsXHighEffort: true,
    supportedThinkingEfforts: options.thinking ?? MUSE_SPARK_THINKING,
    toolCalling: true,
    supportsVision: options.vision !== false,
    targetFormat: "openai-responses" as const,
    unsupportedParams: ["logprobs", "topLogprobs", "logitBias"],
  };
}

/**
 * Muse Code CLI — Meta's agentic coding tool.
 *
 * Wire format: OpenAI Responses API (POST /responses).
 * Auth: dual — META_API_KEY / pasted Bearer key, or RFC 8628 device OAuth
 * (CLIProxyAPI-parity: persist dca token, mint inference key, remint on 401).
 * Reasoning efforts: xhigh/ultra -> high (handled generically).
 *
 * @see https://github.com/joymadhu49/muse-openrouter-shim
 */
export const muse_codeProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "muse-code",
  alias: "mc",
  baseUrl: MUSE_CODE_RESPONSES_URL,
  extraHeaders: { "User-Agent": MUSE_CODE_INFERENCE_USER_AGENT },
  passthroughModels: true,
  reasoningTransport: "opaque",
  defaultContextLength: 200000,
  models: [
    museSparkModel("muse-spark-1.3", "Muse Spark 1.3"),
    museSparkModel("muse-spark-1.3-contributor", "Muse Spark 1.3 Contributor"),
    museSparkModel("muse-spark-1.2", "Muse Spark 1.2", {
      thinking: ["minimal", "low", "medium", "high", "xhigh"],
    }),
    museSparkModel("muse-spark-1.2-contributor", "Muse Spark 1.2 Contributor", {
      thinking: ["minimal", "low", "medium", "high", "xhigh"],
    }),
    museSparkModel("muse-spark-1.1", "Muse Spark 1.1", {
      vision: false,
      thinking: ["low", "medium", "high", "xhigh"],
    }),
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
