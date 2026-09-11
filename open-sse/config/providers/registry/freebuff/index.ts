import type { RegistryEntry } from "../../shared.ts";

export const freebuffProvider: RegistryEntry = {
  id: "freebuff",
  alias: "fb",
  format: "openai",
  executor: "freebuff",
  baseUrl: "https://www.codebuff.com/api/v1",
  authType: "apikey",
  authHeader: "bearer",
  models: [
    {
      id: "deepseek/deepseek-v4-flash",
      name: "DeepSeek V4 Flash",
      supportsReasoning: true,
      contextLength: 131_072,
    },
    {
      id: "deepseek/deepseek-v4-pro",
      name: "DeepSeek V4 Pro",
      supportsReasoning: true,
      contextLength: 131_072,
    },
    {
      id: "openai/gpt-5.6-luna",
      name: "GPT-5.6 Luna",
      supportsReasoning: true,
      contextLength: 131_072,
    },
    {
      id: "minimax/minimax-m3",
      name: "MiniMax M3",
      supportsVision: true,
      supportsReasoning: true,
      contextLength: 131_072,
    },
    {
      id: "mimo/mimo-v2.5",
      name: "MiMo v2.5",
      supportsReasoning: true,
      contextLength: 131_072,
    },
    {
      id: "z-ai/glm-5.2",
      name: "GLM 5.2",
      supportsReasoning: true,
      contextLength: 131_072,
    },
    {
      id: "crof/kimi-k3-eco",
      name: "Kimi K3 Eco",
      supportsVision: true,
      supportsReasoning: true,
      contextLength: 131_072,
    },
    {
      id: "anthropic/claude-fable-5",
      name: "Claude Fable 5",
      supportsVision: true,
      supportsReasoning: true,
      contextLength: 131_072,
    },
    {
      id: "meta/muse-spark-1.3-contributor",
      name: "Meta Muse Spark 1.3 Contributor",
      supportsReasoning: true,
      contextLength: 131_072,
    },
    {
      id: "meta/muse-spark-1.2-contributor",
      name: "Meta Muse Spark 1.2 Contributor",
      supportsReasoning: true,
      contextLength: 131_072,
    },
  ],
};
