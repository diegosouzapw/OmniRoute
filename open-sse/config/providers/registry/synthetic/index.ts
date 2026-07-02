import type { RegistryEntry } from "../../shared.ts";

export const syntheticProvider: RegistryEntry = {
  id: "synthetic",
  alias: "synthetic",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.synthetic.new/openai/v1/chat/completions",
  modelsUrl: "https://api.synthetic.new/openai/v1/models",
  authType: "apikey",
  authHeader: "bearer",
  models: [
    { id: "hf:nvidia/Kimi-K2.5-NVFP4", name: "Kimi K2.5 (NVFP4)" },
    { id: "hf:MiniMaxAI/MiniMax-M2.5", name: "MiniMax M2.5" },
    { id: "hf:zai-org/GLM-4.7-Flash", name: "GLM 4.7 Flash" },
    { id: "hf:zai-org/GLM-4.7", name: "GLM 4.7" },
    { id: "hf:moonshotai/Kimi-K2.5", name: "Kimi K2.5" },
    { id: "hf:deepseek-ai/DeepSeek-V3.2", name: "DeepSeek V3.2" },
  ],
  passthroughModels: true,
};
