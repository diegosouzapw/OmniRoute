import type { RegistryEntry } from "../../shared.ts";

export const sensenovaProvider: RegistryEntry = {
  id: "sensenova",
  alias: "sensenova",
  format: "openai",
  executor: "default",
  baseUrl: "https://token.sensenova.cn/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  // SenseNova Token Plan (validated 2026-07-06): the Token Plan endpoint is
  // OpenAI-compatible but enforces max_tokens in [1, 65536]. Its /models list
  // also currently advertises sensenova-u1-fast, but chat completions return
  // 404 "model is not found" for that model; U1 Fast belongs to image flows.
  models: [
    {
      id: "sensenova-6.7-flash-lite",
      name: "SenseNova 6.7 Flash-Lite",
      contextLength: 262144,
      maxOutputTokens: 65536,
      supportsVision: true,
      toolCalling: true,
    },
    {
      id: "deepseek-v4-flash",
      name: "DeepSeek V4 Flash",
      contextLength: 1048576,
      maxOutputTokens: 65536,
      supportsReasoning: true,
      interleavedField: "reasoning_content",
    },
    {
      id: "glm-5.2",
      name: "GLM 5.2",
      contextLength: 1048576,
      maxOutputTokens: 65536,
      supportsReasoning: true,
      interleavedField: "reasoning_content",
    },
  ],
};
