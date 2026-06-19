import type { RegistryEntry } from "../../shared.ts";

export const togetherProvider: RegistryEntry = {
  id: "together",
  alias: "together",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.together.xyz/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: [
    { id: "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free", name: "Llama 3.3 70B Turbo (🆓 Free)" },
    { id: "meta-llama/Llama-Vision-Free", name: "Llama Vision (🆓 Free)" },
    {
      id: "deepseek-ai/DeepSeek-R1-Distill-Llama-70B-Free",
      name: "DeepSeek R1 Distill 70B (🆓 Free)",
    },
    { id: "meta-llama/Llama-3.3-70B-Instruct-Turbo", name: "Llama 3.3 70B Turbo" },
    { id: "deepseek-ai/DeepSeek-R1", name: "DeepSeek R1" },
    { id: "Qwen/Qwen3-235B-A22B", name: "Qwen3 235B" },
    { id: "meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8", name: "Llama 4 Maverick" },
  ],
};
