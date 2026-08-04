import type { RegistryEntry, RegistryModel } from "../../shared.ts";

export const QWEN_CLOUD_TEXT_MODELS: RegistryModel[] = [
  { id: "qwen3.7-max-2026-06-08", name: "Qwen3.7 Max (2026-06-08)" },
  { id: "qwen3.7-plus", name: "Qwen3.7 Plus" },
  { id: "qwen3.6-plus", name: "Qwen3.6 Plus" },
  { id: "qwen3.6-27b", name: "Qwen3.6 27B" },
  { id: "qwen3.6-35b-a3b", name: "Qwen3.6 35B A3B" },
  { id: "qwen3.5-plus-2026-04-20", name: "Qwen3.5 Plus (2026-04-20)" },
  { id: "qwen3.5-122b-a10b", name: "Qwen3.5 122B A10B" },
  { id: "qwen3.5-397b-a17b", name: "Qwen3.5 397B A17B" },
  { id: "glm-5.2", name: "GLM 5.2" },
  { id: "glm-5.2-fast-preview", name: "GLM 5.2 Fast Preview" },
  { id: "deepseek-v4-pro", name: "DeepSeek V4 Pro" },
  { id: "deepseek-v4-flash", name: "DeepSeek V4 Flash" },
  { id: "kimi-k2.7-code", name: "Kimi K2.7 Code" },
];

export const qwen_cloudProvider: RegistryEntry = {
  id: "qwen-cloud",
  alias: "qwc",
  format: "openai",
  executor: "default",
  baseUrl: "https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions",
  modelsUrl: "https://dashscope-intl.aliyuncs.com/compatible-mode/v1/models",
  authType: "apikey",
  authHeader: "bearer",
  models: QWEN_CLOUD_TEXT_MODELS,
  passthroughModels: true,
};
