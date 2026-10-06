/**
 * MaxAI model catalog + provider-enum mapping. Ported from the MaxAI v3 client
 * (catalog/context_windows.py, tools/provider_enum.py). All 13 chat models are
 * PAID (the free `mistral-7b-instruct-free` is a window-lookup fallback only and
 * is not offered). Context windows are the MaxAI-reported values.
 */
import type { RegistryModel } from "../../config/providers/shared.ts";

interface MaxaiModelSpec {
  id: string;
  name: string;
  contextLength: number;
  supportsReasoning?: boolean;
  /**
   * Vision-capable (accepts image_url input). Sourced from MaxAI's live
   * `/models/get_config` `capabilities.vision` (verified 2026-08); the executor
   * forwards image parts inline in message_content for these. Live discovery
   * (services/maxaiModels.ts) overrides this from the catalog at runtime; this
   * static flag keeps the offline registry in agreement.
   */
  supportsVision?: boolean;
}

/** The 13 offered paid chat models (group order: FAST, SMART, REASONING). */
export const MAXAI_MODELS: MaxaiModelSpec[] = [
  // FAST
  { id: "gpt-5.6-luna", name: "GPT-5.6 Luna", contextLength: 1_050_000, supportsVision: true },
  { id: "claude-haiku-4-5", name: "Claude Haiku 4.5", contextLength: 200_000, supportsVision: true },
  { id: "gemini-3-1-flash-lite", name: "Gemini 3.1 Flash Lite", contextLength: 1_000_000, supportsVision: true },
  { id: "grok-4-1-fast-non-reasoning", name: "Grok 4.1 Fast", contextLength: 2_000_000 },
  { id: "llama-3.3-70b", name: "Llama 3.3 70B", contextLength: 128_000 },
  { id: "deepseek-v3.2", name: "DeepSeek V3.2", contextLength: 128_000 },
  // SMART
  { id: "gpt-5.6", name: "GPT-5.6", contextLength: 1_050_000, supportsVision: true },
  { id: "claude-5-sonnet", name: "Claude 5 Sonnet", contextLength: 1_000_000 },
  {
    id: "grok-4-1-fast-reasoning",
    name: "Grok 4.1 Fast (Reasoning)",
    contextLength: 2_000_000,
    supportsReasoning: true,
  },
  // REASONING
  {
    id: "gpt-5.6-thinking",
    name: "GPT-5.6 Thinking",
    contextLength: 1_050_000,
    supportsReasoning: true,
    supportsVision: true,
  },
  {
    id: "gemini-3.1-pro-preview",
    name: "Gemini 3.1 Pro Preview",
    contextLength: 1_000_000,
    supportsReasoning: true,
    supportsVision: true,
  },
  { id: "grok-4.5", name: "Grok 4.5", contextLength: 500_000, supportsReasoning: true },
  { id: "deepseek-r1", name: "DeepSeek R1", contextLength: 128_000, supportsReasoning: true },
];

/** RegistryModel[] form for the provider registry entry. */
export const MAXAI_REGISTRY_MODELS: RegistryModel[] = MAXAI_MODELS.map((m) => ({
  id: m.id,
  name: m.name,
  contextLength: m.contextLength,
  toolCalling: true, // prompted tool-calling (no native API, but supported via the tool protocol)
  ...(m.supportsReasoning ? { supportsReasoning: true } : {}),
  ...(m.supportsVision ? { supportsVision: true } : {}),
}));

/** Default context window for an unknown model. */
export const MAXAI_DEFAULT_CONTEXT = 128_000;

export function maxaiContextWindow(modelId: string): number {
  return MAXAI_MODELS.find((m) => m.id === modelId)?.contextLength ?? MAXAI_DEFAULT_CONTEXT;
}
