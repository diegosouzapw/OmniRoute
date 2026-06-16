import type { RegistryEntry } from "../../shared.ts";

export const bluesmindsProvider: RegistryEntry = {
  id: "bluesminds",
  alias: "bm",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.bluesminds.com/v1/chat/completions",
  modelsUrl: "https://api.bluesminds.com/v1/models",
  authType: "apikey",
  authHeader: "bearer",
  defaultContextLength: 128000,
  models: [
    // Default free models
    { id: "gpt-4o", name: "GPT-4o" },
    { id: "gpt-4o-mini", name: "GPT-4o Mini" },
    { id: "gpt-4.1", name: "GPT-4.1" },
    { id: "gpt-4.1-mini", name: "GPT-4.1 Mini" },
    { id: "gpt-4.1-nano", name: "GPT-4.1 Nano" },
    { id: "claude-sonnet-4-5", name: "Claude Sonnet 4.5" },
    { id: "claude-haiku-4-5", name: "Claude Haiku 4.5" },
    { id: "gemini-2.0-flash", name: "Gemini 2.0 Flash" },
    { id: "gemini-2.0-flash-exp", name: "Gemini 2.0 Flash (Exp)" },
    { id: "deepseek-reasoner", name: "DeepSeek Reasoner", supportsReasoning: true },
    { id: "deepseek-chat", name: "DeepSeek Chat" },
    { id: "qwen-plus", name: "Qwen Plus" },
    { id: "qwen-turbo", name: "Qwen Turbo" },
    { id: "kimi-k2", name: "Kimi K2" },
    { id: "kimi-k2-thinking", name: "Kimi K2 Thinking" },
    { id: "glm-4.7", name: "GLM 4.7" },
    { id: "glm-4-flash", name: "GLM 4 Flash" },
    { id: "minimax-m2.5", name: "MiniMax M2.5" },
    // VIP models (cost pi credits)
    { id: "claude-opus-4-5", name: "Claude Opus 4.5 (VIP)", contextLength: 200000 },
    { id: "gemini-2.5-pro", name: "Gemini 2.5 Pro (VIP)", contextLength: 1048576 },
    { id: "grok-3", name: "Grok-3 (VIP)", contextLength: 131072 },
    { id: "qwen-max", name: "Qwen Max (VIP)" },
  ],
};
