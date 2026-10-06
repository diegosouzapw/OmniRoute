import type { RegistryEntry } from "../../shared.ts";

export const ollama_cloudProvider: RegistryEntry = {
  id: "ollama-cloud",
  alias: "ollamacloud",
  format: "openai",
  executor: "default",
  baseUrl: "https://ollama.com/v1/chat/completions",
  modelsUrl: "https://ollama.com/api/tags",
  authType: "apikey",
  authHeader: "bearer",
  defaultSupportedThinkingEfforts: ["none", "low", "medium", "high", "max"],
  // Note: rate limits vary by plan (free = "Light usage", Pro = more, Max = 5x Pro).
  // Users can generate API keys at https://ollama.com/settings/keys
  models: [
    {
      id: "gpt-oss:20b",
      name: "GPT-OSS 20B",
      supportsReasoning: true,
      supportedThinkingEfforts: ["low", "medium", "high"],
    },
    {
      id: "gpt-oss:120b",
      name: "GPT-OSS 120B",
      supportsReasoning: true,
      supportedThinkingEfforts: ["low", "medium", "high"],
    },
    // #10788: these models accept none|low|medium|high|max. Keep their explicit
    // declarations aligned with the provider fallback so the static and synced
    // catalog paths expose the same native vocabulary.
    {
      id: "deepseek-v4-pro",
      name: "DeepSeek V4 Pro",
      supportsReasoning: true,
      supportedThinkingEfforts: ["none", "low", "medium", "high", "max"],
    },
    {
      id: "deepseek-v4-flash",
      name: "DeepSeek V4 Flash",
      supportsReasoning: true,
      supportedThinkingEfforts: ["none", "low", "medium", "high", "max"],
    },
    { id: "kimi-k2.6", name: "Kimi K2.6" },
    // Ollama Cloud accepts low|medium|high|max|none and rejects xhigh, so the
    // explicit supportsXHighEffort:false makes the sanitizer map xhigh → max.
    {
      id: "glm-5.1",
      name: "GLM 5.1",
      supportsReasoning: true,
      supportsXHighEffort: false,
      supportedThinkingEfforts: ["none", "low", "medium", "high", "max"],
    },
    {
      id: "glm-5.2",
      name: "GLM 5.2",
      supportsReasoning: true,
      supportsXHighEffort: false,
      supportedThinkingEfforts: ["none", "low", "medium", "high", "max"],
    },
    // #3110: MiniMax M3 via Ollama
    { id: "minimax-m3", name: "MiniMax M3", contextLength: 1048576, supportsVision: true },
    { id: "minimax-m2.7", name: "MiniMax M2.7" },
    { id: "gemma4:31b", name: "Gemma 4 31B" },
    { id: "nemotron-3-super", name: "NVIDIA Nemotron 3 Super" },
    { id: "qwen3.5:397b", name: "Qwen 3.5 397B" },
  ],
  passthroughModels: true,
};
