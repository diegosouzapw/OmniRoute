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
  // Note: rate limits vary by plan (free = "Light usage", Pro = more, Max = 5x Pro).
  // Users can generate API keys at https://ollama.com/settings/api-keys
  models: [
    { id: "deepseek-v4-pro", name: "DeepSeek V4 Pro", supportsReasoning: true },
    { id: "deepseek-v4-flash", name: "DeepSeek V4 Flash", supportsReasoning: true },
    { id: "kimi-k2.6", name: "Kimi K2.6" },
    { id: "glm-5.1", name: "GLM 5.1" },
    // #3110: MiniMax M3 via Ollama
    { id: "minimax-m3", name: "MiniMax M3", contextLength: 1048576, supportsVision: true },
    { id: "minimax-m2.7", name: "MiniMax M2.7" },
    { id: "gemma4:31b", name: "Gemma 4 31B" },
    { id: "nemotron-3-super", name: "NVIDIA Nemotron 3 Super" },
    { id: "qwen3.5:397b", name: "Qwen 3.5 397B" },
  ],
  passthroughModels: true,
};
