import type { RegistryEntry } from "../../../shared.ts";

export const gitlawb_opengatewayProvider: RegistryEntry = {
  id: "gitlawb-opengateway",
  alias: "glb-gw",
  format: "openai",
  executor: "default",
  baseUrl: "https://opengateway.gitlawb.com/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  headers: {},
  passthroughModels: true,
  models: [
    {
      id: "xiaomi/mimo-v2.5-pro",
      name: "MiMo V2.5 Pro (Gitlawb)",
      contextLength: 1048576,
      maxOutputTokens: 131072,
    },
    {
      id: "xiaomi/mimo-v2.5",
      name: "MiMo V2.5 (Gitlawb)",
      contextLength: 1048576,
      maxOutputTokens: 131072,
    },
    { id: "google/gemini-3.1-flash-lite", name: "Gemini 3.1 Flash Lite (Gitlawb)" },
    { id: "minimax/minimax-m3", name: "Minimax M3 (Gitlawb)" },
    { id: "qwen/qwen3.7-max", name: "Qwen 3.7 Max (Gitlawb)" },
    { id: "z-ai/glm-5.2", name: "GLM 5.2 (Gitlawb)" },
    {
      id: "nvidia/nemotron-3-ultra-550b-a55b:free",
      name: "Nemotron 3 Ultra 550B (Gitlawb Free)",
      contextLength: 262144,
      maxOutputTokens: 131072,
    },
  ],
};
