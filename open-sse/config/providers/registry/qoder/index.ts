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
    { id: "qoder-rome-30ba3b", name: "Qoder ROME" },
    { id: "glm-5.2", name: "GLM-5.2" },
    { id: "minimax-m3", name: "MiniMax M3" },
    { id: "qwen3-coder-plus", name: "Qwen3 Coder Plus" },
    { id: "qwen3-max", name: "Qwen3 Max" },
    { id: "qwen3-vl-plus", name: "Qwen3 Vision Plus", supportsVision: true },
    { id: "kimi-k2-0905", name: "Kimi K2 0905" },
    { id: "qwen3-max-preview", name: "Qwen3 Max Preview" },
    { id: "kimi-k2", name: "Kimi K2" },
    { id: "deepseek-v3.2", name: "DeepSeek-V3.2-Exp" },
    { id: "deepseek-r1", name: "DeepSeek R1" },
    { id: "deepseek-v3", name: "DeepSeek V3" },
    { id: "qwen3-32b", name: "Qwen3 32B" },
    { id: "qwen3-235b-a22b-thinking-2507", name: "Qwen3 235B A22B Thinking 2507" },
    { id: "qwen3-235b-a22b-instruct", name: "Qwen3 235B A22B Instruct" },
    { id: "qwen3-235b", name: "Qwen3 235B" },
  ],
};
