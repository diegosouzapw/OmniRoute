import type { RegistryEntry } from "../../shared.ts";

/**
 * Chenzk API — OpenAI-compatible AI gateway (https://chenzk.top).
 *
 * Uses Bearer API keys and exposes its current model catalog through /v1/models.
 */
export const chenzkProvider: RegistryEntry = {
  id: "chenzk",
  alias: "chenzk",
  format: "openai",
  executor: "default",
  baseUrl: "https://chenzk.top/v1/chat/completions",
  modelsUrl: "https://chenzk.top/v1/models",
  authType: "apikey",
  authHeader: "bearer",
  defaultContextLength: 128000,
  models: [
    { id: "gpt-5.6", name: "GPT-5.6" },
    { id: "gpt-5.6-terra", name: "GPT-5.6 Terra" },
    { id: "gpt-5.6-luna", name: "GPT-5.6 Luna" },
    { id: "gpt-5.6-sol", name: "GPT-5.6 Sol" },
    { id: "gpt-5.5", name: "GPT-5.5" },
    { id: "gpt-5.4", name: "GPT-5.4" },
    { id: "gpt-5.4-mini", name: "GPT-5.4 Mini" },
    { id: "claude-opus-4-8", name: "Claude Opus 4.8" },
    { id: "claude-opus-4-7", name: "Claude Opus 4.7" },
    { id: "claude-opus-4-6", name: "Claude Opus 4.6" },
    { id: "claude-sonnet-5", name: "Claude Sonnet 5" },
    { id: "claude-sonnet-4-6", name: "Claude Sonnet 4.6" },
    { id: "grok-4.5", name: "Grok 4.5" },
    { id: "grok-4.3", name: "Grok 4.3" },
    { id: "grok-build", name: "Grok Build" },
    { id: "deepseek-v4-pro", name: "DeepSeek V4 Pro" },
    { id: "deepseek-v4-flash", name: "DeepSeek V4 Flash" },
    { id: "glm-4-flash", name: "GLM 4 Flash" },
  ],
  passthroughModels: true,
};
