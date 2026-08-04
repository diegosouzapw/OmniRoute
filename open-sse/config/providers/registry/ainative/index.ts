import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

/**
 * AINative Studio — OpenAI-compatible aggregator (api.ainative.studio).
 *
 * The /models catalog is public (84 models,
 * verified 2026-07-20) so it is discovered via passthrough; the entries below
 * are the free-tier ones and act as a fallback when discovery fails.
 */
export const ainativeProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "ainative",
  baseUrl: "https://api.ainative.studio/api/v1/chat/completions",
  modelsUrl: "https://api.ainative.studio/api/v1/models",
  passthroughModels: true,
  models: [
    { id: "qwen3-235b-cerebras", name: "Qwen3 235B (Cerebras)", contextLength: 131072, toolCalling: true },
    { id: "qwen3-32b", name: "Qwen3 32B", contextLength: 131072, toolCalling: true },
    { id: "qwen3-14b", name: "Qwen3 14B", contextLength: 131072, toolCalling: true },
    { id: "qwen3-8b", name: "Qwen3 8B", contextLength: 131072, toolCalling: true },
    { id: "llama-4-maverick", name: "Llama 4 Maverick", contextLength: 131072, toolCalling: true },
    { id: "llama3.1-8b-cerebras", name: "Llama 3.1 8B (Cerebras)", contextLength: 131072, toolCalling: true },
    { id: "deepseek-r1", name: "DeepSeek R1", contextLength: 65536, supportsReasoning: true },
    { id: "nous-coder", name: "Nous Coder", contextLength: 131072, toolCalling: true },
    { id: "gemini-flash", name: "Gemini Flash", contextLength: 131072, toolCalling: true },
  ],
});
