import type { RegistryEntry } from "../../shared.ts";

export const fireworksProvider: RegistryEntry = {
  id: "fireworks",
  alias: "fireworks",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.fireworks.ai/inference/v1/chat/completions",
  modelsUrl:
    "https://api.fireworks.ai/v1/accounts/fireworks/models?filter=supports_serverless=true",
  modelIdPrefix: "accounts/fireworks/models/",
  acceptedModelIdPrefixes: ["accounts/fireworks/models/", "accounts/fireworks/routers/"],
  authType: "apikey",
  authHeader: "bearer",
  models: [
    {
      id: "deepseek-v4-flash",
      name: "DeepSeek V4 Flash",
      supportsReasoning: true,
    },
    {
      id: "deepseek-v4-pro",
      name: "DeepSeek V4 Pro",
      supportsReasoning: true,
    },
    { id: "glm-5p1", name: "GLM 5.1" },
    { id: "gpt-oss-120b", name: "OpenAI gpt-oss-120b" },
    { id: "gpt-oss-20b", name: "OpenAI gpt-oss-20b" },
    { id: "kimi-k2p5", name: "Kimi K2.5" },
    { id: "kimi-k2p6", name: "Kimi K2.6" },
    { id: "minimax-m2p5", name: "MiniMax M2.5" },
    { id: "minimax-m2p7", name: "MiniMax M2.7" },
    { id: "qwen3p6-plus", name: "Qwen3.6 Plus" },
  ],
};
