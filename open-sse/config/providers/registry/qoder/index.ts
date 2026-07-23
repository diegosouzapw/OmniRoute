import type { RegistryEntry } from "../../shared.ts";
import { getQoderDefaultHeaders } from "../../shared.ts";

export const qoderProvider: RegistryEntry = {
  id: "qoder",
  alias: "if",
  format: "openai",
  executor: "qoder",
  baseUrl: "https://api.qoder.com/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  headers: getQoderDefaultHeaders(),
  oauth: {
    clientIdEnv: "QODER_OAUTH_CLIENT_ID",
    clientSecretEnv: "QODER_OAUTH_CLIENT_SECRET",
    tokenUrl: process.env.QODER_OAUTH_TOKEN_URL || "",
    authUrl: process.env.QODER_OAUTH_AUTHORIZE_URL || "",
  },
  models: [
    {
      id: "qwen3.8-max-preview",
      name: "Qwen3.8-Max-Preview",
      supportsVision: true,
      supportsReasoning: true,
      contextLength: 1_000_000,
      maxInputTokens: 180_000,
    },
    {
      id: "qwen3.7-max",
      name: "Qwen3.7-Max",
      supportsVision: true,
      contextLength: 1_000_000,
    },
    {
      id: "qwen3.7-plus",
      name: "Qwen3.7-Plus",
      supportsVision: true,
      contextLength: 1_000_000,
    },
    {
      id: "kimi-k3",
      name: "Kimi-K3",
      supportsVision: true,
      contextLength: 1_000_000,
      maxInputTokens: 180_000,
    },
    {
      id: "kimi-k2.7-code",
      name: "Kimi-K2.7-Code",
      supportsVision: true,
      contextLength: 256_000,
    },
    {
      id: "glm-5.2",
      name: "GLM-5.2",
      supportsVision: true,
      supportsReasoning: true,
      contextLength: 1_000_000,
    },
    {
      id: "deepseek-v4-pro",
      name: "DeepSeek-V4-Pro",
      supportsVision: true,
      supportsReasoning: true,
      contextLength: 1_000_000,
    },
    {
      id: "deepseek-v4-flash",
      name: "DeepSeek-V4-Flash",
      supportsVision: true,
      supportsReasoning: true,
      contextLength: 1_000_000,
    },
    {
      id: "minimax-m3",
      name: "MiniMax-M3",
      supportsVision: true,
      contextLength: 1_000_000,
    },
  ],
};
